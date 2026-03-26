import { Award, Heart, Sparkles, Users } from 'lucide-react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const CateringAbout = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#f59e0b',
        secondary: '#d97706',
        accent: '#b45309',
    };

    const stats = [
        { icon: <Users className="w-6 h-6" />, valueId: 'c_stat_value_1', valueDefault: '500+', labelId: 'c_stat_label_1', labelDefault: 'Eventos realizados' },
        { icon: <Heart className="w-6 h-6" />, valueId: 'c_stat_value_2', valueDefault: '15', labelId: 'c_stat_label_2', labelDefault: 'Años de experiencia' },
        { icon: <Award className="w-6 h-6" />, valueId: 'c_stat_value_3', valueDefault: '10', labelId: 'c_stat_label_3', labelDefault: 'Premios recibidos' },
        { icon: <Sparkles className="w-6 h-6" />, valueId: 'c_stat_value_4', valueDefault: '50k+', labelId: 'c_stat_label_4', labelDefault: 'Comensales satisfechos' },
    ];

    return (
        <section className="section-padding bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido */}
                    <div className="space-y-8">
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 text-sm font-medium mb-4"
                                style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}>
                                <EditableText
                                    elementId="c_about_badge"
                                    defaultText="Nuestra Historia"
                                    tag="span"
                                />
                            </span>

                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-900 dark:text-amber-100">
                                <EditableText
                                    elementId="c_about_title_1"
                                    defaultText="Pasión por la"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                                    <EditableText
                                        elementId="c_about_title_2"
                                        defaultText="buena mesa"
                                        tag="span"
                                    />
                                </span>
                            </h2>

                            <p className="text-lg text-amber-700 dark:text-amber-300 mb-6">
                                <EditableText
                                    elementId="c_about_desc_1"
                                    defaultText="Desde 2009, nos dedicamos a crear experiencias gastronómicas únicas que combinan la tradición culinaria con las tendencias más innovadoras. Nuestro equipo de chefs y profesionales trabaja con ingredientes frescos y de la más alta calidad."
                                    tag="span"
                                />
                            </p>

                            <p className="text-amber-700 dark:text-amber-300">
                                <EditableText
                                    elementId="c_about_desc_2"
                                    defaultText="Cada evento es una oportunidad para sorprender y deleitar a tus invitados. Nos adaptamos a tus necesidades, presupuesto y preferencias para crear el menú perfecto que hará de tu celebración algo inolvidable."
                                    tag="span"
                                />
                            </p>
                        </div>

                        {/* Estadísticas */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-amber-200 dark:border-amber-800">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-200 dark:bg-amber-800 text-amber-600 dark:text-amber-400 mb-3 group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-orange-600 group-hover:text-white transition-all duration-300"
                                        style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-amber-900 dark:text-amber-100 group-hover:text-amber-600 transition-colors">
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

                        {/* Valores */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white dark:bg-amber-900 rounded-xl shadow-md">
                                <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2">
                                    <EditableText
                                        elementId="c_value_1_title"
                                        defaultText="Calidad"
                                        tag="span"
                                    />
                                </h4>
                                <p className="text-sm text-amber-700 dark:text-amber-300">
                                    <EditableText
                                        elementId="c_value_1_desc"
                                        defaultText="Ingredientes frescos y seleccionados"
                                        tag="span"
                                    />
                                </p>
                            </div>
                            <div className="p-4 bg-white dark:bg-amber-900 rounded-xl shadow-md">
                                <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2">
                                    <EditableText
                                        elementId="c_value_2_title"
                                        defaultText="Creatividad"
                                        tag="span"
                                    />
                                </h4>
                                <p className="text-sm text-amber-700 dark:text-amber-300">
                                    <EditableText
                                        elementId="c_value_2_desc"
                                        defaultText="Platos únicos y originales"
                                        tag="span"
                                    />
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Imagen */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                            style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }} />

                        <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
                            <EditableImage
                                elementId="c_about_image"
                                defaultImage={defaultImages.catering.about}
                                alt="Chef preparando plato"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                category="catering"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2">
                                    <EditableText
                                        elementId="c_chef_name"
                                        defaultText="Martín Rodríguez"
                                        tag="span"
                                    />
                                </h3>
                                <p className="opacity-90">
                                    <EditableText
                                        elementId="c_chef_title"
                                        defaultText="Chef Ejecutivo"
                                        tag="span"
                                    /> - <EditableText
                                        elementId="c_chef_exp"
                                        defaultText="15 años de experiencia internacional"
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

export default CateringAbout;