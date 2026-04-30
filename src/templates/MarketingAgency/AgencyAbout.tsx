// src/templates/MarketingAgency/AgencyAbout.tsx
import { Award, Calendar, MapPin, Users } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const AgencyAbout: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const stats = [
        { icon: <Calendar className="w-6 h-6" />, valueId: 'ag_about_stat_1_value', valueDefault: '10+', labelId: 'ag_about_stat_1_label', labelDefault: 'Años de experiencia' },
        { icon: <Users className="w-6 h-6" />, valueId: 'ag_about_stat_2_value', valueDefault: '150+', labelId: 'ag_about_stat_2_label', labelDefault: 'Clientes' },
        { icon: <Award className="w-6 h-6" />, valueId: 'ag_about_stat_3_value', valueDefault: '15', labelId: 'ag_about_stat_3_label', labelDefault: 'Premios' },
        { icon: <MapPin className="w-6 h-6" />, valueId: 'ag_about_stat_4_value', valueDefault: '5', labelId: 'ag_about_stat_4_label', labelDefault: 'Países' },
    ];

    return (
        <section
            className="section-padding"
            style={{ backgroundColor: sectionColors.featuresBackground }}
        >
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido */}
                    <div className="space-y-8">
                        <div>
                            <span
                                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}15`, color: sectionColors.buttonPrimaryBackground }}
                            >
                                <EditableText
                                    elementId="ag_about_badge"
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
                                    elementId="ag_about_title_1"
                                    defaultText="Apasionados por los"
                                    tag="span"
                                />{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <EditableText
                                        elementId="ag_about_title_2"
                                        defaultText="resultados"
                                        tag="span"
                                    />
                                </span>
                            </h2>

                            <p
                                className="text-lg mb-6"
                                style={{ color: sectionColors.bodyTextColor }}
                            >
                                <EditableText
                                    elementId="ag_about_desc_1"
                                    defaultText="Kernelize Marketing nació en 2014 con la misión de ayudar a empresas a crecer a través del marketing digital. Lo que comenzó como un equipo de 3 personas, hoy es una agencia con más de 12 profesionales y 150 clientes satisfechos."
                                    tag="span"
                                />
                            </p>

                            <p style={{ color: sectionColors.bodyTextColor }}>
                                <EditableText
                                    elementId="ag_about_desc_2"
                                    defaultText="Nuestra filosofía es simple: trabajar en equipo con nuestros clientes, entender sus necesidades y diseñar estrategias personalizadas que generen resultados medibles y sostenibles en el tiempo."
                                    tag="span"
                                />
                            </p>
                        </div>

                        {/* Estadísticas */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t" style={{ borderColor: `${sectionColors.buttonPrimaryBackground}30` }}>
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 transition-all duration-300"
                                        style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}15`, color: sectionColors.buttonPrimaryBackground }}
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
                                        style={{ color: sectionColors.bodyTextColor }}
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
                    </div>

                    {/* Imagen */}
                    <div className="relative group">
                        <div
                            className="absolute -inset-4 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                            style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        />

                        <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
                            <EditableImage
                                elementId="ag_about_image"
                                defaultImage={defaultImages.marketing.about}
                                alt="Equipo de marketing"
                                className="w-full h-auto object-cover"
                                category="marketing"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2">
                                    <EditableText
                                        elementId="ag_founder_name"
                                        defaultText="Lic. Pablo Martínez"
                                        tag="span"
                                    />
                                </h3>
                                <p className="opacity-90">
                                    <EditableText
                                        elementId="ag_founder_title"
                                        defaultText="Director General"
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

export default AgencyAbout;