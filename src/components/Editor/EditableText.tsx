// src/components/common/EditableText.tsx
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
  const { template, updateText, /*hasUnsavedChanges, saveDraft*/ } = useTemplate();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(defaultText);
  const [tempText, setTempText] = useState(defaultText);
  const [hasLocalChanges, setHasLocalChanges] = useState(false);
  const [inputWidth, setInputWidth] = useState(200);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  // Cargar texto guardado del contexto
  useEffect(() => {
    const savedText = template?.texts?.[elementId];
    if (savedText) {
      setText(savedText);
      setTempText(savedText);
    } else {
      setText(defaultText);
      setTempText(defaultText);
    }
    setHasLocalChanges(false);
  }, [template, elementId, defaultText]);

  // Medir ancho del texto
  useEffect(() => {
    if (isEditing && measureRef.current) {
      const width = measureRef.current.offsetWidth + 32;
      setInputWidth(Math.max(width, 250));
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
      setHasLocalChanges(false);
    }
  };

  const handleSave = () => {
    const newText = tempText.trim();
    if (newText !== '') {
      setText(newText);
      updateText(elementId, newText);
      setHasLocalChanges(false);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempText(text);
    setIsEditing(false);
    setHasLocalChanges(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, maxLength);
    setTempText(newValue);
    setHasLocalChanges(newValue !== text);
  };

  // Modo edición (inactivo pero seleccionable)
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
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
          <Edit2 className="w-3 h-3 inline mr-1" />
          Click para editar
        </span>
      </Tag>
    );
  }

  // Modo edición activo
  if (isEditing) {
    return (
      <span className="relative inline-block">
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
          onChange={handleInputChange}
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
            text-gray-900 dark:text-gray-100
            ${className}
          `}
          style={{ width: inputWidth }}
        />

        <div className="absolute -bottom-12 left-0 flex items-center space-x-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-200 p-1.5 z-20">
          <div className="text-xs text-gray-500 px-2">
            {tempText.length}/{maxLength}
          </div>
          {hasLocalChanges && (
            <div className="text-xs text-yellow-500 flex items-center gap-1 px-1">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              Sin guardar
            </div>
          )}
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

        <div className="absolute -top-2 left-4 w-4 h-4 bg-blue-500 rotate-45 transform origin-center z-0"></div>
      </span>
    );
  }

  // Modo normal
  return <Tag className={className}>{text}</Tag>;
};

export default EditableText;