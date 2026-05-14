// src/config/templateConfig.ts
import {
    Award,
    BarChart,
    Clock,
    Eye,
    FileText,
    Image,
    Info,
    Layout,
    Link,
    Link2,
    List,
    Mail,
    MessageSquare,
    Palette,
    Share2,
    Smile,
    Sparkles,
    Target,
    Type,
    UtensilsCrossed,
    type LucideIcon
} from 'lucide-react';
import type { SectionColors, TypographyConfig } from '../types/template.types';

// Interfaz para la configuración de un campo
export interface FieldConfig {
    type: 'color' | 'text' | 'size' | 'font' | 'icon' | 'checkbox' | 'image' | 'list';
    key: string;
    label: string;
    colorKey?: keyof SectionColors;
    textKey?: string;
    sizeKey?: keyof TypographyConfig;
    fontKey?: keyof TypographyConfig;
    iconKey?: string;
    checkboxKey?: string;
    imageElementId?: string;
    listConfig?: DynamicListConfig;
    defaultValue?: any;
    options?: string[] | { value: string; label: string; icon?: LucideIcon }[];
    sectionColorKey?: keyof SectionColors;
}

export interface DynamicListConfig {
    itemKeyPrefix: string;
    defaultCount: number;
    maxCount: number;
    fields: {
        type: 'text' | 'icon' | 'image' | 'color' | 'checkbox';
        key: string;
        label: string;
        defaultValue?: string | boolean;
        options?: any;
    }[];
    // 👇 NUEVO: valores específicos para los primeros ítems (si no se proporciona, se usa defaultValue)
    defaultItems?: any[];
}

export interface GroupConfig {
    id: string;
    title: string;
    icon: LucideIcon;
    fields?: FieldConfig[];
    dynamicList?: DynamicListConfig;
}

export interface SectionConfig {
    id: string;
    title: string;
    icon: LucideIcon;
    groups: GroupConfig[];
}

export interface TemplateConfig {
    sections: SectionConfig[];
}

// ==================== CONFIGURACIÓN DE CONSULTING COMPLETA ====================

