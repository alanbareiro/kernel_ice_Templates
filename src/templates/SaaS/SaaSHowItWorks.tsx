import { Rocket, Settings, UserPlus } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const SaaSHowItWorks: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#7c3aed',
        secondary: '#6d28d9',
        accent: '#5b21b6',
    };

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
        <section id="how" className="section-padding bg-violet-50 dark:bg-violet-950">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-violet-900 dark:text-violet-100">
                        <EditableText elementId="sa_how_title_1" defaultText="Cómo" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="sa_how_title_2" defaultText="funciona" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-violet-700 dark:text-violet-300">
                        <EditableText elementId="sa_how_description" defaultText="Tres simples pasos para transformar tu negocio." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={step.id} className="relative text-center">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-white"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                {step.icon}
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 left-3/4 w-full h-0.5 border-t-2 border-dashed border-violet-300 dark:border-violet-700"
                                        style={{ width: 'calc(100% - 150px)' }} />
                                )}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-violet-900 dark:text-violet-100">
                                <EditableText elementId={step.titleId} defaultText={step.titleDefault} tag="span" />
                            </h3>
                            <p className="text-violet-700 dark:text-violet-300">
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