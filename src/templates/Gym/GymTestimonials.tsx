// src/templates/Gym/GymTestimonials.tsx
import { Quote, Star } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const GymTestimonials: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const testimonials = [
        {
            id: 'test_1',
            contentId: 'gm_test_1_content',
            contentDefault: 'Empecé hace 6 meses con el plan Premium y los resultados son increíbles. Los entrenadores son muy profesionales y el ambiente es motivador.',
            nameId: 'gm_test_1_name', nameDefault: 'Martín López',
            roleId: 'gm_test_1_role', roleDefault: 'Miembro hace 6 meses',
            rating: 5,
        },
        {
            id: 'test_2',
            contentId: 'gm_test_2_content',
            contentDefault: 'Las clases de spinning son lo mejor. Carolina es una excelente instructora y siempre te empuja a dar lo mejor.',
            nameId: 'gm_test_2_name', nameDefault: 'Laura Fernández',
            roleId: 'gm_test_2_role', roleDefault: 'Miembro hace 1 año',
            rating: 5,
        },
        {
            id: 'test_3',
            contentId: 'gm_test_3_content',
            contentDefault: 'Bajé 15 kilos con el acompañamiento de Pablo. El plan nutricional y el entrenamiento personalizado hicieron toda la diferencia.',
            nameId: 'gm_test_3_name', nameDefault: 'Carlos Rodríguez',
            roleId: 'gm_test_3_role', roleDefault: 'Miembro hace 8 meses',
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
                        <EditableText elementId="gm_test_title_1" defaultText="Lo que dicen" tag="span" />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="gm_test_title_2" defaultText="nuestros miembros" tag="span" />
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div
                            key={t.id}
                            className="rounded-2xl p-8 border transition-all hover:border-orange-500"
                            style={{ backgroundColor: sectionColors.featuresCardBackground, borderColor: sectionColors.featuresCardBorder }}
                        >
                            <div className="flex mb-4">
                                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                            </div>
                            <p
                                className="text-lg italic mb-6"
                                style={{ color: sectionColors.bodyTextColor }}
                            >
                                "<EditableText elementId={t.contentId} defaultText={t.contentDefault} tag="span" />"
                            </p>
                            <div className="flex items-center">
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                                    style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    {t.nameDefault.charAt(0)}
                                </div>
                                <div className="ml-4">
                                    <h4
                                        className="font-semibold"
                                        style={{ color: sectionColors.featuresTitleColor }}
                                    >
                                        <EditableText elementId={t.nameId} defaultText={t.nameDefault} tag="span" />
                                    </h4>
                                    <p
                                        className="text-sm"
                                        style={{ color: sectionColors.bodyTextColor }}
                                    >
                                        <EditableText elementId={t.roleId} defaultText={t.roleDefault} tag="span" />
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

export default GymTestimonials;