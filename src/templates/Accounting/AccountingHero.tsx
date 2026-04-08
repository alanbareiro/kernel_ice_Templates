// src/templates/Accounting/AccountingHero.tsx
import { ArrowRight, FileText, Scale, Shield, TrendingDown } from 'lucide-react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultButtons, defaultSectionColors, defaultTypography } from '../../types/template.types';

const AccountingHero = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;
    const buttons = template?.buttons || defaultButtons;

    return (
        <section
            className="relative section-padding overflow-hidden"
            style={{ backgroundColor: sectionColors.heroBackground }}
        >
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute top-20 left-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl"
                    style={{ backgroundColor: sectionColors.buttonPrimaryBackground }}
                />
                <div
                    className="absolute bottom-20 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl"
                    style={{ backgroundColor: sectionColors.buttonPrimaryBackground }}
                />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido izquierdo */}
                    <div className="space-y-8">
                        <div>
                            <span
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}20`, color: sectionColors.buttonPrimaryBackground }}
                            >
                                <Shield className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="a_hero_badge"
                                    defaultText="Confianza y Transparencia desde 1995"
                                    tag="span"
                                />
                            </span>

                            <h1
                                className="font-bold leading-tight mb-6"
                                style={{
                                    fontSize: typography.heroTitleSize,
                                    color: sectionColors.heroTitleColor
                                }}
                            >
                                <EditableText
                                    elementId="a_hero_title_1"
                                    defaultText="Soluciones contables que"
                                    tag="span"
                                />{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <EditableText
                                        elementId="a_hero_title_2"
                                        defaultText="protegen tu patrimonio"
                                        tag="span"
                                    />
                                </span>
                            </h1>

                            <p
                                className="text-xl max-w-2xl"
                                style={{
                                    fontSize: typography.heroDescriptionSize,
                                    color: sectionColors.heroDescriptionColor
                                }}
                            >
                                <EditableText
                                    elementId="a_hero_description"
                                    defaultText="Más de 25 años brindando asesoramiento contable, impositivo y financiero a empresas y particulares. Seriedad, confidencialidad y resultados."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href={buttons.primary.url}
                                target={buttons.primary.openInNewTab ? '_blank' : '_self'}
                                className="group font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                style={{
                                    backgroundColor: sectionColors.buttonPrimaryBackground,
                                    color: sectionColors.buttonPrimaryText,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = sectionColors.buttonPrimaryHoverBackground;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = sectionColors.buttonPrimaryBackground;
                                }}
                            >
                                <EditableText
                                    elementId="a_cta_primary"
                                    defaultText={buttons.primary.text}
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href={buttons.secondary.url}
                                target={buttons.secondary.openInNewTab ? '_blank' : '_self'}
                                className="group bg-transparent border-2 font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                                style={{
                                    borderColor: sectionColors.buttonPrimaryBackground,
                                    color: sectionColors.buttonPrimaryBackground
                                }}
                            >
                                <EditableText
                                    elementId="a_cta_secondary"
                                    defaultText={buttons.secondary.text}
                                    tag="span"
                                />
                            </a>
                        </div>

                        {/* Indicadores de confianza */}
                        <div className="pt-8 grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <div
                                    className="text-3xl font-bold"
                                    style={{ color: sectionColors.heroTitleColor }}
                                >
                                    <EditableText
                                        elementId="a_hero_stat_1_value"
                                        defaultText="25+"
                                        tag="span"
                                    />
                                </div>
                                <div
                                    className="text-sm"
                                    style={{ color: sectionColors.heroDescriptionColor }}
                                >
                                    <EditableText
                                        elementId="a_hero_stat_1_label"
                                        defaultText="Años de experiencia"
                                        tag="span"
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <div
                                    className="text-3xl font-bold"
                                    style={{ color: sectionColors.heroTitleColor }}
                                >
                                    <EditableText
                                        elementId="a_hero_stat_2_value"
                                        defaultText="500+"
                                        tag="span"
                                    />
                                </div>
                                <div
                                    className="text-sm"
                                    style={{ color: sectionColors.heroDescriptionColor }}
                                >
                                    <EditableText
                                        elementId="a_hero_stat_2_label"
                                        defaultText="Clientes activos"
                                        tag="span"
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <div
                                    className="text-3xl font-bold"
                                    style={{ color: sectionColors.heroTitleColor }}
                                >
                                    <EditableText
                                        elementId="a_hero_stat_3_value"
                                        defaultText="15"
                                        tag="span"
                                    />
                                </div>
                                <div
                                    className="text-sm"
                                    style={{ color: sectionColors.heroDescriptionColor }}
                                >
                                    <EditableText
                                        elementId="a_hero_stat_3_label"
                                        defaultText="Profesionales"
                                        tag="span"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Imagen derecha con iconos */}
                    <div className="relative">
                        <div
                            className="relative z-10 backdrop-blur-sm rounded-2xl border p-8 shadow-2xl"
                            style={{
                                backgroundColor: `${sectionColors.featuresCardBackground}cc`,
                                borderColor: `${sectionColors.buttonPrimaryBackground}40`
                            }}
                        >
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 border-b pb-6"
                                    style={{ borderColor: `${sectionColors.buttonPrimaryBackground}40` }}>
                                    <div className="w-16 h-16 rounded-xl flex items-center justify-center"
                                        style={{ background: `linear-gradient(135deg, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}>
                                        <FileText className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3
                                            className="font-semibold text-lg"
                                            style={{ color: sectionColors.heroTitleColor }}
                                        >
                                            <EditableText
                                                elementId="a_hero_card_1_title"
                                                defaultText="Declaraciones Juradas"
                                                tag="span"
                                            />
                                        </h3>
                                        <p
                                            className="text-sm"
                                            style={{ color: sectionColors.heroDescriptionColor }}
                                        >
                                            <EditableText
                                                elementId="a_hero_card_1_desc"
                                                defaultText="Ganancias, IVA, Bienes Personales"
                                                tag="span"
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 border-b pb-6"
                                    style={{ borderColor: `${sectionColors.buttonPrimaryBackground}40` }}>
                                    <div className="w-16 h-16 rounded-xl flex items-center justify-center"
                                        style={{ background: `linear-gradient(135deg, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}>
                                        <TrendingDown className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3
                                            className="font-semibold text-lg"
                                            style={{ color: sectionColors.heroTitleColor }}
                                        >
                                            <EditableText
                                                elementId="a_hero_card_2_title"
                                                defaultText="Planificación Fiscal"
                                                tag="span"
                                            />
                                        </h3>
                                        <p
                                            className="text-sm"
                                            style={{ color: sectionColors.heroDescriptionColor }}
                                        >
                                            <EditableText
                                                elementId="a_hero_card_2_desc"
                                                defaultText="Optimización de impuestos"
                                                tag="span"
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl flex items-center justify-center"
                                        style={{ background: `linear-gradient(135deg, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}>
                                        <Scale className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3
                                            className="font-semibold text-lg"
                                            style={{ color: sectionColors.heroTitleColor }}
                                        >
                                            <EditableText
                                                elementId="a_hero_card_3_title"
                                                defaultText="Auditoría Externa"
                                                tag="span"
                                            />
                                        </h3>
                                        <p
                                            className="text-sm"
                                            style={{ color: sectionColors.heroDescriptionColor }}
                                        >
                                            <EditableText
                                                elementId="a_hero_card_3_desc"
                                                defaultText="Estados contables certificados"
                                                tag="span"
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sello de confianza */}
                        <div
                            className="absolute -top-4 -right-4 rounded-full p-4 shadow-xl border-2"
                            style={{
                                backgroundColor: sectionColors.featuresCardBackground,
                                borderColor: sectionColors.buttonPrimaryBackground
                            }}
                        >
                            <div className="text-4xl">⚖️</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AccountingHero;