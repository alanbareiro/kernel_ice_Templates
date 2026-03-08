import { Coffee, Droplet, Eye, Scissors, Sparkles, Wand2 } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const SalonServices: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#db2777',
        secondary: '#be185d',
        accent: '#9d174d',
    };

    const services = [
        {
            id: 'serv_1',
            icon: <Scissors className="w-8 h-8" />,
            titleId: 'sl_service_1_title', titleDefault: 'Corte y Peinado',
            descId: 'sl_service_1_desc', descDefault: 'Corte personalizado según tu estilo, peinados para toda ocasión.',
            imageId: 'sl_service_1_image',
        },
        {
            id: 'serv_2',
            icon: <Sparkles className="w-8 h-8" />,
            titleId: 'sl_service_2_title', titleDefault: 'Coloración',
            descId: 'sl_service_2_desc', descDefault: 'Balayage, mechas, reflejos y coloración completa con productos de calidad.',
            imageId: 'sl_service_2_image',
        },
        {
            id: 'serv_3',
            icon: <Eye className="w-8 h-8" />,
            titleId: 'sl_service_3_title', titleDefault: 'Pestañas y Cejas',
            descId: 'sl_service_3_desc', descDefault: 'Lifting de pestañas, extensiones, perfilado y depilación de cejas.',
            imageId: 'sl_service_3_image',
        },
        {
            id: 'serv_4',
            icon: <Wand2 className="w-8 h-8" />,
            titleId: 'sl_service_4_title', titleDefault: 'Maquillaje',
            descId: 'sl_service_4_desc', descDefault: 'Maquillaje social, de novia, artístico y automaquillaje.',
            imageId: 'sl_service_4_image',
        },
        {
            id: 'serv_5',
            icon: <Droplet className="w-8 h-8" />,
            titleId: 'sl_service_5_title', titleDefault: 'Tratamientos faciales',
            descId: 'sl_service_5_desc', descDefault: 'Limpieza profunda, hidratación, anti-age y más.',
            imageId: 'sl_service_5_image',
        },
        {
            id: 'serv_6',
            icon: <Coffee className="w-8 h-8" />,
            titleId: 'sl_service_6_title', titleDefault: 'Manicuría y Pedicuría',
            descId: 'sl_service_6_desc', descDefault: 'Esmaltado tradicional, semipermanente, capping y spa de pies.',
            imageId: 'sl_service_6_image',
        },
    ];

    return (
        <section id="services" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-pink-900 dark:text-pink-100">
                        <EditableText elementId="sl_services_title_1" defaultText="Nuestros" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="sl_services_title_2" defaultText="servicios" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-pink-700 dark:text-pink-300">
                        <EditableText elementId="sl_services_description" defaultText="Ofrecemos una amplia gama de tratamientos de belleza para que te sientas única." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div key={service.id} className="group bg-pink-50 dark:bg-pink-900/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                            <div className="h-48 overflow-hidden">
                                <EditableImage elementId={service.imageId} defaultImage="" alt={service.titleDefault} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" category="beauty" />
                            </div>
                            <div className="p-6">
                                <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-pink-900 dark:text-pink-100">
                                    <EditableText elementId={service.titleId} defaultText={service.titleDefault} tag="span" />
                                </h3>
                                <p className="text-pink-700 dark:text-pink-300">
                                    <EditableText elementId={service.descId} defaultText={service.descDefault} tag="span" />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SalonServices;