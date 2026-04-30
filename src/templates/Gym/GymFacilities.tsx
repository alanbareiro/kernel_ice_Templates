// src/templates/Gym/GymFacilities.tsx
import { Bike, Coffee, Droplets, Dumbbell, Heart, Wind } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const GymFacilities: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const facilities = [
        { id: 'fac_1', icon: <Dumbbell className="w-8 h-8" />, titleId: 'gm_fac_1_title', titleDefault: 'Sala de musculación', descId: 'gm_fac_1_desc', descDefault: 'Equipamiento de última generación' },
        { id: 'fac_2', icon: <Bike className="w-8 h-8" />, titleId: 'gm_fac_2_title', titleDefault: 'Sala de spinning', descId: 'gm_fac_2_desc', descDefault: '40 bicicletas con pantallas' },
        { id: 'fac_3', icon: <Heart className="w-8 h-8" />, titleId: 'gm_fac_3_title', titleDefault: 'Cardio', descId: 'gm_fac_3_desc', descDefault: 'Cintas, elípticos, escaladoras' },
        { id: 'fac_4', icon: <Droplets className="w-8 h-8" />, titleId: 'gm_fac_4_title', titleDefault: 'Pileta climatizada', descId: 'gm_fac_4_desc', descDefault: 'Actividades acuáticas' },
        { id: 'fac_5', icon: <Wind className="w-8 h-8" />, titleId: 'gm_fac_5_title', titleDefault: 'Sauna', descId: 'gm_fac_5_desc', descDefault: 'Sauna seco y vapor' },
        { id: 'fac_6', icon: <Coffee className="w-8 h-8" />, titleId: 'gm_fac_6_title', titleDefault: 'Nutrición', descId: 'gm_fac_6_desc', descDefault: 'Asesoramiento nutricional' },
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
                        <EditableText elementId="gm_facilities_title_1" defaultText="Nuestras" tag="span" />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="gm_facilities_title_2" defaultText="instalaciones" tag="span" />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText elementId="gm_facilities_description" defaultText="Espacios diseñados para tu comodidad y entrenamiento." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {facilities.map((fac) => (
                        <div
                            key={fac.id}
                            className="flex items-start space-x-4 p-6 rounded-2xl border transition-all hover:border-orange-500"
                            style={{ backgroundColor: sectionColors.featuresCardBackground, borderColor: sectionColors.featuresCardBorder }}
                        >
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}15`, color: sectionColors.buttonPrimaryBackground }}
                            >
                                {fac.icon}
                            </div>
                            <div>
                                <h3
                                    className="text-lg font-bold mb-1"
                                    style={{ color: sectionColors.featuresTitleColor }}
                                >
                                    <EditableText elementId={fac.titleId} defaultText={fac.titleDefault} tag="span" />
                                </h3>
                                <p style={{ color: sectionColors.bodyTextColor }}>
                                    <EditableText elementId={fac.descId} defaultText={fac.descDefault} tag="span" />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GymFacilities;