import { Camera, Globe, Mail, Palette, Search, ShoppingCart, Smartphone, TrendingUp } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const DigitalServices: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#0891b2',
        secondary: '#0e7490',
        accent: '#155e75',
    };

    const services = [
        {
            icon: <Globe className="w-8 h-8" />,
            titleId: 'di_service_1_title', titleDefault: 'Diseño Web',
            descId: 'di_service_1_desc', descDefault: 'Sitios web modernos, responsivos y optimizados para conversión.',
        },
        {
            icon: <Smartphone className="w-8 h-8" />,
            titleId: 'di_service_2_title', titleDefault: 'Apps Móviles',
            descId: 'di_service_2_desc', descDefault: 'Aplicaciones nativas y multiplataforma para iOS y Android.',
        },
        {
            icon: <Palette className="w-8 h-8" />,
            titleId: 'di_service_3_title', titleDefault: 'Branding',
            descId: 'di_service_3_desc', descDefault: 'Identidad visual, logotipos y manual de marca.',
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            titleId: 'di_service_4_title', titleDefault: 'Marketing Digital',
            descId: 'di_service_4_desc', descDefault: 'Estrategias completas para aumentar tu visibilidad online.',
        },
        {
            icon: <Search className="w-8 h-8" />,
            titleId: 'di_service_5_title', titleDefault: 'SEO',
            descId: 'di_service_5_desc', descDefault: 'Posicionamiento orgánico en buscadores.',
        },
        {
            icon: <Mail className="w-8 h-8" />,
            titleId: 'di_service_6_title', titleDefault: 'Email Marketing',
            descId: 'di_service_6_desc', descDefault: 'Campañas de email que convierten.',
        },
        {
            icon: <Camera className="w-8 h-8" />,
            titleId: 'di_service_7_title', titleDefault: 'Contenido Audiovisual',
            descId: 'di_service_7_desc', descDefault: 'Fotografía, video y motion graphics.',
        },
        {
            icon: <ShoppingCart className="w-8 h-8" />,
            titleId: 'di_service_8_title', titleDefault: 'E-commerce',
            descId: 'di_service_8_desc', descDefault: 'Tiendas online con todas las funcionalidades.',
        },
    ];

    return (
        <section id="services" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-900 dark:text-cyan-100">
                        <EditableText elementId="di_services_title_1" defaultText="Nuestros" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="di_services_title_2" defaultText="servicios" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-cyan-700 dark:text-cyan-300">
                        <EditableText elementId="di_services_description" defaultText="Soluciones integrales para tu presencia digital." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div key={index} className="group p-6 rounded-xl border border-cyan-200 dark:border-cyan-800 hover:shadow-xl transition-all">
                            <div className="w-14 h-14 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                {service.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-cyan-900 dark:text-cyan-100">
                                <EditableText elementId={service.titleId} defaultText={service.titleDefault} tag="span" />
                            </h3>
                            <p className="text-sm text-cyan-700 dark:text-cyan-300">
                                <EditableText elementId={service.descId} defaultText={service.descDefault} tag="span" />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DigitalServices;
