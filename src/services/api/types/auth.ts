// src/services/api/types/auth.ts - Sincronizado con Prisma Schema
export type UserRole = 'ADMIN' | 'CLIENT' | 'DEVELOPER';
export type PlanType = 'LANDING' | 'ECOMMERCE' | 'ENTERPRISE' | null;
export type SubscriptionStatus = 'ACTIVE' | 'PENDING' | 'CANCELLED' | 'NONE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  plan?: PlanType;
  subscriptionStatus?: SubscriptionStatus;
  isActive: boolean;
  emailVerified: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;  // Solo para frontend
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: string;
}

export type OrderPlan = 'LANDING_PAGE' | 'E_COMMERCE' | 'CUSTOM_SYSTEM';
export type OrderStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: string;
  orderId: string;
  userId: string;
  plan: OrderPlan;
  status: OrderStatus;
  progress: number;
  total: string;          // Decimal del backend se maneja como string
  monthlyFee?: string;    // Decimal del backend se maneja como string
  customerName: string;
  customerEmail: string;
  startDate: string;
  estimatedDelivery?: string;
  details: any;
  timeline: TimelineStep[];
  updates: OrderUpdate[];
  team?: TeamMember[];
  payments?: Payment[];
  siteChanges?: SiteChange[];
  createdAt: string;
  updatedAt: string;
}

export type TimelineStepType = 'CONFIRMED' | 'DESIGN' | 'DEVELOPMENT' | 'REVIEW' | 'DELIVERY';

export interface TimelineStep {
  id: string;
  step: TimelineStepType;
  date: string;
  completed: boolean;
  description?: string;
}

export type OrderUpdateType = 'INFO' | 'PROGRESS' | 'SUCCESS' | 'WARNING';

export interface OrderUpdate {
  id: string;
  type: OrderUpdateType;
  message: string;
  date: string;
  author?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  email?: string;
}

export type PaymentMethod = 'MERCADOPAGO' | 'PAYPAL' | 'TRANSFER' | 'CREDIT_CARD';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: string;         // Decimal del backend se maneja como string
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId?: string;
  invoiceUrl?: string;
  description?: string;
  dueDate?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type SiteChangeType = 'DESIGN' | 'CONTENT' | 'FEATURE' | 'BUGFIX' | 'UPDATE';
export type SiteChangeStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';

// src/services/api/types/auth.ts - ACTUALIZAR SiteChange

export interface SiteChange {
  id: string;
  orderId: string;
  userId: string;
  approvedById?: string;
  // AGREGAR ESTO - Objeto del usuario que aprobó
  approvedBy?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  // AGREGAR ESTO - Objeto del usuario que solicitó
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  // AGREGAR ESTO - Objeto del pedido
  order?: {
    id: string;
    orderId: string;
    plan: OrderPlan;
    customerName: string;
  };
  type: SiteChangeType;
  description: string;
  details?: string;
  beforeImage?: string;
  afterImage?: string;
  status: SiteChangeStatus;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteChange2 {
  id: string;
  orderId: string;
  userId: string;
  approvedById?: string;
  type: SiteChangeType;
  description: string;
  details?: string;
  beforeImage?: string;
  afterImage?: string;
  status: SiteChangeStatus;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}