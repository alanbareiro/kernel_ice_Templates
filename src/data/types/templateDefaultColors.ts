// src/data/templateDefaultColors.ts
import type { TemplateColors } from "../../types/template.types";

// Colores por defecto para cada tipo de template
export const templateDefaultColors: Record<string, TemplateColors> = {
    consulting: {
        primary: '#2563eb',
        secondary: '#4b5563',
        accent: '#1e293b',
        background: '#ffffff',
        text: '#111827'
    },
    catering: {
        primary: '#f59e0b',
        secondary: '#d97706',
        accent: '#b45309',
        background: '#fffbeb',
        text: '#78350f'
    },
    accounting: {
        primary: '#059669',
        secondary: '#047857',
        accent: '#064e3b',
        background: '#f0fdf4',
        text: '#022c22'
    },
    restaurant: {
        primary: '#dc2626',
        secondary: '#b91c1c',
        accent: '#991b1b',
        background: '#fef2f2',
        text: '#450a0a'
    },
    lawFirm: {
        primary: '#7f1d1d',
        secondary: '#991b1b',
        accent: '#450a0a',
        background: '#faf7f2',
        text: '#292524'
    },
    medical: {
        primary: '#0d9488',
        secondary: '#0f766e',
        accent: '#115e59',
        background: '#f0fdfa',
        text: '#042f2e'
    },
    architecture: {
        primary: '#57534e',
        secondary: '#44403c',
        accent: '#292524',
        background: '#fafaf9',
        text: '#1c1917'
    },
    marketingAgency: {
        primary: '#c026d3',
        secondary: '#a21caf',
        accent: '#86198f',
        background: '#faf5ff',
        text: '#4a044e'
    },
    coffeeShop: {
        primary: '#b45309',
        secondary: '#92400e',
        accent: '#78350f',
        background: '#fef3c7',
        text: '#422006'
    },
    bakery: {
        primary: '#e11d48',
        secondary: '#be123c',
        accent: '#9f1239',
        background: '#fff1f2',
        text: '#4c0519'
    },
    foodTruck: {
        primary: '#e67e22',
        secondary: '#d35400',
        accent: '#a04000',
        background: '#fef3c7',
        text: '#5d3a1a'
    },
    beautySalon: {
        primary: '#db2777',
        secondary: '#be185d',
        accent: '#9d174d',
        background: '#fdf2f8',
        text: '#831843'
    },
    gym: {
        primary: '#ea580c',
        secondary: '#c2410c',
        accent: '#9a3412',
        background: '#f5f5f4',
        text: '#1c1917'
    },
    realEstate: {
        primary: '#2d6a4f',
        secondary: '#1e4b3a',
        accent: '#0d2f24',
        background: '#f8fafc',
        text: '#081c15'
    },
    fashion: {
        primary: '#000000',
        secondary: '#1f2937',
        accent: '#4b5563',
        background: '#ffffff',
        text: '#111827'
    },
    cleaning: {
        primary: '#0284c7',
        secondary: '#0369a1',
        accent: '#075985',
        background: '#f0f9ff',
        text: '#0c4a6e'
    },
    saas: {
        primary: '#7c3aed',
        secondary: '#6d28d9',
        accent: '#5b21b6',
        background: '#f5f3ff',
        text: '#1e1e3f'
    },
    digitalAgency: {
        primary: '#0891b2',
        secondary: '#0e7490',
        accent: '#155e75',
        background: '#ecfeff',
        text: '#164e63'
    },
    startup: {
        primary: '#059669',
        secondary: '#047857',
        accent: '#065f46',
        background: '#ecfdf5',
        text: '#064e3b'
    },
};

// Helper para obtener colores por defecto de un template
export const getDefaultTemplateColors = (type: string): TemplateColors => {
    return templateDefaultColors[type] || templateDefaultColors.consulting;
};