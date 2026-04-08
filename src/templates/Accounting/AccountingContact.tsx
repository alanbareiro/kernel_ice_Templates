// src/templates/Accounting/AccountingContact.tsx
import { Clock, FileText, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const AccountingContact = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;
    // const buttons = template?.buttons || defaultButtons;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        consultType: '',
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
                company: '',
                consultType: '',
                message: '',
            });

            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    const consultTypes = [
        'Consulta general',
        'Liquidación de impuestos',
        'Constitución de sociedad',
        'Auditoría',
        'Planificación fiscal',
        'Otro',
    ];

    return (
        <section
            id="contact"
            className="section-padding"
            style={{ backgroundColor: sectionColors.featuresBackground }}
        >
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Información de contacto */}
                    <div className="space-y-8">
                        <div>
                            <h2
                                className="font-bold mb-6"
                                style={{
                                    fontSize: typography.sectionTitleSize,
                                    color: sectionColors.featuresTitleColor
                                }}
                            >
                                <EditableText
                                    elementId="a_contact_title_1"
                                    defaultText="¿Hablamos sobre tu"
                                    tag="span"
                                />{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <EditableText
                                        elementId="a_contact_title_2"
                                        defaultText="situación?"
                                        tag="span"
                                    />
                                </span>
                            </h2>
                            <p
                                className="text-xl"
                                style={{ color: sectionColors.bodyTextColor }}
                            >
                                <EditableText
                                    elementId="a_contact_description"
                                    defaultText="Déjanos tus datos y un asesor se comunicará a la brevedad. Primera consulta sin cargo."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div
                                className="flex items-start space-x-4 p-4 rounded-xl"
                                style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}10` }}
                            >
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                                    style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3
                                        className="font-semibold"
                                        style={{ color: sectionColors.featuresTitleColor }}
                                    >
                                        <EditableText
                                            elementId="a_contact_phone_title"
                                            defaultText="Teléfono"
                                            tag="span"
                                        />
                                    </h3>
                                    <p style={{ color: sectionColors.bodyTextColor }}>
                                        <EditableText
                                            elementId="a_contact_phone"
                                            defaultText="+54 9 11 6745-7413"
                                            tag="span"
                                        />
                                    </p>
                                    <p className="text-sm" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                        <EditableText
                                            elementId="a_contact_phone_hours"
                                            defaultText="Lun-Vie 9:00 a 18:00"
                                            tag="span"
                                        />
                                    </p>
                                </div>
                            </div>

                            <div
                                className="flex items-start space-x-4 p-4 rounded-xl"
                                style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}10` }}
                            >
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                                    style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3
                                        className="font-semibold"
                                        style={{ color: sectionColors.featuresTitleColor }}
                                    >
                                        <EditableText
                                            elementId="a_contact_email_title"
                                            defaultText="Email"
                                            tag="span"
                                        />
                                    </h3>
                                    <p style={{ color: sectionColors.bodyTextColor }}>
                                        <EditableText
                                            elementId="a_contact_email"
                                            defaultText="contabilidad@kernelize.com"
                                            tag="span"
                                        />
                                    </p>
                                    <p className="text-sm" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                        <EditableText
                                            elementId="a_contact_email_response"
                                            defaultText="Respuesta en 24hs"
                                            tag="span"
                                        />
                                    </p>
                                </div>
                            </div>

                            <div
                                className="flex items-start space-x-4 p-4 rounded-xl"
                                style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}10` }}
                            >
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                                    style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3
                                        className="font-semibold"
                                        style={{ color: sectionColors.featuresTitleColor }}
                                    >
                                        <EditableText
                                            elementId="a_contact_location_title"
                                            defaultText="Ubicación"
                                            tag="span"
                                        />
                                    </h3>
                                    <p style={{ color: sectionColors.bodyTextColor }}>
                                        <EditableText
                                            elementId="a_contact_location"
                                            defaultText="Av. Corrientes 1234, CABA"
                                            tag="span"
                                        />
                                    </p>
                                    <p className="text-sm" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                        <EditableText
                                            elementId="a_contact_location_city"
                                            defaultText="Buenos Aires, Argentina"
                                            tag="span"
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Horarios */}
                        <div
                            className="p-6 rounded-2xl text-white"
                            style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <div className="flex items-center mb-4">
                                <Clock className="w-5 h-5 mr-2" />
                                <h4 className="font-semibold">
                                    <EditableText
                                        elementId="a_hours_title"
                                        defaultText="Horarios de atención"
                                        tag="span"
                                    />
                                </h4>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm opacity-90">
                                        <EditableText
                                            elementId="a_hours_week"
                                            defaultText="Lunes a Viernes"
                                            tag="span"
                                        />
                                    </p>
                                    <p className="font-bold">
                                        <EditableText
                                            elementId="a_hours_week_time"
                                            defaultText="9:00 - 18:00"
                                            tag="span"
                                        />
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm opacity-90">
                                        <EditableText
                                            elementId="a_hours_sat"
                                            defaultText="Sábados"
                                            tag="span"
                                        />
                                    </p>
                                    <p className="font-bold">
                                        <EditableText
                                            elementId="a_hours_sat_time"
                                            defaultText="10:00 - 13:00"
                                            tag="span"
                                        />
                                    </p>
                                </div>
                            </div>
                            <p className="text-xs mt-4 opacity-80">
                                <EditableText
                                    elementId="a_hours_note"
                                    defaultText="*Consultas online también fuera de horario"
                                    tag="span"
                                />
                            </p>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div
                        className="rounded-2xl p-8"
                        style={{ backgroundColor: `${sectionColors.buttonPrimaryBackground}08` }}
                    >
                        {isSubmitted ? (
                            <div className="text-center py-12">
                                <div
                                    className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                                    style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <FileText className="w-10 h-10 text-white" />
                                </div>
                                <h3
                                    className="text-2xl font-bold mb-4"
                                    style={{ color: sectionColors.featuresTitleColor }}
                                >
                                    <EditableText
                                        elementId="a_success_title"
                                        defaultText="¡Consulta enviada!"
                                        tag="span"
                                    />
                                </h3>
                                <p
                                    className="mb-8"
                                    style={{ color: sectionColors.bodyTextColor }}
                                >
                                    <EditableText
                                        elementId="a_success_message"
                                        defaultText="En las próximas 24 horas hábiles un asesor se comunicará contigo para coordinar una reunión sin cargo."
                                        tag="span"
                                    />
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-white font-semibold px-8 py-3 rounded-lg transition-all"
                                    style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                >
                                    <EditableText
                                        elementId="a_success_button"
                                        defaultText="Nueva consulta"
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
                                        elementId="a_form_title"
                                        defaultText="Solicita tu asesoría gratuita"
                                        tag="span"
                                    />
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label
                                            className="block text-sm font-medium mb-2"
                                            style={{ color: sectionColors.bodyTextColor }}
                                        >
                                            <EditableText
                                                elementId="a_form_name"
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

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-2"
                                                style={{ color: sectionColors.bodyTextColor }}
                                            >
                                                <EditableText
                                                    elementId="a_form_email"
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

                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-2"
                                                style={{ color: sectionColors.bodyTextColor }}
                                            >
                                                <EditableText
                                                    elementId="a_form_phone"
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
                                    </div>

                                    <div>
                                        <label
                                            className="block text-sm font-medium mb-2"
                                            style={{ color: sectionColors.bodyTextColor }}
                                        >
                                            <EditableText
                                                elementId="a_form_company"
                                                defaultText="Empresa"
                                                tag="span"
                                            />
                                        </label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                            style={{
                                                backgroundColor: `${sectionColors.buttonPrimaryBackground}10`,
                                                borderColor: `${sectionColors.buttonPrimaryBackground}40`,
                                                color: sectionColors.bodyTextColor
                                            }}
                                            placeholder="Nombre de tu empresa"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className="block text-sm font-medium mb-2"
                                            style={{ color: sectionColors.bodyTextColor }}
                                        >
                                            <EditableText
                                                elementId="a_form_consult_type"
                                                defaultText="Tipo de consulta *"
                                                tag="span"
                                            />
                                        </label>
                                        <select
                                            name="consultType"
                                            value={formData.consultType}
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
                                            {consultTypes.map((type) => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            className="block text-sm font-medium mb-2"
                                            style={{ color: sectionColors.bodyTextColor }}
                                        >
                                            <EditableText
                                                elementId="a_form_message"
                                                defaultText="Mensaje"
                                                tag="span"
                                            />
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all resize-none"
                                            style={{
                                                backgroundColor: `${sectionColors.buttonPrimaryBackground}10`,
                                                borderColor: `${sectionColors.buttonPrimaryBackground}40`,
                                                color: sectionColors.bodyTextColor
                                            }}
                                            placeholder="Cuéntanos tu situación o consulta..."
                                        />
                                    </div>

                                    <div className="flex items-center justify-between pt-6">
                                        <div
                                            className="text-sm"
                                            style={{ color: sectionColors.buttonPrimaryBackground }}
                                        >
                                            <EditableText
                                                elementId="a_form_required"
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
                                                    elementId="a_form_sending"
                                                    defaultText="Enviando..."
                                                    tag="span"
                                                />
                                            ) : (
                                                <>
                                                    <EditableText
                                                        elementId="a_form_submit"
                                                        defaultText="Enviar consulta"
                                                        tag="span"
                                                    />
                                                    <Send className="ml-2 w-5 h-5" />
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <p
                                        className="text-xs text-center"
                                        style={{ color: `${sectionColors.buttonPrimaryBackground}80` }}
                                    >
                                        <EditableText
                                            elementId="a_form_privacy"
                                            defaultText="Tus datos están protegidos por nuestra política de confidencialidad."
                                            tag="span"
                                        />
                                    </p>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AccountingContact;