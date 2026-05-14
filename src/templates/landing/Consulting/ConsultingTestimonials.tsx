import { Award, BarChart, Briefcase, CheckCircle, Clock, Eye, Globe, Heart, LineChart, MessageCircle, Phone, Quote, Star, Target, ThumbsUp, TrendingUp, Users, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

const iconMap: Record<string, any> = {
    TrendingUp, Users, Target, Award, Briefcase, BarChart, LineChart, Globe,
    CheckCircle, Clock, Heart, ThumbsUp, Zap, Eye, MessageCircle, Phone
};

// Valores por defecto (coinciden con los defaultItems de la configuración)
const DEFAULT_TESTIMONIALS = [
    { id: 'default_1', name: 'Carlos Méndez', role: 'CEO - TechCorp LATAM', content: 'El equipo de Kernelize reestructuró nuestra estrategia comercial por completo. En 6 meses, aumentamos nuestras ventas un 60% y optimizamos nuestros procesos internos. Su enfoque analítico y profesionalismo son inigualables.', image: 'CM', visible: true },
    { id: 'default_2', name: 'Laura Fernández', role: 'Directora de Operaciones - Grupo Logístico', content: 'Necesitábamos expandirnos a nuevos mercados y ellos nos guiaron paso a paso. Desde el estudio de mercado hasta la implementación local. Una consultora que realmente se involucra en el éxito de sus clientes.', image: 'LF', visible: true },
    { id: 'default_3', name: 'Roberto Sánchez', role: 'Fundador - Inversiones RS', content: 'Contratamos su servicio de planificación financiera y los resultados fueron inmediatos. No solo mejoraron nuestra rentabilidad, sino que nos dieron la claridad y el control que necesitábamos para escalar.', image: 'RS', visible: true }
];

const DEFAULT_INDICATORS = [
    { id: 'default_ind_1', icon: 'Briefcase', value: '100+', label: 'Proyectos anuales', visible: true },
    { id: 'default_ind_2', icon: 'BarChart', value: '15', label: 'Industrias diferentes', visible: true },
    { id: 'default_ind_3', icon: 'Heart', value: '98%', label: 'Tasa de satisfacción', visible: true },
    { id: 'default_ind_4', icon: 'Clock', value: '24/7', label: 'Soporte a clientes', visible: true }
];

const ConsultingTestimonials = () => {
    const { template } = useTemplate();
    const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
    const [indicators, setIndicators] = useState(DEFAULT_INDICATORS);

    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };
    const typography = template?.typography || defaultTypography;

    const testimonialsTitleClamp = `clamp(1.5rem, 5vw, ${typography.testimonialsTitleSize})`;
    const testimonialsTextClamp = `clamp(0.875rem, 3vw, ${typography.testimonialsTextSize})`;
    const testimonialsNameClamp = `clamp(1rem, 4vw, ${typography.testimonialsNameSize})`;
    const testimonialsRoleClamp = `clamp(0.75rem, 2.5vw, ${typography.testimonialsRoleSize})`;

    // Cargar testimonios desde template.texts['testimonial_']
    useEffect(() => {
        const stored = template?.texts?.['testimonial_'];
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setTestimonials(parsed);
                    return;
                }
            } catch (e) {
                console.error('Error parsing testimonials:', e);
            }
        }
        setTestimonials(DEFAULT_TESTIMONIALS);
    }, [template?.texts]);

    // Cargar indicadores desde template.texts['indicator_']
    useEffect(() => {
        const stored = template?.texts?.['indicator_'];
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setIndicators(parsed);
                    return;
                }
            } catch (e) {
                console.error('Error parsing indicators:', e);
            }
        }
        setIndicators(DEFAULT_INDICATORS);
    }, [template?.texts]);

    const getIcon = (iconName: string, className: string = "w-6 h-6") => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className={className} /> : <Briefcase className={className} />;
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

                {/* Grid de testimonios dinámicos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((item, idx) => {
                        if (item.visible === false) return null;
                        return (
                            <div key={item.id || idx} className="rounded-2xl p-8 h-full transition-colors flex flex-col"
                                style={{ backgroundColor: s.testimonialsCardBackground, border: `1px solid ${s.testimonialsCardBorder}` }}>
                                <div className="flex mb-6">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                                </div>
                                <p className="text-lg italic mb-8 flex-grow" style={{ color: s.testimonialsTextColor, fontSize: testimonialsTextClamp }}>
                                    "{item.content}"
                                </p>
                                <div className="flex items-center pt-6 border-t" style={{ borderColor: s.testimonialsCardBorder }}>
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                                        style={{ backgroundColor: s.buttonPrimaryBackground, color: s.buttonPrimaryText }}>
                                        {item.image}
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold" style={{ color: s.testimonialsNameColor, fontSize: testimonialsNameClamp }}>
                                            {item.name}
                                        </h4>
                                        <p className="text-sm" style={{ color: s.testimonialsRoleColor, fontSize: testimonialsRoleClamp }}>
                                            {item.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Indicadores de confianza dinámicos */}
                <div className="mt-16 pt-16 border-t" style={{ borderColor: s.testimonialsCardBorder }}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {indicators.map((item, idx) => {
                            if (item.visible === false) return null;
                            return (
                                <div key={item.id || idx} className="text-center">
                                    <div className="inline-flex items-center justify-center mb-2" style={{ color: s.testimonialsTitleColor }}>
                                        {getIcon(item.icon, "w-10 h-10")}
                                    </div>
                                    <div className="text-3xl font-bold text-transparent bg-clip-text mb-2"
                                        style={{ backgroundImage: `linear-gradient(to right, ${s.testimonialsTitleColor}, ${s.testimonialsTitleColor})` }}>
                                        {item.value}
                                    </div>
                                    <div className="text-sm" style={{ color: s.testimonialsTextColor, fontSize: testimonialsTextClamp }}>
                                        {item.label}
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