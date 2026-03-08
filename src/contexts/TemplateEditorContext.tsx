import React, { createContext, useContext, useState } from 'react';
import type { EditorConfig } from '../types/template.types';

interface TemplateEditorContextType {
    config: EditorConfig;
    toggleEditing: () => void;
    selectElement: (elementId: string | null) => void;
    toggleEditor: () => void;
    setConfig: (config: Partial<EditorConfig>) => void;
}

const TemplateEditorContext = createContext<TemplateEditorContextType | undefined>(undefined);

export const TemplateEditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<EditorConfig>({
        isEditing: false,
        selectedElement: null,
        showEditor: true,
        notifications: null  // <-- Agregar esta línea
    });

    const toggleEditing = () => {
        setConfig(prev => ({ ...prev, isEditing: !prev.isEditing }));
    };

    const selectElement = (elementId: string | null) => {
        setConfig(prev => ({ ...prev, selectedElement: elementId }));
    };

    const toggleEditor = () => {
        setConfig(prev => ({ ...prev, showEditor: !prev.showEditor }));
    };

    const updateConfig = (newConfig: Partial<EditorConfig>) => {
        setConfig(prev => ({ ...prev, ...newConfig }));
    };

    return (
        <TemplateEditorContext.Provider value={{
            config,
            toggleEditing,
            selectElement,
            toggleEditor,
            setConfig: updateConfig
        }}>
            {children}
        </TemplateEditorContext.Provider>
    );
};

export const useTemplateEditor = () => {
    const context = useContext(TemplateEditorContext);
    if (!context) {
        throw new Error('useTemplateEditor must be used within TemplateEditorProvider');
    }
    return context;
};