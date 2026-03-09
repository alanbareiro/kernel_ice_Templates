import { ArrowRight, Clock, Shield, Sparkles } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const CleaningHero: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#0284c7',
        secondary: '#0369a1',
        accent: '#075985',
    };

    return (
        <section className="relative section-padding overflow-hidden bg-gradient-to-br from-sky-50 to-white dark:from-sky-950 dark:to-gray-950">
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
                                <Sparkles className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="cl_hero_badge"
                                    defaultText="Profesionales en limpieza"
                                    tag="span"
                                />
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-sky-900 dark:text-sky-100">
                                <EditableText
                                    elementId="cl_hero_title_1"
                                    defaultText="Dejamos tu espacio"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText
                                        elementId="cl_hero_title_2"
                                        defaultText="impecable"
                                        tag="span"
                                    />
                                </span>
                            </h1>

                            <p className="text-xl text-sky-700 dark:text-sky-300 max-w-2xl">
                                <EditableText
                                    elementId="cl_hero_description"
                                    defaultText="Servicios de limpieza profesional para hogares y empresas. Productos ecológicos, personal capacitado y resultados garantizados."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                <EditableText
                                    elementId="cl_cta_primary"
                                    defaultText="Cotizar servicio"
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="group bg-transparent border-2 font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                                style={{ borderColor: colors.primary, color: colors.primary }}>
                                <EditableText
                                    elementId="cl_cta_secondary"
                                    defaultText="Ver servicios"
                                    tag="span"
                                />
                            </button>
                        </div>

                        {/* Beneficios */}
                        <div className="pt-8 flex flex-wrap gap-6">
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5" style={{ color: colors.primary }} />
                                <span className="text-sky-700 dark:text-sky-300">
                                    <EditableText elementId="cl_benefit_1" defaultText="Personal capacitado" tag="span" />
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" style={{ color: colors.primary }} />
                                <span className="text-sky-700 dark:text-sky-300">
                                    <EditableText elementId="cl_benefit_2" defaultText="Cumplimiento horario" tag="span" />
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5" style={{ color: colors.primary }} />
                                <span className="text-sky-700 dark:text-sky-300">
                                    <EditableText elementId="cl_benefit_3" defaultText="Productos ecológicos" tag="span" />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Imagen derecha */}
                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <EditableImage
                                elementId="cl_hero_image"
                                defaultImage={defaultImages.cleaning.hero}
                                alt="Servicio de limpieza"
                                className="w-full h-auto object-cover"
                                category="cleaning"
                            />
                        </div>

                        {/* Badge flotante */}
                        <div className="absolute -bottom-4 -left-4 bg-white dark:bg-sky-800 rounded-2xl shadow-xl p-4">
                            <div className="flex items-center space-x-3">
                                <Sparkles className="w-8 h-8" style={{ color: colors.primary }} />
                                <div>
                                    <p className="font-bold text-sky-900 dark:text-white">
                                        <EditableText elementId="cl_hero_badge_title" defaultText="10% OFF" tag="span" />
                                    </p>
                                    <p className="text-sm text-sky-600 dark:text-sky-300">
                                        <EditableText elementId="cl_hero_badge_text" defaultText="en tu primer servicio" tag="span" />
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

export default CleaningHero;