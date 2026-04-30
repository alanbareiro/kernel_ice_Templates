// src/templates/MarketingAgency/AgencyCaseStudies.tsx
import { ExternalLink, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import React, { useState } from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const AgencyCaseStudies: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const [activeCase, setActiveCase] = useState(0);

    const caseImages = {
        case_1: defaultImages.marketing.case1,
        case_2: defaultImages.marketing.case2,
        case_3: defaultImages.marketing.case3,
    };

    const cases = [
        {
            id: 'case_1',
            clientId: 'ag_case_1_client',
            clientDefault: 'TechCorp',
            industryId: 'ag_case_1_industry',
            industryDefault: 'Tecnología',
            titleId: 'ag_case_1_title',
            titleDefault: 'Aumento del 150% en tráfico orgánico',
            descId: 'ag_case_1_desc',
            descDefault: 'Implementamos una estrategia integral de SEO y content marketing que posicionó a TechCorp como líder del sector.',
            results: [
                { icon: <TrendingUp className="w-4 h-4" />, id: 'ag_case_1_result_1', text: '+150% tráfico', default: '+150% tráfico' },
                { icon: <Users className="w-4 h-4" />, id: 'ag_case_1_result_2', text: '+80% leads', default: '+80% leads' },
                { icon: <ShoppingCart className="w-4 h-4" />, id: 'ag_case_1_result_3', text: '+45% ventas', default: '+45% ventas' },
            ],
            imageId: 'ag_case_1_image',
            defaultImage: caseImages.case_1,
        },
        {
            id: 'case_2',
            clientId: 'ag_case_2_client',
            clientDefault: 'ModaTrend',
            industryId: 'ag_case_2_industry',
            industryDefault: 'Moda',
            titleId: 'ag_case_2_title',
            titleDefault: 'Campaña viral en redes sociales',
            descId: 'ag_case_2_desc',
            descDefault: 'Diseñamos una campaña creativa que generó más de 2 millones de interacciones y aumentó las ventas online.',
            results: [
                { icon: <Users className="w-4 h-4" />, id: 'ag_case_2_result_1', text: '2M interacciones', default: '2M interacciones' },
                { icon: <TrendingUp className="w-4 h-4" />, id: 'ag_case_2_result_2', text: '+120% seguidores', default: '+120% seguidores' },
                { icon: <ShoppingCart className="w-4 h-4" />, id: 'ag_case_2_result_3', text: '+90% ventas', default: '+90% ventas' },
            ],
            imageId: 'ag_case_2_image',
            defaultImage: caseImages.case_2,
        },
        {
            id: 'case_3',
            clientId: 'ag_case_3_client',
            clientDefault: 'Gourmet Express',
            industryId: 'ag_case_3_industry',
            industryDefault: 'Gastronomía',
            titleId: 'ag_case_3_title',
            titleDefault: 'Rediseño de sitio + SEO local',
            descId: 'ag_case_3_desc',
            descDefault: 'Rediseñamos su sitio web y optimizamos para búsquedas locales, triplicando los pedidos online.',
            results: [
                { icon: <ShoppingCart className="w-4 h-4" />, id: 'ag_case_3_result_1', text: '+200% pedidos', default: '+200% pedidos' },
                { icon: <TrendingUp className="w-4 h-4" />, id: 'ag_case_3_result_2', text: '1° en Google', default: '1° en Google' },
                { icon: <Users className="w-4 h-4" />, id: 'ag_case_3_result_3', text: '+150% leads', default: '+150% leads' },
            ],
            imageId: 'ag_case_3_image',
            defaultImage: caseImages.case_3,
        },
    ];

    return (
        <section
            id="cases"
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
                        <EditableText
                            elementId="ag_cases_title_1"
                            defaultText="Casos de"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="ag_cases_title_2"
                                defaultText="éxito"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText
                            elementId="ag_cases_description"
                            defaultText="Resultados reales que hablan por sí mismos."
                            tag="span"
                        />
                    </p>
                </div>

                {/* Selector de casos */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {cases.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveCase(index)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${activeCase === index ? 'text-white shadow-lg' : ''
                                }`}
                            style={
                                activeCase === index
                                    ? { background: sectionColors.buttonPrimaryBackground }
                                    : {
                                        backgroundColor: sectionColors.featuresCardBackground,
                                        color: sectionColors.bodyTextColor
                                    }
                            }
                        >
                            <EditableText elementId={item.clientId} defaultText={item.clientDefault} tag="span" />
                        </button>
                    ))}
                </div>

                {/* Caso activo */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div>
                            <span
                                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}15`, color: sectionColors.buttonPrimaryBackground }}
                            >
                                <EditableText elementId={cases[activeCase].industryId} defaultText={cases[activeCase].industryDefault} tag="span" />
                            </span>
                            <h3
                                className="text-3xl font-bold mb-4"
                                style={{ color: sectionColors.featuresTitleColor }}
                            >
                                <EditableText elementId={cases[activeCase].titleId} defaultText={cases[activeCase].titleDefault} tag="span" />
                            </h3>
                            <p
                                className="text-lg mb-6"
                                style={{ color: sectionColors.bodyTextColor }}
                            >
                                <EditableText elementId={cases[activeCase].descId} defaultText={cases[activeCase].descDefault} tag="span" />
                            </p>
                        </div>

                        {/* Resultados */}
                        <div className="space-y-3">
                            <h4 className="text-lg font-semibold" style={{ color: sectionColors.featuresTitleColor }}>Resultados:</h4>
                            {cases[activeCase].results.map((result, i) => (
                                <div
                                    key={i}
                                    className="flex items-center space-x-3 p-3 rounded-lg"
                                    style={{ backgroundColor: sectionColors.featuresCardBackground }}
                                >
                                    <span style={{ color: sectionColors.buttonPrimaryBackground }}>{result.icon}</span>
                                    <span style={{ color: sectionColors.bodyTextColor }}>
                                        <EditableText elementId={result.id} defaultText={result.text} tag="span" />
                                    </span>
                                </div>
                            ))}
                        </div>

                        <a href="#" className="inline-flex items-center font-semibold" style={{ color: sectionColors.buttonPrimaryBackground }}>
                            Ver caso completo <ExternalLink className="ml-2 w-4 h-4" />
                        </a>
                    </div>

                    <div className="relative">
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <EditableImage
                                elementId={cases[activeCase].imageId}
                                defaultImage={cases[activeCase].defaultImage}
                                alt={cases[activeCase].clientDefault}
                                className="w-full h-auto object-cover"
                                category="marketing"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AgencyCaseStudies;