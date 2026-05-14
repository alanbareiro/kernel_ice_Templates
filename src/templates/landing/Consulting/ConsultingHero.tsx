import { ArrowRight, Award, BarChart, Briefcase, Globe, LineChart, Target, TrendingUp, Users, type LucideIcon } from 'lucide-react';
import EditableImage from '../../../components/Editor/EditableImage';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography, defaultUI } from '../../../types/template.types';

const iconMap: Record<string, LucideIcon> = {
    TrendingUp, Users, Target, Award, Briefcase, BarChart, LineChart, Globe,
};

const ConsultingHero = () => {
    const { template } = useTemplate();
    const s = template?.sectionColors || defaultSectionColors;
    const typography = { ...defaultTypography, ...(template?.typography || {}) };
    const ui = { ...defaultUI, ...(template?.ui || {}) };

    const heroTitleClamp = `clamp(2rem, 5vw, ${typography.heroTitleSize})`;
    const heroDescClamp = `clamp(0.875rem, 3vw, ${typography.heroDescriptionSize})`;

    const statValueSize = template?.texts?.statValueSize || '1.25rem';
    const statLabelSize = template?.texts?.statLabelSize || '0.875rem';

    const defaultButtons = {
        primary: { text: 'Solicitar consultoría', url: '/contacto', openInNewTab: false },
        secondary: { text: 'Conocer metodología', url: '#metodologia', openInNewTab: false },
    };
    const buttons = {
        primary: template?.buttons?.primary || defaultButtons.primary,
        secondary: template?.buttons?.secondary || defaultButtons.secondary,
    };

    let heroStats: any[] = [];
    const storedStats = template?.texts?.['hero_stat_item_'];
    if (storedStats) {
        try {
            heroStats = JSON.parse(storedStats);
        } catch (e) { heroStats = []; }
    }
    if (heroStats.length === 0) {
        heroStats = [
            { id: 'default_1', icon: 'TrendingUp', value: '+45%', label: 'crecimiento', visible: true },
            { id: 'default_2', icon: 'Users', value: '+15', label: 'equipos', visible: true },
            { id: 'default_3', icon: 'Target', value: '100%', label: 'objetivos', visible: true },
            { id: 'default_4', icon: 'TrendingUp', value: '80%', label: 'parcial', visible: true },
        ];
    }

    // Devuelve el elemento JSX ya construido, con su className y style
    const getIcon = (iconName: string, className: string, color?: string) => {
        const Icon = iconMap[iconName];
        if (!Icon) return <TrendingUp className={className} style={{ color, fill: color }} />;
        return <Icon className={className} style={{ color, fill: color }} />;
    };

    return (
        <section id="home" className="relative section-padding overflow-hidden" style={{ backgroundColor: s.heroBackground }}>
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ backgroundColor: s.buttonPrimaryBackground }} />
                <div className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" style={{ backgroundColor: s.buttonPrimaryBackground }} />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">
                        <div>
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border" style={{ backgroundColor: s.heroBadgeBackground, borderColor: s.heroBadgeBackground, color: s.heroBadgeTextColor }}>
                                <Target className="w-4 h-4 mr-2" />
                                <EditableText elementId="hero_badge" defaultText="Consultoría Estratégica de Negocios" tag="span" />
                            </span>
                        </div>
                        <h1 className="font-bold leading-tight" style={{ fontSize: heroTitleClamp, color: s.heroTitleColor }}>
                            <EditableText elementId="hero_title_1" defaultText="Impulsamos el" tag="span" />{' '}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${s.heroTitleColor}, ${s.heroTitleColor})` }}>
                                <EditableText elementId="hero_title_2" defaultText="Crecimiento Sostenible" tag="span" />
                            </span>{' '}
                            <EditableText elementId="hero_title_3" defaultText="de tu Empresa" tag="span" />
                        </h1>
                        <p className="max-w-2xl" style={{ fontSize: heroDescClamp, color: s.heroDescriptionColor }}>
                            <EditableText elementId="hero_description" defaultText="Análisis profundo, estrategias personalizadas y acompañamiento continuo para llevar tu negocio al siguiente nivel." tag="span" />
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            {template?.texts?.show_hero_primary_button !== 'false' && (
                                <a href={buttons.primary.url} target={buttons.primary.openInNewTab ? '_blank' : '_self'} rel="noopener noreferrer"
                                    className="group font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                    style={{ backgroundColor: s.buttonPrimaryBackground, color: s.buttonPrimaryText, borderRadius: ui?.borderRadius?.medium || defaultUI.borderRadius.medium }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = s.buttonPrimaryHoverBackground}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = s.buttonPrimaryBackground}>
                                    <EditableText elementId="cta_primary" defaultText={buttons.primary.text} tag="span" />
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            )}
                            {template?.texts?.show_hero_secondary_button !== 'false' && (
                                <a href={buttons.secondary.url} target={buttons.secondary.openInNewTab ? '_blank' : '_self'} rel="noopener noreferrer"
                                    className="group font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center border-2"
                                    style={{ backgroundColor: s.buttonSecondaryBackground, color: s.buttonSecondaryText, borderColor: s.buttonPrimaryBackground }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = s.buttonSecondaryHoverBackground}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = s.buttonSecondaryBackground}>
                                    <EditableText elementId="cta_secondary" defaultText={buttons.secondary.text} tag="span" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="relative z-10 rounded-2xl border shadow-2xl overflow-hidden">
                            <EditableImage elementId="hero_image" defaultImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800" alt="Consultoría estratégica" className="w-full h-auto" category="consulting" />
                        </div>

                        <div className="grid grid-cols-4 gap-4 p-4 rounded-xl shadow-xl backdrop-blur-sm" style={{ backgroundColor: `${s.heroBackground}cc`, border: `1px solid ${s.buttonPrimaryBackground}40` }}>
                            {heroStats.map((stat, idx) => {
                                if (stat.visible === false) return null;
                                const valueKey = `hero_stat_value_${idx}`;
                                const labelKey = `hero_stat_label_${idx}`;
                                return (
                                    <div key={stat.id || idx} className="text-center">
                                        <div className="flex justify-center mb-2">
                                            {getIcon(stat.icon, s.iconSize, s.iconColor)}
                                        </div>
                                        <div className="font-bold" style={{ color: s.statValueColor, fontSize: statValueSize }}>
                                            <EditableText elementId={valueKey} defaultText={stat.value} tag="span" />
                                        </div>
                                        <div style={{ color: s.statLabelColor, fontSize: statLabelSize }}>
                                            <EditableText elementId={labelKey} defaultText={stat.label} tag="span" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultingHero;