import { Building2, Facebook, Heart, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import React from 'react';
import ThemeToggle from '../../Theme/ThemeToogle';
import EditableText from '../../components/common/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const RealEstateFooter: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#2d6a4f',
        secondary: '#1e4b3a',
        accent: '#0d2f24',
    };
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-white" style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})` }}>
            <div className="container-custom px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2"><Building2 className="w-8 h-8" /><span className="text-2xl font-bold"><EditableText elementId="re_footer_brand_1" defaultText="Kernelize" tag="span" /><EditableText elementId="re_footer_brand_2" defaultText="Propiedades" tag="span" className="ml-1 font-light" /></span></div>
                        <p className="text-sm text-white/70"><EditableText elementId="re_footer_description" defaultText="Más de 15 años ayudando a familias y empresas a encontrar la propiedad ideal. Confianza, transparencia y profesionalismo." tag="span" /></p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4"><EditableText elementId="re_footer_quick_title" defaultText="Enlaces" tag="span" /></h3>
                        <ul className="space-y-2">
                            <li><a href="#home" className="text-white/70 hover:text-white"><EditableText elementId="re_footer_link_home" defaultText="Inicio" tag="span" /></a></li>
                            <li><a href="#properties" className="text-white/70 hover:text-white"><EditableText elementId="re_footer_link_properties" defaultText="Propiedades" tag="span" /></a></li>
                            <li><a href="#services" className="text-white/70 hover:text-white"><EditableText elementId="re_footer_link_services" defaultText="Servicios" tag="span" /></a></li>
                            <li><a href="#agents" className="text-white/70 hover:text-white"><EditableText elementId="re_footer_link_agents" defaultText="Agentes" tag="span" /></a></li>
                            <li><a href="#contact" className="text-white/70 hover:text-white"><EditableText elementId="re_footer_link_contact" defaultText="Contacto" tag="span" /></a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4"><EditableText elementId="re_footer_contact_title" defaultText="Contacto" tag="span" /></h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3"><Phone className="w-5 h-5 text-white/70 flex-shrink-0" /><span className="text-white/70"><EditableText elementId="re_footer_phone" defaultText="+54 11 5678-9012" tag="span" /></span></li>
                            <li className="flex items-start space-x-3"><Mail className="w-5 h-5 text-white/70 flex-shrink-0" /><span className="text-white/70"><EditableText elementId="re_footer_email" defaultText="propiedades@kernelize.com" tag="span" /></span></li>
                            <li className="flex items-start space-x-3"><MapPin className="w-5 h-5 text-white/70 flex-shrink-0" /><span className="text-white/70"><EditableText elementId="re_footer_address" defaultText="Av. Libertador 2345, Palermo" tag="span" /></span></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4"><EditableText elementId="re_footer_social_title" defaultText="Seguinos" tag="span" /></h3>
                        <div className="flex space-x-4 mb-6">
                            <a href="#" className="text-white/70 hover:text-white"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-white/70 hover:text-white"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="text-white/70 hover:text-white"><Linkedin className="w-5 h-5" /></a>
                            <a href="#" className="text-white/70 hover:text-white"><Twitter className="w-5 h-5" /></a>
                        </div>
                        <div className="flex items-center justify-between"><span className="text-white/70">Tema:</span><ThemeToggle /></div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/20">
                    <p className="text-center text-white/70 text-sm">© {currentYear} <EditableText elementId="re_footer_copyright" defaultText="Kernelize Propiedades. Todos los derechos reservados." tag="span" /></p>
                    <p className="text-center text-white/50 text-xs mt-2 flex items-center justify-center"><EditableText elementId="re_footer_made_with" defaultText="Hecho con" tag="span" /><Heart className="w-3 h-3 mx-1 text-red-400" /><EditableText elementId="re_footer_for" defaultText="para encontrar tu hogar" tag="span" /></p>
                </div>
            </div>
        </footer>
    );
};

export default RealEstateFooter;