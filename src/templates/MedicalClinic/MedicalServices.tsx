import { Activity, Bone, Brain, Eye, Heart, Microscope, Pill, Stethoscope } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const MedicalServices: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#0d9488',
        secondary: '#0f766e',
        accent: '#115e59',
    };

    const services = [
        {
            icon: <Heart className="w-8 h-8" />,
            titleId: 'md_service_title_1',
            titleDefault: 'Cardiología',
            descId: 'md_service_desc_1',
            descDefault: 'Diagnóstico y tratamiento de enfermedades del corazón con tecnología de última generación.',
        },
        {
            icon: <Brain className="w-8 h-8" />,
            titleId: 'md_service_title_2',
            titleDefault: 'Neurología',
            descId: 'md_service_desc_2',
            descDefault: 'Atención especializada para trastornos del sistema nervioso central y periférico.',
        },
        {
            icon: <Activity className="w-8 h-8" />,
            titleId: 'md_service_title_3',
            titleDefault: 'Medicina General',
            descId: 'md_service_desc_3',
            descDefault: 'Consultas de rutina, chequeos preventivos y seguimiento de enfermedades crónicas.',
        },
        {
            icon: <Stethoscope className="w-8 h-8" />,
            titleId: 'md_service_title_4',
            titleDefault: 'Pediatría',
            descId: 'md_service_desc_4',
            descDefault: 'Atención integral para la salud de niños y adolescentes, desde el nacimiento hasta la juventud.',
        },
        {
            icon: <Microscope className="w-8 h-8" />,
            titleId: 'md_service_title_5',
            titleDefault: 'Análisis Clínicos',
            descId: 'md_service_desc_5',
            descDefault: 'Laboratorio propio con resultados rápidos y precisos para todo tipo de estudios.',
        },
        {
            icon: <Pill className="w-8 h-8" />,
            titleId: 'md_service_title_6',
            titleDefault: 'Farmacia',
            descId: 'md_service_desc_6',
            descDefault: 'Farmacia interna con los medicamentos que necesitas, disponible 24/7.',
        },
        {
            icon: <Bone className="w-8 h-8" />,
            titleId: 'md_service_title_7',
            titleDefault: 'Traumatología',
            descId: 'md_service_desc_7',
            descDefault: 'Especialistas en lesiones óseas, articulares y musculares, con y sin cirugía.',
        },
        {
            icon: <Eye className="w-8 h-8" />,
            titleId: 'md_service_title_8',
            titleDefault: 'Oftalmología',
            descId: 'md_service_desc_8',
            descDefault: 'Exámenes de la vista, diagnóstico y tratamiento de enfermedades oculares.',
        },
    ];

    return (
        <section id="services" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-teal-900 dark:text-teal-100">
                        <EditableText
                            elementId="md_services_title_1"
                            defaultText="Nuestros"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="md_services_title_2"
                                defaultText="Servicios Médicos"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-teal-600 dark:text-teal-400">
                        <EditableText
                            elementId="md_services_description"
                            defaultText="Ofrecemos una amplia gama de especialidades para cuidar tu salud y la de tu familia."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div key={index} className="group p-6 rounded-xl border transition-all duration-300 hover:shadow-xl"
                            style={{
                                backgroundColor: `${colors.primary}02`,
                                borderColor: `${colors.primary}20`,
                            }}>
                            <div className="w-14 h-14 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                {service.icon}
                            </div>

                            <h3 className="text-lg font-bold mb-2 text-teal-900 dark:text-teal-100 group-hover:text-teal-700 transition-colors">
                                <EditableText
                                    elementId={service.titleId}
                                    defaultText={service.titleDefault}
                                    tag="span"
                                />
                            </h3>

                            <p className="text-sm text-teal-600 dark:text-teal-400 leading-relaxed">
                                <EditableText
                                    elementId={service.descId}
                                    defaultText={service.descDefault}
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

export default MedicalServices;