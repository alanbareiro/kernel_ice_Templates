// src/templates/Architecture/ArchitectureServices.tsx
import { Building2, Home, Lightbulb, PenTool, Ruler, TreePine } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const ArchitectureServices: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const services = [
        {
            icon: <PenTool className="w-8 h-8" />,
            titleId: 'ar_service_title_1',
            titleDefault: 'Diseño Arquitectónico',
            descId: 'ar_service_desc_1',
            descDefault: 'Desarrollamos proyectos arquitectónicos personalizados, desde la conceptualización hasta los detalles constructivos.',
        },
        {
            icon: <Ruler className="w-8 h-8" />,
            titleId: 'ar_service_title_2',
            titleDefault: 'Planos y Documentación',
            descId: 'ar_service_desc_2',
            descDefault: 'Elaboramos planos técnicos, memorias descriptivas y toda la documentación necesaria para la ejecución.',
        },
        {
            icon: <Home className="w-8 h-8" />,
            titleId: 'ar_service_title_3',
            titleDefault: 'Arquitectura Residencial',
            descId: 'ar_service_desc_3',
            descDefault: 'Diseñamos viviendas unifamiliares y multifamiliares que se adaptan a tu estilo de vida.',
        },
        {
            icon: <Building2 className="w-8 h-8" />,
            titleId: 'ar_service_title_4',
            titleDefault: 'Arquitectura Comercial',
            descId: 'ar_service_desc_4',
            descDefault: 'Creamos espacios comerciales funcionales y atractivos que potencian tu negocio.',
        },
        {
            icon: <TreePine className="w-8 h-8" />,
            titleId: 'ar_service_title_5',
            titleDefault: 'Paisajismo',
            descId: 'ar_service_desc_5',
            descDefault: 'Integramos espacios verdes y exteriores armoniosos con el entorno construido.',
        },
        {
            icon: <Lightbulb className="w-8 h-8" />,
            titleId: 'ar_service_title_6',
            titleDefault: 'Diseño de Interiores',
            descId: 'ar_service_desc_6',
            descDefault: 'Diseñamos interiores que reflejan tu personalidad y optimizan la funcionalidad.',
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
                            elementId="ar_services_title_1"
                            defaultText="Nuestros"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="ar_services_title_2"
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
                            elementId="ar_services_description"
                            defaultText="Ofrecemos soluciones integrales para cada etapa de tu proyecto."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl border hover:shadow-xl transition-all duration-300"
                            style={{
                                backgroundColor: sectionColors.featuresCardBackground,
                                borderColor: sectionColors.featuresCardBorder
                            }}
                        >
                            <div
                                className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}15`, color: sectionColors.buttonPrimaryBackground }}
                            >
                                {service.icon}
                            </div>

                            <h3
                                className="text-2xl font-bold mb-3 transition-colors"
                                style={{ color: sectionColors.featuresTitleColor }}
                            >
                                <EditableText
                                    elementId={service.titleId}
                                    defaultText={service.titleDefault}
                                    tag="span"
                                />
                            </h3>

                            <p
                                className="leading-relaxed"
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

export default ArchitectureServices;