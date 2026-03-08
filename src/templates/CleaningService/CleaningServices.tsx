import { Bug, Building2, Car, Droplets, Home, Sofa, Sparkles, Wind } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const CleaningServices: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#0284c7',
        secondary: '#0369a1',
        accent: '#075985',
    };

    const services = [
        {
            id: 'serv_1',
            icon: <Home className="w-8 h-8" />,
            titleId: 'cl_service_1_title', titleDefault: 'Limpieza de Hogares',
            descId: 'cl_service_1_desc', descDefault: 'Limpieza general de casas y departamentos. Frecuencia semanal, quincenal o mensual.',
            imageId: 'cl_service_1_image',
        },
        {
            id: 'serv_2',
            icon: <Building2 className="w-8 h-8" />,
            titleId: 'cl_service_2_title', titleDefault: 'Limpieza de Oficinas',
            descId: 'cl_service_2_desc', descDefault: 'Mantenimiento diario o semanal para empresas. Personal uniformado y supervisado.',
            imageId: 'cl_service_2_image',
        },
        {
            id: 'serv_3',
            icon: <Sparkles className="w-8 h-8" />,
            titleId: 'cl_service_3_title', titleDefault: 'Limpieza Profunda',
            descId: 'cl_service_3_desc', descDefault: 'Limpieza detallada de cada rincón. Ideal para mudanzas o post-obra.',
            imageId: 'cl_service_3_image',
        },
        {
            id: 'serv_4',
            icon: <Wind className="w-8 h-8" />,
            titleId: 'cl_service_4_title', titleDefault: 'Limpieza de Alfombras',
            descId: 'cl_service_4_desc', descDefault: 'Lavado profesional con máquinas especiales. Eliminación de manchas y ácaros.',
            imageId: 'cl_service_4_image',
        },
        {
            id: 'serv_5',
            icon: <Sofa className="w-8 h-8" />,
            titleId: 'cl_service_5_title', titleDefault: 'Limpieza de Tapizados',
            descId: 'cl_service_5_desc', descDefault: 'Lavado de sillones, sillas y colchones. Productos hipoalergénicos.',
            imageId: 'cl_service_5_image',
        },
        {
            id: 'serv_6',
            icon: <Droplets className="w-8 h-8" />,
            titleId: 'cl_service_6_title', titleDefault: 'Limpieza de Vidrios',
            descId: 'cl_service_6_desc', descDefault: 'Limpieza de ventanas, puertas vidriadas y espejos. Sin dejar marcas.',
            imageId: 'cl_service_6_image',
        },
        {
            id: 'serv_7',
            icon: <Bug className="w-8 h-8" />,
            titleId: 'cl_service_7_title', titleDefault: 'Limpieza Post-obra',
            descId: 'cl_service_7_desc', descDefault: 'Remoción de polvo, restos de materiales y limpieza final después de la construcción.',
            imageId: 'cl_service_7_image',
        },
        {
            id: 'serv_8',
            icon: <Car className="w-8 h-8" />,
            titleId: 'cl_service_8_title', titleDefault: 'Limpieza de Coches',
            descId: 'cl_service_8_desc', descDefault: 'Lavado interior y exterior de vehículos. Tapizados y alfombras.',
            imageId: 'cl_service_8_image',
        },
    ];

    return (
        <section id="services" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-sky-900 dark:text-sky-100">
                        <EditableText elementId="cl_services_title_1" defaultText="Nuestros" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="cl_services_title_2" defaultText="servicios" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-sky-700 dark:text-sky-300">
                        <EditableText elementId="cl_services_description" defaultText="Soluciones profesionales para todo tipo de espacios." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <div key={service.id} className="group p-6 rounded-xl border border-sky-200 dark:border-sky-800 hover:shadow-xl transition-all">
                            <div className="w-14 h-14 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                {service.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-sky-900 dark:text-sky-100">
                                <EditableText elementId={service.titleId} defaultText={service.titleDefault} tag="span" />
                            </h3>
                            <p className="text-sm text-sky-700 dark:text-sky-300 leading-relaxed">
                                <EditableText elementId={service.descId} defaultText={service.descDefault} tag="span" />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CleaningServices;