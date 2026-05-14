import { Award, BarChart, Briefcase, Calendar, CheckCircle, Clock, Eye, Globe, Heart, LineChart, Mail, MapPin, MessageCircle, Phone, Send, Star, Target, ThumbsUp, TrendingUp, Users, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

const iconMap: Record<string, any> = {
    Mail, MapPin, Phone, Briefcase, CheckCircle, MessageCircle, Globe, Clock, Calendar,
    TrendingUp, Users, Target, Award, BarChart, LineChart, Heart, ThumbsUp, Zap, Eye, Star
};

// Valores por defecto (coinciden con los defaultItems de la configuración)
const DEFAULT_CONTACT_CARDS = [
    { id: 'default_card_1', icon: 'Mail', title: 'Email', content: 'consultoria@kernelize.com', href: 'mailto:consultoria@kernelize.com', visible: true },
    { id: 'default_card_2', icon: 'Phone', title: 'Teléfono', content: '+54 9 11 6745-7413', href: 'tel:+5491167457413', visible: true },
    { id: 'default_card_3', icon: 'MapPin', title: 'Ubicación', content: 'Buenos Aires, Argentina', href: '#', visible: true }
];

const DEFAULT_HOUR_BLOCKS = [
    {
        id: 'default_hour_1',
        icon: 'Clock',
        title: 'Horario de atención',
        line1: 'Lunes a Viernes: 9:00 - 19:00 hs',
        line2: 'Sábados: Reuniones programadas',
        note: 'Respuesta garantizada en 12 horas hábiles',
        visible: true
    }
];

const ConsultingContact = () => {
    const { template } = useTemplate();
    const [contactCards, setContactCards] = useState(DEFAULT_CONTACT_CARDS);
    const [hourBlocks, setHourBlocks] = useState(DEFAULT_HOUR_BLOCKS);

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

    // Cargar tarjetas de contacto desde template.texts['contact_card_']
    useEffect(() => {
        const stored = template?.texts?.['contact_card_'];
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setContactCards(parsed);
                    return;
                }
            } catch (e) {
                console.error('Error parsing contact cards:', e);
            }
        }
        setContactCards(DEFAULT_CONTACT_CARDS);
    }, [template?.texts]);

    // Cargar bloques de horario desde template.texts['contact_hour_']
    useEffect(() => {
        const stored = template?.texts?.['contact_hour_'];
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setHourBlocks(parsed);
                    return;
                }
            } catch (e) {
                console.error('Error parsing hour blocks:', e);
            }
        }
        setHourBlocks(DEFAULT_HOUR_BLOCKS);
    }, [template?.texts]);

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

                        {/* Tarjetas de contacto dinámicas */}
                        <div className="space-y-6">
                            {contactCards.map((card, idx) => {
                                if (card.visible === false) return null;
                                return (
                                    <a key={card.id || idx} href={card.href} target="_blank" rel="noopener noreferrer"
                                        className="flex items-start space-x-4 p-4 rounded-xl transition-colors group"
                                        style={{ backgroundColor: s.contactFormBackground, border: `1px solid ${s.contactFormBorder}` }}>
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
                                            style={{ backgroundColor: `${s.contactButtonBackground}20`, color: s.contactButtonBackground }}>
                                            {getIcon(card.icon)}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold group-hover:text-blue-600 transition-colors"
                                                style={{ color: s.contactTitleColor, fontSize: contactCardTitleClamp }}>
                                                {card.title}
                                            </h4>
                                            <p className="mt-1" style={{ color: s.contactTextColor, fontSize: contactTextClamp }}>
                                                {card.content}
                                            </p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Bloques de horario dinámicos */}
                        <div className="space-y-4">
                            {hourBlocks.map((block, idx) => {
                                if (block.visible === false) return null;
                                const Icon = iconMap[block.icon] || Clock;
                                return (
                                    <div key={block.id || idx} className="p-6 rounded-2xl text-white"
                                        style={{ background: `linear-gradient(135deg, ${s.contactButtonBackground}, ${s.contactButtonHoverBackground})` }}>
                                        <h4 className="font-semibold text-lg mb-2 flex items-center" style={{ fontSize: contactTitleClamp }}>
                                            <Icon className="w-5 h-5 mr-2" />
                                            {block.title}
                                        </h4>
                                        <p className="text-sm opacity-90" style={{ fontSize: contactTextClamp }}>
                                            {block.line1}
                                        </p>
                                        <p className="text-sm opacity-90" style={{ fontSize: contactTextClamp }}>
                                            {block.line2}
                                        </p>
                                        {block.note && (
                                            <div className="mt-4 pt-4 border-t border-white/20">
                                                <p className="text-sm" style={{ fontSize: contactTextClamp }}>
                                                    {block.note}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Formulario (sin cambios) */}
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