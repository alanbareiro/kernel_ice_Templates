// src/contexts/TemplateContext.tsx - VERSIÓN CORREGIDA
import React, { createContext, useContext, useState } from 'react';
import { getDefaultTemplateColors } from '../data/types/templateDefaultColors';
import { templateApi } from '../services/api/templateApi.service';
import { storageService } from '../services/storageService';
import type {
    ButtonConfig,
    EditorConfig,
    SectionColors,
    Template,
    TemplateColors,
    TypographyConfig,
    UIConfig
} from '../types/template.types';
import {
    colorPresets,
    defaultButtons,
    defaultSectionColors,
    defaultTypography,
    defaultUI
} from '../types/template.types';
import { useAuth } from './AuthContext';

interface TemplateContextType {
    template: Template | null;
    setTemplate: (template: Template) => void;
    updateColors: (colors: Partial<TemplateColors>) => void;
    updateSectionColors: (colors: Partial<SectionColors>) => void;
    updateTypography: (typography: Partial<TypographyConfig>) => void;
    updateUI: (ui: Partial<UIConfig>) => void;
    updateButtons: (buttons: Partial<ButtonConfig>) => void;
    updateText: (key: string, value: string) => void;
    updateImage: (key: string, file: File) => Promise<void>;
    resetTemplate: (type: string) => void;
    applyPreset: (presetName: string) => void;
    saveDraft: () => void;
    loadDraft: () => void;
    exportTemplate: () => void;
    saveToBackend: () => Promise<any>;
    loadFromBackend: (templateId: string) => Promise<void>;
    getUserTemplates: () => Promise<any>;
    hasUnsavedChanges: boolean;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    editorConfig: EditorConfig;
    setEditorConfig: (config: Partial<EditorConfig>) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    const [template, setTemplateState] = useState<Template | null>(null);
    const [history, setHistory] = useState<Template[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [editorConfig, setEditorConfigState] = useState<EditorConfig>({
        isEditing: false,
        selectedElement: null,
        showEditor: true,
        notifications: null
    });

    const setTemplate = (newTemplate: Template) => {
        setTemplateState(newTemplate);
        setHistory([newTemplate]);
        setHistoryIndex(0);
        setHasUnsavedChanges(false);
    };

    const addToHistory = (newTemplate: Template) => {
        setHistory(prev => [...prev.slice(0, historyIndex + 1), newTemplate]);
        setHistoryIndex(prev => prev + 1);
    };

    // Actualizar colores básicos (mantener para compatibilidad)
    const updateColors = (colors: Partial<TemplateColors>) => {
        if (!template) return;

        const updatedTemplate = {
            ...template,
            colors: { ...template.colors, ...colors },
            updatedAt: new Date()
        };

        setTemplateState(updatedTemplate);
        addToHistory(updatedTemplate);
        setHasUnsavedChanges(true);
    };

    // Actualizar colores por sección
    const updateSectionColors = (colors: Partial<SectionColors>) => {
        if (!template) return;

        const updatedTemplate = {
            ...template,
            sectionColors: { ...template.sectionColors, ...colors },
            updatedAt: new Date()
        };

        setTemplateState(updatedTemplate);
        addToHistory(updatedTemplate);
        setHasUnsavedChanges(true);
    };

    // Actualizar tipografía
    const updateTypography = (typography: Partial<TypographyConfig>) => {
        if (!template) return;

        const updatedTemplate = {
            ...template,
            typography: { ...template.typography, ...typography },
            updatedAt: new Date()
        };

        setTemplateState(updatedTemplate);
        addToHistory(updatedTemplate);
        setHasUnsavedChanges(true);
    };

    // Actualizar configuración de UI
    const updateUI = (ui: Partial<UIConfig>) => {
        if (!template) return;

        const updatedTemplate = {
            ...template,
            ui: { ...template.ui, ...ui },
            updatedAt: new Date()
        };

        setTemplateState(updatedTemplate);
        addToHistory(updatedTemplate);
        setHasUnsavedChanges(true);
    };

    // Actualizar configuración de botones
    const updateButtons = (buttons: Partial<ButtonConfig>) => {
        if (!template) return;

        const updatedTemplate = {
            ...template,
            buttons: { ...template.buttons, ...buttons },
            updatedAt: new Date()
        };

        setTemplateState(updatedTemplate);
        addToHistory(updatedTemplate);
        setHasUnsavedChanges(true);
    };

    const updateText = (key: string, value: string) => {
        if (!template) return;

        const updatedTemplate = {
            ...template,
            texts: { ...template.texts, [key]: value },
            updatedAt: new Date()
        };

        setTemplateState(updatedTemplate);
        addToHistory(updatedTemplate);
        setHasUnsavedChanges(true);
    };

    const updateImage = async (key: string, file: File) => {
        if (!template) return;

        return new Promise<void>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedTemplate = {
                    ...template,
                    images: { ...template.images, [key]: reader.result as string },
                    updatedAt: new Date()
                };

                setTemplateState(updatedTemplate);
                addToHistory(updatedTemplate);
                setHasUnsavedChanges(true);
                resolve();
            };
            reader.readAsDataURL(file);
        });
    };

    // Reset template con la nueva estructura
    const resetTemplate = (type: string) => {
        const defaultColors = getDefaultTemplateColors(type);

        const newTemplate: Template = {
            id: Date.now().toString(),
            name: `Mi ${type} template`,
            type: type as any,
            colors: defaultColors,
            sectionColors: defaultSectionColors,
            typography: defaultTypography,
            ui: defaultUI,
            buttons: defaultButtons,
            texts: {},
            images: {},
            createdAt: new Date(),
            updatedAt: new Date(),
            version: 1
        };

        setTemplateState(newTemplate);
        setHistory([newTemplate]);
        setHistoryIndex(0);
        setHasUnsavedChanges(true);
    };

    const applyPreset = (presetName: string) => {
        if (!template) return;

        const categoryPresets = colorPresets[template.type as keyof typeof colorPresets];
        const preset = categoryPresets?.find(p => p.name === presetName);

        if (preset) {
            // Actualizar colores básicos
            updateColors(preset.colors);
            // También actualizar sectionColors basado en los nuevos colores
            updateSectionColors({
                buttonPrimaryBackground: preset.colors.primary,
                heroTitleColor: preset.colors.text,
                headerTextColor: preset.colors.text,
                bodyTextColor: preset.colors.text,
                heroBadgeBackground: preset.colors.primary,
            });
        }
    };

    const saveDraft = () => {
        if (template) {
            storageService.saveDraft(template);
            setHasUnsavedChanges(false);

            window.dispatchEvent(new CustomEvent('template-saved', {
                detail: {
                    message: 'Borrador guardado',
                    type: 'success',
                    template: template
                }
            }));

            setEditorConfig({
                notifications: {
                    show: true,
                    message: 'Borrador guardado',
                    type: 'success'
                }
            });
        }
    };

    const loadDraft = () => {
        const draft = storageService.loadDraft();
        if (draft) {
            setTemplateState(draft);
            addToHistory(draft);
        }
    };

    const exportTemplate = () => {
        if (!template) return;

        const dataStr = JSON.stringify(template, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = `template-${template.type}-${Date.now()}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    // const saveToBackend = async () => {
    //     if (!template || !isAuthenticated) return;

    //     try {
    //         const typeUpper = template.type.toUpperCase();

    //         const result = await templateApi.saveTemplate({
    //             name: template.name,
    //             type: typeUpper,
    //             colors: template.colors,
    //             sectionColors: template.sectionColors,
    //             typography: template.typography,
    //             ui: template.ui,
    //             buttons: template.buttons,
    //             texts: template.texts || {},
    //             images: template.images || {}
    //         });

    //         if (result.template?.id) {
    //             const updatedTemplate = {
    //                 ...template,
    //                 id: result.template.id,
    //                 updatedAt: new Date()
    //             };
    //             setTemplateState(updatedTemplate);

    //             window.dispatchEvent(new CustomEvent('template-saved', {
    //                 detail: {
    //                     templateId: result.template.id,
    //                     success: true,
    //                     template: updatedTemplate
    //                 }
    //             }));
    //         }

    //         return result;
    //     } catch (error) {
    //         console.error('Error guardando template:', error);
    //     }
    // };

    // const saveToBackend = async () => {
    //     if (!template || !isAuthenticated) return;

    //     try {
    //         const typeUpper = template.type.toUpperCase();

    //         // CORREGIDO: Convertir TemplateColors a Record<string, string>
    //         const colorsToSend: Record<string, string> = {
    //             primary: template.colors.primary,
    //             secondary: template.colors.secondary,
    //             accent: template.colors.accent,
    //             background: template.colors.background,
    //             text: template.colors.text,
    //         };

    //         const result = await templateApi.saveTemplate({
    //             name: template.name,
    //             type: typeUpper,
    //             colors: colorsToSend,  // Ahora es Record<string, string>
    //             sectionColors: template.sectionColors as Record<string, string>,
    //             typography: template.typography as Record<string, string>,
    //             ui: template.ui as Record<string, any>,
    //             buttons: template.buttons as Record<string, any>,
    //             texts: template.texts || {},
    //             images: template.images || {}
    //         });

    //         if (result.template?.id) {
    //             const updatedTemplate = {
    //                 ...template,
    //                 id: result.template.id,
    //                 updatedAt: new Date()
    //             };
    //             setTemplateState(updatedTemplate);

    //             window.dispatchEvent(new CustomEvent('template-saved', {
    //                 detail: {
    //                     templateId: result.template.id,
    //                     success: true,
    //                     template: updatedTemplate
    //                 }
    //             }));
    //         }

    //         return result;
    //     } catch (error) {
    //         console.error('Error guardando template:', error);
    //     }
    // };

    // src/contexts/TemplateContext.tsx - SOLO la parte de saveToBackend modificada

    const saveToBackend = async () => {
        if (!template || !isAuthenticated) return;

        try {
            const typeUpper = template.type.toUpperCase();

            // Convertir TemplateColors a Record<string, string>
            const colorsToSend: Record<string, string> = {
                primary: template.colors.primary,
                secondary: template.colors.secondary,
                accent: template.colors.accent,
                background: template.colors.background,
                text: template.colors.text,
            };

            // Usar 'as any' para evitar el error de TypeScript temporalmente
            const result = await templateApi.saveTemplate({
                name: template.name,
                type: typeUpper,
                colors: colorsToSend,
                sectionColors: template.sectionColors,
                typography: template.typography,
                ui: template.ui,
                buttons: template.buttons,
                texts: template.texts || {},
                images: template.images || {}
            } as any);

            if (result.template?.id) {
                const updatedTemplate = {
                    ...template,
                    id: result.template.id,
                    updatedAt: new Date()
                };
                setTemplateState(updatedTemplate);

                window.dispatchEvent(new CustomEvent('template-saved', {
                    detail: {
                        templateId: result.template.id,
                        success: true,
                        template: updatedTemplate
                    }
                }));
            }

            return result;
        } catch (error) {
            console.error('Error guardando template:', error);
        }
    };

    const loadFromBackend = async (templateId: string) => {
        if (!isAuthenticated) return;

        try {
            const result = await templateApi.getTemplate(templateId);
            if (result.template) {
                const templateData: Template = {
                    id: result.template.id,
                    name: result.template.name,
                    type: result.template.type.toLowerCase(),
                    colors: result.template.colors || getDefaultTemplateColors(result.template.type.toLowerCase()),
                    sectionColors: result.template.sectionColors || defaultSectionColors,
                    typography: result.template.typography || defaultTypography,
                    ui: result.template.ui || defaultUI,
                    buttons: result.template.buttons || defaultButtons,
                    texts: result.template.texts || {},
                    images: result.template.images || {},
                    createdAt: new Date(result.template.createdAt),
                    updatedAt: new Date(result.template.updatedAt),
                    version: result.template.version || 1
                };
                setTemplateState(templateData);
                addToHistory(templateData);
            }
        } catch (error) {
            console.error('Error cargando template:', error);
        }
    };

    const getUserTemplates = async () => {
        if (!isAuthenticated) return [];
        try {
            const result = await templateApi.getUserTemplates();
            return result.templates || [];
        } catch (error) {
            console.error('Error obteniendo templates:', error);
            return [];
        }
    };

    const undo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(prev => prev - 1);
            setTemplateState(history[historyIndex - 1]);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(prev => prev + 1);
            setTemplateState(history[historyIndex + 1]);
        }
    };

    const setEditorConfig = (config: Partial<EditorConfig>) => {
        setEditorConfigState(prev => ({ ...prev, ...config }));
    };

    return (
        <TemplateContext.Provider value={{
            template,
            setTemplate,
            updateColors,
            updateSectionColors,
            updateTypography,
            updateUI,
            updateButtons,
            updateText,
            updateImage,
            resetTemplate,
            applyPreset,
            saveDraft,
            loadDraft,
            exportTemplate,
            saveToBackend,
            loadFromBackend,
            getUserTemplates,
            hasUnsavedChanges,
            undo,
            redo,
            canUndo: historyIndex > 0,
            canRedo: historyIndex < history.length - 1,
            editorConfig,
            setEditorConfig
        }}>
            {children}
        </TemplateContext.Provider>
    );
};

export const useTemplate = () => {
    const context = useContext(TemplateContext);
    if (!context) {
        throw new Error('useTemplate must be used within TemplateProvider');
    }
    return context;
};