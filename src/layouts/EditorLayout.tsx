// src/layouts/EditorLayout.tsx
import { useEffect, useRef } from 'react';
// import EditorDashboard from '../components/Editor/EditorDashboard';
import { TemplateProvider, useTemplate } from '../contexts/TemplateContext';
import { TemplateEditorProvider } from '../contexts/TemplateEditorContext';

interface EditorLayoutProps {
    templateData: any;
    onClose: () => void;
    children: React.ReactNode;
    isPreview?: boolean;
}

// Componente interno que usa el contexto
const EditorContent = ({ templateData, children }: { templateData: any; onClose: () => void; children: React.ReactNode; isPreview?: boolean }) => {
    const { setTemplate/*, template*/ } = useTemplate();
    const initialized = useRef(false);
    const lastTemplateId = useRef<string | null>(null);

    // Solo inicializar una vez cuando se monta el componente
    useEffect(() => {
        if (templateData && !initialized.current) {
            console.log('🔄 Inicializando template en el editor (una sola vez):', templateData.id);
            setTemplate(templateData);
            initialized.current = true;
            lastTemplateId.current = templateData.id;
        }
    }, [templateData, setTemplate]);

    // Solo actualizar si el ID del template cambió
    useEffect(() => {
        if (templateData && initialized.current && lastTemplateId.current !== templateData.id) {
            console.log('🔄 Template diferente detectado, actualizando:', templateData.id);
            setTemplate(templateData);
            lastTemplateId.current = templateData.id;
        }
    }, [templateData, setTemplate]);

    return (
        <>
            {children}
            {/* En modo preview, no mostrar el dashboard de edición */}
            {/* {!isPreview && <EditorDashboard onHomeClick={onClose} />} */}
        </>
    );
};

export const EditorLayout = ({ templateData, onClose, children, isPreview = false }: EditorLayoutProps) => {
    // Si no hay templateData, no renderizar
    if (!templateData) {
        return <div className="min-h-screen flex items-center justify-center">Cargando editor...</div>;
    }

    return (
        <TemplateProvider>
            <TemplateEditorProvider>
                <EditorContent templateData={templateData} onClose={onClose} isPreview={isPreview}>
                    {children}
                </EditorContent>
            </TemplateEditorProvider>
        </TemplateProvider>
    );
};