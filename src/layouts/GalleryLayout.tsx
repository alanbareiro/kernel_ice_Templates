// src/layouts/GalleryLayout.tsx
import { ArrowRight, Eye, Heart, Package, Search, Sparkles, Star, X } from 'lucide-react';
import { useState } from 'react';
import { UserHeader } from './UserHeader';

type TemplateCategory = 'todos' | 'landing' | 'ecommerce' | 'enterprise' | 'custom';

interface GalleryLayoutProps {
    templates: any[];
    categories: Array<{ id: string; label: string; icon: any }>;
    onSelectTemplate: (templateId: string) => void;  // ← Cambiado de onViewTemplate
    onBackToOwn: () => void;
    onBackToMyTemplates: () => void;
    onLogout: () => void;
    onLogin: () => void;
    user: any;
    isAuthenticated: boolean;
    favorites: string[];
    onToggleFavorite: (templateId: string, e: React.MouseEvent) => void;
}

export const GalleryLayout = ({
    templates,
    categories,
    onSelectTemplate,
    onBackToOwn,
    onBackToMyTemplates,
    /*user,
    isAuthenticated,*/
    favorites,
    onToggleFavorite
}: GalleryLayoutProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('todos');
    const [showFavorites, setShowFavorites] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = searchTerm === '' ||
            template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'todos' || template.category.includes(selectedCategory);
        const matchesFavorites = !showFavorites || favorites.includes(template.id);
        return matchesSearch && matchesCategory && matchesFavorites;
    });

    const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
    const currentTemplates = filteredTemplates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
            <UserHeader />

            <div className="text-center pt-32 pb-16 px-4">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full mb-6 border border-amber-500/20">
                    <Eye className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                        Modo vista previa
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                    Explora nuestras
                    <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent ml-3">
                        plantillas
                    </span>
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg mb-4">
                    Visualiza nuestras plantillas profesionales. Para editar, regresa a tu plantilla principal.
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={onBackToOwn}
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <Package className="w-5 h-5" />
                        Ver mi plantilla
                    </button>
                    <button
                        onClick={onBackToMyTemplates}
                        className="btn-secondary inline-flex items-center gap-2"
                    >
                        <Sparkles className="w-5 h-5" />
                        Mis plantillas
                    </button>
                </div>
            </div>

            {/* Barra de filtros */}
            <div className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 py-4">
                <div className="container-custom flex flex-col lg:flex-row gap-4 items-center justify-between px-4">
                    <div className="relative w-full lg:w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Buscar plantillas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 dark:text-white border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto justify-center">
                        {categories.map(cat => {
                            const Icon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id as TemplateCategory)}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${selectedCategory === cat.id
                                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md'
                                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setShowFavorites(!showFavorites)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${showFavorites
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                            }`}
                    >
                        <Heart className={`w-4 h-4 ${showFavorites ? 'fill-white' : ''}`} />
                        Favoritos
                        {favorites.length > 0 && (
                            <span className="ml-1 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                                {favorites.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Grid de plantillas */}
            <div className="container-custom px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentTemplates.map(template => (
                        <div
                            key={template.id}
                            onClick={() => onSelectTemplate(template.id)}
                            className="card group hover:shadow-2xl transition-all duration-300 relative overflow-hidden cursor-pointer"
                        >
                            {template.popular && (
                                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                                    <Star className="w-3 h-3 text-white" />
                                    <span className="text-xs font-medium text-white">Popular</span>
                                </div>
                            )}

                            {template.featured && !template.popular && (
                                <div className="absolute top-4 left-4 z-10 bg-primary-500/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 border border-primary-500/20">
                                    <Sparkles className="w-3 h-3 text-white" />
                                    <span className="text-xs font-medium text-white">Destacado</span>
                                </div>
                            )}

                            <div className="relative h-56 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                <img
                                    src={template.images.previews[0]}
                                    alt={template.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <button
                                    onClick={(e) => { e.stopPropagation(); onToggleFavorite(template.id, e); }}
                                    className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-neutral-800/90 rounded-full backdrop-blur-md shadow-sm hover:scale-110 transition-transform"
                                >
                                    <Heart className={`w-4 h-4 ${favorites.includes(template.id) ? 'fill-red-500 text-red-500' : 'text-neutral-600 dark:text-neutral-400'}`} />
                                </button>
                            </div>

                            <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-xl dark:text-white group-hover:text-primary-500 transition-colors">
                                        {template.title}
                                    </h3>
                                    <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-500 dark:text-neutral-400">
                                        {template.category[0]}
                                    </span>
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
                                    {template.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {template.tags?.slice(0, 2).map((tag: string, i: number) => (
                                        <span key={i} className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-500">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center pt-3 border-t border-neutral-200 dark:border-neutral-800">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onSelectTemplate(template.id); }}
                                        className="btn-secondary text-sm px-4 py-2 flex items-center gap-2 group/btn"
                                    >
                                        <span>Ver demo</span>
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                    <span className="text-xs text-neutral-400">
                                        {template.category.includes('ecommerce') ? '🛒 Con tienda' : '📄 Landing'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mensaje informativo */}
                <div className="mt-8 text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        💡 Estás en modo vista previa. Para editar una plantilla, ve a <strong>"Mis plantillas"</strong> o <strong>"Mi plantilla"</strong>.
                    </p>
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-12">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => { setCurrentPage(p => p - 1); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                            className="px-5 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed dark:text-white shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" />
                            Anterior
                        </button>
                        <div className="flex items-center gap-2">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => { setCurrentPage(pageNum); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                                        className={`w-10 h-10 rounded-xl font-medium transition-all ${currentPage === pageNum
                                            ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md'
                                            : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:text-white'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                            className="px-5 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed dark:text-white shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                        >
                            Siguiente
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {filteredTemplates.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-10 h-10 text-neutral-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No se encontraron resultados</h3>
                        <p className="text-neutral-500 mb-6">
                            No hay plantillas que coincidan con "{searchTerm}"
                        </p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory('todos'); setShowFavorites(false); }}
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};