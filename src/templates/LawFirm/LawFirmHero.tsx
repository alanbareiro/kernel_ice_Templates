import { ArrowRight, Gavel, Scale, Shield } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const LawFirmHero: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#7f1d1d',
        secondary: '#991b1b',
        accent: '#450a0a',
    };

    return (
        <section className="relative section-padding overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.secondary} 100%)` }}>
            {/* Elementos decorativos */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
                    style={{ backgroundColor: colors.primary }} />
                <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"
                    style={{ backgroundColor: colors.primary }} />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido izquierdo */}
                    <div className="space-y-8 text-white">
                        <div>
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-white/20 bg-white/10 backdrop-blur-sm mb-4">
                                <Scale className="w-4 h-4 mr-2" />
                                <EditableText
                                    elementId="lf_hero_badge"
                                    defaultText="Excelencia Legal desde 1995"
                                    tag="span"
                                />
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                <EditableText
                                    elementId="lf_hero_title_1"
                                    defaultText="Protegiendo tus"
                                    tag="span"
                                />{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400"
                                    style={{ backgroundImage: `linear-gradient(to right, #fef3c7, ${colors.primary})` }}>
                                    <EditableText
                                        elementId="lf_hero_title_2"
                                        defaultText="derechos"
                                        tag="span"
                                    />
                                </span>{' '}
                                <EditableText
                                    elementId="lf_hero_title_3"
                                    defaultText="con integridad"
                                    tag="span"
                                />
                            </h1>

                            <p className="text-xl text-white/80 max-w-2xl">
                                <EditableText
                                    elementId="lf_hero_description"
                                    defaultText="Más de 25 años de experiencia en derecho corporativo, civil y penal. Defendemos tus intereses con ética y profesionalismo."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center text-white"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                <EditableText
                                    elementId="lf_cta_primary"
                                    defaultText="Consulta Gratuita"
                                    tag="span"
                                />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="group bg-transparent border-2 border-white/50 hover:border-white text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center">
                                <EditableText
                                    elementId="lf_cta_secondary"
                                    defaultText="Nuestras Áreas"
                                    tag="span"
                                />
                            </button>
                        </div>

                        {/* Estadísticas */}
                        <div className="pt-8 grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">
                                    <EditableText elementId="lf_stat_1_value" defaultText="25+" tag="span" />
                                </div>
                                <div className="text-sm text-white/70">
                                    <EditableText elementId="lf_stat_1_label" defaultText="Años de experiencia" tag="span" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">
                                    <EditableText elementId="lf_stat_2_value" defaultText="500+" tag="span" />
                                </div>
                                <div className="text-sm text-white/70">
                                    <EditableText elementId="lf_stat_2_label" defaultText="Casos exitosos" tag="span" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">
                                    <EditableText elementId="lf_stat_3_value" defaultText="15" tag="span" />
                                </div>
                                <div className="text-sm text-white/70">
                                    <EditableText elementId="lf_stat_3_label" defaultText="Abogados expertos" tag="span" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Imagen derecha */}
                    <div className="relative">
                        <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-2xl">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 border-b border-white/20 pb-6">
                                    <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                                        <Gavel className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-white">
                                            <EditableText elementId="lf_hero_card_1_title" defaultText="Derecho Corporativo" tag="span" />
                                        </h3>
                                        <p className="text-sm text-white/70">
                                            <EditableText elementId="lf_hero_card_1_desc" defaultText="Fusiones, contratos, compliance" tag="span" />
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 border-b border-white/20 pb-6">
                                    <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                                        <Shield className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-white">
                                            <EditableText elementId="lf_hero_card_2_title" defaultText="Derecho Penal" tag="span" />
                                        </h3>
                                        <p className="text-sm text-white/70">
                                            <EditableText elementId="lf_hero_card_2_desc" defaultText="Defensa penal, querellas" tag="span" />
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                                        <Scale className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-white">
                                            <EditableText elementId="lf_hero_card_3_title" defaultText="Derecho Civil" tag="span" />
                                        </h3>
                                        <p className="text-sm text-white/70">
                                            <EditableText elementId="lf_hero_card_3_desc" defaultText="Sucesiones, contratos, familia" tag="span" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LawFirmHero;