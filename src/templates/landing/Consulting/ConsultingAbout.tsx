import { Award, BarChart, Briefcase, Globe, LineChart, MapPin, Target, TrendingUp, Users } from 'lucide-react';
import consultingImage from '../../../assets/corpo.jpg';
import EditableImage from '../../../components/Editor/EditableImage';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

const iconMap: Record<string, any> = { Briefcase, Users, Award, MapPin, TrendingUp, Target, BarChart, LineChart, Globe };

const ConsultingAbout = () => {
    const { template } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };
    const typography = template?.typography || defaultTypography;

    const aboutTitleClamp = `clamp(1.5rem, 5vw, ${typography.aboutTitleSize})`;
    const aboutTextClamp = `clamp(0.875rem, 3vw, ${typography.aboutTextSize})`;
    const statsValueClamp = `clamp(1.25rem, 4vw, ${typography.aboutStatsValueSize})`;
    const statsLabelClamp = `clamp(0.75rem, 2vw, ${typography.aboutStatsLabelSize})`;
    const diffClamp = `clamp(0.875rem, 3vw, ${typography.aboutDifferentiatorSize})`;

    // Definir hasta 8 estadísticas (índices 1..8)
    const statsIndices = [1, 2, 3, 4, 5, 6, 7, 8];
    const getStatData = (idx: number) => {
        const defaults: Record<number, { icon: string; value: string; label: string }> = {
            1: { icon: 'Briefcase', value: '15+', label: 'Años de experiencia' },
            2: { icon: 'Users', value: '50+', label: 'Consultores expertos' },
            3: { icon: 'Award', value: '200+', label: 'Proyectos exitosos' },
            4: { icon: 'MapPin', value: '10+', label: 'Países con presencia' },
        };
        const def = defaults[idx] || { icon: 'Briefcase', value: '0', label: `Estadística ${idx}` };
        return {
            iconName: template?.texts?.[`stat_icon_${idx}`] || def.icon,
            value: template?.texts?.[`stat_value_${idx}`] || def.value,
            label: template?.texts?.[`stat_label_${idx}`] || def.label,
        };
    };

    // Definir hasta 8 diferenciadores (índices 0..7)
    const diffIndices = [0, 1, 2, 3, 4, 5, 6, 7];
    const getDiffText = (idx: number) => {
        const defaults: Record<number, string> = {
            0: 'Metodologías ágiles y adaptativas',
            1: 'Análisis de datos para toma de decisiones',
            2: 'Acompañamiento post-implementación',
            3: 'Confidencialidad y ética profesional',
        };
        return template?.texts?.[`differentiator_${idx}`] || defaults[idx] || `Diferenciador ${idx + 1}`;
    };

    const getIcon = (iconName: string) => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />;
    };

    // Determinar visibilidad: por defecto true para los 4 primeros stats y primeros 4 diffs, false para los adicionales
    const shouldShowStat = (idx: number) => {
        const showKey = `show_stat_${idx}`;
        const defaultValue = idx <= 4; // estadísticas 1..4 visibles por defecto
        const stored = template?.texts?.[showKey];
        return stored === undefined ? defaultValue : stored !== 'false';
    };

    const shouldShowDiff = (idx: number) => {
        const showKey = `show_diff_${idx}`;
        const defaultValue = idx <= 3; // diferenciadores 0..3 visibles por defecto
        const stored = template?.texts?.[showKey];
        return stored === undefined ? defaultValue : stored !== 'false';
    };

    return (
        <section id="methodology" className="section-padding" style={{ backgroundColor: s.aboutBackground }}>
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Imagen (sin cambios) */}
                    <div className="relative group order-2 lg:order-1">
                        <div className="absolute -inset-4 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl" style={{ backgroundColor: s.aboutBadgeBackground }} />
                        <div className="relative z-10 overflow-hidden shadow-2xl" style={{ borderRadius: s.aboutImageBorderRadius }}>
                            <div className="aspect-[4/5] relative overflow-hidden">
                                <EditableImage elementId="about_image" defaultImage={consultingImage} alt="Equipo de consultores" className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent pointer-events-none" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white pointer-events-none">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: s.aboutBadgeBackground }} />
                                        <span className="text-sm font-medium" style={{ color: s.aboutBadgeTextColor }}>
                                            <EditableText elementId="about_badge" defaultText="Equipo multidisciplinario" tag="span" />
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 leading-tight text-white">
                                        <EditableText elementId="about_title" defaultText="Expertos en diversas industrias" tag="span" />
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contenido textual */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <div>
                            <span className="inline-block px-5 py-2 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: s.aboutBadgeBackground, color: s.aboutBadgeTextColor }}>
                                <EditableText elementId="about_section_badge" defaultText="Nuestra Firma" tag="span" />
                            </span>
                            <h2 className="font-bold mb-6" style={{ color: s.aboutTitleColor, fontSize: aboutTitleClamp }}>
                                <EditableText elementId="about_heading_1" defaultText="Consultoría con" tag="span" />{' '}
                                <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${s.aboutTitleColor}, ${s.aboutTitleColor})` }}>
                                    <EditableText elementId="about_heading_2" defaultText="Resultados Medibles" tag="span" />
                                </span>
                            </h2>
                            <p className="mb-6 leading-relaxed" style={{ color: s.aboutTextColor, fontSize: aboutTextClamp }}>
                                <EditableText elementId="about_description_1" defaultText="En Kernelize Consulting no creemos en soluciones genéricas..." tag="span" />
                            </p>
                            <p className="leading-relaxed" style={{ color: s.aboutTextColor, fontSize: aboutTextClamp }}>
                                <EditableText elementId="about_description_2" defaultText="Nuestro enfoque combina el rigor analítico con la creatividad..." tag="span" />
                            </p>
                        </div>

                        {/* Estadísticas dinámicas */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t" style={{ borderColor: s.aboutTextColor }}>
                            {statsIndices.map(idx => {
                                if (!shouldShowStat(idx)) return null;
                                const { iconName, value, label } = getStatData(idx);
                                const IconComponent = getIcon(iconName);
                                return (
                                    <div key={idx} className="text-center group">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: `${s.aboutBadgeBackground}20`, color: s.aboutBadgeBackground }}>
                                            {IconComponent}
                                        </div>
                                        <div className="font-bold group-hover:text-blue-600 transition-colors" style={{ color: s.statValueColor, fontSize: statsValueClamp }}>
                                            <EditableText elementId={`stat_value_${idx}`} defaultText={value} tag="span" />
                                        </div>
                                        <div style={{ color: s.statLabelColor, fontSize: statsLabelClamp }}>
                                            <EditableText elementId={`stat_label_${idx}`} defaultText={label} tag="span" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Lista de diferenciadores (Nuestro compromiso) */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold" style={{ color: s.aboutTitleColor }}>
                                <EditableText elementId="about_commitment_title" defaultText="Nuestro compromiso:" tag="span" />
                            </h3>
                            <ul className="space-y-3">
                                {diffIndices.map(idx => {
                                    if (!shouldShowDiff(idx)) return null;
                                    const text = getDiffText(idx);
                                    return (
                                        <li key={idx} className="flex items-center">
                                            <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{ backgroundColor: s.aboutBadgeBackground }}>
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span style={{ color: s.aboutTextColor, fontSize: diffClamp }}>
                                                <EditableText elementId={`differentiator_${idx}`} defaultText={text} tag="span" />
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultingAbout;