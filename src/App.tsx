import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { templateImages } from './data/templateImages';
import './index.css';
import BaseLayout from './layouts/BaseLayout';
import LoginPage from './pages/LoginPage';

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

// Tipado
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

// --- 2. COMPONENTE SKELETON (Para cuando carga la página) ---
const SkeletonCard = () => (
  <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border dark:border-neutral-800 animate-pulse">
    <div className="h-48 bg-neutral-200 dark:bg-neutral-800" />
    <div className="p-4 space-y-3">
      <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
      <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
      <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-5/6" />
      <div className="flex justify-between pt-2">
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4" />
      </div>
    </div>
  </div>
);

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [currentTemplate, setCurrentTemplate] = useState<TemplateType | 'home'>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('todos');
  const [showFavorites, setShowFavorites] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true); // Nuevo estado de carga inicial
  const [favorites, setFavorites] = useState<TemplateType[]>(() => {
    const saved = localStorage.getItem('favoriteTemplates');
    return saved ? JSON.parse(saved) : [];
  });

  // Simular una carga inicial fluida
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const templatesInfo: TemplateInfo[] = [
    { id: 'consulting', title: 'Consultoría', description: 'Diseño profesional para servicios de consultoría.', icon: '📊', gradient: 'from-blue-600 to-blue-800', color: 'blue', category: ['landing'], tags: ['negocios', 'profesional'], featured: true, popular: true, images: templateImages.consulting },
    { id: 'catering', title: 'Catering', description: 'Estilo vibrante para servicios gastronómicos.', icon: '🍽️', gradient: 'from-amber-500 to-orange-600', color: 'amber', category: ['landing', 'ecommerce'], tags: ['gastronomía', 'eventos'], featured: true, popular: true, images: templateImages.catering },
    { id: 'accounting', title: 'Contaduría', description: 'Diseño formal para estudios contables.', icon: '🧾', gradient: 'from-emerald-600 to-emerald-800', color: 'emerald', category: ['landing'], tags: ['finanzas', 'contable'], featured: false, popular: false, images: templateImages.accounting },
    { id: 'restaurant', title: 'Restaurant', description: 'Diseño cálido para restaurantes.', icon: '🍝', gradient: 'from-red-600 to-red-800', color: 'red', category: ['landing', 'ecommerce'], tags: ['gastronomía', 'comida'], featured: true, popular: true, images: templateImages.restaurant },
    { id: 'lawFirm', title: 'Bufete de Abogados', description: 'Diseño elegante para estudios jurídicos.', icon: '⚖️', gradient: 'from-stone-700 to-stone-900', color: 'stone', category: ['landing'], tags: ['legal', 'derecho'], featured: false, popular: false, images: templateImages.lawFirm },
    { id: 'medical', title: 'Clínica Médica', description: 'Diseño limpio para centros de salud.', icon: '🏥', gradient: 'from-teal-500 to-teal-700', color: 'teal', category: ['landing'], tags: ['salud', 'médico'], featured: true, popular: false, images: templateImages.medical },
    { id: 'architecture', title: 'Arquitectura', description: 'Diseño moderno para estudios de arquitectura.', icon: '🏛️', gradient: 'from-stone-600 to-stone-800', color: 'stone', category: ['landing'], tags: ['arquitectura', 'diseño'], featured: false, popular: false, images: templateImages.architecture },
    { id: 'marketingAgency', title: 'Agencia de Marketing', description: 'Diseño creativo para agencias.', icon: '📈', gradient: 'from-purple-500 to-purple-700', color: 'purple', category: ['landing', 'custom'], tags: ['marketing', 'publicidad'], featured: true, popular: true, images: templateImages.marketingAgency },
    { id: 'coffeeShop', title: 'Cafetería', description: 'Diseño acogedor para coffee shops.', icon: '☕', gradient: 'from-amber-700 to-amber-900', color: 'amber', category: ['landing', 'ecommerce'], tags: ['café', 'desayunos'], featured: true, popular: true, images: templateImages.coffeeShop },
    { id: 'bakery', title: 'Panadería', description: 'Diseño dulce para panaderías.', icon: '🥐', gradient: 'from-rose-500 to-rose-700', color: 'rose', category: ['landing', 'ecommerce'], tags: ['panadería', 'dulces'], featured: false, popular: false, images: templateImages.bakery },
    { id: 'foodTruck', title: 'Food Truck', description: 'Diseño urbano para food trucks.', icon: '🚚', gradient: 'from-orange-500 to-orange-700', color: 'orange', category: ['landing'], tags: ['comida callejera', 'rápido'], featured: false, popular: false, images: templateImages.foodTruck },
    { id: 'beautySalon', title: 'Salón de Belleza', description: 'Diseño elegante para salones.', icon: '💅', gradient: 'from-pink-500 to-pink-700', color: 'pink', category: ['landing'], tags: ['belleza', 'spa'], featured: true, popular: false, images: templateImages.beautySalon },
    { id: 'gym', title: 'Gimnasio', description: 'Diseño motivador para gimnasios.', icon: '💪', gradient: 'from-orange-600 to-orange-800', color: 'orange', category: ['landing', 'ecommerce'], tags: ['fitness', 'entrenamiento'], featured: false, popular: false, images: templateImages.gym },
    { id: 'realEstate', title: 'Inmobiliaria', description: 'Diseño profesional para bienes raíces.', icon: '🏢', gradient: 'from-emerald-600 to-emerald-800', color: 'emerald', category: ['landing', 'custom'], tags: ['propiedades', 'inmuebles'], featured: true, popular: true, images: templateImages.realEstate },
    { id: 'fashion', title: 'Tienda de Moda', description: 'Diseño moderno para tiendas de ropa.', icon: '👗', gradient: 'from-fuchsia-500 to-fuchsia-700', color: 'fuchsia', category: ['ecommerce'], tags: ['moda', 'ropa'], featured: true, popular: true, images: templateImages.fashion },
    { id: 'cleaning', title: 'Limpieza', description: 'Diseño para servicios de limpieza.', icon: '🧹', gradient: 'from-sky-500 to-sky-700', color: 'sky', category: ['landing'], tags: ['servicios', 'limpieza'], featured: false, popular: false, images: templateImages.cleaning },
    { id: 'saas', title: 'SaaS', description: 'Diseño para software como servicio.', icon: '☁️', gradient: 'from-violet-500 to-violet-700', color: 'violet', category: ['enterprise', 'custom'], tags: ['software', 'tecnología'], featured: true, popular: true, images: templateImages.saas },
    { id: 'digitalAgency', title: 'Agencia Digital', description: 'Diseño innovador para agencias digitales.', icon: '💻', gradient: 'from-cyan-500 to-cyan-700', color: 'cyan', category: ['enterprise', 'custom'], tags: ['digital', 'tecnología'], featured: false, popular: false, images: templateImages.digitalAgency },
    { id: 'startup', title: 'Startup', description: 'Diseño disruptivo para startups.', icon: '🚀', gradient: 'from-emerald-500 to-emerald-700', color: 'emerald', category: ['enterprise', 'custom'], tags: ['startup', 'innovación'], featured: true, popular: true, images: templateImages.startup }
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
        <div className="h-screen flex flex-col items-center justify-center dark:bg-neutral-900">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="animate-pulse text-blue-500 font-bold">Cargando Template...</p>
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
    { id: 'todos', label: 'Todos', icon: '🔍' },
    { id: 'landing', label: 'Landings', icon: '📄' },
    { id: 'ecommerce', label: 'E-commerce', icon: '🛒' },
    { id: 'enterprise', label: 'Enterprise', icon: '🏢' },
    { id: 'custom', label: 'Custom', icon: '⚙️' }
  ];

  return (
    <BaseLayout>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <div className="fixed top-4 right-4 z-50">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3 bg-white/90 dark:bg-neutral-800/90 p-2 pl-4 rounded-full shadow-lg backdrop-blur-md">
              <span className="text-sm font-medium dark:text-white">{user.email}</span>
              <button onClick={handleLogout} className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full">Salir</button>
            </div>
          ) : (
            <button onClick={handleLoginClick} className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">Entrar</button>
          )}
        </div>

        <div className="pt-24 pb-12 text-center container-custom">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 mt-10">Kernelice Templates</h1>
          <p className="text-neutral-500 max-w-2xl mx-auto px-4 text-sm md:text-base">Selecciona el diseño ideal para tu negocio y lánzalo hoy mismo.</p>
        </div>

        <div className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b dark:border-neutral-800 py-4">
          <div className="container-custom flex flex-col md:flex-row gap-4 items-center justify-between px-4">
            <input
              type="text" placeholder="Buscar..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as TemplateCategory)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${selectedCategory === cat.id ? 'bg-blue-600 text-white shadow-md' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'}`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`px-4 py-2 rounded-full text-sm ${showFavorites ? 'bg-amber-500 text-white shadow-md' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'}`}
            >
              ⭐ Favoritos
            </button>
          </div>
        </div>

        <div className="container-custom px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Si está cargando la página o filtrando, mostrar skeletons */}
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

          {totalPages > 1 && !isInitialLoading && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                disabled={currentPage === 1}
                onClick={() => { setCurrentPage(p => p - 1); window.scrollTo(0, 400); }}
                className="p-2 px-4 rounded-lg bg-white dark:bg-neutral-800 disabled:opacity-30 dark:text-white shadow hover:bg-neutral-50"
              >
                ← Anterior
              </button>
              <span className="dark:text-white font-medium">Página {currentPage} de {totalPages}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => { setCurrentPage(p => p + 1); window.scrollTo(0, 400); }}
                className="p-2 px-4 rounded-lg bg-white dark:bg-neutral-800 disabled:opacity-30 dark:text-white shadow hover:bg-neutral-50"
              >
                Siguiente →
              </button>
            </div>
          )}

          {!isInitialLoading && filteredTemplates.length === 0 && (
            <div className="text-center py-20 text-neutral-500">No se encontraron resultados para tu búsqueda.</div>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}

// --- 3. TEMPLATE CARD CON CARGA DE IMAGEN INDIVIDUAL ---
const TemplateCard = ({ template, isFavorite, onToggleFavorite, onSelect }: any) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      onClick={onSelect}
      className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all border dark:border-neutral-800 cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-48 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
        {/* Spinner interno mientras carga la imagen específica */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <img
          src={template.images.previews[0]}
          alt={template.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        />

        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(template.id, e); }}
          className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-neutral-800/90 rounded-full backdrop-blur-md shadow-sm hover:scale-110 transition-transform"
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg dark:text-white group-hover:text-blue-500 transition-colors">{template.title}</h3>
        <p className="text-sm text-neutral-500 line-clamp-2 mt-1 mb-4 flex-grow">{template.description}</p>
        <div className="mt-auto flex justify-between items-center border-t dark:border-neutral-800 pt-3">
          <span className="text-[10px] font-bold text-blue-500 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded uppercase tracking-wider">
            {template.category[0]}
          </span>
          <span className="text-xs text-neutral-400 font-bold group-hover:translate-x-1 transition-transform">VER DEMO →</span>
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