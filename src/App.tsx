import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { templateImages } from './data/templateImages';
import './index.css';
import BaseLayout from './layouts/BaseLayout';
import LoginPage from './pages/LoginPage';
import { ArrowRight, Grid3X3, Heart, LayoutGrid, Search, Sparkles, Star, X } from 'lucide-react';

// --- 1. LAZY LOADING ---
const AccountingLanding = lazy(() => import('./templates/Accounting/AccountingLanding'));
const ArchitectureLanding = lazy(() => import('./templates/Architecture/ArchitectureLanding'));
const BakeryLanding = lazy(() => import('./templates/Bakery/BakeryLanding'));
const BeautySalonLanding = lazy(() => import('./templates/BeautySalon/SalonLanding'));
const CateringLanding = lazy(() => import('./templates/Catering/CateringLanding'));
const CleaningServiceLanding = lazy(() => import('./templates/CleaningService/CleaningLanding'));
const CoffeeShopLanding = lazy(() => import('./templates/CoffeeShop/CoffeeLanding'));
const ConsultingLanding = lazy(() => import('./templates/Consulting/ConsultingLanding'));
const DigitalAgencyLanding = lazy(() => import('./templates/DigitalAgency/DigitalLanding'));
const FashionStoreLanding = lazy(() => import('./templates/FashionStore/FashionLanding'));
const FoodTruckLanding = lazy(() => import('./templates/FoodTruck/FoodTruckLanding'));
const GymLanding = lazy(() => import('./templates/Gym/GymLanding'));
const LawFirmLanding = lazy(() => import('./templates/LawFirm/LawFirmLanding'));
const MarketingAgencyLanding = lazy(() => import('./templates/MarketingAgency/AgencyLanding'));
const MedicalClinicLanding = lazy(() => import('./templates/MedicalClinic/MedicalLanding'));
const RealEstateLanding = lazy(() => import('./templates/RealEstate/RealEstateLanding'));
const RestaurantLanding = lazy(() => import('./templates/Restaurant/RestaurantLanding'));
const SaaSlanding = lazy(() => import('./templates/SaaS/SaaSlanding'));
const StartupLanding = lazy(() => import('./templates/Startup/StartupLanding'));

type TemplateType = 'home' | 'consulting' | 'catering' | 'accounting' | 'restaurant' | 'lawFirm' | 'medical' | 'architecture' | 'marketingAgency' | 'coffeeShop' | 'bakery' | 'foodTruck' | 'beautySalon' | 'gym' | 'realEstate' | 'fashion' | 'cleaning' | 'saas' | 'digitalAgency' | 'startup';
type TemplateCategory = 'todos' | 'landing' | 'ecommerce' | 'enterprise' | 'custom';

interface TemplateInfo {
  id: TemplateType;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  color: string;
  category: TemplateCategory[];
  tags: string[];
  featured: boolean;
  popular: boolean;
  images: { hero: string; previews: string[] };
}

