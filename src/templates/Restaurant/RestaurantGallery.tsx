import { ChevronLeft, ChevronRight, Heart, X } from 'lucide-react';
import { useState } from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const RestaurantGallery = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#dc2626',
        secondary: '#b91c1c',
        accent: '#7f1d1d',
    };
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const images = [
        {
            url: defaultImages.restaurant.hero,
            titleId: 'r_gallery_1_title',
            titleDefault: 'Plato de autor',
            categoryId: 'r_gallery_1_category',
            categoryDefault: 'Platos',
            likes: 234,
            id: 'r_gallery_1'
        },
        {
            url: defaultImages.restaurant.about|| defaultImages.restaurant.interior,
            titleId: 'r_gallery_2_title',
            titleDefault: 'Ambiente del salón',
            categoryId: 'r_gallery_2_category',
            categoryDefault: 'Ambientes',
            likes: 189,
            id: 'r_gallery_2'
        },
        {
            url: defaultImages.restaurant.interior,
            titleId: 'r_gallery_3_title',
            titleDefault: 'Preparación en vivo',
            categoryId: 'r_gallery_3_category',
            categoryDefault: 'Cocina',
            likes: 156,
            id: 'r_gallery_3'
        },
        {
            url: defaultImages.catering.buffet,
            titleId: 'r_gallery_4_title',
            titleDefault: 'Buffet de postres',
            categoryId: 'r_gallery_4_category',
            categoryDefault: 'Postres',
            likes: 312,
            id: 'r_gallery_4'
        },
        {
            url: defaultImages.restaurant.wine,
            titleId: 'r_gallery_5_title',
            titleDefault: 'Cava de vinos',
            categoryId: 'r_gallery_5_category',
            categoryDefault: 'Bodega',
            likes: 98,
            id: 'r_gallery_5'
        },
        {
            url: defaultImages.catering.plato2,
            titleId: 'r_gallery_6_title',
            titleDefault: 'Eventos privados',
            categoryId: 'r_gallery_6_category',
            categoryDefault: 'Eventos',
            likes: 145,
            id: 'r_gallery_6'
        },
        {
            url: defaultImages.catering.plato3,
            titleId: 'r_gallery_7_title',
            titleDefault: 'Cócteles de autor',
            categoryId: 'r_gallery_7_category',
            categoryDefault: 'Bebidas',
            likes: 267,
            id: 'r_gallery_7'
        },
        {
            url: defaultImages.restaurant.terrace,
            titleId: 'r_gallery_8_title',
            titleDefault: 'Terraza al aire libre',
            categoryId: 'r_gallery_8_category',
            categoryDefault: 'Ambientes',
            likes: 178,
            id: 'r_gallery_8'
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
        <section id="gallery" className="section-padding bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-900 dark:text-red-100">
                        <EditableText
                            elementId="r_gallery_title_1"
                            defaultText="Galería de"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="r_gallery_title_2"
                                defaultText="Momentos"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-red-700 dark:text-red-300">
                        <EditableText
                            elementId="r_gallery_description"
                            defaultText="Capturamos la esencia de nuestra cocina y el amor de nuestros comensales."
                            tag="span"
                        />
                    </p>
                </div>

                {/* Grid de imágenes */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            onClick={() => openLightbox(index)}
                            className="group relative break-inside-avoid cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <EditableImage
                                elementId={image.id}
                                defaultImage={image.url}
                                alt={image.titleDefault}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                                category="restaurant"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-xl font-bold mb-1">
                                        <EditableText
                                            elementId={image.titleId}
                                            defaultText={image.titleDefault}
                                            tag="span"
                                        />
                                    </h3>
                                    <p className="text-sm mb-2" style={{ color: colors.primary }}>
                                        <EditableText
                                            elementId={image.categoryId}
                                            defaultText={image.categoryDefault}
                                            tag="span"
                                        />
                                    </p>
                                    <div className="flex items-center">
                                        <Heart className="w-4 h-4 mr-1" style={{ color: colors.primary }} />
                                        <span className="text-sm">{image.likes} likes</span>
                                    </div>
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
                            className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors z-10"
                        >
                            <X size={32} />
                        </button>

                        {selectedImage > 0 && (
                            <button
                                onClick={goPrevious}
                                className="absolute left-4 text-white hover:text-red-400 transition-colors z-10"
                            >
                                <ChevronLeft size={48} />
                            </button>
                        )}

                        {selectedImage < images.length - 1 && (
                            <button
                                onClick={goNext}
                                className="absolute right-4 text-white hover:text-red-400 transition-colors z-10"
                            >
                                <ChevronRight size={48} />
                            </button>
                        )}

                        <img
                            src={images[selectedImage].url}
                            alt={images[selectedImage].titleDefault}
                            className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl"
                        />

                        <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/50 backdrop-blur-sm py-4 mx-auto max-w-2xl rounded-full">
                            <p className="text-xl font-bold">
                                <EditableText
                                    elementId={images[selectedImage].titleId}
                                    defaultText={images[selectedImage].titleDefault}
                                    tag="span"
                                />
                            </p>
                            <p className="text-red-300">
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

export default RestaurantGallery;