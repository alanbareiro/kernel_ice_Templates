// src/templates/Gym/GymPricing.tsx
import { Check, Crown, Dumbbell, Zap } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const GymPricing: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const plans = [
        {
            id: 'plan_1',
            icon: <Dumbbell className="w-8 h-8" />,
            nameId: 'gm_plan_1_name', nameDefault: 'Básico',
            priceId: 'gm_plan_1_price', priceDefault: '$4500',
            periodId: 'gm_plan_1_period', periodDefault: '/mes',
            features: [
                { id: 'gm_plan_1_feat_1', text: 'Acceso a sala de musculación' },
                { id: 'gm_plan_1_feat_2', text: 'Horario libre (8-22hs)' },
                { id: 'gm_plan_1_feat_3', text: 'Evaluación inicial' },
                { id: 'gm_plan_1_feat_4', text: 'App con rutinas' },
            ],
            highlighted: false,
        },
        {
            id: 'plan_2',
            icon: <Zap className="w-8 h-8" />,
            nameId: 'gm_plan_2_name', nameDefault: 'Premium',
            priceId: 'gm_plan_2_price', priceDefault: '$6500',
            periodId: 'gm_plan_2_period', periodDefault: '/mes',
            highlighted: true,
            features: [
                { id: 'gm_plan_2_feat_1', text: 'Todo del plan Básico' },
                { id: 'gm_plan_2_feat_2', text: 'Clases grupales ilimitadas' },
                { id: 'gm_plan_2_feat_3', text: 'Seguimiento personalizado' },
                { id: 'gm_plan_2_feat_4', text: 'Acceso a sede premium' },
                { id: 'gm_plan_2_feat_5', text: 'Invitado los fines de semana' },
            ],
        },
        {
            id: 'plan_3',
            icon: <Crown className="w-8 h-8" />,
            nameId: 'gm_plan_3_name', nameDefault: 'Black',
            priceId: 'gm_plan_3_price', priceDefault: '$8500',
            periodId: 'gm_plan_3_period', periodDefault: '/mes',
            highlighted: false,
            features: [
                { id: 'gm_plan_3_feat_1', text: 'Todo del plan Premium' },
                { id: 'gm_plan_3_feat_2', text: 'Entrenador personal 2x/sem' },
                { id: 'gm_plan_3_feat_3', text: 'Nutricionista incluido' },
                { id: 'gm_plan_3_feat_4', text: 'Acceso 24/7' },
                { id: 'gm_plan_3_feat_5', text: 'Spa y recuperación' },
            ],
        },
    ];

    return (
        <section
            id="pricing"
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
                        <EditableText elementId="gm_pricing_title_1" defaultText="Planes" tag="span" />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="gm_pricing_title_2" defaultText="a tu medida" tag="span" />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText elementId="gm_pricing_description" defaultText="Elegí el plan que mejor se adapte a tus objetivos." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative rounded-2xl p-8 border ${plan.highlighted ? 'bg-gradient-to-b border-2' : 'border'
                                }`}
                            style={
                                plan.highlighted
                                    ? { background: `linear-gradient(135deg, ${sectionColors.buttonPrimaryBackground}30, ${sectionColors.buttonPrimaryBackground}30)`, borderColor: sectionColors.buttonPrimaryBackground }
                                    : { backgroundColor: sectionColors.featuresCardBackground, borderColor: sectionColors.featuresCardBorder }
                            }
                        >
                            {plan.highlighted && (
                                <div
                                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold text-white"
                                    style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <EditableText elementId="gm_plan_popular" defaultText="Más popular" tag="span" />
                                </div>
                            )}
                            <div
                                className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center"
                                style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}20`, color: sectionColors.buttonPrimaryBackground }}
                            >
                                {plan.icon}
                            </div>
                            <h3
                                className="text-2xl font-bold mb-2"
                                style={{ color: sectionColors.featuresTitleColor }}
                            >
                                <EditableText elementId={plan.nameId} defaultText={plan.nameDefault} tag="span" />
                            </h3>
                            <div className="mb-6">
                                <span
                                    className="text-4xl font-bold"
                                    style={{ color: sectionColors.featuresTitleColor }}
                                >
                                    <EditableText elementId={plan.priceId} defaultText={plan.priceDefault} tag="span" />
                                </span>
                                <span style={{ color: sectionColors.bodyTextColor }}>
                                    <EditableText elementId={plan.periodId} defaultText={plan.periodDefault} tag="span" />
                                </span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feat) => (
                                    <li key={feat.id} className="flex items-start">
                                        <Check className="w-5 h-5 mr-2 flex-shrink-0" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                        <span style={{ color: sectionColors.bodyTextColor }}>
                                            <EditableText elementId={feat.id} defaultText={feat.text} tag="span" />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className="w-full py-3 rounded-lg font-semibold transition-all border"
                                style={
                                    plan.highlighted
                                        ? { background: sectionColors.buttonPrimaryBackground, color: 'white', borderColor: sectionColors.buttonPrimaryBackground }
                                        : { borderColor: sectionColors.buttonPrimaryBackground, color: sectionColors.buttonPrimaryBackground }
                                }
                            >
                                <EditableText elementId="gm_plan_button" defaultText="Comenzar ahora" tag="span" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GymPricing;