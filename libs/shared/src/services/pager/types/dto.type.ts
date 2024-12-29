export interface PageInfoType {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}
export interface EdgeType<DTO> {
  node: DTO;
  cursor: string;
}
export type ConnectionType<DTO> = {
  pageInfo: PageInfoType;
  edges: EdgeType<DTO>[];
};
