import { Building2, FileText, Gavel, Scale, Shield, Users } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const LawFirmFeatures: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#7f1d1d',
        secondary: '#991b1b',
        accent: '#450a0a',
    };

    const features = [
        {
            icon: <Scale className="w-8 h-8" />,
            titleId: 'lf_feature_title_1',
            titleDefault: 'Excelencia Legal',
            descId: 'lf_feature_desc_1',
            descDefault: 'Contamos con los mejores abogados especializados en cada área del derecho.',
        },
        {
            icon: <Shield className="w-8 h-8" />,
            titleId: 'lf_feature_title_2',
            titleDefault: 'Confidencialidad',
            descId: 'lf_feature_desc_2',
            descDefault: 'Garantizamos la absoluta privacidad de tu caso y la información compartida.',
        },
        {
            icon: <Gavel className="w-8 h-8" />,
            titleId: 'lf_feature_title_3',
            titleDefault: 'Experiencia',
            descId: 'lf_feature_desc_3',
            descDefault: 'Más de 25 años defendiendo los derechos de nuestros clientes con éxito.',
        },
        {
            icon: <FileText className="w-8 h-8" />,
            titleId: 'lf_feature_title_4',
            titleDefault: 'Asesoría Personalizada',
            descId: 'lf_feature_desc_4',
            descDefault: 'Te acompañamos en cada paso, explicando el proceso legal en términos claros.',
        },
        {
            icon: <Users className="w-8 h-8" />,
            titleId: 'lf_feature_title_5',
            titleDefault: 'Equipo Multidisciplinario',
            descId: 'lf_feature_desc_5',
            descDefault: 'Abogados especializados en diferentes ramas para una cobertura integral.',
        },
        {
            icon: <Building2 className="w-8 h-8" />,
            titleId: 'lf_feature_title_6',
            titleDefault: 'Presencia Nacional',
            descId: 'lf_feature_desc_6',
            descDefault: 'Oficinas en las principales ciudades para estar cerca de nuestros clientes.',
        },
    ];

    return (
        <section className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-900 dark:text-stone-100">
                        <EditableText
                            elementId="lf_features_title_1"
                            defaultText="¿Por qué"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="lf_features_title_2"
                                defaultText="elegirnos?"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-stone-600 dark:text-stone-400">
                        <EditableText
                            elementId="lf_features_description"
                            defaultText="Nuestra trayectoria y compromiso nos avalan. Te ofrecemos la mejor defensa legal con ética y profesionalismo."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-8 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                {feature.icon}
                            </div>

                            <h3 className="text-2xl font-bold mb-3 text-stone-900 dark:text-stone-100 group-hover:text-stone-700 transition-colors">
                                <EditableText
                                    elementId={feature.titleId}
                                    defaultText={feature.titleDefault}
                                    tag="span"
                                />
                            </h3>

                            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                                <EditableText
                                    elementId={feature.descId}
                                    defaultText={feature.descDefault}
                                    tag="span"
                                />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LawFirmFeatures;