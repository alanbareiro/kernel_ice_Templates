// src/templates/RealEstate/RealEstateAgents.tsx
import { Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import React from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const RealEstateAgents: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

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
        // ... otros agentes
    ];

    return (
        <section
            id="agents"
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
                        <EditableText elementId="re_agents_title_1" defaultText="Nuestros" tag="span" />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="re_agents_title_2" defaultText="agentes" tag="span" />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText elementId="re_agents_description" defaultText="Profesionales listos para ayudarte." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {agents.map((agent) => (
                        <div key={agent.id} className="group text-center">
                            <div
                                className="relative mb-4 mx-auto w-48 h-48 rounded-full overflow-hidden border-4 transition-all group-hover:scale-105 duration-300"
                                style={{ borderColor: sectionColors.buttonPrimaryBackground }}
                            >
                                <EditableImage
                                    elementId={agent.imageId}
                                    defaultImage={agent.defaultImage}
                                    alt={agent.nameDefault}
                                    className="w-full h-full object-cover"
                                    category="realestate"
                                />
                            </div>
                            <h3
                                className="text-xl font-bold mb-1"
                                style={{ color: sectionColors.featuresTitleColor }}
                            >
                                <EditableText elementId={agent.nameId} defaultText={agent.nameDefault} tag="span" />
                            </h3>
                            <p className="text-sm mb-3" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                <EditableText elementId={agent.roleId} defaultText={agent.roleDefault} tag="span" />
                            </p>
                            <div className="space-y-1 text-sm mb-3">
                                <p className="flex items-center justify-center" style={{ color: sectionColors.bodyTextColor }}>
                                    <Phone className="w-3 h-3 mr-1" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                    <EditableText elementId={agent.phoneId} defaultText={agent.phoneDefault} tag="span" />
                                </p>
                                <p className="flex items-center justify-center" style={{ color: sectionColors.bodyTextColor }}>
                                    <Mail className="w-3 h-3 mr-1" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                    <EditableText elementId={agent.emailId} defaultText={agent.emailDefault} tag="span" />
                                </p>
                            </div>
                            <div className="flex items-center justify-center space-x-3">
                                <a href="#" className="transition-colors" style={{ color: sectionColors.bodyTextColor }}><Linkedin className="w-4 h-4" /></a>
                                <a href="#" className="transition-colors" style={{ color: sectionColors.bodyTextColor }}><Instagram className="w-4 h-4" /></a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RealEstateAgents;