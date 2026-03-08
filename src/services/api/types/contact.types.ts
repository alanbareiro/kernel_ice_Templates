// src/services/api/types/contact.types.ts

// Datos del formulario de contacto
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  projectType?: ProjectType;
  contactMethod?: ContactMethod;
  source?: string;
}

// Tipos de proyecto
export type ProjectType = 
  | 'landing'
  | 'ecommerce' 
  | 'crm'
  | 'inventory'
  | 'custom'
  | 'other'
  | '';

// Métodos de contacto
export type ContactMethod = 'email' | 'whatsapp';

// Respuesta exitosa del contacto
export interface ContactResponse {
  success: true;
  message: string;
  data: {
    id: string | number;
    name: string;
    email: string;
    timestamp: string;
    projectType?: string;
    contactMethod?: string;
  };
}

// Datos de lead
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  projectType: string;
  contactMethod: string;
  source: string;
  ipAddress?: string;
  userAgent?: string;
  status: 'new' | 'contacted' | 'converted' | 'archived';
  createdAt: string;
  updatedAt: string;
}

// Estadísticas de leads
export interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  converted: number;
  bySource: Record<string, number>;
  byProjectType: Record<string, number>;
  last7Days: Array<{
    date: string;
    count: number;
  }>;
}