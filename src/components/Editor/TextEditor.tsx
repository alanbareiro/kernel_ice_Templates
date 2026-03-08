import { RotateCcw, Save } from 'lucide-react';
import React, { useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

interface TextEditorProps {
    elementId: string;
    currentText: string;
    onClose: () => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ elementId, currentText, onClose }) => {
    const { updateText } = useTemplate();
    const { config } = useTemplateEditor();
    const [text, setText] = useState(currentText);

    const handleSave = () => {
        if (text.trim()) {
            updateText(elementId, text);
        }
        onClose();
    };

    if (!config.isEditing) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70]">
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 max-w-md w-full shadow-2xl">
                <h3 className="text-lg font-bold mb-4">Editar texto</h3>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800"
                    rows={4}
                    autoFocus
                />
                <div className="flex space-x-3">
                    <button
                        onClick={handleSave}
                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Guardar
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextEditor;