import { Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import logoDefault from '../../../assets/logo.png';
import EditableImage from '../../../components/Editor/EditableImage';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { useTemplateEditor } from '../../../contexts/TemplateEditorContext';
import { defaultSectionColors, defaultTypography } from '../../../types/template.types';

interface ConsultingHeaderProps {
    className?: string;
}

// Valores por defecto para la lista de navegación (cuando no hay datos guardados)
const DEFAULT_NAV_ITEMS = [
    { id: 'default_1', text: 'Inicio', url: '#home', visible: true },
    { id: 'default_2', text: 'Servicios', url: '#services', visible: true },
    { id: 'default_3', text: 'Metodología', url: '#methodology', visible: true },
    { id: 'default_4', text: 'Casos de éxito', url: '#testimonials', visible: true },
    { id: 'default_5', text: 'Contacto', url: '#contact', visible: true },
];

const ConsultingHeader: React.FC<ConsultingHeaderProps> = ({ className = '' }) => {
    const { template } = useTemplate();
    const { config } = useTemplateEditor();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [navLinks, setNavLinks] = useState(DEFAULT_NAV_ITEMS);

    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };
    const typography = template?.typography || defaultTypography;

    const navLinkClamp = `clamp(0.75rem, 3vw, ${typography.navTextSize})`;
    const buttonClamp = `clamp(0.75rem, 3vw, ${typography.buttonTextSize})`;

    // Cargar la lista dinámica desde template.texts['nav_link_']
    useEffect(() => {
        const stored = template?.texts?.['nav_link_'];
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setNavLinks(parsed);
                    return;
                }
            } catch (e) {
                console.error('Error parsing nav links:', e);
            }
        }
        // Si no hay datos guardados, usar los valores por defecto
        setNavLinks(DEFAULT_NAV_ITEMS);
    }, [template?.texts]);

    const ctaUrl = template?.texts?.header_cta_url || '#contact';
    const shouldShowCta = () => {
        const value = template?.texts?.show_header_cta;
        return value !== 'false';
    };

    const handleNavClick = (e: React.MouseEvent, href: string) => {
        if (config.isEditing) {
            e.preventDefault();
            return;
        }
        window.location.href = href;
    };

    const handleLogoClick = (e: React.MouseEvent) => {
        if (config.isEditing) {
            e.preventDefault();
            const logoElement = document.getElementById('header_logo');
            if (logoElement) logoElement.click();
        }
    };

    return (
        <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${className}`}
            style={{ backgroundColor: s.headerBackground, borderColor: `${s.headerLinkColor}40` }}>
            <div className="container-custom px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a onClick={handleLogoClick} className="flex items-center space-x-3 group">
                        <div id="header_logo" data-element-id="header_logo" className="relative">
                            <EditableImage elementId="header_logo" defaultImage={logoDefault}
                                alt="Kernelize Consulting" className="w-12 h-12 rounded-lg object-cover"
                                category="consulting" containerClassName="" modalRelative={true} />
                        </div>
                        <div className={`${s.logoTextSize} font-bold`}>
                            <span style={{ color: s.logoTextColor1 }}>
                                <EditableText elementId="header_brand_1" defaultText="KE" tag="span" />
                            </span>
                            <span style={{ color: s.logoTextColor2 }}>
                                <EditableText elementId="header_brand_2" defaultText="Consulting" tag="span" />
                            </span>
                        </div>
                    </a>

                    {/* Navegación desktop (dinámica) */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((item) => {
                            if (item.visible === false) return null;
                            return (
                                <a key={item.id}
                                    href={item.url}
                                    onClick={(e) => handleNavClick(e, item.url)}
                                    className="font-medium transition-colors"
                                    style={{ color: s.headerLinkColor, fontSize: navLinkClamp }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = s.headerLinkHoverColor}
                                    onMouseLeave={(e) => e.currentTarget.style.color = s.headerLinkColor}>
                                    {item.text}
                                </a>
                            );
                        })}
                        {shouldShowCta() && (
                            <a href={ctaUrl} id="header_cta" data-element-id="header_cta"
                                onClick={(e) => handleNavClick(e, ctaUrl)}
                                className="px-5 py-2.5 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                                style={{ backgroundColor: s.headerCtaBackground, color: s.headerCtaText, fontSize: buttonClamp }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = s.headerCtaHoverBackground}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = s.headerCtaBackground}>
                                <EditableText elementId="header_cta" defaultText="Consultoría gratuita" tag="span" />
                            </a>
                        )}
                    </nav>

                    {/* Botón menú móvil */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 transition-colors"
                            style={{ color: s.headerTextColor }}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú móvil (dinámico) */}
            {isMenuOpen && (
                <div className="md:hidden border-t"
                    style={{ backgroundColor: s.headerBackground, borderColor: `${s.headerLinkColor}40` }}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((item) => {
                            if (item.visible === false) return null;
                            return (
                                <a key={item.id}
                                    href={item.url}
                                    onClick={(e) => { handleNavClick(e, item.url); setIsMenuOpen(false); }}
                                    className="block px-3 py-2 transition-colors"
                                    style={{ color: s.headerLinkColor, fontSize: navLinkClamp }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = s.headerLinkHoverColor}
                                    onMouseLeave={(e) => e.currentTarget.style.color = s.headerLinkColor}>
                                    {item.text}
                                </a>
                            );
                        })}
                        {shouldShowCta() && (
                            <div className="px-3 py-2">
                                <a href={ctaUrl} id="header_cta" data-element-id="header_cta"
                                    onClick={(e) => { handleNavClick(e, ctaUrl); setIsMenuOpen(false); }}
                                    className="block w-full text-center px-4 py-2 text-white font-semibold rounded-lg"
                                    style={{ backgroundColor: s.headerCtaBackground, color: s.headerCtaText, fontSize: buttonClamp }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = s.headerCtaHoverBackground}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = s.headerCtaBackground}>
                                    <EditableText elementId="header_cta" defaultText="Consultoría gratuita" tag="span" />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default ConsultingHeader;