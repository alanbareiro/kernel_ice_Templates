import { ChevronDown, ChevronUp, Heart, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/icon.png'


const Footer = () => {
  const [expandedSections, setExpandedSections] = useState({
    soluciones: false,
    contacto: false
  });

  const toggleSection = (section: 'soluciones' | 'contacto') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer id="contacto" className="bg-neutral-900 text-white">
      <div className="container-custom px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-40">
          {/* Brand - Siempre centrado en mobile */}
          <div className="text-center">
            <Link to="/" className="inline-flex flex-col items-center mb-6">
              <div className="flex items-center gap-3 mb-3">
                {/* <img
                  src={KernelMinecraft}
                  alt="Kernel-Ice Logo"
                  className="h-12 sm:h-14 w-auto"
                /> */}
                <div className="text-left">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-center">
                    <span className="text-xl sm:text-2xl font-bold text-gradient dark:text-gradient">Kernel-</span>
                    <span className="text-xl sm:text-2xl font-bold text-primary-400 dark:text-gradient">Eyes</span>
                    {/* <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-accent-500" /> */}
                    {/* Badge Innovador */}
                    {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fade-in"> */}
                    <span className="relative flex h-6 w-6">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                      <img
                        src={Logo}
                        alt="KernelEyes Logo"
                        className="h-6 w-auto p-0"
                      />
                      {/* <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span> */}
                    </span>

                    {/* </div> */}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1 text-center">🚀 Soluciones Digitales</p>
                </div>
              </div>
            </Link>
            <p className="text-sm sm:text-base text-neutral-400 mb-6 sm:mb-8 leading-relaxed px-2">
              💎 Soluciones digitales frescas, rápidas y sin complicaciones para <span className='text-gradient'>tu negocio.  </span>
            </p>
            <div className="flex justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-0">
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-all duration-300 transform hover:scale-110">
                <Twitter size={20} className="sm:w-6 sm:h-6" />
              </a>
              {/* <a href="#" className="text-neutral-400 hover:text-primary-400 transition-all duration-300 transform hover:scale-110">
                <Linkedin size={20} className="sm:w-6 sm:h-6" />
              </a> */}
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-all duration-300 transform hover:scale-110">
                <Instagram size={20} className="sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>



          {/* Contacto - Expandible en mobile */}
          <div className='md:text-center border-b border-neutral-800 md:border-none pb-4 md:pb-0'>
            <button
              onClick={() => toggleSection('contacto')}
              className="w-full flex items-center justify-center md:justify-center gap-2 text-lg font-semibold mb-4 md:mb-8"
            >
              <Mail className="w-5 h-5 text-primary-400" />
              Contacto
              <span className="md:hidden ml-2">
                {expandedSections.contacto ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>

            <div className={`${expandedSections.contacto ? 'block' : 'hidden md:block'}`}>
              <ul className="space-y-4 sm:space-y-6">
                <li className="flex items-center justify-center md:justify-center gap-3 group">
                  <div className="p-1.5 sm:p-2 rounded-full bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors">
                    <Mail size={16} className="sm:w-5 sm:h-5 text-primary-400" />
                  </div>
                  <span className="text-sm sm:text-base text-neutral-400 group-hover:text-white transition-colors">📧 info@kerneleyes.com</span>
                </li>
                <li className="flex items-center justify-center md:justify-center gap-3 group">
                  <div className="p-1.5 sm:p-2 rounded-full bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors">
                    <Phone size={16} className="sm:w-5 sm:h-5 text-primary-400" />
                  </div>
                  <span className="text-sm sm:text-base text-neutral-400 group-hover:text-white transition-colors">📱 +54 11 1234-5678</span>
                </li>
                <li className="flex items-center justify-center md:justify-center gap-3 group">
                  <div className="p-1.5 sm:p-2 rounded-full bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors">
                    <MapPin size={16} className="sm:w-5 sm:h-5 text-primary-400" />
                  </div>
                  <span className="text-sm sm:text-base text-neutral-400 group-hover:text-white transition-colors">📍 Buenos Aires, Argentina</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter - Siempre visible */}
          {/* <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-6 sm:mb-8 flex items-center justify-center md:justify-start gap-2">
              <Rocket className="w-5 h-5 text-accent-500" />
              Newsletter
            </h4>
            <p className="text-sm sm:text-base text-neutral-400 mb-4 sm:mb-6 leading-relaxed px-2 md:px-0">
              ✨ Suscribite para recibir tips de digitalización y ofertas especiales.
            </p>
            <form className="space-y-3 sm:space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="📨 tu@email.com"
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-neutral-800/50 border border-neutral-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder:text-neutral-500 text-sm sm:text-base"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500" />
                </div>
              </div>
              <button
                type="submit"
                className="btn-primary w-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                🚀 Suscribirme
              </button>
            </form>
          </div> */}
        </div>

        {/* Divider */}
        <div className="my-8 sm:my-12">
          <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent"></div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center">
          <div className="mb-4 sm:mb-8">
            <p className="text-sm sm:text-lg text-neutral-500">
              © {new Date().getFullYear()} <span className="text-gradient font-semibold dark:text-gradient">
                <span className="mx-1 sm:mx-2 text-gradient dark:text-gradient">•</span>
                KernelEyes
                <span className="mx-1 sm:mx-2 text-gradient dark:text-gradient">•</span>
              </span>

              <span className="block sm:inline mt-1 sm:mt-0">Todos los derechos reservados.</span>
            </p>
            <p className="text-xs sm:text-sm text-neutral-500 mt-2 sm:mt-3">
              ⚡ Transformando negocios con tecnología de vanguardia
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 md:gap-12 mt-6 sm:mt-8">
            <Link to="/privacidad" className="text-neutral-400 hover:text-primary-400 transition-colors text-xs sm:text-sm py-1">
              🔐 Política de Privacidad
            </Link>
            <span className="hidden sm:inline text-neutral-600 dark:text-gradient">|</span>
            <Link to="/terminos" className="text-neutral-400 hover:text-primary-400 transition-colors text-xs sm:text-sm py-1">
              📄 Términos de Servicio
            </Link>
            <span className="hidden sm:inline text-neutral-600 dark:text-gradient">|</span>
            <Link to="/contacto" className="text-neutral-400 hover:text-primary-400 transition-colors text-xs sm:text-sm py-1">
              💬 Soporte
            </Link>
          </div>

          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-neutral-800/50">
            <p className="text-xs sm:text-sm text-neutral-500 flex flex-col items-center justify-center gap-1 sm:gap-2">
              <span className="flex items-center">
                Hecho con
                <Heart className="mx-1 sm:mx-2 w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                en
                <span className="ml-1 sm:ml-2 font-semibold text-white">🇦🇷 Argentina</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;