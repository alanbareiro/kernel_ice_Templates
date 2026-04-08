// src/templates/Accounting/AccountingFeatures.tsx
import {
    Building2,
    Calculator,
    FileText,
    Receipt,
    Scale,
    Shield,
    TrendingUp,
    Users
} from 'lucide-react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const AccountingFeatures = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const features = [
        {
            icon: <FileText className="w-8 h-8" />,
            titleId: 'a_feature_title_taxes',
            titleDefault: 'Liquidación de Impuestos',
            descId: 'a_feature_desc_taxes',
            descDefault: 'IVA, Ganancias, Ingresos Brutos, Bienes Personales y más. Al día y sin errores.',
        },
        {
            icon: <Calculator className="w-8 h-8" />,
            titleId: 'a_feature_title_accounting',
            titleDefault: 'Contabilidad General',
            descId: 'a_feature_desc_accounting',
            descDefault: 'Libros contables, balances y estados financieros ajustados a normas legales.',
        },
        {
            icon: <Users className="w-8 h-8" />,
            titleId: 'a_feature_title_payroll',
            titleDefault: 'Liquidación de Sueldos',
            descId: 'a_feature_desc_payroll',
            descDefault: 'Altas, bajas, liquidaciones mensuales, cargas sociales y sindicatos.',
        },
        {
            icon: <Building2 className="w-8 h-8" />,
            titleId: 'a_feature_title_companies',
            titleDefault: 'Sociedades Comerciales',
            descId: 'a_feature_desc_companies',
            descDefault: 'Constitución, disolución, asambleas y trámites ante IGJ.',
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            titleId: 'a_feature_title_financial',
            titleDefault: 'Planificación Financiera',
            descId: 'a_feature_desc_financial',
            descDefault: 'Análisis de costos, presupuestos y proyecciones para tu negocio.',
        },
        {
            icon: <Scale className="w-8 h-8" />,
            titleId: 'a_feature_title_audit',
            titleDefault: 'Auditoría',
            descId: 'a_feature_desc_audit',
            descDefault: 'Revisiones integrales y dictámenes para tu tranquilidad.',
        },
        {
            icon: <Receipt className="w-8 h-8" />,
            titleId: 'a_feature_title_monotax',
            titleDefault: 'Monotributo',
            descId: 'a_feature_desc_monotax',
            descDefault: 'Inscripción, recategorización y pago de impuestos simplificado.',
        },
        {
            icon: <Shield className="w-8 h-8" />,
            titleId: 'a_feature_title_defense',
            titleDefault: 'Defensa del Contribuyente',
            descId: 'a_feature_desc_defense',
            descDefault: 'Representación ante AFIP, ARBA y organismos de recaudación.',
        },
    ];

    return (
        <section
            id="services"
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
                            elementId="a_features_title_1"
                            defaultText="Servicios"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="a_features_title_2"
                                defaultText="Profesionales"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText
                            elementId="a_features_description"
                            defaultText="Ofrecemos un servicio integral para que puedas dedicarte a lo que realmente importa: hacer crecer tu negocio."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-xl border transition-all duration-300 hover:shadow-xl"
                            style={{
                                backgroundColor: sectionColors.featuresCardBackground,
                                borderColor: `${sectionColors.buttonPrimaryBackground}30`,
                            }}
                        >
                            <div className="w-14 h-14 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                style={{ background: `linear-gradient(135deg, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}>
                                <div
                                    className="w-full h-full rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: sectionColors.featuresCardBackground, color: sectionColors.buttonPrimaryBackground }}
                                >
                                    {feature.icon}
                                </div>
                            </div>

                            <h3
                                className="text-lg font-bold mb-2 transition-colors"
                                style={{ color: sectionColors.featuresTitleColor }}
                            >
                                <EditableText
                                    elementId={feature.titleId}
                                    defaultText={feature.titleDefault}
                                    tag="span"
                                />
                            </h3>

                            <p
                                className="text-sm leading-relaxed"
                                style={{ color: sectionColors.bodyTextColor }}
                            >
                                <EditableText
                                    elementId={feature.descId}
                                    defaultText={feature.descDefault}
                                    tag="span"
                                />
                            </p>
                        </div>
                    ))}
                </div>

                {/* Badge de certificación */}
                <div className="mt-16 text-center">
                    <div
                        className="inline-flex items-center space-x-4 rounded-2xl p-6"
                        style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}15` }}
                    >
                        <Shield className="w-12 h-12" style={{ color: sectionColors.buttonPrimaryBackground }} />
                        <div className="text-left">
                            <p
                                className="font-semibold"
                                style={{ color: sectionColors.featuresTitleColor }}
                            >
                                <EditableText
                                    elementId="a_cert_badge_title"
                                    defaultText="Estudio certificado por FACPCE"
                                    tag="span"
                                />
                            </p>
                            <p
                                className="text-sm"
                                style={{ color: sectionColors.buttonPrimaryBackground }}
                            >
                                <EditableText
                                    elementId="a_cert_badge_subtitle"
                                    defaultText="Miembros del Consejo Profesional"
                                    tag="span"
                                />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AccountingFeatures;