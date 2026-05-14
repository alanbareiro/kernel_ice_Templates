import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { defaultImages } from '../../../assets/default-images';
import EditableImage from '../../../components/Editor/EditableImage';
import EditableText from '../../../components/Editor/EditableText';
import { useTemplate } from '../../../contexts/TemplateContext';
import { useTemplateEditor } from '../../../contexts/TemplateEditorContext';
import { defaultSectionColors } from '../../../types/template.types';

const DEFAULT_NAV_LINKS = [
    { id: 'default_1', text: 'Inicio', url: '#home', visible: true },
    { id: 'default_2', text: 'Servicios', url: '#services', visible: true },
    { id: 'default_3', text: 'Menú', url: '#menu', visible: true },
    { id: 'default_4', text: 'Galería', url: '#gallery', visible: true },
    { id: 'default_5', text: 'Contacto', url: '#contact', visible: true },
];

const CateringHeader = () => {
    const { template } = useTemplate();
    const { config } = useTemplateEditor();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [navLinks, setNavLinks] = useState(DEFAULT_NAV_LINKS);

    const sectionColors = template?.sectionColors || defaultSectionColors;

    useEffect(() => {
        const stored = template?.texts?.['c_nav_link_'];
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setNavLinks(parsed);
                    return;
                }
            } catch (e) { }
        }
        setNavLinks(DEFAULT_NAV_LINKS);
    }, [template?.texts]);

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
            const logoElement = document.getElementById('catering_logo');
            if (logoElement) logoElement.click();
        }
    };

    const ctaUrl = template?.texts?.catering_cta_url || '#contact';
    const showCta = template?.texts?.show_header_cta !== 'false';

    return (
        <header
            className="sticky top-0 z-50 backdrop-blur-md border-b"
            style={{
                backgroundColor: `${sectionColors.headerBackground}cc`,
                borderColor: sectionColors.featuresCardBorder
            }}
        >
            <div className="container-custom px-6 py-4">
                <div className="flex items-center justify-between">
                    <a href="/" onClick={handleLogoClick} className="flex items-center space-x-3 group">
                        <div id="catering_logo" data-element-id="catering_logo">
                            <EditableImage
                                elementId="catering_logo"
                                defaultImage={defaultImages.catering.logo}
                                alt="Kernelize Catering"
                                className="w-12 h-12 rounded-full object-cover"
                                category="catering"
                            />
                        </div>
                        <div>
                            <span
                                className="text-2xl font-bold"
                                style={{ color: sectionColors.headerTextColor }}
                            >
                                <EditableText elementId="catering_brand_1" defaultText="Kernelize" tag="span" />
                            </span>
                            <span
                                className="text-xl font-semibold ml-1"
                                style={{ color: sectionColors.buttonPrimaryBackground }}
                            >
                                <EditableText elementId="catering_brand_2" defaultText="Catering" tag="span" />
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => {
                            if (link.visible === false) return null;
                            return (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    onClick={(e) => handleNavClick(e, link.url)}
                                    className="font-medium transition-colors"
                                    style={{ color: sectionColors.headerLinkColor }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = sectionColors.headerLinkHoverColor; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = sectionColors.headerLinkColor; }}
                                >
                                    {link.text}
                                </a>
                            );
                        })}
                        {showCta && (
                            <a
                                href={ctaUrl}
                                onClick={(e) => handleNavClick(e, ctaUrl)}
                                className="px-5 py-2.5 text-white font-semibold rounded-full transition-all shadow-md hover:shadow-lg"
                                style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                            >
                                <EditableText elementId="catering_cta" defaultText="Cotizar evento" tag="span" />
                            </a>
                        )}
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2" style={{ color: sectionColors.headerTextColor }}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t" style={{ backgroundColor: sectionColors.headerBackground, borderColor: sectionColors.featuresCardBorder }}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => {
                            if (link.visible === false) return null;
                            return (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    className="block px-3 py-2 transition-colors"
                                    style={{ color: sectionColors.headerLinkColor }}
                                    onClick={(e) => { handleNavClick(e, link.url); setIsMenuOpen(false); }}
                                >
                                    {link.text}
                                </a>
                            );
                        })}
                        {showCta && (
                            <div className="px-3 py-2">
                                <a
                                    href={ctaUrl}
                                    className="block w-full text-center px-4 py-2 text-white font-semibold rounded-full"
                                    style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                    onClick={(e) => { handleNavClick(e, ctaUrl); setIsMenuOpen(false); }}
                                >
                                    <EditableText elementId="catering_cta" defaultText="Cotizar evento" tag="span" />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default CateringHeader;