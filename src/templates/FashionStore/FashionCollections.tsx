import { ArrowRight } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const FashionCollections: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#000000',
        secondary: '#1f2937',
        accent: '#4b5563',
    };

    const collections = [
        {
            id: 'coll_1',
            nameId: 'fa_coll_1_name', nameDefault: 'Otoño/Invierno 2024',
            descId: 'fa_coll_1_desc', descDefault: 'Prendas cálidas y sofisticadas para la temporada más fría.',
            linkId: 'fa_coll_1_link', linkDefault: 'Ver colección',
            imageId: 'fa_coll_1_image',
        },
        {
            id: 'coll_2',
            nameId: 'fa_coll_2_name', nameDefault: 'Noche',
            descId: 'fa_coll_2_desc', descDefault: 'Vestidos y conjuntos para ocasiones especiales.',
            linkId: 'fa_coll_2_link', linkDefault: 'Ver colección',
            imageId: 'fa_coll_2_image',
        },
        {
            id: 'coll_3',
            nameId: 'fa_coll_3_name', nameDefault: 'Casual',
            descId: 'fa_coll_3_desc', descDefault: 'Look diario con estilo y comodidad.',
            linkId: 'fa_coll_3_link', linkDefault: 'Ver colección',
            imageId: 'fa_coll_3_image',
        },
    ];

    return (
        <section id="collections" className="section-padding bg-gray-50 dark:bg-gray-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                        <EditableText elementId="fa_collections_title_1" defaultText="Nuestras" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="fa_collections_title_2" defaultText="colecciones" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        <EditableText elementId="fa_collections_description" defaultText="Descubrí nuestras líneas de diseño exclusivas." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {collections.map((coll) => (
                        <div key={coll.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                            <div className="h-96 overflow-hidden">
                                <EditableImage elementId={coll.imageId} defaultImage="" alt={coll.nameDefault} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" category="fashion" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2"><EditableText elementId={coll.nameId} defaultText={coll.nameDefault} tag="span" /></h3>
                                <p className="text-gray-200 mb-4"><EditableText elementId={coll.descId} defaultText={coll.descDefault} tag="span" /></p>
                                <a href="#" className="inline-flex items-center text-white hover:underline">
                                    <EditableText elementId={coll.linkId} defaultText={coll.linkDefault} tag="span" />
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FashionCollections; 