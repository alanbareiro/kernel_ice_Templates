// src/templates/Bakery/BakeryGallery.tsx
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import React, { useState } from 'react';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const BakeryGallery: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const images = [
        { id: 'bk_gallery_1', titleId: 'bk_gallery_1_title', titleDefault: 'Horneando pan', categoryId: 'bk_gallery_1_cat', categoryDefault: 'Proceso' },
        { id: 'bk_gallery_2', titleId: 'bk_gallery_2_title', titleDefault: 'Facturas recién horneadas', categoryId: 'bk_gallery_2_cat', categoryDefault: 'Facturas' },
        { id: 'bk_gallery_3', titleId: 'bk_gallery_3_title', titleDefault: 'Nuestra vidriera', categoryId: 'bk_gallery_3_cat', categoryDefault: 'Local' },
        { id: 'bk_gallery_4', titleId: 'bk_gallery_4_title', titleDefault: 'Tortas decoradas', categoryId: 'bk_gallery_4_cat', categoryDefault: 'Tortas' },
        { id: 'bk_gallery_5', titleId: 'bk_gallery_5_title', titleDefault: 'Pan de masa madre', categoryId: 'bk_gallery_5_cat', categoryDefault: 'Panes' },
        { id: 'bk_gallery_6', titleId: 'bk_gallery_6_title', titleDefault: 'Equipo de panaderos', categoryId: 'bk_gallery_6_cat', categoryDefault: 'Equipo' },
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
                        <EditableText elementId="bk_gallery_title_1" defaultText="Galería de" tag="span" />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="bk_gallery_title_2" defaultText="sabores" tag="span" />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText elementId="bk_gallery_description" defaultText="Momentos de nuestra panadería que capturan la esencia de lo artesanal." tag="span" />
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((img, index) => (
                        <div
                            key={img.id}
                            onClick={() => openLightbox(index)}
                            className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-video"
                            style={{ backgroundColor: sectionColors.featuresCardBackground }}
                        >
                            <EditableImage
                                elementId={img.id}
                                defaultImage=""
                                alt={img.titleDefault}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                category="bakery"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <p className="text-lg font-bold">
                                        <EditableText elementId={img.titleId} defaultText={img.titleDefault} tag="span" />
                                    </p>
                                    <p style={{ color: sectionColors.buttonPrimaryBackground }}>
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
                        <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-rose-400 transition-colors"><X size={32} /></button>
                        {selectedImage > 0 && <button onClick={goPrevious} className="absolute left-4 text-white hover:text-rose-400"><ChevronLeft size={48} /></button>}
                        {selectedImage < images.length - 1 && <button onClick={goNext} className="absolute right-4 text-white hover:text-rose-400"><ChevronRight size={48} /></button>}
                        <img src={images[selectedImage].id} alt={images[selectedImage].titleDefault} className="max-h-[90vh] max-w-[90vw] object-contain" />
                    </div>
                )}
            </div>
        </section>
    );
};

export default BakeryGallery;