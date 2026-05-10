export interface TemplateColors {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
}

export interface EditableTexts {
    [key: string]: string;
}

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
    // featuresBackground: string;
    // featuresTitleColor: string;
    // featuresCardBackground: string;
    // featuresCardBorder: string;
    footerBackground: string;
    footerTextColor: string;
    footerLinkColor: string;
    footerHeadingColor: string;
    footerLinkHoverColor: string;
    socialIconColor: string;
    socialIconHoverColor: string;
    globalLinkColor: string;
    globalLinkHoverColor: string;
    cardHoverScale: string;
    cardHoverShadow: string;
    iconColor: string;
    iconSize: string;
    bodyBackground: string;
    bodyTextColor: string;

    statValueColor: string;
    statLabelColor: string;

    headerCtaBackground: string;
    headerCtaText: string;
    headerCtaHoverBackground: string;

    logoTextColor1: string;  // color para "KE"
    logoTextColor2: string;  // color para "Consulting"
    logoTextSize: string;

    // Features (Características)
    featuresBackground: string;
    featuresTitleColor: string;
    featuresCardBackground: string;
    featuresCardBorder: string;
    featuresIconColor: string;

    // About (Sobre Nosotros)
    aboutBackground: string;
    aboutTitleColor: string;
    aboutTextColor: string;
    aboutBadgeBackground: string;
    aboutBadgeTextColor: string;
    aboutImageBorderRadius: string;

    // Testimonios
    testimonialsBackground: string;
    testimonialsTitleColor: string;
    testimonialsTextColor: string;
    testimonialsCardBackground: string;
    testimonialsCardBorder: string;
    testimonialsNameColor: string;
    testimonialsRoleColor: string;

    // Contacto
    contactBackground: string;
    contactTitleColor: string;
    contactTextColor: string;
    contactFormBackground: string;
    contactFormBorder: string;
    contactInputBackground: string;
    contactInputBorder: string;
    contactInputTextColor: string;
    contactButtonBackground: string;
    contactButtonText: string;
    contactButtonHoverBackground: string;
}

export interface TypographyConfig {
    // Fuentes globales
    headingFont: string;
    bodyFont: string;
    headingWeight: string;
    bodyWeight: string;

    // Hero
    heroTitleSize: string;
    heroDescriptionSize: string;

    // Características / Servicios
    featuresTitleSize: string;
    featuresCardTitleSize: string;
    featuresDescriptionSize: string;

    // Sobre Nosotros
    aboutTitleSize: string;
    aboutTextSize: string;
    aboutStatsValueSize: string;
    aboutStatsLabelSize: string;
    aboutDifferentiatorSize: string;

    // Testimonios
    testimonialsTitleSize: string;
    testimonialsNameSize: string;
    testimonialsRoleSize: string;
    testimonialsTextSize: string;

    // Contacto
    contactTitleSize: string;
    contactTextSize: string;
    contactLabelSize: string;
    contactButtonSize: string;
    contactCardTitleSize: string;  // 👈 NUEVO

    // Footer
    footerHeadingSize: string;
    footerTextSize: string;
    footerLinkSize: string;

    // 👇 NUEVOS (para header y navegación)
    navTextSize?: string;      // Tamaño de los enlaces del menú
    buttonTextSize?: string;   // Tamaño del texto de los botones (CTA, etc.)
}

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
    ui?: {
        borderRadius: { medium: string, large: string },
        boxShadow: { medium: string },
    }
}

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

export interface StoredTemplate extends Omit<Template, 'createdAt' | 'updatedAt'> {
    createdAt: string;
    updatedAt: string;
    lastSaved?: string;
}

// Nuevos presets completos (10)
export interface FullPreset {
    name: string;
    colors: TemplateColors;
    sectionColors: Partial<SectionColors>;
    typography: Partial<TypographyConfig>;
    ui?: Partial<UIConfig>;
}

