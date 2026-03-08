import type { Template } from '../types/template.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const templateService = {
    // Guardar template (requiere autenticación)
    saveTemplate: async (template: Template, token: string) => {
        try {
            const response = await fetch(`${API_URL}/templates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(template)
            });

            if (!response.ok) throw new Error('Error saving template');

            return await response.json();
        } catch (error) {
            console.error('Error saving template:', error);
            throw error;
        }
    },

    // Obtener templates del usuario
    getUserTemplates: async (token: string) => {
        try {
            const response = await fetch(`${API_URL}/templates/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Error fetching templates');

            return await response.json();
        } catch (error) {
            console.error('Error fetching templates:', error);
            throw error;
        }
    },

    // Enviar template por email
    sendTemplateByEmail: async (template: Template, email: string) => {
        try {
            const response = await fetch(`${API_URL}/templates/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ template, email })
            });

            if (!response.ok) throw new Error('Error sending template');

            return await response.json();
        } catch (error) {
            console.error('Error sending template:', error);
            throw error;
        }
    },

    // Cargar template por ID
    loadTemplate: async (id: string, token?: string) => {
        try {
            const headers: HeadersInit = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_URL}/templates/${id}`, { headers });

            if (!response.ok) throw new Error('Error loading template');

            return await response.json();
        } catch (error) {
            console.error('Error loading template:', error);
            throw error;
        }
    }
};