import { CheckCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const ArchitectureContact: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#57534e',
        secondary: '#44403c',
        accent: '#292524',
    };

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
        <section id="contact" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-900 dark:text-stone-100">
                        <EditableText
                            elementId="ar_contact_title_1"
                            defaultText="Hablemos de tu"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="ar_contact_title_2"
                                defaultText="proyecto"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-stone-600 dark:text-stone-400">
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
                        <div className="bg-stone-50 dark:bg-stone-800/30 rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-stone-900 dark:text-stone-100">
                                <EditableText elementId="ar_contact_info_title" defaultText="Información de contacto" tag="span" />
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                                    <div>
                                        <p className="text-stone-700 dark:text-stone-300">
                                            <EditableText elementId="ar_contact_phone" defaultText="+54 11 4567-8900" tag="span" />
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                                    <div>
                                        <p className="text-stone-700 dark:text-stone-300">
                                            <EditableText elementId="ar_contact_email" defaultText="estudio@kernelizearq.com" tag="span" />
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                                    <div>
                                        <p className="text-stone-700 dark:text-stone-300">
                                            <EditableText elementId="ar_contact_address" defaultText="Av. Libertador 1234, CABA" tag="span" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="lg:col-span-2">
                        <div className="bg-stone-50 dark:bg-stone-800/30 rounded-2xl p-8">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                                        style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                                        <EditableText elementId="ar_success_title" defaultText="¡Mensaje enviado!" tag="span" />
                                    </h3>
                                    <p className="text-stone-600 dark:text-stone-400 mb-8">
                                        <EditableText elementId="ar_success_message" defaultText="Te contactaremos a la brevedad para conversar sobre tu proyecto." tag="span" />
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-white font-semibold px-8 py-3 rounded-lg transition-all"
                                        style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}
                                    >
                                        <EditableText elementId="ar_success_button" defaultText="Enviar otro mensaje" tag="span" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold mb-6 text-stone-900 dark:text-stone-100">
                                        <EditableText elementId="ar_form_title" defaultText="Contactanos" tag="span" />
                                    </h3>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    <EditableText elementId="ar_form_name" defaultText="Nombre completo *" tag="span" />
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-stone-800"
                                                    style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    <EditableText elementId="ar_form_email" defaultText="Email *" tag="span" />
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-stone-800"
                                                    style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                <EditableText elementId="ar_form_phone" defaultText="Teléfono" tag="span" />
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-stone-800"
                                                style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                <EditableText elementId="ar_form_project_type" defaultText="Tipo de proyecto *" tag="span" />
                                            </label>
                                            <select
                                                name="projectType"
                                                value={formData.projectType}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-stone-800"
                                                style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any}
                                            >
                                                <option value="">Seleccioná una opción</option>
                                                {projectTypes.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                <EditableText elementId="ar_form_message" defaultText="Mensaje *" tag="span" />
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={4}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-stone-800 resize-none"
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