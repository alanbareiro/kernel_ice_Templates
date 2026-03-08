import React, { createContext, useContext, useEffect, useState } from 'react';
import { storageService } from '../services/storageService';
import type { EditorConfig, Template, TemplateColors } from '../types/template.types';
import { colorPresets } from '../types/template.types';
import { templateApi } from '../services/api/templateApi.service';
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
    saveToBackend: () => Promise<any>; // Nueva función
    loadFromBackend: (templateId: string) => Promise<void>; // Cargar template específico
    getUserTemplates: () => Promise<any>; // Obtener templates del usuario
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
    
    const [template, setTemplate] = useState<Template | null>(() => {
        // Intentar cargar del localStorage primero
        const draft = storageService.loadDraft();
        if (draft) return draft;

        // Si no hay draft, crear un template por defecto de consultoría
        return {
            id: Date.now().toString(),
            name: 'Mi template de consultoría',
            type: 'consulting',
            colors: defaultColors.consulting,
            texts: {},
            images: {},
            createdAt: new Date(),
            updatedAt: new Date(),
            version: 1
        };
    });
    
    const [history, setHistory] = useState<Template[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [autoSaveTimeout, setAutoSaveTimeout] = useState<ReturnType<typeof setTimeout>>();
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [editorConfig, setEditorConfigState] = useState<EditorConfig>({
        isEditing: false,
        selectedElement: null,
        showEditor: true,
        notifications: null
    });

    // Cargar borrador al iniciar
    useEffect(() => {
        const draft = storageService.loadDraft();
        if (draft) {
            setTemplate(draft);
            addToHistory(draft);
        }
    }, []);

    // Escuchar eventos de guardado
    useEffect(() => {
        const handleSaveEvent = (event: CustomEvent) => {
            showNotification(event.detail.message, event.detail.type);
        };

        window.addEventListener('template-saved', handleSaveEvent as EventListener);

        return () => {
            window.removeEventListener('template-saved', handleSaveEvent as EventListener);
        };
    }, []);

    // Auto-guardado mejorado
    useEffect(() => {
        if (template && hasUnsavedChanges) {
            if (autoSaveTimeout) clearTimeout(autoSaveTimeout);

            const timeout = setTimeout(() => {
                storageService.saveAutoSave(template);
                setHasUnsavedChanges(false);
                showNotification('Cambios guardados automáticamente', 'success');
            }, 3000);

            setAutoSaveTimeout(timeout);
        }

        return () => {
            if (autoSaveTimeout) {
                clearTimeout(autoSaveTimeout);
            }
        };
    }, [template, hasUnsavedChanges]);

    const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
        setEditorConfigState(prev => ({
            ...prev,
            notifications: { show: true, message, type }
        }));

        setTimeout(() => {
            setEditorConfigState(prev => ({
                ...prev,
                notifications: null
            }));
        }, 3000);
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

        setTemplate(updatedTemplate);
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

        setTemplate(updatedTemplate);
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

                setTemplate(updatedTemplate);
                addToHistory(updatedTemplate);
                setHasUnsavedChanges(true);
                showNotification('Imagen actualizada', 'success');
                resolve();
            };
            reader.readAsDataURL(file);
        });
    };

    const resetTemplate = (type: string) => {
        const newTemplate: Template = {
            id: Date.now().toString(),
            name: `Mi ${type} template`,
            type: type as any,
            colors: defaultColors[type] || defaultColors.consulting,
            texts: {},
            images: {},
            createdAt: new Date(),
            updatedAt: new Date(),
            version: 1
        };

        setTemplate(newTemplate);
        setHistory([newTemplate]);
        setHistoryIndex(0);
        setHasUnsavedChanges(true);
        showNotification('Template restablecido', 'info');
    };

    const applyPreset = (presetName: string) => {
        if (!template) return;

        const categoryPresets = colorPresets[template.type as keyof typeof colorPresets];
        const preset = categoryPresets?.find(p => p.name === presetName);

        if (preset) {
            updateColors(preset.colors);
            showNotification(`Preset "${presetName}" aplicado`, 'success');
        } else {
            showNotification(`Preset "${presetName}" no encontrado`, 'warning');
        }
    };

    const saveDraft = () => {
        if (template) {
            storageService.saveDraft(template);
            setHasUnsavedChanges(false);
            showNotification('Borrador guardado', 'success');
        }
    };

    const loadDraft = () => {
        const draft = storageService.loadDraft();
        if (draft) {
            setTemplate(draft);
            addToHistory(draft);
            showNotification('Borrador cargado', 'success');
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

        showNotification('Template exportado', 'success');
    };

    // NUEVAS FUNCIONES PARA BACKEND
    const saveToBackend = async () => {
        if (!template) {
            showNotification('No hay template para guardar', 'warning');
            return;
        }

        if (!isAuthenticated) {
            showNotification('Debes iniciar sesión para guardar en tu cuenta', 'warning');
            return;
        }

        try {
            const result : any = await templateApi.saveTemplate({
                name: template.name,
                type: template.type,
                colors: /*template.colors ??*/ '',
                texts: template.texts,
                images: template.images
            });

            showNotification('Template guardado en tu cuenta', 'success');
            
            // Actualizar el ID del template con el devuelto por el backend
            if (result.template?.id) {
                setTemplate({
                    ...template,
                    id: result.template.id
                });
            }
            
            return result;
        } catch (error) {
            console.error('Error guardando template:', error);
            showNotification('Error al guardar en tu cuenta', 'error');
        }
    };

    const loadFromBackend = async (templateId: string) => {
        if (!isAuthenticated) {
            showNotification('Debes iniciar sesión', 'warning');
            return;
        }

        try {
            const result : any = await templateApi.getTemplate(templateId);
            if (result.template) {
                setTemplate(result.template);
                addToHistory(result.template);
                showNotification('Template cargado', 'success');
            }
        } catch (error) {
            console.error('Error cargando template:', error);
            showNotification('Error al cargar el template', 'error');
        }
    };

    const getUserTemplates = async () => {
        if (!isAuthenticated) {
            showNotification('Debes iniciar sesión', 'warning');
            return [];
        }

        try {
            const result : any = await templateApi.getUserTemplates();
            return result.templates || [];
        } catch (error) {
            console.error('Error obteniendo templates:', error);
            showNotification('Error al obtener tus templates', 'error');
            return [];
        }
    };

    const undo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(prev => prev - 1);
            setTemplate(history[historyIndex - 1]);
            showNotification('Deshacer', 'info');
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(prev => prev + 1);
            setTemplate(history[historyIndex + 1]);
            showNotification('Rehacer', 'info');
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