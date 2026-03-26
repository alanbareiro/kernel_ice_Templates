import { Award, Briefcase, MapPin, Users } from 'lucide-react';
import consultingImage from '../../assets/corpo.jpg';
import EditableText from '../../components/Editor/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const ConsultingAbout = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#2563eb',
        secondary: '#475569',
        accent: '#1e293b',
        background: '#ffffff',
        text: '#0f172a'
    };

    const stats = [
        { icon: <Briefcase className="w-6 h-6" />, value: '15+', label: 'Años de experiencia', id: 'stat_1' },
        { icon: <Users className="w-6 h-6" />, value: '50+', label: 'Consultores expertos', id: 'stat_2' },
        { icon: <Award className="w-6 h-6" />, value: '200+', label: 'Proyectos exitosos', id: 'stat_3' },
        { icon: <MapPin className="w-6 h-6" />, value: '10+', label: 'Países con presencia', id: 'stat_4' },
    ];

    const differentiators = [
        'Metodologías ágiles y adaptativas',
        'Análisis de datos para toma de decisiones',
        'Acompañamiento post-implementación',
        'Confidencialidad y ética profesional',
    ];

    return (
        <section className="section-padding bg-neutral-50 dark:bg-neutral-950">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Imagen */}
                    <div className="relative group order-2 lg:order-1">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-slate-600 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl" />

                        <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
                            <div className="aspect-[4/5] relative overflow-hidden">
                                <EditableImage
                                    elementId="about_image"
                                    defaultImage={consultingImage}
                                    alt="Equipo de consultores"
                                    className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                                        <span className="text-sm font-medium text-blue-300">
                                            <EditableText
                                                elementId="about_badge"
                                                defaultText="Equipo multidisciplinario"
                                                tag="span"
                                            />
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 leading-tight">
                                        <EditableText
                                            elementId="about_title"
                                            defaultText="Expertos en diversas industrias"
                                            tag="span"
                                        />
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4"
                                style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}>
                                <EditableText
                                    elementId="about_section_badge"
                                    defaultText="Nuestra Firma"
                                    tag="span"
                                />
                            </span>

                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
                                <EditableText
                                    elementId="about_heading_1"
                                    defaultText="Consultoría con"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-600"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText
                                        elementId="about_heading_2"
                                        defaultText="Resultados Medibles"
                                        tag="span"
                                    />
                                </span>
                            </h2>

                            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                                <EditableText
                                    elementId="about_description_1"
                                    defaultText="En Kernelize Consulting no creemos en soluciones genéricas. Cada empresa es un mundo, y por eso diseñamos estrategias a medida que abordan tus desafíos específicos y potencian tus fortalezas únicas."
                                    tag="span"
                                />
                            </p>

                            <p className="text-neutral-600 dark:text-neutral-400">
                                <EditableText
                                    elementId="about_description_2"
                                    defaultText="Nuestro enfoque combina el rigor analítico con la creatividad estratégica. Trabajamos codo a codo con tu equipo para asegurar que las soluciones no solo se implementen, sino que se mantengan en el tiempo y se adapten a un entorno cambiante."
                                    tag="span"
                                />
                            </p>
                        </div>

                        {/* Estadísticas */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                                        style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 transition-colors"
                                        style={{ color: colors.text }}>
                                        <EditableText
                                            elementId={`stat_value_${stat.id}`}
                                            defaultText={stat.value}
                                            tag="span"
                                        />
                                    </div>
                                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                                        <EditableText
                                            elementId={`stat_label_${stat.id}`}
                                            defaultText={stat.label}
                                            tag="span"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Lista de diferenciadores */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                                <EditableText
                                    elementId="about_commitment_title"
                                    defaultText="Nuestro compromiso:"
                                    tag="span"
                                />
                            </h3>
                            <ul className="space-y-3">
                                {differentiators.map((item, index) => (
                                    <li key={index} className="flex items-center">
                                        <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                                            style={{ backgroundColor: colors.primary }}>
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-neutral-700 dark:text-neutral-300">
                                            <EditableText
                                                elementId={`differentiator_${index}`}
                                                defaultText={item}
                                                tag="span"
                                            />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultingAbout;