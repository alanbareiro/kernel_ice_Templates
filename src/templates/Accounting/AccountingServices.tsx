// src/templates/Accounting/AccountingServices.tsx
import {
    ArrowRight,
    Briefcase,
    Building2,
    CheckCircle,
    FileSpreadsheet,
    Users
} from 'lucide-react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultButtons, defaultSectionColors, defaultTypography } from '../../types/template.types';

const AccountingServices = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;
    const buttons = template?.buttons || defaultButtons;

    const servicePackages = [
        {
            titleId: 'a_plan_1_title',
            titleDefault: 'Para Profesionales',
            icon: <Briefcase className="w-8 h-8" />,
            priceId: 'a_plan_1_price',
            priceDefault: 'Desde $15,000/mes',
            features: [
                { id: 'a_plan_1_feature_1', text: 'Liquidación de monotributo' },
                { id: 'a_plan_1_feature_2', text: 'Declaraciones juradas anuales' },
                { id: 'a_plan_1_feature_3', text: 'Asesoramiento personalizado' },
                { id: 'a_plan_1_feature_4', text: 'Facturación electrónica' },
            ],
            highlighted: false,
        },
        {
            titleId: 'a_plan_2_title',
            titleDefault: 'Para Empresas',
            icon: <Building2 className="w-8 h-8" />,
            priceId: 'a_plan_2_price',
            priceDefault: 'Desde $35,000/mes',
            badgeId: 'a_plan_2_badge',
            badgeDefault: 'Más elegido',
            features: [
                { id: 'a_plan_2_feature_1', text: 'Contabilidad completa' },
                { id: 'a_plan_2_feature_2', text: 'Liquidación de impuestos' },
                { id: 'a_plan_2_feature_3', text: 'Liquidación de sueldos' },
                { id: 'a_plan_2_feature_4', text: 'Auditoría externa' },
                { id: 'a_plan_2_feature_5', text: 'Planificación fiscal' },
            ],
            highlighted: true,
        },
        {
            titleId: 'a_plan_3_title',
            titleDefault: 'Para Emprendedores',
            icon: <Users className="w-8 h-8" />,
            priceId: 'a_plan_3_price',
            priceDefault: 'Desde $8,000/mes',
            features: [
                { id: 'a_plan_3_feature_1', text: 'Asesoramiento inicial' },
                { id: 'a_plan_3_feature_2', text: 'Inscripción AFIP/ARBA' },
                { id: 'a_plan_3_feature_3', text: 'Liquidación de impuestos' },
                { id: 'a_plan_3_feature_4', text: 'Facturación' },
            ],
            highlighted: false,
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
                        <EditableText
                            elementId="a_services_title_1"
                            defaultText="Planes"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="a_services_title_2"
                                defaultText="a tu medida"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText
                            elementId="a_services_description"
                            defaultText="Ofrecemos soluciones adaptadas a cada etapa de tu negocio, con precios claros y sin sorpresas."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {servicePackages.map((pkg, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${pkg.highlighted ? 'text-white shadow-2xl' : ''
                                }`}
                            style={
                                pkg.highlighted
                                    ? { background: `linear-gradient(135deg, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }
                                    : { backgroundColor: `${sectionColors.buttonPrimaryBackground}08` }
                            }
                        >
                            {pkg.highlighted && pkg.badgeId && (
                                <div
                                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold text-white"
                                    style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <EditableText
                                        elementId={pkg.badgeId}
                                        defaultText={pkg.badgeDefault}
                                        tag="span"
                                    />
                                </div>
                            )}

                            <div className="w-16 h-16 rounded-xl p-0.5 mb-6"
                                style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}>
                                <div
                                    className={`w-full h-full rounded-xl flex items-center justify-center ${pkg.highlighted ? 'bg-transparent' : ''
                                        }`}
                                    style={!pkg.highlighted ? { backgroundColor: sectionColors.featuresCardBackground } : {}}
                                >
                                    <div style={!pkg.highlighted ? { color: sectionColors.buttonPrimaryBackground } : { color: 'white' }}>
                                        {pkg.icon}
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-2">
                                <EditableText
                                    elementId={pkg.titleId}
                                    defaultText={pkg.titleDefault}
                                    tag="span"
                                />
                            </h3>
                            <p className="text-lg mb-6 font-semibold">
                                <EditableText
                                    elementId={pkg.priceId}
                                    defaultText={pkg.priceDefault}
                                    tag="span"
                                />
                            </p>

                            <ul className="space-y-3 mb-8">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <CheckCircle className={`w-5 h-5 mr-2 flex-shrink-0 ${pkg.highlighted ? 'text-white' : ''}`}
                                            style={!pkg.highlighted ? { color: sectionColors.buttonPrimaryBackground } : {}} />
                                        <span className={pkg.highlighted ? 'text-white' : ''} style={!pkg.highlighted ? { color: sectionColors.bodyTextColor } : {}}>
                                            <EditableText
                                                elementId={feature.id}
                                                defaultText={feature.text}
                                                tag="span"
                                            />
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={buttons.primary.url}
                                target={buttons.primary.openInNewTab ? '_blank' : '_self'}
                                className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center group ${pkg.highlighted
                                        ? 'bg-white hover:bg-emerald-100'
                                        : 'text-white hover:opacity-90'
                                    }`}
                                style={!pkg.highlighted ? { background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` } : {}}
                            >
                                <EditableText
                                    elementId="a_plan_button"
                                    defaultText="Consultar"
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    ))}
                </div>

                {/* Nota adicional */}
                <div
                    className="mt-12 text-center p-6 rounded-2xl"
                    style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}15` }}
                >
                    <FileSpreadsheet className="w-12 h-12 mx-auto mb-4" style={{ color: sectionColors.buttonPrimaryBackground }} />
                    <p style={{ color: sectionColors.bodyTextColor }}>
                        <EditableText
                            elementId="a_plan_note"
                            defaultText="¿Necesitas un servicio específico? Contactanos para armar un plan a tu medida."
                            tag="span"
                        />
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AccountingServices;