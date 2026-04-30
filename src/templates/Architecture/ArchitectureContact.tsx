// src/templates/Architecture/ArchitectureContact.tsx
import { CheckCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const ArchitectureContact: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        projectType: '',
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

    const projectTypes = [
        'Residencial',
        'Comercial',
        'Corporativo',
        'Diseño de interiores',
        'Paisajismo',
        'Otro',
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
                            elementId="ar_contact_title_1"
                            defaultText="Hablemos de tu"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="ar_contact_title_2"
                                defaultText="proyecto"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText
                            elementId="ar_contact_description"
                            defaultText="Contanos tu idea y te asesoraremos sin compromiso."
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
                                <EditableText elementId="ar_contact_info_title" defaultText="Información de contacto" tag="span" />
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                    <div>
                                        <p style={{ color: sectionColors.bodyTextColor }}>
                                            <EditableText elementId="ar_contact_phone" defaultText="+54 11 4567-8900" tag="span" />
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                    <div>
                                        <p style={{ color: sectionColors.bodyTextColor }}>
                                            <EditableText elementId="ar_contact_email" defaultText="estudio@kernelizearq.com" tag="span" />
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                    <div>
                                        <p style={{ color: sectionColors.bodyTextColor }}>
                                            <EditableText elementId="ar_contact_address" defaultText="Av. Libertador 1234, CABA" tag="span" />
                                        </p>
                                    </div>
                                </div>
                            </div>
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
                                        <EditableText elementId="ar_success_title" defaultText="¡Mensaje enviado!" tag="span" />
                                    </h3>
                                    <p
                                        className="mb-8"
                                        style={{ color: sectionColors.bodyTextColor }}
                                    >
                                        <EditableText elementId="ar_success_message" defaultText="Te contactaremos a la brevedad para conversar sobre tu proyecto." tag="span" />
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-white font-semibold px-8 py-3 rounded-lg transition-all"
                                        style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                    >
                                        <EditableText elementId="ar_success_button" defaultText="Enviar otro mensaje" tag="span" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3
                                        className="text-2xl font-bold mb-6"
                                        style={{ color: sectionColors.featuresTitleColor }}
                                    >
                                        <EditableText elementId="ar_form_title" defaultText="Contactanos" tag="span" />
                                    </h3>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-1"
                                                    style={{ color: sectionColors.bodyTextColor }}
                                                >
                                                    <EditableText elementId="ar_form_name" defaultText="Nombre completo *" tag="span" />
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
                                                    <EditableText elementId="ar_form_email" defaultText="Email *" tag="span" />
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
                                                <EditableText elementId="ar_form_phone" defaultText="Teléfono" tag="span" />
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
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
                                                <EditableText elementId="ar_form_project_type" defaultText="Tipo de proyecto *" tag="span" />
                                            </label>
                                            <select
                                                name="projectType"
                                                value={formData.projectType}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                                                style={{
                                                    borderColor: `${sectionColors.buttonPrimaryBackground}30`,
                                                    backgroundColor: `${sectionColors.buttonPrimaryBackground}05`,
                                                    color: sectionColors.bodyTextColor
                                                }}
                                            >
                                                <option value="">Seleccioná una opción</option>
                                                {projectTypes.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-1"
                                                style={{ color: sectionColors.bodyTextColor }}
                                            >
                                                <EditableText elementId="ar_form_message" defaultText="Mensaje *" tag="span" />
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={4}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none"
                                                style={{
                                                    borderColor: `${sectionColors.buttonPrimaryBackground}30`,
                                                    backgroundColor: `${sectionColors.buttonPrimaryBackground}05`,
                                                    color: sectionColors.bodyTextColor
                                                }}
                                                placeholder="Contanos sobre tu proyecto..."
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
                                                    <EditableText elementId="ar_form_sending" defaultText="Enviando..." tag="span" />
                                                ) : (
                                                    <>
                                                        <EditableText elementId="ar_form_submit" defaultText="Enviar mensaje" tag="span" />
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

export default ArchitectureContact;