import { Check, Edit2, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

interface EditableTextProps {
  elementId: string;
  defaultText: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  placeholder?: string;
  maxLength?: number;
}

const EditableText: React.FC<EditableTextProps> = ({
  elementId,
  defaultText,
  tag: Tag = 'span',
  className = '',
  placeholder = 'Escribe aquí...',
  maxLength = 100
}) => {
  const { config } = useTemplateEditor();
  const { template, updateText } = useTemplate();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(defaultText);
  const [tempText, setTempText] = useState(defaultText);
  const [inputWidth, setInputWidth] = useState(200);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Cargar texto guardado
  useEffect(() => {
    if (template?.texts && template.texts[elementId]) {
      setText(template.texts[elementId]);
    }
  }, [template, elementId]);

  // Medir el ancho del texto para el input
  useEffect(() => {
    if (isEditing && measureRef.current) {
      const width = measureRef.current.offsetWidth + 32; // +32 para padding
      setInputWidth(Math.max(width, 200)); // Mínimo 200px
    }
  }, [tempText, isEditing]);

  // Focus automático al editar
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (config.isEditing) {
      setIsEditing(true);
      setTempText(text);
    }
  };

  const handleSave = () => {
    if (tempText.trim() !== '') {
      setText(tempText);
      updateText(elementId, tempText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempText(text);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

 // Si estamos en modo edición pero no editando este texto
if (config.isEditing && !isEditing) {
    return (
        <Tag
            id={`editable-${elementId}`}
            data-element-id={elementId}
            onClick={handleClick}
            className={`
                relative group cursor-pointer
                hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50 
                hover:bg-blue-50 dark:hover:bg-blue-900/20
                rounded px-1 transition-all
                ${className}
            `}
            title="Click para editar"
        >
            {text}
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                <Edit2 className="w-3 h-3 inline mr-1" />
                Click para editar
            </span>
        </Tag>
    );
}

  // Si estamos editando este texto
  if (isEditing) {
    return (
      <span ref={containerRef} className="relative inline-block">
        {/* Span oculto para medir el texto */}
        <span
          ref={measureRef}
          className="absolute invisible whitespace-nowrap text-lg"
          style={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}
        >
          {tempText || placeholder}
        </span>

        <input
          ref={inputRef}
          type="text"
          value={tempText}
          onChange={(e) => setTempText(e.target.value.slice(0, maxLength))}
          onBlur={handleSave}
          onKeyDown={handleKeyPress}
          maxLength={maxLength}
          placeholder={placeholder}
          className={`
            bg-white dark:bg-neutral-800 
            border-2 border-blue-500 rounded-lg 
            px-3 py-1 
            focus:outline-none 
            shadow-lg
            relative
            z-10
            ${className}
          `}
          style={{ width: inputWidth }}
        />

        {/* Contenedor de botones y contador - AHORA DEBAJO */}
        <div className="absolute -bottom-12 left-0 flex items-center space-x-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-200 p-1.5 z-20">
          {/* Contador de caracteres */}
          <div className="text-xs text-gray-500 px-2">
            {tempText.length}/{maxLength}
          </div>

          {/* Botones */}
          <button
            onClick={handleSave}
            className="p-1.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            title="Guardar (Enter)"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            title="Cancelar (Escape)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Flecha indicadora */}
        <div className="absolute -top-2 left-4 w-4 h-4 bg-blue-500 rotate-45 transform origin-center z-0"></div>
      </span>
    );
  }

  // Modo normal (sin edición)
  return (
    <Tag className={className}>
      {text}
    </Tag>
  );
};

export default EditableText;