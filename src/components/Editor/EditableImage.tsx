import { Edit2, Image as ImageIcon, Upload, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { defaultImages } from '../../assets/default-images';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

interface EditableImageProps {
    elementId: string;
    defaultImage: string;
    alt?: string;
    className?: string;
    aspectRatio?: string;
    category?: string; // 'consulting', 'catering', etc.
}

const EditableImage: React.FC<EditableImageProps> = ({
    elementId,
    defaultImage,
    alt = '',
    className = '',
    aspectRatio = 'aspect-auto',
    category = 'consulting'
}) => {
    const { config } = useTemplateEditor();
    const { template, updateImage } = useTemplate();
    const [isHovering, setIsHovering] = useState(false);
    const [showSelector, setShowSelector] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const [galleryPage, setGalleryPage] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const imageUrl = template?.images?.[elementId] || defaultImage;

    // Obtener imágenes de la categoría
    const categoryImages = defaultImages[category as keyof typeof defaultImages] || {};
    const galleryImages = Object.entries(categoryImages).map(([key, url]) => ({
        id: key,
        url,
        name: key.charAt(0).toUpperCase() + key.slice(1)
    }));

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                await updateImage(elementId, file);
                setShowSelector(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectFromGallery = async (imageUrl: string) => {
        // Convertir URL a File object
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], `gallery-image-${Date.now()}.jpg`, { type: 'image/jpeg' });
        await updateImage(elementId, file);
        setShowGallery(false);
        setShowSelector(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            await updateImage(elementId, file);
            setShowSelector(false);
        }
    };

    if (!config.isEditing) {
        return (
            <img
                src={imageUrl}
                alt={alt}
                className={className}
            />
        );
    }

    return (
        <div
            id={`editable-${elementId}`}
            data-element-id={elementId}
            className={`relative group ${aspectRatio}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <img
                src={imageUrl}
                alt={alt}
                className={`${className} ${isHovering ? 'opacity-75' : ''} transition-opacity`}
            />

            {/* Overlay de edición */}
            {isHovering && !showSelector && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity">
                    <button
                        onClick={() => setShowSelector(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                    >
                        <Edit2 className="w-4 h-4" />
                        <span>Cambiar imagen</span>
                    </button>
                </div>
            )}

            {/* Selector modal */}
            {showSelector && (
                <div className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-lg p-4 flex flex-col border-2 border-blue-500 z-20"
                    style={{ minHeight: '300px' }}
                >
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold">Seleccionar imagen</h4>
                        <button
                            onClick={() => setShowSelector(false)}
                            className="p-1 bg-gray-200 dark:bg-neutral-700 rounded-full hover:bg-gray-300 dark:hover:bg-neutral-600 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex space-x-2 mb-3">
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
                        className="flex-1 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center"
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
                </div>
            )}

            {/* Galería modal */}
            {showGallery && (
                <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-4xl w-full max-h-[80vh] flex flex-col">
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
        </div>
    );
};

export default EditableImage;