const consultingConfig: TemplateConfig = {
    sections: [
        // ========== ESTILO DE FUENTE (global) ==========
        {
            id: 'typography',
            title: 'Estilo de Fuente',
            icon: Type,
            groups: [
                {
                    id: 'global_fonts',
                    title: 'Fuentes globales',
                    icon: Type,
                    fields: [
                        { type: 'font', label: 'Fuente de títulos', fontKey: 'headingFont', key: 'headingFont' },
                        { type: 'font', label: 'Fuente de textos', fontKey: 'bodyFont', key: 'bodyFont' },
                        { type: 'size', label: 'Peso de títulos', sizeKey: 'headingWeight', key: 'headingWeight', options: ['400', '500', '600', '700', '800'] },
                        { type: 'size', label: 'Peso de textos', sizeKey: 'bodyWeight', key: 'bodyWeight', options: ['300', '400', '500', '600'] },
                    ]
                }
            ]
        },
        // ========== HEADER ==========
        {
            id: 'header',
            title: 'Header',
            icon: Layout,
            groups: [
                {
                    id: 'logo',
                    title: 'Logo',
                    icon: Image,
                    fields: [
                        { type: 'image', label: 'Imagen del logo', imageElementId: 'header_logo', key: 'header_logo' },
                        { type: 'text', label: 'Texto parte 1 (KE)', textKey: 'header_brand_1', key: 'header_brand_1', defaultValue: 'KE' },
                        { type: 'text', label: 'Texto parte 2 (Consulting)', textKey: 'header_brand_2', key: 'header_brand_2', defaultValue: 'Consulting' },
                        { type: 'color', label: 'Color del texto 1 (KE)', sectionColorKey: 'logoTextColor1', key: 'logoTextColor1', defaultValue: '#2563eb' },
                        { type: 'color', label: 'Color del texto 2 (Consulting)', sectionColorKey: 'logoTextColor2', key: 'logoTextColor2', defaultValue: '#475569' },
                        { type: 'size', label: 'Tamaño del texto', key: 'logoTextSize', options: ['text-lg', 'text-xl', 'text-2xl', 'text-3xl'] },
                    ]
                },
                {
                    id: 'header_colors',
                    title: 'Colores del Header',
                    icon: Palette,
                    fields: [
                        { type: 'color', label: 'Fondo del header', sectionColorKey: 'headerBackground', key: 'headerBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color de los enlaces', sectionColorKey: 'headerLinkColor', key: 'headerLinkColor', defaultValue: '#475569' },
                        { type: 'color', label: 'Color de enlaces al pasar mouse', sectionColorKey: 'headerLinkHoverColor', key: 'headerLinkHoverColor', defaultValue: '#2563eb' },
                    ]
                },
                {
                    id: 'nav_links',
                    title: 'Enlaces de navegación',
                    icon: Link,
                    dynamicList: {
                        itemKeyPrefix: 'nav_link_',
                        defaultCount: 5,
                        maxCount: 8,
                        fields: [
                            { type: 'text', key: 'text', label: 'Texto', defaultValue: 'Inicio' },
                            { type: 'text', key: 'url', label: 'Destino', defaultValue: '#home' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        // 👇 NUEVO: valores específicos para los primeros 5 enlaces
                        defaultItems: [
                            { text: 'Inicio', url: '#home', visible: true },
                            { text: 'Servicios', url: '#services', visible: true },
                            { text: 'Metodología', url: '#methodology', visible: true },
                            { text: 'Casos de éxito', url: '#testimonials', visible: true },
                            { text: 'Contacto', url: '#contact', visible: true }
                        ]
                    }
                },
                {
                    id: 'header_cta',
                    title: 'Botón CTA del header',
                    icon: Link2,
                    fields: [
                        { type: 'text', label: 'Texto del botón', textKey: 'header_cta', key: 'header_cta', defaultValue: 'Consultoría gratuita' },
                        { type: 'text', label: 'Enlace', textKey: 'header_cta_url', key: 'header_cta_url', defaultValue: '#contact' },
                        { type: 'color', label: 'Color de fondo', sectionColorKey: 'headerCtaBackground', key: 'headerCtaBackground', defaultValue: '#2563eb' },
                        { type: 'color', label: 'Color del texto', sectionColorKey: 'headerCtaText', key: 'headerCtaText', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color al pasar el mouse', sectionColorKey: 'headerCtaHoverBackground', key: 'headerCtaHoverBackground', defaultValue: '#1d4ed8' },
                        { type: 'checkbox', label: 'Mostrar botón', checkboxKey: 'show_header_cta', key: 'show_header_cta', defaultValue: true },
                    ]
                }
            ]
        },
        // ========== HERO ==========
        {
            id: 'hero',
            title: 'Hero (Sección principal)',
            icon: Eye,
            groups: [
                {
                    id: 'hero_images',
                    title: 'Imágenes',
                    icon: Image,
                    fields: [
                        { type: 'image', label: 'Imagen principal', imageElementId: 'hero_image', key: 'hero_image' },
                    ]
                },
                {
                    id: 'hero_texts',
                    title: 'Textos',
                    icon: Type,
                    fields: [
                        { type: 'text', label: 'Badge', textKey: 'hero_badge', key: 'hero_badge', defaultValue: 'Consultoría Estratégica de Negocios' },
                        { type: 'text', label: 'Título (parte 1)', textKey: 'hero_title_1', key: 'hero_title_1', defaultValue: 'Impulsamos el' },
                        { type: 'text', label: 'Título (parte 2)', textKey: 'hero_title_2', key: 'hero_title_2', defaultValue: 'Crecimiento Sostenible' },
                        { type: 'text', label: 'Título (parte 3)', textKey: 'hero_title_3', key: 'hero_title_3', defaultValue: 'de tu Empresa' },
                        { type: 'text', label: 'Descripción', textKey: 'hero_description', key: 'hero_description', defaultValue: 'Análisis profundo, estrategias personalizadas y acompañamiento continuo para llevar tu negocio al siguiente nivel.' },
                    ]
                },
                {
                    id: 'hero_decorative_icons',
                    title: 'Iconos decorativos y estadísticas',
                    icon: Smile,
                    fields: [
                        // Color y tamaño de iconos
                        { type: 'color', label: 'Color de los iconos', sectionColorKey: 'iconColor', key: 'iconColor', defaultValue: '#475569' },
                        {
                            type: 'size', label: 'Tamaño de los iconos', key: 'iconSize', options: [
                                { value: 'w-4 h-4', label: 'Pequeño (16px)' },
                                { value: 'w-5 h-5', label: 'Mediano (20px)' },
                                { value: 'w-6 h-6', label: 'Grande (24px)' },
                                { value: 'w-8 h-8', label: 'Extra grande (32px)' }
                            ]
                        },
                        // Color y tamaño de los valores numéricos
                        { type: 'color', label: 'Color de los valores numéricos', sectionColorKey: 'statValueColor', key: 'statValueColor', defaultValue: '#2563eb' },
                        { type: 'size', label: 'Tamaño de los valores numéricos', key: 'statValueSize', options: ['0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem'] },
                        // Color y tamaño de las etiquetas
                        { type: 'color', label: 'Color de las etiquetas', sectionColorKey: 'statLabelColor', key: 'statLabelColor', defaultValue: '#475569' },
                        { type: 'size', label: 'Tamaño de las etiquetas', key: 'statLabelSize', options: ['0.7rem', '0.8rem', '0.875rem', '1rem'] },
                    ],
                    dynamicList: {
                        itemKeyPrefix: 'hero_stat_item_',
                        defaultCount: 4,
                        maxCount: 8,
                        fields: [
                            { type: 'icon', key: 'icon', label: 'Icono', defaultValue: 'TrendingUp' },
                            { type: 'text', key: 'value', label: 'Valor numérico', defaultValue: '+45%' },
                            { type: 'text', key: 'label', label: 'Etiqueta', defaultValue: 'crecimiento' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        defaultItems: [
                            { icon: 'TrendingUp', value: '+45%', label: 'crecimiento', visible: true },
                            { icon: 'Users', value: '+15', label: 'equipos', visible: true },
                            { icon: 'Target', value: '100%', label: 'objetivos', visible: true },
                            { icon: 'TrendingUp', value: '80%', label: 'parcial', visible: true }
                        ]
                    }
                },
                {
                    id: 'hero_colors',
                    title: 'Colores del Hero',
                    icon: Palette,
                    fields: [
                        { type: 'color', label: 'Fondo del Hero', sectionColorKey: 'heroBackground', key: 'heroBackground', defaultValue: '#f8fafc' },
                        { type: 'color', label: 'Color del título', sectionColorKey: 'heroTitleColor', key: 'heroTitleColor', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Color de la descripción', sectionColorKey: 'heroDescriptionColor', key: 'heroDescriptionColor', defaultValue: '#475569' },
                        { type: 'color', label: 'Fondo del badge', sectionColorKey: 'heroBadgeBackground', key: 'heroBadgeBackground', defaultValue: '#3b82f6' },
                        { type: 'color', label: 'Texto del badge', sectionColorKey: 'heroBadgeTextColor', key: 'heroBadgeTextColor', defaultValue: '#ffffff' },
                    ]
                },
                {
                    id: 'hero_buttons',
                    title: 'Botones del Hero',
                    icon: Link,
                    fields: [
                        // Botón principal
                        { type: 'text', label: 'Texto botón principal', textKey: 'cta_primary', key: 'cta_primary', defaultValue: 'Solicitar consultoría' },
                        { type: 'text', label: 'Enlace botón principal', textKey: 'cta_primary_url', key: 'cta_primary_url', defaultValue: '/contacto' },
                        { type: 'color', label: 'Color fondo principal', sectionColorKey: 'buttonPrimaryBackground', key: 'buttonPrimaryBackground', defaultValue: '#2563eb' },
                        { type: 'color', label: 'Color texto principal', sectionColorKey: 'buttonPrimaryText', key: 'buttonPrimaryText', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color hover principal', sectionColorKey: 'buttonPrimaryHoverBackground', key: 'buttonPrimaryHoverBackground', defaultValue: '#1d4ed8' },
                        { type: 'checkbox', label: 'Mostrar botón principal', checkboxKey: 'show_hero_primary_button', key: 'show_hero_primary_button', defaultValue: true },
                        // Botón secundario
                        { type: 'text', label: 'Texto botón secundario', textKey: 'cta_secondary', key: 'cta_secondary', defaultValue: 'Conocer metodología' },
                        { type: 'text', label: 'Enlace botón secundario', textKey: 'cta_secondary_url', key: 'cta_secondary_url', defaultValue: '#metodologia' },
                        { type: 'color', label: 'Color fondo secundario', sectionColorKey: 'buttonSecondaryBackground', key: 'buttonSecondaryBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color texto secundario', sectionColorKey: 'buttonSecondaryText', key: 'buttonSecondaryText', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Color hover secundario', sectionColorKey: 'buttonSecondaryHoverBackground', key: 'buttonSecondaryHoverBackground', defaultValue: '#f1f5f9' },
                        { type: 'checkbox', label: 'Mostrar botón secundario', checkboxKey: 'show_hero_secondary_button', key: 'show_hero_secondary_button', defaultValue: true },
                    ]
                },
                {
                    id: 'hero_typography',
                    title: 'Tipografía del Hero',
                    icon: Type,
                    fields: [
                        { type: 'size', label: 'Tamaño del título', sizeKey: 'heroTitleSize', key: 'heroTitleSize', options: ['2rem', '2.5rem', '3rem', '3.5rem', '4rem'] },
                        { type: 'size', label: 'Tamaño de la descripción', sizeKey: 'heroDescriptionSize', key: 'heroDescriptionSize', options: ['0.875rem', '1rem', '1.125rem', '1.25rem'] },
                    ]
                }
            ]
        },
        // ========== FEATURES (Características) ==========
        {
            id: 'features',
            title: 'Características / Servicios',
            icon: Sparkles,
            groups: [
                {
                    id: 'features_colors',
                    title: 'Colores',
                    icon: Palette,
                    fields: [
                        { type: 'color', label: 'Fondo de sección', sectionColorKey: 'featuresBackground', key: 'featuresBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color de títulos', sectionColorKey: 'featuresTitleColor', key: 'featuresTitleColor', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Fondo de tarjetas', sectionColorKey: 'featuresCardBackground', key: 'featuresCardBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Borde de tarjetas', sectionColorKey: 'featuresCardBorder', key: 'featuresCardBorder', defaultValue: '#e2e8f0' },
                        { type: 'color', label: 'Color de iconos', sectionColorKey: 'featuresIconColor', key: 'featuresIconColor', defaultValue: '#2563eb' },
                    ]
                },
                {
                    id: 'features_texts',
                    title: 'Textos de la sección',
                    icon: Type,
                    fields: [
                        { type: 'text', label: 'Título principal (parte 1)', textKey: 'features_title_1', key: 'features_title_1', defaultValue: 'Capacidades que' },
                        { type: 'text', label: 'Título principal (parte 2)', textKey: 'features_title_2', key: 'features_title_2', defaultValue: 'Transforman' },
                        { type: 'text', label: 'Descripción', textKey: 'features_description', key: 'features_description', defaultValue: 'No solo aconsejamos, implementamos. Te acompañamos en cada paso con herramientas y metodologías probadas.' },
                    ]
                },
                {
                    id: 'features_dynamic',
                    title: 'Tarjetas de características (hasta 9)',
                    icon: Sparkles,
                    dynamicList: {
                        itemKeyPrefix: 'feature_',
                        defaultCount: 6,
                        maxCount: 9,
                        fields: [
                            { type: 'icon', key: 'icon', label: 'Icono', defaultValue: 'BarChart' },
                            { type: 'text', key: 'title', label: 'Título', defaultValue: 'Análisis Estratégico' },
                            { type: 'text', key: 'description', label: 'Descripción', defaultValue: 'Evaluación profunda de tu mercado...' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ]
                    }
                },
                {
                    id: 'features_typography',
                    title: 'Tipografía',
                    icon: Type,
                    fields: [
                        { type: 'size', label: 'Tamaño del título de sección', sizeKey: 'featuresTitleSize', key: 'featuresTitleSize', options: ['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem'] },
                        { type: 'size', label: 'Tamaño del título de tarjetas', sizeKey: 'featuresCardTitleSize', key: 'featuresCardTitleSize', options: ['1.125rem', '1.25rem', '1.5rem', '1.75rem'] },
                        { type: 'size', label: 'Tamaño de la descripción', sizeKey: 'featuresDescriptionSize', key: 'featuresDescriptionSize', options: ['0.875rem', '1rem', '1.125rem'] },
                    ]
                }
            ]
        },
        // ========== ABOUT (Sobre Nosotros) ==========
        {
            id: 'about',
            title: 'Sobre Nosotros',
            icon: Info,
            groups: [
                {
                    id: 'about_colors',
                    title: 'Colores',
                    icon: Palette,
                    fields: [
                        { type: 'color', label: 'Fondo de sección', sectionColorKey: 'aboutBackground', key: 'aboutBackground', defaultValue: '#f8fafc' },
                        { type: 'color', label: 'Color de títulos', sectionColorKey: 'aboutTitleColor', key: 'aboutTitleColor', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Color de texto', sectionColorKey: 'aboutTextColor', key: 'aboutTextColor', defaultValue: '#475569' },
                        { type: 'color', label: 'Color del badge', sectionColorKey: 'aboutBadgeBackground', key: 'aboutBadgeBackground', defaultValue: '#2563eb' },
                        { type: 'color', label: 'Texto del badge', sectionColorKey: 'aboutBadgeTextColor', key: 'aboutBadgeTextColor', defaultValue: '#ffffff' },
                    ]
                },
                {
                    id: 'about_image',
                    title: 'Imagen',
                    icon: Image,
                    fields: [
                        { type: 'image', label: 'Imagen', imageElementId: 'about_image', key: 'about_image' },
                        { type: 'size', label: 'Borde redondeado', sectionColorKey: 'aboutImageBorderRadius', key: 'aboutImageBorderRadius', options: ['0rem', '0.5rem', '1rem', '1.5rem', '9999px'] },
                    ]
                },
                {
                    id: 'about_stats',
                    title: 'Estadísticas (hasta 8)',
                    icon: BarChart,
                    dynamicList: {
                        itemKeyPrefix: 'stat_',
                        defaultCount: 4,
                        maxCount: 8,
                        fields: [
                            { type: 'icon', key: 'icon', label: 'Icono', defaultValue: 'Briefcase' },
                            { type: 'text', key: 'value', label: 'Valor', defaultValue: '15+' },
                            { type: 'text', key: 'label', label: 'Etiqueta', defaultValue: 'Años de experiencia' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        defaultItems: [
                            { icon: 'Briefcase', value: '15+', label: 'Años de experiencia', visible: true },
                            { icon: 'Users', value: '50+', label: 'Consultores expertos', visible: true },
                            { icon: 'Award', value: '200+', label: 'Proyectos exitosos', visible: true },
                            { icon: 'MapPin', value: '10+', label: 'Países con presencia', visible: true }
                        ]
                    }
                },
                {
                    id: 'about_texts',
                    title: 'Textos editables',
                    icon: Type,
                    fields: [
                        { type: 'text', label: 'Badge (sobre nosotros)', textKey: 'about_section_badge', key: 'about_section_badge', defaultValue: 'Nuestra Firma' },
                        { type: 'text', label: 'Título (parte 1)', textKey: 'about_heading_1', key: 'about_heading_1', defaultValue: 'Consultoría con' },
                        { type: 'text', label: 'Título (parte 2)', textKey: 'about_heading_2', key: 'about_heading_2', defaultValue: 'Resultados Medibles' },
                        { type: 'text', label: 'Descripción 1', textKey: 'about_description_1', key: 'about_description_1', defaultValue: 'En Kernelize Consulting no creemos en soluciones genéricas...' },
                        { type: 'text', label: 'Descripción 2', textKey: 'about_description_2', key: 'about_description_2', defaultValue: 'Nuestro enfoque combina el rigor analítico con la creatividad...' },
                    ]
                },
                {
                    id: 'about_differentiators',
                    title: 'Diferenciadores (Lista "Nuestro compromiso")',
                    icon: Award,
                    dynamicList: {
                        itemKeyPrefix: 'differentiator_',
                        defaultCount: 4,
                        maxCount: 8,
                        fields: [
                            { type: 'text', key: 'text', label: 'Texto', defaultValue: 'Metodologías ágiles y adaptativas' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        defaultItems: [
                            { text: 'Metodologías ágiles y adaptativas', visible: true },
                            { text: 'Análisis de datos para toma de decisiones', visible: true },
                            { text: 'Acompañamiento post-implementación', visible: true },
                            { text: 'Confidencialidad y ética profesional', visible: true }
                        ]
                    }
                },
                {
                    id: 'about_typography',
                    title: 'Tipografía',
                    icon: Type,
                    fields: [
                        { type: 'size', label: 'Tamaño del título', sizeKey: 'aboutTitleSize', key: 'aboutTitleSize', options: ['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem'] },
                        { type: 'size', label: 'Tamaño del texto', sizeKey: 'aboutTextSize', key: 'aboutTextSize', options: ['0.875rem', '1rem', '1.125rem'] },
                        { type: 'size', label: 'Tamaño de valores estadísticos', sizeKey: 'aboutStatsValueSize', key: 'aboutStatsValueSize', options: ['1rem', '1.25rem', '1.5rem', '1.75rem'] },
                        { type: 'size', label: 'Tamaño de etiquetas estadísticas', sizeKey: 'aboutStatsLabelSize', key: 'aboutStatsLabelSize', options: ['0.7rem', '0.8rem', '0.875rem', '1rem'] },
                        { type: 'size', label: 'Tamaño de diferenciadores', sizeKey: 'aboutDifferentiatorSize', key: 'aboutDifferentiatorSize', options: ['0.875rem', '1rem', '1.125rem'] },
                    ]
                }
            ]
        },
        // ========== TESTIMONIALS ==========
        {
            id: 'testimonials',
            title: 'Testimonios',
            icon: MessageSquare,
            groups: [
                {
                    id: 'testimonials_colors',
                    title: 'Colores',
                    icon: Palette,
                    fields: [
                        { type: 'color', label: 'Fondo de sección', sectionColorKey: 'testimonialsBackground', key: 'testimonialsBackground', defaultValue: '#0f172a' },
                        { type: 'color', label: 'Color de títulos', sectionColorKey: 'testimonialsTitleColor', key: 'testimonialsTitleColor', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color de texto', sectionColorKey: 'testimonialsTextColor', key: 'testimonialsTextColor', defaultValue: '#cbd5e1' },
                        { type: 'color', label: 'Fondo de tarjetas', sectionColorKey: 'testimonialsCardBackground', key: 'testimonialsCardBackground', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Borde de tarjetas', sectionColorKey: 'testimonialsCardBorder', key: 'testimonialsCardBorder', defaultValue: '#334155' },
                        { type: 'color', label: 'Color de nombre', sectionColorKey: 'testimonialsNameColor', key: 'testimonialsNameColor', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color de rol', sectionColorKey: 'testimonialsRoleColor', key: 'testimonialsRoleColor', defaultValue: '#94a3b8' },
                    ]
                },
                {
                    id: 'testimonials_dynamic',
                    title: 'Testimonios (hasta 8)',
                    icon: MessageSquare,
                    dynamicList: {
                        itemKeyPrefix: 'testimonial_',
                        defaultCount: 3,
                        maxCount: 8,
                        fields: [
                            { type: 'text', key: 'name', label: 'Nombre', defaultValue: 'Carlos Méndez' },
                            { type: 'text', key: 'role', label: 'Rol', defaultValue: 'CEO - TechCorp LATAM' },
                            { type: 'text', key: 'content', label: 'Contenido', defaultValue: 'El equipo de Kernelize reestructuró nuestra estrategia comercial por completo...' },
                            { type: 'text', key: 'image', label: 'Inicial/imagen', defaultValue: 'CM' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        // 👇 Valores específicos para los primeros 3 testimonios
                        defaultItems: [
                            {
                                name: 'Carlos Méndez',
                                role: 'CEO - TechCorp LATAM',
                                content: 'El equipo de Kernelize reestructuró nuestra estrategia comercial por completo. En 6 meses, aumentamos nuestras ventas un 60% y optimizamos nuestros procesos internos. Su enfoque analítico y profesionalismo son inigualables.',
                                image: 'CM',
                                visible: true
                            },
                            {
                                name: 'Laura Fernández',
                                role: 'Directora de Operaciones - Grupo Logístico',
                                content: 'Necesitábamos expandirnos a nuevos mercados y ellos nos guiaron paso a paso. Desde el estudio de mercado hasta la implementación local. Una consultora que realmente se involucra en el éxito de sus clientes.',
                                image: 'LF',
                                visible: true
                            },
                            {
                                name: 'Roberto Sánchez',
                                role: 'Fundador - Inversiones RS',
                                content: 'Contratamos su servicio de planificación financiera y los resultados fueron inmediatos. No solo mejoraron nuestra rentabilidad, sino que nos dieron la claridad y el control que necesitábamos para escalar.',
                                image: 'RS',
                                visible: true
                            }
                        ]
                    }
                },
                {
                    id: 'testimonials_indicators',
                    title: 'Indicadores de confianza (hasta 8)',
                    icon: BarChart,
                    dynamicList: {
                        itemKeyPrefix: 'indicator_',
                        defaultCount: 4,
                        maxCount: 8,
                        fields: [
                            { type: 'icon', key: 'icon', label: 'Icono', defaultValue: 'Briefcase' },
                            { type: 'text', key: 'value', label: 'Valor', defaultValue: '100+' },
                            { type: 'text', key: 'label', label: 'Etiqueta', defaultValue: 'Proyectos anuales' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        // 👇 Valores específicos para los primeros 4 indicadores
                        defaultItems: [
                            { icon: 'Briefcase', value: '100+', label: 'Proyectos anuales', visible: true },
                            { icon: 'BarChart', value: '15', label: 'Industrias diferentes', visible: true },
                            { icon: 'Heart', value: '98%', label: 'Tasa de satisfacción', visible: true },
                            { icon: 'Clock', value: '24/7', label: 'Soporte a clientes', visible: true }
                        ]
                    }
                },
                {
                    id: 'testimonials_typography',
                    title: 'Tipografía',
                    icon: Type,
                    fields: [
                        { type: 'size', label: 'Tamaño del título de sección', sizeKey: 'testimonialsTitleSize', key: 'testimonialsTitleSize', options: ['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem'] },
                        { type: 'size', label: 'Tamaño del nombre', sizeKey: 'testimonialsNameSize', key: 'testimonialsNameSize', options: ['1rem', '1.125rem', '1.25rem'] },
                        { type: 'size', label: 'Tamaño del rol', sizeKey: 'testimonialsRoleSize', key: 'testimonialsRoleSize', options: ['0.75rem', '0.875rem', '1rem'] },
                        { type: 'size', label: 'Tamaño del texto del testimonio', sizeKey: 'testimonialsTextSize', key: 'testimonialsTextSize', options: ['0.875rem', '1rem', '1.125rem'] },
                    ]
                }
            ]
        },
        // ========== CONTACTO ==========
        {
            id: 'contact',
            title: 'Contacto',
            icon: Mail,
            groups: [
                {
                    id: 'contact_colors',
                    title: 'Colores',
                    icon: Palette,
                    fields: [
                        { type: 'color', label: 'Fondo de sección', sectionColorKey: 'contactBackground', key: 'contactBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color de títulos', sectionColorKey: 'contactTitleColor', key: 'contactTitleColor', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Color de texto', sectionColorKey: 'contactTextColor', key: 'contactTextColor', defaultValue: '#475569' },
                        { type: 'color', label: 'Fondo del formulario', sectionColorKey: 'contactFormBackground', key: 'contactFormBackground', defaultValue: '#f8fafc' },
                        { type: 'color', label: 'Borde del formulario', sectionColorKey: 'contactFormBorder', key: 'contactFormBorder', defaultValue: '#e2e8f0' },
                        { type: 'color', label: 'Fondo de inputs', sectionColorKey: 'contactInputBackground', key: 'contactInputBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Borde de inputs', sectionColorKey: 'contactInputBorder', key: 'contactInputBorder', defaultValue: '#cbd5e1' },
                        { type: 'color', label: 'Color de texto de inputs', sectionColorKey: 'contactInputTextColor', key: 'contactInputTextColor', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Fondo del botón', sectionColorKey: 'contactButtonBackground', key: 'contactButtonBackground', defaultValue: '#2563eb' },
                        { type: 'color', label: 'Texto del botón', sectionColorKey: 'contactButtonText', key: 'contactButtonText', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Fondo del botón al pasar mouse', sectionColorKey: 'contactButtonHoverBackground', key: 'contactButtonHoverBackground', defaultValue: '#1d4ed8' },
                    ]
                },
                {
                    id: 'contact_cards',
                    title: 'Tarjetas de contacto',
                    icon: Link,
                    dynamicList: {
                        itemKeyPrefix: 'contact_card_',
                        defaultCount: 3,
                        maxCount: 6,
                        fields: [
                            { type: 'icon', key: 'icon', label: 'Icono', defaultValue: 'Mail' },
                            { type: 'text', key: 'title', label: 'Título', defaultValue: 'Email' },
                            { type: 'text', key: 'content', label: 'Contenido', defaultValue: 'consultoria@kernelize.com' },
                            { type: 'text', key: 'href', label: 'Enlace', defaultValue: 'mailto:consultoria@kernelize.com' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        // 👇 Valores específicos para las primeras 3 tarjetas
                        defaultItems: [
                            { icon: 'Mail', title: 'Email', content: 'consultoria@kernelize.com', href: 'mailto:consultoria@kernelize.com', visible: true },
                            { icon: 'Phone', title: 'Teléfono', content: '+54 9 11 6745-7413', href: 'tel:+5491167457413', visible: true },
                            { icon: 'MapPin', title: 'Ubicación', content: 'Buenos Aires, Argentina', href: '#', visible: true }
                        ]
                    }
                },
                {
                    id: 'contact_form_texts',
                    title: 'Textos del formulario',
                    icon: Type,
                    fields: [
                        { type: 'text', label: 'Título del formulario', textKey: 'contact_form_title', key: 'contact_form_title', defaultValue: 'Solicita una reunión de diagnóstico' },
                        { type: 'text', label: 'Label nombre', textKey: 'contact_label_name', key: 'contact_label_name', defaultValue: 'Nombre completo *' },
                        { type: 'text', label: 'Label email', textKey: 'contact_label_email', key: 'contact_label_email', defaultValue: 'Email corporativo *' },
                        { type: 'text', label: 'Texto del botón', textKey: 'contact_submit', key: 'contact_submit', defaultValue: 'Solicitar reunión' },
                        { type: 'text', label: 'Texto "Enviando"', textKey: 'contact_sending', key: 'contact_sending', defaultValue: 'Enviando...' },
                        { type: 'text', label: 'Título éxito', textKey: 'contact_success_title', key: 'contact_success_title', defaultValue: '¡Mensaje enviado con éxito!' },
                        { type: 'text', label: 'Mensaje éxito', textKey: 'contact_success_message', key: 'contact_success_message', defaultValue: 'En menos de 12 horas hábiles, uno de nuestros consultores se comunicará contigo.' },
                        { type: 'text', label: 'Botón éxito', textKey: 'contact_success_button', key: 'contact_success_button', defaultValue: 'Enviar otro mensaje' },
                    ]
                },
                {
                    id: 'contact_typography',
                    title: 'Tipografía',
                    icon: Type,
                    fields: [
                        { type: 'size', label: 'Tamaño del título de sección', sizeKey: 'contactTitleSize', key: 'contactTitleSize', options: ['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem'] },
                        { type: 'size', label: 'Tamaño del texto general', sizeKey: 'contactTextSize', key: 'contactTextSize', options: ['0.875rem', '1rem', '1.125rem'] },
                        { type: 'size', label: 'Tamaño de las etiquetas', sizeKey: 'contactLabelSize', key: 'contactLabelSize', options: ['0.75rem', '0.875rem', '1rem'] },
                        { type: 'size', label: 'Tamaño del botón', sizeKey: 'contactButtonSize', key: 'contactButtonSize', options: ['0.875rem', '1rem', '1.125rem'] },
                        { type: 'size', label: 'Tamaño de títulos de tarjetas', sizeKey: 'contactCardTitleSize', key: 'contactCardTitleSize', options: ['1rem', '1.125rem', '1.25rem', '1.5rem'] },
                    ]
                },
                {
                    id: 'contact_hours',
                    title: 'Bloques de horario',
                    icon: Clock,
                    dynamicList: {
                        itemKeyPrefix: 'contact_hour_',
                        defaultCount: 1,
                        maxCount: 6,
                        fields: [
                            { type: 'icon', key: 'icon', label: 'Icono', defaultValue: 'Clock' },
                            { type: 'text', key: 'title', label: 'Título', defaultValue: 'Horario de atención' },
                            { type: 'text', key: 'line1', label: 'Línea 1', defaultValue: 'Lunes a Viernes: 9:00 - 19:00 hs' },
                            { type: 'text', key: 'line2', label: 'Línea 2', defaultValue: 'Sábados: Reuniones programadas' },
                            { type: 'text', key: 'note', label: 'Nota', defaultValue: 'Respuesta garantizada en 12 horas hábiles' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        defaultItems: [
                            {
                                icon: 'Clock',
                                title: 'Horario de atención',
                                line1: 'Lunes a Viernes: 9:00 - 19:00 hs',
                                line2: 'Sábados: Reuniones programadas',
                                note: 'Respuesta garantizada en 12 horas hábiles',
                                visible: true
                            }
                        ]
                    }
                }
            ]
        },
        // ========== FOOTER ==========
        {
            id: 'footer',
            title: 'Footer',
            icon: Layout,
            groups: [
                {
                    id: 'footer_logo',
                    title: 'Logo y marca',
                    icon: Image,
                    fields: [
                        { type: 'image', label: 'Imagen del logo', imageElementId: 'footer_logo', key: 'footer_logo' },
                        { type: 'icon', label: 'Icono alternativo', iconKey: 'footer_brand_icon', key: 'footer_brand_icon', defaultValue: 'Briefcase' },
                        { type: 'text', label: 'Texto primera parte', textKey: 'footer_brand_1', key: 'footer_brand_1', defaultValue: 'Kernelize' },
                        { type: 'text', label: 'Texto segunda parte', textKey: 'footer_brand_2', key: 'footer_brand_2', defaultValue: 'Consulting' },
                        { type: 'text', label: 'Descripción', textKey: 'footer_description', key: 'footer_description', defaultValue: 'Transformamos empresas a través de estrategias innovadoras y acompañamiento experto. Más de 15 años impulsando el éxito de nuestros clientes.' },
                    ]
                },
                {
                    id: 'footer_quick_links',
                    title: 'Enlaces rápidos',
                    icon: Link,
                    dynamicList: {
                        itemKeyPrefix: 'quicklink_',
                        defaultCount: 5,
                        maxCount: 8,
                        fields: [
                            { type: 'text', key: 'label', label: 'Texto', defaultValue: 'Inicio' },
                            { type: 'text', key: 'url', label: 'Destino', defaultValue: '#home' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        // 👇 Valores específicos para los primeros 5 enlaces
                        defaultItems: [
                            { label: 'Inicio', url: '#home', visible: true },
                            { label: 'Servicios', url: '#services', visible: true },
                            { label: 'Metodología', url: '#methodology', visible: true },
                            { label: 'Casos de éxito', url: '#testimonials', visible: true },
                            { label: 'Contacto', url: '#contact', visible: true }
                        ]
                    }
                },
                {
                    id: 'footer_expertise',
                    title: 'Áreas de expertise',
                    icon: Target,
                    dynamicList: {
                        itemKeyPrefix: 'expertise_',
                        defaultCount: 5,
                        maxCount: 8,
                        fields: [
                            { type: 'text', key: 'label', label: 'Texto', defaultValue: 'Estrategia Corporativa' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        // 👇 Valores específicos para las primeras 5 áreas
                        defaultItems: [
                            { label: 'Estrategia Corporativa', visible: true },
                            { label: 'Transformación Digital', visible: true },
                            { label: 'Gestión del Talento', visible: true },
                            { label: 'Finanzas Corporativas', visible: true },
                            { label: 'Expansión Internacional', visible: true }
                        ]
                    }
                },
                {
                    id: 'footer_contact_info',
                    title: 'Contacto directo',
                    icon: Mail,
                    fields: [
                        { type: 'text', label: 'Email', textKey: 'footer_contact_email', key: 'footer_contact_email', defaultValue: 'consultoria@kernelize.com' },
                        { type: 'text', label: 'Teléfono', textKey: 'footer_contact_phone', key: 'footer_contact_phone', defaultValue: '+54 9 11 6745-7413' },
                        { type: 'text', label: 'Ubicación', textKey: 'footer_contact_location', key: 'footer_contact_location', defaultValue: 'Buenos Aires, Argentina' },
                    ]
                },
                {
                    id: 'footer_legal',
                    title: 'Copyright y legal',
                    icon: FileText,
                    fields: [
                        { type: 'text', label: 'Copyright', textKey: 'footer_copyright', key: 'footer_copyright', defaultValue: 'Kernelize Consulting. Todos los derechos reservados.' },
                        { type: 'text', label: 'Texto "Hecho con"', textKey: 'footer_made_with', key: 'footer_made_with', defaultValue: 'Hecho con' },
                        { type: 'text', label: 'Texto "para empresas"', textKey: 'footer_for', key: 'footer_for', defaultValue: 'para empresas que buscan crecer' },
                    ]
                },
                {
                    id: 'footer_certifications',
                    title: 'Certificaciones (hasta 8)',
                    icon: Award,
                    dynamicList: {
                        itemKeyPrefix: 'cert_',
                        defaultCount: 4,
                        maxCount: 8,
                        fields: [
                            { type: 'text', key: 'label', label: 'Texto', defaultValue: 'ISO 9001:2024' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        // 👇 Valores específicos para las primeras 4 certificaciones
                        defaultItems: [
                            { label: 'ISO 9001:2024', visible: true },
                            { label: 'Miembro de AACCP', visible: true },
                            { label: 'Certified Partners', visible: true },
                            { label: '+15 años de experiencia', visible: true }
                        ]
                    }
                },
                {
                    id: 'footer_social',
                    title: 'Redes Sociales',
                    icon: Share2,
                    fields: [
                        { type: 'color', label: 'Color del ícono', sectionColorKey: 'socialIconColor', key: 'socialIconColor', defaultValue: '#94a3b8' },
                        { type: 'color', label: 'Color al pasar mouse', sectionColorKey: 'socialIconHoverColor', key: 'socialIconHoverColor', defaultValue: '#3b82f6' },
                        { type: 'text', label: 'Facebook URL', textKey: 'social_facebook_url', key: 'social_facebook_url', defaultValue: '' },
                        { type: 'text', label: 'Instagram URL', textKey: 'social_instagram_url', key: 'social_instagram_url', defaultValue: '' },
                        { type: 'text', label: 'LinkedIn URL', textKey: 'social_linkedin_url', key: 'social_linkedin_url', defaultValue: '' },
                        { type: 'text', label: 'Twitter URL', textKey: 'social_twitter_url', key: 'social_twitter_url', defaultValue: '' },
                        { type: 'checkbox', label: 'Mostrar Facebook', checkboxKey: 'show_social_facebook', key: 'show_social_facebook', defaultValue: true },
                        { type: 'checkbox', label: 'Mostrar Instagram', checkboxKey: 'show_social_instagram', key: 'show_social_instagram', defaultValue: true },
                        { type: 'checkbox', label: 'Mostrar LinkedIn', checkboxKey: 'show_social_linkedin', key: 'show_social_linkedin', defaultValue: true },
                        { type: 'checkbox', label: 'Mostrar Twitter', checkboxKey: 'show_social_twitter', key: 'show_social_twitter', defaultValue: true },
                    ]
                },
                {
                    id: 'footer_typography',
                    title: 'Tipografía',
                    icon: Type,
                    fields: [
                        { type: 'size', label: 'Tamaño de los títulos', sizeKey: 'footerHeadingSize', key: 'footerHeadingSize', options: ['1rem', '1.125rem', '1.25rem', '1.5rem'] },
                        { type: 'size', label: 'Tamaño del texto general', sizeKey: 'footerTextSize', key: 'footerTextSize', options: ['0.75rem', '0.875rem', '1rem'] },
                        { type: 'size', label: 'Tamaño de los enlaces', sizeKey: 'footerLinkSize', key: 'footerLinkSize', options: ['0.75rem', '0.875rem', '1rem'] },
                    ]
                }
            ]
        }
    ]
};

// ==================== CONFIGURACIÓN DE CATERING COMPLETA ====================

const cateringConfig: TemplateConfig = {
    sections: [
        // ========== ESTILO DE FUENTE (global) ==========
        {
            id: 'typography',
            title: 'Estilo de Fuente',
            icon: Type,
            groups: [
                {
                    id: 'global_fonts',
                    title: 'Fuentes globales',
                    icon: Type,
                    fields: [
                        { type: 'font', label: 'Fuente de títulos', fontKey: 'headingFont', key: 'headingFont' },
                        { type: 'font', label: 'Fuente de textos', fontKey: 'bodyFont', key: 'bodyFont' },
                        { type: 'size', label: 'Peso de títulos', sizeKey: 'headingWeight', key: 'headingWeight', options: ['400', '500', '600', '700', '800'] },
                        { type: 'size', label: 'Peso de textos', sizeKey: 'bodyWeight', key: 'bodyWeight', options: ['300', '400', '500', '600'] },
                    ]
                }
            ]
        },
        // ========== HEADER ==========
        {
            id: 'header',
            title: 'Header',
            icon: Layout,
            groups: [
                {
                    id: 'logo',
                    title: 'Logo',
                    icon: Image,
                    fields: [
                        { type: 'image', label: 'Imagen del logo', imageElementId: 'catering_logo', key: 'catering_logo' },
                        { type: 'text', label: 'Texto parte 1', textKey: 'catering_brand_1', key: 'catering_brand_1', defaultValue: 'Kernelize' },
                        { type: 'text', label: 'Texto parte 2', textKey: 'catering_brand_2', key: 'catering_brand_2', defaultValue: 'Catering' },
                        { type: 'color', label: 'Color del texto 1', sectionColorKey: 'logoTextColor1', key: 'logoTextColor1', defaultValue: '#f59e0b' },
                        { type: 'color', label: 'Color del texto 2', sectionColorKey: 'logoTextColor2', key: 'logoTextColor2', defaultValue: '#d97706' },
                        { type: 'size', label: 'Tamaño del texto', key: 'logoTextSize', options: ['text-lg', 'text-xl', 'text-2xl', 'text-3xl'] },
                    ]
                },
                {
                    id: 'header_colors',
                    title: 'Colores del Header',
                    icon: Palette,
                    fields: [
                        { type: 'color', label: 'Fondo del header', sectionColorKey: 'headerBackground', key: 'headerBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color de los enlaces', sectionColorKey: 'headerLinkColor', key: 'headerLinkColor', defaultValue: '#475569' },
                        { type: 'color', label: 'Color de enlaces al pasar mouse', sectionColorKey: 'headerLinkHoverColor', key: 'headerLinkHoverColor', defaultValue: '#f59e0b' },
                    ]
                },
                {
                    id: 'nav_links',
                    title: 'Enlaces de navegación',
                    icon: Link,
                    dynamicList: {
                        itemKeyPrefix: 'c_nav_link_',
                        defaultCount: 5,
                        maxCount: 8,
                        fields: [
                            { type: 'text', key: 'text', label: 'Texto', defaultValue: 'Inicio' },
                            { type: 'text', key: 'url', label: 'Destino', defaultValue: '#home' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        defaultItems: [
                            { text: 'Inicio', url: '#home', visible: true },
                            { text: 'Servicios', url: '#services', visible: true },
                            { text: 'Menú', url: '#menu', visible: true },
                            { text: 'Galería', url: '#gallery', visible: true },
                            { text: 'Contacto', url: '#contact', visible: true }
                        ]
                    }
                },
                {
                    id: 'header_cta',
                    title: 'Botón CTA del header',
                    icon: Link2,
                    fields: [
                        { type: 'text', label: 'Texto del botón', textKey: 'catering_cta', key: 'catering_cta', defaultValue: 'Cotizar evento' },
                        { type: 'text', label: 'Enlace', textKey: 'catering_cta_url', key: 'catering_cta_url', defaultValue: '#contact' },
                        { type: 'color', label: 'Color de fondo', sectionColorKey: 'headerCtaBackground', key: 'headerCtaBackground', defaultValue: '#f59e0b' },
                        { type: 'color', label: 'Color del texto', sectionColorKey: 'headerCtaText', key: 'headerCtaText', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color al pasar el mouse', sectionColorKey: 'headerCtaHoverBackground', key: 'headerCtaHoverBackground', defaultValue: '#d97706' },
                        { type: 'checkbox', label: 'Mostrar botón', checkboxKey: 'show_header_cta', key: 'show_header_cta', defaultValue: true },
                    ]
                }
            ]
        },
        // ========== HERO ==========
        {
            id: 'hero',
            title: 'Hero (Sección principal)',
            icon: Eye,
            groups: [
                {
                    id: 'hero_images',
                    title: 'Imágenes',
                    icon: Image,
                    fields: [
                        { type: 'image', label: 'Imagen principal', imageElementId: 'c_hero_image', key: 'c_hero_image' },
                    ]
                },
                {
                    id: 'hero_texts',
                    title: 'Textos',
                    icon: Type,
                    fields: [
                        { type: 'text', label: 'Badge', textKey: 'c_hero_badge', key: 'c_hero_badge', defaultValue: 'Servicio Premium de Catering' },
                        { type: 'text', label: 'Título (parte 1)', textKey: 'c_hero_title_1', key: 'c_hero_title_1', defaultValue: 'Sabores que' },
                        { type: 'text', label: 'Título (parte 2)', textKey: 'c_hero_title_2', key: 'c_hero_title_2', defaultValue: 'enamoran' },
                        { type: 'text', label: 'Título (parte 3)', textKey: 'c_hero_title_3', key: 'c_hero_title_3', defaultValue: 'eventos que perduran' },
                        { type: 'text', label: 'Descripción', textKey: 'c_hero_description', key: 'c_hero_description', defaultValue: 'Hacemos de tu evento una experiencia gastronómica inolvidable. Bodas, empresas, fiestas privadas y más.' },
                        { type: 'text', label: 'Texto experiencia', textKey: 'c_hero_exp', key: 'c_hero_exp', defaultValue: '15 años de experiencia' },
                        { type: 'text', label: 'Texto eventos', textKey: 'c_hero_events', key: 'c_hero_events', defaultValue: '+500 eventos realizados' },
                        { type: 'text', label: 'Título imagen', textKey: 'c_hero_image_title', key: 'c_hero_image_title', defaultValue: 'Cocina de autor' },
                        { type: 'text', label: 'Subtítulo imagen', textKey: 'c_hero_image_subtitle', key: 'c_hero_image_subtitle', defaultValue: 'Platos exclusivos para cada ocasión' },
                        { type: 'text', label: 'Badge título flotante', textKey: 'c_hero_badge_title', key: 'c_hero_badge_title', defaultValue: 'Menús personalizados' },
                        { type: 'text', label: 'Badge texto flotante', textKey: 'c_hero_badge_text', key: 'c_hero_badge_text', defaultValue: 'Adaptados a tus necesidades' },
                    ]
                },
                {
                    id: 'hero_buttons',
                    title: 'Botones del Hero',
                    icon: Link,
                    fields: [
                        { type: 'text', label: 'Texto botón principal', textKey: 'c_cta_primary', key: 'c_cta_primary', defaultValue: 'Cotizar evento' },
                        { type: 'text', label: 'Enlace botón principal', textKey: 'c_cta_primary_url', key: 'c_cta_primary_url', defaultValue: '#contact' },
                        { type: 'color', label: 'Color fondo principal', sectionColorKey: 'buttonPrimaryBackground', key: 'buttonPrimaryBackground', defaultValue: '#f59e0b' },
                        { type: 'color', label: 'Color texto principal', sectionColorKey: 'buttonPrimaryText', key: 'buttonPrimaryText', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color hover principal', sectionColorKey: 'buttonPrimaryHoverBackground', key: 'buttonPrimaryHoverBackground', defaultValue: '#d97706' },
                        { type: 'checkbox', label: 'Mostrar botón principal', checkboxKey: 'show_hero_primary_button', key: 'show_hero_primary_button', defaultValue: true },
                        { type: 'text', label: 'Texto botón secundario', textKey: 'c_cta_secondary', key: 'c_cta_secondary', defaultValue: 'Ver menú' },
                        { type: 'text', label: 'Enlace botón secundario', textKey: 'c_cta_secondary_url', key: 'c_cta_secondary_url', defaultValue: '#menu' },
                        { type: 'color', label: 'Color fondo secundario', sectionColorKey: 'buttonSecondaryBackground', key: 'buttonSecondaryBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color texto secundario', sectionColorKey: 'buttonSecondaryText', key: 'buttonSecondaryText', defaultValue: '#f59e0b' },
                        { type: 'color', label: 'Color hover secundario', sectionColorKey: 'buttonSecondaryHoverBackground', key: 'buttonSecondaryHoverBackground', defaultValue: '#fffbeb' },
                        { type: 'checkbox', label: 'Mostrar botón secundario', checkboxKey: 'show_hero_secondary_button', key: 'show_hero_secondary_button', defaultValue: true },
                    ]
                },
                {
                    id: 'hero_colors',
                    title: 'Colores del Hero',
                    icon: Palette,
                    fields: [
                        { type: 'color', label: 'Fondo del Hero', sectionColorKey: 'heroBackground', key: 'heroBackground', defaultValue: '#fffbeb' },
                        { type: 'color', label: 'Color del título', sectionColorKey: 'heroTitleColor', key: 'heroTitleColor', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Color de la descripción', sectionColorKey: 'heroDescriptionColor', key: 'heroDescriptionColor', defaultValue: '#475569' },
                        { type: 'color', label: 'Fondo del badge', sectionColorKey: 'heroBadgeBackground', key: 'heroBadgeBackground', defaultValue: '#f59e0b' },
                        { type: 'color', label: 'Texto del badge', sectionColorKey: 'heroBadgeTextColor', key: 'heroBadgeTextColor', defaultValue: '#ffffff' },
                    ]
                },
                {
                    id: 'hero_typography',
                    title: 'Tipografía del Hero',
                    icon: Type,
                    fields: [
                        { type: 'size', label: 'Tamaño del título', sizeKey: 'heroTitleSize', key: 'heroTitleSize', options: ['2rem', '2.5rem', '3rem', '3.5rem', '4rem'] },
                        { type: 'size', label: 'Tamaño de la descripción', sizeKey: 'heroDescriptionSize', key: 'heroDescriptionSize', options: ['0.875rem', '1rem', '1.125rem', '1.25rem'] },
                    ]
                }
            ]
        },
        // ========== FEATURES (Servicios) ==========
        {
            id: 'features',
            title: 'Servicios',
            icon: Sparkles,
            groups: [
                {
                    id: 'features_colors',
                    title: 'Colores',
                    icon: Palette,
                    fields: [
                        { type: 'color', label: 'Fondo de sección', sectionColorKey: 'featuresBackground', key: 'featuresBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color de títulos', sectionColorKey: 'featuresTitleColor', key: 'featuresTitleColor', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Fondo de tarjetas', sectionColorKey: 'featuresCardBackground', key: 'featuresCardBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Borde de tarjetas', sectionColorKey: 'featuresCardBorder', key: 'featuresCardBorder', defaultValue: '#e2e8f0' },
                        { type: 'color', label: 'Color de iconos', sectionColorKey: 'featuresIconColor', key: 'featuresIconColor', defaultValue: '#f59e0b' },
                    ]
                },
                {
                    id: 'features_texts',
                    title: 'Textos de la sección',
                    icon: Type,
                    fields: [
                        { type: 'text', label: 'Título principal (parte 1)', textKey: 'c_features_title_1', key: 'c_features_title_1', defaultValue: 'Servicios de' },
                        { type: 'text', label: 'Título principal (parte 2)', textKey: 'c_features_title_2', key: 'c_features_title_2', defaultValue: 'Catering Premium' },
                        { type: 'text', label: 'Descripción', textKey: 'c_features_description', key: 'c_features_description', defaultValue: 'Ofrecemos soluciones gastronómicas completas para todo tipo de eventos, con la más alta calidad y atención al detalle.' },
                    ]
                },
                {
                    id: 'features_dynamic',
                    title: 'Tarjetas de servicios (hasta 9)',
                    icon: Sparkles,
                    dynamicList: {
                        itemKeyPrefix: 'c_feature_',
                        defaultCount: 6,
                        maxCount: 9,
                        fields: [
                            { type: 'icon', key: 'icon', label: 'Icono', defaultValue: 'UtensilsCrossed' },
                            { type: 'text', key: 'title', label: 'Título', defaultValue: 'Buffet Completo' },
                            { type: 'text', key: 'description', label: 'Descripción', defaultValue: 'Variedad de platos fríos y calientes para todos los gustos.' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        defaultItems: [
                            { icon: 'UtensilsCrossed', title: 'Buffet Completo', description: 'Variedad de platos fríos y calientes para todos los gustos y necesidades dietéticas.', visible: true },
                            { icon: 'Wine', title: 'Maridaje Profesional', description: 'Selección de vinos y bebidas que complementan perfectamente cada plato.', visible: true },
                            { icon: 'Cake', title: 'Repostería Exquisita', description: 'Postres y tartas artesanales que endulzan cualquier celebración.', visible: true },
                            { icon: 'PartyPopper', title: 'Eventos Especiales', description: 'Bodas, cumpleaños, aniversarios y celebraciones corporativas.', visible: true },
                            { icon: 'Truck', title: 'Logística Completa', description: 'Transporte, montaje y servicio de mesa incluidos en nuestros paquetes.', visible: true },
                            { icon: 'ChefHat', title: 'Chefs Expertos', description: 'Equipo de cocineros con formación internacional y pasión por la gastronomía.', visible: true }
                        ]
                    }
                },
                {
                    id: 'features_typography',
                    title: 'Tipografía',
                    icon: Type,
                    fields: [
                        { type: 'size', label: 'Tamaño del título de sección', sizeKey: 'featuresTitleSize', key: 'featuresTitleSize', options: ['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem'] },
                        { type: 'size', label: 'Tamaño del título de tarjetas', sizeKey: 'featuresCardTitleSize', key: 'featuresCardTitleSize', options: ['1.125rem', '1.25rem', '1.5rem', '1.75rem'] },
                        { type: 'size', label: 'Tamaño de la descripción', sizeKey: 'featuresDescriptionSize', key: 'featuresDescriptionSize', options: ['0.875rem', '1rem', '1.125rem'] },
                    ]
                }
            ]
        },
        // ========== ABOUT (Sobre Nosotros) ==========
        {
            id: 'about',
            title: 'Sobre Nosotros',
            icon: Info,
            groups: [
                {
                    id: 'about_colors',
                    title: 'Colores',
                    icon: Palette,
                    fields: [
                        { type: 'color', label: 'Fondo de sección', sectionColorKey: 'aboutBackground', key: 'aboutBackground', defaultValue: '#f8fafc' },
                        { type: 'color', label: 'Color de títulos', sectionColorKey: 'aboutTitleColor', key: 'aboutTitleColor', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Color de texto', sectionColorKey: 'aboutTextColor', key: 'aboutTextColor', defaultValue: '#475569' },
                        { type: 'color', label: 'Color del badge', sectionColorKey: 'aboutBadgeBackground', key: 'aboutBadgeBackground', defaultValue: '#f59e0b' },
                        { type: 'color', label: 'Texto del badge', sectionColorKey: 'aboutBadgeTextColor', key: 'aboutBadgeTextColor', defaultValue: '#ffffff' },
                    ]
                },
                {
                    id: 'about_image',
                    title: 'Imagen',
                    icon: Image,
                    fields: [
                        { type: 'image', label: 'Imagen', imageElementId: 'c_about_image', key: 'c_about_image' },
                        { type: 'size', label: 'Borde redondeado', sectionColorKey: 'aboutImageBorderRadius', key: 'aboutImageBorderRadius', options: ['0rem', '0.5rem', '1rem', '1.5rem', '9999px'] },
                    ]
                },
                {
                    id: 'about_stats',
                    title: 'Estadísticas (hasta 8)',
                    icon: BarChart,
                    dynamicList: {
                        itemKeyPrefix: 'c_stat_',
                        defaultCount: 4,
                        maxCount: 8,
                        fields: [
                            { type: 'icon', key: 'icon', label: 'Icono', defaultValue: 'Users' },
                            { type: 'text', key: 'value', label: 'Valor', defaultValue: '500+' },
                            { type: 'text', key: 'label', label: 'Etiqueta', defaultValue: 'Eventos realizados' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        defaultItems: [
                            { icon: 'Users', value: '500+', label: 'Eventos realizados', visible: true },
                            { icon: 'Heart', value: '15', label: 'Años de experiencia', visible: true },
                            { icon: 'Award', value: '10', label: 'Premios recibidos', visible: true },
                            { icon: 'Sparkles', value: '50k+', label: 'Comensales satisfechos', visible: true }
                        ]
                    }
                },
                {
                    id: 'about_texts',
                    title: 'Textos editables',
                    icon: Type,
                    fields: [
                        { type: 'text', label: 'Badge', textKey: 'c_about_badge', key: 'c_about_badge', defaultValue: 'Nuestra Historia' },
                        { type: 'text', label: 'Título (parte 1)', textKey: 'c_about_title_1', key: 'c_about_title_1', defaultValue: 'Pasión por la' },
                        { type: 'text', label: 'Título (parte 2)', textKey: 'c_about_title_2', key: 'c_about_title_2', defaultValue: 'buena mesa' },
                        { type: 'text', label: 'Descripción 1', textKey: 'c_about_desc_1', key: 'c_about_desc_1', defaultValue: 'Desde 2009, nos dedicamos a crear experiencias gastronómicas únicas que combinan la tradición culinaria con las tendencias más innovadoras...' },
                        { type: 'text', label: 'Descripción 2', textKey: 'c_about_desc_2', key: 'c_about_desc_2', defaultValue: 'Cada evento es una oportunidad para sorprender y deleitar a tus invitados...' },
                        { type: 'text', label: 'Chef nombre', textKey: 'c_chef_name', key: 'c_chef_name', defaultValue: 'Martín Rodríguez' },
                        { type: 'text', label: 'Chef título', textKey: 'c_chef_title', key: 'c_chef_title', defaultValue: 'Chef Ejecutivo' },
                        { type: 'text', label: 'Chef experiencia', textKey: 'c_chef_exp', key: 'c_chef_exp', defaultValue: '15 años de experiencia internacional' },
                    ]
                },
                {
                    id: 'about_values',
                    title: 'Valores (tarjetas)',
                    icon: Award,
                    dynamicList: {
                        itemKeyPrefix: 'c_value_',
                        defaultCount: 2,
                        maxCount: 4,
                        fields: [
                            { type: 'text', key: 'title', label: 'Título', defaultValue: 'Calidad' },
                            { type: 'text', key: 'description', label: 'Descripción', defaultValue: 'Ingredientes frescos y seleccionados' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        defaultItems: [
                            { title: 'Calidad', description: 'Ingredientes frescos y seleccionados', visible: true },
                            { title: 'Creatividad', description: 'Platos únicos y originales', visible: true }
                        ]
                    }
                },
                {
                    id: 'about_typography',
                    title: 'Tipografía',
                    icon: Type,
                    fields: [
                        { type: 'size', label: 'Tamaño del título', sizeKey: 'aboutTitleSize', key: 'aboutTitleSize', options: ['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem'] },
                        { type: 'size', label: 'Tamaño del texto', sizeKey: 'aboutTextSize', key: 'aboutTextSize', options: ['0.875rem', '1rem', '1.125rem'] },
                        { type: 'size', label: 'Tamaño de valores estadísticos', sizeKey: 'aboutStatsValueSize', key: 'aboutStatsValueSize', options: ['1rem', '1.25rem', '1.5rem', '1.75rem'] },
                        { type: 'size', label: 'Tamaño de etiquetas estadísticas', sizeKey: 'aboutStatsLabelSize', key: 'aboutStatsLabelSize', options: ['0.7rem', '0.8rem', '0.875rem', '1rem'] },
                    ]
                }
            ]
        },
        // ========== MENÚ (Nueva sección) ==========
        {
            id: 'menu',
            title: 'Menú',
            icon: UtensilsCrossed,
            groups: [
                {
                    id: 'menu_texts',
                    title: 'Textos del menú',
                    icon: Type,
                    fields: [
                        { type: 'text', label: 'Título (parte 1)', textKey: 'c_menu_title_1', key: 'c_menu_title_1', defaultValue: 'Nuestro' },
                        { type: 'text', label: 'Título (parte 2)', textKey: 'c_menu_title_2', key: 'c_menu_title_2', defaultValue: 'Menú' },
                        { type: 'text', label: 'Descripción', textKey: 'c_menu_description', key: 'c_menu_description', defaultValue: 'Una selección de nuestros platos más destacados. Todos los menús son personalizables según tus preferencias.' },
                        { type: 'text', label: 'Nota final', textKey: 'c_menu_note', key: 'c_menu_note', defaultValue: '¿Tienes requisitos especiales? ¿Alergias o dietas específicas?' },
                        { type: 'text', label: 'Texto botón', textKey: 'c_menu_button', key: 'c_menu_button', defaultValue: 'Solicitar menú personalizado' },
                    ]
                },
                {
                    id: 'menu_categories',
                    title: 'Categorías del menú (hasta 6)',
                    icon: Layout,
                    dynamicList: {
                        itemKeyPrefix: 'c_menu_category_',
                        defaultCount: 4,
                        maxCount: 6,
                        fields: [
                            { type: 'text', key: 'name', label: 'Nombre', defaultValue: 'Entradas' },
                            { type: 'text', key: 'icon', label: 'Icono (emoji)', defaultValue: '🥗' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        defaultItems: [
                            { name: 'Entradas', icon: '🥗', visible: true },
                            { name: 'Platos Principales', icon: '🍖', visible: true },
                            { name: 'Postres', icon: '🍰', visible: true },
                            { name: 'Bebidas', icon: '🍷', visible: true }
                        ]
                    }
                },
                {
                    id: 'menu_items',
                    title: 'Ítems del menú (por categoría)',
                    icon: List,
                    dynamicList: {
                        itemKeyPrefix: 'c_menu_item_',
                        defaultCount: 12,
                        maxCount: 30,
                        fields: [
                            { type: 'text', key: 'category', label: 'Categoría (entradas, principales, postres, bebidas)', defaultValue: 'entradas' },
                            { type: 'text', key: 'name', label: 'Nombre', defaultValue: 'Bruschettas de tomate y albahaca' },
                            { type: 'text', key: 'description', label: 'Descripción', defaultValue: 'Pan artesanal con tomate fresco, albahaca y aceite de oliva' },
                            { type: 'text', key: 'price', label: 'Precio', defaultValue: '$12' },
                            { type: 'text', key: 'time', label: 'Tiempo preparación', defaultValue: '10 min' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        defaultItems: [
                            // Entradas
                            { category: 'entradas', name: 'Bruschettas de tomate y albahaca', description: 'Pan artesanal con tomate fresco, albahaca y aceite de oliva', price: '$12', time: '10 min', visible: true },
                            { category: 'entradas', name: 'Carpaccio de res', description: 'Finas láminas de res con alcaparras, parmesano y mostaza', price: '$15', time: '15 min', visible: true },
                            { category: 'entradas', name: 'Langostinos al ajillo', description: 'Langostinos salteados con ajo, perejil y vino blanco', price: '$18', time: '12 min', visible: true },
                            // Principales
                            { category: 'principales', name: 'Salmón a la plancha', description: 'Salmón con costra de hierbas, puré de papas y espárragos', price: '$28', time: '25 min', visible: true },
                            { category: 'principales', name: 'Risotto de hongos', description: 'Risotto cremoso con hongos silvestres y parmesano', price: '$22', time: '20 min', visible: true },
                            { category: 'principales', name: 'Lomo saltado', description: 'Tiras de lomo salteadas con cebolla, tomate y papas fritas', price: '$25', time: '20 min', visible: true },
                            // Postres
                            { category: 'postres', name: 'Tiramisú', description: 'Clásico postre italiano con mascarpone, café y cacao', price: '$10', time: '5 min', visible: true },
                            { category: 'postres', name: 'Volcán de chocolate', description: 'Bizcocho de chocolate con corazón fundido', price: '$12', time: '8 min', visible: true },
                            { category: 'postres', name: 'Cheesecake de frutos rojos', description: 'Tarta de queso con coulis de frutos rojos', price: '$11', time: '5 min', visible: true },
                            // Bebidas
                            { category: 'bebidas', name: 'Vino tinto reserva', description: 'Malbec argentino con notas de frutos rojos', price: '$35', time: '5 min', visible: true },
                            { category: 'bebidas', name: 'Coctelería premium', description: 'Cócteles clásicos y de autor', price: '$15', time: '10 min', visible: true },
                            { category: 'bebidas', name: 'Agua saborizada', description: 'Agua con frutas y hierbas frescas', price: '$8', time: '5 min', visible: true }
                        ]
                    }
                }
            ]
        },
        // ========== GALERÍA ==========
        {
            id: 'gallery',
            title: 'Galería',
            icon: Image,
            groups: [
                {
                    id: 'gallery_texts',
                    title: 'Textos de la galería',
                    icon: Type,
                    fields: [
                        { type: 'text', label: 'Título (parte 1)', textKey: 'c_gallery_title_1', key: 'c_gallery_title_1', defaultValue: 'Galería de' },
                        { type: 'text', label: 'Título (parte 2)', textKey: 'c_gallery_title_2', key: 'c_gallery_title_2', defaultValue: 'Experiencias' },
                        { type: 'text', label: 'Descripción', textKey: 'c_gallery_description', key: 'c_gallery_description', defaultValue: 'Momentos inolvidables que hemos creado para nuestros clientes.' },
                    ]
                },
                {
                    id: 'gallery_images',
                    title: 'Imágenes de la galería (hasta 12)',
                    icon: Image,
                    dynamicList: {
                        itemKeyPrefix: 'c_gallery_image_',
                        defaultCount: 6,
                        maxCount: 12,
                        fields: [
                            { type: 'image', key: 'imageUrl', label: 'URL de la imagen', defaultValue: '' },
                            { type: 'text', key: 'title', label: 'Título', defaultValue: 'Buffet de bodas' },
                            { type: 'text', key: 'category', label: 'Categoría', defaultValue: 'Eventos' },
                            { type: 'text', key: 'likes', label: 'Likes (número)', defaultValue: '234' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        defaultItems: [
                            { imageUrl: '', title: 'Buffet de bodas', category: 'Eventos', likes: '234', visible: true },
                            { imageUrl: '', title: 'Platos gourmet', category: 'Gastronomía', likes: '189', visible: true },
                            { imageUrl: '', title: 'Decoración de mesas', category: 'Eventos', likes: '156', visible: true },
                            { imageUrl: '', title: 'Cena ejecutiva', category: 'Empresarial', likes: '312', visible: true },
                            { imageUrl: '', title: 'Cócteles de autor', category: 'Bebidas', likes: '267', visible: true },
                            { imageUrl: '', title: 'Postres artesanales', category: 'Repostería', likes: '178', visible: true }
                        ]
                    }
                }
            ]
        },
        // ========== TESTIMONIALS ==========
        {
            id: 'testimonials',
            title: 'Testimonios',
            icon: MessageSquare,
            groups: [
                {
                    id: 'testimonials_colors',
                    title: 'Colores',
                    icon: Palette,
                    fields: [
                        { type: 'color', label: 'Fondo de sección', sectionColorKey: 'testimonialsBackground', key: 'testimonialsBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Color de títulos', sectionColorKey: 'testimonialsTitleColor', key: 'testimonialsTitleColor', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Color de texto', sectionColorKey: 'testimonialsTextColor', key: 'testimonialsTextColor', defaultValue: '#475569' },
                        { type: 'color', label: 'Fondo de tarjetas', sectionColorKey: 'testimonialsCardBackground', key: 'testimonialsCardBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Borde de tarjetas', sectionColorKey: 'testimonialsCardBorder', key: 'testimonialsCardBorder', defaultValue: '#e2e8f0' },
                        { type: 'color', label: 'Color de nombre', sectionColorKey: 'testimonialsNameColor', key: 'testimonialsNameColor', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Color de rol', sectionColorKey: 'testimonialsRoleColor', key: 'testimonialsRoleColor', defaultValue: '#64748b' },
                    ]
                },
                {
                    id: 'testimonials_texts',
                    title: 'Textos de la sección',
                    icon: Type,
                    fields: [
                        { type: 'text', label: 'Título (parte 1)', textKey: 'c_testimonials_title_1', key: 'c_testimonials_title_1', defaultValue: 'Lo que dicen nuestros' },
                        { type: 'text', label: 'Título (parte 2)', textKey: 'c_testimonials_title_2', key: 'c_testimonials_title_2', defaultValue: 'clientes' },
                    ]
                },
                {
                    id: 'testimonials_dynamic',
                    title: 'Testimonios (hasta 8)',
                    icon: MessageSquare,
                    dynamicList: {
                        itemKeyPrefix: 'c_testimonial_',
                        defaultCount: 3,
                        maxCount: 8,
                        fields: [
                            { type: 'text', key: 'name', label: 'Nombre', defaultValue: 'Laura y Carlos' },
                            { type: 'text', key: 'role', label: 'Rol / Evento', defaultValue: 'Casamiento - Noviembre 2024' },
                            { type: 'text', key: 'content', label: 'Contenido', defaultValue: 'El servicio fue impecable...' },
                            { type: 'text', key: 'image', label: 'Emoji / icono', defaultValue: '👰‍♀️🤵‍♂️' },
                            //    K+ { type: 'number', key: 'rating', label: 'Rating (1-5)', defaultValue: '5' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        defaultItems: [
                            { name: 'Laura y Carlos', role: 'Casamiento - Noviembre 2024', content: 'El servicio fue impecable desde el principio hasta el final. Nuestros invitados siguen hablando de la comida, especialmente del risotto y los postres. ¡Gracias por hacer de nuestra boda un día perfecto!', image: '👰‍♀️🤵‍♂️', rating: 5, visible: true },
                            { name: 'Empresa TechCorp', role: 'Evento Corporativo', content: 'Contratamos sus servicios para nuestra cena de fin de año. Quedamos impresionados con la calidad, la presentación y la atención. Sin duda los volveremos a contratar.', image: '🏢', rating: 5, visible: true },
                            { name: 'Ana María', role: 'Cumpleaños 50', content: 'Celebré mi cumpleaños con ellos y fue espectacular. Se adaptaron a mis preferencias y crearon un menú personalizado que encantó a todos. Profesionales y talentosos.', image: '🎂', rating: 5, visible: true }
                        ]
                    }
                },
                {
                    id: 'testimonials_typography',
                    title: 'Tipografía',
                    icon: Type,
                    fields: [
                        { type: 'size', label: 'Tamaño del título de sección', sizeKey: 'testimonialsTitleSize', key: 'testimonialsTitleSize', options: ['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem'] },
                        { type: 'size', label: 'Tamaño del nombre', sizeKey: 'testimonialsNameSize', key: 'testimonialsNameSize', options: ['1rem', '1.125rem', '1.25rem'] },
                        { type: 'size', label: 'Tamaño del rol', sizeKey: 'testimonialsRoleSize', key: 'testimonialsRoleSize', options: ['0.75rem', '0.875rem', '1rem'] },
                        { type: 'size', label: 'Tamaño del texto del testimonio', sizeKey: 'testimonialsTextSize', key: 'testimonialsTextSize', options: ['0.875rem', '1rem', '1.125rem'] },
                    ]
                }
            ]
        },
        // ========== CONTACTO ==========
        {
            id: 'contact',
            title: 'Contacto',
            icon: Mail,
            groups: [
                {
                    id: 'contact_colors',
                    title: 'Colores',
                    icon: Palette,
                    fields: [
                        { type: 'color', label: 'Fondo de sección', sectionColorKey: 'contactBackground', key: 'contactBackground', defaultValue: '#f8fafc' },
                        { type: 'color', label: 'Color de títulos', sectionColorKey: 'contactTitleColor', key: 'contactTitleColor', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Color de texto', sectionColorKey: 'contactTextColor', key: 'contactTextColor', defaultValue: '#475569' },
                        { type: 'color', label: 'Fondo del formulario', sectionColorKey: 'contactFormBackground', key: 'contactFormBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Borde del formulario', sectionColorKey: 'contactFormBorder', key: 'contactFormBorder', defaultValue: '#e2e8f0' },
                        { type: 'color', label: 'Fondo de inputs', sectionColorKey: 'contactInputBackground', key: 'contactInputBackground', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Borde de inputs', sectionColorKey: 'contactInputBorder', key: 'contactInputBorder', defaultValue: '#cbd5e1' },
                        { type: 'color', label: 'Color de texto de inputs', sectionColorKey: 'contactInputTextColor', key: 'contactInputTextColor', defaultValue: '#1e293b' },
                        { type: 'color', label: 'Fondo del botón', sectionColorKey: 'contactButtonBackground', key: 'contactButtonBackground', defaultValue: '#f59e0b' },
                        { type: 'color', label: 'Texto del botón', sectionColorKey: 'contactButtonText', key: 'contactButtonText', defaultValue: '#ffffff' },
                        { type: 'color', label: 'Fondo del botón al pasar mouse', sectionColorKey: 'contactButtonHoverBackground', key: 'contactButtonHoverBackground', defaultValue: '#d97706' },
                    ]
                },
                {
                    id: 'contact_texts',
                    title: 'Textos de la sección',
                    icon: Type,
                    fields: [
                        { type: 'text', label: 'Título (parte 1)', textKey: 'c_contact_title_1', key: 'c_contact_title_1', defaultValue: 'Hagamos de tu evento algo' },
                        { type: 'text', label: 'Título (parte 2)', textKey: 'c_contact_title_2', key: 'c_contact_title_2', defaultValue: 'inolvidable' },
                        { type: 'text', label: 'Descripción', textKey: 'c_contact_description', key: 'c_contact_description', defaultValue: 'Cuéntanos sobre tu evento y te enviaremos una propuesta personalizada en menos de 24 horas.' },
                        { type: 'text', label: 'Título info contacto', textKey: 'c_contact_info_title', key: 'c_contact_info_title', defaultValue: 'Información de contacto' },
                        { type: 'text', label: 'Título teléfono', textKey: 'c_contact_phone_title', key: 'c_contact_phone_title', defaultValue: 'Teléfono' },
                        { type: 'text', label: 'Teléfono', textKey: 'c_contact_phone', key: 'c_contact_phone', defaultValue: '+54 9 11 6745-7413' },
                        { type: 'text', label: 'Horario teléfono', textKey: 'c_contact_phone_hours', key: 'c_contact_phone_hours', defaultValue: 'Lun-Vie 9:00 a 19:00' },
                        { type: 'text', label: 'Título email', textKey: 'c_contact_email_title', key: 'c_contact_email_title', defaultValue: 'Email' },
                        { type: 'text', label: 'Email', textKey: 'c_contact_email', key: 'c_contact_email', defaultValue: 'eventos@kernelizecatering.com' },
                        { type: 'text', label: 'Respuesta email', textKey: 'c_contact_email_response', key: 'c_contact_email_response', defaultValue: 'Respuesta en 12hs' },
                        { type: 'text', label: 'Título ubicación', textKey: 'c_contact_location_title', key: 'c_contact_location_title', defaultValue: 'Ubicación' },
                        { type: 'text', label: 'Ubicación', textKey: 'c_contact_location', key: 'c_contact_location', defaultValue: 'Buenos Aires, Argentina' },
                        { type: 'text', label: 'Cobertura', textKey: 'c_contact_location_coverage', key: 'c_contact_location_coverage', defaultValue: 'Cobertura nacional' },
                        { type: 'text', label: 'Título porque elegirnos', textKey: 'c_why_title', key: 'c_why_title', defaultValue: '¿Por qué elegirnos?' },
                        // Formulario
                        { type: 'text', label: 'Título formulario', textKey: 'c_form_title', key: 'c_form_title', defaultValue: 'Solicita tu cotización' },
                        { type: 'text', label: 'Label nombre', textKey: 'c_form_name', key: 'c_form_name', defaultValue: 'Nombre completo *' },
                        { type: 'text', label: 'Label email', textKey: 'c_form_email', key: 'c_form_email', defaultValue: 'Email *' },
                        { type: 'text', label: 'Label teléfono', textKey: 'c_form_phone', key: 'c_form_phone', defaultValue: 'Teléfono *' },
                        { type: 'text', label: 'Label tipo evento', textKey: 'c_form_event_type', key: 'c_form_event_type', defaultValue: 'Tipo de evento *' },
                        { type: 'text', label: 'Label invitados', textKey: 'c_form_guests', key: 'c_form_guests', defaultValue: 'Número de invitados' },
                        { type: 'text', label: 'Label fecha', textKey: 'c_form_date', key: 'c_form_date', defaultValue: 'Fecha estimada' },
                        { type: 'text', label: 'Label mensaje', textKey: 'c_form_message', key: 'c_form_message', defaultValue: 'Mensaje / Requerimientos especiales' },
                        { type: 'text', label: 'Texto botón', textKey: 'c_form_submit', key: 'c_form_submit', defaultValue: 'Solicitar cotización' },
                        { type: 'text', label: 'Texto enviando', textKey: 'c_form_sending', key: 'c_form_sending', defaultValue: 'Enviando...' },
                        { type: 'text', label: 'Texto campos requeridos', textKey: 'c_form_required', key: 'c_form_required', defaultValue: '* Campos obligatorios' },
                        { type: 'text', label: 'Texto privacidad', textKey: 'c_form_privacy', key: 'c_form_privacy', defaultValue: 'Al enviar este formulario, aceptas recibir información sobre nuestros servicios de catering.' },
                        // Éxito
                        { type: 'text', label: 'Título éxito', textKey: 'c_success_title', key: 'c_success_title', defaultValue: '¡Solicitud enviada con éxito!' },
                        { type: 'text', label: 'Mensaje éxito', textKey: 'c_success_message', key: 'c_success_message', defaultValue: 'En menos de 24 horas te contactaremos para coordinar los detalles de tu evento y una degustación sin cargo.' },
                        { type: 'text', label: 'Botón éxito', textKey: 'c_success_button', key: 'c_success_button', defaultValue: 'Nueva solicitud' },
                    ]
                },
                {
                    id: 'contact_why_items',
                    title: 'Lista de "Por qué elegirnos"',
                    icon: Award,
                    dynamicList: {
                        itemKeyPrefix: 'c_why_item_',
                        defaultCount: 4,
                        maxCount: 8,
                        fields: [
                            { type: 'text', key: 'text', label: 'Texto', defaultValue: 'Menús personalizados' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        defaultItems: [
                            { text: 'Menús personalizados', visible: true },
                            { text: 'Ingredientes frescos', visible: true },
                            { text: 'Servicio profesional', visible: true },
                            { text: 'Sin cargo por degustación', visible: true }
                        ]
                    }
                },
                {
                    id: 'contact_typography',
                    title: 'Tipografía',
                    icon: Type,
                    fields: [
                        { type: 'size', label: 'Tamaño del título de sección', sizeKey: 'contactTitleSize', key: 'contactTitleSize', options: ['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem'] },
                        { type: 'size', label: 'Tamaño del texto general', sizeKey: 'contactTextSize', key: 'contactTextSize', options: ['0.875rem', '1rem', '1.125rem'] },
                        { type: 'size', label: 'Tamaño de las etiquetas', sizeKey: 'contactLabelSize', key: 'contactLabelSize', options: ['0.75rem', '0.875rem', '1rem'] },
                        { type: 'size', label: 'Tamaño del botón', sizeKey: 'contactButtonSize', key: 'contactButtonSize', options: ['0.875rem', '1rem', '1.125rem'] },
                    ]
                }
            ]
        },
        // ========== FOOTER ==========
        {
            id: 'footer',
            title: 'Footer',
            icon: Layout,
            groups: [
                {
                    id: 'footer_logo',
                    title: 'Logo y marca',
                    icon: Image,
                    fields: [
                        { type: 'image', label: 'Imagen del logo', imageElementId: 'c_footer_logo', key: 'c_footer_logo' },
                        { type: 'text', label: 'Texto primera parte', textKey: 'c_footer_brand_1', key: 'c_footer_brand_1', defaultValue: 'Kernelize' },
                        { type: 'text', label: 'Texto segunda parte', textKey: 'c_footer_brand_2', key: 'c_footer_brand_2', defaultValue: 'Catering' },
                        { type: 'text', label: 'Descripción', textKey: 'c_footer_description', key: 'c_footer_description', defaultValue: 'Hacemos de tu evento una experiencia gastronómica inolvidable. Calidad, creatividad y pasión en cada plato.' },
                    ]
                },
                {
                    id: 'footer_quick_links',
                    title: 'Enlaces rápidos',
                    icon: Link,
                    dynamicList: {
                        itemKeyPrefix: 'c_footer_quicklink_',
                        defaultCount: 5,
                        maxCount: 8,
                        fields: [
                            { type: 'text', key: 'label', label: 'Texto', defaultValue: 'Inicio' },
                            { type: 'text', key: 'url', label: 'Destino', defaultValue: '#home' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        defaultItems: [
                            { label: 'Inicio', url: '#home', visible: true },
                            { label: 'Servicios', url: '#services', visible: true },
                            { label: 'Menú', url: '#menu', visible: true },
                            { label: 'Galería', url: '#gallery', visible: true },
                            { label: 'Contacto', url: '#contact', visible: true }
                        ]
                    }
                },
                {
                    id: 'footer_hours',
                    title: 'Horarios de atención',
                    icon: Clock,
                    fields: [
                        { type: 'text', label: 'Título', textKey: 'c_footer_hours_title', key: 'c_footer_hours_title', defaultValue: 'Horarios de atención' },
                        { type: 'text', label: 'Lunes a Viernes', textKey: 'c_footer_hours_week', key: 'c_footer_hours_week', defaultValue: 'Lun-Vie: 9:00 - 20:00' },
                        { type: 'text', label: 'Sábado', textKey: 'c_footer_hours_sat', key: 'c_footer_hours_sat', defaultValue: 'Sáb: 10:00 - 18:00' },
                        { type: 'text', label: 'Teléfono', textKey: 'c_footer_phone', key: 'c_footer_phone', defaultValue: '+54 9 11 6745-7413' },
                        { type: 'text', label: 'Email', textKey: 'c_footer_email', key: 'c_footer_email', defaultValue: 'eventos@kernelizecatering.com' },
                        { type: 'text', label: 'Ubicación', textKey: 'c_footer_location', key: 'c_footer_location', defaultValue: 'Buenos Aires, Argentina' },
                    ]
                },
                {
                    id: 'footer_newsletter',
                    title: 'Newsletter',
                    icon: Mail,
                    fields: [
                        { type: 'text', label: 'Título', textKey: 'c_footer_newsletter', key: 'c_footer_newsletter', defaultValue: 'Novedades' },
                        { type: 'text', label: 'Descripción', textKey: 'c_footer_newsletter_desc', key: 'c_footer_newsletter_desc', defaultValue: 'Suscríbete para recibir promociones y novedades gastronómicas.' },
                        { type: 'text', label: 'Texto botón', textKey: 'c_footer_newsletter_button', key: 'c_footer_newsletter_button', defaultValue: 'Suscribirse' },
                    ]
                },
                {
                    id: 'footer_legal',
                    title: 'Copyright y legal',
                    icon: FileText,
                    fields: [
                        { type: 'text', label: 'Copyright', textKey: 'c_footer_copyright', key: 'c_footer_copyright', defaultValue: 'Kernelize Catering. Todos los derechos reservados.' },
                        { type: 'text', label: 'Texto "Hecho con"', textKey: 'c_footer_made_with', key: 'c_footer_made_with', defaultValue: 'Hecho con' },
                        { type: 'text', label: 'Texto "para"', textKey: 'c_footer_for', key: 'c_footer_for', defaultValue: 'para los amantes de la buena mesa' },
                        { type: 'text', label: 'Términos', textKey: 'c_footer_terms', key: 'c_footer_terms', defaultValue: 'Términos' },
                        { type: 'text', label: 'Privacidad', textKey: 'c_footer_privacy', key: 'c_footer_privacy', defaultValue: 'Privacidad' },
                        { type: 'text', label: 'Cookies', textKey: 'c_footer_cookies', key: 'c_footer_cookies', defaultValue: 'Cookies' },
                    ]
                },
                {
                    id: 'footer_certifications',
                    title: 'Certificaciones (hasta 8)',
                    icon: Award,
                    dynamicList: {
                        itemKeyPrefix: 'c_cert_',
                        defaultCount: 3,
                        maxCount: 8,
                        fields: [
                            { type: 'text', key: 'label', label: 'Texto', defaultValue: '⭐ Calidad certificada' },
                            { type: 'checkbox', key: 'visible', label: 'Mostrar', defaultValue: true }
                        ],
                        defaultItems: [
                            { label: '⭐ Calidad certificada', visible: true },
                            { label: '🥇 Miembro de AAGA', visible: true },
                            { label: '🌿 Ingredientes frescos', visible: true }
                        ]
                    }
                },
                {
                    id: 'footer_social',
                    title: 'Redes Sociales',
                    icon: Share2,
                    fields: [
                        { type: 'color', label: 'Color del ícono', sectionColorKey: 'socialIconColor', key: 'socialIconColor', defaultValue: '#94a3b8' },
                        { type: 'color', label: 'Color al pasar mouse', sectionColorKey: 'socialIconHoverColor', key: 'socialIconHoverColor', defaultValue: '#f59e0b' },
                        { type: 'text', label: 'Facebook URL', textKey: 'c_social_facebook_url', key: 'c_social_facebook_url', defaultValue: '#' },
                        { type: 'text', label: 'Instagram URL', textKey: 'c_social_instagram_url', key: 'c_social_instagram_url', defaultValue: '#' },
                        { type: 'text', label: 'LinkedIn URL', textKey: 'c_social_linkedin_url', key: 'c_social_linkedin_url', defaultValue: '#' },
                        { type: 'text', label: 'Twitter URL', textKey: 'c_social_twitter_url', key: 'c_social_twitter_url', defaultValue: '#' },
                        { type: 'checkbox', label: 'Mostrar Facebook', checkboxKey: 'show_social_facebook', key: 'show_social_facebook', defaultValue: true },
                        { type: 'checkbox', label: 'Mostrar Instagram', checkboxKey: 'show_social_instagram', key: 'show_social_instagram', defaultValue: true },
                        { type: 'checkbox', label: 'Mostrar LinkedIn', checkboxKey: 'show_social_linkedin', key: 'show_social_linkedin', defaultValue: true },
                        { type: 'checkbox', label: 'Mostrar Twitter', checkboxKey: 'show_social_twitter', key: 'show_social_twitter', defaultValue: true },
                    ]
                },
                {
                    id: 'footer_typography',
                    title: 'Tipografía',
                    icon: Type,
                    fields: [
                        { type: 'size', label: 'Tamaño de los títulos', sizeKey: 'footerHeadingSize', key: 'footerHeadingSize', options: ['1rem', '1.125rem', '1.25rem', '1.5rem'] },
                        { type: 'size', label: 'Tamaño del texto general', sizeKey: 'footerTextSize', key: 'footerTextSize', options: ['0.75rem', '0.875rem', '1rem'] },
                        { type: 'size', label: 'Tamaño de los enlaces', sizeKey: 'footerLinkSize', key: 'footerLinkSize', options: ['0.75rem', '0.875rem', '1rem'] },
                    ]
                }
            ]
        }
    ]
};



export const templateConfigs: Record<string, TemplateConfig> = {
    consulting: consultingConfig,
    // catering: cateringConfig, // se agregará más adelante
};