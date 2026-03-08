import { ChevronLeft, ChevronRight, Heart, X } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const SalonGallery: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#db2777',
        secondary: '#be185d',
        accent: '#9d174d',
    };
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const images = [
        { id: 'sl_gallery_1', titleId: 'sl_gallery_1_title', titleDefault: 'Corte y peinado', categoryId: 'sl_gallery_1_cat', categoryDefault: 'Peinados', likes: 234 },
        { id: 'sl_gallery_2', titleId: 'sl_gallery_2_title', titleDefault: 'Balayage', categoryId: 'sl_gallery_2_cat', categoryDefault: 'Color', likes: 189 },
        { id: 'sl_gallery_3', titleId: 'sl_gallery_3_title', titleDefault: 'Maquillaje de novia', categoryId: 'sl_gallery_3_cat', categoryDefault: 'Maquillaje', likes: 312 },
        { id: 'sl_gallery_4', titleId: 'sl_gallery_4_title', titleDefault: 'Nuestro espacio', categoryId: 'sl_gallery_4_cat', categoryDefault: 'Local', likes: 156 },
        { id: 'sl_gallery_5', titleId: 'sl_gallery_5_title', titleDefault: 'Manicuría', categoryId: 'sl_gallery_5_cat', categoryDefault: 'Uñas', likes: 267 },
        { id: 'sl_gallery_6', titleId: 'sl_gallery_6_title', titleDefault: 'Tratamiento facial', categoryId: 'sl_gallery_6_cat', categoryDefault: 'Facial', likes: 198 },
    ];

    const openLightbox = (index: number) => setSelectedImage(index);
    const closeLightbox = () => setSelectedImage(null);
    const goPrevious = () => selectedImage !== null && selectedImage > 0 && setSelectedImage(selectedImage - 1);
    const goNext = () => selectedImage !== null && selectedImage < images.length - 1 && setSelectedImage(selectedImage + 1);

    return (
        <section id="gallery" className="section-padding bg-pink-50 dark:bg-pink-950">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-pink-900 dark:text-pink-100">
                        <EditableText elementId="sl_gallery_title_1" defaultText="Galería de" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="sl_gallery_title_2" defaultText="inspiración" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-pink-700 dark:text-pink-300">
                        <EditableText elementId="sl_gallery_description" defaultText="Mirá algunos de nuestros trabajos y animate a cambiar." tag="span" />
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((img, index) => (
                        <div key={img.id} onClick={() => openLightbox(index)} className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-square">
                            <EditableImage elementId={img.id} defaultImage="" alt={img.titleDefault} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" category="beauty" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <p className="text-lg font-bold"><EditableText elementId={img.titleId} defaultText={img.titleDefault} tag="span" /></p>
                                    <p className="text-pink-300 text-sm"><EditableText elementId={img.categoryId} defaultText={img.categoryDefault} tag="span" /></p>
                                    <div className="flex items-center mt-2"><Heart className="w-4 h-4 mr-1 text-pink-400" /><span>{img.likes}</span></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lightbox */}
                {selectedImage !== null && (
                    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
                        <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-pink-400 transition-colors"><X size={32} /></button>
                        {selectedImage > 0 && <button onClick={goPrevious} className="absolute left-4 text-white hover:text-pink-400"><ChevronLeft size={48} /></button>}
                        {selectedImage < images.length - 1 && <button onClick={goNext} className="absolute right-4 text-white hover:text-pink-400"><ChevronRight size={48} /></button>}
                        <img src={images[selectedImage].id} alt={images[selectedImage].titleDefault} className="max-h-[90vh] max-w-[90vw] object-contain" />
                    </div>
                )}
            </div>
        </section>
    );
};

export default SalonGallery;