import {
  EntityMetadata,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { SortField } from './types/cursor-pager.type';
import {
  NestedRecord,
  NestedRelationsAliased,
  Paging,
  SelectRelation,
} from './types/filter-query-builder.type';

export class FilterQueryBuilder<Entity extends ObjectLiteral> {
  private readonly queryBuilder: SelectQueryBuilder<Entity>;
  private readonly virtualColumns: string[];

  constructor(private readonly repository: Repository<Entity>) {
    this.queryBuilder = this.repository.createQueryBuilder();
    this.virtualColumns = this.repository.metadata.columns
      .filter(({ isVirtualProperty }) => isVirtualProperty)
      .map(({ propertyName }) => propertyName);
  }

  setSorting(sorts?: SortField<Entity>[], alias?: string): this {
    if (!sorts) {
      return this;
    }

    for (const { field, direction, nulls } of sorts) {
      const stringifiedField = String(field);

      let col = alias
        ? `${alias}.${stringifiedField}`
        : `${stringifiedField}`;

      if (this.virtualColumns.includes(stringifiedField)) {
        col = this.queryBuilder.escape(
          alias
            ? `${alias}_${stringifiedField}`
            : `${stringifiedField}`,
        );
      }

      this.queryBuilder.addOrderBy(col, direction, nulls);
    }

    return this;
  }
  setPaging(paging?: Paging, useSkipTake?: boolean): this {
    if (!paging) {
      return this;
    }

    if (useSkipTake) {
      this.queryBuilder.take(paging.limit).skip(paging.offset);

      return this;
    }

    this.queryBuilder.limit(paging.limit).offset(paging.offset);

    return this;
  }
  setRelation(
    selectRelations?: SelectRelation<Entity>[],
  ): FilterQueryBuilder<Entity> {
    if (!selectRelations) {
      return this;
    }
    return this.applyRelationJoinsRecursive({
      relationsMap: this.getReferencedRelationsWithAliasRecursive(
        this.repository.metadata,
      ),
      selectRelations,
    });
  }
  build() {
    return this.queryBuilder;
  }
  private injectRelationsAliasRecursive(
    relations: NestedRecord,
    counter = new Map<string, number>(),
  ): NestedRelationsAliased {
    return Object.entries(relations).reduce(
      (prev, [name, children]) => {
        const count = (counter.get(name) ?? -1) + 1;
        const alias = count === 0 ? name : `${name}_${count}`;

        counter.set(name, count);

        return {
          ...prev,
          [name]: {
            alias,
            relations: this.injectRelationsAliasRecursive(
              children,
              counter,
            ),
          },
        };
      },
      {},
    );
  }
  private getReferencedRelationsRecursive(
    metadata: EntityMetadata,
    selectRelations: SelectRelation<Entity>[] = [],
  ): NestedRecord {
    const referencedRelations = selectRelations.reduce(
      (accumulator, selectRelation) => {
        const referencedRelation = metadata.relations.find(
          (r) => r.propertyName === selectRelation.name,
        );

        if (referencedRelation) {
          accumulator[selectRelation.name] =
            this.getReferencedRelationsRecursive(
              referencedRelation.inverseEntityMetadata,
              selectRelation.query.relations,
            );
        }

        return accumulator;
      },
      {} as NestedRecord,
    );

    return referencedRelations;
  }
  private getReferencedRelationsWithAliasRecursive(
    metadata: EntityMetadata,
    selectRelations: SelectRelation<Entity>[] = [],
  ): NestedRelationsAliased {
    const referencedRelations = this.getReferencedRelationsRecursive(
      metadata,
      selectRelations,
    );
    return this.injectRelationsAliasRecursive(referencedRelations);
  }
  private applyRelationJoinsRecursive({
    alias,
    relationsMap,
    selectRelations,
  }: {
    alias?: string;
    relationsMap?: NestedRelationsAliased;
    selectRelations?: SelectRelation<Entity>[];
  }): FilterQueryBuilder<Entity> {
    if (!relationsMap) {
      return this;
    }

    for (const [relationKey, relation] of Object.entries(
      relationsMap,
    )) {
      const relationAlias = relation.alias;
      const relationChildren = relation.relations;
      const selectRelation = selectRelations?.find(
        ({ name }) => name === relationKey,
      );

      if (selectRelation) {
        this.queryBuilder.leftJoinAndSelect(
          `${alias ?? this.queryBuilder.alias}.${relationKey}`,
          relationAlias,
        );
        this.applyRelationJoinsRecursive({
          relationsMap: relationChildren,
          selectRelations: selectRelation.query.relations,
          alias: relationAlias,
        });
      } else {
        this.queryBuilder.leftJoin(
          `${alias ?? this.queryBuilder.alias}.${relationKey}`,
          relationAlias,
        );
        this.applyRelationJoinsRecursive({
          relationsMap: relationChildren,
          selectRelations: [],
          alias: relationAlias,
        });
      }
    }

    return this;
  }
}
