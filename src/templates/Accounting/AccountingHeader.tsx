import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from '../../Theme/ThemeToogle';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

const AccountingHeader = () => {
    const { template } = useTemplate();
    const { config } = useTemplateEditor();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const colors = template?.colors || {
        primary: '#059669',
        secondary: '#047857',
        accent: '#064e3b',
        background: '#ffffff',
        text: '#022c22'
    };

    const navItems = [
        { id: 'a_nav_home', label: 'Inicio', href: '#home', visible: true },
        { id: 'a_nav_services', label: 'Servicios', href: '#services', visible: true },
        { id: 'a_nav_about', label: 'Nosotros', href: '#about', visible: true },
        { id: 'a_nav_contact', label: 'Contacto', href: '#contact', visible: true },
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
            const logoElement = document.getElementById('accounting_logo');
            if (logoElement) logoElement.click();
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-emerald-950/95 backdrop-blur-md border-b border-emerald-200 dark:border-emerald-800">
            <div className="container-custom px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo editable */}
                    <a href="/" onClick={handleLogoClick} className="flex items-center space-x-3 group">
                        <div id="accounting_logo" data-element-id="accounting_logo">
                            <EditableImage
                                elementId="accounting_logo"
                                defaultImage={defaultImages.accounting.logo}
                                alt="Kernelize Contadores"
                                className="w-12 h-12 rounded-lg object-cover"
                                category="accounting"
                            />
                        </div>
                        <div>
                            <EditableText
                                elementId="a_header_brand_1"
                                defaultText="Kernelize"
                                tag="span"
                                className="text-2xl font-bold text-emerald-800 dark:text-emerald-400"
                            />
                            <EditableText
                                elementId="a_header_brand_2"
                                defaultText="Contadores"
                                tag="span"
                                className="text-xl font-semibold text-emerald-600 dark:text-emerald-300 ml-1"
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
                                className="text-emerald-800 dark:text-emerald-200 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
                            >
                                <EditableText elementId={item.id} defaultText={item.label} tag="span" />
                            </a>
                        ))}
                        <a
                            href="#contact"
                            id="a_header_cta"
                            data-element-id="a_header_cta"
                            onClick={(e) => handleNavClick(e, '#contact')}
                            className="px-5 py-2.5 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                            style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}
                        >
                            <EditableText elementId="a_header_cta" defaultText="Consulta gratuita" tag="span" />
                        </a>
                        <ThemeToggle />
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-emerald-800 dark:text-emerald-200"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-emerald-950 border-t border-emerald-200 dark:border-emerald-800">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.filter(item => item.visible).map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                className="block px-3 py-2 text-emerald-800 dark:text-emerald-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
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
                                className="block w-full text-center px-4 py-2 text-white font-semibold rounded-lg"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}
                                onClick={(e) => {
                                    handleNavClick(e, '#contact');
                                    setIsMenuOpen(false);
                                }}
                            >
                                <EditableText elementId="a_header_cta" defaultText="Consulta gratuita" tag="span" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default AccountingHeader;