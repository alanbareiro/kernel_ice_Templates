// src/templates/Medical/MedicalContact.tsx
import { CheckCircle, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const MedicalContact: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;
    // const buttons = template?.buttons || defaultButtons;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        specialty: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    const specialties = [
        'Cardiología',
        'Neurología',
        'Pediatría',
        'Traumatología',
        'Medicina General',
        'Otra especialidad',
    ];

    return (
        <section
            id="contact"
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
                        <EditableText
                            elementId="md_contact_title_1"
                            defaultText="Agendá tu"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="md_contact_title_2"
                                defaultText="consulta"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText
                            elementId="md_contact_description"
                            defaultText="Completá el formulario y te contactaremos a la brevedad para coordinar tu turno."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Información de contacto */}
                    <div className="space-y-6">
                        <div
                            className="rounded-2xl p-6"
                            style={{ backgroundColor: sectionColors.featuresCardBackground }}
                        >
                            <h3
                                className="text-xl font-bold mb-4"
                                style={{ color: sectionColors.featuresTitleColor }}
                            >
                                <EditableText elementId="md_contact_info_title" defaultText="Información de contacto" tag="span" />
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                    <div>
                                        <p style={{ color: sectionColors.bodyTextColor }}>
                                            <EditableText elementId="md_contact_phone" defaultText="+54 11 4567-8900" tag="span" />
                                        </p>
                                        <p className="text-sm" style={{ color: sectionColors.bodyTextColor }}>Lun-Vie 8:00 a 20:00</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                    <div>
                                        <p style={{ color: sectionColors.bodyTextColor }}>
                                            <EditableText elementId="md_contact_email" defaultText="contacto@kernelizesalud.com" tag="span" />
                                        </p>
                                        <p className="text-sm" style={{ color: sectionColors.bodyTextColor }}>Respuesta en 24hs</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                    <div>
                                        <p style={{ color: sectionColors.bodyTextColor }}>
                                            <EditableText elementId="md_contact_address" defaultText="Av. Cabildo 1234, CABA" tag="span" />
                                        </p>
                                        <p className="text-sm" style={{ color: sectionColors.bodyTextColor }}>Buenos Aires, Argentina</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="p-6 rounded-2xl text-white"
                            style={{ background: `linear-gradient(135deg, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <Clock className="w-8 h-8 mb-4" />
                            <h4 className="text-lg font-semibold mb-2">
                                <EditableText elementId="md_hours_title" defaultText="Horarios de atención" tag="span" />
                            </h4>
                            <p className="text-sm opacity-90">Lunes a Viernes: 8:00 - 20:00</p>
                            <p className="text-sm opacity-90">Sábados: 9:00 - 14:00</p>
                            <p className="text-xs mt-4 opacity-80">*Emergencias las 24hs al 0800-555-1234</p>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="lg:col-span-2">
                        <div
                            className="rounded-2xl p-8"
                            style={{ backgroundColor: sectionColors.featuresCardBackground }}
                        >
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div
                                        className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                                        style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                    >
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3
                                        className="text-2xl font-bold mb-4"
                                        style={{ color: sectionColors.featuresTitleColor }}
                                    >
                                        <EditableText elementId="md_success_title" defaultText="¡Consulta enviada!" tag="span" />
                                    </h3>
                                    <p
                                        className="mb-8"
                                        style={{ color: sectionColors.bodyTextColor }}
                                    >
                                        <EditableText elementId="md_success_message" defaultText="En las próximas 24 horas te contactaremos para coordinar tu turno." tag="span" />
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-white font-semibold px-8 py-3 rounded-lg transition-all"
                                        style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                    >
                                        <EditableText elementId="md_success_button" defaultText="Nueva consulta" tag="span" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3
                                        className="text-2xl font-bold mb-6"
                                        style={{ color: sectionColors.featuresTitleColor }}
                                    >
                                        <EditableText elementId="md_form_title" defaultText="Solicitá tu turno" tag="span" />
                                    </h3>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-1"
                                                    style={{ color: sectionColors.bodyTextColor }}
                                                >
                                                    <EditableText elementId="md_form_name" defaultText="Nombre completo *" tag="span" />
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                                                    style={{
                                                        borderColor: `${sectionColors.buttonPrimaryBackground}30`,
                                                        backgroundColor: `${sectionColors.buttonPrimaryBackground}05`,
                                                        color: sectionColors.bodyTextColor
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-1"
                                                    style={{ color: sectionColors.bodyTextColor }}
                                                >
                                                    <EditableText elementId="md_form_email" defaultText="Email *" tag="span" />
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                                                    style={{
                                                        borderColor: `${sectionColors.buttonPrimaryBackground}30`,
                                                        backgroundColor: `${sectionColors.buttonPrimaryBackground}05`,
                                                        color: sectionColors.bodyTextColor
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-1"
                                                style={{ color: sectionColors.bodyTextColor }}
                                            >
                                                <EditableText elementId="md_form_phone" defaultText="Teléfono *" tag="span" />
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                                                style={{
                                                    borderColor: `${sectionColors.buttonPrimaryBackground}30`,
                                                    backgroundColor: `${sectionColors.buttonPrimaryBackground}05`,
                                                    color: sectionColors.bodyTextColor
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-1"
                                                style={{ color: sectionColors.bodyTextColor }}
                                            >
                                                <EditableText elementId="md_form_specialty" defaultText="Especialidad *" tag="span" />
                                            </label>
                                            <select
                                                name="specialty"
                                                value={formData.specialty}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                                                style={{
                                                    borderColor: `${sectionColors.buttonPrimaryBackground}30`,
                                                    backgroundColor: `${sectionColors.buttonPrimaryBackground}05`,
                                                    color: sectionColors.bodyTextColor
                                                }}
                                            >
                                                <option value="">Seleccioná una especialidad</option>
                                                {specialties.map(spec => (
                                                    <option key={spec} value={spec}>{spec}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-1"
                                                style={{ color: sectionColors.bodyTextColor }}
                                            >
                                                <EditableText elementId="md_form_message" defaultText="Mensaje" tag="span" />
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={4}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none"
                                                style={{
                                                    borderColor: `${sectionColors.buttonPrimaryBackground}30`,
                                                    backgroundColor: `${sectionColors.buttonPrimaryBackground}05`,
                                                    color: sectionColors.bodyTextColor
                                                }}
                                                placeholder="Contanos tu consulta o síntoma..."
                                            />
                                        </div>
                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center"
                                                style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                            >
                                                {isSubmitting ? (
                                                    <EditableText elementId="md_form_sending" defaultText="Enviando..." tag="span" />
                                                ) : (
                                                    <>
                                                        <EditableText elementId="md_form_submit" defaultText="Solicitar turno" tag="span" />
                                                        <Send className="ml-2 w-4 h-4" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MedicalContact;