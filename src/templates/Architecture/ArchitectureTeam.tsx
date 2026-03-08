import { Linkedin, Mail } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const ArchitectureTeam: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#57534e',
        secondary: '#44403c',
        accent: '#292524',
    };

    const teamImages = {
        team_1: defaultImages.architecture.team1 || 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
        team_2: defaultImages.architecture.team2 || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
        team_3: defaultImages.architecture.team4 || 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
        team_4: defaultImages.architecture.team3 || 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    };

    const team = [
        // {
        //     id: 'team_1',
        //     nameId: 'ar_team_1_name',
        //     nameDefault: 'Arq. Martín Rodríguez',
        //     roleId: 'ar_team_1_role',
        //     roleDefault: 'Fundador y Director Creativo',
        //     descId: 'ar_team_1_desc',
        //     descDefault: 'Especialista en diseño arquitectónico y sostenibilidad. 20 años de experiencia.',
        //     email: 'mrodriguez@kernelizearq.com',
        //     imageId: 'ar_team_1_image',
        //     defaultImage: teamImages.team_1,
        // },
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
        <section id="team" className="section-padding bg-stone-50 dark:bg-stone-950">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-900 dark:text-stone-100">
                        <EditableText
                            elementId="ar_team_title_1"
                            defaultText="Nuestro"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="ar_team_title_2"
                                defaultText="Equipo"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-stone-600 dark:text-stone-400">
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
                            <div className="relative mb-4 mx-auto w-48 h-48 rounded-full overflow-hidden border-4 transition-all group-hover:scale-105 duration-300"
                                style={{ borderColor: colors.primary }}>
                                <EditableImage
                                    elementId={member.imageId}
                                    defaultImage={member.defaultImage}
                                    alt={member.nameDefault}
                                    className="w-full h-full object-cover"
                                    category="architecture"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-1">
                                <EditableText
                                    elementId={member.nameId}
                                    defaultText={member.nameDefault}
                                    tag="span"
                                />
                            </h3>
                            <p className="text-sm mb-2" style={{ color: colors.primary }}>
                                <EditableText
                                    elementId={member.roleId}
                                    defaultText={member.roleDefault}
                                    tag="span"
                                />
                            </p>
                            <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
                                <EditableText
                                    elementId={member.descId}
                                    defaultText={member.descDefault}
                                    tag="span"
                                />
                            </p>
                            <div className="flex items-center justify-center space-x-3">
                                <a href={`mailto:${member.email}`} className="text-stone-500 hover:text-stone-700 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </a>
                                <a href="#" className="text-stone-500 hover:text-stone-700 transition-colors">
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