import { Briefcase, CheckCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const ConsultingContact = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#2563eb',
        secondary: '#475569',
        accent: '#1e293b',
        background: '#ffffff',
        text: '#0f172a'
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        position: '',
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
                position: '',
                message: '',
            });

            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: 'Email',
            content: 'consultoria@kernelize.com',
            href: 'mailto:consultoria@kernelize.com',
            id: 'email'
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: 'Teléfono',
            content: '+54 9 11 6745-7413',
            href: 'tel:+5491167457413',
            id: 'phone'
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: 'Ubicación',
            content: 'Buenos Aires, Argentina',
            href: '#',
            id: 'location'
        },
    ];

    return (
        <section id="contact" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
                        <EditableText
                            elementId="contact_title_1"
                            defaultText="Comencemos a"
                            tag="span"
                        />{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText
                                elementId="contact_title_2"
                                defaultText="transformar"
                                tag="span"
                            />
                        </span>{' '}
                        <EditableText
                            elementId="contact_title_3"
                            defaultText="tu negocio"
                            tag="span"
                        />
                    </h2>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400">
                        <EditableText
                            elementId="contact_description"
                            defaultText="Solicita una reunión estratégica sin costo y descubre cómo podemos ayudarte a alcanzar tus metas."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Información de contacto */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">
                                <EditableText
                                    elementId="contact_info_title"
                                    defaultText="Información de contacto"
                                    tag="span"
                                />
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                                <EditableText
                                    elementId="contact_info_description"
                                    defaultText="Estamos a disposición para atender tus consultas y coordinar una primera reunión de diagnóstico."
                                    tag="span"
                                />
                            </p>
                        </div>

                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <a
                                    key={index}
                                    href={info.href}
                                    className="flex items-start space-x-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group"
                                    style={{ borderColor: `hover:${colors.primary}` }}
                                >
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors"
                                        style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}>
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                            <EditableText
                                                elementId={`contact_${info.id}_title`}
                                                defaultText={info.title}
                                                tag="span"
                                            />
                                        </h4>
                                        <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                                            <EditableText
                                                elementId={`contact_${info.id}_content`}
                                                defaultText={info.content}
                                                tag="span"
                                            />
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Horario de atención */}
                        <div className="p-6 rounded-2xl text-white"
                            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                            <h4 className="font-semibold text-lg mb-2 flex items-center">
                                <Briefcase className="w-5 h-5 mr-2" />
                                <EditableText
                                    elementId="contact_hours_title"
                                    defaultText="Horario de atención"
                                    tag="span"
                                />
                            </h4>
                            <p className="text-sm opacity-90">
                                <EditableText
                                    elementId="contact_hours_week"
                                    defaultText="Lunes a Viernes: 9:00 - 19:00 hs"
                                    tag="span"
                                />
                            </p>
                            <p className="text-sm opacity-90">
                                <EditableText
                                    elementId="contact_hours_saturday"
                                    defaultText="Sábados: Reuniones programadas"
                                    tag="span"
                                />
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/20">
                                <p className="text-sm">
                                    <EditableText
                                        elementId="contact_response_time"
                                        defaultText="Respuesta garantizada en 12 horas hábiles"
                                        tag="span"
                                    />
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="lg:col-span-2">
                        <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                                        <EditableText
                                            elementId="contact_success_title"
                                            defaultText="¡Mensaje enviado con éxito!"
                                            tag="span"
                                        />
                                    </h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                                        <EditableText
                                            elementId="contact_success_message"
                                            defaultText="En menos de 12 horas hábiles, uno de nuestros consultores se comunicará contigo para coordinar una reunión."
                                            tag="span"
                                        />
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-white font-semibold px-8 py-3 rounded-lg transition-all"
                                        style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}
                                    >
                                        <EditableText
                                            elementId="contact_success_button"
                                            defaultText="Enviar otro mensaje"
                                            tag="span"
                                        />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold mb-8 text-neutral-900 dark:text-white">
                                        <EditableText
                                            elementId="contact_form_title"
                                            defaultText="Solicita una reunión de diagnóstico"
                                            tag="span"
                                        />
                                    </h3>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                                    <EditableText
                                                        elementId="contact_label_name"
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
                                                    className="w-full px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                    style={{ '--tw-ring-color': colors.primary } as React.CSSProperties}
                                                    placeholder="Tu nombre"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                                    <EditableText
                                                        elementId="contact_label_email"
                                                        defaultText="Email corporativo *"
                                                        tag="span"
                                                    />
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                    placeholder="nombre@empresa.com"
                                                />
                                            </div>
                                        </div>

                                        {/* Resto del formulario con EditableText similar... */}

                                        <div className="flex items-center justify-between pt-6">
                                            <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                                * <EditableText elementId="contact_required" defaultText="Campos obligatorios" tag="span" />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="text-white font-semibold px-8 py-4 rounded-lg transition-all disabled:opacity-50 flex items-center"
                                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}
                                            >
                                                {isSubmitting ? (
                                                    <EditableText elementId="contact_sending" defaultText="Enviando..." tag="span" />
                                                ) : (
                                                    <>
                                                        <EditableText elementId="contact_submit" defaultText="Solicitar reunión" tag="span" />
                                                        <Send className="ml-2 w-5 h-5" />
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

export default ConsultingContact;