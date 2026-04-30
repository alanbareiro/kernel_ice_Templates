// src/templates/RealEstate/RealEstateHero.tsx
import { ArrowRight, Building, Home } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultButtons, defaultSectionColors, defaultTypography } from '../../types/template.types';

const RealEstateHero: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;
    const buttons = template?.buttons || defaultButtons;

    return (
        <section
            className="relative section-padding overflow-hidden"
            style={{ backgroundColor: sectionColors.heroBackground }}
        >
            {/* Elementos decorativos */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
                    style={{ backgroundColor: sectionColors.buttonPrimaryBackground }} />
                <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"
                    style={{ backgroundColor: sectionColors.buttonPrimaryBackground }} />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido izquierdo */}
                    <div className="space-y-8">
                        <div>
                            <span
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}15`, color: sectionColors.buttonPrimaryBackground }}
                            >
                                <Building className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="re_hero_badge"
                                    defaultText="Inmobiliaria de confianza"
                                    tag="span"
                                />
                            </span>

                            <h1
                                className="font-bold leading-tight mb-6"
                                style={{
                                    fontSize: typography.heroTitleSize,
                                    color: sectionColors.heroTitleColor
                                }}
                            >
                                <EditableText
                                    elementId="re_hero_title_1"
                                    defaultText="Encontrá el"
                                    tag="span"
                                />{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <EditableText
                                        elementId="re_hero_title_2"
                                        defaultText="hogar"
                                        tag="span"
                                    />
                                </span>{' '}
                                <EditableText
                                    elementId="re_hero_title_3"
                                    defaultText="de tus sueños"
                                    tag="span"
                                />
                            </h1>

                            <p
                                className="max-w-2xl"
                                style={{
                                    fontSize: typography.heroDescriptionSize,
                                    color: sectionColors.heroDescriptionColor
                                }}
                            >
                                <EditableText
                                    elementId="re_hero_description"
                                    defaultText="Más de 500 propiedades en venta y alquiler. Departamentos, casas, oficinas y terrenos en las mejores zonas."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href={buttons.primary.url}
                                target={buttons.primary.openInNewTab ? '_blank' : '_self'}
                                className="group font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center text-white"
                                style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                            >
                                <EditableText
                                    elementId="re_cta_primary"
                                    defaultText={buttons.primary.text}
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href={buttons.secondary.url}
                                target={buttons.secondary.openInNewTab ? '_blank' : '_self'}
                                className="group bg-transparent border-2 font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                                style={{ borderColor: sectionColors.buttonPrimaryBackground, color: sectionColors.buttonPrimaryBackground }}
                            >
                                <EditableText
                                    elementId="re_cta_secondary"
                                    defaultText={buttons.secondary.text}
                                    tag="span"
                                />
                            </a>
                        </div>

                        {/* Estadísticas */}
                        <div className="pt-8 grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <div
                                    className="text-3xl font-bold"
                                    style={{ color: sectionColors.heroTitleColor }}
                                >
                                    <EditableText elementId="re_stat_1_value" defaultText="500+" tag="span" />
                                </div>
                                <div
                                    className="text-sm"
                                    style={{ color: sectionColors.heroDescriptionColor }}
                                >
                                    <EditableText elementId="re_stat_1_label" defaultText="Propiedades" tag="span" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div
                                    className="text-3xl font-bold"
                                    style={{ color: sectionColors.heroTitleColor }}
                                >
                                    <EditableText elementId="re_stat_2_value" defaultText="15+" tag="span" />
                                </div>
                                <div
                                    className="text-sm"
                                    style={{ color: sectionColors.heroDescriptionColor }}
                                >
                                    <EditableText elementId="re_stat_2_label" defaultText="Años de experiencia" tag="span" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div
                                    className="text-3xl font-bold"
                                    style={{ color: sectionColors.heroTitleColor }}
                                >
                                    <EditableText elementId="re_stat_3_value" defaultText="20" tag="span" />
                                </div>
                                <div
                                    className="text-sm"
                                    style={{ color: sectionColors.heroDescriptionColor }}
                                >
                                    <EditableText elementId="re_stat_3_label" defaultText="Agentes" tag="span" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Imagen derecha */}
                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <EditableImage
                                elementId="re_hero_image"
                                defaultImage={defaultImages.realestate.hero}
                                alt="Propiedades"
                                className="w-full h-auto object-cover"
                                category="realestate"
                            />
                        </div>

                        {/* Badge flotante */}
                        <div
                            className="absolute -bottom-4 -left-4 rounded-2xl shadow-xl p-4"
                            style={{ backgroundColor: sectionColors.featuresCardBackground, border: `1px solid ${sectionColors.buttonPrimaryBackground}` }}
                        >
                            <div className="flex items-center space-x-3">
                                <Home className="w-8 h-8" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <div>
                                    <p className="font-bold" style={{ color: sectionColors.heroTitleColor }}>
                                        <EditableText elementId="re_hero_badge_title" defaultText="Propiedades" tag="span" />
                                    </p>
                                    <p className="text-sm" style={{ color: sectionColors.heroDescriptionColor }}>
                                        <EditableText elementId="re_hero_badge_text" defaultText="en todo el país" tag="span" />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RealEstateHero;