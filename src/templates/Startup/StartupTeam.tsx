// src/templates/Startup/StartupTeam.tsx
import { Linkedin, Twitter } from 'lucide-react';
import React from 'react';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const StartupTeam: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const team = [
        {
            id: 'team_1',
            nameId: 'st_team_1_name', nameDefault: 'Martín Rodríguez',
            roleId: 'st_team_1_role', roleDefault: 'CEO & Co-founder',
            descId: 'st_team_1_desc', descDefault: 'Ex-Google, 10 años en tecnología.',
            linkedin: '#', twitter: '#',
            imageId: 'st_team_1_image',
        },
        {
            id: 'team_2',
            nameId: 'st_team_2_name', nameDefault: 'Laura Méndez',
            roleId: 'st_team_2_role', roleDefault: 'CTO & Co-founder',
            descId: 'st_team_2_desc', descDefault: 'Ex-Mercado Libre, especialista en IA.',
            linkedin: '#', twitter: '#',
            imageId: 'st_team_2_image',
        },
        {
            id: 'team_3',
            nameId: 'st_team_3_name', nameDefault: 'Pablo Díaz',
            roleId: 'st_team_3_role', roleDefault: 'CPO',
            descId: 'st_team_3_desc', descDefault: 'Ex-Uber, producto y experiencia de usuario.',
            linkedin: '#', twitter: '#',
            imageId: 'st_team_3_image',
        },
        {
            id: 'team_4',
            nameId: 'st_team_4_name', nameDefault: 'Carolina Torres',
            roleId: 'st_team_4_role', roleDefault: 'CMO',
            descId: 'st_team_4_desc', descDefault: 'Marketing digital y growth.',
            linkedin: '#', twitter: '#',
            imageId: 'st_team_4_image',
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
                        <EditableText elementId="st_team_title_1" defaultText="Nuestro" tag="span" />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="st_team_title_2" defaultText="equipo" tag="span" />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText elementId="st_team_description" defaultText="Profesionales apasionados por la innovación." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member) => (
                        <div key={member.id} className="group text-center">
                            <div
                                className="relative mb-4 mx-auto w-48 h-48 rounded-full overflow-hidden border-4 transition-all group-hover:scale-105"
                                style={{ borderColor: `${sectionColors.buttonPrimaryBackground}60` }}
                            >
                                <EditableImage elementId={member.imageId} defaultImage="" alt={member.nameDefault} className="w-full h-full object-cover" category="startup" />
                            </div>
                            <h3
                                className="text-xl font-bold mb-1"
                                style={{ color: sectionColors.featuresTitleColor }}
                            >
                                <EditableText elementId={member.nameId} defaultText={member.nameDefault} tag="span" />
                            </h3>
                            <p className="text-sm mb-2" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                <EditableText elementId={member.roleId} defaultText={member.roleDefault} tag="span" />
                            </p>
                            <p
                                className="text-sm mb-3"
                                style={{ color: sectionColors.bodyTextColor }}
                            >
                                <EditableText elementId={member.descId} defaultText={member.descDefault} tag="span" />
                            </p>
                            <div className="flex items-center justify-center space-x-3">
                                <a href={member.linkedin} className="transition-colors" style={{ color: sectionColors.bodyTextColor }}><Linkedin className="w-4 h-4" /></a>
                                <a href={member.twitter} className="transition-colors" style={{ color: sectionColors.bodyTextColor }}><Twitter className="w-4 h-4" /></a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StartupTeam;