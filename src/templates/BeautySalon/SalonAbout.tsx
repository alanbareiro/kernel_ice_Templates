import { Award, Heart, Sparkles, Users } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableText from '../../components/Editor/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const SalonAbout: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#db2777',
        secondary: '#be185d',
        accent: '#9d174d',
    };

    const stats = [
        { icon: <Heart className="w-6 h-6" />, valueId: 'sl_about_stat_1_value', valueDefault: '15+', labelId: 'sl_about_stat_1_label', labelDefault: 'Años' },
        { icon: <Users className="w-6 h-6" />, valueId: 'sl_about_stat_2_value', valueDefault: '30+', labelId: 'sl_about_stat_2_label', labelDefault: 'Profesionales' },
        { icon: <Sparkles className="w-6 h-6" />, valueId: 'sl_about_stat_3_value', valueDefault: '10k+', labelId: 'sl_about_stat_3_label', labelDefault: 'Clientas' },
        { icon: <Award className="w-6 h-6" />, valueId: 'sl_about_stat_4_value', valueDefault: '8', labelId: 'sl_about_stat_4_label', labelDefault: 'Premios' },
    ];

    return (
        <section className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Imagen */}
                    <div className="relative group order-2 lg:order-1">
                        <div className="absolute -inset-4 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                            style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }} />

                        <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
                            <EditableImage
                                elementId="sl_about_image"
                                defaultImage={defaultImages.beauty.about}
                                alt="Nuestro salón"
                                className="w-full h-auto object-cover"
                                category="beauty"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-pink-900/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2">
                                    <EditableText
                                        elementId="sl_founder_name"
                                        defaultText="María Laura"
                                        tag="span"
                                    />
                                </h3>
                                <p className="opacity-90">
                                    <EditableText
                                        elementId="sl_founder_title"
                                        defaultText="Fundadora y Directora"
                                        tag="span"
                                    />
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                <EditableText elementId="sl_about_badge" defaultText="Nuestra historia" tag="span" />
                            </span>

                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-pink-900 dark:text-pink-100">
                                <EditableText elementId="sl_about_title_1" defaultText="Belleza que" tag="span" />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText elementId="sl_about_title_2" defaultText="trasciende" tag="span" />
                                </span>
                            </h2>

                            <p className="text-lg text-pink-700 dark:text-pink-300 mb-6">
                                <EditableText elementId="sl_about_desc_1" defaultText="Kernelize Beauty abrió sus puertas en 2008 con un sueño: crear un espacio donde la belleza y el bienestar se encuentren. Hoy somos un equipo de más de 30 profesionales apasionados por lo que hacemos." tag="span" />
                            </p>

                            <p className="text-pink-600 dark:text-pink-400">
                                <EditableText elementId="sl_about_desc_2" defaultText="Creemos en la belleza natural y en realzar lo mejor de cada persona. Utilizamos productos de alta calidad y estamos en constante capacitación para ofrecer las últimas tendencias y técnicas." tag="span" />
                            </p>
                        </div>

                        {/* Estadísticas */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-pink-200 dark:border-pink-800">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 group-hover:scale-110 transition-all duration-300"
                                        style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-pink-900 dark:text-pink-100">
                                        <EditableText elementId={stat.valueId} defaultText={stat.valueDefault} tag="span" />
                                    </div>
                                    <div className="text-xs text-pink-600 dark:text-pink-400">
                                        <EditableText elementId={stat.labelId} defaultText={stat.labelDefault} tag="span" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SalonAbout;