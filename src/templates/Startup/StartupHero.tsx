import { ArrowRight, Rocket, Zap } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const StartupHero: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#059669',
        secondary: '#047857',
        accent: '#065f46',
    };

    return (
        <section className="relative section-padding overflow-hidden bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950 dark:to-gray-950">
            {/* Elementos decorativos */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
                    style={{ backgroundColor: colors.primary }} />
                <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"
                    style={{ backgroundColor: colors.accent }} />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido izquierdo */}
                    <div className="space-y-8">
                        <div>
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                <Rocket className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="st_hero_badge"
                                    defaultText="Innovación que transforma"
                                    tag="span"
                                />
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-emerald-900 dark:text-emerald-100">
                                <EditableText
                                    elementId="st_hero_title_1"
                                    defaultText="Revolucionamos la"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText
                                        elementId="st_hero_title_2"
                                        defaultText="industria"
                                        tag="span"
                                    />
                                </span>
                            </h1>

                            <p className="text-xl text-emerald-700 dark:text-emerald-300 max-w-2xl">
                                <EditableText
                                    elementId="st_hero_description"
                                    defaultText="Desarrollamos tecnología que resuelve problemas reales. Conocé nuestra propuesta y unite a la revolución."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                <EditableText
                                    elementId="st_cta_primary"
                                    defaultText="Solicitar demo"
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="group bg-transparent border-2 font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                                style={{ borderColor: colors.primary, color: colors.primary }}>
                                <EditableText
                                    elementId="st_cta_secondary"
                                    defaultText="Ver video"
                                    tag="span"
                                />
                            </button>
                        </div>

                        {/* Trust indicators */}
                        <div className="pt-8 flex items-center gap-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r from-emerald-400 to-emerald-600" />
                                ))}
                            </div>
                            <div className="text-sm text-emerald-600 dark:text-emerald-400">
                                <span className="font-bold text-emerald-900 dark:text-white">+200</span> inversores confían
                            </div>
                        </div>
                    </div>

                    {/* Imagen derecha */}
                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <EditableImage
                                elementId="st_hero_image"
                                defaultImage=""
                                alt="Startup"
                                className="w-full h-auto object-cover"
                                category="startup"
                            />
                        </div>

                        {/* Badge flotante */}
                        <div className="absolute -bottom-4 -left-4 bg-white dark:bg-emerald-800 rounded-2xl shadow-xl p-4">
                            <div className="flex items-center space-x-3">
                                <Zap className="w-8 h-8" style={{ color: colors.primary }} />
                                <div>
                                    <p className="font-bold text-emerald-900 dark:text-white">
                                        <EditableText elementId="st_hero_badge_title" defaultText="Traction" tag="span" />
                                    </p>
                                    <p className="text-sm text-emerald-600 dark:text-emerald-300">
                                        <EditableText elementId="st_hero_badge_text" defaultText="+150% crecimiento" tag="span" />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StartupHero;