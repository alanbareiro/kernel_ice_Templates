
"Hola, tengo una app React+TS+Tailwind con backend Node+Express+Prisma y MySql.
El usuario selecciona un template de una lista, lo abre en un editor donde puede cambiar textos e imágenes, y al guardar se almacena en DB. 
Primeramente nos centraremos en un solo template (consulting) y en finalizar la parte de personalizacion del usuario. Hay muchas partes funcionales y otras que todavia faltan. 
A continuacion te pasao los archivos principales donde el usuario intractua y puede personalizar su template.  // src/components/Editor/ColorPicker.tsx - Versión compacta
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

export default ColorPicker; import React, { useState } from 'react';

interface ComboboxInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
}

export const ComboboxInput: React.FC<ComboboxInputProps> = ({
    label,
    value,
    onChange,
    options,
    placeholder,
}) => {
    const [isCustom, setIsCustom] = useState(!options.some(opt => opt.value === value));

    return (
        <div className="mb-2">
            <label className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300 block mb-1">{label}</label>
            <div className="flex gap-2">
                <select
                    className="flex-1 px-2 py-1 text-xs border rounded-lg bg-white dark:bg-neutral-800"
                    value={isCustom ? '__custom__' : value}
                    onChange={(e) => {
                        if (e.target.value === '__custom__') {
                            setIsCustom(true);
                            onChange('');
                        } else {
                            setIsCustom(false);
                            onChange(e.target.value);
                        }
                    }}
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                    <option value="__custom__">✏️ Personalizado...</option>
                </select>
                {isCustom && (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder || "https://... o #seccion"}
                        className="flex-1 px-2 py-1 text-xs border rounded-lg bg-white dark:bg-neutral-800"
                    />
                )}
            </div>
        </div>
    );
}; import { Check, Copy, RefreshCw } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface CompactColorInputProps {
    label: string;
    value: string | undefined;
    onChange: (color: string) => void;
    defaultValue?: string;
    description?: string;
    inputId?: string;
}

