import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="section-padding gradient-bg">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido izquierdo */}
          <div className="space-y-8">
            <div>


              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
                <CheckCircle className="w-4 h-4 mr-2" />
                Soluciones Digitales para Negocios
              </span>

              <h1 className="heading-1">
                Potencia tu negocio con una{' '}
                <span className="text-gradient">página web que convierte</span>
              </h1>

              <p className="text-xl text-neutral-600 dark:text-neutral-400 mt-6 max-w-2xl">
                Creamos experiencias digitales diseñadas para generar más clientes y aumentar
                tus ventas. Perfecta para empresas que buscan destacar en línea.
              </p>

              {/* <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
                <CheckCircle className="w-4 h-4 mr-2" />
                Template 01 - Landing Page Digital
              </span>
              
              <h1 className="heading-1">
                Transforma tu{' '}
                <span className="text-gradient">presencia digital</span>{' '}
                con soluciones a medida
              </h1>
              
              <p className="text-xl text-neutral-600 dark:text-neutral-400 mt-6 max-w-2xl">
                Desarrollamos landing pages de alto impacto que convierten visitantes en clientes. 
                Optimizadas para SEO, responsive y diseñadas para resultados.
              </p> */}
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-accent flex items-center justify-center group">
                  Solicitar cotización
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="btn-secondary">
                  Ver ejemplos
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-neutral-500">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900 bg-gradient-to-r from-primary-400 to-accent-400"
                      />
                    ))}
                  </div>
                  <span className="ml-3">+50 clientes satisfechos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Imagen derecha */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl p-1">
                <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6">
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">K</span>
                      </div>
                      <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                        Preview interactivo
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                        Diseño moderno y responsive
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {['Mobile', 'Tablet', 'Desktop'].map((device) => (
                      <div key={device} className="text-center">
                        <div className="h-2 rounded-full bg-gradient-to-r from-primary-400 to-accent-400" />
                        <p className="text-sm font-medium mt-2 text-neutral-700 dark:text-neutral-300">
                          {device}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Elementos decorativos */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full blur-3xl opacity-30" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full blur-3xl opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;