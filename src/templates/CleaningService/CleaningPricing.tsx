import { Check } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const CleaningPricing: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#0284c7',
        secondary: '#0369a1',
        accent: '#075985',
    };

    const plans = [
        {
            id: 'plan_1',
            nameId: 'cl_plan_1_name', nameDefault: 'Básico',
            priceId: 'cl_plan_1_price', priceDefault: '$4500',
            periodId: 'cl_plan_1_period', periodDefault: '/sesión',
            descId: 'cl_plan_1_desc', descDefault: 'Ideal para departamentos chicos',
            features: [
                { id: 'cl_plan_1_feat_1', text: 'Limpieza general' },
                { id: 'cl_plan_1_feat_2', text: 'Baños y cocina' },
                { id: 'cl_plan_1_feat_3', text: 'Aspirado y trapeado' },
                { id: 'cl_plan_1_feat_4', text: 'Duración: 3 horas' },
            ],
        },
        {
            id: 'plan_2',
            nameId: 'cl_plan_2_name', nameDefault: 'Estándar',
            priceId: 'cl_plan_2_price', priceDefault: '$6500',
            periodId: 'cl_plan_2_period', periodDefault: '/sesión',
            descId: 'cl_plan_2_desc', descDefault: 'El más elegido',
            highlighted: true,
            features: [
                { id: 'cl_plan_2_feat_1', text: 'Todo del plan Básico' },
                { id: 'cl_plan_2_feat_2', text: 'Limpieza de vidrios' },
                { id: 'cl_plan_2_feat_3', text: 'Limpieza de heladera' },
                { id: 'cl_plan_2_feat_4', text: 'Duración: 5 horas' },
                { id: 'cl_plan_2_feat_5', text: 'Productos incluidos' },
            ],
        },
        {
            id: 'plan_3',
            nameId: 'cl_plan_3_name', nameDefault: 'Premium',
            priceId: 'cl_plan_3_price', priceDefault: '$8500',
            periodId: 'cl_plan_3_period', periodDefault: '/sesión',
            descId: 'cl_plan_3_desc', descDefault: 'Limpieza profunda',
            features: [
                { id: 'cl_plan_3_feat_1', text: 'Todo del plan Estándar' },
                { id: 'cl_plan_3_feat_2', text: 'Limpieza de alfombras' },
                { id: 'cl_plan_3_feat_3', text: 'Limpieza de sillones' },
                { id: 'cl_plan_3_feat_4', text: 'Limpieza de horno' },
                { id: 'cl_plan_3_feat_5', text: 'Duración: 8 horas' },
            ],
        },
    ];

    return (
        <section id="pricing" className="section-padding bg-sky-50 dark:bg-sky-950">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-sky-900 dark:text-sky-100">
                        <EditableText elementId="cl_pricing_title_1" defaultText="Nuestros" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="cl_pricing_title_2" defaultText="precios" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-sky-700 dark:text-sky-300">
                        <EditableText elementId="cl_pricing_description" defaultText="Planes flexibles, sin contratos de permanencia." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div key={plan.id} className={`relative rounded-2xl p-8 ${plan.highlighted ? 'bg-white dark:bg-sky-900 shadow-2xl scale-105 border-2' : 'bg-white dark:bg-sky-900/50 border border-sky-200 dark:border-sky-800'}`}
                            style={plan.highlighted ? { borderColor: colors.primary } : {}}>
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold text-white"
                                    style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText elementId="cl_plan_popular" defaultText="Más popular" tag="span" />
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-2 text-sky-900 dark:text-sky-100"><EditableText elementId={plan.nameId} defaultText={plan.nameDefault} tag="span" /></h3>
                            <p className="text-sky-600 dark:text-sky-400 mb-4"><EditableText elementId={plan.descId} defaultText={plan.descDefault} tag="span" /></p>
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-sky-900 dark:text-white"><EditableText elementId={plan.priceId} defaultText={plan.priceDefault} tag="span" /></span>
                                <span className="text-sky-600 dark:text-sky-400"><EditableText elementId={plan.periodId} defaultText={plan.periodDefault} tag="span" /></span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feat) => (
                                    <li key={feat.id} className="flex items-start">
                                        <Check className="w-5 h-5 mr-2 flex-shrink-0" style={{ color: colors.primary }} />
                                        <span className="text-sky-700 dark:text-sky-300"><EditableText elementId={feat.id} defaultText={feat.text} tag="span" /></span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-3 rounded-lg font-semibold transition-all"
                                style={plan.highlighted ? { background: colors.primary, color: 'white' } : { border: `2px solid ${colors.primary}`, color: colors.primary }}>
                                <EditableText elementId="cl_plan_button" defaultText="Contratar" tag="span" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CleaningPricing;