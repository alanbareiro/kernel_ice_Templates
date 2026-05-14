import { Award, BarChart, Briefcase, Globe, Heart, LineChart, Star, Target, TrendingUp, Users, type LucideIcon } from 'lucide-react';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

const iconMap: Record<string, LucideIcon> = {
    BarChart: BarChart,
    Users: Users,
    Target: Target,
    LineChart: LineChart,
    Award: Award,
    Globe: Globe,
    TrendingUp: TrendingUp,
    Briefcase: Briefcase,
    Heart: Heart,
    Star: Star,
};

const ConsultingFeatures = () => {
    const { template, updateText } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };
    const typography = { ...defaultTypography, ...(template?.typography || {}) };

    const featuresTitleClamp = `clamp(1.5rem, 5vw, ${typography.featuresTitleSize})`;
    const featuresCardTitleClamp = `clamp(1.125rem, 4vw, ${typography.featuresCardTitleSize})`;
    const featuresDescClamp = `clamp(0.875rem, 3vw, ${typography.featuresDescriptionSize})`;

    // Función para reconstruir la lista dinámica desde datos antiguos (si existe)
    const migrateFromOldFormat = () => {
        const oldFeatureIds = ['strategic', 'talent', 'commercial', 'financial', 'certifications', 'international', 'extra_1', 'extra_2', 'extra_3'];
        const migrated = [];

        for (const id of oldFeatureIds) {
            const showKey = `show_feature_${id}`;
            const iconKey = `feature_icon_${id}`;
            const titleKey = `feature_title_${id}`;
            const descKey = `feature_desc_${id}`;

            // Si existe alguna de estas claves (indica que se usó el formato antiguo)
            if (template?.texts?.[showKey] !== undefined ||
                template?.texts?.[iconKey] !== undefined ||
                template?.texts?.[titleKey] !== undefined ||
                template?.texts?.[descKey] !== undefined) {

                const visible = template?.texts?.[showKey] === undefined ? true : template?.texts?.[showKey] !== 'false';
                const icon = template?.texts?.[iconKey] || (id === 'strategic' ? 'BarChart' : id === 'talent' ? 'Users' : id === 'commercial' ? 'Target' : id === 'financial' ? 'LineChart' : id === 'certifications' ? 'Award' : 'Globe');
                const title = template?.texts?.[titleKey] || (id === 'strategic' ? 'Análisis Estratégico' : id === 'talent' ? 'Gestión del Talento' : id === 'commercial' ? 'Planificación Comercial' : id === 'financial' ? 'Optimización Financiera' : id === 'certifications' ? 'Certificaciones y Normas' : 'Expansión Internacional');
                const description = template?.texts?.[descKey] || (id === 'strategic' ? 'Evaluación profunda de tu mercado...' : id === 'talent' ? 'Desarrollo de equipos de alto rendimiento...' : id === 'commercial' ? 'Estrategias de ventas y marketing...' : id === 'financial' ? 'Mejora de la rentabilidad...' : id === 'certifications' ? 'Asesoramiento para obtener certificaciones...' : 'Estrategias para llevar tu negocio a nuevos mercados...');

                migrated.push({
                    id: `migrated_${id}`,
                    icon,
                    title,
                    description,
                    visible
                });
            }
        }

        if (migrated.length > 0) {
            // Guardar la lista migrada en el nuevo formato (solo una vez)
            updateText('feature_', JSON.stringify(migrated));
            return migrated;
        }
        return null;
    };

    // Cargar lista dinámica actual
    let featuresList: any[] = [];
    const storedFeatures = template?.texts?.['feature_'];
    if (storedFeatures && storedFeatures !== '') {
        try {
            const parsed = JSON.parse(storedFeatures);
            if (Array.isArray(parsed) && parsed.length > 0) {
                featuresList = parsed;
            }
        } catch (e) { }
    }

    // Si no hay lista dinámica, intentar migrar desde datos antiguos
    if (featuresList.length === 0) {
        const migrated = migrateFromOldFormat();
        if (migrated && migrated.length > 0) {
            featuresList = migrated;
        }
    }

    // Si aún no hay nada, usar valores por defecto (6 elementos)
    if (featuresList.length === 0) {
        featuresList = [
            { id: 'default_1', icon: 'BarChart', title: 'Análisis Estratégico', description: 'Evaluación profunda de tu mercado, competencia y posición actual para identificar oportunidades.', visible: true },
            { id: 'default_2', icon: 'Users', title: 'Gestión del Talento', description: 'Desarrollo de equipos de alto rendimiento y cultura organizacional alineada a objetivos.', visible: true },
            { id: 'default_3', icon: 'Target', title: 'Planificación Comercial', description: 'Estrategias de ventas y marketing para penetrar mercados y fidelizar clientes.', visible: true },
            { id: 'default_4', icon: 'LineChart', title: 'Optimización Financiera', description: 'Mejora de la rentabilidad, control de costos y planificación financiera a corto y largo plazo.', visible: true },
            { id: 'default_5', icon: 'Award', title: 'Certificaciones y Normas', description: 'Asesoramiento para obtener certificaciones de calidad que mejoren tu competitividad.', visible: true },
            { id: 'default_6', icon: 'Globe', title: 'Expansión Internacional', description: 'Estrategias para llevar tu negocio a nuevos mercados con el menor riesgo posible.', visible: true },
        ];
    }

    const getIcon = (iconName: string, className: string, color?: string) => {
        const Icon = iconMap[iconName];
        if (!Icon) return <BarChart className={className} style={{ color }} />;
        return <Icon className={className} style={{ color }} />;
    };

    return (
        <section id="services" className="section-padding" style={{ backgroundColor: s.featuresBackground }}>
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-bold mb-6" style={{ color: s.featuresTitleColor, fontSize: featuresTitleClamp }}>
                        <EditableText elementId="features_title_1" defaultText="Capacidades que" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${s.featuresTitleColor}, ${s.featuresTitleColor})` }}>
                            <EditableText elementId="features_title_2" defaultText="Transforman" tag="span" />
                        </span>
                    </h2>
                    <p className="mx-auto" style={{ color: s.featuresTitleColor, fontSize: featuresDescClamp }}>
                        <EditableText elementId="features_description" defaultText="No solo aconsejamos, implementamos. Te acompañamos en cada paso con herramientas y metodologías probadas." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuresList.map((feature, idx) => {
                        if (feature.visible === false) return null;
                        const title = feature.title || (idx === 0 ? 'Análisis Estratégico' : `Característica ${idx + 1}`);
                        const description = feature.description || 'Descripción de la característica';
                        const iconName = feature.icon || 'BarChart';
                        const uniqueId = feature.id || `feature_${idx}`;

                        return (
                            <div
                                key={uniqueId}
                                className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-xl flex flex-col items-center text-center"
                                style={{
                                    backgroundColor: s.featuresCardBackground,
                                    border: `1px solid ${s.featuresCardBorder}`,
                                }}
                            >
                                <div
                                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                                    style={{ color: s.featuresIconColor }}
                                >
                                    {getIcon(iconName, s.iconSize, s.featuresIconColor)}
                                </div>
                                <h3
                                    className="font-bold mb-3 transition-colors group-hover:text-blue-600"
                                    style={{ color: s.featuresTitleColor, fontSize: featuresCardTitleClamp }}
                                >
                                    <EditableText
                                        elementId={`feature_title_${uniqueId}`}
                                        defaultText={title}
                                        tag="span"
                                    />
                                </h3>
                                <p className="leading-relaxed" style={{ color: s.featuresTitleColor, fontSize: featuresDescClamp }}>
                                    <EditableText
                                        elementId={`feature_desc_${uniqueId}`}
                                        defaultText={description}
                                        tag="span"
                                    />
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ConsultingFeatures;