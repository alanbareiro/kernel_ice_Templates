import { Quote, Star } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const AgencyTestimonials: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#c026d3',
        secondary: '#a21caf',
        accent: '#86198f',
    };

    const testimonials = [
        {
            id: 'testimonial_1',
            contentId: 'ag_testimonial_1_content',
            contentDefault: 'Trabajar con Kernelize Marketing transformó por completo nuestra presencia digital. Aumentamos nuestras ventas un 80% en solo 6 meses. El equipo es profesional, creativo y siempre está un paso adelante.',
            nameId: 'ag_testimonial_1_name',
            nameDefault: 'Roberto Fernández',
            roleId: 'ag_testimonial_1_role',
            roleDefault: 'CEO - TechCorp',
            rating: 5,
        },
        {
            id: 'testimonial_2',
            contentId: 'ag_testimonial_2_content',
            contentDefault: 'La campaña que diseñaron para nuestras redes sociales fue todo un éxito. Lograron conectar con nuestra audiencia de una manera auténtica y generaron un gran engagement. Muy recomendables.',
            nameId: 'ag_testimonial_2_name',
            nameDefault: 'Carolina Méndez',
            roleId: 'ag_testimonial_2_role',
            roleDefault: 'Directora de Marketing - ModaTrend',
            rating: 5,
        },
        {
            id: 'testimonial_3',
            contentId: 'ag_testimonial_3_content',
            contentDefault: 'Gracias a su estrategia de SEO, nuestro sitio web pasó de la página 5 a los primeros resultados de Google. El tráfico orgánico se multiplicó y las consultas no paran de llegar.',
            nameId: 'ag_testimonial_3_name',
            nameDefault: 'Alejandro Ríos',
            roleId: 'ag_testimonial_3_role',
            roleDefault: 'Fundador - Gourmet Express',
            rating: 5,
        },
    ];

    return (
        <section className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                        style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                        <Quote className="w-8 h-8 text-white" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900 dark:text-purple-100">
                        <EditableText
                            elementId="ag_testimonials_title_1"
                            defaultText="Lo que dicen"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="ag_testimonials_title_2"
                                defaultText="nuestros clientes"
                                tag="span"
                            />
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-8 shadow-lg">
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            <p className="text-lg text-purple-800 dark:text-purple-200 italic mb-6">
                                "<EditableText
                                    elementId={testimonial.contentId}
                                    defaultText={testimonial.contentDefault}
                                    tag="span"
                                />"
                            </p>

                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                                    style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    {testimonial.nameDefault.charAt(0)}
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-purple-900 dark:text-purple-100">
                                        <EditableText
                                            elementId={testimonial.nameId}
                                            defaultText={testimonial.nameDefault}
                                            tag="span"
                                        />
                                    </h4>
                                    <p className="text-sm text-purple-600 dark:text-purple-400">
                                        <EditableText
                                            elementId={testimonial.roleId}
                                            defaultText={testimonial.roleDefault}
                                            tag="span"
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AgencyTestimonials;