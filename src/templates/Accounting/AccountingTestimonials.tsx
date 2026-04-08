// src/templates/Accounting/AccountingTestimonials.tsx
import { Quote, Star } from 'lucide-react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const AccountingTestimonials = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

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
                            elementId="a_testimonials_title_1"
                            defaultText="La confianza de"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
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
                        <div
                            key={index}
                            className="rounded-2xl p-8 shadow-xl"
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
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                                    style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    {testimonial.image}
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
                                        style={{ color: sectionColors.buttonPrimaryBackground }}
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

                {/* Logos de confianza */}
                <div className="mt-16 pt-16 border-t" style={{ borderColor: `${sectionColors.buttonPrimaryBackground}30` }}>
                    <p
                        className="text-center mb-8"
                        style={{ color: sectionColors.buttonPrimaryBackground }}
                    >
                        <EditableText
                            elementId="a_trust_text"
                            defaultText="Confían en nosotros"
                            tag="span"
                        />
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 opacity-60">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="h-12 rounded"
                                style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}30` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AccountingTestimonials;