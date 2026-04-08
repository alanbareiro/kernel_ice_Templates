// src/templates/Accounting/AccountingAbout.tsx
import { Award, Clock, Shield, Target, TrendingUp, Users } from 'lucide-react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const AccountingAbout = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const stats = [
        { icon: <Users className="w-6 h-6" />, valueId: 'a_about_stat_1_value', valueDefault: '500+', labelId: 'a_about_stat_1_label', labelDefault: 'Clientes activos' },
        { icon: <Clock className="w-6 h-6" />, valueId: 'a_about_stat_2_value', valueDefault: '25+', labelId: 'a_about_stat_2_label', labelDefault: 'Años de experiencia' },
        { icon: <Award className="w-6 h-6" />, valueId: 'a_about_stat_3_value', valueDefault: '15', labelId: 'a_about_stat_3_label', labelDefault: 'Profesionales' },
        { icon: <Target className="w-6 h-6" />, valueId: 'a_about_stat_4_value', valueDefault: '98%', labelId: 'a_about_stat_4_label', labelDefault: 'Tasa de retención' },
    ];

    return (
        <section
            id="about"
            className="section-padding"
            style={{ backgroundColor: sectionColors.featuresBackground }}
        >
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Imagen */}
                    <div className="relative group order-2 lg:order-1">
                        <div
                            className="absolute -inset-4 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                            style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        />

                        <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
                            <EditableImage
                                elementId="a_about_image"
                                defaultImage={defaultImages.accounting.about}
                                alt="Equipo de contadores"
                                className="w-full h-auto object-cover"
                                category="accounting"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2">
                                    <EditableText
                                        elementId="a_founder_name"
                                        defaultText="Dr. Roberto Méndez"
                                        tag="span"
                                    />
                                </h3>
                                <p className="opacity-90">
                                    <EditableText
                                        elementId="a_founder_title"
                                        defaultText="Socio fundador - Contador Público (UBA)"
                                        tag="span"
                                    />
                                </p>
                            </div>
                        </div>

                        {/* Sello de calidad */}
                        <div
                            className="absolute -bottom-4 -right-4 rounded-xl p-4 shadow-xl"
                            style={{
                                backgroundColor: sectionColors.featuresCardBackground,
                                border: `1px solid ${sectionColors.buttonPrimaryBackground}`
                            }}
                        >
                            <div className="flex items-center space-x-2">
                                <Shield className="w-8 h-8" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <div>
                                    <p
                                        className="font-bold"
                                        style={{ color: sectionColors.featuresTitleColor }}
                                    >
                                        <EditableText
                                            elementId="a_seal_title"
                                            defaultText="Certificados"
                                            tag="span"
                                        />
                                    </p>
                                    <p
                                        className="text-xs"
                                        style={{ color: sectionColors.buttonPrimaryBackground }}
                                    >
                                        <EditableText
                                            elementId="a_seal_subtitle"
                                            defaultText="Matrícula profesional"
                                            tag="span"
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <div>
                            <span
                                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}20`, color: sectionColors.buttonPrimaryBackground }}
                            >
                                <EditableText
                                    elementId="a_about_badge"
                                    defaultText="Nuestra Historia"
                                    tag="span"
                                />
                            </span>

                            <h2
                                className="font-bold mb-6"
                                style={{
                                    fontSize: typography.sectionTitleSize,
                                    color: sectionColors.featuresTitleColor
                                }}
                            >
                                <EditableText
                                    elementId="a_about_title_1"
                                    defaultText="Excelencia y"
                                    tag="span"
                                />{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <EditableText
                                        elementId="a_about_title_2"
                                        defaultText="Confianza"
                                        tag="span"
                                    />
                                </span>{' '}
                                <EditableText
                                    elementId="a_about_title_3"
                                    defaultText="desde 1995"
                                    tag="span"
                                />
                            </h2>

                            <p
                                className="text-lg mb-6"
                                style={{ color: sectionColors.bodyTextColor }}
                            >
                                <EditableText
                                    elementId="a_about_desc_1"
                                    defaultText="Fundado por el Dr. Roberto Méndez, nuestro estudio se ha convertido en un referente de la contabilidad en Argentina. Lo que comenzó como un pequeño despacho, hoy es un equipo multidisciplinario que asesora a más de 500 empresas y particulares."
                                    tag="span"
                                />
                            </p>

                            <p style={{ color: sectionColors.bodyTextColor }}>
                                <EditableText
                                    elementId="a_about_desc_2"
                                    defaultText="Nuestra filosofía es simple: ofrecer un servicio cercano, personalizado y de la más alta calidad técnica. Creemos en la transparencia, la ética profesional y en construir relaciones duraderas con nuestros clientes."
                                    tag="span"
                                />
                            </p>
                        </div>

                        {/* Estadísticas */}
                        <div
                            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t"
                            style={{ borderColor: `${sectionColors.buttonPrimaryBackground}30` }}
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 group-hover:scale-110 group-hover:text-white transition-all duration-300"
                                        style={{
                                            backgroundColor: `${sectionColors.buttonPrimaryBackground}20`,
                                            color: sectionColors.buttonPrimaryBackground,
                                        }}
                                    >
                                        {stat.icon}
                                    </div>
                                    <div
                                        className="text-2xl font-bold"
                                        style={{ color: sectionColors.featuresTitleColor }}
                                    >
                                        <EditableText
                                            elementId={stat.valueId}
                                            defaultText={stat.valueDefault}
                                            tag="span"
                                        />
                                    </div>
                                    <div
                                        className="text-xs"
                                        style={{ color: sectionColors.buttonPrimaryBackground }}
                                    >
                                        <EditableText
                                            elementId={stat.labelId}
                                            defaultText={stat.labelDefault}
                                            tag="span"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Valores */}
                        <div className="grid grid-cols-2 gap-4">
                            <div
                                className="p-4 rounded-xl shadow-md"
                                style={{ backgroundColor: sectionColors.featuresCardBackground }}
                            >
                                <h4
                                    className="font-bold mb-2 flex items-center"
                                    style={{ color: sectionColors.featuresTitleColor }}
                                >
                                    <Shield className="w-4 h-4 mr-2" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                    <EditableText
                                        elementId="a_value_1_title"
                                        defaultText="Ética"
                                        tag="span"
                                    />
                                </h4>
                                <p
                                    className="text-sm"
                                    style={{ color: sectionColors.bodyTextColor }}
                                >
                                    <EditableText
                                        elementId="a_value_1_desc"
                                        defaultText="Compromiso con la transparencia"
                                        tag="span"
                                    />
                                </p>
                            </div>
                            <div
                                className="p-4 rounded-xl shadow-md"
                                style={{ backgroundColor: sectionColors.featuresCardBackground }}
                            >
                                <h4
                                    className="font-bold mb-2 flex items-center"
                                    style={{ color: sectionColors.featuresTitleColor }}
                                >
                                    <TrendingUp className="w-4 h-4 mr-2" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                    <EditableText
                                        elementId="a_value_2_title"
                                        defaultText="Eficiencia"
                                        tag="span"
                                    />
                                </h4>
                                <p
                                    className="text-sm"
                                    style={{ color: sectionColors.bodyTextColor }}
                                >
                                    <EditableText
                                        elementId="a_value_2_desc"
                                        defaultText="Resultados medibles"
                                        tag="span"
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AccountingAbout;