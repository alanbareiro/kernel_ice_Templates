import { Award, Building2, HeartHandshake, Users } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const MedicalAbout: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#0d9488',
        secondary: '#0f766e',
        accent: '#115e59',
    };

    const stats = [
        { icon: <Award className="w-6 h-6" />, valueId: 'md_about_stat_1_value', valueDefault: '25+', labelId: 'md_about_stat_1_label', labelDefault: 'Años de experiencia' },
        { icon: <Users className="w-6 h-6" />, valueId: 'md_about_stat_2_value', valueDefault: '50+', labelId: 'md_about_stat_2_label', labelDefault: 'Especialistas' },
        { icon: <Building2 className="w-6 h-6" />, valueId: 'md_about_stat_3_value', valueDefault: '5', labelId: 'md_about_stat_3_label', labelDefault: 'Sucursales' },
        { icon: <HeartHandshake className="w-6 h-6" />, valueId: 'md_about_stat_4_value', valueDefault: '15k+', labelId: 'md_about_stat_4_label', labelDefault: 'Pacientes' },
    ];

    return (
        <section className="section-padding bg-teal-50 dark:bg-teal-950">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido */}
                    <div className="space-y-8">
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                <EditableText
                                    elementId="md_about_badge"
                                    defaultText="Nuestra Historia"
                                    tag="span"
                                />
                            </span>

                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-teal-900 dark:text-teal-100">
                                <EditableText
                                    elementId="md_about_title_1"
                                    defaultText="Cuidando tu"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText
                                        elementId="md_about_title_2"
                                        defaultText="salud"
                                        tag="span"
                                    />
                                </span>
                                <EditableText
                                    elementId="md_about_title_3"
                                    defaultText="desde 1995"
                                    tag="span"
                                />
                            </h2>

                            <p className="text-lg text-teal-700 dark:text-teal-300 mb-6">
                                <EditableText
                                    elementId="md_about_desc_1"
                                    defaultText="Kernelize Salud nació en 1995 con la misión de brindar atención médica de calidad, accesible y humana. Lo que comenzó como un pequeño consultorio, hoy es una red de 5 clínicas con más de 50 especialistas."
                                    tag="span"
                                />
                            </p>

                            <p className="text-teal-600 dark:text-teal-400">
                                <EditableText
                                    elementId="md_about_desc_2"
                                    defaultText="Nuestra filosofía se basa en la atención personalizada, la tecnología de vanguardia y el compromiso con la excelencia médica. Trabajamos para que tú y tu familia reciban el mejor cuidado posible."
                                    tag="span"
                                />
                            </p>
                        </div>

                        {/* Estadísticas */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-teal-200 dark:border-teal-800">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 group-hover:scale-110 transition-all duration-300"
                                        style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-teal-900 dark:text-teal-100">
                                        <EditableText
                                            elementId={stat.valueId}
                                            defaultText={stat.valueDefault}
                                            tag="span"
                                        />
                                    </div>
                                    <div className="text-xs text-teal-600 dark:text-teal-400">
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
                                elementId="md_about_image"
                                defaultImage=""
                                alt="Clínica médica"
                                className="w-full h-auto object-cover"
                                category="medical"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2">
                                    <EditableText
                                        elementId="md_founder_name"
                                        defaultText="Dra. Ana María Rodríguez"
                                        tag="span"
                                    />
                                </h3>
                                <p className="opacity-90">
                                    <EditableText
                                        elementId="md_founder_title"
                                        defaultText="Directora Médica - Cardióloga"
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

export default MedicalAbout;