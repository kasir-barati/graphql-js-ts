import {
  createEdgeType,
  CursorPager,
  PageInfoTypeImplementation,
  PagingDto,
  QueryService,
} from '@shared';

import { validatePagination } from '../shared/validate-pagination.util';
import { BusinessEntity } from './business.entity';
import { BusinessRepository } from './business.repository';
import { BusinessDto } from './dto/business.dto';

export class BusinessService {
  constructor(
    private readonly cursorPager: CursorPager<BusinessDto>,
    private readonly queryService: QueryService<BusinessEntity>,
    private readonly businessRepository: BusinessRepository,
  ) {}

  async findAll(paging: PagingDto) {
    validatePagination(paging);

    const { pageInfo, edges } = await this.cursorPager.page(
      (query) => this.queryService.query(query),
      { paging },
    );
    const sanitizedPageInfo = new PageInfoTypeImplementation(
      pageInfo,
    );
    const sanitizedEdges = edges.map((edge) => {
      const Edge = createEdgeType(BusinessDto);

      return new Edge(edge.node, edge.cursor);
    });

    return {
      edges: sanitizedEdges,
      pageInfo: sanitizedPageInfo,
    };
  }

  async getBusinessesByBatch(
    businessesIds: readonly string[],
  ): Promise<Array<BusinessEntity | Error>> {
    const businesses =
      await this.businessRepository.findAllByIds(businessesIds);
    const mappedResults = this.mapBusinessesToIds(
      businesses,
      businessesIds,
    );

    return mappedResults;
  }

  /**
   * @description
   * When using Dataloader we have to fulfill 2 requirements:
   * 1. `?? null` part: The length of the returned array must be equal to the length of the supplied keys.
   *    We need to return `null` if a business is not found for a given business ID.
   * 2. `businesses.filter` part: The returned values must be ordered in the same order as the supplied keys.
   *    E.g. if the keys are `[Business1, Business3, Business4]`, the value must be something like `[businessOfBusiness1, businessOfBusiness3, businessOfBusiness4]`.
   *    The data source might not return them in the same order, so we have to reorder them.
   */
  mapBusinessesToIds(
    businesses: BusinessEntity[],
    businessesIds: readonly string[],
  ): Array<BusinessEntity | Error> {
    return businessesIds
      .map((businessId) => {
        const filteredBusinesses = businesses.filter((business) => {
          return business.id === businessId;
        });

        return filteredBusinesses ?? null;
      })
      .flat();
  }
}
