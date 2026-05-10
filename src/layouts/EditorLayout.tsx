// src/layouts/EditorLayout.tsx
import React, { useEffect, useRef } from 'react';
import { TemplateProvider, useTemplate } from '../contexts/TemplateContext';
import { TemplateEditorProvider } from '../contexts/TemplateEditorContext';

interface EditorLayoutProps {
    templateData: any;
    onClose: () => void;
    children: React.ReactNode;
    isPreview?: boolean; // aunque no se usa aquí, puede mantenerlo por compatibilidad
}

const EditorContent = ({ templateData, children }: { templateData: any; children: React.ReactNode }) => {
    const { setTemplate } = useTemplate();
    const initialized = useRef(false);
    const lastTemplateId = useRef<string | null>(null);

    useEffect(() => {
        if (templateData && !initialized.current) {
            console.log('🔄 Inicializando template en el editor:', templateData.id);
            setTemplate(templateData);
            initialized.current = true;
            lastTemplateId.current = templateData.id;
        } else if (templateData && initialized.current && lastTemplateId.current !== templateData.id) {
            setTemplate(templateData);
            lastTemplateId.current = templateData.id;
        }
    }, [templateData, setTemplate]);

    return <>{children}</>;
};

export const EditorLayout = ({ templateData,/* onClose,*/ children }: EditorLayoutProps) => {
    if (!templateData) {
        return <div className="min-h-screen flex items-center justify-center">Cargando editor...</div>;
    }

    return (
        <TemplateProvider>
            <TemplateEditorProvider>
                <EditorContent templateData={templateData}>
                    {children}
                </EditorContent>
            </TemplateEditorProvider>
        </TemplateProvider>
    );
};