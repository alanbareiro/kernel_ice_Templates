import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from '../../Theme/ThemeToogle';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

const CateringHeader = () => {
    const { template } = useTemplate();
    const { config } = useTemplateEditor();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const colors = template?.colors || {
        primary: '#f59e0b',
        secondary: '#d97706',
        accent: '#b45309',
        background: '#ffffff',
        text: '#78350f'
    };

    const navItems = [
        { id: 'c_nav_home', label: 'Inicio', href: '#home', visible: true },
        { id: 'c_nav_services', label: 'Servicios', href: '#services', visible: true },
        { id: 'c_nav_menu', label: 'Menú', href: '#menu', visible: true },
        { id: 'c_nav_gallery', label: 'Galería', href: '#gallery', visible: true },
        { id: 'c_nav_contact', label: 'Contacto', href: '#contact', visible: true },
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
            const logoElement = document.getElementById('catering_logo');
            if (logoElement) logoElement.click();
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-amber-950/95 backdrop-blur-md border-b border-amber-200 dark:border-amber-800">
            <div className="container-custom px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo editable */}
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
                            <EditableText
                                elementId="catering_brand_1"
                                defaultText="Kernelize"
                                tag="span"
                                className="text-2xl font-bold text-amber-700 dark:text-amber-400"
                            />
                            <EditableText
                                elementId="catering_brand_2"
                                defaultText="Catering"
                                tag="span"
                                className="text-xl font-semibold text-orange-600 dark:text-orange-400 ml-1"
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
                                className="text-amber-800 dark:text-amber-200 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors"
                            >
                                <EditableText elementId={item.id} defaultText={item.label} tag="span" />
                            </a>
                        ))}
                        <a
                            href="#contact"
                            id="catering_cta"
                            data-element-id="catering_cta"
                            onClick={(e) => handleNavClick(e, '#contact')}
                            className="px-5 py-2.5 text-white font-semibold rounded-full transition-all shadow-md hover:shadow-lg"
                            style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}
                        >
                            <EditableText elementId="catering_cta" defaultText="Cotizar evento" tag="span" />
                        </a>
                        <ThemeToggle />
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-amber-800 dark:text-amber-200"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-amber-950 border-t border-amber-200 dark:border-amber-800">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.filter(item => item.visible).map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                className="block px-3 py-2 text-amber-800 dark:text-amber-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
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
                                <EditableText elementId="catering_cta" defaultText="Cotizar evento" tag="span" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default CateringHeader;