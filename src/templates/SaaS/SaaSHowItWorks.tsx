// src/templates/SaaS/SaaSHowItWorks.tsx
import { Rocket, Settings, UserPlus } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const SaaSHowItWorks: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const steps = [
        {
            id: 'step_1',
            icon: <UserPlus className="w-12 h-12" />,
            titleId: 'sa_step_1_title', titleDefault: 'Creá tu cuenta',
            descId: 'sa_step_1_desc', descDefault: 'Registrate en menos de 2 minutos. No pedimos tarjeta de crédito.',
        },
        {
            id: 'step_2',
            icon: <Settings className="w-12 h-12" />,
            titleId: 'sa_step_2_title', titleDefault: 'Configurá tu espacio',
            descId: 'sa_step_2_desc', descDefault: 'Personalizá la plataforma según las necesidades de tu negocio.',
        },
        {
            id: 'step_3',
            icon: <Rocket className="w-12 h-12" />,
            titleId: 'sa_step_3_title', titleDefault: 'Empezá a operar',
            descId: 'sa_step_3_desc', descDefault: 'Integrá tus datos y comenzá a usar todas las funcionalidades.',
        },
    ];

    return (
        <section
            id="how"
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
                        <EditableText elementId="sa_how_title_1" defaultText="Cómo" tag="span" />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="sa_how_title_2" defaultText="funciona" tag="span" />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText elementId="sa_how_description" defaultText="Tres simples pasos para transformar tu negocio." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={step.id} className="relative text-center">
                            <div
                                className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-white"
                                style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                            >
                                {step.icon}
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 left-3/4 w-full h-0.5 border-t-2 border-dashed" style={{ borderColor: `${sectionColors.buttonPrimaryBackground}40`, width: 'calc(100% - 150px)' }} />
                                )}
                            </div>
                            <h3
                                className="text-2xl font-bold mb-3"
                                style={{ color: sectionColors.featuresTitleColor }}
                            >
                                <EditableText elementId={step.titleId} defaultText={step.titleDefault} tag="span" />
                            </h3>
                            <p style={{ color: sectionColors.bodyTextColor }}>
                                <EditableText elementId={step.descId} defaultText={step.descDefault} tag="span" />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SaaSHowItWorks;