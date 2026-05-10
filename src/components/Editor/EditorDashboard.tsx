import {
  AlertCircle,
  Award,
  BarChart,
  Briefcase,
  Building,
  Check,
  Eye,
  FileText,
  Globe,
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
  MessageSquare,
  Palette,
  Save,
  Share2,
  Smile,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Type,
  User,
  Users
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

type EditorTab = 'visual' | 'presets';

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

// Componente para seleccionar iconos
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
    updateButtons,
    updateText,
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
  const typography = {
    ...defaultTypography,
    ...(template?.typography || {}),
  };

  // Inicialización segura de botones
  const defaultButtonsStructure = {
    primary: { text: 'Solicitar consultoría', url: '/contacto', openInNewTab: false },
    secondary: { text: 'Conocer metodología', url: '#metodologia', openInNewTab: false },
  };
  const buttons = {
    primary: template?.buttons?.primary || defaultButtonsStructure.primary,
    secondary: template?.buttons?.secondary || defaultButtonsStructure.secondary,
  };

  // Opciones comunes
  const linkOptions = [
    { value: '#home', label: 'Inicio (#home)' },
    { value: '#services', label: 'Servicios (#services)' },
    { value: '#methodology', label: 'Metodología (#methodology)' },
    { value: '#testimonials', label: 'Testimonios (#testimonials)' },
    { value: '#contact', label: 'Contacto (#contact)' },
  ];

  const navLinks = [
    { id: 'nav_home', label: 'Inicio', defaultText: 'Inicio', defaultUrl: '#home' },
    { id: 'nav_services', label: 'Servicios', defaultText: 'Servicios', defaultUrl: '#services' },
    { id: 'nav_methodology', label: 'Metodología', defaultText: 'Metodología', defaultUrl: '#methodology' },
    { id: 'nav_testimonials', label: 'Casos de éxito', defaultText: 'Casos de éxito', defaultUrl: '#testimonials' },
    { id: 'nav_contact', label: 'Contacto', defaultText: 'Contacto', defaultUrl: '#contact' },
  ];

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
          <div className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg shadow-lg text-sm
            ${config.notifications.type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : ''}
            ${config.notifications.type === 'error' ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white' : ''}
            ${config.notifications.type === 'warning' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white' : ''}
            ${config.notifications.type === 'info' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : ''}`}>
            {config.notifications.type === 'success' && <Check className="w-4 h-4" />}
            {config.notifications.type === 'error' && <AlertCircle className="w-4 h-4" />}
            {config.notifications.type === 'warning' && <AlertCircle className="w-4 h-4" />}
            {config.notifications.type === 'info' && <Info className="w-4 h-4" />}
            <span>{config.notifications.message}</span>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div ref={sidebarRef} id="editor-sidebar" className="bg-white dark:bg-neutral-900 shadow-2xl border-r border-neutral-200 dark:border-neutral-800 z-40 flex flex-col sticky top-0 h-screen" style={{ width: `${sidebarWidth}px` }}>
        <div className="absolute right-0 top-0 w-1 h-full cursor-ew-resize bg-transparent hover:bg-blue-500 transition-colors z-50" onMouseDown={handleMouseDown} />

        {/* Botón modo edición y ayuda */}
        <div id="edit-mode-button" className="p-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex gap-2">
            <button onClick={toggleEditing} className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2
              ${config.isEditing ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white ring-2 ring-green-300' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}>
              <Eye className="w-3.5 h-3.5" />
              {config.isEditing ? "✓ Modo edición activo" : "Activar modo edición"}
            </button>
            <button onClick={tutorial.startTutorial} className="px-2 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-medium transition-all hover:bg-blue-200 dark:hover:bg-blue-800/30 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ayuda</span>
            </button>
          </div>
          {config.isEditing && <p className="text-[10px] text-green-600 dark:text-green-400 text-center mt-1.5">✨ Ahora podés hacer doble clic en cualquier texto para editarlo</p>}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800">
          <button onClick={() => setActiveTab('visual')} className={`flex-1 py-2 text-[11px] font-medium transition-all flex items-center justify-center gap-1.5
            ${activeTab === 'visual' ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'}`}>
            <Palette className="w-3 h-3" /> Diseño visual
          </button>
          <button onClick={() => setActiveTab('presets')} className={`flex-1 py-2 text-[11px] font-medium transition-all flex items-center justify-center gap-1.5
            ${activeTab === 'presets' ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'}`}>
            <Sparkles className="w-3 h-3" /> Presets
          </button>
          <button onClick={() => {
            const currentTemplate = template;
            let previewUrl = `${window.location.origin}${window.location.pathname}?preview=true`;
            if (currentTemplate?.id && !currentTemplate.id.startsWith('temp-')) previewUrl += `&templateId=${currentTemplate.id}`;
            else { alert('⚠️ Debes guardar el template antes de ver la vista previa.\nHaz clic en "Guardar cambios" primero.'); return; }
            window.open(previewUrl, '_blank');
          }} className="px-2 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg text-xs font-medium transition-all hover:bg-purple-200 dark:hover:bg-purple-800/30 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Vista previa</span>
          </button>
        </div>

        {/* Contenido scrollable */}
        <div className="flex-1 overflow-y-auto p-3 min-h-0">
          {activeTab === 'visual' && template && (
            <div className="space-y-2">
              {/* ========== ESTILO DE FUENTE (global) ========== */}
              <SectionAccordion title="Estilo de Fuente" icon={Type} tooltipText="Elige la familia y peso de las fuentes globales">
                <div className="space-y-3">
                  <FontSelect label="Fuente de títulos" value={typography.headingFont} onChange={(f) => updateTypography({ headingFont: f })} />
                  <FontSelect label="Fuente de textos" value={typography.bodyFont} onChange={(f) => updateTypography({ bodyFont: f })} />
                  <SelectInput label="Peso de títulos" value={typography.headingWeight} onChange={(w) => updateTypography({ headingWeight: w })} options={[
                    { value: '400', label: 'Normal' }, { value: '500', label: 'Medium' }, { value: '600', label: 'Semi-bold' }, { value: '700', label: 'Bold' }, { value: '800', label: 'Extra-bold' }
                  ]} />
                  <SelectInput label="Peso de textos" value={typography.bodyWeight} onChange={(w) => updateTypography({ bodyWeight: w })} options={[
                    { value: '300', label: 'Light' }, { value: '400', label: 'Normal' }, { value: '500', label: 'Medium' }, { value: '600', label: 'Semi-bold' }
                  ]} />
                </div>
              </SectionAccordion>

              {/* ========== 1. HEADER ========== */}
              <SectionAccordion scrollToId='home' title="Header" icon={Layout} tooltipText="Personaliza la barra superior">
                {/* Logo */}
                <SectionAccordion title="Logo" icon={Image} tooltipText="Personaliza la imagen, textos, colores y tamaño del logo">
                  <div className="space-y-3">
                    <p className="text-[10px] text-neutral-500">Imagen del logo:</p>
                    <button onClick={() => window.dispatchEvent(new CustomEvent('openImageSelector', { detail: { elementId: 'header_logo' } }))} className="w-full py-2 px-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-medium hover:bg-neutral-200 transition-colors">Seleccionar imagen del logo</button>
                    <TextInput label="Texto parte 1 (KE)" value={template?.texts?.header_brand_1 || 'KE'} onChange={(t) => updateText('header_brand_1', t)} />
                    <TextInput label="Texto parte 2 (Consulting)" value={template?.texts?.header_brand_2 || 'Consulting'} onChange={(t) => updateText('header_brand_2', t)} />
                    <CompactColorInput label="Color del texto 1 (KE)" value={sectionColors.logoTextColor1} onChange={(c) => updateSectionColors({ logoTextColor1: c })} defaultValue={defaultSectionColors.logoTextColor1} inputId="logo-text-color1" />
                    <CompactColorInput label="Color del texto 2 (Consulting)" value={sectionColors.logoTextColor2} onChange={(c) => updateSectionColors({ logoTextColor2: c })} defaultValue={defaultSectionColors.logoTextColor2} inputId="logo-text-color2" />
                    <SelectInput label="Tamaño del texto" value={sectionColors.logoTextSize} onChange={(val) => updateSectionColors({ logoTextSize: val })} options={[
                      { value: 'text-lg', label: 'Pequeño (18px)' }, { value: 'text-xl', label: 'Mediano (20px)' }, { value: 'text-2xl', label: 'Grande (24px)' }, { value: 'text-3xl', label: 'Extra grande (30px)' }
                    ]} />
                    <SizeInput
                      label="Tamaño de navegación (menú)"
                      value={typography.navTextSize ?? ''}
                      onChange={(s) => updateTypography({ navTextSize: s })}
                      options={['0.75rem', '0.875rem', '1rem', '1.125rem', '1.25rem']}
                    />
                    <SizeInput
                      label="Tamaño de botones (CTA)"
                      value={typography.buttonTextSize ?? ''}
                      onChange={(s) => updateTypography({ buttonTextSize: s })}
                      options={['0.75rem', '0.875rem', '1rem', '1.125rem']}
                    />
                  </div>
                </SectionAccordion>

                {/* Colores del Header */}
                <SectionAccordion title="Colores del Header" icon={Palette} tooltipText="Colores de fondo, texto y enlaces">
                  <div className="space-y-3">
                    <CompactColorInput label="Fondo del header" value={sectionColors.headerBackground} onChange={(c) => updateSectionColors({ headerBackground: c })} defaultValue={defaultSectionColors.headerBackground} />
                    <CompactColorInput label="Color de los enlaces" value={sectionColors.headerLinkColor} onChange={(c) => updateSectionColors({ headerLinkColor: c })} defaultValue={defaultSectionColors.headerLinkColor} />
                    <CompactColorInput label="Color de enlaces al pasar mouse" value={sectionColors.headerLinkHoverColor} onChange={(c) => updateSectionColors({ headerLinkHoverColor: c })} defaultValue={defaultSectionColors.headerLinkHoverColor} />
                  </div>
                </SectionAccordion>

                {/* Enlaces de navegación */}
                <SectionAccordion title="Enlaces de navegación" icon={Link} tooltipText="Textos y destinos del menú">
                  <div className="space-y-3">
                    {navLinks.map((link) => (
                      <div key={link.id} className="mb-3 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-medium text-neutral-500">{link.label}</span>
                          <label className="flex items-center gap-1 text-[10px]">
                            <input
                              type="checkbox"
                              checked={template?.texts?.[`show_${link.id}`] !== 'false'} // si es undefined o 'true' → checked
                              onChange={(e) => updateText(`show_${link.id}`, e.target.checked ? 'true' : 'false')}
                              className="w-3 h-3"
                            />
                            <span>Mostrar</span>
                          </label>
                        </div>
                        <TextInput label="Texto" value={template?.texts?.[link.id] || link.defaultText} onChange={(t) => updateText(link.id, t)} />
                        <ComboboxInput label="Destino (enlace)" value={template?.texts?.[`${link.id}_url`] || link.defaultUrl} onChange={(u) => updateText(`${link.id}_url`, u)} options={linkOptions} placeholder="#seccion" />
                      </div>
                    ))}
                  </div>
                </SectionAccordion>

                {/* Botón CTA del header */}
                <SectionAccordion title="Botón CTA del header" icon={Link2} tooltipText="Texto, enlace y colores del botón">
                  <div className="space-y-3">
                    <TextInput label="Texto del botón" value={template?.texts?.header_cta || 'Consultoría gratuita'} onChange={(t) => updateText('header_cta', t)} />
                    <ComboboxInput label="Enlace" value={template?.texts?.header_cta_url || '#contact'} onChange={(u) => updateText('header_cta_url', u)} options={linkOptions} placeholder="/ruta o https://..." />
                    <CompactColorInput label="Color de fondo" value={sectionColors.headerCtaBackground} onChange={(c) => updateSectionColors({ headerCtaBackground: c })} defaultValue={defaultSectionColors.headerCtaBackground} inputId="header-cta-background" />
                    <CompactColorInput label="Color del texto" value={sectionColors.headerCtaText} onChange={(c) => updateSectionColors({ headerCtaText: c })} defaultValue={defaultSectionColors.headerCtaText} inputId="header-cta-text" />
                    <CompactColorInput label="Color al pasar el mouse" value={sectionColors.headerCtaHoverBackground} onChange={(c) => updateSectionColors({ headerCtaHoverBackground: c })} defaultValue={defaultSectionColors.headerCtaHoverBackground} inputId="header-cta-hover" />
                  </div>
                </SectionAccordion>
              </SectionAccordion>

              {/* ========== 2. HERO ========== */}
              <SectionAccordion scrollToId='home' title="Hero (Sección principal)" icon={Eye} tooltipText="Personaliza todo el Hero">
                <div className="space-y-3">
                  {/* Imágenes */}
                  <SectionAccordion title="Imágenes" icon={Image} tooltipText="Cambia la imagen principal del Hero">
                    <div className="space-y-2">
                      <p className="text-[10px] text-neutral-500">Imagen principal:</p>
                      <button onClick={handleHeroImageClick} className="w-full py-2 px-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-medium hover:bg-neutral-200 transition-colors">Seleccionar imagen</button>
                      <p className="text-[9px] text-neutral-400">Haz clic para subir una imagen o elegir de la galería.</p>
                    </div>
                  </SectionAccordion>

                  {/* Textos */}
                  <SectionAccordion title="Textos" icon={Type} tooltipText="Edita todos los textos del Hero">
                    <div className="space-y-2">
                      <TextInput label="Badge" value={template?.texts?.hero_badge || 'Consultoría Estratégica de Negocios'} onChange={(t) => updateText('hero_badge', t)} />
                      <TextInput label="Título (parte 1)" value={template?.texts?.hero_title_1 || 'Impulsamos el'} onChange={(t) => updateText('hero_title_1', t)} />
                      <TextInput label="Título (parte 2)" value={template?.texts?.hero_title_2 || 'Crecimiento Sostenible'} onChange={(t) => updateText('hero_title_2', t)} />
                      <TextInput label="Título (parte 3)" value={template?.texts?.hero_title_3 || 'de tu Empresa'} onChange={(t) => updateText('hero_title_3', t)} />
                      <TextInput label="Descripción" value={template?.texts?.hero_description || 'Análisis profundo...'} onChange={(t) => updateText('hero_description', t)} />
                    </div>
                  </SectionAccordion>

                  {/* Iconos decorativos */}
                  <SectionAccordion title="Iconos decorativos" icon={Smile} tooltipText="Iconos, colores, valores numéricos">
                    <div className="space-y-3">
                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-semibold">📊 Mostrar estadísticas</h4>
                        </div>
                        <div className="flex gap-4 mb-3">
                          <label className="flex items-center gap-1 text-[10px]">
                            <input type="checkbox" checked={template?.texts?.show_stat_1 !== 'false'} onChange={(e) => updateText('show_stat_1', e.target.checked ? 'true' : 'false')} />
                            Indicador 1
                          </label>
                          <label className="flex items-center gap-1 text-[10px]">
                            <input type="checkbox" checked={template?.texts?.show_stat_2 !== 'false'} onChange={(e) => updateText('show_stat_2', e.target.checked ? 'true' : 'false')} />
                            Indicador 2
                          </label>
                          <label className="flex items-center gap-1 text-[10px]">
                            <input type="checkbox" checked={template?.texts?.show_stat_3 !== 'false'} onChange={(e) => updateText('show_stat_3', e.target.checked ? 'true' : 'false')} />
                            Indicador 3
                          </label>
                          <label className="flex items-center gap-1 text-[10px]">
                            <input type="checkbox" checked={template?.texts?.show_stat_4 !== 'false'} onChange={(e) => updateText('show_stat_4', e.target.checked ? 'true' : 'false')} />
                            Indicador 4
                          </label>
                        </div>
                      </div>
                      <IconSelect label="Icono 1 (crecimiento)" value={template?.texts?.hero_icon_1 || 'TrendingUp'} onChange={(val) => updateText('hero_icon_1', val)} options={iconOptions} />
                      <IconSelect label="Icono 2 (equipos)" value={template?.texts?.hero_icon_2 || 'Users'} onChange={(val) => updateText('hero_icon_2', val)} options={iconOptions} />
                      <IconSelect label="Icono 3 (objetivos)" value={template?.texts?.hero_icon_3 || 'Target'} onChange={(val) => updateText('hero_icon_3', val)} options={iconOptions} />
                      <CompactColorInput label="Color iconos" value={sectionColors.iconColor} onChange={(c) => updateSectionColors({ iconColor: c })} defaultValue={defaultSectionColors.iconColor} />
                      <SelectInput label="Tamaño iconos" value={sectionColors.iconSize} onChange={(val) => updateSectionColors({ iconSize: val })} options={[
                        { value: 'w-4 h-4', label: 'Pequeño (16px)' }, { value: 'w-5 h-5', label: 'Mediano (20px)' }, { value: 'w-6 h-6', label: 'Grande (24px)' }, { value: 'w-8 h-8', label: 'Extra grande (32px)' }
                      ]} />
                      <div className="border-t pt-2 mt-2"><h4 className="text-xs font-semibold mb-2">📊 Valores numéricos</h4>
                        <TextInput label="Valor 1" value={template?.texts?.stat_value_1 || '+45%'} onChange={(t) => updateText('stat_value_1', t)} />
                        <TextInput label="Valor 2" value={template?.texts?.stat_value_2 || '+15'} onChange={(t) => updateText('stat_value_2', t)} />
                        <TextInput label="Valor 3" value={template?.texts?.stat_value_3 || '100%'} onChange={(t) => updateText('stat_value_3', t)} />
                        <CompactColorInput label="Color valores" value={sectionColors.statValueColor} onChange={(c) => updateSectionColors({ statValueColor: c })} defaultValue={defaultSectionColors.statValueColor} />
                      </div>
                      <div className="border-t pt-2 mt-2"><h4 className="text-xs font-semibold mb-2">📝 Etiquetas</h4>
                        <TextInput label="Etiqueta 1" value={template?.texts?.stat_label_1 || 'crecimiento'} onChange={(t) => updateText('stat_label_1', t)} />
                        <TextInput label="Etiqueta 2" value={template?.texts?.stat_label_2 || 'equipos'} onChange={(t) => updateText('stat_label_2', t)} />
                        <TextInput label="Etiqueta 3" value={template?.texts?.stat_label_3 || 'objetivos'} onChange={(t) => updateText('stat_label_3', t)} />
                        <CompactColorInput label="Color etiquetas" value={sectionColors.statLabelColor} onChange={(c) => updateSectionColors({ statLabelColor: c })} defaultValue={defaultSectionColors.statLabelColor} />
                      </div>
                    </div>
                  </SectionAccordion>

                  {/* Colores del Hero */}
                  <SectionAccordion title="Colores" icon={Palette} tooltipText="Personaliza los colores del Hero">
                    <div className="space-y-3">
                      <CompactColorInput label="Fondo del Hero" value={sectionColors.heroBackground} onChange={(c) => updateSectionColors({ heroBackground: c })} defaultValue={defaultSectionColors.heroBackground} />
                      <CompactColorInput label="Color del título" value={sectionColors.heroTitleColor} onChange={(c) => updateSectionColors({ heroTitleColor: c })} defaultValue={defaultSectionColors.heroTitleColor} />
                      <CompactColorInput label="Color de la descripción" value={sectionColors.heroDescriptionColor} onChange={(c) => updateSectionColors({ heroDescriptionColor: c })} defaultValue={defaultSectionColors.heroDescriptionColor} />
                      <div className="border-t pt-2"><h4 className="text-xs font-semibold mb-2">✨ Badge</h4>
                        <CompactColorInput label="Fondo del badge" value={sectionColors.heroBadgeBackground} onChange={(c) => updateSectionColors({ heroBadgeBackground: c })} defaultValue={defaultSectionColors.heroBadgeBackground} />
                        <CompactColorInput label="Texto del badge" value={sectionColors.heroBadgeTextColor} onChange={(c) => updateSectionColors({ heroBadgeTextColor: c })} defaultValue={defaultSectionColors.heroBadgeTextColor} />
                      </div>
                    </div>
                  </SectionAccordion>

                  {/* Tipografía específica del Hero */}
                  <SectionAccordion title="Tipografía" icon={Type} tooltipText="Ajusta los tamaños de texto del Hero">
                    <div className="space-y-3">
                      <SizeInput label="Tamaño del título" value={typography.heroTitleSize} onChange={(s) => updateTypography({ heroTitleSize: s })} options={['2rem', '2.5rem', '3rem', '3.5rem', '4rem']} />
                      <SizeInput label="Tamaño de la descripción" value={typography.heroDescriptionSize} onChange={(s) => updateTypography({ heroDescriptionSize: s })} options={['0.875rem', '1rem', '1.125rem', '1.25rem']} />
                    </div>
                  </SectionAccordion>

                  {/* Botones del Hero */}
                  <SectionAccordion title="Botones del Hero" icon={Link} tooltipText="Texto, enlace y colores de los botones">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-semibold">🔵 Botón principal</h4>
                        <label className="flex items-center gap-1 text-[10px]">
                          <input
                            type="checkbox"
                            checked={template?.texts?.show_hero_primary_button !== 'false'}
                            onChange={(e) => updateText('show_hero_primary_button', e.target.checked ? 'true' : 'false')}
                            className="w-3 h-3"
                          />
                          <span>Mostrar</span>
                        </label>
                      </div>
                      <TextInput label="Texto del botón" value={buttons.primary?.text || ''} onChange={(t) => updateButtons({ primary: { ...buttons.primary, text: t } })} />
                      <ComboboxInput label="Enlace" value={buttons.primary?.url || ''} onChange={(u) => updateButtons({ primary: { ...buttons.primary, url: u } })} options={linkOptions} placeholder="/ruta o https://..." />
                      <CompactColorInput label="Color de fondo" value={sectionColors.buttonPrimaryBackground} onChange={(c) => updateSectionColors({ buttonPrimaryBackground: c })} defaultValue={defaultSectionColors.buttonPrimaryBackground} />
                      <CompactColorInput label="Color del texto" value={sectionColors.buttonPrimaryText} onChange={(c) => updateSectionColors({ buttonPrimaryText: c })} defaultValue={defaultSectionColors.buttonPrimaryText} />
                      <CompactColorInput label="Color al pasar el mouse" value={sectionColors.buttonPrimaryHoverBackground} onChange={(c) => updateSectionColors({ buttonPrimaryHoverBackground: c })} defaultValue={defaultSectionColors.buttonPrimaryHoverBackground} />
                    </div>
                    <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-semibold">⚪ Botón secundario</h4>
                        <label className="flex items-center gap-1 text-[10px]">
                          <input
                            type="checkbox"
                            checked={template?.texts?.show_hero_secondary_button !== 'false'}
                            onChange={(e) => updateText('show_hero_secondary_button', e.target.checked ? 'true' : 'false')}
                            className="w-3 h-3"
                          />
                          <span>Mostrar</span>
                        </label>
                      </div>
                      <TextInput label="Texto del botón" value={buttons.secondary?.text || ''} onChange={(t) => updateButtons({ secondary: { ...buttons.secondary, text: t } })} />
                      <ComboboxInput label="Enlace" value={buttons.secondary?.url || ''} onChange={(u) => updateButtons({ secondary: { ...buttons.secondary, url: u } })} options={linkOptions} placeholder="/ruta o https://..." />
                      <CompactColorInput label="Color de fondo (secundario)" value={sectionColors.buttonSecondaryBackground} onChange={(c) => updateSectionColors({ buttonSecondaryBackground: c })} defaultValue={defaultSectionColors.buttonSecondaryBackground} inputId="color-secondary-background" />
                      <CompactColorInput label="Color del texto (secundario)" value={sectionColors.buttonSecondaryText} onChange={(c) => updateSectionColors({ buttonSecondaryText: c })} defaultValue={defaultSectionColors.buttonSecondaryText} inputId="color-secondary-text" />
                      <CompactColorInput label="Color al pasar el mouse (fondo)" value={sectionColors.buttonSecondaryHoverBackground} onChange={(c) => updateSectionColors({ buttonSecondaryHoverBackground: c })} defaultValue={defaultSectionColors.buttonSecondaryHoverBackground} inputId="color-secondary-hover" />
                    </div>
                  </SectionAccordion>
                </div>
              </SectionAccordion>

              {/* ========== 3. SECCIONES SECUNDARIAS ========== */}
              <SectionAccordion scrollToId='services' title="Secciones secundarias" icon={Layout} tooltipText="Personaliza Características, About, Testimonios y Contacto">
                <div className="space-y-3">
                  {/* ===== 3.1 Características / Servicios ===== */}
                  {/* ===== 3.1 Características / Servicios ===== */}
                  <SectionAccordion scrollToId="services" title="Características / Servicios" icon={Sparkles} tooltipText="Personaliza las tarjetas de servicios">
                    <div className="space-y-3">
                      {/* Colores de la sección (ya existentes) */}
                      <h4 className="text-xs font-semibold mb-2">🎨 Colores</h4>
                      <CompactColorInput label="Fondo de sección" value={sectionColors.featuresBackground} onChange={(c) => updateSectionColors({ featuresBackground: c })} defaultValue={defaultSectionColors.featuresBackground} />
                      <CompactColorInput label="Color de títulos" value={sectionColors.featuresTitleColor} onChange={(c) => updateSectionColors({ featuresTitleColor: c })} defaultValue={defaultSectionColors.featuresTitleColor} />
                      <CompactColorInput label="Fondo de tarjetas" value={sectionColors.featuresCardBackground} onChange={(c) => updateSectionColors({ featuresCardBackground: c })} defaultValue={defaultSectionColors.featuresCardBackground} />
                      <CompactColorInput label="Borde de tarjetas" value={sectionColors.featuresCardBorder} onChange={(c) => updateSectionColors({ featuresCardBorder: c })} defaultValue={defaultSectionColors.featuresCardBorder} />
                      <CompactColorInput label="Color de iconos" value={sectionColors.featuresIconColor} onChange={(c) => updateSectionColors({ featuresIconColor: c })} defaultValue={defaultSectionColors.featuresIconColor} />

                      {/* Textos generales de la sección */}
                      <div className="border-t pt-2 mt-2">
                        <h4 className="text-xs font-semibold mb-2">📝 Textos de la sección</h4>
                        <TextInput label="Título principal (parte 1)" value={template?.texts?.features_title_1 || 'Capacidades que'} onChange={(t) => updateText('features_title_1', t)} />
                        <TextInput label="Título principal (parte 2)" value={template?.texts?.features_title_2 || 'Transforman'} onChange={(t) => updateText('features_title_2', t)} />
                        <TextInput label="Descripción" value={template?.texts?.features_description || 'No solo aconsejamos, implementamos...'} onChange={(t) => updateText('features_description', t)} />
                      </div>

                      {/* Gestión de cada tarjeta */}
                      <div className="border-t pt-2 mt-2">
                        <h4 className="text-xs font-semibold mb-2">📦 Tarjetas (hasta 9)</h4>
                        {[
                          { id: 'strategic', label: 'Análisis Estratégico', defaultIcon: 'BarChart' },
                          { id: 'talent', label: 'Gestión del Talento', defaultIcon: 'Users' },
                          { id: 'commercial', label: 'Planificación Comercial', defaultIcon: 'Target' },
                          { id: 'financial', label: 'Optimización Financiera', defaultIcon: 'LineChart' },
                          { id: 'certifications', label: 'Certificaciones y Normas', defaultIcon: 'Award' },
                          { id: 'international', label: 'Expansión Internacional', defaultIcon: 'Globe' },
                          { id: 'extra_1', label: 'Extra 1', defaultIcon: 'BarChart' },
                          { id: 'extra_2', label: 'Extra 2', defaultIcon: 'Users' },
                          { id: 'extra_3', label: 'Extra 3', defaultIcon: 'Target' },
                        ].map((feature, idx) => {
                          const showKey = `show_feature_${feature.id}`;
                          const isVisibleDefault = idx < 6; // primeras 6 visibles por defecto
                          const isVisible = template?.texts?.[showKey] === undefined ? isVisibleDefault : template?.texts?.[showKey] !== 'false';

                          return (
                            <div key={feature.id} className="mb-4 p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium">{feature.label}</span>
                                <label className="flex items-center gap-1 text-[10px]">
                                  <input
                                    type="checkbox"
                                    checked={isVisible}
                                    onChange={(e) => updateText(showKey, e.target.checked ? 'true' : 'false')}
                                    className="w-3 h-3"
                                  />
                                  <span>Mostrar</span>
                                </label>
                              </div>
                              {isVisible && (
                                <>
                                  <IconSelect
                                    label="Icono"
                                    value={template?.texts?.[`feature_icon_${feature.id}`] || feature.defaultIcon}
                                    onChange={(val) => updateText(`feature_icon_${feature.id}`, val)}
                                    options={iconOptions} // reutiliza las opciones del Hero
                                  />
                                  <TextInput
                                    label="Título"
                                    value={template?.texts?.[`feature_title_${feature.id}`] || (feature.id === 'strategic' ? 'Análisis Estratégico' : feature.id === 'talent' ? 'Gestión del Talento' : feature.id === 'commercial' ? 'Planificación Comercial' : feature.id === 'financial' ? 'Optimización Financiera' : feature.id === 'certifications' ? 'Certificaciones y Normas' : feature.id === 'international' ? 'Expansión Internacional' : `Feature Extra ${idx - 5}`)}
                                    onChange={(t) => updateText(`feature_title_${feature.id}`, t)}
                                  />
                                  <TextInput
                                    label="Descripción"
                                    value={template?.texts?.[`feature_desc_${feature.id}`] || (feature.id === 'strategic' ? 'Evaluación profunda de tu mercado...' : feature.id === 'talent' ? 'Desarrollo de equipos de alto rendimiento...' : feature.id === 'commercial' ? 'Estrategias de ventas y marketing...' : feature.id === 'financial' ? 'Mejora de la rentabilidad...' : feature.id === 'certifications' ? 'Asesoramiento para obtener certificaciones...' : feature.id === 'international' ? 'Estrategias para llevar tu negocio a nuevos mercados...' : `Descripción de ${feature.label}`)}
                                    onChange={(t) => updateText(`feature_desc_${feature.id}`, t)}
                                  />
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Tipografía de Características */}
                      <div className="border-t pt-2 mt-2">
                        <h4 className="text-xs font-semibold mb-2">✏️ Tipografía</h4>
                        <SizeInput label="Tamaño del título de sección" value={typography.featuresTitleSize} onChange={(s) => updateTypography({ featuresTitleSize: s })} options={['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem']} />
                        <SizeInput label="Tamaño del título de tarjetas" value={typography.featuresCardTitleSize} onChange={(s) => updateTypography({ featuresCardTitleSize: s })} options={['1.125rem', '1.25rem', '1.5rem', '1.75rem']} />
                        <SizeInput label="Tamaño de la descripción" value={typography.featuresDescriptionSize} onChange={(s) => updateTypography({ featuresDescriptionSize: s })} options={['0.875rem', '1rem', '1.125rem']} />
                      </div>
                    </div>
                  </SectionAccordion>

                  {/* ===== Sobre Nosotros ===== */}
                  <SectionAccordion scrollToId="methodology" title="Sobre Nosotros" icon={Info} tooltipText="Personaliza la sección About">
                    <div className="space-y-3">
                      {/* Colores (igual que antes) */}
                      <h4 className="text-xs font-semibold mb-2">🎨 Colores</h4>
                      <CompactColorInput label="Fondo de sección" value={sectionColors.aboutBackground} onChange={(c) => updateSectionColors({ aboutBackground: c })} defaultValue={defaultSectionColors.aboutBackground} />
                      <CompactColorInput label="Color de títulos" value={sectionColors.aboutTitleColor} onChange={(c) => updateSectionColors({ aboutTitleColor: c })} defaultValue={defaultSectionColors.aboutTitleColor} />
                      <CompactColorInput label="Color de texto" value={sectionColors.aboutTextColor} onChange={(c) => updateSectionColors({ aboutTextColor: c })} defaultValue={defaultSectionColors.aboutTextColor} />
                      <CompactColorInput label="Color del badge" value={sectionColors.aboutBadgeBackground} onChange={(c) => updateSectionColors({ aboutBadgeBackground: c })} defaultValue={defaultSectionColors.aboutBadgeBackground} />
                      <CompactColorInput label="Texto del badge" value={sectionColors.aboutBadgeTextColor} onChange={(c) => updateSectionColors({ aboutBadgeTextColor: c })} defaultValue={defaultSectionColors.aboutBadgeTextColor} />

                      {/* Imagen */}
                      <div className="border-t pt-2 mt-2">
                        <h4 className="text-xs font-semibold mb-2">🖼️ Imagen</h4>
                        <button onClick={() => window.dispatchEvent(new CustomEvent('openImageSelector', { detail: { elementId: 'about_image' } }))} className="w-full py-2 px-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-medium hover:bg-neutral-200 transition-colors">Seleccionar imagen de About</button>
                        <SelectInput label="Borde redondeado de la imagen" value={sectionColors.aboutImageBorderRadius} onChange={(val) => updateSectionColors({ aboutImageBorderRadius: val })} options={[
                          { value: '0rem', label: 'Sin bordes' }, { value: '0.5rem', label: 'Pequeño (8px)' }, { value: '1rem', label: 'Mediano (16px)' }, { value: '1.5rem', label: 'Grande (24px)' }, { value: '9999px', label: 'Completamente redondo' }
                        ]} />
                      </div>

                      {/* Gestión de estadísticas (hasta 8) */}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-semibold">📊 Estadísticas (hasta 8)</h4>
                          <span className="text-[9px] text-neutral-400">Marca/desmarca para mostrar/ocultar</span>
                        </div>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(idx => {
                          const showKey = `show_stat_${idx}`;
                          const isVisibleDefault = idx <= 4;
                          const isVisible = template?.texts?.[showKey] === undefined ? isVisibleDefault : template?.texts?.[showKey] !== 'false';
                          return (
                            <div key={idx} className="mb-3 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-medium">Estadística {idx}</span>
                                <label className="flex items-center gap-1 text-[10px]">
                                  <input type="checkbox" checked={isVisible} onChange={(e) => updateText(showKey, e.target.checked ? 'true' : 'false')} className="w-3 h-3" />
                                  <span>Mostrar</span>
                                </label>
                              </div>
                              {isVisible && (
                                <>
                                  <IconSelect
                                    label="Icono"
                                    value={template?.texts?.[`stat_icon_${idx}`] || (idx === 1 ? 'Briefcase' : idx === 2 ? 'Users' : idx === 3 ? 'Award' : idx === 4 ? 'MapPin' : 'Briefcase')}
                                    onChange={(val) => updateText(`stat_icon_${idx}`, val)}
                                    options={iconOptions}
                                  />
                                  <TextInput label="Valor" value={template?.texts?.[`stat_value_${idx}`] || (idx === 1 ? '15+' : idx === 2 ? '50+' : idx === 3 ? '200+' : idx === 4 ? '10+' : '0')} onChange={(t) => updateText(`stat_value_${idx}`, t)} />
                                  <TextInput label="Etiqueta" value={template?.texts?.[`stat_label_${idx}`] || (idx === 1 ? 'Años de experiencia' : idx === 2 ? 'Consultores expertos' : idx === 3 ? 'Proyectos exitosos' : idx === 4 ? 'Países con presencia' : `Etiqueta ${idx}`)} onChange={(t) => updateText(`stat_label_${idx}`, t)} />
                                </>
                              )}
                            </div>
                          );
                        })}
                        <CompactColorInput label="Color de los valores" value={sectionColors.statValueColor} onChange={(c) => updateSectionColors({ statValueColor: c })} defaultValue={defaultSectionColors.statValueColor} />
                        <CompactColorInput label="Color de las etiquetas" value={sectionColors.statLabelColor} onChange={(c) => updateSectionColors({ statLabelColor: c })} defaultValue={defaultSectionColors.statLabelColor} />
                      </div>

                      {/* Textos editables generales */}
                      <div className="border-t pt-2 mt-2">
                        <h4 className="text-xs font-semibold mb-2">📝 Textos editables</h4>
                        <TextInput label="Badge (sobre nosotros)" value={template?.texts?.about_section_badge || 'Nuestra Firma'} onChange={(t) => updateText('about_section_badge', t)} />
                        <TextInput label="Título (parte 1)" value={template?.texts?.about_heading_1 || 'Consultoría con'} onChange={(t) => updateText('about_heading_1', t)} />
                        <TextInput label="Título (parte 2)" value={template?.texts?.about_heading_2 || 'Resultados Medibles'} onChange={(t) => updateText('about_heading_2', t)} />
                        <TextInput label="Descripción 1" value={template?.texts?.about_description_1 || 'En Kernelize Consulting no creemos en soluciones genéricas...'} onChange={(t) => updateText('about_description_1', t)} />
                        <TextInput label="Descripción 2" value={template?.texts?.about_description_2 || 'Nuestro enfoque combina el rigor analítico con la creatividad...'} onChange={(t) => updateText('about_description_2', t)} />
                      </div>

                      {/* Gestión de diferenciadores (hasta 8) */}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-semibold">✅ Diferenciadores (Lista "Nuestro compromiso")</h4>
                          <span className="text-[9px] text-neutral-400">Marca/desmarca para mostrar/ocultar</span>
                        </div>
                        {[0, 1, 2, 3, 4, 5, 6, 7].map(idx => {
                          const showKey = `show_diff_${idx}`;
                          const isVisibleDefault = idx <= 3;
                          const isVisible = template?.texts?.[showKey] === undefined ? isVisibleDefault : template?.texts?.[showKey] !== 'false';
                          const defaultText = idx === 0 ? 'Metodologías ágiles y adaptativas' : idx === 1 ? 'Análisis de datos para toma de decisiones' : idx === 2 ? 'Acompañamiento post-implementación' : idx === 3 ? 'Confidencialidad y ética profesional' : `Diferenciador ${idx + 1}`;
                          return (
                            <div key={idx} className="mb-3 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-medium">Diferenciador {idx + 1}</span>
                                <label className="flex items-center gap-1 text-[10px]">
                                  <input type="checkbox" checked={isVisible} onChange={(e) => updateText(showKey, e.target.checked ? 'true' : 'false')} className="w-3 h-3" />
                                  <span>Mostrar</span>
                                </label>
                              </div>
                              {isVisible && (
                                <TextInput label="Texto" value={template?.texts?.[`differentiator_${idx}`] || defaultText} onChange={(t) => updateText(`differentiator_${idx}`, t)} />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Tipografía de About */}
                      <div className="border-t pt-2 mt-2">
                        <h4 className="text-xs font-semibold mb-2">✏️ Tipografía</h4>
                        <SizeInput label="Tamaño del título" value={typography.aboutTitleSize} onChange={(s) => updateTypography({ aboutTitleSize: s })} options={['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem']} />
                        <SizeInput label="Tamaño del texto" value={typography.aboutTextSize} onChange={(s) => updateTypography({ aboutTextSize: s })} options={['0.875rem', '1rem', '1.125rem']} />
                        <SizeInput label="Tamaño de valores estadísticos" value={typography.aboutStatsValueSize} onChange={(s) => updateTypography({ aboutStatsValueSize: s })} options={['1rem', '1.25rem', '1.5rem', '1.75rem']} />
                        <SizeInput label="Tamaño de etiquetas estadísticas" value={typography.aboutStatsLabelSize} onChange={(s) => updateTypography({ aboutStatsLabelSize: s })} options={['0.7rem', '0.8rem', '0.875rem', '1rem']} />
                        <SizeInput label="Tamaño de diferenciadores" value={typography.aboutDifferentiatorSize} onChange={(s) => updateTypography({ aboutDifferentiatorSize: s })} options={['0.875rem', '1rem', '1.125rem']} />
                      </div>
                    </div>
                  </SectionAccordion>

                  {/* ===== 3.3 Testimonios ===== */}
                  {/* ===== Testimonios ===== */}
                  {/* ===== Testimonios ===== */}
                  <SectionAccordion scrollToId="testimonials" title="Testimonios" icon={MessageSquare} tooltipText="Personaliza los testimonios de clientes">
                    <div className="space-y-3">
                      {/* Colores (igual que antes) */}
                      <h4 className="text-xs font-semibold mb-2">🎨 Colores</h4>
                      <CompactColorInput label="Fondo de sección" value={sectionColors.testimonialsBackground} onChange={(c) => updateSectionColors({ testimonialsBackground: c })} defaultValue={defaultSectionColors.testimonialsBackground} />
                      <CompactColorInput label="Color de títulos" value={sectionColors.testimonialsTitleColor} onChange={(c) => updateSectionColors({ testimonialsTitleColor: c })} defaultValue={defaultSectionColors.testimonialsTitleColor} />
                      <CompactColorInput label="Color de texto" value={sectionColors.testimonialsTextColor} onChange={(c) => updateSectionColors({ testimonialsTextColor: c })} defaultValue={defaultSectionColors.testimonialsTextColor} />
                      <CompactColorInput label="Fondo de tarjetas" value={sectionColors.testimonialsCardBackground} onChange={(c) => updateSectionColors({ testimonialsCardBackground: c })} defaultValue={defaultSectionColors.testimonialsCardBackground} />
                      <CompactColorInput label="Borde de tarjetas" value={sectionColors.testimonialsCardBorder} onChange={(c) => updateSectionColors({ testimonialsCardBorder: c })} defaultValue={defaultSectionColors.testimonialsCardBorder} />
                      <CompactColorInput label="Color de nombre" value={sectionColors.testimonialsNameColor} onChange={(c) => updateSectionColors({ testimonialsNameColor: c })} defaultValue={defaultSectionColors.testimonialsNameColor} />
                      <CompactColorInput label="Color de rol" value={sectionColors.testimonialsRoleColor} onChange={(c) => updateSectionColors({ testimonialsRoleColor: c })} defaultValue={defaultSectionColors.testimonialsRoleColor} />

                      {/* Textos generales de la sección */}
                      <div className="border-t pt-2 mt-2">
                        <h4 className="text-xs font-semibold mb-2">📝 Textos editables</h4>
                        <TextInput label="Título (parte 1)" value={template?.texts?.testimonials_title_1 || 'Lo que dicen nuestros'} onChange={(t) => updateText('testimonials_title_1', t)} />
                        <TextInput label="Título (parte 2)" value={template?.texts?.testimonials_title_2 || 'clientes'} onChange={(t) => updateText('testimonials_title_2', t)} />
                        <TextInput label="Descripción" value={template?.texts?.testimonials_description || 'Historias reales de transformación empresarial.'} onChange={(t) => updateText('testimonials_description', t)} />
                      </div>

                      {/* Gestión de testimonios (hasta 8) */}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-semibold">📝 Testimonios (hasta 8)</h4>
                          <span className="text-[9px] text-neutral-400">Marca/desmarca para mostrar/ocultar</span>
                        </div>
                        {[
                          { id: 'carlos', label: 'Carlos Méndez' },
                          { id: 'laura', label: 'Laura Fernández' },
                          { id: 'roberto', label: 'Roberto Sánchez' },
                          { id: 'extra_1', label: 'Testimonio extra 1' },
                          { id: 'extra_2', label: 'Testimonio extra 2' },
                          { id: 'extra_3', label: 'Testimonio extra 3' },
                          { id: 'extra_4', label: 'Testimonio extra 4' },
                          { id: 'extra_5', label: 'Testimonio extra 5' }
                        ].map((test, idx) => {
                          const showKey = `show_testimonial_${test.id}`;
                          const isVisibleDefault = idx < 3; // los 3 primeros visibles
                          const isVisible = template?.texts?.[showKey] === undefined ? isVisibleDefault : template?.texts?.[showKey] !== 'false';
                          return (
                            <div key={test.id} className="mb-3 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-medium">{test.label}</span>
                                <label className="flex items-center gap-1 text-[10px]">
                                  <input type="checkbox" checked={isVisible} onChange={(e) => updateText(showKey, e.target.checked ? 'true' : 'false')} className="w-3 h-3" />
                                  <span>Mostrar</span>
                                </label>
                              </div>
                              {isVisible && (
                                <>
                                  <TextInput
                                    label="Nombre"
                                    value={template?.texts?.[`testimonial_name_${test.id}`] || (test.id === 'carlos' ? 'Carlos Méndez' : test.id === 'laura' ? 'Laura Fernández' : test.id === 'roberto' ? 'Roberto Sánchez' : `Testimonio ${idx + 1}`)}
                                    onChange={(t) => updateText(`testimonial_name_${test.id}`, t)}
                                  />
                                  <TextInput
                                    label="Rol"
                                    value={template?.texts?.[`testimonial_role_${test.id}`] || (test.id === 'carlos' ? 'CEO - TechCorp LATAM' : test.id === 'laura' ? 'Directora de Operaciones - Grupo Logístico' : test.id === 'roberto' ? 'Fundador - Inversiones RS' : `Rol ${idx + 1}`)}
                                    onChange={(t) => updateText(`testimonial_role_${test.id}`, t)}
                                  />
                                  <TextInput
                                    label="Contenido"
                                    value={template?.texts?.[`testimonial_content_${test.id}`] || (test.id === 'carlos' ? 'El equipo de Kernelize reestructuró nuestra estrategia comercial...' : test.id === 'laura' ? 'Necesitábamos expandirnos a nuevos mercados...' : test.id === 'roberto' ? 'Contratamos su servicio de planificación financiera...' : `Contenido del testimonio ${idx + 1}`)}
                                    onChange={(t) => updateText(`testimonial_content_${test.id}`, t)}
                                  />
                                  <TextInput
                                    label="Iniciales (letras en el círculo)"
                                    value={template?.texts?.[`testimonial_image_${test.id}`] || (test.id === 'carlos' ? 'CM' : test.id === 'laura' ? 'LF' : test.id === 'roberto' ? 'RS' : `T${idx + 1}`)}
                                    onChange={(t) => updateText(`testimonial_image_${test.id}`, t)}
                                  // maxLength={3}
                                  />
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Indicadores de confianza (hasta 8) */}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-semibold">📊 Indicadores de confianza (hasta 8)</h4>
                          <span className="text-[9px] text-neutral-400">Marca/desmarca para mostrar/ocultar</span>
                        </div>
                        {[
                          { id: 'projects', label: 'Proyectos anuales', defaultIcon: 'Briefcase', defaultVal: '100+', defaultLabel: 'Proyectos anuales' },
                          { id: 'industries', label: 'Industrias diferentes', defaultIcon: 'BarChart', defaultVal: '15', defaultLabel: 'Industrias diferentes' },
                          { id: 'satisfaction', label: 'Tasa de satisfacción', defaultIcon: 'Heart', defaultVal: '98%', defaultLabel: 'Tasa de satisfacción' },
                          { id: 'support', label: 'Soporte a clientes', defaultIcon: 'Clock', defaultVal: '24/7', defaultLabel: 'Soporte a clientes' },
                          { id: 'extra_1', label: 'Indicador extra 1', defaultIcon: 'Briefcase', defaultVal: '0', defaultLabel: 'Indicador extra 1' },
                          { id: 'extra_2', label: 'Indicador extra 2', defaultIcon: 'BarChart', defaultVal: '0', defaultLabel: 'Indicador extra 2' },
                          { id: 'extra_3', label: 'Indicador extra 3', defaultIcon: 'Heart', defaultVal: '0', defaultLabel: 'Indicador extra 3' },
                          { id: 'extra_4', label: 'Indicador extra 4', defaultIcon: 'Clock', defaultVal: '0', defaultLabel: 'Indicador extra 4' }
                        ].map((ind, idx) => {
                          const showKey = `show_indicator_${ind.id}`;
                          const isVisibleDefault = idx < 4; // los 4 primeros visibles
                          const isVisible = template?.texts?.[showKey] === undefined ? isVisibleDefault : template?.texts?.[showKey] !== 'false';
                          return (
                            <div key={ind.id} className="mb-3 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-medium">{ind.label}</span>
                                <label className="flex items-center gap-1 text-[10px]">
                                  <input type="checkbox" checked={isVisible} onChange={(e) => updateText(showKey, e.target.checked ? 'true' : 'false')} className="w-3 h-3" />
                                  <span>Mostrar</span>
                                </label>
                              </div>
                              {isVisible && (
                                <>
                                  <IconSelect
                                    label="Icono"
                                    value={template?.texts?.[`indicator_icon_${ind.id}`] || ind.defaultIcon}
                                    onChange={(val) => updateText(`indicator_icon_${ind.id}`, val)}
                                    options={iconOptions}
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
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Tipografía de Testimonios */}
                      <div className="border-t pt-2 mt-2">
                        <h4 className="text-xs font-semibold mb-2">✏️ Tipografía</h4>
                        <SizeInput label="Tamaño del título de sección" value={typography.testimonialsTitleSize} onChange={(s) => updateTypography({ testimonialsTitleSize: s })} options={['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem']} />
                        <SizeInput label="Tamaño del nombre" value={typography.testimonialsNameSize} onChange={(s) => updateTypography({ testimonialsNameSize: s })} options={['1rem', '1.125rem', '1.25rem']} />
                        <SizeInput label="Tamaño del rol" value={typography.testimonialsRoleSize} onChange={(s) => updateTypography({ testimonialsRoleSize: s })} options={['0.75rem', '0.875rem', '1rem']} />
                        <SizeInput label="Tamaño del texto del testimonio" value={typography.testimonialsTextSize} onChange={(s) => updateTypography({ testimonialsTextSize: s })} options={['0.875rem', '1rem', '1.125rem']} />
                      </div>
                    </div>
                  </SectionAccordion>

                  {/* ===== Contacto ===== */}
                  <SectionAccordion scrollToId="contact" title="Contacto" icon={Mail} tooltipText="Personaliza la sección de contacto">
                    <div className="space-y-3">
                      {/* Colores (existente) */}
                      <h4 className="text-xs font-semibold mb-2">🎨 Colores</h4>
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

                      {/* Cards de contacto (hasta 5: email, phone, location + 2 extras) */}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-semibold">📇 Tarjetas de contacto (Email, Teléfono, Ubicación + extras)</h4>
                          <span className="text-[9px] text-neutral-400">Marca/desmarca para mostrar/ocultar</span>
                        </div>
                        {[
                          { id: 'email', defaultTitle: 'Email', defaultContent: 'consultoria@kernelize.com', defaultIcon: 'Mail', defaultHref: 'mailto:consultoria@kernelize.com' },
                          { id: 'phone', defaultTitle: 'Teléfono', defaultContent: '+54 9 11 6745-7413', defaultIcon: 'Phone', defaultHref: 'tel:+5491167457413' },
                          { id: 'location', defaultTitle: 'Ubicación', defaultContent: 'Buenos Aires, Argentina', defaultIcon: 'MapPin', defaultHref: '#' },
                          { id: 'extra_1', defaultTitle: 'Extra 1', defaultContent: 'Contenido extra 1', defaultIcon: 'Globe', defaultHref: '#' },
                          { id: 'extra_2', defaultTitle: 'Extra 2', defaultContent: 'Contenido extra 2', defaultIcon: 'MessageCircle', defaultHref: '#' },
                        ].map((card, idx) => {
                          const showKey = `show_contact_card_${idx}`;
                          const isVisibleDefault = idx < 3;
                          const isVisible = template?.texts?.[showKey] === undefined ? isVisibleDefault : template?.texts?.[showKey] !== 'false';
                          return (
                            <div key={card.id} className="mb-3 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-medium">Tarjeta {idx + 1}</span>
                                <label className="flex items-center gap-1 text-[10px]">
                                  <input type="checkbox" checked={isVisible} onChange={(e) => updateText(showKey, e.target.checked ? 'true' : 'false')} className="w-3 h-3" />
                                  <span>Mostrar</span>
                                </label>
                              </div>
                              {isVisible && (
                                <>
                                  <IconSelect label="Icono" value={template?.texts?.[`contact_card_${card.id}_icon`] || card.defaultIcon} onChange={(val) => updateText(`contact_card_${card.id}_icon`, val)} options={iconOptions} />
                                  <TextInput label="Título" value={template?.texts?.[`contact_card_${card.id}_title`] || card.defaultTitle} onChange={(t) => updateText(`contact_card_${card.id}_title`, t)} />
                                  <TextInput label="Contenido" value={template?.texts?.[`contact_card_${card.id}_content`] || card.defaultContent} onChange={(t) => updateText(`contact_card_${card.id}_content`, t)} />
                                  <TextInput label="Enlace (href)" value={template?.texts?.[`contact_card_${card.id}_href`] || card.defaultHref} onChange={(u) => updateText(`contact_card_${card.id}_href`, u)} />
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Bloques de horario (principal + 2 extras) */}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-semibold">🕒 Bloques de horario</h4>
                          <span className="text-[9px] text-neutral-400">Solo el principal visible por defecto</span>
                        </div>
                        {[
                          { id: 'main', defaultTitle: 'Horario de atención', defaultLine1: 'Lunes a Viernes: 9:00 - 19:00 hs', defaultLine2: 'Sábados: Reuniones programadas', defaultNote: 'Respuesta garantizada en 12 horas hábiles' },
                          { id: 'extra_1', defaultTitle: 'Horario Extra 1', defaultLine1: 'Línea extra 1', defaultLine2: 'Línea extra 2', defaultNote: 'Nota extra 1' },
                          { id: 'extra_2', defaultTitle: 'Horario Extra 2', defaultLine1: 'Línea extra 1', defaultLine2: 'Línea extra 2', defaultNote: 'Nota extra 2' },
                        ].map((block, idx) => {
                          const showKey = `show_hour_block_${idx}`;
                          const isVisibleDefault = idx === 0;
                          const isVisible = template?.texts?.[showKey] === undefined ? isVisibleDefault : template?.texts?.[showKey] !== 'false';
                          return (
                            <div key={block.id} className="mb-3 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-medium">Bloque {idx + 1}</span>
                                <label className="flex items-center gap-1 text-[10px]">
                                  <input type="checkbox" checked={isVisible} onChange={(e) => updateText(showKey, e.target.checked ? 'true' : 'false')} className="w-3 h-3" />
                                  <span>Mostrar</span>
                                </label>
                              </div>
                              {isVisible && (
                                <>
                                  <IconSelect label="Icono" value={template?.texts?.[`contact_hours_icon_${block.id}`] || 'Briefcase'} onChange={(val) => updateText(`contact_hours_icon_${block.id}`, val)} options={iconOptions} />
                                  <TextInput label="Título" value={template?.texts?.[`contact_hours_title_${block.id}`] || block.defaultTitle} onChange={(t) => updateText(`contact_hours_title_${block.id}`, t)} />
                                  <TextInput label="Línea 1" value={template?.texts?.[`contact_hours_line1_${block.id}`] || block.defaultLine1} onChange={(t) => updateText(`contact_hours_line1_${block.id}`, t)} />
                                  <TextInput label="Línea 2" value={template?.texts?.[`contact_hours_line2_${block.id}`] || block.defaultLine2} onChange={(t) => updateText(`contact_hours_line2_${block.id}`, t)} />
                                  <TextInput label="Nota (opcional)" value={template?.texts?.[`contact_hours_note_${block.id}`] || block.defaultNote} onChange={(t) => updateText(`contact_hours_note_${block.id}`, t)} />
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Textos del formulario (sin cambios) */}
                      <div className="border-t pt-2 mt-2">
                        <h4 className="text-xs font-semibold mb-2">📝 Textos del formulario</h4>
                        <TextInput label="Título" value={template?.texts?.contact_form_title || 'Solicita una reunión de diagnóstico'} onChange={(t) => updateText('contact_form_title', t)} />
                        <TextInput label="Label nombre" value={template?.texts?.contact_label_name || 'Nombre completo *'} onChange={(t) => updateText('contact_label_name', t)} />
                        <TextInput label="Label email" value={template?.texts?.contact_label_email || 'Email corporativo *'} onChange={(t) => updateText('contact_label_email', t)} />
                        <TextInput label="Texto de botón" value={template?.texts?.contact_submit || 'Solicitar reunión'} onChange={(t) => updateText('contact_submit', t)} />
                        <TextInput label="Texto Enviando" value={template?.texts?.contact_sending || 'Enviando...'} onChange={(t) => updateText('contact_sending', t)} />
                        <TextInput label="Título éxito" value={template?.texts?.contact_success_title || '¡Mensaje enviado con éxito!'} onChange={(t) => updateText('contact_success_title', t)} />
                        <TextInput label="Mensaje éxito" value={template?.texts?.contact_success_message || 'En menos de 12 horas hábiles...'} onChange={(t) => updateText('contact_success_message', t)} />
                        <TextInput label="Botón éxito" value={template?.texts?.contact_success_button || 'Enviar otro mensaje'} onChange={(t) => updateText('contact_success_button', t)} />
                      </div>

                      {/* Tipografía de Contacto */}
                      <div className="border-t pt-2 mt-2">
                        <h4 className="text-xs font-semibold mb-2">✏️ Tipografía</h4>
                        <SizeInput label="Tamaño del título de sección" value={typography.contactTitleSize} onChange={(s) => updateTypography({ contactTitleSize: s })} options={['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem']} />
                        <SizeInput label="Tamaño del texto general" value={typography.contactTextSize} onChange={(s) => updateTypography({ contactTextSize: s })} options={['0.875rem', '1rem', '1.125rem']} />
                        <SizeInput label="Tamaño de las etiquetas del formulario" value={typography.contactLabelSize} onChange={(s) => updateTypography({ contactLabelSize: s })} options={['0.75rem', '0.875rem', '1rem']} />
                        <SizeInput label="Tamaño del botón del formulario" value={typography.contactButtonSize} onChange={(s) => updateTypography({ contactButtonSize: s })} options={['0.875rem', '1rem', '1.125rem']} />
                        <SizeInput label="Tamaño de títulos de tarjetas de contacto" value={typography.contactCardTitleSize} onChange={(s) => updateTypography({ contactCardTitleSize: s })} options={['1rem', '1.125rem', '1.25rem', '1.5rem']} />
                      </div>
                    </div>
                  </SectionAccordion>

                  {/* ========== 4. FOOTER ========== */}
                  <SectionAccordion scrollToId="footer" title="Footer" icon={Layout} tooltipText="Personaliza el pie de página">
                    <div className="space-y-3">
                      {/* Logo y marca */}
                      <SectionAccordion title="Logo y marca" icon={Image} tooltipText="Imagen del logo (opcional) e icono alternativo">
                        <div className="space-y-3">
                          <p className="text-[10px] text-neutral-500">Imagen del logo (opcional):</p>
                          <button
                            onClick={() => window.dispatchEvent(new CustomEvent('openImageSelector', { detail: { elementId: 'footer_logo' } }))}
                            className="w-full py-2 px-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-medium hover:bg-neutral-200 transition-colors"
                          >
                            {template?.images?.['footer_logo'] ? 'Cambiar imagen del logo' : 'Seleccionar imagen del logo'}
                          </button>
                          <IconSelect
                            label="Icono alternativo (si no hay imagen)"
                            value={template?.texts?.footer_brand_icon || 'Briefcase'}
                            onChange={(val) => updateText('footer_brand_icon', val)}
                            options={[
                              { value: 'Briefcase', label: 'Maletín', icon: Briefcase },
                              { value: 'Building', label: 'Edificio', icon: Building },
                              { value: 'Star', label: 'Estrella', icon: Star }
                            ]}
                          />
                          <TextInput label="Texto primera parte" value={template?.texts?.footer_brand_1 || 'Kernelize'} onChange={(t) => updateText('footer_brand_1', t)} />
                          <TextInput label="Texto segunda parte" value={template?.texts?.footer_brand_2 || 'Consulting'} onChange={(t) => updateText('footer_brand_2', t)} />
                          <TextInput label="Descripción" value={template?.texts?.footer_description || 'Transformamos empresas...'} onChange={(t) => updateText('footer_description', t)} />
                        </div>
                      </SectionAccordion>

                      {/* Enlaces rápidos (dinámicos) */}
                      <SectionAccordion title="Enlaces rápidos" icon={Link} tooltipText="Textos y destinos de los enlaces">
                        <div className="space-y-3">
                          {[
                            { id: 'home', defaultLabel: 'Inicio', defaultUrl: '#home' },
                            { id: 'services', defaultLabel: 'Servicios', defaultUrl: '#services' },
                            { id: 'methodology', defaultLabel: 'Metodología', defaultUrl: '#methodology' },
                            { id: 'testimonials', defaultLabel: 'Casos de éxito', defaultUrl: '#testimonials' },
                            { id: 'contact', defaultLabel: 'Contacto', defaultUrl: '#contact' },
                            { id: 'extra_1', defaultLabel: 'Enlace Extra 1', defaultUrl: '#' },
                            { id: 'extra_2', defaultLabel: 'Enlace Extra 2', defaultUrl: '#' },
                            { id: 'extra_3', defaultLabel: 'Enlace Extra 3', defaultUrl: '#' },
                          ].map((link, idx) => {
                            const showKey = `show_quicklink_${idx}`;
                            const isVisibleDefault = idx < 5;
                            const isVisible = template?.texts?.[showKey] === undefined ? isVisibleDefault : template?.texts?.[showKey] !== 'false';
                            return (
                              <div key={link.id} className="mb-3 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[10px] font-medium">Enlace {idx + 1}</span>
                                  <label className="flex items-center gap-1 text-[10px]">
                                    <input type="checkbox" checked={isVisible} onChange={(e) => updateText(showKey, e.target.checked ? 'true' : 'false')} className="w-3 h-3" />
                                    <span>Mostrar</span>
                                  </label>
                                </div>
                                {isVisible && (
                                  <>
                                    <TextInput label="Texto" value={template?.texts?.[`quicklink_label_${link.id}`] || link.defaultLabel} onChange={(t) => updateText(`quicklink_label_${link.id}`, t)} />
                                    <ComboboxInput label="Destino" value={template?.texts?.[`quicklink_url_${link.id}`] || link.defaultUrl} onChange={(u) => updateText(`quicklink_url_${link.id}`, u)} options={linkOptions} placeholder="#seccion" />
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </SectionAccordion>

                      {/* Áreas de expertise (dinámicas) */}
                      <SectionAccordion title="Áreas de expertise" icon={Target} tooltipText="Textos de las áreas">
                        <div className="space-y-3">
                          {[
                            { id: 'expertise_1', defaultLabel: 'Estrategia Corporativa' },
                            { id: 'expertise_2', defaultLabel: 'Transformación Digital' },
                            { id: 'expertise_3', defaultLabel: 'Gestión del Talento' },
                            { id: 'expertise_4', defaultLabel: 'Finanzas Corporativas' },
                            { id: 'expertise_5', defaultLabel: 'Expansión Internacional' },
                            { id: 'expertise_6', defaultLabel: 'Innovación' },
                            { id: 'expertise_7', defaultLabel: 'Sostenibilidad' },
                            { id: 'expertise_8', defaultLabel: 'Ciberseguridad' },
                          ].map((area, idx) => {
                            const showKey = `show_expertise_${idx}`;
                            const isVisibleDefault = idx < 5;
                            const isVisible = template?.texts?.[showKey] === undefined ? isVisibleDefault : template?.texts?.[showKey] !== 'false';
                            return (
                              <div key={area.id} className="mb-3 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[10px] font-medium">Área {idx + 1}</span>
                                  <label className="flex items-center gap-1 text-[10px]">
                                    <input type="checkbox" checked={isVisible} onChange={(e) => updateText(showKey, e.target.checked ? 'true' : 'false')} className="w-3 h-3" />
                                    <span>Mostrar</span>
                                  </label>
                                </div>
                                {isVisible && (
                                  <TextInput label="Texto" value={template?.texts?.[`expertise_label_${area.id}`] || area.defaultLabel} onChange={(t) => updateText(`expertise_label_${area.id}`, t)} />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </SectionAccordion>

                      {/* Contacto directo (fijo) */}
                      <SectionAccordion title="Contacto directo" icon={Mail} tooltipText="Iconos y valores de contacto">
                        <TextInput label="Email" value={template?.texts?.footer_contact_email || 'consultoria@kernelize.com'} onChange={(t) => updateText('footer_contact_email', t)} />
                        <TextInput label="Teléfono" value={template?.texts?.footer_contact_phone || '+54 9 11 6745-7413'} onChange={(t) => updateText('footer_contact_phone', t)} />
                        <TextInput label="Ubicación" value={template?.texts?.footer_contact_location || 'Buenos Aires, Argentina'} onChange={(t) => updateText('footer_contact_location', t)} />
                      </SectionAccordion>

                      {/* Copyright y enlaces legales */}
                      <SectionAccordion title="Copyright y legal" icon={FileText} tooltipText="Texto legal y enlaces">
                        <TextInput label="Copyright" value={template?.texts?.footer_copyright || 'Kernelize Consulting. Todos los derechos reservados.'} onChange={(t) => updateText('footer_copyright', t)} />
                        <TextInput label="Texto 'Hecho con'" value={template?.texts?.footer_made_with || 'Hecho con'} onChange={(t) => updateText('footer_made_with', t)} />
                        <TextInput label="Texto 'para empresas'" value={template?.texts?.footer_for || 'para empresas que buscan crecer'} onChange={(t) => updateText('footer_for', t)} />
                        <div className="border-t pt-2 mt-2">
                          <h4 className="text-xs font-semibold mb-2">⚖️ Enlaces legales (siempre visibles)</h4>
                          {[
                            { id: 'terms', defaultLabel: 'Términos y condiciones', defaultUrl: 'https://kernelicepage-production.up.railway.app/terminos' },
                            { id: 'privacy', defaultLabel: 'Política de privacidad', defaultUrl: 'https://kernelicepage-production.up.railway.app/privacidad' },
                            { id: 'cookies', defaultLabel: 'Cookies', defaultUrl: 'https://kernelicepage-production.up.railway.app/contacto' },
                          ].map(link => (
                            <div key={link.id} className="mt-2">
                              <TextInput label={`Etiqueta (${link.id})`} value={template?.texts?.[`legal_label_${link.id}`] || link.defaultLabel} onChange={(t) => updateText(`legal_label_${link.id}`, t)} />
                              <TextInput label={`Enlace (${link.id})`} value={template?.texts?.[`legal_url_${link.id}`] || link.defaultUrl} onChange={(u) => updateText(`legal_url_${link.id}`, u)} />
                            </div>
                          ))}
                        </div>
                      </SectionAccordion>

                      {/* Certificaciones (hasta 8, dinámicas) */}
                      <SectionAccordion title="Certificaciones" icon={Award} tooltipText="Textos de las certificaciones (puedes mostrar/ocultar hasta 8)">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-medium text-neutral-500">Gestionar certificaciones</span>
                            <span className="text-[9px] text-neutral-400">Marca/desmarca para mostrar/ocultar</span>
                          </div>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(idx => {
                            const showKey = `show_certification_${idx}`;
                            const isVisibleDefault = idx <= 4; // las primeras 4 visibles por defecto
                            const isVisible = template?.texts?.[showKey] === undefined ? isVisibleDefault : template?.texts?.[showKey] !== 'false';
                            const defaultText = idx === 1 ? 'ISO 9001:2024' : idx === 2 ? 'Miembro de AACCP' : idx === 3 ? 'Certified Partners' : idx === 4 ? '+15 años de experiencia' : `Certificación ${idx}`;
                            return (
                              <div key={idx} className="mb-3 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[10px] font-medium">Certificación {idx}</span>
                                  <label className="flex items-center gap-1 text-[10px]">
                                    <input type="checkbox" checked={isVisible} onChange={(e) => updateText(showKey, e.target.checked ? 'true' : 'false')} className="w-3 h-3" />
                                    <span>Mostrar</span>
                                  </label>
                                </div>
                                {isVisible && (
                                  <TextInput label="Texto" value={template?.texts?.[`cert_${idx}`] || defaultText} onChange={(t) => updateText(`cert_${idx}`, t)} />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </SectionAccordion>

                      {/* Redes Sociales */}
                      <SectionAccordion title="Redes Sociales" icon={Share2} tooltipText="Configura los enlaces y colores de los íconos sociales">
                        <CompactColorInput label="Color del ícono" value={sectionColors.socialIconColor} onChange={(c) => updateSectionColors({ socialIconColor: c })} defaultValue={defaultSectionColors.socialIconColor} />
                        <CompactColorInput label="Color al pasar mouse" value={sectionColors.socialIconHoverColor} onChange={(c) => updateSectionColors({ socialIconHoverColor: c })} defaultValue={defaultSectionColors.socialIconHoverColor} />
                        <div className="border-t pt-2 mt-2">
                          <h4 className="text-xs font-semibold mb-2">🌐 Mostrar redes sociales</h4>
                          <div className="space-y-2">
                            {['facebook', 'instagram', 'linkedin', 'twitter'].map(social => {
                              const showKey = `show_social_${social}`;
                              const isVisible = template?.texts?.[showKey] !== 'false';
                              return (
                                <div key={social} className="flex items-center justify-between">
                                  <label className="text-[10px] capitalize">{social}</label>
                                  <label className="flex items-center gap-1 text-[10px]">
                                    <input type="checkbox" checked={isVisible} onChange={(e) => updateText(showKey, e.target.checked ? 'true' : 'false')} className="w-3 h-3" />
                                    <span>Mostrar</span>
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                          <div className="mt-2 space-y-2">
                            <TextInput label="Facebook URL" value={template?.texts?.social_facebook_url || ''} onChange={(t) => updateText('social_facebook_url', t)} />
                            <TextInput label="Instagram URL" value={template?.texts?.social_instagram_url || ''} onChange={(t) => updateText('social_instagram_url', t)} />
                            <TextInput label="LinkedIn URL" value={template?.texts?.social_linkedin_url || ''} onChange={(t) => updateText('social_linkedin_url', t)} />
                            <TextInput label="Twitter / X URL" value={template?.texts?.social_twitter_url || ''} onChange={(t) => updateText('social_twitter_url', t)} />
                          </div>
                        </div>
                      </SectionAccordion>

                      {/* Tipografía del Footer */}
                      <div className="border-t pt-2 mt-2">
                        <h4 className="text-xs font-semibold mb-2">✏️ Tipografía</h4>
                        <SizeInput label="Tamaño de los títulos del footer" value={typography.footerHeadingSize} onChange={(s) => updateTypography({ footerHeadingSize: s })} options={['1rem', '1.125rem', '1.25rem', '1.5rem']} />
                        <SizeInput label="Tamaño del texto general" value={typography.footerTextSize} onChange={(s) => updateTypography({ footerTextSize: s })} options={['0.75rem', '0.875rem', '1rem']} />
                        <SizeInput label="Tamaño de los enlaces" value={typography.footerLinkSize} onChange={(s) => updateTypography({ footerLinkSize: s })} options={['0.75rem', '0.875rem', '1rem']} />
                      </div>
                    </div>
                  </SectionAccordion>
                </div>
              </SectionAccordion>
            </div>
          )}

          {activeTab === 'presets' && template && (
            <div className="space-y-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><p className="text-[10px] text-blue-700 dark:text-blue-300 flex items-start gap-1.5"><Info className="w-3 h-3 flex-shrink-0 mt-0.5" />Combinaciones de colores predefinidas para tu template</p></div>
              <div id="presets-section" className="grid grid-cols-2 gap-2">
                {(colorPresets[template.type as keyof typeof colorPresets] || []).map((preset, index) => (
                  <button key={index} onClick={() => applyPreset(preset.name)} className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all text-left group">
                    <div className="flex flex-wrap gap-1 mb-2">{Object.values(preset.colors).map((color, i) => <div key={i} className="w-6 h-6 rounded-full border border-neutral-300 dark:border-neutral-600 shadow-sm" style={{ backgroundColor: color as string }} title={color as string} />)}</div>
                    <p className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300 truncate">{preset.name}</p>
                    <p className="text-[9px] text-neutral-500 dark:text-neutral-400 mt-0.5">Click para aplicar</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Acciones del sidebar */}
        <div className="p-2 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
          <button onClick={handleSave} disabled={isSaving} className={`w-full py-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center justify-center gap-1.5 mb-1.5
            ${hasUnsavedChanges ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md animate-pulse' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'}`}>
            {isSaving ? <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {isSaving ? "Guardando..." : (hasUnsavedChanges ? "¡Guardar cambios!*" : "Guardar cambios")}
          </button>
          <div id="undo-redo-buttons" className="flex gap-1.5 mb-1.5">
            <button onClick={undo} disabled={!canUndo} className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1 ${canUndo ? 'bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" /></svg> Deshacer
            </button>
            <button onClick={redo} disabled={!canRedo} className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1 ${canRedo ? 'bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" /></svg> Rehacer
            </button>
          </div>
          <button onClick={() => resetTemplate(template?.type || 'consulting')} className="w-full py-1.5 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-lg text-[10px] font-medium text-neutral-700 dark:text-neutral-300 transition-all flex items-center justify-center gap-1 mb-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg> Restablecer todo
          </button>
          <div className="flex gap-1.5">
            <button onClick={onHomeClick} className="flex-1 py-1.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1"><Home className="w-3 h-3" /> Inicio</button>
            <button id="finish-button" onClick={handleFinishEditing} disabled={isSaving} className="flex-1 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1"><LogOut className="w-3 h-3" /> {isSaving ? "Guardando..." : "Finalizar edición"}</button>
          </div>
          <button onClick={() => setShowSupportModal(true)} className="w-full mt-1.5 py-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg text-[10px] font-medium text-neutral-600 dark:text-neutral-400 transition-all flex items-center justify-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> Soporte
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