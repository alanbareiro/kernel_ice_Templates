// src/data/templateDefaultColors.ts
import type { TemplateColors } from "../../types/template.types"

// Colores por defecto para cada tipo de template
export const templateDefaultColors: Record<string, TemplateColors> = {
    consulting: {
        primary: '#2563eb',
        secondary: '#475569',
        accent: '#1e293b',
        background: '#ffffff',
        text: '#0f172a',
    },
    catering: {
        primary: '#f59e0b',
        secondary: '#ea580c',
        accent: '#b45309',
        background: '#ffffff',
        text: '#422006',
    },
    accounting: {
        primary: '#059669',
        secondary: '#047857',
        accent: '#064e3b',
        background: '#ffffff',
        text: '#022c22',
    },
    restaurant: {
        primary: '#dc2626',
        secondary: '#b91c1c',
        accent: '#7f1d1d',
        background: '#ffffff',
        text: '#450a0a',
    },
    lawFirm: {
        primary: '#1e293b',
        secondary: '#334155',
        accent: '#0f172a',
        background: '#ffffff',
        text: '#020617',
    },
    medical: {
        primary: '#0891b2',
        secondary: '#0e7490',
        accent: '#155e75',
        background: '#ffffff',
        text: '#0f172a',
    },
    architecture: {
        primary: '#78716c',
        secondary: '#57534e',
        accent: '#44403c',
        background: '#ffffff',
        text: '#1c1917',
    },
    marketingAgency: {
        primary: '#8b5cf6',
        secondary: '#7c3aed',
        accent: '#6d28d9',
        background: '#ffffff',
        text: '#1e1b4b',
    },
    coffeeShop: {
        primary: '#d97706',
        secondary: '#b45309',
        accent: '#92400e',
        background: '#ffffff',
        text: '#431407',
    },
    bakery: {
        primary: '#f97316',
        secondary: '#ea580c',
        accent: '#c2410c',
        background: '#ffffff',
        text: '#2b0b0b',
    },
    foodTruck: {
        primary: '#f97316',
        secondary: '#ea580c',
        accent: '#c2410c',
        background: '#ffffff',
        text: '#2b0b0b',
    },
    beautySalon: {
        primary: '#ec489a',
        secondary: '#db2777',
        accent: '#be185d',
        background: '#ffffff',
        text: '#2c0b1e',
    },
    gym: {
        primary: '#ea580c',
        secondary: '#c2410c',
        accent: '#9a3412',
        background: '#030712',
        text: '#fafafa',
    },
    realEstate: {
        primary: '#059669',
        secondary: '#047857',
        accent: '#065f46',
        background: '#ffffff',
        text: '#022c22',
    },
    fashion: {
        primary: '#db2777',
        secondary: '#be185d',
        accent: '#9d174d',
        background: '#ffffff',
        text: '#1e0b17',
    },
    cleaning: {
        primary: '#0284c7',
        secondary: '#0369a1',
        accent: '#075985',
        background: '#ffffff',
        text: '#082f49',
    },
    saas: {
        primary: '#6366f1',
        secondary: '#4f46e5',
        accent: '#4338ca',
        background: '#ffffff',
        text: '#0f172a',
    },
    digitalAgency: {
        primary: '#06b6d4',
        secondary: '#0891b2',
        accent: '#0e7490',
        background: '#ffffff',
        text: '#164e63',
    },
    startup: {
        primary: '#f59e0b',
        secondary: '#d97706',
        accent: '#b45309',
        background: '#ffffff',
        text: '#2b0b0b',
    },
};

// Helper para obtener colores por defecto de un template
export const getDefaultTemplateColors = (type: string): TemplateColors => {
    return templateDefaultColors[type] || templateDefaultColors.consulting;
};