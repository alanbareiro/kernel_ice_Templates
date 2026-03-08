import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'María González',
      role: 'CEO - Consultora Digital',
      content: 'La landing page que desarrolló Kernelize superó todas nuestras expectativas. En solo 2 semanas duplicamos nuestros leads.',
      rating: 5,
      image: 'MG',
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Director - RetailTech',
      content: 'Profesionalismo y resultados. Nuestra conversión aumentó un 40% desde el lanzamiento. ¡Altamente recomendados!',
      rating: 5,
      image: 'CR',
    },
    {
      name: 'Ana Martínez',
      role: 'Fundadora - EcoProducts',
      content: 'El equipo entendió perfectamente nuestra visión. La página no solo es hermosa, sino que también convierte.',
      rating: 5,
      image: 'AM',
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 mb-6">
            <Quote className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="heading-2 mb-6">
            Lo que dicen nuestros{' '}
            <span className="text-gradient">clientes</span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Casos de éxito y testimonios reales de empresas que transformaron su presencia digital.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative">
              <div className="card bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm h-full">
                {/* Rating */}
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Contenido */}
                <p className="text-lg text-neutral-700 dark:text-neutral-300 italic mb-8">
                  "{testimonial.content}"
                </p>
                
                {/* Autor */}
                <div className="flex items-center pt-6 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
                    {testimonial.image}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-neutral-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decoración */}
              <div className={`absolute -z-10 w-32 h-32 rounded-full blur-3xl opacity-30 ${
                index === 0 ? 'bg-primary-400 -top-8 -left-8' :
                index === 1 ? 'bg-accent-400 -top-8 -right-8' :
                'bg-gradient-to-r from-primary-400 to-accent-400 -bottom-8 -left-8'
              }`} />
            </div>
          ))}
        </div>
        
        {/* Indicadores de confianza */}
        <div className="mt-16 pt-16 border-t border-neutral-200 dark:border-neutral-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '24/7', label: 'Soporte disponible' },
              { value: '15 días', label: 'Garantía de satisfacción' },
              { value: '100%', label: 'Propiedad del código' },
              { value: '30 días', label: 'Entrega máxima' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">
                  {item.value}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;