// src/layouts/EditorLayout.tsx
import { useEffect, useRef } from 'react';
import { TemplateProvider, useTemplate } from '../contexts/TemplateContext';
import { TemplateEditorProvider } from '../contexts/TemplateEditorContext';

interface EditorLayoutProps {
    templateData: any;
    onClose: () => void;
    children: React.ReactNode;
    isPreview?: boolean;
}

// Componente interno que usa el contexto (se monta DENTRO del provider)
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
            console.log('🔄 Template diferente, actualizando:', templateData.id);
            setTemplate(templateData);
            lastTemplateId.current = templateData.id;
        }
    }, [templateData, setTemplate]);

    return <>{children}</>;
};

// Layout principal: provee el contexto y luego renderiza el contenido
export const EditorLayout = ({ templateData, onClose, children, isPreview = false }: EditorLayoutProps) => {
    if (!templateData) {
        return <div className="min-h-screen flex items-center justify-center">Cargando editor...</div>;
    }

    console.log(onClose);
    console.log(isPreview);

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