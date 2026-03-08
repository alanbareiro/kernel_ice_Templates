import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de envío
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
      
      // Resetear mensaje después de 5 segundos
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      content: 'contacto@kernelize.com',
      href: 'mailto:contacto@kernelize.com',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Teléfono',
      content: '+54 9 11 6745-7413',
      href: 'tel:+5491167457413',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Ubicación',
      content: 'Buenos Aires, Argentina',
      href: '#',
    },
  ];

  return (
    <section id="contact" className="section-padding bg-neutral-50 dark:bg-neutral-950">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 mb-6">
            Transforma tu negocio{' '}
            <span className="text-gradient">hoy mismo</span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Solicita una consulta gratuita y recibe una propuesta personalizada.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Información de contacto */}
          <div className="space-y-8">
            <div>
              <h3 className="heading-3 mb-6 text-neutral-900 dark:text-white">
                Información de contacto
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                Estamos aquí para ayudarte. Contáctanos por cualquier medio y te responderemos 
                en menos de 24 horas hábiles.
              </p>
            </div>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-primary-500 dark:hover:border-primary-500 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white group-hover:text-primary-500 transition-colors">
                      {info.title}
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                      {info.content}
                    </p>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Horario de atención */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white">
              <h4 className="font-semibold text-lg mb-2">Horario de atención</h4>
              <p className="text-sm opacity-90">Lunes a Viernes: 9:00 - 18:00 hs</p>
              <p className="text-sm opacity-90">Sábados: 10:00 - 14:00 hs</p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-sm">Respuesta garantizada en 24 horas</p>
              </div>
            </div>
          </div>
          
          {/* Formulario */}
          <div className="lg:col-span-2">
            <div className="card">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                    ¡Mensaje enviado con éxito!
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                    Te contactaremos en menos de 24 horas hábiles. Mientras tanto, 
                    puedes explorar nuestros casos de éxito.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-primary"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="heading-3 mb-8 text-neutral-900 dark:text-white">
                    Solicita tu consulta gratuita
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          placeholder="Tu nombre"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          placeholder="ejemplo@email.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          placeholder="+54 9 11 1234-5678"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Empresa
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          placeholder="Nombre de tu empresa"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        ¿En qué podemos ayudarte? *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                        placeholder="Cuéntanos sobre tu proyecto, objetivos y necesidades..."
                      />
                    </div>
                    
                    <div className="flex items-center justify-between pt-6">
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        * Campos obligatorios
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-accent flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          'Enviando...'
                        ) : (
                          <>
                            Enviar mensaje
                            <Send className="ml-2 w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                    
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 text-center">
                      Al enviar este formulario, aceptas nuestra política de privacidad y recibir 
                      información relevante sobre nuestros servicios.
                    </p>
                  </form>
                </>
              )}
            </div>
            
            {/* Información adicional */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                <h4 className="font-semibold mb-1">Respuesta rápida</h4>
                <p className="text-sm opacity-90">Te contactamos en 24 horas hábiles</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white">
                <h4 className="font-semibold mb-1">Sin compromiso</h4>
                <p className="text-sm opacity-90">Consulta y cotización gratuita</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;