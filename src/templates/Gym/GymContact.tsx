import { CheckCircle, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const GymContact: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#ea580c',
        secondary: '#c2410c',
        accent: '#9a3412',
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
        <section id="contact" className="section-padding bg-black text-white">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <EditableText elementId="gm_contact_title_1" defaultText="Contactanos y" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="gm_contact_title_2" defaultText="empezá hoy" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400">
                        <EditableText elementId="gm_contact_description" defaultText="Dejanos tus datos y te contactaremos para coordinar una clase de prueba gratis." tag="span" />
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Info */}
                    <div className="space-y-6">
                        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                            <h3 className="text-xl font-bold mb-4 text-white"><EditableText elementId="gm_contact_info_title" defaultText="Información" tag="span" /></h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3"><Phone className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} /><div><p className="text-gray-300"><EditableText elementId="gm_contact_phone" defaultText="+54 11 5678-9012" tag="span" /></p></div></div>
                                <div className="flex items-start space-x-3"><Mail className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} /><div><p className="text-gray-300"><EditableText elementId="gm_contact_email" defaultText="gym@kernelize.com" tag="span" /></p></div></div>
                                <div className="flex items-start space-x-3"><MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} /><div><p className="text-gray-300"><EditableText elementId="gm_contact_address" defaultText="Av. Cabildo 2345, Belgrano" tag="span" /></p></div></div>
                                <div className="flex items-start space-x-3"><Clock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} /><div><p className="text-gray-300"><EditableText elementId="gm_contact_hours" defaultText="Lun-Vie 7:00 - 23:00 / Sáb 9:00 - 20:00" tag="span" /></p></div></div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4"><EditableText elementId="gm_success_title" defaultText="¡Consulta enviada!" tag="span" /></h3>
                                    <p className="text-gray-400 mb-8"><EditableText elementId="gm_success_message" defaultText="Te contactaremos en las próximas 24 horas para coordinar tu clase de prueba." tag="span" /></p>
                                    <button onClick={() => setIsSubmitted(false)} className="text-white font-semibold px-8 py-3 rounded-lg" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                        <EditableText elementId="gm_success_button" defaultText="Enviar otro mensaje" tag="span" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold mb-6 text-white"><EditableText elementId="gm_form_title" defaultText="Clase de prueba gratis" tag="span" /></h3>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div><label className="block text-sm font-medium mb-1 text-gray-400"><EditableText elementId="gm_form_name" defaultText="Nombre *" tag="span" /></label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 text-white" style={{ '--tw-ring-color': colors.primary } as any} /></div>
                                            <div><label className="block text-sm font-medium mb-1 text-gray-400"><EditableText elementId="gm_form_email" defaultText="Email *" tag="span" /></label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 text-white" style={{ '--tw-ring-color': colors.primary } as any} /></div>
                                        </div>
                                        <div><label className="block text-sm font-medium mb-1 text-gray-400"><EditableText elementId="gm_form_phone" defaultText="Teléfono *" tag="span" /></label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 text-white" style={{ '--tw-ring-color': colors.primary } as any} /></div>
                                        <div><label className="block text-sm font-medium mb-1 text-gray-400"><EditableText elementId="gm_form_message" defaultText="Mensaje" tag="span" /></label><textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 text-white resize-none" style={{ '--tw-ring-color': colors.primary } as any} placeholder="¿Qué objetivo tenés?" /></div>
                                        <div className="pt-4">
                                            <button type="submit" disabled={isSubmitting} className="w-full text-white font-semibold py-3 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                                {isSubmitting ? <EditableText elementId="gm_form_sending" defaultText="Enviando..." tag="span" /> : <><EditableText elementId="gm_form_submit" defaultText="Quiero mi clase gratis" tag="span" /><Send className="ml-2 w-4 h-4" /></>}
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

export default GymContact;