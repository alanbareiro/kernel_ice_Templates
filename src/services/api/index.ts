// src/services/api/index.ts - VERSIÓN CORREGIDA
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { RequestConfig } from './types';

// Configuración
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000');

// Instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// INTERCEPTOR DE REQUEST (UN SOLO)
api.interceptors.request.use(
  (config) => {
    // Agregar token si existe
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Headers personalizados
    config.headers['X-Source'] = 'kernelize_landing_page';
    config.headers['X-Client-Version'] = import.meta.env.VITE_APP_VERSION || '1.0.0';

    return config;
  },
  (error) => Promise.reject(error)
);

// INTERCEPTOR DE RESPONSE (UN SOLO)
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Extraer los datos de la respuesta
    const data = response.data;

    // Si la respuesta tiene estructura { data, message, success }
    if (data && typeof data === 'object') {
      // Para endpoints que devuelven { success, data, message }
      if ('success' in data && 'data' in data) {
        return data.data;
      }
      // Para endpoints que devuelven { success, user, token }
      if ('success' in data) {
        return data;
      }
    }
    return data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Manejo de timeout
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        success: false,
        errorCode: 'TIMEOUT',
        message: 'Timeout: La solicitud tardó demasiado.',
        timestamp: new Date().toISOString(),
      });
    }

    // Error de conexión
    if (!error.response) {
      return Promise.reject({
        success: false,
        errorCode: 'CONNECTION_ERROR',
        message: 'Error de conexión: No se pudo conectar con el servidor.',
        timestamp: new Date().toISOString(),
      });
    }

    const errorData = error.response?.data;
    const errorCode = errorData?.errorCode;

    // Manejo específico por código de error
    switch (errorCode) {
      case 'TOKEN_EXPIRED':
        // Intentar refrescar token automáticamente (una sola vez)
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
              const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                refreshToken
              });

              // Actualizar tokens
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('refreshToken', response.data.refreshToken);

              // Reintentar request original
              originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
              return api(originalRequest);
            }
          } catch (refreshError) {
            // Si falla el refresh, limpiar y redirigir
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
            if (!window.location.pathname.includes('/login')) {
              window.location.href = '/login';
            }
          }
        }
        break;

      case 'INVALID_TOKEN':
      case 'FORBIDDEN':
        // Limpiar localStorage y redirigir
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
        break;

      case 'VALIDATION_ERROR':
        // Devolver errores de validación estructurados
        return Promise.reject({
          success: false,
          errorCode: 'VALIDATION_ERROR',
          message: errorData.message || 'Error de validación',
          errors: errorData.errors || [],
          fields: errorData.fields || [],
        });

      case 'RATE_LIMIT_EXCEEDED':
        return Promise.reject({
          success: false,
          errorCode: 'RATE_LIMIT_EXCEEDED',
          message: 'Demasiadas solicitudes. Por favor espera un momento.',
        });

      case 'NOT_FOUND':
        return Promise.reject({
          success: false,
          errorCode: 'NOT_FOUND',
          message: errorData.message || 'Recurso no encontrado',
        });

      case 'DUPLICATE_ENTRY':
        return Promise.reject({
          success: false,
          errorCode: 'DUPLICATE_ENTRY',
          message: errorData.message || 'Este registro ya existe',
          fields: errorData.fields || [],
        });
    }

    // Si es error 401 sin código específico
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    // Usar el error del servidor si existe
    return Promise.reject({
      success: false,
      errorCode: errorCode || 'UNKNOWN_ERROR',
      message: errorData?.message || 'Error desconocido del servidor.',
      timestamp: new Date().toISOString(),
      ...errorData,
    });
  }
);

// Función helper genérica
export const request = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  data?: any,
  config?: RequestConfig
): Promise<T> => {
  try {
    const response = await api({
      method,
      url,
      data,
      ...config,
    });
    return response as T;
  } catch (error: any) {
    // En desarrollo, loggear el error
    if (import.meta.env.DEV) {
      console.error(`API ${method} ${url} error:`, error);
    }
    throw error;
  }
};

// Métodos específicos
export const get = <T>(url: string, config?: RequestConfig): Promise<T> =>
  request<T>('GET', url, undefined, config);

export const post = <T>(url: string, data?: any, config?: RequestConfig): Promise<T> =>
  request<T>('POST', url, data, config);

export const put = <T>(url: string, data?: any, config?: RequestConfig): Promise<T> =>
  request<T>('PUT', url, data, config);

export const del = <T>(url: string, config?: RequestConfig): Promise<T> =>
  request<T>('DELETE', url, undefined, config);

export const patch = <T>(url: string, data?: any, config?: RequestConfig): Promise<T> =>
  request<T>('PATCH', url, data, config);

export default api;