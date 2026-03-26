import { Award, Building, Calendar, Users } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const RealEstateAbout: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#2d6a4f',
        secondary: '#1e4b3a',
        accent: '#0d2f24',
    };

    const stats = [
        { icon: <Calendar className="w-6 h-6" />, valueId: 're_about_stat_1_value', valueDefault: '15+', labelId: 're_about_stat_1_label', labelDefault: 'Años' },
        { icon: <Building className="w-6 h-6" />, valueId: 're_about_stat_2_value', valueDefault: '500+', labelId: 're_about_stat_2_label', labelDefault: 'Propiedades' },
        { icon: <Users className="w-6 h-6" />, valueId: 're_about_stat_3_value', valueDefault: '20', labelId: 're_about_stat_3_label', labelDefault: 'Agentes' },
        { icon: <Award className="w-6 h-6" />, valueId: 're_about_stat_4_value', valueDefault: '8', labelId: 're_about_stat_4_label', labelDefault: 'Premios' },
    ];

    return (
        <section className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido */}
                    <div className="space-y-8">
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                <EditableText elementId="re_about_badge" defaultText="Nuestra trayectoria" tag="span" />
                            </span>

                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-900 dark:text-emerald-100">
                                <EditableText elementId="re_about_title_1" defaultText="Compromiso con la" tag="span" />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText elementId="re_about_title_2" defaultText="excelencia" tag="span" />
                                </span>
                            </h2>

                            <p className="text-lg text-emerald-700 dark:text-emerald-300 mb-6">
                                <EditableText elementId="re_about_desc_1" defaultText="Kernelize Propiedades nació en 2008 con el objetivo de transformar el mercado inmobiliario. Desde entonces, hemos ayudado a miles de familias a encontrar el hogar de sus sueños y a inversores a realizar negocios exitosos." tag="span" />
                            </p>

                            <p className="text-emerald-600 dark:text-emerald-400">
                                <EditableText elementId="re_about_desc_2" defaultText="Nuestra filosofía se basa en la transparencia, la honestidad y el compromiso con nuestros clientes. Trabajamos con pasión para ofrecer el mejor servicio y asesoramiento en cada operación." tag="span" />
                            </p>
                        </div>

                        {/* Estadísticas */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-emerald-200 dark:border-emerald-800">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 group-hover:scale-110 transition-all duration-300"
                                        style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                                        <EditableText elementId={stat.valueId} defaultText={stat.valueDefault} tag="span" />
                                    </div>
                                    <div className="text-xs text-emerald-600 dark:text-emerald-400">
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
                            <EditableImage elementId="re_about_image" defaultImage="" alt="Nuestra oficina" className="w-full h-auto object-cover" category="realestate" />
                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2"><EditableText elementId="re_founder_name" defaultText="Alejandro Martínez" tag="span" /></h3>
                                <p className="opacity-90"><EditableText elementId="re_founder_title" defaultText="Director General" tag="span" /></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RealEstateAbout;