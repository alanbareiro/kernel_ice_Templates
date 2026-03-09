import { Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const RealEstateAgents: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#2d6a4f',
        secondary: '#1e4b3a',
        accent: '#0d2f24',
    };

    const agentImages = {
        agent1: defaultImages.realestate.agent1,
        agent2: defaultImages.realestate.agent2,
        agent3: defaultImages.realestate.agent3,
        agent4: defaultImages.realestate.agent4,
    };

    const agents = [
        {
            id: 'agent_1',
            nameId: 're_agent_1_name', nameDefault: 'Alejandro Martínez',
            roleId: 're_agent_1_role', roleDefault: 'Director',
            phoneId: 're_agent_1_phone', phoneDefault: '+54 11 5678-9012',
            emailId: 're_agent_1_email', emailDefault: 'amartinez@kernelize.com',
            imageId: 're_agent_1_image',
            defaultImage: agentImages.agent1,
        },
        {
            id: 'agent_2',
            nameId: 're_agent_2_name', nameDefault: 'Carolina Pérez',
            roleId: 're_agent_2_role', roleDefault: 'Agente Senior',
            phoneId: 're_agent_2_phone', phoneDefault: '+54 11 5678-9013',
            emailId: 're_agent_2_email', emailDefault: 'cperez@kernelize.com',
            imageId: 're_agent_2_image',
            defaultImage: agentImages.agent2,
        },
        {
            id: 'agent_3',
            nameId: 're_agent_3_name', nameDefault: 'Martín Rodríguez',
            roleId: 're_agent_3_role', roleDefault: 'Agente Comercial',
            phoneId: 're_agent_3_phone', phoneDefault: '+54 11 5678-9014',
            emailId: 're_agent_3_email', emailDefault: 'mrodriguez@kernelize.com',
            imageId: 're_agent_3_image',
            defaultImage: agentImages.agent3,
        },
        {
            id: 'agent_4',
            nameId: 're_agent_4_name', nameDefault: 'Laura Sánchez',
            roleId: 're_agent_4_role', roleDefault: 'Agente de Lujo',
            phoneId: 're_agent_4_phone', phoneDefault: '+54 11 5678-9015',
            emailId: 're_agent_4_email', emailDefault: 'lsanchez@kernelize.com',
            imageId: 're_agent_4_image',
            defaultImage: agentImages.agent4,
        },
    ];

    return (
        <section id="agents" className="section-padding bg-emerald-50 dark:bg-emerald-950">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-900 dark:text-emerald-100">
                        <EditableText elementId="re_agents_title_1" defaultText="Nuestros" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="re_agents_title_2" defaultText="agentes" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-emerald-700 dark:text-emerald-300">
                        <EditableText elementId="re_agents_description" defaultText="Profesionales listos para ayudarte." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {agents.map((agent) => (
                        <div key={agent.id} className="group text-center">
                            <div className="relative mb-4 mx-auto w-48 h-48 rounded-full overflow-hidden border-4 transition-all group-hover:scale-105 duration-300"
                                style={{ borderColor: colors.primary }}>
                                <EditableImage
                                    elementId={agent.imageId}
                                    defaultImage={agent.defaultImage}
                                    alt={agent.nameDefault}
                                    className="w-full h-full object-cover"
                                    category="realestate"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 mb-1">
                                <EditableText elementId={agent.nameId} defaultText={agent.nameDefault} tag="span" />
                            </h3>
                            <p className="text-sm mb-3" style={{ color: colors.primary }}>
                                <EditableText elementId={agent.roleId} defaultText={agent.roleDefault} tag="span" />
                            </p>
                            <div className="space-y-1 text-sm text-emerald-600 dark:text-emerald-400 mb-3">
                                <p className="flex items-center justify-center"><Phone className="w-3 h-3 mr-1" /> <EditableText elementId={agent.phoneId} defaultText={agent.phoneDefault} tag="span" /></p>
                                <p className="flex items-center justify-center"><Mail className="w-3 h-3 mr-1" /> <EditableText elementId={agent.emailId} defaultText={agent.emailDefault} tag="span" /></p>
                            </div>
                            <div className="flex items-center justify-center space-x-3">
                                <a href="#" className="text-emerald-500 hover:text-emerald-700"><Linkedin className="w-4 h-4" /></a>
                                <a href="#" className="text-emerald-500 hover:text-emerald-700"><Instagram className="w-4 h-4" /></a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RealEstateAgents;