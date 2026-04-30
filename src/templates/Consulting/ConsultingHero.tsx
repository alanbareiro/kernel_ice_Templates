import { ArrowRight, Award, BarChart, Briefcase, Globe, LineChart, Target, TrendingUp, Users, type LucideIcon } from 'lucide-react';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors } from '../../types/template.types';

// Mapeo de nombres de iconos a componentes de Lucide
const iconMap: Record<string, LucideIcon> = {
    TrendingUp,
    Users,
    Target,
    Award,
    Briefcase,
    BarChart,
    LineChart,
    Globe,
};

const ConsultingHero = () => {
    const { template } = useTemplate();

    // Colores por sección
    const s = template?.sectionColors || defaultSectionColors;

    const typography = template?.typography || {
        heroTitleSize: '3rem',
        heroDescriptionSize: '1.125rem',
        headingFont: 'Inter, system-ui, sans-serif',
    };

    const defaultButtons = {
        primary: { text: 'Solicitar consultoría', url: '/contacto', openInNewTab: false },
        secondary: { text: 'Conocer metodología', url: '#metodologia', openInNewTab: false },
    };

    const buttons = {
        primary: {
            text: template?.buttons?.primary?.text || defaultButtons.primary.text,
            url: template?.buttons?.primary?.url || defaultButtons.primary.url,
            openInNewTab: template?.buttons?.primary?.openInNewTab ?? defaultButtons.primary.openInNewTab,
        },
        secondary: {
            text: template?.buttons?.secondary?.text || defaultButtons.secondary.text,
            url: template?.buttons?.secondary?.url || defaultButtons.secondary.url,
            openInNewTab: template?.buttons?.secondary?.openInNewTab ?? defaultButtons.secondary.openInNewTab,
        },
    };

    const ui = template?.ui || {
        borderRadius: { medium: '0.5rem' },
        boxShadow: { medium: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
    };

    // Obtener nombres de iconos desde template.texts (valores por defecto)
    const icon1Name = template?.texts?.hero_icon_1 || 'TrendingUp';
    const icon2Name = template?.texts?.hero_icon_2 || 'Users';
    const icon3Name = template?.texts?.hero_icon_3 || 'Target';

    const Icon1 = iconMap[icon1Name] || TrendingUp;
    const Icon2 = iconMap[icon2Name] || Users;
    const Icon3 = iconMap[icon3Name] || Target;

    // Forzar re-render cuando cambien los iconos o los colores
    const forceUpdateKey = JSON.stringify({
        bg: s.buttonSecondaryBackground,
        text: s.buttonSecondaryText,
        hover: s.buttonSecondaryHoverBackground,
        icon1: icon1Name,
        icon2: icon2Name,
        icon3: icon3Name,
    });

    return (
        <section
            id="home"
            key={forceUpdateKey}
            className="relative section-padding overflow-hidden"
            style={{
                backgroundColor: s.heroBackground,
                // fontFamily eliminado para que herede del estilo global
            }}
        >
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
                    style={{ backgroundColor: s.buttonPrimaryBackground }}
                />
                <div
                    className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"
                    style={{ backgroundColor: s.buttonPrimaryBackground }}
                />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">
                        {/* Badge */}
                        <div>
                            <span
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border"
                                style={{
                                    backgroundColor: s.heroBadgeBackground,
                                    borderColor: s.heroBadgeBackground,
                                    color: s.heroBadgeTextColor,
                                }}
                            >
                                <Target className="w-4 h-4 mr-2" />
                                <EditableText elementId="hero_badge" defaultText="Consultoría Estratégica de Negocios" tag="span" />
                            </span>
                        </div>

                        {/* Título */}
                        <h1
                            className="font-bold leading-tight"
                            style={{
                                fontSize: typography.heroTitleSize,
                                color: s.heroTitleColor,
                            }}
                        >
                            <EditableText elementId="hero_title_1" defaultText="Impulsamos el" tag="span" />{' '}
                            <span
                                className="text-transparent bg-clip-text"
                                style={{
                                    backgroundImage: `linear-gradient(to right, ${s.heroTitleColor}, ${s.heroTitleColor})`,
                                }}
                            >
                                <EditableText elementId="hero_title_2" defaultText="Crecimiento Sostenible" tag="span" />
                            </span>{' '}
                            <EditableText elementId="hero_title_3" defaultText="de tu Empresa" tag="span" />
                        </h1>

                        {/* Descripción */}
                        <p
                            className="max-w-2xl"
                            style={{
                                fontSize: typography.heroDescriptionSize,
                                color: s.heroDescriptionColor,
                            }}
                        >
                            <EditableText
                                elementId="hero_description"
                                defaultText="Análisis profundo, estrategias personalizadas y acompañamiento continuo para llevar tu negocio al siguiente nivel."
                                tag="span"
                            />
                        </p>

                        {/* Botones */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href={buttons.primary.url}
                                target={buttons.primary.openInNewTab ? '_blank' : '_self'}
                                rel={buttons.primary.openInNewTab ? 'noopener noreferrer' : undefined}
                                className="group font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                style={{
                                    backgroundColor: s.buttonPrimaryBackground,
                                    color: s.buttonPrimaryText,
                                    borderRadius: ui.borderRadius.medium,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = s.buttonPrimaryHoverBackground;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = s.buttonPrimaryBackground;
                                }}
                            >
                                <EditableText elementId="cta_primary" defaultText={buttons.primary.text} tag="span" />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>

                            <a
                                href={buttons.secondary.url}
                                target={buttons.secondary.openInNewTab ? '_blank' : '_self'}
                                rel={buttons.secondary.openInNewTab ? 'noopener noreferrer' : undefined}
                                className="group font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center border-2"
                                style={{
                                    backgroundColor: s.buttonSecondaryBackground,
                                    color: s.buttonSecondaryText,
                                    borderColor: s.buttonPrimaryBackground,
                                    borderRadius: ui.borderRadius.medium,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = s.buttonSecondaryHoverBackground;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = s.buttonSecondaryBackground;
                                }}
                            >
                                <EditableText elementId="cta_secondary" defaultText={buttons.secondary.text} tag="span" />
                            </a>
                        </div>
                    </div>

                    {/* Columna derecha: imagen + estadísticas */}
                    <div className="space-y-6">
                        <div className="relative z-10 rounded-2xl border shadow-2xl overflow-hidden">
                            <EditableImage
                                elementId="hero_image"
                                defaultImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
                                alt="Consultoría estratégica"
                                className="w-full h-auto"
                                category="consulting"
                            />
                        </div>

                        <div
                            className="grid grid-cols-3 gap-4 p-4 rounded-xl shadow-xl backdrop-blur-sm"
                            style={{
                                backgroundColor: `${s.heroBackground}cc`,
                                border: `1px solid ${s.buttonPrimaryBackground}40`,
                            }}
                        >
                            {/* Estadística 1 */}
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <Icon1 className={s.iconSize} style={{ color: s.iconColor }} />
                                </div>
                                <div className="text-xl font-bold" style={{ color: s.statValueColor }}>
                                    <EditableText elementId="stat_value_1" defaultText="+45%" tag="span" />
                                </div>
                                <div className="text-xs" style={{ color: s.statLabelColor }}>
                                    <EditableText elementId="stat_label_1" defaultText="crecimiento" tag="span" />
                                </div>
                            </div>

                            {/* Estadística 2 */}
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <Icon2 className={s.iconSize} style={{ color: s.iconColor }} />
                                </div>
                                <div className="text-xl font-bold" style={{ color: s.statValueColor }}>
                                    <EditableText elementId="stat_value_2" defaultText="+15" tag="span" />
                                </div>
                                <div className="text-xs" style={{ color: s.statLabelColor }}>
                                    <EditableText elementId="stat_label_2" defaultText="equipos" tag="span" />
                                </div>
                            </div>

                            {/* Estadística 3 */}
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <Icon3 className={s.iconSize} style={{ color: s.iconColor }} />
                                </div>
                                <div className="text-xl font-bold" style={{ color: s.statValueColor }}>
                                    <EditableText elementId="stat_value_3" defaultText="100%" tag="span" />
                                </div>
                                <div className="text-xs" style={{ color: s.statLabelColor }}>
                                    <EditableText elementId="stat_label_3" defaultText="objetivos" tag="span" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultingHero;