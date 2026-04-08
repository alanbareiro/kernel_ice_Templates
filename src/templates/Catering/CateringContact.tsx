// src/templates/Catering/CateringContact.tsx
import { Calendar, Mail, MapPin, MessageSquare, Phone, Send, Users } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const CateringContact = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;
    // const buttons = template?.buttons || defaultButtons;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        guests: '',
        date: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                eventType: '',
                guests: '',
                date: '',
                message: '',
            });

            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    const eventTypes = [
        'Boda',
        'Cumpleaños',
        'Evento corporativo',
        'Aniversario',
        'Comunión/Bautizo',
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
                            elementId="c_contact_title_1"
                            defaultText="Hagamos de tu evento algo"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="c_contact_title_2"
                                defaultText="inolvidable"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: sectionColors.bodyTextColor }}
                    >
                        <EditableText
                            elementId="c_contact_description"
                            defaultText="Cuéntanos sobre tu evento y te enviaremos una propuesta personalizada en menos de 24 horas."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Información de contacto */}
                    <div className="space-y-8">
                        <div
                            className="rounded-2xl p-8 shadow-xl"
                            style={{ backgroundColor: sectionColors.featuresCardBackground }}
                        >
                            <h3
                                className="text-2xl font-bold mb-6"
                                style={{ color: sectionColors.featuresTitleColor }}
                            >
                                <EditableText
                                    elementId="c_contact_info_title"
                                    defaultText="Información de contacto"
                                    tag="span"
                                />
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}20`, color: sectionColors.buttonPrimaryBackground }}
                                    >
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold" style={{ color: sectionColors.featuresTitleColor }}>
                                            <EditableText
                                                elementId="c_contact_phone_title"
                                                defaultText="Teléfono"
                                                tag="span"
                                            />
                                        </h4>
                                        <p style={{ color: sectionColors.bodyTextColor }}>
                                            <EditableText
                                                elementId="c_contact_phone"
                                                defaultText="+54 9 11 6745-7413"
                                                tag="span"
                                            />
                                        </p>
                                        <p className="text-sm" style={{ color: sectionColors.bodyTextColor }}>
                                            <EditableText
                                                elementId="c_contact_phone_hours"
                                                defaultText="Lun-Vie 9:00 a 19:00"
                                                tag="span"
                                            />
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}20`, color: sectionColors.buttonPrimaryBackground }}
                                    >
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold" style={{ color: sectionColors.featuresTitleColor }}>
                                            <EditableText
                                                elementId="c_contact_email_title"
                                                defaultText="Email"
                                                tag="span"
                                            />
                                        </h4>
                                        <p style={{ color: sectionColors.bodyTextColor }}>
                                            <EditableText
                                                elementId="c_contact_email"
                                                defaultText="eventos@kernelizecatering.com"
                                                tag="span"
                                            />
                                        </p>
                                        <p className="text-sm" style={{ color: sectionColors.bodyTextColor }}>
                                            <EditableText
                                                elementId="c_contact_email_response"
                                                defaultText="Respuesta en 12hs"
                                                tag="span"
                                            />
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}20`, color: sectionColors.buttonPrimaryBackground }}
                                    >
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold" style={{ color: sectionColors.featuresTitleColor }}>
                                            <EditableText
                                                elementId="c_contact_location_title"
                                                defaultText="Ubicación"
                                                tag="span"
                                            />
                                        </h4>
                                        <p style={{ color: sectionColors.bodyTextColor }}>
                                            <EditableText
                                                elementId="c_contact_location"
                                                defaultText="Buenos Aires, Argentina"
                                                tag="span"
                                            />
                                        </p>
                                        <p className="text-sm" style={{ color: sectionColors.bodyTextColor }}>
                                            <EditableText
                                                elementId="c_contact_location_coverage"
                                                defaultText="Cobertura nacional"
                                                tag="span"
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info adicional */}
                        <div
                            className="rounded-2xl p-8 text-white"
                            style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <h4 className="text-xl font-bold mb-4">
                                <EditableText
                                    elementId="c_why_title"
                                    defaultText="¿Por qué elegirnos?"
                                    tag="span"
                                />
                            </h4>
                            <ul className="space-y-3">
                                <li className="flex items-center">
                                    <span className="w-5 h-5 mr-3">✓</span>
                                    <EditableText
                                        elementId="c_why_1"
                                        defaultText="Menús personalizados"
                                        tag="span"
                                    />
                                </li>
                                <li className="flex items-center">
                                    <span className="w-5 h-5 mr-3">✓</span>
                                    <EditableText
                                        elementId="c_why_2"
                                        defaultText="Ingredientes frescos"
                                        tag="span"
                                    />
                                </li>
                                <li className="flex items-center">
                                    <span className="w-5 h-5 mr-3">✓</span>
                                    <EditableText
                                        elementId="c_why_3"
                                        defaultText="Servicio profesional"
                                        tag="span"
                                    />
                                </li>
                                <li className="flex items-center">
                                    <span className="w-5 h-5 mr-3">✓</span>
                                    <EditableText
                                        elementId="c_why_4"
                                        defaultText="Sin cargo por degustación"
                                        tag="span"
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="lg:col-span-2">
                        <div
                            className="rounded-2xl p-8 shadow-xl"
                            style={{ backgroundColor: sectionColors.featuresCardBackground }}
                        >
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div
                                        className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                                        style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                    >
                                        <span className="text-4xl">✓</span>
                                    </div>
                                    <h3
                                        className="text-2xl font-bold mb-4"
                                        style={{ color: sectionColors.featuresTitleColor }}
                                    >
                                        <EditableText
                                            elementId="c_success_title"
                                            defaultText="¡Solicitud enviada con éxito!"
                                            tag="span"
                                        />
                                    </h3>
                                    <p
                                        className="mb-8"
                                        style={{ color: sectionColors.bodyTextColor }}
                                    >
                                        <EditableText
                                            elementId="c_success_message"
                                            defaultText="En menos de 24 horas te contactaremos para coordinar los detalles de tu evento y una degustación sin cargo."
                                            tag="span"
                                        />
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-white font-semibold px-8 py-3 rounded-full transition-all"
                                        style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                    >
                                        <EditableText
                                            elementId="c_success_button"
                                            defaultText="Nueva solicitud"
                                            tag="span"
                                        />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3
                                        className="text-2xl font-bold mb-8"
                                        style={{ color: sectionColors.featuresTitleColor }}
                                    >
                                        <EditableText
                                            elementId="c_form_title"
                                            defaultText="Solicita tu cotización"
                                            tag="span"
                                        />
                                    </h3>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-2"
                                                    style={{ color: sectionColors.bodyTextColor }}
                                                >
                                                    <EditableText
                                                        elementId="c_form_name"
                                                        defaultText="Nombre completo *"
                                                        tag="span"
                                                    />
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                    style={{
                                                        backgroundColor: `${sectionColors.buttonPrimaryBackground}10`,
                                                        borderColor: `${sectionColors.buttonPrimaryBackground}40`,
                                                        color: sectionColors.bodyTextColor
                                                    }}
                                                    placeholder="Tu nombre"
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-2"
                                                    style={{ color: sectionColors.bodyTextColor }}
                                                >
                                                    <EditableText
                                                        elementId="c_form_email"
                                                        defaultText="Email *"
                                                        tag="span"
                                                    />
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                    style={{
                                                        backgroundColor: `${sectionColors.buttonPrimaryBackground}10`,
                                                        borderColor: `${sectionColors.buttonPrimaryBackground}40`,
                                                        color: sectionColors.bodyTextColor
                                                    }}
                                                    placeholder="tu@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-2"
                                                    style={{ color: sectionColors.bodyTextColor }}
                                                >
                                                    <EditableText
                                                        elementId="c_form_phone"
                                                        defaultText="Teléfono *"
                                                        tag="span"
                                                    />
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                    style={{
                                                        backgroundColor: `${sectionColors.buttonPrimaryBackground}10`,
                                                        borderColor: `${sectionColors.buttonPrimaryBackground}40`,
                                                        color: sectionColors.bodyTextColor
                                                    }}
                                                    placeholder="+54 9 11 1234-5678"
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-2"
                                                    style={{ color: sectionColors.bodyTextColor }}
                                                >
                                                    <EditableText
                                                        elementId="c_form_event_type"
                                                        defaultText="Tipo de evento *"
                                                        tag="span"
                                                    />
                                                </label>
                                                <select
                                                    name="eventType"
                                                    value={formData.eventType}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                    style={{
                                                        backgroundColor: `${sectionColors.buttonPrimaryBackground}10`,
                                                        borderColor: `${sectionColors.buttonPrimaryBackground}40`,
                                                        color: sectionColors.bodyTextColor
                                                    }}
                                                >
                                                    <option value="">Selecciona una opción</option>
                                                    {eventTypes.map((type) => (
                                                        <option key={type} value={type}>{type}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-2"
                                                    style={{ color: sectionColors.bodyTextColor }}
                                                >
                                                    <EditableText
                                                        elementId="c_form_guests"
                                                        defaultText="Número de invitados"
                                                        tag="span"
                                                    />
                                                </label>
                                                <div className="relative">
                                                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                                    <input
                                                        type="number"
                                                        name="guests"
                                                        value={formData.guests}
                                                        onChange={handleChange}
                                                        className="w-full pl-10 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                        style={{
                                                            backgroundColor: `${sectionColors.buttonPrimaryBackground}10`,
                                                            borderColor: `${sectionColors.buttonPrimaryBackground}40`,
                                                            color: sectionColors.bodyTextColor
                                                        }}
                                                        placeholder="Ej: 100"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-2"
                                                    style={{ color: sectionColors.bodyTextColor }}
                                                >
                                                    <EditableText
                                                        elementId="c_form_date"
                                                        defaultText="Fecha estimada"
                                                        tag="span"
                                                    />
                                                </label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                                    <input
                                                        type="date"
                                                        name="date"
                                                        value={formData.date}
                                                        onChange={handleChange}
                                                        className="w-full pl-10 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                        style={{
                                                            backgroundColor: `${sectionColors.buttonPrimaryBackground}10`,
                                                            borderColor: `${sectionColors.buttonPrimaryBackground}40`,
                                                            color: sectionColors.bodyTextColor
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-2"
                                                style={{ color: sectionColors.bodyTextColor }}
                                            >
                                                <EditableText
                                                    elementId="c_form_message"
                                                    defaultText="Mensaje / Requerimientos especiales"
                                                    tag="span"
                                                />
                                            </label>
                                            <div className="relative">
                                                <MessageSquare className="absolute left-3 top-3 w-5 h-5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    rows={4}
                                                    className="w-full pl-10 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all resize-none"
                                                    style={{
                                                        backgroundColor: `${sectionColors.buttonPrimaryBackground}10`,
                                                        borderColor: `${sectionColors.buttonPrimaryBackground}40`,
                                                        color: sectionColors.bodyTextColor
                                                    }}
                                                    placeholder="Cuéntanos sobre tu evento, preferencias alimenticias, alergias, etc..."
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-6">
                                            <div className="text-sm" style={{ color: sectionColors.bodyTextColor }}>
                                                <EditableText
                                                    elementId="c_form_required"
                                                    defaultText="* Campos obligatorios"
                                                    tag="span"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="text-white font-semibold px-8 py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                                style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                            >
                                                {isSubmitting ? (
                                                    <EditableText
                                                        elementId="c_form_sending"
                                                        defaultText="Enviando..."
                                                        tag="span"
                                                    />
                                                ) : (
                                                    <>
                                                        <EditableText
                                                            elementId="c_form_submit"
                                                            defaultText="Solicitar cotización"
                                                            tag="span"
                                                        />
                                                        <Send className="ml-2 w-5 h-5" />
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        <p className="text-xs text-center" style={{ color: sectionColors.bodyTextColor }}>
                                            <EditableText
                                                elementId="c_form_privacy"
                                                defaultText="Al enviar este formulario, aceptas recibir información sobre nuestros servicios de catering."
                                                tag="span"
                                            />
                                        </p>
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

export default CateringContact;