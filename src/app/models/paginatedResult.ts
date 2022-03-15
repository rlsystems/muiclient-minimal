export interface PaginatedResult<T = any> {
    data: T[];
    currentpage: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }


  