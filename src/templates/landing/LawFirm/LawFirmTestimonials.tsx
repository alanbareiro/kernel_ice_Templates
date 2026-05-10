// src/templates/LawFirm/LawFirmTestimonials.tsx
import { Quote, Star } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const LawFirmTestimonials: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const testimonials = [
        {
            id: 'testimonial_1',
            contentId: 'lf_testimonial_1_content',
            contentDefault: 'El Dr. Mendoza y su equipo llevaron mi caso con profesionalismo y dedicación. Obtuvieron un resultado favorable que superó mis expectativas. Los recomiendo ampliamente.',
            nameId: 'lf_testimonial_1_name',
            nameDefault: 'Ricardo Fernández',
            roleId: 'lf_testimonial_1_role',
            roleDefault: 'Cliente Corporativo',
            rating: 5,
        },
        {
            id: 'testimonial_2',
            contentId: 'lf_testimonial_2_content',
            contentDefault: 'En un momento difícil para mi familia, la Dra. Suárez nos brindó contención y asesoramiento legal impecable. Su sensibilidad y profesionalismo marcaron la diferencia.',
            nameId: 'lf_testimonial_2_name',
            nameDefault: 'María Elena González',
            roleId: 'lf_testimonial_2_role',
            roleDefault: 'Cliente particular',
            rating: 5,
        },
        {
            id: 'testimonial_3',
            contentId: 'lf_testimonial_3_content',
            contentDefault: 'Trabajamos con el estudio en la fusión de nuestra empresa. El equipo demostró un profundo conocimiento del derecho corporativo y una gran capacidad de negociación.',
            nameId: 'lf_testimonial_3_name',
            nameDefault: 'Ing. Carlos Méndez',
            roleId: 'lf_testimonial_3_role',
            roleDefault: 'CEO - TechCorp',
            rating: 5,
        },
    ];

    return (
        <section
            className="section-padding"
            style={{ backgroundColor: sectionColors.featuresBackground }}
        >
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                        style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                    >
                        <Quote className="w-8 h-8 text-white" />
                    </div>

                    <h2
                        className="font-bold mb-6"
                        style={{
                            fontSize: typography.sectionTitleSize,
                            color: sectionColors.featuresTitleColor
                        }}
                    >
                        <EditableText
                            elementId="lf_testimonials_title_1"
                            defaultText="Lo que dicen"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="lf_testimonials_title_2"
                                defaultText="nuestros clientes"
                                tag="span"
                            />
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="rounded-2xl p-8 shadow-lg"
                            style={{ backgroundColor: sectionColors.featuresCardBackground }}
                        >
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            <p
                                className="text-lg italic mb-6"
                                style={{ color: sectionColors.bodyTextColor }}
                            >
                                "<EditableText
                                    elementId={testimonial.contentId}
                                    defaultText={testimonial.contentDefault}
                                    tag="span"
                                />"
                            </p>

                            <div className="flex items-center">
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                                    style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    {testimonial.nameDefault.charAt(0)}
                                </div>
                                <div className="ml-4">
                                    <h4
                                        className="font-semibold"
                                        style={{ color: sectionColors.featuresTitleColor }}
                                    >
                                        <EditableText
                                            elementId={testimonial.nameId}
                                            defaultText={testimonial.nameDefault}
                                            tag="span"
                                        />
                                    </h4>
                                    <p
                                        className="text-sm"
                                        style={{ color: sectionColors.bodyTextColor }}
                                    >
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

export default LawFirmTestimonials;