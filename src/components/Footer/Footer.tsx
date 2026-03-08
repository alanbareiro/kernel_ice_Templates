import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Github,
  Heart
} from 'lucide-react';
import ThemeToggle from '../../Theme/ThemeToogle';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Sección principal */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información de la empresa */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                Kernelize
              </h2>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Soluciones tecnológicas a medida para PYMES y emprendedores.
            </p>
            
            {/* Redes sociales */}
            <div className="flex space-x-3">
              {[
                { icon: <Facebook className="w-5 h-5" />, label: 'Facebook' },
                { icon: <Instagram className="w-5 h-5" />, label: 'Instagram' },
                { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
                { icon: <Github className="w-5 h-5" />, label: 'GitHub' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              {['Inicio', 'Servicios', 'Portafolio', 'Precios', 'Contacto'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
              Servicios
            </h3>
            <ul className="space-y-2">
              {[
                'Landing Pages',
                'E-commerce',
                'Sistemas CRM',
                'Gestión de Inventario',
                'Panel de Control',
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Suscríbete para recibir tips y ofertas especiales.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
              >
                Suscribirse
              </button>
            </form>
            
            {/* Toggle de tema */}
            <div className="pt-4 flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Tema:
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-neutral-200 dark:border-neutral-800"></div>

        {/* Sección inferior */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Derechos de autor */}
          <div className="text-center md:text-left">
            <p className="text-neutral-600 dark:text-neutral-400">
              © {currentYear} Kernelize Template 01. Todos los derechos reservados.
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1 flex items-center justify-center md:justify-start">
              Hecho con <Heart className="mx-1 w-4 h-4 text-red-500" /> en Argentina
            </p>
          </div>

          {/* Enlaces legales */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            {['Términos', 'Privacidad', 'Cookies'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Badge de tecnología */}
        <div className="pb-8 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700">
              React 19
            </span>
            <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700">
              TypeScript
            </span>
            <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700">
              Tailwind CSS
            </span>
            <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700">
              Vite
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;