export const fullPresets: FullPreset[] = [
    // ========== 1. Minimalista Claro ==========
    {
        name: "Minimalista Claro",
        colors: {
            primary: "#3b82f6",
            secondary: "#6b7280",
            accent: "#1e293b",
            background: "#ffffff",
            text: "#0f172a"
        },
        sectionColors: {
            heroBackground: "#f8fafc",
            heroTitleColor: "#0f172a",
            heroDescriptionColor: "#475569",
            heroBadgeBackground: "#3b82f6",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#3b82f6",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#2563eb",
            buttonSecondaryBackground: "#ffffff",
            buttonSecondaryText: "#1e293b",
            buttonSecondaryHoverBackground: "#f1f5f9",
            headerBackground: "#ffffff",
            headerTextColor: "#0f172a",
            headerLinkColor: "#475569",
            headerLinkHoverColor: "#3b82f6",
            featuresBackground: "#ffffff",
            featuresTitleColor: "#0f172a",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#e2e8f0",
            footerBackground: "#0f172a",
            footerTextColor: "#94a3b8",
            footerLinkColor: "#cbd5e1",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#f8fafc",
            aboutTitleColor: "#0f172a",
            aboutTextColor: "#334155",
            testimonialsBackground: "#0f172a",
            testimonialsTitleColor: "#ffffff",
            testimonialsTextColor: "#cbd5e1",
            testimonialsCardBackground: "#1e293b",
            testimonialsCardBorder: "#334155",
            contactBackground: "#ffffff",
            contactTitleColor: "#0f172a",
            contactTextColor: "#475569",
            contactFormBackground: "#f8fafc",
            contactFormBorder: "#e2e8f0",
            contactButtonBackground: "#3b82f6",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#2563eb",
        },
        typography: {
            headingFont: "Inter, system-ui, sans-serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "700",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // ========== 2. Élite Oscuro ==========
    {
        name: "Élite Oscuro",
        colors: {
            primary: "#d97706",
            secondary: "#92400e",
            accent: "#451a03",
            background: "#0a0a0a",
            text: "#f5f5f5"
        },
        sectionColors: {
            heroBackground: "#111111",
            heroTitleColor: "#fef3c7",
            heroDescriptionColor: "#d1d5db",
            heroBadgeBackground: "#d97706",
            heroBadgeTextColor: "#000000",
            buttonPrimaryBackground: "#d97706",
            buttonPrimaryText: "#000000",
            buttonPrimaryHoverBackground: "#b45309",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#d97706",
            buttonSecondaryHoverBackground: "rgba(217,119,6,0.1)",
            headerBackground: "#111111",
            headerTextColor: "#fef3c7",
            headerLinkColor: "#d1d5db",
            headerLinkHoverColor: "#d97706",
            featuresBackground: "#0a0a0a",
            featuresTitleColor: "#fef3c7",
            featuresCardBackground: "#1a1a1a",
            featuresCardBorder: "#333333",
            footerBackground: "#0a0a0a",
            footerTextColor: "#9ca3af",
            footerLinkColor: "#d1d5db",
            footerHeadingColor: "#fef3c7",
            aboutBackground: "#0a0a0a",
            aboutTitleColor: "#fef3c7",
            aboutTextColor: "#d1d5db",
            testimonialsBackground: "#0a0a0a",
            testimonialsTitleColor: "#fef3c7",
            testimonialsTextColor: "#d1d5db",
            testimonialsCardBackground: "#1a1a1a",
            testimonialsCardBorder: "#333333",
            contactBackground: "#0a0a0a",
            contactTitleColor: "#fef3c7",
            contactTextColor: "#d1d5db",
            contactFormBackground: "#1a1a1a",
            contactFormBorder: "#333333",
            contactButtonBackground: "#d97706",
            contactButtonText: "#000000",
            contactButtonHoverBackground: "#b45309",
        },
        typography: {
            headingFont: "Montserrat, system-ui, sans-serif",
            bodyFont: "Open Sans, system-ui, sans-serif",
            headingWeight: "700",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // ========== 3. Futurista Neon ==========
    {
        name: "Futurista Neon",
        colors: {
            primary: "#8b5cf6",
            secondary: "#06b6d4",
            accent: "#3b0764",
            background: "#030712",
            text: "#e2e8f0"
        },
        sectionColors: {
            heroBackground: "#0f172a",
            heroTitleColor: "#ffffff",
            heroDescriptionColor: "#94a3b8",
            heroBadgeBackground: "#8b5cf6",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#8b5cf6",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#7c3aed",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#8b5cf6",
            buttonSecondaryHoverBackground: "rgba(139,92,246,0.1)",
            headerBackground: "#0f172a",
            headerTextColor: "#ffffff",
            headerLinkColor: "#cbd5e1",
            headerLinkHoverColor: "#8b5cf6",
            featuresBackground: "#0f172a",
            featuresTitleColor: "#ffffff",
            featuresCardBackground: "#1e293b",
            featuresCardBorder: "#334155",
            footerBackground: "#0f172a",
            footerTextColor: "#94a3b8",
            footerLinkColor: "#cbd5e1",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#0f172a",
            aboutTitleColor: "#ffffff",
            aboutTextColor: "#cbd5e1",
            testimonialsBackground: "#0f172a",
            testimonialsTitleColor: "#ffffff",
            testimonialsTextColor: "#cbd5e1",
            testimonialsCardBackground: "#1e293b",
            testimonialsCardBorder: "#334155",
            contactBackground: "#0f172a",
            contactTitleColor: "#ffffff",
            contactTextColor: "#cbd5e1",
            contactFormBackground: "#1e293b",
            contactFormBorder: "#334155",
            contactButtonBackground: "#8b5cf6",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#7c3aed",
        },
        typography: {
            headingFont: "Poppins, system-ui, sans-serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // ========== 4. Bosque Natural ==========
    {
        name: "Bosque Natural",
        colors: {
            primary: "#10b981",
            secondary: "#047857",
            accent: "#064e3b",
            background: "#f0fdf4",
            text: "#022c22"
        },
        sectionColors: {
            heroBackground: "#ecfdf5",
            heroTitleColor: "#064e3b",
            heroDescriptionColor: "#047857",
            heroBadgeBackground: "#10b981",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#10b981",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#059669",
            buttonSecondaryBackground: "#ffffff",
            buttonSecondaryText: "#10b981",
            buttonSecondaryHoverBackground: "#d1fae5",
            headerBackground: "#ffffff",
            headerTextColor: "#064e3b",
            headerLinkColor: "#047857",
            headerLinkHoverColor: "#10b981",
            featuresBackground: "#f0fdf4",
            featuresTitleColor: "#064e3b",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#d1fae5",
            footerBackground: "#064e3b",
            footerTextColor: "#a7f3d0",
            footerLinkColor: "#d1fae5",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#ecfdf5",
            aboutTitleColor: "#064e3b",
            aboutTextColor: "#047857",
            testimonialsBackground: "#064e3b",
            testimonialsTitleColor: "#ffffff",
            testimonialsTextColor: "#d1fae5",
            testimonialsCardBackground: "#047857",
            testimonialsCardBorder: "#10b981",
            contactBackground: "#ffffff",
            contactTitleColor: "#064e3b",
            contactTextColor: "#047857",
            contactFormBackground: "#f0fdf4",
            contactFormBorder: "#d1fae5",
            contactButtonBackground: "#10b981",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#059669",
        },
        typography: {
            headingFont: "Poppins, system-ui, sans-serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.9rem",
            buttonTextSize: "0.875rem",
        },
    },
    // ========== 5. Lujo Dorado ==========
    {
        name: "Lujo Dorado",
        colors: {
            primary: "#d4af37",
            secondary: "#1a1a2e",
            accent: "#16213e",
            background: "#f9f9f9",
            text: "#1a1a2e"
        },
        sectionColors: {
            heroBackground: "#1a1a2e",
            heroTitleColor: "#d4af37",
            heroDescriptionColor: "#e2e8f0",
            heroBadgeBackground: "#d4af37",
            heroBadgeTextColor: "#1a1a2e",
            buttonPrimaryBackground: "#d4af37",
            buttonPrimaryText: "#1a1a2e",
            buttonPrimaryHoverBackground: "#c0a020",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#d4af37",
            buttonSecondaryHoverBackground: "rgba(212,175,55,0.1)",
            headerBackground: "#1a1a2e",
            headerTextColor: "#ffffff",
            headerLinkColor: "#e2e8f0",
            headerLinkHoverColor: "#d4af37",
            featuresBackground: "#f9f9f9",
            featuresTitleColor: "#1a1a2e",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#e2e8f0",
            footerBackground: "#1a1a2e",
            footerTextColor: "#94a3b8",
            footerLinkColor: "#cbd5e1",
            footerHeadingColor: "#d4af37",
            aboutBackground: "#f1f5f9",
            aboutTitleColor: "#1a1a2e",
            aboutTextColor: "#334155",
            testimonialsBackground: "#1a1a2e",
            testimonialsTitleColor: "#d4af37",
            testimonialsTextColor: "#e2e8f0",
            testimonialsCardBackground: "#16213e",
            testimonialsCardBorder: "#d4af37",
            contactBackground: "#ffffff",
            contactTitleColor: "#1a1a2e",
            contactTextColor: "#334155",
            contactFormBackground: "#f8fafc",
            contactFormBorder: "#e2e8f0",
            contactButtonBackground: "#d4af37",
            contactButtonText: "#1a1a2e",
            contactButtonHoverBackground: "#c0a020",
        },
        typography: {
            headingFont: "Playfair Display, Georgia, serif",
            bodyFont: "Lato, system-ui, sans-serif",
            headingWeight: "700",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // ========== 6. Tecnología Azul ==========
    {
        name: "Tecnología Azul",
        colors: {
            primary: "#0077b6",
            secondary: "#00b4d8",
            accent: "#03045e",
            background: "#f8f9fa",
            text: "#212529"
        },
        sectionColors: {
            heroBackground: "#e0f2fe",
            heroTitleColor: "#03045e",
            heroDescriptionColor: "#0077b6",
            heroBadgeBackground: "#0077b6",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#0077b6",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#005f8c",
            buttonSecondaryBackground: "#ffffff",
            buttonSecondaryText: "#0077b6",
            buttonSecondaryHoverBackground: "#caf0f8",
            headerBackground: "#ffffff",
            headerTextColor: "#03045e",
            headerLinkColor: "#0077b6",
            headerLinkHoverColor: "#00b4d8",
            featuresBackground: "#f8f9fa",
            featuresTitleColor: "#03045e",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#dee2e6",
            footerBackground: "#03045e",
            footerTextColor: "#90e0ef",
            footerLinkColor: "#caf0f8",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#e0f2fe",
            aboutTitleColor: "#03045e",
            aboutTextColor: "#0077b6",
            testimonialsBackground: "#03045e",
            testimonialsTitleColor: "#ffffff",
            testimonialsTextColor: "#caf0f8",
            testimonialsCardBackground: "#0077b6",
            testimonialsCardBorder: "#00b4d8",
            contactBackground: "#ffffff",
            contactTitleColor: "#03045e",
            contactTextColor: "#0077b6",
            contactFormBackground: "#f8f9fa",
            contactFormBorder: "#dee2e6",
            contactButtonBackground: "#0077b6",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#005f8c",
        },
        typography: {
            headingFont: "Poppins, system-ui, sans-serif",
            bodyFont: "Roboto, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // ========== 7. Romance Rosa ==========
    {
        name: "Romance Rosa",
        colors: {
            primary: "#ec489a",
            secondary: "#be185d",
            accent: "#831843",
            background: "#fff5f5",
            text: "#4c0519"
        },
        sectionColors: {
            heroBackground: "#fce7f3",
            heroTitleColor: "#be185d",
            heroDescriptionColor: "#9d174d",
            heroBadgeBackground: "#ec489a",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#ec489a",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#db2777",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#ec489a",
            buttonSecondaryHoverBackground: "rgba(236,72,154,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#be185d",
            headerLinkColor: "#9d174d",
            headerLinkHoverColor: "#ec489a",
            featuresBackground: "#fff5f5",
            featuresTitleColor: "#be185d",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#fce7f3",
            footerBackground: "#831843",
            footerTextColor: "#fbcfe8",
            footerLinkColor: "#fce7f3",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#fce7f3",
            aboutTitleColor: "#be185d",
            aboutTextColor: "#9d174d",
            testimonialsBackground: "#831843",
            testimonialsTitleColor: "#ec489a",
            testimonialsTextColor: "#fce7f3",
            testimonialsCardBackground: "#be185d",
            testimonialsCardBorder: "#ec489a",
            contactBackground: "#ffffff",
            contactTitleColor: "#be185d",
            contactTextColor: "#9d174d",
            contactFormBackground: "#fce7f3",
            contactFormBorder: "#fbcfe8",
            contactButtonBackground: "#ec489a",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#db2777",
        },
        typography: {
            headingFont: "Playfair Display, Georgia, serif",
            bodyFont: "Lato, system-ui, sans-serif",
            headingWeight: "700",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // ========== 8. Energía Naranja ==========
    {
        name: "Energía Naranja",
        colors: {
            primary: "#f97316",
            secondary: "#ea580c",
            accent: "#7c2d12",
            background: "#fff7ed",
            text: "#431407"
        },
        sectionColors: {
            heroBackground: "#ffedd5",
            heroTitleColor: "#ea580c",
            heroDescriptionColor: "#c2410c",
            heroBadgeBackground: "#f97316",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#f97316",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#ea580c",
            buttonSecondaryBackground: "#ffffff",
            buttonSecondaryText: "#f97316",
            buttonSecondaryHoverBackground: "#ffedd5",
            headerBackground: "#ffffff",
            headerTextColor: "#ea580c",
            headerLinkColor: "#c2410c",
            headerLinkHoverColor: "#f97316",
            featuresBackground: "#fff7ed",
            featuresTitleColor: "#ea580c",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#ffedd5",
            footerBackground: "#7c2d12",
            footerTextColor: "#fed7aa",
            footerLinkColor: "#ffedd5",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#ffedd5",
            aboutTitleColor: "#ea580c",
            aboutTextColor: "#c2410c",
            testimonialsBackground: "#7c2d12",
            testimonialsTitleColor: "#f97316",
            testimonialsTextColor: "#ffedd5",
            testimonialsCardBackground: "#c2410c",
            testimonialsCardBorder: "#f97316",
            contactBackground: "#ffffff",
            contactTitleColor: "#ea580c",
            contactTextColor: "#c2410c",
            contactFormBackground: "#fff7ed",
            contactFormBorder: "#ffedd5",
            contactButtonBackground: "#f97316",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#ea580c",
        },
        typography: {
            headingFont: "Montserrat, system-ui, sans-serif",
            bodyFont: "Open Sans, system-ui, sans-serif",
            headingWeight: "700",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // ========== 9. Nieve Fresca ==========
    {
        name: "Nieve Fresca",
        colors: {
            primary: "#94a3b8",
            secondary: "#475569",
            accent: "#1e293b",
            background: "#f8fafc",
            text: "#0f172a"
        },
        sectionColors: {
            heroBackground: "#f1f5f9",
            heroTitleColor: "#0f172a",
            heroDescriptionColor: "#475569",
            heroBadgeBackground: "#94a3b8",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#94a3b8",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#64748b",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#94a3b8",
            buttonSecondaryHoverBackground: "rgba(148,163,184,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#0f172a",
            headerLinkColor: "#475569",
            headerLinkHoverColor: "#94a3b8",
            featuresBackground: "#f8fafc",
            featuresTitleColor: "#0f172a",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#e2e8f0",
            footerBackground: "#1e293b",
            footerTextColor: "#94a3b8",
            footerLinkColor: "#cbd5e1",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#f1f5f9",
            aboutTitleColor: "#0f172a",
            aboutTextColor: "#475569",
            testimonialsBackground: "#1e293b",
            testimonialsTitleColor: "#ffffff",
            testimonialsTextColor: "#cbd5e1",
            testimonialsCardBackground: "#334155",
            testimonialsCardBorder: "#475569",
            contactBackground: "#ffffff",
            contactTitleColor: "#0f172a",
            contactTextColor: "#475569",
            contactFormBackground: "#f8fafc",
            contactFormBorder: "#e2e8f0",
            contactButtonBackground: "#94a3b8",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#64748b",
        },
        typography: {
            headingFont: "Inter, system-ui, sans-serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // ========== 10. Tropical Vibrante ==========
    {
        name: "Tropical Vibrante",
        colors: {
            primary: "#eab308",
            secondary: "#16a34a",
            accent: "#65a30d",
            background: "#fefce8",
            text: "#3f6212"
        },
        sectionColors: {
            heroBackground: "#fef08a",
            heroTitleColor: "#3f6212",
            heroDescriptionColor: "#65a30d",
            heroBadgeBackground: "#eab308",
            heroBadgeTextColor: "#3f6212",
            buttonPrimaryBackground: "#eab308",
            buttonPrimaryText: "#3f6212",
            buttonPrimaryHoverBackground: "#ca8a04",
            buttonSecondaryBackground: "#ffffff",
            buttonSecondaryText: "#16a34a",
            buttonSecondaryHoverBackground: "#dcfce7",
            headerBackground: "#ffffff",
            headerTextColor: "#3f6212",
            headerLinkColor: "#65a30d",
            headerLinkHoverColor: "#eab308",
            featuresBackground: "#fefce8",
            featuresTitleColor: "#3f6212",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#fef08a",
            footerBackground: "#3f6212",
            footerTextColor: "#fef08a",
            footerLinkColor: "#ecfccb",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#fef08a",
            aboutTitleColor: "#3f6212",
            aboutTextColor: "#65a30d",
            testimonialsBackground: "#3f6212",
            testimonialsTitleColor: "#eab308",
            testimonialsTextColor: "#fef08a",
            testimonialsCardBackground: "#65a30d",
            testimonialsCardBorder: "#eab308",
            contactBackground: "#ffffff",
            contactTitleColor: "#3f6212",
            contactTextColor: "#65a30d",
            contactFormBackground: "#fefce8",
            contactFormBorder: "#fef08a",
            contactButtonBackground: "#eab308",
            contactButtonText: "#3f6212",
            contactButtonHoverBackground: "#ca8a04",
        },
        typography: {
            headingFont: "Poppins, system-ui, sans-serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.9rem",
            buttonTextSize: "0.875rem",
        },
    },

    // ========== NUEVOS 10 PRESETS (del 11 al 20) ==========
    // 11. Mar Profundo
    {
        name: "Mar Profundo",
        colors: {
            primary: "#0284c7",
            secondary: "#0369a1",
            accent: "#082f49",
            background: "#f0f9ff",
            text: "#082f49"
        },
        sectionColors: {
            heroBackground: "#e0f2fe",
            heroTitleColor: "#082f49",
            heroDescriptionColor: "#0284c7",
            heroBadgeBackground: "#0284c7",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#0284c7",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#0369a1",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#0284c7",
            buttonSecondaryHoverBackground: "rgba(2,132,199,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#082f49",
            headerLinkColor: "#0369a1",
            headerLinkHoverColor: "#0284c7",
            featuresBackground: "#f0f9ff",
            featuresTitleColor: "#082f49",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#bae6fd",
            footerBackground: "#082f49",
            footerTextColor: "#bae6fd",
            footerLinkColor: "#e0f2fe",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#e0f2fe",
            aboutTitleColor: "#082f49",
            aboutTextColor: "#0369a1",
            testimonialsBackground: "#082f49",
            testimonialsTitleColor: "#ffffff",
            testimonialsTextColor: "#bae6fd",
            testimonialsCardBackground: "#0369a1",
            testimonialsCardBorder: "#0284c7",
            contactBackground: "#ffffff",
            contactTitleColor: "#082f49",
            contactTextColor: "#0369a1",
            contactFormBackground: "#f0f9ff",
            contactFormBorder: "#bae6fd",
            contactButtonBackground: "#0284c7",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#0369a1",
        },
        typography: {
            headingFont: "Poppins, system-ui, sans-serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // 12. Terracota Cálido
    {
        name: "Terracota Cálido",
        colors: {
            primary: "#e07a5f",
            secondary: "#b95f4a",
            accent: "#6b3e2e",
            background: "#fdf4f0",
            text: "#3d2b1f"
        },
        sectionColors: {
            heroBackground: "#fcf0e8",
            heroTitleColor: "#6b3e2e",
            heroDescriptionColor: "#b95f4a",
            heroBadgeBackground: "#e07a5f",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#e07a5f",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#c7684f",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#e07a5f",
            buttonSecondaryHoverBackground: "rgba(224,122,95,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#6b3e2e",
            headerLinkColor: "#b95f4a",
            headerLinkHoverColor: "#e07a5f",
            featuresBackground: "#fdf4f0",
            featuresTitleColor: "#6b3e2e",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#f5e0d4",
            footerBackground: "#6b3e2e",
            footerTextColor: "#f5e0d4",
            footerLinkColor: "#fcf0e8",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#fcf0e8",
            aboutTitleColor: "#6b3e2e",
            aboutTextColor: "#b95f4a",
            testimonialsBackground: "#6b3e2e",
            testimonialsTitleColor: "#e07a5f",
            testimonialsTextColor: "#f5e0d4",
            testimonialsCardBackground: "#b95f4a",
            testimonialsCardBorder: "#e07a5f",
            contactBackground: "#ffffff",
            contactTitleColor: "#6b3e2e",
            contactTextColor: "#b95f4a",
            contactFormBackground: "#fdf4f0",
            contactFormBorder: "#f5e0d4",
            contactButtonBackground: "#e07a5f",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#c7684f",
        },
        typography: {
            headingFont: "Lora, serif",
            bodyFont: "Poppins, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // 13. Lavanda Sereno
    {
        name: "Lavanda Sereno",
        colors: {
            primary: "#8b5cf6",
            secondary: "#7c3aed",
            accent: "#4c1d95",
            background: "#faf5ff",
            text: "#2e1065"
        },
        sectionColors: {
            heroBackground: "#f3e8ff",
            heroTitleColor: "#4c1d95",
            heroDescriptionColor: "#7c3aed",
            heroBadgeBackground: "#8b5cf6",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#8b5cf6",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#7c3aed",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#8b5cf6",
            buttonSecondaryHoverBackground: "rgba(139,92,246,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#4c1d95",
            headerLinkColor: "#7c3aed",
            headerLinkHoverColor: "#8b5cf6",
            featuresBackground: "#faf5ff",
            featuresTitleColor: "#4c1d95",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#e9d5ff",
            footerBackground: "#4c1d95",
            footerTextColor: "#e9d5ff",
            footerLinkColor: "#f3e8ff",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#f3e8ff",
            aboutTitleColor: "#4c1d95",
            aboutTextColor: "#7c3aed",
            testimonialsBackground: "#4c1d95",
            testimonialsTitleColor: "#8b5cf6",
            testimonialsTextColor: "#e9d5ff",
            testimonialsCardBackground: "#7c3aed",
            testimonialsCardBorder: "#8b5cf6",
            contactBackground: "#ffffff",
            contactTitleColor: "#4c1d95",
            contactTextColor: "#7c3aed",
            contactFormBackground: "#faf5ff",
            contactFormBorder: "#e9d5ff",
            contactButtonBackground: "#8b5cf6",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#7c3aed",
        },
        typography: {
            headingFont: "Playfair Display, Georgia, serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "700",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // 14. Carbón Corporativo
    {
        name: "Carbón Corporativo",
        colors: {
            primary: "#1f2937",
            secondary: "#374151",
            accent: "#111827",
            background: "#f9fafb",
            text: "#1f2937"
        },
        sectionColors: {
            heroBackground: "#f3f4f6",
            heroTitleColor: "#111827",
            heroDescriptionColor: "#374151",
            heroBadgeBackground: "#1f2937",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#1f2937",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#111827",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#1f2937",
            buttonSecondaryHoverBackground: "rgba(31,41,55,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#111827",
            headerLinkColor: "#374151",
            headerLinkHoverColor: "#1f2937",
            featuresBackground: "#f9fafb",
            featuresTitleColor: "#111827",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#e5e7eb",
            footerBackground: "#111827",
            footerTextColor: "#9ca3af",
            footerLinkColor: "#d1d5db",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#f3f4f6",
            aboutTitleColor: "#111827",
            aboutTextColor: "#374151",
            testimonialsBackground: "#111827",
            testimonialsTitleColor: "#ffffff",
            testimonialsTextColor: "#9ca3af",
            testimonialsCardBackground: "#1f2937",
            testimonialsCardBorder: "#374151",
            contactBackground: "#ffffff",
            contactTitleColor: "#111827",
            contactTextColor: "#374151",
            contactFormBackground: "#f9fafb",
            contactFormBorder: "#e5e7eb",
            contactButtonBackground: "#1f2937",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#111827",
        },
        typography: {
            headingFont: "Roboto, system-ui, sans-serif",
            bodyFont: "Roboto, system-ui, sans-serif",
            headingWeight: "500",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // 15. Cereza Dulce
    {
        name: "Cereza Dulce",
        colors: {
            primary: "#e11d48",
            secondary: "#be123c",
            accent: "#881337",
            background: "#fff1f2",
            text: "#4c0519"
        },
        sectionColors: {
            heroBackground: "#ffe4e6",
            heroTitleColor: "#881337",
            heroDescriptionColor: "#be123c",
            heroBadgeBackground: "#e11d48",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#e11d48",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#be123c",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#e11d48",
            buttonSecondaryHoverBackground: "rgba(225,29,72,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#881337",
            headerLinkColor: "#be123c",
            headerLinkHoverColor: "#e11d48",
            featuresBackground: "#fff1f2",
            featuresTitleColor: "#881337",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#fecdd3",
            footerBackground: "#881337",
            footerTextColor: "#fecdd3",
            footerLinkColor: "#ffe4e6",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#ffe4e6",
            aboutTitleColor: "#881337",
            aboutTextColor: "#be123c",
            testimonialsBackground: "#881337",
            testimonialsTitleColor: "#e11d48",
            testimonialsTextColor: "#fecdd3",
            testimonialsCardBackground: "#be123c",
            testimonialsCardBorder: "#e11d48",
            contactBackground: "#ffffff",
            contactTitleColor: "#881337",
            contactTextColor: "#be123c",
            contactFormBackground: "#fff1f2",
            contactFormBorder: "#fecdd3",
            contactButtonBackground: "#e11d48",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#be123c",
        },
        typography: {
            headingFont: "Poppins, system-ui, sans-serif",
            bodyFont: "Open Sans, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // 16. Atardecer
    {
        name: "Atardecer",
        colors: {
            primary: "#f97316",
            secondary: "#ea580c",
            accent: "#7c2d12",
            background: "#fff7ed",
            text: "#431407"
        },
        sectionColors: {
            heroBackground: "#ffedd5",
            heroTitleColor: "#9a3412",
            heroDescriptionColor: "#c2410c",
            heroBadgeBackground: "#f97316",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#f97316",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#ea580c",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#f97316",
            buttonSecondaryHoverBackground: "rgba(249,115,22,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#7c2d12",
            headerLinkColor: "#c2410c",
            headerLinkHoverColor: "#f97316",
            featuresBackground: "#fff7ed",
            featuresTitleColor: "#9a3412",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#fed7aa",
            footerBackground: "#7c2d12",
            footerTextColor: "#fed7aa",
            footerLinkColor: "#ffedd5",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#ffedd5",
            aboutTitleColor: "#9a3412",
            aboutTextColor: "#c2410c",
            testimonialsBackground: "#7c2d12",
            testimonialsTitleColor: "#f97316",
            testimonialsTextColor: "#fed7aa",
            testimonialsCardBackground: "#c2410c",
            testimonialsCardBorder: "#f97316",
            contactBackground: "#ffffff",
            contactTitleColor: "#9a3412",
            contactTextColor: "#c2410c",
            contactFormBackground: "#fff7ed",
            contactFormBorder: "#fed7aa",
            contactButtonBackground: "#f97316",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#ea580c",
        },
        typography: {
            headingFont: "Playfair Display, Georgia, serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "700",
            bodyWeight: "400",
            navTextSize: "0.9rem",
            buttonTextSize: "0.875rem",
        },
    },
    // 17. Bosque Místico
    {
        name: "Bosque Místico",
        colors: {
            primary: "#059669",
            secondary: "#047857",
            accent: "#064e3b",
            background: "#ecfdf5",
            text: "#022c22"
        },
        sectionColors: {
            heroBackground: "#d1fae5",
            heroTitleColor: "#064e3b",
            heroDescriptionColor: "#047857",
            heroBadgeBackground: "#059669",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#059669",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#047857",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#059669",
            buttonSecondaryHoverBackground: "rgba(5,150,105,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#064e3b",
            headerLinkColor: "#047857",
            headerLinkHoverColor: "#059669",
            featuresBackground: "#ecfdf5",
            featuresTitleColor: "#064e3b",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#a7f3d0",
            footerBackground: "#064e3b",
            footerTextColor: "#a7f3d0",
            footerLinkColor: "#d1fae5",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#d1fae5",
            aboutTitleColor: "#064e3b",
            aboutTextColor: "#047857",
            testimonialsBackground: "#064e3b",
            testimonialsTitleColor: "#059669",
            testimonialsTextColor: "#a7f3d0",
            testimonialsCardBackground: "#047857",
            testimonialsCardBorder: "#059669",
            contactBackground: "#ffffff",
            contactTitleColor: "#064e3b",
            contactTextColor: "#047857",
            contactFormBackground: "#ecfdf5",
            contactFormBorder: "#a7f3d0",
            contactButtonBackground: "#059669",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#047857",
        },
        typography: {
            headingFont: "Poppins, system-ui, sans-serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // 18. Noche Estrellada
    {
        name: "Noche Estrellada",
        colors: {
            primary: "#4338ca",
            secondary: "#3730a3",
            accent: "#1e1b4b",
            background: "#eef2ff",
            text: "#1e1b4b"
        },
        sectionColors: {
            heroBackground: "#e0e7ff",
            heroTitleColor: "#1e1b4b",
            heroDescriptionColor: "#3730a3",
            heroBadgeBackground: "#4338ca",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#4338ca",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#3730a3",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#4338ca",
            buttonSecondaryHoverBackground: "rgba(67,56,202,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#1e1b4b",
            headerLinkColor: "#3730a3",
            headerLinkHoverColor: "#4338ca",
            featuresBackground: "#eef2ff",
            featuresTitleColor: "#1e1b4b",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#c7d2fe",
            footerBackground: "#1e1b4b",
            footerTextColor: "#c7d2fe",
            footerLinkColor: "#e0e7ff",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#e0e7ff",
            aboutTitleColor: "#1e1b4b",
            aboutTextColor: "#3730a3",
            testimonialsBackground: "#1e1b4b",
            testimonialsTitleColor: "#4338ca",
            testimonialsTextColor: "#c7d2fe",
            testimonialsCardBackground: "#3730a3",
            testimonialsCardBorder: "#4338ca",
            contactBackground: "#ffffff",
            contactTitleColor: "#1e1b4b",
            contactTextColor: "#3730a3",
            contactFormBackground: "#eef2ff",
            contactFormBorder: "#c7d2fe",
            contactButtonBackground: "#4338ca",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#3730a3",
        },
        typography: {
            headingFont: "Poppins, system-ui, sans-serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // 19. Rosa Pastel
    {
        name: "Rosa Pastel",
        colors: {
            primary: "#f43f5e",
            secondary: "#e11d48",
            accent: "#9f1239",
            background: "#fff1f2",
            text: "#4c0519"
        },
        sectionColors: {
            heroBackground: "#ffe4e6",
            heroTitleColor: "#9f1239",
            heroDescriptionColor: "#e11d48",
            heroBadgeBackground: "#f43f5e",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#f43f5e",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#e11d48",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#f43f5e",
            buttonSecondaryHoverBackground: "rgba(244,63,94,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#9f1239",
            headerLinkColor: "#e11d48",
            headerLinkHoverColor: "#f43f5e",
            featuresBackground: "#fff1f2",
            featuresTitleColor: "#9f1239",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#fecdd3",
            footerBackground: "#9f1239",
            footerTextColor: "#fecdd3",
            footerLinkColor: "#ffe4e6",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#ffe4e6",
            aboutTitleColor: "#9f1239",
            aboutTextColor: "#e11d48",
            testimonialsBackground: "#9f1239",
            testimonialsTitleColor: "#f43f5e",
            testimonialsTextColor: "#fecdd3",
            testimonialsCardBackground: "#e11d48",
            testimonialsCardBorder: "#f43f5e",
            contactBackground: "#ffffff",
            contactTitleColor: "#9f1239",
            contactTextColor: "#e11d48",
            contactFormBackground: "#fff1f2",
            contactFormBorder: "#fecdd3",
            contactButtonBackground: "#f43f5e",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#e11d48",
        },
        typography: {
            headingFont: "Playfair Display, Georgia, serif",
            bodyFont: "Open Sans, system-ui, sans-serif",
            headingWeight: "700",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
    // 20. Arena Dorada
    {
        name: "Arena Dorada",
        colors: {
            primary: "#d97706",
            secondary: "#b45309",
            accent: "#78350f",
            background: "#fffbeb",
            text: "#451a03"
        },
        sectionColors: {
            heroBackground: "#fef3c7",
            heroTitleColor: "#78350f",
            heroDescriptionColor: "#b45309",
            heroBadgeBackground: "#d97706",
            heroBadgeTextColor: "#ffffff",
            buttonPrimaryBackground: "#d97706",
            buttonPrimaryText: "#ffffff",
            buttonPrimaryHoverBackground: "#b45309",
            buttonSecondaryBackground: "transparent",
            buttonSecondaryText: "#d97706",
            buttonSecondaryHoverBackground: "rgba(217,119,6,0.1)",
            headerBackground: "#ffffff",
            headerTextColor: "#78350f",
            headerLinkColor: "#b45309",
            headerLinkHoverColor: "#d97706",
            featuresBackground: "#fffbeb",
            featuresTitleColor: "#78350f",
            featuresCardBackground: "#ffffff",
            featuresCardBorder: "#fde68a",
            footerBackground: "#78350f",
            footerTextColor: "#fde68a",
            footerLinkColor: "#fef3c7",
            footerHeadingColor: "#ffffff",
            aboutBackground: "#fef3c7",
            aboutTitleColor: "#78350f",
            aboutTextColor: "#b45309",
            testimonialsBackground: "#78350f",
            testimonialsTitleColor: "#d97706",
            testimonialsTextColor: "#fde68a",
            testimonialsCardBackground: "#b45309",
            testimonialsCardBorder: "#d97706",
            contactBackground: "#ffffff",
            contactTitleColor: "#78350f",
            contactTextColor: "#b45309",
            contactFormBackground: "#fffbeb",
            contactFormBorder: "#fde68a",
            contactButtonBackground: "#d97706",
            contactButtonText: "#ffffff",
            contactButtonHoverBackground: "#b45309",
        },
        typography: {
            headingFont: "Lora, Georgia, serif",
            bodyFont: "Inter, system-ui, sans-serif",
            headingWeight: "600",
            bodyWeight: "400",
            navTextSize: "0.875rem",
            buttonTextSize: "0.875rem",
        },
    },
];

export const colorPresets = {
    consulting: fullPresets.map(p => ({ name: p.name, colors: p.colors })),
};



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
    // featuresBackground: '#ffffff',
    // featuresTitleColor: '#1e293b',
    // featuresCardBackground: '#ffffff',
    // featuresCardBorder: '#e2e8f0',
    footerBackground: '#0f172a',
    footerTextColor: '#94a3b8',
    footerLinkColor: '#cbd5e1',
    footerHeadingColor: '#ffffff',
    footerLinkHoverColor: '#3b82f6',
    socialIconColor: '#94a3b8',
    socialIconHoverColor: '#3b82f6',
    globalLinkColor: '#3b82f6',
    globalLinkHoverColor: '#1d4ed8',
    cardHoverScale: 'scale-105',
    cardHoverShadow: 'shadow-lg',
    iconColor: '#475569',
    iconSize: 'w-5 h-5',
    bodyBackground: '#ffffff',
    bodyTextColor: '#334155',

    statValueColor: '#2563eb',      // mismo color que el primario por defecto
    statLabelColor: '#475569',      // mismo que heroDescriptionColor
    headerCtaBackground: '#2563eb',
    headerCtaText: '#ffffff',
    headerCtaHoverBackground: '#1d4ed8',

    logoTextColor1: '#2563eb',   // azul por defecto
    logoTextColor2: '#475569',   // slate por defecto
    logoTextSize: 'text-2xl',

    // Features
    featuresBackground: '#ffffff',
    featuresTitleColor: '#1e293b',
    featuresCardBackground: '#ffffff',
    featuresCardBorder: '#e2e8f0',
    featuresIconColor: '#2563eb',

    // About
    aboutBackground: '#f8fafc',
    aboutTitleColor: '#1e293b',
    aboutTextColor: '#475569',
    aboutBadgeBackground: '#2563eb',
    aboutBadgeTextColor: '#ffffff',
    aboutImageBorderRadius: '1rem',

    // Testimonios
    testimonialsBackground: '#0f172a',
    testimonialsTitleColor: '#ffffff',
    testimonialsTextColor: '#cbd5e1',
    testimonialsCardBackground: '#1e293b',
    testimonialsCardBorder: '#334155',
    testimonialsNameColor: '#ffffff',
    testimonialsRoleColor: '#94a3b8',

    // Contacto
    contactBackground: '#ffffff',
    contactTitleColor: '#1e293b',
    contactTextColor: '#475569',
    contactFormBackground: '#f8fafc',
    contactFormBorder: '#e2e8f0',
    contactInputBackground: '#ffffff',
    contactInputBorder: '#cbd5e1',
    contactInputTextColor: '#1e293b',
    contactButtonBackground: '#2563eb',
    contactButtonText: '#ffffff',
    contactButtonHoverBackground: '#1d4ed8',
};

export const defaultTypography: TypographyConfig = {
    // Fuentes globales
    headingFont: 'Inter, system-ui, sans-serif',
    bodyFont: 'Inter, system-ui, sans-serif',
    headingWeight: '700',
    bodyWeight: '400',

    // Hero
    heroTitleSize: '3rem',
    heroDescriptionSize: '1.125rem',

    // Características / Servicios
    featuresTitleSize: '2rem',
    featuresCardTitleSize: '1.5rem',
    featuresDescriptionSize: '1rem',

    // Sobre Nosotros
    aboutTitleSize: '2rem',
    aboutTextSize: '1rem',
    aboutStatsValueSize: '1.5rem',
    aboutStatsLabelSize: '0.875rem',
    aboutDifferentiatorSize: '1rem',

    // Testimonios
    testimonialsTitleSize: '2rem',
    testimonialsNameSize: '1.125rem',
    testimonialsRoleSize: '0.875rem',
    testimonialsTextSize: '1rem',

    // Contacto
    contactTitleSize: '2rem',
    contactTextSize: '1rem',
    contactLabelSize: '0.875rem',
    contactButtonSize: '1rem',
    contactCardTitleSize: '1.25rem',   // 👈 NUEVO

    // Footer
    footerHeadingSize: '1.125rem',
    footerTextSize: '0.875rem',
    footerLinkSize: '0.875rem',
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