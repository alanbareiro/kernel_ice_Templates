// src/templates/Startup/StartupSolution.tsx
import { Shield, Users, Zap } from 'lucide-react';
import React from 'react';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const StartupSolution: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const benefits = [
        {
            id: 'ben_1',
            icon: <Zap className="w-5 h-5" />,
            textId: 'st_ben_1', textDefault: 'Automatización inteligente',
        },
        {
            id: 'ben_2',
            icon: <Shield className="w-5 h-5" />,
            textId: 'st_ben_2', textDefault: 'Datos en tiempo real',
        },
        {
            id: 'ben_3',
            icon: <Users className="w-5 h-5" />,
            textId: 'st_ben_3', textDefault: 'Accesible para todos',
        },
    ];

    return (
        <section
            id="solution"
            className="section-padding text-white"
            style={{ background: `linear-gradient(135deg, ${sectionColors.buttonPrimaryBackground}cc, ${sectionColors.buttonPrimaryBackground})` }}
        >
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2
                                className="font-bold mb-6"
                                style={{
                                    fontSize: typography.sectionTitleSize
                                }}
                            >
                                <EditableText elementId="st_sol_title_1" defaultText="Nuestra" tag="span" />{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-100">
                                    <EditableText elementId="st_sol_title_2" defaultText="solución" tag="span" />
                                </span>
                            </h2>

                            <p className="text-xl mb-6" style={{ color: `${sectionColors.buttonPrimaryText}cc` }}>
                                <EditableText
                                    elementId="st_sol_description"
                                    defaultText="Desarrollamos una plataforma que automatiza procesos, brinda información valiosa y reduce costos operativos."
                                    tag="span"
                                />
                            </p>

                            <ul className="space-y-4">
                                {benefits.map((ben) => (
                                    <li key={ben.id} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                            {ben.icon}
                                        </div>
                                        <span className="text-lg">
                                            <EditableText elementId={ben.textId} defaultText={ben.textDefault} tag="span" />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <EditableImage
                                elementId="st_solution_image"
                                defaultImage=""
                                alt="Nuestra solución"
                                className="w-full h-auto object-cover"
                                category="startup"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StartupSolution;