// --- 2. COMPONENTE SKELETON MEJORADO ---
const SkeletonCard = () => (
  <div className="card group hover:shadow-2xl transition-all duration-300 relative overflow-hidden animate-pulse">
    <div className="h-56 bg-neutral-200 dark:bg-neutral-800" />
    <div className="p-5 space-y-3">
      <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
      <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
      <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-5/6" />
      <div className="flex justify-between pt-3 mt-2">
        <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4" />
        <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4" />
      </div>
    </div>
  </div>
);

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get('token');

  // Guardar token si viene en la URL
  useEffect(() => {
    if (tokenFromUrl) {
      localStorage.setItem('token', tokenFromUrl);
      // Limpiar URL sin recargar
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [tokenFromUrl]);

  const [currentTemplate, setCurrentTemplate] = useState<TemplateType | 'home'>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('todos');
  const [showFavorites, setShowFavorites] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [favorites, setFavorites] = useState<TemplateType[]>(() => {
    const saved = localStorage.getItem('favoriteTemplates');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const templatesInfo: TemplateInfo[] = [
    { id: 'consulting', title: 'Consultoría', description: 'Diseño profesional para servicios de consultoría.', icon: '📊', gradient: 'from-blue-500 to-blue-600', color: 'blue', category: ['landing'], tags: ['negocios', 'profesional'], featured: true, popular: true, images: templateImages.consulting },
    { id: 'catering', title: 'Catering', description: 'Estilo vibrante para servicios gastronómicos.', icon: '🍽️', gradient: 'from-amber-500 to-orange-500', color: 'amber', category: ['landing', 'ecommerce'], tags: ['gastronomía', 'eventos'], featured: true, popular: true, images: templateImages.catering },
    { id: 'accounting', title: 'Contaduría', description: 'Diseño formal para estudios contables.', icon: '🧾', gradient: 'from-emerald-500 to-emerald-600', color: 'emerald', category: ['landing'], tags: ['finanzas', 'contable'], featured: false, popular: false, images: templateImages.accounting },
    { id: 'restaurant', title: 'Restaurant', description: 'Diseño cálido para restaurantes.', icon: '🍝', gradient: 'from-red-500 to-red-600', color: 'red', category: ['landing', 'ecommerce'], tags: ['gastronomía', 'comida'], featured: true, popular: true, images: templateImages.restaurant },
    { id: 'lawFirm', title: 'Bufete de Abogados', description: 'Diseño elegante para estudios jurídicos.', icon: '⚖️', gradient: 'from-stone-600 to-stone-700', color: 'stone', category: ['landing'], tags: ['legal', 'derecho'], featured: false, popular: false, images: templateImages.lawFirm },
    { id: 'medical', title: 'Clínica Médica', description: 'Diseño limpio para centros de salud.', icon: '🏥', gradient: 'from-teal-500 to-teal-600', color: 'teal', category: ['landing'], tags: ['salud', 'médico'], featured: true, popular: false, images: templateImages.medical },
    { id: 'architecture', title: 'Arquitectura', description: 'Diseño moderno para estudios de arquitectura.', icon: '🏛️', gradient: 'from-stone-500 to-stone-600', color: 'stone', category: ['landing'], tags: ['arquitectura', 'diseño'], featured: false, popular: false, images: templateImages.architecture },
    { id: 'marketingAgency', title: 'Agencia de Marketing', description: 'Diseño creativo para agencias.', icon: '📈', gradient: 'from-purple-500 to-purple-600', color: 'purple', category: ['landing', 'custom'], tags: ['marketing', 'publicidad'], featured: true, popular: true, images: templateImages.marketingAgency },
    { id: 'coffeeShop', title: 'Cafetería', description: 'Diseño acogedor para coffee shops.', icon: '☕', gradient: 'from-amber-600 to-amber-700', color: 'amber', category: ['landing', 'ecommerce'], tags: ['café', 'desayunos'], featured: true, popular: true, images: templateImages.coffeeShop },
    { id: 'bakery', title: 'Panadería', description: 'Diseño dulce para panaderías.', icon: '🥐', gradient: 'from-rose-500 to-rose-600', color: 'rose', category: ['landing', 'ecommerce'], tags: ['panadería', 'dulces'], featured: false, popular: false, images: templateImages.bakery },
    { id: 'foodTruck', title: 'Food Truck', description: 'Diseño urbano para food trucks.', icon: '🚚', gradient: 'from-orange-500 to-orange-600', color: 'orange', category: ['landing'], tags: ['comida callejera', 'rápido'], featured: false, popular: false, images: templateImages.foodTruck },
    { id: 'beautySalon', title: 'Salón de Belleza', description: 'Diseño elegante para salones.', icon: '💅', gradient: 'from-pink-500 to-pink-600', color: 'pink', category: ['landing'], tags: ['belleza', 'spa'], featured: true, popular: false, images: templateImages.beautySalon },
    { id: 'gym', title: 'Gimnasio', description: 'Diseño motivador para gimnasios.', icon: '💪', gradient: 'from-orange-500 to-orange-600', color: 'orange', category: ['landing', 'ecommerce'], tags: ['fitness', 'entrenamiento'], featured: false, popular: false, images: templateImages.gym },
    { id: 'realEstate', title: 'Inmobiliaria', description: 'Diseño profesional para bienes raíces.', icon: '🏢', gradient: 'from-emerald-500 to-emerald-600', color: 'emerald', category: ['landing', 'custom'], tags: ['propiedades', 'inmuebles'], featured: true, popular: true, images: templateImages.realEstate },
    { id: 'fashion', title: 'Tienda de Moda', description: 'Diseño moderno para tiendas de ropa.', icon: '👗', gradient: 'from-fuchsia-500 to-fuchsia-600', color: 'fuchsia', category: ['ecommerce'], tags: ['moda', 'ropa'], featured: true, popular: true, images: templateImages.fashion },
    { id: 'cleaning', title: 'Limpieza', description: 'Diseño para servicios de limpieza.', icon: '🧹', gradient: 'from-sky-500 to-sky-600', color: 'sky', category: ['landing'], tags: ['servicios', 'limpieza'], featured: false, popular: false, images: templateImages.cleaning },
    { id: 'saas', title: 'SaaS', description: 'Diseño para software como servicio.', icon: '☁️', gradient: 'from-violet-500 to-violet-600', color: 'violet', category: ['enterprise', 'custom'], tags: ['software', 'tecnología'], featured: true, popular: true, images: templateImages.saas },
    { id: 'digitalAgency', title: 'Agencia Digital', description: 'Diseño innovador para agencias digitales.', icon: '💻', gradient: 'from-cyan-500 to-cyan-600', color: 'cyan', category: ['enterprise', 'custom'], tags: ['digital', 'tecnología'], featured: false, popular: false, images: templateImages.digitalAgency },
    { id: 'startup', title: 'Startup', description: 'Diseño disruptivo para startups.', icon: '🚀', gradient: 'from-emerald-500 to-emerald-600', color: 'emerald', category: ['enterprise', 'custom'], tags: ['startup', 'innovación'], featured: true, popular: true, images: templateImages.startup }
  ];

  const handleLogout = async () => { await logout(); navigate('/'); };
  const handleLoginClick = () => navigate('/login');
  const handleTemplateSelect = (template: TemplateType) => { window.scrollTo(0, 0); setCurrentTemplate(template); };
  const handleHomeClick = () => setCurrentTemplate('home');

  const toggleFavorite = (templateId: TemplateType, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = favorites.includes(templateId) ? favorites.filter(id => id !== templateId) : [...favorites, templateId];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteTemplates', JSON.stringify(newFavorites));
  };

  const filteredTemplates = templatesInfo.filter(template => {
    const matchesSearch = searchTerm === '' || template.title.toLowerCase().includes(searchTerm.toLowerCase()) || template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'todos' || template.category.includes(selectedCategory);
    const matchesFavorites = !showFavorites || favorites.includes(template.id);
    return matchesSearch && matchesCategory && matchesFavorites;
  });

  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const currentTemplates = filteredTemplates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedCategory, showFavorites]);

  if (currentTemplate !== 'home') {
    const props = { onHomeClick: handleHomeClick };
    return (
      <Suspense fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400 animate-pulse">Cargando template...</p>
        </div>
      }>
        {currentTemplate === 'accounting' && <AccountingLanding {...props} />}
        {currentTemplate === 'architecture' && <ArchitectureLanding {...props} />}
        {currentTemplate === 'bakery' && <BakeryLanding {...props} />}
        {currentTemplate === 'beautySalon' && <BeautySalonLanding {...props} />}
        {currentTemplate === 'catering' && <CateringLanding {...props} />}
        {currentTemplate === 'cleaning' && <CleaningServiceLanding {...props} />}
        {currentTemplate === 'coffeeShop' && <CoffeeShopLanding {...props} />}
        {currentTemplate === 'consulting' && <ConsultingLanding {...props} />}
        {currentTemplate === 'digitalAgency' && <DigitalAgencyLanding {...props} />}
        {currentTemplate === 'fashion' && <FashionStoreLanding {...props} />}
        {currentTemplate === 'foodTruck' && <FoodTruckLanding {...props} />}
        {currentTemplate === 'gym' && <GymLanding {...props} />}
        {currentTemplate === 'lawFirm' && <LawFirmLanding {...props} />}
        {currentTemplate === 'marketingAgency' && <MarketingAgencyLanding {...props} />}
        {currentTemplate === 'medical' && <MedicalClinicLanding {...props} />}
        {currentTemplate === 'realEstate' && <RealEstateLanding {...props} />}
        {currentTemplate === 'restaurant' && <RestaurantLanding {...props} />}
        {currentTemplate === 'saas' && <SaaSlanding {...props} />}
        {currentTemplate === 'startup' && <StartupLanding {...props} />}
      </Suspense>
    );
  }

  const categories = [
    { id: 'todos', label: 'Todos', icon: Grid3X3 },
    { id: 'landing', label: 'Landing Pages', icon: LayoutGrid },
    { id: 'ecommerce', label: 'E-commerce', icon: Sparkles },
    { id: 'enterprise', label: 'Enterprise', icon: Star },
    { id: 'custom', label: 'Custom', icon: Heart }
  ];

  return (
    <BaseLayout>
      <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
        {/* Header con autenticación */}
        <div className="fixed top-6 right-6 z-50">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3 bg-white/90 dark:bg-neutral-800/90 p-2 pl-4 rounded-full shadow-lg backdrop-blur-md border border-neutral-200 dark:border-neutral-700">
              <span className="text-sm font-medium dark:text-white">{user.name || user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-4 py-1.5 rounded-full hover:shadow-md transition-all"
              >
                Salir
              </button>
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="btn-primary text-sm px-5 py-2 flex items-center gap-2 shadow-lg"
            >
              <span>Iniciar sesión</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Hero Section */}
        <div className="text-center pt-32 pb-16 px-4">
          <div className="inline-flex items-center gap-2 bg-primary-500/10 px-4 py-2 rounded-full mb-6 border border-primary-500/20">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">+50 plantillas profesionales</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Elige tu
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent ml-3">
              plantilla ideal
            </span>
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
            Diseños modernos y profesionales listos para tu negocio. Personaliza, adapta y lanza tu sitio web en minutos.
          </p>
        </div>

        {/* Barra de filtros mejorada */}
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
            {isInitialLoading ? (
              [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
            ) : (
              currentTemplates.map(template => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isFavorite={favorites.includes(template.id)}
                  onToggleFavorite={toggleFavorite}
                  onSelect={() => handleTemplateSelect(template.id)}
                />
              ))
            )}
          </div>

          {/* Paginación mejorada */}
          {totalPages > 1 && !isInitialLoading && (
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

          {!isInitialLoading && filteredTemplates.length === 0 && (
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

        {/* CTA Final */}
        <div className="gradient-bg rounded-3xl mx-4 sm:mx-6 lg:mx-auto container-custom mb-16 p-8 md:p-12 text-center">
          <h3 className="heading-3 text-gradient mb-4">¿No encuentras lo que buscas?</h3>
          <p className="text-neutral-600 dark:text-primary-400 max-w-2xl mx-auto mb-6">
            Creamos diseños personalizados adaptados a las necesidades específicas de tu negocio.
          </p>
          <button
            onClick={() => window.location.href = '/contacto'}
            className="btn-primary inline-flex items-center gap-2 group"
          >
            <span>Solicitar diseño personalizado</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </BaseLayout>
  );
}

// --- 3. TEMPLATE CARD MEJORADA ---
const TemplateCard = ({ template, isFavorite, onToggleFavorite, onSelect }: any) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      onClick={onSelect}
      className="card group hover:shadow-2xl transition-all duration-300 relative overflow-hidden cursor-pointer"
    >
      {/* Badge de popularidad */}
      {template.popular && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
          <Star className="w-3 h-3 text-white" />
          <span className="text-xs font-medium text-white">Popular</span>
        </div>
      )}

      {/* Badge de featured */}
      {template.featured && !template.popular && (
        <div className="absolute top-4 left-4 z-10 bg-primary-500/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 border border-primary-500/20">
          <Sparkles className="w-3 h-3 text-white" />
          <span className="text-xs font-medium text-white">Destacado</span>
        </div>
      )}

      {/* Imagen */}
      <div className="relative h-56 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={template.images.previews[0]}
          alt={template.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Overlay en hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Botón de favorito */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(template.id, e); }}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-neutral-800/90 rounded-full backdrop-blur-md shadow-sm hover:scale-110 transition-transform"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-neutral-600 dark:text-neutral-400'}`} />
        </button>
      </div>

      {/* Contenido */}
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
          {template.tags.slice(0, 2).map((tag: string, i: number) => (
            <span key={i} className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-500">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-neutral-200 dark:border-neutral-800">
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
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
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}