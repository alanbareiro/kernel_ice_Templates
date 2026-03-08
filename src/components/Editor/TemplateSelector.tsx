import React from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

interface TemplateSelectorProps {
    onSelect: () => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
    const { template, resetTemplate } = useTemplate();
    const { toggleEditing } = useTemplateEditor();

    const templates = [
        { id: 'consulting', name: 'Consultoría', icon: '📊', color: 'blue' },
        { id: 'catering', name: 'Catering', icon: '🍽️', color: 'amber' },
        { id: 'accounting', name: 'Contaduría', icon: '🧾', color: 'emerald' },
        { id: 'restaurant', name: 'Restaurant', icon: '🍝', color: 'red' },
    ];

    const handleSelectTemplate = (templateId: string) => {
        resetTemplate(templateId);
        onSelect();
        // Activar modo edición automáticamente
        setTimeout(() => toggleEditing(), 100);
    };

    return (
        <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Seleccionar Template</h3>
            <div className="grid grid-cols-2 gap-3">
                {templates.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => handleSelectTemplate(t.id)}
                        className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${template?.type === t.id
                                ? `border-${t.color}-500 bg-${t.color}-50 dark:bg-${t.color}-900/30`
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                            }`}
                    >
                        <div className="text-3xl mb-2">{t.icon}</div>
                        <div className="font-medium">{t.name}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TemplateSelector;