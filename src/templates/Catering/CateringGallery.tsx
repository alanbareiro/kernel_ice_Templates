import { ChevronLeft, ChevronRight, Heart, X } from 'lucide-react';
import { useState } from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const CateringGallery = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#f59e0b',
        secondary: '#d97706',
        accent: '#b45309',
    };
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    // Función para manejar errores de imagen
    const handleImageError = (imageId: string) => {
        setImageErrors(prev => ({ ...prev, [imageId]: true }));
    };

    // Función para obtener URL con fallback
    const getImageUrl = (imageId: string, defaultUrl: string) => {
        if (imageErrors[imageId]) {
            return `https://via.placeholder.com/800x600?text=${encodeURIComponent(imageId.replace(/_/g, ' '))}`;
        }
        return defaultUrl;
    };

    const images = [
        {
            url: defaultImages.catering?.buffet || defaultImages.catering.hero,
            titleId: 'c_gallery_1_title',
            titleDefault: 'Buffet de bodas',
            categoryId: 'c_gallery_1_category',
            categoryDefault: 'Eventos',
            likes: 234,
            id: 'c_gallery_1'
        },
        {
            url: defaultImages.catering?.plato1 || defaultImages.catering.hero,
            titleId: 'c_gallery_2_title',
            titleDefault: 'Platos gourmet',
            categoryId: 'c_gallery_2_category',
            categoryDefault: 'Gastronomía',
            likes: 189,
            id: 'c_gallery_2'
        },
        {
            url: defaultImages.catering?.plato2 || defaultImages.catering.hero,
            titleId: 'c_gallery_3_title',
            titleDefault: 'Decoración de mesas',
            categoryId: 'c_gallery_3_category',
            categoryDefault: 'Eventos',
            likes: 156,
            id: 'c_gallery_3'
        },
        {
            url: defaultImages.catering.about,
            titleId: 'c_gallery_4_title',
            titleDefault: 'Cena ejecutiva',
            categoryId: 'c_gallery_4_category',
            categoryDefault: 'Empresarial',
            likes: 312,
            id: 'c_gallery_4'
        },
        {
            url: defaultImages.catering?.plato3 || defaultImages.catering.hero,
            titleId: 'c_gallery_5_title',
            titleDefault: 'Cócteles de autor',
            categoryId: 'c_gallery_5_category',
            categoryDefault: 'Bebidas',
            likes: 267,
            id: 'c_gallery_5'
        },
        {
            url: defaultImages.catering?.buffet || defaultImages.catering.hero,
            titleId: 'c_gallery_6_title',
            titleDefault: 'Postres artesanales',
            categoryId: 'c_gallery_6_category',
            categoryDefault: 'Repostería',
            likes: 178,
            id: 'c_gallery_6'
        },
    ];

    const openLightbox = (index: number) => {
        setSelectedImage(index);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const goPrevious = () => {
        if (selectedImage !== null && selectedImage > 0) {
            setSelectedImage(selectedImage - 1);
        }
    };

    const goNext = () => {
        if (selectedImage !== null && selectedImage < images.length - 1) {
            setSelectedImage(selectedImage + 1);
        }
    };

    return (
        <section id="gallery" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-900 dark:text-amber-100">
                        <EditableText
                            elementId="c_gallery_title_1"
                            defaultText="Galería de"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="c_gallery_title_2"
                                defaultText="Experiencias"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-amber-700 dark:text-amber-300">
                        <EditableText
                            elementId="c_gallery_description"
                            defaultText="Momentos inolvidables que hemos creado para nuestros clientes."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            onClick={() => openLightbox(index)}
                            className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-square"
                        >
                            <img
                                src={getImageUrl(image.id, image.url)}
                                alt={image.titleDefault}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={() => handleImageError(image.id)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <p className="text-white text-lg font-bold">
                                        <EditableText
                                            elementId={image.titleId}
                                            defaultText={image.titleDefault}
                                            tag="span"
                                        />
                                    </p>
                                    <p className="text-amber-300 text-sm">
                                        <EditableText
                                            elementId={image.categoryId}
                                            defaultText={image.categoryDefault}
                                            tag="span"
                                        />
                                    </p>
                                </div>
                            </div>

                            {/* Badge de categoría */}
                            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                                <EditableText
                                    elementId={image.categoryId}
                                    defaultText={image.categoryDefault}
                                    tag="span"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lightbox */}
                {selectedImage !== null && (
                    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors"
                        >
                            <X size={32} />
                        </button>

                        {selectedImage > 0 && (
                            <button
                                onClick={goPrevious}
                                className="absolute left-4 text-white hover:text-amber-400 transition-colors"
                            >
                                <ChevronLeft size={48} />
                            </button>
                        )}

                        {selectedImage < images.length - 1 && (
                            <button
                                onClick={goNext}
                                className="absolute right-4 text-white hover:text-amber-400 transition-colors"
                            >
                                <ChevronRight size={48} />
                            </button>
                        )}

                        <img
                            src={getImageUrl(images[selectedImage].id, images[selectedImage].url)}
                            alt={images[selectedImage].titleDefault}
                            className="max-h-[90vh] max-w-[90vw] object-contain"
                            onError={() => handleImageError(images[selectedImage].id)}
                        />

                        <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/50 backdrop-blur-sm py-4 mx-auto max-w-2xl rounded-full">
                            <p className="text-xl font-bold">
                                <EditableText
                                    elementId={images[selectedImage].titleId}
                                    defaultText={images[selectedImage].titleDefault}
                                    tag="span"
                                />
                            </p>
                            <p className="text-amber-300">
                                <EditableText
                                    elementId={images[selectedImage].categoryId}
                                    defaultText={images[selectedImage].categoryDefault}
                                    tag="span"
                                />
                            </p>
                            <div className="flex items-center justify-center mt-2">
                                <Heart className="w-4 h-4 mr-1 text-red-400 fill-red-400" />
                                <span>{images[selectedImage].likes} likes</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CateringGallery;