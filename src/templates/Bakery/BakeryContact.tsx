import { CheckCircle, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const BakeryContact: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#e11d48',
        secondary: '#be123c',
        accent: '#9f1239',
    };

    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    return (
        <section id="contact" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-rose-900 dark:text-rose-100">
                        <EditableText elementId="bk_contact_title_1" defaultText="Hacé tu" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="bk_contact_title_2" defaultText="pedido" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-rose-700 dark:text-rose-300">
                        <EditableText elementId="bk_contact_description" defaultText="Pedinos por teléfono, WhatsApp o dejános tu consulta. Respondemos en el día." tag="span" />
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Info */}
                    <div className="space-y-6">
                        <div className="bg-rose-50 dark:bg-rose-900/30 rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-rose-900 dark:text-rose-100"><EditableText elementId="bk_contact_info_title" defaultText="Contacto" tag="span" /></h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3"><Phone className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} /><div><p className="text-rose-700 dark:text-rose-300"><EditableText elementId="bk_contact_phone" defaultText="+54 11 4567-8900" tag="span" /></p></div></div>
                                <div className="flex items-start space-x-3"><Mail className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} /><div><p className="text-rose-700 dark:text-rose-300"><EditableText elementId="bk_contact_email" defaultText="pan@kernelize.com" tag="span" /></p></div></div>
                                <div className="flex items-start space-x-3"><MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} /><div><p className="text-rose-700 dark:text-rose-300"><EditableText elementId="bk_contact_address" defaultText="Av. Rivadavia 4567, Almagro" tag="span" /></p></div></div>
                                <div className="flex items-start space-x-3"><Clock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} /><div><p className="text-rose-700 dark:text-rose-300"><EditableText elementId="bk_contact_hours" defaultText="Lun-Dom 7:00 - 20:00" tag="span" /></p></div></div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-rose-50 dark:bg-rose-900/30 rounded-2xl p-8">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-rose-900 dark:text-rose-100 mb-4"><EditableText elementId="bk_success_title" defaultText="¡Consulta enviada!" tag="span" /></h3>
                                    <p className="text-rose-700 dark:text-rose-300 mb-8"><EditableText elementId="bk_success_message" defaultText="Te contactaremos a la brevedad." tag="span" /></p>
                                    <button onClick={() => setIsSubmitted(false)} className="text-white font-semibold px-8 py-3 rounded-lg" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                        <EditableText elementId="bk_success_button" defaultText="Enviar otro mensaje" tag="span" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold mb-6 text-rose-900 dark:text-rose-100"><EditableText elementId="bk_form_title" defaultText="Dejanos tu consulta" tag="span" /></h3>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div><label className="block text-sm font-medium mb-1"><EditableText elementId="bk_form_name" defaultText="Nombre *" tag="span" /></label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-rose-800" style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any} /></div>
                                            <div><label className="block text-sm font-medium mb-1"><EditableText elementId="bk_form_email" defaultText="Email *" tag="span" /></label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-rose-800" style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any} /></div>
                                        </div>
                                        <div><label className="block text-sm font-medium mb-1"><EditableText elementId="bk_form_phone" defaultText="Teléfono" tag="span" /></label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-rose-800" style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any} /></div>
                                        <div><label className="block text-sm font-medium mb-1"><EditableText elementId="bk_form_message" defaultText="Mensaje *" tag="span" /></label><textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-rose-800 resize-none" style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any} placeholder="¿Qué te gustaría pedir?" /></div>
                                        <div className="pt-4">
                                            <button type="submit" disabled={isSubmitting} className="w-full text-white font-semibold py-3 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                                {isSubmitting ? <EditableText elementId="bk_form_sending" defaultText="Enviando..." tag="span" /> : <><EditableText elementId="bk_form_submit" defaultText="Enviar mensaje" tag="span" /><Send className="ml-2 w-4 h-4" /></>}
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

export default BakeryContact;