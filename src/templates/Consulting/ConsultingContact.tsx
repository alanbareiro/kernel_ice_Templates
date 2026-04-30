import { Briefcase, Calendar, CheckCircle, Clock, Globe, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors } from '../../types/template.types';

// Mapeo de iconos (puedes ampliarlo)
const iconMap: Record<string, any> = {
    Mail, MapPin, Phone, Briefcase, CheckCircle,
    // otros iconos comunes
    MessageCircle: MessageCircle,
    Globe: Globe,
    Clock: Clock,
    Calendar: Calendar,
};

const ConsultingContact = () => {
    const { template } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', phone: '', company: '', position: '', message: '' });
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    // Datos de contacto desde template.texts
    const contactItems = [
        {
            id: 'email',
            defaultIcon: 'Mail',
            defaultTitle: 'Email',
            defaultContent: 'consultoria@kernelize.com',
            href: 'mailto:consultoria@kernelize.com',
        },
        {
            id: 'phone',
            defaultIcon: 'Phone',
            defaultTitle: 'Teléfono',
            defaultContent: '+54 9 11 6745-7413',
            href: 'tel:+5491167457413',
        },
        {
            id: 'location',
            defaultIcon: 'MapPin',
            defaultTitle: 'Ubicación',
            defaultContent: 'Buenos Aires, Argentina',
            href: '#',
        },
    ];

    const getIcon = (iconName: string) => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className="w-6 h-6" /> : <Mail className="w-6 h-6" />;
    };

    // Horario de atención
    const hourIconName = template?.texts?.contact_hours_icon || 'Briefcase';
    const HourIcon = iconMap[hourIconName] || Briefcase;

    return (
        <section id="contact" className="section-padding" style={{ backgroundColor: s.contactBackground }}>
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: s.contactTitleColor }}>
                        <EditableText elementId="contact_title_1" defaultText="Comencemos a" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${s.contactTitleColor}, ${s.contactTitleColor})` }}>
                            <EditableText elementId="contact_title_2" defaultText="transformar" tag="span" />
                        </span>{' '}
                        <EditableText elementId="contact_title_3" defaultText="tu negocio" tag="span" />
                    </h2>
                    <p className="text-xl" style={{ color: s.contactTextColor }}>
                        <EditableText elementId="contact_description" defaultText="Solicita una reunión estratégica sin costo y descubre cómo podemos ayudarte a alcanzar tus metas." tag="span" />
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Información de contacto */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-6" style={{ color: s.contactTitleColor }}>
                                <EditableText elementId="contact_info_title" defaultText="Información de contacto" tag="span" />
                            </h3>
                            <p className="mb-8" style={{ color: s.contactTextColor }}>
                                <EditableText elementId="contact_info_description" defaultText="Estamos a disposición para atender tus consultas y coordinar una primera reunión de diagnóstico." tag="span" />
                            </p>
                        </div>

                        <div className="space-y-6">
                            {contactItems.map((item) => {
                                const iconName = template?.texts?.[`contact_${item.id}_icon`] || item.defaultIcon;
                                const title = template?.texts?.[`contact_${item.id}_title`] || item.defaultTitle;
                                const content = template?.texts?.[`contact_${item.id}_content`] || item.defaultContent;
                                return (
                                    <a key={item.id} href={item.href} className="flex items-start space-x-4 p-4 rounded-xl transition-colors group"
                                        style={{ backgroundColor: s.contactFormBackground, border: `1px solid ${s.contactFormBorder}` }}>
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
                                            style={{ backgroundColor: `${s.contactButtonBackground}20`, color: s.contactButtonBackground }}>
                                            {getIcon(iconName)}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold group-hover:text-blue-600 transition-colors" style={{ color: s.contactTitleColor }}>
                                                <EditableText elementId={`contact_${item.id}_title`} defaultText={title} tag="span" />
                                            </h4>
                                            <p className="mt-1" style={{ color: s.contactTextColor }}>
                                                <EditableText elementId={`contact_${item.id}_content`} defaultText={content} tag="span" />
                                            </p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Recuadro de horario */}
                        <div className="p-6 rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${s.contactButtonBackground}, ${s.contactButtonHoverBackground})` }}>
                            <h4 className="font-semibold text-lg mb-2 flex items-center">
                                <HourIcon className="w-5 h-5 mr-2" />
                                <EditableText elementId="contact_hours_title" defaultText="Horario de atención" tag="span" />
                            </h4>
                            <p className="text-sm opacity-90">
                                <EditableText elementId="contact_hours_week" defaultText="Lunes a Viernes: 9:00 - 19:00 hs" tag="span" />
                            </p>
                            <p className="text-sm opacity-90">
                                <EditableText elementId="contact_hours_saturday" defaultText="Sábados: Reuniones programadas" tag="span" />
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/20">
                                <p className="text-sm">
                                    <EditableText elementId="contact_response_time" defaultText="Respuesta garantizada en 12 horas hábiles" tag="span" />
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl p-8 border" style={{ backgroundColor: s.contactFormBackground, borderColor: s.contactFormBorder }}>
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(to right, ${s.contactButtonBackground}, ${s.contactButtonHoverBackground})` }}>
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4" style={{ color: s.contactTitleColor }}>
                                        <EditableText elementId="contact_success_title" defaultText="¡Mensaje enviado con éxito!" tag="span" />
                                    </h3>
                                    <p className="mb-8" style={{ color: s.contactTextColor }}>
                                        <EditableText elementId="contact_success_message" defaultText="En menos de 12 horas hábiles, uno de nuestros consultores se comunicará contigo para coordinar una reunión." tag="span" />
                                    </p>
                                    <button onClick={() => setIsSubmitted(false)} className="text-white font-semibold px-8 py-3 rounded-lg transition-all" style={{ background: `linear-gradient(to right, ${s.contactButtonBackground}, ${s.contactButtonHoverBackground})` }}>
                                        <EditableText elementId="contact_success_button" defaultText="Enviar otro mensaje" tag="span" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold mb-8" style={{ color: s.contactTitleColor }}>
                                        <EditableText elementId="contact_form_title" defaultText="Solicita una reunión de diagnóstico" tag="span" />
                                    </h3>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium mb-2" style={{ color: s.contactTextColor }}>
                                                    <EditableText elementId="contact_label_name" defaultText="Nombre completo *" tag="span" />
                                                </label>
                                                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                    style={{ backgroundColor: s.contactInputBackground, border: `1px solid ${s.contactInputBorder}`, color: s.contactInputTextColor, '--tw-ring-color': s.contactButtonBackground } as React.CSSProperties}
                                                    placeholder="Tu nombre" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2" style={{ color: s.contactTextColor }}>
                                                    <EditableText elementId="contact_label_email" defaultText="Email corporativo *" tag="span" />
                                                </label>
                                                <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                    style={{ backgroundColor: s.contactInputBackground, border: `1px solid ${s.contactInputBorder}`, color: s.contactInputTextColor }}
                                                    placeholder="nombre@empresa.com" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-6">
                                            <div className="text-sm" style={{ color: s.contactTextColor }}>
                                                * <EditableText elementId="contact_required" defaultText="Campos obligatorios" tag="span" />
                                            </div>
                                            <button type="submit" disabled={isSubmitting}
                                                className="text-white font-semibold px-8 py-4 rounded-lg transition-all disabled:opacity-50 flex items-center"
                                                style={{ backgroundColor: s.contactButtonBackground, color: s.contactButtonText }}
                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = s.contactButtonHoverBackground; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = s.contactButtonBackground; }}>
                                                {isSubmitting ? <EditableText elementId="contact_sending" defaultText="Enviando..." tag="span" />
                                                    : <><EditableText elementId="contact_submit" defaultText="Solicitar reunión" tag="span" /><Send className="ml-2 w-5 h-5" /></>}
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