import { ArrowRight, Target } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const ConsultingHero = () => {
    const { template } = useTemplate();

    // Si no hay template, usar colores por defecto
    const colors = template?.colors || {
        primary: '#2563eb',
        secondary: '#475569',
        accent: '#1e293b',
        background: '#ffffff',
        text: '#0f172a'
    };

    return (
        <section
            className="relative section-padding overflow-hidden"
            style={{
                background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.secondary} 100%)`
            }}
        >
            {/* Elementos decorativos con los colores del template */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
                    style={{ backgroundColor: colors.primary }}
                />
                <div
                    className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"
                    style={{ backgroundColor: colors.accent }}
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
                                    backgroundColor: `${colors.primary}20`,
                                    borderColor: colors.primary,
                                    color: '#ffffff'
                                }}
                            >
                                <Target className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
                                <EditableText
                                    elementId="hero_badge"
                                    defaultText="Consultoría Estratégica de Negocios"
                                    tag="span"
                                />
                            </span>

                 {/* // Asegurate que cada EditableText tenga un ID único y consistente */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
                                <EditableText
                                    elementId="hero_title_1"
                                    defaultText="Impulsamos el"
                                    tag="span"
                                />{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{
                                        backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`
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

                            <p className="text-xl text-white/80 max-w-2xl">
                                <EditableText
                                    elementId="hero_description"
                                    defaultText="Análisis profundo, estrategias personalizadas y acompañamiento continuo para llevar tu negocio al siguiente nivel."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                className="group font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                style={{
                                    background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
                                    color: '#ffffff'
                                }}
                            >
                                <EditableText
                                    elementId="cta_primary"
                                    defaultText="Solicitar una consultoría"
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                className="group bg-transparent border-2 font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                                style={{
                                    borderColor: colors.primary,
                                    color: '#ffffff'
                                }}
                            >
                                <EditableText
                                    elementId="cta_secondary"
                                    defaultText="Conocer nuestra metodología"
                                    tag="span"
                                />
                            </button>
                        </div>
                    </div>

                    {/* Imagen derecha con estadísticas */}
                    <div className="relative">
                        <div
                            className="relative z-10 backdrop-blur-sm rounded-2xl border p-8 shadow-2xl"
                            style={{
                                backgroundColor: `${colors.background}10`,
                                borderColor: `${colors.primary}40`
                            }}
                        >
                            <div className="space-y-6">
                                <StatCard
                                    icon="📈"
                                    title="+45%"
                                    description="de crecimiento"
                                    color={colors.primary}
                                />
                                <StatCard
                                    icon="👥"
                                    title="+15"
                                    description="equipos transformados"
                                    color={colors.secondary}
                                />
                                <StatCard
                                    icon="🎯"
                                    title="100%"
                                    description="de objetivos"
                                    color={colors.accent}
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
                <h3 className="font-bold text-xl text-white">{title}</h3>
                <p className="text-sm text-white/80">{description}</p>
            </div>
        </div>
    );

export default ConsultingHero;