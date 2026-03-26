import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import logoDefault from '../../assets/logo.png';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

interface ConsultingHeaderProps {
    className?: string;
}

const ConsultingHeader: React.FC<ConsultingHeaderProps> = ({ className = '' }) => {
    const { template } = useTemplate();
    const { config } = useTemplateEditor();
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    // ✅ Log para ver qué template está usando
    // console.log('🎨 ConsultingHeader - useTemplate() llamado, resultado:', template);
    // console.log('🎨 ConsultingHeader - colors:', template?.colors);


    const colors = template?.colors || {
        primary: '#a7b1c7',
        secondary: '#475569',
        accent: '#1e293b',
        background: '#ffffff',
        text: '#424652'
    };

    // Navegación editable
    const navItems = [
        { id: 'nav_home', label: 'Inicio', href: '#home', visible: true },
        { id: 'nav_services', label: 'Servicios', href: '#services', visible: true },
        { id: 'nav_methodology', label: 'Metodología', href: '#methodology', visible: true },
        { id: 'nav_testimonials', label: 'Casos de éxito', href: '#testimonials', visible: true },
        { id: 'nav_contact', label: 'Contacto', href: '#contact', visible: true },
    ];

    // Manejar click en enlaces durante modo edición
    const handleNavClick = (e: React.MouseEvent, href: string) => {
        if (config.isEditing) {
            e.preventDefault();
            // Si estamos en modo edición, no navegamos
            return;
        }
        // Si no estamos en modo edición, navegamos normalmente
        window.location.href = href;
    };

    // Manejar click en el logo
    const handleLogoClick = (e: React.MouseEvent) => {
        if (config.isEditing) {
            e.preventDefault();
            // En modo edición, activamos la edición del logo
            const logoElement = document.getElementById('header_logo');
            if (logoElement) {
                logoElement.click();
            }
        }
    };

    return (
        <header className={`sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 ${className}`}>
            <div className="container-custom px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo editable */}
                    <a
                        href="/"
                        onClick={handleLogoClick}
                        className="flex items-center space-x-3 group"
                    >
                        <div
                            id="header_logo"
                            data-element-id="header_logo"
                            className="relative"
                        >
                            <EditableImage
                                elementId="header_logo"
                                defaultImage={logoDefault}
                                alt="Kernelize Consulting"
                                className="w-12 h-12 rounded-lg object-cover"
                                category="consulting"
                            />
                        </div>
                        <div className="text-2xl font-bold">
                            <EditableText
                                elementId="header_brand_1"
                                defaultText="KE"
                                tag="span"
                                className="text-blue-600 dark:text-blue-400"
                            />
                            <EditableText
                                elementId="header_brand_2"
                                defaultText="Consulting"
                                tag="span"
                                className="text-slate-600 dark:text-slate-400 ml-1"
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
                                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                            >
                                <EditableText
                                    elementId={item.id}
                                    defaultText={item.label}
                                    tag="span"
                                />
                            </a>
                        ))}
                        <a
                            href="#contact"
                            id="header_cta"
                            data-element-id="header_cta"
                            onClick={(e) => handleNavClick(e, '#contact')}
                            className="px-5 py-2.5 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                            style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}
                        >
                            <EditableText
                                elementId="header_cta"
                                defaultText="Consultoría gratuita"
                                tag="span"
                            />
                        </a>
                        {/* <ThemeToggle /> */}
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        {/* <ThemeToggle /> */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.filter(item => item.visible).map((item) => (
                            <a
                                key={item.id}
                                id={item.id}
                                data-element-id={item.id}
                                href={item.href}
                                onClick={(e) => {
                                    handleNavClick(e, item.href);
                                    setIsMenuOpen(false);
                                }}
                                className="block px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                <EditableText
                                    elementId={item.id}
                                    defaultText={item.label}
                                    tag="span"
                                />
                            </a>
                        ))}
                        <div className="px-3 py-2">
                            <a
                                href="#contact"
                                id="header_cta"
                                data-element-id="header_cta"
                                onClick={(e) => {
                                    handleNavClick(e, '#contact');
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-center px-4 py-2 text-white font-semibold rounded-lg"
                                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}
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