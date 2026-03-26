import { ArrowRight, Target, TrendingUp } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableText from '../../components/Editor/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const AgencyHero: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#c026d3',
        secondary: '#a21caf',
        accent: '#86198f',
    };

    return (
        <section className="relative section-padding overflow-hidden"
            style={{ background: `linear-gradient(135deg, #fae8ff 0%, #ffffff 100%)` }}>
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
                                <TrendingUp className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="ag_hero_badge"
                                    defaultText="Agencia de Marketing Digital"
                                    tag="span"
                                />
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-purple-900 dark:text-purple-100">
                                <EditableText
                                    elementId="ag_hero_title_1"
                                    defaultText="Hacemos crecer"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText
                                        elementId="ag_hero_title_2"
                                        defaultText="tu negocio"
                                        tag="span"
                                    />
                                </span>
                            </h1>

                            <p className="text-xl text-purple-700 dark:text-purple-300 max-w-2xl">
                                <EditableText
                                    elementId="ag_hero_description"
                                    defaultText="Estrategias personalizadas de marketing digital que generan resultados reales. Aumentamos tus ventas, mejoramos tu presencia online y conectamos con tus clientes."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                <EditableText
                                    elementId="ag_cta_primary"
                                    defaultText="Empezar ahora"
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="group bg-transparent border-2 font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                                style={{ borderColor: colors.primary, color: colors.primary }}>
                                <EditableText
                                    elementId="ag_cta_secondary"
                                    defaultText="Ver casos de éxito"
                                    tag="span"
                                />
                            </button>
                        </div>

                        {/* Estadísticas */}
                        <div className="pt-8 grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                                    <EditableText elementId="ag_stat_1_value" defaultText="150+" tag="span" />
                                </div>
                                <div className="text-sm text-purple-600 dark:text-purple-400">
                                    <EditableText elementId="ag_stat_1_label" defaultText="Clientes activos" tag="span" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                                    <EditableText elementId="ag_stat_2_value" defaultText="98%" tag="span" />
                                </div>
                                <div className="text-sm text-purple-600 dark:text-purple-400">
                                    <EditableText elementId="ag_stat_2_label" defaultText="Tasa de retención" tag="span" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                                    <EditableText elementId="ag_stat_3_value" defaultText="12" tag="span" />
                                </div>
                                <div className="text-sm text-purple-600 dark:text-purple-400">
                                    <EditableText elementId="ag_stat_3_label" defaultText="Expertos" tag="span" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Imagen derecha */}
                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <EditableImage
                                elementId="ag_hero_image"
                                defaultImage={defaultImages.marketing.hero}
                                alt="Equipo de marketing"
                                className="w-full h-auto object-cover"
                                category="marketing"
                            />
                        </div>

                        {/* Badge flotante */}
                        <div className="absolute -bottom-4 -left-4 bg-white dark:bg-purple-800 rounded-2xl shadow-xl p-4">
                            <div className="flex items-center space-x-3">
                                <Target className="w-8 h-8" style={{ color: colors.primary }} />
                                <div>
                                    <p className="font-bold text-purple-900 dark:text-white">
                                        <EditableText elementId="ag_hero_badge_title" defaultText="Resultados garantizados" tag="span" />
                                    </p>
                                    <p className="text-sm text-purple-600 dark:text-purple-300">
                                        <EditableText elementId="ag_hero_badge_text" defaultText="+40% de conversión" tag="span" />
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

export default AgencyHero;