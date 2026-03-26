// src/components/Editor/ColorPicker.tsx - Versión compacta
import { Check, Copy, RefreshCw } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';
import type { TemplateColors } from '../../types/template.types';

type ColorKey = keyof TemplateColors;

interface ColorPickerProps {
    colorKey: ColorKey;
    label: string;
    defaultColor: string;
    compact?: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
    colorKey,
    label,
    defaultColor,
    compact = false
}) => {
    const { template, updateColors } = useTemplate();
    const { config } = useTemplateEditor();
    const [copied, setCopied] = useState(false);
    const [localColor, setLocalColor] = useState<string>(defaultColor);
    let timeoutId: ReturnType<typeof setTimeout>;

    // Actualizar color local cuando cambia el template
    useEffect(() => {
        const currentColor = template?.colors?.[colorKey] || defaultColor;
        setLocalColor(currentColor);
    }, [template, colorKey, defaultColor]);

    if (!config.isEditing) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(localColor);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleColorChange = (newColor: string) => {
        setLocalColor(newColor);

        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            updateColors({ [colorKey]: newColor } as Partial<TemplateColors>);
        }, 150);
    };

    const handleReset = () => {
        handleColorChange(defaultColor);
    };

    if (compact) {
        return (
            <div className="flex items-center justify-between py-1">
                <label className="text-[10px] font-medium text-gray-600 dark:text-gray-400 w-16">
                    {label}
                </label>
                <div className="flex items-center gap-1.5">
                    <input
                        type="color"
                        value={localColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                    />
                    <input
                        type="text"
                        value={localColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-20 px-1.5 py-0.5 text-[10px] border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-neutral-800 font-mono"
                        pattern="^#[0-9A-Fa-f]{6}$"
                    />
                    <button
                        onClick={handleCopy}
                        className="p-0.5 text-gray-500 hover:text-gray-700 transition-colors"
                        title="Copiar color"
                    >
                        {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                    <button
                        onClick={handleReset}
                        className="p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Restablecer"
                    >
                        <RefreshCw className="w-3 h-3" />
                    </button>
                </div>
            </div>
        );
    }

    // Versión normal (más grande) - mantén el original si es necesario
    return (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg">
            <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </label>
                <button
                    onClick={handleReset}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center"
                >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Reset
                </button>
            </div>
            <div className="flex items-center space-x-2">
                <input
                    type="color"
                    value={localColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                />
                <input
                    type="text"
                    value={localColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:text-white font-mono text-sm"
                />
                <button
                    onClick={handleCopy}
                    className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors bg-white dark:bg-neutral-900 rounded-md border border-gray-300 dark:border-gray-600"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
};

export default ColorPicker;