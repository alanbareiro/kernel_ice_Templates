// src/templates/MarketingAgency/AgencyServices.tsx
import { BarChart, Camera, Code, Mail, Megaphone, PenTool, Search, Share2 } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const AgencyServices: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const services = [
        {
            icon: <Search className="w-8 h-8" />,
            titleId: 'ag_service_title_1',
            titleDefault: 'SEO',
            descId: 'ag_service_desc_1',
            descDefault: 'Optimización para motores de búsqueda. Aparecé en los primeros resultados de Google.',
        },
        {
            icon: <PenTool className="w-8 h-8" />,
            titleId: 'ag_service_title_2',
            titleDefault: 'Content Marketing',
            descId: 'ag_service_desc_2',
            descDefault: 'Creación de contenido de valor que atrae y convierte a tu audiencia.',
        },
        {
            icon: <BarChart className="w-8 h-8" />,
            titleId: 'ag_service_title_3',
            titleDefault: 'Analítica Web',
            descId: 'ag_service_desc_3',
            descDefault: 'Medición y análisis de datos para tomar decisiones estratégicas.',
        },
        {
            icon: <Share2 className="w-8 h-8" />,
            titleId: 'ag_service_title_4',
            titleDefault: 'Redes Sociales',
            descId: 'ag_service_desc_4',
            descDefault: 'Gestión profesional de redes sociales para conectar con tu audiencia.',
        },
        {
            icon: <Code className="w-8 h-8" />,
            titleId: 'ag_service_title_5',
            titleDefault: 'Desarrollo Web',
            descId: 'ag_service_desc_5',
            descDefault: 'Sitios web optimizados para conversión y experiencia de usuario.',
        },
        {
            icon: <Mail className="w-8 h-8" />,
            titleId: 'ag_service_title_6',
            titleDefault: 'Email Marketing',
            descId: 'ag_service_desc_6',
            descDefault: 'Campañas de email que generan engagement y ventas recurrentes.',
        },
        {
            icon: <Camera className="w-8 h-8" />,
            titleId: 'ag_service_title_7',
            titleDefault: 'Video Marketing',
            descId: 'ag_service_desc_7',
            descDefault: 'Producción de contenido audiovisual para potenciar tu marca.',
        },
        {
            icon: <Megaphone className="w-8 h-8" />,
            titleId: 'ag_service_title_8',
            titleDefault: 'Publicidad Digital',
            descId: 'ag_service_desc_8',
            descDefault: 'Campañas pagas en Google, Facebook, Instagram y LinkedIn.',
        },
    ];

    return (
        <section
            id="services"
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
                        <EditableText
                            elementId="ag_services_title_1"
                            defaultText="Nuestros"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="ag_services_title_2"
                                defaultText="Servicios"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText
                            elementId="ag_services_description"
                            defaultText="Soluciones integrales de marketing digital para impulsar tu negocio."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-xl border transition-all duration-300 hover:shadow-xl"
                            style={{
                                backgroundColor: sectionColors.featuresCardBackground,
                                borderColor: `${sectionColors.buttonPrimaryBackground}20`,
                            }}
                        >
                            <div
                                className="w-14 h-14 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}15`, color: sectionColors.buttonPrimaryBackground }}
                            >
                                {service.icon}
                            </div>

                            <h3
                                className="text-lg font-bold mb-2 transition-colors"
                                style={{ color: sectionColors.featuresTitleColor }}
                            >
                                <EditableText
                                    elementId={service.titleId}
                                    defaultText={service.titleDefault}
                                    tag="span"
                                />
                            </h3>

                            <p
                                className="text-sm leading-relaxed"
                                style={{ color: sectionColors.bodyTextColor }}
                            >
                                <EditableText
                                    elementId={service.descId}
                                    defaultText={service.descDefault}
                                    tag="span"
                                />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AgencyServices;