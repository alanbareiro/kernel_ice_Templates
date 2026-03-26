import { Star } from 'lucide-react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const CateringTestimonials = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#f59e0b',
        secondary: '#d97706',
        accent: '#b45309',
    };

    const testimonials = [
        {
            nameId: 'c_testimonial_1_name',
            nameDefault: 'Laura y Carlos',
            roleId: 'c_testimonial_1_role',
            roleDefault: 'Casamiento - Noviembre 2024',
            contentId: 'c_testimonial_1_content',
            contentDefault: 'El servicio fue impecable desde el principio hasta el final. Nuestros invitados siguen hablando de la comida, especialmente del risotto y los postres. ¡Gracias por hacer de nuestra boda un día perfecto!',
            rating: 5,
            image: '👰‍♀️🤵‍♂️',
        },
        {
            nameId: 'c_testimonial_2_name',
            nameDefault: 'Empresa TechCorp',
            roleId: 'c_testimonial_2_role',
            roleDefault: 'Evento Corporativo',
            contentId: 'c_testimonial_2_content',
            contentDefault: 'Contratamos sus servicios para nuestra cena de fin de año. Quedamos impresionados con la calidad, la presentación y la atención. Sin duda los volveremos a contratar.',
            rating: 5,
            image: '🏢',
        },
        {
            nameId: 'c_testimonial_3_name',
            nameDefault: 'Ana María',
            roleId: 'c_testimonial_3_role',
            roleDefault: 'Cumpleaños 50',
            contentId: 'c_testimonial_3_content',
            contentDefault: 'Celebré mi cumpleaños con ellos y fue espectacular. Se adaptaron a mis preferencias y crearon un menú personalizado que encantó a todos. Profesionales y talentosos.',
            rating: 5,
            image: '🎂',
        },
    ];

    return (
        <section className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                        style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                        <span className="text-3xl">💬</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-900 dark:text-amber-100">
                        <EditableText
                            elementId="c_testimonials_title_1"
                            defaultText="Lo que dicen nuestros"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="c_testimonials_title_2"
                                defaultText="clientes"
                                tag="span"
                            />
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800">
                            {/* Rating */}
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            {/* Contenido */}
                            <p className="text-lg text-amber-800 dark:text-amber-200 italic mb-6">
                                "<EditableText
                                    elementId={testimonial.contentId}
                                    defaultText={testimonial.contentDefault}
                                    tag="span"
                                />"
                            </p>

                            {/* Autor */}
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                                    style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    {testimonial.image}
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-amber-900 dark:text-amber-100">
                                        <EditableText
                                            elementId={testimonial.nameId}
                                            defaultText={testimonial.nameDefault}
                                            tag="span"
                                        />
                                    </h4>
                                    <p className="text-sm text-amber-600 dark:text-amber-400">
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

export default CateringTestimonials;