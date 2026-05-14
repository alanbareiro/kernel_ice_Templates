import {
  AlertCircle,
  Award,
  BarChart,
  Briefcase,
  Check,
  Eye,
  Globe,
  Home,
  Info,
  LineChart,
  LogOut,
  Palette,
  Plus,
  Save,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  User,
  Users,
  type LucideIcon
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { templateConfigs, type DynamicListConfig, type FieldConfig } from '../../config/templateConfig';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';
import { useTutorial } from '../../hooks/useTutorial';
import { colorPresets, defaultSectionColors, defaultTypography } from '../../types/template.types';
import { CompactColorInput } from './CompactColorInput';
import { SectionAccordion } from './SectionAccordion';
import { SelectInput } from './SelectInput';
import TutorialOverlay from './TutorialOverlay';

type EditorTab = 'visual' | 'presets';

interface EditorDashboardProps {
  onHomeClick?: () => void;
  userLoggedIn?: boolean;
}

// --- Componentes auxiliares (mantenemos los existentes) ---
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
    const handleMouseUp = () => setIsResizing(false);
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
        notifications: { show: true, message: 'Cambios guardados exitosamente', type: 'success' }
      });
    } catch (error) {
      setEditorConfig({
        notifications: { show: true, message: 'Error al guardar cambios', type: 'error' }
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFinishEditing = async () => {
    if (hasUnsavedChanges) await handleSave();
    if (onHomeClick) onHomeClick();
  };

  const handleSaveToAccount = async () => {
    setIsSaving(true);
    try {
      await saveToBackend();
      setEditorConfig({
        notifications: { show: true, message: 'Template guardado en tu cuenta', type: 'success' }
      });
    } catch (error) {
      setEditorConfig({
        notifications: { show: true, message: 'Error al guardar', type: 'error' }
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Valores por defecto
  const sectionColors = { ...defaultSectionColors, ...(template?.sectionColors || {}) };
  const typography = { ...defaultTypography, ...(template?.typography || {}) };

  const defaultButtonsStructure = {
    primary: { text: 'Solicitar consultoría', url: '/contacto', openInNewTab: false },
    secondary: { text: 'Conocer metodología', url: '#metodologia', openInNewTab: false },
  };
  const buttons = {
    primary: template?.buttons?.primary || defaultButtonsStructure.primary,
    secondary: template?.buttons?.secondary || defaultButtonsStructure.secondary,
  };

  const linkOptions = [
    { value: '#home', label: 'Inicio (#home)' },
    { value: '#services', label: 'Servicios (#services)' },
    { value: '#methodology', label: 'Metodología (#methodology)' },
    { value: '#testimonials', label: 'Testimonios (#testimonials)' },
    { value: '#contact', label: 'Contacto (#contact)' },
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

  // Obtener configuración del template actual
  const templateConfig = template?.type ? templateConfigs[template.type] : null;

  // Helper para renderizar un campo según su tipo
  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case 'color':
        if (field.sectionColorKey) {
          return (
            <CompactColorInput
              key={field.key}
              label={field.label}
              value={sectionColors[field.sectionColorKey] as string}
              onChange={(c) => updateSectionColors({ [field.sectionColorKey!]: c })}
              defaultValue={field.defaultValue}
              inputId={field.key}
            />
          );
        }
        return null;

      case 'text':
        return (
          <TextInput
            key={field.key}
            label={field.label}
            value={template?.texts?.[field.textKey!] || field.defaultValue || ''}
            onChange={(t) => updateText(field.textKey!, t)}
          />
        );

      case 'size':
        if (field.sizeKey) {
          return (
            <SizeInput
              key={field.key}
              label={field.label}
              value={typography[field.sizeKey] as string}
              onChange={(s) => updateTypography({ [field.sizeKey!]: s })}
              options={field.options as string[]}
            />
          );
        }
        if (field.key === 'statValueSize') {
          return (
            <SizeInput
              key={field.key}
              label={field.label}
              value={template?.texts?.statValueSize || field.defaultValue}
              onChange={(s) => updateText('statValueSize', s)}
              options={field.options as string[]}
            />
          );
        }
        if (field.key === 'statLabelSize') {
          return (
            <SizeInput
              key={field.key}
              label={field.label}
              value={template?.texts?.statLabelSize || field.defaultValue}
              onChange={(s) => updateText('statLabelSize', s)}
              options={field.options as string[]}
            />
          );
        }
        // Para tamaños que no están en typography (ej. logoTextSize)
        if (field.key === 'logoTextSize') {
          return (
            <SelectInput
              key={field.key}
              label={field.label}
              value={sectionColors.logoTextSize}
              onChange={(val) => updateSectionColors({ logoTextSize: val })}
              options={field.options as { value: string; label: string }[]}
            />
          );
        }
        if (field.key === 'iconSize') {
          return (
            <SelectInput
              key={field.key}
              label={field.label}
              value={sectionColors.iconSize}
              onChange={(val) => updateSectionColors({ iconSize: val })}
              options={field.options as { value: string; label: string }[]}
            />
          );
        }
        return null;

      case 'font':
        if (field.fontKey) {
          return (
            <FontSelect
              key={field.key}
              label={field.label}
              value={typography[field.fontKey] as string}
              onChange={(f) => updateTypography({ [field.fontKey!]: f })}
            />
          );
        }
        return null;

      case 'icon':
        return (
          <IconSelect
            key={field.key}
            label={field.label}
            value={template?.texts?.[field.iconKey!] || field.defaultValue || ''}
            onChange={(val) => updateText(field.iconKey!, val)}
            options={iconOptions}
          />
        );

      case 'checkbox':
        const isChecked = template?.texts?.[field.checkboxKey!] !== 'false';
        return (
          <div key={field.key} className="flex items-center justify-between py-1">
            <span className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">{field.label}</span>
            <label className="flex items-center gap-1 text-[10px]">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => updateText(field.checkboxKey!, e.target.checked ? 'true' : 'false')}
                className="w-3 h-3"
              />
              <span>Mostrar</span>
            </label>
          </div>
        );

      case 'image':
        const handleImageClick = () => {
          window.dispatchEvent(new CustomEvent('openImageSelector', { detail: { elementId: field.imageElementId } }));
        };
        return (
          <div key={field.key} className="mb-2">
            <p className="text-[10px] text-neutral-500 mb-1">{field.label}</p>
            <button
              onClick={handleImageClick}
              className="w-full py-2 px-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-medium hover:bg-neutral-200 transition-colors"
            >
              {template?.images?.[field.imageElementId!] ? 'Cambiar imagen' : 'Seleccionar imagen'}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // Helper para renderizar una lista dinámica
  const renderDynamicList = (listConfig: DynamicListConfig) => {
    // Obtener la lista actual desde template.texts
    const storedList = template?.texts?.[listConfig.itemKeyPrefix];
    let items: any[] = [];
    try {
      items = storedList ? JSON.parse(storedList) : [];
    } catch (e) {
      items = [];
    }
    // Si está vacía, inicializar con valores por defecto
    if (items.length === 0) {
      if (listConfig.defaultItems && listConfig.defaultItems.length > 0) {
        // Usar los ítems por defecto definidos en la configuración
        items = listConfig.defaultItems.map((item, idx) => ({
          ...item,
          id: `item_${idx}_${Date.now()}_${Math.random()}`
        }));
      } else {
        // Generar ítems con defaultValue
        for (let i = 0; i < listConfig.defaultCount; i++) {
          const newItem: any = {};
          for (const field of listConfig.fields) {
            newItem[field.key] = field.defaultValue;
          }
          newItem.id = `item_${i}_${Date.now()}`;
          items.push(newItem);
        }
      }
    }

    const updateList = (newItems: any[]) => {
      updateText(listConfig.itemKeyPrefix, JSON.stringify(newItems));
    };

    const addItem = () => {
      if (items.length >= listConfig.maxCount) return;
      const newItem: any = {};
      for (const field of listConfig.fields) {
        newItem[field.key] = field.defaultValue;
      }
      newItem.id = `item_${Date.now()}_${Math.random()}`;
      updateList([...items, newItem]);
    };

    const removeItem = (index: number) => {
      const newItems = [...items];
      newItems.splice(index, 1);
      updateList(newItems);
    };

    const updateItemField = (index: number, fieldKey: string, value: any) => {
      const newItems = [...items];
      newItems[index][fieldKey] = value;
      updateList(newItems);
    };

    return (
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={item.id} className="p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded relative group">
            <button
              onClick={() => removeItem(idx)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition"
              title="Eliminar"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            {listConfig.fields.map(field => {
              const value = item[field.key];
              switch (field.type) {
                case 'text':
                  return (
                    <TextInput
                      key={field.key}
                      label={field.label}
                      value={value || ''}
                      onChange={(val) => updateItemField(idx, field.key, val)}
                    />
                  );
                case 'icon':
                  return (
                    <IconSelect
                      key={field.key}
                      label={field.label}
                      value={value || field.defaultValue || ''}
                      onChange={(val) => updateItemField(idx, field.key, val)}
                      options={iconOptions}
                    />
                  );
                case 'checkbox':
                  const isChecked = value !== false;
                  return (
                    <div key={field.key} className="flex items-center justify-between py-1">
                      <span className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">{field.label}</span>
                      <label className="flex items-center gap-1 text-[10px]">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => updateItemField(idx, field.key, e.target.checked)}
                          className="w-3 h-3"
                        />
                        <span>Mostrar</span>
                      </label>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        ))}
        {items.length < listConfig.maxCount && (
          <button
            onClick={addItem}
            className="w-full py-2 mt-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg text-xs font-medium hover:bg-primary-200 transition flex items-center justify-center gap-1"
          >
            <Plus className="w-3 h-3" /> Agregar ítem
          </button>
        )}
      </div>
    );
  };

  // Helper para renderizar un grupo
  // Helper para renderizar un grupo
  const renderGroup = (group: any) => {
    return (
      <SectionAccordion key={group.id} title={group.title} icon={group.icon} tooltipText={`Configura ${group.title}`}>
        {/* Campos estáticos (si los hay) */}
        {group.fields && group.fields.length > 0 && (
          <div className="mb-4 space-y-3">
            {group.fields.map((field: FieldConfig) => renderField(field))}
          </div>
        )}
        {/* Lista dinámica (si existe) */}
        {group.dynamicList && renderDynamicList(group.dynamicList)}
      </SectionAccordion>
    );
  };

  const handleHeroImageClick = () => {
    window.dispatchEvent(new CustomEvent('openImageSelector', { detail: { elementId: 'hero_image' } }));
  };

  // Si no hay configuración para este template, mostrar mensaje
  if (!templateConfig) {
    return (
      <div className="bg-white dark:bg-neutral-900 shadow-2xl border-r border-neutral-200 dark:border-neutral-800 z-40 flex flex-col sticky top-0 h-screen w-80 p-4">
        <div className="text-red-500 text-xs">No hay configuración disponible para el template {template?.type}</div>
      </div>
    );
  }

  return (
    <>
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

        <div id="edit-mode-button" className="p-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex gap-2">
            <button
              onClick={toggleEditing}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2
                ${config.isEditing ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white ring-2 ring-green-300' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}
            >
              <Eye className="w-3.5 h-3.5" />
              {config.isEditing ? "✓ Modo edición activo" : "Activar modo edición"}
            </button>
            <button
              onClick={tutorial.startTutorial}
              className="px-2 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-medium transition-all hover:bg-blue-200 dark:hover:bg-blue-800/30 flex items-center gap-1"
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

        <div className="flex border-b border-neutral-200 dark:border-neutral-800">
          <button
            onClick={() => setActiveTab('visual')}
            className={`flex-1 py-2 text-[11px] font-medium transition-all flex items-center justify-center gap-1.5
              ${activeTab === 'visual' ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
          >
            <Palette className="w-3 h-3" /> Diseño visual
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-2 text-[11px] font-medium transition-all flex items-center justify-center gap-1.5
              ${activeTab === 'presets' ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
          >
            <Sparkles className="w-3 h-3" /> Presets
          </button>
          <button
            onClick={() => {
              const currentTemplate = template;
              let previewUrl = `${window.location.origin}${window.location.pathname}?preview=true`;
              if (currentTemplate?.id && !currentTemplate.id.startsWith('temp-')) previewUrl += `&templateId=${currentTemplate.id}`;
              else { alert('⚠️ Debes guardar el template antes de ver la vista previa.\nHaz clic en "Guardar cambios" primero.'); return; }
              window.open(previewUrl, '_blank');
            }}
            className="px-2 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg text-xs font-medium transition-all hover:bg-purple-200 dark:hover:bg-purple-800/30 flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Vista previa</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 min-h-0">
          {activeTab === 'visual' && template && (
            <div className="space-y-2">
              {templateConfig.sections.map(section => (
                <SectionAccordion
                  key={section.id}
                  scrollToId={section.id === 'hero' ? 'home' : section.id === 'features' ? 'services' : section.id === 'about' ? 'methodology' : section.id === 'testimonials' ? 'testimonials' : section.id === 'contact' ? 'contact' : section.id === 'footer' ? 'footer' : undefined}
                  title={section.title}
                  icon={section.icon}
                  tooltipText={`Personaliza ${section.title}`}
                >
                  {section.groups.map(group => renderGroup(group))}
                </SectionAccordion>
              ))}
            </div>
          )}

          {activeTab === 'presets' && template && (
            <div className="space-y-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-[10px] text-blue-700 dark:text-blue-300 flex items-start gap-1.5">
                  <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  <span>Combinaciones de colores predefinidas para tu template</span>
                </p>
              </div>
              <div id="presets-section" className="grid grid-cols-2 gap-2">
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
              {(!colorPresets[template.type as keyof typeof colorPresets] || colorPresets[template.type as keyof typeof colorPresets]?.length === 0) && (
                <div className="text-center py-8">
                  <p className="text-xs text-neutral-500">No hay presets disponibles para este template</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Acciones del sidebar (igual que antes) */}
        <div className="p-2 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full py-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center justify-center gap-1.5 mb-1.5
              ${hasUnsavedChanges ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md animate-pulse' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'}`}
          >
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