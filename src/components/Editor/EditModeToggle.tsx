import { Edit3, Eye } from 'lucide-react';
import React from 'react';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

const EditModeToggle: React.FC = () => {
    const { config, toggleEditing } = useTemplateEditor();

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={toggleEditing}
                className={`group relative flex items-center space-x-3 px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105 ${config.isEditing
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}
            >
                {config.isEditing ? (
                    <>
                        <Eye className="w-5 h-5" />
                        <span className="font-medium">Modo edición activado</span>
                    </>
                ) : (
                    <>
                        <Edit3 className="w-5 h-5" />
                        <span className="font-medium">Activar modo edición</span>
                    </>
                )}

                {/* Tooltip */}
                <span className="absolute -top-10 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {config.isEditing
                        ? 'Hacé clic en cualquier texto para editarlo'
                        : 'Activá para poder modificar los textos'}
                </span>
            </button>
        </div>
    );
};

export default EditModeToggle;