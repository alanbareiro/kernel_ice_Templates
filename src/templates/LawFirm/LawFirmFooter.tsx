// src/templates/LawFirm/LawFirmFooter.tsx
import { Facebook, Heart, Instagram, Linkedin, Mail, MapPin, Phone, Scale, Twitter } from 'lucide-react';
import React from 'react';
import ThemeToggle from '../../Theme/ThemeToogle';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors } from '../../types/template.types';

const LawFirmFooter: React.FC = () => {
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
                    {/* Columna 1: Logo y descripción */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Scale className="w-8 h-8" style={{ color: sectionColors.buttonPrimaryBackground }} />
                            <span className="text-2xl font-bold">
                                <span style={{ color: sectionColors.buttonPrimaryBackground }}>
                                    <EditableText elementId="lf_footer_brand_1" defaultText="Kernelize" tag="span" />
                                </span>
                                <span className="ml-1 font-light" style={{ color: sectionColors.buttonPrimaryBackground }}>
                                    <EditableText elementId="lf_footer_brand_2" defaultText="Abogados" tag="span" />
                                </span>
                            </span>
                        </div>
                        <p className="text-sm" style={{ color: sectionColors.footerTextColor }}>
                            <EditableText
                                elementId="lf_footer_description"
                                defaultText="Bufete de abogados con más de 25 años de experiencia en derecho corporativo, civil y penal. Defendemos tus derechos con ética y profesionalismo."
                                tag="span"
                            />
                        </p>
                    </div>

                    {/* Columna 2: Enlaces rápidos */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: sectionColors.footerHeadingColor }}>
                            <EditableText elementId="lf_footer_quick_title" defaultText="Enlaces Rápidos" tag="span" />
                        </h3>
                        <ul className="space-y-2">
                            <li><a href="#home" className="transition-colors" style={{ color: sectionColors.footerLinkColor }}>
                                <EditableText elementId="lf_footer_link_home" defaultText="Inicio" tag="span" />
                            </a></li>
                            <li><a href="#practice-areas" className="transition-colors" style={{ color: sectionColors.footerLinkColor }}>
                                <EditableText elementId="lf_footer_link_areas" defaultText="Áreas de Práctica" tag="span" />
                            </a></li>
                            <li><a href="#attorneys" className="transition-colors" style={{ color: sectionColors.footerLinkColor }}>
                                <EditableText elementId="lf_footer_link_attorneys" defaultText="Nuestro Equipo" tag="span" />
                            </a></li>
                            <li><a href="#contact" className="transition-colors" style={{ color: sectionColors.footerLinkColor }}>
                                <EditableText elementId="lf_footer_link_contact" defaultText="Contacto" tag="span" />
                            </a></li>
                        </ul>
                    </div>

                    {/* Columna 3: Contacto */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: sectionColors.footerHeadingColor }}>
                            <EditableText elementId="lf_footer_contact_title" defaultText="Contacto" tag="span" />
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <Phone className="w-5 h-5 flex-shrink-0" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <span style={{ color: sectionColors.footerTextColor }}>
                                    <EditableText elementId="lf_footer_phone" defaultText="+54 11 4567-8900" tag="span" />
                                </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Mail className="w-5 h-5 flex-shrink-0" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <span style={{ color: sectionColors.footerTextColor }}>
                                    <EditableText elementId="lf_footer_email" defaultText="contacto@kernelizeabogados.com" tag="span" />
                                </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: sectionColors.buttonPrimaryBackground }} />
                                <span style={{ color: sectionColors.footerTextColor }}>
                                    <EditableText elementId="lf_footer_address" defaultText="Av. Corrientes 1234, CABA" tag="span" />
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 4: Redes y tema */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: sectionColors.footerHeadingColor }}>
                            <EditableText elementId="lf_footer_social_title" defaultText="Seguinos" tag="span" />
                        </h3>
                        <div className="flex space-x-4 mb-6">
                            <a href="#" className="transition-colors" style={{ color: sectionColors.footerLinkColor }}>
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="transition-colors" style={{ color: sectionColors.footerLinkColor }}>
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="transition-colors" style={{ color: sectionColors.footerLinkColor }}>
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="transition-colors" style={{ color: sectionColors.footerLinkColor }}>
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                        <div className="flex items-center justify-between">
                            <span style={{ color: sectionColors.footerLinkColor }}>Tema:</span>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>

                {/* Línea divisoria y copyright */}
                <div className="mt-12 pt-8 border-t" style={{ borderColor: `${sectionColors.buttonPrimaryBackground}40` }}>
                    <p className="text-center text-sm" style={{ color: sectionColors.footerTextColor }}>
                        © {currentYear} <EditableText elementId="lf_footer_copyright" defaultText="Kernelize Abogados. Todos los derechos reservados." tag="span" />
                    </p>
                    <p className="text-center text-xs mt-2 flex items-center justify-center" style={{ color: sectionColors.footerTextColor }}>
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