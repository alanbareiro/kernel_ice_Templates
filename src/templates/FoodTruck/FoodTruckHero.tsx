import { ArrowRight, Instagram, MapPin, Truck } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const FoodTruckHero: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#e67e22',
        secondary: '#d35400',
        accent: '#a04000',
    };

    return (
        <section className="relative section-padding overflow-hidden bg-orange-50 dark:bg-orange-950">
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
                                <Truck className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="ft_hero_badge"
                                    defaultText="La mejor comida sobre ruedas"
                                    tag="span"
                                />
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-orange-900 dark:text-orange-100">
                                <EditableText
                                    elementId="ft_hero_title_1"
                                    defaultText="Gourmet que"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText
                                        elementId="ft_hero_title_2"
                                        defaultText="viaja"
                                        tag="span"
                                    />
                                </span>
                            </h1>

                            <p className="text-xl text-orange-700 dark:text-orange-300 max-w-2xl">
                                <EditableText
                                    elementId="ft_hero_description"
                                    defaultText="Comida callejera con identidad propia. Hamburguesas gourmet, tacos, y más. Cambiamos de ubicación cada día, seguinos para saber dónde estamos."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                <EditableText
                                    elementId="ft_cta_primary"
                                    defaultText="Ver menú"
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="group bg-transparent border-2 font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center"
                                style={{ borderColor: colors.primary, color: colors.primary }}>
                                <MapPin className="mr-2 w-5 h-5" />
                                <EditableText
                                    elementId="ft_cta_secondary"
                                    defaultText="Dónde estamos hoy"
                                    tag="span"
                                />
                            </button>
                        </div>

                        {/* Redes sociales */}
                        <div className="pt-4 flex items-center gap-4">
                            <span className="text-orange-600 dark:text-orange-400">Seguinos:</span>
                            <a href="#" className="p-2 bg-orange-100 dark:bg-orange-800 rounded-full hover:bg-orange-200 dark:hover:bg-orange-700 transition-colors">
                                <Instagram className="w-5 h-5" style={{ color: colors.primary }} />
                            </a>
                        </div>
                    </div>

                    {/* Imagen derecha */}
                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <EditableImage
                                elementId="ft_hero_image"
                                defaultImage=""
                                alt="Food Truck"
                                className="w-full h-auto object-cover"
                                category="foodtruck"
                            />
                        </div>

                        {/* Badge flotante */}
                        <div className="absolute -bottom-4 -left-4 bg-white dark:bg-orange-800 rounded-2xl shadow-xl p-4">
                            <div className="flex items-center space-x-3">
                                <Truck className="w-8 h-8" style={{ color: colors.primary }} />
                                <div>
                                    <p className="font-bold text-orange-900 dark:text-white">
                                        <EditableText elementId="ft_hero_badge_title" defaultText="Today's location" tag="span" />
                                    </p>
                                    <p className="text-sm text-orange-600 dark:text-orange-300">
                                        <EditableText elementId="ft_hero_badge_text" defaultText="Parque Centenario" tag="span" />
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

export default FoodTruckHero;