import { ArrowRight, Building, Ruler } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultImages } from '../../assets/default-images';

const ArchitectureHero: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#57534e',
        secondary: '#44403c',
        accent: '#292524',
    };

    return (
        <section className="relative section-padding overflow-hidden bg-stone-50 dark:bg-stone-950">
            {/* Elementos decorativos geométricos */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-96 h-96 border-8 border-stone-300 rotate-45"></div>
                <div className="absolute bottom-20 right-10 w-64 h-64 border-8 border-stone-300 -rotate-12"></div>
            </div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido izquierdo */}
                    <div className="space-y-8">
                        <div>
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                <Building className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="ar_hero_badge"
                                    defaultText="Estudio de Arquitectura"
                                    tag="span"
                                />
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-stone-900 dark:text-stone-100">
                                <EditableText
                                    elementId="ar_hero_title_1"
                                    defaultText="Diseñamos"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText
                                        elementId="ar_hero_title_2"
                                        defaultText="espacios"
                                        tag="span"
                                    />
                                </span>{' '}
                                <EditableText
                                    elementId="ar_hero_title_3"
                                    defaultText="que inspiran"
                                    tag="span"
                                />
                            </h1>

                            <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl">
                                <EditableText
                                    elementId="ar_hero_description"
                                    defaultText="Creemos que la arquitectura va más allá de construir edificios. Diseñamos espacios que mejoran la calidad de vida de las personas y respetan su entorno."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                <EditableText
                                    elementId="ar_cta_primary"
                                    defaultText="Ver proyectos"
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="group bg-transparent border-2 font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                                style={{ borderColor: colors.primary, color: colors.primary }}>
                                <EditableText
                                    elementId="ar_cta_secondary"
                                    defaultText="Contactar"
                                    tag="span"
                                />
                            </button>
                        </div>

                        {/* Estadísticas */}
                        <div className="pt-8 grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                                    <EditableText elementId="ar_stat_1_value" defaultText="15+" tag="span" />
                                </div>
                                <div className="text-sm text-stone-600 dark:text-stone-400">
                                    <EditableText elementId="ar_stat_1_label" defaultText="Años de experiencia" tag="span" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                                    <EditableText elementId="ar_stat_2_value" defaultText="200+" tag="span" />
                                </div>
                                <div className="text-sm text-stone-600 dark:text-stone-400">
                                    <EditableText elementId="ar_stat_2_label" defaultText="Proyectos realizados" tag="span" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                                    <EditableText elementId="ar_stat_3_value" defaultText="12" tag="span" />
                                </div>
                                <div className="text-sm text-stone-600 dark:text-stone-400">
                                    <EditableText elementId="ar_stat_3_label" defaultText="Arquitectos" tag="span" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Imagen derecha */}
                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <EditableImage
                                elementId="ar_hero_image"
                                defaultImage={defaultImages.architecture.hero}
                                alt="Proyecto arquitectónico"
                                className="w-full h-auto object-cover"
                                category="architecture"
                            />
                        </div>

                        {/* Badge flotante */}
                        <div className="absolute -bottom-4 -left-4 bg-white dark:bg-stone-800 rounded-2xl shadow-xl p-4">
                            <div className="flex items-center space-x-3">
                                <Ruler className="w-8 h-8" style={{ color: colors.primary }} />
                                <div>
                                    <p className="font-bold text-stone-900 dark:text-white">
                                        <EditableText elementId="ar_hero_badge_title" defaultText="Diseño personalizado" tag="span" />
                                    </p>
                                    <p className="text-sm text-stone-600 dark:text-stone-400">
                                        <EditableText elementId="ar_hero_badge_text" defaultText="Para cada cliente" tag="span" />
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

export default ArchitectureHero;