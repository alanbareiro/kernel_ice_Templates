import { Briefcase, Calendar, CheckCircle, Clock, Globe, Mail, MapPin, MessageCircle, Phone, Send, Users, TrendingUp, Target, Award, BarChart, LineChart, Heart, ThumbsUp, Zap, Eye, Star } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

// Mapeo ampliado de iconos (incluye todos los que se pueden seleccionar)
const iconMap: Record<string, any> = {
    Mail, MapPin, Phone, Briefcase, CheckCircle, MessageCircle, Globe, Clock, Calendar,
    TrendingUp, Users, Target, Award, BarChart, LineChart, Heart, ThumbsUp, Zap, Eye, Star
};

const ConsultingContact = () => {
    const { template } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };
    const typography = template?.typography || defaultTypography;

    const contactTitleClamp = `clamp(1.5rem, 5vw, ${typography.contactTitleSize})`;
    const contactTextClamp = `clamp(0.875rem, 3vw, ${typography.contactTextSize})`;
    const contactLabelClamp = `clamp(0.75rem, 2.5vw, ${typography.contactLabelSize})`;
    const contactButtonClamp = `clamp(0.875rem, 3vw, ${typography.contactButtonSize})`;
    const contactCardTitleClamp = `clamp(1rem, 3vw, ${typography.contactCardTitleSize})`;

    const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', position: '', message: '' });
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

    // ----- CARDS DE CONTACTO (Email, Teléfono, Ubicación + 3 extras) -----
    const contactCards = [
        { id: 'email', defaultIcon: 'Mail', defaultTitle: 'Email', defaultContent: 'consultoria@kernelize.com', defaultHref: 'mailto:consultoria@kernelize.com' },
        { id: 'phone', defaultIcon: 'Phone', defaultTitle: 'Teléfono', defaultContent: '+54 9 11 6745-7413', defaultHref: 'tel:+5491167457413' },
        { id: 'location', defaultIcon: 'MapPin', defaultTitle: 'Ubicación', defaultContent: 'Buenos Aires, Argentina', defaultHref: '#' },
        { id: 'extra_1', defaultIcon: 'Globe', defaultTitle: 'Card Extra 1', defaultContent: 'Contenido extra 1', defaultHref: '#' },
        { id: 'extra_2', defaultIcon: 'MessageCircle', defaultTitle: 'Card Extra 2', defaultContent: 'Contenido extra 2', defaultHref: '#' },
        { id: 'extra_3', defaultIcon: 'Clock', defaultTitle: 'Card Extra 3', defaultContent: 'Contenido extra 3', defaultHref: '#' },
    ];

    const shouldShowContactCard = (idx: number) => {
        const showKey = `show_contact_card_${idx}`;
        const defaultValue = idx < 3; // email, phone, location visibles por defecto
        const stored = template?.texts?.[showKey];
        return stored === undefined ? defaultValue : stored !== 'false';
    };

    // ----- BLOQUES DE HORARIO (principal + 4 extras) -----
    const hourBlocks = [
        { id: 'main', defaultTitle: 'Horario de atención', defaultLine1: 'Lunes a Viernes: 9:00 - 19:00 hs', defaultLine2: 'Sábados: Reuniones programadas', defaultNote: 'Respuesta garantizada en 12 horas hábiles' },
        { id: 'extra_1', defaultTitle: 'Horario Extra 1', defaultLine1: 'Línea extra 1', defaultLine2: 'Línea extra 2', defaultNote: 'Nota extra 1' },
        { id: 'extra_2', defaultTitle: 'Horario Extra 2', defaultLine1: 'Línea extra 1', defaultLine2: 'Línea extra 2', defaultNote: 'Nota extra 2' },
        { id: 'extra_3', defaultTitle: 'Horario Extra 3', defaultLine1: 'Línea extra 1', defaultLine2: 'Línea extra 2', defaultNote: 'Nota extra 3' },
        { id: 'extra_4', defaultTitle: 'Horario Extra 4', defaultLine1: 'Línea extra 1', defaultLine2: 'Línea extra 2', defaultNote: 'Nota extra 4' },
    ];

    const shouldShowHourBlock = (idx: number) => {
        const showKey = `show_hour_block_${idx}`;
        const defaultValue = idx === 0; // solo el bloque principal visible por defecto
        const stored = template?.texts?.[showKey];
        return stored === undefined ? defaultValue : stored !== 'false';
    };

    const getIcon = (iconName: string) => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className="w-6 h-6" /> : <Mail className="w-6 h-6" />;
    };

    return (
        <section id="contact" className="section-padding" style={{ backgroundColor: s.contactBackground }}>
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-bold mb-6" style={{ color: s.contactTitleColor, fontSize: contactTitleClamp }}>
                        <EditableText elementId="contact_title_1" defaultText="Comencemos a" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${s.contactTitleColor}, ${s.contactTitleColor})` }}>
                            <EditableText elementId="contact_title_2" defaultText="transformar" tag="span" />
                        </span>{' '}
                        <EditableText elementId="contact_title_3" defaultText="tu negocio" tag="span" />
                    </h2>
                    <p className="max-w-2xl mx-auto" style={{ color: s.contactTextColor, fontSize: contactTextClamp }}>
                        <EditableText elementId="contact_description" defaultText="Solicita una reunión estratégica sin costo y descubre cómo podemos ayudarte a alcanzar tus metas." tag="span" />
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Columna izquierda */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-bold mb-6" style={{ color: s.contactTitleColor, fontSize: contactTitleClamp }}>
                                <EditableText elementId="contact_info_title" defaultText="Información de contacto" tag="span" />
                            </h3>
                            <p className="mb-8" style={{ color: s.contactTextColor, fontSize: contactTextClamp }}>
                                <EditableText elementId="contact_info_description" defaultText="Estamos a disposición para atender tus consultas y coordinar una primera reunión de diagnóstico." tag="span" />
                            </p>
                        </div>

                        {/* Cards de contacto dinámicas */}
                        <div className="space-y-6">
                            {contactCards.map((card, idx) => {
                                if (!shouldShowContactCard(idx)) return null;
                                const iconName = template?.texts?.[`contact_card_${card.id}_icon`] || card.defaultIcon;
                                const title = template?.texts?.[`contact_card_${card.id}_title`] || card.defaultTitle;
                                const content = template?.texts?.[`contact_card_${card.id}_content`] || card.defaultContent;
                                const href = template?.texts?.[`contact_card_${card.id}_href`] || card.defaultHref;
                                return (
                                    <a key={card.id} href={href} className="flex items-start space-x-4 p-4 rounded-xl transition-colors group" style={{ backgroundColor: s.contactFormBackground, border: `1px solid ${s.contactFormBorder}` }}>
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: `${s.contactButtonBackground}20`, color: s.contactButtonBackground }}>
                                            {getIcon(iconName)}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold group-hover:text-blue-600 transition-colors" style={{ color: s.contactTitleColor, fontSize: contactCardTitleClamp }}>
                                                <EditableText elementId={`contact_card_${card.id}_title`} defaultText={title} tag="span" />
                                            </h4>
                                            <p className="mt-1" style={{ color: s.contactTextColor, fontSize: contactTextClamp }}>
                                                <EditableText elementId={`contact_card_${card.id}_content`} defaultText={content} tag="span" />
                                            </p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Bloques de horario dinámicos */}
                        {hourBlocks.map((block, idx) => {
                            if (!shouldShowHourBlock(idx)) return null;
                            const title = template?.texts?.[`contact_hours_title_${block.id}`] || block.defaultTitle;
                            const line1 = template?.texts?.[`contact_hours_line1_${block.id}`] || block.defaultLine1;
                            const line2 = template?.texts?.[`contact_hours_line2_${block.id}`] || block.defaultLine2;
                            const note = template?.texts?.[`contact_hours_note_${block.id}`] || block.defaultNote;
                            const iconName = template?.texts?.[`contact_hours_icon_${block.id}`] || 'Briefcase';
                            const Icon = iconMap[iconName] || Briefcase;
                            return (
                                <div key={block.id} className="p-6 rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${s.contactButtonBackground}, ${s.contactButtonHoverBackground})` }}>
                                    <h4 className="font-semibold text-lg mb-2 flex items-center" style={{ fontSize: contactTitleClamp }}>
                                        <Icon className="w-5 h-5 mr-2" />
                                        <EditableText elementId={`contact_hours_title_${block.id}`} defaultText={title} tag="span" />
                                    </h4>
                                    <p className="text-sm opacity-90" style={{ fontSize: contactTextClamp }}>
                                        <EditableText elementId={`contact_hours_line1_${block.id}`} defaultText={line1} tag="span" />
                                    </p>
                                    <p className="text-sm opacity-90" style={{ fontSize: contactTextClamp }}>
                                        <EditableText elementId={`contact_hours_line2_${block.id}`} defaultText={line2} tag="span" />
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-white/20">
                                        <p className="text-sm" style={{ fontSize: contactTextClamp }}>
                                            <EditableText elementId={`contact_hours_note_${block.id}`} defaultText={note} tag="span" />
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Formulario (sin cambios estructurales) */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl p-8 border" style={{ backgroundColor: s.contactFormBackground, borderColor: s.contactFormBorder }}>
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(to right, ${s.contactButtonBackground}, ${s.contactButtonHoverBackground})` }}>
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4" style={{ color: s.contactTitleColor, fontSize: contactTitleClamp }}>
                                        <EditableText elementId="contact_success_title" defaultText="¡Mensaje enviado con éxito!" tag="span" />
                                    </h3>
                                    <p className="mb-8" style={{ color: s.contactTextColor, fontSize: contactTextClamp }}>
                                        <EditableText elementId="contact_success_message" defaultText="En menos de 12 horas hábiles, uno de nuestros consultores se comunicará contigo para coordinar una reunión." tag="span" />
                                    </p>
                                    <button onClick={() => setIsSubmitted(false)} className="text-white font-semibold px-8 py-3 rounded-lg transition-all" style={{ background: `linear-gradient(to right, ${s.contactButtonBackground}, ${s.contactButtonHoverBackground})`, fontSize: contactButtonClamp }}>
                                        <EditableText elementId="contact_success_button" defaultText="Enviar otro mensaje" tag="span" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold mb-8" style={{ color: s.contactTitleColor, fontSize: contactTitleClamp }}>
                                        <EditableText elementId="contact_form_title" defaultText="Solicita una reunión de diagnóstico" tag="span" />
                                    </h3>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium mb-2" style={{ color: s.contactTextColor, fontSize: contactLabelClamp }}>
                                                    <EditableText elementId="contact_label_name" defaultText="Nombre completo *" tag="span" />
                                                </label>
                                                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                    style={{ backgroundColor: s.contactInputBackground, border: `1px solid ${s.contactInputBorder}`, color: s.contactInputTextColor, fontSize: contactTextClamp }}
                                                    placeholder="Tu nombre" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2" style={{ color: s.contactTextColor, fontSize: contactLabelClamp }}>
                                                    <EditableText elementId="contact_label_email" defaultText="Email corporativo *" tag="span" />
                                                </label>
                                                <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                    style={{ backgroundColor: s.contactInputBackground, border: `1px solid ${s.contactInputBorder}`, color: s.contactInputTextColor, fontSize: contactTextClamp }}
                                                    placeholder="nombre@empresa.com" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-6">
                                            <div className="text-sm" style={{ color: s.contactTextColor, fontSize: contactLabelClamp }}>
                                                * <EditableText elementId="contact_required" defaultText="Campos obligatorios" tag="span" />
                                            </div>
                                            <button type="submit" disabled={isSubmitting}
                                                className="text-white font-semibold px-8 py-4 rounded-lg transition-all disabled:opacity-50 flex items-center"
                                                style={{ backgroundColor: s.contactButtonBackground, color: s.contactButtonText, fontSize: contactButtonClamp }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = s.contactButtonHoverBackground}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = s.contactButtonBackground}>
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