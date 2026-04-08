// src/templates/Consulting/ConsultingHero.tsx - VERSIÓN CORREGIDA
import { ArrowRight, Target } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const ConsultingHero = () => {
    const { template } = useTemplate();

    // Usar la nueva estructura de colores por sección
    const sectionColors = template?.sectionColors || {
        heroBackground: '#f8fafc',
        heroTitleColor: '#1e293b',
        heroDescriptionColor: '#475569',
        heroBadgeBackground: '#2563eb',
        heroBadgeTextColor: '#ffffff',
        buttonPrimaryBackground: '#2563eb',
        buttonPrimaryText: '#ffffff',
        buttonPrimaryHoverBackground: '#1d4ed8',
        buttonSecondaryBackground: '#ffffff',
        buttonSecondaryText: '#1e293b',
        buttonSecondaryHoverBackground: '#f1f5f9',
    };

    const typography = template?.typography || {
        heroTitleSize: '3rem',
        heroDescriptionSize: '1.125rem',
        headingFont: 'Inter, system-ui, sans-serif',
    };

    const buttons = template?.buttons || {
        primary: { text: 'Solicitar consultoría', url: '/contacto', openInNewTab: false },
        secondary: { text: 'Conocer metodología', url: '#metodologia', openInNewTab: false },
    };

    // CORREGIDO: Fallback completo para ui
    const ui = template?.ui || {
        borderRadius: {
            small: '0.375rem',
            medium: '0.5rem',
            large: '0.75rem',
            full: '9999px'
        },
        boxShadow: {
            small: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
            medium: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            large: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            none: 'none'
        },
        spacing: {
            sectionPadding: '4rem',
            elementGap: '1.5rem',
        },
    };

    return (
        <section
            className="relative section-padding overflow-hidden"
            style={{
                backgroundColor: sectionColors.heroBackground,
                fontFamily: typography.headingFont,
            }}
        >
            {/* Elementos decorativos */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
                    style={{ backgroundColor: sectionColors.buttonPrimaryBackground }}
                />
                <div
                    className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"
                    style={{ backgroundColor: sectionColors.buttonPrimaryBackground }}
                />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido izquierdo */}
                    <div className="space-y-8">
                        <div>
                            <span
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border mb-4"
                                style={{
                                    backgroundColor: sectionColors.heroBadgeBackground,
                                    borderColor: sectionColors.heroBadgeBackground,
                                    color: sectionColors.heroBadgeTextColor
                                }}
                            >
                                <Target className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="hero_badge"
                                    defaultText="Consultoría Estratégica de Negocios"
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
                                    elementId="hero_title_1"
                                    defaultText="Impulsamos el"
                                    tag="span"
                                />{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{
                                        backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})`
                                    }}
                                >
                                    <EditableText
                                        elementId="hero_title_2"
                                        defaultText="Crecimiento Sostenible"
                                        tag="span"
                                    />
                                </span>{' '}
                                <EditableText
                                    elementId="hero_title_3"
                                    defaultText="de tu Empresa"
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
                                    elementId="hero_description"
                                    defaultText="Análisis profundo, estrategias personalizadas y acompañamiento continuo para llevar tu negocio al siguiente nivel."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Botón principal con enlace configurable */}
                            <a
                                href={buttons.primary.url}
                                target={buttons.primary.openInNewTab ? '_blank' : '_self'}
                                rel={buttons.primary.openInNewTab ? 'noopener noreferrer' : undefined}
                                className="group font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                style={{
                                    backgroundColor: sectionColors.buttonPrimaryBackground,
                                    color: sectionColors.buttonPrimaryText,
                                    borderRadius: ui.borderRadius.medium,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = sectionColors.buttonPrimaryHoverBackground;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = sectionColors.buttonPrimaryBackground;
                                }}
                            >
                                <EditableText
                                    elementId="cta_primary"
                                    defaultText={buttons.primary.text}
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>

                            {/* Botón secundario con enlace configurable */}
                            <a
                                href={buttons.secondary.url}
                                target={buttons.secondary.openInNewTab ? '_blank' : '_self'}
                                rel={buttons.secondary.openInNewTab ? 'noopener noreferrer' : undefined}
                                className="group font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center border-2"
                                style={{
                                    backgroundColor: sectionColors.buttonSecondaryBackground,
                                    color: sectionColors.buttonSecondaryText,
                                    borderColor: sectionColors.buttonPrimaryBackground,
                                    borderRadius: ui.borderRadius.medium,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = sectionColors.buttonSecondaryHoverBackground;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = sectionColors.buttonSecondaryBackground;
                                }}
                            >
                                <EditableText
                                    elementId="cta_secondary"
                                    defaultText={buttons.secondary.text}
                                    tag="span"
                                />
                            </a>
                        </div>
                    </div>

                    {/* Imagen derecha con estadísticas - CORREGIDO: usar ui.borderRadius.large y ui.boxShadow.large */}
                    <div className="relative">
                        <div
                            className="relative z-10 backdrop-blur-sm rounded-2xl border p-8 shadow-2xl"
                            style={{
                                backgroundColor: `${sectionColors.heroBackground}cc`,
                                borderColor: `${sectionColors.buttonPrimaryBackground}40`,
                                borderRadius: ui.borderRadius.large,
                                boxShadow: ui.boxShadow.large,
                            }}
                        >
                            <div className="space-y-6">
                                <StatCard
                                    icon="📈"
                                    title="+45%"
                                    description="de crecimiento"
                                    color={sectionColors.buttonPrimaryBackground}
                                />
                                <StatCard
                                    icon="👥"
                                    title="+15"
                                    description="equipos transformados"
                                    color={sectionColors.buttonPrimaryBackground}
                                />
                                <StatCard
                                    icon="🎯"
                                    title="100%"
                                    description="de objetivos"
                                    color={sectionColors.buttonPrimaryBackground}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const StatCard: React.FC<{ icon: string; title: string; description: string; color: string }> =
    ({ icon, title, description, color }) => (
        <div
            className="flex items-center gap-4 border-b pb-6 last:border-0 last:pb-0"
            style={{ borderColor: `${color}40` }}
        >
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${color}30` }}
            >
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-xl" style={{ color }}>{title}</h3>
                <p className="text-sm" style={{ color: `${color}cc` }}>{description}</p>
            </div>
        </div>
    );

export default ConsultingHero;