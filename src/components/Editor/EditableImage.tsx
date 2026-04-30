import { Edit2, Image as ImageIcon, Upload, X } from 'lucide-react';
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

export default EditableImage;