import { ClipboardCheck, Heart, Phone, Sparkles } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const CleaningProcess: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#0284c7',
        secondary: '#0369a1',
        accent: '#075985',
    };

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
        <section id="process" className="section-padding bg-sky-50 dark:bg-sky-950">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-sky-900 dark:text-sky-100">
                        <EditableText elementId="cl_process_title_1" defaultText="Cómo" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="cl_process_title_2" defaultText="trabajamos" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-sky-700 dark:text-sky-300">
                        <EditableText elementId="cl_process_description" defaultText="Un proceso simple y transparente." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={step.id} className="relative text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                {index + 1}
                            </div>
                            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center" style={{ color: colors.primary }}>
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-sky-900 dark:text-sky-100">
                                <EditableText elementId={step.titleId} defaultText={step.titleDefault} tag="span" />
                            </h3>
                            <p className="text-sky-700 dark:text-sky-300">
                                <EditableText elementId={step.descId} defaultText={step.descDefault} tag="span" />
                            </p>
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-20 left-3/4 w-full h-0.5 border-t-2 border-dashed border-sky-300 dark:border-sky-700"
                                    style={{ width: 'calc(100% - 100px)' }} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CleaningProcess;