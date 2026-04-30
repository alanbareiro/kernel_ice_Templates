// src/templates/Bakery/BakeryAbout.tsx
import { Award, Clock, Heart, Users } from 'lucide-react';
import React from 'react';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const BakeryAbout: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const stats = [
        { icon: <Clock className="w-6 h-6" />, valueId: 'bk_about_stat_1_value', valueDefault: '30+', labelId: 'bk_about_stat_1_label', labelDefault: 'Años de historia' },
        { icon: <Heart className="w-6 h-6" />, valueId: 'bk_about_stat_2_value', valueDefault: '100%', labelId: 'bk_about_stat_2_label', labelDefault: 'Hecho con amor' },
        { icon: <Users className="w-6 h-6" />, valueId: 'bk_about_stat_3_value', valueDefault: '15', labelId: 'bk_about_stat_3_label', labelDefault: 'Panaderos expertos' },
        { icon: <Award className="w-6 h-6" />, valueId: 'bk_about_stat_4_value', valueDefault: '8', labelId: 'bk_about_stat_4_label', labelDefault: 'Premios recibidos' },
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
                                <EditableText elementId="bk_about_badge" defaultText="Nuestra Historia" tag="span" />
                            </span>

                            <h2
                                className="font-bold mb-6"
                                style={{
                                    fontSize: typography.sectionTitleSize,
                                    color: sectionColors.featuresTitleColor
                                }}
                            >
                                <EditableText elementId="bk_about_title_1" defaultText="Tradición que se" tag="span" />{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <EditableText elementId="bk_about_title_2" defaultText="saborea" tag="span" />
                                </span>
                            </h2>

                            <p
                                className="text-lg mb-6"
                                style={{ color: sectionColors.bodyTextColor }}
                            >
                                <EditableText elementId="bk_about_desc_1" defaultText="Kernelize Bakery nació en 1993, cuando la abuela Rosa comenzó a hornear pan para su familia en el barrio de Almagro. Lo que empezó como un pequeño horno de leña, hoy es una panadería artesanal reconocida en toda la ciudad." tag="span" />
                            </p>

                            <p style={{ color: sectionColors.bodyTextColor }}>
                                <EditableText elementId="bk_about_desc_2" defaultText="Seguimos utilizando las mismas recetas tradicionales, con ingredientes seleccionados y mucho amor en cada preparación. Cada pan, cada factura, cada torta cuenta una historia de dedicación y pasión por la buena mesa." tag="span" />
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

                    {/* Imagen */}
                    <div className="relative group">
                        <div
                            className="absolute -inset-4 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                            style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        />

                        <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
                            <EditableImage
                                elementId="bk_about_image"
                                defaultImage=""
                                alt="Nuestra panadería"
                                className="w-full h-auto object-cover"
                                category="bakery"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2">
                                    <EditableText elementId="bk_founder_name" defaultText="Abuela Rosa" tag="span" />
                                </h3>
                                <p className="opacity-90">
                                    <EditableText elementId="bk_founder_title" defaultText="Fundadora y receta secreta" tag="span" />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BakeryAbout;