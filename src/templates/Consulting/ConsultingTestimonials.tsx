import { Quote, Star } from 'lucide-react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors } from '../../types/template.types';
// Mapeo de nombres de iconos a componentes (importa los que necesites)
import {
    Award,
    BarChart,
    Briefcase,
    CheckCircle, Clock,
    Eye,
    Globe,
    Heart,
    LineChart,
    MessageCircle, Phone,
    Target,
    ThumbsUp,
    TrendingUp, Users,
    Zap
} from 'lucide-react';

const iconMap: Record<string, any> = {
    TrendingUp, Users, Target, Award, Briefcase, BarChart, LineChart, Globe,
    CheckCircle, Clock, Heart, ThumbsUp, Zap, Eye, MessageCircle, Phone,
};

const ConsultingTestimonials = () => {
    const { template } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };

    // Testimonios: nombres, roles, contenidos desde template.texts
    const testimonials = [
        {
            id: 'carlos',
            defaultName: 'Carlos Méndez',
            defaultRole: 'CEO - TechCorp LATAM',
            defaultContent: 'El equipo de Kernelize reestructuró nuestra estrategia comercial por completo. En 6 meses, aumentamos nuestras ventas un 60% y optimizamos nuestros procesos internos. Su enfoque analítico y profesionalismo son inigualables.',
            rating: 5,
            image: 'CM'
        },
        {
            id: 'laura',
            defaultName: 'Laura Fernández',
            defaultRole: 'Directora de Operaciones - Grupo Logístico',
            defaultContent: 'Necesitábamos expandirnos a nuevos mercados y ellos nos guiaron paso a paso. Desde el estudio de mercado hasta la implementación local. Una consultora que realmente se involucra en el éxito de sus clientes.',
            rating: 5,
            image: 'LF'
        },
        {
            id: 'roberto',
            defaultName: 'Roberto Sánchez',
            defaultRole: 'Fundador - Inversiones RS',
            defaultContent: 'Contratamos su servicio de planificación financiera y los resultados fueron inmediatos. No solo mejoraron nuestra rentabilidad, sino que nos dieron la claridad y el control que necesitábamos para escalar.',
            rating: 5,
            image: 'RS'
        },
    ];

    // Indicadores de confianza: icono, valor, label desde template.texts
    const trustIndicators = [
        {
            id: 'projects',
            defaultIcon: 'Briefcase',
            defaultValue: '100+',
            defaultLabel: 'Proyectos anuales'
        },
        {
            id: 'industries',
            defaultIcon: 'BarChart',
            defaultValue: '15',
            defaultLabel: 'Industrias diferentes'
        },
        {
            id: 'satisfaction',
            defaultIcon: 'Heart',
            defaultValue: '98%',
            defaultLabel: 'Tasa de satisfacción'
        },
        {
            id: 'support',
            defaultIcon: 'Clock',
            defaultValue: '24/7',
            defaultLabel: 'Soporte a clientes'
        },
    ];

    const getIcon = (iconName: string) => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className="w-8 h-8 mx-auto mb-2" /> : null;
    };

    return (
        <section
            id="testimonials"
            className="section-padding"
            style={{ backgroundColor: s.testimonialsBackground }}
        >
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                        style={{
                            background: `linear-gradient(to right, ${s.testimonialsTitleColor}, ${s.testimonialsTitleColor})`,
                        }}
                    >
                        <Quote className="w-8 h-8 text-white" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: s.testimonialsTitleColor }}>
                        <EditableText
                            elementId="testimonials_title_1"
                            defaultText="Lo que dicen nuestros"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${s.testimonialsTitleColor}, ${s.testimonialsTitleColor})`,
                            }}
                        >
                            <EditableText
                                elementId="testimonials_title_2"
                                defaultText="clientes"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl" style={{ color: s.testimonialsTextColor }}>
                        <EditableText
                            elementId="testimonials_description"
                            defaultText="Historias reales de transformación empresarial."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t) => {
                        const name = template?.texts?.[`testimonial_name_${t.id}`] || t.defaultName;
                        const role = template?.texts?.[`testimonial_role_${t.id}`] || t.defaultRole;
                        const content = template?.texts?.[`testimonial_content_${t.id}`] || t.defaultContent;
                        return (
                            <div
                                key={t.id}
                                className="rounded-2xl p-8 h-full transition-colors"
                                style={{
                                    backgroundColor: s.testimonialsCardBackground,
                                    border: `1px solid ${s.testimonialsCardBorder}`,
                                }}
                            >
                                <div className="flex mb-6">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-lg italic mb-8" style={{ color: s.testimonialsTextColor }}>
                                    "<EditableText
                                        elementId={`testimonial_content_${t.id}`}
                                        defaultText={content}
                                        tag="span"
                                    />"
                                </p>

                                <div className="flex items-center pt-6 border-t" style={{ borderColor: s.testimonialsCardBorder }}>
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                                        style={{ backgroundColor: s.testimonialsNameColor }}
                                    >
                                        {t.image}
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold" style={{ color: s.testimonialsNameColor }}>
                                            <EditableText
                                                elementId={`testimonial_name_${t.id}`}
                                                defaultText={name}
                                                tag="span"
                                            />
                                        </h4>
                                        <p className="text-sm" style={{ color: s.testimonialsRoleColor }}>
                                            <EditableText
                                                elementId={`testimonial_role_${t.id}`}
                                                defaultText={role}
                                                tag="span"
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-16 pt-16 border-t" style={{ borderColor: s.testimonialsCardBorder }}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {trustIndicators.map((ind) => {
                            const iconName = template?.texts?.[`indicator_icon_${ind.id}`] || ind.defaultIcon;
                            const value = template?.texts?.[`indicator_value_${ind.id}`] || ind.defaultValue;
                            const label = template?.texts?.[`indicator_label_${ind.id}`] || ind.defaultLabel;
                            const Icon = iconMap[iconName];
                            return (
                                <div key={ind.id} className="text-center">
                                    {Icon && <Icon className="w-10 h-10 mx-auto mb-2" style={{ color: s.testimonialsTitleColor }} />}
                                    <div
                                        className="text-3xl font-bold text-transparent bg-clip-text mb-2"
                                        style={{
                                            backgroundImage: `linear-gradient(to right, ${s.testimonialsTitleColor}, ${s.testimonialsTitleColor})`,
                                        }}
                                    >
                                        <EditableText
                                            elementId={`indicator_value_${ind.id}`}
                                            defaultText={value}
                                            tag="span"
                                        />
                                    </div>
                                    <div className="text-sm" style={{ color: s.testimonialsTextColor }}>
                                        <EditableText
                                            elementId={`indicator_label_${ind.id}`}
                                            defaultText={label}
                                            tag="span"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultingTestimonials;