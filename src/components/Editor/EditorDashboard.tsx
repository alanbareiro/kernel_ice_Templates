// src/components/Editor/EditorDashboard.tsx
import {
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Eye,
  Home,
  Info,
  LogOut,
  Save,
  Sparkles,
  User
} from 'lucide-react';
import React, { useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';
import { getDefaultTemplateColors } from '../../data/types/templateDefaultColors';
import { useTutorial } from '../../hooks/useTutorial';
import { colorPresets } from '../../types/template.types';
import ColorPicker from './ColorPicker';
import TutorialOverlay from './TutorialOverlay';

interface EditorDashboardProps {
  onHomeClick?: () => void;
  userLoggedIn?: boolean;
}

const EditorDashboard: React.FC<EditorDashboardProps> = ({
  onHomeClick,
  userLoggedIn = false,
}) => {
  const {
    template,
    resetTemplate,
    /*saveDraft,*/
    hasUnsavedChanges,
    undo,
    redo,
    canUndo,
    canRedo,
    applyPreset,
    saveToBackend,
    setEditorConfig
  } = useTemplate();

  const { config, toggleEditing } = useTemplateEditor();
  const [activeTab, setActiveTab] = useState<'colors' | 'texts'>('colors');
  const [isSaving, setIsSaving] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  // Tutorial
  const tutorial = useTutorial();

  const defaultColors = template
    ? getDefaultTemplateColors(template.type)
    : getDefaultTemplateColors('consulting');

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

      {/* Sidebar fijo a la izquierda */}
      <div
        id="editor-sidebar"
        className={`fixed left-0 top-20 h-[calc(100vh-5rem)] bg-white dark:bg-neutral-900 shadow-2xl border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300 z-40 flex flex-col
        ${isCollapsed ? 'w-12' : 'w-72'}`}>

        {/* Header del sidebar */}
        <div className={`px-3 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white flex items-center justify-between
          ${isCollapsed ? 'justify-center' : ''}`}>
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-xs">Editor</h4>
              {hasUnsavedChanges && (
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse"></span>
                  <p className="text-[10px] opacity-90">Sin guardar</p>
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-white/20 transition-colors"
            title={isCollapsed ? 'Expandir editor' : 'Colapsar editor'}
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Contenido del sidebar */}
        {!isCollapsed && (
          <>
            {/* Modo edición toggle con botón de tutorial */}
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

                {/* Botón para ver tutorial otra vez */}
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

            {/* Tabs compactos */}
            <div className="flex border-b border-neutral-200 dark:border-neutral-800">
              <button
                id="colors-tab"
                onClick={() => setActiveTab('colors')}
                className={`flex-1 py-2 text-[11px] font-medium transition-all flex items-center justify-center gap-1.5
                  ${activeTab === 'colors'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
              >
                <Sparkles className="w-3 h-3" />
                Colores
              </button>
              <button
                id="texts-tab"
                onClick={() => setActiveTab('texts')}
                className={`flex-1 py-2 text-[11px] font-medium transition-all flex items-center justify-center gap-1.5
                  ${activeTab === 'texts'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
              >
                <Edit3 className="w-3 h-3" />
                Textos
              </button>
            </div>

            {/* Contenido scrollable */}
            <div className="flex-1 overflow-y-auto p-3">
              {activeTab === 'colors' && template && (
                <div className="space-y-4">
                  {/* Color Picker compacto */}
                  <div className="space-y-2">
                    <ColorPicker colorKey="primary" label="Principal" defaultColor={defaultColors.primary} compact />
                    <ColorPicker colorKey="secondary" label="Secundario" defaultColor={defaultColors.secondary} compact />
                    <ColorPicker colorKey="accent" label="Acento" defaultColor={defaultColors.accent} compact />
                    <ColorPicker colorKey="background" label="Fondo" defaultColor={defaultColors.background} compact />
                    <ColorPicker colorKey="text" label="Texto" defaultColor={defaultColors.text} compact />
                  </div>

                  {/* Presets siempre visibles */}
                  <div id="presets-section" className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-medium text-primary-600 dark:text-primary-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Presets de colores
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {colorPresets[template.type]?.map((preset, index) => (
                        <button
                          key={index}
                          onClick={() => applyPreset(preset.name)}
                          className="p-1.5 bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all text-left"
                        >
                          <div className="flex space-x-1">
                            {Object.values(preset.colors).map((color, i) => (
                              <div
                                key={i}
                                className="w-5 h-5 rounded-full border border-neutral-300 dark:border-neutral-600"
                                style={{ backgroundColor: color as string }}
                                title={color as string}
                              />
                            ))}
                          </div>
                          <p className="text-[9px] text-neutral-500 dark:text-neutral-400 mt-1 truncate">
                            {preset.name}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'texts' && (
                <div className="space-y-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-[10px] text-blue-700 dark:text-blue-300 flex items-start gap-1.5">
                      <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      <span>Doble clic en cualquier texto para editarlo</span>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-center">
                      <p className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">Título principal</p>
                      <p className="text-[9px] text-neutral-400 mt-0.5">doble clic</p>
                    </div>
                    <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-center">
                      <p className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">Descripción</p>
                      <p className="text-[9px] text-neutral-400 mt-0.5">doble clic</p>
                    </div>
                    <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-center">
                      <p className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">Botones CTA</p>
                      <p className="text-[9px] text-neutral-400 mt-0.5">doble clic</p>
                    </div>
                    <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-center">
                      <p className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">Secciones</p>
                      <p className="text-[9px] text-neutral-400 mt-0.5">doble clic</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Acciones del sidebar */}
            <div className="p-2 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
              {/* Botón Guardar */}
              <button
                id="save-button"
                onClick={handleSave}
                disabled={isSaving}
                className={`w-full py-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center justify-center gap-1.5 mb-1.5
                  ${hasUnsavedChanges
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md animate-pulse'
                    : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'}`}
              >
                {isSaving ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                {isSaving ? "Guardando..." : (hasUnsavedChanges ? "¡Guardar cambios!*" : "Guardar cambios")}
              </button>

              {/* Botones deshacer/rehacer */}
              <div id="undo-redo-buttons" className="flex gap-1.5 mb-1.5">
                <button
                  onClick={undo}
                  disabled={!canUndo}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1
                    ${canUndo
                      ? 'bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7v6h6" />
                    <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                  </svg>
                  Deshacer
                </button>
                <button
                  onClick={redo}
                  disabled={!canRedo}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1
                    ${canRedo
                      ? 'bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 7v6h-6" />
                    <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
                  </svg>
                  Rehacer
                </button>
              </div>

              {/* Botón Restablecer */}
              <button
                onClick={() => resetTemplate(template?.type || 'consulting')}
                className="w-full py-1.5 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-lg text-[10px] font-medium text-neutral-700 dark:text-neutral-300 transition-all flex items-center justify-center gap-1 mb-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Restablecer todo
              </button>

              {/* Botones de navegación */}
              <div className="flex gap-1.5">
                <button
                  onClick={onHomeClick}
                  className="flex-1 py-1.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1"
                >
                  <Home className="w-3 h-3" />
                  Inicio
                </button>
                <button
                  id="finish-button"
                  onClick={handleFinishEditing}
                  disabled={isSaving}
                  className="flex-1 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1"
                >
                  <LogOut className="w-3 h-3" />
                  {isSaving ? "Guardando..." : "Finalizar edición"}
                </button>
              </div>

              {/* Soporte */}
              <button
                onClick={() => setShowSupportModal(true)}
                className="w-full mt-1.5 py-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg text-[10px] font-medium text-neutral-600 dark:text-neutral-400 transition-all flex items-center justify-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                Soporte
              </button>

              {userLoggedIn && (
                <button
                  onClick={handleSaveToAccount}
                  disabled={isSaving}
                  className="w-full mt-1.5 py-1 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  {isSaving ? (
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <User className="w-3 h-3" />
                  )}
                  {isSaving ? "Guardando..." : "Guardar en cuenta"}
                </button>
              )}
            </div>
          </>
        )}

        {/* Versión colapsada */}
        {isCollapsed && (
          <div className="flex-1 flex flex-col items-center py-3 gap-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white text-[10px] font-bold">
              E
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setActiveTab('colors')}
                className={`p-1.5 rounded-lg transition-all ${activeTab === 'colors' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : 'text-neutral-500 hover:text-primary-600'}`}
                title="Colores"
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('texts')}
                className={`p-1.5 rounded-lg transition-all ${activeTab === 'texts' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : 'text-neutral-500 hover:text-primary-600'}`}
                title="Textos"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              {hasUnsavedChanges && (
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="p-1.5 rounded-lg transition-all text-amber-500"
                  title="Guardar cambios"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                </button>
              )}
              <button
                onClick={onHomeClick}
                className="p-1.5 rounded-lg transition-all text-neutral-500 hover:text-primary-600"
                title="Inicio"
              >
                <Home className="w-4 h-4" />
              </button>
              <button
                onClick={handleFinishEditing}
                disabled={isSaving}
                className="p-1.5 rounded-lg transition-all text-neutral-500 hover:text-green-600"
                title="Finalizar edición"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Soporte */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-5 max-w-sm w-full shadow-2xl">
            <h3 className="text-base font-semibold mb-2">Soporte</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
              ¿Necesitas ayuda con la edición de tu template?
            </p>
            <div className="space-y-2 mb-4">
              <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">📧 Email</p>
                <p className="text-xs text-neutral-500">soporte@kernelice.com</p>
              </div>
              <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">💬 WhatsApp</p>
                <p className="text-xs text-neutral-500">+54 9 11 1234-5678</p>
              </div>
              <button
                onClick={() => {
                  setShowSupportModal(false);
                  tutorial.startTutorial();
                }}
                className="w-full mt-2 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium flex items-center justify-center gap-1"
              >
                <Info className="w-3 h-3" />
                Ver tutorial otra vez
              </button>
            </div>
            <button
              onClick={() => setShowSupportModal(false)}
              className="w-full py-1.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg text-xs font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditorDashboard;