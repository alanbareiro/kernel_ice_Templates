// src/components/Editor/VisualEditorPanel.tsx - VERSIÓN CORREGIDA CON FALLBACKS
import {
    ChevronDown, ChevronRight, Eye,
    Layout, Link,
    Palette,
    Sparkles,
    Type
} from 'lucide-react';
import React, { useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultButtons, defaultSectionColors, defaultTypography, defaultUI } from '../../types/template.types';

type EditorSection = 'hero' | 'buttons' | 'header' | 'typography' | 'ui' | 'global';

export const VisualEditorPanel: React.FC = () => {
    const { template, updateSectionColors, updateTypography, updateUI, updateButtons } = useTemplate();
    const [expandedSection, setExpandedSection] = useState<EditorSection>('hero');

    const sections = [
        { id: 'hero' as EditorSection, label: '🎨 Hero (Sección principal)', icon: Eye },
        { id: 'buttons' as EditorSection, label: '🔘 Botones', icon: Link },
        { id: 'header' as EditorSection, label: '📋 Header (Barra superior)', icon: Layout },
        { id: 'typography' as EditorSection, label: '✏️ Tipografía', icon: Type },
        { id: 'ui' as EditorSection, label: '🎨 Bordes y sombras', icon: Palette },
        { id: 'global' as EditorSection, label: '🌍 Configuración global', icon: Sparkles },
    ];

    const SectionHeader = ({ section, label, icon: Icon }: { section: EditorSection; label: string; icon: React.ElementType }) => (
        <button
            onClick={() => setExpandedSection(expandedSection === section ? 'hero' : section)}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl mb-2"
        >
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-primary-500" />
                <span className="font-semibold text-gray-900 dark:text-white">{label}</span>
            </div>
            {expandedSection === section ?
                <ChevronDown className="w-5 h-5" /> :
                <ChevronRight className="w-5 h-5" />
            }
        </button>
    );

    if (!template) return null;

    // Valores por defecto para evitar undefined
    const sectionColors = template.sectionColors || defaultSectionColors;
    const typography = template.typography || defaultTypography;
    const ui = template.ui || defaultUI;
    const buttons = template.buttons || defaultButtons;

    return (
        <div className="space-y-3">
            {/* Hero Section */}
            <div>
                <SectionHeader section="hero" label="Hero (Sección principal)" icon={Eye} />
                {expandedSection === 'hero' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-3">
                        <h4 className="text-sm font-semibold mb-3">🎨 Colores del Hero</h4>

                        <ColorInput
                            label="Fondo del Hero"
                            value={sectionColors.heroBackground}
                            onChange={(color: string) => updateSectionColors({ heroBackground: color })}
                            description="Color de fondo de la sección principal"
                        />

                        <ColorInput
                            label="Color del título"
                            value={sectionColors.heroTitleColor}
                            onChange={(color: string) => updateSectionColors({ heroTitleColor: color })}
                            description="Color del texto principal"
                        />

                        <ColorInput
                            label="Color de la descripción"
                            value={sectionColors.heroDescriptionColor}
                            onChange={(color: string) => updateSectionColors({ heroDescriptionColor: color })}
                            description="Color del texto secundario"
                        />

                        <div className="border-t border-gray-200 dark:border-gray-700 my-3 pt-3">
                            <h4 className="text-sm font-semibold mb-3">✨ Badge (Etiqueta destacada)</h4>
                            <ColorInput
                                label="Fondo del badge"
                                value={sectionColors.heroBadgeBackground}
                                onChange={(color: string) => updateSectionColors({ heroBadgeBackground: color })}
                            />
                            <ColorInput
                                label="Texto del badge"
                                value={sectionColors.heroBadgeTextColor}
                                onChange={(color: string) => updateSectionColors({ heroBadgeTextColor: color })}
                            />
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 my-3 pt-3">
                            <h4 className="text-sm font-semibold mb-3">📏 Tamaños del Hero</h4>
                            <SizeInput
                                label="Tamaño del título"
                                value={typography.heroTitleSize}
                                onChange={(size: string) => updateTypography({ heroTitleSize: size })}
                                options={['2rem', '2.5rem', '3rem', '3.5rem', '4rem']}
                            />
                            <SizeInput
                                label="Tamaño de la descripción"
                                value={typography.heroDescriptionSize}
                                onChange={(size: string) => updateTypography({ heroDescriptionSize: size })}
                                options={['0.875rem', '1rem', '1.125rem', '1.25rem']}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Botones Section */}
            <div>
                <SectionHeader section="buttons" label="Botones" icon={Link} />
                {expandedSection === 'buttons' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-4">
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold">🔵 Botón principal</h4>
                            <TextInput
                                label="Texto del botón"
                                value={buttons.primary.text}
                                onChange={(text: string) => updateButtons({ primary: { ...buttons.primary, text } })}
                            />
                            <UrlInput
                                label="Enlace"
                                value={buttons.primary.url}
                                onChange={(url: string) => updateButtons({ primary: { ...buttons.primary, url } })}
                            />
                            <ColorInput
                                label="Color de fondo"
                                value={sectionColors.buttonPrimaryBackground}
                                onChange={(color: string) => updateSectionColors({ buttonPrimaryBackground: color })}
                            />
                            <ColorInput
                                label="Color del texto"
                                value={sectionColors.buttonPrimaryText}
                                onChange={(color: string) => updateSectionColors({ buttonPrimaryText: color })}
                            />
                            <ColorInput
                                label="Color al pasar el mouse"
                                value={sectionColors.buttonPrimaryHoverBackground}
                                onChange={(color: string) => updateSectionColors({ buttonPrimaryHoverBackground: color })}
                            />
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                            <h4 className="text-sm font-semibold mb-3">⚪ Botón secundario</h4>
                            <TextInput
                                label="Texto del botón"
                                value={buttons.secondary.text}
                                onChange={(text: string) => updateButtons({ secondary: { ...buttons.secondary, text } })}
                            />
                            <UrlInput
                                label="Enlace"
                                value={buttons.secondary.url}
                                onChange={(url: string) => updateButtons({ secondary: { ...buttons.secondary, url } })}
                            />
                            <ColorInput
                                label="Color de fondo"
                                value={sectionColors.buttonSecondaryBackground}
                                onChange={(color: string) => updateSectionColors({ buttonSecondaryBackground: color })}
                            />
                            <ColorInput
                                label="Color del texto"
                                value={sectionColors.buttonSecondaryText}
                                onChange={(color: string) => updateSectionColors({ buttonSecondaryText: color })}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Header Section */}
            <div>
                <SectionHeader section="header" label="Header (Barra superior)" icon={Layout} />
                {expandedSection === 'header' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-3">
                        <ColorInput
                            label="Fondo del header"
                            value={sectionColors.headerBackground}
                            onChange={(color: string) => updateSectionColors({ headerBackground: color })}
                        />
                        <ColorInput
                            label="Color del texto"
                            value={sectionColors.headerTextColor}
                            onChange={(color: string) => updateSectionColors({ headerTextColor: color })}
                        />
                        <ColorInput
                            label="Color de los enlaces"
                            value={sectionColors.headerLinkColor}
                            onChange={(color: string) => updateSectionColors({ headerLinkColor: color })}
                        />
                        <ColorInput
                            label="Color de enlaces al pasar mouse"
                            value={sectionColors.headerLinkHoverColor}
                            onChange={(color: string) => updateSectionColors({ headerLinkHoverColor: color })}
                        />
                    </div>
                )}
            </div>

            {/* Tipografía Section */}
            <div>
                <SectionHeader section="typography" label="Tipografía" icon={Type} />
                {expandedSection === 'typography' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-3">
                        <FontSelect
                            label="Fuente de títulos"
                            value={typography.headingFont}
                            onChange={(font: string) => updateTypography({ headingFont: font })}
                        />
                        <FontSelect
                            label="Fuente de textos"
                            value={typography.bodyFont}
                            onChange={(font: string) => updateTypography({ bodyFont: font })}
                        />
                        <SizeInput
                            label="Tamaño de títulos de sección"
                            value={typography.sectionTitleSize}
                            onChange={(size: string) => updateTypography({ sectionTitleSize: size })}
                            options={['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem']}
                        />
                        <SizeInput
                            label="Tamaño de texto general"
                            value={typography.bodyTextSize}
                            onChange={(size: string) => updateTypography({ bodyTextSize: size })}
                            options={['0.875rem', '1rem', '1.125rem']}
                        />
                    </div>
                )}
            </div>

            {/* UI Section */}
            <div>
                <SectionHeader section="ui" label="Bordes y sombras" icon={Palette} />
                {expandedSection === 'ui' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-3">
                        <BorderRadiusSelect
                            label="Bordes de botones"
                            value={ui.borderRadius.medium}
                            onChange={(radius: string) => updateUI({ borderRadius: { ...ui.borderRadius, medium: radius } })}
                        />
                        <BorderRadiusSelect
                            label="Bordes de tarjetas"
                            value={ui.borderRadius.large}
                            onChange={(radius: string) => updateUI({ borderRadius: { ...ui.borderRadius, large: radius } })}
                        />
                        <ShadowSelect
                            label="Sombra de tarjetas"
                            value={ui.boxShadow.medium}
                            onChange={(shadow: string) => updateUI({ boxShadow: { ...ui.boxShadow, medium: shadow } })}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

// Componentes auxiliares con tipado correcto
const ColorInput = ({ label, value, onChange, description }: {
    label: string;
    value: string;
    onChange: (color: string) => void;
    description?: string;
}) => (
    <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <div className="flex items-center gap-2">
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border border-gray-300"
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border rounded-lg font-mono"
            />
        </div>
        {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
);

const SizeInput = ({ label, value, onChange, options }: {
    label: string;
    value: string;
    onChange: (size: string) => void;
    options: string[];
}) => (
    <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg"
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const TextInput = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (text: string) => void;
}) => (
    <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg"
        />
    </div>
);

const UrlInput = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (url: string) => void;
}) => (
    <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <div className="flex gap-2">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="/ruta o https://..."
                className="flex-1 px-3 py-2 text-sm border rounded-lg"
            />
        </div>
    </div>
);

