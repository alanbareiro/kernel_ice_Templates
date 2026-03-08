import { Award, Calendar, Coffee, Users } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const DigitalAbout: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#0891b2',
        secondary: '#0e7490',
        accent: '#155e75',
    };

    const stats = [
        { icon: <Calendar className="w-6 h-6" />, valueId: 'di_about_stat_1_value', valueDefault: '8+', labelId: 'di_about_stat_1_label', labelDefault: 'Años' },
        { icon: <Users className="w-6 h-6" />, valueId: 'di_about_stat_2_value', valueDefault: '150+', labelId: 'di_about_stat_2_label', labelDefault: 'Clientes' },
        { icon: <Award className="w-6 h-6" />, valueId: 'di_about_stat_3_value', valueDefault: '12', labelId: 'di_about_stat_3_label', labelDefault: 'Premios' },
        { icon: <Coffee className="w-6 h-6" />, valueId: 'di_about_stat_4_value', valueDefault: '5000+', labelId: 'di_about_stat_4_label', labelDefault: 'Cafés' },
    ];

    return (
        <section id="about" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido */}
                    <div className="space-y-8">
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                <EditableText elementId="di_about_badge" defaultText="Quiénes somos" tag="span" />
                            </span>

                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-900 dark:text-cyan-100">
                                <EditableText elementId="di_about_title_1" defaultText="Creamos" tag="span" />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText elementId="di_about_title_2" defaultText="experiencias" tag="span" />
                                </span>
                            </h2>

                            <p className="text-lg text-cyan-700 dark:text-cyan-300 mb-6">
                                <EditableText elementId="di_about_desc_1" defaultText="Kernelize Digital nació en 2016 con la misión de ayudar a empresas a transformarse digitalmente. Somos un equipo multidisciplinario de diseñadores, desarrolladores y especialistas en marketing apasionados por lo que hacemos." tag="span" />
                            </p>

                            <p className="text-cyan-600 dark:text-cyan-400">
                                <EditableText elementId="di_about_desc_2" defaultText="Creemos en el trabajo colaborativo, en entender a fondo cada proyecto y en superar las expectativas de nuestros clientes. Cada desafío es una oportunidad para innovar y crear algo único." tag="span" />
                            </p>
                        </div>

                        {/* Estadísticas */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-cyan-200 dark:border-cyan-800">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 group-hover:scale-110 transition-all duration-300"
                                        style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-cyan-900 dark:text-cyan-100">
                                        <EditableText elementId={stat.valueId} defaultText={stat.valueDefault} tag="span" />
                                    </div>
                                    <div className="text-xs text-cyan-600 dark:text-cyan-400">
                                        <EditableText elementId={stat.labelId} defaultText={stat.labelDefault} tag="span" />
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
                            <EditableImage elementId="di_about_image" defaultImage="" alt="Nuestro equipo" className="w-full h-auto object-cover" category="digital" />
                            <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2"><EditableText elementId="di_founder_name" defaultText="Equipo Kernelize" tag="span" /></h3>
                                <p className="opacity-90"><EditableText elementId="di_founder_title" defaultText="12 profesionales" tag="span" /></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DigitalAbout;