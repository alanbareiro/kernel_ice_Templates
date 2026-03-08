import {
    ArrowRight,
    Briefcase,
    Building2,
    CheckCircle,
    FileSpreadsheet,
    Users
} from 'lucide-react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const AccountingServices = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#059669',
        secondary: '#047857',
        accent: '#064e3b',
    };

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
            color: 'from-emerald-600 to-emerald-700',
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
            color: 'from-emerald-700 to-emerald-800',
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
            color: 'from-emerald-500 to-emerald-600',
        },
    ];

    return (
        <section className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-900 dark:text-emerald-100">
                        <EditableText
                            elementId="a_services_title_1"
                            defaultText="Planes"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="a_services_title_2"
                                defaultText="a tu medida"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-emerald-700 dark:text-emerald-300">
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
                            className={`relative rounded-2xl p-8 ${pkg.highlighted
                                    ? 'text-white shadow-2xl scale-105'
                                    : 'text-emerald-900 dark:text-emerald-100'
                                }`}
                            style={pkg.highlighted ? {
                                background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`
                            } : {
                                backgroundColor: `${colors.primary}08`
                            }}
                        >
                            {pkg.highlighted && pkg.badgeId && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold"
                                    style={{ background: `linear-gradient(to right, ${colors.accent}, ${colors.primary})` }}>
                                    <EditableText
                                        elementId={pkg.badgeId}
                                        defaultText={pkg.badgeDefault}
                                        tag="span"
                                    />
                                </div>
                            )}

                            <div className="w-16 h-16 rounded-xl bg-gradient-to-r p-0.5 mb-6"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                <div className={`w-full h-full rounded-xl flex items-center justify-center ${pkg.highlighted ? 'bg-transparent' : 'bg-white dark:bg-emerald-900'
                                    }`}>
                                    <div className={pkg.highlighted ? 'text-white' : ''}
                                        style={!pkg.highlighted ? { color: colors.primary } : {}}>
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
                                        <CheckCircle className={`w-5 h-5 mr-2 flex-shrink-0 ${pkg.highlighted ? 'text-white' : ''
                                            }`} style={!pkg.highlighted ? { color: colors.primary } : {}} />
                                        <span className={pkg.highlighted ? 'text-white' : 'text-emerald-700 dark:text-emerald-300'}>
                                            <EditableText
                                                elementId={feature.id}
                                                defaultText={feature.text}
                                                tag="span"
                                            />
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center group ${pkg.highlighted
                                        ? 'bg-white text-emerald-900 hover:bg-emerald-100'
                                        : 'text-white hover:opacity-90'
                                    }`}
                                style={!pkg.highlighted ? { background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` } : {}}
                            >
                                <EditableText
                                    elementId="a_plan_button"
                                    defaultText="Consultar"
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Nota adicional */}
                <div className="mt-12 text-center p-6 rounded-2xl"
                    style={{ backgroundColor: `${colors.primary}15` }}>
                    <FileSpreadsheet className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
                    <p className="text-emerald-800 dark:text-emerald-200">
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