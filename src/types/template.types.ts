// Tipos para colores personalizables
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

// Template completo
export interface Template {
    id: string;
    name: string;
    type: 'consulting' | 'catering' | 'accounting' | 'restaurant';
    colors: TemplateColors;
    texts: EditableTexts;
    images?: {
        [key: string]: string;
    };
    createdAt: Date;
    updatedAt: Date;
    userId?: string;
    version?: number;
}

// Tipo para almacenamiento (con fechas como string)
export interface StoredTemplate extends Omit<Template, 'createdAt' | 'updatedAt'> {
    createdAt: string;  // ISO string
    updatedAt: string;  // ISO string
    lastSaved?: string;
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

// Presets de colores - 5 para cada template con mejor contraste
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
        {
            name: 'Ejecutivo Azul Marino',
            colors: {
                primary: '#1e3a8a',
                secondary: '#1e293b',
                accent: '#0f172a',
                background: '#f8fafc',
                text: '#020617'
            }
        }
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
        {
            name: 'Terracota',
            colors: {
                primary: '#b45309',
                secondary: '#92400e',
                accent: '#78350f',
                background: '#fef3c7',
                text: '#422006'
            }
        },
        {
            name: 'Mostaza',
            colors: {
                primary: '#ca8a04',
                secondary: '#a16207',
                accent: '#854d0e',
                background: '#fef9c3',
                text: '#3f2e05'
            }
        },
        {
            name: 'Durazno',
            colors: {
                primary: '#f97316',
                secondary: '#c2410c',
                accent: '#9a3412',
                background: '#fff7ed',
                text: '#2d1b0e'
            }
        }
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
        {
            name: 'Sobrio Verde',
            colors: {
                primary: '#16a34a',
                secondary: '#15803d',
                accent: '#166534',
                background: '#f0fdf4',
                text: '#052e16'
            }
        },
        {
            name: 'Clásico Azul',
            colors: {
                primary: '#1e4b8a',
                secondary: '#1e3a5f',
                accent: '#0f2b4f',
                background: '#f5f9ff',
                text: '#0a1a2f'
            }
        },
        {
            name: 'Profesional Grafito',
            colors: {
                primary: '#2d3c4a',
                secondary: '#1f2a36',
                accent: '#141c26',
                background: '#f8fafc',
                text: '#0b1119'
            }
        },
        {
            name: 'Ejecutivo Borgoña',
            colors: {
                primary: '#7f1d1d',
                secondary: '#5c1717',
                accent: '#3f1010',
                background: '#fef2f2',
                text: '#2b0b0b'
            }
        }
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
        {
            name: 'Elegante Borgoña',
            colors: {
                primary: '#9d174d',
                secondary: '#831843',
                accent: '#73163e',
                background: '#fdf2f8',
                text: '#500724'
            }
        },
        {
            name: 'Rústico Terracota',
            colors: {
                primary: '#b45309',
                secondary: '#92400e',
                accent: '#7b3a0b',
                background: '#fef3c7',
                text: '#422006'
            }
        },
        {
            name: 'Mediterráneo',
            colors: {
                primary: '#b91c1c',
                secondary: '#a31515',
                accent: '#7f1d1d',
                background: '#fef3f3',
                text: '#3b0c0c'
            }
        },
        {
            name: 'Gourmet Oscuro',
            colors: {
                primary: '#7f1d1d',
                secondary: '#5c1717',
                accent: '#3f1010',
                background: '#faf5f5',
                text: '#2b0b0b'
            }
        }
    ]
};

// Tipo para los presets (para type safety)
export type ColorPreset = typeof colorPresets;
export type ColorPresetItem = {
    name: string;
    colors: TemplateColors;
};