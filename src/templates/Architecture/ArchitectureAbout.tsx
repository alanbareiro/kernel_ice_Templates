// src/templates/Architecture/ArchitectureAbout.tsx
import { Award, Calendar, MapPin, Users } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableText from '../../components/Editor/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const ArchitectureAbout: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#57534e',
        secondary: '#44403c',
        accent: '#292524',
    };

    const stats = [
        { icon: <Calendar className="w-6 h-6" />, valueId: 'ar_about_stat_1_value', valueDefault: '15+', labelId: 'ar_about_stat_1_label', labelDefault: 'Años' },
        { icon: <Users className="w-6 h-6" />, valueId: 'ar_about_stat_2_value', valueDefault: '200+', labelId: 'ar_about_stat_2_label', labelDefault: 'Proyectos' },
        { icon: <Award className="w-6 h-6" />, valueId: 'ar_about_stat_3_value', valueDefault: '12', labelId: 'ar_about_stat_3_label', labelDefault: 'Arquitectos' },
        { icon: <MapPin className="w-6 h-6" />, valueId: 'ar_about_stat_4_value', valueDefault: '5', labelId: 'ar_about_stat_4_label', labelDefault: 'Países' },
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
                                elementId="ar_about_image"
                                defaultImage={defaultImages.architecture.about}
                                alt="Nuestro estudio"
                                className="w-full h-auto object-cover"
                                category="architecture"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2">
                                    <EditableText
                                        elementId="ar_founder_name"
                                        defaultText="Arq. Martín Rodríguez"
                                        tag="span"
                                    />
                                </h3>
                                <p className="opacity-90">
                                    <EditableText
                                        elementId="ar_founder_title"
                                        defaultText="Fundador y Director Creativo"
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
                                <EditableText
                                    elementId="ar_about_badge"
                                    defaultText="Nuestra Historia"
                                    tag="span"
                                />
                            </span>

                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-900 dark:text-stone-100">
                                <EditableText
                                    elementId="ar_about_title_1"
                                    defaultText="Arquitectura con"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText
                                        elementId="ar_about_title_2"
                                        defaultText="propósito"
                                        tag="span"
                                    />
                                </span>
                            </h2>

                            <p className="text-lg text-stone-600 dark:text-stone-400 mb-6">
                                <EditableText
                                    elementId="ar_about_desc_1"
                                    defaultText="Kernelize Arquitectura nació en 2008 con la visión de crear espacios que mejoren la calidad de vida de las personas. Desde entonces, hemos desarrollado más de 200 proyectos en Argentina y el mundo."
                                    tag="span"
                                />
                            </p>

                            <p className="text-stone-600 dark:text-stone-400">
                                <EditableText
                                    elementId="ar_about_desc_2"
                                    defaultText="Nuestra filosofía se basa en el diseño sostenible, la innovación y el respeto por el entorno. Trabajamos en estrecha colaboración con nuestros clientes para materializar sus sueños."
                                    tag="span"
                                />
                            </p>
                        </div>

                        {/* Estadísticas */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-stone-200 dark:border-stone-800">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 group-hover:scale-110 transition-all duration-300"
                                        style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                                        <EditableText
                                            elementId={stat.valueId}
                                            defaultText={stat.valueDefault}
                                            tag="span"
                                        />
                                    </div>
                                    <div className="text-xs text-stone-600 dark:text-stone-400">
                                        <EditableText
                                            elementId={stat.labelId}
                                            defaultText={stat.labelDefault}
                                            tag="span"
                                        />
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

export default ArchitectureAbout;