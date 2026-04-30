import {
  AlertCircle,
  Award,
  BarChart,
  Briefcase,
  Building,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Globe,
  Heart,
  Home,
  Image,
  Info,
  Layout,
  LineChart,
  Link,
  Link2,
  LogOut,
  type LucideIcon,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Palette,
  Phone,
  Save,
  Share2,
  Smile,
  Sparkles,
  Star,
  Target,
  ThumbsUp,
  TrendingUp,
  Type,
  User,
  Users,
  Zap
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';
import { useTutorial } from '../../hooks/useTutorial';
import { colorPresets, defaultSectionColors, defaultTypography } from '../../types/template.types';
import { ComboboxInput } from './ComboboxInput';
import { CompactColorInput } from './CompactColorInput';
import { SectionAccordion } from './SectionAccordion';
import { SelectInput } from './SelectInput';
import TutorialOverlay from './TutorialOverlay';

type EditorTab = 'visual' | 'presets'/* | 'texts'*/;

interface EditorDashboardProps {
  onHomeClick?: () => void;
  userLoggedIn?: boolean;
}

// --- Componentes auxiliares ---
const SizeInput = ({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (size: string) => void;
  options: string[];
}) => (
  <div className="space-y-1 mb-2">
    <label className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-2 py-1 text-xs border rounded-lg"
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
  <div className="space-y-1 mb-2">
    <label className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-2 py-1 text-xs border rounded-lg"
    />
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
    <div className="space-y-1 mb-2">
      <label className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2 py-1 text-xs border rounded-lg"
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

// const BorderRadiusSelect = ({ label, value, onChange }: {
//   label: string;
//   value: string;
//   onChange: (radius: string) => void;
// }) => {
//   const radii = [
//     { value: '0.25rem', label: 'Pequeño (4px)' },
//     { value: '0.5rem', label: 'Mediano (8px)' },
//     { value: '0.75rem', label: 'Grande (12px)' },
//     { value: '1rem', label: 'Extra grande (16px)' },
//     { value: '9999px', label: 'Completamente redondo' },
//   ];

//   return (
//     <div className="space-y-1 mb-2">
//       <label className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300">{label}</label>
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full px-2 py-1 text-xs border rounded-lg"
//       >
//         {radii.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
//       </select>
//       <div
//         className="h-8 w-full bg-gradient-to-r from-blue-500 to-purple-500 mt-1 rounded"
//         style={{ borderRadius: value }}
//       />
//     </div>
//   );
// };

// const ShadowSelect = ({ label, value, onChange }: {
//   label: string;
//   value: string;
//   onChange: (shadow: string) => void;
// }) => {
//   const shadows = [
//     { value: 'none', label: 'Sin sombra' },
//     { value: '0 1px 2px 0 rgb(0 0 0 / 0.05)', label: 'Sutil' },
//     { value: '0 4px 6px -1px rgb(0 0 0 / 0.1)', label: 'Mediana' },
//     { value: '0 10px 15px -3px rgb(0 0 0 / 0.1)', label: 'Fuerte' },
//     { value: '0 20px 25px -5px rgb(0 0 0 / 0.1)', label: 'Extra fuerte' },
//   ];

//   return (
//     <div className="space-y-1 mb-2">
//       <label className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300">{label}</label>
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full px-2 py-1 text-xs border rounded-lg"
//       >
//         {shadows.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
//       </select>
//       <div
//         className="h-8 w-full bg-white dark:bg-neutral-800 rounded flex items-center justify-center text-[9px]"
//         style={{ boxShadow: value }}
//       >
//         Vista previa
//       </div>
//     </div>
//   );
// };

// Componente para seleccionar iconos (usado en Hero)
const IconSelect = ({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; icon: LucideIcon }[];
}) => {
  const SelectedIcon = options.find(opt => opt.value === value)?.icon || options[0].icon;
  return (
    <div className="space-y-1 mb-2">
      <label className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300">{label}</label>
      <div className="flex items-center gap-2">
        <div className="p-1 border rounded bg-neutral-100 dark:bg-neutral-800">
          <SelectedIcon className="w-4 h-4" />
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1 text-xs border rounded-lg"
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
// --- Fin componentes auxiliares ---

const EditorDashboard: React.FC<EditorDashboardProps> = ({
  onHomeClick,
  userLoggedIn = false,
}) => {
  const {
    template,
    resetTemplate,
    hasUnsavedChanges,
    undo,
    redo,
    canUndo,
    canRedo,
    applyPreset,
    saveToBackend,
    setEditorConfig,
    updateSectionColors,
    updateTypography,
    // updateUI,
    updateButtons,
    updateText,
    // updateImage,
  } = useTemplate();

  const { config, toggleEditing } = useTemplateEditor();
  const [activeTab, setActiveTab] = useState<EditorTab>('visual');
  const [isSaving, setIsSaving] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  // --- Ancho redimensionable ---
  const MIN_WIDTH = 240;
  const MAX_WIDTH = 400;
  const DEFAULT_WIDTH = 280;

  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('editorSidebarWidth');
    if (saved) {
      const w = parseInt(saved, 10);
      if (!isNaN(w) && w >= MIN_WIDTH && w <= MAX_WIDTH) {
        setSidebarWidth(w);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('editorSidebarWidth', sidebarWidth.toString());
  }, [sidebarWidth]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !sidebarRef.current) return;
      const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
      const clamped = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, newWidth));
      setSidebarWidth(clamped);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const tutorial = useTutorial();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveToBackend();
      setEditorConfig({
        notifications: {
          show: true,
          message: 'Cambios guardados exitosamente',
          type: 'success'
        }
      });
    } catch (error) {
      setEditorConfig({
        notifications: {
          show: true,
          message: 'Error al guardar cambios',
          type: 'error'
        }
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFinishEditing = async () => {
    if (hasUnsavedChanges) {
      await handleSave();
    }
    if (onHomeClick) {
      onHomeClick();
    }
  };

  const handleSaveToAccount = async () => {
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
          message: 'Error al guardar',
          type: 'error'
        }
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Valores por defecto con fusión
  const sectionColors = {
    ...defaultSectionColors,
    ...(template?.sectionColors || {}),
  };
  const typography = template?.typography || defaultTypography;
  // const ui = template?.ui || defaultUI;

  // Inicialización segura de botones
  const defaultButtonsStructure = {
    primary: { text: 'Solicitar consultoría', url: '/contacto', openInNewTab: false },
    secondary: { text: 'Conocer metodología', url: '#metodologia', openInNewTab: false },
  };
  const buttons = {
    primary: template?.buttons?.primary || defaultButtonsStructure.primary,
    secondary: template?.buttons?.secondary || defaultButtonsStructure.secondary,
  };

  // Opciones para enlaces de botones (anclas comunes)
  const linkOptions = [
    { value: '#home', label: 'Inicio (#home)' },
    { value: '#services', label: 'Servicios (#services)' },
    { value: '#methodology', label: 'Metodología (#methodology)' },
    { value: '#testimonials', label: 'Testimonios (#testimonials)' },
    { value: '#contact', label: 'Contacto (#contact)' },
  ];

  // Datos de los enlaces de navegación (se obtienen de template.texts o valores por defecto)
  const navLinks = [
    { id: 'nav_home', label: 'Inicio', defaultText: 'Inicio', defaultUrl: '#home' },
    { id: 'nav_services', label: 'Servicios', defaultText: 'Servicios', defaultUrl: '#services' },
    { id: 'nav_methodology', label: 'Metodología', defaultText: 'Metodología', defaultUrl: '#methodology' },
    { id: 'nav_testimonials', label: 'Casos de éxito', defaultText: 'Casos de éxito', defaultUrl: '#testimonials' },
    { id: 'nav_contact', label: 'Contacto', defaultText: 'Contacto', defaultUrl: '#contact' },
  ];

  // Opciones de iconos para las tarjetas del Hero
  const iconOptions = [
    { value: 'TrendingUp', label: 'Tendencia al alza', icon: TrendingUp },
    { value: 'Users', label: 'Usuarios', icon: Users },
    { value: 'Target', label: 'Objetivo', icon: Target },
    { value: 'Award', label: 'Premio', icon: Award },
    { value: 'Briefcase', label: 'Maletín', icon: Briefcase },
    { value: 'BarChart', label: 'Gráfico', icon: BarChart },
    { value: 'LineChart', label: 'Línea de tiempo', icon: LineChart },
    { value: 'Globe', label: 'Global', icon: Globe },
  ];

  // Función para disparar la selección de imagen del Hero
  const handleHeroImageClick = () => {
    window.dispatchEvent(new CustomEvent('openImageSelector', {
      detail: { elementId: 'hero_image' }
    }));
  };

  return (
    <>
      {/* Tutorial Overlay */}
      {tutorial.showTutorial && tutorial.currentStepData && (
        <TutorialOverlay
          targetElementId={tutorial.currentStepData.targetElement}
          step={tutorial.currentStep}
          onNext={tutorial.nextStep}
          onPrevious={tutorial.previousStep}
          onSkip={tutorial.skipTutorial}
          onClose={tutorial.skipTutorial}
          title={tutorial.currentStepData.title}
          description={tutorial.currentStepData.description}
          position={tutorial.currentStepData.position}
          showSkip={tutorial.currentStepData.showSkip}
          totalSteps={tutorial.totalSteps}
          currentStep={tutorial.currentStep}
        />
      )}

      {/* Notificaciones */}
      {config.notifications && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[60] animate-slideDown">
          <div className={`
            flex items-center space-x-2 px-4 py-2.5 rounded-lg shadow-lg text-sm
            ${config.notifications.type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : ''}
            ${config.notifications.type === 'error' ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white' : ''}
            ${config.notifications.type === 'warning' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white' : ''}
            ${config.notifications.type === 'info' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : ''}
          `}>
            {config.notifications.type === 'success' && <Check className="w-4 h-4" />}
            {config.notifications.type === 'error' && <AlertCircle className="w-4 h-4" />}
            {config.notifications.type === 'warning' && <AlertCircle className="w-4 h-4" />}
            {config.notifications.type === 'info' && <Info className="w-4 h-4" />}
            <span>{config.notifications.message}</span>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        id="editor-sidebar"
        className="bg-white dark:bg-neutral-900 shadow-2xl border-r border-neutral-200 dark:border-neutral-800 z-40 flex flex-col sticky top-0 h-screen"
        style={{ width: `${sidebarWidth}px` }}
      >
        <div
          className="absolute right-0 top-0 w-1 h-full cursor-ew-resize bg-transparent hover:bg-blue-500 transition-colors z-50"
          onMouseDown={handleMouseDown}
        />

        {/* Botón modo edición y ayuda */}
        <div id="edit-mode-button" className="p-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex gap-2">
            <button
              onClick={toggleEditing}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2
                ${config.isEditing
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white ring-2 ring-green-300'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}
            >
              <Eye className="w-3.5 h-3.5" />
              {config.isEditing ? "✓ Modo edición activo" : "Activar modo edición"}
            </button>

            <button
              onClick={tutorial.startTutorial}
              className="px-2 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-medium transition-all hover:bg-blue-200 dark:hover:bg-blue-800/30 flex items-center gap-1"
              title="Ver tutorial otra vez"
            >
              <Info className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ayuda</span>
            </button>
          </div>
          {config.isEditing && (
            <p className="text-[10px] text-green-600 dark:text-green-400 text-center mt-1.5">
              ✨ Ahora podés hacer doble clic en cualquier texto para editarlo
            </p>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800">
          <button
            id="visual-tab"
            onClick={() => setActiveTab('visual')}
            className={`flex-1 py-2 text-[11px] font-medium transition-all flex items-center justify-center gap-1.5
              ${activeTab === 'visual'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
          >
            <Palette className="w-3 h-3" />
            Diseño visual
          </button>
          <button
            id="presets-tab"
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-2 text-[11px] font-medium transition-all flex items-center justify-center gap-1.5
              ${activeTab === 'presets'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
          >
            <Sparkles className="w-3 h-3" />
            Presets
          </button>
          <button
            onClick={() => {
              const previewUrl = window.location.href.split('?')[0] + '?preview=true';
              window.open(previewUrl, '_blank');
            }}
            className="px-2 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg text-xs font-medium transition-all hover:bg-purple-200 dark:hover:bg-purple-800/30 flex items-center gap-1"
            title="Abrir vista previa en nueva pestaña"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Vista previa</span>
          </button>
          {/* <button
            id="texts-tab"
            onClick={() => setActiveTab('texts')}
            className={`flex-1 py-2 text-[11px] font-medium transition-all flex items-center justify-center gap-1.5
              ${activeTab === 'texts'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
          >
            <Edit3 className="w-3 h-3" />
            Textos
          </button> */}
        </div>

        {/* Contenido scrollable */}
        <div className="flex-1 overflow-y-auto p-3 min-h-0">
          {activeTab === 'visual' && template && (
            <div className="space-y-2">
              {/* ========== 1. HEADER / NAVEGACIÓN (reorganizado en subsecciones) ========== */}
              <SectionAccordion
                scrollToId='home'
                title="Header"
                icon={Layout}
                tooltipText="Personaliza la barra superior: colores, enlaces y botón CTA"
              >

                {/* Subsección: Logo */}
                <SectionAccordion
                  title="Logo"
                  icon={Image}
                  tooltipText="Personaliza la imagen, textos, colores y tamaño del logo"
                >
                  <div className="space-y-3">
                    <p className="text-[10px] text-neutral-500">Imagen del logo:</p>
                    <button
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('openImageSelector', {
                          detail: { elementId: 'header_logo' }
                        }));
                      }}
                      className="w-full py-2 px-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-medium hover:bg-neutral-200 transition-colors"
                    >
                      Seleccionar imagen del logo
                    </button>
                    <TextInput
                      label="Texto parte 1 (KE)"
                      value={template?.texts?.header_brand_1 || 'KE'}
                      onChange={(t) => updateText('header_brand_1', t)}
                    />
                    <TextInput
                      label="Texto parte 2 (Consulting)"
                      value={template?.texts?.header_brand_2 || 'Consulting'}
                      onChange={(t) => updateText('header_brand_2', t)}
                    />
                    <CompactColorInput
                      label="Color del texto 1 (KE)"
                      value={sectionColors.logoTextColor1}
                      onChange={(c) => updateSectionColors({ logoTextColor1: c })}
                      defaultValue={defaultSectionColors.logoTextColor1}
                      inputId="logo-text-color1"
                    />
                    <CompactColorInput
                      label="Color del texto 2 (Consulting)"
                      value={sectionColors.logoTextColor2}
                      onChange={(c) => updateSectionColors({ logoTextColor2: c })}
                      defaultValue={defaultSectionColors.logoTextColor2}
                      inputId="logo-text-color2"
                    />
                    <SelectInput
                      label="Tamaño del texto"
                      value={sectionColors.logoTextSize}
                      onChange={(val) => updateSectionColors({ logoTextSize: val })}
                      options={[
                        { value: 'text-lg', label: 'Pequeño (18px)' },
                        { value: 'text-xl', label: 'Mediano (20px)' },
                        { value: 'text-2xl', label: 'Grande (24px)' },
                        { value: 'text-3xl', label: 'Extra grande (30px)' },
                      ]}
                    />
                  </div>
                </SectionAccordion>

                {/* Subsección: Colores del Header */}
                <SectionAccordion
                  title="Colores del Header"
                  icon={Palette}
                  tooltipText="Colores de fondo, texto y enlaces de la barra de navegación"
                >
                  <div className="space-y-3">
                    <CompactColorInput
                      label="Fondo del header"
                      value={sectionColors.headerBackground}
                      onChange={(c) => updateSectionColors({ headerBackground: c })}
                      defaultValue={defaultSectionColors.headerBackground}
                    />
                    <CompactColorInput
                      label="Color del texto"
                      value={sectionColors.headerTextColor}
                      onChange={(c) => updateSectionColors({ headerTextColor: c })}
                      defaultValue={defaultSectionColors.headerTextColor}
                    />
                    <CompactColorInput
                      label="Color de los enlaces"
                      value={sectionColors.headerLinkColor}
                      onChange={(c) => updateSectionColors({ headerLinkColor: c })}
                      defaultValue={defaultSectionColors.headerLinkColor}
                    />
                    <CompactColorInput
                      label="Color de enlaces al pasar mouse"
                      value={sectionColors.headerLinkHoverColor}
                      onChange={(c) => updateSectionColors({ headerLinkHoverColor: c })}
                      defaultValue={defaultSectionColors.headerLinkHoverColor}
                    />
                  </div>
                </SectionAccordion>

                {/* Subsección: Enlaces de navegación */}
                <SectionAccordion
                  title="Enlaces de navegación"
                  icon={Link}
                  tooltipText="Textos y destinos de los enlaces del menú"
                >
                  <div className="space-y-3">
                    {navLinks.map((link) => (
                      <div key={link.id} className="mb-3 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-medium text-neutral-500">{link.label}</span>
                        </div>
                        <TextInput
                          label="Texto"
                          value={template?.texts?.[link.id] || link.defaultText}
                          onChange={(t) => updateText(link.id, t)}
                        />
                        <ComboboxInput
                          label="Destino (enlace)"
                          value={template?.texts?.[`${link.id}_url`] || link.defaultUrl}
                          onChange={(u) => updateText(`${link.id}_url`, u)}
                          options={linkOptions}
                          placeholder="#seccion"
                        />
                      </div>
                    ))}
                  </div>
                </SectionAccordion>

                {/* Subsección: Botón CTA del header */}
                <SectionAccordion
                  title="Botón CTA del header"
                  icon={Link2}
                  tooltipText="Texto, enlace y colores del botón de llamada a la acción"
                >
                  <div className="space-y-3">
                    <TextInput
                      label="Texto del botón"
                      value={template?.texts?.header_cta || 'Consultoría gratuita'}
                      onChange={(t) => updateText('header_cta', t)}
                    />
                    <ComboboxInput
                      label="Enlace"
                      value={template?.texts?.header_cta_url || '#contact'}
                      onChange={(u) => updateText('header_cta_url', u)}
                      options={linkOptions}
                      placeholder="/ruta o https://..."
                    />
                    <CompactColorInput
                      label="Color de fondo"
                      value={sectionColors.headerCtaBackground}
                      onChange={(c) => updateSectionColors({ headerCtaBackground: c })}
                      defaultValue={defaultSectionColors.headerCtaBackground}
                      inputId="header-cta-background"
                    />
                    <CompactColorInput
                      label="Color del texto"
                      value={sectionColors.headerCtaText}
                      onChange={(c) => updateSectionColors({ headerCtaText: c })}
                      defaultValue={defaultSectionColors.headerCtaText}
                      inputId="header-cta-text"
                    />
                    <CompactColorInput
                      label="Color al pasar el mouse"
                      value={sectionColors.headerCtaHoverBackground}
                      onChange={(c) => updateSectionColors({ headerCtaHoverBackground: c })}
                      defaultValue={defaultSectionColors.headerCtaHoverBackground}
                      inputId="header-cta-hover"
                    />
                  </div>
                </SectionAccordion>
              </SectionAccordion>

              {/* ========== 2. HERO (con subsecciones) ========== */}
              <SectionAccordion
                scrollToId='home'
                title="Hero (Sección principal)"
                icon={Eye}
                tooltipText="Personaliza todos los aspectos del Hero: imágenes, textos, iconos, colores y botones"
              >
                <div className="space-y-3">
                  {/* Subsección: Imágenes */}
                  <SectionAccordion
                    title="Imágenes"
                    icon={Image}
                    tooltipText="Cambia la imagen principal del Hero"
                  >
                    <div className="space-y-2">
                      <p className="text-[10px] text-neutral-500">Imagen principal:</p>
                      <button
                        onClick={handleHeroImageClick}
                        className="w-full py-2 px-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-medium hover:bg-neutral-200 transition-colors"
                      >
                        Seleccionar imagen
                      </button>
                      <p className="text-[9px] text-neutral-400">Haz clic para subir una imagen o elegir de la galería.</p>
                    </div>
                  </SectionAccordion>

                  {/* Subsección: Textos */}
                  <SectionAccordion
                    title="Textos"
                    icon={Type}
                    tooltipText="Edita todos los textos del Hero"
                  >
                    <div className="space-y-2">
                      <TextInput
                        label="Badge"
                        value={template?.texts?.hero_badge || 'Consultoría Estratégica de Negocios'}
                        onChange={(t) => updateText('hero_badge', t)}
                      />
                      <TextInput
                        label="Título (parte 1)"
                        value={template?.texts?.hero_title_1 || 'Impulsamos el'}
                        onChange={(t) => updateText('hero_title_1', t)}
                      />
                      <TextInput
                        label="Título (parte 2)"
                        value={template?.texts?.hero_title_2 || 'Crecimiento Sostenible'}
                        onChange={(t) => updateText('hero_title_2', t)}
                      />
                      <TextInput
                        label="Título (parte 3)"
                        value={template?.texts?.hero_title_3 || 'de tu Empresa'}
                        onChange={(t) => updateText('hero_title_3', t)}
                      />
                      <TextInput
                        label="Descripción"
                        value={template?.texts?.hero_description || 'Análisis profundo, estrategias personalizadas y acompañamiento continuo para llevar tu negocio al siguiente nivel.'}
                        onChange={(t) => updateText('hero_description', t)}
                      />
                    </div>
                  </SectionAccordion>

                  {/* Subsección: Iconos decorativos */}
                  <SectionAccordion
                    title="Iconos decorativos"
                    icon={Smile}
                    tooltipText="Cambia los iconos, su color, tamaño, los valores numéricos y sus colores"
                  >
                    <div className="space-y-3">
                      {/* Selectores de iconos */}
                      <IconSelect
                        label="Icono 1 (crecimiento)"
                        value={template?.texts?.hero_icon_1 || 'TrendingUp'}
                        onChange={(val) => updateText('hero_icon_1', val)}
                        options={iconOptions}
                      />
                      <IconSelect
                        label="Icono 2 (equipos)"
                        value={template?.texts?.hero_icon_2 || 'Users'}
                        onChange={(val) => updateText('hero_icon_2', val)}
                        options={iconOptions}
                      />
                      <IconSelect
                        label="Icono 3 (objetivos)"
                        value={template?.texts?.hero_icon_3 || 'Target'}
                        onChange={(val) => updateText('hero_icon_3', val)}
                        options={iconOptions}
                      />

                      {/* Color y tamaño de los iconos */}
                      <CompactColorInput
                        label="Color iconos"
                        value={sectionColors.iconColor}
                        onChange={(c) => updateSectionColors({ iconColor: c })}
                        defaultValue={defaultSectionColors.iconColor}
                      />
                      <SelectInput
                        label="Tamaño iconos"
                        value={sectionColors.iconSize}
                        onChange={(val) => updateSectionColors({ iconSize: val })}
                        options={[
                          { value: 'w-4 h-4', label: 'Pequeño (16px)' },
                          { value: 'w-5 h-5', label: 'Mediano (20px)' },
                          { value: 'w-6 h-6', label: 'Grande (24px)' },
                          { value: 'w-8 h-8', label: 'Extra grande (32px)' },
                        ]}
                      />

                      {/* Valores numéricos (+45%, etc.) */}
                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                        <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">📊 Valores numéricos</h4>
                        <TextInput
                          label="Valor 1"
                          value={template?.texts?.stat_value_1 || '+45%'}
                          onChange={(t) => updateText('stat_value_1', t)}
                        />
                        <TextInput
                          label="Valor 2"
                          value={template?.texts?.stat_value_2 || '+15'}
                          onChange={(t) => updateText('stat_value_2', t)}
                        />
                        <TextInput
                          label="Valor 3"
                          value={template?.texts?.stat_value_3 || '100%'}
                          onChange={(t) => updateText('stat_value_3', t)}
                        />
                        <CompactColorInput
                          label="Color valores"
                          value={sectionColors.statValueColor}
                          onChange={(c) => updateSectionColors({ statValueColor: c })}
                          defaultValue={defaultSectionColors.statValueColor}
                        />
                      </div>

                      {/* Textos de las etiquetas (crecimiento, equipos, objetivos) */}
                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                        <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">📝 Etiquetas</h4>
                        <TextInput
                          label="Etiqueta 1"
                          value={template?.texts?.stat_label_1 || 'crecimiento'}
                          onChange={(t) => updateText('stat_label_1', t)}
                        />
                        <TextInput
                          label="Etiqueta 2"
                          value={template?.texts?.stat_label_2 || 'equipos'}
                          onChange={(t) => updateText('stat_label_2', t)}
                        />
                        <TextInput
                          label="Etiqueta 3"
                          value={template?.texts?.stat_label_3 || 'objetivos'}
                          onChange={(t) => updateText('stat_label_3', t)}
                        />
                        <CompactColorInput
                          label="Color etiquetas"
                          value={sectionColors.statLabelColor}
                          onChange={(c) => updateSectionColors({ statLabelColor: c })}
                          defaultValue={defaultSectionColors.statLabelColor}
                        />
                      </div>
                    </div>
                  </SectionAccordion>

                  {/* Subsección: Colores */}
                  <SectionAccordion
                    title="Colores"
                    icon={Palette}
                    tooltipText="Personaliza los colores del Hero"
                  >
                    <div className="space-y-3">
                      <CompactColorInput label="Fondo del Hero" value={sectionColors.heroBackground} onChange={(c) => updateSectionColors({ heroBackground: c })} defaultValue={defaultSectionColors.heroBackground} description="Color de fondo de la sección principal" />
                      <CompactColorInput label="Color del título" value={sectionColors.heroTitleColor} onChange={(c) => updateSectionColors({ heroTitleColor: c })} defaultValue={defaultSectionColors.heroTitleColor} description="Color del texto principal" />
                      <CompactColorInput label="Color de la descripción" value={sectionColors.heroDescriptionColor} onChange={(c) => updateSectionColors({ heroDescriptionColor: c })} defaultValue={defaultSectionColors.heroDescriptionColor} description="Color del texto secundario" />
                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2">
                        <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">✨ Badge (Etiqueta destacada)</h4>
                        <CompactColorInput label="Fondo del badge" value={sectionColors.heroBadgeBackground} onChange={(c) => updateSectionColors({ heroBadgeBackground: c })} defaultValue={defaultSectionColors.heroBadgeBackground} />
                        <CompactColorInput label="Texto del badge" value={sectionColors.heroBadgeTextColor} onChange={(c) => updateSectionColors({ heroBadgeTextColor: c })} defaultValue={defaultSectionColors.heroBadgeTextColor} />
                      </div>
                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2">
                        <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">📏 Tamaños del Hero</h4>
                        <SizeInput label="Tamaño del título" value={typography.heroTitleSize} onChange={(s) => updateTypography({ heroTitleSize: s })} options={['2rem', '2.5rem', '3rem', '3.5rem', '4rem']} />
                        <SizeInput label="Tamaño de la descripción" value={typography.heroDescriptionSize} onChange={(s) => updateTypography({ heroDescriptionSize: s })} options={['0.875rem', '1rem', '1.125rem', '1.25rem']} />
                      </div>
                    </div>
                  </SectionAccordion>

                  {/* Subsección: Botones del Hero */}
                  <SectionAccordion
                    title="Botones del Hero"
                    icon={Link}
                    tooltipText="Modifica el texto, enlace y colores de los botones principales y secundarios del Hero"
                  >
                    {/* Botón principal */}
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">🔵 Botón principal</h4>
                      <TextInput
                        label="Texto del botón"
                        value={buttons.primary?.text || ''}
                        onChange={(t) => updateButtons({ primary: { ...buttons.primary, text: t } })}
                      />
                      <ComboboxInput
                        label="Enlace"
                        value={buttons.primary?.url || ''}
                        onChange={(u) => updateButtons({ primary: { ...buttons.primary, url: u } })}
                        options={linkOptions}
                        placeholder="/ruta o https://..."
                      />
                      <CompactColorInput
                        label="Color de fondo"
                        value={sectionColors.buttonPrimaryBackground}
                        onChange={(c) => updateSectionColors({ buttonPrimaryBackground: c })}
                        defaultValue={defaultSectionColors.buttonPrimaryBackground}
                      />
                      <CompactColorInput
                        label="Color del texto"
                        value={sectionColors.buttonPrimaryText}
                        onChange={(c) => updateSectionColors({ buttonPrimaryText: c })}
                        defaultValue={defaultSectionColors.buttonPrimaryText}
                      />
                      <CompactColorInput
                        label="Color al pasar el mouse"
                        value={sectionColors.buttonPrimaryHoverBackground}
                        onChange={(c) => updateSectionColors({ buttonPrimaryHoverBackground: c })}
                        defaultValue={defaultSectionColors.buttonPrimaryHoverBackground}
                      />
                    </div>

                    {/* Botón secundario */}
                    <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                      <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">⚪ Botón secundario</h4>
                      <TextInput
                        label="Texto del botón"
                        value={buttons.secondary?.text || ''}
                        onChange={(t) => updateButtons({ secondary: { ...buttons.secondary, text: t } })}
                      />
                      <ComboboxInput
                        label="Enlace"
                        value={buttons.secondary?.url || ''}
                        onChange={(u) => updateButtons({ secondary: { ...buttons.secondary, url: u } })}
                        options={linkOptions}
                        placeholder="/ruta o https://..."
                      />
                      <CompactColorInput
                        label="Color de fondo (secundario)"
                        value={sectionColors.buttonSecondaryBackground}
                        onChange={(c) => updateSectionColors({ buttonSecondaryBackground: c })}
                        defaultValue={defaultSectionColors.buttonSecondaryBackground}
                        inputId="color-secondary-background"
                      />
                      <CompactColorInput
                        label="Color del texto (secundario)"
                        value={sectionColors.buttonSecondaryText}
                        onChange={(c) => updateSectionColors({ buttonSecondaryText: c })}
                        defaultValue={defaultSectionColors.buttonSecondaryText}
                        inputId="color-secondary-text"
                      />
                      <CompactColorInput
                        label="Color al pasar el mouse (fondo)"
                        value={sectionColors.buttonSecondaryHoverBackground}
                        onChange={(c) => updateSectionColors({ buttonSecondaryHoverBackground: c })}
                        defaultValue={defaultSectionColors.buttonSecondaryHoverBackground}
                        inputId="color-secondary-hover"
                      />
                    </div>
                  </SectionAccordion>
                </div>
              </SectionAccordion>

              {/* ========== 3. SECCIONES SECUNDARIAS ========== */}
              <SectionAccordion
                scrollToId='services'
                title="Secciones secundarias"
                icon={Layout}
                tooltipText="Personaliza las secciones: Características, Sobre Nosotros, Testimonios y Contacto"
              >
                <div className="space-y-3">

                  {/* ===== 3.1 Características / Servicios ===== */}
                  <SectionAccordion
                    scrollToId="services"
                    title="Características / Servicios"
                    icon={Sparkles}
                    tooltipText="Personaliza las tarjetas de servicios"
                  >
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">🎨 Colores</h4>
                      <CompactColorInput
                        label="Fondo de sección"
                        value={sectionColors.featuresBackground}
                        onChange={(c) => updateSectionColors({ featuresBackground: c })}
                        defaultValue={defaultSectionColors.featuresBackground}
                      />
                      <CompactColorInput
                        label="Color de títulos"
                        value={sectionColors.featuresTitleColor}
                        onChange={(c) => updateSectionColors({ featuresTitleColor: c })}
                        defaultValue={defaultSectionColors.featuresTitleColor}
                      />
                      <CompactColorInput
                        label="Fondo de tarjetas"
                        value={sectionColors.featuresCardBackground}
                        onChange={(c) => updateSectionColors({ featuresCardBackground: c })}
                        defaultValue={defaultSectionColors.featuresCardBackground}
                      />
                      <CompactColorInput
                        label="Borde de tarjetas"
                        value={sectionColors.featuresCardBorder}
                        onChange={(c) => updateSectionColors({ featuresCardBorder: c })}
                        defaultValue={defaultSectionColors.featuresCardBorder}
                      />
                      <CompactColorInput
                        label="Color de iconos"
                        value={sectionColors.featuresIconColor}
                        onChange={(c) => updateSectionColors({ featuresIconColor: c })}
                        defaultValue={defaultSectionColors.featuresIconColor}
                      />
                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                        <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">📝 Textos editables</h4>
                        <TextInput
                          label="Título principal (parte 1)"
                          value={template?.texts?.features_title_1 || 'Capacidades que'}
                          onChange={(t) => updateText('features_title_1', t)}
                        />
                        <TextInput
                          label="Título principal (parte 2)"
                          value={template?.texts?.features_title_2 || 'Transforman'}
                          onChange={(t) => updateText('features_title_2', t)}
                        />
                        <TextInput
                          label="Descripción"
                          value={template?.texts?.features_description || 'No solo aconsejamos, implementamos. Te acompañamos en cada paso con herramientas y metodologías probadas.'}
                          onChange={(t) => updateText('features_description', t)}
                        />
                        <p className="text-[10px] text-neutral-500 mt-2">Nota: Los textos de cada tarjeta se editan directamente en la página (doble clic).</p>
                      </div>
                    </div>
                  </SectionAccordion>

                  {/* ===== 3.2 Sobre Nosotros ===== */}
                  <SectionAccordion
                    scrollToId="methodology"
                    title="Sobre Nosotros"
                    icon={Info}
                    tooltipText="Personaliza la sección About"
                  >
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">🎨 Colores</h4>
                      <CompactColorInput
                        label="Fondo de sección"
                        value={sectionColors.aboutBackground}
                        onChange={(c) => updateSectionColors({ aboutBackground: c })}
                        defaultValue={defaultSectionColors.aboutBackground}
                      />
                      <CompactColorInput
                        label="Color de títulos"
                        value={sectionColors.aboutTitleColor}
                        onChange={(c) => updateSectionColors({ aboutTitleColor: c })}
                        defaultValue={defaultSectionColors.aboutTitleColor}
                      />
                      <CompactColorInput
                        label="Color de texto"
                        value={sectionColors.aboutTextColor}
                        onChange={(c) => updateSectionColors({ aboutTextColor: c })}
                        defaultValue={defaultSectionColors.aboutTextColor}
                      />
                      <CompactColorInput
                        label="Color del badge"
                        value={sectionColors.aboutBadgeBackground}
                        onChange={(c) => updateSectionColors({ aboutBadgeBackground: c })}
                        defaultValue={defaultSectionColors.aboutBadgeBackground}
                      />
                      <CompactColorInput
                        label="Texto del badge"
                        value={sectionColors.aboutBadgeTextColor}
                        onChange={(c) => updateSectionColors({ aboutBadgeTextColor: c })}
                        defaultValue={defaultSectionColors.aboutBadgeTextColor}
                      />

                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                        <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">🖼️ Imagen</h4>
                        <button
                          onClick={() => {
                            window.dispatchEvent(new CustomEvent('openImageSelector', {
                              detail: { elementId: 'about_image' }
                            }));
                          }}
                          className="w-full py-2 px-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-medium hover:bg-neutral-200 transition-colors"
                        >
                          Seleccionar imagen de About
                        </button>
                        <SelectInput
                          label="Borde redondeado de la imagen"
                          value={sectionColors.aboutImageBorderRadius}
                          onChange={(val) => updateSectionColors({ aboutImageBorderRadius: val })}
                          options={[
                            { value: '0rem', label: 'Sin bordes' },
                            { value: '0.5rem', label: 'Pequeño (8px)' },
                            { value: '1rem', label: 'Mediano (16px)' },
                            { value: '1.5rem', label: 'Grande (24px)' },
                            { value: '9999px', label: 'Completamente redondo' },
                          ]}
                        />
                      </div>

                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                        <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">📊 Estadísticas</h4>
                        {[1, 2, 3, 4].map((idx) => {
                          const iconKey = `stat_icon_${idx}`;
                          const valueKey = `stat_value_${idx}`;
                          const labelKey = `stat_label_${idx}`;
                          return (
                            <div key={idx} className="mb-3 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-medium text-neutral-500">Estadística {idx}</span>
                              </div>
                              <IconSelect
                                label="Icono"
                                value={template?.texts?.[iconKey] || (idx === 1 ? 'Briefcase' : idx === 2 ? 'Users' : idx === 3 ? 'Award' : 'MapPin')}
                                onChange={(val) => updateText(iconKey, val)}
                                options={[
                                  { value: 'Briefcase', label: 'Maletín', icon: Briefcase },
                                  { value: 'Users', label: 'Usuarios', icon: Users },
                                  { value: 'Award', label: 'Premio', icon: Award },
                                  { value: 'MapPin', label: 'Ubicación', icon: MapPin },
                                  { value: 'TrendingUp', label: 'Tendencia', icon: TrendingUp },
                                  { value: 'Target', label: 'Objetivo', icon: Target },
                                  { value: 'BarChart', label: 'Gráfico', icon: BarChart },
                                  { value: 'Globe', label: 'Global', icon: Globe },
                                  // añade más si lo deseas
                                ]}
                              />
                              <TextInput
                                label="Valor"
                                value={template?.texts?.[valueKey] || (idx === 1 ? '15+' : idx === 2 ? '50+' : idx === 3 ? '200+' : '10+')}
                                onChange={(t) => updateText(valueKey, t)}
                              />
                              <TextInput
                                label="Etiqueta"
                                value={template?.texts?.[labelKey] || (idx === 1 ? 'Años de experiencia' : idx === 2 ? 'Consultores expertos' : idx === 3 ? 'Proyectos exitosos' : 'Países con presencia')}
                                onChange={(t) => updateText(labelKey, t)}
                              />
                            </div>
                          );
                        })}
                        <CompactColorInput
                          label="Color de los valores"
                          value={sectionColors.statValueColor}
                          onChange={(c) => updateSectionColors({ statValueColor: c })}
                          defaultValue={defaultSectionColors.statValueColor}
                        />
                        <CompactColorInput
                          label="Color de las etiquetas"
                          value={sectionColors.statLabelColor}
                          onChange={(c) => updateSectionColors({ statLabelColor: c })}
                          defaultValue={defaultSectionColors.statLabelColor}
                        />
                      </div>

                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                        <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">📝 Textos editables</h4>
                        <TextInput
                          label="Badge (sobre nosotros)"
                          value={template?.texts?.about_section_badge || 'Nuestra Firma'}
                          onChange={(t) => updateText('about_section_badge', t)}
                        />
                        <TextInput
                          label="Título (parte 1)"
                          value={template?.texts?.about_heading_1 || 'Consultoría con'}
                          onChange={(t) => updateText('about_heading_1', t)}
                        />
                        <TextInput
                          label="Título (parte 2)"
                          value={template?.texts?.about_heading_2 || 'Resultados Medibles'}
                          onChange={(t) => updateText('about_heading_2', t)}
                        />
                        <TextInput
                          label="Descripción 1"
                          value={template?.texts?.about_description_1 || 'En Kernelize Consulting no creemos en soluciones genéricas...'}
                          onChange={(t) => updateText('about_description_1', t)}
                        />
                        <TextInput
                          label="Descripción 2"
                          value={template?.texts?.about_description_2 || 'Nuestro enfoque combina el rigor analítico con la creatividad...'}
                          onChange={(t) => updateText('about_description_2', t)}
                        />
                      </div>

                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                        <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">✅ Diferenciadores</h4>
                        {[0, 1, 2, 3].map((idx) => (
                          <TextInput
                            key={idx}
                            label={`Diferenciador ${idx + 1}`}
                            value={template?.texts?.[`differentiator_${idx}`] || (idx === 0 ? 'Metodologías ágiles y adaptativas' : idx === 1 ? 'Análisis de datos para toma de decisiones' : idx === 2 ? 'Acompañamiento post-implementación' : 'Confidencialidad y ética profesional')}
                            onChange={(t) => updateText(`differentiator_${idx}`, t)}
                          />
                        ))}
                      </div>
                    </div>
                  </SectionAccordion>

                  {/* ===== 3.3 Testimonios ===== */}
                  <SectionAccordion
                    scrollToId="testimonials"
                    title="Testimonios"
                    icon={MessageSquare}
                    tooltipText="Personaliza los testimonios de clientes"
                  >
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">🎨 Colores</h4>
                      <CompactColorInput
                        label="Fondo de sección"
                        value={sectionColors.testimonialsBackground}
                        onChange={(c) => updateSectionColors({ testimonialsBackground: c })}
                        defaultValue={defaultSectionColors.testimonialsBackground}
                      />
                      <CompactColorInput
                        label="Color de títulos"
                        value={sectionColors.testimonialsTitleColor}
                        onChange={(c) => updateSectionColors({ testimonialsTitleColor: c })}
                        defaultValue={defaultSectionColors.testimonialsTitleColor}
                      />
                      <CompactColorInput
                        label="Color de texto"
                        value={sectionColors.testimonialsTextColor}
                        onChange={(c) => updateSectionColors({ testimonialsTextColor: c })}
                        defaultValue={defaultSectionColors.testimonialsTextColor}
                      />
                      <CompactColorInput
                        label="Fondo de tarjetas"
                        value={sectionColors.testimonialsCardBackground}
                        onChange={(c) => updateSectionColors({ testimonialsCardBackground: c })}
                        defaultValue={defaultSectionColors.testimonialsCardBackground}
                      />
                      <CompactColorInput
                        label="Borde de tarjetas"
                        value={sectionColors.testimonialsCardBorder}
                        onChange={(c) => updateSectionColors({ testimonialsCardBorder: c })}
                        defaultValue={defaultSectionColors.testimonialsCardBorder}
                      />
                      <CompactColorInput
                        label="Color de nombre"
                        value={sectionColors.testimonialsNameColor}
                        onChange={(c) => updateSectionColors({ testimonialsNameColor: c })}
                        defaultValue={defaultSectionColors.testimonialsNameColor}
                      />
                      <CompactColorInput
                        label="Color de rol"
                        value={sectionColors.testimonialsRoleColor}
                        onChange={(c) => updateSectionColors({ testimonialsRoleColor: c })}
                        defaultValue={defaultSectionColors.testimonialsRoleColor}
                      />

                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                        <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">📝 Testimonios (3 tarjetas)</h4>
                        {['carlos', 'laura', 'roberto'].map((id, idx) => (
                          <div key={id} className="mb-4 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                            <p className="text-[10px] font-medium text-neutral-500 mb-2">Testimonio {idx + 1}</p>
                            <TextInput
                              label="Nombre"
                              value={template?.texts?.[`testimonial_name_${id}`] || (id === 'carlos' ? 'Carlos Méndez' : id === 'laura' ? 'Laura Fernández' : 'Roberto Sánchez')}
                              onChange={(t) => updateText(`testimonial_name_${id}`, t)}
                            />
                            <TextInput
                              label="Rol"
                              value={template?.texts?.[`testimonial_role_${id}`] || (id === 'carlos' ? 'CEO - TechCorp LATAM' : id === 'laura' ? 'Directora de Operaciones - Grupo Logístico' : 'Fundador - Inversiones RS')}
                              onChange={(t) => updateText(`testimonial_role_${id}`, t)}
                            />
                            <TextInput
                              label="Contenido"
                              value={template?.texts?.[`testimonial_content_${id}`] || (id === 'carlos' ? 'El equipo de Kernelize reestructuró nuestra estrategia comercial...' : id === 'laura' ? 'Necesitábamos expandirnos a nuevos mercados...' : 'Contratamos su servicio de planificación financiera...')}
                              onChange={(t) => updateText(`testimonial_content_${id}`, t)}
                            />
                            {/* El rating (estrellas) se puede añadir más adelante si se desea */}
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                        <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">📊 Indicadores de confianza</h4>
                        {[
                          { id: 'projects', defaultIcon: 'Briefcase', defaultVal: '100+', defaultLabel: 'Proyectos anuales' },
                          { id: 'industries', defaultIcon: 'BarChart', defaultVal: '15', defaultLabel: 'Industrias diferentes' },
                          { id: 'satisfaction', defaultIcon: 'Heart', defaultVal: '98%', defaultLabel: 'Tasa de satisfacción' },
                          { id: 'support', defaultIcon: 'Clock', defaultVal: '24/7', defaultLabel: 'Soporte a clientes' },
                        ].map((ind) => (
                          <div key={ind.id} className="mb-4 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                            <p className="text-[10px] font-medium text-neutral-500 mb-2">{ind.defaultLabel}</p>
                            <IconSelect
                              label="Icono"
                              value={template?.texts?.[`indicator_icon_${ind.id}`] || ind.defaultIcon}
                              onChange={(val) => updateText(`indicator_icon_${ind.id}`, val)}
                              options={[
                                { value: 'Briefcase', label: 'Maletín', icon: Briefcase },
                                { value: 'BarChart', label: 'Gráfico', icon: BarChart },
                                { value: 'Heart', label: 'Corazón', icon: Heart },
                                { value: 'Clock', label: 'Reloj', icon: Clock },
                                { value: 'TrendingUp', label: 'Tendencia', icon: TrendingUp },
                                { value: 'Users', label: 'Usuarios', icon: Users },
                                { value: 'Target', label: 'Objetivo', icon: Target },
                                { value: 'Award', label: 'Premio', icon: Award },
                                { value: 'Globe', label: 'Global', icon: Globe },
                                { value: 'CheckCircle', label: 'Verificado', icon: CheckCircle },
                                { value: 'ThumbsUp', label: 'Pulgar arriba', icon: ThumbsUp },
                                { value: 'Zap', label: 'Rayo', icon: Zap },
                                { value: 'Eye', label: 'Ojo', icon: Eye },
                                { value: 'MessageCircle', label: 'Mensaje', icon: MessageCircle },
                                { value: 'Phone', label: 'Teléfono', icon: Phone },
                              ]}
                            />
                            <TextInput
                              label="Valor"
                              value={template?.texts?.[`indicator_value_${ind.id}`] || ind.defaultVal}
                              onChange={(t) => updateText(`indicator_value_${ind.id}`, t)}
                            />
                            <TextInput
                              label="Etiqueta"
                              value={template?.texts?.[`indicator_label_${ind.id}`] || ind.defaultLabel}
                              onChange={(t) => updateText(`indicator_label_${ind.id}`, t)}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                        <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">📝 Textos editables</h4>
                        <TextInput
                          label="Título (parte 1)"
                          value={template?.texts?.testimonials_title_1 || 'Lo que dicen nuestros'}
                          onChange={(t) => updateText('testimonials_title_1', t)}
                        />
                        <TextInput
                          label="Título (parte 2)"
                          value={template?.texts?.testimonials_title_2 || 'clientes'}
                          onChange={(t) => updateText('testimonials_title_2', t)}
                        />
                        <TextInput
                          label="Descripción"
                          value={template?.texts?.testimonials_description || 'Historias reales de transformación empresarial.'}
                          onChange={(t) => updateText('testimonials_description', t)}
                        />
                      </div>
                    </div>
                  </SectionAccordion>

                  {/* ===== 3.4 Contacto ===== */}
                  <SectionAccordion
                    scrollToId="contact"
                    title="Contacto"
                    icon={Mail}
                    tooltipText="Personaliza la sección de contacto"
                  >
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">🎨 Colores</h4>
                      {/* ... (todos los CompactColorInput de colores de contacto) ... */}
                      <CompactColorInput label="Fondo de sección" value={sectionColors.contactBackground} onChange={(c) => updateSectionColors({ contactBackground: c })} defaultValue={defaultSectionColors.contactBackground} />
                      <CompactColorInput label="Color de títulos" value={sectionColors.contactTitleColor} onChange={(c) => updateSectionColors({ contactTitleColor: c })} defaultValue={defaultSectionColors.contactTitleColor} />
                      <CompactColorInput label="Color de texto" value={sectionColors.contactTextColor} onChange={(c) => updateSectionColors({ contactTextColor: c })} defaultValue={defaultSectionColors.contactTextColor} />
                      <CompactColorInput label="Fondo del formulario" value={sectionColors.contactFormBackground} onChange={(c) => updateSectionColors({ contactFormBackground: c })} defaultValue={defaultSectionColors.contactFormBackground} />
                      <CompactColorInput label="Borde del formulario" value={sectionColors.contactFormBorder} onChange={(c) => updateSectionColors({ contactFormBorder: c })} defaultValue={defaultSectionColors.contactFormBorder} />
                      <CompactColorInput label="Fondo de inputs" value={sectionColors.contactInputBackground} onChange={(c) => updateSectionColors({ contactInputBackground: c })} defaultValue={defaultSectionColors.contactInputBackground} />
                      <CompactColorInput label="Borde de inputs" value={sectionColors.contactInputBorder} onChange={(c) => updateSectionColors({ contactInputBorder: c })} defaultValue={defaultSectionColors.contactInputBorder} />
                      <CompactColorInput label="Color de texto de inputs" value={sectionColors.contactInputTextColor} onChange={(c) => updateSectionColors({ contactInputTextColor: c })} defaultValue={defaultSectionColors.contactInputTextColor} />
                      <CompactColorInput label="Fondo del botón" value={sectionColors.contactButtonBackground} onChange={(c) => updateSectionColors({ contactButtonBackground: c })} defaultValue={defaultSectionColors.contactButtonBackground} />
                      <CompactColorInput label="Texto del botón" value={sectionColors.contactButtonText} onChange={(c) => updateSectionColors({ contactButtonText: c })} defaultValue={defaultSectionColors.contactButtonText} />
                      <CompactColorInput label="Fondo del botón al pasar mouse" value={sectionColors.contactButtonHoverBackground} onChange={(c) => updateSectionColors({ contactButtonHoverBackground: c })} defaultValue={defaultSectionColors.contactButtonHoverBackground} />

                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                        <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">✉️ Información de contacto</h4>
                        {['email', 'phone', 'location'].map((id) => (
                          <div key={id} className="mb-3 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                            <p className="text-[10px] font-medium text-neutral-500 mb-2 capitalize">{id}</p>
                            <IconSelect
                              label="Icono"
                              value={template?.texts?.[`contact_${id}_icon`] || (id === 'email' ? 'Mail' : id === 'phone' ? 'Phone' : 'MapPin')}
                              onChange={(val) => updateText(`contact_${id}_icon`, val)}
                              options={[
                                { value: 'Mail', label: 'Correo', icon: Mail },
                                { value: 'Phone', label: 'Teléfono', icon: Phone },
                                { value: 'MapPin', label: 'Ubicación', icon: MapPin },
                                { value: 'Briefcase', label: 'Maletín', icon: Briefcase },
                                { value: 'Globe', label: 'Global', icon: Globe },
                                // añade más si deseas
                              ]}
                            />
                            <TextInput
                              label="Título"
                              value={template?.texts?.[`contact_${id}_title`] || (id === 'email' ? 'Email' : id === 'phone' ? 'Teléfono' : 'Ubicación')}
                              onChange={(t) => updateText(`contact_${id}_title`, t)}
                            />
                            <TextInput
                              label="Contenido"
                              value={template?.texts?.[`contact_${id}_content`] || (id === 'email' ? 'consultoria@kernelize.com' : id === 'phone' ? '+54 9 11 6745-7413' : 'Buenos Aires, Argentina')}
                              onChange={(t) => updateText(`contact_${id}_content`, t)}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                        <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">🕒 Horario de atención</h4>
                        <IconSelect
                          label="Icono"
                          value={template?.texts?.contact_hours_icon || 'Briefcase'}
                          onChange={(val) => updateText('contact_hours_icon', val)}
                          options={[
                            { value: 'Briefcase', label: 'Maletín', icon: Briefcase },
                            { value: 'Clock', label: 'Reloj', icon: Clock },
                            { value: 'Calendar', label: 'Calendario', icon: Calendar },
                            // otros
                          ]}
                        />
                        <TextInput
                          label="Título"
                          value={template?.texts?.contact_hours_title || 'Horario de atención'}
                          onChange={(t) => updateText('contact_hours_title', t)}
                        />
                        <TextInput
                          label="Horario (lunes a viernes)"
                          value={template?.texts?.contact_hours_week || 'Lunes a Viernes: 9:00 - 19:00 hs'}
                          onChange={(t) => updateText('contact_hours_week', t)}
                        />
                        <TextInput
                          label="Horario (sábados)"
                          value={template?.texts?.contact_hours_saturday || 'Sábados: Reuniones programadas'}
                          onChange={(t) => updateText('contact_hours_saturday', t)}
                        />
                        <TextInput
                          label="Tiempo de respuesta"
                          value={template?.texts?.contact_response_time || 'Respuesta garantizada en 12 horas hábiles'}
                          onChange={(t) => updateText('contact_response_time', t)}
                        />
                      </div>

                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                        <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">📝 Textos del formulario</h4>
                        <TextInput label="Título" value={template?.texts?.contact_form_title || 'Solicita una reunión de diagnóstico'} onChange={(t) => updateText('contact_form_title', t)} />
                        <TextInput label="Label nombre" value={template?.texts?.contact_label_name || 'Nombre completo *'} onChange={(t) => updateText('contact_label_name', t)} />
                        <TextInput label="Label email" value={template?.texts?.contact_label_email || 'Email corporativo *'} onChange={(t) => updateText('contact_label_email', t)} />
                        <TextInput label="Texto de botón" value={template?.texts?.contact_submit || 'Solicitar reunión'} onChange={(t) => updateText('contact_submit', t)} />
                        <TextInput label="Texto Enviando" value={template?.texts?.contact_sending || 'Enviando...'} onChange={(t) => updateText('contact_sending', t)} />
                        <TextInput label="Título éxito" value={template?.texts?.contact_success_title || '¡Mensaje enviado con éxito!'} onChange={(t) => updateText('contact_success_title', t)} />
                        <TextInput label="Mensaje éxito" value={template?.texts?.contact_success_message || 'En menos de 12 horas hábiles...'} onChange={(t) => updateText('contact_success_message', t)} />
                        <TextInput label="Botón éxito" value={template?.texts?.contact_success_button || 'Enviar otro mensaje'} onChange={(t) => updateText('contact_success_button', t)} />
                      </div>
                    </div>
                  </SectionAccordion>

                </div>
              </SectionAccordion>

              {/* ========== 4. FOOTER ========== */}
              <SectionAccordion
                scrollToId="footer"
                title="Footer"
                icon={Layout}
                tooltipText="Personaliza el pie de página: logos, textos, enlaces, iconos y certificaciones"
              >
                {/* Subsección: Logo y marca */}
                <SectionAccordion title="Logo y marca" icon={Image} tooltipText="Icono y textos de la marca">
                  <IconSelect
                    label="Icono principal"
                    value={template?.texts?.footer_brand_icon || 'Briefcase'}
                    onChange={(val) => updateText('footer_brand_icon', val)}
                    options={[
                      { value: 'Briefcase', label: 'Maletín', icon: Briefcase },
                      { value: 'Building', label: 'Edificio', icon: Building },
                      { value: 'Star', label: 'Estrella', icon: Star },
                      // añade más
                    ]}
                  />
                  <TextInput label="Texto primera parte" value={template?.texts?.footer_brand_1 || 'Kernelize'} onChange={(t) => updateText('footer_brand_1', t)} />
                  <TextInput label="Texto segunda parte" value={template?.texts?.footer_brand_2 || 'Consulting'} onChange={(t) => updateText('footer_brand_2', t)} />
                  <TextInput label="Descripción" value={template?.texts?.footer_description || 'Transformamos empresas...'} onChange={(t) => updateText('footer_description', t)} />
                </SectionAccordion>

                {/* Subsección: Enlaces rápidos */}
                <SectionAccordion title="Enlaces rápidos" icon={Link} tooltipText="Textos y destinos de los enlaces">
                  {['home', 'services', 'methodology', 'success', 'contact'].map((id) => (
                    <div key={id} className="mb-3 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                      <TextInput
                        label={`Texto (${id})`}
                        value={template?.texts?.[`footer_link_${id}_label`] || (id === 'home' ? 'Inicio' : id === 'services' ? 'Servicios' : id === 'methodology' ? 'Metodología' : id === 'success' ? 'Casos de éxito' : 'Contacto')}
                        onChange={(t) => updateText(`footer_link_${id}_label`, t)}
                      />
                      <ComboboxInput
                        label="Destino"
                        value={template?.texts?.[`footer_link_${id}_url`] || (id === 'home' ? '#home' : id === 'services' ? '#services' : id === 'methodology' ? '#methodology' : id === 'success' ? '#testimonials' : '#contact')}
                        onChange={(u) => updateText(`footer_link_${id}_url`, u)}
                        options={linkOptions}
                        placeholder="#seccion"
                      />
                    </div>
                  ))}
                </SectionAccordion>

                {/* Subsección: Áreas de expertise */}
                <SectionAccordion title="Áreas de expertise" icon={Target} tooltipText="Textos de las áreas">
                  {[1, 2, 3, 4, 5].map((idx) => (
                    <TextInput
                      key={idx}
                      label={`Área ${idx}`}
                      value={template?.texts?.[`expertise_${idx}`] || (idx === 1 ? 'Estrategia Corporativa' : idx === 2 ? 'Transformación Digital' : idx === 3 ? 'Gestión del Talento' : idx === 4 ? 'Finanzas Corporativas' : 'Expansión Internacional')}
                      onChange={(t) => updateText(`expertise_${idx}`, t)}
                    />
                  ))}
                </SectionAccordion>

                {/* Subsección: Contacto directo */}
                <SectionAccordion title="Contacto directo" icon={Mail} tooltipText="Iconos y valores de contacto">
                  {['email', 'phone', 'location'].map((id) => (
                    <div key={id} className="mb-3 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                      <IconSelect
                        label="Icono"
                        value={template?.texts?.[`footer_contact_${id}_icon`] || (id === 'email' ? 'Mail' : id === 'phone' ? 'Phone' : 'MapPin')}
                        onChange={(val) => updateText(`footer_contact_${id}_icon`, val)}
                        options={[
                          { value: 'Mail', label: 'Correo', icon: Mail },
                          { value: 'Phone', label: 'Teléfono', icon: Phone },
                          { value: 'MapPin', label: 'Ubicación', icon: MapPin },
                          { value: 'Briefcase', label: 'Maletín', icon: Briefcase },
                        ]}
                      />
                      <TextInput
                        label="Valor"
                        value={template?.texts?.[`footer_contact_${id}_value`] || (id === 'email' ? 'consultoria@kernelize.com' : id === 'phone' ? '+54 9 11 6745-7413' : 'Buenos Aires, Argentina')}
                        onChange={(t) => updateText(`footer_contact_${id}_value`, t)}
                      />
                    </div>
                  ))}
                </SectionAccordion>

                {/* Subsección: Copyright y enlaces legales */}
                <SectionAccordion title="Copyright y legal" icon={FileText} tooltipText="Texto legal y enlaces">
                  <TextInput label="Copyright" value={template?.texts?.footer_copyright || 'Kernelize Consulting. Todos los derechos reservados.'} onChange={(t) => updateText('footer_copyright', t)} />
                  <TextInput label="Texto 'Hecho con'" value={template?.texts?.footer_made_with || 'Hecho con'} onChange={(t) => updateText('footer_made_with', t)} />
                  <TextInput label="Texto 'para empresas'" value={template?.texts?.footer_for || 'para empresas que buscan crecer'} onChange={(t) => updateText('footer_for', t)} />
                  {['terms', 'privacy', 'cookies'].map((type) => (
                    <div key={type} className="mt-2">
                      <TextInput
                        label={`Etiqueta (${type})`}
                        value={template?.texts?.[`footer_${type}_label`] || (type === 'terms' ? 'Términos y condiciones' : type === 'privacy' ? 'Política de privacidad' : 'Cookies')}
                        onChange={(t) => updateText(`footer_${type}_label`, t)}
                      />
                      <TextInput
                        label={`Enlace (${type})`}
                        value={template?.texts?.[`footer_${type}_url`] || '#'}
                        onChange={(u) => updateText(`footer_${type}_url`, u)}
                      />
                    </div>
                  ))}
                </SectionAccordion>

                {/* Subsección: Certificaciones */}
                <SectionAccordion title="Certificaciones" icon={Award} tooltipText="Textos de las certificaciones">
                  {[1, 2, 3, 4].map((idx) => (
                    <TextInput
                      key={idx}
                      label={`Certificación ${idx}`}
                      value={template?.texts?.[`cert_${idx}`] || (idx === 1 ? 'ISO 9001:2024' : idx === 2 ? 'Miembro de AACCP' : idx === 3 ? 'Certified Partners' : '+15 años de experiencia')}
                      onChange={(t) => updateText(`cert_${idx}`, t)}
                    />
                  ))}
                </SectionAccordion>
              </SectionAccordion>

              {/* ========== 5. REDES SOCIALES ========== */}
              <SectionAccordion
                scrollToId="footer"
                title="Redes Sociales"
                icon={Share2}
                tooltipText="Configura los enlaces y colores de los íconos sociales"
              >
                <CompactColorInput
                  label="Color del ícono"
                  value={sectionColors.socialIconColor}
                  onChange={(c) => updateSectionColors({ socialIconColor: c })}
                  defaultValue={defaultSectionColors.socialIconColor}
                />
                <CompactColorInput
                  label="Color al pasar mouse"
                  value={sectionColors.socialIconHoverColor}
                  onChange={(c) => updateSectionColors({ socialIconHoverColor: c })}
                  defaultValue={defaultSectionColors.socialIconHoverColor}
                />

                <div className="border-t border-neutral-200 dark:border-neutral-700 my-2 pt-2">
                  <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Enlaces (URLs)</h4>
                  <div className="mb-2">
                    <label className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300 block mb-1">Facebook</label>
                    <input
                      type="url"
                      value={template?.texts?.social_facebook_url || ''}
                      onChange={(e) => updateText('social_facebook_url', e.target.value)}
                      placeholder="https://facebook.com/tu-pagina"
                      className="w-full px-2 py-1 text-xs border rounded-lg bg-white dark:bg-neutral-800"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300 block mb-1">Instagram</label>
                    <input
                      type="url"
                      value={template?.texts?.social_instagram_url || ''}
                      onChange={(e) => updateText('social_instagram_url', e.target.value)}
                      placeholder="https://instagram.com/tu-perfil"
                      className="w-full px-2 py-1 text-xs border rounded-lg bg-white dark:bg-neutral-800"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300 block mb-1">LinkedIn</label>
                    <input
                      type="url"
                      value={template?.texts?.social_linkedin_url || ''}
                      onChange={(e) => updateText('social_linkedin_url', e.target.value)}
                      placeholder="https://linkedin.com/company/tu-empresa"
                      className="w-full px-2 py-1 text-xs border rounded-lg bg-white dark:bg-neutral-800"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300 block mb-1">Twitter / X</label>
                    <input
                      type="url"
                      value={template?.texts?.social_twitter_url || ''}
                      onChange={(e) => updateText('social_twitter_url', e.target.value)}
                      placeholder="https://twitter.com/tu-usuario"
                      className="w-full px-2 py-1 text-xs border rounded-lg bg-white dark:bg-neutral-800"
                    />
                  </div>
                </div>
              </SectionAccordion>

              {/* ========== 6. OPCIONES GLOBALES ========== */}
              <SectionAccordion
                title="Tipografía"
                icon={Type}
                tooltipText="Cambia las fuentes y tamaños globales"
              >
                <div className="space-y-3">
                  <FontSelect label="Fuente de títulos" value={typography.headingFont} onChange={(f) => updateTypography({ headingFont: f })} />
                  <FontSelect label="Fuente de textos" value={typography.bodyFont} onChange={(f) => updateTypography({ bodyFont: f })} />
                  <SizeInput label="Tamaño de títulos de sección" value={typography.sectionTitleSize} onChange={(s) => updateTypography({ sectionTitleSize: s })} options={['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem']} />
                  <SizeInput label="Tamaño de texto general" value={typography.bodyTextSize} onChange={(s) => updateTypography({ bodyTextSize: s })} options={['0.875rem', '1rem', '1.125rem']} />
                </div>
              </SectionAccordion>

            </div>
          )}

          {activeTab === 'presets' && template && (
            <div className="space-y-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-3">
                <p className="text-[10px] text-blue-700 dark:text-blue-300 flex items-start gap-1.5">
                  <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  <span>Combinaciones de colores predefinidas para tu template</span>
                </p>
              </div>
              <div id="presets-section">
                <div className="grid grid-cols-2 gap-2">
                  {(colorPresets[template.type as keyof typeof colorPresets] || []).map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => applyPreset(preset.name)}
                      className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all text-left group"
                    >
                      <div className="flex flex-wrap gap-1 mb-2">
                        {Object.values(preset.colors).map((color, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full border border-neutral-300 dark:border-neutral-600 shadow-sm"
                            style={{ backgroundColor: color as string }}
                            title={color as string}
                          />
                        ))}
                      </div>
                      <p className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300 truncate">{preset.name}</p>
                      <p className="text-[9px] text-neutral-500 dark:text-neutral-400 mt-0.5">Click para aplicar</p>
                    </button>
                  ))}
                </div>
              </div>
              {(!colorPresets[template.type as keyof typeof colorPresets] || colorPresets[template.type as keyof typeof colorPresets]?.length === 0) && (
                <div className="text-center py-8">
                  <p className="text-xs text-neutral-500">No hay presets disponibles para este template</p>
                </div>
              )}
            </div>
          )}

          {/* {activeTab === 'texts' && (
            <div className="space-y-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-[10px] text-blue-700 dark:text-blue-300 flex items-start gap-1.5">
                  <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  <span>Doble clic en cualquier texto de la página para editarlo</span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-center">
                  <p className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">Títulos principales</p>
                  <p className="text-[9px] text-neutral-400 mt-0.5">Doble clic para editar</p>
                </div>
                <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-center">
                  <p className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">Descripciones</p>
                  <p className="text-[9px] text-neutral-400 mt-0.5">Doble clic para editar</p>
                </div>
                <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-center">
                  <p className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">Botones CTA</p>
                  <p className="text-[9px] text-neutral-400 mt-0.5">Doble clic para editar</p>
                </div>
                <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-center">
                  <p className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">Secciones completas</p>
                  <p className="text-[9px] text-neutral-400 mt-0.5">Doble clic para editar</p>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <p className="text-[9px] text-neutral-400 text-center">
                  También puedes editar textos desde el panel visual en "Diseño visual"
                </p>
              </div>
            </div>
          )} */}
        </div>

        {/* Acciones del sidebar */}
        <div className="p-2 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
          <button
            id="save-button"
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full py-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center justify-center gap-1.5 mb-1.5
              ${hasUnsavedChanges
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md animate-pulse'
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'}`}
          >
            {isSaving ? <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {isSaving ? "Guardando..." : (hasUnsavedChanges ? "¡Guardar cambios!*" : "Guardar cambios")}
          </button>

          <div id="undo-redo-buttons" className="flex gap-1.5 mb-1.5">
            <button onClick={undo} disabled={!canUndo} className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1 ${canUndo ? 'bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" /></svg>
              Deshacer
            </button>
            <button onClick={redo} disabled={!canRedo} className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1 ${canRedo ? 'bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" /></svg>
              Rehacer
            </button>
          </div>

          <button onClick={() => resetTemplate(template?.type || 'consulting')} className="w-full py-1.5 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-lg text-[10px] font-medium text-neutral-700 dark:text-neutral-300 transition-all flex items-center justify-center gap-1 mb-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
            Restablecer todo
          </button>

          <div className="flex gap-1.5">
            <button onClick={onHomeClick} className="flex-1 py-1.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1"><Home className="w-3 h-3" /> Inicio</button>
            <button id="finish-button" onClick={handleFinishEditing} disabled={isSaving} className="flex-1 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1"><LogOut className="w-3 h-3" /> {isSaving ? "Guardando..." : "Finalizar edición"}</button>
          </div>

          <button onClick={() => setShowSupportModal(true)} className="w-full mt-1.5 py-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg text-[10px] font-medium text-neutral-600 dark:text-neutral-400 transition-all flex items-center justify-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
            Soporte
          </button>

          {userLoggedIn && (
            <button onClick={handleSaveToAccount} disabled={isSaving} className="w-full mt-1.5 py-1 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1 disabled:opacity-50">
              {isSaving ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <User className="w-3 h-3" />}
              {isSaving ? "Guardando..." : "Guardar en cuenta"}
            </button>
          )}
        </div>
      </div>

      {/* Modal de Soporte */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-5 max-w-sm w-full shadow-2xl">
            <h3 className="text-base font-semibold mb-2">Soporte</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">¿Necesitas ayuda con la edición de tu template?</p>
            <div className="space-y-2 mb-4">
              <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg"><p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">📧 Email</p><p className="text-xs text-neutral-500">soporte@kernelice.com</p></div>
              <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg"><p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">💬 WhatsApp</p><p className="text-xs text-neutral-500">+54 9 11 1234-5678</p></div>
              <button onClick={() => { setShowSupportModal(false); tutorial.startTutorial(); }} className="w-full mt-2 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium flex items-center justify-center gap-1"><Info className="w-3 h-3" /> Ver tutorial otra vez</button>
            </div>
            <button onClick={() => setShowSupportModal(false)} className="w-full py-1.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg text-xs font-medium">Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditorDashboard;