// src/services/api/templateApi.service.ts
import { del, get, post } from './index';

export interface TemplateData {
    name: string;
    type: string;
    colors: Record<string, string> | string;
    texts: Record<string, string>;
    images?: Record<string, string>;
    sectionColors?: any;      // ← Cambiado a any
    typography?: any;         // ← Cambiado a any
    ui?: any;                 // ← Cambiado a any
    buttons?: any;            // ← Cambiado a any
    orderId?: string;
}

export interface TemplateResponse {
    success: boolean;
    message?: string;
    template?: any;
    templates?: any[];
}

export const templateApi = {
    saveTemplate: async (data: TemplateData): Promise<TemplateResponse> => {
        try {
            let typeUpper = data.type;
            if (typeof data.type === 'string' && data.type !== data.type.toUpperCase()) {
                typeUpper = data.type.toUpperCase();
            }

            let colors = data.colors;
            if (typeof colors === 'string') {
                if (colors === '') {
                    colors = {
                        primary: '#2563eb',
                        secondary: '#475569',
                        accent: '#1e293b',
                        background: '#ffffff',
                        text: '#0f172a'
                    };
                } else {
                    try {
                        colors = JSON.parse(colors);
                    } catch {
                        colors = {};
                    }
                }
            }

            const payload = {
                name: data.name,
                type: typeUpper,
                colors: colors,
                texts: data.texts || {},
                images: data.images || {},
                sectionColors: data.sectionColors || {},
                typography: data.typography || {},
                ui: data.ui || {},
                buttons: data.buttons || {}
            };

            console.log('📤 Guardando template completo:', payload);
            const response: TemplateResponse = await post('/templates', payload);
            return response;
        } catch (error) {
            console.error('Error en saveTemplate:', error);
            throw error;
        }
    },

    getUserTemplates: async (): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get('/templates');
            return response;
        } catch (error) {
            console.error('Error en getUserTemplates:', error);
            throw error;
        }
    },

    getTemplate: async (id: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get(`/templates/${id}`);
            return response;
        } catch (error) {
            console.error('Error en getTemplate:', error);
            throw error;
        }
    },

    deleteTemplate: async (id: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await del(`/templates/${id}`);
            return response;
        } catch (error) {
            console.error('Error en deleteTemplate:', error);
            throw error;
        }
    },

    saveVersion: async (id: string, data: any): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await post(`/templates/${id}/versions`, data);
            return response;
        } catch (error) {
            console.error('Error en saveVersion:', error);
            throw error;
        }
    },

    getVersions: async (id: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get(`/templates/${id}/versions`);
            return response;
        } catch (error) {
            console.error('Error en getVersions:', error);
            throw error;
        }
    },

    restoreVersion: async (id: string, version: number): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await post(`/templates/${id}/versions/${version}/restore`, {});
            return response;
        } catch (error) {
            console.error('Error en restoreVersion:', error);
            throw error;
        }
    },

    createShareLink: async (id: string, options?: { expiresIn?: number; maxViews?: number }): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await post(`/templates/${id}/share`, options || {});
            return response;
        } catch (error) {
            console.error('Error en createShareLink:', error);
            throw error;
        }
    },

    getSharedTemplate: async (token: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get(`/templates/shared/${token}`);
            return response;
        } catch (error) {
            console.error('Error en getSharedTemplate:', error);
            throw error;
        }
    },

    getPublicTemplates: async (type?: string, category?: string): Promise<TemplateResponse> => {
        try {
            const params = new URLSearchParams();
            if (type) params.append('type', type);
            if (category) params.append('category', category);
            const response: TemplateResponse = await get(`/templates/public?${params.toString()}`);
            return response;
        } catch (error) {
            console.error('Error en getPublicTemplates:', error);
            throw error;
        }
    },

    downloadPublicTemplate: async (id: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get(`/templates/public/${id}`);
            return response;
        } catch (error) {
            console.error('Error en downloadPublicTemplate:', error);
            throw error;
        }
    }
};