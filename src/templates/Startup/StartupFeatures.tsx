import { Check } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const StartupFeatures: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#059669',
        secondary: '#047857',
        accent: '#065f46',
    };

    const features = [
        {
            id: 'feat_1',
            titleId: 'st_feat_1_title', titleDefault: 'Dashboard intuitivo',
            descId: 'st_feat_1_desc', descDefault: 'Panel de control fácil de usar con toda la información que necesitás.',
        },
        {
            id: 'feat_2',
            titleId: 'st_feat_2_title', titleDefault: 'Reportes automáticos',
            descId: 'st_feat_2_desc', descDefault: 'Generá reportes personalizados con un solo clic.',
        },
        {
            id: 'feat_3',
            titleId: 'st_feat_3_title', titleDefault: 'Integración API',
            descId: 'st_feat_3_desc', descDefault: 'Conectá con tus herramientas favoritas mediante API.',
        },
        {
            id: 'feat_4',
            titleId: 'st_feat_4_title', titleDefault: 'Soporte 24/7',
            descId: 'st_feat_4_desc', descDefault: 'Nuestro equipo está disponible para ayudarte cuando lo necesites.',
        },
        {
            id: 'feat_5',
            titleId: 'st_feat_5_title', titleDefault: 'Escalabilidad',
            descId: 'st_feat_5_desc', descDefault: 'Crece sin límites. Nuestra plataforma se adapta a tu negocio.',
        },
        {
            id: 'feat_6',
            titleId: 'st_feat_6_title', titleDefault: 'Seguridad avanzada',
            descId: 'st_feat_6_desc', descDefault: 'Tus datos protegidos con los más altos estándares.',
        },
    ];

    return (
        <section className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-900 dark:text-emerald-100">
                        <EditableText elementId="st_features_title_1" defaultText="Características" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="st_features_title_2" defaultText="principales" tag="span" />
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <div key={feature.id} className="flex gap-4 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-emerald-900 dark:text-emerald-100">
                                    <EditableText elementId={feature.titleId} defaultText={feature.titleDefault} tag="span" />
                                </h3>
                                <p className="text-emerald-700 dark:text-emerald-300">
                                    <EditableText elementId={feature.descId} defaultText={feature.descDefault} tag="span" />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StartupFeatures;