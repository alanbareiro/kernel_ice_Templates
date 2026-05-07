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
                await loadUserTemplates();
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
                const templateData = {
                    id: response.template.id,
                    name: response.template.name,
                    type: response.template.type?.toLowerCase() || 'consulting',
                    colors: response.template.colors,
                    texts: response.template.texts || {},
                    images: response.template.images || {},
                    sectionColors: response.template.sectionColors || {},
                    typography: response.template.typography || {},
                    ui: response.template.ui || {},
                    buttons: response.template.buttons || {},
                    createdAt: new Date(response.template.createdAt),
                    updatedAt: new Date(response.template.updatedAt),
                    version: response.template.version || 1
                };
                console.log('✅ Template preparado para editar:', templateData);
                return templateData;
            }
        } catch (error) {
            console.error('Error cargando template para editar:', error);
        } finally {
            setLoading(false);
        }
        return null;
    };

    // Listener para actualizar localmente sin recargar todo el backend
    useEffect(() => {
        const handleTemplateSaved = (event: Event) => {
            const customEvent = event as CustomEvent;
            const { template, success } = customEvent.detail;
            if (success && template) {
                console.log('📢 Actualizando lista local con template guardado:', template.id);
                setUserTemplatesList(prevList => {
                    const existingIndex = prevList.findIndex(t => t.id === template.id);
                    if (existingIndex >= 0) {
                        const newList = [...prevList];
                        newList[existingIndex] = { ...newList[existingIndex], ...template };
                        return newList;
                    } else {
                        return [template, ...prevList];
                    }
                });
                setUserTemplate((prev: any) => {  // ✅ Tipado explícito
                    if (prev?.id === template.id || !prev) {
                        console.log('📌 Actualizando template principal con datos locales');
                        return { ...template };
                    }
                    return prev;
                });
            }
        };
        window.addEventListener('template-saved', handleTemplateSaved);
        return () => window.removeEventListener('template-saved', handleTemplateSaved);
    }, []);

    useEffect(() => {
        loadUserTemplates();
    }, [isAuthenticated, user]);

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