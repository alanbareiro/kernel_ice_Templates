import React from 'react';
import { 
  Zap, 
  Smartphone, 
  Search, 
  Shield, 
  Rocket, 
  BarChart 
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Rendimiento óptimo',
      description: 'Carga en menos de 2 segundos, optimizada para Core Web Vitals.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: '100% Responsive',
      description: 'Se adapta perfectamente a cualquier dispositivo móvil o desktop.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'SEO optimizado',
      description: 'Estructura semántica y meta tags para mejor posicionamiento.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Seguridad avanzada',
      description: 'HTTPS, protección contra ataques y backup automático.',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Entrega rápida',
      description: 'Tu landing page lista en 5-10 días hábiles.',
      color: 'from-purple-500 to-violet-500',
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: 'Analytics integrado',
      description: 'Panel con métricas de conversión y comportamiento.',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  return (
    <section className="section-padding bg-neutral-50 dark:bg-neutral-950">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 mb-6">
            Todo lo que necesitas en{' '}
            <span className="text-gradient">una landing page</span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Características diseñadas para maximizar conversiones y ofrecer la mejor experiencia.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card group">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} p-0.5 mb-6`}>
                <div className="w-full h-full rounded-xl bg-white dark:bg-neutral-900 flex items-center justify-center">
                  <div className={`bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                    {feature.icon}
                  </div>
                </div>
              </div>
              
              <h3 className="heading-3 mb-3 text-neutral-900 dark:text-white">
                {feature.title}
              </h3>
              
              <p className="text-neutral-600 dark:text-neutral-400">
                {feature.description}
              </p>
              
              <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <span className="inline-flex items-center text-sm font-medium text-primary-500">
                  Incluido
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA adicional */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg">
            <div className="text-left">
              <p className="font-semibold text-neutral-900 dark:text-white">
                ¿Necesitas algo personalizado?
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Podemos agregar módulos específicos para tu negocio.
              </p>
            </div>
            <button className="btn-primary whitespace-nowrap">
              Personalizar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;