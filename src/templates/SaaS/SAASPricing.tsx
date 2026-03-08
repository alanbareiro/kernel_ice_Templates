import { Check } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const SAASPricing: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#7c3aed',
        secondary: '#6d28d9',
        accent: '#5b21b6',
    };

    const plans = [
        {
            id: 'plan_1',
            nameId: 'sa_plan_1_name', nameDefault: 'Básico',
            priceId: 'sa_plan_1_price', priceDefault: '$29',
            periodId: 'sa_plan_1_period', periodDefault: '/mes',
            descId: 'sa_plan_1_desc', descDefault: 'Para emprendedores',
            features: [
                { id: 'sa_plan_1_feat_1', text: 'Hasta 5 usuarios' },
                { id: 'sa_plan_1_feat_2', text: '100GB de almacenamiento' },
                { id: 'sa_plan_1_feat_3', text: 'Soporte por email' },
                { id: 'sa_plan_1_feat_4', text: 'Reportes básicos' },
            ],
        },
        {
            id: 'plan_2',
            nameId: 'sa_plan_2_name', nameDefault: 'Profesional',
            priceId: 'sa_plan_2_price', priceDefault: '$79',
            periodId: 'sa_plan_2_period', periodDefault: '/mes',
            descId: 'sa_plan_2_desc', descDefault: 'Para pymes',
            highlighted: true,
            features: [
                { id: 'sa_plan_2_feat_1', text: 'Hasta 20 usuarios' },
                { id: 'sa_plan_2_feat_2', text: '500GB de almacenamiento' },
                { id: 'sa_plan_2_feat_3', text: 'Soporte prioritario' },
                { id: 'sa_plan_2_feat_4', text: 'Reportes avanzados' },
                { id: 'sa_plan_2_feat_5', text: 'API ilimitada' },
            ],
        },
        {
            id: 'plan_3',
            nameId: 'sa_plan_3_name', nameDefault: 'Empresarial',
            priceId: 'sa_plan_3_price', priceDefault: '$199',
            periodId: 'sa_plan_3_period', periodDefault: '/mes',
            descId: 'sa_plan_3_desc', descDefault: 'Para grandes empresas',
            features: [
                { id: 'sa_plan_3_feat_1', text: 'Usuarios ilimitados' },
                { id: 'sa_plan_3_feat_2', text: 'Almacenamiento ilimitado' },
                { id: 'sa_plan_3_feat_3', text: 'Soporte 24/7' },
                { id: 'sa_plan_3_feat_4', text: 'Reportes personalizados' },
                { id: 'sa_plan_3_feat_5', text: 'SLA garantizado' },
            ],
        },
    ];

    return (
        <section id="pricing" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-violet-900 dark:text-violet-100">
                        <EditableText elementId="sa_pricing_title_1" defaultText="Planes" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="sa_pricing_title_2" defaultText="flexibles" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-violet-700 dark:text-violet-300">
                        <EditableText elementId="sa_pricing_description" defaultText="Elegí el plan que mejor se adapte a tu negocio." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div key={plan.id} className={`relative rounded-2xl p-8 ${plan.highlighted ? 'bg-gradient-to-b border-2 shadow-2xl scale-105' : 'bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800'}`}
                            style={plan.highlighted ? { background: `linear-gradient(135deg, ${colors.primary}30, ${colors.accent}30)`, borderColor: colors.primary } : {}}>
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold text-white"
                                    style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                    <EditableText elementId="sa_plan_popular" defaultText="Más popular" tag="span" />
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-2 text-violet-900 dark:text-violet-100"><EditableText elementId={plan.nameId} defaultText={plan.nameDefault} tag="span" /></h3>
                            <p className="text-violet-600 dark:text-violet-400 mb-4"><EditableText elementId={plan.descId} defaultText={plan.descDefault} tag="span" /></p>
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-violet-900 dark:text-white"><EditableText elementId={plan.priceId} defaultText={plan.priceDefault} tag="span" /></span>
                                <span className="text-violet-600 dark:text-violet-400"><EditableText elementId={plan.periodId} defaultText={plan.periodDefault} tag="span" /></span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feat) => (
                                    <li key={feat.id} className="flex items-start">
                                        <Check className="w-5 h-5 mr-2 flex-shrink-0" style={{ color: colors.primary }} />
                                        <span className="text-violet-700 dark:text-violet-300"><EditableText elementId={feat.id} defaultText={feat.text} tag="span" /></span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-3 rounded-lg font-semibold transition-all"
                                style={plan.highlighted ? { background: colors.primary, color: 'white' } : { border: `2px solid ${colors.primary}`, color: colors.primary }}>
                                <EditableText elementId="sa_plan_button" defaultText="Comenzar prueba" tag="span" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SAASPricing;