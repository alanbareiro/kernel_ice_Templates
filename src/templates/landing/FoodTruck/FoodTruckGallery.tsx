// src/templates/FoodTruck/FoodTruckGallery.tsx
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import React, { useState } from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const FoodTruckGallery: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const galleryImages = {
        gallery1: defaultImages.foodtruck.hero,
        gallery2: defaultImages.foodtruck.burger1,
        gallery3: defaultImages.foodtruck.taco1,
        gallery4: defaultImages.foodtruck.hero,
        gallery5: defaultImages.foodtruck.burger2,
        gallery6: defaultImages.foodtruck.side1,
    };

    const images = [
        { id: 'ft_gallery_1', titleId: 'ft_gallery_1_title', titleDefault: 'Nuestro food truck', categoryId: 'ft_gallery_1_cat', categoryDefault: 'El truck', defaultImage: galleryImages.gallery1 },
        { id: 'ft_gallery_2', titleId: 'ft_gallery_2_title', titleDefault: 'Hamburguesa clásica', categoryId: 'ft_gallery_2_cat', categoryDefault: 'Hamburguesas', defaultImage: galleryImages.gallery2 },
        { id: 'ft_gallery_3', titleId: 'ft_gallery_3_title', titleDefault: 'Preparando tacos', categoryId: 'ft_gallery_3_cat', categoryDefault: 'Tacos', defaultImage: galleryImages.gallery3 },
        { id: 'ft_gallery_4', titleId: 'ft_gallery_4_title', titleDefault: 'Noche en Plaza Italia', categoryId: 'ft_gallery_4_cat', categoryDefault: 'Eventos', defaultImage: galleryImages.gallery4 },
        { id: 'ft_gallery_5', titleId: 'ft_gallery_5_title', titleDefault: 'Cheddar & Bacon', categoryId: 'ft_gallery_5_cat', categoryDefault: 'Hamburguesas', defaultImage: galleryImages.gallery5 },
        { id: 'ft_gallery_6', titleId: 'ft_gallery_6_title', titleDefault: 'Nuestro equipo', categoryId: 'ft_gallery_6_cat', categoryDefault: 'Equipo', defaultImage: galleryImages.gallery6 },
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
                        <EditableText elementId="ft_gallery_title_1" defaultText="Galería de" tag="span" />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="ft_gallery_title_2" defaultText="sabores" tag="span" />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText elementId="ft_gallery_description" defaultText="Momentos de nuestra comida sobre ruedas." tag="span" />
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
                                category="foodtruck"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <p className="text-lg font-bold">
                                        <EditableText elementId={img.titleId} defaultText={img.titleDefault} tag="span" />
                                    </p>
                                    <p className="text-orange-300 text-sm">
                                        <EditableText elementId={img.categoryId} defaultText={img.categoryDefault} tag="span" />
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lightbox */}
                {selectedImage !== null && (
                    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
                        <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-orange-400 transition-colors"><X size={32} /></button>
                        {selectedImage > 0 && <button onClick={goPrevious} className="absolute left-4 text-white hover:text-orange-400"><ChevronLeft size={48} /></button>}
                        {selectedImage < images.length - 1 && <button onClick={goNext} className="absolute right-4 text-white hover:text-orange-400"><ChevronRight size={48} /></button>}
                        <img src={images[selectedImage].defaultImage} alt={images[selectedImage].titleDefault} className="max-h-[90vh] max-w-[90vw] object-contain" />
                    </div>
                )}
            </div>
        </section>
    );
};

export default FoodTruckGallery;