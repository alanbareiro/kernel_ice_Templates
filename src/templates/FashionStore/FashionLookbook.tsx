import React from 'react';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const FashionLookbook: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#000000',
        secondary: '#1f2937',
        accent: '#4b5563',
    };

    const looks = [
        { id: 'look_1', titleId: 'fa_look_1_title', titleDefault: 'Look 1 - Casual Elegante', imageId: 'fa_look_1_image' },
        { id: 'look_2', titleId: 'fa_look_2_title', titleDefault: 'Look 2 - Noche', imageId: 'fa_look_2_image' },
        { id: 'look_3', titleId: 'fa_look_3_title', titleDefault: 'Look 3 - Office', imageId: 'fa_look_3_image' },
        { id: 'look_4', titleId: 'fa_look_4_title', titleDefault: 'Look 4 - Weekend', imageId: 'fa_look_4_image' },
        { id: 'look_5', titleId: 'fa_look_5_title', titleDefault: 'Look 5 - Outfit completo', imageId: 'fa_look_5_image' },
        { id: 'look_6', titleId: 'fa_look_6_title', titleDefault: 'Look 6 - Invierno', imageId: 'fa_look_6_image' },
    ];

    return (
        <section id="lookbook" className="section-padding bg-gray-50 dark:bg-gray-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                        <EditableText elementId="fa_lookbook_title_1" defaultText="Nuestro" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="fa_lookbook_title_2" defaultText="Lookbook" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        <EditableText elementId="fa_lookbook_description" defaultText="Inspirate con nuestras combinaciones." tag="span" />
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {looks.map((look) => (
                        <div key={look.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                            <div className="aspect-[4/5] overflow-hidden">
                                <EditableImage elementId={look.imageId} defaultImage="" alt={look.titleDefault} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" category="fashion" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <p className="text-lg font-bold"><EditableText elementId={look.titleId} defaultText={look.titleDefault} tag="span" /></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FashionLookbook;