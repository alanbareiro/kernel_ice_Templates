// src/templates/SaaS/SaaSHero.tsx
import { ArrowRight, Check, Cpu } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultButtons, defaultSectionColors, defaultTypography } from '../../types/template.types';

const SaaSHero: React.FC = () => {
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
                                <Cpu className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="sa_hero_badge"
                                    defaultText="Plataforma todo-en-uno"
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
                                    elementId="sa_hero_title_1"
                                    defaultText="Simplificá tu"
                                    tag="span"
                                />{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <EditableText
                                        elementId="sa_hero_title_2"
                                        defaultText="negocio"
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
                                    elementId="sa_hero_description"
                                    defaultText="La plataforma SaaS que automatiza tus procesos, ahorra tiempo y aumenta la productividad de tu equipo. Todo en un solo lugar."
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
                                    elementId="sa_cta_primary"
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
                                    elementId="sa_cta_secondary"
                                    defaultText={buttons.secondary.text}
                                    tag="span"
                                />
                            </a>
                        </div>

                        <div className="pt-4 flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <Check className="w-5 h-5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <span style={{ color: sectionColors.heroDescriptionColor }}>
                                    <EditableText elementId="sa_benefit_1" defaultText="Sin tarjeta de crédito" tag="span" />
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="w-5 h-5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <span style={{ color: sectionColors.heroDescriptionColor }}>
                                    <EditableText elementId="sa_benefit_2" defaultText="Cancela cuando quieras" tag="span" />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border" style={{ borderColor: `${sectionColors.buttonPrimaryBackground}30` }}>
                            <EditableImage
                                elementId="sa_hero_image"
                                defaultImage={defaultImages.saas.hero}
                                alt="Dashboard SaaS"
                                className="w-full h-auto object-cover"
                                category="saas"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SaaSHero;