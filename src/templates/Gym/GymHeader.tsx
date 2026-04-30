// src/templates/Gym/GymHeader.tsx
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { defaultImages } from '../../assets/default-images';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';
// import ThemeToggle from '../../Theme/ThemeToogle';
import { defaultSectionColors } from '../../types/template.types';

const GymHeader: React.FC = () => {
    const { template } = useTemplate();
    const { config } = useTemplateEditor();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const sectionColors = template?.sectionColors || defaultSectionColors;

    const navItems = [
        { id: 'gm_nav_home', label: 'Inicio', href: '#home', visible: true },
        { id: 'gm_nav_classes', label: 'Clases', href: '#classes', visible: true },
        { id: 'gm_nav_pricing', label: 'Planes', href: '#pricing', visible: true },
        { id: 'gm_nav_trainers', label: 'Entrenadores', href: '#trainers', visible: true },
        { id: 'gm_nav_contact', label: 'Contacto', href: '#contact', visible: true },
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
            const logoElement = document.getElementById('gm_logo');
            if (logoElement) logoElement.click();
        }
    };

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
                    {/* Logo editable */}
                    <a href="/" onClick={handleLogoClick} className="flex items-center space-x-3 group">
                        <div id="gm_logo" data-element-id="gm_logo">
                            <EditableImage
                                elementId="gm_logo"
                                defaultImage={defaultImages.gym.logo}
                                alt="Kernelize Gym"
                                className="w-12 h-12 rounded-lg object-cover"
                                category="gym"
                            />
                        </div>
                        <div>
                            <span
                                className="text-2xl font-bold"
                                style={{ color: sectionColors.headerTextColor }}
                            >
                                <EditableText
                                    elementId="gm_header_brand_1"
                                    defaultText="Kernelize"
                                    tag="span"
                                />
                            </span>
                            <span
                                className="text-xl font-semibold ml-1"
                                style={{ color: sectionColors.buttonPrimaryBackground }}
                            >
                                <EditableText
                                    elementId="gm_header_brand_2"
                                    defaultText="Gym"
                                    tag="span"
                                />
                            </span>
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
                                className="font-medium transition-colors"
                                style={{ color: sectionColors.headerLinkColor }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = sectionColors.headerLinkHoverColor; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = sectionColors.headerLinkColor; }}
                            >
                                <EditableText elementId={item.id} defaultText={item.label} tag="span" />
                            </a>
                        ))}
                        <a
                            href="#contact"
                            id="gm_header_cta"
                            data-element-id="gm_header_cta"
                            onClick={(e) => handleNavClick(e, '#contact')}
                            className="px-5 py-2.5 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                            style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                        >
                            <EditableText elementId="gm_header_cta" defaultText="Comenzá hoy" tag="span" />
                        </a>
                        {/* <ThemeToggle /> */}
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        {/* <ThemeToggle /> */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2"
                            style={{ color: sectionColors.headerTextColor }}
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
                        backgroundColor: sectionColors.headerBackground,
                        borderColor: sectionColors.featuresCardBorder
                    }}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.filter(item => item.visible).map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                className="block px-3 py-2 transition-colors"
                                style={{ color: sectionColors.headerLinkColor }}
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
                                style={{ background: `linear-gradient(to right, ${sectionColors.buttonPrimaryBackground}, ${sectionColors.buttonPrimaryBackground})` }}
                                onClick={(e) => {
                                    handleNavClick(e, '#contact');
                                    setIsMenuOpen(false);
                                }}
                            >
                                <EditableText elementId="gm_header_cta" defaultText="Comenzá hoy" tag="span" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default GymHeader;