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
    defaultUI,
    fullPresets
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

    // Asegura que sectionColors tenga todas las propiedades
    const ensureCompleteSectionColors = (sectionColors: Partial<SectionColors> | undefined): SectionColors => {
        return {
            ...defaultSectionColors,
            ...(sectionColors || {}),
        };
    };

    const setTemplate = (newTemplate: Template) => {
        const completeTemplate = {
            ...newTemplate,
            sectionColors: ensureCompleteSectionColors(newTemplate.sectionColors),
        };
        setTemplateState(completeTemplate);
        setHistory([completeTemplate]);
        setHistoryIndex(0);
        setHasUnsavedChanges(false);
    };

    const addToHistory = (newTemplate: Template) => {
        setHistory(prev => [...prev.slice(0, historyIndex + 1), newTemplate]);
        setHistoryIndex(prev => prev + 1);
    };

    const updateColors = (colors: Partial<TemplateColors>) => {
        setTemplateState(prev => {
            if (!prev) return prev;
            const updated = {
                ...prev,
                colors: { ...prev.colors, ...colors },
                updatedAt: new Date()
            };
            addToHistory(updated);
            setHasUnsavedChanges(true);
            return updated;
        });
    };

    const updateSectionColors = (colors: Partial<SectionColors>) => {
        console.log('updateSectionColors called with:', colors);
        if (!template) return;
        const updatedTemplate = {
            ...template,
            sectionColors: { ...template.sectionColors, ...colors },
            updatedAt: new Date()
        };
        console.log('new sectionColors:', updatedTemplate.sectionColors);
        setTemplateState(updatedTemplate);
        addToHistory(updatedTemplate);
        setHasUnsavedChanges(true);
    };

    // ✅ CORREGIDA: usa setTemplateState con función para evitar cierres obsoletos
    // const updateSectionColors2 = (colors: Partial<SectionColors>) => {
    //     setTemplateState(prev => {
    //         if (!prev) return prev;
    //         const newSectionColors = {
    //             ...prev.sectionColors,
    //             ...colors,
    //         };
    //         const updated = {
    //             ...prev,
    //             sectionColors: ensureCompleteSectionColors(newSectionColors),
    //             updatedAt: new Date()
    //         };
    //         addToHistory(updated);
    //         setHasUnsavedChanges(true);
    //         return updated;
    //     });
    // };

    const updateTypography = (typography: Partial<TypographyConfig>) => {
        setTemplateState(prev => {
            if (!prev) return prev;
            const updated = {
                ...prev,
                typography: { ...prev.typography, ...typography },
                updatedAt: new Date()
            };
            addToHistory(updated);
            setHasUnsavedChanges(true);
            return updated;
        });
    };

    const updateUI = (ui: Partial<UIConfig>) => {
        setTemplateState(prev => {
            if (!prev) return prev;
            const updated = {
                ...prev,
                ui: { ...prev.ui, ...ui },
                updatedAt: new Date()
            };
            addToHistory(updated);
            setHasUnsavedChanges(true);
            return updated;
        });
    };

    const updateButtons = (buttons: Partial<ButtonConfig>) => {
        setTemplateState(prev => {
            if (!prev) return prev;
            const updated = {
                ...prev,
                buttons: { ...prev.buttons, ...buttons },
                updatedAt: new Date()
            };
            addToHistory(updated);
            setHasUnsavedChanges(true);
            return updated;
        });
    };

    const updateText = (key: string, value: string) => {
        setTemplateState(prev => {
            if (!prev) return prev;
            const updated = {
                ...prev,
                texts: { ...prev.texts, [key]: value },
                updatedAt: new Date()
            };
            addToHistory(updated);
            setHasUnsavedChanges(true);
            return updated;
        });
    };

    const updateImage = async (key: string, file: File) => {
        return new Promise<void>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTemplateState(prev => {
                    if (!prev) return prev;
                    const updated = {
                        ...prev,
                        images: { ...prev.images, [key]: reader.result as string },
                        updatedAt: new Date()
                    };
                    addToHistory(updated);
                    setHasUnsavedChanges(true);
                    return updated;
                });
                resolve();
            };
            reader.readAsDataURL(file);
        });
    };

    const resetTemplate = (type: string) => {
        const defaultColors = getDefaultTemplateColors(type);
        const newTemplate: Template = {
            id: Date.now().toString(),
            name: `Mi ${type} template`,
            type: type as any,
            colors: defaultColors,
            sectionColors: { ...defaultSectionColors },
            typography: { ...defaultTypography },
            ui: { ...defaultUI },
            buttons: { ...defaultButtons },
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
        // Buscar en fullPresets (importado desde types)
        const fullPreset = fullPresets.find(p => p.name === presetName);
        if (fullPreset) {
            // Aplicar colors
            updateColors(fullPreset.colors);
            // Aplicar sectionColors (actualizar parcialmente)
            if (fullPreset.sectionColors) {
                updateSectionColors(fullPreset.sectionColors);
            }
            // Aplicar typography
            if (fullPreset.typography) {
                updateTypography(fullPreset.typography);
            }
            // Aplicar ui
            if (fullPreset.ui) {
                updateUI(fullPreset.ui);
            }
        } else {
            // Fallback a los presets antiguos (solo colors)
            const categoryPresets = colorPresets[template.type as keyof typeof colorPresets];
            const preset = categoryPresets?.find(p => p.name === presetName);
            if (preset) {
                updateColors(preset.colors);
                // También actualizar algunos sectionColors básicos como antes
                updateSectionColors({
                    buttonPrimaryBackground: preset.colors.primary,
                    heroTitleColor: preset.colors.text,
                    headerTextColor: preset.colors.text,
                    bodyTextColor: preset.colors.text,
                    heroBadgeBackground: preset.colors.primary,
                });
            }
        }
    };

    // const applyPreset2 = (presetName: string) => {
    //     if (!template) return;
    //     const categoryPresets = colorPresets[template.type as keyof typeof colorPresets];
    //     const preset = categoryPresets?.find(p => p.name === presetName);
    //     if (preset) {
    //         updateColors(preset.colors);
    //         updateSectionColors({
    //             buttonPrimaryBackground: preset.colors.primary,
    //             heroTitleColor: preset.colors.text,
    //             headerTextColor: preset.colors.text,
    //             bodyTextColor: preset.colors.text,
    //             heroBadgeBackground: preset.colors.primary,
    //         });
    //     }
    // };

    const saveDraft = () => {
        if (template) {
            storageService.saveDraft(template);
            setHasUnsavedChanges(false);
            window.dispatchEvent(new CustomEvent('template-saved', {
                detail: { message: 'Borrador guardado', type: 'success', template }
            }));
            setEditorConfig({
                notifications: { show: true, message: 'Borrador guardado', type: 'success' }
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
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', `template-${template.type}-${Date.now()}.json`);
        linkElement.click();
    };

    const saveToBackend = async () => {
        if (!template || !isAuthenticated) return;
        try {
            const typeUpper = template.type.toUpperCase();
            const colorsToSend: Record<string, string> = {
                primary: template.colors.primary,
                secondary: template.colors.secondary,
                accent: template.colors.accent,
                background: template.colors.background,
                text: template.colors.text,
            };
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
                setTemplateState(prev => prev ? { ...prev, id: result.template.id, updatedAt: new Date() } : prev);
                window.dispatchEvent(new CustomEvent('template-saved', {
                    detail: { templateId: result.template.id, success: true, template: result.template }
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
                    sectionColors: ensureCompleteSectionColors(result.template.sectionColors),
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