const FontSelect = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (font: string) => void;
}) => {
    const fonts = [
        { value: 'Inter, system-ui, sans-serif', label: 'Inter' },
        { value: 'Roboto, system-ui, sans-serif', label: 'Roboto' },
        { value: 'Poppins, system-ui, sans-serif', label: 'Poppins' },
        { value: 'Montserrat, system-ui, sans-serif', label: 'Montserrat' },
        { value: 'Open Sans, system-ui, sans-serif', label: 'Open Sans' },
        { value: 'system-ui, -apple-system, sans-serif', label: 'Sistema' },
    ];

    return (
        <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg"
                style={{ fontFamily: value }}
            >
                {fonts.map(font => (
                    <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                        {font.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

const BorderRadiusSelect = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (radius: string) => void;
}) => {
    const radii = [
        { value: '0.25rem', label: 'Pequeño (4px)' },
        { value: '0.5rem', label: 'Mediano (8px)' },
        { value: '0.75rem', label: 'Grande (12px)' },
        { value: '1rem', label: 'Extra grande (16px)' },
        { value: '9999px', label: 'Completamente redondo' },
    ];

    return (
        <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg"
            >
                {radii.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
            <div
                className="h-12 w-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2"
                style={{ borderRadius: value }}
            />
        </div>
    );
};

const ShadowSelect = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (shadow: string) => void;
}) => {
    const shadows = [
        { value: 'none', label: 'Sin sombra' },
        { value: '0 1px 2px 0 rgb(0 0 0 / 0.05)', label: 'Sutil' },
        { value: '0 4px 6px -1px rgb(0 0 0 / 0.1)', label: 'Mediana' },
        { value: '0 10px 15px -3px rgb(0 0 0 / 0.1)', label: 'Fuerte' },
        { value: '0 20px 25px -5px rgb(0 0 0 / 0.1)', label: 'Extra fuerte' },
    ];

    return (
        <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg"
            >
                {shadows.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <div
                className="h-12 w-full bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-xs"
                style={{ boxShadow: value }}
            >
                Vista previa
            </div>
        </div>
    );
};