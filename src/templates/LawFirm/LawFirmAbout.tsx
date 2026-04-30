// src/templates/LawFirm/LawFirmAbout.tsx
import { Award, Calendar, MapPin, Users } from 'lucide-react';
import React from 'react';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const LawFirmAbout: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const stats = [
        { icon: <Calendar className="w-6 h-6" />, valueId: 'lf_about_stat_1_value', valueDefault: '25+', labelId: 'lf_about_stat_1_label', labelDefault: 'Años de experiencia' },
        { icon: <Users className="w-6 h-6" />, valueId: 'lf_about_stat_2_value', valueDefault: '15', labelId: 'lf_about_stat_2_label', labelDefault: 'Abogados expertos' },
        { icon: <Award className="w-6 h-6" />, valueId: 'lf_about_stat_3_value', valueDefault: '500+', labelId: 'lf_about_stat_3_label', labelDefault: 'Casos exitosos' },
        { icon: <MapPin className="w-6 h-6" />, valueId: 'lf_about_stat_4_value', valueDefault: '5', labelId: 'lf_about_stat_4_label', labelDefault: 'Oficinas' },
    ];

    return (
        <section
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
                                elementId="lf_about_image"
                                defaultImage=""
                                alt="Bufete de abogados"
                                className="w-full h-auto object-cover"
                                category="lawFirm"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2">
                                    <EditableText
                                        elementId="lf_founder_name"
                                        defaultText="Dr. Alejandro Mendoza"
                                        tag="span"
                                    />
                                </h3>
                                <p className="opacity-90">
                                    <EditableText
                                        elementId="lf_founder_title"
                                        defaultText="Socio Fundador - Especialista en Derecho Corporativo"
                                        tag="span"
                                    />
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <div>
                            <span
                                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}15`, color: sectionColors.buttonPrimaryBackground }}
                            >
                                <EditableText
                                    elementId="lf_about_badge"
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
                                    elementId="lf_about_title_1"
                                    defaultText="Compromiso con la"
                                    tag="span"
                                />{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <EditableText
                                        elementId="lf_about_title_2"
                                        defaultText="justicia"
                                        tag="span"
                                    />
                                </span>
                            </h2>

                            <p
                                className="text-lg mb-6"
                                style={{ color: sectionColors.bodyTextColor }}
                            >
                                <EditableText
                                    elementId="lf_about_desc_1"
                                    defaultText="Fundado en 1995 por el Dr. Alejandro Mendoza, nuestro bufete se ha convertido en un referente del derecho en Argentina. Lo que comenzó como un pequeño estudio, hoy es un equipo multidisciplinario que asesora a empresas y particulares en todo el país."
                                    tag="span"
                                />
                            </p>

                            <p style={{ color: sectionColors.bodyTextColor }}>
                                <EditableText
                                    elementId="lf_about_desc_2"
                                    defaultText="Nuestra filosofía es simple: ofrecer un servicio cercano, personalizado y de la más alta calidad técnica. Creemos en la ética profesional, la transparencia y en construir relaciones duraderas con nuestros clientes."
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
                </div>
            </div>
        </section>
    );
};

export default LawFirmAbout;