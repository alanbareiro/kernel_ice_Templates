import { Facebook, Heart, HeartPulse, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import React from 'react';
import ThemeToggle from '../../Theme/ThemeToogle';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const MedicalFooter: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#0d9488',
        secondary: '#0f766e',
        accent: '#115e59',
    };
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-white"
            style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})` }}>
            <div className="container-custom px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Columna 1: Logo y descripción */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <HeartPulse className="w-8 h-8" />
                            <span className="text-2xl font-bold">
                                <EditableText elementId="md_footer_brand_1" defaultText="Kernelize" tag="span" />
                                <EditableText elementId="md_footer_brand_2" defaultText="Salud" tag="span" className="ml-1 font-light" />
                            </span>
                        </div>
                        <p className="text-sm text-white/70">
                            <EditableText
                                elementId="md_footer_description"
                                defaultText="Clínica médica con más de 25 años de experiencia. Atención personalizada y tecnología de vanguardia para cuidar tu salud y la de tu familia."
                                tag="span"
                            />
                        </p>
                    </div>

                    {/* Columna 2: Enlaces rápidos */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            <EditableText elementId="md_footer_quick_title" defaultText="Enlaces Rápidos" tag="span" />
                        </h3>
                        <ul className="space-y-2">
                            <li><a href="#home" className="text-white/70 hover:text-white transition-colors">
                                <EditableText elementId="md_footer_link_home" defaultText="Inicio" tag="span" />
                            </a></li>
                            <li><a href="#services" className="text-white/70 hover:text-white transition-colors">
                                <EditableText elementId="md_footer_link_services" defaultText="Servicios" tag="span" />
                            </a></li>
                            <li><a href="#doctors" className="text-white/70 hover:text-white transition-colors">
                                <EditableText elementId="md_footer_link_doctors" defaultText="Especialistas" tag="span" />
                            </a></li>
                            <li><a href="#contact" className="text-white/70 hover:text-white transition-colors">
                                <EditableText elementId="md_footer_link_contact" defaultText="Contacto" tag="span" />
                            </a></li>
                        </ul>
                    </div>

                    {/* Columna 3: Contacto */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            <EditableText elementId="md_footer_contact_title" defaultText="Contacto" tag="span" />
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <Phone className="w-5 h-5 text-white/70 flex-shrink-0" />
                                <span className="text-white/70">
                                    <EditableText elementId="md_footer_phone" defaultText="+54 11 4567-8900" tag="span" />
                                </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Mail className="w-5 h-5 text-white/70 flex-shrink-0" />
                                <span className="text-white/70">
                                    <EditableText elementId="md_footer_email" defaultText="contacto@kernelizesalud.com" tag="span" />
                                </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-white/70 flex-shrink-0" />
                                <span className="text-white/70">
                                    <EditableText elementId="md_footer_address" defaultText="Av. Cabildo 1234, CABA" tag="span" />
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 4: Redes y tema */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            <EditableText elementId="md_footer_social_title" defaultText="Seguinos" tag="span" />
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
                        © {currentYear} <EditableText elementId="md_footer_copyright" defaultText="Kernelize Salud. Todos los derechos reservados." tag="span" />
                    </p>
                    <p className="text-center text-white/50 text-xs mt-2 flex items-center justify-center">
                        <EditableText elementId="md_footer_made_with" defaultText="Hecho con" tag="span" />
                        <Heart className="w-3 h-3 mx-1 text-red-400" />
                        <EditableText elementId="md_footer_for" defaultText="para cuidar tu salud" tag="span" />
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default MedicalFooter;