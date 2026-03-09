import { Shield, Users, Zap } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';

const StartupSolution: React.FC = () => {
    // const { template } = useTemplate();
    // const colors = template?.colors || {
    //     primary: '#059669',
    //     secondary: '#047857',
    //     accent: '#065f46',
    // };

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
        <section id="solution" className="section-padding bg-gradient-to-br from-emerald-900 to-emerald-800 text-white">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                <EditableText elementId="st_sol_title_1" defaultText="Nuestra" tag="span" />{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-100">
                                    <EditableText elementId="st_sol_title_2" defaultText="solución" tag="span" />
                                </span>
                            </h2>

                            <p className="text-xl text-emerald-100 mb-6">
                                <EditableText
                                    elementId="st_sol_description"
                                    defaultText="Desarrollamos una plataforma que automatiza procesos, brinda información valiosa y reduce costos operativos."
                                    tag="span"
                                />
                            </p>

                            <ul className="space-y-4">
                                {benefits.map((ben) => (
                                    <li key={ben.id} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                                            {ben.icon}
                                        </div>
                                        <span className="text-lg text-emerald-100">
                                            <EditableText elementId={ben.textId} defaultText={ben.textDefault} tag="span" />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Imagen */}
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