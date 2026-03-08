import { CheckCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const DigitalContact: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#0891b2',
        secondary: '#0e7490',
        accent: '#155e75',
    };

    const [formData, setFormData] = useState({ name: '', email: '', phone: '', project: '', budget: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    const projectTypes = ['Web', 'App', 'Branding', 'Marketing Digital', 'E-commerce', 'Otro'];
    const budgets = ['Menos de $1000', '$1000 - $5000', '$5000 - $10000', 'Más de $10000'];

    return (
        <section id="contact" className="section-padding bg-white dark:bg-neutral-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-900 dark:text-cyan-100">
                        <EditableText elementId="di_contact_title_1" defaultText="Hablemos de tu" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="di_contact_title_2" defaultText="proyecto" tag="span" />
                        </span>
                    </h2>
                    <p className="text-xl text-cyan-700 dark:text-cyan-300">
                        <EditableText elementId="di_contact_description" defaultText="Contanos tu idea y te enviaremos un presupuesto sin cargo." tag="span" />
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Info */}
                    <div className="space-y-6">
                        <div className="bg-cyan-50 dark:bg-cyan-900/30 rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-cyan-900 dark:text-cyan-100"><EditableText elementId="di_contact_info_title" defaultText="Información" tag="span" /></h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3"><Phone className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} /><div><p className="text-cyan-700 dark:text-cyan-300"><EditableText elementId="di_contact_phone" defaultText="+54 11 5678-9012" tag="span" /></p></div></div>
                                <div className="flex items-start space-x-3"><Mail className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} /><div><p className="text-cyan-700 dark:text-cyan-300"><EditableText elementId="di_contact_email" defaultText="digital@kernelize.com" tag="span" /></p></div></div>
                                <div className="flex items-start space-x-3"><MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} /><div><p className="text-cyan-700 dark:text-cyan-300"><EditableText elementId="di_contact_address" defaultText="Av. Corrientes 1234, CABA" tag="span" /></p></div></div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-cyan-50 dark:bg-cyan-900/30 rounded-2xl p-8">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-cyan-900 dark:text-cyan-100 mb-4"><EditableText elementId="di_success_title" defaultText="¡Mensaje enviado!" tag="span" /></h3>
                                    <p className="text-cyan-700 dark:text-cyan-300 mb-8"><EditableText elementId="di_success_message" defaultText="Te contactaremos en las próximas 24 horas." tag="span" /></p>
                                    <button onClick={() => setIsSubmitted(false)} className="text-white font-semibold px-8 py-3 rounded-lg" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                        <EditableText elementId="di_success_button" defaultText="Enviar otro mensaje" tag="span" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold mb-6 text-cyan-900 dark:text-cyan-100"><EditableText elementId="di_form_title" defaultText="Contanos tu idea" tag="span" /></h3>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div><label className="block text-sm font-medium mb-1"><EditableText elementId="di_form_name" defaultText="Nombre *" tag="span" /></label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-cyan-800" style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any} /></div>
                                            <div><label className="block text-sm font-medium mb-1"><EditableText elementId="di_form_email" defaultText="Email *" tag="span" /></label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-cyan-800" style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any} /></div>
                                        </div>
                                        <div><label className="block text-sm font-medium mb-1"><EditableText elementId="di_form_phone" defaultText="Teléfono" tag="span" /></label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-cyan-800" style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any} /></div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div><label className="block text-sm font-medium mb-1"><EditableText elementId="di_form_project" defaultText="Tipo de proyecto *" tag="span" /></label><select name="project" value={formData.project} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-cyan-800" style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any}><option value="">Seleccioná</option>{projectTypes.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                                            <div><label className="block text-sm font-medium mb-1"><EditableText elementId="di_form_budget" defaultText="Presupuesto" tag="span" /></label><select name="budget" value={formData.budget} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-cyan-800" style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any}><option value="">Seleccioná</option>{budgets.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
                                        </div>
                                        <div><label className="block text-sm font-medium mb-1"><EditableText elementId="di_form_message" defaultText="Mensaje *" tag="span" /></label><textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-cyan-800 resize-none" style={{ borderColor: `${colors.primary}30`, '--tw-ring-color': colors.primary } as any} placeholder="Contanos tu proyecto..." /></div>
                                        <div className="pt-4">
                                            <button type="submit" disabled={isSubmitting} className="w-full text-white font-semibold py-3 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                                {isSubmitting ? <EditableText elementId="di_form_sending" defaultText="Enviando..." tag="span" /> : <><EditableText elementId="di_form_submit" defaultText="Enviar mensaje" tag="span" /><Send className="ml-2 w-4 h-4" /></>}
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

export default DigitalContact;