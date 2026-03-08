import { Linkedin, Mail, Phone } from 'lucide-react';
import React from 'react';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';

const MedicalDoctors: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#0d9488',
        secondary: '#0f766e',
        accent: '#115e59',
    };

    const doctors = [
        {
            id: 'doctor_1',
            nameId: 'md_doctor_1_name',
            nameDefault: 'Dra. Ana María Rodríguez',
            specialtyId: 'md_doctor_1_specialty',
            specialtyDefault: 'Cardiología',
            descId: 'md_doctor_1_desc',
            descDefault: 'Especialista en cardiología clínica e intervencionista. 20 años de experiencia.',
            email: 'arodriguez@kernelizesalud.com',
            phone: '+54 11 4567-8901',
            imageId: 'md_doctor_1_image',
        },
        {
            id: 'doctor_2',
            nameId: 'md_doctor_2_name',
            nameDefault: 'Dr. Carlos Martínez',
            specialtyId: 'md_doctor_2_specialty',
            specialtyDefault: 'Neurología',
            descId: 'md_doctor_2_desc',
            descDefault: 'Neurólogo clínico especializado en enfermedades neurodegenerativas.',
            email: 'cmartinez@kernelizesalud.com',
            phone: '+54 11 4567-8902',
            imageId: 'md_doctor_2_image',
        },
        {
            id: 'doctor_3',
            nameId: 'md_doctor_3_name',
            nameDefault: 'Dra. Laura Fernández',
            specialtyId: 'md_doctor_3_specialty',
            specialtyDefault: 'Pediatría',
            descId: 'md_doctor_3_desc',
            descDefault: 'Pediatra con enfoque en desarrollo infantil y enfermedades respiratorias.',
            email: 'lfernandez@kernelizesalud.com',
            phone: '+54 11 4567-8903',
            imageId: 'md_doctor_3_image',
        },
        {
            id: 'doctor_4',
            nameId: 'md_doctor_4_name',
            nameDefault: 'Dr. Roberto Sánchez',
            specialtyId: 'md_doctor_4_specialty',
            specialtyDefault: 'Traumatología',
            descId: 'md_doctor_4_desc',
            descDefault: 'Especialista en cirugía de rodilla y hombro, medicina deportiva.',
            email: 'rsanchez@kernelizesalud.com',
            phone: '+54 11 4567-8904',
            imageId: 'md_doctor_4_image',
        },
    ];

    return (
        <section id="doctors" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-teal-900 dark:text-teal-100">
                        <EditableText
                            elementId="md_doctors_title_1"
                            defaultText="Nuestro"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="md_doctors_title_2"
                                defaultText="Equipo Médico"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-teal-600 dark:text-teal-400">
                        <EditableText
                            elementId="md_doctors_description"
                            defaultText="Profesionales de la salud altamente capacitados para brindarte la mejor atención."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {doctors.map((doctor) => (
                        <div key={doctor.id} className="group text-center">
                            <div className="relative mb-4 mx-auto w-48 h-48 rounded-full overflow-hidden border-4 transition-all group-hover:scale-105 duration-300"
                                style={{ borderColor: colors.primary }}>
                                <EditableImage
                                    elementId={doctor.imageId}
                                    defaultImage=""
                                    alt={doctor.nameDefault}
                                    className="w-full h-full object-cover"
                                    category="medical"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-teal-900 dark:text-teal-100 mb-1">
                                <EditableText
                                    elementId={doctor.nameId}
                                    defaultText={doctor.nameDefault}
                                    tag="span"
                                />
                            </h3>
                            <p className="text-sm mb-2" style={{ color: colors.primary }}>
                                <EditableText
                                    elementId={doctor.specialtyId}
                                    defaultText={doctor.specialtyDefault}
                                    tag="span"
                                />
                            </p>
                            <p className="text-sm text-teal-600 dark:text-teal-400 mb-3">
                                <EditableText
                                    elementId={doctor.descId}
                                    defaultText={doctor.descDefault}
                                    tag="span"
                                />
                            </p>
                            <div className="flex items-center justify-center space-x-3 text-teal-500">
                                <a href={`mailto:${doctor.email}`} className="hover:text-teal-700 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </a>
                                <a href={`tel:${doctor.phone}`} className="hover:text-teal-700 transition-colors">
                                    <Phone className="w-4 h-4" />
                                </a>
                                <a href="#" className="hover:text-teal-700 transition-colors">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MedicalDoctors;