import { CheckCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const FoodTruckContact: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#e67e22',
        secondary: '#d35400',
        accent: '#a04000',
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
        <section id="contact" className="section-padding bg-orange-50 dark:bg-orange-950" >
            <div className="container-custom" >
                <div className="text-center max-w-3xl mx-auto mb-16" >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-orange-900 dark:text-orange-100" >
                        <EditableText elementId="ft_contact_title_1" defaultText="Contactanos o" tag="span" /> {' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                            <EditableText elementId="ft_contact_title_2" defaultText="seguinos" tag="span" />
                        </span>
                    </h2>
                    < p className="text-xl text-orange-700 dark:text-orange-300" >
                        <EditableText elementId="ft_contact_description" defaultText="Estamos siempre en movimiento. Seguinos en IG para saber dónde estamos hoy." tag="span" />
                    </p>
                </div>

                < div className="grid lg:grid-cols-3 gap-8" >
                    {/* Info */}
                    < div className="space-y-6" >
                        <div className="bg-white dark:bg-orange-900/30 rounded-2xl p-6" >
                            <h3 className="text-xl font-bold mb-4 text-orange-900 dark:text-orange-100" > <EditableText elementId="ft_contact_info_title" defaultText="Contacto" tag="span" /> </h3>
                            < div className="space-y-4" >
                                <div className="flex items-start space-x-3" > <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} /><div><p className="text-orange-700 dark:text-orange-300"><EditableText elementId="ft_contact_phone" defaultText="+54 11 5678-9012" tag="span" /> </p></div > </div>
                                < div className="flex items-start space-x-3" > <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} /><div><p className="text-orange-700 dark:text-orange-300"><EditableText elementId="ft_contact_email" defaultText="foodtruck@kernelize.com" tag="span" /> </p></div > </div>
                                < div className="flex items-start space-x-3" > <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} /><div><p className="text-orange-700 dark:text-orange-300"><EditableText elementId="ft_contact_ig" defaultText="@kernelize.foodtruck" tag="span" /> </p></div > </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2" >
                        <div className="bg-white dark:bg-orange-900/30 rounded-2xl p-8" >
                            {
                                isSubmitted ? (
                                    <div className="text-center py-12" >
                                        <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{
                                            background: `linear-gradient(to right, ${colors.primary
                                                }, ${colors.accent})`
                                        }}>
                                            <CheckCircle className="w-10 h-10 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-100 mb-4"><EditableText elementId="ft_success_title" defaultText="¡Mensaje enviado!" tag="span" /></h3>
                                        <p className="text-orange-700 dark:text-orange-300 mb-8"><EditableText elementId="ft_success_message" defaultText="Te responderemos a la brevedad." tag="span" /></p>
                                        <button onClick={() => setIsSubmitted(false)} className="text-white font-semibold px-8 py-3 rounded-lg" style={{ background: `linear - gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                            <EditableText elementId="ft_success_button" defaultText="Enviar otro mensaje" tag="span" />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-2xl font-bold mb-6 text-orange-900 dark:text-orange-100"><EditableText elementId="ft_form_title" defaultText="Escribinos" tag="span" /></h3>
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div><label className="block text-sm font-medium mb-1"><EditableText elementId="ft_form_name" defaultText="Nombre *" tag="span" /></label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-orange-800" style={{ borderColor: `${colors.primary} 30`, '--tw-ring-color': colors.primary } as any} /></div>
                                                <div><label className="block text-sm font-medium mb-1"><EditableText elementId="ft_form_email" defaultText="Email *" tag="span" /></label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-orange-800" style={{ borderColor: `${colors.primary} 30`, '--tw-ring-color': colors.primary } as any} /></div>
                                            </div>
                                            <div><label className="block text-sm font-medium mb-1"><EditableText elementId="ft_form_phone" defaultText="Teléfono" tag="span" /></label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-orange-800" style={{ borderColor: `${colors.primary} 30`, '--tw-ring-color': colors.primary } as any} /></div>
                                            <div><label className="block text-sm font-medium mb-1"><EditableText elementId="ft_form_message" defaultText="Mensaje *" tag="span" /></label><textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-orange-800 resize-none" style={{ borderColor: `${colors.primary} 30`, '--tw-ring-color': colors.primary } as any} placeholder="¿Qué te gustaría saber?" /></div>
                                            <div className="pt-4">
                                                <button type="submit" disabled={isSubmitting} className="w-full text-white font-semibold py-3 rounded-lg flex items-center justify-center" style={{ background: `linear - gradient(to right, ${colors.primary}, ${colors.accent})` }}>
                                                    {isSubmitting ? <EditableText elementId="ft_form_sending" defaultText="Enviando..." tag="span" /> : <><EditableText elementId="ft_form_submit" defaultText="Enviar mensaje" tag="span" /><Send className="ml-2 w-4 h-4" /></>}
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

export default FoodTruckContact;