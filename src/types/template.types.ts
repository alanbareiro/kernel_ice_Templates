// src/types/template.types.ts - VERSIÓN COMPLETA Y CORREGIDA

// Tipos para colores personalizables (versión simple)
export interface TemplateColors {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
}

// Textos editables
export interface EditableTexts {
    [key: string]: string;
}

// Configuración de edición
export interface EditorConfig {
    isEditing: boolean;
    selectedElement: string | null;
    showEditor: boolean;
    notifications: {
        show: boolean;
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    } | null;
}

// Colores por sección
export interface SectionColors {
    heroBackground: string;
    heroTitleColor: string;
    heroDescriptionColor: string;
    heroBadgeBackground: string;
    heroBadgeTextColor: string;

    buttonPrimaryBackground: string;
    buttonPrimaryText: string;
    buttonPrimaryHoverBackground: string;
    buttonSecondaryBackground: string;
    buttonSecondaryText: string;
    buttonSecondaryHoverBackground: string;

    headerBackground: string;
    headerTextColor: string;
    headerLinkColor: string;
    headerLinkHoverColor: string;

    featuresBackground: string;
    featuresTitleColor: string;
    featuresCardBackground: string;
    featuresCardBorder: string;

    footerBackground: string;
    footerTextColor: string;
    footerLinkColor: string;
    footerHeadingColor: string;

    bodyBackground: string;
    bodyTextColor: string;
}

// Configuración de tipografía
export interface TypographyConfig {
    heroTitleSize: string;
    heroDescriptionSize: string;
    sectionTitleSize: string;
    bodyTextSize: string;
    headingFont: string;
    bodyFont: string;
    headingWeight: string;
    bodyWeight: string;
}

// Configuración de UI
export interface UIConfig {
    borderRadius: {
        small: string;
        medium: string;
        large: string;
        full: string;
    };
    boxShadow: {
        small: string;
        medium: string;
        large: string;
        none: string;
    };
    spacing: {
        sectionPadding: string;
        elementGap: string;
    };
}

// Configuración de botones
export interface ButtonConfig {
    primary: {
        text: string;
        url: string;
        openInNewTab: boolean;
    };
    secondary: {
        text: string;
        url: string;
        openInNewTab: boolean;
    };
    ctaButtons?: Record<string, {
        text: string;
        url: string;
        openInNewTab: boolean;
    }>;
}

// Template completo
export interface Template {
    id: string;
    name: string;
    type: string;
    colors: TemplateColors;
    sectionColors: SectionColors;
    typography: TypographyConfig;
    ui: UIConfig;
    buttons: ButtonConfig;
    texts: Record<string, string>;
    images?: Record<string, string>;
    createdAt: Date;
    updatedAt: Date;
    userId?: string;
    version?: number;
}

// Tipo para almacenamiento
export interface StoredTemplate extends Omit<Template, 'createdAt' | 'updatedAt'> {
    createdAt: string;
    updatedAt: string;
    lastSaved?: string;
}

// Presets de colores
export const colorPresets = {
    consulting: [
        {
            name: 'Profesional Azul',
            colors: {
                primary: '#2563eb',
                secondary: '#4b5563',
                accent: '#1e293b',
                background: '#ffffff',
                text: '#111827'
            }
        },
        {
            name: 'Ejecutivo Oscuro',
            colors: {
                primary: '#1e40af',
                secondary: '#374151',
                accent: '#0f172a',
                background: '#f3f4f6',
                text: '#030712'
            }
        },
        {
            name: 'Minimalista Gris',
            colors: {
                primary: '#4b5563',
                secondary: '#6b7280',
                accent: '#374151',
                background: '#f9fafb',
                text: '#1f2937'
            }
        },
        {
            name: 'Corporativo Verde',
            colors: {
                primary: '#047857',
                secondary: '#065f46',
                accent: '#064e3b',
                background: '#ecfdf5',
                text: '#022c22'
            }
        },
        {
            name: 'Moderno Púrpura',
            colors: {
                primary: '#7c3aed',
                secondary: '#6d28d9',
                accent: '#5b21b6',
                background: '#f5f3ff',
                text: '#2e1065'
            }
        },
    ],
    catering: [
        {
            name: 'Cálido Ámbar',
            colors: {
                primary: '#f59e0b',
                secondary: '#d97706',
                accent: '#b45309',
                background: '#fffbeb',
                text: '#78350f'
            }
        },
        {
            name: 'Elegante Naranja',
            colors: {
                primary: '#ea580c',
                secondary: '#c2410c',
                accent: '#9a3412',
                background: '#fff7ed',
                text: '#431407'
            }
        },
    ],
    accounting: [
        {
            name: 'Formal Esmeralda',
            colors: {
                primary: '#059669',
                secondary: '#047857',
                accent: '#064e3b',
                background: '#f0fdf4',
                text: '#022c22'
            }
        },
    ],
    restaurant: [
        {
            name: 'Apetitoso Rojo',
            colors: {
                primary: '#dc2626',
                secondary: '#b91c1c',
                accent: '#991b1b',
                background: '#fef2f2',
                text: '#450a0a'
            }
        },
    ]
};

// Valores por defecto
export const defaultSectionColors: SectionColors = {
    heroBackground: '#f8fafc',
    heroTitleColor: '#1e293b',
    heroDescriptionColor: '#475569',
    heroBadgeBackground: '#2563eb',
    heroBadgeTextColor: '#ffffff',
    buttonPrimaryBackground: '#2563eb',
    buttonPrimaryText: '#ffffff',
    buttonPrimaryHoverBackground: '#1d4ed8',
    buttonSecondaryBackground: '#ffffff',
    buttonSecondaryText: '#1e293b',
    buttonSecondaryHoverBackground: '#f1f5f9',
    headerBackground: '#ffffff',
    headerTextColor: '#1e293b',
    headerLinkColor: '#475569',
    headerLinkHoverColor: '#2563eb',
    featuresBackground: '#ffffff',
    featuresTitleColor: '#1e293b',
    featuresCardBackground: '#ffffff',
    featuresCardBorder: '#e2e8f0',
    footerBackground: '#0f172a',
    footerTextColor: '#94a3b8',
    footerLinkColor: '#cbd5e1',
    footerHeadingColor: '#ffffff',
    bodyBackground: '#ffffff',
    bodyTextColor: '#334155',
};

export const defaultTypography: TypographyConfig = {
    heroTitleSize: '3rem',
    heroDescriptionSize: '1.125rem',
    sectionTitleSize: '2rem',
    bodyTextSize: '1rem',
    headingFont: 'Inter, system-ui, sans-serif',
    bodyFont: 'Inter, system-ui, sans-serif',
    headingWeight: '700',
    bodyWeight: '400',
};

export const defaultUI: UIConfig = {
    borderRadius: {
        small: '0.375rem',
        medium: '0.5rem',
        large: '0.75rem',
        full: '9999px',
    },
    boxShadow: {
        small: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        medium: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        large: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        none: 'none',
    },
    spacing: {
        sectionPadding: '4rem',
        elementGap: '1.5rem',
    },
};

export const defaultButtons: ButtonConfig = {
    primary: {
        text: 'Solicitar consultoría',
        url: '/contacto',
        openInNewTab: false,
    },
    secondary: {
        text: 'Conocer metodología',
        url: '#metodologia',
        openInNewTab: false,
    },
};