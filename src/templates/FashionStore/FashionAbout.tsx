import { Award, Globe, Heart, Users } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const FashionAbout: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#000000',
        secondary: '#1f2937',
        accent: '#4b5563',
    };

    const stats = [
        { icon: <Heart className="w-6 h-6" />, valueId: 'fa_about_stat_1_value', valueDefault: '10+', labelId: 'fa_about_stat_1_label', labelDefault: 'Años' },
        { icon: <Users className="w-6 h-6" />, valueId: 'fa_about_stat_2_value', valueDefault: '5000+', labelId: 'fa_about_stat_2_label', labelDefault: 'Clientas' },
        { icon: <Award className="w-6 h-6" />, valueId: 'fa_about_stat_3_value', valueDefault: '8', labelId: 'fa_about_stat_3_label', labelDefault: 'Premios' },
        { icon: <Globe className="w-6 h-6" />, valueId: 'fa_about_stat_4_value', valueDefault: '15', labelId: 'fa_about_stat_4_label', labelDefault: 'Países' },
    ];

    return (
        <section className="section-padding bg-white dark:bg-gray-950">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Imagen */}
                    <div className="relative group order-2 lg:order-1">
                        <div className="absolute -inset-4 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                            style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }} />

                        <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
                            <EditableImage elementId="fa_about_image" defaultImage="" alt="Nuestra tienda" className="w-full h-auto object-cover" category="fashion" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2"><EditableText elementId="fa_founder_name" defaultText="Sofía Martínez" tag="span" /></h3>
                                <p className="opacity-90"><EditableText elementId="fa_founder_title" defaultText="Fundadora y Directora Creativa" tag="span" /></p>
                            </div>
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{ backgroundColor: `${colors.primary}10`, color: colors.primary }}>
                                <EditableText elementId="fa_about_badge" defaultText="Nuestra historia" tag="span" />
                            </span>

                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                                <EditableText elementId="fa_about_title_1" defaultText="Moda con" tag="span" />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText elementId="fa_about_title_2" defaultText="propósito" tag="span" />
                                </span>
                            </h2>

                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                                <EditableText elementId="fa_about_desc_1" defaultText="Kernelize Fashion nació en 2014 del sueño de Sofía Martínez: crear una marca de ropa que combine diseño de autor, calidad premium y precios accesibles. Lo que comenzó como un pequeño taller, hoy es una marca presente en 15 países." tag="span" />
                            </p>

                            <p className="text-gray-600 dark:text-gray-400">
                                <EditableText elementId="fa_about_desc_2" defaultText="Creemos en la moda consciente, en prendas que duran y trascienden temporadas. Trabajamos con talleres locales y materiales sustentables para reducir nuestro impacto ambiental." tag="span" />
                            </p>
                        </div>

                        {/* Estadísticas */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 group-hover:scale-110 transition-all duration-300"
                                        style={{ backgroundColor: `${colors.primary}10`, color: colors.primary }}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        <EditableText elementId={stat.valueId} defaultText={stat.valueDefault} tag="span" />
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
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

export default FashionAbout;