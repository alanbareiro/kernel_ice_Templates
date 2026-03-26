// src/layouts/MyTemplatesLayout.tsx
import { ArrowRight, Edit3, Package, Sparkles } from 'lucide-react';
import { UserHeader } from './UserHeader';

interface MyTemplatesLayoutProps {
    templates: any[];
    onEditTemplate: (templateId: string) => void;
    onBackToOwn: () => void;
    onExploreGallery: () => void;
    onLogout: () => void;
    onLogin: () => void;
    user: any;
    isAuthenticated: boolean;
}

export const MyTemplatesLayout = ({
    templates,
    onEditTemplate,
    onBackToOwn,
    onExploreGallery,
    onLogout,
    onLogin,
    /* user,
     isAuthenticated*/
}: MyTemplatesLayoutProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
            <UserHeader onLogout={onLogout} onLogin={onLogin} />

            <div className="text-center pt-32 pb-16 px-4">
                <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6 border border-purple-500/20">
                    <Package className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        Mis plantillas
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                    Tus plantillas
                    <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent ml-3">
                        personalizadas
                    </span>
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg mb-4">
                    Aquí están todas las plantillas que has guardado en tu cuenta.
                </p>

                <button
                    onClick={onBackToOwn}
                    className="mt-4 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
                >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Volver a mi plantilla principal
                </button>
            </div>

            <div className="container-custom px-4 py-12">
                {templates.length === 0 ? (
                    <div className="text-center py-20">
                        <Package className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No tienes plantillas guardadas</h3>
                        <p className="text-neutral-500 mb-6">
                            Personaliza una plantilla y guárdala en tu cuenta para verla aquí.
                        </p>
                        <button
                            onClick={onExploreGallery}
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <Sparkles className="w-5 h-5" />
                            Explorar plantillas
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                className="card group hover:shadow-2xl transition-all duration-300 relative overflow-hidden cursor-pointer"
                                onClick={() => onEditTemplate(template.id)}
                            >
                                <div className="relative h-48 bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-white text-4xl mb-2">📄</div>
                                        <div className="text-white font-semibold">{template.name}</div>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-xl dark:text-white group-hover:text-primary-500 transition-colors">
                                            {template.name}
                                        </h3>
                                        <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">
                                            v{template.version || 1}
                                        </span>
                                    </div>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
                                        Última edición: {new Date(template.lastEdited || template.createdAt).toLocaleDateString('es-ES')}
                                    </p>
                                    <div className="flex justify-between items-center pt-3 border-t border-neutral-200 dark:border-neutral-800">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onEditTemplate(template.id); }}
                                            className="btn-primary text-sm px-4 py-2 flex items-center gap-2 group/btn"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                            Editar
                                        </button>
                                        <span className="text-xs text-neutral-400">
                                            {template.type?.toLowerCase() || 'Personalizado'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <button
                        onClick={onExploreGallery}
                        className="btn-secondary inline-flex items-center gap-2"
                    >
                        <Sparkles className="w-5 h-5" />
                        Explorar más plantillas
                    </button>
                </div>
            </div>
        </div>
    );
};