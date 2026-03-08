import { Quote, Star } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const MedicalTestimonials: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#0d9488',
        secondary: '#0f766e',
        accent: '#115e59',
    };

    const testimonials = [
        {
            id: 'testimonial_1',
            contentId: 'md_testimonial_1_content',
            contentDefault: 'La atención de la Dra. Rodríguez fue excepcional. Me realizó un chequeo completo y me explicó todo con claridad. El trato humano y profesional marca la diferencia.',
            nameId: 'md_testimonial_1_name',
            nameDefault: 'José Luis González',
            roleId: 'md_testimonial_1_role',
            roleDefault: 'Paciente - Cardiología',
            rating: 5,
        },
        {
            id: 'testimonial_2',
            contentId: 'md_testimonial_2_content',
            contentDefault: 'Llevamos a nuestro hijo al consultorio del Dr. Martínez por unos dolores de cabeza. Su diagnóstico fue preciso y el tratamiento funcionó rápidamente. Muy agradecidos.',
            nameId: 'md_testimonial_2_name',
            nameDefault: 'María Elena Suárez',
            roleId: 'md_testimonial_2_role',
            roleDefault: 'Madre de paciente',
            rating: 5,
        },
        {
            id: 'testimonial_3',
            contentId: 'md_testimonial_3_content',
            contentDefault: 'Las instalaciones son modernas y el equipo médico de primera. Me atendieron rápidamente en emergencias y el seguimiento post-operatorio fue excelente.',
            nameId: 'md_testimonial_3_name',
            nameDefault: 'Roberto Fernández',
            roleId: 'md_testimonial_3_role',
            roleDefault: 'Paciente - Cirugía',
            rating: 5,
        },
    ];

    return (
        <section className="section-padding bg-teal-50 dark:bg-teal-950">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                        style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                        <Quote className="w-8 h-8 text-white" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-teal-900 dark:text-teal-100">
                        <EditableText
                            elementId="md_testimonials_title_1"
                            defaultText="Lo que dicen"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="md_testimonials_title_2"
                                defaultText="nuestros pacientes"
                                tag="span"
                            />
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white dark:bg-teal-900/20 rounded-2xl p-8 shadow-lg">
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            <p className="text-lg text-teal-800 dark:text-teal-200 italic mb-6">
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
                                    <h4 className="font-semibold text-teal-900 dark:text-teal-100">
                                        <EditableText
                                            elementId={testimonial.nameId}
                                            defaultText={testimonial.nameDefault}
                                            tag="span"
                                        />
                                    </h4>
                                    <p className="text-sm text-teal-600 dark:text-teal-400">
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

export default MedicalTestimonials;