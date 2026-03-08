// src/services/api/types.ts
export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  [key: string]: any;
}