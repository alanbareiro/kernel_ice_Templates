import { Quote, Star } from 'lucide-react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const AccountingTestimonials = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#059669',
        secondary: '#047857',
        accent: '#064e3b',
    };

    const testimonials = [
        {
            nameId: 'a_testimonial_1_name',
            nameDefault: 'Carlos Rodríguez',
            roleId: 'a_testimonial_1_role',
            roleDefault: 'Dueño de textil "San Juan"',
            contentId: 'a_testimonial_1_content',
            contentDefault: 'Llevan la contabilidad de mi empresa hace más de 10 años. Son eficientes, responsables y siempre me alertan sobre cambios impositivos. Fundamental para mi tranquilidad.',
            rating: 5,
            image: '👔',
        },
        {
            nameId: 'a_testimonial_2_name',
            nameDefault: 'Dra. Laura Giménez',
            roleId: 'a_testimonial_2_role',
            roleDefault: 'Médica independiente',
            contentId: 'a_testimonial_2_content',
            contentDefault: 'Me salvaron con una inspección de AFIP. Su asesoramiento fue clave y el resultado fue favorable. Desde entonces, confío plenamente en ellos.',
            rating: 5,
            image: '⚕️',
        },
        {
            nameId: 'a_testimonial_3_name',
            nameDefault: 'Ricardo Fernández',
            roleId: 'a_testimonial_3_role',
            roleDefault: 'Constructor',
            contentId: 'a_testimonial_3_content',
            contentDefault: 'Manejan mis impuestos y los de mis empleados. Nunca un problema, siempre al día. Los recomiendo a todos mis colegas.',
            rating: 5,
            image: '🏗️',
        },
    ];

    return (
        <section className="section-padding bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-950 dark:to-emerald-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                        style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                        <Quote className="w-8 h-8 text-white" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-900 dark:text-emerald-100">
                        <EditableText
                            elementId="a_testimonials_title_1"
                            defaultText="La confianza de"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="a_testimonials_title_2"
                                defaultText="nuestros clientes"
                                tag="span"
                            />
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white dark:bg-emerald-900 rounded-2xl p-8 shadow-xl">
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            <p className="text-lg text-emerald-800 dark:text-emerald-200 italic mb-6">
                                "<EditableText
                                    elementId={testimonial.contentId}
                                    defaultText={testimonial.contentDefault}
                                    tag="span"
                                />"
                            </p>

                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                                    style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    {testimonial.image}
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-emerald-900 dark:text-emerald-100">
                                        <EditableText
                                            elementId={testimonial.nameId}
                                            defaultText={testimonial.nameDefault}
                                            tag="span"
                                        />
                                    </h4>
                                    <p className="text-sm" style={{ color: colors.primary }}>
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

                {/* Logos de confianza */}
                <div className="mt-16 pt-16 border-t" style={{ borderColor: `${colors.primary}30` }}>
                    <p className="text-center mb-8" style={{ color: colors.primary }}>
                        <EditableText
                            elementId="a_trust_text"
                            defaultText="Confían en nosotros"
                            tag="span"
                        />
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 opacity-60">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-12 rounded" style={{ backgroundColor: `${colors.primary}30` }}></div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AccountingTestimonials;