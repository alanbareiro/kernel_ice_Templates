import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableText from '../../components/Editor/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';
import ThemeToggle from '../../Theme/ThemeToogle';

const SalonHeader: React.FC = () => {
    const { template } = useTemplate();
    const { config } = useTemplateEditor();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const colors = template?.colors || {
        primary: '#db2777',
        secondary: '#be185d',
        accent: '#9d174d',
        background: '#fdf2f8',
        text: '#831843'
    };

    const navItems = [
        { id: 'sl_nav_home', label: 'Inicio', href: '#home', visible: true },
        { id: 'sl_nav_services', label: 'Servicios', href: '#services', visible: true },
        { id: 'sl_nav_pricing', label: 'Precios', href: '#pricing', visible: true },
        { id: 'sl_nav_team', label: 'Profesionales', href: '#team', visible: true },
        { id: 'sl_nav_contact', label: 'Contacto', href: '#contact', visible: true },
    ];

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
            const logoElement = document.getElementById('sl_logo');
            if (logoElement) logoElement.click();
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-pink-950/95 backdrop-blur-md border-b border-pink-200 dark:border-pink-800">
            <div className="container-custom px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo editable */}
                    <a href="/" onClick={handleLogoClick} className="flex items-center space-x-3 group">
                        <div id="sl_logo" data-element-id="sl_logo">
                            <EditableImage
                                elementId="sl_logo"
                                defaultImage={defaultImages.beauty.logo}
                                alt="Kernelize Beauty Salon"
                                className="w-12 h-12 rounded-full object-cover"
                                category="beauty"
                            />
                        </div>
                        <div>
                            <EditableText
                                elementId="sl_header_brand_1"
                                defaultText="Kernelize"
                                tag="span"
                                className="text-2xl font-bold text-pink-800 dark:text-pink-200"
                            />
                            <EditableText
                                elementId="sl_header_brand_2"
                                defaultText="Beauty"
                                tag="span"
                                className="text-xl font-semibold text-pink-600 dark:text-pink-400 ml-1"
                            //style={{ color: colors.primary }}
                            />
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.filter(item => item.visible).map((item) => (
                            <a
                                key={item.id}
                                id={item.id}
                                data-element-id={item.id}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="text-pink-700 dark:text-pink-300 hover:text-pink-900 dark:hover:text-pink-100 font-medium transition-colors"
                            >
                                <EditableText elementId={item.id} defaultText={item.label} tag="span" />
                            </a>
                        ))}
                        <a
                            href="#contact"
                            id="sl_header_cta"
                            data-element-id="sl_header_cta"
                            onClick={(e) => handleNavClick(e, '#contact')}
                            className="px-5 py-2.5 text-white font-semibold rounded-full transition-all shadow-md hover:shadow-lg"
                            style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}
                        >
                            <EditableText elementId="sl_header_cta" defaultText="Reservá tu turno" tag="span" />
                        </a>
                        <ThemeToggle />
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-pink-700 dark:text-pink-300"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-pink-950 border-t border-pink-200 dark:border-pink-800">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.filter(item => item.visible).map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                className="block px-3 py-2 text-pink-700 dark:text-pink-300 hover:text-pink-900 dark:hover:text-pink-100 transition-colors"
                                onClick={(e) => {
                                    handleNavClick(e, item.href);
                                    setIsMenuOpen(false);
                                }}
                            >
                                <EditableText elementId={item.id} defaultText={item.label} tag="span" />
                            </a>
                        ))}
                        <div className="px-3 py-2">
                            <a
                                href="#contact"
                                className="block w-full text-center px-4 py-2 text-white font-semibold rounded-full"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}
                                onClick={(e) => {
                                    handleNavClick(e, '#contact');
                                    setIsMenuOpen(false);
                                }}
                            >
                                <EditableText elementId="sl_header_cta" defaultText="Reservá tu turno" tag="span" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default SalonHeader;