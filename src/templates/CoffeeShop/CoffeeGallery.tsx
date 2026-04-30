// src/templates/CoffeeShop/CoffeeGallery.tsx
import { ChevronLeft, ChevronRight, Heart, X } from 'lucide-react';
import React, { useState } from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const CoffeeGallery: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const galleryImages = {
        gallery1: defaultImages.coffee.gallery1,
        gallery2: defaultImages.coffee.gallery2,
        gallery3: defaultImages.coffee.gallery3,
        gallery4: defaultImages.coffee.gallery1,
        gallery5: defaultImages.coffee.gallery2,
        gallery6: defaultImages.coffee.gallery3,
    };

    const images = [
        { id: 'cf_gallery_1', titleId: 'cf_gallery_1_title', titleDefault: 'Espresso perfecto', categoryId: 'cf_gallery_1_cat', categoryDefault: 'Café', likes: 234, defaultImage: galleryImages.gallery1 },
        { id: 'cf_gallery_2', titleId: 'cf_gallery_2_title', titleDefault: 'Nuestro local', categoryId: 'cf_gallery_2_cat', categoryDefault: 'Ambiente', likes: 189, defaultImage: galleryImages.gallery2 },
        { id: 'cf_gallery_3', titleId: 'cf_gallery_3_title', titleDefault: 'Desayuno completo', categoryId: 'cf_gallery_3_cat', categoryDefault: 'Comidas', likes: 312, defaultImage: galleryImages.gallery3 },
        { id: 'cf_gallery_4', titleId: 'cf_gallery_4_title', titleDefault: 'Latte art', categoryId: 'cf_gallery_4_cat', categoryDefault: 'Café', likes: 267, defaultImage: galleryImages.gallery4 },
        { id: 'cf_gallery_5', titleId: 'cf_gallery_5_title', titleDefault: 'Torta de chocolate', categoryId: 'cf_gallery_5_cat', categoryDefault: 'Postres', likes: 198, defaultImage: galleryImages.gallery5 },
        { id: 'cf_gallery_6', titleId: 'cf_gallery_6_title', titleDefault: 'Evento de café', categoryId: 'cf_gallery_6_cat', categoryDefault: 'Eventos', likes: 145, defaultImage: galleryImages.gallery6 },
    ];

    const openLightbox = (index: number) => setSelectedImage(index);
    const closeLightbox = () => setSelectedImage(null);
    const goPrevious = () => selectedImage !== null && selectedImage > 0 && setSelectedImage(selectedImage - 1);
    const goNext = () => selectedImage !== null && selectedImage < images.length - 1 && setSelectedImage(selectedImage + 1);

    return (
        <section
            id="gallery"
            className="section-padding"
            style={{ backgroundColor: sectionColors.featuresBackground }}
        >
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2
                        className="font-bold mb-6"
                        style={{
                            fontSize: typography.sectionTitleSize,
                            color: sectionColors.featuresTitleColor
                        }}
                    >
                        <EditableText
                            elementId="cf_gallery_title_1"
                            defaultText="Galería de"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="cf_gallery_title_2"
                                defaultText="momentos"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText
                            elementId="cf_gallery_description"
                            defaultText="Capturamos la esencia de nuestro café y el amor de nuestros clientes."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((img, index) => (
                        <div
                            key={img.id}
                            onClick={() => openLightbox(index)}
                            className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-square"
                            style={{ backgroundColor: sectionColors.featuresCardBackground }}
                        >
                            <EditableImage
                                elementId={img.id}
                                defaultImage={img.defaultImage}
                                alt={img.titleDefault}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                category="coffee"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <p className="text-lg font-bold">
                                        <EditableText elementId={img.titleId} defaultText={img.titleDefault} tag="span" />
                                    </p>
                                    <p className="text-amber-300 text-sm">
                                        <EditableText elementId={img.categoryId} defaultText={img.categoryDefault} tag="span" />
                                    </p>
                                    <div className="flex items-center mt-2">
                                        <Heart className="w-4 h-4 mr-1 text-red-400" /><span>{img.likes}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedImage !== null && (
                    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
                        <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors"><X size={32} /></button>
                        {selectedImage > 0 && <button onClick={goPrevious} className="absolute left-4 text-white hover:text-amber-400"><ChevronLeft size={48} /></button>}
                        {selectedImage < images.length - 1 && <button onClick={goNext} className="absolute right-4 text-white hover:text-amber-400"><ChevronRight size={48} /></button>}
                        <img src={images[selectedImage].defaultImage} alt={images[selectedImage].titleDefault} className="max-h-[90vh] max-w-[90vw] object-contain" />
                    </div>
                )}
            </div>
        </section>
    );
};

export default CoffeeGallery;