import { CheckCircle, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const LawFirmContact: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#7f1d1d',
        secondary: '#991b1b',
        accent: '#450a0a',
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        caseType: '',
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

    const caseTypes = [
        'Derecho Corporativo',
        'Derecho Civil',
        'Derecho Penal',
        'Derecho Laboral',
        'Derecho de Familia',
        'Otro',
    ];

    return (
        <section id="contact" className="section-padding bg-stone-50 dark:bg-stone-950">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-900 dark:text-stone-100">
                        <EditableText
                            elementId="lf_contact_title_1"
                            defaultText="Hablemos de tu"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="lf_contact_title_2"
                                defaultText="caso"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-stone-600 dark:text-stone-400">
                        <EditableText
                            elementId="lf_contact_description"
                            defaultText="Primera consulta gratuita. Evaluamos tu caso y te asesoramos sin compromiso."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Información de contacto */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold mb-4 text-stone-900 dark:text-stone-100">
                                <EditableText elementId="lf_contact_info_title" defaultText="Información de contacto" tag="span" />
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                                    <div>
                                        <p className="text-stone-600 dark:text-stone-400">
                                            <EditableText elementId="lf_contact_phone" defaultText="+54 11 4567-8900" tag="span" />
                                        </p>
                                        <p className="text-sm text-stone-500">Lun-Vie 9:00 a 18:00</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                                    <div>
                                        <p className="text-stone-600 dark:text-stone-400">
                                            <EditableText elementId="lf_contact_email" defaultText="contacto@kernelizeabogados.com" tag="span" />
                                        </p>
                                        <p className="text-sm text-stone-500">Respuesta en 24hs</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                                    <div>
                                        <p className="text-stone-600 dark:text-stone-400">
                                            <EditableText elementId="lf_contact_address" defaultText="Av. Corrientes 1234, CABA" tag="span" />
                                        </p>
                                        <p className="text-sm text-stone-500">Buenos Aires, Argentina</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl text-white"
                            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                            <Clock className="w-8 h-8 mb-4" />
                            <h4 className="text-lg font-semibold mb-2">
                                <EditableText elementId="lf_hours_title" defaultText="Horarios de atención" tag="span" />
                            </h4>
                            <p className="text-sm opacity-90">Lunes a Viernes: 9:00 - 18:00</p>
                            <p className="text-sm opacity-90">Sábados: 10:00 - 13:00 (solo con cita)</p>
                            <p className="text-xs mt-4 opacity-80">*Consultas online también fuera de horario</p>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-stone-800 rounded-2xl p-8 shadow-lg">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                                        style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                                        <EditableText elementId="lf_success_title" defaultText="¡Consulta enviada!" tag="span" />
                                    </h3>
                                    <p className="text-stone-600 dark:text-stone-400 mb-8">
                                        <EditableText elementId="lf_success_message" defaultText="En las próximas 24 horas un abogado se comunicará contigo para coordinar una reunión sin cargo." tag="span" />
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-white font-semibold px-8 py-3 rounded-lg transition-all"
                                        style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}
                                    >
                                        <EditableText elementId="lf_success_button" defaultText="Nueva consulta" tag="span" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold mb-6 text-stone-900 dark:text-stone-100">
                                        <EditableText elementId="lf_form_title" defaultText="Solicita tu consulta gratuita" tag="span" />
                                    </h3>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    <EditableText elementId="lf_form_name" defaultText="Nombre completo *" tag="span" />
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                                                    style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    <EditableText elementId="lf_form_email" defaultText="Email *" tag="span" />
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                                                    style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                <EditableText elementId="lf_form_phone" defaultText="Teléfono *" tag="span" />
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                                                style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                <EditableText elementId="lf_form_case_type" defaultText="Tipo de caso *" tag="span" />
                                            </label>
                                            <select
                                                name="caseType"
                                                value={formData.caseType}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                                                style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any}
                                            >
                                                <option value="">Selecciona una opción</option>
                                                {caseTypes.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                <EditableText elementId="lf_form_message" defaultText="Mensaje" tag="span" />
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={4}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none"
                                                style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any}
                                                placeholder="Contanos brevemente tu caso..."
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
                                                    <EditableText elementId="lf_form_sending" defaultText="Enviando..." tag="span" />
                                                ) : (
                                                    <>
                                                        <EditableText elementId="lf_form_submit" defaultText="Solicitar consulta" tag="span" />
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

export default LawFirmContact;