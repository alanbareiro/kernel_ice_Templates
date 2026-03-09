import {
    AlertCircle,
    AlertTriangle,
    Check,
    Copy,
    Download,
    Edit3,
    Eye,
    Image,
    Info,
    Mail,
    Palette,
    Redo,
    RefreshCw,
    RotateCcw,
    Save,
    Sparkles,
    Type,
    Undo,
    User,
    X
} from 'lucide-react';
import React, { useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';
import { templateService } from '../../services/templateService';
import { colorPresets } from '../../types/template.types';
import ColorPicker from './ColorPicker';

interface EditorPanelProps {
    onSendEmail?: () => void;
    onSaveToUser?: () => void;
    userLoggedIn?: boolean;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
    // onSendEmail,
    onSaveToUser,
    userLoggedIn = false
}) => {
    const {
        template,
        resetTemplate,
        saveDraft,
        exportTemplate,
        hasUnsavedChanges,
        undo,
        redo,
        canUndo,
        canRedo,
        applyPreset,
        // editorConfig,
        setEditorConfig
    } = useTemplate();

    const { config, toggleEditing, toggleEditor } = useTemplateEditor();
    const [activeTab, setActiveTab] = useState<'colors' | 'texts' | 'images' | 'presets'>('colors');
    const [email, setEmail] = useState('');
    const [showEmailModal, setShowEmailModal] = useState(false);
    // const [showPresets, setShowPresets] = useState(false);

    if (!config.showEditor) return null;

    // const NotificationIcon = {
    //     success: Check,
    //     error: AlertCircle,
    //     warning: AlertTriangle,
    //     info: Info
    // };

    const handleSendEmail = async () => {
        if (!template || !email) return;

        try {
            await templateService.sendTemplateByEmail(template, email);
            setShowEmailModal(false);
            setEditorConfig({
                notifications: {
                    show: true,
                    message: 'Template enviado por email',
                    type: 'success'
                }
            });
        } catch (error) {
            setEditorConfig({
                notifications: {
                    show: true,
                    message: 'Error al enviar el email',
                    type: 'error'
                }
            });
        }
    };

    const handleCopyTemplate = () => {
        if (!template) return;

        navigator.clipboard.writeText(JSON.stringify(template, null, 2));
        setEditorConfig({
            notifications: {
                show: true,
                message: 'Template copiado al portapapeles',
                type: 'success'
            }
        });
    };

    return (
        <>
            {/* Notificaciones */}
            {config.notifications && (
                <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] animate-slideDown`}>
                    <div className={`
            flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg
            ${config.notifications.type === 'success' ? 'bg-green-500 text-white' : ''}
            ${config.notifications.type === 'error' ? 'bg-red-500 text-white' : ''}
            ${config.notifications.type === 'warning' ? 'bg-yellow-500 text-white' : ''}
            ${config.notifications.type === 'info' ? 'bg-blue-500 text-white' : ''}
          `}>
                        {config.notifications.type === 'success' && <Check className="w-5 h-5" />}
                        {config.notifications.type === 'error' && <AlertCircle className="w-5 h-5" />}
                        {config.notifications.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                        {config.notifications.type === 'info' && <Info className="w-5 h-5" />}
                        <span>{config.notifications.message}</span>
                    </div>
                </div>
            )}

            {/* Botones flotantes */}
            <div className="fixed right-4 top-24 z-50 flex flex-col space-y-2">
                {/* Indicador de cambios no guardados */}
                {hasUnsavedChanges && (
                    <div className="bg-yellow-500 text-white px-3 py-2 rounded-full text-sm flex items-center shadow-lg animate-pulse">
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Guardando...
                    </div>
                )}

                <button
                    onClick={toggleEditor}
                    className={`p-3 rounded-full shadow-lg transition-all hover:scale-110 ${config.showEditor
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                        } text-white`}
                    title={config.showEditor ? 'Cerrar editor' : 'Abrir editor'}
                >
                    {config.showEditor ? <X className="w-6 h-6" /> : <Edit3 className="w-6 h-6" />}
                </button>

                <button
                    onClick={toggleEditing}
                    className={`p-3 rounded-full shadow-lg transition-all hover:scale-110 ${config.isEditing
                        ? 'bg-green-600 hover:bg-green-700 ring-4 ring-green-300'
                        : 'bg-gray-600 hover:bg-gray-700'
                        } text-white`}
                    title={config.isEditing ? 'Modo edición activado' : 'Activar modo edición'}
                >
                    <Eye className="w-6 h-6" />
                </button>

                {/* Botones de deshacer/rehacer */}
                {config.isEditing && (
                    <>
                        <button
                            onClick={undo}
                            disabled={!canUndo}
                            className={`p-3 rounded-full shadow-lg transition-all ${canUndo
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-gray-400 cursor-not-allowed'
                                } text-white`}
                            title="Deshacer"
                        >
                            <Undo className="w-6 h-6" />
                        </button>
                        <button
                            onClick={redo}
                            disabled={!canRedo}
                            className={`p-3 rounded-full shadow-lg transition-all ${canRedo
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-gray-400 cursor-not-allowed'
                                } text-white`}
                            title="Rehacer"
                        >
                            <Redo className="w-6 h-6" />
                        </button>
                    </>
                )}
            </div>

            {/* Panel de edición */}
            <div className={`fixed right-4 top-48 w-96 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 z-40 ${config.showEditor ? 'translate-x-0' : 'translate-x-full'
                }`}>
                {/* Header */}
                <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-lg">Personalizar Template</h3>
                            <p className="text-sm opacity-90">Modifica colores, textos e imágenes</p>
                        </div>
                        {hasUnsavedChanges && (
                            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                Sin guardar
                            </span>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    <TabButton
                        active={activeTab === 'colors'}
                        onClick={() => setActiveTab('colors')}
                        icon={<Palette className="w-4 h-4" />}
                        label="Colores"
                    />
                    <TabButton
                        active={activeTab === 'presets'}
                        onClick={() => setActiveTab('presets')}
                        icon={<Sparkles className="w-4 h-4" />}
                        label="Presets"
                    />
                    <TabButton
                        active={activeTab === 'texts'}
                        onClick={() => setActiveTab('texts')}
                        icon={<Type className="w-4 h-4" />}
                        label="Textos"
                    />
                    <TabButton
                        active={activeTab === 'images'}
                        onClick={() => setActiveTab('images')}
                        icon={<Image className="w-4 h-4" />}
                        label="Imágenes"
                    />
                </div>

                {/* Contenido */}
                <div className="p-4 max-h-96 overflow-y-auto">
                    {activeTab === 'colors' && (
                        <div className="space-y-4">
                            <ColorPicker colorKey="primary" label="Color Principal" defaultColor="#2563eb" />
                            <ColorPicker colorKey="secondary" label="Color Secundario" defaultColor="#475569" />
                            <ColorPicker colorKey="accent" label="Color de Acento" defaultColor="#1e293b" />
                            <ColorPicker colorKey="background" label="Color de Fondo" defaultColor="#ffffff" />
                            <ColorPicker colorKey="text" label="Color de Texto" defaultColor="#0f172a" />
                        </div>
                    )}

                    {activeTab === 'presets' && template && (
                        <div className="space-y-3">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                Selecciona una combinación de colores predefinida:
                            </p>
                            {colorPresets[template.type]?.map((preset, index) => (
                                <button
                                    key={index}
                                    onClick={() => applyPreset(preset.name)}
                                    className="w-full p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg hover:shadow-md transition-all text-left group"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {preset.name}
                                        </span>
                                        <Copy className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                    </div>
                                    <div className="flex space-x-2">
                                        {Object.values(preset.colors).map((color, i) => (
                                            <div
                                                key={i}
                                                className="w-6 h-6 rounded-full border border-gray-300"
                                                style={{ backgroundColor: color }}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {activeTab === 'texts' && (
                        <div className="space-y-4">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                <p className="text-xs text-blue-700 dark:text-blue-300 flex items-start">
                                    <Info className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>
                                        Hacé <strong>doble clic</strong> sobre cualquier texto en la página para editarlo.
                                        Los textos editables tienen un borde azul al pasar el mouse.
                                    </span>
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <TextElementGuide element="hero_badge" label="Badge" />
                                <TextElementGuide element="hero_title" label="Título principal" />
                                <TextElementGuide element="hero_description" label="Descripción" />
                                <TextElementGuide element="features_title" label="Título servicios" />
                                <TextElementGuide element="cta_button" label="Botón CTA" />
                            </div>
                        </div>
                    )}

                    {activeTab === 'images' && (
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg text-center">
                                <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    Subí tus propias imágenes
                                </p>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                                    Seleccionar imagen
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 text-center">
                                Próximamente: subí imágenes para hero, about y más secciones
                            </p>
                        </div>
                    )}
                </div>

                {/* Acciones */}
                <div className="p-4 bg-gray-50 dark:bg-neutral-800 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <ActionButton
                            onClick={saveDraft}
                            icon={<Save className="w-4 h-4" />}
                            label="Guardar"
                            color="blue"
                        />
                        <ActionButton
                            onClick={exportTemplate}
                            icon={<Download className="w-4 h-4" />}
                            label="Exportar"
                            color="gray"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <ActionButton
                            onClick={() => resetTemplate(template?.type || 'consulting')}
                            icon={<RotateCcw className="w-4 h-4" />}
                            label="Restablecer"
                            color="yellow"
                        />
                        <ActionButton
                            onClick={handleCopyTemplate}
                            icon={<Copy className="w-4 h-4" />}
                            label="Copiar"
                            color="purple"
                        />
                    </div>

                  // Cambiamos la sección de acciones donde está el error:

                    {userLoggedIn ? (
                        <ActionButton
                            onClick={() => {
                                if (onSaveToUser) {
                                    onSaveToUser();
                                } else {
                                    // Si no hay función, mostramos notificación
                                    setEditorConfig({
                                        notifications: {
                                            show: true,
                                            message: 'Función no implementada',
                                            type: 'warning'
                                        }
                                    });
                                }
                            }}
                            icon={<User className="w-4 h-4" />}
                            label="Guardar en cuenta"
                            color="green"
                            fullWidth
                        />
                    ) : (
                        <ActionButton
                            onClick={() => setShowEmailModal(true)}
                            icon={<Mail className="w-4 h-4" />}
                            label="Enviar por email"
                            color="purple"
                            fullWidth
                        />
                    )}
                </div>
            </div>

            {/* Modal de email */}
            {showEmailModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 max-w-md w-full shadow-2xl">
                        <h3 className="text-xl font-bold mb-4">Enviar template</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Ingresá tu email y te enviaremos el template personalizado en formato JSON.
                        </p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800"
                        />
                        <div className="flex space-x-3">
                            <button
                                onClick={handleSendEmail}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all"
                            >
                                Enviar
                            </button>
                            <button
                                onClick={() => setShowEmailModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-all"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// Componente auxiliar para tabs
export const TabButton: React.FC<{
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
}> = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${active
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
    >
        {icon}
        <span>{label}</span>
    </button>
);

// Componente auxiliar para botones de acción
export const ActionButton: React.FC<{
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    color: 'blue' | 'gray' | 'yellow' | 'purple' | 'green';
    fullWidth?: boolean;
}> = ({ onClick, icon, label, color, fullWidth = false }) => {
    const colorClasses = {
        blue: 'bg-blue-600 hover:bg-blue-700 text-white',
        gray: 'bg-gray-600 hover:bg-gray-700 text-white',
        yellow: 'bg-yellow-600 hover:bg-yellow-700 text-white',
        purple: 'bg-purple-600 hover:bg-purple-700 text-white',
        green: 'bg-green-600 hover:bg-green-700 text-white'
    };

    return (
        <button
            onClick={onClick}
            className={`${fullWidth ? 'w-full' : 'flex-1'} px-4 py-2 ${colorClasses[color]} rounded-lg transition-colors flex items-center justify-center space-x-2`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
};

// Componente guía para elementos de texto
export const TextElementGuide: React.FC<{ element: string; label: string }> = ({ element, label }) => (
    <div className="p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg text-xs">
        <div className="font-medium text-gray-900 dark:text-white">{label}</div>
        <div className="text-gray-500 dark:text-gray-400 truncate">{element}</div>
    </div>
);

export default EditorPanel;
