import { ArrowRight, Building, Home } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const RealEstateHero: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#2d6a4f',
        secondary: '#1e4b3a',
        accent: '#0d2f24',
    };

    return (
        <section className="relative section-padding overflow-hidden bg-emerald-50 dark:bg-emerald-950">
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
                                <Building className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="re_hero_badge"
                                    defaultText="Inmobiliaria de confianza"
                                    tag="span"
                                />
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-emerald-900 dark:text-emerald-100">
                                <EditableText
                                    elementId="re_hero_title_1"
                                    defaultText="Encontrá el"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText
                                        elementId="re_hero_title_2"
                                        defaultText="hogar"
                                        tag="span"
                                    />
                                </span>{' '}
                                <EditableText
                                    elementId="re_hero_title_3"
                                    defaultText="de tus sueños"
                                    tag="span"
                                />
                            </h1>

                            <p className="text-xl text-emerald-700 dark:text-emerald-300 max-w-2xl">
                                <EditableText
                                    elementId="re_hero_description"
                                    defaultText="Más de 500 propiedades en venta y alquiler. Departamentos, casas, oficinas y terrenos en las mejores zonas."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                <EditableText
                                    elementId="re_cta_primary"
                                    defaultText="Ver propiedades"
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="group bg-transparent border-2 font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                                style={{ borderColor: colors.primary, color: colors.primary }}>
                                <EditableText
                                    elementId="re_cta_secondary"
                                    defaultText="Vender mi propiedad"
                                    tag="span"
                                />
                            </button>
                        </div>

                        {/* Estadísticas */}
                        <div className="pt-8 grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                                    <EditableText elementId="re_stat_1_value" defaultText="500+" tag="span" />
                                </div>
                                <div className="text-sm text-emerald-600 dark:text-emerald-400">
                                    <EditableText elementId="re_stat_1_label" defaultText="Propiedades" tag="span" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                                    <EditableText elementId="re_stat_2_value" defaultText="15+" tag="span" />
                                </div>
                                <div className="text-sm text-emerald-600 dark:text-emerald-400">
                                    <EditableText elementId="re_stat_2_label" defaultText="Años de experiencia" tag="span" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                                    <EditableText elementId="re_stat_3_value" defaultText="20" tag="span" />
                                </div>
                                <div className="text-sm text-emerald-600 dark:text-emerald-400">
                                    <EditableText elementId="re_stat_3_label" defaultText="Agentes" tag="span" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Imagen derecha */}
                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <EditableImage
                                elementId="re_hero_image"
                                defaultImage=""
                                alt="Propiedades"
                                className="w-full h-auto object-cover"
                                category="realestate"
                            />
                        </div>

                        {/* Badge flotante */}
                        <div className="absolute -bottom-4 -left-4 bg-white dark:bg-emerald-800 rounded-2xl shadow-xl p-4">
                            <div className="flex items-center space-x-3">
                                <Home className="w-8 h-8" style={{ color: colors.primary }} />
                                <div>
                                    <p className="font-bold text-emerald-900 dark:text-white">
                                        <EditableText elementId="re_hero_badge_title" defaultText="Propiedades" tag="span" />
                                    </p>
                                    <p className="text-sm text-emerald-600 dark:text-emerald-300">
                                        <EditableText elementId="re_hero_badge_text" defaultText="en todo el país" tag="span" />
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

export default RealEstateHero;