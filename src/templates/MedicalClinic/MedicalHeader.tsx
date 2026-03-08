import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/common/EditableText';
import EditableImage from '../../components/Editor/EditableImage';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';
import ThemeToggle from '../../Theme/ThemeToogle';

const MedicalHeader: React.FC = () => {
    const { template } = useTemplate();
    const { config } = useTemplateEditor();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const colors = template?.colors || {
        primary: '#0d9488',
        secondary: '#0f766e',
        accent: '#115e59',
        background: '#ffffff',
        text: '#1e293b'
    };

    const navItems = [
        { id: 'md_nav_home', label: 'Inicio', href: '#home', visible: true },
        { id: 'md_nav_services', label: 'Servicios', href: '#services', visible: true },
        { id: 'md_nav_doctors', label: 'Especialistas', href: '#doctors', visible: true },
        { id: 'md_nav_contact', label: 'Contacto', href: '#contact', visible: true },
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
            const logoElement = document.getElementById('md_logo');
            if (logoElement) logoElement.click();
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-teal-950/95 backdrop-blur-md border-b border-teal-200 dark:border-teal-800">
            <div className="container-custom px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo editable */}
                    <a href="/" onClick={handleLogoClick} className="flex items-center space-x-3 group">
                        <div id="md_logo" data-element-id="md_logo">
                            <EditableImage
                                elementId="md_logo"
                                defaultImage=""
                                alt="Kernelize Salud"
                                className="w-12 h-12 rounded-lg object-cover"
                                category="medical"
                            />
                        </div>
                        <div>
                            <EditableText
                                elementId="md_header_brand_1"
                                defaultText="Kernelize"
                                tag="span"
                                className="text-2xl font-bold text-teal-800 dark:text-teal-200"
                            />
                            <EditableText
                                elementId="md_header_brand_2"
                                defaultText="Salud"
                                tag="span"
                                className="text-xl font-semibold text-teal-600 dark:text-teal-400 ml-1"
                               // style={{ color: colors.primary }}
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
                                className="text-teal-700 dark:text-teal-300 hover:text-teal-900 dark:hover:text-teal-100 font-medium transition-colors"
                            >
                                <EditableText elementId={item.id} defaultText={item.label} tag="span" />
                            </a>
                        ))}
                        <a
                            href="#contact"
                            id="md_header_cta"
                            data-element-id="md_header_cta"
                            onClick={(e) => handleNavClick(e, '#contact')}
                            className="px-5 py-2.5 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                            style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}
                        >
                            <EditableText elementId="md_header_cta" defaultText="Agendar Cita" tag="span" />
                        </a>
                        <ThemeToggle />
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-teal-700 dark:text-teal-300"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-teal-950 border-t border-teal-200 dark:border-teal-800">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.filter(item => item.visible).map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                className="block px-3 py-2 text-teal-700 dark:text-teal-300 hover:text-teal-900 dark:hover:text-teal-100 transition-colors"
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
                                <EditableText elementId="md_header_cta" defaultText="Agendar Cita" tag="span" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default MedicalHeader;