export const CompactColorInput: React.FC<CompactColorInputProps> = ({
    label,
    value,
    onChange,
    defaultValue = '#000000',
    description,
    inputId,
}) => {
    const [copied, setCopied] = useState(false);
    const [localValue, setLocalValue] = useState<string>(value || defaultValue);

    useEffect(() => {
        if (value !== undefined && value !== localValue) {
            setLocalValue(value);
        }
    }, [value, localValue]);

    const handleColorChange = (newColor: string) => {
        setLocalValue(newColor);
        onChange(newColor);
    };

    const handleCopy = () => {
        if (localValue) {
            navigator.clipboard.writeText(localValue);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    const handleReset = () => {
        if (defaultValue) {
            handleColorChange(defaultValue);
        }
    };

    const displayValue = localValue || defaultValue;
    const uniqueId = inputId || `color-${label.replace(/\s/g, '')}`;

    return (
        <div className="mb-2">
            <div className="flex items-center justify-between gap-1.5">
                <label className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300 w-16 flex-shrink-0">
                    {label}
                </label>
                <div className="flex items-center gap-1 flex-1">
                    <div className="relative">
                        <div
                            className="w-5 h-5 rounded-full border border-neutral-300 dark:border-neutral-600 cursor-pointer shadow-sm hover:scale-105 transition-transform"
                            style={{ backgroundColor: displayValue }}
                            onClick={() => {
                                const input = document.getElementById(uniqueId) as HTMLInputElement;
                                if (input) input.click();
                            }}
                        />
                        <input
                            id={uniqueId}
                            type="color"
                            value={displayValue}
                            onChange={(e) => handleColorChange(e.target.value)}
                            className="absolute inset-0 w-0 h-0 opacity-0 pointer-events-none"
                        />
                    </div>
                    <input
                        type="text"
                        value={displayValue}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="flex-1 px-1 py-0.5 text-[9px] font-mono border border-neutral-300 dark:border-neutral-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-neutral-800"
                        pattern="^#[0-9A-Fa-f]{6}$"
                    />
                    <button
                        onClick={handleCopy}
                        className="p-0.5 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                        title="Copiar color"
                    >
                        {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                    <button
                        onClick={handleReset}
                        className="p-0.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                        title="Restablecer"
                    >
                        <RefreshCw className="w-3 h-3" />
                    </button>
                </div>
            </div>
            {description && <p className="text-[8px] text-neutral-500 mt-0.5 ml-16">{description}</p>}
        </div>
    );
}; import { Edit2, Image as ImageIcon, Upload, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { defaultImages } from '../../assets/default-images';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

interface EditableImageProps {
    elementId: string;
    defaultImage: string;
    alt?: string;
    className?: string;
    aspectRatio?: string;
    category?: 'consulting' | 'catering' | 'accounting' | 'restaurant' | 'lawFirm' | 'medical' | 'architecture' | 'marketing' | 'coffee' | 'bakery' | 'foodtruck' | 'beauty' | 'gym' | 'realestate' | 'fashion' | 'cleaning' | 'saas' | 'digital' | 'startup';
    containerClassName?: string;
    modalRelative?: boolean;
}

const FALLBACK_IMAGES: Record<string, string> = {
    consulting: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    catering: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800',
    accounting: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
    restaurant: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    lawFirm: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    medical: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    architecture: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800',
    marketing: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    coffee: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800',
    bakery: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
    foodtruck: 'https://images.unsplash.com/photo-1565125719084-5d5466b5c5a2?w=800',
    beauty: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
    gym: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    realestate: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
    cleaning: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
    saas: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    digital: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    startup: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
};

const EditableImage: React.FC<EditableImageProps> = ({
    elementId,
    defaultImage,
    alt = '',
    className = '',
    aspectRatio = 'aspect-auto',
    category = 'consulting',
    containerClassName = '',
    modalRelative = false,
}) => {
    const { config } = useTemplateEditor();
    const { template, updateImage } = useTemplate();
    const [isHovering, setIsHovering] = useState(false);
    const [showSelector, setShowSelector] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const [imageError, setImageError] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const savedImage = template?.images?.[elementId];

    const getImageUrl = () => {
        if (imageError) {
            return FALLBACK_IMAGES[category] || FALLBACK_IMAGES.consulting;
        }
        if (savedImage && savedImage !== 'undefined' && savedImage !== 'null') {
            return savedImage;
        }
        if (defaultImage && defaultImage !== 'undefined' && defaultImage !== 'null' && defaultImage.includes('http')) {
            return defaultImage;
        }
        const categoryImages = defaultImages[category as keyof typeof defaultImages];
        if (categoryImages && categoryImages.hero) {
            return categoryImages.hero;
        }
        return FALLBACK_IMAGES[category] || FALLBACK_IMAGES.consulting;
    };

    const imageUrl = getImageUrl();

    const categoryImages = defaultImages[category as keyof typeof defaultImages] || {};
    const galleryImages = Object.entries(categoryImages)
        .filter(([_, url]) => url && typeof url === 'string' && url.includes('http'))
        .map(([key, url]) => ({
            id: key,
            url: url as string,
            name: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')
        }));

    if (galleryImages.length === 0) {
        galleryImages.push({
            id: 'fallback',
            url: FALLBACK_IMAGES[category] || FALLBACK_IMAGES.consulting,
            name: 'Imagen por defecto'
        });
    }

    useEffect(() => {
        const handleOpenSelector = (event: CustomEvent) => {
            if (event.detail?.elementId === elementId) {
                console.log(`📷 Abriendo selector para imagen: ${elementId}`);
                setShowSelector(true);
            }
        };
        window.addEventListener('openImageSelector', handleOpenSelector as EventListener);
        return () => {
            window.removeEventListener('openImageSelector', handleOpenSelector as EventListener);
        };
    }, [elementId]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                await updateImage(elementId, file);
                setImageError(false);
                setShowSelector(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectFromGallery = async (imageUrl: string) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], `gallery-image-${Date.now()}.jpg`, { type: 'image/jpeg' });
            await updateImage(elementId, file);
            setImageError(false);
            setShowGallery(false);
            setShowSelector(false);
        } catch (error) {
            console.error('Error al cargar imagen de galería:', error);
            await updateImage(elementId, new File([], ''));
            setImageError(false);
            setShowGallery(false);
            setShowSelector(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            await updateImage(elementId, file);
            setImageError(false);
            setShowSelector(false);
        }
    };

    const handleImageClick = () => {
        if (config.isEditing) {
            setShowSelector(true);
        }
    };

    const handleImageError = () => {
        console.warn(`Error loading image for ${elementId}, using fallback`);
        setImageError(true);
    };

    const containerId = `editable-image-${elementId}`;

    return (
        <>
            {/* Contenedor de la imagen */}
            <div
                id={containerId}
                className={`relative group ${aspectRatio} ${containerClassName || ''}`}
                onMouseEnter={() => config.isEditing && setIsHovering(true)}
                onMouseLeave={() => config.isEditing && setIsHovering(false)}
                onClick={handleImageClick}
                style={{
                    position: 'relative',
                    cursor: config.isEditing ? 'pointer' : 'default',
                    outline: (config.isEditing && isHovering) ? '3px solid #3b82f6' : 'none',
                    outlineOffset: '2px'
                }}
            >
                <img
                    src={imageUrl}
                    alt={alt}
                    className={className}
                    onError={handleImageError}
                />

                {config.isEditing && isHovering && !showSelector && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg z-50">
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-lg"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setShowSelector(true);
                            }}
                            type="button"
                        >
                            <Edit2 className="w-4 h-4" />
                            <span>Cambiar imagen</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Selector modal - versión absoluta (para logo) */}
            {showSelector && modalRelative && (
                <div
                    className="absolute z-50 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-80"
                    style={{
                        top: '100%',
                        left: '0',
                        marginTop: '8px',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h4 className="font-semibold text-sm">Seleccionar imagen</h4>
                        <button
                            onClick={() => setShowSelector(false)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex space-x-2 p-3">
                        <button
                            onClick={() => {
                                setShowGallery(true);
                                setShowSelector(false);
                            }}
                            className="flex-1 px-2 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition-colors flex items-center justify-center"
                        >
                            <ImageIcon className="w-3 h-3 mr-1" />
                            Galería
                        </button>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-1 px-2 py-1.5 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700 transition-colors flex items-center justify-center"
                        >
                            <Upload className="w-3 h-3 mr-1" />
                            Subir
                        </button>
                    </div>

                    <div
                        className="mx-3 mb-3 p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <Upload className="w-6 h-6 text-gray-400 mb-1" />
                        <p className="text-[10px] text-center text-gray-600 dark:text-gray-400">
                            Arrastrá una imagen
                        </p>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />

                    <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                        <button
                            onClick={() => setShowSelector(false)}
                            className="px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-xs transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Selector modal - versión fija centrada (para Hero y About) */}
            {showSelector && !modalRelative && (
                <div
                    className="fixed inset-0 bg-black/75 flex items-center justify-center z-[10000] p-4"
                    onClick={() => setShowSelector(false)}
                >
                    <div
                        className="bg-white dark:bg-neutral-900 rounded-2xl w-full max-w-md flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="text-xl font-bold">Seleccionar imagen</h3>
                            <button
                                onClick={() => setShowSelector(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex space-x-2 p-4 border-b border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => {
                                    setShowGallery(true);
                                    setShowSelector(false);
                                }}
                                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
                            >
                                <ImageIcon className="w-4 h-4 mr-2" />
                                Galería
                            </button>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center justify-center"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                Subir
                            </button>
                        </div>

                        <div
                            className="flex-1 overflow-y-auto p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg m-4 flex flex-col items-center justify-center min-h-[200px]"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                                Arrastrá una imagen o hacé clic en "Subir"
                            </p>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />

                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                            <button
                                onClick={() => setShowSelector(false)}
                                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Galería modal (común para ambos modos) */}
            {showGallery && (
                <div
                    className="fixed inset-0 bg-black/75 flex items-center justify-center z-[10000] p-4"
                    onClick={() => setShowGallery(false)}
                >
                    <div
                        className="bg-white dark:bg-neutral-900 rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="text-xl font-bold">Galería de imágenes</h3>
                            <button
                                onClick={() => setShowGallery(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {galleryImages.map((img) => (
                                    <button
                                        key={img.id}
                                        onClick={() => handleSelectFromGallery(img.url)}
                                        className="group relative aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all"
                                    >
                                        <img
                                            src={img.url}
                                            alt={img.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = FALLBACK_IMAGES[category] || FALLBACK_IMAGES.consulting;
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">{img.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                            <button
                                onClick={() => setShowGallery(false)}
                                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    setShowGallery(false);
                                    setShowSelector(true);
                                }}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditableImage; // src/components/common/EditableText.tsx
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

export default EditableText; import { Edit3, Eye } from 'lucide-react';
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

export default EditModeToggle; import {
  AlertCircle,
  Award,
  BarChart,
  Briefcase,
  Check,
  Eye,
  Globe,
  Home,
  Info,
  LineChart,
  LogOut,
  Palette,
  Plus,
  Save,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  User,
  Users,
  type LucideIcon
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { templateConfigs, type DynamicListConfig, type FieldConfig } from '../../config/templateConfig';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';
import { useTutorial } from '../../hooks/useTutorial';
import { colorPresets, defaultSectionColors, defaultTypography } from '../../types/template.types';
import { CompactColorInput } from './CompactColorInput';
import { SectionAccordion } from './SectionAccordion';
import { SelectInput } from './SelectInput';
import TutorialOverlay from './TutorialOverlay';

type EditorTab = 'visual' | 'presets';

interface EditorDashboardProps {
  onHomeClick?: () => void;
  userLoggedIn?: boolean;
}

// --- Componentes auxiliares (mantenemos los existentes) ---
const SizeInput = ({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (size: string) => void;
  options: string[];
}) => (
  <div className="space-y-1 mb-2">
    <label className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-2 py-1 text-xs border rounded-lg"
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const TextInput = ({ label, value, onChange }: {
  label: string;
  value: string;
  onChange: (text: string) => void;
}) => (
  <div className="space-y-1 mb-2">
    <label className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-2 py-1 text-xs border rounded-lg"
    />
  </div>
);

const FontSelect = ({ label, value, onChange }: {
  label: string;
  value: string;
  onChange: (font: string) => void;
}) => {
  const fonts = [
    { value: 'Inter, system-ui, sans-serif', label: 'Inter' },
    { value: 'Roboto, system-ui, sans-serif', label: 'Roboto' },
    { value: 'Poppins, system-ui, sans-serif', label: 'Poppins' },
    { value: 'Montserrat, system-ui, sans-serif', label: 'Montserrat' },
    { value: 'Open Sans, system-ui, sans-serif', label: 'Open Sans' },
    { value: 'system-ui, -apple-system, sans-serif', label: 'Sistema' },
  ];

  return (
    <div className="space-y-1 mb-2">
      <label className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2 py-1 text-xs border rounded-lg"
        style={{ fontFamily: value }}
      >
        {fonts.map(font => (
          <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
            {font.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const IconSelect = ({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; icon: LucideIcon }[];
}) => {
  const SelectedIcon = options.find(opt => opt.value === value)?.icon || options[0].icon;
  return (
    <div className="space-y-1 mb-2">
      <label className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300">{label}</label>
      <div className="flex items-center gap-2">
        <div className="p-1 border rounded bg-neutral-100 dark:bg-neutral-800">
          <SelectedIcon className="w-4 h-4" />
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1 text-xs border rounded-lg"
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
// --- Fin componentes auxiliares ---

const EditorDashboard: React.FC<EditorDashboardProps> = ({
  onHomeClick,
  userLoggedIn = false,
}) => {
  const {
    template,
    resetTemplate,
    hasUnsavedChanges,
    undo,
    redo,
    canUndo,
    canRedo,
    applyPreset,
    saveToBackend,
    setEditorConfig,
    updateSectionColors,
    updateTypography,
    updateButtons,
    updateText,
  } = useTemplate();

  const { config, toggleEditing } = useTemplateEditor();
  const [activeTab, setActiveTab] = useState<EditorTab>('visual');
  const [isSaving, setIsSaving] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  // --- Ancho redimensionable ---
  const MIN_WIDTH = 240;
  const MAX_WIDTH = 400;
  const DEFAULT_WIDTH = 280;
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('editorSidebarWidth');
    if (saved) {
      const w = parseInt(saved, 10);
      if (!isNaN(w) && w >= MIN_WIDTH && w <= MAX_WIDTH) {
        setSidebarWidth(w);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('editorSidebarWidth', sidebarWidth.toString());
  }, [sidebarWidth]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !sidebarRef.current) return;
      const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
      const clamped = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, newWidth));
      setSidebarWidth(clamped);
    };
    const handleMouseUp = () => setIsResizing(false);
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const tutorial = useTutorial();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveToBackend();
      setEditorConfig({
        notifications: { show: true, message: 'Cambios guardados exitosamente', type: 'success' }
      });
    } catch (error) {
      setEditorConfig({
        notifications: { show: true, message: 'Error al guardar cambios', type: 'error' }
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFinishEditing = async () => {
    if (hasUnsavedChanges) await handleSave();
    if (onHomeClick) onHomeClick();
  };

  const handleSaveToAccount = async () => {
    setIsSaving(true);
    try {
      await saveToBackend();
      setEditorConfig({
        notifications: { show: true, message: 'Template guardado en tu cuenta', type: 'success' }
      });
    } catch (error) {
      setEditorConfig({
        notifications: { show: true, message: 'Error al guardar', type: 'error' }
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Valores por defecto
  const sectionColors = { ...defaultSectionColors, ...(template?.sectionColors || {}) };
  const typography = { ...defaultTypography, ...(template?.typography || {}) };

  const defaultButtonsStructure = {
    primary: { text: 'Solicitar consultoría', url: '/contacto', openInNewTab: false },
    secondary: { text: 'Conocer metodología', url: '#metodologia', openInNewTab: false },
  };
  const buttons = {
    primary: template?.buttons?.primary || defaultButtonsStructure.primary,
    secondary: template?.buttons?.secondary || defaultButtonsStructure.secondary,
  };

  const linkOptions = [
    { value: '#home', label: 'Inicio (#home)' },
    { value: '#services', label: 'Servicios (#services)' },
    { value: '#methodology', label: 'Metodología (#methodology)' },
    { value: '#testimonials', label: 'Testimonios (#testimonials)' },
    { value: '#contact', label: 'Contacto (#contact)' },
  ];

  const iconOptions = [
    { value: 'TrendingUp', label: 'Tendencia al alza', icon: TrendingUp },
    { value: 'Users', label: 'Usuarios', icon: Users },
    { value: 'Target', label: 'Objetivo', icon: Target },
    { value: 'Award', label: 'Premio', icon: Award },
    { value: 'Briefcase', label: 'Maletín', icon: Briefcase },
    { value: 'BarChart', label: 'Gráfico', icon: BarChart },
    { value: 'LineChart', label: 'Línea de tiempo', icon: LineChart },
    { value: 'Globe', label: 'Global', icon: Globe },
  ];

  // Obtener configuración del template actual
  const templateConfig = template?.type ? templateConfigs[template.type] : null;

  // Helper para renderizar un campo según su tipo
  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case 'color':
        if (field.sectionColorKey) {
          return (
            <CompactColorInput
              key={field.key}
              label={field.label}
              value={sectionColors[field.sectionColorKey] as string}
              onChange={(c) => updateSectionColors({ [field.sectionColorKey!]: c })}
              defaultValue={field.defaultValue}
              inputId={field.key}
            />
          );
        }
        return null;

      case 'text':
        return (
          <TextInput
            key={field.key}
            label={field.label}
            value={template?.texts?.[field.textKey!] || field.defaultValue || ''}
            onChange={(t) => updateText(field.textKey!, t)}
          />
        );

      case 'size':
        if (field.sizeKey) {
          return (
            <SizeInput
              key={field.key}
              label={field.label}
              value={typography[field.sizeKey] as string}
              onChange={(s) => updateTypography({ [field.sizeKey!]: s })}
              options={field.options as string[]}
            />
          );
        }
        if (field.key === 'statValueSize') {
          return (
            <SizeInput
              key={field.key}
              label={field.label}
              value={template?.texts?.statValueSize || field.defaultValue}
              onChange={(s) => updateText('statValueSize', s)}
              options={field.options as string[]}
            />
          );
        }
        if (field.key === 'statLabelSize') {
          return (
            <SizeInput
              key={field.key}
              label={field.label}
              value={template?.texts?.statLabelSize || field.defaultValue}
              onChange={(s) => updateText('statLabelSize', s)}
              options={field.options as string[]}
            />
          );
        }
        // Para tamaños que no están en typography (ej. logoTextSize)
        if (field.key === 'logoTextSize') {
          return (
            <SelectInput
              key={field.key}
              label={field.label}
              value={sectionColors.logoTextSize}
              onChange={(val) => updateSectionColors({ logoTextSize: val })}
              options={field.options as { value: string; label: string }[]}
            />
          );
        }
        if (field.key === 'iconSize') {
          return (
            <SelectInput
              key={field.key}
              label={field.label}
              value={sectionColors.iconSize}
              onChange={(val) => updateSectionColors({ iconSize: val })}
              options={field.options as { value: string; label: string }[]}
            />
          );
        }
        return null;

      case 'font':
        if (field.fontKey) {
          return (
            <FontSelect
              key={field.key}
              label={field.label}
              value={typography[field.fontKey] as string}
              onChange={(f) => updateTypography({ [field.fontKey!]: f })}
            />
          );
        }
        return null;

      case 'icon':
        return (
          <IconSelect
            key={field.key}
            label={field.label}
            value={template?.texts?.[field.iconKey!] || field.defaultValue || ''}
            onChange={(val) => updateText(field.iconKey!, val)}
            options={iconOptions}
          />
        );

      case 'checkbox':
        const isChecked = template?.texts?.[field.checkboxKey!] !== 'false';
        return (
          <div key={field.key} className="flex items-center justify-between py-1">
            <span className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">{field.label}</span>
            <label className="flex items-center gap-1 text-[10px]">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => updateText(field.checkboxKey!, e.target.checked ? 'true' : 'false')}
                className="w-3 h-3"
              />
              <span>Mostrar</span>
            </label>
          </div>
        );

      case 'image':
        const handleImageClick = () => {
          window.dispatchEvent(new CustomEvent('openImageSelector', { detail: { elementId: field.imageElementId } }));
        };
        return (
          <div key={field.key} className="mb-2">
            <p className="text-[10px] text-neutral-500 mb-1">{field.label}</p>
            <button
              onClick={handleImageClick}
              className="w-full py-2 px-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-medium hover:bg-neutral-200 transition-colors"
            >
              {template?.images?.[field.imageElementId!] ? 'Cambiar imagen' : 'Seleccionar imagen'}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // Helper para renderizar una lista dinámica
  const renderDynamicList = (listConfig: DynamicListConfig) => {
    // Obtener la lista actual desde template.texts
    const storedList = template?.texts?.[listConfig.itemKeyPrefix];
    let items: any[] = [];
    try {
      items = storedList ? JSON.parse(storedList) : [];
    } catch (e) {
      items = [];
    }
    // Si está vacía, inicializar con valores por defecto
    if (items.length === 0) {
      if (listConfig.defaultItems && listConfig.defaultItems.length > 0) {
        // Usar los ítems por defecto definidos en la configuración
        items = listConfig.defaultItems.map((item, idx) => ({
          ...item,
          id: `item_${idx}_${Date.now()}_${Math.random()}`
        }));
      } else {
        // Generar ítems con defaultValue
        for (let i = 0; i < listConfig.defaultCount; i++) {
          const newItem: any = {};
          for (const field of listConfig.fields) {
            newItem[field.key] = field.defaultValue;
          }
          newItem.id = `item_${i}_${Date.now()}`;
          items.push(newItem);
        }
      }
    }

    const updateList = (newItems: any[]) => {
      updateText(listConfig.itemKeyPrefix, JSON.stringify(newItems));
    };

    const addItem = () => {
      if (items.length >= listConfig.maxCount) return;
      const newItem: any = {};
      for (const field of listConfig.fields) {
        newItem[field.key] = field.defaultValue;
      }
      newItem.id = `item_${Date.now()}_${Math.random()}`;
      updateList([...items, newItem]);
    };

    const removeItem = (index: number) => {
      const newItems = [...items];
      newItems.splice(index, 1);
      updateList(newItems);
    };

    const updateItemField = (index: number, fieldKey: string, value: any) => {
      const newItems = [...items];
      newItems[index][fieldKey] = value;
      updateList(newItems);
    };

    return (
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={item.id} className="p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded relative group">
            <button
              onClick={() => removeItem(idx)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition"
              title="Eliminar"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            {listConfig.fields.map(field => {
              const value = item[field.key];
              switch (field.type) {
                case 'text':
                  return (
                    <TextInput
                      key={field.key}
                      label={field.label}
                      value={value || ''}
                      onChange={(val) => updateItemField(idx, field.key, val)}
                    />
                  );
                case 'icon':
                  return (
                    <IconSelect
                      key={field.key}
                      label={field.label}
                      value={value || field.defaultValue || ''}
                      onChange={(val) => updateItemField(idx, field.key, val)}
                      options={iconOptions}
                    />
                  );
                case 'checkbox':
                  const isChecked = value !== false;
                  return (
                    <div key={field.key} className="flex items-center justify-between py-1">
                      <span className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">{field.label}</span>
                      <label className="flex items-center gap-1 text-[10px]">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => updateItemField(idx, field.key, e.target.checked)}
                          className="w-3 h-3"
                        />
                        <span>Mostrar</span>
                      </label>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        ))}
        {items.length < listConfig.maxCount && (
          <button
            onClick={addItem}
            className="w-full py-2 mt-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg text-xs font-medium hover:bg-primary-200 transition flex items-center justify-center gap-1"
          >
            <Plus className="w-3 h-3" /> Agregar ítem
          </button>
        )}
      </div>
    );
  };

  // Helper para renderizar un grupo
  // Helper para renderizar un grupo
  const renderGroup = (group: any) => {
    return (
      <SectionAccordion key={group.id} title={group.title} icon={group.icon} tooltipText={`Configura ${group.title}`}>
        {/* Campos estáticos (si los hay) */}
        {group.fields && group.fields.length > 0 && (
          <div className="mb-4 space-y-3">
            {group.fields.map((field: FieldConfig) => renderField(field))}
          </div>
        )}
        {/* Lista dinámica (si existe) */}
        {group.dynamicList && renderDynamicList(group.dynamicList)}
      </SectionAccordion>
    );
  };

  const handleHeroImageClick = () => {
    window.dispatchEvent(new CustomEvent('openImageSelector', { detail: { elementId: 'hero_image' } }));
  };

  // Si no hay configuración para este template, mostrar mensaje
  if (!templateConfig) {
    return (
      <div className="bg-white dark:bg-neutral-900 shadow-2xl border-r border-neutral-200 dark:border-neutral-800 z-40 flex flex-col sticky top-0 h-screen w-80 p-4">
        <div className="text-red-500 text-xs">No hay configuración disponible para el template {template?.type}</div>
      </div>
    );
  }

  return (
    <>
      {tutorial.showTutorial && tutorial.currentStepData && (
        <TutorialOverlay
          targetElementId={tutorial.currentStepData.targetElement}
          step={tutorial.currentStep}
          onNext={tutorial.nextStep}
          onPrevious={tutorial.previousStep}
          onSkip={tutorial.skipTutorial}
          onClose={tutorial.skipTutorial}
          title={tutorial.currentStepData.title}
          description={tutorial.currentStepData.description}
          position={tutorial.currentStepData.position}
          showSkip={tutorial.currentStepData.showSkip}
          totalSteps={tutorial.totalSteps}
          currentStep={tutorial.currentStep}
        />
      )}

      {config.notifications && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[60] animate-slideDown">
          <div className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg shadow-lg text-sm
            ${config.notifications.type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : ''}
            ${config.notifications.type === 'error' ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white' : ''}
            ${config.notifications.type === 'warning' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white' : ''}
            ${config.notifications.type === 'info' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : ''}`}>
            {config.notifications.type === 'success' && <Check className="w-4 h-4" />}
            {config.notifications.type === 'error' && <AlertCircle className="w-4 h-4" />}
            {config.notifications.type === 'warning' && <AlertCircle className="w-4 h-4" />}
            {config.notifications.type === 'info' && <Info className="w-4 h-4" />}
            <span>{config.notifications.message}</span>
          </div>
        </div>
      )}

      <div
        ref={sidebarRef}
        id="editor-sidebar"
        className="bg-white dark:bg-neutral-900 shadow-2xl border-r border-neutral-200 dark:border-neutral-800 z-40 flex flex-col sticky top-0 h-screen"
        style={{ width: `${sidebarWidth}px` }}
      >
        <div
          className="absolute right-0 top-0 w-1 h-full cursor-ew-resize bg-transparent hover:bg-blue-500 transition-colors z-50"
          onMouseDown={handleMouseDown}
        />

        <div id="edit-mode-button" className="p-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex gap-2">
            <button
              onClick={toggleEditing}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2
                ${config.isEditing ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white ring-2 ring-green-300' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}
            >
              <Eye className="w-3.5 h-3.5" />
              {config.isEditing ? "✓ Modo edición activo" : "Activar modo edición"}
            </button>
            <button
              onClick={tutorial.startTutorial}
              className="px-2 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-medium transition-all hover:bg-blue-200 dark:hover:bg-blue-800/30 flex items-center gap-1"
            >
              <Info className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ayuda</span>
            </button>
          </div>
          {config.isEditing && (
            <p className="text-[10px] text-green-600 dark:text-green-400 text-center mt-1.5">
              ✨ Ahora podés hacer doble clic en cualquier texto para editarlo
            </p>
          )}
        </div>

        <div className="flex border-b border-neutral-200 dark:border-neutral-800">
          <button
            onClick={() => setActiveTab('visual')}
            className={`flex-1 py-2 text-[11px] font-medium transition-all flex items-center justify-center gap-1.5
              ${activeTab === 'visual' ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
          >
            <Palette className="w-3 h-3" /> Diseño visual
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-2 text-[11px] font-medium transition-all flex items-center justify-center gap-1.5
              ${activeTab === 'presets' ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
          >
            <Sparkles className="w-3 h-3" /> Presets
          </button>
          <button
            onClick={() => {
              const currentTemplate = template;
              let previewUrl = `${window.location.origin}${window.location.pathname}?preview=true`;
              if (currentTemplate?.id && !currentTemplate.id.startsWith('temp-')) previewUrl += `&templateId=${currentTemplate.id}`;
              else { alert('⚠️ Debes guardar el template antes de ver la vista previa.\nHaz clic en "Guardar cambios" primero.'); return; }
              window.open(previewUrl, '_blank');
            }}
            className="px-2 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg text-xs font-medium transition-all hover:bg-purple-200 dark:hover:bg-purple-800/30 flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Vista previa</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 min-h-0">
          {activeTab === 'visual' && template && (
            <div className="space-y-2">
              {templateConfig.sections.map(section => (
                <SectionAccordion
                  key={section.id}
                  scrollToId={section.id === 'hero' ? 'home' : section.id === 'features' ? 'services' : section.id === 'about' ? 'methodology' : section.id === 'testimonials' ? 'testimonials' : section.id === 'contact' ? 'contact' : section.id === 'footer' ? 'footer' : undefined}
                  title={section.title}
                  icon={section.icon}
                  tooltipText={`Personaliza ${section.title}`}
                >
                  {section.groups.map(group => renderGroup(group))}
                </SectionAccordion>
              ))}
            </div>
          )}

          {activeTab === 'presets' && template && (
            <div className="space-y-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-[10px] text-blue-700 dark:text-blue-300 flex items-start gap-1.5">
                  <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  <span>Combinaciones de colores predefinidas para tu template</span>
                </p>
              </div>
              <div id="presets-section" className="grid grid-cols-2 gap-2">
                {(colorPresets[template.type as keyof typeof colorPresets] || []).map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyPreset(preset.name)}
                    className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all text-left group"
                  >
                    <div className="flex flex-wrap gap-1 mb-2">
                      {Object.values(preset.colors).map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border border-neutral-300 dark:border-neutral-600 shadow-sm"
                          style={{ backgroundColor: color as string }}
                          title={color as string}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300 truncate">{preset.name}</p>
                    <p className="text-[9px] text-neutral-500 dark:text-neutral-400 mt-0.5">Click para aplicar</p>
                  </button>
                ))}
              </div>
              {(!colorPresets[template.type as keyof typeof colorPresets] || colorPresets[template.type as keyof typeof colorPresets]?.length === 0) && (
                <div className="text-center py-8">
                  <p className="text-xs text-neutral-500">No hay presets disponibles para este template</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Acciones del sidebar (igual que antes) */}
        <div className="p-2 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full py-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center justify-center gap-1.5 mb-1.5
              ${hasUnsavedChanges ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md animate-pulse' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'}`}
          >
            {isSaving ? <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {isSaving ? "Guardando..." : (hasUnsavedChanges ? "¡Guardar cambios!*" : "Guardar cambios")}
          </button>

          <div id="undo-redo-buttons" className="flex gap-1.5 mb-1.5">
            <button onClick={undo} disabled={!canUndo} className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1 ${canUndo ? 'bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" /></svg> Deshacer
            </button>
            <button onClick={redo} disabled={!canRedo} className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1 ${canRedo ? 'bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" /></svg> Rehacer
            </button>
          </div>

          <button onClick={() => resetTemplate(template?.type || 'consulting')} className="w-full py-1.5 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-lg text-[10px] font-medium text-neutral-700 dark:text-neutral-300 transition-all flex items-center justify-center gap-1 mb-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg> Restablecer todo
          </button>

          <div className="flex gap-1.5">
            <button onClick={onHomeClick} className="flex-1 py-1.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1"><Home className="w-3 h-3" /> Inicio</button>
            <button id="finish-button" onClick={handleFinishEditing} disabled={isSaving} className="flex-1 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1"><LogOut className="w-3 h-3" /> {isSaving ? "Guardando..." : "Finalizar edición"}</button>
          </div>

          <button onClick={() => setShowSupportModal(true)} className="w-full mt-1.5 py-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg text-[10px] font-medium text-neutral-600 dark:text-neutral-400 transition-all flex items-center justify-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> Soporte
          </button>

          {userLoggedIn && (
            <button onClick={handleSaveToAccount} disabled={isSaving} className="w-full mt-1.5 py-1 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1 disabled:opacity-50">
              {isSaving ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <User className="w-3 h-3" />}
              {isSaving ? "Guardando..." : "Guardar en cuenta"}
            </button>
          )}
        </div>
      </div>

      {showSupportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-5 max-w-sm w-full shadow-2xl">
            <h3 className="text-base font-semibold mb-2">Soporte</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">¿Necesitas ayuda con la edición de tu template?</p>
            <div className="space-y-2 mb-4">
              <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg"><p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">📧 Email</p><p className="text-xs text-neutral-500">soporte@kernelice.com</p></div>
              <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg"><p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">💬 WhatsApp</p><p className="text-xs text-neutral-500">+54 9 11 1234-5678</p></div>
              <button onClick={() => { setShowSupportModal(false); tutorial.startTutorial(); }} className="w-full mt-2 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium flex items-center justify-center gap-1"><Info className="w-3 h-3" /> Ver tutorial otra vez</button>
            </div>
            <button onClick={() => setShowSupportModal(false)} className="w-full py-1.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg text-xs font-medium">Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditorDashboard; import React from 'react';
import { LogIn, User, X, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, message }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70]">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-md w-full shadow-2xl animate-slideDown">
                <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Iniciar sesión requerido</h3>
                        <button
                            onClick={onClose}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                
                <div className="p-6">
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-amber-600" />
                        </div>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-center mb-2">
                        ¡Necesitas una cuenta!
                    </h4>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
                        {message || 'Para guardar este template en tu cuenta necesitas iniciar sesión o registrarte.'}
                    </p>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6">
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                            💡 Si ya tienes una cuenta, inicia sesión ahora. Si no, puedes crear una gratis en menos de un minuto.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => {
                                onClose();
                                sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
                                navigate('/login');
                            }}
                            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center"
                        >
                            <LogIn className="w-4 h-4 mr-2" />
                            Iniciar sesión
                        </button>
                        <button
                            onClick={() => {
                                onClose();
                                navigate('/register');
                            }}
                            className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center"
                        >
                            <User className="w-4 h-4 mr-2" />
                            Registrarse
                        </button>
                    </div>
                    
                    <button
                        onClick={onClose}
                        className="w-full mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors text-sm"
                    >
                        Seguir editando sin guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal; import { ChevronDown, ChevronRight, Info } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface SectionAccordionProps {
    title: string;
    icon: React.ElementType;
    tooltipText: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
    scrollToId?: string; // Nuevo: ID del elemento al que hacer scroll al abrirse
}

export const SectionAccordion: React.FC<SectionAccordionProps> = ({
    title,
    icon: Icon,
    tooltipText,
    defaultOpen = false,
    children,
    scrollToId,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const prevOpenRef = useRef(defaultOpen);

    useEffect(() => {
        // Solo hacer scroll si se acaba de abrir (cambió de false a true)
        if (isOpen && !prevOpenRef.current && scrollToId) {
            const element = document.getElementById(scrollToId);
            if (element) {
                // Pequeño retraso para que el DOM se actualice
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
        prevOpenRef.current = isOpen;
    }, [isOpen, scrollToId]);

    return (
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg mb-3 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary-500" />
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">{title}</span>
                    <span className="inline-flex cursor-help" title={tooltipText}>
                        <Info className="w-3.5 h-3.5 text-neutral-400 hover:text-primary-500 transition-colors" />
                    </span>
                </div>
                {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                ) : (
                    <ChevronRight className="w-4 h-4 text-neutral-500" />
                )}
            </button>
            {isOpen && <div className="p-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700">{children}</div>}
        </div>
    );
}; import React from 'react';

interface SelectInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

export const SelectInput: React.FC<SelectInputProps> = ({ label, value, onChange, options }) => {
    return (
        <div className="mb-2">
            <label className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300 block mb-0.5">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-1.5 py-0.5 text-[10px] border rounded-lg bg-white dark:bg-neutral-800"
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
}; import React from 'react';
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

export default TemplateSelector; import { RotateCcw, Save } from 'lucide-react';
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

export default TextEditor; // src/components/Editor/TutorialOverlay.tsx
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface TutorialOverlayProps {
    targetElementId: string;
    step: number;
    onNext: () => void;
    onPrevious: () => void;
    onSkip: () => void;
    onClose: () => void;
    title: string;
    description: string;
    position: 'top' | 'bottom' | 'left' | 'right';
    showSkip?: boolean;
    totalSteps: number;
    currentStep: number;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
    targetElementId,
    step,
    onNext,
    onPrevious,
    onSkip,
    onClose,
    title,
    description,
    position,
    showSkip = true,
    totalSteps,
    currentStep
}) => {
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    useEffect(() => {
        const target = document.getElementById(targetElementId);
        if (target) {
            setTargetRect(target.getBoundingClientRect());
        }
    }, [targetElementId, step]);

    const getPositionStyle = (): React.CSSProperties => {
        if (!targetRect) return { display: 'none' };

        const baseStyle: React.CSSProperties = {
            position: 'fixed',
            zIndex: 1000,
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            padding: '10px',
            maxWidth: '320px',
            border: '2px solid #3b82f6'
        };

        switch (position) {
            case 'right':
                return {
                    ...baseStyle,
                    left: targetRect.right + 16,
                    top: targetRect.top + (targetRect.height / 2) - 140
                };
            case 'left':
                return {
                    ...baseStyle,
                    right: window.innerWidth - targetRect.left + 16,
                    top: targetRect.top + (targetRect.height / 2) - 60
                };
            case 'top':
                return {
                    ...baseStyle,
                    left: targetRect.left + (targetRect.width / 2) - 150,
                    bottom: window.innerHeight - targetRect.top + 16
                };
            case 'bottom':
                return {
                    ...baseStyle,
                    left: targetRect.left + (targetRect.width / 2) - 150,
                    top: targetRect.bottom + 16
                };
            default:
                return baseStyle;
        }
    };

    // Crear overlay para resaltar el elemento
    useEffect(() => {
        if (targetRect) {
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = `${targetRect.top - 4}px`;
            overlay.style.left = `${targetRect.left - 4}px`;
            overlay.style.width = `${targetRect.width + 8}px`;
            overlay.style.height = `${targetRect.height + 8}px`;
            overlay.style.borderRadius = '12px';
            overlay.style.border = '3px solid #3b82f6';
            overlay.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
            overlay.style.zIndex = '999';
            overlay.style.pointerEvents = 'none';
            overlay.id = 'tutorial-highlight';

            document.body.appendChild(overlay);

            return () => {
                const existing = document.getElementById('tutorial-highlight');
                if (existing) existing.remove();
            };
        }
    }, [targetRect]);

    return (
        <>
            {/* Fondo semi-transparente */}
            <div className="fixed inset-0 bg-black/50 z-[998]" onClick={onClose} />

            {/* Tarjeta del tutorial */}
            <div style={getPositionStyle()} className="animate-fadeIn">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                            Paso {currentStep + 1}/{totalSteps}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>

                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <button
                            onClick={onPrevious}
                            disabled={currentStep === 0}
                            className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onNext}
                            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors flex items-center gap-1"
                        >
                            {currentStep === totalSteps - 1 ? 'Finalizar' : 'Siguiente'}
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {showSkip && (
                        <button
                            onClick={onSkip}
                            className="text-xs text-gray-500 hover:text-gray-700"
                        >
                            Omitir tutorial
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default TutorialOverlay; // src/components/Editor/VisualEditorPanel.tsx - VERSIÓN CORREGIDA CON FALLBACKS
import {
    ChevronDown, ChevronRight, Eye,
    Layout, Link,
    Palette,
    Type
} from 'lucide-react';
import React, { useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultButtons, defaultSectionColors, defaultTypography, defaultUI } from '../../types/template.types';

type EditorSection = 'hero' | 'buttons' | 'header' | 'typography' | 'ui' | 'global';

export const VisualEditorPanel: React.FC = () => {
    const { template, updateSectionColors, updateTypography, updateUI, updateButtons } = useTemplate();
    const [expandedSection, setExpandedSection] = useState<EditorSection>('hero');

    // const sections = [
    //     { id: 'hero' as EditorSection, label: '🎨 Hero (Sección principal)', icon: Eye },
    //     { id: 'buttons' as EditorSection, label: '🔘 Botones', icon: Link },
    //     { id: 'header' as EditorSection, label: '📋 Header (Barra superior)', icon: Layout },
    //     { id: 'typography' as EditorSection, label: '✏️ Tipografía', icon: Type },
    //     { id: 'ui' as EditorSection, label: '🎨 Bordes y sombras', icon: Palette },
    //     { id: 'global' as EditorSection, label: '🌍 Configuración global', icon: Sparkles },
    // ];

    const SectionHeader = ({ section, label, icon: Icon }: { section: EditorSection; label: string; icon: React.ElementType }) => (
        <button
            onClick={() => setExpandedSection(expandedSection === section ? 'hero' : section)}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl mb-2"
        >
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-primary-500" />
                <span className="font-semibold text-gray-900 dark:text-white">{label}</span>
            </div>
            {expandedSection === section ?
                <ChevronDown className="w-5 h-5" /> :
                <ChevronRight className="w-5 h-5" />
            }
        </button>
    );

    if (!template) return null;

    // Valores por defecto para evitar undefined
    const sectionColors = template.sectionColors || defaultSectionColors;
    const typography = template.typography || defaultTypography;
    const ui = template.ui || defaultUI;
    const buttons = template.buttons || defaultButtons;

    return (
        <div className="space-y-3">
            {/* Hero Section */}
            <div>
                <SectionHeader section="hero" label="Hero (Sección principal)" icon={Eye} />
                {expandedSection === 'hero' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-3">
                        <h4 className="text-sm font-semibold mb-3">🎨 Colores del Hero</h4>

                        <ColorInput
                            label="Fondo del Hero"
                            value={sectionColors.heroBackground}
                            onChange={(color: string) => updateSectionColors({ heroBackground: color })}
                            description="Color de fondo de la sección principal"
                        />

                        <ColorInput
                            label="Color del título"
                            value={sectionColors.heroTitleColor}
                            onChange={(color: string) => updateSectionColors({ heroTitleColor: color })}
                            description="Color del texto principal"
                        />

                        <ColorInput
                            label="Color de la descripción"
                            value={sectionColors.heroDescriptionColor}
                            onChange={(color: string) => updateSectionColors({ heroDescriptionColor: color })}
                            description="Color del texto secundario"
                        />

                        <div className="border-t border-gray-200 dark:border-gray-700 my-3 pt-3">
                            <h4 className="text-sm font-semibold mb-3">✨ Badge (Etiqueta destacada)</h4>
                            <ColorInput
                                label="Fondo del badge"
                                value={sectionColors.heroBadgeBackground}
                                onChange={(color: string) => updateSectionColors({ heroBadgeBackground: color })}
                            />
                            <ColorInput
                                label="Texto del badge"
                                value={sectionColors.heroBadgeTextColor}
                                onChange={(color: string) => updateSectionColors({ heroBadgeTextColor: color })}
                            />
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 my-3 pt-3">
                            <h4 className="text-sm font-semibold mb-3">📏 Tamaños del Hero</h4>
                            <SizeInput
                                label="Tamaño del título"
                                value={typography.heroTitleSize}
                                onChange={(size: string) => updateTypography({ heroTitleSize: size })}
                                options={['2rem', '2.5rem', '3rem', '3.5rem', '4rem']}
                            />
                            <SizeInput
                                label="Tamaño de la descripción"
                                value={typography.heroDescriptionSize}
                                onChange={(size: string) => updateTypography({ heroDescriptionSize: size })}
                                options={['0.875rem', '1rem', '1.125rem', '1.25rem']}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Botones Section */}
            <div>
                <SectionHeader section="buttons" label="Botones" icon={Link} />
                {expandedSection === 'buttons' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-4">
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold">🔵 Botón principal</h4>
                            <TextInput
                                label="Texto del botón"
                                value={buttons.primary.text}
                                onChange={(text: string) => updateButtons({ primary: { ...buttons.primary, text } })}
                            />
                            <UrlInput
                                label="Enlace"
                                value={buttons.primary.url}
                                onChange={(url: string) => updateButtons({ primary: { ...buttons.primary, url } })}
                            />
                            <ColorInput
                                label="Color de fondo"
                                value={sectionColors.buttonPrimaryBackground}
                                onChange={(color: string) => updateSectionColors({ buttonPrimaryBackground: color })}
                            />
                            <ColorInput
                                label="Color del texto"
                                value={sectionColors.buttonPrimaryText}
                                onChange={(color: string) => updateSectionColors({ buttonPrimaryText: color })}
                            />
                            <ColorInput
                                label="Color al pasar el mouse"
                                value={sectionColors.buttonPrimaryHoverBackground}
                                onChange={(color: string) => updateSectionColors({ buttonPrimaryHoverBackground: color })}
                            />
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                            <h4 className="text-sm font-semibold mb-3">⚪ Botón secundario</h4>
                            <TextInput
                                label="Texto del botón"
                                value={buttons.secondary.text}
                                onChange={(text: string) => updateButtons({ secondary: { ...buttons.secondary, text } })}
                            />
                            <UrlInput
                                label="Enlace"
                                value={buttons.secondary.url}
                                onChange={(url: string) => updateButtons({ secondary: { ...buttons.secondary, url } })}
                            />
                            <ColorInput
                                label="Color de fondo"
                                value={sectionColors.buttonSecondaryBackground}
                                onChange={(color: string) => updateSectionColors({ buttonSecondaryBackground: color })}
                            />
                            <ColorInput
                                label="Color del texto"
                                value={sectionColors.buttonSecondaryText}
                                onChange={(color: string) => updateSectionColors({ buttonSecondaryText: color })}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Header Section */}
            <div>
                <SectionHeader section="header" label="Header (Barra superior)" icon={Layout} />
                {expandedSection === 'header' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-3">
                        <ColorInput
                            label="Fondo del header"
                            value={sectionColors.headerBackground}
                            onChange={(color: string) => updateSectionColors({ headerBackground: color })}
                        />
                        <ColorInput
                            label="Color del texto"
                            value={sectionColors.headerTextColor}
                            onChange={(color: string) => updateSectionColors({ headerTextColor: color })}
                        />
                        <ColorInput
                            label="Color de los enlaces"
                            value={sectionColors.headerLinkColor}
                            onChange={(color: string) => updateSectionColors({ headerLinkColor: color })}
                        />
                        <ColorInput
                            label="Color de enlaces al pasar mouse"
                            value={sectionColors.headerLinkHoverColor}
                            onChange={(color: string) => updateSectionColors({ headerLinkHoverColor: color })}
                        />
                    </div>
                )}
            </div>

            {/* Tipografía Section */}
            <div>
                <SectionHeader section="typography" label="Tipografía" icon={Type} />
                {expandedSection === 'typography' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-3">
                        <FontSelect
                            label="Fuente de títulos"
                            value={typography.headingFont}
                            onChange={(font: string) => updateTypography({ headingFont: font })}
                        />
                        <FontSelect
                            label="Fuente de textos"
                            value={typography.bodyFont}
                            onChange={(font: string) => updateTypography({ bodyFont: font })}
                        />
                        <SizeInput
                            label="Tamaño de títulos de sección"
                            value={typography.sectionTitleSize}
                            onChange={(size: string) => updateTypography({ sectionTitleSize: size })}
                            options={['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem']}
                        />
                        <SizeInput
                            label="Tamaño de texto general"
                            value={typography.bodyTextSize}
                            onChange={(size: string) => updateTypography({ bodyTextSize: size })}
                            options={['0.875rem', '1rem', '1.125rem']}
                        />
                    </div>
                )}
            </div>

            {/* UI Section */}
            <div>
                <SectionHeader section="ui" label="Bordes y sombras" icon={Palette} />
                {expandedSection === 'ui' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-3">
                        <BorderRadiusSelect
                            label="Bordes de botones"
                            value={ui.borderRadius.medium}
                            onChange={(radius: string) => updateUI({ borderRadius: { ...ui.borderRadius, medium: radius } })}
                        />
                        <BorderRadiusSelect
                            label="Bordes de tarjetas"
                            value={ui.borderRadius.large}
                            onChange={(radius: string) => updateUI({ borderRadius: { ...ui.borderRadius, large: radius } })}
                        />
                        <ShadowSelect
                            label="Sombra de tarjetas"
                            value={ui.boxShadow.medium}
                            onChange={(shadow: string) => updateUI({ boxShadow: { ...ui.boxShadow, medium: shadow } })}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

// Componentes auxiliares con tipado correcto
const ColorInput = ({ label, value, onChange, description }: {
    label: string;
    value: string;
    onChange: (color: string) => void;
    description?: string;
}) => (
    <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <div className="flex items-center gap-2">
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border border-gray-300"
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border rounded-lg font-mono"
            />
        </div>
        {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
);

const SizeInput = ({ label, value, onChange, options }: {
    label: string;
    value: string;
    onChange: (size: string) => void;
    options: string[];
}) => (
    <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg"
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const TextInput = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (text: string) => void;
}) => (
    <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg"
        />
    </div>
);

const UrlInput = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (url: string) => void;
}) => (
    <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <div className="flex gap-2">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="/ruta o https://..."
                className="flex-1 px-3 py-2 text-sm border rounded-lg"
            />
        </div>
    </div>
);

const FontSelect = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (font: string) => void;
}) => {
    const fonts = [
        { value: 'Inter, system-ui, sans-serif', label: 'Inter' },
        { value: 'Roboto, system-ui, sans-serif', label: 'Roboto' },
        { value: 'Poppins, system-ui, sans-serif', label: 'Poppins' },
        { value: 'Montserrat, system-ui, sans-serif', label: 'Montserrat' },
        { value: 'Open Sans, system-ui, sans-serif', label: 'Open Sans' },
        { value: 'system-ui, -apple-system, sans-serif', label: 'Sistema' },
    ];

    return (
        <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg"
                style={{ fontFamily: value }}
            >
                {fonts.map(font => (
                    <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                        {font.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

const BorderRadiusSelect = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (radius: string) => void;
}) => {
    const radii = [
        { value: '0.25rem', label: 'Pequeño (4px)' },
        { value: '0.5rem', label: 'Mediano (8px)' },
        { value: '0.75rem', label: 'Grande (12px)' },
        { value: '1rem', label: 'Extra grande (16px)' },
        { value: '9999px', label: 'Completamente redondo' },
    ];

    return (
        <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg"
            >
                {radii.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
            <div
                className="h-12 w-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2"
                style={{ borderRadius: value }}
            />
        </div>
    );
};

const ShadowSelect = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (shadow: string) => void;
}) => {
    const shadows = [
        { value: 'none', label: 'Sin sombra' },
        { value: '0 1px 2px 0 rgb(0 0 0 / 0.05)', label: 'Sutil' },
        { value: '0 4px 6px -1px rgb(0 0 0 / 0.1)', label: 'Mediana' },
        { value: '0 10px 15px -3px rgb(0 0 0 / 0.1)', label: 'Fuerte' },
        { value: '0 20px 25px -5px rgb(0 0 0 / 0.1)', label: 'Extra fuerte' },
    ];

    return (
        <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg"
            >
                {shadows.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <div
                className="h-12 w-full bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-xs"
                style={{ boxShadow: value }}
            >
                Vista previa
            </div>
        </div>
    );
}; // src/config/templateConfig.ts
import {
    Award,
    BarChart,
    Eye,
    FileText,
    Image,
    Info,
    Layout,
    Link,
    Link2,
    Mail,
    MessageSquare,
    Palette,
    Share2,
    Smile,
    Sparkles,
    Target,
    Type,
    type LucideIcon
} from 'lucide-react';
import type { SectionColors, TypographyConfig } from '../types/template.types';

// Interfaz para la configuración de un campo
export interface FieldConfig {
    type: 'color' | 'text' | 'size' | 'font' | 'icon' | 'checkbox' | 'image' | 'list';
    key: string;
    label: string;
    colorKey?: keyof SectionColors;
    textKey?: string;
    sizeKey?: keyof TypographyConfig;
    fontKey?: keyof TypographyConfig;
    iconKey?: string;
    checkboxKey?: string;
    imageElementId?: string;
    listConfig?: DynamicListConfig;
    defaultValue?: any;
    options?: string[] | { value: string; label: string; icon?: LucideIcon }[];
    sectionColorKey?: keyof SectionColors;
}

export interface DynamicListConfig {
    itemKeyPrefix: string;
    defaultCount: number;
    maxCount: number;
    fields: {
        type: 'text' | 'icon' | 'image' | 'color' | 'checkbox';
        key: string;
        label: string;
        defaultValue?: string | boolean;
        options?: any;
    }[];
    // 👇 NUEVO: valores específicos para los primeros ítems (si no se proporciona, se usa defaultValue)
    defaultItems?: any[];
}

export interface GroupConfig {
    id: string;
    title: string;
    icon: LucideIcon;
    fields?: FieldConfig[];
    dynamicList?: DynamicListConfig;
}

export interface SectionConfig {
    id: string;
    title: string;
    icon: LucideIcon;
    groups: GroupConfig[];
}

export interface TemplateConfig {
    sections: SectionConfig[];
}

// ==================== CONFIGURACIÓN DE CONSULTING COMPLETA ====================

const consultingConfig: TemplateConfig = {
    sections: [
        // ========== ESTILO DE FUENTE (global) ==========
        {
            id: 'typography',
            title: 'Estilo de Fuente',
            icon: Type,
            groups: [
                {
                    id: 'global_fonts',
                    title: 'Fuentes globales',
                    icon: Type,
                    fields: [
                        { type: 'font', label: 'Fuente de títulos', fontKey: 'headingFont', key: 'headingFont' },
                        { type: 'font', label: 'Fuente de textos', fontKey: 'bodyFont', key: 'bodyFont' },
                        { type: 'size', label: 'Peso de títulos', sizeKey: 'headingWeight', key: 'headingWeight', options: ['400', '500', '600', '700', '800'] },
                        { type: 'size', label: 'Peso de textos', sizeKey: 'bodyWeight', key: 'bodyWeight', options: ['300', '400', '500', '600'] },
                    ]
                }
            ]
        },
        // ========== HEADER ==========
        {
            id: 'header',
            title: 'Header',
            icon: Layout,
            groups: [
                {
                    id: 'logo',
                    title: 'Logo',
                    icon: Image,
                    fields: [
                        { type: 'image', label: 'Imagen del logo', imageElementId: 'header_logo', key: 'header_logo' },
                        { type: 'text', label: 'Texto parte 1 (KE)', textKey: 'header_brand_1', key: 'header_brand_1', defaultValue: 'KE' },
                        { type: 'text', label: 'Texto parte 2 (Consulting)', textKey: 'header_brand_2', key: 'header_brand_2', defaultValue: 'Consulting' },
                        { type: 'color', label: 'Color del texto 1 (KE)', sectionColorKey: 'logoTextColor1', key: 'logoTextColor1', defaultValue: '#2563eb' },
                        { type: 'color', label: 'Color del texto 2 (Consulting)', sectionColorKey: 'logoTextColor2', key: 'logoTextColor2', defaultValue: '#475569' },
                        { type: 'size', label: 'Tamaño del texto', key: 'logoTextSize', options: ['text-lg', 'text-xl', 'text-2xl', 'text-3xl'] },
                    ]
                },
                {
                    id: 'header_colors',
                    title: 'Colores del Header',
                    icon: Palette,
                    fields: [
                        { type: 'color', label: 'Fondo del header', sectionColorKey: 'headerBackground', key: 'headerBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color de los enlaces', sectionColorKey: 'headerLinkColor', key: 'headerLinkColor', defaultValue: '#475569' },
                        { type: 'color', label: 'Color de enlaces al pasar mouse', sectionColorKey: 'headerLinkHoverColor', key: 'headerLinkHoverColor', defaultValue: '#2563eb' },
                    ]
                },
                {
                    id: 'nav_links',
                    title: 'Enlaces de navegación',
                    icon: Link,
                    dynamicList: {
                        itemKeyPrefix: 'nav_link_',
                        defaultCount: 5,
                        maxCount: 8,
                        fields: [
                            { type: 'text', key: 'text', label: 'Texto', defaultValue: 'Inicio' },
                            { type: 'text', key: 'url', label: 'Destino', defaultValue: '#home' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ]
                    }
                },
                {
                    id: 'header_cta',
                    title: 'Botón CTA del header',
                    icon: Link2,
                    fields: [
                        { type: 'text', label: 'Texto del botón', textKey: 'header_cta', key: 'header_cta', defaultValue: 'Consultoría gratuita' },
                        { type: 'text', label: 'Enlace', textKey: 'header_cta_url', key: 'header_cta_url', defaultValue: '#contact' },
                        { type: 'color', label: 'Color de fondo', sectionColorKey: 'headerCtaBackground', key: 'headerCtaBackground', defaultValue: '#2563eb' },
                        { type: 'color', label: 'Color del texto', sectionColorKey: 'headerCtaText', key: 'headerCtaText', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color al pasar el mouse', sectionColorKey: 'headerCtaHoverBackground', key: 'headerCtaHoverBackground', defaultValue: '#1d4ed8' },
                        { type: 'checkbox', label: 'Mostrar botón', checkboxKey: 'show_header_cta', key: 'show_header_cta', defaultValue: true },
                    ]
                }
            ]
        },
        // ========== HERO ==========
        {
            id: 'hero',
            title: 'Hero (Sección principal)',
            icon: Eye,
            groups: [
                {
                    id: 'hero_images',
                    title: 'Imágenes',
                    icon: Image,
                    fields: [
                        { type: 'image', label: 'Imagen principal', imageElementId: 'hero_image', key: 'hero_image' },
                    ]
                },
                {
                    id: 'hero_texts',
                    title: 'Textos',
                    icon: Type,
                    fields: [
                        { type: 'text', label: 'Badge', textKey: 'hero_badge', key: 'hero_badge', defaultValue: 'Consultoría Estratégica de Negocios' },
                        { type: 'text', label: 'Título (parte 1)', textKey: 'hero_title_1', key: 'hero_title_1', defaultValue: 'Impulsamos el' },
                        { type: 'text', label: 'Título (parte 2)', textKey: 'hero_title_2', key: 'hero_title_2', defaultValue: 'Crecimiento Sostenible' },
                        { type: 'text', label: 'Título (parte 3)', textKey: 'hero_title_3', key: 'hero_title_3', defaultValue: 'de tu Empresa' },
                        { type: 'text', label: 'Descripción', textKey: 'hero_description', key: 'hero_description', defaultValue: 'Análisis profundo, estrategias personalizadas y acompañamiento continuo para llevar tu negocio al siguiente nivel.' },
                    ]
                },
                {
                    id: 'hero_decorative_icons',
                    title: 'Iconos decorativos y estadísticas',
                    icon: Smile,
                    fields: [
                        // Color y tamaño de iconos
                        { type: 'color', label: 'Color de los iconos', sectionColorKey: 'iconColor', key: 'iconColor', defaultValue: '#475569' },
                        {
                            type: 'size', label: 'Tamaño de los iconos', key: 'iconSize', options: [
                                { value: 'w-4 h-4', label: 'Pequeño (16px)' },
                                { value: 'w-5 h-5', label: 'Mediano (20px)' },
                                { value: 'w-6 h-6', label: 'Grande (24px)' },
                                { value: 'w-8 h-8', label: 'Extra grande (32px)' }
                            ]
                        },
                        // Color y tamaño de los valores numéricos
                        { type: 'color', label: 'Color de los valores numéricos', sectionColorKey: 'statValueColor', key: 'statValueColor', defaultValue: '#2563eb' },
                        { type: 'size', label: 'Tamaño de los valores numéricos', key: 'statValueSize', options: ['0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem'] },
                        // Color y tamaño de las etiquetas
                        { type: 'color', label: 'Color de las etiquetas', sectionColorKey: 'statLabelColor', key: 'statLabelColor', defaultValue: '#475569' },
                        { type: 'size', label: 'Tamaño de las etiquetas', key: 'statLabelSize', options: ['0.7rem', '0.8rem', '0.875rem', '1rem'] },
                    ],
                    dynamicList: {
                        itemKeyPrefix: 'hero_stat_item_',
                        defaultCount: 4,
                        maxCount: 8,
                        fields: [
                            { type: 'icon', key: 'icon', label: 'Icono', defaultValue: 'TrendingUp' },
                            { type: 'text', key: 'value', label: 'Valor numérico', defaultValue: '+45%' },
                            { type: 'text', key: 'label', label: 'Etiqueta', defaultValue: 'crecimiento' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        defaultItems: [
                            { icon: 'TrendingUp', value: '+45%', label: 'crecimiento', visible: true },
                            { icon: 'Users', value: '+15', label: 'equipos', visible: true },
                            { icon: 'Target', value: '100%', label: 'objetivos', visible: true },
                            { icon: 'TrendingUp', value: '80%', label: 'parcial', visible: true }
                        ]
                    }
                },
                {
                    id: 'hero_colors',
                    title: 'Colores del Hero',
                    icon: Palette,
                    fields: [
                        { type: 'color', label: 'Fondo del Hero', sectionColorKey: 'heroBackground', key: 'heroBackground', defaultValue: '#f8fafc' },
                        { type: 'color', label: 'Color del título', sectionColorKey: 'heroTitleColor', key: 'heroTitleColor', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Color de la descripción', sectionColorKey: 'heroDescriptionColor', key: 'heroDescriptionColor', defaultValue: '#475569' },
                        { type: 'color', label: 'Fondo del badge', sectionColorKey: 'heroBadgeBackground', key: 'heroBadgeBackground', defaultValue: '#3b82f6' },
                        { type: 'color', label: 'Texto del badge', sectionColorKey: 'heroBadgeTextColor', key: 'heroBadgeTextColor', defaultValue: '#ffffff' },
                    ]
                },
                {
                    id: 'hero_buttons',
                    title: 'Botones del Hero',
                    icon: Link,
                    fields: [
                        // Botón principal
                        { type: 'text', label: 'Texto botón principal', textKey: 'cta_primary', key: 'cta_primary', defaultValue: 'Solicitar consultoría' },
                        { type: 'text', label: 'Enlace botón principal', textKey: 'cta_primary_url', key: 'cta_primary_url', defaultValue: '/contacto' },
                        { type: 'color', label: 'Color fondo principal', sectionColorKey: 'buttonPrimaryBackground', key: 'buttonPrimaryBackground', defaultValue: '#2563eb' },
                        { type: 'color', label: 'Color texto principal', sectionColorKey: 'buttonPrimaryText', key: 'buttonPrimaryText', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color hover principal', sectionColorKey: 'buttonPrimaryHoverBackground', key: 'buttonPrimaryHoverBackground', defaultValue: '#1d4ed8' },
                        { type: 'checkbox', label: 'Mostrar botón principal', checkboxKey: 'show_hero_primary_button', key: 'show_hero_primary_button', defaultValue: true },
                        // Botón secundario
                        { type: 'text', label: 'Texto botón secundario', textKey: 'cta_secondary', key: 'cta_secondary', defaultValue: 'Conocer metodología' },
                        { type: 'text', label: 'Enlace botón secundario', textKey: 'cta_secondary_url', key: 'cta_secondary_url', defaultValue: '#metodologia' },
                        { type: 'color', label: 'Color fondo secundario', sectionColorKey: 'buttonSecondaryBackground', key: 'buttonSecondaryBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color texto secundario', sectionColorKey: 'buttonSecondaryText', key: 'buttonSecondaryText', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Color hover secundario', sectionColorKey: 'buttonSecondaryHoverBackground', key: 'buttonSecondaryHoverBackground', defaultValue: '#f1f5f9' },
                        { type: 'checkbox', label: 'Mostrar botón secundario', checkboxKey: 'show_hero_secondary_button', key: 'show_hero_secondary_button', defaultValue: true },
                    ]
                },
                {
                    id: 'hero_typography',
                    title: 'Tipografía del Hero',
                    icon: Type,
                    fields: [
                        { type: 'size', label: 'Tamaño del título', sizeKey: 'heroTitleSize', key: 'heroTitleSize', options: ['2rem', '2.5rem', '3rem', '3.5rem', '4rem'] },
                        { type: 'size', label: 'Tamaño de la descripción', sizeKey: 'heroDescriptionSize', key: 'heroDescriptionSize', options: ['0.875rem', '1rem', '1.125rem', '1.25rem'] },
                    ]
                }
            ]
        },
        // ========== FEATURES (Características) ==========
        {
            id: 'features',
            title: 'Características / Servicios',
            icon: Sparkles,
            groups: [
                {
                    id: 'features_colors',
                    title: 'Colores',
                    icon: Palette,
                    fields: [
                        { type: 'color', label: 'Fondo de sección', sectionColorKey: 'featuresBackground', key: 'featuresBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color de títulos', sectionColorKey: 'featuresTitleColor', key: 'featuresTitleColor', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Fondo de tarjetas', sectionColorKey: 'featuresCardBackground', key: 'featuresCardBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Borde de tarjetas', sectionColorKey: 'featuresCardBorder', key: 'featuresCardBorder', defaultValue: '#e2e8f0' },
                        { type: 'color', label: 'Color de iconos', sectionColorKey: 'featuresIconColor', key: 'featuresIconColor', defaultValue: '#2563eb' },
                    ]
                },
                {
                    id: 'features_texts',
                    title: 'Textos de la sección',
                    icon: Type,
                    fields: [
                        { type: 'text', label: 'Título principal (parte 1)', textKey: 'features_title_1', key: 'features_title_1', defaultValue: 'Capacidades que' },
                        { type: 'text', label: 'Título principal (parte 2)', textKey: 'features_title_2', key: 'features_title_2', defaultValue: 'Transforman' },
                        { type: 'text', label: 'Descripción', textKey: 'features_description', key: 'features_description', defaultValue: 'No solo aconsejamos, implementamos. Te acompañamos en cada paso con herramientas y metodologías probadas.' },
                    ]
                },
                {
                    id: 'features_dynamic',
                    title: 'Tarjetas de características (hasta 9)',
                    icon: Sparkles,
                    dynamicList: {
                        itemKeyPrefix: 'feature_',
                        defaultCount: 6,
                        maxCount: 9,
                        fields: [
                            { type: 'icon', key: 'icon', label: 'Icono', defaultValue: 'BarChart' },
                            { type: 'text', key: 'title', label: 'Título', defaultValue: 'Análisis Estratégico' },
                            { type: 'text', key: 'description', label: 'Descripción', defaultValue: 'Evaluación profunda de tu mercado...' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ]
                    }
                },
                {
                    id: 'features_typography',
                    title: 'Tipografía',
                    icon: Type,
                    fields: [
                        { type: 'size', label: 'Tamaño del título de sección', sizeKey: 'featuresTitleSize', key: 'featuresTitleSize', options: ['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem'] },
                        { type: 'size', label: 'Tamaño del título de tarjetas', sizeKey: 'featuresCardTitleSize', key: 'featuresCardTitleSize', options: ['1.125rem', '1.25rem', '1.5rem', '1.75rem'] },
                        { type: 'size', label: 'Tamaño de la descripción', sizeKey: 'featuresDescriptionSize', key: 'featuresDescriptionSize', options: ['0.875rem', '1rem', '1.125rem'] },
                    ]
                }
            ]
        },
        // ========== ABOUT (Sobre Nosotros) ==========
        {
            id: 'about',
            title: 'Sobre Nosotros',
            icon: Info,
            groups: [
                {
                    id: 'about_colors',
                    title: 'Colores',
                    icon: Palette,
                    fields: [
                        { type: 'color', label: 'Fondo de sección', sectionColorKey: 'aboutBackground', key: 'aboutBackground', defaultValue: '#f8fafc' },
                        { type: 'color', label: 'Color de títulos', sectionColorKey: 'aboutTitleColor', key: 'aboutTitleColor', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Color de texto', sectionColorKey: 'aboutTextColor', key: 'aboutTextColor', defaultValue: '#475569' },
                        { type: 'color', label: 'Color del badge', sectionColorKey: 'aboutBadgeBackground', key: 'aboutBadgeBackground', defaultValue: '#2563eb' },
                        { type: 'color', label: 'Texto del badge', sectionColorKey: 'aboutBadgeTextColor', key: 'aboutBadgeTextColor', defaultValue: '#ffffff' },
                    ]
                },
                {
                    id: 'about_image',
                    title: 'Imagen',
                    icon: Image,
                    fields: [
                        { type: 'image', label: 'Imagen', imageElementId: 'about_image', key: 'about_image' },
                        { type: 'size', label: 'Borde redondeado', sectionColorKey: 'aboutImageBorderRadius', key: 'aboutImageBorderRadius', options: ['0rem', '0.5rem', '1rem', '1.5rem', '9999px'] },
                    ]
                },
                {
                    id: 'about_stats',
                    title: 'Estadísticas (hasta 8)',
                    icon: BarChart,
                    dynamicList: {
                        itemKeyPrefix: 'stat_',
                        defaultCount: 4,
                        maxCount: 8,
                        fields: [
                            { type: 'icon', key: 'icon', label: 'Icono', defaultValue: 'Briefcase' },
                            { type: 'text', key: 'value', label: 'Valor', defaultValue: '15+' },
                            { type: 'text', key: 'label', label: 'Etiqueta', defaultValue: 'Años de experiencia' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ]
                    }
                },
                {
                    id: 'about_texts',
                    title: 'Textos editables',
                    icon: Type,
                    fields: [
                        { type: 'text', label: 'Badge (sobre nosotros)', textKey: 'about_section_badge', key: 'about_section_badge', defaultValue: 'Nuestra Firma' },
                        { type: 'text', label: 'Título (parte 1)', textKey: 'about_heading_1', key: 'about_heading_1', defaultValue: 'Consultoría con' },
                        { type: 'text', label: 'Título (parte 2)', textKey: 'about_heading_2', key: 'about_heading_2', defaultValue: 'Resultados Medibles' },
                        { type: 'text', label: 'Descripción 1', textKey: 'about_description_1', key: 'about_description_1', defaultValue: 'En Kernelize Consulting no creemos en soluciones genéricas...' },
                        { type: 'text', label: 'Descripción 2', textKey: 'about_description_2', key: 'about_description_2', defaultValue: 'Nuestro enfoque combina el rigor analítico con la creatividad...' },
                    ]
                },
                {
                    id: 'about_differentiators',
                    title: 'Diferenciadores (Lista "Nuestro compromiso")',
                    icon: Award,
                    dynamicList: {
                        itemKeyPrefix: 'differentiator_',
                        defaultCount: 4,
                        maxCount: 8,
                        fields: [
                            { type: 'text', key: 'text', label: 'Texto', defaultValue: 'Metodologías ágiles y adaptativas' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ]
                    }
                },
                {
                    id: 'about_typography',
                    title: 'Tipografía',
                    icon: Type,
                    fields: [
                        { type: 'size', label: 'Tamaño del título', sizeKey: 'aboutTitleSize', key: 'aboutTitleSize', options: ['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem'] },
                        { type: 'size', label: 'Tamaño del texto', sizeKey: 'aboutTextSize', key: 'aboutTextSize', options: ['0.875rem', '1rem', '1.125rem'] },
                        { type: 'size', label: 'Tamaño de valores estadísticos', sizeKey: 'aboutStatsValueSize', key: 'aboutStatsValueSize', options: ['1rem', '1.25rem', '1.5rem', '1.75rem'] },
                        { type: 'size', label: 'Tamaño de etiquetas estadísticas', sizeKey: 'aboutStatsLabelSize', key: 'aboutStatsLabelSize', options: ['0.7rem', '0.8rem', '0.875rem', '1rem'] },
                        { type: 'size', label: 'Tamaño de diferenciadores', sizeKey: 'aboutDifferentiatorSize', key: 'aboutDifferentiatorSize', options: ['0.875rem', '1rem', '1.125rem'] },
                    ]
                }
            ]
        },
        // ========== TESTIMONIALS ==========
        {
            id: 'testimonials',
            title: 'Testimonios',
            icon: MessageSquare,
            groups: [
                {
                    id: 'testimonials_colors',
                    title: 'Colores',
                    icon: Palette,
                    fields: [
                        { type: 'color', label: 'Fondo de sección', sectionColorKey: 'testimonialsBackground', key: 'testimonialsBackground', defaultValue: '#0f172a' },
                        { type: 'color', label: 'Color de títulos', sectionColorKey: 'testimonialsTitleColor', key: 'testimonialsTitleColor', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color de texto', sectionColorKey: 'testimonialsTextColor', key: 'testimonialsTextColor', defaultValue: '#cbd5e1' },
                        { type: 'color', label: 'Fondo de tarjetas', sectionColorKey: 'testimonialsCardBackground', key: 'testimonialsCardBackground', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Borde de tarjetas', sectionColorKey: 'testimonialsCardBorder', key: 'testimonialsCardBorder', defaultValue: '#334155' },
                        { type: 'color', label: 'Color de nombre', sectionColorKey: 'testimonialsNameColor', key: 'testimonialsNameColor', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color de rol', sectionColorKey: 'testimonialsRoleColor', key: 'testimonialsRoleColor', defaultValue: '#94a3b8' },
                    ]
                },
                {
                    id: 'testimonials_dynamic',
                    title: 'Testimonios (hasta 8)',
                    icon: MessageSquare,
                    dynamicList: {
                        itemKeyPrefix: 'testimonial_',
                        defaultCount: 3,
                        maxCount: 8,
                        fields: [
                            { type: 'text', key: 'name', label: 'Nombre', defaultValue: 'Carlos Méndez' },
                            { type: 'text', key: 'role', label: 'Rol', defaultValue: 'CEO - TechCorp LATAM' },
                            { type: 'text', key: 'content', label: 'Contenido', defaultValue: 'El equipo de Kernelize reestructuró nuestra estrategia comercial por completo...' },
                            { type: 'text', key: 'image', label: 'Inicial/imagen', defaultValue: 'CM' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ]
                    }
                },
                {
                    id: 'testimonials_indicators',
                    title: 'Indicadores de confianza (hasta 8)',
                    icon: BarChart,
                    dynamicList: {
                        itemKeyPrefix: 'indicator_',
                        defaultCount: 4,
                        maxCount: 8,
                        fields: [
                            { type: 'icon', key: 'icon', label: 'Icono', defaultValue: 'Briefcase' },
                            { type: 'text', key: 'value', label: 'Valor', defaultValue: '100+' },
                            { type: 'text', key: 'label', label: 'Etiqueta', defaultValue: 'Proyectos anuales' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ]
                    }
                },
                {
                    id: 'testimonials_typography',
                    title: 'Tipografía',
                    icon: Type,
                    fields: [
                        { type: 'size', label: 'Tamaño del título de sección', sizeKey: 'testimonialsTitleSize', key: 'testimonialsTitleSize', options: ['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem'] },
                        { type: 'size', label: 'Tamaño del nombre', sizeKey: 'testimonialsNameSize', key: 'testimonialsNameSize', options: ['1rem', '1.125rem', '1.25rem'] },
                        { type: 'size', label: 'Tamaño del rol', sizeKey: 'testimonialsRoleSize', key: 'testimonialsRoleSize', options: ['0.75rem', '0.875rem', '1rem'] },
                        { type: 'size', label: 'Tamaño del texto del testimonio', sizeKey: 'testimonialsTextSize', key: 'testimonialsTextSize', options: ['0.875rem', '1rem', '1.125rem'] },
                    ]
                }
            ]
        },
        // ========== CONTACTO ==========
        {
            id: 'contact',
            title: 'Contacto',
            icon: Mail,
            groups: [
                {
                    id: 'contact_colors',
                    title: 'Colores',
                    icon: Palette,
                    fields: [
                        { type: 'color', label: 'Fondo de sección', sectionColorKey: 'contactBackground', key: 'contactBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color de títulos', sectionColorKey: 'contactTitleColor', key: 'contactTitleColor', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Color de texto', sectionColorKey: 'contactTextColor', key: 'contactTextColor', defaultValue: '#475569' },
                        { type: 'color', label: 'Fondo del formulario', sectionColorKey: 'contactFormBackground', key: 'contactFormBackground', defaultValue: '#f8fafc' },
                        { type: 'color', label: 'Borde del formulario', sectionColorKey: 'contactFormBorder', key: 'contactFormBorder', defaultValue: '#e2e8f0' },
                        { type: 'color', label: 'Fondo de inputs', sectionColorKey: 'contactInputBackground', key: 'contactInputBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Borde de inputs', sectionColorKey: 'contactInputBorder', key: 'contactInputBorder', defaultValue: '#cbd5e1' },
                        { type: 'color', label: 'Color de texto de inputs', sectionColorKey: 'contactInputTextColor', key: 'contactInputTextColor', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Fondo del botón', sectionColorKey: 'contactButtonBackground', key: 'contactButtonBackground', defaultValue: '#2563eb' },
                        { type: 'color', label: 'Texto del botón', sectionColorKey: 'contactButtonText', key: 'contactButtonText', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Fondo del botón al pasar mouse', sectionColorKey: 'contactButtonHoverBackground', key: 'contactButtonHoverBackground', defaultValue: '#1d4ed8' },
                    ]
                },
                {
                    id: 'contact_cards',
                    title: 'Tarjetas de contacto',
                    icon: Link,
                    dynamicList: {
                        itemKeyPrefix: 'contact_card_',
                        defaultCount: 3,
                        maxCount: 6,
                        fields: [
                            { type: 'icon', key: 'icon', label: 'Icono', defaultValue: 'Mail' },
                            { type: 'text', key: 'title', label: 'Título', defaultValue: 'Email' },
                            { type: 'text', key: 'content', label: 'Contenido', defaultValue: 'consultoria@kernelize.com' },
                            { type: 'text', key: 'href', label: 'Enlace', defaultValue: 'mailto:consultoria@kernelize.com' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ]
                    }
                },
                {
                    id: 'contact_form_texts',
                    title: 'Textos del formulario',
                    icon: Type,
                    fields: [
                        { type: 'text', label: 'Título del formulario', textKey: 'contact_form_title', key: 'contact_form_title', defaultValue: 'Solicita una reunión de diagnóstico' },
                        { type: 'text', label: 'Label nombre', textKey: 'contact_label_name', key: 'contact_label_name', defaultValue: 'Nombre completo *' },
                        { type: 'text', label: 'Label email', textKey: 'contact_label_email', key: 'contact_label_email', defaultValue: 'Email corporativo *' },
                        { type: 'text', label: 'Texto del botón', textKey: 'contact_submit', key: 'contact_submit', defaultValue: 'Solicitar reunión' },
                        { type: 'text', label: 'Texto "Enviando"', textKey: 'contact_sending', key: 'contact_sending', defaultValue: 'Enviando...' },
                        { type: 'text', label: 'Título éxito', textKey: 'contact_success_title', key: 'contact_success_title', defaultValue: '¡Mensaje enviado con éxito!' },
                        { type: 'text', label: 'Mensaje éxito', textKey: 'contact_success_message', key: 'contact_success_message', defaultValue: 'En menos de 12 horas hábiles, uno de nuestros consultores se comunicará contigo.' },
                        { type: 'text', label: 'Botón éxito', textKey: 'contact_success_button', key: 'contact_success_button', defaultValue: 'Enviar otro mensaje' },
                    ]
                },
                {
                    id: 'contact_typography',
                    title: 'Tipografía',
                    icon: Type,
                    fields: [
                        { type: 'size', label: 'Tamaño del título de sección', sizeKey: 'contactTitleSize', key: 'contactTitleSize', options: ['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem'] },
                        { type: 'size', label: 'Tamaño del texto general', sizeKey: 'contactTextSize', key: 'contactTextSize', options: ['0.875rem', '1rem', '1.125rem'] },
                        { type: 'size', label: 'Tamaño de las etiquetas', sizeKey: 'contactLabelSize', key: 'contactLabelSize', options: ['0.75rem', '0.875rem', '1rem'] },
                        { type: 'size', label: 'Tamaño del botón', sizeKey: 'contactButtonSize', key: 'contactButtonSize', options: ['0.875rem', '1rem', '1.125rem'] },
                        { type: 'size', label: 'Tamaño de títulos de tarjetas', sizeKey: 'contactCardTitleSize', key: 'contactCardTitleSize', options: ['1rem', '1.125rem', '1.25rem', '1.5rem'] },
                    ]
                }
            ]
        },
        // ========== FOOTER ==========
        {
            id: 'footer',
            title: 'Footer',
            icon: Layout,
            groups: [
                {
                    id: 'footer_logo',
                    title: 'Logo y marca',
                    icon: Image,
                    fields: [
                        { type: 'image', label: 'Imagen del logo', imageElementId: 'footer_logo', key: 'footer_logo' },
                        { type: 'icon', label: 'Icono alternativo', iconKey: 'footer_brand_icon', key: 'footer_brand_icon', defaultValue: 'Briefcase' },
                        { type: 'text', label: 'Texto primera parte', textKey: 'footer_brand_1', key: 'footer_brand_1', defaultValue: 'Kernelize' },
                        { type: 'text', label: 'Texto segunda parte', textKey: 'footer_brand_2', key: 'footer_brand_2', defaultValue: 'Consulting' },
                        { type: 'text', label: 'Descripción', textKey: 'footer_description', key: 'footer_description', defaultValue: 'Transformamos empresas a través de estrategias innovadoras y acompañamiento experto. Más de 15 años impulsando el éxito de nuestros clientes.' },
                    ]
                },
                {
                    id: 'footer_quick_links',
                    title: 'Enlaces rápidos',
                    icon: Link,
                    dynamicList: {
                        itemKeyPrefix: 'quicklink_',
                        defaultCount: 5,
                        maxCount: 8,
                        fields: [
                            { type: 'text', key: 'label', label: 'Texto', defaultValue: 'Inicio' },
                            { type: 'text', key: 'url', label: 'Destino', defaultValue: '#home' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ]
                    }
                },
                {
                    id: 'footer_expertise',
                    title: 'Áreas de expertise',
                    icon: Target,
                    dynamicList: {
                        itemKeyPrefix: 'expertise_',
                        defaultCount: 5,
                        maxCount: 8,
                        fields: [
                            { type: 'text', key: 'label', label: 'Texto', defaultValue: 'Estrategia Corporativa' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ]
                    }
                },
                {
                    id: 'footer_contact_info',
                    title: 'Contacto directo',
                    icon: Mail,
                    fields: [
                        { type: 'text', label: 'Email', textKey: 'footer_contact_email', key: 'footer_contact_email', defaultValue: 'consultoria@kernelize.com' },
                        { type: 'text', label: 'Teléfono', textKey: 'footer_contact_phone', key: 'footer_contact_phone', defaultValue: '+54 9 11 6745-7413' },
                        { type: 'text', label: 'Ubicación', textKey: 'footer_contact_location', key: 'footer_contact_location', defaultValue: 'Buenos Aires, Argentina' },
                    ]
                },
                {
                    id: 'footer_legal',
                    title: 'Copyright y legal',
                    icon: FileText,
                    fields: [
                        { type: 'text', label: 'Copyright', textKey: 'footer_copyright', key: 'footer_copyright', defaultValue: 'Kernelize Consulting. Todos los derechos reservados.' },
                        { type: 'text', label: 'Texto "Hecho con"', textKey: 'footer_made_with', key: 'footer_made_with', defaultValue: 'Hecho con' },
                        { type: 'text', label: 'Texto "para empresas"', textKey: 'footer_for', key: 'footer_for', defaultValue: 'para empresas que buscan crecer' },
                    ]
                },
                {
                    id: 'footer_certifications',
                    title: 'Certificaciones (hasta 8)',
                    icon: Award,
                    dynamicList: {
                        itemKeyPrefix: 'cert_',
                        defaultCount: 4,
                        maxCount: 8,
                        fields: [
                            { type: 'text', key: 'label', label: 'Texto', defaultValue: 'ISO 9001:2024' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ]
                    }
                },
                {
                    id: 'footer_social',
                    title: 'Redes Sociales',
                    icon: Share2,
                    fields: [
                        { type: 'color', label: 'Color del ícono', sectionColorKey: 'socialIconColor', key: 'socialIconColor', defaultValue: '#94a3b8' },
                        { type: 'color', label: 'Color al pasar mouse', sectionColorKey: 'socialIconHoverColor', key: 'socialIconHoverColor', defaultValue: '#3b82f6' },
                        { type: 'text', label: 'Facebook URL', textKey: 'social_facebook_url', key: 'social_facebook_url', defaultValue: '' },
                        { type: 'text', label: 'Instagram URL', textKey: 'social_instagram_url', key: 'social_instagram_url', defaultValue: '' },
                        { type: 'text', label: 'LinkedIn URL', textKey: 'social_linkedin_url', key: 'social_linkedin_url', defaultValue: '' },
                        { type: 'text', label: 'Twitter URL', textKey: 'social_twitter_url', key: 'social_twitter_url', defaultValue: '' },
                        { type: 'checkbox', label: 'Mostrar Facebook', checkboxKey: 'show_social_facebook', key: 'show_social_facebook', defaultValue: true },
                        { type: 'checkbox', label: 'Mostrar Instagram', checkboxKey: 'show_social_instagram', key: 'show_social_instagram', defaultValue: true },
                        { type: 'checkbox', label: 'Mostrar LinkedIn', checkboxKey: 'show_social_linkedin', key: 'show_social_linkedin', defaultValue: true },
                        { type: 'checkbox', label: 'Mostrar Twitter', checkboxKey: 'show_social_twitter', key: 'show_social_twitter', defaultValue: true },
                    ]
                },
                {
                    id: 'footer_typography',
                    title: 'Tipografía',
                    icon: Type,
                    fields: [
                        { type: 'size', label: 'Tamaño de los títulos', sizeKey: 'footerHeadingSize', key: 'footerHeadingSize', options: ['1rem', '1.125rem', '1.25rem', '1.5rem'] },
                        { type: 'size', label: 'Tamaño del texto general', sizeKey: 'footerTextSize', key: 'footerTextSize', options: ['0.75rem', '0.875rem', '1rem'] },
                        { type: 'size', label: 'Tamaño de los enlaces', sizeKey: 'footerLinkSize', key: 'footerLinkSize', options: ['0.75rem', '0.875rem', '1rem'] },
                    ]
                }
            ]
        }
    ]
};

export const templateConfigs: Record<string, TemplateConfig> = {
    consulting: consultingConfig,
    // catering: cateringConfig, // se agregará más adelante
}; // src/contexts/AuthContext.tsx - VERSIÓN CORREGIDA
import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type {
  AuthResponse,
  LoginCredentials,
  Order,
  RegisterData,
  User
} from '../services/api/auth.service';
import * as authService from '../services/api/auth.service';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (userData: RegisterData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<User>;
  getUserOrders: () => Promise<Order[]>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar usuario al iniciar
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (!storedToken || !storedUser) {
        setIsLoading(false);
        return;
      }

      try {
        // Verificar si el token es válido
        if (!authService.isAuthenticated()) {
          // Intentar refrescar el token
          try {
            const refreshResult = await authService.refreshToken();
            // Actualizar token con el nuevo
            setToken(refreshResult.token);
            localStorage.setItem('token', refreshResult.token);
          } catch (refreshError) {
            console.log('Token expirado, limpiando datos');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
            setIsLoading(false);
            return;
          }
        }

        // Obtener perfil actualizado
        const profile = await authService.getProfile();
        setUser(profile);
        setToken(storedToken);

        // Actualizar localStorage con perfil actualizado
        localStorage.setItem('user', JSON.stringify(profile));
      } catch (error) {
        console.error('Error cargando perfil:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // ✅ Función para refrescar datos del usuario - CORREGIDA
  const refreshUser = async () => {
    setIsRefreshing(true);
    try {
      // Obtener el token actual
      const currentToken = localStorage.getItem('token');
      
      // Obtener el perfil actualizado
      const profile = await authService.getProfile();
      
      // Actualizar estado y localStorage
      setUser(profile);
      setToken(currentToken);
      localStorage.setItem('user', JSON.stringify(profile));
      
      console.log('✅ Usuario refrescado correctamente', { 
        profile, 
        hasToken: !!currentToken,
        isAuthenticated: !!currentToken && !!profile
      });
    } catch (error: any) {
      console.error('Error refrescando usuario:', error);
      // Si es error de conexión, no limpiar la sesión
      if (error.errorCode !== 'CONNECTION_ERROR') {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
      }
      throw error;
    } finally {
      setIsRefreshing(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);

      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('refreshToken', response.refreshToken);

      return response;
    } catch (error: any) {
      const message = error.message || 'Error al iniciar sesión';
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(userData);

      if (response.token) {
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }
      }

      return response;
    } catch (error: any) {
      const message = error.message || 'Error al registrarse';
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.logout();
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<User> => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await authService.updateProfile(userData);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error: any) {
      const message = error.message || 'Error actualizando perfil';
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserOrders = async (): Promise<Order[]> => {
    try {
      const orders = await authService.getUserOrders();
      return orders;
    } catch (error: any) {
      const message = error.message || 'Error obteniendo pedidos';
      setError(message);
      throw error;
    }
  };

  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user && authService.isAuthenticated(),
    isLoading,
    isRefreshing,
    error,
    login,
    register,
    logout,
    updateProfile,
    getUserOrders,
    clearError,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; import React, { createContext, useContext, useState } from 'react';
import { getDefaultTemplateColors } from '../data/types/templateDefaultColors';
import { templateApi } from '../services/api/templateApi.service';
import { storageService } from '../services/storageService';
import type {
    ButtonConfig,
    EditorConfig,
    SectionColors,
    Template,
    TemplateColors,
    TypographyConfig,
    UIConfig
} from '../types/template.types';
import {
    colorPresets,
    defaultButtons,
    defaultSectionColors,
    defaultTypography,
    defaultUI,
    fullPresets
} from '../types/template.types';
import { useAuth } from './AuthContext';

interface TemplateContextType {
    template: Template | null;
    setTemplate: (template: Template) => void;
    updateColors: (colors: Partial<TemplateColors>) => void;
    updateSectionColors: (colors: Partial<SectionColors>) => void;
    updateTypography: (typography: Partial<TypographyConfig>) => void;
    updateUI: (ui: Partial<UIConfig>) => void;
    updateButtons: (buttons: Partial<ButtonConfig>) => void;
    updateText: (key: string, value: string) => void;
    updateImage: (key: string, file: File) => Promise<void>;
    resetTemplate: (type: string) => void;
    applyPreset: (presetName: string) => void;
    saveDraft: () => void;
    loadDraft: () => void;
    exportTemplate: () => void;
    saveToBackend: () => Promise<any>;
    loadFromBackend: (templateId: string) => Promise<void>;
    getUserTemplates: () => Promise<any>;
    hasUnsavedChanges: boolean;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    editorConfig: EditorConfig;
    setEditorConfig: (config: Partial<EditorConfig>) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    const [template, setTemplateState] = useState<Template | null>(null);
    const [history, setHistory] = useState<Template[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [editorConfig, setEditorConfigState] = useState<EditorConfig>({
        isEditing: false,
        selectedElement: null,
        showEditor: true,
        notifications: null
    });

    // Asegura que sectionColors tenga todas las propiedades
    const ensureCompleteSectionColors = (sectionColors: Partial<SectionColors> | undefined): SectionColors => {
        return {
            ...defaultSectionColors,
            ...(sectionColors || {}),
        };
    };

    const setTemplate = (newTemplate: Template) => {
        const completeTemplate = {
            ...newTemplate,
            sectionColors: ensureCompleteSectionColors(newTemplate.sectionColors),
        };
        setTemplateState(completeTemplate);
        setHistory([completeTemplate]);
        setHistoryIndex(0);
        setHasUnsavedChanges(false);
    };

    const addToHistory = (newTemplate: Template) => {
        setHistory(prev => [...prev.slice(0, historyIndex + 1), newTemplate]);
        setHistoryIndex(prev => prev + 1);
    };

    const updateColors = (colors: Partial<TemplateColors>) => {
        setTemplateState(prev => {
            if (!prev) return prev;
            const updated = {
                ...prev,
                colors: { ...prev.colors, ...colors },
                updatedAt: new Date()
            };
            addToHistory(updated);
            setHasUnsavedChanges(true);
            return updated;
        });
    };

    const updateSectionColors = (colors: Partial<SectionColors>) => {
        console.log('updateSectionColors called with:', colors);
        if (!template) return;
        const updatedTemplate = {
            ...template,
            sectionColors: { ...template.sectionColors, ...colors },
            updatedAt: new Date()
        };
        console.log('new sectionColors:', updatedTemplate.sectionColors);
        setTemplateState(updatedTemplate);
        addToHistory(updatedTemplate);
        setHasUnsavedChanges(true);
    };

    const updateTypography = (typography: Partial<TypographyConfig>) => {
        console.log('updateTypography called with:', typography);
        setTemplateState(prev => {
            if (!prev) return prev;
            const updated = {
                ...prev,
                typography: { ...prev.typography, ...typography },
                updatedAt: new Date()
            };
            addToHistory(updated);
            setHasUnsavedChanges(true);
            return updated;
        });
    };

    const updateUI = (ui: Partial<UIConfig>) => {
        setTemplateState(prev => {
            if (!prev) return prev;
            const updated = {
                ...prev,
                ui: { ...prev.ui, ...ui },
                updatedAt: new Date()
            };
            addToHistory(updated);
            setHasUnsavedChanges(true);
            return updated;
        });
    };

    const updateButtons = (buttons: Partial<ButtonConfig>) => {
        setTemplateState(prev => {
            if (!prev) return prev;
            const updated = {
                ...prev,
                buttons: { ...prev.buttons, ...buttons },
                updatedAt: new Date()
            };
            addToHistory(updated);
            setHasUnsavedChanges(true);
            return updated;
        });
    };

    const updateText = (key: string, value: string) => {
        setTemplateState(prev => {
            if (!prev) return prev;
            const updated = {
                ...prev,
                texts: { ...prev.texts, [key]: value },
                updatedAt: new Date()
            };
            addToHistory(updated);
            setHasUnsavedChanges(true);
            return updated;
        });
    };

    const updateImage = async (key: string, file: File) => {
        return new Promise<void>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTemplateState(prev => {
                    if (!prev) return prev;
                    const updated = {
                        ...prev,
                        images: { ...prev.images, [key]: reader.result as string },
                        updatedAt: new Date()
                    };
                    addToHistory(updated);
                    setHasUnsavedChanges(true);
                    return updated;
                });
                resolve();
            };
            reader.readAsDataURL(file);
        });
    };

    const resetTemplate = (type: string) => {
        const defaultColors = getDefaultTemplateColors(type);
        const newTemplate: Template = {
            id: Date.now().toString(),
            name: `Mi ${type} template`,
            type: type as any,
            colors: defaultColors,
            sectionColors: { ...defaultSectionColors },
            typography: { ...defaultTypography },
            ui: { ...defaultUI },
            buttons: { ...defaultButtons },
            texts: {},
            images: {},
            createdAt: new Date(),
            updatedAt: new Date(),
            version: 1
        };
        setTemplateState(newTemplate);
        setHistory([newTemplate]);
        setHistoryIndex(0);
        setHasUnsavedChanges(true);
    };

    const applyPreset = (presetName: string) => {
        if (!template) return;
        // Buscar en fullPresets (importado desde types)
        const fullPreset = fullPresets.find(p => p.name === presetName);
        if (fullPreset) {
            // Aplicar colors
            updateColors(fullPreset.colors);
            // Aplicar sectionColors (actualizar parcialmente)
            if (fullPreset.sectionColors) {
                updateSectionColors(fullPreset.sectionColors);
            }
            // Aplicar typography
            if (fullPreset.typography) {
                updateTypography(fullPreset.typography);
            }
            // Aplicar ui
            if (fullPreset.ui) {
                updateUI(fullPreset.ui);
            }
        } else {
            // Fallback a los presets antiguos (solo colors)
            const categoryPresets = colorPresets[template.type as keyof typeof colorPresets];
            const preset = categoryPresets?.find(p => p.name === presetName);
            if (preset) {
                updateColors(preset.colors);
                // También actualizar algunos sectionColors básicos como antes
                updateSectionColors({
                    buttonPrimaryBackground: preset.colors.primary,
                    heroTitleColor: preset.colors.text,
                    headerTextColor: preset.colors.text,
                    bodyTextColor: preset.colors.text,
                    heroBadgeBackground: preset.colors.primary,
                });
            }
        }
    };

    const saveDraft = () => {
        if (template) {
            storageService.saveDraft(template);
            setHasUnsavedChanges(false);
            window.dispatchEvent(new CustomEvent('template-saved', {
                detail: { message: 'Borrador guardado', type: 'success', template }
            }));
            setEditorConfig({
                notifications: { show: true, message: 'Borrador guardado', type: 'success' }
            });
        }
    };

    const loadDraft = () => {
        const draft = storageService.loadDraft();
        if (draft) {
            setTemplateState(draft);
            addToHistory(draft);
        }
    };

    const exportTemplate = () => {
        if (!template) return;
        const dataStr = JSON.stringify(template, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', `template-${template.type}-${Date.now()}.json`);
        linkElement.click();
    };

    // Dentro de TemplateContext.tsx, reemplazar la función saveToBackend

    // Dentro de TemplateContext.tsx, reemplazar la función saveToBackend

    const saveToBackend = async () => {
        if (!template || !isAuthenticated) return;
        try {
            const typeUpper = template.type.toUpperCase();
            const colorsToSend: Record<string, string> = {
                primary: template.colors.primary,
                secondary: template.colors.secondary,
                accent: template.colors.accent,
                background: template.colors.background,
                text: template.colors.text,
            };

            const payload = {
                name: template.name,
                type: typeUpper,
                colors: colorsToSend,
                texts: template.texts || {},
                images: template.images || {},
                sectionColors: template.sectionColors,
                typography: template.typography,
                ui: template.ui,
                buttons: template.buttons
            };

            console.log('📤 Guardando template completo:', payload);
            const result = await templateApi.saveTemplate(payload);

            if (result.template?.id) {
                const updatedTemplate = {
                    ...template,
                    id: result.template.id,
                    updatedAt: new Date()
                };
                setTemplateState(updatedTemplate);
                addToHistory(updatedTemplate);

                window.dispatchEvent(new CustomEvent('template-saved', {
                    detail: {
                        templateId: result.template.id,
                        success: true,
                        template: updatedTemplate
                    }
                }));
            }
            return result;
        } catch (error) {
            console.error('Error guardando template:', error);
            window.dispatchEvent(new CustomEvent('template-saved', {
                detail: { success: false, error }
            }));
            throw error;
        }
    };

    // Dentro de TemplateContext.tsx

    const loadFromBackend = async (templateId: string) => {
        if (!isAuthenticated) return;
        try {
            const result = await templateApi.getTemplate(templateId);
            if (result.template) {
                const templateData: Template = {
                    id: result.template.id,
                    name: result.template.name,
                    type: result.template.type.toLowerCase(),
                    colors: result.template.colors || getDefaultTemplateColors(result.template.type.toLowerCase()),
                    sectionColors: ensureCompleteSectionColors(result.template.sectionColors),
                    typography: { ...defaultTypography, ...(result.template.typography || {}) },
                    ui: { ...defaultUI, ...(result.template.ui || {}) },
                    buttons: { ...defaultButtons, ...(result.template.buttons || {}) },
                    texts: result.template.texts || {},
                    images: result.template.images || {},
                    createdAt: new Date(result.template.createdAt),
                    updatedAt: new Date(result.template.updatedAt),
                    version: result.template.version || 1
                };
                setTemplateState(templateData);
                addToHistory(templateData);
            }
        } catch (error) {
            console.error('Error cargando template:', error);
        }
    };

    const getUserTemplates = async () => {
        if (!isAuthenticated) return [];
        try {
            const result = await templateApi.getUserTemplates();
            return result.templates || [];
        } catch (error) {
            console.error('Error obteniendo templates:', error);
            return [];
        }
    };

    const undo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(prev => prev - 1);
            setTemplateState(history[historyIndex - 1]);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(prev => prev + 1);
            setTemplateState(history[historyIndex + 1]);
        }
    };

    const setEditorConfig = (config: Partial<EditorConfig>) => {
        setEditorConfigState(prev => ({ ...prev, ...config }));
    };

    return (
        <TemplateContext.Provider value={{
            template,
            setTemplate,
            updateColors,
            updateSectionColors,
            updateTypography,
            updateUI,
            updateButtons,
            updateText,
            updateImage,
            resetTemplate,
            applyPreset,
            saveDraft,
            loadDraft,
            exportTemplate,
            saveToBackend,
            loadFromBackend,
            getUserTemplates,
            hasUnsavedChanges,
            undo,
            redo,
            canUndo: historyIndex > 0,
            canRedo: historyIndex < history.length - 1,
            editorConfig,
            setEditorConfig
        }}>
            {children}
        </TemplateContext.Provider>
    );
};

export const useTemplate = () => {
    const context = useContext(TemplateContext);
    if (!context) {
        throw new Error('useTemplate must be used within TemplateProvider');
    }
    return context;
}; import React, { createContext, useContext, useState } from 'react';
import type { EditorConfig } from '../types/template.types';

interface TemplateEditorContextType {
    config: EditorConfig;
    toggleEditing: () => void;
    selectElement: (elementId: string | null) => void;
    toggleEditor: () => void;
    setConfig: (config: Partial<EditorConfig>) => void;
}

const TemplateEditorContext = createContext<TemplateEditorContextType | undefined>(undefined);

export const TemplateEditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<EditorConfig>({
        isEditing: false,
        selectedElement: null,
        showEditor: true,
        notifications: null  // <-- Agregar esta línea
    });

    const toggleEditing = () => {
        setConfig(prev => ({ ...prev, isEditing: !prev.isEditing }));
    };

    const selectElement = (elementId: string | null) => {
        setConfig(prev => ({ ...prev, selectedElement: elementId }));
    };

    const toggleEditor = () => {
        setConfig(prev => ({ ...prev, showEditor: !prev.showEditor }));
    };

    const updateConfig = (newConfig: Partial<EditorConfig>) => {
        setConfig(prev => ({ ...prev, ...newConfig }));
    };

    return (
        <TemplateEditorContext.Provider value={{
            config,
            toggleEditing,
            selectElement,
            toggleEditor,
            setConfig: updateConfig
        }}>
            {children}
        </TemplateEditorContext.Provider>
    );
};

export const useTemplateEditor = () => {
    const context = useContext(TemplateEditorContext);
    if (!context) {
        throw new Error('useTemplateEditor must be used within TemplateEditorProvider');
    }
    return context;
}; // src/data/templateDefaultColors.ts
import type { TemplateColors } from "../../types/template.types";

// Colores por defecto para cada tipo de template
export const templateDefaultColors: Record<string, TemplateColors> = {
    consulting: {
        primary: '#2563eb',
        secondary: '#4b5563',
        accent: '#1e293b',
        background: '#ffffff',
        text: '#111827'
    },
    catering: {
        primary: '#f59e0b',
        secondary: '#d97706',
        accent: '#b45309',
        background: '#fffbeb',
        text: '#78350f'
    },
    accounting: {
        primary: '#059669',
        secondary: '#047857',
        accent: '#064e3b',
        background: '#f0fdf4',
        text: '#022c22'
    },
    restaurant: {
        primary: '#dc2626',
        secondary: '#b91c1c',
        accent: '#991b1b',
        background: '#fef2f2',
        text: '#450a0a'
    },
    lawFirm: {
        primary: '#7f1d1d',
        secondary: '#991b1b',
        accent: '#450a0a',
        background: '#faf7f2',
        text: '#292524'
    },
    medical: {
        primary: '#0d9488',
        secondary: '#0f766e',
        accent: '#115e59',
        background: '#f0fdfa',
        text: '#042f2e'
    },
    architecture: {
        primary: '#57534e',
        secondary: '#44403c',
        accent: '#292524',
        background: '#fafaf9',
        text: '#1c1917'
    },
    marketingAgency: {
        primary: '#c026d3',
        secondary: '#a21caf',
        accent: '#86198f',
        background: '#faf5ff',
        text: '#4a044e'
    },
    coffeeShop: {
        primary: '#b45309',
        secondary: '#92400e',
        accent: '#78350f',
        background: '#fef3c7',
        text: '#422006'
    },
    bakery: {
        primary: '#e11d48',
        secondary: '#be123c',
        accent: '#9f1239',
        background: '#fff1f2',
        text: '#4c0519'
    },
    foodTruck: {
        primary: '#e67e22',
        secondary: '#d35400',
        accent: '#a04000',
        background: '#fef3c7',
        text: '#5d3a1a'
    },
    beautySalon: {
        primary: '#db2777',
        secondary: '#be185d',
        accent: '#9d174d',
        background: '#fdf2f8',
        text: '#831843'
    },
    gym: {
        primary: '#ea580c',
        secondary: '#c2410c',
        accent: '#9a3412',
        background: '#f5f5f4',
        text: '#1c1917'
    },
    realEstate: {
        primary: '#2d6a4f',
        secondary: '#1e4b3a',
        accent: '#0d2f24',
        background: '#f8fafc',
        text: '#081c15'
    },
    fashion: {
        primary: '#000000',
        secondary: '#1f2937',
        accent: '#4b5563',
        background: '#ffffff',
        text: '#111827'
    },
    cleaning: {
        primary: '#0284c7',
        secondary: '#0369a1',
        accent: '#075985',
        background: '#f0f9ff',
        text: '#0c4a6e'
    },
    saas: {
        primary: '#7c3aed',
        secondary: '#6d28d9',
        accent: '#5b21b6',
        background: '#f5f3ff',
        text: '#1e1e3f'
    },
    digitalAgency: {
        primary: '#0891b2',
        secondary: '#0e7490',
        accent: '#155e75',
        background: '#ecfeff',
        text: '#164e63'
    },
    startup: {
        primary: '#059669',
        secondary: '#047857',
        accent: '#065f46',
        background: '#ecfdf5',
        text: '#064e3b'
    },
};

// Helper para obtener colores por defecto de un template
export const getDefaultTemplateColors = (type: string): TemplateColors => {
    return templateDefaultColors[type] || templateDefaultColors.consulting;
}; export const CONSULTING_TEXTS = [
    // Header
    { id: 'header_brand_1', label: 'Marca parte 1', section: 'Header', default: 'Kernelize' },
    { id: 'header_brand_2', label: 'Marca parte 2', section: 'Header', default: 'Consulting' },
    { id: 'nav_home', label: 'Nav: Inicio', section: 'Header', default: 'Inicio' },
    { id: 'nav_services', label: 'Nav: Servicios', section: 'Header', default: 'Servicios' },
    { id: 'nav_methodology', label: 'Nav: Metodología', section: 'Header', default: 'Metodología' },
    { id: 'nav_testimonials', label: 'Nav: Casos de éxito', section: 'Header', default: 'Casos de éxito' },
    { id: 'nav_contact', label: 'Nav: Contacto', section: 'Header', default: 'Contacto' },
    { id: 'header_cta', label: 'CTA Header', section: 'Header', default: 'Consultoría gratuita' },

    // Hero
    { id: 'hero_badge', label: 'Badge del Hero', section: 'Hero', default: 'Consultoría Estratégica de Negocios' },
    { id: 'hero_title_1', label: 'Título principal (parte 1)', section: 'Hero', default: 'Impulsamos el' },
    { id: 'hero_title_2', label: 'Título principal (parte 2)', section: 'Hero', default: 'Crecimiento Sostenible' },
    { id: 'hero_title_3', label: 'Título principal (parte 3)', section: 'Hero', default: 'de tu Empresa' },
    { id: 'hero_description', label: 'Descripción del Hero', section: 'Hero', default: 'Análisis profundo, estrategias personalizadas y acompañamiento continuo para llevar tu negocio al siguiente nivel.' },
    { id: 'cta_primary', label: 'Botón principal', section: 'Hero', default: 'Solicitar una consultoría' },
    { id: 'cta_secondary', label: 'Botón secundario', section: 'Hero', default: 'Conocer nuestra metodología' },

    // Features
    { id: 'features_title_1', label: 'Título de características (parte 1)', section: 'Características', default: 'Capacidades que' },
    { id: 'features_title_2', label: 'Título de características (parte 2)', section: 'Características', default: 'Transforman' },
    { id: 'features_description', label: 'Descripción de características', section: 'Características', default: 'No solo aconsejamos, implementamos. Te acompañamos en cada paso con herramientas y metodologías probadas.' },

    // Features individuales
    { id: 'feature_title_strategic', label: 'Característica: Análisis Estratégico', section: 'Características', default: 'Análisis Estratégico' },
    { id: 'feature_desc_strategic', label: 'Descripción: Análisis Estratégico', section: 'Características', default: 'Evaluación profunda de tu mercado, competencia y posición actual para identificar oportunidades.' },
    { id: 'feature_title_talent', label: 'Característica: Gestión del Talento', section: 'Características', default: 'Gestión del Talento' },
    { id: 'feature_desc_talent', label: 'Descripción: Gestión del Talento', section: 'Características', default: 'Desarrollo de equipos de alto rendimiento y cultura organizacional alineada a objetivos.' },
    { id: 'feature_title_commercial', label: 'Característica: Planificación Comercial', section: 'Características', default: 'Planificación Comercial' },
    { id: 'feature_desc_commercial', label: 'Descripción: Planificación Comercial', section: 'Características', default: 'Estrategias de ventas y marketing para penetrar mercados y fidelizar clientes.' },
    { id: 'feature_title_financial', label: 'Característica: Optimización Financiera', section: 'Características', default: 'Optimización Financiera' },
    { id: 'feature_desc_financial', label: 'Descripción: Optimización Financiera', section: 'Características', default: 'Mejora de la rentabilidad, control de costos y planificación financiera.' },
    { id: 'feature_title_certifications', label: 'Característica: Certificaciones', section: 'Características', default: 'Certificaciones y Normas' },
    { id: 'feature_desc_certifications', label: 'Descripción: Certificaciones', section: 'Características', default: 'Asesoramiento para obtener certificaciones de calidad que mejoren tu competitividad.' },
    { id: 'feature_title_international', label: 'Característica: Expansión Internacional', section: 'Características', default: 'Expansión Internacional' },
    { id: 'feature_desc_international', label: 'Descripción: Expansión Internacional', section: 'Características', default: 'Estrategias para llevar tu negocio a nuevos mercados con el menor riesgo posible.' },

    // About
    { id: 'about_section_badge', label: 'Badge de About', section: 'Sobre Nosotros', default: 'Nuestra Firma' },
    { id: 'about_heading_1', label: 'Título About (parte 1)', section: 'Sobre Nosotros', default: 'Consultoría con' },
    { id: 'about_heading_2', label: 'Título About (parte 2)', section: 'Sobre Nosotros', default: 'Resultados Medibles' },
    { id: 'about_description_1', label: 'Descripción About 1', section: 'Sobre Nosotros', default: 'En Kernelize Consulting no creemos en soluciones genéricas. Cada empresa es un mundo, y por eso diseñamos estrategias a medida que abordan tus desafíos específicos y potencian tus fortalezas únicas.' },
    { id: 'about_description_2', label: 'Descripción About 2', section: 'Sobre Nosotros', default: 'Nuestro enfoque combina el rigor analítico con la creatividad estratégica. Trabajamos codo a codo con tu equipo para asegurar que las soluciones no solo se implementen, sino que se mantengan en el tiempo y se adapten a un entorno cambiante.' },
    { id: 'about_badge', label: 'Badge de equipo', section: 'Sobre Nosotros', default: 'Equipo multidisciplinario' },
    { id: 'about_title', label: 'Título de equipo', section: 'Sobre Nosotros', default: 'Expertos en diversas industrias' },

    // Stats
    { id: 'stat_value_stat_1', label: 'Valor estadística 1', section: 'Sobre Nosotros', default: '15+' },
    { id: 'stat_label_stat_1', label: 'Etiqueta estadística 1', section: 'Sobre Nosotros', default: 'Años de experiencia' },
    { id: 'stat_value_stat_2', label: 'Valor estadística 2', section: 'Sobre Nosotros', default: '50+' },
    { id: 'stat_label_stat_2', label: 'Etiqueta estadística 2', section: 'Sobre Nosotros', default: 'Consultores expertos' },
    { id: 'stat_value_stat_3', label: 'Valor estadística 3', section: 'Sobre Nosotros', default: '200+' },
    { id: 'stat_label_stat_3', label: 'Etiqueta estadística 3', section: 'Sobre Nosotros', default: 'Proyectos exitosos' },
    { id: 'stat_value_stat_4', label: 'Valor estadística 4', section: 'Sobre Nosotros', default: '10+' },
    { id: 'stat_label_stat_4', label: 'Etiqueta estadística 4', section: 'Sobre Nosotros', default: 'Países con presencia' },

    // Diferenciadores
    { id: 'about_commitment_title', label: 'Título de compromiso', section: 'Sobre Nosotros', default: 'Nuestro compromiso:' },
    { id: 'differentiator_0', label: 'Diferenciador 1', section: 'Sobre Nosotros', default: 'Metodologías ágiles y adaptativas' },
    { id: 'differentiator_1', label: 'Diferenciador 2', section: 'Sobre Nosotros', default: 'Análisis de datos para toma de decisiones' },
    { id: 'differentiator_2', label: 'Diferenciador 3', section: 'Sobre Nosotros', default: 'Acompañamiento post-implementación' },
    { id: 'differentiator_3', label: 'Diferenciador 4', section: 'Sobre Nosotros', default: 'Confidencialidad y ética profesional' },

    // Testimonios
    { id: 'testimonials_title_1', label: 'Título testimonios (parte 1)', section: 'Testimonios', default: 'Lo que dicen nuestros' },
    { id: 'testimonials_title_2', label: 'Título testimonios (parte 2)', section: 'Testimonios', default: 'clientes' },
    { id: 'testimonials_description', label: 'Descripción testimonios', section: 'Testimonios', default: 'Historias reales de transformación empresarial.' },

    // Testimonio Carlos
    { id: 'testimonial_content_carlos', label: 'Testimonio de Carlos', section: 'Testimonios', default: 'El equipo de Kernelize reestructuró nuestra estrategia comercial por completo. En 6 meses, aumentamos nuestras ventas un 60% y optimizamos nuestros procesos internos. Su enfoque analítico y profesionalismo son inigualables.' },
    { id: 'testimonial_name_carlos', label: 'Nombre: Carlos', section: 'Testimonios', default: 'Carlos Méndez' },
    { id: 'testimonial_role_carlos', label: 'Rol: Carlos', section: 'Testimonios', default: 'CEO - TechCorp LATAM' },

    // Testimonio Laura
    { id: 'testimonial_content_laura', label: 'Testimonio de Laura', section: 'Testimonios', default: 'Necesitábamos expandirnos a nuevos mercados y ellos nos guiaron paso a paso. Desde el estudio de mercado hasta la implementación local. Una consultora que realmente se involucra en el éxito de sus clientes.' },
    { id: 'testimonial_name_laura', label: 'Nombre: Laura', section: 'Testimonios', default: 'Laura Fernández' },
    { id: 'testimonial_role_laura', label: 'Rol: Laura', section: 'Testimonios', default: 'Directora de Operaciones - Grupo Logístico' },

    // Testimonio Roberto
    { id: 'testimonial_content_roberto', label: 'Testimonio de Roberto', section: 'Testimonios', default: 'Contratamos su servicio de planificación financiera y los resultados fueron inmediatos. No solo mejoraron nuestra rentabilidad, sino que nos dieron la claridad y el control que necesitábamos para escalar.' },
    { id: 'testimonial_name_roberto', label: 'Nombre: Roberto', section: 'Testimonios', default: 'Roberto Sánchez' },
    { id: 'testimonial_role_roberto', label: 'Rol: Roberto', section: 'Testimonios', default: 'Fundador - Inversiones RS' },

    // Indicadores
    { id: 'indicator_value_projects', label: 'Valor: Proyectos anuales', section: 'Testimonios', default: '100+' },
    { id: 'indicator_label_projects', label: 'Etiqueta: Proyectos', section: 'Testimonios', default: 'Proyectos anuales' },
    { id: 'indicator_value_industries', label: 'Valor: Industrias', section: 'Testimonios', default: '15' },
    { id: 'indicator_label_industries', label: 'Etiqueta: Industrias', section: 'Testimonios', default: 'Industrias diferentes' },
    { id: 'indicator_value_satisfaction', label: 'Valor: Satisfacción', section: 'Testimonios', default: '98%' },
    { id: 'indicator_label_satisfaction', label: 'Etiqueta: Satisfacción', section: 'Testimonios', default: 'Tasa de satisfacción' },
    { id: 'indicator_value_support', label: 'Valor: Soporte', section: 'Testimonios', default: '24/7' },
    { id: 'indicator_label_support', label: 'Etiqueta: Soporte', section: 'Testimonios', default: 'Soporte a clientes' },

    // Contacto
    { id: 'contact_title_1', label: 'Título contacto (parte 1)', section: 'Contacto', default: 'Comencemos a' },
    { id: 'contact_title_2', label: 'Título contacto (parte 2)', section: 'Contacto', default: 'transformar' },
    { id: 'contact_title_3', label: 'Título contacto (parte 3)', section: 'Contacto', default: 'tu negocio' },
    { id: 'contact_description', label: 'Descripción contacto', section: 'Contacto', default: 'Solicita una reunión estratégica sin costo y descubre cómo podemos ayudarte a alcanzar tus metas.' },
    { id: 'contact_info_title', label: 'Título info contacto', section: 'Contacto', default: 'Información de contacto' },
    { id: 'contact_info_description', label: 'Descripción info contacto', section: 'Contacto', default: 'Estamos a disposición para atender tus consultas y coordinar una primera reunión de diagnóstico.' },
    { id: 'contact_email_title', label: 'Título email', section: 'Contacto', default: 'Email' },
    { id: 'contact_email_content', label: 'Email', section: 'Contacto', default: 'consultoria@kernelize.com' },
    { id: 'contact_phone_title', label: 'Título teléfono', section: 'Contacto', default: 'Teléfono' },
    { id: 'contact_phone_content', label: 'Teléfono', section: 'Contacto', default: '+54 9 11 6745-7413' },
    { id: 'contact_location_title', label: 'Título ubicación', section: 'Contacto', default: 'Ubicación' },
    { id: 'contact_location_content', label: 'Ubicación', section: 'Contacto', default: 'Buenos Aires, Argentina' },
    { id: 'contact_hours_title', label: 'Título horarios', section: 'Contacto', default: 'Horario de atención' },
    { id: 'contact_hours_week', label: 'Horario semana', section: 'Contacto', default: 'Lunes a Viernes: 9:00 - 19:00 hs' },
    { id: 'contact_hours_saturday', label: 'Horario sábados', section: 'Contacto', default: 'Sábados: Reuniones programadas' },
    { id: 'contact_response_time', label: 'Tiempo de respuesta', section: 'Contacto', default: 'Respuesta garantizada en 12 horas hábiles' },
    { id: 'contact_success_title', label: 'Título éxito', section: 'Contacto', default: '¡Mensaje enviado con éxito!' },
    { id: 'contact_success_message', label: 'Mensaje éxito', section: 'Contacto', default: 'En menos de 12 horas hábiles, uno de nuestros consultores se comunicará contigo para coordinar una reunión.' },
    { id: 'contact_success_button', label: 'Botón éxito', section: 'Contacto', default: 'Enviar otro mensaje' },
    { id: 'contact_form_title', label: 'Título formulario', section: 'Contacto', default: 'Solicita una reunión de diagnóstico' },
    { id: 'contact_label_name', label: 'Etiqueta nombre', section: 'Contacto', default: 'Nombre completo *' },
    { id: 'contact_label_email', label: 'Etiqueta email', section: 'Contacto', default: 'Email corporativo *' },
    { id: 'contact_required', label: 'Texto campos requeridos', section: 'Contacto', default: 'Campos obligatorios' },
    { id: 'contact_sending', label: 'Texto enviando', section: 'Contacto', default: 'Enviando...' },
    { id: 'contact_submit', label: 'Botón enviar', section: 'Contacto', default: 'Solicitar reunión' },

    // Footer
    { id: 'footer_brand_1', label: 'Footer marca parte 1', section: 'Footer', default: 'Kernelize' },
    { id: 'footer_brand_2', label: 'Footer marca parte 2', section: 'Footer', default: 'Consulting' },
    { id: 'footer_description', label: 'Descripción footer', section: 'Footer', default: 'Transformamos empresas a través de estrategias innovadoras y acompañamiento experto. Más de 15 años impulsando el éxito de nuestros clientes.' },
    { id: 'footer_quick_title', label: 'Título enlaces rápidos', section: 'Footer', default: 'Enlaces Rápidos' },
    { id: 'link_home', label: 'Link: Inicio', section: 'Footer', default: 'Inicio' },
    { id: 'link_services', label: 'Link: Servicios', section: 'Footer', default: 'Servicios' },
    { id: 'link_methodology', label: 'Link: Metodología', section: 'Footer', default: 'Metodología' },
    { id: 'link_success', label: 'Link: Casos de éxito', section: 'Footer', default: 'Casos de éxito' },
    { id: 'link_contact', label: 'Link: Contacto', section: 'Footer', default: 'Contacto' },
    { id: 'footer_expertise_title', label: 'Título expertise', section: 'Footer', default: 'Áreas de Expertise' },
    { id: 'expertise_1', label: 'Expertise 1', section: 'Footer', default: 'Estrategia Corporativa' },
    { id: 'expertise_2', label: 'Expertise 2', section: 'Footer', default: 'Transformación Digital' },
    { id: 'expertise_3', label: 'Expertise 3', section: 'Footer', default: 'Gestión del Talento' },
    { id: 'expertise_4', label: 'Expertise 4', section: 'Footer', default: 'Finanzas Corporativas' },
    { id: 'expertise_5', label: 'Expertise 5', section: 'Footer', default: 'Expansión Internacional' },
    { id: 'footer_contact_title', label: 'Título contacto footer', section: 'Footer', default: 'Contacto Directo' },
    { id: 'contact_email', label: 'Email footer', section: 'Footer', default: 'consultoria@kernelize.com' },
    { id: 'contact_phone', label: 'Teléfono footer', section: 'Footer', default: '+54 9 11 6745-7413' },
    { id: 'contact_location', label: 'Ubicación footer', section: 'Footer', default: 'Buenos Aires, Argentina' },
    { id: 'footer_copyright', label: 'Copyright', section: 'Footer', default: 'Kernelize Consulting. Todos los derechos reservados.' },
    { id: 'footer_made_with', label: 'Texto "Hecho con"', section: 'Footer', default: 'Hecho con' },
    { id: 'footer_for', label: 'Texto "para empresas"', section: 'Footer', default: 'para empresas que buscan crecer' },
    { id: 'footer_terms', label: 'Términos', section: 'Footer', default: 'Términos y condiciones' },
    { id: 'footer_privacy', label: 'Privacidad', section: 'Footer', default: 'Política de privacidad' },
    { id: 'footer_cookies', label: 'Cookies', section: 'Footer', default: 'Cookies' },
    { id: 'cert_1', label: 'Certificación 1', section: 'Footer', default: 'ISO 9001:2024' },
    { id: 'cert_2', label: 'Certificación 2', section: 'Footer', default: 'Miembro de AACCP' },
    { id: 'cert_3', label: 'Certificación 3', section: 'Footer', default: 'Certified Partners' },
    { id: 'cert_4', label: 'Certificación 4', section: 'Footer', default: '+15 años de experiencia' },
];

export const CONSULTING_IMAGES = [
    { id: 'header_logo', label: 'Logo', section: 'Header', defaultImage: '/images/consulting/logo-default.png' },
    { id: 'hero_image', label: 'Hero principal', section: 'Hero', defaultImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978' },
    { id: 'about_image', label: 'Imagen About', section: 'Sobre Nosotros', defaultImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c' },
    { id: 'team_image', label: 'Imagen de equipo', section: 'Sobre Nosotros', defaultImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978' },
    { id: 'testimonial_1', label: 'Testimonio 1', section: 'Testimonios', defaultImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a' },
    { id: 'testimonial_2', label: 'Testimonio 2', section: 'Testimonios', defaultImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2' },
    { id: 'testimonial_3', label: 'Testimonio 3', section: 'Testimonios', defaultImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7' },
]; // src/hooks/useAuthHandler.ts
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const useAuthHandler = () => {
    const { user, isAuthenticated, isLoading: authLoading, isRefreshing, refreshUser } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tokenFromUrl = searchParams.get('token');

    const hasProcessedToken = useRef(false);
    const redirectAttempted = useRef(false);
    const authCheckInterval = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [processingToken, setProcessingToken] = useState(false);
    const [authReady, setAuthReady] = useState(false);

    // Procesar token de URL
    useEffect(() => {
        const processToken = async () => {
            if (hasProcessedToken.current || !tokenFromUrl || processingToken) return;

            hasProcessedToken.current = true;
            setProcessingToken(true);
            setAuthReady(false);

            try {
                localStorage.setItem('token', tokenFromUrl);
                await refreshUser();
                window.history.replaceState({}, document.title, window.location.pathname);
                await new Promise(resolve => setTimeout(resolve, 300));
                setAuthReady(true);
            } catch (error) {
                console.error('❌ Error procesando token:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('refreshToken');
                hasProcessedToken.current = false;
                setAuthReady(true);
            } finally {
                setProcessingToken(false);
            }
        };

        processToken();
    }, [tokenFromUrl, refreshUser, processingToken]);

    // Redirección a login
    useEffect(() => {
        if (authCheckInterval.current) {
            clearInterval(authCheckInterval.current);
            authCheckInterval.current = null;
        }

        if (isAuthenticated) {
            redirectAttempted.current = false;
            return;
        }

        if (processingToken || isRefreshing || authLoading || (tokenFromUrl && !authReady)) return;
        if (redirectAttempted.current) return;

        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser && !isAuthenticated && !processingToken && !isRefreshing) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
        }

        if (!storedToken && !tokenFromUrl && !isAuthenticated) {
            redirectAttempted.current = true;
            navigate('/login', { replace: true });
        } else if (tokenFromUrl && authReady && !isAuthenticated) {
            let attempts = 0;
            const maxAttempts = 10;

            authCheckInterval.current = setInterval(() => {
                attempts++;
                if (isAuthenticated) {
                    if (authCheckInterval.current) clearInterval(authCheckInterval.current);
                    redirectAttempted.current = false;
                } else if (attempts >= maxAttempts) {
                    if (authCheckInterval.current) clearInterval(authCheckInterval.current);
                    redirectAttempted.current = true;
                    navigate('/login', { replace: true });
                }
            }, 300);

            return () => {
                if (authCheckInterval.current) clearInterval(authCheckInterval.current);
            };
        }
    }, [isAuthenticated, processingToken, isRefreshing, authLoading, navigate, tokenFromUrl, authReady]);

    useEffect(() => {
        if (isAuthenticated) {
            redirectAttempted.current = false;
            if (authCheckInterval.current) {
                clearInterval(authCheckInterval.current);
                authCheckInterval.current = null;
            }
        }
    }, [isAuthenticated]);

    const isLoading = processingToken || isRefreshing || authLoading || (tokenFromUrl && !authReady);

    const getLoadingMessage = () => {
        if (processingToken) return 'Procesando acceso...';
        if (isRefreshing) return 'Cargando tus datos...';
        if (tokenFromUrl && !authReady) return 'Configurando tu cuenta...';
        if (authLoading) return 'Verificando acceso...';
        return 'Cargando...';
    };

    return {
        isLoading,
        getLoadingMessage,
        isAuthenticated,
        user,
        tokenFromUrl: !!tokenFromUrl
    };
}; // src/hooks/useDebounce.ts
import { useEffect, useState } from 'react';

/**
 * Hook personalizado para debounce de valores
 * @param value - El valor que queremos debounce
 * @param delay - Tiempo de espera en milisegundos
 * @returns El valor debounced
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Configurar timer para actualizar después del delay
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Limpiar timer si el valor cambia antes del delay
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
} // Paleta de colores configurable por proyecto
export interface ThemeColors {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  accent: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  neutral: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
}

// Configuración por defecto (Kernelize Green)
export const defaultColors: ThemeColors = {
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  secondary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  accent: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
};

// Hook para usar colores del tema
export const useThemeColors = (customColors?: Partial<ThemeColors>) => {
  const colors = { ...defaultColors, ...customColors };
  
  // Función para obtener clase CSS variable
  const getColorVar = (color: string, shade: number) => {
    return `var(--color-${color}-${shade})`;
  };

  return {
    colors,
    getColorVar,
    // Atajos comunes
    primary: colors.primary[500],
    secondary: colors.secondary[500],
    accent: colors.accent[500],
    text: {
      light: colors.neutral[900],
      dark: colors.neutral[50],
    },
    bg: {
      light: colors.neutral[50],
      dark: colors.neutral[950],
    },
  };
}; // src/hooks/useTutorial.ts
import { useEffect, useState } from 'react';

interface TutorialStep {
    id: string;
    title: string;
    description: string;
    targetElement: string;
    position: 'top' | 'bottom' | 'left' | 'right';
    showSkip?: boolean;
}

export const tutorialSteps: TutorialStep[] = [
    {
        id: 'welcome',
        title: '🎨 ¡Bienvenido al Editor de Templates!',
        description: 'Aquí puedes personalizar completamente el diseño de tu sitio web. Cambia colores, edita textos y mucho más.',
        targetElement: 'editor-sidebar',
        position: 'right',
        showSkip: true
    },
    {
        id: 'edit-mode',
        title: '✏️ Modo Edición',
        description: 'Activa el modo edición haciendo clic en el botón "Activar modo edición". Verás que los textos se vuelven editables con doble clic.',
        targetElement: 'edit-mode-button',
        position: 'right',
        showSkip: true
    },
    {
        id: 'colors',
        title: '🎨 Paleta de Colores',
        description: 'Selecciona un color para personalizar cada elemento de tu sitio. Los cambios se ven en tiempo real.',
        targetElement: 'colors-tab',
        position: 'right',
        showSkip: true
    },
    {
        id: 'presets',
        title: '✨ Presets de Colores',
        description: 'Prueba combinaciones de colores predefinidas con un solo clic. ¡Encuentra la combinación perfecta!',
        targetElement: 'presets-section',
        position: 'right',
        showSkip: true
    },
    {
        id: 'text-editing',
        title: '📝 Editar Textos',
        description: 'Hacé doble clic en cualquier texto de la página para editarlo. Podés cambiar títulos, descripciones y más.',
        targetElement: 'texts-tab',
        position: 'right',
        showSkip: true
    },
    {
        id: 'save',
        title: '💾 Guardar Cambios',
        description: 'No olvides guardar tus cambios. El botón "Guardar cambios" se ilumina cuando hay modificaciones pendientes.',
        targetElement: 'save-button',
        position: 'right',
        showSkip: true
    },
    {
        id: 'undo-redo',
        title: '↩️ Deshacer / Rehacer',
        description: 'Si te equivocaste, podés deshacer o rehacer tus últimos cambios con estos botones.',
        targetElement: 'undo-redo-buttons',
        position: 'right',
        showSkip: true
    },
    {
        id: 'finish',
        title: '🏁 Finalizar Edición',
        description: 'Cuando termines, hacé clic en "Finalizar edición". Se guardarán automáticamente todos los cambios.',
        targetElement: 'finish-button',
        position: 'right',
        showSkip: false
    }
];

const TUTORIAL_KEY = 'kernelize_tutorial_completed';
const TUTORIAL_SKIPPED_KEY = 'kernelize_tutorial_skipped';

export const useTutorial = () => {
    const [showTutorial, setShowTutorial] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [hasCompleted, setHasCompleted] = useState(true);
    const [hasSkipped, setHasSkipped] = useState(false);

    useEffect(() => {
        const completed = localStorage.getItem(TUTORIAL_KEY) === 'true';
        const skipped = localStorage.getItem(TUTORIAL_SKIPPED_KEY) === 'true';
        setHasCompleted(completed);
        setHasSkipped(skipped);

        // Mostrar tutorial si no está completado ni saltado
        if (!completed && !skipped) {
            setShowTutorial(true);
        }
    }, []);

    const startTutorial = () => {
        setShowTutorial(true);
        setCurrentStep(0);
        localStorage.removeItem(TUTORIAL_KEY);
        localStorage.removeItem(TUTORIAL_SKIPPED_KEY);
        setHasCompleted(false);
        setHasSkipped(false);
    };

    const nextStep = () => {
        if (currentStep < tutorialSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            completeTutorial();
        }
    };

    const previousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const completeTutorial = () => {
        localStorage.setItem(TUTORIAL_KEY, 'true');
        setShowTutorial(false);
        setHasCompleted(true);
    };

    const skipTutorial = () => {
        localStorage.setItem(TUTORIAL_SKIPPED_KEY, 'true');
        setShowTutorial(false);
        setHasSkipped(true);
    };

    const resetTutorial = () => {
        localStorage.removeItem(TUTORIAL_KEY);
        localStorage.removeItem(TUTORIAL_SKIPPED_KEY);
        setShowTutorial(true);
        setCurrentStep(0);
        setHasCompleted(false);
        setHasSkipped(false);
    };

    return {
        showTutorial,
        currentStep,
        currentStepData: tutorialSteps[currentStep],
        hasCompleted,
        hasSkipped,
        startTutorial,
        nextStep,
        previousStep,
        completeTutorial,
        skipTutorial,
        resetTutorial,
        totalSteps: tutorialSteps.length
    };
}; // src/hooks/useUserTemplates.ts
import { useEffect, useState } from 'react';
import { templateApi } from '../services/api/templateApi.service';

export const useUserTemplates = (isAuthenticated: boolean, user: any) => {
    const [userTemplate, setUserTemplate] = useState<any>(null);
    const [userTemplatesList, setUserTemplatesList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const saveNewTemplate = async (templateData: any) => {
        setLoading(true);
        try {
            const result = await templateApi.saveTemplate({
                name: templateData.name,
                type: templateData.type.toUpperCase(),
                colors: templateData.colors,
                texts: templateData.texts || {},
                images: templateData.images || {}
            });
            if (result.template) {
                await loadUserTemplates();
                return result.template;
            }
        } catch (error) {
            console.error('Error guardando nuevo template:', error);
        } finally {
            setLoading(false);
        }
        return null;
    };

    const loadUserTemplates = async () => {
        if (!isAuthenticated || !user) {
            setUserTemplate(null);
            setUserTemplatesList([]);
            return;
        }
        setLoading(true);
        try {
            const response = await templateApi.getUserTemplates();
            console.log('📦 Templates cargados desde backend:', response.templates);
            if (response.templates && response.templates.length > 0) {
                setUserTemplatesList(response.templates);
                const latestTemplate = response.templates.sort((a: any, b: any) =>
                    new Date(b.lastEdited || b.updatedAt).getTime() - new Date(a.lastEdited || a.updatedAt).getTime()
                )[0];
                setUserTemplate(latestTemplate);
                console.log('📌 Template principal actualizado:', latestTemplate);
                console.log('🎨 Colores del template principal:', latestTemplate.colors);
            } else {
                setUserTemplate(null);
                setUserTemplatesList([]);
            }
        } catch (error) {
            console.error('Error cargando templates:', error);
            setUserTemplate(null);
            setUserTemplatesList([]);
        } finally {
            setLoading(false);
        }
    };

    const reloadUserTemplates = async () => {
        console.log('🔄 Recargando templates del usuario...');
        await loadUserTemplates();
    };

    const loadTemplateForEdit = async (templateId: string) => {
        setLoading(true);
        try {
            console.log('📥 Cargando template para editar, ID:', templateId);
            const response = await templateApi.getTemplate(templateId);
            console.log('📦 Template recibido del backend:', response.template);
            if (response.template) {
                const templateData = {
                    id: response.template.id,
                    name: response.template.name,
                    type: response.template.type?.toLowerCase() || 'consulting',
                    colors: response.template.colors,
                    texts: response.template.texts || {},
                    images: response.template.images || {},
                    sectionColors: response.template.sectionColors || {},
                    typography: response.template.typography || {},
                    ui: response.template.ui || {},
                    buttons: response.template.buttons || {},
                    createdAt: new Date(response.template.createdAt),
                    updatedAt: new Date(response.template.updatedAt),
                    version: response.template.version || 1
                };
                console.log('✅ Template preparado para editar:', templateData);
                return templateData;
            }
        } catch (error) {
            console.error('Error cargando template para editar:', error);
        } finally {
            setLoading(false);
        }
        return null;
    };

    // Listener para actualizar localmente sin recargar todo el backend
    useEffect(() => {
        const handleTemplateSaved = (event: Event) => {
            const customEvent = event as CustomEvent;
            const { template, success } = customEvent.detail;
            if (success && template) {
                console.log('📢 Actualizando lista local con template guardado:', template.id);
                setUserTemplatesList(prevList => {
                    const existingIndex = prevList.findIndex(t => t.id === template.id);
                    if (existingIndex >= 0) {
                        const newList = [...prevList];
                        newList[existingIndex] = { ...newList[existingIndex], ...template };
                        return newList;
                    } else {
                        return [template, ...prevList];
                    }
                });
                setUserTemplate((prev: any) => {  // ✅ Tipado explícito
                    if (prev?.id === template.id || !prev) {
                        console.log('📌 Actualizando template principal con datos locales');
                        return { ...template };
                    }
                    return prev;
                });
            }
        };
        window.addEventListener('template-saved', handleTemplateSaved);
        return () => window.removeEventListener('template-saved', handleTemplateSaved);
    }, []);

    useEffect(() => {
        loadUserTemplates();
    }, [isAuthenticated, user]);

    return {
        userTemplate,
        userTemplatesList,
        loading,
        loadUserTemplates,
        reloadUserTemplates,
        loadTemplateForEdit,
        saveNewTemplate
    };
}; import React from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, className = '' }) => {
  // const { resolvedTheme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <Header />
      <main className="flex-grow">
        {/* dentro de este main van los componentes que el cliente quiera colocar */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout; // src/layouts/EditorLayout.tsx
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
}; // src/layouts/GalleryLayout.tsx
import { ArrowRight, Eye, Heart, Package, Search, Sparkles, Star, X } from 'lucide-react';
import { useState } from 'react';
import { UserHeader } from './UserHeader';

type TemplateCategory = 'todos' | 'landing' | 'ecommerce' | 'enterprise' | 'custom';

interface GalleryLayoutProps {
    templates: any[];
    categories: Array<{ id: string; label: string; icon: any }>;
    onSelectTemplate: (templateId: string) => void;  // ← Cambiado de onViewTemplate
    onBackToOwn: () => void;
    onBackToMyTemplates: () => void;
    onLogout: () => void;
    onLogin: () => void;
    user: any;
    isAuthenticated: boolean;
    favorites: string[];
    onToggleFavorite: (templateId: string, e: React.MouseEvent) => void;
}

export const GalleryLayout = ({
    templates,
    categories,
    onSelectTemplate,
    onBackToOwn,
    onBackToMyTemplates,
    /*user,
    isAuthenticated,*/
    favorites,
    onToggleFavorite
}: GalleryLayoutProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('todos');
    const [showFavorites, setShowFavorites] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = searchTerm === '' ||
            template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'todos' || template.category.includes(selectedCategory);
        const matchesFavorites = !showFavorites || favorites.includes(template.id);
        return matchesSearch && matchesCategory && matchesFavorites;
    });

    const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
    const currentTemplates = filteredTemplates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
            <UserHeader />

            <div className="text-center pt-32 pb-8 px-4">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full mb-6 border border-amber-500/20">
                    <Eye className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                        Modo vista previa
                    </span>
                </div>
                <h1 className="text-4xl md:text-4xl lg:text-4xl font-bold mb-6">
                    Explora nuestras
                    <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent ml-3">
                        plantillas
                    </span>
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-sm mb-4">
                    Visualiza nuestras plantillas profesionales. Para editar, regresa a tu plantilla principal.
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={onBackToOwn}
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <Package className="w-5 h-5" />
                        Ver mi plantilla
                    </button>
                    <button
                        onClick={onBackToMyTemplates}
                        className="btn-secondary inline-flex items-center gap-2"
                    >
                        <Sparkles className="w-5 h-5" />
                        Mis plantillas
                    </button>
                </div>
            </div>

            {/* Barra de filtros */}
            <div className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 py-4">
                <div className="container-custom flex flex-col lg:flex-row gap-4 items-center justify-between px-4">
                    <div className="relative w-full lg:w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Buscar plantillas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 dark:text-white border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto justify-center">
                        {categories.map(cat => {
                            const Icon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id as TemplateCategory)}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${selectedCategory === cat.id
                                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md'
                                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setShowFavorites(!showFavorites)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${showFavorites
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                            }`}
                    >
                        <Heart className={`w-4 h-4 ${showFavorites ? 'fill-white' : ''}`} />
                        Favoritos
                        {favorites.length > 0 && (
                            <span className="ml-1 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                                {favorites.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Grid de plantillas */}
            <div className="container-custom px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentTemplates.map(template => (
                        <div
                            key={template.id}
                            onClick={() => onSelectTemplate(template.id)}
                            className="card group hover:shadow-2xl transition-all duration-300 relative overflow-hidden cursor-pointer"
                        >
                            {template.popular && (
                                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                                    <Star className="w-3 h-3 text-white" />
                                    <span className="text-xs font-medium text-white">Popular</span>
                                </div>
                            )}

                            {template.featured && !template.popular && (
                                <div className="absolute top-4 left-4 z-10 bg-primary-500/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 border border-primary-500/20">
                                    <Sparkles className="w-3 h-3 text-white" />
                                    <span className="text-xs font-medium text-white">Destacado</span>
                                </div>
                            )}

                            <div className="relative h-56 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                <img
                                    src={template.images.previews[0]}
                                    alt={template.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <button
                                    onClick={(e) => { e.stopPropagation(); onToggleFavorite(template.id, e); }}
                                    className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-neutral-800/90 rounded-full backdrop-blur-md shadow-sm hover:scale-110 transition-transform"
                                >
                                    <Heart className={`w-4 h-4 ${favorites.includes(template.id) ? 'fill-red-500 text-red-500' : 'text-neutral-600 dark:text-neutral-400'}`} />
                                </button>
                            </div>

                            <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-xl dark:text-white group-hover:text-primary-500 transition-colors">
                                        {template.title}
                                    </h3>
                                    <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-500 dark:text-neutral-400">
                                        {template.category[0]}
                                    </span>
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
                                    {template.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {template.tags?.slice(0, 2).map((tag: string, i: number) => (
                                        <span key={i} className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-500">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center pt-3 border-t border-neutral-200 dark:border-neutral-800">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onSelectTemplate(template.id); }}
                                        className="btn-secondary text-sm px-4 py-2 flex items-center gap-2 group/btn"
                                    >
                                        <span>Ver demo</span>
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                    <span className="text-xs text-neutral-400">
                                        {template.category.includes('ecommerce') ? '🛒 Con tienda' : '📄 Landing'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mensaje informativo */}
                <div className="mt-8 text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        💡 Estás en modo vista previa. Para editar una plantilla, ve a <strong>"Mis plantillas"</strong> o <strong>"Mi plantilla"</strong>.
                    </p>
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-12">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => { setCurrentPage(p => p - 1); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                            className="px-5 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed dark:text-white shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" />
                            Anterior
                        </button>
                        <div className="flex items-center gap-2">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => { setCurrentPage(pageNum); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                                        className={`w-10 h-10 rounded-xl font-medium transition-all ${currentPage === pageNum
                                            ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md'
                                            : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:text-white'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                            className="px-5 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed dark:text-white shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                        >
                            Siguiente
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {filteredTemplates.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-10 h-10 text-neutral-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No se encontraron resultados</h3>
                        <p className="text-neutral-500 mb-6">
                            No hay plantillas que coincidan con "{searchTerm}"
                        </p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory('todos'); setShowFavorites(false); }}
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}; // src/layouts/MyTemplatesLayout.tsx
import { ArrowRight, Edit3, Lock, Package, Sparkles } from 'lucide-react';
import { UserHeader } from './UserHeader';

interface MyTemplatesLayoutProps {
    templates: any[];
    onEditTemplate: (templateId: string) => void;
    onBackToOwn: () => void;
    onExploreGallery: () => void;
    onLogout: () => void;
    onLogin: () => void;
    user: any;
    isAuthenticated: boolean;
}

export const MyTemplatesLayout = ({
    templates,
    onEditTemplate,
    onBackToOwn,
    onExploreGallery,
    /* user,
     isAuthenticated*/
}: MyTemplatesLayoutProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
            <UserHeader />

            <div className="text-center pt-32 pb-16 px-4">
                <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6 border border-purple-500/20">
                    <Package className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        Mis plantillas
                    </span>
                </div>
                <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold mb-6">
                    Tus plantillas
                    <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent ml-3">
                        personalizadas
                    </span>
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-sm mb-4">
                    Aquí están todas las plantillas que has guardado en tu cuenta.
                </p>

                <button
                    onClick={onBackToOwn}
                    className="mt-4 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
                >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Volver a mi plantilla principal
                </button>
            </div>

            <div className="container-custom px-2 py-8">
                {templates.length === 0 ? (
                    <div className="text-center py-10">
                        <Package className="w-14 h-14 text-neutral-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No tienes plantillas guardadas</h3>
                        <p className="text-neutral-500 mb-6">
                            Personaliza una plantilla y guárdala en tu cuenta para verla aquí.
                        </p>
                        <button
                            onClick={onExploreGallery}
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <Sparkles className="w-5 h-5" />
                            Explorar plantillas
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                className="card active group hover:shadow-2xl transition-all duration-300 relative overflow-hidden cursor-pointer"
                                onClick={() => onEditTemplate(template.id)}
                            >
                                <div className="relative h-48 bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-white text-2xl mb-2">📄</div>
                                        <div className="text-white font-semibold">{template.name}</div>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-md dark:text-white group-hover:text-primary-500 transition-colors">
                                            {template.name}
                                        </h3>
                                        <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">
                                            v{template.version || 1}
                                        </span>
                                    </div>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
                                        Última edición: {new Date(template.lastEdited || template.createdAt).toLocaleDateString('es-ES')}
                                    </p>
                                    <div className="flex justify-between items-center pt-3 border-t border-neutral-200 dark:border-neutral-800">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onEditTemplate(template.id); }}
                                            className="btn-primary text-sm px-4 py-2 flex items-center gap-2 group/btn"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                            Editar
                                        </button>
                                        <span className="text-xs text-neutral-400">
                                            {template.type?.toLowerCase() || 'Personalizado'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div

                            className="card group hover:shadow-2xl transition-all duration-300 relative overflow-hidden cursor-pointer"

                        >
                            <div className="relative h-48 bg-gradient-to-r from-primary-200 to-accent-500 flex items-center justify-center">
                                {/* No disponible */}
                                <div className="text-center">
                                    <div className="text-white text-4xl mb-2">➕</div>
                                    <div className="text-white font-semibold">No disponible </div>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-xl dark:text-white group-hover:text-primary-500 transition-colors">
                                       Mi Nuevo template 
                                    </h3>
                                    <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">

                                    </span>
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">

                                </p>
                                <div className="flex justify-between items-center pt-3 border-t border-neutral-200 dark:border-neutral-800">
                                    <button

                                        className="btn-light text-sm px-4 py-2 flex items-center gap-2 group/btn"
                                    >
                                        <Lock className="w-4 h-4" />
                                        Crear
                                    </button>
                                    <span className="text-xs text-neutral-400">
                                        Nuevo
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    // nueva


                )}

                <div className="text-center mt-12">
                    <button
                        onClick={onExploreGallery}
                        className="btn-secondary inline-flex items-center gap-2"
                    >
                        <Sparkles className="w-5 h-5" />
                        Explorar más plantillas
                    </button>
                </div>
            </div>
        </div>
    );
}; // src/layouts/OwnTemplateLayout.tsx
import { ArrowRight, CheckCircle, Clock, Edit3, Package, Sparkles, Type } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef } from 'react'; // 👈 NUEVO: useLayoutEffect, useRef
import { defaultTypography } from '../types/template.types'; // 👈 NUEVO
import { UserHeader } from './UserHeader';

interface OwnTemplateLayoutProps {
    userTemplate: any;
    onEdit: () => void;
    onViewMyTemplates: () => void;
    onExploreGallery: () => void;
    onLogout: () => void;
    onLogin: () => void;
    isAuthenticated: boolean;
    user: any;
}

export const OwnTemplateLayout = ({
    userTemplate,
    onEdit,
    onViewMyTemplates,
    onExploreGallery
}: OwnTemplateLayoutProps) => {

    // 👇 NUEVO: tipografía con fallback
    const typography = userTemplate?.typography || defaultTypography;
    const templateRootRef = useRef<HTMLDivElement>(null);

    // 👇 NUEVO: aplicar variables CSS al contenedor
    useLayoutEffect(() => {
        if (templateRootRef.current) {
            templateRootRef.current.style.setProperty('--font-heading', typography.headingFont);
            templateRootRef.current.style.setProperty('--font-body', typography.bodyFont);
        }
    }, [typography]);

    const getSectionColor = (key: string, fallbackKey: string = 'primary') => {
        const sectionColor = userTemplate?.sectionColors?.[key];
        if (sectionColor) return sectionColor;
        const globalColor = userTemplate?.colors?.[fallbackKey];
        return globalColor || (fallbackKey === 'primary' ? '#2563eb' : '#ffffff');
    };

    // Logs para depuración
    useEffect(() => {
        console.log('🎨 OwnTemplateLayout - userTemplate actualizado:', userTemplate);
        console.log('🎨 colors (globales):', userTemplate?.colors);
        console.log('🎨 sectionColors (personalizados):', userTemplate?.sectionColors);
    }, [userTemplate]);

    // 👇 NUEVO: envolver todo el contenido con el div #template-root
    return (
        <div ref={templateRootRef}
            id="template-root"
            className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900"
            style={{
                fontFamily: typography.bodyFont,      // Fuente para todo el texto
            }}
        >
            <UserHeader />
            {/* Previsualización */}
            <div className="container-custom px-4 pt-32 pb-16 ">
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
                    <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
                        <h2 className="text-2xl font-bold mb-2">Previsualización de tu plantilla</h2>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Así se verá tu sitio web con los colores y textos que seleccionaste
                        </p>
                        <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 flex flex-wrap justify-center gap-4">
                            <button
                                onClick={onEdit}
                                className="btn-primary px-8 py-3 flex items-center gap-2"
                            >
                                <Edit3 className="w-5 h-5" />
                                Seguir editando
                            </button>
                            <button
                                onClick={onViewMyTemplates}
                                className="btn-secondary px-8 py-3 flex items-center gap-2"
                            >
                                <Package className="w-5 h-5" />
                                Ver mis plantillas
                            </button>
                        </div>
                    </div>

                    <div className="text-center px-4">
                        <p className="text-neutral-600 mt-10 dark:text-neutral-400 max-w-2xl mx-auto text-md mb-4">
                            ¡Excelente elección! Hemos guardado tu plantilla con todas tus personalizaciones.
                        </p>

                        {/* Información de tiempos */}
                        <div className="flex flex-wrap justify-center gap-6 mt-8">
                            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-lg border border-neutral-200 dark:border-neutral-700 min-w-[200px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <Clock className="w-6 h-6 text-blue-500" />
                                    <span className="font-semibold text-lg">Tiempo de revisión</span>
                                </div>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">24-48 horas</p>
                                <p className="text-sm text-neutral-500 mt-1">Nuestro equipo revisará tus cambios</p>
                            </div>

                            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-lg border border-neutral-200 dark:border-neutral-700 min-w-[200px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                    <span className="font-semibold text-lg">Correcciones</span>
                                </div>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">2-3 días hábiles</p>
                                <p className="text-sm text-neutral-500 mt-1">Tiempo estimado de implementación</p>
                            </div>

                            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-lg border border-neutral-200 dark:border-neutral-700 min-w-[200px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <Edit3 className="w-6 h-6 text-purple-500" />
                                    <span className="font-semibold text-lg">Estado</span>
                                </div>
                                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">En revisión</p>
                                <p className="text-sm text-neutral-500 mt-1">Te notificaremos cuando esté listo</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-6">
                            {/* Contenedor principal con los colores del template */}
                            <div
                                className="p-8 rounded-xl transition-all"
                                style={{
                                    backgroundColor: getSectionColor('bodyBackground', 'background'),
                                    color: getSectionColor('bodyTextColor', 'text')
                                }}
                            >
                                <div className="text-center mb-8">
                                    <div
                                        className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                                        style={{
                                            backgroundColor: `${getSectionColor('heroBadgeBackground', 'primary')}20`,
                                            color: getSectionColor('heroBadgeBackground', 'primary')
                                        }}
                                    >
                                        Tu sitio personalizado
                                    </div>
                                    <h1
                                        className="text-4xl font-bold mb-4"
                                        style={{ color: getSectionColor('heroTitleColor', 'primary') }}
                                    >
                                        {userTemplate?.name || 'Mi sitio web'}
                                    </h1>
                                    <p className="text-lg max-w-2xl mx-auto" style={{ color: getSectionColor('heroDescriptionColor', 'text') }}>
                                        Sitio web diseñado especialmente para ti con los colores y estilo que elegiste.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                                    <div
                                        className="p-6 rounded-xl text-center"
                                        style={{ backgroundColor: `${getSectionColor('featuresCardBackground', 'secondary')}10` }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                                            style={{ backgroundColor: getSectionColor('buttonPrimaryBackground', 'primary') }}
                                        >
                                            <Sparkles className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2" style={{ color: getSectionColor('featuresTitleColor', 'text') }}>
                                            Diseño personalizado
                                        </h3>
                                        <p className="text-sm opacity-80" style={{ color: getSectionColor('featuresTitleColor', 'text') }}>
                                            Con los colores que seleccionaste
                                        </p>
                                    </div>

                                    <div
                                        className="p-6 rounded-xl text-center"
                                        style={{ backgroundColor: `${getSectionColor('featuresCardBorder', 'secondary')}10` }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                                            style={{ backgroundColor: getSectionColor('buttonSecondaryBackground', 'secondary') }}
                                        >
                                            <Type className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2" style={{ color: getSectionColor('featuresTitleColor', 'text') }}>
                                            Textos personalizados
                                        </h3>
                                        <p className="text-sm opacity-80" style={{ color: getSectionColor('featuresTitleColor', 'text') }}>
                                            Adaptados a tu negocio
                                        </p>
                                    </div>

                                    <div
                                        className="p-6 rounded-xl text-center"
                                        style={{ backgroundColor: `${getSectionColor('headerCtaBackground', 'accent')}10` }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                                            style={{ backgroundColor: getSectionColor('headerCtaBackground', 'accent') }}
                                        >
                                            <CheckCircle className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2" style={{ color: getSectionColor('featuresTitleColor', 'text') }}>
                                            Listo para publicar
                                        </h3>
                                        <p className="text-sm opacity-80" style={{ color: getSectionColor('featuresTitleColor', 'text') }}>
                                            Revisión en curso
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="gradient-bg rounded-3xl mx-4 sm:mx-6 lg:mx-auto container-custom mb-16 p-6 md:p-8 text-center">
                <h3 className="heading-3 text-gradient mb-4">¿Quieres explorar más plantillas?</h3>
                <p className="text-neutral-600 dark:text-primary-400 max-w-2xl mx-auto mb-6">
                    Visualiza nuestras plantillas profesionales y encuentra inspiración para tu próximo proyecto.
                </p>
                <button
                    onClick={onExploreGallery}
                    className="btn-primary inline-flex items-center gap-2 group"
                >
                    <Sparkles className="w-5 h-5" />
                    Explorar plantillas
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}; // src/layouts/UserHeader.tsx
import Header from '../components/Header/Header';


export const UserHeader = () => {
    // const { user, isAuthenticated } = useAuth();

    return (
        <>
        <Header/>
        </>
    );
}; // src/services/api/types/api.types.ts

// Respuesta base de la API
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  timestamp?: string;
}

// Error de la API
export interface ApiError {
  success: false;
  message: string;
  errors?: string[];
  timestamp?: string;
}

// Parámetros para requests paginados
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Respuesta paginada
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Configuración de request
export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  params?: Record<string, any>;
  data?: any;
} // src/services/api/types/auth.ts - Sincronizado con Prisma Schema
export type UserRole = 'ADMIN' | 'CLIENT' | 'DEVELOPER';
export type PlanType = 'LANDING' | 'ECOMMERCE' | 'ENTERPRISE' | null;
export type SubscriptionStatus = 'ACTIVE' | 'PENDING' | 'CANCELLED' | 'NONE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  plan?: PlanType;
  subscriptionStatus?: SubscriptionStatus;
  isActive: boolean;
  emailVerified: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;  // Solo para frontend
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: string;
}

export type OrderPlan = 'LANDING_PAGE' | 'E_COMMERCE' | 'CUSTOM_SYSTEM';
export type OrderStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: string;
  orderId: string;
  userId: string;
  plan: OrderPlan;
  status: OrderStatus;
  progress: number;
  total: string;          // Decimal del backend se maneja como string
  monthlyFee?: string;    // Decimal del backend se maneja como string
  customerName: string;
  customerEmail: string;
  startDate: string;
  estimatedDelivery?: string;
  details: any;
  timeline: TimelineStep[];
  updates: OrderUpdate[];
  team?: TeamMember[];
  payments?: Payment[];
  siteChanges?: SiteChange[];
  createdAt: string;
  updatedAt: string;
}

export type TimelineStepType = 'CONFIRMED' | 'DESIGN' | 'DEVELOPMENT' | 'REVIEW' | 'DELIVERY';

export interface TimelineStep {
  id: string;
  step: TimelineStepType;
  date: string;
  completed: boolean;
  description?: string;
}

export type OrderUpdateType = 'INFO' | 'PROGRESS' | 'SUCCESS' | 'WARNING';

export interface OrderUpdate {
  id: string;
  type: OrderUpdateType;
  message: string;
  date: string;
  author?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  email?: string;
}

export type PaymentMethod = 'MERCADOPAGO' | 'PAYPAL' | 'TRANSFER' | 'CREDIT_CARD';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: string;         // Decimal del backend se maneja como string
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId?: string;
  invoiceUrl?: string;
  description?: string;
  dueDate?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type SiteChangeType = 'DESIGN' | 'CONTENT' | 'FEATURE' | 'BUGFIX' | 'UPDATE';
export type SiteChangeStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';

// src/services/api/types/auth.ts - ACTUALIZAR SiteChange

export interface SiteChange {
  id: string;
  orderId: string;
  userId: string;
  approvedById?: string;
  // AGREGAR ESTO - Objeto del usuario que aprobó
  approvedBy?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  // AGREGAR ESTO - Objeto del usuario que solicitó
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  // AGREGAR ESTO - Objeto del pedido
  order?: {
    id: string;
    orderId: string;
    plan: OrderPlan;
    customerName: string;
  };
  type: SiteChangeType;
  description: string;
  details?: string;
  beforeImage?: string;
  afterImage?: string;
  status: SiteChangeStatus;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteChange2 {
  id: string;
  orderId: string;
  userId: string;
  approvedById?: string;
  type: SiteChangeType;
  description: string;
  details?: string;
  beforeImage?: string;
  afterImage?: string;
  status: SiteChangeStatus;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
} // src/services/api/types/contact.types.ts

// Datos del formulario de contacto
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  projectType?: ProjectType;
  contactMethod?: ContactMethod;
  source?: string;
}

// Tipos de proyecto
export type ProjectType = 
  | 'landing'
  | 'ecommerce' 
  | 'crm'
  | 'inventory'
  | 'custom'
  | 'other'
  | '';

// Métodos de contacto
export type ContactMethod = 'email' | 'whatsapp';

// Respuesta exitosa del contacto
export interface ContactResponse {
  success: true;
  message: string;
  data: {
    id: string | number;
    name: string;
    email: string;
    timestamp: string;
    projectType?: string;
    contactMethod?: string;
  };
}

// Datos de lead
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  projectType: string;
  contactMethod: string;
  source: string;
  ipAddress?: string;
  userAgent?: string;
  status: 'new' | 'contacted' | 'converted' | 'archived';
  createdAt: string;
  updatedAt: string;
}

// Estadísticas de leads
export interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  converted: number;
  bySource: Record<string, number>;
  byProjectType: Record<string, number>;
  last7Days: Array<{
    date: string;
    count: number;
  }>;
} // src/services/api/types/health.types.ts

// Health check básico
export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy' | 'warning';
  service: string;
  version: string;
  timestamp: string;
  uptime: number;
  uptimeFormatted: string;
  environment: string;
  memory: {
    used: string;
    total: string;
    usagePercentage: string;
  };
  system: {
    platform: string;
    arch: string;
    cpus: number;
    loadavg: number[];
    freemem: string;
    totalmem: string;
  };
  dependencies: {
    node: string;
    express: string;
  };
  message?: string;
}

// Health check simple
export interface SimpleHealthStatus {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  uptime: string;
  memory?: string;
}

// Health check detallado
export interface DetailedHealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  service: string;
  timestamp: string;
  checks: {
    api: {
      status: string;
      timestamp: string;
      uptime: string;
    };
    memory: {
      status: string;
      usage: string;
      percentage: string;
    };
    system: {
      status: string;
      load: number;
      loadPerCore: number;
    };
    database: {
      status: string;
      message: string;
    };
    email: {
      status: string;
      message: string;
      configured: boolean;
    };
    environment: {
      status: string;
      node: string;
      env: string;
    };
  };
  summary: {
    total: number;
    healthy: number;
    warning: number;
    error: number;
  };
}

// Información del servidor
export interface ServerInfo {
  server: {
    name: string;
    version: string;
    environment: string;
    uptime: string;
    uptimeSeconds: number;
    started: string;
    pid: number;
    platform: string;
    nodeVersion: string;
  };
  system: {
    hostname: string;
    platform: string;
    arch: string;
    cpus: number;
    cpuModel: string;
    cpuSpeed: number;
    memory: {
      total: string;
      free: string;
      used: string;
      freePercentage: string;
    };
    load: {
      '1min': number;
      '5min': number;
      '15min': number;
      perCore: number;
    };
  };
  process: {
    pid: number;
    memory: {
      rss: string;
      heapTotal: string;
      heapUsed: string;
      external: string;
      arrayBuffers: string;
      usagePercentage: string;
    };
    uptime: number;
    uptimeFormatted: string;
  };
  network: {
    interfaces: number;
    hostname: string;
  };
  time: {
    server: string;
    timezone: string;
    offset: string;
  };
} // src/services/api/types/index.ts
// Exporta todos los tipos desde un solo lugar

export * from './api.types';
export * from './contact.types';
export * from './health.types'; // types.ts
// import { JSX } from 'react';

export type ModuleType = {
  name: string;
  icon: any;
  // icon: JSX.Element;
  description: string;
};

export type StackType = {
  frontend: string[];
  backend: string[];
  extras?: string[];
};

export type TemplateType = {
  id: string;
  title: string;
  description: string;
  category: string;
  // icon: JSX.Element;
  icon: any;
  color: string;
  gradientBg: string;
  features: string[];
  stack: StackType;
  deliveryTime: string;
  idealFor: string[];
  modules: ModuleType[];
  priceRange: string;
  useCase: string;
}; // src/services/api/types.ts
export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  [key: string]: any;
} // src/services/api/auth.service.ts - VERSIÓN CORREGIDA
import { get, post, put } from './index';
import type {
  AuthResponse,
  LoginCredentials,
  Order,
  RegisterData,
  User
} from './types/auth';

// Funciones de autenticación
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await post<AuthResponse>('/auth/login', credentials);

  // Guardar token en localStorage
  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  return response;
};

export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  const response = await post<AuthResponse>('/auth/register', userData);
  return response;
};

export const logout = async (): Promise<void> => {
  try {
    await post('/auth/logout');
  } catch (error) {
    console.error('Error en logout:', error);
  } finally {
    // Siempre limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
  }
};

export const getProfile = async (): Promise<User> => {
  const response = await get<{ success: boolean; user: User }>('/auth/profile');
  return response.user;
};

export const refreshToken = async (): Promise<{ token: string; refreshToken: string }> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No hay refresh token disponible');
  }

  const response = await post<{ success: boolean; token: string; refreshToken: string }>(
    '/auth/refresh',
    { refreshToken }
  );

  // Actualizar tokens
  localStorage.setItem('token', response.token);
  localStorage.setItem('refreshToken', response.refreshToken);

  return response;
};

export const updateProfile = async (userData: Partial<User>): Promise<User> => {
  const response = await put<{ success: boolean; user: User }>('/auth/profile', userData);

  // Actualizar usuario en localStorage
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const updatedUser = { ...currentUser, ...response.user };
  localStorage.setItem('user', JSON.stringify(updatedUser));

  return response.user;
};

// Servicios de pedidos
export const getUserOrders = async (): Promise<Order[]> => {
  const response = await get<{
    success: boolean;
    count: number;
    orders: Order[]
  }>('/orders');

  return response.orders || [];
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  const response = await get<{ success: boolean; order: Order }>(`/orders/${orderId}`);
  return response.order;
};

export const searchOrder = async (params: { orderId?: string; email?: string }): Promise<Order[]> => {
  const response = await get<{ success: boolean; orders: Order[] }>('/orders/search', { params });
  return response.orders || [];
};

export const createOrder = async (orderData: {
  plan: string;
  total: number;
  monthlyFee?: number;
  details?: any;
}): Promise<{ success: boolean; message: string; order: Order }> => {
  return await post('/orders', orderData);
};

export const addOrderUpdate = async (orderId: string, data: { message: string; type?: string }): Promise<any> => {
  return await post(`/orders/${orderId}/updates`, data);
};

// NOTA: Los servicios de pagos y site changes se movieron a:
// - payment.service.ts
// - siteChange.service.ts
// Mantén solo las funciones básicas de orders aquí

// Funciones de utilidad
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  // Opcional: Verificar expiración del token
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Re-exportar tipos para compatibilidad
export type {
  AuthResponse, LoginCredentials, Order, OrderPlan,
  OrderStatus, OrderUpdate, OrderUpdateType, Payment, PaymentMethod,
  PaymentStatus, PlanType, RegisterData, SiteChange, SiteChangeStatus, SiteChangeType, SubscriptionStatus, TeamMember, TimelineStep, TimelineStepType, User, UserRole
} from './types/auth'; // src/services/api/index.ts - VERSIÓN CORREGIDA
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { RequestConfig } from './types';

// Configuración
const API_BASE_URL = import.meta.env.VITE_API_URL || 'kerneliceapi-production.up.railway.app'//'http://localhost:3000/api';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000');

// Instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// INTERCEPTOR DE REQUEST (UN SOLO)
api.interceptors.request.use(
  (config) => {
    // Agregar token si existe
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Headers personalizados
    config.headers['X-Source'] = 'kernelize_landing_page';
    config.headers['X-Client-Version'] = import.meta.env.VITE_APP_VERSION || '1.0.0';

    return config;
  },
  (error) => Promise.reject(error)
);

// INTERCEPTOR DE RESPONSE (UN SOLO)
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Extraer los datos de la respuesta
    const data = response.data;

    // Si la respuesta tiene estructura { data, message, success }
    if (data && typeof data === 'object') {
      // Para endpoints que devuelven { success, data, message }
      if ('success' in data && 'data' in data) {
        return data.data;
      }
      // Para endpoints que devuelven { success, user, token }
      if ('success' in data) {
        return data;
      }
    }
    return data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Manejo de timeout
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        success: false,
        errorCode: 'TIMEOUT',
        message: 'Timeout: La solicitud tardó demasiado.',
        timestamp: new Date().toISOString(),
      });
    }

    // Error de conexión
    if (!error.response) {
      return Promise.reject({
        success: false,
        errorCode: 'CONNECTION_ERROR',
        message: 'Error de conexión: No se pudo conectar con el servidor.',
        timestamp: new Date().toISOString(),
      });
    }

    const errorData = error.response?.data;
    const errorCode = errorData?.errorCode;

    // Manejo específico por código de error
    switch (errorCode) {
      case 'TOKEN_EXPIRED':
        // Intentar refrescar token automáticamente (una sola vez)
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
              const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                refreshToken
              });

              // Actualizar tokens
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('refreshToken', response.data.refreshToken);

              // Reintentar request original
              originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
              return api(originalRequest);
            }
          } catch (refreshError) {
            // Si falla el refresh, limpiar y redirigir
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
            if (!window.location.pathname.includes('/login')) {
              // window.location.href = '/login';
              window.dispatchEvent(new CustomEvent('auth:logout'));
            }
          }
        }
        break;

      case 'INVALID_TOKEN':
      case 'FORBIDDEN':
        // Limpiar localStorage y redirigir
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
        if (!window.location.pathname.includes('/login')) {
          // window.location.href = '/login';
          window.dispatchEvent(new CustomEvent('auth:logout'));
        }
        break;

      case 'VALIDATION_ERROR':
        // Devolver errores de validación estructurados
        return Promise.reject({
          success: false,
          errorCode: 'VALIDATION_ERROR',
          message: errorData.message || 'Error de validación',
          errors: errorData.errors || [],
          fields: errorData.fields || [],
        });

      case 'RATE_LIMIT_EXCEEDED':
        return Promise.reject({
          success: false,
          errorCode: 'RATE_LIMIT_EXCEEDED',
          message: 'Demasiadas solicitudes. Por favor espera un momento.',
        });

      case 'NOT_FOUND':
        return Promise.reject({
          success: false,
          errorCode: 'NOT_FOUND',
          message: errorData.message || 'Recurso no encontrado',
        });

      case 'DUPLICATE_ENTRY':
        return Promise.reject({
          success: false,
          errorCode: 'DUPLICATE_ENTRY',
          message: errorData.message || 'Este registro ya existe',
          fields: errorData.fields || [],
        });
    }

    // Si es error 401 sin código específico
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    // Usar el error del servidor si existe
    return Promise.reject({
      success: false,
      errorCode: errorCode || 'UNKNOWN_ERROR',
      message: errorData?.message || 'Error desconocido del servidor.',
      timestamp: new Date().toISOString(),
      ...errorData,
    });
  }
);

// Función helper genérica
export const request = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  data?: any,
  config?: RequestConfig
): Promise<T> => {
  try {
    const response = await api({
      method,
      url,
      data,
      ...config,
    });
    return response as T;
  } catch (error: any) {
    // En desarrollo, loggear el error
    if (import.meta.env.DEV) {
      console.error(`API ${method} ${url} error:`, error);
    }
    throw error;
  }
};

// Métodos específicos
export const get = <T>(url: string, config?: RequestConfig): Promise<T> =>
  request<T>('GET', url, undefined, config);

export const post = <T>(url: string, data?: any, config?: RequestConfig): Promise<T> =>
  request<T>('POST', url, data, config);

export const put = <T>(url: string, data?: any, config?: RequestConfig): Promise<T> =>
  request<T>('PUT', url, data, config);

export const del = <T>(url: string, config?: RequestConfig): Promise<T> =>
  request<T>('DELETE', url, undefined, config);

export const patch = <T>(url: string, data?: any, config?: RequestConfig): Promise<T> =>
  request<T>('PATCH', url, data, config);

export default api; // src/services/api/notification.service.ts
import { useState } from 'react';
import { get, patch, post } from './index';

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  data?: any;
  createdAt: string;
}

/**
 * Obtiene las notificaciones del usuario autenticado
 */
export const getNotifications = async (options?: {
  limit?: number;
  offset?: number;
  unreadOnly?: boolean;
}): Promise<{
  success: boolean;
  notifications: Notification[];
  total: number;
  unreadCount: number;
}> => {
  const params = new URLSearchParams();
  if (options?.limit) params.append('limit', options.limit.toString());
  if (options?.offset) params.append('offset', options.offset.toString());
  if (options?.unreadOnly) params.append('unreadOnly', 'true');

  const url = `/notifications${params.toString() ? `?${params.toString()}` : ''}`;
  // const response =
  return await get(url);
  // return response;
};

/**
 * Marca una notificación como leída
 */
export const markNotificationAsRead = async (notificationId: string): Promise<{
  success: boolean;
  message: string;
}> => {
  return await patch(`/notifications/${notificationId}/read`, {});
};

/**
 * Marca todas las notificaciones como leídas
 */
export const markAllNotificationsAsRead = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  return await post('/notifications/read-all', {});
};

/**
 * Hook personalizado para usar notificaciones en React
 */
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadNotifications = async (unreadOnly = false) => {
    setLoading(true);
    try {
      const data = await getNotifications({ unreadOnly });
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error('Error cargando notificaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marcando notificación como leída:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marcando todas como leídas:', error);
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    loadNotifications,
    markAsRead,
    markAllAsRead
  };
}; // src/services/api/templateApi.service.ts
import { del, get, post } from './index';

export interface TemplateData {
    name: string;
    type: string;
    colors: Record<string, string> | string;
    texts: Record<string, string>;
    images?: Record<string, string>;
    sectionColors?: any;      // ← Cambiado a any
    typography?: any;         // ← Cambiado a any
    ui?: any;                 // ← Cambiado a any
    buttons?: any;            // ← Cambiado a any
    orderId?: string;
}

export interface TemplateResponse {
    success: boolean;
    message?: string;
    template?: any;
    templates?: any[];
}

export const templateApi = {
    saveTemplate: async (data: TemplateData): Promise<TemplateResponse> => {
        try {
            let typeUpper = data.type;
            if (typeof data.type === 'string' && data.type !== data.type.toUpperCase()) {
                typeUpper = data.type.toUpperCase();
            }

            let colors = data.colors;
            if (typeof colors === 'string') {
                if (colors === '') {
                    colors = {
                        primary: '#2563eb',
                        secondary: '#475569',
                        accent: '#1e293b',
                        background: '#ffffff',
                        text: '#0f172a'
                    };
                } else {
                    try {
                        colors = JSON.parse(colors);
                    } catch {
                        colors = {};
                    }
                }
            }

            const payload = {
                name: data.name,
                type: typeUpper,
                colors: colors,
                texts: data.texts || {},
                images: data.images || {},
                sectionColors: data.sectionColors || {},
                typography: data.typography || {},
                ui: data.ui || {},
                buttons: data.buttons || {}
            };

            console.log('📤 Guardando template completo:', payload);
            const response: TemplateResponse = await post('/templates', payload);
            return response;
        } catch (error) {
            console.error('Error en saveTemplate:', error);
            throw error;
        }
    },

    getUserTemplates: async (): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get('/templates');
            return response;
        } catch (error) {
            console.error('Error en getUserTemplates:', error);
            throw error;
        }
    },

    getTemplate: async (id: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get(`/templates/${id}`);
            return response;
        } catch (error) {
            console.error('Error en getTemplate:', error);
            throw error;
        }
    },

    deleteTemplate: async (id: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await del(`/templates/${id}`);
            return response;
        } catch (error) {
            console.error('Error en deleteTemplate:', error);
            throw error;
        }
    },

    saveVersion: async (id: string, data: any): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await post(`/templates/${id}/versions`, data);
            return response;
        } catch (error) {
            console.error('Error en saveVersion:', error);
            throw error;
        }
    },

    getVersions: async (id: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get(`/templates/${id}/versions`);
            return response;
        } catch (error) {
            console.error('Error en getVersions:', error);
            throw error;
        }
    },

    restoreVersion: async (id: string, version: number): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await post(`/templates/${id}/versions/${version}/restore`, {});
            return response;
        } catch (error) {
            console.error('Error en restoreVersion:', error);
            throw error;
        }
    },

    createShareLink: async (id: string, options?: { expiresIn?: number; maxViews?: number }): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await post(`/templates/${id}/share`, options || {});
            return response;
        } catch (error) {
            console.error('Error en createShareLink:', error);
            throw error;
        }
    },

    getSharedTemplate: async (token: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get(`/templates/shared/${token}`);
            return response;
        } catch (error) {
            console.error('Error en getSharedTemplate:', error);
            throw error;
        }
    },

    getPublicTemplates: async (type?: string, category?: string): Promise<TemplateResponse> => {
        try {
            const params = new URLSearchParams();
            if (type) params.append('type', type);
            if (category) params.append('category', category);
            const response: TemplateResponse = await get(`/templates/public?${params.toString()}`);
            return response;
        } catch (error) {
            console.error('Error en getPublicTemplates:', error);
            throw error;
        }
    },

    downloadPublicTemplate: async (id: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get(`/templates/public/${id}`);
            return response;
        } catch (error) {
            console.error('Error en downloadPublicTemplate:', error);
            throw error;
        }
    }
}; import type { StoredTemplate, Template } from '../types/template.types';

const STORAGE_KEY = 'kernelize_template_draft';
const AUTO_SAVE_KEY = 'kernelize_auto_save';

export interface StorageOptions {
  silent?: boolean;
}

export const storageService = {
  // Guardar borrador
  saveDraft: (template: Template, options: StorageOptions = {}): boolean => {
    try {
      const storedTemplate: StoredTemplate = {
        ...template,
        createdAt: template.createdAt.toISOString(),
        updatedAt: template.updatedAt.toISOString(),
        lastSaved: new Date().toISOString()
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedTemplate));

      if (!options.silent) {
        // Disparar evento para notificaciones
        window.dispatchEvent(new CustomEvent('template-saved', {
          detail: { message: 'Borrador guardado', type: 'success' }
        }));
      }

      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);

      if (!options.silent) {
        window.dispatchEvent(new CustomEvent('template-saved', {
          detail: { message: 'Error al guardar', type: 'error' }
        }));
      }

      return false;
    }
  },

  // Cargar borrador
  loadDraft: (): Template | null => {
    try {
      const draft = localStorage.getItem(STORAGE_KEY);
      if (!draft) return null;

      const stored = JSON.parse(draft) as StoredTemplate;

      const template: Template = {
        ...stored,
        createdAt: new Date(stored.createdAt),
        updatedAt: new Date(stored.updatedAt)
      };

      return template;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return null;
    }
  },

  // Guardar versión de auto-guardado
  saveAutoSave: (template: Template): void => {
    try {
      const storedTemplate: StoredTemplate = {
        ...template,
        createdAt: template.createdAt.toISOString(),
        updatedAt: template.updatedAt.toISOString(),
      };

      localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(storedTemplate));
    } catch (error) {
      console.error('Error in auto-save:', error);
    }
  },

  // Cargar auto-guardado
  loadAutoSave: (): Template | null => {
    try {
      const autoSave = localStorage.getItem(AUTO_SAVE_KEY);
      if (!autoSave) return null;

      const stored = JSON.parse(autoSave) as StoredTemplate;

      return {
        ...stored,
        createdAt: new Date(stored.createdAt),
        updatedAt: new Date(stored.updatedAt)
      };
    } catch (error) {
      console.error('Error loading auto-save:', error);
      return null;
    }
  },

  // Limpiar todo
  clearAll: (): void => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(AUTO_SAVE_KEY);
  }
}; import type { Template } from '../types/template.types';

const API_URL = import.meta.env.VITE_API_URL || 'https://kerneliceapi-production.up.railway.app/api'//'http://localhost:3000/api';

export const templateService = {
    // Guardar template (requiere autenticación)
    saveTemplate: async (template: Template, token: string) => {
        try {
            const response = await fetch(`${API_URL}/templates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(template)
            });

            if (!response.ok) throw new Error('Error saving template');

            return await response.json();
        } catch (error) {
            console.error('Error saving template:', error);
            throw error;
        }
    },

    // Obtener templates del usuario
    getUserTemplates: async (token: string) => {
        try {
            const response = await fetch(`${API_URL}/templates/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Error fetching templates');

            return await response.json();
        } catch (error) {
            console.error('Error fetching templates:', error);
            throw error;
        }
    },

    // Enviar template por email
    sendTemplateByEmail: async (template: Template, email: string) => {
        try {
            const response = await fetch(`${API_URL}/templates/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ template, email })
            });

            if (!response.ok) throw new Error('Error sending template');

            return await response.json();
        } catch (error) {
            console.error('Error sending template:', error);
            throw error;
        }
    },

    // Cargar template por ID
    loadTemplate: async (id: string, token?: string) => {
        try {
            const headers: HeadersInit = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_URL}/templates/${id}`, { headers });

            if (!response.ok) throw new Error('Error loading template');

            return await response.json();
        } catch (error) {
            console.error('Error loading template:', error);
            throw error;
        }
    }
}; import { Award, BarChart, Briefcase, Globe, LineChart, MapPin, Target, TrendingUp, Users } from 'lucide-react';
import consultingImage from '../../../assets/corpo.jpg';
import EditableImage from '../../../components/Editor/EditableImage';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

const iconMap: Record<string, any> = { Briefcase, Users, Award, MapPin, TrendingUp, Target, BarChart, LineChart, Globe };

const ConsultingAbout = () => {
    const { template } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };
    const typography = template?.typography || defaultTypography;

    const aboutTitleClamp = `clamp(1.5rem, 5vw, ${typography.aboutTitleSize})`;
    const aboutTextClamp = `clamp(0.875rem, 3vw, ${typography.aboutTextSize})`;
    const statsValueClamp = `clamp(1.25rem, 4vw, ${typography.aboutStatsValueSize})`;
    const statsLabelClamp = `clamp(0.75rem, 2vw, ${typography.aboutStatsLabelSize})`;
    const diffClamp = `clamp(0.875rem, 3vw, ${typography.aboutDifferentiatorSize})`;

    // Definir hasta 8 estadísticas (índices 1..8)
    const statsIndices = [1, 2, 3, 4, 5, 6, 7, 8];
    const getStatData = (idx: number) => {
        const defaults: Record<number, { icon: string; value: string; label: string }> = {
            1: { icon: 'Briefcase', value: '15+', label: 'Años de experiencia' },
            2: { icon: 'Users', value: '50+', label: 'Consultores expertos' },
            3: { icon: 'Award', value: '200+', label: 'Proyectos exitosos' },
            4: { icon: 'MapPin', value: '10+', label: 'Países con presencia' },
        };
        const def = defaults[idx] || { icon: 'Briefcase', value: '0', label: `Estadística ${idx}` };
        return {
            iconName: template?.texts?.[`stat_icon_${idx}`] || def.icon,
            value: template?.texts?.[`stat_value_${idx}`] || def.value,
            label: template?.texts?.[`stat_label_${idx}`] || def.label,
        };
    };

    // Definir hasta 8 diferenciadores (índices 0..7)
    const diffIndices = [0, 1, 2, 3, 4, 5, 6, 7];
    const getDiffText = (idx: number) => {
        const defaults: Record<number, string> = {
            0: 'Metodologías ágiles y adaptativas',
            1: 'Análisis de datos para toma de decisiones',
            2: 'Acompañamiento post-implementación',
            3: 'Confidencialidad y ética profesional',
        };
        return template?.texts?.[`differentiator_${idx}`] || defaults[idx] || `Diferenciador ${idx + 1}`;
    };

    const getIcon = (iconName: string) => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />;
    };

    // Determinar visibilidad: por defecto true para los 4 primeros stats y primeros 4 diffs, false para los adicionales
    const shouldShowStat = (idx: number) => {
        const showKey = `show_stat_${idx}`;
        const defaultValue = idx <= 4; // estadísticas 1..4 visibles por defecto
        const stored = template?.texts?.[showKey];
        return stored === undefined ? defaultValue : stored !== 'false';
    };

    const shouldShowDiff = (idx: number) => {
        const showKey = `show_diff_${idx}`;
        const defaultValue = idx <= 3; // diferenciadores 0..3 visibles por defecto
        const stored = template?.texts?.[showKey];
        return stored === undefined ? defaultValue : stored !== 'false';
    };

    return (
        <section id="methodology" className="section-padding" style={{ backgroundColor: s.aboutBackground }}>
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Imagen (sin cambios) */}
                    <div className="relative group order-2 lg:order-1">
                        <div className="absolute -inset-4 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl" style={{ backgroundColor: s.aboutBadgeBackground }} />
                        <div className="relative z-10 overflow-hidden shadow-2xl" style={{ borderRadius: s.aboutImageBorderRadius }}>
                            <div className="aspect-[4/5] relative overflow-hidden">
                                <EditableImage elementId="about_image" defaultImage={consultingImage} alt="Equipo de consultores" className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent pointer-events-none" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white pointer-events-none">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: s.aboutBadgeBackground }} />
                                        <span className="text-sm font-medium" style={{ color: s.aboutBadgeTextColor }}>
                                            <EditableText elementId="about_badge" defaultText="Equipo multidisciplinario" tag="span" />
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 leading-tight text-white">
                                        <EditableText elementId="about_title" defaultText="Expertos en diversas industrias" tag="span" />
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contenido textual */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <div>
                            <span className="inline-block px-5 py-2 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: s.aboutBadgeBackground, color: s.aboutBadgeTextColor }}>
                                <EditableText elementId="about_section_badge" defaultText="Nuestra Firma" tag="span" />
                            </span>
                            <h2 className="font-bold mb-6" style={{ color: s.aboutTitleColor, fontSize: aboutTitleClamp }}>
                                <EditableText elementId="about_heading_1" defaultText="Consultoría con" tag="span" />{' '}
                                <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${s.aboutTitleColor}, ${s.aboutTitleColor})` }}>
                                    <EditableText elementId="about_heading_2" defaultText="Resultados Medibles" tag="span" />
                                </span>
                            </h2>
                            <p className="mb-6 leading-relaxed" style={{ color: s.aboutTextColor, fontSize: aboutTextClamp }}>
                                <EditableText elementId="about_description_1" defaultText="En Kernelize Consulting no creemos en soluciones genéricas..." tag="span" />
                            </p>
                            <p className="leading-relaxed" style={{ color: s.aboutTextColor, fontSize: aboutTextClamp }}>
                                <EditableText elementId="about_description_2" defaultText="Nuestro enfoque combina el rigor analítico con la creatividad..." tag="span" />
                            </p>
                        </div>

                        {/* Estadísticas dinámicas */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t" style={{ borderColor: s.aboutTextColor }}>
                            {statsIndices.map(idx => {
                                if (!shouldShowStat(idx)) return null;
                                const { iconName, value, label } = getStatData(idx);
                                const IconComponent = getIcon(iconName);
                                return (
                                    <div key={idx} className="text-center group">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: `${s.aboutBadgeBackground}20`, color: s.aboutBadgeBackground }}>
                                            {IconComponent}
                                        </div>
                                        <div className="font-bold group-hover:text-blue-600 transition-colors" style={{ color: s.statValueColor, fontSize: statsValueClamp }}>
                                            <EditableText elementId={`stat_value_${idx}`} defaultText={value} tag="span" />
                                        </div>
                                        <div style={{ color: s.statLabelColor, fontSize: statsLabelClamp }}>
                                            <EditableText elementId={`stat_label_${idx}`} defaultText={label} tag="span" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Lista de diferenciadores (Nuestro compromiso) */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold" style={{ color: s.aboutTitleColor }}>
                                <EditableText elementId="about_commitment_title" defaultText="Nuestro compromiso:" tag="span" />
                            </h3>
                            <ul className="space-y-3">
                                {diffIndices.map(idx => {
                                    if (!shouldShowDiff(idx)) return null;
                                    const text = getDiffText(idx);
                                    return (
                                        <li key={idx} className="flex items-center">
                                            <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{ backgroundColor: s.aboutBadgeBackground }}>
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span style={{ color: s.aboutTextColor, fontSize: diffClamp }}>
                                                <EditableText elementId={`differentiator_${idx}`} defaultText={text} tag="span" />
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultingAbout; import { Briefcase, Calendar, CheckCircle, Clock, Globe, Mail, MapPin, MessageCircle, Phone, Send, Users, TrendingUp, Target, Award, BarChart, LineChart, Heart, ThumbsUp, Zap, Eye, Star } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

// Mapeo ampliado de iconos (incluye todos los que se pueden seleccionar)
const iconMap: Record<string, any> = {
    Mail, MapPin, Phone, Briefcase, CheckCircle, MessageCircle, Globe, Clock, Calendar,
    TrendingUp, Users, Target, Award, BarChart, LineChart, Heart, ThumbsUp, Zap, Eye, Star
};

const ConsultingContact = () => {
    const { template } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };
    const typography = template?.typography || defaultTypography;

    const contactTitleClamp = `clamp(1.5rem, 5vw, ${typography.contactTitleSize})`;
    const contactTextClamp = `clamp(0.875rem, 3vw, ${typography.contactTextSize})`;
    const contactLabelClamp = `clamp(0.75rem, 2.5vw, ${typography.contactLabelSize})`;
    const contactButtonClamp = `clamp(0.875rem, 3vw, ${typography.contactButtonSize})`;
    const contactCardTitleClamp = `clamp(1rem, 3vw, ${typography.contactCardTitleSize})`;

    const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', position: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', phone: '', company: '', position: '', message: '' });
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    // ----- CARDS DE CONTACTO (Email, Teléfono, Ubicación + 3 extras) -----
    const contactCards = [
        { id: 'email', defaultIcon: 'Mail', defaultTitle: 'Email', defaultContent: 'consultoria@kernelize.com', defaultHref: 'mailto:consultoria@kernelize.com' },
        { id: 'phone', defaultIcon: 'Phone', defaultTitle: 'Teléfono', defaultContent: '+54 9 11 6745-7413', defaultHref: 'tel:+5491167457413' },
        { id: 'location', defaultIcon: 'MapPin', defaultTitle: 'Ubicación', defaultContent: 'Buenos Aires, Argentina', defaultHref: '#' },
        { id: 'extra_1', defaultIcon: 'Globe', defaultTitle: 'Card Extra 1', defaultContent: 'Contenido extra 1', defaultHref: '#' },
        { id: 'extra_2', defaultIcon: 'MessageCircle', defaultTitle: 'Card Extra 2', defaultContent: 'Contenido extra 2', defaultHref: '#' },
        { id: 'extra_3', defaultIcon: 'Clock', defaultTitle: 'Card Extra 3', defaultContent: 'Contenido extra 3', defaultHref: '#' },
    ];

    const shouldShowContactCard = (idx: number) => {
        const showKey = `show_contact_card_${idx}`;
        const defaultValue = idx < 3; // email, phone, location visibles por defecto
        const stored = template?.texts?.[showKey];
        return stored === undefined ? defaultValue : stored !== 'false';
    };

    // ----- BLOQUES DE HORARIO (principal + 4 extras) -----
    const hourBlocks = [
        { id: 'main', defaultTitle: 'Horario de atención', defaultLine1: 'Lunes a Viernes: 9:00 - 19:00 hs', defaultLine2: 'Sábados: Reuniones programadas', defaultNote: 'Respuesta garantizada en 12 horas hábiles' },
        { id: 'extra_1', defaultTitle: 'Horario Extra 1', defaultLine1: 'Línea extra 1', defaultLine2: 'Línea extra 2', defaultNote: 'Nota extra 1' },
        { id: 'extra_2', defaultTitle: 'Horario Extra 2', defaultLine1: 'Línea extra 1', defaultLine2: 'Línea extra 2', defaultNote: 'Nota extra 2' },
        { id: 'extra_3', defaultTitle: 'Horario Extra 3', defaultLine1: 'Línea extra 1', defaultLine2: 'Línea extra 2', defaultNote: 'Nota extra 3' },
        { id: 'extra_4', defaultTitle: 'Horario Extra 4', defaultLine1: 'Línea extra 1', defaultLine2: 'Línea extra 2', defaultNote: 'Nota extra 4' },
    ];

    const shouldShowHourBlock = (idx: number) => {
        const showKey = `show_hour_block_${idx}`;
        const defaultValue = idx === 0; // solo el bloque principal visible por defecto
        const stored = template?.texts?.[showKey];
        return stored === undefined ? defaultValue : stored !== 'false';
    };

    const getIcon = (iconName: string) => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className="w-6 h-6" /> : <Mail className="w-6 h-6" />;
    };

    return (
        <section id="contact" className="section-padding" style={{ backgroundColor: s.contactBackground }}>
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-bold mb-6" style={{ color: s.contactTitleColor, fontSize: contactTitleClamp }}>
                        <EditableText elementId="contact_title_1" defaultText="Comencemos a" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${s.contactTitleColor}, ${s.contactTitleColor})` }}>
                            <EditableText elementId="contact_title_2" defaultText="transformar" tag="span" />
                        </span>{' '}
                        <EditableText elementId="contact_title_3" defaultText="tu negocio" tag="span" />
                    </h2>
                    <p className="max-w-2xl mx-auto" style={{ color: s.contactTextColor, fontSize: contactTextClamp }}>
                        <EditableText elementId="contact_description" defaultText="Solicita una reunión estratégica sin costo y descubre cómo podemos ayudarte a alcanzar tus metas." tag="span" />
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Columna izquierda */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-bold mb-6" style={{ color: s.contactTitleColor, fontSize: contactTitleClamp }}>
                                <EditableText elementId="contact_info_title" defaultText="Información de contacto" tag="span" />
                            </h3>
                            <p className="mb-8" style={{ color: s.contactTextColor, fontSize: contactTextClamp }}>
                                <EditableText elementId="contact_info_description" defaultText="Estamos a disposición para atender tus consultas y coordinar una primera reunión de diagnóstico." tag="span" />
                            </p>
                        </div>

                        {/* Cards de contacto dinámicas */}
                        <div className="space-y-6">
                            {contactCards.map((card, idx) => {
                                if (!shouldShowContactCard(idx)) return null;
                                const iconName = template?.texts?.[`contact_card_${card.id}_icon`] || card.defaultIcon;
                                const title = template?.texts?.[`contact_card_${card.id}_title`] || card.defaultTitle;
                                const content = template?.texts?.[`contact_card_${card.id}_content`] || card.defaultContent;
                                const href = template?.texts?.[`contact_card_${card.id}_href`] || card.defaultHref;
                                return (
                                    <a key={card.id} href={href} className="flex items-start space-x-4 p-4 rounded-xl transition-colors group" style={{ backgroundColor: s.contactFormBackground, border: `1px solid ${s.contactFormBorder}` }}>
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: `${s.contactButtonBackground}20`, color: s.contactButtonBackground }}>
                                            {getIcon(iconName)}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold group-hover:text-blue-600 transition-colors" style={{ color: s.contactTitleColor, fontSize: contactCardTitleClamp }}>
                                                <EditableText elementId={`contact_card_${card.id}_title`} defaultText={title} tag="span" />
                                            </h4>
                                            <p className="mt-1" style={{ color: s.contactTextColor, fontSize: contactTextClamp }}>
                                                <EditableText elementId={`contact_card_${card.id}_content`} defaultText={content} tag="span" />
                                            </p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Bloques de horario dinámicos */}
                        {hourBlocks.map((block, idx) => {
                            if (!shouldShowHourBlock(idx)) return null;
                            const title = template?.texts?.[`contact_hours_title_${block.id}`] || block.defaultTitle;
                            const line1 = template?.texts?.[`contact_hours_line1_${block.id}`] || block.defaultLine1;
                            const line2 = template?.texts?.[`contact_hours_line2_${block.id}`] || block.defaultLine2;
                            const note = template?.texts?.[`contact_hours_note_${block.id}`] || block.defaultNote;
                            const iconName = template?.texts?.[`contact_hours_icon_${block.id}`] || 'Briefcase';
                            const Icon = iconMap[iconName] || Briefcase;
                            return (
                                <div key={block.id} className="p-6 rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${s.contactButtonBackground}, ${s.contactButtonHoverBackground})` }}>
                                    <h4 className="font-semibold text-lg mb-2 flex items-center" style={{ fontSize: contactTitleClamp }}>
                                        <Icon className="w-5 h-5 mr-2" />
                                        <EditableText elementId={`contact_hours_title_${block.id}`} defaultText={title} tag="span" />
                                    </h4>
                                    <p className="text-sm opacity-90" style={{ fontSize: contactTextClamp }}>
                                        <EditableText elementId={`contact_hours_line1_${block.id}`} defaultText={line1} tag="span" />
                                    </p>
                                    <p className="text-sm opacity-90" style={{ fontSize: contactTextClamp }}>
                                        <EditableText elementId={`contact_hours_line2_${block.id}`} defaultText={line2} tag="span" />
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-white/20">
                                        <p className="text-sm" style={{ fontSize: contactTextClamp }}>
                                            <EditableText elementId={`contact_hours_note_${block.id}`} defaultText={note} tag="span" />
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Formulario (sin cambios estructurales) */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl p-8 border" style={{ backgroundColor: s.contactFormBackground, borderColor: s.contactFormBorder }}>
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(to right, ${s.contactButtonBackground}, ${s.contactButtonHoverBackground})` }}>
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4" style={{ color: s.contactTitleColor, fontSize: contactTitleClamp }}>
                                        <EditableText elementId="contact_success_title" defaultText="¡Mensaje enviado con éxito!" tag="span" />
                                    </h3>
                                    <p className="mb-8" style={{ color: s.contactTextColor, fontSize: contactTextClamp }}>
                                        <EditableText elementId="contact_success_message" defaultText="En menos de 12 horas hábiles, uno de nuestros consultores se comunicará contigo para coordinar una reunión." tag="span" />
                                    </p>
                                    <button onClick={() => setIsSubmitted(false)} className="text-white font-semibold px-8 py-3 rounded-lg transition-all" style={{ background: `linear-gradient(to right, ${s.contactButtonBackground}, ${s.contactButtonHoverBackground})`, fontSize: contactButtonClamp }}>
                                        <EditableText elementId="contact_success_button" defaultText="Enviar otro mensaje" tag="span" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold mb-8" style={{ color: s.contactTitleColor, fontSize: contactTitleClamp }}>
                                        <EditableText elementId="contact_form_title" defaultText="Solicita una reunión de diagnóstico" tag="span" />
                                    </h3>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium mb-2" style={{ color: s.contactTextColor, fontSize: contactLabelClamp }}>
                                                    <EditableText elementId="contact_label_name" defaultText="Nombre completo *" tag="span" />
                                                </label>
                                                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                    style={{ backgroundColor: s.contactInputBackground, border: `1px solid ${s.contactInputBorder}`, color: s.contactInputTextColor, fontSize: contactTextClamp }}
                                                    placeholder="Tu nombre" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2" style={{ color: s.contactTextColor, fontSize: contactLabelClamp }}>
                                                    <EditableText elementId="contact_label_email" defaultText="Email corporativo *" tag="span" />
                                                </label>
                                                <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                    style={{ backgroundColor: s.contactInputBackground, border: `1px solid ${s.contactInputBorder}`, color: s.contactInputTextColor, fontSize: contactTextClamp }}
                                                    placeholder="nombre@empresa.com" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-6">
                                            <div className="text-sm" style={{ color: s.contactTextColor, fontSize: contactLabelClamp }}>
                                                * <EditableText elementId="contact_required" defaultText="Campos obligatorios" tag="span" />
                                            </div>
                                            <button type="submit" disabled={isSubmitting}
                                                className="text-white font-semibold px-8 py-4 rounded-lg transition-all disabled:opacity-50 flex items-center"
                                                style={{ backgroundColor: s.contactButtonBackground, color: s.contactButtonText, fontSize: contactButtonClamp }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = s.contactButtonHoverBackground}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = s.contactButtonBackground}>
                                                {isSubmitting ? <EditableText elementId="contact_sending" defaultText="Enviando..." tag="span" />
                                                    : <><EditableText elementId="contact_submit" defaultText="Solicitar reunión" tag="span" /><Send className="ml-2 w-5 h-5" /></>}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultingContact; import { Award, BarChart, Briefcase, Globe, Heart, LineChart, Star, Target, TrendingUp, Users, type LucideIcon } from 'lucide-react';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

const iconMap: Record<string, LucideIcon> = {
    BarChart: BarChart,
    Users: Users,
    Target: Target,
    LineChart: LineChart,
    Award: Award,
    Globe: Globe,
    TrendingUp: TrendingUp,
    Briefcase: Briefcase,
    Heart: Heart,
    Star: Star,
};

const ConsultingFeatures = () => {
    const { template, updateText } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };
    const typography = { ...defaultTypography, ...(template?.typography || {}) };

    const featuresTitleClamp = `clamp(1.5rem, 5vw, ${typography.featuresTitleSize})`;
    const featuresCardTitleClamp = `clamp(1.125rem, 4vw, ${typography.featuresCardTitleSize})`;
    const featuresDescClamp = `clamp(0.875rem, 3vw, ${typography.featuresDescriptionSize})`;

    // Función para reconstruir la lista dinámica desde datos antiguos (si existe)
    const migrateFromOldFormat = () => {
        const oldFeatureIds = ['strategic', 'talent', 'commercial', 'financial', 'certifications', 'international', 'extra_1', 'extra_2', 'extra_3'];
        const migrated = [];

        for (const id of oldFeatureIds) {
            const showKey = `show_feature_${id}`;
            const iconKey = `feature_icon_${id}`;
            const titleKey = `feature_title_${id}`;
            const descKey = `feature_desc_${id}`;

            // Si existe alguna de estas claves (indica que se usó el formato antiguo)
            if (template?.texts?.[showKey] !== undefined ||
                template?.texts?.[iconKey] !== undefined ||
                template?.texts?.[titleKey] !== undefined ||
                template?.texts?.[descKey] !== undefined) {

                const visible = template?.texts?.[showKey] === undefined ? true : template?.texts?.[showKey] !== 'false';
                const icon = template?.texts?.[iconKey] || (id === 'strategic' ? 'BarChart' : id === 'talent' ? 'Users' : id === 'commercial' ? 'Target' : id === 'financial' ? 'LineChart' : id === 'certifications' ? 'Award' : 'Globe');
                const title = template?.texts?.[titleKey] || (id === 'strategic' ? 'Análisis Estratégico' : id === 'talent' ? 'Gestión del Talento' : id === 'commercial' ? 'Planificación Comercial' : id === 'financial' ? 'Optimización Financiera' : id === 'certifications' ? 'Certificaciones y Normas' : 'Expansión Internacional');
                const description = template?.texts?.[descKey] || (id === 'strategic' ? 'Evaluación profunda de tu mercado...' : id === 'talent' ? 'Desarrollo de equipos de alto rendimiento...' : id === 'commercial' ? 'Estrategias de ventas y marketing...' : id === 'financial' ? 'Mejora de la rentabilidad...' : id === 'certifications' ? 'Asesoramiento para obtener certificaciones...' : 'Estrategias para llevar tu negocio a nuevos mercados...');

                migrated.push({
                    id: `migrated_${id}`,
                    icon,
                    title,
                    description,
                    visible
                });
            }
        }

        if (migrated.length > 0) {
            // Guardar la lista migrada en el nuevo formato (solo una vez)
            updateText('feature_', JSON.stringify(migrated));
            return migrated;
        }
        return null;
    };

    // Cargar lista dinámica actual
    let featuresList: any[] = [];
    const storedFeatures = template?.texts?.['feature_'];
    if (storedFeatures && storedFeatures !== '') {
        try {
            const parsed = JSON.parse(storedFeatures);
            if (Array.isArray(parsed) && parsed.length > 0) {
                featuresList = parsed;
            }
        } catch (e) { }
    }

    // Si no hay lista dinámica, intentar migrar desde datos antiguos
    if (featuresList.length === 0) {
        const migrated = migrateFromOldFormat();
        if (migrated && migrated.length > 0) {
            featuresList = migrated;
        }
    }

    // Si aún no hay nada, usar valores por defecto (6 elementos)
    if (featuresList.length === 0) {
        featuresList = [
            { id: 'default_1', icon: 'BarChart', title: 'Análisis Estratégico', description: 'Evaluación profunda de tu mercado, competencia y posición actual para identificar oportunidades.', visible: true },
            { id: 'default_2', icon: 'Users', title: 'Gestión del Talento', description: 'Desarrollo de equipos de alto rendimiento y cultura organizacional alineada a objetivos.', visible: true },
            { id: 'default_3', icon: 'Target', title: 'Planificación Comercial', description: 'Estrategias de ventas y marketing para penetrar mercados y fidelizar clientes.', visible: true },
            { id: 'default_4', icon: 'LineChart', title: 'Optimización Financiera', description: 'Mejora de la rentabilidad, control de costos y planificación financiera a corto y largo plazo.', visible: true },
            { id: 'default_5', icon: 'Award', title: 'Certificaciones y Normas', description: 'Asesoramiento para obtener certificaciones de calidad que mejoren tu competitividad.', visible: true },
            { id: 'default_6', icon: 'Globe', title: 'Expansión Internacional', description: 'Estrategias para llevar tu negocio a nuevos mercados con el menor riesgo posible.', visible: true },
        ];
    }

    const getIcon = (iconName: string, className: string, color?: string) => {
        const Icon = iconMap[iconName];
        if (!Icon) return <BarChart className={className} style={{ color }} />;
        return <Icon className={className} style={{ color }} />;
    };

    return (
        <section id="services" className="section-padding" style={{ backgroundColor: s.featuresBackground }}>
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-bold mb-6" style={{ color: s.featuresTitleColor, fontSize: featuresTitleClamp }}>
                        <EditableText elementId="features_title_1" defaultText="Capacidades que" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${s.featuresTitleColor}, ${s.featuresTitleColor})` }}>
                            <EditableText elementId="features_title_2" defaultText="Transforman" tag="span" />
                        </span>
                    </h2>
                    <p className="mx-auto" style={{ color: s.featuresTitleColor, fontSize: featuresDescClamp }}>
                        <EditableText elementId="features_description" defaultText="No solo aconsejamos, implementamos. Te acompañamos en cada paso con herramientas y metodologías probadas." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuresList.map((feature, idx) => {
                        if (feature.visible === false) return null;
                        const title = feature.title || (idx === 0 ? 'Análisis Estratégico' : `Característica ${idx + 1}`);
                        const description = feature.description || 'Descripción de la característica';
                        const iconName = feature.icon || 'BarChart';
                        const uniqueId = feature.id || `feature_${idx}`;

                        return (
                            <div
                                key={uniqueId}
                                className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-xl flex flex-col items-center text-center"
                                style={{
                                    backgroundColor: s.featuresCardBackground,
                                    border: `1px solid ${s.featuresCardBorder}`,
                                }}
                            >
                                <div
                                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                                    style={{ color: s.featuresIconColor }}
                                >
                                    {getIcon(iconName, s.iconSize, s.featuresIconColor)}
                                </div>
                                <h3
                                    className="font-bold mb-3 transition-colors group-hover:text-blue-600"
                                    style={{ color: s.featuresTitleColor, fontSize: featuresCardTitleClamp }}
                                >
                                    <EditableText
                                        elementId={`feature_title_${uniqueId}`}
                                        defaultText={title}
                                        tag="span"
                                    />
                                </h3>
                                <p className="leading-relaxed" style={{ color: s.featuresTitleColor, fontSize: featuresDescClamp }}>
                                    <EditableText
                                        elementId={`feature_desc_${uniqueId}`}
                                        defaultText={description}
                                        tag="span"
                                    />
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ConsultingFeatures; import { Award, Briefcase, Facebook, Heart, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import EditableImage from '../../../components/Editor/EditableImage';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

const iconMap: Record<string, any> = { Award, Briefcase, Heart, Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Twitter };

const ConsultingFooter = () => {
    const { template } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };
    const typography = template?.typography || defaultTypography;

    const footerHeadingClamp = `clamp(1rem, 4vw, ${typography.footerHeadingSize})`;
    const footerTextClamp = `clamp(0.75rem, 2.5vw, ${typography.footerTextSize})`;
    const footerLinkClamp = `clamp(0.75rem, 2.5vw, ${typography.footerLinkSize})`;

    const currentYear = new Date().getFullYear();

    // URLs redes sociales (desde template.texts)
    const socialUrls = {
        facebook: template?.texts?.social_facebook_url || '#',
        instagram: template?.texts?.social_instagram_url || '#',
        linkedin: template?.texts?.social_linkedin_url || '#',
        twitter: template?.texts?.social_twitter_url || '#',
    };

    // Redes sociales con checkbox de visibilidad
    const socialNetworks = [
        { id: 'facebook', label: 'Facebook', defaultUrl: socialUrls.facebook, defaultIcon: 'Facebook' },
        { id: 'instagram', label: 'Instagram', defaultUrl: socialUrls.instagram, defaultIcon: 'Instagram' },
        { id: 'linkedin', label: 'LinkedIn', defaultUrl: socialUrls.linkedin, defaultIcon: 'Linkedin' },
        { id: 'twitter', label: 'Twitter', defaultUrl: socialUrls.twitter, defaultIcon: 'Twitter' },
    ];

    const shouldShowSocial = (id: string) => {
        const showKey = `show_social_${id}`;
        const stored = template?.texts?.[showKey];
        return stored === undefined ? true : stored !== 'false';
    };

    // Enlaces rápidos (hasta 8)
    const quickLinksList = [
        { id: 'home', defaultLabel: 'Inicio', defaultUrl: '#home' },
        { id: 'services', defaultLabel: 'Servicios', defaultUrl: '#services' },
        { id: 'methodology', defaultLabel: 'Metodología', defaultUrl: '#methodology' },
        { id: 'testimonials', defaultLabel: 'Casos de éxito', defaultUrl: '#testimonials' },
        { id: 'contact', defaultLabel: 'Contacto', defaultUrl: '#contact' },
        { id: 'extra_1', defaultLabel: 'Enlace Extra 1', defaultUrl: '#' },
        { id: 'extra_2', defaultLabel: 'Enlace Extra 2', defaultUrl: '#' },
        { id: 'extra_3', defaultLabel: 'Enlace Extra 3', defaultUrl: '#' },
    ];

    const shouldShowQuickLink = (idx: number) => {
        const showKey = `show_quicklink_${idx}`;
        const stored = template?.texts?.[showKey];
        return stored === undefined ? idx < 5 : stored !== 'false';
    };

    // Áreas de expertise
    const expertiseList = [
        { id: 'expertise_1', defaultLabel: 'Estrategia Corporativa' },
        { id: 'expertise_2', defaultLabel: 'Transformación Digital' },
        { id: 'expertise_3', defaultLabel: 'Gestión del Talento' },
        { id: 'expertise_4', defaultLabel: 'Finanzas Corporativas' },
        { id: 'expertise_5', defaultLabel: 'Expansión Internacional' },
        { id: 'expertise_6', defaultLabel: 'Innovación' },
        { id: 'expertise_7', defaultLabel: 'Sostenibilidad' },
        { id: 'expertise_8', defaultLabel: 'Ciberseguridad' },
    ];

    const shouldShowExpertise = (idx: number) => {
        const showKey = `show_expertise_${idx}`;
        const stored = template?.texts?.[showKey];
        return stored === undefined ? idx < 5 : stored !== 'false';
    };

    // Enlaces legales (siempre visibles)
    const legalLinks = [
        { id: 'terms', defaultLabel: 'Términos y condiciones', defaultUrl: 'https://kernelicepage-production.up.railway.app/terminos' },
        { id: 'privacy', defaultLabel: 'Política de privacidad', defaultUrl: 'https://kernelicepage-production.up.railway.app/privacidad' },
        { id: 'cookies', defaultLabel: 'Cookies', defaultUrl: 'https://kernelicepage-production.up.railway.app/contacto' },
    ];

    // Certificaciones dinámicas
    const getCertificationLabel = (idx: number) => {
        const defaults: Record<number, string> = {
            1: 'ISO 9001:2024', 2: 'Miembro de AACCP', 3: 'Certified Partners', 4: '+15 años de experiencia'
        };
        return template?.texts?.[`cert_${idx}`] || defaults[idx] || `Certificación ${idx}`;
    };
    const shouldShowCertification = (idx: number) => {
        const showKey = `show_certification_${idx}`;
        const stored = template?.texts?.[showKey];
        return stored === undefined ? idx <= 4 : stored !== 'false';
    };

    const getIcon = (iconName: string, className: string = s.iconSize) => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className={className} /> : <Briefcase className={className} />;
    };

    const heartIcon = <Heart className="w-4 h-4 text-red-500" />;

    return (
        <footer id="footer" className="border-t" style={{ backgroundColor: s.footerBackground, borderColor: `${s.footerLinkColor}40` }}>
            <div className="container-custom px-4 sm:px-6 lg:px-8">
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Información de la empresa */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            {/* Logo: usa EditableImage para poder cambiarlo desde el dashboard */}
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center" style={{ background: `linear-gradient(to right, ${s.footerLinkHoverColor}, ${s.footerHeadingColor})` }}>
                                <EditableImage
                                    elementId="footer_logo"
                                    defaultImage=""
                                    alt="Logo"
                                    className="w-full h-full object-cover"
                                    category="consulting"
                                    containerClassName="w-full h-full"
                                    modalRelative={false}
                                />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: s.footerHeadingColor, fontSize: footerHeadingClamp }}>
                                <EditableText elementId="footer_brand_1" defaultText="Kernelize" tag="span" />
                                <EditableText elementId="footer_brand_2" defaultText="Consulting" tag="span" className="ml-1" />
                            </h2>
                        </div>
                        <p className="leading-relaxed" style={{ color: s.footerTextColor, fontSize: footerTextClamp }}>
                            <EditableText elementId="footer_description" defaultText="Transformamos empresas a través de estrategias innovadoras y acompañamiento experto. Más de 15 años impulsando el éxito de nuestros clientes." tag="span" />
                        </p>
                        <div className="flex space-x-3">
                            {socialNetworks.map((social) => {
                                if (!shouldShowSocial(social.id)) return null;
                                return (
                                    <a key={social.id} href={social.defaultUrl} target="_blank" rel="noopener noreferrer"
                                        className="p-2 rounded-lg transition-all"
                                        style={{ backgroundColor: `${s.footerBackground}cc`, color: s.socialIconColor }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = s.socialIconHoverColor}
                                        onMouseLeave={(e) => e.currentTarget.style.color = s.socialIconColor}>
                                        {getIcon(social.defaultIcon, s.iconSize)}
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Enlaces rápidos */}
                    <div>
                        <h3 className="font-semibold mb-4" style={{ color: s.footerHeadingColor, fontSize: footerHeadingClamp }}>
                            <EditableText elementId="footer_quick_title" defaultText="Enlaces Rápidos" tag="span" />
                        </h3>
                        <ul className="space-y-2">
                            {quickLinksList.map((link, idx) => {
                                if (!shouldShowQuickLink(idx)) return null;
                                const label = template?.texts?.[`quicklink_label_${link.id}`] || link.defaultLabel;
                                const url = template?.texts?.[`quicklink_url_${link.id}`] || link.defaultUrl;
                                return (
                                    <li key={link.id}>
                                        <a href={url} className="transition-colors" style={{ color: s.footerLinkColor, fontSize: footerLinkClamp }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = s.footerLinkHoverColor}
                                            onMouseLeave={(e) => e.currentTarget.style.color = s.footerLinkColor}>
                                            <EditableText elementId={`quicklink_label_${link.id}`} defaultText={label} tag="span" />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Áreas de Expertise */}
                    <div>
                        <h3 className="font-semibold mb-4" style={{ color: s.footerHeadingColor, fontSize: footerHeadingClamp }}>
                            <EditableText elementId="footer_expertise_title" defaultText="Áreas de Expertise" tag="span" />
                        </h3>
                        <ul className="space-y-2">
                            {expertiseList.map((area, idx) => {
                                if (!shouldShowExpertise(idx)) return null;
                                const label = template?.texts?.[`expertise_label_${area.id}`] || area.defaultLabel;
                                return (
                                    <li key={area.id}>
                                        <span style={{ color: s.footerTextColor, fontSize: footerTextClamp }}>
                                            <EditableText elementId={`expertise_label_${area.id}`} defaultText={label} tag="span" />
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Contacto directo */}
                    <div className="space-y-4">
                        <h3 className="font-semibold mb-4" style={{ color: s.footerHeadingColor, fontSize: footerHeadingClamp }}>
                            <EditableText elementId="footer_contact_title" defaultText="Contacto Directo" tag="span" />
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <span className="flex-shrink-0 mt-0.5" style={{ color: s.socialIconColor }}>
                                    {getIcon('Mail', s.iconSize)}
                                </span>
                                <span style={{ color: s.footerTextColor, fontSize: footerTextClamp }}>
                                    <EditableText elementId="footer_contact_email" defaultText="consultoria@kernelize.com" tag="span" />
                                </span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="flex-shrink-0 mt-0.5" style={{ color: s.socialIconColor }}>
                                    {getIcon('Phone', s.iconSize)}
                                </span>
                                <span style={{ color: s.footerTextColor, fontSize: footerTextClamp }}>
                                    <EditableText elementId="footer_contact_phone" defaultText="+54 9 11 6745-7413" tag="span" />
                                </span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="flex-shrink-0 mt-0.5" style={{ color: s.socialIconColor }}>
                                    {getIcon('MapPin', s.iconSize)}
                                </span>
                                <span style={{ color: s.footerTextColor, fontSize: footerTextClamp }}>
                                    <EditableText elementId="footer_contact_location" defaultText="Buenos Aires, Argentina" tag="span" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t" style={{ borderColor: `${s.footerLinkColor}40` }}></div>

                {/* Sección inferior */}
                <div className="py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-center md:text-left">
                        <p style={{ color: s.footerTextColor, fontSize: footerTextClamp }}>
                            © {currentYear} <EditableText elementId="footer_copyright" defaultText="Kernelize Consulting. Todos los derechos reservados." tag="span" />
                        </p>
                        <p className="text-sm mt-1 flex items-center justify-center md:justify-start" style={{ color: s.footerTextColor, fontSize: footerTextClamp }}>
                            <EditableText elementId="footer_made_with" defaultText="Hecho con" tag="span" />
                            {heartIcon}
                            <EditableText elementId="footer_for" defaultText="para empresas que buscan crecer" tag="span" />
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end gap-4">
                        {legalLinks.map((item) => {
                            const label = template?.texts?.[`legal_label_${item.id}`] || item.defaultLabel;
                            const url = template?.texts?.[`legal_url_${item.id}`] || item.defaultUrl;
                            return (
                                <a key={item.id} href={url} className="text-sm transition-colors" style={{ color: s.footerLinkColor, fontSize: footerLinkClamp }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = s.footerLinkHoverColor}
                                    onMouseLeave={(e) => e.currentTarget.style.color = s.footerLinkColor}>
                                    <EditableText elementId={`legal_label_${item.id}`} defaultText={label} tag="span" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Certificaciones dinámicas */}
                <div className="pb-8 pt-4 border-t" style={{ borderColor: `${s.footerLinkColor}40` }}>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(idx => {
                            if (!shouldShowCertification(idx)) return null;
                            const certLabel = getCertificationLabel(idx);
                            return (
                                <span key={idx} className="px-3 py-1 rounded-full border" style={{ backgroundColor: `${s.footerBackground}cc`, borderColor: s.footerLinkColor, color: s.footerTextColor, fontSize: footerTextClamp }}>
                                    <EditableText elementId={`cert_${idx}`} defaultText={certLabel} tag="span" />
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ConsultingFooter; import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import logoDefault from '../../../assets/logo.png';
import EditableImage from '../../../components/Editor/EditableImage';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { useTemplateEditor } from '../../../contexts/TemplateEditorContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

interface ConsultingHeaderProps {
    className?: string;
}

const ConsultingHeader: React.FC<ConsultingHeaderProps> = ({ className = '' }) => {
    const { template } = useTemplate();
    const { config } = useTemplateEditor();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };
    const typography = template?.typography || defaultTypography;

    const navLinkClamp = `clamp(0.75rem, 3vw, ${typography.navTextSize})`;
    const buttonClamp = `clamp(0.75rem, 3vw, ${typography.buttonTextSize})`;

    const navItems = [
        { id: 'nav_home', label: 'Inicio', defaultText: 'Inicio', defaultUrl: '#home' },
        { id: 'nav_services', label: 'Servicios', defaultText: 'Servicios', defaultUrl: '#services' },
        { id: 'nav_methodology', label: 'Metodología', defaultText: 'Metodología', defaultUrl: '#methodology' },
        { id: 'nav_testimonials', label: 'Casos de éxito', defaultText: 'Casos de éxito', defaultUrl: '#testimonials' },
        { id: 'nav_contact', label: 'Contacto', defaultText: 'Contacto', defaultUrl: '#contact' },
    ];

    const getNavUrl = (item: typeof navItems[0]) => template?.texts?.[`${item.id}_url`] || item.defaultUrl;
    const ctaUrl = template?.texts?.header_cta_url || '#contact';

    // Control de visibilidad
    const shouldShowNavLink = (itemId: string) => {
        const value = template?.texts?.[`show_${itemId}`];
        return value !== 'false'; // si no existe o es 'true', se muestra
    };
    const shouldShowCta = () => {
        const value = template?.texts?.show_header_cta;
        return value !== 'false';
    };

    const handleNavClick = (e: React.MouseEvent, href: string) => {
        if (config.isEditing) {
            e.preventDefault();
            return;
        }
        window.location.href = href;
    };

    const handleLogoClick = (e: React.MouseEvent) => {
        if (config.isEditing) {
            e.preventDefault();
            const logoElement = document.getElementById('header_logo');
            if (logoElement) logoElement.click();
        }
    };

    return (
        <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${className}`} style={{ backgroundColor: s.headerBackground, borderColor: `${s.headerLinkColor}40` }}>
            <div className="container-custom px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo siempre visible (no se oculta) */}
                    <a onClick={handleLogoClick} className="flex items-center space-x-3 group">
                        <div id="header_logo" data-element-id="header_logo" className="relative">
                            <EditableImage elementId="header_logo" defaultImage={logoDefault} alt="Kernelize Consulting" className="w-12 h-12 rounded-lg object-cover" category="consulting" containerClassName="" modalRelative={true} />
                        </div>
                        <div className={`${s.logoTextSize} font-bold`}>
                            <span style={{ color: s.logoTextColor1 }}><EditableText elementId="header_brand_1" defaultText="KE" tag="span" /></span>
                            <span style={{ color: s.logoTextColor2 }}><EditableText elementId="header_brand_2" defaultText="Consulting" tag="span" /></span>
                        </div>
                    </a>

                    {/* Navegación desktop */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => {
                            if (!shouldShowNavLink(item.id)) return null;
                            return (
                                <a key={item.id} id={item.id} data-element-id={item.id} href={getNavUrl(item)} onClick={(e) => handleNavClick(e, getNavUrl(item))}
                                    className="font-medium transition-colors" style={{ color: s.headerLinkColor, fontSize: navLinkClamp }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = s.headerLinkHoverColor}
                                    onMouseLeave={(e) => e.currentTarget.style.color = s.headerLinkColor}>
                                    <EditableText elementId={item.id} defaultText={item.defaultText} tag="span" />
                                </a>
                            );
                        })}
                        {shouldShowCta() && (
                            <a href={ctaUrl} id="header_cta" data-element-id="header_cta" onClick={(e) => handleNavClick(e, ctaUrl)}
                                className="px-5 py-2.5 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                                style={{ backgroundColor: s.headerCtaBackground, color: s.headerCtaText, fontSize: buttonClamp }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = s.headerCtaHoverBackground}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = s.headerCtaBackground}>
                                <EditableText elementId="header_cta" defaultText="Consultoría gratuita" tag="span" />
                            </a>
                        )}
                    </nav>

                    {/* Botón de menú móvil */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 transition-colors" style={{ color: s.headerTextColor }}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú móvil */}
            {isMenuOpen && (
                <div className="md:hidden border-t" style={{ backgroundColor: s.headerBackground, borderColor: `${s.headerLinkColor}40` }}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.map((item) => {
                            if (!shouldShowNavLink(item.id)) return null;
                            return (
                                <a key={item.id} id={item.id} data-element-id={item.id} href={getNavUrl(item)} onClick={(e) => { handleNavClick(e, getNavUrl(item)); setIsMenuOpen(false); }}
                                    className="block px-3 py-2 transition-colors" style={{ color: s.headerLinkColor, fontSize: navLinkClamp }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = s.headerLinkHoverColor}
                                    onMouseLeave={(e) => e.currentTarget.style.color = s.headerLinkColor}>
                                    <EditableText elementId={item.id} defaultText={item.defaultText} tag="span" />
                                </a>
                            );
                        })}
                        {shouldShowCta() && (
                            <div className="px-3 py-2">
                                <a href={ctaUrl} id="header_cta" data-element-id="header_cta" onClick={(e) => { handleNavClick(e, ctaUrl); setIsMenuOpen(false); }}
                                    className="block w-full text-center px-4 py-2 text-white font-semibold rounded-lg"
                                    style={{ backgroundColor: s.headerCtaBackground, color: s.headerCtaText, fontSize: buttonClamp }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = s.headerCtaHoverBackground}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = s.headerCtaBackground}>
                                    <EditableText elementId="header_cta" defaultText="Consultoría gratuita" tag="span" />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default ConsultingHeader; import { ArrowRight, Award, BarChart, Briefcase, Globe, LineChart, Target, TrendingUp, Users, type LucideIcon } from 'lucide-react';
import EditableImage from '../../../components/Editor/EditableImage';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography, defaultUI } from '../../../types/template.types';

const iconMap: Record<string, LucideIcon> = {
    TrendingUp, Users, Target, Award, Briefcase, BarChart, LineChart, Globe,
};

const ConsultingHero = () => {
    const { template } = useTemplate();
    const s = template?.sectionColors || defaultSectionColors;
    const typography = { ...defaultTypography, ...(template?.typography || {}) };
    const ui = { ...defaultUI, ...(template?.ui || {}) };

    const heroTitleClamp = `clamp(2rem, 5vw, ${typography.heroTitleSize})`;
    const heroDescClamp = `clamp(0.875rem, 3vw, ${typography.heroDescriptionSize})`;

    const statValueSize = template?.texts?.statValueSize || '1.25rem';
    const statLabelSize = template?.texts?.statLabelSize || '0.875rem';

    const defaultButtons = {
        primary: { text: 'Solicitar consultoría', url: '/contacto', openInNewTab: false },
        secondary: { text: 'Conocer metodología', url: '#metodologia', openInNewTab: false },
    };
    const buttons = {
        primary: template?.buttons?.primary || defaultButtons.primary,
        secondary: template?.buttons?.secondary || defaultButtons.secondary,
    };

    let heroStats: any[] = [];
    const storedStats = template?.texts?.['hero_stat_item_'];
    if (storedStats) {
        try {
            heroStats = JSON.parse(storedStats);
        } catch (e) { heroStats = []; }
    }
    if (heroStats.length === 0) {
        heroStats = [
            { id: 'default_1', icon: 'TrendingUp', value: '+45%', label: 'crecimiento', visible: true },
            { id: 'default_2', icon: 'Users', value: '+15', label: 'equipos', visible: true },
            { id: 'default_3', icon: 'Target', value: '100%', label: 'objetivos', visible: true },
            { id: 'default_4', icon: 'TrendingUp', value: '80%', label: 'parcial', visible: true },
        ];
    }

    // Devuelve el elemento JSX ya construido, con su className y style
    const getIcon = (iconName: string, className: string, color?: string) => {
        const Icon = iconMap[iconName];
        if (!Icon) return <TrendingUp className={className} style={{ color, fill: color }} />;
        return <Icon className={className} style={{ color, fill: color }} />;
    };

    return (
        <section id="home" className="relative section-padding overflow-hidden" style={{ backgroundColor: s.heroBackground }}>
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ backgroundColor: s.buttonPrimaryBackground }} />
                <div className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" style={{ backgroundColor: s.buttonPrimaryBackground }} />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">
                        <div>
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border" style={{ backgroundColor: s.heroBadgeBackground, borderColor: s.heroBadgeBackground, color: s.heroBadgeTextColor }}>
                                <Target className="w-4 h-4 mr-2" />
                                <EditableText elementId="hero_badge" defaultText="Consultoría Estratégica de Negocios" tag="span" />
                            </span>
                        </div>
                        <h1 className="font-bold leading-tight" style={{ fontSize: heroTitleClamp, color: s.heroTitleColor }}>
                            <EditableText elementId="hero_title_1" defaultText="Impulsamos el" tag="span" />{' '}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${s.heroTitleColor}, ${s.heroTitleColor})` }}>
                                <EditableText elementId="hero_title_2" defaultText="Crecimiento Sostenible" tag="span" />
                            </span>{' '}
                            <EditableText elementId="hero_title_3" defaultText="de tu Empresa" tag="span" />
                        </h1>
                        <p className="max-w-2xl" style={{ fontSize: heroDescClamp, color: s.heroDescriptionColor }}>
                            <EditableText elementId="hero_description" defaultText="Análisis profundo, estrategias personalizadas y acompañamiento continuo para llevar tu negocio al siguiente nivel." tag="span" />
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            {template?.texts?.show_hero_primary_button !== 'false' && (
                                <a href={buttons.primary.url} target={buttons.primary.openInNewTab ? '_blank' : '_self'} rel="noopener noreferrer"
                                    className="group font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                    style={{ backgroundColor: s.buttonPrimaryBackground, color: s.buttonPrimaryText, borderRadius: ui?.borderRadius?.medium || defaultUI.borderRadius.medium }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = s.buttonPrimaryHoverBackground}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = s.buttonPrimaryBackground}>
                                    <EditableText elementId="cta_primary" defaultText={buttons.primary.text} tag="span" />
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            )}
                            {template?.texts?.show_hero_secondary_button !== 'false' && (
                                <a href={buttons.secondary.url} target={buttons.secondary.openInNewTab ? '_blank' : '_self'} rel="noopener noreferrer"
                                    className="group font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center border-2"
                                    style={{ backgroundColor: s.buttonSecondaryBackground, color: s.buttonSecondaryText, borderColor: s.buttonPrimaryBackground }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = s.buttonSecondaryHoverBackground}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = s.buttonSecondaryBackground}>
                                    <EditableText elementId="cta_secondary" defaultText={buttons.secondary.text} tag="span" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="relative z-10 rounded-2xl border shadow-2xl overflow-hidden">
                            <EditableImage elementId="hero_image" defaultImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800" alt="Consultoría estratégica" className="w-full h-auto" category="consulting" />
                        </div>

                        <div className="grid grid-cols-4 gap-4 p-4 rounded-xl shadow-xl backdrop-blur-sm" style={{ backgroundColor: `${s.heroBackground}cc`, border: `1px solid ${s.buttonPrimaryBackground}40` }}>
                            {heroStats.map((stat, idx) => {
                                if (stat.visible === false) return null;
                                const valueKey = `hero_stat_value_${idx}`;
                                const labelKey = `hero_stat_label_${idx}`;
                                return (
                                    <div key={stat.id || idx} className="text-center">
                                        <div className="flex justify-center mb-2">
                                            {getIcon(stat.icon, s.iconSize, s.iconColor)}
                                        </div>
                                        <div className="font-bold" style={{ color: s.statValueColor, fontSize: statValueSize }}>
                                            <EditableText elementId={valueKey} defaultText={stat.value} tag="span" />
                                        </div>
                                        <div style={{ color: s.statLabelColor, fontSize: statLabelSize }}>
                                            <EditableText elementId={labelKey} defaultText={stat.label} tag="span" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultingHero; // src/templates/landing/Consulting/ConsultingLanding.tsx
import { useLayoutEffect, useRef } from 'react';
import EditorDashboard from '../../../components/Editor/EditorDashboard';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultTypography } from '../../../types/template.types';
import ConsultingAbout from './ConsultingAbout';
import ConsultingContact from './ConsultingContact';
import ConsultingFeatures from './ConsultingFeatures';
import ConsultingFooter from './ConsultingFooter';
import ConsultingHeader from './ConsultingHeader';
import ConsultingHero from './ConsultingHero';
import ConsultingTestimonials from './ConsultingTestimonials';

interface ConsultingLandingProps {
    onHomeClick?: () => void;
    isPreview?: boolean;
}

const ConsultingLanding: React.FC<ConsultingLandingProps> = ({ onHomeClick, isPreview = false }) => {
    const { template } = useTemplate();
    const typography = template?.typography || defaultTypography;
    const rootRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (rootRef.current) {
            rootRef.current.style.setProperty('--font-heading', typography.headingFont);
            rootRef.current.style.setProperty('--font-body', typography.bodyFont);
        }
    }, [typography]);

    return (
        <div className="min-h-screen flex">
            {/* Solo mostrar el dashboard si NO es preview */}
            {!isPreview && <EditorDashboard onHomeClick={onHomeClick} />}
            <div
                ref={rootRef}
                id="template-root"
                className="flex-1 flex flex-col"
                style={{
                    fontFamily: typography.bodyFont
                }}
            >
                <ConsultingHeader />
                <main className="flex-grow">
                    <ConsultingHero />
                    <ConsultingFeatures />
                    <ConsultingAbout />
                    <ConsultingTestimonials />
                    <ConsultingContact />
                </main>
                <ConsultingFooter />
            </div>
        </div>
    );
};

export default ConsultingLanding; import { Award, BarChart, Briefcase, CheckCircle, Clock, Eye, Globe, Heart, LineChart, MessageCircle, Phone, Quote, Star, Target, ThumbsUp, TrendingUp, Users, Zap } from 'lucide-react';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

const iconMap: Record<string, any> = {
    TrendingUp, Users, Target, Award, Briefcase, BarChart, LineChart, Globe,
    CheckCircle, Clock, Heart, ThumbsUp, Zap, Eye, MessageCircle, Phone
};

const ConsultingTestimonials = () => {
    const { template } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };
    const typography = template?.typography || defaultTypography;

    const testimonialsTitleClamp = `clamp(1.5rem, 5vw, ${typography.testimonialsTitleSize})`;
    const testimonialsTextClamp = `clamp(0.875rem, 3vw, ${typography.testimonialsTextSize})`;
    const testimonialsNameClamp = `clamp(1rem, 4vw, ${typography.testimonialsNameSize})`;
    const testimonialsRoleClamp = `clamp(0.75rem, 2.5vw, ${typography.testimonialsRoleSize})`;

    // Definir hasta 8 testimonios (índices 0..7)
    const testimonialIds = ['carlos', 'laura', 'roberto', 'extra_1', 'extra_2', 'extra_3', 'extra_4', 'extra_5'];
    const getTestimonial = (id: string, idx: number) => {
        const defaults: Record<string, any> = {
            carlos: { name: 'Carlos Méndez', role: 'CEO - TechCorp LATAM', content: 'El equipo de Kernelize reestructuró nuestra estrategia comercial por completo. En 6 meses, aumentamos nuestras ventas un 60% y optimizamos nuestros procesos internos. Su enfoque analítico y profesionalismo son inigualables.', image: 'CM' },
            laura: { name: 'Laura Fernández', role: 'Directora de Operaciones - Grupo Logístico', content: 'Necesitábamos expandirnos a nuevos mercados y ellos nos guiaron paso a paso. Desde el estudio de mercado hasta la implementación local. Una consultora que realmente se involucra en el éxito de sus clientes.', image: 'LF' },
            roberto: { name: 'Roberto Sánchez', role: 'Fundador - Inversiones RS', content: 'Contratamos su servicio de planificación financiera y los resultados fueron inmediatos. No solo mejoraron nuestra rentabilidad, sino que nos dieron la claridad y el control que necesitábamos para escalar.', image: 'RS' },
        };
        if (defaults[id]) return defaults[id];
        return {
            name: template?.texts?.[`testimonial_name_${id}`] || `Testimonio ${idx + 1}`,
            role: template?.texts?.[`testimonial_role_${id}`] || `Rol ${idx + 1}`,
            content: template?.texts?.[`testimonial_content_${id}`] || `Contenido del testimonio ${idx + 1}.`,
            image: template?.texts?.[`testimonial_image_${id}`] || `T${idx + 1}`,
        };
    };

    // Definir hasta 8 indicadores de confianza
    const indicatorIds = ['projects', 'industries', 'satisfaction', 'support', 'extra_1', 'extra_2', 'extra_3', 'extra_4'];
    const getIndicator = (id: string) => {
        const defaults: Record<string, any> = {
            projects: { icon: 'Briefcase', value: '100+', label: 'Proyectos anuales' },
            industries: { icon: 'BarChart', value: '15', label: 'Industrias diferentes' },
            satisfaction: { icon: 'Heart', value: '98%', label: 'Tasa de satisfacción' },
            support: { icon: 'Clock', value: '24/7', label: 'Soporte a clientes' },
        };
        if (defaults[id]) return defaults[id];
        return {
            icon: template?.texts?.[`indicator_icon_${id}`] || 'Briefcase',
            value: template?.texts?.[`indicator_value_${id}`] || '0',
            label: template?.texts?.[`indicator_label_${id}`] || `Indicador ${id}`,
        };
    };

    const getIcon = (iconName: string, className: string = "w-6 h-6") => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className={className} /> : <Briefcase className={className} />;
    };

    // Visibilidad
    const shouldShowTestimonial = (id: string) => {
        const showKey = `show_testimonial_${id}`;
        const defaultValue = ['carlos', 'laura', 'roberto'].includes(id); // los 3 primeros visibles por defecto
        const stored = template?.texts?.[showKey];
        return stored === undefined ? defaultValue : stored !== 'false';
    };

    const shouldShowIndicator = (id: string) => {
        const showKey = `show_indicator_${id}`;
        const defaultValue = ['projects', 'industries', 'satisfaction', 'support'].includes(id); // 4 primeros visibles
        const stored = template?.texts?.[showKey];
        return stored === undefined ? defaultValue : stored !== 'false';
    };

    return (
        <section id="testimonials" className="section-padding" style={{ backgroundColor: s.testimonialsBackground }}>
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ backgroundColor: s.buttonPrimaryBackground, color: s.buttonPrimaryText }}>
                        <Quote className="w-8 h-8" />
                    </div>
                    <h2 className="font-bold mb-6" style={{ color: s.testimonialsTitleColor, fontSize: testimonialsTitleClamp }}>
                        <EditableText elementId="testimonials_title_1" defaultText="Lo que dicen nuestros" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${s.testimonialsTitleColor}, ${s.testimonialsTitleColor})` }}>
                            <EditableText elementId="testimonials_title_2" defaultText="clientes" tag="span" />
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto" style={{ color: s.testimonialsTextColor, fontSize: testimonialsTextClamp }}>
                        <EditableText elementId="testimonials_description" defaultText="Historias reales de transformación empresarial." tag="span" />
                    </p>
                </div>

                {/* Grid de testimonios (responsive: 1 columna en móvil, 2 en tablet, 3 en desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonialIds.map((id, idx) => {
                        if (!shouldShowTestimonial(id)) return null;
                        const t = getTestimonial(id, idx);
                        const name = template?.texts?.[`testimonial_name_${id}`] || t.name;
                        const role = template?.texts?.[`testimonial_role_${id}`] || t.role;
                        const content = template?.texts?.[`testimonial_content_${id}`] || t.content;
                        const imageLetter = template?.texts?.[`testimonial_image_${id}`] || t.image;
                        return (
                            <div key={id} className="rounded-2xl p-8 h-full transition-colors flex flex-col" style={{ backgroundColor: s.testimonialsCardBackground, border: `1px solid ${s.testimonialsCardBorder}` }}>
                                <div className="flex mb-6">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                                </div>
                                <p className="text-lg italic mb-8 flex-grow" style={{ color: s.testimonialsTextColor, fontSize: testimonialsTextClamp }}>
                                    "<EditableText elementId={`testimonial_content_${id}`} defaultText={content} tag="span" />"
                                </p>
                                <div className="flex items-center pt-6 border-t" style={{ borderColor: s.testimonialsCardBorder }}>
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: s.buttonPrimaryBackground, color: s.buttonPrimaryText }}>
                                        {imageLetter}
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold" style={{ color: s.testimonialsNameColor, fontSize: testimonialsNameClamp }}>
                                            <EditableText elementId={`testimonial_name_${id}`} defaultText={name} tag="span" />
                                        </h4>
                                        <p className="text-sm" style={{ color: s.testimonialsRoleColor, fontSize: testimonialsRoleClamp }}>
                                            <EditableText elementId={`testimonial_role_${id}`} defaultText={role} tag="span" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Indicadores de confianza */}
                <div className="mt-16 pt-16 border-t" style={{ borderColor: s.testimonialsCardBorder }}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {indicatorIds.map((id) => {
                            if (!shouldShowIndicator(id)) return null;
                            const ind = getIndicator(id);
                            const iconName = template?.texts?.[`indicator_icon_${id}`] || ind.icon;
                            const value = template?.texts?.[`indicator_value_${id}`] || ind.value;
                            const label = template?.texts?.[`indicator_label_${id}`] || ind.label;
                            return (
                                <div key={id} className="text-center">
                                    <div className="inline-flex items-center justify-center mb-2" style={{ color: s.testimonialsTitleColor }}>
                                        {getIcon(iconName, "w-10 h-10")}
                                    </div>
                                    <div className="text-3xl font-bold text-transparent bg-clip-text mb-2" style={{ backgroundImage: `linear-gradient(to right, ${s.testimonialsTitleColor}, ${s.testimonialsTitleColor})` }}>
                                        <EditableText elementId={`indicator_value_${id}`} defaultText={value} tag="span" />
                                    </div>
                                    <div className="text-sm" style={{ color: s.testimonialsTextColor, fontSize: testimonialsTextClamp }}>
                                        <EditableText elementId={`indicator_label_${id}`} defaultText={label} tag="span" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultingTestimonials; export interface TemplateColors {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
}

export interface EditableTexts {
    [key: string]: string;
}

export interface EditorConfig {
    isEditing: boolean;
    selectedElement: string | null;
    showEditor: boolean;
    notifications: {
        show: boolean;
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    } | null;
}

export interface SectionColors {
    heroBackground: string;
    heroTitleColor: string;
    heroDescriptionColor: string;
    heroBadgeBackground: string;
    heroBadgeTextColor: string;
    buttonPrimaryBackground: string;
    buttonPrimaryText: string;
    buttonPrimaryHoverBackground: string;
    buttonSecondaryBackground: string;
    buttonSecondaryText: string;
    buttonSecondaryHoverBackground: string;
    headerBackground: string;
    headerTextColor: string;
    headerLinkColor: string;
    headerLinkHoverColor: string;
    // featuresBackground: string;
    // featuresTitleColor: string;
    // featuresCardBackground: string;
    // featuresCardBorder: string;
    footerBackground: string;
    footerTextColor: string;
    footerLinkColor: string;
    footerHeadingColor: string;
    footerLinkHoverColor: string;
    socialIconColor: string;
    socialIconHoverColor: string;
    globalLinkColor: string;
    globalLinkHoverColor: string;
    cardHoverScale: string;
    cardHoverShadow: string;
    iconColor: string;
    iconSize: string;
    bodyBackground: string;
    bodyTextColor: string;

    statValueColor: string;
    statLabelColor: string;

    headerCtaBackground: string;
    headerCtaText: string;
    headerCtaHoverBackground: string;

    logoTextColor1: string;  // color para "KE"
    logoTextColor2: string;  // color para "Consulting"
    logoTextSize: string;

    // Features (Características)
    featuresBackground: string;
    featuresTitleColor: string;
    featuresCardBackground: string;
    featuresCardBorder: string;
    featuresIconColor: string;

    // About (Sobre Nosotros)
    aboutBackground: string;
    aboutTitleColor: string;
    aboutTextColor: string;
    aboutBadgeBackground: string;
    aboutBadgeTextColor: string;
    aboutImageBorderRadius: string;

    // Testimonios
    testimonialsBackground: string;
    testimonialsTitleColor: string;
    testimonialsTextColor: string;
    testimonialsCardBackground: string;
    testimonialsCardBorder: string;
    testimonialsNameColor: string;
    testimonialsRoleColor: string;

    // Contacto
    contactBackground: string;
    contactTitleColor: string;
    contactTextColor: string;
    contactFormBackground: string;
    contactFormBorder: string;
    contactInputBackground: string;
    contactInputBorder: string;
    contactInputTextColor: string;
    contactButtonBackground: string;
    contactButtonText: string;
    contactButtonHoverBackground: string;
}

export interface TypographyConfig {
    // Fuentes globales
    headingFont: string;
    bodyFont: string;
    headingWeight: string;
    bodyWeight: string;

    // Hero
    heroTitleSize: string;
    heroDescriptionSize: string;

    // Características / Servicios
    featuresTitleSize: string;
    featuresCardTitleSize: string;
    featuresDescriptionSize: string;

    // Sobre Nosotros
    aboutTitleSize: string;
    aboutTextSize: string;
    aboutStatsValueSize: string;
    aboutStatsLabelSize: string;
    aboutDifferentiatorSize: string;

    // Testimonios
    testimonialsTitleSize: string;
    testimonialsNameSize: string;
    testimonialsRoleSize: string;
    testimonialsTextSize: string;

    // Contacto
    contactTitleSize: string;
    contactTextSize: string;
    contactLabelSize: string;
    contactButtonSize: string;
    contactCardTitleSize: string;  // 👈 NUEVO

    // Footer
    footerHeadingSize: string;
    footerTextSize: string;
    footerLinkSize: string;

    // 👇 NUEVOS (para header y navegación)
    navTextSize?: string;      // Tamaño de los enlaces del menú
    buttonTextSize?: string;   // Tamaño del texto de los botones (CTA, etc.)
}

export interface UIConfig {
    borderRadius: {
        small: string;
        medium: string;
        large: string;
        full: string;
    };
    boxShadow: {
        small: string;
        medium: string;
        large: string;
        none: string;
    };
    spacing: {
        sectionPadding: string;
        elementGap: string;
    };
    ui?: {
        borderRadius: { medium: string, large: string },
        boxShadow: { medium: string },
    }
}

export interface ButtonConfig {
    primary: {
        text: string;
        url: string;
        openInNewTab: boolean;
    };
    secondary: {
        text: string;
        url: string;
        openInNewTab: boolean;
    };
    ctaButtons?: Record<string, {
        text: string;
        url: string;
        openInNewTab: boolean;
    }>;
}

export interface Template {
    id: string;
    name: string;
    type: string;
    colors: TemplateColors;
    sectionColors: SectionColors;
    typography: TypographyConfig;
    ui: UIConfig;
    buttons: ButtonConfig;
    texts: Record<string, string>;
    images?: Record<string, string>;
    createdAt: Date;
    updatedAt: Date;
    userId?: string;
    version?: number;
}

export interface StoredTemplate extends Omit<Template, 'createdAt' | 'updatedAt'> {
    createdAt: string;
    updatedAt: string;
    lastSaved?: string;
}

// Nuevos presets completos (10)
export interface FullPreset {
    name: string;
    colors: TemplateColors;
    sectionColors: Partial<SectionColors>;
    typography: Partial<TypographyConfig>;
    ui?: Partial<UIConfig>;
}

export const fullPresets: FullPreset[] = [
    // ========== 1. Minimalista Claro ==========
    {
        name: "Minimalista Claro",
        colors: {
            primary: "#3b82f6",
            secondary: "#6b7280",
            accent: "#1e293b",
            background: "#ffffff",
            text: "#0f172a"
        },
        sectionColors: {
            heroBackground: "#f8fafc",
            heroTitleColor: "#0f172a",
            heroDescriptionColor: "#475569",
            heroBadgeBackground: "#3b82f6",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#3b82f6",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#2563eb",
            buttonSecondaryBackground: "#ffffff",
            buttonSecondaryText: "#1e293b",
            buttonSecondaryHoverBackground: "#f1f5f9",
            headerBackground: "#ffffff",
            headerTextColor: "#0f172a",
            headerLinkColor: "#475569",
            headerLinkHoverColor: "#3b82f6",
            featuresBackground: "#ffffff",
            featuresTitleColor: "#0f172a",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#e2e8f0",
            footerBackground: "#0f172a",
            footerTextColor: "#94a3b8",
            footerLinkColor: "#cbd5e1",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#f8fafc",
            aboutTitleColor: "#0f172a",
            aboutTextColor: "#334155",
            testimonialsBackground: "#0f172a",
            testimonialsTitleColor: "#ffffff",
            testimonialsTextColor: "#cbd5e1",
            testimonialsCardBackground: "#1e293b",
            testimonialsCardBorder: "#334155",
            contactBackground: "#ffffff",
            contactTitleColor: "#0f172a",
            contactTextColor: "#475569",
            contactFormBackground: "#f8fafc",
            contactFormBorder: "#e2e8f0",
            contactButtonBackground: "#3b82f6",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#2563eb",
        },
        typography: {
            headingFont: "Inter, system-ui, sans-serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "700",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // ========== 2. Élite Oscuro ==========
    {
        name: "Élite Oscuro",
        colors: {
            primary: "#d97706",
            secondary: "#92400e",
            accent: "#451a03",
            background: "#0a0a0a",
            text: "#f5f5f5"
        },
        sectionColors: {
            heroBackground: "#111111",
            heroTitleColor: "#fef3c7",
            heroDescriptionColor: "#d1d5db",
            heroBadgeBackground: "#d97706",
            heroBadgeTextColor: "#000000",
            buttonPrimaryBackground: "#d97706",
            buttonPrimaryText: "#000000",
            buttonPrimaryHoverBackground: "#b45309",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#d97706",
            buttonSecondaryHoverBackground: "rgba(217,119,6,0.1)",
            headerBackground: "#111111",
            headerTextColor: "#fef3c7",
            headerLinkColor: "#d1d5db",
            headerLinkHoverColor: "#d97706",
            featuresBackground: "#0a0a0a",
            featuresTitleColor: "#fef3c7",
            featuresCardBackground: "#1a1a1a",
            featuresCardBorder: "#333333",
            footerBackground: "#0a0a0a",
            footerTextColor: "#9ca3af",
            footerLinkColor: "#d1d5db",
            footerHeadingColor: "#fef3c7",
            aboutBackground: "#0a0a0a",
            aboutTitleColor: "#fef3c7",
            aboutTextColor: "#d1d5db",
            testimonialsBackground: "#0a0a0a",
            testimonialsTitleColor: "#fef3c7",
            testimonialsTextColor: "#d1d5db",
            testimonialsCardBackground: "#1a1a1a",
            testimonialsCardBorder: "#333333",
            contactBackground: "#0a0a0a",
            contactTitleColor: "#fef3c7",
            contactTextColor: "#d1d5db",
            contactFormBackground: "#1a1a1a",
            contactFormBorder: "#333333",
            contactButtonBackground: "#d97706",
            contactButtonText: "#000000",
            contactButtonHoverBackground: "#b45309",
        },
        typography: {
            headingFont: "Montserrat, system-ui, sans-serif",
            bodyFont: "Open Sans, system-ui, sans-serif",
            headingWeight: "700",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // ========== 3. Futurista Neon ==========
    {
        name: "Futurista Neon",
        colors: {
            primary: "#8b5cf6",
            secondary: "#06b6d4",
            accent: "#3b0764",
            background: "#030712",
            text: "#e2e8f0"
        },
        sectionColors: {
            heroBackground: "#0f172a",
            heroTitleColor: "#ffffff",
            heroDescriptionColor: "#94a3b8",
            heroBadgeBackground: "#8b5cf6",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#8b5cf6",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#7c3aed",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#8b5cf6",
            buttonSecondaryHoverBackground: "rgba(139,92,246,0.1)",
            headerBackground: "#0f172a",
            headerTextColor: "#ffffff",
            headerLinkColor: "#cbd5e1",
            headerLinkHoverColor: "#8b5cf6",
            featuresBackground: "#0f172a",
            featuresTitleColor: "#ffffff",
            featuresCardBackground: "#1e293b",
            featuresCardBorder: "#334155",
            footerBackground: "#0f172a",
            footerTextColor: "#94a3b8",
            footerLinkColor: "#cbd5e1",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#0f172a",
            aboutTitleColor: "#ffffff",
            aboutTextColor: "#cbd5e1",
            testimonialsBackground: "#0f172a",
            testimonialsTitleColor: "#ffffff",
            testimonialsTextColor: "#cbd5e1",
            testimonialsCardBackground: "#1e293b",
            testimonialsCardBorder: "#334155",
            contactBackground: "#0f172a",
            contactTitleColor: "#ffffff",
            contactTextColor: "#cbd5e1",
            contactFormBackground: "#1e293b",
            contactFormBorder: "#334155",
            contactButtonBackground: "#8b5cf6",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#7c3aed",
        },
        typography: {
            headingFont: "Poppins, system-ui, sans-serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // ========== 4. Bosque Natural ==========
    {
        name: "Bosque Natural",
        colors: {
            primary: "#10b981",
            secondary: "#047857",
            accent: "#064e3b",
            background: "#f0fdf4",
            text: "#022c22"
        },
        sectionColors: {
            heroBackground: "#ecfdf5",
            heroTitleColor: "#064e3b",
            heroDescriptionColor: "#047857",
            heroBadgeBackground: "#10b981",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#10b981",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#059669",
            buttonSecondaryBackground: "#ffffff",
            buttonSecondaryText: "#10b981",
            buttonSecondaryHoverBackground: "#d1fae5",
            headerBackground: "#ffffff",
            headerTextColor: "#064e3b",
            headerLinkColor: "#047857",
            headerLinkHoverColor: "#10b981",
            featuresBackground: "#f0fdf4",
            featuresTitleColor: "#064e3b",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#d1fae5",
            footerBackground: "#064e3b",
            footerTextColor: "#a7f3d0",
            footerLinkColor: "#d1fae5",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#ecfdf5",
            aboutTitleColor: "#064e3b",
            aboutTextColor: "#047857",
            testimonialsBackground: "#064e3b",
            testimonialsTitleColor: "#ffffff",
            testimonialsTextColor: "#d1fae5",
            testimonialsCardBackground: "#047857",
            testimonialsCardBorder: "#10b981",
            contactBackground: "#ffffff",
            contactTitleColor: "#064e3b",
            contactTextColor: "#047857",
            contactFormBackground: "#f0fdf4",
            contactFormBorder: "#d1fae5",
            contactButtonBackground: "#10b981",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#059669",
        },
        typography: {
            headingFont: "Poppins, system-ui, sans-serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.9rem",
            buttonTextSize: "0.875rem",
        },
    },
    // ========== 5. Lujo Dorado ==========
    {
        name: "Lujo Dorado",
        colors: {
            primary: "#d4af37",
            secondary: "#1a1a2e",
            accent: "#16213e",
            background: "#f9f9f9",
            text: "#1a1a2e"
        },
        sectionColors: {
            heroBackground: "#1a1a2e",
            heroTitleColor: "#d4af37",
            heroDescriptionColor: "#e2e8f0",
            heroBadgeBackground: "#d4af37",
            heroBadgeTextColor: "#1a1a2e",
            buttonPrimaryBackground: "#d4af37",
            buttonPrimaryText: "#1a1a2e",
            buttonPrimaryHoverBackground: "#c0a020",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#d4af37",
            buttonSecondaryHoverBackground: "rgba(212,175,55,0.1)",
            headerBackground: "#1a1a2e",
            headerTextColor: "#ffffff",
            headerLinkColor: "#e2e8f0",
            headerLinkHoverColor: "#d4af37",
            featuresBackground: "#f9f9f9",
            featuresTitleColor: "#1a1a2e",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#e2e8f0",
            footerBackground: "#1a1a2e",
            footerTextColor: "#94a3b8",
            footerLinkColor: "#cbd5e1",
            footerHeadingColor: "#d4af37",
            aboutBackground: "#f1f5f9",
            aboutTitleColor: "#1a1a2e",
            aboutTextColor: "#334155",
            testimonialsBackground: "#1a1a2e",
            testimonialsTitleColor: "#d4af37",
            testimonialsTextColor: "#e2e8f0",
            testimonialsCardBackground: "#16213e",
            testimonialsCardBorder: "#d4af37",
            contactBackground: "#ffffff",
            contactTitleColor: "#1a1a2e",
            contactTextColor: "#334155",
            contactFormBackground: "#f8fafc",
            contactFormBorder: "#e2e8f0",
            contactButtonBackground: "#d4af37",
            contactButtonText: "#1a1a2e",
            contactButtonHoverBackground: "#c0a020",
        },
        typography: {
            headingFont: "Playfair Display, Georgia, serif",
            bodyFont: "Lato, system-ui, sans-serif",
            headingWeight: "700",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // ========== 6. Tecnología Azul ==========
    {
        name: "Tecnología Azul",
        colors: {
            primary: "#0077b6",
            secondary: "#00b4d8",
            accent: "#03045e",
            background: "#f8f9fa",
            text: "#212529"
        },
        sectionColors: {
            heroBackground: "#e0f2fe",
            heroTitleColor: "#03045e",
            heroDescriptionColor: "#0077b6",
            heroBadgeBackground: "#0077b6",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#0077b6",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#005f8c",
            buttonSecondaryBackground: "#ffffff",
            buttonSecondaryText: "#0077b6",
            buttonSecondaryHoverBackground: "#caf0f8",
            headerBackground: "#ffffff",
            headerTextColor: "#03045e",
            headerLinkColor: "#0077b6",
            headerLinkHoverColor: "#00b4d8",
            featuresBackground: "#f8f9fa",
            featuresTitleColor: "#03045e",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#dee2e6",
            footerBackground: "#03045e",
            footerTextColor: "#90e0ef",
            footerLinkColor: "#caf0f8",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#e0f2fe",
            aboutTitleColor: "#03045e",
            aboutTextColor: "#0077b6",
            testimonialsBackground: "#03045e",
            testimonialsTitleColor: "#ffffff",
            testimonialsTextColor: "#caf0f8",
            testimonialsCardBackground: "#0077b6",
            testimonialsCardBorder: "#00b4d8",
            contactBackground: "#ffffff",
            contactTitleColor: "#03045e",
            contactTextColor: "#0077b6",
            contactFormBackground: "#f8f9fa",
            contactFormBorder: "#dee2e6",
            contactButtonBackground: "#0077b6",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#005f8c",
        },
        typography: {
            headingFont: "Poppins, system-ui, sans-serif",
            bodyFont: "Roboto, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // ========== 7. Romance Rosa ==========
    {
        name: "Romance Rosa",
        colors: {
            primary: "#ec489a",
            secondary: "#be185d",
            accent: "#831843",
            background: "#fff5f5",
            text: "#4c0519"
        },
        sectionColors: {
            heroBackground: "#fce7f3",
            heroTitleColor: "#be185d",
            heroDescriptionColor: "#9d174d",
            heroBadgeBackground: "#ec489a",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#ec489a",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#db2777",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#ec489a",
            buttonSecondaryHoverBackground: "rgba(236,72,154,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#be185d",
            headerLinkColor: "#9d174d",
            headerLinkHoverColor: "#ec489a",
            featuresBackground: "#fff5f5",
            featuresTitleColor: "#be185d",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#fce7f3",
            footerBackground: "#831843",
            footerTextColor: "#fbcfe8",
            footerLinkColor: "#fce7f3",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#fce7f3",
            aboutTitleColor: "#be185d",
            aboutTextColor: "#9d174d",
            testimonialsBackground: "#831843",
            testimonialsTitleColor: "#ec489a",
            testimonialsTextColor: "#fce7f3",
            testimonialsCardBackground: "#be185d",
            testimonialsCardBorder: "#ec489a",
            contactBackground: "#ffffff",
            contactTitleColor: "#be185d",
            contactTextColor: "#9d174d",
            contactFormBackground: "#fce7f3",
            contactFormBorder: "#fbcfe8",
            contactButtonBackground: "#ec489a",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#db2777",
        },
        typography: {
            headingFont: "Playfair Display, Georgia, serif",
            bodyFont: "Lato, system-ui, sans-serif",
            headingWeight: "700",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // ========== 8. Energía Naranja ==========
    {
        name: "Energía Naranja",
        colors: {
            primary: "#f97316",
            secondary: "#ea580c",
            accent: "#7c2d12",
            background: "#fff7ed",
            text: "#431407"
        },
        sectionColors: {
            heroBackground: "#ffedd5",
            heroTitleColor: "#ea580c",
            heroDescriptionColor: "#c2410c",
            heroBadgeBackground: "#f97316",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#f97316",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#ea580c",
            buttonSecondaryBackground: "#ffffff",
            buttonSecondaryText: "#f97316",
            buttonSecondaryHoverBackground: "#ffedd5",
            headerBackground: "#ffffff",
            headerTextColor: "#ea580c",
            headerLinkColor: "#c2410c",
            headerLinkHoverColor: "#f97316",
            featuresBackground: "#fff7ed",
            featuresTitleColor: "#ea580c",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#ffedd5",
            footerBackground: "#7c2d12",
            footerTextColor: "#fed7aa",
            footerLinkColor: "#ffedd5",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#ffedd5",
            aboutTitleColor: "#ea580c",
            aboutTextColor: "#c2410c",
            testimonialsBackground: "#7c2d12",
            testimonialsTitleColor: "#f97316",
            testimonialsTextColor: "#ffedd5",
            testimonialsCardBackground: "#c2410c",
            testimonialsCardBorder: "#f97316",
            contactBackground: "#ffffff",
            contactTitleColor: "#ea580c",
            contactTextColor: "#c2410c",
            contactFormBackground: "#fff7ed",
            contactFormBorder: "#ffedd5",
            contactButtonBackground: "#f97316",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#ea580c",
        },
        typography: {
            headingFont: "Montserrat, system-ui, sans-serif",
            bodyFont: "Open Sans, system-ui, sans-serif",
            headingWeight: "700",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // ========== 9. Nieve Fresca ==========
    {
        name: "Nieve Fresca",
        colors: {
            primary: "#94a3b8",
            secondary: "#475569",
            accent: "#1e293b",
            background: "#f8fafc",
            text: "#0f172a"
        },
        sectionColors: {
            heroBackground: "#f1f5f9",
            heroTitleColor: "#0f172a",
            heroDescriptionColor: "#475569",
            heroBadgeBackground: "#94a3b8",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#94a3b8",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#64748b",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#94a3b8",
            buttonSecondaryHoverBackground: "rgba(148,163,184,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#0f172a",
            headerLinkColor: "#475569",
            headerLinkHoverColor: "#94a3b8",
            featuresBackground: "#f8fafc",
            featuresTitleColor: "#0f172a",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#e2e8f0",
            footerBackground: "#1e293b",
            footerTextColor: "#94a3b8",
            footerLinkColor: "#cbd5e1",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#f1f5f9",
            aboutTitleColor: "#0f172a",
            aboutTextColor: "#475569",
            testimonialsBackground: "#1e293b",
            testimonialsTitleColor: "#ffffff",
            testimonialsTextColor: "#cbd5e1",
            testimonialsCardBackground: "#334155",
            testimonialsCardBorder: "#475569",
            contactBackground: "#ffffff",
            contactTitleColor: "#0f172a",
            contactTextColor: "#475569",
            contactFormBackground: "#f8fafc",
            contactFormBorder: "#e2e8f0",
            contactButtonBackground: "#94a3b8",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#64748b",
        },
        typography: {
            headingFont: "Inter, system-ui, sans-serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // ========== 10. Tropical Vibrante ==========
    {
        name: "Tropical Vibrante",
        colors: {
            primary: "#eab308",
            secondary: "#16a34a",
            accent: "#65a30d",
            background: "#fefce8",
            text: "#3f6212"
        },
        sectionColors: {
            heroBackground: "#fef08a",
            heroTitleColor: "#3f6212",
            heroDescriptionColor: "#65a30d",
            heroBadgeBackground: "#eab308",
            heroBadgeTextColor: "#3f6212",
            buttonPrimaryBackground: "#eab308",
            buttonPrimaryText: "#3f6212",
            buttonPrimaryHoverBackground: "#ca8a04",
            buttonSecondaryBackground: "#ffffff",
            buttonSecondaryText: "#16a34a",
            buttonSecondaryHoverBackground: "#dcfce7",
            headerBackground: "#ffffff",
            headerTextColor: "#3f6212",
            headerLinkColor: "#65a30d",
            headerLinkHoverColor: "#eab308",
            featuresBackground: "#fefce8",
            featuresTitleColor: "#3f6212",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#fef08a",
            footerBackground: "#3f6212",
            footerTextColor: "#fef08a",
            footerLinkColor: "#ecfccb",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#fef08a",
            aboutTitleColor: "#3f6212",
            aboutTextColor: "#65a30d",
            testimonialsBackground: "#3f6212",
            testimonialsTitleColor: "#eab308",
            testimonialsTextColor: "#fef08a",
            testimonialsCardBackground: "#65a30d",
            testimonialsCardBorder: "#eab308",
            contactBackground: "#ffffff",
            contactTitleColor: "#3f6212",
            contactTextColor: "#65a30d",
            contactFormBackground: "#fefce8",
            contactFormBorder: "#fef08a",
            contactButtonBackground: "#eab308",
            contactButtonText: "#3f6212",
            contactButtonHoverBackground: "#ca8a04",
        },
        typography: {
            headingFont: "Poppins, system-ui, sans-serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.9rem",
            buttonTextSize: "0.875rem",
        },
    },

    // ========== NUEVOS 10 PRESETS (del 11 al 20) ==========
    // 11. Mar Profundo
    {
        name: "Mar Profundo",
        colors: {
            primary: "#0284c7",
            secondary: "#0369a1",
            accent: "#082f49",
            background: "#f0f9ff",
            text: "#082f49"
        },
        sectionColors: {
            heroBackground: "#e0f2fe",
            heroTitleColor: "#082f49",
            heroDescriptionColor: "#0284c7",
            heroBadgeBackground: "#0284c7",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#0284c7",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#0369a1",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#0284c7",
            buttonSecondaryHoverBackground: "rgba(2,132,199,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#082f49",
            headerLinkColor: "#0369a1",
            headerLinkHoverColor: "#0284c7",
            featuresBackground: "#f0f9ff",
            featuresTitleColor: "#082f49",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#bae6fd",
            footerBackground: "#082f49",
            footerTextColor: "#bae6fd",
            footerLinkColor: "#e0f2fe",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#e0f2fe",
            aboutTitleColor: "#082f49",
            aboutTextColor: "#0369a1",
            testimonialsBackground: "#082f49",
            testimonialsTitleColor: "#ffffff",
            testimonialsTextColor: "#bae6fd",
            testimonialsCardBackground: "#0369a1",
            testimonialsCardBorder: "#0284c7",
            contactBackground: "#ffffff",
            contactTitleColor: "#082f49",
            contactTextColor: "#0369a1",
            contactFormBackground: "#f0f9ff",
            contactFormBorder: "#bae6fd",
            contactButtonBackground: "#0284c7",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#0369a1",
        },
        typography: {
            headingFont: "Poppins, system-ui, sans-serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // 12. Terracota Cálido
    {
        name: "Terracota Cálido",
        colors: {
            primary: "#e07a5f",
            secondary: "#b95f4a",
            accent: "#6b3e2e",
            background: "#fdf4f0",
            text: "#3d2b1f"
        },
        sectionColors: {
            heroBackground: "#fcf0e8",
            heroTitleColor: "#6b3e2e",
            heroDescriptionColor: "#b95f4a",
            heroBadgeBackground: "#e07a5f",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#e07a5f",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#c7684f",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#e07a5f",
            buttonSecondaryHoverBackground: "rgba(224,122,95,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#6b3e2e",
            headerLinkColor: "#b95f4a",
            headerLinkHoverColor: "#e07a5f",
            featuresBackground: "#fdf4f0",
            featuresTitleColor: "#6b3e2e",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#f5e0d4",
            footerBackground: "#6b3e2e",
            footerTextColor: "#f5e0d4",
            footerLinkColor: "#fcf0e8",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#fcf0e8",
            aboutTitleColor: "#6b3e2e",
            aboutTextColor: "#b95f4a",
            testimonialsBackground: "#6b3e2e",
            testimonialsTitleColor: "#e07a5f",
            testimonialsTextColor: "#f5e0d4",
            testimonialsCardBackground: "#b95f4a",
            testimonialsCardBorder: "#e07a5f",
            contactBackground: "#ffffff",
            contactTitleColor: "#6b3e2e",
            contactTextColor: "#b95f4a",
            contactFormBackground: "#fdf4f0",
            contactFormBorder: "#f5e0d4",
            contactButtonBackground: "#e07a5f",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#c7684f",
        },
        typography: {
            headingFont: "Lora, serif",
            bodyFont: "Poppins, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // 13. Lavanda Sereno
    {
        name: "Lavanda Sereno",
        colors: {
            primary: "#8b5cf6",
            secondary: "#7c3aed",
            accent: "#4c1d95",
            background: "#faf5ff",
            text: "#2e1065"
        },
        sectionColors: {
            heroBackground: "#f3e8ff",
            heroTitleColor: "#4c1d95",
            heroDescriptionColor: "#7c3aed",
            heroBadgeBackground: "#8b5cf6",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#8b5cf6",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#7c3aed",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#8b5cf6",
            buttonSecondaryHoverBackground: "rgba(139,92,246,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#4c1d95",
            headerLinkColor: "#7c3aed",
            headerLinkHoverColor: "#8b5cf6",
            featuresBackground: "#faf5ff",
            featuresTitleColor: "#4c1d95",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#e9d5ff",
            footerBackground: "#4c1d95",
            footerTextColor: "#e9d5ff",
            footerLinkColor: "#f3e8ff",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#f3e8ff",
            aboutTitleColor: "#4c1d95",
            aboutTextColor: "#7c3aed",
            testimonialsBackground: "#4c1d95",
            testimonialsTitleColor: "#8b5cf6",
            testimonialsTextColor: "#e9d5ff",
            testimonialsCardBackground: "#7c3aed",
            testimonialsCardBorder: "#8b5cf6",
            contactBackground: "#ffffff",
            contactTitleColor: "#4c1d95",
            contactTextColor: "#7c3aed",
            contactFormBackground: "#faf5ff",
            contactFormBorder: "#e9d5ff",
            contactButtonBackground: "#8b5cf6",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#7c3aed",
        },
        typography: {
            headingFont: "Playfair Display, Georgia, serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "700",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // 14. Carbón Corporativo
    {
        name: "Carbón Corporativo",
        colors: {
            primary: "#1f2937",
            secondary: "#374151",
            accent: "#111827",
            background: "#f9fafb",
            text: "#1f2937"
        },
        sectionColors: {
            heroBackground: "#f3f4f6",
            heroTitleColor: "#111827",
            heroDescriptionColor: "#374151",
            heroBadgeBackground: "#1f2937",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#1f2937",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#111827",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#1f2937",
            buttonSecondaryHoverBackground: "rgba(31,41,55,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#111827",
            headerLinkColor: "#374151",
            headerLinkHoverColor: "#1f2937",
            featuresBackground: "#f9fafb",
            featuresTitleColor: "#111827",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#e5e7eb",
            footerBackground: "#111827",
            footerTextColor: "#9ca3af",
            footerLinkColor: "#d1d5db",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#f3f4f6",
            aboutTitleColor: "#111827",
            aboutTextColor: "#374151",
            testimonialsBackground: "#111827",
            testimonialsTitleColor: "#ffffff",
            testimonialsTextColor: "#9ca3af",
            testimonialsCardBackground: "#1f2937",
            testimonialsCardBorder: "#374151",
            contactBackground: "#ffffff",
            contactTitleColor: "#111827",
            contactTextColor: "#374151",
            contactFormBackground: "#f9fafb",
            contactFormBorder: "#e5e7eb",
            contactButtonBackground: "#1f2937",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#111827",
        },
        typography: {
            headingFont: "Roboto, system-ui, sans-serif",
            bodyFont: "Roboto, system-ui, sans-serif",
            headingWeight: "500",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // 15. Cereza Dulce
    {
        name: "Cereza Dulce",
        colors: {
            primary: "#e11d48",
            secondary: "#be123c",
            accent: "#881337",
            background: "#fff1f2",
            text: "#4c0519"
        },
        sectionColors: {
            heroBackground: "#ffe4e6",
            heroTitleColor: "#881337",
            heroDescriptionColor: "#be123c",
            heroBadgeBackground: "#e11d48",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#e11d48",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#be123c",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#e11d48",
            buttonSecondaryHoverBackground: "rgba(225,29,72,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#881337",
            headerLinkColor: "#be123c",
            headerLinkHoverColor: "#e11d48",
            featuresBackground: "#fff1f2",
            featuresTitleColor: "#881337",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#fecdd3",
            footerBackground: "#881337",
            footerTextColor: "#fecdd3",
            footerLinkColor: "#ffe4e6",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#ffe4e6",
            aboutTitleColor: "#881337",
            aboutTextColor: "#be123c",
            testimonialsBackground: "#881337",
            testimonialsTitleColor: "#e11d48",
            testimonialsTextColor: "#fecdd3",
            testimonialsCardBackground: "#be123c",
            testimonialsCardBorder: "#e11d48",
            contactBackground: "#ffffff",
            contactTitleColor: "#881337",
            contactTextColor: "#be123c",
            contactFormBackground: "#fff1f2",
            contactFormBorder: "#fecdd3",
            contactButtonBackground: "#e11d48",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#be123c",
        },
        typography: {
            headingFont: "Poppins, system-ui, sans-serif",
            bodyFont: "Open Sans, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // 16. Atardecer
    {
        name: "Atardecer",
        colors: {
            primary: "#f97316",
            secondary: "#ea580c",
            accent: "#7c2d12",
            background: "#fff7ed",
            text: "#431407"
        },
        sectionColors: {
            heroBackground: "#ffedd5",
            heroTitleColor: "#9a3412",
            heroDescriptionColor: "#c2410c",
            heroBadgeBackground: "#f97316",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#f97316",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#ea580c",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#f97316",
            buttonSecondaryHoverBackground: "rgba(249,115,22,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#7c2d12",
            headerLinkColor: "#c2410c",
            headerLinkHoverColor: "#f97316",
            featuresBackground: "#fff7ed",
            featuresTitleColor: "#9a3412",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#fed7aa",
            footerBackground: "#7c2d12",
            footerTextColor: "#fed7aa",
            footerLinkColor: "#ffedd5",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#ffedd5",
            aboutTitleColor: "#9a3412",
            aboutTextColor: "#c2410c",
            testimonialsBackground: "#7c2d12",
            testimonialsTitleColor: "#f97316",
            testimonialsTextColor: "#fed7aa",
            testimonialsCardBackground: "#c2410c",
            testimonialsCardBorder: "#f97316",
            contactBackground: "#ffffff",
            contactTitleColor: "#9a3412",
            contactTextColor: "#c2410c",
            contactFormBackground: "#fff7ed",
            contactFormBorder: "#fed7aa",
            contactButtonBackground: "#f97316",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#ea580c",
        },
        typography: {
            headingFont: "Playfair Display, Georgia, serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "700",
            bodyWeight: "400",
            navTextSize: "0.9rem",
            buttonTextSize: "0.875rem",
        },
    },
    // 17. Bosque Místico
    {
        name: "Bosque Místico",
        colors: {
            primary: "#059669",
            secondary: "#047857",
            accent: "#064e3b",
            background: "#ecfdf5",
            text: "#022c22"
        },
        sectionColors: {
            heroBackground: "#d1fae5",
            heroTitleColor: "#064e3b",
            heroDescriptionColor: "#047857",
            heroBadgeBackground: "#059669",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#059669",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#047857",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#059669",
            buttonSecondaryHoverBackground: "rgba(5,150,105,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#064e3b",
            headerLinkColor: "#047857",
            headerLinkHoverColor: "#059669",
            featuresBackground: "#ecfdf5",
            featuresTitleColor: "#064e3b",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#a7f3d0",
            footerBackground: "#064e3b",
            footerTextColor: "#a7f3d0",
            footerLinkColor: "#d1fae5",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#d1fae5",
            aboutTitleColor: "#064e3b",
            aboutTextColor: "#047857",
            testimonialsBackground: "#064e3b",
            testimonialsTitleColor: "#059669",
            testimonialsTextColor: "#a7f3d0",
            testimonialsCardBackground: "#047857",
            testimonialsCardBorder: "#059669",
            contactBackground: "#ffffff",
            contactTitleColor: "#064e3b",
            contactTextColor: "#047857",
            contactFormBackground: "#ecfdf5",
            contactFormBorder: "#a7f3d0",
            contactButtonBackground: "#059669",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#047857",
        },
        typography: {
            headingFont: "Poppins, system-ui, sans-serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // 18. Noche Estrellada
    {
        name: "Noche Estrellada",
        colors: {
            primary: "#4338ca",
            secondary: "#3730a3",
            accent: "#1e1b4b",
            background: "#eef2ff",
            text: "#1e1b4b"
        },
        sectionColors: {
            heroBackground: "#e0e7ff",
            heroTitleColor: "#1e1b4b",
            heroDescriptionColor: "#3730a3",
            heroBadgeBackground: "#4338ca",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#4338ca",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#3730a3",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#4338ca",
            buttonSecondaryHoverBackground: "rgba(67,56,202,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#1e1b4b",
            headerLinkColor: "#3730a3",
            headerLinkHoverColor: "#4338ca",
            featuresBackground: "#eef2ff",
            featuresTitleColor: "#1e1b4b",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#c7d2fe",
            footerBackground: "#1e1b4b",
            footerTextColor: "#c7d2fe",
            footerLinkColor: "#e0e7ff",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#e0e7ff",
            aboutTitleColor: "#1e1b4b",
            aboutTextColor: "#3730a3",
            testimonialsBackground: "#1e1b4b",
            testimonialsTitleColor: "#4338ca",
            testimonialsTextColor: "#c7d2fe",
            testimonialsCardBackground: "#3730a3",
            testimonialsCardBorder: "#4338ca",
            contactBackground: "#ffffff",
            contactTitleColor: "#1e1b4b",
            contactTextColor: "#3730a3",
            contactFormBackground: "#eef2ff",
            contactFormBorder: "#c7d2fe",
            contactButtonBackground: "#4338ca",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#3730a3",
        },
        typography: {
            headingFont: "Poppins, system-ui, sans-serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // 19. Rosa Pastel
    {
        name: "Rosa Pastel",
        colors: {
            primary: "#f43f5e",
            secondary: "#e11d48",
            accent: "#9f1239",
            background: "#fff1f2",
            text: "#4c0519"
        },
        sectionColors: {
            heroBackground: "#ffe4e6",
            heroTitleColor: "#9f1239",
            heroDescriptionColor: "#e11d48",
            heroBadgeBackground: "#f43f5e",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#f43f5e",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#e11d48",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#f43f5e",
            buttonSecondaryHoverBackground: "rgba(244,63,94,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#9f1239",
            headerLinkColor: "#e11d48",
            headerLinkHoverColor: "#f43f5e",
            featuresBackground: "#fff1f2",
            featuresTitleColor: "#9f1239",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#fecdd3",
            footerBackground: "#9f1239",
            footerTextColor: "#fecdd3",
            footerLinkColor: "#ffe4e6",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#ffe4e6",
            aboutTitleColor: "#9f1239",
            aboutTextColor: "#e11d48",
            testimonialsBackground: "#9f1239",
            testimonialsTitleColor: "#f43f5e",
            testimonialsTextColor: "#fecdd3",
            testimonialsCardBackground: "#e11d48",
            testimonialsCardBorder: "#f43f5e",
            contactBackground: "#ffffff",
            contactTitleColor: "#9f1239",
            contactTextColor: "#e11d48",
            contactFormBackground: "#fff1f2",
            contactFormBorder: "#fecdd3",
            contactButtonBackground: "#f43f5e",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#e11d48",
        },
        typography: {
            headingFont: "Playfair Display, Georgia, serif",
            bodyFont: "Open Sans, system-ui, sans-serif",
            headingWeight: "700",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // 20. Arena Dorada
    {
        name: "Arena Dorada",
        colors: {
            primary: "#d97706",
            secondary: "#b45309",
            accent: "#78350f",
            background: "#fffbeb",
            text: "#451a03"
        },
        sectionColors: {
            heroBackground: "#fef3c7",
            heroTitleColor: "#78350f",
            heroDescriptionColor: "#b45309",
            heroBadgeBackground: "#d97706",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#d97706",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#b45309",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#d97706",
            buttonSecondaryHoverBackground: "rgba(217,119,6,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#78350f",
            headerLinkColor: "#b45309",
            headerLinkHoverColor: "#d97706",
            featuresBackground: "#fffbeb",
            featuresTitleColor: "#78350f",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#fde68a",
            footerBackground: "#78350f",
            footerTextColor: "#fde68a",
            footerLinkColor: "#fef3c7",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#fef3c7",
            aboutTitleColor: "#78350f",
            aboutTextColor: "#b45309",
            testimonialsBackground: "#78350f",
            testimonialsTitleColor: "#d97706",
            testimonialsTextColor: "#fde68a",
            testimonialsCardBackground: "#b45309",
            testimonialsCardBorder: "#d97706",
            contactBackground: "#ffffff",
            contactTitleColor: "#78350f",
            contactTextColor: "#b45309",
            contactFormBackground: "#fffbeb",
            contactFormBorder: "#fde68a",
            contactButtonBackground: "#d97706",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#b45309",
        },
        typography: {
            headingFont: "Lora, Georgia, serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
];

export const colorPresets = {
    consulting: fullPresets.map(p => ({ name: p.name, colors: p.colors })),
};



export const defaultSectionColors: SectionColors = {
    heroBackground: '#f8fafc',
    heroTitleColor: '#1e293b',
    heroDescriptionColor: '#475569',
    heroBadgeBackground: '#2563eb',
    heroBadgeTextColor: '#ffffff',
    buttonPrimaryBackground: '#2563eb',
    buttonPrimaryText: '#ffffff',
    buttonPrimaryHoverBackground: '#1d4ed8',
    buttonSecondaryBackground: '#ffffff',
    buttonSecondaryText: '#1e293b',
    buttonSecondaryHoverBackground: '#f1f5f9',
    headerBackground: '#ffffff',
    headerTextColor: '#1e293b',
    headerLinkColor: '#475569',
    headerLinkHoverColor: '#2563eb',
    // featuresBackground: '#ffffff',
    // featuresTitleColor: '#1e293b',
    // featuresCardBackground: '#ffffff',
    // featuresCardBorder: '#e2e8f0',
    footerBackground: '#0f172a',
    footerTextColor: '#94a3b8',
    footerLinkColor: '#cbd5e1',
    footerHeadingColor: '#ffffff',
    footerLinkHoverColor: '#3b82f6',
    socialIconColor: '#94a3b8',
    socialIconHoverColor: '#3b82f6',
    globalLinkColor: '#3b82f6',
    globalLinkHoverColor: '#1d4ed8',
    cardHoverScale: 'scale-105',
    cardHoverShadow: 'shadow-lg',
    iconColor: '#475569',
    iconSize: 'w-5 h-5',
    bodyBackground: '#ffffff',
    bodyTextColor: '#334155',

    statValueColor: '#2563eb',      // mismo color que el primario por defecto
    statLabelColor: '#475569',      // mismo que heroDescriptionColor
    headerCtaBackground: '#2563eb',
    headerCtaText: '#ffffff',
    headerCtaHoverBackground: '#1d4ed8',

    logoTextColor1: '#2563eb',   // azul por defecto
    logoTextColor2: '#475569',   // slate por defecto
    logoTextSize: 'text-2xl',

    // Features
    featuresBackground: '#ffffff',
    featuresTitleColor: '#1e293b',
    featuresCardBackground: '#ffffff',
    featuresCardBorder: '#e2e8f0',
    featuresIconColor: '#2563eb',

    // About
    aboutBackground: '#f8fafc',
    aboutTitleColor: '#1e293b',
    aboutTextColor: '#475569',
    aboutBadgeBackground: '#2563eb',
    aboutBadgeTextColor: '#ffffff',
    aboutImageBorderRadius: '1rem',

    // Testimonios
    testimonialsBackground: '#0f172a',
    testimonialsTitleColor: '#ffffff',
    testimonialsTextColor: '#cbd5e1',
    testimonialsCardBackground: '#1e293b',
    testimonialsCardBorder: '#334155',
    testimonialsNameColor: '#ffffff',
    testimonialsRoleColor: '#94a3b8',

    // Contacto
    contactBackground: '#ffffff',
    contactTitleColor: '#1e293b',
    contactTextColor: '#475569',
    contactFormBackground: '#f8fafc',
    contactFormBorder: '#e2e8f0',
    contactInputBackground: '#ffffff',
    contactInputBorder: '#cbd5e1',
    contactInputTextColor: '#1e293b',
    contactButtonBackground: '#2563eb',
    contactButtonText: '#ffffff',
    contactButtonHoverBackground: '#1d4ed8',
};

export const defaultTypography: TypographyConfig = {
    // Fuentes globales
    headingFont: 'Inter, system-ui, sans-serif',
    bodyFont: 'Inter, system-ui, sans-serif',
    headingWeight: '700',
    bodyWeight: '400',

    // Hero
    heroTitleSize: '3rem',
    heroDescriptionSize: '1.125rem',

    // Características / Servicios
    featuresTitleSize: '2rem',
    featuresCardTitleSize: '1.5rem',
    featuresDescriptionSize: '1rem',

    // Sobre Nosotros
    aboutTitleSize: '2rem',
    aboutTextSize: '1rem',
    aboutStatsValueSize: '1.5rem',
    aboutStatsLabelSize: '0.875rem',
    aboutDifferentiatorSize: '1rem',

    // Testimonios
    testimonialsTitleSize: '2rem',
    testimonialsNameSize: '1.125rem',
    testimonialsRoleSize: '0.875rem',
    testimonialsTextSize: '1rem',

    // Contacto
    contactTitleSize: '2rem',
    contactTextSize: '1rem',
    contactLabelSize: '0.875rem',
    contactButtonSize: '1rem',
    contactCardTitleSize: '1.25rem',   // 👈 NUEVO

    // Footer
    footerHeadingSize: '1.125rem',
    footerTextSize: '0.875rem',
    footerLinkSize: '0.875rem',
};

export const defaultUI: UIConfig = {
    borderRadius: {
        small: '0.375rem',
        medium: '0.5rem',
        large: '0.75rem',
        full: '9999px',
    },
    boxShadow: {
        small: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        medium: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        large: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        none: 'none',
    },
    spacing: {
        sectionPadding: '4rem',
        elementGap: '1.5rem',
    },
};

export const defaultButtons: ButtonConfig = {
    primary: {
        text: 'Solicitar consultoría',
        url: '/contacto',
        openInNewTab: false,
    },
    secondary: {
        text: 'Conocer metodología',
        url: '#metodologia',
        openInNewTab: false,
    },
}; // src/App.tsx - Versión corregida para vista previa
import { Grid3X3, Heart, LayoutGrid, Sparkles, Star } from 'lucide-react';
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom';
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen';
import { useAuth } from './contexts/AuthContext';
import { TemplateProvider, useTemplate } from './contexts/TemplateContext';
import { templateImages } from './data/templateImages';
import { templateDefaultColors } from './data/types/templateDefaultColors';
import { useAuthHandler } from './hooks/useAuthHandler';
import { useUserTemplates } from './hooks/useUserTemplates';
import './index.css';
import { EditorLayout } from './layouts/EditorLayout';
import { GalleryLayout } from './layouts/GalleryLayout';
import { MyTemplatesLayout } from './layouts/MyTemplatesLayout';
import { OwnTemplateLayout } from './layouts/OwnTemplateLayout';
import LoginPage from './pages/LoginPage';
import { TemplateEditorProvider } from './contexts/TemplateEditorContext';

// Lazy loading de templates
const AccountingLanding = lazy(() => import('./templates/landing/Accounting/AccountingLanding'));
const ArchitectureLanding = lazy(() => import('./templates/landing/Architecture/ArchitectureLanding'));
const BakeryLanding = lazy(() => import('./templates/landing/Bakery/BakeryLanding'));
const BeautySalonLanding = lazy(() => import('./templates/landing/BeautySalon/SalonLanding'));
const CateringLanding = lazy(() => import('./templates/landing/Catering/CateringLanding'));
const CleaningServiceLanding = lazy(() => import('./templates/landing/CleaningService/CleaningLanding'));
const CoffeeShopLanding = lazy(() => import('./templates/landing/CoffeeShop/CoffeeLanding'));
const ConsultingLanding = lazy(() => import('./templates/landing/Consulting/ConsultingLanding'));
const DigitalAgencyLanding = lazy(() => import('./templates/landing/DigitalAgency/DigitalLanding'));
const FashionStoreLanding = lazy(() => import('./templates/landing/FashionStore/FashionLanding'));
const FoodTruckLanding = lazy(() => import('./templates/landing/FoodTruck/FoodTruckLanding'));
const GymLanding = lazy(() => import('./templates/landing/Gym/GymLanding'));
const LawFirmLanding = lazy(() => import('./templates/landing/LawFirm/LawFirmLanding'));
const MarketingAgencyLanding = lazy(() => import('./templates/landing/MarketingAgency/AgencyLanding'));
const MedicalClinicLanding = lazy(() => import('./templates/landing/MedicalClinic/MedicalLanding'));
const RealEstateLanding = lazy(() => import('./templates/landing/RealEstate/RealEstateLanding'));
const RestaurantLanding = lazy(() => import('./templates/landing/Restaurant/RestaurantLanding'));
const SaaSlanding = lazy(() => import('./templates/landing/SaaS/SaaSlanding'));
const StartupLanding = lazy(() => import('./templates/landing/Startup/StartupLanding'));

type ViewMode = 'ownTemplate' | 'myTemplates' | 'gallery' | 'editor';

const templatesInfo = [
  { id: 'consulting', title: 'Consultoría', description: 'Diseño profesional para servicios de consultoría.', icon: '📊', gradient: 'from-blue-500 to-blue-600', color: 'blue', category: ['landing'], tags: ['negocios', 'profesional'], featured: true, popular: true, images: templateImages.consulting },
  { id: 'catering', title: 'Catering', description: 'Estilo vibrante para servicios gastronómicos.', icon: '🍽️', gradient: 'from-amber-500 to-orange-500', color: 'amber', category: ['landing'], tags: ['gastronomía', 'eventos'], featured: true, popular: true, images: templateImages.catering },
  { id: 'accounting', title: 'Contaduría', description: 'Diseño formal para estudios contables.', icon: '🧾', gradient: 'from-emerald-500 to-emerald-600', color: 'emerald', category: ['landing'], tags: ['finanzas', 'contable'], featured: false, popular: false, images: templateImages.accounting },
  { id: 'restaurant', title: 'Restaurant', description: 'Diseño cálido para restaurantes.', icon: '🍝', gradient: 'from-red-500 to-red-600', color: 'red', category: ['landing'], tags: ['gastronomía', 'comida'], featured: true, popular: true, images: templateImages.restaurant },
  { id: 'lawFirm', title: 'Bufete de Abogados', description: 'Diseño elegante para estudios jurídicos.', icon: '⚖️', gradient: 'from-stone-600 to-stone-700', color: 'stone', category: ['landing'], tags: ['legal', 'derecho'], featured: false, popular: false, images: templateImages.lawFirm },
  { id: 'medical', title: 'Clínica Médica', description: 'Diseño limpio para centros de salud.', icon: '🏥', gradient: 'from-teal-500 to-teal-600', color: 'teal', category: ['landing'], tags: ['salud', 'médico'], featured: true, popular: false, images: templateImages.medical },
  { id: 'architecture', title: 'Arquitectura', description: 'Diseño moderno para estudios de arquitectura.', icon: '🏛️', gradient: 'from-stone-500 to-stone-600', color: 'stone', category: ['landing'], tags: ['arquitectura', 'diseño'], featured: false, popular: false, images: templateImages.architecture },
  { id: 'marketingAgency', title: 'Agencia de Marketing', description: 'Diseño creativo para agencias.', icon: '📈', gradient: 'from-purple-500 to-purple-600', color: 'purple', category: ['landing'], tags: ['marketing', 'publicidad'], featured: true, popular: true, images: templateImages.marketingAgency },
  { id: 'bakery', title: 'Panadería', description: 'Diseño dulce para panaderías.', icon: '🥐', gradient: 'from-rose-500 to-rose-600', color: 'rose', category: ['landing'], tags: ['panadería', 'dulces'], featured: false, popular: false, images: templateImages.bakery },
  { id: 'foodTruck', title: 'Food Truck', description: 'Diseño urbano para food trucks.', icon: '🚚', gradient: 'from-orange-500 to-orange-600', color: 'orange', category: ['landing'], tags: ['comida callejera', 'rápido'], featured: false, popular: false, images: templateImages.foodTruck },
  { id: 'beautySalon', title: 'Salón de Belleza', description: 'Diseño elegante para salones.', icon: '💅', gradient: 'from-pink-500 to-pink-600', color: 'pink', category: ['landing'], tags: ['belleza', 'spa'], featured: true, popular: false, images: templateImages.beautySalon },
  { id: 'gym', title: 'Gimnasio', description: 'Diseño motivador para gimnasios.', icon: '💪', gradient: 'from-orange-500 to-orange-600', color: 'orange', category: ['landing'], tags: ['fitness', 'entrenamiento'], featured: false, popular: false, images: templateImages.gym },
  { id: 'realEstate', title: 'Inmobiliaria', description: 'Diseño profesional para bienes raíces.', icon: '🏢', gradient: 'from-emerald-500 to-emerald-600', color: 'emerald', category: ['landing'], tags: ['propiedades', 'inmuebles'], featured: true, popular: true, images: templateImages.realEstate },
  { id: 'fashion', title: 'Tienda de Moda', description: 'Diseño moderno para tiendas de ropa.', icon: '👗', gradient: 'from-fuchsia-500 to-fuchsia-600', color: 'fuchsia', category: ['landing'], tags: ['moda', 'ropa'], featured: true, popular: true, images: templateImages.fashion },
  { id: 'cleaning', title: 'Limpieza', description: 'Diseño para servicios de limpieza.', icon: '🧹', gradient: 'from-sky-500 to-sky-600', color: 'sky', category: ['landing'], tags: ['servicios', 'limpieza'], featured: false, popular: false, images: templateImages.cleaning },
  { id: 'saas', title: 'SaaS', description: 'Diseño para software como servicio.', icon: '☁️', gradient: 'from-violet-500 to-violet-600', color: 'violet', category: ['landing'], tags: ['software', 'tecnología'], featured: true, popular: true, images: templateImages.saas },
  { id: 'digitalAgency', title: 'Agencia Digital', description: 'Diseño innovador para agencias digitales.', icon: '💻', gradient: 'from-cyan-500 to-cyan-600', color: 'cyan', category: ['landing'], tags: ['digital', 'tecnología'], featured: false, popular: false, images: templateImages.digitalAgency },
  { id: 'startup', title: 'Startup', description: 'Diseño disruptivo para startups.', icon: '🚀', gradient: 'from-emerald-500 to-emerald-600', color: 'emerald', category: ['landing'], tags: ['startup', 'innovación'], featured: true, popular: true, images: templateImages.startup },
  { id: 'coffeeShop', title: 'Coffee Shop', description: 'Diseño acogedor para cafeterías.', icon: '☕', gradient: 'from-amber-600 to-amber-700', color: 'amber', category: ['landing', 'ecommerce'], tags: ['café', 'desayunos'], featured: true, popular: true, images: templateImages.coffeeShop },
];

const categories = [
  { id: 'todos', label: 'Todos', icon: (props: any) => <Grid3X3 {...props} /> },
  { id: 'landing', label: 'Landing Pages', icon: (props: any) => <LayoutGrid {...props} /> },
  { id: 'ecommerce', label: 'E-commerce', icon: (props: any) => <Sparkles {...props} /> },
  { id: 'enterprise', label: 'Enterprise', icon: (props: any) => <Star {...props} /> },
  { id: 'custom', label: 'Custom', icon: (props: any) => <Heart {...props} /> }
];

// Componente auxiliar para inicializar el contexto en modo preview
const PreviewWrapper = ({ templateData, children }: { templateData: any; children: React.ReactNode }) => {
  const { setTemplate } = useTemplate();
  const initialized = useRef(false);

  useEffect(() => {
    if (templateData && !initialized.current) {
      setTemplate(templateData);
      initialized.current = true;
    }
  }, [templateData, setTemplate]);

  return <>{children}</>;
};

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isLoading, getLoadingMessage, tokenFromUrl } = useAuthHandler();
  const { userTemplate, userTemplatesList, loading: loadingTemplates, loadTemplateForEdit } = useUserTemplates(isAuthenticated, user);
  const [searchParams] = useSearchParams();

  const hasProcessedUrlParams = useRef(false);
  const previewModeFromUrl = useRef(searchParams.get('preview') === 'true');
  const templateIdFromUrl = useRef(searchParams.get('templateId'));
  const viewFromUrl = searchParams.get('view');

  const [viewMode, setViewMode] = useState<ViewMode>('ownTemplate');
  const [selectedTemplateForEdit, setSelectedTemplateForEdit] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteTemplates');
    return saved ? JSON.parse(saved) : [];
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);

  // ✅ Procesar parámetros de URL solo una vez, usando useRef para persistir valores
  useEffect(() => {
    const processUrlParams = async () => {
      if (hasProcessedUrlParams.current) return;

      const templateId = templateIdFromUrl.current;
      const isPreview = previewModeFromUrl.current;

      if (templateId && isAuthenticated) {
        hasProcessedUrlParams.current = true;
        setIsLoadingTemplate(true);
        console.log('📝 Cargando template desde URL:', templateId);
        if (isPreview) setIsPreviewMode(true);
        const templateData = await loadTemplateForEdit(templateId);
        if (templateData) {
          setSelectedTemplateForEdit(templateData);
          setViewMode('editor');
        }
        setIsLoadingTemplate(false);
        // IMPORTANTE: No limpiar la URL aquí porque la vista previa necesita los parámetros.
        // window.history.replaceState({}, document.title, window.location.pathname);
      } else if (viewFromUrl === 'my-templates') {
        hasProcessedUrlParams.current = true;
        setViewMode('myTemplates');
      } else if (!loadingTemplates && !userTemplate && viewMode === 'ownTemplate') {
        setViewMode('gallery');
      }
    };

    processUrlParams();
  }, [isAuthenticated, loadingTemplates, userTemplate, viewMode, loadTemplateForEdit, viewFromUrl]);

  // ✅ Mantener isPreviewMode true si estamos en modo preview (evita que cambie por re-renders)
  useEffect(() => {
    if (previewModeFromUrl.current && !isPreviewMode) {
      setIsPreviewMode(true);
    }
  }, [isPreviewMode]);

  // ✅ Escuchar evento de template guardado
  useEffect(() => {
    const handleTemplateSaved = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { template, success } = customEvent.detail;
      if (success && template && viewMode === 'editor' && selectedTemplateForEdit) {
        setSelectedTemplateForEdit((prev: any) => ({
          ...prev,
          id: template.id,
          updatedAt: new Date()
        }));
      }
    };
    window.addEventListener('template-saved', handleTemplateSaved);
    return () => window.removeEventListener('template-saved', handleTemplateSaved);
  }, [viewMode, selectedTemplateForEdit]);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const handleLogin = () => window.location.href = '/login';

  const handleToggleFavorite = (templateId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = favorites.includes(templateId)
      ? favorites.filter(id => id !== templateId)
      : [...favorites, templateId];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteTemplates', JSON.stringify(newFavorites));
  };

  const handleSelectTemplateFromGallery = (templateId: string) => {
    const defaultColors = templateDefaultColors[templateId as keyof typeof templateDefaultColors] || templateDefaultColors.consulting;
    const newTemplate = {
      id: `temp-${Date.now()}`,
      name: `Mi template de ${templateId}`,
      type: templateId,
      colors: defaultColors,
      texts: {},
      images: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1
    };
    setSelectedTemplateForEdit(newTemplate);
    setViewMode('editor');
  };

  const handleBackToOwn = () => {
    setViewMode('ownTemplate');
    setIsPreviewMode(false);
  };

  const handleEditTemplate = async (templateId: string) => {
    const templateData = await loadTemplateForEdit(templateId);
    if (templateData) {
      setSelectedTemplateForEdit(templateData);
      setViewMode('editor');
    }
  };

  const handleBackToMyTemplates = () => setViewMode('myTemplates');
  const handleExploreGallery = () => setViewMode('gallery');

  if (isLoading || loadingTemplates || isLoadingTemplate || (tokenFromUrl && !isAuthenticated)) {
    return <LoadingScreen message={isLoadingTemplate ? "Cargando template..." : getLoadingMessage()} />;
  }

  if (!isAuthenticated) return null;

  if (!userTemplate && viewMode === 'ownTemplate') {
    return (
      <GalleryLayout
        templates={templatesInfo}
        categories={categories}
        onSelectTemplate={handleSelectTemplateFromGallery}
        onBackToOwn={handleBackToOwn}
        onBackToMyTemplates={handleBackToMyTemplates}
        onLogout={handleLogout}
        onLogin={handleLogin}
        user={user}
        isAuthenticated={isAuthenticated}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    );
  }

  if (viewMode === 'editor' && selectedTemplateForEdit) {
    const TemplateComponent = (() => {
      switch (selectedTemplateForEdit.type) {
        case 'consulting': return ConsultingLanding;
        case 'catering': return CateringLanding;
        case 'accounting': return AccountingLanding;
        case 'restaurant': return RestaurantLanding;
        case 'lawFirm': return LawFirmLanding;
        case 'medical': return MedicalClinicLanding;
        case 'architecture': return ArchitectureLanding;
        case 'marketingAgency': return MarketingAgencyLanding;
        case 'coffeeShop': return CoffeeShopLanding;
        case 'bakery': return BakeryLanding;
        case 'foodTruck': return FoodTruckLanding;
        case 'beautySalon': return BeautySalonLanding;
        case 'gym': return GymLanding;
        case 'realEstate': return RealEstateLanding;
        case 'fashion': return FashionStoreLanding;
        case 'cleaning': return CleaningServiceLanding;
        case 'saas': return SaaSlanding;
        case 'digitalAgency': return DigitalAgencyLanding;
        case 'startup': return StartupLanding;
        default: return ConsultingLanding;
      }
    })();

    // ✅ Modo preview: inicializar el contexto con los datos cargados
    if (isPreviewMode) {
      return (
        <TemplateProvider>
          <TemplateEditorProvider>
            <PreviewWrapper templateData={selectedTemplateForEdit}>
              <Suspense fallback={<LoadingScreen message="Cargando previsualización..." />}>
                <TemplateComponent onHomeClick={() => { }} isPreview={true} />
              </Suspense>
            </PreviewWrapper>
          </TemplateEditorProvider>
        </TemplateProvider>
      );
    }

    return (
      <EditorLayout
        templateData={selectedTemplateForEdit}
        onClose={handleBackToOwn}
        isPreview={false}
      >
        <Suspense fallback={<LoadingScreen message="Cargando template..." />}>
          <TemplateComponent onHomeClick={handleBackToOwn} />
        </Suspense>
      </EditorLayout>
    );
  }

  if (viewMode === 'myTemplates') {
    return (
      <MyTemplatesLayout
        templates={userTemplatesList}
        onEditTemplate={handleEditTemplate}
        onBackToOwn={handleBackToOwn}
        onExploreGallery={handleExploreGallery}
        onLogout={handleLogout}
        onLogin={handleLogin}
        user={user}
        isAuthenticated={isAuthenticated}
      />
    );
  }

  if (viewMode === 'gallery') {
    return (
      <GalleryLayout
        templates={templatesInfo}
        categories={categories}
        onSelectTemplate={handleSelectTemplateFromGallery}
        onBackToOwn={handleBackToOwn}
        onBackToMyTemplates={handleBackToMyTemplates}
        onLogout={handleLogout}
        onLogin={handleLogin}
        user={user}
        isAuthenticated={isAuthenticated}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    );
  }

  if (userTemplate) {
    return (
      <OwnTemplateLayout
        userTemplate={userTemplate}
        onEdit={() => userTemplate && handleEditTemplate(userTemplate.id)}
        onViewMyTemplates={handleBackToMyTemplates}
        onExploreGallery={handleExploreGallery}
        onLogout={handleLogout}
        onLogin={handleLogin}
        isAuthenticated={isAuthenticated}
        user={user}
      />
    );
  }

  return (
    <GalleryLayout
      templates={templatesInfo}
      categories={categories}
      onSelectTemplate={handleSelectTemplateFromGallery}
      onBackToOwn={handleBackToOwn}
      onBackToMyTemplates={handleBackToMyTemplates}
      onLogout={handleLogout}
      onLogin={handleLogin}
      user={user}
      isAuthenticated={isAuthenticated}
      favorites={favorites}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
} Analiza