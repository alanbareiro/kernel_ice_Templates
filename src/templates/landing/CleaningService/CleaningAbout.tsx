// src/templates/CleaningService/CleaningAbout.tsx
import { Award, Building2, HeartHandshake, Users } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const CleaningAbout: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const stats = [
        { icon: <Award className="w-6 h-6" />, valueId: 'cl_about_stat_1_value', valueDefault: '10+', labelId: 'cl_about_stat_1_label', labelDefault: 'Años de experiencia' },
        { icon: <Users className="w-6 h-6" />, valueId: 'cl_about_stat_2_value', valueDefault: '5000+', labelId: 'cl_about_stat_2_label', labelDefault: 'Clientes' },
        { icon: <Building2 className="w-6 h-6" />, valueId: 'cl_about_stat_3_value', valueDefault: '15000+', labelId: 'cl_about_stat_3_label', labelDefault: 'Servicios' },
        { icon: <HeartHandshake className="w-6 h-6" />, valueId: 'cl_about_stat_4_value', valueDefault: '5', labelId: 'cl_about_stat_4_label', labelDefault: 'Premios' },
    ];

    return (
        <section
            className="section-padding"
            style={{ backgroundColor: sectionColors.featuresBackground }}
        >
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative group order-2 lg:order-1">
                        <div
                            className="absolute -inset-4 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                            style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        />

                        <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
                            <EditableImage
                                elementId="cl_about_image"
                                defaultImage={defaultImages.cleaning.about}
                                alt="Nuestro equipo"
                                className="w-full h-auto object-cover"
                                category="cleaning"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2">
                                    <EditableText elementId="cl_founder_name" defaultText="Carlos Rodríguez" tag="span" />
                                </h3>
                                <p className="opacity-90">
                                    <EditableText elementId="cl_founder_title" defaultText="Fundador" tag="span" />
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 order-1 lg:order-2">
                        <div>
                            <span
                                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}15`, color: sectionColors.buttonPrimaryBackground }}
                            >
                                <EditableText elementId="cl_about_badge" defaultText="Nuestra historia" tag="span" />
                            </span>

                            <h2
                                className="font-bold mb-6"
                                style={{
                                    fontSize: typography.sectionTitleSize,
                                    color: sectionColors.featuresTitleColor
                                }}
                            >
                                <EditableText elementId="cl_about_title_1" defaultText="Compromiso con la" tag="span" />{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <EditableText elementId="cl_about_title_2" defaultText="calidad" tag="span" />
                                </span>
                            </h2>

                            <p
                                className="text-lg mb-6"
                                style={{ color: sectionColors.bodyTextColor }}
                            >
                                <EditableText elementId="cl_about_desc_1" defaultText="Kernelize Cleaning nació en 2014 con una misión clara: ofrecer servicios de limpieza profesionales, confiables y accesibles. Comenzamos con un pequeño equipo y hoy somos una empresa con más de 50 empleados y miles de clientes satisfechos." tag="span" />
                            </p>

                            <p style={{ color: sectionColors.bodyTextColor }}>
                                <EditableText elementId="cl_about_desc_2" defaultText="Nuestro secreto: personal capacitado, productos ecológicos y un riguroso control de calidad. Creemos que un espacio limpio mejora la calidad de vida, por eso ponemos el máximo esfuerzo en cada trabajo." tag="span" />
                            </p>
                        </div>

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
                                        <EditableText elementId={stat.valueId} defaultText={stat.valueDefault} tag="span" />
                                    </div>
                                    <div
                                        className="text-xs"
                                        style={{ color: sectionColors.bodyTextColor }}
                                    >
                                        <EditableText elementId={stat.labelId} defaultText={stat.labelDefault} tag="span" />
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

export default CleaningAbout;