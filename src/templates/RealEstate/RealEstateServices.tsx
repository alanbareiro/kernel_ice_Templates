import { Calculator, FileText, Handshake, Home, Shield, TrendingUp } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const RealEstateServices: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#2d6a4f',
        secondary: '#1e4b3a',
        accent: '#0d2f24',
    };

    const services = [
        {
            icon: <Home className="w-8 h-8" />,
            titleId: 're_service_1_title', titleDefault: 'Compra y Venta',
            descId: 're_service_1_desc', descDefault: 'Asesoramiento integral para comprar o vender tu propiedad.',
        },
        {
            icon: <FileText className="w-8 h-8" />,
            titleId: 're_service_2_title', titleDefault: 'Alquileres',
            descId: 're_service_2_desc', descDefault: 'Gestión de alquileres temporarios y permanentes.',
        },
        {
            icon: <Handshake className="w-8 h-8" />,
            titleId: 're_service_3_title', titleDefault: 'Tasaciones',
            descId: 're_service_3_desc', descDefault: 'Tasaciones profesionales con valores de mercado actualizados.',
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            titleId: 're_service_4_title', titleDefault: 'Inversiones',
            descId: 're_service_4_desc', descDefault: 'Asesoramiento para inversores en proyectos inmobiliarios.',
        },
        {
            icon: <Shield className="w-8 h-8" />,
            titleId: 're_service_5_title', titleDefault: 'Asesoría Legal',
            descId: 're_service_5_desc', descDefault: 'Asesoramiento legal en todas las etapas de la operación.',
        },
        {
            icon: <Calculator className="w-8 h-8" />,
            titleId: 're_service_6_title', titleDefault: 'Financiación',
            descId: 're_service_6_desc', descDefault: 'Asesoramiento en créditos hipotecarios y financiación.',
        },
    ];

    return (
        <section id="services" className="section-padding bg-emerald-50 dark:bg-emerald-950">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-900 dark:text-emerald-100">
                        <EditableText elementId="re_services_title_1" defaultText="Nuestros" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="re_services_title_2" defaultText="servicios" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-emerald-700 dark:text-emerald-300">
                        <EditableText elementId="re_services_description" defaultText="Te acompañamos en todo el proceso inmobiliario." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="group p-8 bg-white dark:bg-emerald-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800 hover:shadow-xl transition-all">
                            <div className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-emerald-900 dark:text-emerald-100">
                                <EditableText elementId={service.titleId} defaultText={service.titleDefault} tag="span" />
                            </h3>
                            <p className="text-emerald-700 dark:text-emerald-300">
                                <EditableText elementId={service.descId} defaultText={service.descDefault} tag="span" />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RealEstateServices;