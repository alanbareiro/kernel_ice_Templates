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
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colorKey, label, defaultColor }) => {
    const { template, updateColors } = useTemplate();
    const { config } = useTemplateEditor();
    const [copied, setCopied] = useState(false);
    const [recentColors, setRecentColors] = useState<string[]>([]);
    const [showRecent, setShowRecent] = useState(false);

    // Cargar colores recientes del localStorage
    useEffect(() => {
        const saved = localStorage.getItem('recent_colors');
        if (saved) {
            setRecentColors(JSON.parse(saved).slice(0, 5));
        }
    }, []);

    if (!config.isEditing) return null;

    const currentColor = template?.colors?.[colorKey] || defaultColor;

    const handleCopy = () => {
        navigator.clipboard.writeText(currentColor);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleColorChange = (newColor: string) => {
        updateColors({ [colorKey]: newColor } as Partial<TemplateColors>);

        // Guardar en colores recientes
        const updated = [newColor, ...recentColors.filter(c => c !== newColor)].slice(0, 5);
        setRecentColors(updated);
        localStorage.setItem('recent_colors', JSON.stringify(updated));
    };

    const handleReset = () => {
        handleColorChange(defaultColor);
    };

    return (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg">
            <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </label>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleReset}
                        className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center"
                        title="Restablecer color por defecto"
                    >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Reset
                    </button>
                    {recentColors.length > 0 && (
                        <button
                            onClick={() => setShowRecent(!showRecent)}
                            className="text-xs text-blue-600 hover:text-blue-700"
                        >
                            Recientes
                        </button>
                    )}
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <div className="relative">
                    <input
                        type="color"
                        value={currentColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                    />
                    <div
                        className="absolute inset-0 w-10 h-10 rounded pointer-events-none border-2 border-white dark:border-gray-800 shadow-inner"
                        style={{ backgroundColor: currentColor }}
                    />
                </div>

                <input
                    type="text"
                    value={currentColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:text-white font-mono text-sm"
                    pattern="^#[0-9A-Fa-f]{6}$"
                    placeholder="#000000"
                />

                <button
                    onClick={handleCopy}
                    className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors bg-white dark:bg-neutral-900 rounded-md border border-gray-300 dark:border-gray-600"
                    title="Copiar color"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>

            {/* Colores recientes */}
            {showRecent && recentColors.length > 0 && (
                <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-2">Colores recientes:</p>
                    <div className="flex space-x-2">
                        {recentColors.map((color, index) => (
                            <button
                                key={index}
                                onClick={() => handleColorChange(color)}
                                className="w-6 h-6 rounded-full border border-gray-300 hover:scale-110 transition-transform"
                                style={{ backgroundColor: color }}
                                title={color}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Preview de texto */}
            <div className="mt-3 p-2 bg-white dark:bg-neutral-900 rounded border border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 mb-1">Vista previa:</p>
                <div className="flex items-center space-x-4">
                    <span className="text-sm px-2 py-1 rounded" style={{
                        backgroundColor: currentColor,
                        color: getContrastColor(currentColor)
                    }}>
                        Texto con este color
                    </span>
                    <span className="text-xs text-gray-400">Contraste: {getContrastRatio(currentColor)}</span>
                </div>
            </div>
        </div>
    );
};

// Función auxiliar para determinar el color de texto contrastante
function getContrastColor(hexcolor: string): string {
    // Convertir hex a RGB
    const r = parseInt(hexcolor.slice(1, 3), 16);
    const g = parseInt(hexcolor.slice(3, 5), 16);
    const b = parseInt(hexcolor.slice(5, 7), 16);

    // Calcular luminancia
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? '#000000' : '#ffffff';
}

// Función para calcular ratio de contraste aproximado
function getContrastRatio(hexcolor: string): string {
    const r = parseInt(hexcolor.slice(1, 3), 16);
    const g = parseInt(hexcolor.slice(3, 5), 16);
    const b = parseInt(hexcolor.slice(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const ratio = luminance > 0.5
        ? (luminance + 0.05) / 0.05
        : 0.05 / (luminance + 0.05);

    return ratio.toFixed(1) + ':1';
}

export default ColorPicker;