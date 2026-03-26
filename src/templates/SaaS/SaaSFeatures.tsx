import { BarChart, Clock, Cloud, Lock, Shield, Smartphone, Users, Zap } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const SaaSFeatures: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#7c3aed',
        secondary: '#6d28d9',
        accent: '#5b21b6',
    };

    const features = [
        {
            icon: <Zap className="w-8 h-8" />,
            titleId: 'sa_feature_1_title', titleDefault: 'Alta velocidad',
            descId: 'sa_feature_1_desc', descDefault: 'Procesamiento en tiempo real con tecnología de punta.',
        },
        {
            icon: <Shield className="w-8 h-8" />,
            titleId: 'sa_feature_2_title', titleDefault: 'Seguridad garantizada',
            descId: 'sa_feature_2_desc', descDefault: 'Encriptación de extremo a extremo y backups diarios.',
        },
        {
            icon: <Users className="w-8 h-8" />,
            titleId: 'sa_feature_3_title', titleDefault: 'Multi-usuario',
            descId: 'sa_feature_3_desc', descDefault: 'Gestión de roles y permisos para todo tu equipo.',
        },
        {
            icon: <BarChart className="w-8 h-8" />,
            titleId: 'sa_feature_4_title', titleDefault: 'Reportes avanzados',
            descId: 'sa_feature_4_desc', descDefault: 'Estadísticas y gráficos para tomar mejores decisiones.',
        },
        {
            icon: <Clock className="w-8 h-8" />,
            titleId: 'sa_feature_5_title', titleDefault: 'Automatización',
            descId: 'sa_feature_5_desc', descDefault: 'Automatizá tareas repetitivas y ahorrá tiempo.',
        },
        {
            icon: <Cloud className="w-8 h-8" />,
            titleId: 'sa_feature_6_title', titleDefault: 'Cloud 100%',
            descId: 'sa_feature_6_desc', descDefault: 'Accedé desde cualquier lugar, en cualquier dispositivo.',
        },
        {
            icon: <Lock className="w-8 h-8" />,
            titleId: 'sa_feature_7_title', titleDefault: 'Cumplimiento GDPR',
            descId: 'sa_feature_7_desc', descDefault: 'Cumplimos con las normativas internacionales.',
        },
        {
            icon: <Smartphone className="w-8 h-8" />,
            titleId: 'sa_feature_8_title', titleDefault: 'App móvil',
            descId: 'sa_feature_8_desc', descDefault: 'Gestioná tu negocio desde tu celular.',
        },
    ];

    return (
        <section id="features" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-violet-900 dark:text-violet-100">
                        <EditableText elementId="sa_features_title_1" defaultText="Características" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="sa_features_title_2" defaultText="principales" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-violet-700 dark:text-violet-300">
                        <EditableText elementId="sa_features_description" defaultText="Todo lo que necesitás para llevar tu negocio al siguiente nivel." tag="span" />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-6 rounded-xl border border-violet-200 dark:border-violet-800 hover:shadow-xl transition-all">
                            <div className="w-14 h-14 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-violet-900 dark:text-violet-100">
                                <EditableText elementId={feature.titleId} defaultText={feature.titleDefault} tag="span" />
                            </h3>
                            <p className="text-sm text-violet-700 dark:text-violet-300">
                                <EditableText elementId={feature.descId} defaultText={feature.descDefault} tag="span" />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SaaSFeatures;