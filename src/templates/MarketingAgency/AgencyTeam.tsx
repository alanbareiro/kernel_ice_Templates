import { Linkedin, Mail } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const AgencyTeam: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#c026d3',
        secondary: '#a21caf',
        accent: '#86198f',
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
        },
    ];

    return (
        <section id="team" className="section-padding bg-purple-50 dark:bg-purple-950">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900 dark:text-purple-100">
                        <EditableText
                            elementId="ag_team_title_1"
                            defaultText="Nuestro"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="ag_team_title_2"
                                defaultText="Equipo"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-purple-700 dark:text-purple-300">
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
                            <div className="relative mb-4 mx-auto w-48 h-48 rounded-full overflow-hidden border-4 transition-all group-hover:scale-105 duration-300"
                                style={{ borderColor: colors.primary }}>
                                <EditableImage
                                    elementId={member.imageId}
                                    defaultImage=""
                                    alt={member.nameDefault}
                                    className="w-full h-full object-cover"
                                    category="marketing"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-1">
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
                            <p className="text-sm text-purple-600 dark:text-purple-400 mb-3">
                                <EditableText
                                    elementId={member.descId}
                                    defaultText={member.descDefault}
                                    tag="span"
                                />
                            </p>
                            <div className="flex items-center justify-center space-x-3">
                                <a href={`mailto:${member.email}`} className="text-purple-500 hover:text-purple-700 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </a>
                                <a href="#" className="text-purple-500 hover:text-purple-700 transition-colors">
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