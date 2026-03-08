// src/services/api/auth.service.ts - VERSIÓN CORREGIDA
import { get, post, put } from './index';
import type {
  AuthResponse,
  LoginCredentials,
  Order,
  RegisterData,
  User
} from './types/auth';

// Funciones de autenticación
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await post<AuthResponse>('/auth/login', credentials);

  // Guardar token en localStorage
  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  return response;
};

export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  const response = await post<AuthResponse>('/auth/register', userData);
  return response;
};

export const logout = async (): Promise<void> => {
  try {
    await post('/auth/logout');
  } catch (error) {
    console.error('Error en logout:', error);
  } finally {
    // Siempre limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
  }
};

export const getProfile = async (): Promise<User> => {
  const response = await get<{ success: boolean; user: User }>('/auth/profile');
  return response.user;
};

export const refreshToken = async (): Promise<{ token: string; refreshToken: string }> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No hay refresh token disponible');
  }

  const response = await post<{ success: boolean; token: string; refreshToken: string }>(
    '/auth/refresh',
    { refreshToken }
  );

  // Actualizar tokens
  localStorage.setItem('token', response.token);
  localStorage.setItem('refreshToken', response.refreshToken);

  return response;
};

export const updateProfile = async (userData: Partial<User>): Promise<User> => {
  const response = await put<{ success: boolean; user: User }>('/auth/profile', userData);

  // Actualizar usuario en localStorage
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const updatedUser = { ...currentUser, ...response.user };
  localStorage.setItem('user', JSON.stringify(updatedUser));

  return response.user;
};

// Servicios de pedidos
export const getUserOrders = async (): Promise<Order[]> => {
  const response = await get<{
    success: boolean;
    count: number;
    orders: Order[]
  }>('/orders');

  return response.orders || [];
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  const response = await get<{ success: boolean; order: Order }>(`/orders/${orderId}`);
  return response.order;
};

export const searchOrder = async (params: { orderId?: string; email?: string }): Promise<Order[]> => {
  const response = await get<{ success: boolean; orders: Order[] }>('/orders/search', { params });
  return response.orders || [];
};

export const createOrder = async (orderData: {
  plan: string;
  total: number;
  monthlyFee?: number;
  details?: any;
}): Promise<{ success: boolean; message: string; order: Order }> => {
  return await post('/orders', orderData);
};

export const addOrderUpdate = async (orderId: string, data: { message: string; type?: string }): Promise<any> => {
  return await post(`/orders/${orderId}/updates`, data);
};

// NOTA: Los servicios de pagos y site changes se movieron a:
// - payment.service.ts
// - siteChange.service.ts
// Mantén solo las funciones básicas de orders aquí

// Funciones de utilidad
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  // Opcional: Verificar expiración del token
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Re-exportar tipos para compatibilidad
export type {
  AuthResponse, LoginCredentials, Order, OrderPlan,
  OrderStatus, OrderUpdate, OrderUpdateType, Payment, PaymentMethod,
  PaymentStatus, PlanType, RegisterData, SiteChange, SiteChangeStatus, SiteChangeType, SubscriptionStatus, TeamMember, TimelineStep, TimelineStepType, User, UserRole
} from './types/auth';
