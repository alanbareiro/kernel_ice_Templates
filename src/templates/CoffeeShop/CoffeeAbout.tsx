import { Award, Coffee, Heart, Users } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const CoffeeAbout: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#b45309',
        secondary: '#92400e',
        accent: '#78350f',
    };

    const stats = [
        { icon: <Coffee className="w-6 h-6" />, valueId: 'cf_about_stat_1_value', valueDefault: '10+', labelId: 'cf_about_stat_1_label', labelDefault: 'Años' },
        { icon: <Users className="w-6 h-6" />, valueId: 'cf_about_stat_2_value', valueDefault: '50k+', labelId: 'cf_about_stat_2_label', labelDefault: 'Clientes' },
        { icon: <Heart className="w-6 h-6" />, valueId: 'cf_about_stat_3_value', valueDefault: '100%', labelId: 'cf_about_stat_3_label', labelDefault: 'Orgánico' },
        { icon: <Award className="w-6 h-6" />, valueId: 'cf_about_stat_4_value', valueDefault: '5', labelId: 'cf_about_stat_4_label', labelDefault: 'Premios' },
    ];

    return (
        <section className="section-padding bg-amber-50 dark:bg-amber-950">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido */}
                    <div className="space-y-8">
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                <EditableText
                                    elementId="cf_about_badge"
                                    defaultText="Nuestra Historia"
                                    tag="span"
                                />
                            </span>

                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-900 dark:text-amber-100">
                                <EditableText
                                    elementId="cf_about_title_1"
                                    defaultText="Pasión por el"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText
                                        elementId="cf_about_title_2"
                                        defaultText="buen café"
                                        tag="span"
                                    />
                                </span>
                            </h2>

                            <p className="text-lg text-amber-700 dark:text-amber-300 mb-6">
                                <EditableText
                                    elementId="cf_about_desc_1"
                                    defaultText="Kernelize Coffee nació en 2014 en el corazón de Palermo. Nuestro fundador, un apasionado del café, recorrió Colombia, Brasil y Etiopía para seleccionar los mejores granos y aprender técnicas de tostado artesanal."
                                    tag="span"
                                />
                            </p>

                            <p className="text-amber-600 dark:text-amber-400">
                                <EditableText
                                    elementId="cf_about_desc_2"
                                    defaultText="Hoy, somos un punto de encuentro para amantes del café. Nuestro objetivo es ofrecer una experiencia única, donde cada taza cuenta una historia y cada visita se convierte en un momento especial."
                                    tag="span"
                                />
                            </p>
                        </div>

                        {/* Estadísticas */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-amber-200 dark:border-amber-800">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 group-hover:scale-110 transition-all duration-300"
                                        style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                                        <EditableText
                                            elementId={stat.valueId}
                                            defaultText={stat.valueDefault}
                                            tag="span"
                                        />
                                    </div>
                                    <div className="text-xs text-amber-600 dark:text-amber-400">
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

                    {/* Imagen */}
                    <div className="relative group">
                        <div className="absolute -inset-4 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                            style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }} />

                        <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
                            <EditableImage
                                elementId="cf_about_image"
                                defaultImage={defaultImages.coffee.about}
                                alt="Nuestra cafetería"
                                className="w-full h-auto object-cover"
                                category="coffee"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2">
                                    <EditableText
                                        elementId="cf_founder_name"
                                        defaultText="Juan Pérez"
                                        tag="span"
                                    />
                                </h3>
                                <p className="opacity-90">
                                    <EditableText
                                        elementId="cf_founder_title"
                                        defaultText="Fundador y Barista"
                                        tag="span"
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoffeeAbout;