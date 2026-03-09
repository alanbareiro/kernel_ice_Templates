import { Award, Building2, HeartHandshake, Users } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const CleaningAbout: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#0284c7',
        secondary: '#0369a1',
        accent: '#075985',
    };

    const stats = [
        { icon: <Award className="w-6 h-6" />, valueId: 'cl_about_stat_1_value', valueDefault: '10+', labelId: 'cl_about_stat_1_label', labelDefault: 'Años de experiencia' },
        { icon: <Users className="w-6 h-6" />, valueId: 'cl_about_stat_2_value', valueDefault: '5000+', labelId: 'cl_about_stat_2_label', labelDefault: 'Clientes' },
        { icon: <Building2 className="w-6 h-6" />, valueId: 'cl_about_stat_3_value', valueDefault: '15000+', labelId: 'cl_about_stat_3_label', labelDefault: 'Servicios' },
        { icon: <HeartHandshake className="w-6 h-6" />, valueId: 'cl_about_stat_4_value', valueDefault: '5', labelId: 'cl_about_stat_4_label', labelDefault: 'Premios' },
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
                                elementId="cl_about_image"
                                defaultImage={defaultImages.cleaning.about}
                                alt="Nuestro equipo"
                                className="w-full h-auto object-cover"
                                category="cleaning"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2">
                                    <EditableText
                                        elementId="cl_founder_name"
                                        defaultText="Carlos Rodríguez"
                                        tag="span"
                                    />
                                </h3>
                                <p className="opacity-90">
                                    <EditableText
                                        elementId="cl_founder_title"
                                        defaultText="Fundador"
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
                                    elementId="cl_about_badge"
                                    defaultText="Nuestra historia"
                                    tag="span"
                                />
                            </span>

                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-sky-900 dark:text-sky-100">
                                <EditableText
                                    elementId="cl_about_title_1"
                                    defaultText="Compromiso con la"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText
                                        elementId="cl_about_title_2"
                                        defaultText="calidad"
                                        tag="span"
                                    />
                                </span>
                            </h2>

                            <p className="text-lg text-sky-700 dark:text-sky-300 mb-6">
                                <EditableText
                                    elementId="cl_about_desc_1"
                                    defaultText="Kernelize Cleaning nació en 2014 con una misión clara: ofrecer servicios de limpieza profesionales, confiables y accesibles. Comenzamos con un pequeño equipo y hoy somos una empresa con más de 50 empleados y miles de clientes satisfechos."
                                    tag="span"
                                />
                            </p>

                            <p className="text-sky-600 dark:text-sky-400">
                                <EditableText
                                    elementId="cl_about_desc_2"
                                    defaultText="Nuestro secreto: personal capacitado, productos ecológicos y un riguroso control de calidad. Creemos que un espacio limpio mejora la calidad de vida, por eso ponemos el máximo esfuerzo en cada trabajo."
                                    tag="span"
                                />
                            </p>
                        </div>

                        {/* Estadísticas */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-sky-200 dark:border-sky-800">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 group-hover:scale-110 transition-all duration-300"
                                        style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-sky-900 dark:text-sky-100">
                                        <EditableText
                                            elementId={stat.valueId}
                                            defaultText={stat.valueDefault}
                                            tag="span"
                                        />
                                    </div>
                                    <div className="text-xs text-sky-600 dark:text-sky-400">
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

export default CleaningAbout;