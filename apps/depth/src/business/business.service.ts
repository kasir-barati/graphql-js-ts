import {
  createEdgeType,
  CursorPager,
  PageInfoTypeImplementation,
  PagingDto,
  QueryService,
} from '@shared';
import { validatePagination } from '../shared/validate-pagination.util';
import { BusinessEntity } from './business.entity';
import { BusinessDto } from './dto/business.dto';

export class BusinessService {
  constructor(
    private readonly cursorPager: CursorPager<BusinessDto>,
    private readonly queryService: QueryService<BusinessEntity>,
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
}
