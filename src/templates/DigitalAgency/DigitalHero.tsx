import { ArrowRight, Zap } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const DigitalHero: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#0891b2',
        secondary: '#0e7490',
        accent: '#155e75',
    };

    return (
        <section className="relative section-padding overflow-hidden bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-950 dark:to-gray-950">
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
                                <Zap className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="di_hero_badge"
                                    defaultText="Agencia Digital Full Service"
                                    tag="span"
                                />
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-cyan-900 dark:text-cyan-100">
                                <EditableText
                                    elementId="di_hero_title_1"
                                    defaultText="Transformamos"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText
                                        elementId="di_hero_title_2"
                                        defaultText="ideas"
                                        tag="span"
                                    />
                                </span>{' '}
                                <EditableText
                                    elementId="di_hero_title_3"
                                    defaultText="en realidades digitales"
                                    tag="span"
                                />
                            </h1>

                            <p className="text-xl text-cyan-700 dark:text-cyan-300 max-w-2xl">
                                <EditableText
                                    elementId="di_hero_description"
                                    defaultText="Diseño web, desarrollo, marketing digital y branding. Creamos experiencias digitales que conectan con tu audiencia y potencian tu negocio."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                <EditableText
                                    elementId="di_cta_primary"
                                    defaultText="Contanos tu proyecto"
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="group bg-transparent border-2 font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                                style={{ borderColor: colors.primary, color: colors.primary }}>
                                <EditableText
                                    elementId="di_cta_secondary"
                                    defaultText="Ver portfolio"
                                    tag="span"
                                />
                            </button>
                        </div>

                        {/* Estadísticas */}
                        <div className="pt-8 grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-900 dark:text-cyan-100">
                                    <EditableText elementId="di_stat_1_value" defaultText="150+" tag="span" />
                                </div>
                                <div className="text-sm text-cyan-600 dark:text-cyan-400">
                                    <EditableText elementId="di_stat_1_label" defaultText="Proyectos" tag="span" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-900 dark:text-cyan-100">
                                    <EditableText elementId="di_stat_2_value" defaultText="8+" tag="span" />
                                </div>
                                <div className="text-sm text-cyan-600 dark:text-cyan-400">
                                    <EditableText elementId="di_stat_2_label" defaultText="Años" tag="span" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-900 dark:text-cyan-100">
                                    <EditableText elementId="di_stat_3_value" defaultText="12" tag="span" />
                                </div>
                                <div className="text-sm text-cyan-600 dark:text-cyan-400">
                                    <EditableText elementId="di_stat_3_label" defaultText="Expertos" tag="span" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Imagen derecha */}
                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <EditableImage
                                elementId="di_hero_image"
                                defaultImage=""
                                alt="Equipo digital"
                                className="w-full h-auto object-cover"
                                category="digital"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DigitalHero;