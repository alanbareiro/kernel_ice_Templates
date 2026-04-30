// src/templates/LawFirm/LawFirmAttorneys.tsx
import { Linkedin, Mail, Phone } from 'lucide-react';
import React from 'react';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const LawFirmAttorneys: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const attorneys = [
        {
            id: 'attorney_1',
            nameId: 'lf_attorney_1_name',
            nameDefault: 'Dr. Alejandro Mendoza',
            roleId: 'lf_attorney_1_role',
            roleDefault: 'Socio Fundador - Corporativo',
            email: 'amendoza@kernelize.com',
            phone: '+54 11 4567-8901',
            imageId: 'lf_attorney_1_image',
        },
        {
            id: 'attorney_2',
            nameId: 'lf_attorney_2_name',
            nameDefault: 'Dra. Carolina Suárez',
            roleId: 'lf_attorney_2_role',
            roleDefault: 'Socia - Derecho Penal',
            email: 'csuarez@kernelize.com',
            phone: '+54 11 4567-8902',
            imageId: 'lf_attorney_2_image',
        },
        {
            id: 'attorney_3',
            nameId: 'lf_attorney_3_name',
            nameDefault: 'Dr. Roberto García',
            roleId: 'lf_attorney_3_role',
            roleDefault: 'Socio - Derecho Civil',
            email: 'rgarcia@kernelize.com',
            phone: '+54 11 4567-8903',
            imageId: 'lf_attorney_3_image',
        },
        {
            id: 'attorney_4',
            nameId: 'lf_attorney_4_name',
            nameDefault: 'Dra. Patricia López',
            roleId: 'lf_attorney_4_role',
            roleDefault: 'Asociada - Derecho Laboral',
            email: 'plopez@kernelize.com',
            phone: '+54 11 4567-8904',
            imageId: 'lf_attorney_4_image',
        },
    ];

    return (
        <section
            id="attorneys"
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
                            elementId="lf_attorneys_title_1"
                            defaultText="Nuestro"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="lf_attorneys_title_2"
                                defaultText="Equipo Legal"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText
                            elementId="lf_attorneys_description"
                            defaultText="Profesionales de alto nivel, comprometidos con tu caso."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {attorneys.map((attorney) => (
                        <div key={attorney.id} className="group text-center">
                            <div
                                className="relative mb-4 mx-auto w-48 h-48 rounded-full overflow-hidden border-4 transition-all group-hover:scale-105 duration-300"
                                style={{ borderColor: sectionColors.buttonPrimaryBackground }}
                            >
                                <EditableImage
                                    elementId={attorney.imageId}
                                    defaultImage=""
                                    alt={attorney.nameDefault}
                                    className="w-full h-full object-cover"
                                    category="lawFirm"
                                />
                            </div>
                            <h3
                                className="text-xl font-bold mb-1"
                                style={{ color: sectionColors.featuresTitleColor }}
                            >
                                <EditableText
                                    elementId={attorney.nameId}
                                    defaultText={attorney.nameDefault}
                                    tag="span"
                                />
                            </h3>
                            <p className="text-sm mb-3" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                <EditableText
                                    elementId={attorney.roleId}
                                    defaultText={attorney.roleDefault}
                                    tag="span"
                                />
                            </p>
                            <div className="flex items-center justify-center space-x-3">
                                <a href={`mailto:${attorney.email}`} className="transition-colors" style={{ color: sectionColors.bodyTextColor }}>
                                    <Mail className="w-4 h-4" />
                                </a>
                                <a href={`tel:${attorney.phone}`} className="transition-colors" style={{ color: sectionColors.bodyTextColor }}>
                                    <Phone className="w-4 h-4" />
                                </a>
                                <a href="#" className="transition-colors" style={{ color: sectionColors.bodyTextColor }}>
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LawFirmAttorneys;