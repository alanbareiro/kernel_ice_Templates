import { Linkedin, Mail, Phone } from 'lucide-react';
import React from 'react';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const LawFirmAttorneys: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#7f1d1d',
        secondary: '#991b1b',
        accent: '#450a0a',
    };

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
        <section id="attorneys" className="section-padding bg-stone-50 dark:bg-stone-950">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-900 dark:text-stone-100">
                        <EditableText
                            elementId="lf_attorneys_title_1"
                            defaultText="Nuestro"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="lf_attorneys_title_2"
                                defaultText="Equipo Legal"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-stone-600 dark:text-stone-400">
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
                            <div className="relative mb-4 mx-auto w-48 h-48 rounded-full overflow-hidden border-4 transition-all group-hover:scale-105 duration-300"
                                style={{ borderColor: colors.primary }}>
                                <EditableImage
                                    elementId={attorney.imageId}
                                    defaultImage=""
                                    alt={attorney.nameDefault}
                                    className="w-full h-full object-cover"
                                    category="lawFirm"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-1">
                                <EditableText
                                    elementId={attorney.nameId}
                                    defaultText={attorney.nameDefault}
                                    tag="span"
                                />
                            </h3>
                            <p className="text-sm mb-3" style={{ color: colors.primary }}>
                                <EditableText
                                    elementId={attorney.roleId}
                                    defaultText={attorney.roleDefault}
                                    tag="span"
                                />
                            </p>
                            <div className="flex items-center justify-center space-x-3 text-stone-500">
                                <a href={`mailto:${attorney.email}`} className="hover:text-stone-900 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </a>
                                <a href={`tel:${attorney.phone}`} className="hover:text-stone-900 transition-colors">
                                    <Phone className="w-4 h-4" />
                                </a>
                                <a href="#" className="hover:text-stone-900 transition-colors">
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