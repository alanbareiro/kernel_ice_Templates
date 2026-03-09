import { ArrowRight, Cake, Heart } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const BakeryHero: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#e11d48',
        secondary: '#be123c',
        accent: '#9f1239',
    };

    return (
        <section className="relative section-padding overflow-hidden bg-rose-50 dark:bg-rose-950">
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
                                <Cake className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="bk_hero_badge"
                                    defaultText="Panadería y Pastelería Artesanal"
                                    tag="span"
                                />
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-rose-900 dark:text-rose-100">
                                <EditableText
                                    elementId="bk_hero_title_1"
                                    defaultText="El sabor de lo"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText
                                        elementId="bk_hero_title_2"
                                        defaultText="auténtico"
                                        tag="span"
                                    />
                                </span>
                            </h1>

                            <p className="text-xl text-rose-700 dark:text-rose-300 max-w-2xl">
                                <EditableText
                                    elementId="bk_hero_description"
                                    defaultText="Pan horneado a diario, facturas artesanales y pastelería con recetas tradicionales. Ingredientes seleccionados y mucho amor en cada preparación."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                <EditableText
                                    elementId="bk_cta_primary"
                                    defaultText="Ver productos"
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="group bg-transparent border-2 font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center"
                                style={{ borderColor: colors.primary, color: colors.primary }}>
                                <EditableText
                                    elementId="bk_cta_secondary"
                                    defaultText="Hacé tu pedido"
                                    tag="span"
                                />
                            </button>
                        </div>

                        {/* Estadísticas */}
                        <div className="pt-8 grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-rose-900 dark:text-rose-100">
                                    <EditableText elementId="bk_stat_1_value" defaultText="30+" tag="span" />
                                </div>
                                <div className="text-sm text-rose-600 dark:text-rose-400">
                                    <EditableText elementId="bk_stat_1_label" defaultText="Años de tradición" tag="span" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-rose-900 dark:text-rose-100">
                                    <EditableText elementId="bk_stat_2_value" defaultText="50+" tag="span" />
                                </div>
                                <div className="text-sm text-rose-600 dark:text-rose-400">
                                    <EditableText elementId="bk_stat_2_label" defaultText="Productos artesanales" tag="span" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-rose-900 dark:text-rose-100">
                                    <EditableText elementId="bk_stat_3_value" defaultText="100%" tag="span" />
                                </div>
                                <div className="text-sm text-rose-600 dark:text-rose-400">
                                    <EditableText elementId="bk_stat_3_label" defaultText="Recetas tradicionales" tag="span" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Imagen derecha */}
                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <EditableImage
                                elementId="bk_hero_image"
                                defaultImage={defaultImages.bakery.hero}
                                alt="Panadería artesanal"
                                className="w-full h-auto object-cover"
                                category="bakery"
                            />
                        </div>

                        {/* Badge flotante */}
                        <div className="absolute -bottom-4 -left-4 bg-white dark:bg-rose-800 rounded-2xl shadow-xl p-4">
                            <div className="flex items-center space-x-3">
                                <Heart className="w-8 h-8" style={{ color: colors.primary }} />
                                <div>
                                    <p className="font-bold text-rose-900 dark:text-white">
                                        <EditableText elementId="bk_hero_badge_title" defaultText="Hecho con amor" tag="span" />
                                    </p>
                                    <p className="text-sm text-rose-600 dark:text-rose-300">
                                        <EditableText elementId="bk_hero_badge_text" defaultText="Recetas de la abuela" tag="span" />
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

export default BakeryHero;