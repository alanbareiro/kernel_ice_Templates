import { Award, BarChart, Briefcase, CheckCircle, Clock, Eye, Globe, Heart, LineChart, MessageCircle, Phone, Quote, Star, Target, ThumbsUp, TrendingUp, Users, Zap } from 'lucide-react';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

const iconMap: Record<string, any> = {
    TrendingUp, Users, Target, Award, Briefcase, BarChart, LineChart, Globe,
    CheckCircle, Clock, Heart, ThumbsUp, Zap, Eye, MessageCircle, Phone
};

const ConsultingTestimonials = () => {
    const { template } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };
    const typography = template?.typography || defaultTypography;

    const testimonialsTitleClamp = `clamp(1.5rem, 5vw, ${typography.testimonialsTitleSize})`;
    const testimonialsTextClamp = `clamp(0.875rem, 3vw, ${typography.testimonialsTextSize})`;
    const testimonialsNameClamp = `clamp(1rem, 4vw, ${typography.testimonialsNameSize})`;
    const testimonialsRoleClamp = `clamp(0.75rem, 2.5vw, ${typography.testimonialsRoleSize})`;

    // Definir hasta 8 testimonios (índices 0..7)
    const testimonialIds = ['carlos', 'laura', 'roberto', 'extra_1', 'extra_2', 'extra_3', 'extra_4', 'extra_5'];
    const getTestimonial = (id: string, idx: number) => {
        const defaults: Record<string, any> = {
            carlos: { name: 'Carlos Méndez', role: 'CEO - TechCorp LATAM', content: 'El equipo de Kernelize reestructuró nuestra estrategia comercial por completo. En 6 meses, aumentamos nuestras ventas un 60% y optimizamos nuestros procesos internos. Su enfoque analítico y profesionalismo son inigualables.', image: 'CM' },
            laura: { name: 'Laura Fernández', role: 'Directora de Operaciones - Grupo Logístico', content: 'Necesitábamos expandirnos a nuevos mercados y ellos nos guiaron paso a paso. Desde el estudio de mercado hasta la implementación local. Una consultora que realmente se involucra en el éxito de sus clientes.', image: 'LF' },
            roberto: { name: 'Roberto Sánchez', role: 'Fundador - Inversiones RS', content: 'Contratamos su servicio de planificación financiera y los resultados fueron inmediatos. No solo mejoraron nuestra rentabilidad, sino que nos dieron la claridad y el control que necesitábamos para escalar.', image: 'RS' },
        };
        if (defaults[id]) return defaults[id];
        return {
            name: template?.texts?.[`testimonial_name_${id}`] || `Testimonio ${idx + 1}`,
            role: template?.texts?.[`testimonial_role_${id}`] || `Rol ${idx + 1}`,
            content: template?.texts?.[`testimonial_content_${id}`] || `Contenido del testimonio ${idx + 1}.`,
            image: template?.texts?.[`testimonial_image_${id}`] || `T${idx + 1}`,
        };
    };

    // Definir hasta 8 indicadores de confianza
    const indicatorIds = ['projects', 'industries', 'satisfaction', 'support', 'extra_1', 'extra_2', 'extra_3', 'extra_4'];
    const getIndicator = (id: string) => {
        const defaults: Record<string, any> = {
            projects: { icon: 'Briefcase', value: '100+', label: 'Proyectos anuales' },
            industries: { icon: 'BarChart', value: '15', label: 'Industrias diferentes' },
            satisfaction: { icon: 'Heart', value: '98%', label: 'Tasa de satisfacción' },
            support: { icon: 'Clock', value: '24/7', label: 'Soporte a clientes' },
        };
        if (defaults[id]) return defaults[id];
        return {
            icon: template?.texts?.[`indicator_icon_${id}`] || 'Briefcase',
            value: template?.texts?.[`indicator_value_${id}`] || '0',
            label: template?.texts?.[`indicator_label_${id}`] || `Indicador ${id}`,
        };
    };

    const getIcon = (iconName: string, className: string = "w-6 h-6") => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className={className} /> : <Briefcase className={className} />;
    };

    // Visibilidad
    const shouldShowTestimonial = (id: string) => {
        const showKey = `show_testimonial_${id}`;
        const defaultValue = ['carlos', 'laura', 'roberto'].includes(id); // los 3 primeros visibles por defecto
        const stored = template?.texts?.[showKey];
        return stored === undefined ? defaultValue : stored !== 'false';
    };

    const shouldShowIndicator = (id: string) => {
        const showKey = `show_indicator_${id}`;
        const defaultValue = ['projects', 'industries', 'satisfaction', 'support'].includes(id); // 4 primeros visibles
        const stored = template?.texts?.[showKey];
        return stored === undefined ? defaultValue : stored !== 'false';
    };

    return (
        <section id="testimonials" className="section-padding" style={{ backgroundColor: s.testimonialsBackground }}>
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ backgroundColor: s.buttonPrimaryBackground, color: s.buttonPrimaryText }}>
                        <Quote className="w-8 h-8" />
                    </div>
                    <h2 className="font-bold mb-6" style={{ color: s.testimonialsTitleColor, fontSize: testimonialsTitleClamp }}>
                        <EditableText elementId="testimonials_title_1" defaultText="Lo que dicen nuestros" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${s.testimonialsTitleColor}, ${s.testimonialsTitleColor})` }}>
                            <EditableText elementId="testimonials_title_2" defaultText="clientes" tag="span" />
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto" style={{ color: s.testimonialsTextColor, fontSize: testimonialsTextClamp }}>
                        <EditableText elementId="testimonials_description" defaultText="Historias reales de transformación empresarial." tag="span" />
                    </p>
                </div>

                {/* Grid de testimonios (responsive: 1 columna en móvil, 2 en tablet, 3 en desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonialIds.map((id, idx) => {
                        if (!shouldShowTestimonial(id)) return null;
                        const t = getTestimonial(id, idx);
                        const name = template?.texts?.[`testimonial_name_${id}`] || t.name;
                        const role = template?.texts?.[`testimonial_role_${id}`] || t.role;
                        const content = template?.texts?.[`testimonial_content_${id}`] || t.content;
                        const imageLetter = template?.texts?.[`testimonial_image_${id}`] || t.image;
                        return (
                            <div key={id} className="rounded-2xl p-8 h-full transition-colors flex flex-col" style={{ backgroundColor: s.testimonialsCardBackground, border: `1px solid ${s.testimonialsCardBorder}` }}>
                                <div className="flex mb-6">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                                </div>
                                <p className="text-lg italic mb-8 flex-grow" style={{ color: s.testimonialsTextColor, fontSize: testimonialsTextClamp }}>
                                    "<EditableText elementId={`testimonial_content_${id}`} defaultText={content} tag="span" />"
                                </p>
                                <div className="flex items-center pt-6 border-t" style={{ borderColor: s.testimonialsCardBorder }}>
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: s.buttonPrimaryBackground, color: s.buttonPrimaryText }}>
                                        {imageLetter}
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold" style={{ color: s.testimonialsNameColor, fontSize: testimonialsNameClamp }}>
                                            <EditableText elementId={`testimonial_name_${id}`} defaultText={name} tag="span" />
                                        </h4>
                                        <p className="text-sm" style={{ color: s.testimonialsRoleColor, fontSize: testimonialsRoleClamp }}>
                                            <EditableText elementId={`testimonial_role_${id}`} defaultText={role} tag="span" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Indicadores de confianza */}
                <div className="mt-16 pt-16 border-t" style={{ borderColor: s.testimonialsCardBorder }}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {indicatorIds.map((id) => {
                            if (!shouldShowIndicator(id)) return null;
                            const ind = getIndicator(id);
                            const iconName = template?.texts?.[`indicator_icon_${id}`] || ind.icon;
                            const value = template?.texts?.[`indicator_value_${id}`] || ind.value;
                            const label = template?.texts?.[`indicator_label_${id}`] || ind.label;
                            return (
                                <div key={id} className="text-center">
                                    <div className="inline-flex items-center justify-center mb-2" style={{ color: s.testimonialsTitleColor }}>
                                        {getIcon(iconName, "w-10 h-10")}
                                    </div>
                                    <div className="text-3xl font-bold text-transparent bg-clip-text mb-2" style={{ backgroundImage: `linear-gradient(to right, ${s.testimonialsTitleColor}, ${s.testimonialsTitleColor})` }}>
                                        <EditableText elementId={`indicator_value_${id}`} defaultText={value} tag="span" />
                                    </div>
                                    <div className="text-sm" style={{ color: s.testimonialsTextColor, fontSize: testimonialsTextClamp }}>
                                        <EditableText elementId={`indicator_label_${id}`} defaultText={label} tag="span" />
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