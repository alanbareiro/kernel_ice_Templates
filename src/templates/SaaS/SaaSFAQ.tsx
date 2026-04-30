// src/templates/SaaS/SaaSFAQ.tsx
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const SaaSFAQ: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            id: 'faq_1',
            questionId: 'sa_faq_1_q', questionDefault: '¿Necesito tarjeta de crédito para la prueba gratis?',
            answerId: 'sa_faq_1_a', answerDefault: 'No, nuestra prueba gratuita de 14 días no requiere tarjeta de crédito. Podés probar todas las funcionalidades sin compromiso.',
        },
        {
            id: 'faq_2',
            questionId: 'sa_faq_2_q', questionDefault: '¿Puedo cancelar mi suscripción en cualquier momento?',
            answerId: 'sa_faq_2_a', answerDefault: 'Sí, podés cancelar tu suscripción cuando quieras desde el panel de control. No hay contratos de permanencia.',
        },
        {
            id: 'faq_3',
            questionId: 'sa_faq_3_q', questionDefault: '¿Ofrecen soporte técnico?',
            answerId: 'sa_faq_3_a', answerDefault: 'Sí, ofrecemos soporte por email y chat para todos los planes. Los planes Profesional y Empresarial tienen soporte prioritario 24/7.',
        },
        {
            id: 'faq_4',
            questionId: 'sa_faq_4_q', questionDefault: '¿Puedo cambiar de plan más adelante?',
            answerId: 'sa_faq_4_a', answerDefault: 'Sí, podés cambiar de plan en cualquier momento. El cambio se aplica de inmediato y el costo se prorratea.',
        },
        {
            id: 'faq_5',
            questionId: 'sa_faq_5_q', questionDefault: '¿Mis datos están seguros?',
            answerId: 'sa_faq_5_a', answerDefault: 'Sí, utilizamos encriptación de extremo a extremo, backups diarios y cumplimos con las normativas GDPR.',
        },
    ];

    return (
        <section
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
                        <EditableText elementId="sa_faq_title_1" defaultText="Preguntas" tag="span" />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="sa_faq_title_2" defaultText="frecuentes" tag="span" />
                        </span>
                    </h2>
                </div>

                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div key={faq.id} className="mb-4 border rounded-lg overflow-hidden" style={{ borderColor: `${sectionColors.buttonPrimaryBackground}30` }}>
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-4 flex items-center justify-between transition-colors text-left"
                                style={{ backgroundColor: sectionColors.featuresCardBackground }}
                            >
                                <span className="font-semibold" style={{ color: sectionColors.featuresTitleColor }}>
                                    <EditableText elementId={faq.questionId} defaultText={faq.questionDefault} tag="span" />
                                </span>
                                {openIndex === index ? <ChevronUp className="w-5 h-5" style={{ color: sectionColors.buttonPrimaryBackground }} /> : <ChevronDown className="w-5 h-5" style={{ color: sectionColors.buttonPrimaryBackground }} />}
                            </button>
                            {openIndex === index && (
                                <div className="px-6 py-4 border-t" style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}05`, borderColor: `${sectionColors.buttonPrimaryBackground}30` }}>
                                    <p style={{ color: sectionColors.bodyTextColor }}>
                                        <EditableText elementId={faq.answerId} defaultText={faq.answerDefault} tag="span" />
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SaaSFAQ;