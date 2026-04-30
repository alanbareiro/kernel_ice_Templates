// src/templates/BeautySalon/SalonTeam.tsx
import { Instagram } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const SalonTeam: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const teamImages = {
        team1: defaultImages.beauty.team1,
        team2: defaultImages.beauty.team2,
        team3: defaultImages.beauty.team3,
        team4: defaultImages.beauty.team4,
    };

    const team = [
        {
            id: 'team_1',
            nameId: 'sl_team_1_name', nameDefault: 'María Laura',
            roleId: 'sl_team_1_role', roleDefault: 'Directora y Estilista',
            descId: 'sl_team_1_desc', descDefault: 'Especialista en cortes y coloración. 15 años de experiencia.',
            instagram: '@marialaura.beauty',
            imageId: 'sl_team_1_image',
            defaultImage: teamImages.team1,
        },
        {
            id: 'team_2',
            nameId: 'sl_team_2_name', nameDefault: 'Carolina Méndez',
            roleId: 'sl_team_2_role', roleDefault: 'Maquilladora Profesional',
            descId: 'sl_team_2_desc', descDefault: 'Especialista en maquillaje social y de novias.',
            instagram: '@caro.makeup',
            imageId: 'sl_team_2_image',
            defaultImage: teamImages.team2,
        },
        {
            id: 'team_3',
            nameId: 'sl_team_3_name', nameDefault: 'Valentina Rossi',
            roleId: 'sl_team_3_role', roleDefault: 'Manicurista',
            descId: 'sl_team_3_desc', descDefault: 'Arte en uñas, semipermanente y tratamientos.',
            instagram: '@vale.nails',
            imageId: 'sl_team_3_image',
            defaultImage: teamImages.team3,
        },
        {
            id: 'team_4',
            nameId: 'sl_team_4_name', nameDefault: 'Sofía Rodríguez',
            roleId: 'sl_team_4_role', roleDefault: 'Esteticista',
            descId: 'sl_team_4_desc', descDefault: 'Tratamientos faciales y corporales.',
            instagram: '@sofi.skin',
            imageId: 'sl_team_4_image',
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
                        <EditableText elementId="sl_team_title_1" defaultText="Nuestras" tag="span" />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="sl_team_title_2" defaultText="profesionales" tag="span" />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText elementId="sl_team_description" defaultText="Un equipo apasionado por la belleza y el bienestar." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member) => (
                        <div key={member.id} className="group text-center">
                            <div
                                className="relative mb-4 mx-auto w-48 h-48 rounded-full overflow-hidden border-4 transition-all group-hover:scale-105 duration-300"
                                style={{ borderColor: sectionColors.buttonPrimaryBackground }}
                            >
                                <EditableImage elementId={member.imageId} defaultImage={member.defaultImage} alt={member.nameDefault} className="w-full h-full object-cover" category="beauty" />
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
                            <a href="#" className="inline-flex items-center" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                <Instagram className="w-4 h-4 mr-1" /> {member.instagram}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SalonTeam;