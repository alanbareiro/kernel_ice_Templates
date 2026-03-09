import { Target, TrendingUp, Users } from 'lucide-react';
import corpoImage from '../../assets/corpo.jpg';

const AboutSection = () => {
  const stats = [
    { icon: <Target className="w-6 h-6" />, value: '95%', label: 'Tasa de satisfacción' },
    { icon: <Users className="w-6 h-6" />, value: '500+', label: 'Clientes atendidos' },
    { icon: <TrendingUp className="w-6 h-6" />, value: '40%', label: 'Aumento en conversiones' },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Imagen - Versión con marco y efectos */}
          <div className="relative group">
            {/* Marco exterior decorativo */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl" />

            {/* Contenedor principal de la imagen */}
            <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
              {/* Imagen con efecto hover */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src={corpoImage}
                  alt="Equipo de Kernelize trabajando en soluciones tecnológicas"
                  className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                />

                {/* Overlay gradiente interactivo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Efecto de luz */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 via-transparent to-accent-500/10" />

                {/* Texto superpuesto */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white bg-gradient-to-t from-black/90 to-transparent">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm font-medium text-green-400">Equipo activo</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 leading-tight">
                    Innovación y compromiso
                  </h3>
                  <p className="opacity-90">
                    Transformamos ideas en soluciones digitales exitosas
                  </p>
                </div>
              </div>

              {/* Badge de experiencia */}
              <div className="absolute top-6 -right-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl rotate-12 flex items-center justify-center shadow-2xl">
                    <div className="-rotate-12 text-center">
                      <div className="text-white font-bold text-lg">+2</div>
                      <div className="text-white/90 text-xs">años</div>
                    </div>
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl blur-md opacity-50 -z-10" />
                </div>
              </div>
            </div>

            {/* Puntos decorativos */}
            <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-primary-500/30" />
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent-500/30" />
          </div>

          {/* Contenido (igual que antes) */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
                Sobre nosotros
              </span>

              <h2 className="heading-2 mb-6">
                Más que una landing page,{' '}
                <span className="text-gradient">una solución integral</span>
              </h2>

              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                En Kernelize entendemos que cada negocio es único. Por eso desarrollamos
                soluciones personalizadas que se adaptan a tus necesidades específicas,
                optimizando cada detalle para maximizar tu ROI.
              </p>

              <p className="text-neutral-600 dark:text-neutral-400">
                Nuestra metodología combina diseño moderno, desarrollo técnico robusto
                y estrategias de conversión probadas. Trabajamos contigo en cada etapa
                del proceso para garantizar que el resultado final supere tus expectativas.
              </p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200 dark:border-neutral-800">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-3 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-neutral-900 dark:text-white group-hover:text-gradient transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400 group-hover:text-primary-500 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Lista de ventajas */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                Nuestro diferencial:
              </h3>
              <ul className="space-y-3">
                {[
                  'Diseño 100% original y personalizado',
                  'Optimización para motores de búsqueda',
                  'Integración con tus herramientas existentes',
                  'Soporte técnico post-lanzamiento',
                  'Capacitación para tu equipo',
                ].map((item, index) => (
                  <li key={index} className="flex items-center group">
                    <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-3 group-hover:bg-primary-500 transition-colors duration-300">
                      <div className="w-2 h-2 rounded-full bg-primary-500 group-hover:bg-white transition-colors duration-300" />
                    </div>
                    <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;