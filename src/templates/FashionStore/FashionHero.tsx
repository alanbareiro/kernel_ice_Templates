import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const FashionHero: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#000000',
        secondary: '#1f2937',
        accent: '#4b5563',
    };

    return (
        <section className="relative section-padding overflow-hidden bg-white dark:bg-gray-950">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido izquierdo */}
                    <div className="space-y-8">
                        <div>
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                                <Sparkles className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="fa_hero_badge"
                                    defaultText="Nueva Colección Otoño/Invierno"
                                    tag="span"
                                />
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900 dark:text-white">
                                <EditableText
                                    elementId="fa_hero_title_1"
                                    defaultText="Expresá tu"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText
                                        elementId="fa_hero_title_2"
                                        defaultText="estilo"
                                        tag="span"
                                    />
                                </span>
                            </h1>

                            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                                <EditableText
                                    elementId="fa_hero_description"
                                    defaultText="Descubrí las últimas tendencias en moda. Diseños exclusivos, calidad premium y envíos a todo el país."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                <EditableText
                                    elementId="fa_cta_primary"
                                    defaultText="Comprar ahora"
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="group bg-transparent border-2 border-gray-300 hover:border-gray-900 text-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:border-white font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center">
                                <EditableText
                                    elementId="fa_cta_secondary"
                                    defaultText="Ver colección"
                                    tag="span"
                                />
                            </button>
                        </div>

                        {/* Estadísticas */}
                        <div className="pt-8 flex items-center gap-8">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-r from-gray-400 to-gray-600" />
                                ))}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-bold text-gray-900 dark:text-white">+5000</span> clientas felices
                            </div>
                        </div>
                    </div>

                    {/* Imagen derecha */}
                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <EditableImage
                                elementId="fa_hero_image"
                                defaultImage=""
                                alt="Modelo con ropa de la colección"
                                className="w-full h-auto object-cover"
                                category="fashion"
                            />
                        </div>

                        {/* Badge flotante */}
                        <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4">
                            <div className="flex items-center space-x-3">
                                <Heart className="w-8 h-8" style={{ color: colors.primary }} />
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">
                                        <EditableText elementId="fa_hero_badge_title" defaultText="20% OFF" tag="span" />
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        <EditableText elementId="fa_hero_badge_text" defaultText="en tu primera compra" tag="span" />
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

export default FashionHero;