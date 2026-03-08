import { del, get, post } from './index';

export interface TemplateData {
    name: string;
    type: string;
    colors: Record<string, string> | string;
    texts: Record<string, string>;
    images?: Record<string, string>;
    orderId?: string;
}

export interface TemplateResponse {
    success: boolean;
    message?: string;
    template?: any;
    templates?: any[];
}

export const templateApi = {
    // Guardar template (requiere autenticación)
    saveTemplate: async (data: TemplateData): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await post('/templates', data);
            return response;
        } catch (error) {
            console.error('Error en saveTemplate:', error);
            throw error;
        }
    },

    // Obtener templates del usuario autenticado
    getUserTemplates: async (): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get('/templates');
            return response;
        } catch (error) {
            console.error('Error en getUserTemplates:', error);
            throw error;
        }
    },

    // Obtener template por ID
    getTemplate: async (id: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get(`/templates/${id}`);
            return response;
        } catch (error) {
            console.error('Error en getTemplate:', error);
            throw error;
        }
    },

    // Eliminar template
    deleteTemplate: async (id: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await del(`/templates/${id}`);
            return response;
        } catch (error) {
            console.error('Error en deleteTemplate:', error);
            throw error;
        }
    },

    // Guardar versión
    saveVersion: async (id: string, data: any): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await post(`/templates/${id}/versions`, data);
            return response;
        } catch (error) {
            console.error('Error en saveVersion:', error);
            throw error;
        }
    },

    // Obtener versiones
    getVersions: async (id: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get(`/templates/${id}/versions`);
            return response;
        } catch (error) {
            console.error('Error en getVersions:', error);
            throw error;
        }
    },

    // Restaurar versión
    restoreVersion: async (id: string, version: number): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await post(`/templates/${id}/versions/${version}/restore`, {});
            return response;
        } catch (error) {
            console.error('Error en restoreVersion:', error);
            throw error;
        }
    },

    // Crear link compartido
    createShareLink: async (id: string, options?: { expiresIn?: number; maxViews?: number }): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await post(`/templates/${id}/share`, options || {});
            return response;
        } catch (error) {
            console.error('Error en createShareLink:', error);
            throw error;
        }
    },

    // Obtener template compartido
    getSharedTemplate: async (token: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get(`/templates/shared/${token}`);
            return response;
        } catch (error) {
            console.error('Error en getSharedTemplate:', error);
            throw error;
        }
    },

    // Templates públicos
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

    // Descargar template público
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