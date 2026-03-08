import { ArrowRight, Clock, Coffee, MapPin } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const CoffeeHero: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#b45309',
        secondary: '#92400e',
        accent: '#78350f',
    };

    return (
        <section className="relative section-padding overflow-hidden bg-amber-50 dark:bg-amber-950">
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
                                <Coffee className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="cf_hero_badge"
                                    defaultText="Café de especialidad"
                                    tag="span"
                                />
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-amber-900 dark:text-amber-100">
                                <EditableText
                                    elementId="cf_hero_title_1"
                                    defaultText="El mejor café"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText
                                        elementId="cf_hero_title_2"
                                        defaultText="de Buenos Aires"
                                        tag="span"
                                    />
                                </span>
                            </h1>

                            <p className="text-xl text-amber-700 dark:text-amber-300 max-w-2xl">
                                <EditableText
                                    elementId="cf_hero_description"
                                    defaultText="Granos seleccionados, tostado artesanal y un ambiente acogedor para disfrutar cada momento. Café de especialidad, pastelería y desayunos."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                <EditableText
                                    elementId="cf_cta_primary"
                                    defaultText="Ver menú"
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="group bg-transparent border-2 font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center"
                                style={{ borderColor: colors.primary, color: colors.primary }}>
                                <EditableText
                                    elementId="cf_cta_secondary"
                                    defaultText="Conocé el local"
                                    tag="span"
                                />
                            </button>
                        </div>

                        {/* Información */}
                        <div className="pt-8 flex flex-wrap gap-6">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" style={{ color: colors.primary }} />
                                <span className="text-amber-700 dark:text-amber-300">
                                    <EditableText elementId="cf_hours" defaultText="Lun-Dom 8:00 - 20:00" tag="span" />
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" style={{ color: colors.primary }} />
                                <span className="text-amber-700 dark:text-amber-300">
                                    <EditableText elementId="cf_location" defaultText="Palermo, Buenos Aires" tag="span" />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Imagen derecha */}
                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <EditableImage
                                elementId="cf_hero_image"
                                defaultImage=""
                                alt="Café de especialidad"
                                className="w-full h-auto object-cover"
                                category="coffee"
                            />
                        </div>

                        {/* Badge flotante */}
                        <div className="absolute -bottom-4 -left-4 bg-white dark:bg-amber-800 rounded-2xl shadow-xl p-4">
                            <div className="flex items-center space-x-3">
                                <Coffee className="w-8 h-8" style={{ color: colors.primary }} />
                                <div>
                                    <p className="font-bold text-amber-900 dark:text-white">
                                        <EditableText elementId="cf_hero_badge_title" defaultText="100% orgánico" tag="span" />
                                    </p>
                                    <p className="text-sm text-amber-700 dark:text-amber-300">
                                        <EditableText elementId="cf_hero_badge_text" defaultText="Tostado artesanal" tag="span" />
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

export default CoffeeHero;