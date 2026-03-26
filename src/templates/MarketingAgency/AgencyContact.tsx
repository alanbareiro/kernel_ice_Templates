import { CheckCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const AgencyContact: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#c026d3',
        secondary: '#a21caf',
        accent: '#86198f',
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        budget: '',
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

    const budgets = [
        'Menos de $1.000/mes',
        '$1.000 - $3.000/mes',
        '$3.000 - $5.000/mes',
        '$5.000 - $10.000/mes',
        'Más de $10.000/mes',
    ];

    return (
        <section id="contact" className="section-padding bg-purple-50 dark:bg-purple-950">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900 dark:text-purple-100">
                        <EditableText
                            elementId="ag_contact_title_1"
                            defaultText="Empecemos a"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="ag_contact_title_2"
                                defaultText="trabajar"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-purple-700 dark:text-purple-300">
                        <EditableText
                            elementId="ag_contact_description"
                            defaultText="Contanos tu proyecto y te enviaremos una propuesta personalizada sin cargo."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Información de contacto */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-purple-800/30 rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-purple-900 dark:text-purple-100">
                                <EditableText elementId="ag_contact_info_title" defaultText="Información de contacto" tag="span" />
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                                    <div>
                                        <p className="text-purple-700 dark:text-purple-300">
                                            <EditableText elementId="ag_contact_phone" defaultText="+54 11 4567-8900" tag="span" />
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                                    <div>
                                        <p className="text-purple-700 dark:text-purple-300">
                                            <EditableText elementId="ag_contact_email" defaultText="hola@kernelizemarketing.com" tag="span" />
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                                    <div>
                                        <p className="text-purple-700 dark:text-purple-300">
                                            <EditableText elementId="ag_contact_address" defaultText="Av. Santa Fe 1234, CABA" tag="span" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-purple-800/30 rounded-2xl p-8">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                                        style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4">
                                        <EditableText elementId="ag_success_title" defaultText="¡Mensaje enviado!" tag="span" />
                                    </h3>
                                    <p className="text-purple-700 dark:text-purple-300 mb-8">
                                        <EditableText elementId="ag_success_message" defaultText="Te contactaremos en menos de 24 horas para coordinar una reunión." tag="span" />
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-white font-semibold px-8 py-3 rounded-lg transition-all"
                                        style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}
                                    >
                                        <EditableText elementId="ag_success_button" defaultText="Enviar otro mensaje" tag="span" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold mb-6 text-purple-900 dark:text-purple-100">
                                        <EditableText elementId="ag_form_title" defaultText="Contactanos" tag="span" />
                                    </h3>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    <EditableText elementId="ag_form_name" defaultText="Nombre completo *" tag="span" />
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-purple-800"
                                                    style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    <EditableText elementId="ag_form_email" defaultText="Email *" tag="span" />
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-purple-800"
                                                    style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                <EditableText elementId="ag_form_phone" defaultText="Teléfono" tag="span" />
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-purple-800"
                                                style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                <EditableText elementId="ag_form_company" defaultText="Empresa" tag="span" />
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-purple-800"
                                                style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                <EditableText elementId="ag_form_budget" defaultText="Presupuesto aproximado *" tag="span" />
                                            </label>
                                            <select
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-purple-800"
                                                style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any}
                                            >
                                                <option value="">Seleccioná una opción</option>
                                                {budgets.map(budget => (
                                                    <option key={budget} value={budget}>{budget}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                <EditableText elementId="ag_form_message" defaultText="Mensaje *" tag="span" />
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={4}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-purple-800 resize-none"
                                                style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any}
                                                placeholder="Contanos sobre tu proyecto..."
                                            />
                                        </div>
                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center"
                                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}
                                            >
                                                {isSubmitting ? (
                                                    <EditableText elementId="ag_form_sending" defaultText="Enviando..." tag="span" />
                                                ) : (
                                                    <>
                                                        <EditableText elementId="ag_form_submit" defaultText="Enviar mensaje" tag="span" />
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

export default AgencyContact;