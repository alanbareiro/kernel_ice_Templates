import { ArrowRight, Dumbbell, Trophy } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const GymHero: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#ea580c',
        secondary: '#c2410c',
        accent: '#9a3412',
    };

    return (
        <section className="relative section-padding overflow-hidden bg-black text-white">
            {/* Imagen de fondo con overlay */}
            <div className="absolute inset-0">
                <EditableImage
                    elementId="gm_hero_bg"
                    defaultImage={defaultImages.gym.hero}
                    alt="Gimnasio"
                    className="w-full h-full object-cover opacity-40"
                    category="gym"
                />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido izquierdo */}
                    <div className="space-y-8">
                        <div>
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 bg-orange-500/20 text-orange-400 border border-orange-500/30">
                                <Dumbbell className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="gm_hero_badge"
                                    defaultText="Transformá tu cuerpo"
                                    tag="span"
                                />
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                <EditableText
                                    elementId="gm_hero_title_1"
                                    defaultText="Superá tus"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText
                                        elementId="gm_hero_title_2"
                                        defaultText="límites"
                                        tag="span"
                                    />
                                </span>
                            </h1>

                            <p className="text-xl text-gray-300 max-w-2xl">
                                <EditableText
                                    elementId="gm_hero_description"
                                    defaultText="Entrenamiento de alta calidad, instalaciones modernas y los mejores entrenadores para ayudarte a alcanzar tus metas fitness."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                <EditableText
                                    elementId="gm_cta_primary"
                                    defaultText="Comenzá ahora"
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="group bg-transparent border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center">
                                <EditableText
                                    elementId="gm_cta_secondary"
                                    defaultText="Clases gratis"
                                    tag="span"
                                />
                            </button>
                        </div>

                        {/* Estadísticas */}
                        <div className="pt-8 grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">
                                    <EditableText elementId="gm_stat_1_value" defaultText="15+" tag="span" />
                                </div>
                                <div className="text-sm text-gray-400">
                                    <EditableText elementId="gm_stat_1_label" defaultText="Años de experiencia" tag="span" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">
                                    <EditableText elementId="gm_stat_2_value" defaultText="2000+" tag="span" />
                                </div>
                                <div className="text-sm text-gray-400">
                                    <EditableText elementId="gm_stat_2_label" defaultText="Miembros activos" tag="span" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">
                                    <EditableText elementId="gm_stat_3_value" defaultText="20+" tag="span" />
                                </div>
                                <div className="text-sm text-gray-400">
                                    <EditableText elementId="gm_stat_3_label" defaultText="Entrenadores" tag="span" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Imagen derecha */}
                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <EditableImage
                                elementId="gm_hero_image"
                                defaultImage={defaultImages.gym.class1}
                                alt="Entrenamiento"
                                className="w-full h-auto object-cover"
                                category="gym"
                            />
                        </div>

                        {/* Badge flotante */}
                        <div className="absolute -bottom-4 -left-4 bg-black border border-orange-500 rounded-2xl shadow-xl p-4">
                            <div className="flex items-center space-x-3">
                                <Trophy className="w-8 h-8" style={{ color: colors.primary }} />
                                <div>
                                    <p className="font-bold text-white">
                                        <EditableText elementId="gm_hero_badge_title" defaultText="Clase prueba" tag="span" />
                                    </p>
                                    <p className="text-sm text-orange-400">
                                        <EditableText elementId="gm_hero_badge_text" defaultText="gratis" tag="span" />
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

export default GymHero;