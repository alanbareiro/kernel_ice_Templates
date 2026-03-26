import { Facebook, Heart, Instagram, Linkedin, Mail, Phone, Rocket, Twitter } from 'lucide-react';
import React from 'react';
import ThemeToggle from '../../Theme/ThemeToogle';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';

const StartupFooter: React.FC = () => {
    const { template } = useTemplate();
    const colors = template?.colors || {
        primary: '#059669',
        secondary: '#047857',
        accent: '#065f46',
    };
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-white" style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})` }}>
            <div className="container-custom px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2"><Rocket className="w-8 h-8" /><span className="text-2xl font-bold"><EditableText elementId="st_footer_brand_1" defaultText="Kernelize" tag="span" /><EditableText elementId="st_footer_brand_2" defaultText="Startup" tag="span" className="ml-1 font-light" /></span></div>
                        <p className="text-sm text-white/70"><EditableText elementId="st_footer_description" defaultText="Innovación que transforma. Desarrollamos tecnología para resolver problemas reales." tag="span" /></p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4"><EditableText elementId="st_footer_quick_title" defaultText="Enlaces" tag="span" /></h3>
                        <ul className="space-y-2">
                            <li><a href="#home" className="text-white/70 hover:text-white"><EditableText elementId="st_footer_link_home" defaultText="Inicio" tag="span" /></a></li>
                            <li><a href="#problem" className="text-white/70 hover:text-white"><EditableText elementId="st_footer_link_problem" defaultText="Problema" tag="span" /></a></li>
                            <li><a href="#solution" className="text-white/70 hover:text-white"><EditableText elementId="st_footer_link_solution" defaultText="Solución" tag="span" /></a></li>
                            <li><a href="#team" className="text-white/70 hover:text-white"><EditableText elementId="st_footer_link_team" defaultText="Equipo" tag="span" /></a></li>
                            <li><a href="#contact" className="text-white/70 hover:text-white"><EditableText elementId="st_footer_link_contact" defaultText="Contacto" tag="span" /></a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4"><EditableText elementId="st_footer_contact_title" defaultText="Contacto" tag="span" /></h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3"><Phone className="w-5 h-5 text-white/70 flex-shrink-0" /><span className="text-white/70"><EditableText elementId="st_footer_phone" defaultText="+54 11 5678-9012" tag="span" /></span></li>
                            <li className="flex items-start space-x-3"><Mail className="w-5 h-5 text-white/70 flex-shrink-0" /><span className="text-white/70"><EditableText elementId="st_footer_email" defaultText="startup@kernelize.com" tag="span" /></span></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4"><EditableText elementId="st_footer_social_title" defaultText="Seguinos" tag="span" /></h3>
                        <div className="flex space-x-4 mb-6">
                            <a href="#" className="text-white/70 hover:text-white"><Linkedin className="w-5 h-5" /></a>
                            <a href="#" className="text-white/70 hover:text-white"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-white/70 hover:text-white"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-white/70 hover:text-white"><Instagram className="w-5 h-5" /></a>
                        </div>
                        <div className="flex items-center justify-between"><span className="text-white/70">Tema:</span><ThemeToggle /></div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/20">
                    <p className="text-center text-white/70 text-sm">© {currentYear} <EditableText elementId="st_footer_copyright" defaultText="Kernelize Startup. Todos los derechos reservados." tag="span" /></p>
                    <p className="text-center text-white/50 text-xs mt-2 flex items-center justify-center"><EditableText elementId="st_footer_made_with" defaultText="Hecho con" tag="span" /><Heart className="w-3 h-3 mx-1 text-red-400" /><EditableText elementId="st_footer_for" defaultText="para construir el futuro" tag="span" /></p>
                </div>
            </div>
        </footer>
    );
};

export default StartupFooter;