// src/layouts/OwnTemplateLayout.tsx
import { ArrowRight, CheckCircle, Clock, Edit3, Package, Sparkles, Type } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef } from 'react'; // 👈 NUEVO: useLayoutEffect, useRef
import { defaultTypography } from '../types/template.types'; // 👈 NUEVO
import { UserHeader } from './UserHeader';

interface OwnTemplateLayoutProps {
    userTemplate: any;
    onEdit: () => void;
    onViewMyTemplates: () => void;
    onExploreGallery: () => void;
    onLogout: () => void;
    onLogin: () => void;
    isAuthenticated: boolean;
    user: any;
}

export const OwnTemplateLayout = ({
    userTemplate,
    onEdit,
    onViewMyTemplates,
    onExploreGallery
}: OwnTemplateLayoutProps) => {

    // 👇 NUEVO: tipografía con fallback
    const typography = userTemplate?.typography || defaultTypography;
    const templateRootRef = useRef<HTMLDivElement>(null);

    // 👇 NUEVO: aplicar variables CSS al contenedor
    useLayoutEffect(() => {
        if (templateRootRef.current) {
            templateRootRef.current.style.setProperty('--font-heading', typography.headingFont);
            templateRootRef.current.style.setProperty('--font-body', typography.bodyFont);
        }
    }, [typography]);

    const getSectionColor = (key: string, fallbackKey: string = 'primary') => {
        const sectionColor = userTemplate?.sectionColors?.[key];
        if (sectionColor) return sectionColor;
        const globalColor = userTemplate?.colors?.[fallbackKey];
        return globalColor || (fallbackKey === 'primary' ? '#2563eb' : '#ffffff');
    };

    // Logs para depuración
    useEffect(() => {
        console.log('🎨 OwnTemplateLayout - userTemplate actualizado:', userTemplate);
        console.log('🎨 colors (globales):', userTemplate?.colors);
        console.log('🎨 sectionColors (personalizados):', userTemplate?.sectionColors);
    }, [userTemplate]);

    // 👇 NUEVO: envolver todo el contenido con el div #template-root
    return (
        <div ref={templateRootRef}
            id="template-root"
            className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900"
            style={{
                fontFamily: typography.bodyFont,      // Fuente para todo el texto
            }}
        >
            <UserHeader />
            {/* Previsualización */}
            <div className="container-custom px-4 pt-32 pb-16 ">
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
                    <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
                        <h2 className="text-2xl font-bold mb-2">Previsualización de tu plantilla</h2>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Así se verá tu sitio web con los colores y textos que seleccionaste
                        </p>
                        <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 flex flex-wrap justify-center gap-4">
                            <button
                                onClick={onEdit}
                                className="btn-primary px-8 py-3 flex items-center gap-2"
                            >
                                <Edit3 className="w-5 h-5" />
                                Seguir editando
                            </button>
                            <button
                                onClick={onViewMyTemplates}
                                className="btn-secondary px-8 py-3 flex items-center gap-2"
                            >
                                <Package className="w-5 h-5" />
                                Ver mis plantillas
                            </button>
                        </div>
                    </div>

                    <div className="text-center px-4">
                        <p className="text-neutral-600 mt-10 dark:text-neutral-400 max-w-2xl mx-auto text-md mb-4">
                            ¡Excelente elección! Hemos guardado tu plantilla con todas tus personalizaciones.
                        </p>

                        {/* Información de tiempos */}
                        <div className="flex flex-wrap justify-center gap-6 mt-8">
                            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-lg border border-neutral-200 dark:border-neutral-700 min-w-[200px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <Clock className="w-6 h-6 text-blue-500" />
                                    <span className="font-semibold text-lg">Tiempo de revisión</span>
                                </div>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">24-48 horas</p>
                                <p className="text-sm text-neutral-500 mt-1">Nuestro equipo revisará tus cambios</p>
                            </div>

                            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-lg border border-neutral-200 dark:border-neutral-700 min-w-[200px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                    <span className="font-semibold text-lg">Correcciones</span>
                                </div>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">2-3 días hábiles</p>
                                <p className="text-sm text-neutral-500 mt-1">Tiempo estimado de implementación</p>
                            </div>

                            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-lg border border-neutral-200 dark:border-neutral-700 min-w-[200px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <Edit3 className="w-6 h-6 text-purple-500" />
                                    <span className="font-semibold text-lg">Estado</span>
                                </div>
                                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">En revisión</p>
                                <p className="text-sm text-neutral-500 mt-1">Te notificaremos cuando esté listo</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-6">
                            {/* Contenedor principal con los colores del template */}
                            <div
                                className="p-8 rounded-xl transition-all"
                                style={{
                                    backgroundColor: getSectionColor('bodyBackground', 'background'),
                                    color: getSectionColor('bodyTextColor', 'text')
                                }}
                            >
                                <div className="text-center mb-8">
                                    <div
                                        className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                                        style={{
                                            backgroundColor: `${getSectionColor('heroBadgeBackground', 'primary')}20`,
                                            color: getSectionColor('heroBadgeBackground', 'primary')
                                        }}
                                    >
                                        Tu sitio personalizado
                                    </div>
                                    <h1
                                        className="text-4xl font-bold mb-4"
                                        style={{ color: getSectionColor('heroTitleColor', 'primary') }}
                                    >
                                        {userTemplate?.name || 'Mi sitio web'}
                                    </h1>
                                    <p className="text-lg max-w-2xl mx-auto" style={{ color: getSectionColor('heroDescriptionColor', 'text') }}>
                                        Sitio web diseñado especialmente para ti con los colores y estilo que elegiste.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                                    <div
                                        className="p-6 rounded-xl text-center"
                                        style={{ backgroundColor: `${getSectionColor('featuresCardBackground', 'secondary')}10` }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                                            style={{ backgroundColor: getSectionColor('buttonPrimaryBackground', 'primary') }}
                                        >
                                            <Sparkles className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2" style={{ color: getSectionColor('featuresTitleColor', 'text') }}>
                                            Diseño personalizado
                                        </h3>
                                        <p className="text-sm opacity-80" style={{ color: getSectionColor('featuresTitleColor', 'text') }}>
                                            Con los colores que seleccionaste
                                        </p>
                                    </div>

                                    <div
                                        className="p-6 rounded-xl text-center"
                                        style={{ backgroundColor: `${getSectionColor('featuresCardBorder', 'secondary')}10` }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                                            style={{ backgroundColor: getSectionColor('buttonSecondaryBackground', 'secondary') }}
                                        >
                                            <Type className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2" style={{ color: getSectionColor('featuresTitleColor', 'text') }}>
                                            Textos personalizados
                                        </h3>
                                        <p className="text-sm opacity-80" style={{ color: getSectionColor('featuresTitleColor', 'text') }}>
                                            Adaptados a tu negocio
                                        </p>
                                    </div>

                                    <div
                                        className="p-6 rounded-xl text-center"
                                        style={{ backgroundColor: `${getSectionColor('headerCtaBackground', 'accent')}10` }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                                            style={{ backgroundColor: getSectionColor('headerCtaBackground', 'accent') }}
                                        >
                                            <CheckCircle className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2" style={{ color: getSectionColor('featuresTitleColor', 'text') }}>
                                            Listo para publicar
                                        </h3>
                                        <p className="text-sm opacity-80" style={{ color: getSectionColor('featuresTitleColor', 'text') }}>
                                            Revisión en curso
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="gradient-bg rounded-3xl mx-4 sm:mx-6 lg:mx-auto container-custom mb-16 p-6 md:p-8 text-center">
                <h3 className="heading-3 text-gradient mb-4">¿Quieres explorar más plantillas?</h3>
                <p className="text-neutral-600 dark:text-primary-400 max-w-2xl mx-auto mb-6">
                    Visualiza nuestras plantillas profesionales y encuentra inspiración para tu próximo proyecto.
                </p>
                <button
                    onClick={onExploreGallery}
                    className="btn-primary inline-flex items-center gap-2 group"
                >
                    <Sparkles className="w-5 h-5" />
                    Explorar plantillas
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};