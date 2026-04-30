// src/templates/Architecture/ArchitectureTeam.tsx
import { Linkedin, Mail } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const ArchitectureTeam: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const teamImages = {
        team_2: defaultImages.architecture.team2 || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
        team_3: defaultImages.architecture.team4 || 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
        team_4: defaultImages.architecture.team3 || 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    };

    const team = [
        {
            id: 'team_2',
            nameId: 'ar_team_2_name',
            nameDefault: 'Arq. Laura Méndez',
            roleId: 'ar_team_2_role',
            roleDefault: 'Directora de Proyectos',
            descId: 'ar_team_2_desc',
            descDefault: 'Experta en planificación y gestión de proyectos residenciales y comerciales.',
            email: 'lmendez@kernelizearq.com',
            imageId: 'ar_team_2_image',
            defaultImage: teamImages.team_2,
        },
        {
            id: 'team_3',
            nameId: 'ar_team_3_name',
            nameDefault: 'Arq. Carlos Suárez',
            roleId: 'ar_team_3_role',
            roleDefault: 'Diseñador Senior',
            descId: 'ar_team_3_desc',
            descDefault: 'Enfocado en diseño de interiores y espacios comerciales innovadores.',
            email: 'csuarez@kernelizearq.com',
            imageId: 'ar_team_3_image',
            defaultImage: teamImages.team_3,
        },
        {
            id: 'team_4',
            nameId: 'ar_team_4_name',
            nameDefault: 'Arq. Ana López',
            roleId: 'ar_team_4_role',
            roleDefault: 'Paisajista',
            descId: 'ar_team_4_desc',
            descDefault: 'Especialista en integración de espacios verdes y diseño sustentable.',
            email: 'alopez@kernelizearq.com',
            imageId: 'ar_team_4_image',
            defaultImage: teamImages.team_4,
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
                            elementId="ar_team_title_1"
                            defaultText="Nuestro"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="ar_team_title_2"
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
                            elementId="ar_team_description"
                            defaultText="Profesionales apasionados por la arquitectura y el diseño."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                    category="architecture"
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

export default ArchitectureTeam;