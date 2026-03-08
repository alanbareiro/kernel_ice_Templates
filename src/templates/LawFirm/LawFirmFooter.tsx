import { Facebook, Heart, Instagram, Linkedin, Mail, MapPin, Phone, Scale, Twitter } from 'lucide-react';
import React from 'react';
import ThemeToggle from '../../Theme/ThemeToogle';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const LawFirmFooter: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#7f1d1d',
        secondary: '#991b1b',
        accent: '#450a0a',
    };
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-white"
            style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})` }}>
            <div className="container-custom px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Columna 1: Logo y descripción */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Scale className="w-8 h-8" />
                            <span className="text-2xl font-bold">
                                <EditableText elementId="lf_footer_brand_1" defaultText="Kernelize" tag="span" />
                                <EditableText elementId="lf_footer_brand_2" defaultText="Abogados" tag="span" className="ml-1 font-light" />
                            </span>
                        </div>
                        <p className="text-sm text-white/70">
                            <EditableText
                                elementId="lf_footer_description"
                                defaultText="Bufete de abogados con más de 25 años de experiencia en derecho corporativo, civil y penal. Defendemos tus derechos con ética y profesionalismo."
                                tag="span"
                            />
                        </p>
                    </div>

                    {/* Columna 2: Enlaces rápidos */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            <EditableText elementId="lf_footer_quick_title" defaultText="Enlaces Rápidos" tag="span" />
                        </h3>
                        <ul className="space-y-2">
                            <li><a href="#home" className="text-white/70 hover:text-white transition-colors">
                                <EditableText elementId="lf_footer_link_home" defaultText="Inicio" tag="span" />
                            </a></li>
                            <li><a href="#practice-areas" className="text-white/70 hover:text-white transition-colors">
                                <EditableText elementId="lf_footer_link_areas" defaultText="Áreas de Práctica" tag="span" />
                            </a></li>
                            <li><a href="#attorneys" className="text-white/70 hover:text-white transition-colors">
                                <EditableText elementId="lf_footer_link_attorneys" defaultText="Nuestro Equipo" tag="span" />
                            </a></li>
                            <li><a href="#contact" className="text-white/70 hover:text-white transition-colors">
                                <EditableText elementId="lf_footer_link_contact" defaultText="Contacto" tag="span" />
                            </a></li>
                        </ul>
                    </div>

                    {/* Columna 3: Contacto */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            <EditableText elementId="lf_footer_contact_title" defaultText="Contacto" tag="span" />
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <Phone className="w-5 h-5 text-white/70 flex-shrink-0" />
                                <span className="text-white/70">
                                    <EditableText elementId="lf_footer_phone" defaultText="+54 11 4567-8900" tag="span" />
                                </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Mail className="w-5 h-5 text-white/70 flex-shrink-0" />
                                <span className="text-white/70">
                                    <EditableText elementId="lf_footer_email" defaultText="contacto@kernelizeabogados.com" tag="span" />
                                </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-white/70 flex-shrink-0" />
                                <span className="text-white/70">
                                    <EditableText elementId="lf_footer_address" defaultText="Av. Corrientes 1234, CABA" tag="span" />
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 4: Redes y tema */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            <EditableText elementId="lf_footer_social_title" defaultText="Seguinos" tag="span" />
                        </h3>
                        <div className="flex space-x-4 mb-6">
                            <a href="#" className="hover:text-white transition-colors text-white/70">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors text-white/70">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors text-white/70">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors text-white/70">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-white/70">Tema:</span>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>

                {/* Línea divisoria y copyright */}
                <div className="mt-12 pt-8 border-t border-white/20">
                    <p className="text-center text-white/70 text-sm">
                        © {currentYear} <EditableText elementId="lf_footer_copyright" defaultText="Kernelize Abogados. Todos los derechos reservados." tag="span" />
                    </p>
                    <p className="text-center text-white/50 text-xs mt-2 flex items-center justify-center">
                        <EditableText elementId="lf_footer_made_with" defaultText="Hecho con" tag="span" />
                        <Heart className="w-3 h-3 mx-1 text-red-400" />
                        <EditableText elementId="lf_footer_for" defaultText="para defender tus derechos" tag="span" />
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default LawFirmFooter;