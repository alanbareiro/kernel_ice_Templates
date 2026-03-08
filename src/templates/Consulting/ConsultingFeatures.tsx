import {
    Award,
    BarChart,
    Globe,
    LineChart,
    Target,
    Users
} from 'lucide-react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const ConsultingFeatures = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#2563eb',
        secondary: '#475569',
        accent: '#1e293b',
        background: '#ffffff',
        text: '#0f172a'
    };

    const features = [
        {
            icon: <BarChart className="w-8 h-8" />,
            title: 'Análisis Estratégico',
            description: 'Evaluación profunda de tu mercado, competencia y posición actual para identificar oportunidades.',
            color: 'from-blue-600 to-blue-800',
            id: 'strategic'
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: 'Gestión del Talento',
            description: 'Desarrollo de equipos de alto rendimiento y cultura organizacional alineada a objetivos.',
            color: 'from-slate-600 to-slate-800',
            id: 'talent'
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: 'Planificación Comercial',
            description: 'Estrategias de ventas y marketing para penetrar mercados y fidelizar clientes.',
            color: 'from-blue-700 to-slate-900',
            id: 'commercial'
        },
        {
            icon: <LineChart className="w-8 h-8" />,
            title: 'Optimización Financiera',
            description: 'Mejora de la rentabilidad, control de costos y planificación financiera a corto y largo plazo.',
            color: 'from-blue-500 to-blue-700',
            id: 'financial'
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: 'Certificaciones y Normas',
            description: 'Asesoramiento para obtener certificaciones de calidad que mejoren tu competitividad.',
            color: 'from-slate-500 to-slate-700',
            id: 'certifications'
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: 'Expansión Internacional',
            description: 'Estrategias para llevar tu negocio a nuevos mercados con el menor riesgo posible.',
            color: 'from-blue-800 to-slate-800',
            id: 'international'
        },
    ];

    return (
        <section className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
                        <EditableText
                            elementId="features_title_1"
                            defaultText="Capacidades que"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="features_title_2"
                                defaultText="Transforman"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400">
                        <EditableText
                            elementId="features_description"
                            defaultText="No solo aconsejamos, implementamos. Te acompañamos en cada paso con herramientas y metodologías probadas."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition-all duration-300 hover:shadow-xl"
                            style={{ borderColor: `hover:${colors.primary}` }}>
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <div className="w-full h-full rounded-xl bg-white dark:bg-neutral-900 flex items-center justify-center"
                                    style={{ color: colors.primary }}>
                                    {feature.icon}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                <EditableText
                                    elementId={`feature_title_${feature.id}`}
                                    defaultText={feature.title}
                                    tag="span"
                                />
                            </h3>

                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
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