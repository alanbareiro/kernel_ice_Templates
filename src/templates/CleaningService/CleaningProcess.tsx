// src/templates/CleaningService/CleaningProcess.tsx
import { ClipboardCheck, Heart, Phone, Sparkles } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const CleaningProcess: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const steps = [
        {
            id: 'step_1',
            icon: <Phone className="w-8 h-8" />,
            titleId: 'cl_step_1_title', titleDefault: 'Contactanos',
            descId: 'cl_step_1_desc', descDefault: 'Llamanos o completá el formulario. Te responderemos en menos de 24 horas.',
        },
        {
            id: 'step_2',
            icon: <ClipboardCheck className="w-8 h-8" />,
            titleId: 'cl_step_2_title', titleDefault: 'Evaluación',
            descId: 'cl_step_2_desc', descDefault: 'Evaluamos tus necesidades y te ofrecemos un presupuesto sin compromiso.',
        },
        {
            id: 'step_3',
            icon: <Sparkles className="w-8 h-8" />,
            titleId: 'cl_step_3_title', titleDefault: 'Limpieza',
            descId: 'cl_step_3_desc', descDefault: 'Nuestro equipo realiza el servicio con productos profesionales.',
        },
        {
            id: 'step_4',
            icon: <Heart className="w-8 h-8" />,
            titleId: 'cl_step_4_title', titleDefault: 'Seguimiento',
            descId: 'cl_step_4_desc', descDefault: 'Te contactamos para asegurarnos de que todo esté perfecto.',
        },
    ];

    return (
        <section
            id="process"
            className="section-padding"
            style={{ backgroundColor: sectionColors.featuresBackground }}
        >
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2
                        className="font-bold mb-6"
                        style={{
                            fontSize: typography.sectionTitleSize,
                            color: sectionColors.featuresTitleColor
                        }}
                    >
                        <EditableText elementId="cl_process_title_1" defaultText="Cómo" tag="span" />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="cl_process_title_2" defaultText="trabajamos" tag="span" />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText elementId="cl_process_description" defaultText="Un proceso simple y transparente." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={step.id} className="relative text-center">
                            <div
                                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                                style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                            >
                                {index + 1}
                            </div>
                            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                {step.icon}
                            </div>
                            <h3
                                className="text-xl font-bold mb-3"
                                style={{ color: sectionColors.featuresTitleColor }}
                            >
                                <EditableText elementId={step.titleId} defaultText={step.titleDefault} tag="span" />
                            </h3>
                            <p style={{ color: sectionColors.bodyTextColor }}>
                                <EditableText elementId={step.descId} defaultText={step.descDefault} tag="span" />
                            </p>
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-20 left-3/4 w-full h-0.5 border-t-2 border-dashed" style={{ borderColor: `${sectionColors.buttonPrimaryBackground}40`, width: 'calc(100% - 100px)' }} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CleaningProcess;