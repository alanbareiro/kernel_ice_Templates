import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const SaaSFAQ: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#7c3aed',
        secondary: '#6d28d9',
        accent: '#5b21b6',
    };
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
        <section className="section-padding bg-violet-50 dark:bg-violet-950">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-violet-900 dark:text-violet-100">
                        <EditableText elementId="sa_faq_title_1" defaultText="Preguntas" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="sa_faq_title_2" defaultText="frecuentes" tag="span" />
                        </span>
                    </h2>
                </div>

                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div key={faq.id} className="mb-4 border border-violet-200 dark:border-violet-800 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-violet-900/30 hover:bg-violet-50 dark:hover:bg-violet-900/50 transition-colors text-left"
                            >
                                <span className="font-semibold text-violet-900 dark:text-violet-100">
                                    <EditableText elementId={faq.questionId} defaultText={faq.questionDefault} tag="span" />
                                </span>
                                {openIndex === index ? <ChevronUp className="w-5 h-5" style={{ color: colors.primary }} /> : <ChevronDown className="w-5 h-5" style={{ color: colors.primary }} />}
                            </button>
                            {openIndex === index && (
                                <div className="px-6 py-4 bg-white dark:bg-violet-900/10 border-t border-violet-200 dark:border-violet-800">
                                    <p className="text-violet-700 dark:text-violet-300">
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