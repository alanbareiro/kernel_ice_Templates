import {
    Award,
    BarChart,
    Globe,
    LineChart,
    Target,
    Users
} from 'lucide-react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors } from '../../types/template.types';

const ConsultingFeatures = () => {
    const { template } = useTemplate();

    // Fusionar valores por defecto con los del template
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };

    const features = [
        {
            icon: <BarChart className={s.iconSize} />,
            title: 'Análisis Estratégico',
            description: 'Evaluación profunda de tu mercado, competencia y posición actual para identificar oportunidades.',
            id: 'strategic'
        },
        {
            icon: <Users className={s.iconSize} />,
            title: 'Gestión del Talento',
            description: 'Desarrollo de equipos de alto rendimiento y cultura organizacional alineada a objetivos.',
            id: 'talent'
        },
        {
            icon: <Target className={s.iconSize} />,
            title: 'Planificación Comercial',
            description: 'Estrategias de ventas y marketing para penetrar mercados y fidelizar clientes.',
            id: 'commercial'
        },
        {
            icon: <LineChart className={s.iconSize} />,
            title: 'Optimización Financiera',
            description: 'Mejora de la rentabilidad, control de costos y planificación financiera a corto y largo plazo.',
            id: 'financial'
        },
        {
            icon: <Award className={s.iconSize} />,
            title: 'Certificaciones y Normas',
            description: 'Asesoramiento para obtener certificaciones de calidad que mejoren tu competitividad.',
            id: 'certifications'
        },
        {
            icon: <Globe className={s.iconSize} />,
            title: 'Expansión Internacional',
            description: 'Estrategias para llevar tu negocio a nuevos mercados con el menor riesgo posible.',
            id: 'international'
        },
    ];

    return (
        <section
            id="services"
            className="section-padding"
            style={{ backgroundColor: s.featuresBackground }}
        >
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2
                        className="text-4xl md:text-5xl font-bold mb-6"
                        style={{ color: s.featuresTitleColor }}
                    >
                        <EditableText
                            elementId="features_title_1"
                            defaultText="Capacidades que"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${s.featuresTitleColor}, ${s.featuresTitleColor})`,
                            }}
                        >
                            <EditableText
                                elementId="features_title_2"
                                defaultText="Transforman"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: s.featuresTitleColor }}
                    >
                        <EditableText
                            elementId="features_description"
                            defaultText="No solo aconsejamos, implementamos. Te acompañamos en cada paso con herramientas y metodologías probadas."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-xl"
                            style={{
                                backgroundColor: s.featuresCardBackground,
                                border: `1px solid ${s.featuresCardBorder}`,
                            }}
                        >
                            <div
                                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                                style={{ color: s.featuresIconColor }}
                            >
                                {feature.icon}
                            </div>

                            <h3
                                className="text-2xl font-bold mb-3 transition-colors group-hover:text-blue-600"
                                style={{ color: s.featuresTitleColor }}
                            >
                                <EditableText
                                    elementId={`feature_title_${feature.id}`}
                                    defaultText={feature.title}
                                    tag="span"
                                />
                            </h3>

                            <p
                                className="leading-relaxed"
                                style={{ color: s.featuresTitleColor }}
                            >
                                <EditableText
                                    elementId={`feature_desc_${feature.id}`}
                                    defaultText={feature.description}
                                    tag="span"
                                />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ConsultingFeatures;