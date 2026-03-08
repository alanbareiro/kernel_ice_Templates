import { ArrowRight, Check, Cpu } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const SaaSHero: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#7c3aed',
        secondary: '#6d28d9',
        accent: '#5b21b6',
    };

    return (
        <section className="relative section-padding overflow-hidden bg-gradient-to-br from-violet-50 to-white dark:from-violet-950 dark:to-gray-950">
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
                                <Cpu className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="sa_hero_badge"
                                    defaultText="Plataforma todo-en-uno"
                                    tag="span"
                                />
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-violet-900 dark:text-violet-100">
                                <EditableText
                                    elementId="sa_hero_title_1"
                                    defaultText="Simplificá tu"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText
                                        elementId="sa_hero_title_2"
                                        defaultText="negocio"
                                        tag="span"
                                    />
                                </span>
                            </h1>

                            <p className="text-xl text-violet-700 dark:text-violet-300 max-w-2xl">
                                <EditableText
                                    elementId="sa_hero_description"
                                    defaultText="La plataforma SaaS que automatiza tus procesos, ahorra tiempo y aumenta la productividad de tu equipo. Todo en un solo lugar."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                <EditableText
                                    elementId="sa_cta_primary"
                                    defaultText="Prueba gratis 14 días"
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="group bg-transparent border-2 font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                                style={{ borderColor: colors.primary, color: colors.primary }}>
                                <EditableText
                                    elementId="sa_cta_secondary"
                                    defaultText="Ver demo"
                                    tag="span"
                                />
                            </button>
                        </div>

                        {/* Beneficios */}
                        <div className="pt-4 flex flex-wrap gap-4">
                            <div className="flex items-center gap-2"><Check className="w-5 h-5" style={{ color: colors.primary }} /><span className="text-violet-700 dark:text-violet-300"><EditableText elementId="sa_benefit_1" defaultText="Sin tarjeta de crédito" tag="span" /></span></div>
                            <div className="flex items-center gap-2"><Check className="w-5 h-5" style={{ color: colors.primary }} /><span className="text-violet-700 dark:text-violet-300"><EditableText elementId="sa_benefit_2" defaultText="Cancela cuando quieras" tag="span" /></span></div>
                        </div>
                    </div>

                    {/* Imagen derecha */}
                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-violet-200 dark:border-violet-800">
                            <EditableImage
                                elementId="sa_hero_image"
                                defaultImage=""
                                alt="Dashboard SaaS"
                                className="w-full h-auto object-cover"
                                category="saas"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SaaSHero;