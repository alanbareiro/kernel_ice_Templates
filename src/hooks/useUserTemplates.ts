// src/hooks/useUserTemplates.ts
import { useEffect, useState } from 'react';
import { templateApi } from '../services/api/templateApi.service';

export const useUserTemplates = (isAuthenticated: boolean, user: any) => {
    const [userTemplate, setUserTemplate] = useState<any>(null);
    const [userTemplatesList, setUserTemplatesList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);


    const saveNewTemplate = async (templateData: any) => {
        setLoading(true);
        try {
            const result = await templateApi.saveTemplate({
                name: templateData.name,
                type: templateData.type.toUpperCase(),
                colors: templateData.colors,
                texts: templateData.texts || {},
                images: templateData.images || {}
            });

            if (result.template) {
                await loadUserTemplates(); // Recargar la lista
                return result.template;
            }
        } catch (error) {
            console.error('Error guardando nuevo template:', error);
        } finally {
            setLoading(false);
        }
        return null;
    };

    const loadUserTemplates = async () => {
        if (!isAuthenticated || !user) {
            setUserTemplate(null);
            setUserTemplatesList([]);
            return;
        }

        setLoading(true);
        try {
            const response = await templateApi.getUserTemplates();
            console.log('📦 Templates cargados desde backend:', response.templates);

            if (response.templates && response.templates.length > 0) {
                setUserTemplatesList(response.templates);
                // Tomar el template más reciente (por fecha de edición)
                const latestTemplate = response.templates.sort((a: any, b: any) =>
                    new Date(b.lastEdited || b.updatedAt).getTime() - new Date(a.lastEdited || a.updatedAt).getTime()
                )[0];
                setUserTemplate(latestTemplate);
                console.log('📌 Template principal actualizado:', latestTemplate);
                console.log('🎨 Colores del template principal:', latestTemplate.colors);
            } else {
                setUserTemplate(null);
                setUserTemplatesList([]);
            }
        } catch (error) {
            console.error('Error cargando templates:', error);
            setUserTemplate(null);
            setUserTemplatesList([]);
        } finally {
            setLoading(false);
        }
    };

    const reloadUserTemplates = async () => {
        console.log('🔄 Recargando templates del usuario...');
        await loadUserTemplates();
    };

    const loadTemplateForEdit = async (templateId: string) => {
        setLoading(true);
        try {
            console.log('📥 Cargando template para editar, ID:', templateId);
            const response = await templateApi.getTemplate(templateId);
            console.log('📦 Template recibido del backend:', response.template);

            if (response.template) {
                // ✅ IMPORTANTE: Mantener los colores y textos exactamente como vienen del backend
                const templateData = {
                    id: response.template.id,
                    name: response.template.name,
                    type: response.template.type?.toLowerCase() || 'consulting',
                    colors: response.template.colors,
                    texts: response.template.texts || {},
                    images: response.template.images || {},
                    createdAt: new Date(response.template.createdAt),
                    updatedAt: new Date(response.template.updatedAt),
                    version: response.template.version || 1
                };
                console.log('✅ Template preparado para editar:', templateData);
                console.log('🎨 Colores del template para editar:', templateData.colors);
                return templateData;
            }
        } catch (error) {
            console.error('Error cargando template para editar:', error);
        } finally {
            setLoading(false);
        }
        return null;
    };

    useEffect(() => {
        loadUserTemplates();
    }, [isAuthenticated, user]);

    // Escuchar evento de template guardado para recargar inmediatamente
    useEffect(() => {
        const handleTemplateSaved = async (event: Event) => {
            const customEvent = event as CustomEvent;
            console.log('📢 Evento template-saved recibido:', customEvent.detail);
            // ✅ Recargar templates después de guardar
            await loadUserTemplates();
        };

        window.addEventListener('template-saved', handleTemplateSaved);
        return () => window.removeEventListener('template-saved', handleTemplateSaved);
    }, []);

    return {
        userTemplate,
        userTemplatesList,
        loading,
        loadUserTemplates,
        reloadUserTemplates,
        loadTemplateForEdit,
        saveNewTemplate
    };
};