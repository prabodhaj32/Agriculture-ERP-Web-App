export interface ApiResponse<T> {
    status: boolean;
    message: string;
    data: T;
  }
  
  export interface PaginatedResponse<T> {
    status: boolean;
    message: string;
    data: {
      items: T[];
      totalItems: number;
      totalPages: number;
      currentPage: number;
    };
  }