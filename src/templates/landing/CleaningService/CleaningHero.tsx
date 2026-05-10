// src/templates/CleaningService/CleaningHero.tsx
import { ArrowRight, Clock, Shield, Sparkles } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultButtons, defaultSectionColors, defaultTypography } from '../../types/template.types';

const CleaningHero: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;
    const buttons = template?.buttons || defaultButtons;

    return (
        <section
            className="relative section-padding overflow-hidden"
            style={{ backgroundColor: sectionColors.heroBackground }}
        >
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
                    style={{ backgroundColor: sectionColors.buttonPrimaryBackground }} />
                <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"
                    style={{ backgroundColor: sectionColors.buttonPrimaryBackground }} />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div>
                            <span
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}15`, color: sectionColors.buttonPrimaryBackground }}
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="cl_hero_badge"
                                    defaultText="Profesionales en limpieza"
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
                                    elementId="cl_hero_title_1"
                                    defaultText="Dejamos tu espacio"
                                    tag="span"
                                />{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <EditableText
                                        elementId="cl_hero_title_2"
                                        defaultText="impecable"
                                        tag="span"
                                    />
                                </span>
                            </h1>

                            <p
                                className="max-w-2xl"
                                style={{
                                    fontSize: typography.heroDescriptionSize,
                                    color: sectionColors.heroDescriptionColor
                                }}
                            >
                                <EditableText
                                    elementId="cl_hero_description"
                                    defaultText="Servicios de limpieza profesional para hogares y empresas. Productos ecológicos, personal capacitado y resultados garantizados."
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
                                    elementId="cl_cta_primary"
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
                                    elementId="cl_cta_secondary"
                                    defaultText={buttons.secondary.text}
                                    tag="span"
                                />
                            </a>
                        </div>

                        <div className="pt-8 flex flex-wrap gap-6">
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <span style={{ color: sectionColors.heroDescriptionColor }}>
                                    <EditableText elementId="cl_benefit_1" defaultText="Personal capacitado" tag="span" />
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <span style={{ color: sectionColors.heroDescriptionColor }}>
                                    <EditableText elementId="cl_benefit_2" defaultText="Cumplimiento horario" tag="span" />
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <span style={{ color: sectionColors.heroDescriptionColor }}>
                                    <EditableText elementId="cl_benefit_3" defaultText="Productos ecológicos" tag="span" />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <EditableImage
                                elementId="cl_hero_image"
                                defaultImage={defaultImages.cleaning.hero}
                                alt="Servicio de limpieza"
                                className="w-full h-auto object-cover"
                                category="cleaning"
                            />
                        </div>

                        <div
                            className="absolute -bottom-4 -left-4 rounded-2xl shadow-xl p-4"
                            style={{ backgroundColor: sectionColors.featuresCardBackground, border: `1px solid ${sectionColors.buttonPrimaryBackground}` }}
                        >
                            <div className="flex items-center space-x-3">
                                <Sparkles className="w-8 h-8" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <div>
                                    <p className="font-bold" style={{ color: sectionColors.heroTitleColor }}>
                                        <EditableText elementId="cl_hero_badge_title" defaultText="10% OFF" tag="span" />
                                    </p>
                                    <p className="text-sm" style={{ color: sectionColors.heroDescriptionColor }}>
                                        <EditableText elementId="cl_hero_badge_text" defaultText="en tu primer servicio" tag="span" />
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

export default CleaningHero;