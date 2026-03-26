// src/contexts/TemplateContext.tsx - con logs reducidos
import React, { createContext, useContext, useState } from 'react';
import { getDefaultTemplateColors } from '../data/types/templateDefaultColors';
import { templateApi } from '../services/api/templateApi.service';
import { storageService } from '../services/storageService';
import type { EditorConfig, Template, TemplateColors } from '../types/template.types';
import { colorPresets } from '../types/template.types';
import { useAuth } from './AuthContext';

// Colores por defecto
const defaultColors: Record<string, TemplateColors> = {
    consulting: {
        primary: '#2563eb',
        secondary: '#475569',
        accent: '#1e293b',
        background: '#ffffff',
        text: '#0f172a',
    },
    catering: {
        primary: '#f59e0b',
        secondary: '#ea580c',
        accent: '#b45309',
        background: '#ffffff',
        text: '#422006',
    },
    accounting: {
        primary: '#059669',
        secondary: '#047857',
        accent: '#064e3b',
        background: '#ffffff',
        text: '#022c22',
    },
    restaurant: {
        primary: '#dc2626',
        secondary: '#b91c1c',
        accent: '#7f1d1d',
        background: '#ffffff',
        text: '#450a0a',
    },
};

// const isDev = import.meta.env.DEV;

interface TemplateContextType {
    template: Template | null;
    setTemplate: (template: Template) => void;
    updateColors: (colors: Partial<TemplateColors>) => void;
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

    const updateColors = (colors: Partial<TemplateColors>) => {
        if (!template) return;

        const validColors: Partial<TemplateColors> = {};

        (Object.keys(colors) as Array<keyof TemplateColors>).forEach(key => {
            const value = colors[key];
            if (value !== undefined) {
                validColors[key] = value;
            }
        });

        const updatedTemplate = {
            ...template,
            colors: { ...template.colors, ...validColors },
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

    // En resetTemplate, usar getDefaultTemplateColors
    const resetTemplate = (type: string) => {
        const defaultColors = getDefaultTemplateColors(type);
        const newTemplate: Template = {
            id: Date.now().toString(),
            name: `Mi ${type} template`,
            type: type as any,
            colors: defaultColors,
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
    }

    const applyPreset = (presetName: string) => {
        if (!template) return;

        const categoryPresets = colorPresets[template.type as keyof typeof colorPresets];
        const preset = categoryPresets?.find(p => p.name === presetName);

        if (preset) {
            updateColors(preset.colors);
        }
    };

    const saveDraft = () => {
        if (template) {
            storageService.saveDraft(template);
            setHasUnsavedChanges(false);

            // ✅ Disparar evento para notificar que se guardó el borrador
            window.dispatchEvent(new CustomEvent('template-saved', {
                detail: {
                    message: 'Borrador guardado',
                    type: 'success',
                    template: template
                }
            }));

            // Notificación visual
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

    const saveToBackend = async () => {
        if (!template || !isAuthenticated) return;

        try {
            const typeUpper = template.type.toUpperCase();

            const colorsToSend: Record<string, string> = {
                primary: template.colors.primary || '#2563eb',
                secondary: template.colors.secondary || '#475569',
                accent: template.colors.accent || '#1e293b',
                background: template.colors.background || '#ffffff',
                text: template.colors.text || '#0f172a'
            };

            Object.entries(template.colors).forEach(([key, value]) => {
                if (!colorsToSend[key]) {
                    colorsToSend[key] = value;
                }
            });

            const result = await templateApi.saveTemplate({
                name: template.name,
                type: typeUpper,
                colors: colorsToSend,
                texts: template.texts || {},
                images: template.images || {}
            });

            if (result.template?.id) {
                const updatedTemplate = {
                    ...template,
                    id: result.template.id,
                    updatedAt: new Date()
                };
                setTemplateState(updatedTemplate);

                // ✅ Disparar evento con los datos actualizados del template
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
                const templateData = {
                    id: result.template.id,
                    name: result.template.name,
                    type: result.template.type.toLowerCase(),
                    colors: result.template.colors,
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