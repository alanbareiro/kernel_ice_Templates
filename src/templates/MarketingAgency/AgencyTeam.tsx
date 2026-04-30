// src/templates/MarketingAgency/AgencyTeam.tsx
import { Linkedin, Mail } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const AgencyTeam: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const teamImages = {
        team1: defaultImages.marketing.team1,
        team2: defaultImages.marketing.team2,
        team3: defaultImages.marketing.team3,
        team4: defaultImages.marketing.team4,
    };

    const team = [
        {
            id: 'team_1',
            nameId: 'ag_team_1_name',
            nameDefault: 'Lic. Pablo Martínez',
            roleId: 'ag_team_1_role',
            roleDefault: 'Director General',
            descId: 'ag_team_1_desc',
            descDefault: 'Especialista en estrategia digital y growth marketing.',
            email: 'pmartinez@kernelizemarketing.com',
            imageId: 'ag_team_1_image',
            defaultImage: teamImages.team1,
        },
        {
            id: 'team_2',
            nameId: 'ag_team_2_name',
            nameDefault: 'Lic. Laura Sánchez',
            roleId: 'ag_team_2_role',
            roleDefault: 'Directora de SEO',
            descId: 'ag_team_2_desc',
            descDefault: 'Experta en posicionamiento orgánico y estrategias de contenido.',
            email: 'lsanchez@kernelizemarketing.com',
            imageId: 'ag_team_2_image',
            defaultImage: teamImages.team2,
        },
        {
            id: 'team_3',
            nameId: 'ag_team_3_name',
            nameDefault: 'Lic. Martín Gómez',
            roleId: 'ag_team_3_role',
            roleDefault: 'Director de Redes Sociales',
            descId: 'ag_team_3_desc',
            descDefault: 'Especialista en community management y publicidad en redes.',
            email: 'mgomez@kernelizemarketing.com',
            imageId: 'ag_team_3_image',
            defaultImage: teamImages.team3,
        },
        {
            id: 'team_4',
            nameId: 'ag_team_4_name',
            nameDefault: 'Lic. Carolina Díaz',
            roleId: 'ag_team_4_role',
            roleDefault: 'Directora de Analítica',
            descId: 'ag_team_4_desc',
            descDefault: 'Experta en data science y optimización de conversiones.',
            email: 'cdiaz@kernelizemarketing.com',
            imageId: 'ag_team_4_image',
            defaultImage: teamImages.team4,
        },
    ];

    return (
        <section
            id="team"
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
                            elementId="ag_team_title_1"
                            defaultText="Nuestro"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="ag_team_title_2"
                                defaultText="Equipo"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText
                            elementId="ag_team_description"
                            defaultText="Profesionales apasionados por el marketing digital."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member) => (
                        <div key={member.id} className="group text-center">
                            <div
                                className="relative mb-4 mx-auto w-48 h-48 rounded-full overflow-hidden border-4 transition-all group-hover:scale-105 duration-300"
                                style={{ borderColor: sectionColors.buttonPrimaryBackground }}
                            >
                                <EditableImage
                                    elementId={member.imageId}
                                    defaultImage={member.defaultImage}
                                    alt={member.nameDefault}
                                    className="w-full h-full object-cover"
                                    category="marketing"
                                />
                            </div>
                            <h3
                                className="text-xl font-bold mb-1"
                                style={{ color: sectionColors.featuresTitleColor }}
                            >
                                <EditableText
                                    elementId={member.nameId}
                                    defaultText={member.nameDefault}
                                    tag="span"
                                />
                            </h3>
                            <p className="text-sm mb-2" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                <EditableText
                                    elementId={member.roleId}
                                    defaultText={member.roleDefault}
                                    tag="span"
                                />
                            </p>
                            <p
                                className="text-sm mb-3"
                                style={{ color: sectionColors.bodyTextColor }}
                            >
                                <EditableText
                                    elementId={member.descId}
                                    defaultText={member.descDefault}
                                    tag="span"
                                />
                            </p>
                            <div className="flex items-center justify-center space-x-3">
                                <a href={`mailto:${member.email}`} className="transition-colors" style={{ color: sectionColors.bodyTextColor }}>
                                    <Mail className="w-4 h-4" />
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

export default AgencyTeam;