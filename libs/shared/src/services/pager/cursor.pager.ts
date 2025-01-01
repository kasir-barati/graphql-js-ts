import { Class } from '../../types/utility.type';
import {
  CursorPageResult,
  CursorPaging,
  CursorPagingOptions,
  CursorPayload,
  Filter,
  PageMeta,
  Query,
  QueryMany,
  QueryResult,
  SortDirection,
  SortField,
} from './types/cursor-pager.type';
import { EdgeType } from './types/dto.type';
import {
  checkForExtraNode,
  createCursorPayload,
  decodeCursor,
  encodeCursor,
  hasBeforeCursor,
  hasPreviousPage,
  invertSort,
  isBackwardPaging,
  isEmptyPage,
  isForwardPaging,
  isValidPageMeta,
} from './utils';

export class CursorPager<DTO> {
  private get defaultSort(): SortField<DTO>[] {
    return this.cursorFields.map((field) => ({
      field,
      direction: SortDirection.ASC,
    }));
  }

  constructor(
    private readonly DTOClass: Class<DTO>,
    private readonly cursorFields: Array<keyof DTO>,
  ) {}

  async page<Q extends Query<DTO>>(
    queryMany: QueryMany<DTO, Q>,
    query: Q,
  ): Promise<CursorPageResult<DTO>> {
    const pageMeta = this.getPageMeta(query);

    if (!isValidPageMeta(pageMeta)) {
      return {
        edges: [],
        pageInfo: { hasNextPage: false, hasPreviousPage: false },
      };
    }

    const result = await this.runQuery(queryMany, query, pageMeta);

    if (isEmptyPage(result, pageMeta)) {
      return {
        edges: [],
        pageInfo: { hasNextPage: false, hasPreviousPage: false },
      };
    }

    return this.createPageResult(result, pageMeta);
  }

  private toCursor(dto: DTO, query: Query<DTO>): string {
    const cursorFields: (keyof DTO)[] = [
      ...(query.sorting ?? []).map((f: SortField<DTO>) => f.field),
      ...this.cursorFields,
    ];

    return encodeCursor(createCursorPayload(dto, cursorFields));
  }

  private createPageResult(
    results: QueryResult<DTO>,
    pagingMeta: PageMeta<DTO, CursorPagingOptions<DTO>>,
  ): CursorPageResult<DTO> {
    const { nodes, hasExtraNode } = results;
    const { isForward, hasBefore } = pagingMeta.options;
    const edges: EdgeType<DTO>[] = nodes.map((node, i) => ({
      node,
      cursor: this.toCursor(node, pagingMeta.query),
    }));
    const pageInfo = {
      startCursor: edges[0]?.cursor,
      endCursor: edges[edges.length - 1]?.cursor,
      // if we re paging forward and have an extra node we have more pages to load. Or there we know that we have a before cursor, thus we have next page
      hasNextPage: isForward ? hasExtraNode : hasBefore,
      // we have a previous page if we are going backwards and have an extra node.
      hasPreviousPage: hasPreviousPage(results, pagingMeta),
    };

    return { edges, pageInfo };
  }

  private async runQuery<Q extends Query<DTO>>(
    queryMany: QueryMany<DTO, Q>,
    query: Q,
    pageMeta: PageMeta<DTO, CursorPagingOptions<DTO>>,
  ) {
    const { options } = pageMeta;
    const createdQuery = this.createQuery(query, options, true);
    const nodes = await queryMany(createdQuery);
    const returnNodes = checkForExtraNode(nodes, options);
    const hasExtraNode = returnNodes.length !== nodes.length;

    return { nodes: returnNodes, hasExtraNode };
  }

  private createQuery<Q extends Query<DTO>>(
    query: Q,
    options: CursorPagingOptions<DTO>,
    includeExtraNode: boolean,
  ): Q {
    const paging = { limit: options.limit };
    const { payload } = options;

    if (includeExtraNode) {
      paging.limit += 1;
    }

    const sorting = this.getSortFields(query, options);
    const filter = this.createFieldsFilter(sorting, payload);
    const createdQuery = { ...query, filter, sorting, paging };

    return createdQuery;
  }

  private createFieldsFilter(
    sorting: SortField<DTO>[],
    payload?: CursorPayload<DTO>,
  ): Filter<DTO> {
    if (!payload) {
      return {};
    }

    const equalities: Filter<DTO>[] = [];
    const orFilters = sorting.reduce(
      (accumulator, sortingField, index) => {
        const payloadField = payload.fields[index];

        if (payloadField.field !== sortingField.field) {
          throw `Cursor's payload does not match! In sorting criteria we have ${sortingField.field.toString()} but payload expects ${payloadField.field.toString()}`;
        }

        const isAsc = sortingField.direction === SortDirection.ASC;
        const subFilter = {
          and: [
            ...equalities,
            {
              [payloadField.field]: {
                [isAsc ? 'gt' : 'lt']: payloadField.value,
              },
            },
          ],
        } as Filter<DTO>;

        if (payloadField.value === null) {
          equalities.push({
            [payloadField.field]: { is: null },
          } as Filter<DTO>);
        } else {
          equalities.push({
            [payloadField.field]: { eq: payloadField.value },
          } as Filter<DTO>);
        }

        return [...accumulator, subFilter];
      },
      [] as Filter<DTO>[],
    );

    return { or: orFilters } as Filter<DTO>;
  }

  private getSortFields<Q extends Query<DTO>>(
    query: Q,
    options: CursorPagingOptions<DTO>,
  ) {
    const { sorting = [] } = query;
    // Strip the default sorts criteria if it is being set by the client
    const defaultSort = options.defaultSort.filter(
      (defaultSortingField) =>
        !sorting.some(
          (sortingField) =>
            sortingField.field === defaultSortingField.field,
        ),
    );
    const sortFields = [...sorting, ...defaultSort];

    if (!options.isForward) {
      return invertSort(sortFields);
    }

    return sortFields;
  }

  private getPageMeta<Q extends Query<DTO>>(
    query: Q,
  ): PageMeta<DTO, CursorPagingOptions<DTO>> {
    const { paging } = query;

    if (!paging) {
      return {
        options: {
          defaultSort: this.defaultSort,
          limit: 10,
          isBackward: false,
          isForward: true,
          hasBefore: false,
        },
        query,
      };
    }

    return {
      options: this.getPagingFromCursorArgs(paging),
      query,
    };
  }

  private getPagingFromCursorArgs(
    cursor: CursorPaging,
  ): CursorPagingOptions<DTO> {
    const isForward = isForwardPaging(cursor);
    const isBackward = isBackwardPaging(cursor);
    const hasBefore = hasBeforeCursor(cursor);
    const payload = cursor.after
      ? decodeCursor(cursor.after, this.DTOClass)
      : cursor.before
        ? decodeCursor(cursor.before, this.DTOClass)
        : undefined;
    const limit = cursor.first ?? cursor.last ?? 0;

    return {
      defaultSort: this.defaultSort,
      limit,
      isBackward,
      isForward,
      hasBefore,
      payload,
    };
  }
}
