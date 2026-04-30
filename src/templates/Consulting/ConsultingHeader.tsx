import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import logoDefault from '../../assets/logo.png';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';
import { defaultSectionColors } from '../../types/template.types';

interface ConsultingHeaderProps {
    className?: string;
}

const ConsultingHeader: React.FC<ConsultingHeaderProps> = ({ className = '' }) => {
    const { template } = useTemplate();
    const { config } = useTemplateEditor();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Colores del header desde sectionColors (con fallback completo)
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };

    // Definir los ítems de navegación con sus textos y URLs desde template.texts
    const navItems = [
        { id: 'nav_home', label: 'Inicio', defaultText: 'Inicio', defaultUrl: '#home' },
        { id: 'nav_services', label: 'Servicios', defaultText: 'Servicios', defaultUrl: '#services' },
        { id: 'nav_methodology', label: 'Metodología', defaultText: 'Metodología', defaultUrl: '#methodology' },
        { id: 'nav_testimonials', label: 'Casos de éxito', defaultText: 'Casos de éxito', defaultUrl: '#testimonials' },
        { id: 'nav_contact', label: 'Contacto', defaultText: 'Contacto', defaultUrl: '#contact' },
    ];

    // Obtener textos y URLs desde template.texts (con fallbacks)
    const getNavUrl = (item: typeof navItems[0]) =>
        template?.texts?.[`${item.id}_url`] || item.defaultUrl;

    // Texto y URL del botón CTA del header
    // const ctaText = template?.texts?.header_cta || 'Consultoría gratuita';
    const ctaUrl = template?.texts?.header_cta_url || '#contact';

    // Manejar clic en enlaces durante modo edición
    const handleNavClick = (e: React.MouseEvent, href: string) => {
        if (config.isEditing) {
            e.preventDefault();
            return;
        }
        window.location.href = href;
    };

    // Manejar clic en el logo (activa edición de imagen)
    const handleLogoClick = (e: React.MouseEvent) => {
        if (config.isEditing) {
            e.preventDefault();
            const logoElement = document.getElementById('header_logo');
            if (logoElement) logoElement.click();
        }
    };

    console.log('Logo colors:', s.logoTextColor1, s.logoTextColor2);

    return (
        <header
            className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${className}`}
            style={{
                backgroundColor: s.headerBackground,
                borderColor: `${s.headerLinkColor}40`,
            }}
        >
            <div className="container-custom px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo editable */}
                    <a
                        // href="/"
                        onClick={handleLogoClick}
                        className="flex items-center space-x-3 group"
                    >
                        <div id="header_logo" data-element-id="header_logo" className="relative">
                            <EditableImage
                                elementId="header_logo"
                                defaultImage={logoDefault}
                                alt="Kernelize Consulting"
                                className="w-12 h-12 rounded-lg object-cover"
                                category="consulting"
                                containerClassName=""
                                modalRelative={true}

                            />
                        </div>
                        <div className={`${s.logoTextSize} font-bold`}>
                            <span style={{ color: s.logoTextColor1 }}>
                                <EditableText
                                    elementId="header_brand_1"
                                    defaultText="KE"
                                    tag="span"
                                // className="text-blue-600 dark:text-blue-400"
                                />
                            </span>
                            <span style={{ color: s.logoTextColor2 }}>
                                <EditableText
                                    elementId="header_brand_2"
                                    defaultText="Consulting"
                                    tag="span"
                                // className="text-slate-600 dark:text-slate-400 ml-1"
                                />
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation (sin cambios) */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                id={item.id}
                                data-element-id={item.id}
                                href={getNavUrl(item)}
                                onClick={(e) => handleNavClick(e, getNavUrl(item))}
                                className="font-medium transition-colors"
                                style={{ color: s.headerLinkColor }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = s.headerLinkHoverColor;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = s.headerLinkColor;
                                }}
                            >
                                <EditableText
                                    elementId={item.id}
                                    defaultText={item.defaultText}
                                    tag="span"
                                />
                            </a>
                        ))}
                        <a
                            href={ctaUrl}
                            id="header_cta"
                            data-element-id="header_cta"
                            onClick={(e) => handleNavClick(e, ctaUrl)}
                            className="px-5 py-2.5 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                            style={{
                                backgroundColor: s.headerCtaBackground,
                                color: s.headerCtaText,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = s.headerCtaHoverBackground;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = s.headerCtaBackground;
                            }}
                        >
                            <EditableText
                                elementId="header_cta"
                                defaultText="Consultoría gratuita"
                                tag="span"
                            />
                        </a>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 transition-colors"
                            style={{ color: s.headerTextColor }}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div
                    className="md:hidden border-t"
                    style={{
                        backgroundColor: s.headerBackground,
                        borderColor: `${s.headerLinkColor}40`,
                    }}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                id={item.id}
                                data-element-id={item.id}
                                href={getNavUrl(item)}
                                onClick={(e) => {
                                    handleNavClick(e, getNavUrl(item));
                                    setIsMenuOpen(false);
                                }}
                                className="block px-3 py-2 transition-colors"
                                style={{ color: s.headerLinkColor }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = s.headerLinkHoverColor;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = s.headerLinkColor;
                                }}
                            >
                                <EditableText
                                    elementId={item.id}
                                    defaultText={item.defaultText}
                                    tag="span"
                                />
                            </a>
                        ))}
                        <div className="px-3 py-2">
                            <a
                                href={ctaUrl}
                                id="header_cta"
                                data-element-id="header_cta"
                                onClick={(e) => {
                                    handleNavClick(e, ctaUrl);
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-center px-4 py-2 text-white font-semibold rounded-lg"
                                style={{
                                    backgroundColor: s.headerCtaBackground,
                                    color: s.headerCtaText,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = s.headerCtaHoverBackground;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = s.headerCtaBackground;
                                }}
                            >
                                <EditableText
                                    elementId="header_cta"
                                    defaultText="Consultoría gratuita"
                                    tag="span"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default ConsultingHeader;