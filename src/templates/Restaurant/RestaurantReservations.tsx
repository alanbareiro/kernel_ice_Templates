// src/templates/Restaurant/RestaurantReservations.tsx
import { Calendar, CheckCircle, Clock, Mail, Phone, Send, Users } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors, defaultTypography } from '../../types/template.types';

const RestaurantReservations = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const typography = template?.typography || defaultTypography;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        occasion: '',
        specialRequests: '',
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

            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    const occasions = [
        'Cena romántica',
        'Cumpleaños',
        'Aniversario',
        'Reunión de negocios',
        'Celebración familiar',
        'Otro',
    ];

    const timeSlots = [
        '12:00', '12:30', '13:00', '13:30', '14:00',
        '20:00', '20:30', '21:00', '21:30', '22:00',
    ];

    return (
        <section
            id="reservations"
            className="section-padding text-white"
            style={{ background: `linear-gradient(135deg, ${sectionColors.footerBackground}, ${sectionColors.footerBackground})` }}
        >
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2
                        className="font-bold mb-6"
                        style={{
                            fontSize: typography.sectionTitleSize
                        }}
                    >
                        <EditableText
                            elementId="r_reservations_title_1"
                            defaultText="Reservá tu"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText
                                elementId="r_reservations_title_2"
                                defaultText="mesa"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl" style={{ color: sectionColors.footerTextColor }}>
                        <EditableText
                            elementId="r_reservations_description"
                            defaultText="Asegurá tu lugar para disfrutar de una experiencia única. Reservá con anticipación para evitar contratiempos."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Información */}
                    <div className="space-y-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4">
                                <EditableText
                                    elementId="r_reservations_hours_title"
                                    defaultText="Horarios"
                                    tag="span"
                                />
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>
                                        <EditableText
                                            elementId="r_reservations_tue_thu"
                                            defaultText="Martes a Jueves"
                                            tag="span"
                                        />
                                    </span>
                                    <span className="font-semibold">
                                        <EditableText
                                            elementId="r_reservations_tue_thu_hours"
                                            defaultText="12:00 - 00:00"
                                            tag="span"
                                        />
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>
                                        <EditableText
                                            elementId="r_reservations_fri_sat"
                                            defaultText="Viernes y Sábados"
                                            tag="span"
                                        />
                                    </span>
                                    <span className="font-semibold">
                                        <EditableText
                                            elementId="r_reservations_fri_sat_hours"
                                            defaultText="12:00 - 01:00"
                                            tag="span"
                                        />
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>
                                        <EditableText
                                            elementId="r_reservations_sun"
                                            defaultText="Domingos"
                                            tag="span"
                                        />
                                    </span>
                                    <span className="font-semibold">
                                        <EditableText
                                            elementId="r_reservations_sun_hours"
                                            defaultText="12:00 - 23:00"
                                            tag="span"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4">
                                <EditableText
                                    elementId="r_quick_contact_title"
                                    defaultText="Contacto rápido"
                                    tag="span"
                                />
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                    <span>
                                        <EditableText
                                            elementId="r_quick_contact_phone"
                                            defaultText="+54 9 11 6745-7413"
                                            tag="span"
                                        />
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                    <span>
                                        <EditableText
                                            elementId="r_quick_contact_email"
                                            defaultText="reservas@kernelizeresto.com"
                                            tag="span"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-2">
                                <EditableText
                                    elementId="r_policy_title"
                                    defaultText="Política de reservas"
                                    tag="span"
                                />
                            </h3>
                            <p className="text-sm" style={{ color: sectionColors.footerTextColor }}>
                                <EditableText
                                    elementId="r_policy_text"
                                    defaultText="Las reservas se mantienen por 15 minutos pasada la hora. Para grupos de más de 8 personas, por favor contactanos directamente."
                                    tag="span"
                                />
                            </p>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-red-900 rounded-2xl p-8 shadow-2xl">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div
                                        className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                                        style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                    >
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-red-900 dark:text-white">
                                        <EditableText
                                            elementId="r_success_title"
                                            defaultText="¡Reserva confirmada!"
                                            tag="span"
                                        />
                                    </h3>
                                    <p className="text-red-700 dark:text-red-300 mb-8">
                                        <EditableText
                                            elementId="r_success_message"
                                            defaultText="Te enviamos un email con los detalles de tu reserva. Te esperamos!"
                                            tag="span"
                                        />
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-white font-semibold px-8 py-3 rounded-full transition-all"
                                        style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                    >
                                        <EditableText
                                            elementId="r_success_button"
                                            defaultText="Nueva reserva"
                                            tag="span"
                                        />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold mb-8 text-red-900 dark:text-white">
                                        <EditableText
                                            elementId="r_form_title"
                                            defaultText="Completá tus datos"
                                            tag="span"
                                        />
                                    </h3>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                                                    <EditableText
                                                        elementId="r_form_name"
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
                                                    className="w-full px-4 py-3 bg-red-50 dark:bg-red-800 border border-red-200 dark:border-red-700 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                    style={{
                                                        '--tw-ring-color': sectionColors.buttonPrimaryBackground,
                                                        outlineColor: sectionColors.buttonPrimaryBackground
                                                    } as React.CSSProperties}
                                                    placeholder="Tu nombre"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                                                    <EditableText
                                                        elementId="r_form_email"
                                                        defaultText="Email *"
                                                        tag="span"
                                                    />
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-red-50 dark:bg-red-800 border border-red-200 dark:border-red-700 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                    placeholder="tu@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                                                <EditableText
                                                    elementId="r_form_phone"
                                                    defaultText="Teléfono *"
                                                    tag="span"
                                                />
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-red-50 dark:bg-red-800 border border-red-200 dark:border-red-700 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                placeholder="+54 9 11 1234-5678"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                                                    <Calendar className="w-4 h-4 inline mr-1" />
                                                    <EditableText
                                                        elementId="r_form_date"
                                                        defaultText="Fecha *"
                                                        tag="span"
                                                    />
                                                </label>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-red-50 dark:bg-red-800 border border-red-200 dark:border-red-700 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                                                    <Clock className="w-4 h-4 inline mr-1" />
                                                    <EditableText
                                                        elementId="r_form_time"
                                                        defaultText="Hora *"
                                                        tag="span"
                                                    />
                                                </label>
                                                <select
                                                    name="time"
                                                    value={formData.time}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-red-50 dark:bg-red-800 border border-red-200 dark:border-red-700 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                >
                                                    <option value="">Seleccioná hora</option>
                                                    {timeSlots.map((time) => (
                                                        <option key={time} value={time}>{time}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                                                    <Users className="w-4 h-4 inline mr-1" />
                                                    <EditableText
                                                        elementId="r_form_guests"
                                                        defaultText="Personas *"
                                                        tag="span"
                                                    />
                                                </label>
                                                <select
                                                    name="guests"
                                                    value={formData.guests}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-red-50 dark:bg-red-800 border border-red-200 dark:border-red-700 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                >
                                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                        <option key={num} value={num}>{num} {num === 1 ? 'persona' : 'personas'}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                                                <EditableText
                                                    elementId="r_form_occasion"
                                                    defaultText="Ocasión especial"
                                                    tag="span"
                                                />
                                            </label>
                                            <select
                                                name="occasion"
                                                value={formData.occasion}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-red-50 dark:bg-red-800 border border-red-200 dark:border-red-700 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                            >
                                                <option value="">Seleccioná (opcional)</option>
                                                {occasions.map((occ) => (
                                                    <option key={occ} value={occ}>{occ}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                                                <EditableText
                                                    elementId="r_form_special"
                                                    defaultText="Pedidos especiales"
                                                    tag="span"
                                                />
                                            </label>
                                            <textarea
                                                name="specialRequests"
                                                value={formData.specialRequests}
                                                onChange={handleChange}
                                                rows={3}
                                                className="w-full px-4 py-3 bg-red-50 dark:bg-red-800 border border-red-200 dark:border-red-700 rounded-lg focus:outline-none focus:ring-2 transition-all resize-none"
                                                placeholder="Alergias, preferencias, celebraciones..."
                                            />
                                        </div>

                                        <div className="pt-6">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full text-white font-semibold px-8 py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
                                                style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                            >
                                                {isSubmitting ? (
                                                    <EditableText
                                                        elementId="r_form_sending"
                                                        defaultText="Procesando..."
                                                        tag="span"
                                                    />
                                                ) : (
                                                    <>
                                                        <EditableText
                                                            elementId="r_form_submit"
                                                            defaultText="Confirmar reserva"
                                                            tag="span"
                                                        />
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

export default RestaurantReservations;