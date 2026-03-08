import { Quote, Star } from 'lucide-react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const ConsultingTestimonials = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#2563eb',
        secondary: '#475569',
        accent: '#1e293b',
        background: '#ffffff',
        text: '#0f172a'
    };

    const testimonials = [
        {
            name: 'Carlos Méndez',
            role: 'CEO - TechCorp LATAM',
            content: 'El equipo de Kernelize reestructuró nuestra estrategia comercial por completo. En 6 meses, aumentamos nuestras ventas un 60% y optimizamos nuestros procesos internos. Su enfoque analítico y profesionalismo son inigualables.',
            rating: 5,
            image: 'CM',
            id: 'carlos'
        },
        {
            name: 'Laura Fernández',
            role: 'Directora de Operaciones - Grupo Logístico',
            content: 'Necesitábamos expandirnos a nuevos mercados y ellos nos guiaron paso a paso. Desde el estudio de mercado hasta la implementación local. Una consultora que realmente se involucra en el éxito de sus clientes.',
            rating: 5,
            image: 'LF',
            id: 'laura'
        },
        {
            name: 'Roberto Sánchez',
            role: 'Fundador - Inversiones RS',
            content: 'Contratamos su servicio de planificación financiera y los resultados fueron inmediatos. No solo mejoraron nuestra rentabilidad, sino que nos dieron la claridad y el control que necesitábamos para escalar.',
            rating: 5,
            image: 'RS',
            id: 'roberto'
        },
    ];

    const trustIndicators = [
        { value: '100+', label: 'Proyectos anuales', id: 'projects' },
        { value: '15', label: 'Industrias diferentes', id: 'industries' },
        { value: '98%', label: 'Tasa de satisfacción', id: 'satisfaction' },
        { value: '24/7', label: 'Soporte a clientes', id: 'support' },
    ];

    return (
        <section className="section-padding text-white"
            style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})` }}>
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                        style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                        <Quote className="w-8 h-8 text-white" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <EditableText
                            elementId="testimonials_title_1"
                            defaultText="Lo que dicen nuestros"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="testimonials_title_2"
                                defaultText="clientes"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-slate-300">
                        <EditableText
                            elementId="testimonials_description"
                            defaultText="Historias reales de transformación empresarial."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="relative">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 h-full hover:bg-white/15 transition-colors">
                                {/* Rating */}
                                <div className="flex mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                {/* Contenido */}
                                <p className="text-lg text-slate-200 italic mb-8">
                                    "<EditableText
                                        elementId={`testimonial_content_${testimonial.id}`}
                                        defaultText={testimonial.content}
                                        tag="span"
                                    />"
                                </p>

                                {/* Autor */}
                                <div className="flex items-center pt-6 border-t border-slate-700">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-slate-900 font-bold"
                                        style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                        {testimonial.image}
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold text-white">
                                            <EditableText
                                                elementId={`testimonial_name_${testimonial.id}`}
                                                defaultText={testimonial.name}
                                                tag="span"
                                            />
                                        </h4>
                                        <p className="text-sm text-slate-400">
                                            <EditableText
                                                elementId={`testimonial_role_${testimonial.id}`}
                                                defaultText={testimonial.role}
                                                tag="span"
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Indicadores de confianza */}
                <div className="mt-16 pt-16 border-t border-slate-800">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {trustIndicators.map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl font-bold text-transparent bg-clip-text mb-2"
                                    style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText
                                        elementId={`indicator_value_${item.id}`}
                                        defaultText={item.value}
                                        tag="span"
                                    />
                                </div>
                                <div className="text-sm text-slate-400">
                                    <EditableText
                                        elementId={`indicator_label_${item.id}`}
                                        defaultText={item.label}
                                        tag="span"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultingTestimonials;