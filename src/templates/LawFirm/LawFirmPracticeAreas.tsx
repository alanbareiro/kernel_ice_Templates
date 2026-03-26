import { Briefcase, Building2, FileText, Gavel, Heart, Scale, Shield, Users } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const LawFirmPracticeAreas: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#7f1d1d',
        secondary: '#991b1b',
        accent: '#450a0a',
    };

    const areas = [
        {
            icon: <Building2 className="w-8 h-8" />,
            titleId: 'lf_area_title_1',
            titleDefault: 'Derecho Corporativo',
            descId: 'lf_area_desc_1',
            descDefault: 'Asesoramiento a empresas en contratos, fusiones, adquisiciones y gobierno corporativo.',
        },
        {
            icon: <Briefcase className="w-8 h-8" />,
            titleId: 'lf_area_title_2',
            titleDefault: 'Derecho Laboral',
            descId: 'lf_area_desc_2',
            descDefault: 'Defensa de derechos laborales, negociaciones colectivas y despidos.',
        },
        {
            icon: <Scale className="w-8 h-8" />,
            titleId: 'lf_area_title_3',
            titleDefault: 'Derecho Civil',
            descId: 'lf_area_desc_3',
            descDefault: 'Contratos, sucesiones, daños y perjuicios, responsabilidad civil.',
        },
        {
            icon: <Shield className="w-8 h-8" />,
            titleId: 'lf_area_title_4',
            titleDefault: 'Derecho Penal',
            descId: 'lf_area_desc_4',
            descDefault: 'Defensa penal, querellas, delitos económicos y corporate crime.',
        },
        {
            icon: <Heart className="w-8 h-8" />,
            titleId: 'lf_area_title_5',
            titleDefault: 'Derecho de Familia',
            descId: 'lf_area_desc_5',
            descDefault: 'Divorcios, alimentos, régimen de visitas, adopciones.',
        },
        {
            icon: <Gavel className="w-8 h-8" />,
            titleId: 'lf_area_title_6',
            titleDefault: 'Litigios',
            descId: 'lf_area_desc_6',
            descDefault: 'Representación en juicios, arbitrajes y mediaciones.',
        },
        {
            icon: <FileText className="w-8 h-8" />,
            titleId: 'lf_area_title_7',
            titleDefault: 'Propiedad Intelectual',
            descId: 'lf_area_desc_7',
            descDefault: 'Registro de marcas, patentes, derechos de autor.',
        },
        {
            icon: <Users className="w-8 h-8" />,
            titleId: 'lf_area_title_8',
            titleDefault: 'Inmobiliario',
            descId: 'lf_area_desc_8',
            descDefault: 'Compraventa de propiedades, contratos de alquiler, usucapión.',
        },
    ];

    return (
        <section id="practice-areas" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-900 dark:text-stone-100">
                        <EditableText
                            elementId="lf_areas_title_1"
                            defaultText="Áreas de"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="lf_areas_title_2"
                                defaultText="Práctica"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-stone-600 dark:text-stone-400">
                        <EditableText
                            elementId="lf_areas_description"
                            defaultText="Ofrecemos asesoramiento legal integral en todas las ramas del derecho."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {areas.map((area, index) => (
                        <div key={index} className="group p-6 rounded-xl border transition-all duration-300 hover:shadow-xl"
                            style={{
                                backgroundColor: `${colors.primary}02`,
                                borderColor: `${colors.primary}20`,
                            }}>
                            <div className="w-14 h-14 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                {area.icon}
                            </div>

                            <h3 className="text-lg font-bold mb-2 text-stone-900 dark:text-stone-100 group-hover:text-stone-700 transition-colors">
                                <EditableText
                                    elementId={area.titleId}
                                    defaultText={area.titleDefault}
                                    tag="span"
                                />
                            </h3>

                            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                                <EditableText
                                    elementId={area.descId}
                                    defaultText={area.descDefault}
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

export default LawFirmPracticeAreas;