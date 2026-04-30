// src/templates/SaaS/SaaSFooter.tsx
import { Cpu, Facebook, Heart, Instagram, Linkedin, Mail, Phone, Twitter } from 'lucide-react';
import React from 'react';
import ThemeToggle from '../../Theme/ThemeToogle';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors } from '../../types/template.types';

const SaaSFooter: React.FC = () => {
    const { template } = useTemplate();

    const sectionColors = template?.sectionColors || defaultSectionColors;
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="text-white"
            style={{ background: `linear-gradient(135deg, ${sectionColors.footerBackground}, ${sectionColors.footerBackground})` }}
        >
            <div className="container-custom px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Cpu className="w-8 h-8" style={{ color: sectionColors.buttonPrimaryBackground }} />
                            <span className="text-2xl font-bold">
                                <span style={{ color: sectionColors.buttonPrimaryBackground }}>
                                    <EditableText elementId="sa_footer_brand_1" defaultText="Kernelize" tag="span" />
                                </span>
                                <span className="ml-1 font-light" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                    <EditableText elementId="sa_footer_brand_2" defaultText="SaaS" tag="span" />
                                </span>
                            </span>
                        </div>
                        <p className="text-sm" style={{ color: sectionColors.footerTextColor }}>
                            <EditableText elementId="sa_footer_description" defaultText="Plataforma SaaS para automatizar y optimizar tu negocio. Todo en un solo lugar, seguro y escalable." tag="span" />
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: sectionColors.footerHeadingColor }}>
                            <EditableText elementId="sa_footer_quick_title" defaultText="Enlaces" tag="span" />
                        </h3>
                        <ul className="space-y-2">
                            <li><a href="#home" className="transition-colors" style={{ color: sectionColors.footerLinkColor }}><EditableText elementId="sa_footer_link_home" defaultText="Inicio" tag="span" /></a></li>
                            <li><a href="#features" className="transition-colors" style={{ color: sectionColors.footerLinkColor }}><EditableText elementId="sa_footer_link_features" defaultText="Características" tag="span" /></a></li>
                            <li><a href="#pricing" className="transition-colors" style={{ color: sectionColors.footerLinkColor }}><EditableText elementId="sa_footer_link_pricing" defaultText="Precios" tag="span" /></a></li>
                            <li><a href="#contact" className="transition-colors" style={{ color: sectionColors.footerLinkColor }}><EditableText elementId="sa_footer_link_contact" defaultText="Contacto" tag="span" /></a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: sectionColors.footerHeadingColor }}>
                            <EditableText elementId="sa_footer_contact_title" defaultText="Contacto" tag="span" />
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3"><Phone className="w-5 h-5 flex-shrink-0" style={{ color: sectionColors.buttonPrimaryBackground }} /><span style={{ color: sectionColors.footerTextColor }}><EditableText elementId="sa_footer_phone" defaultText="+54 11 5678-9012" tag="span" /></span></li>
                            <li className="flex items-start space-x-3"><Mail className="w-5 h-5 flex-shrink-0" style={{ color: sectionColors.buttonPrimaryBackground }} /><span style={{ color: sectionColors.footerTextColor }}><EditableText elementId="sa_footer_email" defaultText="saas@kernelize.com" tag="span" /></span></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: sectionColors.footerHeadingColor }}>
                            <EditableText elementId="sa_footer_social_title" defaultText="Seguinos" tag="span" />
                        </h3>
                        <div className="flex space-x-4 mb-6">
                            <a href="#" className="transition-colors" style={{ color: sectionColors.footerLinkColor }}><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="transition-colors" style={{ color: sectionColors.footerLinkColor }}><Linkedin className="w-5 h-5" /></a>
                            <a href="#" className="transition-colors" style={{ color: sectionColors.footerLinkColor }}><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="transition-colors" style={{ color: sectionColors.footerLinkColor }}><Instagram className="w-5 h-5" /></a>
                        </div>
                        <div className="flex items-center justify-between"><span style={{ color: sectionColors.footerLinkColor }}>Tema:</span><ThemeToggle /></div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t" style={{ borderColor: `${sectionColors.buttonPrimaryBackground}40` }}>
                    <p className="text-center text-sm" style={{ color: sectionColors.footerTextColor }}>
                        © {currentYear} <EditableText elementId="sa_footer_copyright" defaultText="Kernelize SaaS. Todos los derechos reservados." tag="span" />
                    </p>
                    <p className="text-center text-xs mt-2 flex items-center justify-center" style={{ color: sectionColors.footerTextColor }}>
                        <EditableText elementId="sa_footer_made_with" defaultText="Hecho con" tag="span" />
                        <Heart className="w-3 h-3 mx-1 text-red-400" />
                        <EditableText elementId="sa_footer_for" defaultText="para hacer crecer tu negocio" tag="span" />
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default SaaSFooter;