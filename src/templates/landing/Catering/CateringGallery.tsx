import { ChevronLeft, ChevronRight, Heart, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

const DEFAULT_IMAGES = [
    { id: 'img1', imageUrl: '', title: 'Buffet de bodas', category: 'Eventos', likes: '234', visible: true },
    { id: 'img2', imageUrl: '', title: 'Platos gourmet', category: 'Gastronomía', likes: '189', visible: true },
    { id: 'img3', imageUrl: '', title: 'Decoración de mesas', category: 'Eventos', likes: '156', visible: true },
    { id: 'img4', imageUrl: '', title: 'Cena ejecutiva', category: 'Empresarial', likes: '312', visible: true },
    { id: 'img5', imageUrl: '', title: 'Cócteles de autor', category: 'Bebidas', likes: '267', visible: true },
    { id: 'img6', imageUrl: '', title: 'Postres artesanales', category: 'Repostería', likes: '178', visible: true }
];

const CateringGallery = () => {
    const { template } = useTemplate();
    const [images, setImages] = useState(DEFAULT_IMAGES);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    useEffect(() => {
        const stored = template?.texts?.['c_gallery_image_'];
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) setImages(parsed);
            } catch (e) { }
        } else setImages(DEFAULT_IMAGES);
    }, [template?.texts]);

    const visibleImages = images.filter(img => img.visible !== false);

    const openLightbox = (index: number) => setSelectedImage(index);
    const closeLightbox = () => setSelectedImage(null);
    const goPrevious = () => selectedImage !== null && selectedImage > 0 && setSelectedImage(selectedImage - 1);
    const goNext = () => selectedImage !== null && selectedImage < visibleImages.length - 1 && setSelectedImage(selectedImage + 1);

    return (
        <section id="gallery" className="section-padding" style={{ backgroundColor: sectionColors.featuresBackground }}>
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-bold mb-6" style={{ fontSize: typography.featuresTitleSize, color: sectionColors.featuresTitleColor }}>
                        <EditableText elementId="c_gallery_title_1" defaultText="Galería de" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}>
                            <EditableText elementId="c_gallery_title_2" defaultText="Experiencias" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl" style={{ color: sectionColors.bodyTextColor }}>
                        <EditableText elementId="c_gallery_description" defaultText="Momentos inolvidables que hemos creado para nuestros clientes." tag="span" />
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleImages.map((img, idx) => (
                        <div key={img.id || idx} onClick={() => openLightbox(idx)} className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-square">
                            <img src={img.imageUrl || `https://via.placeholder.com/800x600?text=${encodeURIComponent(img.title)}`} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <p className="text-white text-lg font-bold">{img.title}</p>
                                    <p className="text-amber-300 text-sm">{img.category}</p>
                                </div>
                            </div>
                            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">{img.category}</div>
                        </div>
                    ))}
                </div>

                {selectedImage !== null && visibleImages[selectedImage] && (
                    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
                        <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors"><X size={32} /></button>
                        {selectedImage > 0 && <button onClick={goPrevious} className="absolute left-4 text-white hover:text-amber-400"><ChevronLeft size={48} /></button>}
                        {selectedImage < visibleImages.length - 1 && <button onClick={goNext} className="absolute right-4 text-white hover:text-amber-400"><ChevronRight size={48} /></button>}
                        <img src={visibleImages[selectedImage].imageUrl || `https://via.placeholder.com/800x600?text=${encodeURIComponent(visibleImages[selectedImage].title)}`} alt={visibleImages[selectedImage].title} className="max-h-[90vh] max-w-[90vw] object-contain" />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/50 backdrop-blur-sm py-4 mx-auto max-w-2xl rounded-full">
                            <p className="text-xl font-bold">{visibleImages[selectedImage].title}</p>
                            <p className="text-amber-300">{visibleImages[selectedImage].category}</p>
                            <div className="flex items-center justify-center mt-2"><Heart className="w-4 h-4 mr-1 text-red-400 fill-red-400" />{visibleImages[selectedImage].likes} likes</div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CateringGallery;