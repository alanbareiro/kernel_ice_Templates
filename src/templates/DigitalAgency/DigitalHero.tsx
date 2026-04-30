// src/templates/DigitalAgency/DigitalHero.tsx
import { ArrowRight, Zap } from 'lucide-react';
import React from 'react';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultButtons, defaultSectionColors, defaultTypography } from '../../types/template.types';

const DigitalHero: React.FC = () => {
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
                                <Zap className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="di_hero_badge"
                                    defaultText="Agencia Digital Full Service"
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
                                    elementId="di_hero_title_1"
                                    defaultText="Transformamos"
                                    tag="span"
                                />{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <EditableText
                                        elementId="di_hero_title_2"
                                        defaultText="ideas"
                                        tag="span"
                                    />
                                </span>{' '}
                                <EditableText
                                    elementId="di_hero_title_3"
                                    defaultText="en realidades digitales"
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
                                    elementId="di_hero_description"
                                    defaultText="Diseño web, desarrollo, marketing digital y branding. Creamos experiencias digitales que conectan con tu audiencia y potencian tu negocio."
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
                                    elementId="di_cta_primary"
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
                                    elementId="di_cta_secondary"
                                    defaultText={buttons.secondary.text}
                                    tag="span"
                                />
                            </a>
                        </div>

                        <div className="pt-8 grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <div
                                    className="text-3xl font-bold"
                                    style={{ color: sectionColors.heroTitleColor }}
                                >
                                    <EditableText elementId="di_stat_1_value" defaultText="150+" tag="span" />
                                </div>
                                <div
                                    className="text-sm"
                                    style={{ color: sectionColors.heroDescriptionColor }}
                                >
                                    <EditableText elementId="di_stat_1_label" defaultText="Proyectos" tag="span" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div
                                    className="text-3xl font-bold"
                                    style={{ color: sectionColors.heroTitleColor }}
                                >
                                    <EditableText elementId="di_stat_2_value" defaultText="8+" tag="span" />
                                </div>
                                <div
                                    className="text-sm"
                                    style={{ color: sectionColors.heroDescriptionColor }}
                                >
                                    <EditableText elementId="di_stat_2_label" defaultText="Años" tag="span" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div
                                    className="text-3xl font-bold"
                                    style={{ color: sectionColors.heroTitleColor }}
                                >
                                    <EditableText elementId="di_stat_3_value" defaultText="12" tag="span" />
                                </div>
                                <div
                                    className="text-sm"
                                    style={{ color: sectionColors.heroDescriptionColor }}
                                >
                                    <EditableText elementId="di_stat_3_label" defaultText="Expertos" tag="span" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <EditableImage
                                elementId="di_hero_image"
                                defaultImage=""
                                alt="Equipo digital"
                                className="w-full h-auto object-cover"
                                category="digital"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DigitalHero;