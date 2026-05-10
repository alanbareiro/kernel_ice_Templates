import { Award, BarChart, Globe, LineChart, Target, Users, type LucideIcon } from 'lucide-react';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

const iconMap: Record<string, LucideIcon> = {
    BarChart, Users, Target, LineChart, Award, Globe,
    // Añade más si quieres
};

const ConsultingFeatures = () => {
    const { template } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };
    const typography = template?.typography || defaultTypography;

    const featuresTitleClamp = `clamp(1.5rem, 5vw, ${typography.featuresTitleSize})`;
    const featuresCardTitleClamp = `clamp(1.125rem, 4vw, ${typography.featuresCardTitleSize})`;
    const featuresDescClamp = `clamp(0.875rem, 3vw, ${typography.featuresDescriptionSize})`;

    // Helper para obtener el icono a partir del nombre guardado
    const getIcon = (iconName: string, className: string) => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className={className} /> : <BarChart className={className} />;
    };

    // Lista completa de features (hasta 9)
    // Los textos e iconos se leen de template.texts (con fallback a los defaults)
    const featuresList = [
        { id: 'strategic', defaultIcon: 'BarChart', defaultTitle: 'Análisis Estratégico', defaultDesc: 'Evaluación profunda de tu mercado, competencia y posición actual para identificar oportunidades.' },
        { id: 'talent', defaultIcon: 'Users', defaultTitle: 'Gestión del Talento', defaultDesc: 'Desarrollo de equipos de alto rendimiento y cultura organizacional alineada a objetivos.' },
        { id: 'commercial', defaultIcon: 'Target', defaultTitle: 'Planificación Comercial', defaultDesc: 'Estrategias de ventas y marketing para penetrar mercados y fidelizar clientes.' },
        { id: 'financial', defaultIcon: 'LineChart', defaultTitle: 'Optimización Financiera', defaultDesc: 'Mejora de la rentabilidad, control de costos y planificación financiera a corto y largo plazo.' },
        { id: 'certifications', defaultIcon: 'Award', defaultTitle: 'Certificaciones y Normas', defaultDesc: 'Asesoramiento para obtener certificaciones de calidad que mejoren tu competitividad.' },
        { id: 'international', defaultIcon: 'Globe', defaultTitle: 'Expansión Internacional', defaultDesc: 'Estrategias para llevar tu negocio a nuevos mercados con el menor riesgo posible.' },
        // Features extra (inicialmente ocultos)
        { id: 'extra_1', defaultIcon: 'BarChart', defaultTitle: 'Feature Extra 1', defaultDesc: 'Descripción de la funcionalidad adicional 1.' },
        { id: 'extra_2', defaultIcon: 'Users', defaultTitle: 'Feature Extra 2', defaultDesc: 'Descripción de la funcionalidad adicional 2.' },
        { id: 'extra_3', defaultIcon: 'Target', defaultTitle: 'Feature Extra 3', defaultDesc: 'Descripción de la funcionalidad adicional 3.' },
    ];

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
                        // Verificar si la feature debe mostrarse (por defecto visibles las 6 primeras, ocultas las extra)
                        const showKey = `show_feature_${feature.id}`;
                        const defaultValue = idx < 6; // primeras 6 visibles, las otras false
                        const shouldShow = template?.texts?.[showKey] === undefined ? defaultValue : template?.texts?.[showKey] !== 'false';
                        if (!shouldShow) return null;

                        const iconName = template?.texts?.[`feature_icon_${feature.id}`] || feature.defaultIcon;
                        const title = template?.texts?.[`feature_title_${feature.id}`] || feature.defaultTitle;
                        const desc = template?.texts?.[`feature_desc_${feature.id}`] || feature.defaultDesc;

                        return (
                            <div key={feature.id} className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-xl flex flex-col items-center text-center" style={{ backgroundColor: s.featuresCardBackground, border: `1px solid ${s.featuresCardBorder}` }}>
                                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{ color: s.featuresIconColor }}>
                                    {getIcon(iconName, s.iconSize)}
                                </div>
                                <h3 className="font-bold mb-3 transition-colors group-hover:text-blue-600" style={{ color: s.featuresTitleColor, fontSize: featuresCardTitleClamp }}>
                                    <EditableText elementId={`feature_title_${feature.id}`} defaultText={title} tag="span" />
                                </h3>
                                <p className="leading-relaxed" style={{ color: s.featuresTitleColor, fontSize: featuresDescClamp }}>
                                    <EditableText elementId={`feature_desc_${feature.id}`} defaultText={desc} tag="span" />
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