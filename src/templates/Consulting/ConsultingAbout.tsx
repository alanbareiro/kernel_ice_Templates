import { Award, BarChart, Briefcase, Globe, LineChart, MapPin, Target, TrendingUp, Users } from 'lucide-react';
import consultingImage from '../../assets/corpo.jpg';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors } from '../../types/template.types';


// Mapeo de nombres de iconos a componentes (puedes ampliarlo)
const iconMap: Record<string, any> = {
    Briefcase,
    Users,
    Award,
    MapPin,
    TrendingUp: TrendingUp,
    Target: Target,
    BarChart: BarChart,
    LineChart: LineChart,
    Globe: Globe,
    // ... añade más si es necesario
};

const ConsultingAbout = () => {
    const { template } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };

    const stats = [
        {
            iconName: template?.texts?.stat_icon_1 || 'Briefcase',
            value: template?.texts?.stat_value_1 || '15+',
            label: template?.texts?.stat_label_1 || 'Años de experiencia',
            id: 'stat_1'
        },
        {
            iconName: template?.texts?.stat_icon_2 || 'Users',
            value: template?.texts?.stat_value_2 || '50+',
            label: template?.texts?.stat_label_2 || 'Consultores expertos',
            id: 'stat_2'
        },
        {
            iconName: template?.texts?.stat_icon_3 || 'Award',
            value: template?.texts?.stat_value_3 || '200+',
            label: template?.texts?.stat_label_3 || 'Proyectos exitosos',
            id: 'stat_3'
        },
        {
            iconName: template?.texts?.stat_icon_4 || 'MapPin',
            value: template?.texts?.stat_value_4 || '10+',
            label: template?.texts?.stat_label_4 || 'Países con presencia',
            id: 'stat_4'
        },
    ];


    // Obtener los diferenciadores (textos)
    const differentiators = [
        template?.texts?.differentiator_0 || 'Metodologías ágiles y adaptativas',
        template?.texts?.differentiator_1 || 'Análisis de datos para toma de decisiones',
        template?.texts?.differentiator_2 || 'Acompañamiento post-implementación',
        template?.texts?.differentiator_3 || 'Confidencialidad y ética profesional',
    ];

    // const handleAboutImageClick = () => {
    //     window.dispatchEvent(new CustomEvent('openImageSelector', {
    //         detail: { elementId: 'about_image' }
    //     }));
    // };

    // Función para obtener el componente Icon
    const getIcon = (iconName: string) => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />;
    };

    return (
        <section
            id="methodology"
            className="section-padding"
            style={{ backgroundColor: s.aboutBackground }}
        >
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Imagen */}
                    <div className="relative group order-2 lg:order-1">
                        <div
                            className="absolute -inset-4 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                            style={{ backgroundColor: s.aboutBadgeBackground }}
                        />
                        <div
                            className="relative z-10 overflow-hidden shadow-2xl"
                            style={{ borderRadius: s.aboutImageBorderRadius }}
                        >
                            <div className="aspect-[4/5] relative overflow-hidden">
                                <EditableImage
                                    elementId="about_image"
                                    defaultImage={consultingImage}
                                    alt="Equipo de consultores"
                                    className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent pointer-events-none" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white pointer-events-none">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div
                                            className="w-3 h-3 rounded-full animate-pulse"
                                            style={{ backgroundColor: s.aboutBadgeBackground }}
                                        />
                                        <span
                                            className="text-sm font-medium"
                                            style={{ color: s.aboutBadgeTextColor }}
                                        >
                                            <EditableText
                                                elementId="about_badge"
                                                defaultText="Equipo multidisciplinario"
                                                tag="span"
                                            />
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 leading-tight text-white">
                                        <EditableText
                                            elementId="about_title"
                                            defaultText="Expertos en diversas industrias"
                                            tag="span"
                                        />
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contenido */}
                    {/* Contenido */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <div>
                            <span
                                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{
                                    backgroundColor: `${s.aboutBadgeBackground}20`,
                                    color: s.aboutBadgeTextColor,
                                }}
                            >
                                <EditableText
                                    elementId="about_section_badge"
                                    defaultText="Nuestra Firma"
                                    tag="span"
                                />
                            </span>

                            <h2
                                className="text-4xl md:text-5xl font-bold mb-6"
                                style={{ color: s.aboutTitleColor }}
                            >
                                <EditableText
                                    elementId="about_heading_1"
                                    defaultText="Consultoría con"
                                    tag="span"
                                />{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{
                                        backgroundImage: `linear-gradient(to right, ${s.aboutTitleColor}, ${s.aboutTitleColor})`,
                                    }}
                                >
                                    <EditableText
                                        elementId="about_heading_2"
                                        defaultText="Resultados Medibles"
                                        tag="span"
                                    />
                                </span>
                            </h2>

                            <p
                                className="text-lg mb-6"
                                style={{ color: s.aboutTextColor }}
                            >
                                <EditableText
                                    elementId="about_description_1"
                                    defaultText="En Kernelize Consulting no creemos en soluciones genéricas..."
                                    tag="span"
                                />
                            </p>

                            <p style={{ color: s.aboutTextColor }}>
                                <EditableText
                                    elementId="about_description_2"
                                    defaultText="Nuestro enfoque combina el rigor analítico con la creatividad..."
                                    tag="span"
                                />
                            </p>
                        </div>
                        {/* Estadísticas dinámicas */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t"
                            style={{ borderColor: s.aboutTextColor }}
                        >
                            {stats.map((stat, index) => {
                                const IconComponent = getIcon(stat.iconName);
                                return (
                                    <div key={index} className="text-center group">
                                        <div
                                            className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 group-hover:scale-110 transition-all duration-300"
                                            style={{
                                                backgroundColor: `${s.aboutBadgeBackground}20`,
                                                color: s.aboutBadgeBackground,
                                            }}
                                        >
                                            {IconComponent}
                                        </div>
                                        <div
                                            className="text-2xl font-bold group-hover:text-blue-600 transition-colors"
                                            style={{ color: s.statValueColor }}
                                        >
                                            <EditableText
                                                elementId={`stat_value_${stat.id}`}
                                                defaultText={stat.value}
                                                tag="span"
                                            />
                                        </div>
                                        <div
                                            className="text-xs"
                                            style={{ color: s.statLabelColor }}
                                        >
                                            <EditableText
                                                elementId={`stat_label_${stat.id}`}
                                                defaultText={stat.label}
                                                tag="span"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Lista de diferenciadores */}
                        <div className="space-y-3">
                            <h3
                                className="text-xl font-semibold"
                                style={{ color: s.aboutTitleColor }}
                            >
                                <EditableText
                                    elementId="about_commitment_title"
                                    defaultText="Nuestro compromiso:"
                                    tag="span"
                                />
                            </h3>
                            <ul className="space-y-3">
                                {differentiators.map((item, idx) => (
                                    <li key={idx} className="flex items-center">
                                        <div
                                            className="w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                                            style={{ backgroundColor: s.aboutBadgeBackground }}
                                        >
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span style={{ color: s.aboutTextColor }}>
                                            <EditableText
                                                elementId={`differentiator_${idx}`}
                                                defaultText={item}
                                                tag="span"
                                            />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultingAbout;
