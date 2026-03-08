import {
    Check,
    ChevronLeft,
    ChevronRight,
    Edit3,
    Image as ImageIcon,
    LogIn,
    Palette,
    RotateCcw,
    Save,
    Sparkles,
    Type
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';
import { ACCOUNTING_IMAGES, ACCOUNTING_TEXTS } from '../../data/accounting-texts';
import { CATERING_IMAGES, CATERING_TEXTS } from '../../data/catering-texts';
import { CONSULTING_IMAGES, CONSULTING_TEXTS } from '../../data/consulting-texts';
import { RESTAURANT_IMAGES, RESTAURANT_TEXTS } from '../../data/restaurant-texts';
import { colorPresets } from '../../types/template.types';
import LoginModal from './LoginModal';

interface EditorDashboardProps {
    onHomeClick?: () => void;
}

export const EditorDashboard: React.FC<EditorDashboardProps> = ({ onHomeClick }) => {
    const {
        template,
        updateColors,
        resetTemplate,
        hasUnsavedChanges,
        saveDraft,
        setEditorConfig,
        saveToBackend
    } = useTemplate();

    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const GUIDE_SEEN_KEY = 'template_guide_seen';

    const { config, toggleEditing } = useTemplateEditor();
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<'colors' | 'texts' | 'presets' | 'images'>('colors');
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
    const [showGuide, setShowGuide] = useState(() => {
        return !localStorage.getItem(GUIDE_SEEN_KEY);
    });
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveToAccount = async () => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }

        setIsSaving(true);
        try {
            await saveToBackend();
            setEditorConfig({
                notifications: {
                    show: true,
                    message: 'Template guardado en tu cuenta',
                    type: 'success'
                }
            });
        } catch (error) {
            setEditorConfig({
                notifications: {
                    show: true,
                    message: 'Error al guardar el template',
                    type: 'error'
                }
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleLoginRedirect = () => {
        // Guardar la URL actual para volver después del login
        sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
        navigate('/login');
    };

    // Obtener textos e imágenes según el tipo de template
    const getTemplateTexts = () => {
        switch (template?.type) {
            case 'consulting': return CONSULTING_TEXTS;
            case 'catering': return CATERING_TEXTS;
            case 'accounting': return ACCOUNTING_TEXTS;
            case 'restaurant': return RESTAURANT_TEXTS;
            default: return [];
        }
    };

    const getTemplateImages = () => {
        switch (template?.type) {
            case 'consulting': return CONSULTING_IMAGES;
            case 'catering': return CATERING_IMAGES;
            case 'accounting': return ACCOUNTING_IMAGES;
            case 'restaurant': return RESTAURANT_IMAGES;
            default: return [];
        }
    };

    const templateTexts = getTemplateTexts();
    const templateImages = getTemplateImages();

    // Agrupar por sección
    const textsBySection = templateTexts.reduce((acc, text) => {
        if (!acc[text.section]) {
            acc[text.section] = [];
        }
        acc[text.section].push(text);
        return acc;
    }, {} as Record<string, typeof templateTexts>);

    const imagesBySection = templateImages.reduce((acc, image) => {
        if (!acc[image.section]) {
            acc[image.section] = [];
        }
        acc[image.section].push(image);
        return acc;
    }, {} as Record<string, typeof templateImages>);

    useEffect(() => {
        if (template && showGuide) {
            localStorage.setItem(GUIDE_SEEN_KEY, 'true');
            const timer = setTimeout(() => setShowGuide(false), 10000);
            return () => clearTimeout(timer);
        }
    }, [template, showGuide]);

    if (!template) return null;

    const colors = template.colors;

    const handleColorChange = (colorType: string, value: string) => {
        if (/^#[0-9A-F]{6}$/i.test(value) || /^#[0-9A-F]{3}$/i.test(value)) {
            updateColors({ [colorType]: value });
        }
    };

    const handleHomeClick = () => {
        if (onHomeClick) {
            onHomeClick();
        } else {
            window.location.href = '/';
        }
    };

    const scrollToElement = (elementId: string) => {
        const element = document.getElementById(elementId) ||
            document.querySelector(`[data-element-id="${elementId}"]`);

        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            element.classList.add('ring-4', 'ring-blue-500', 'ring-opacity-50', 'transition-all', 'duration-300');
            setTimeout(() => {
                element.classList.remove('ring-4', 'ring-blue-500', 'ring-opacity-50');
            }, 2000);

            if (config.isEditing) {
                setTimeout(() => {
                    (element as HTMLElement).click();
                }, 500);
            }
        } else {
            console.log(`Elemento no encontrado: ${elementId}`);
            setEditorConfig({
                notifications: {
                    show: true,
                    message: `No se encontró el elemento: ${elementId}`,
                    type: 'warning'
                }
            });
        }
    };

    const getUniqueSections = (items: any[]) => {
        const sections = ['Todos', ...new Set(items.map(item => item.section))];
        return sections;
    };



    return (
        <>
            {/* Guía rápida modal (igual que antes) */}
            {showGuide && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
                    {/* ... contenido de la guía ... */}
                </div>
            )}

            {/* Botón para abrir/cerrar el dashboard */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
                title={isOpen ? 'Cerrar panel' : 'Abrir panel de personalización'}
            >
                {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>

            {/* Dashboard lateral */}
            <div className={`fixed left-0 top-0 h-full w-96 mt-14 bg-white dark:bg-neutral-900 shadow-2xl z-40 transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                {/* Header */}
                <div className="p-5 mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white flex-shrink-0">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold">Personalizar</h2>
                        <button
                            onClick={handleHomeClick}
                            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                            title="Volver al inicio"
                        >
                            🏠
                        </button>
                        {/* En el Header del dashboard, después del botón home */}
                        <div className="flex items-center space-x-2">
                            {isAuthenticated ? (
                                <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-1.5">
                                    <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center text-xs font-bold">
                                        {user?.email?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-xs truncate max-w-[100px]">
                                        {user?.email?.split('@')[0]}
                                    </span>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowLoginModal(true)}
                                    className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1.5 transition-colors text-xs"
                                >
                                    <LogIn className="w-3 h-3" />
                                    <span>Iniciar sesión</span>
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-xs opacity-90">
                            Modificá todos los elementos
                        </p>
                        {hasUnsavedChanges && (
                            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                Sin guardar
                            </span>
                        )}
                    </div>
                </div>

                {/* Tabs principales */}
                <div className="flex border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <TabButton
                        active={activeSection === 'colors'}
                        onClick={() => setActiveSection('colors')}
                        icon={<Palette className="w-3 h-3" />}
                        label="Colores"
                    />
                    <TabButton
                        active={activeSection === 'presets'}
                        onClick={() => setActiveSection('presets')}
                        icon={<Sparkles className="w-3 h-3" />}
                        label="Estilos"
                    />
                    <TabButton
                        active={activeSection === 'texts'}
                        onClick={() => setActiveSection('texts')}
                        icon={<Type className="w-3 h-3" />}
                        label="Textos"
                    />
                    <TabButton
                        active={activeSection === 'images'}
                        onClick={() => setActiveSection('images')}
                        icon={<ImageIcon className="w-3 h-3" />}
                        label="Imágenes"
                    />
                </div>

                {/* Contenido scrolleable */}
                <div className="flex-1 overflow-y-auto p-4">
                    {/* Sección de Colores (igual que antes) */}
                    {activeSection === 'colors' && (
                        <div className="space-y-4">
                            <InstructionBadge
                                icon={<Palette className="w-3 h-3" />}
                                text="Hacé clic en cada color para personalizar"
                                color="blue"
                            />

                            <ColorSection
                                title="Principal"
                                description="Botones y elementos destacados"
                                color={colors.primary}
                                onChange={(value) => handleColorChange('primary', value)}
                            />
                            <ColorSection
                                title="Secundario"
                                description="Fondos de apoyo"
                                color={colors.secondary}
                                onChange={(value) => handleColorChange('secondary', value)}
                            />
                            <ColorSection
                                title="Acento"
                                description="Detalles especiales"
                                color={colors.accent}
                                onChange={(value) => handleColorChange('accent', value)}
                            />
                            <ColorSection
                                title="Fondo"
                                description="Fondo de página"
                                color={colors.background}
                                onChange={(value) => handleColorChange('background', value)}
                            />
                            <ColorSection
                                title="Texto"
                                description="Textos principales"
                                color={colors.text}
                                onChange={(value) => handleColorChange('text', value)}
                            />
                        </div>
                    )}

                    {/* Sección de Presets (igual que antes) */}
                    {activeSection === 'presets' && (
                        <div className="space-y-3">
                            <InstructionBadge
                                icon={<Sparkles className="w-3 h-3" />}
                                text="Elegí un estilo predefinido"
                                color="purple"
                            />
                            {colorPresets[template.type as keyof typeof colorPresets]?.map((preset, index) => (
                                <PresetCard
                                    key={index}
                                    name={preset.name}
                                    colors={preset.colors}
                                    onApply={() => updateColors(preset.colors)}
                                />
                            ))}
                        </div>
                    )}

                    {/* Sección de Textos - AHORA USA LOS TEXTOS DEL TEMPLATE */}
                    {activeSection === 'texts' && (
                        <div className="space-y-4">
                            <InstructionBadge
                                icon={<Edit3 className="w-3 h-3" />}
                                text="Activá el modo edición y hacé clic en cualquier texto"
                                color="green"
                            />

                            {/* Botón de modo edición */}
                            <button
                                onClick={toggleEditing}
                                className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${config.isEditing
                                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 bg-gray-50 dark:bg-neutral-800'
                                    }`}
                            >
                                <div className="flex items-center">
                                    {config.isEditing ? (
                                        <Check className="w-5 h-5 text-green-500 mr-3" />
                                    ) : (
                                        <Edit3 className="w-5 h-5 text-gray-400 mr-3" />
                                    )}
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {config.isEditing ? 'Modo edición activado' : 'Activar modo edición'}
                                        </p>
                                    </div>
                                </div>
                                <div className={`w-2 h-2 rounded-full ${config.isEditing ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                            </button>

                            {/* Filtro por sección */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {getUniqueSections(templateTexts).map(section => (
                                    <button
                                        key={section}
                                        onClick={() => setSelectedCategory(section)}
                                        className={`px-3 py-1 text-xs rounded-full transition-colors ${selectedCategory === section
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neutral-600'
                                            }`}
                                    >
                                        {section}
                                    </button>
                                ))}
                            </div>

                            {/* Lista de textos por sección */}
                            <div className="space-y-6 mt-4">
                                {Object.entries(textsBySection)
                                    .filter(([section]) => selectedCategory === 'Todos' || section === selectedCategory)
                                    .map(([section, texts]) => (
                                        <div key={section}>
                                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                                {section} ({texts.length})
                                            </h4>
                                            <div className="space-y-1">
                                                {texts.map((text) => (
                                                    <TextGuide
                                                        key={text.id}
                                                        label={text.label}
                                                        element={text.id}
                                                        defaultText={text.default}
                                                        onClick={() => scrollToElement(text.id)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* Sección de Imágenes - AHORA USA LAS IMÁGENES DEL TEMPLATE */}
                    {activeSection === 'images' && (
                        <div className="space-y-4">
                            <InstructionBadge
                                icon={<ImageIcon className="w-3 h-3" />}
                                text="Hacé clic en cualquier imagen para cambiarla"
                                color="orange"
                            />

                            {/* Filtro por sección */}
                            <div className="flex flex-wrap gap-2">
                                {getUniqueSections(templateImages).map(section => (
                                    <button
                                        key={section}
                                        onClick={() => setSelectedCategory(section)}
                                        className={`px-3 py-1 text-xs rounded-full transition-colors ${selectedCategory === section
                                            ? 'bg-orange-600 text-white'
                                            : 'bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neutral-600'
                                            }`}
                                    >
                                        {section}
                                    </button>
                                ))}
                            </div>

                            {/* Lista de imágenes por sección */}
                            <div className="space-y-6 mt-4">
                                {Object.entries(imagesBySection)
                                    .filter(([section]) => selectedCategory === 'Todos' || section === selectedCategory)
                                    .map(([section, images]) => (
                                        <div key={section}>
                                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                                {section} ({images.length})
                                            </h4>
                                            <div className="space-y-2">
                                                {images.map((image) => (
                                                    <ImageGuide
                                                        key={image.id}
                                                        label={image.label}
                                                        element={image.id}
                                                        defaultImage={image.defaultImage}
                                                        onClick={() => scrollToElement(image.id)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                <p className="text-xs text-blue-700 dark:text-blue-300">
                                    💡 Podés subir tus propias imágenes o elegir de nuestra galería
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer con acciones */}
                {/* Footer con acciones - VERSIÓN ACTUALIZADA */}
                <div className="p-4 bg-gray-50 dark:bg-neutral-800 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div className="space-y-2">
                        {/* Botón para guardar en cuenta */}
                        <button
                            onClick={handleSaveToAccount}
                            disabled={isSaving}
                            className={`w-full px-4 py-3 rounded-lg transition-all flex items-center justify-center ${isAuthenticated
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-amber-600 hover:bg-amber-700 text-white'
                                }`}
                        >
                            {isSaving ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Guardando...
                                </span>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    {isAuthenticated ? 'Guardar en mi cuenta' : 'Guardar template (requiere login)'}
                                </>
                            )}
                        </button>

                        {/* Mensaje informativo si no está logueado */}
                        {!isAuthenticated && !isSaving && (
                            <p className="text-xs text-amber-600 dark:text-amber-400 text-center">
                                💡 Creá una cuenta gratis para guardar tus templates
                            </p>
                        )}

                        {/* Botones existentes */}
                        <div className="flex space-x-2 pt-2">
                            <button
                                onClick={saveDraft}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center justify-center text-sm"
                            >
                                <Save className="w-3 h-3 mr-1" />
                                Guardar borrador
                            </button>
                            <button
                                onClick={() => resetTemplate(template.type)}
                                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center justify-center text-sm"
                                title="Volver a los colores originales"
                            >
                                <RotateCcw className="w-3 h-3 mr-1" />
                                Restaurar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de login */}
            {/* // En el return, antes del cierre del fragment */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                message="Para guardar este template en tu cuenta y poder acceder a él desde cualquier 
                dispositivo, necesitas iniciar sesión o registrarte."
            />
        </>
    );
};

// Componentes auxiliares (actualizados)
const InstructionBadge: React.FC<{ icon: React.ReactNode; text: string; color: string }> =
    ({ icon, text, color }) => (
        <div className={`bg-${color}-50 dark:bg-${color}-900/30 p-3 rounded-lg`}>
            <p className={`text-xs text-${color}-700 dark:text-${color}-300 flex items-start`}>
                <span className="mr-2 flex-shrink-0">{icon}</span>
                {text}
            </p>
        </div>
    );

const ColorSection: React.FC<{
    title: string;
    description: string;
    color: string;
    onChange: (value: string) => void;
}> = ({ title, description, color, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-3 flex items-center justify-between bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
            >
                <div className="flex items-center">
                    <div
                        className="w-6 h-6 rounded mr-2 border border-gray-300"
                        style={{ backgroundColor: color }}
                    />
                    <div className="text-left">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h3>
                        <p className="text-xs text-gray-500">{description}</p>
                    </div>
                </div>
                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            </button>

            {isOpen && (
                <div className="p-3 bg-white dark:bg-neutral-900">
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full h-8 rounded cursor-pointer"
                    />
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full mt-2 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md font-mono"
                        placeholder="#000000"
                    />
                    <div className="mt-2 p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                        <div className="flex space-x-2">
                            <button
                                className="px-2 py-1 rounded text-xs"
                                style={{
                                    backgroundColor: color,
                                    color: getContrastColor(color)
                                }}
                            >
                                Botón
                            </button>
                            <span className="text-xs" style={{ color }}>
                                Texto
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );


};

const PresetCard: React.FC<{
    name: string;
    colors: any;
    onApply: () => void;
}> = ({ name, colors, onApply }) => (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:shadow-md transition-all">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{name}</h4>
        <div className="flex space-x-1 mb-2">
            {Object.values(colors).map((color: any, i) => (
                <div
                    key={i}
                    className="w-5 h-5 rounded-full border border-gray-300"
                    style={{ backgroundColor: color as string }}
                    title={color as string}
                />
            ))}
        </div>
        <button
            onClick={onApply}
            className="w-full px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs transition-colors"
        >
            Aplicar
        </button>
    </div>
);

const TextGuide: React.FC<{ label: string; element: string; defaultText?: string; onClick: () => void }> =
    ({ label, element, defaultText, onClick }) => (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg text-xs hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors group"
            title={`Click para ir al texto: ${label}`}
        >
            <div className="flex-1 text-left">
                <span className="text-gray-700 dark:text-gray-300 block">{label}</span>
                {defaultText && (
                    <span className="text-gray-400 text-xxs block truncate max-w-[200px]">
                        "{defaultText.substring(0, 30)}..."
                    </span>
                )}
            </div>
            <span className="text-gray-400 group-hover:text-blue-500 transition-colors font-mono text-xxs ml-2">
                {element}
            </span>
        </button>
    );

const ImageGuide: React.FC<{ label: string; element: string; defaultImage?: string; onClick: () => void }> =
    ({ label, element, defaultImage, onClick }) => (
        <button
            onClick={onClick}
            className="w-full flex items-center p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg text-xs hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors group"
            title={`Click para ir a la imagen: ${label}`}
        >
            {defaultImage && (
                <div className="w-8 h-8 rounded mr-2 overflow-hidden flex-shrink-0 bg-gray-200">
                    <img src={defaultImage} alt={label} className="w-full h-full object-cover" />
                </div>
            )}
            <div className="flex-1 flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">{label}</span>
                <span className="text-gray-400 group-hover:text-orange-500 transition-colors font-mono text-xxs">
                    {element}
                </span>
            </div>
        </button>


    );

const TabButton: React.FC<{
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
}> = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex-1 px-2 py-2 text-xs font-medium transition-colors flex items-center justify-center space-x-1 ${active
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
    >
        {icon}
        <span>{label}</span>
    </button>
);

function getContrastColor(hexcolor: string): string {
    const r = parseInt(hexcolor.slice(1, 3), 16);
    const g = parseInt(hexcolor.slice(3, 5), 16);
    const b = parseInt(hexcolor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
}

export default EditorDashboard;