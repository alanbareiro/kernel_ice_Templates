// src/services/api/types/api.types.ts

// Respuesta base de la API
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  timestamp?: string;
}

// Error de la API
export interface ApiError {
  success: false;
  message: string;
  errors?: string[];
  timestamp?: string;
}

// Parámetros para requests paginados
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Respuesta paginada
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Configuración de request
export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  params?: Record<string, any>;
  data?: any;
}