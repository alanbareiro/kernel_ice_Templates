import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import './index.css';
import BaseLayout from './layouts/BaseLayout';
// Importamos todos los templates
import { templateImages } from './data/templateImages';
import LoginPage from './pages/LoginPage';
import AccountingLanding from './templates/Accounting/AccountingLanding';
import ArchitectureLanding from './templates/Architecture/ArchitectureLanding';
import BakeryLanding from './templates/Bakery/BakeryLanding';
import BeautySalonLanding from './templates/BeautySalon/SalonLanding';
import CateringLanding from './templates/Catering/CateringLanding';
import CleaningServiceLanding from './templates/CleaningService/CleaningLanding';
import CoffeeShopLanding from './templates/CoffeeShop/CoffeeLanding';
import ConsultingLanding from './templates/Consulting/ConsultingLanding';
import DigitalAgencyLanding from './templates/DigitalAgency/DigitalLanding';
import FashionStoreLanding from './templates/FashionStore/FashionLanding';
import FoodTruckLanding from './templates/FoodTruck/FoodTruckLanding';
import GymLanding from './templates/Gym/GymLanding';
import LawFirmLanding from './templates/LawFirm/LawFirmLanding';
import MarketingAgencyLanding from './templates/MarketingAgency/AgencyLanding';
import MedicalClinicLanding from './templates/MedicalClinic/MedicalLanding';
import RealEstateLanding from './templates/RealEstate/RealEstateLanding';
import RestaurantLanding from './templates/Restaurant/RestaurantLanding';
import SaaSlanding from './templates/SaaS/SaaSlanding';
import StartupLanding from './templates/Startup/StartupLanding';

type TemplateType =
  | 'home'
  | 'consulting' | 'catering' | 'accounting' | 'restaurant'
  | 'lawFirm' | 'medical' | 'architecture' | 'marketingAgency'
  | 'coffeeShop' | 'bakery' | 'foodTruck' | 'beautySalon' | 'gym'
  | 'realEstate' | 'fashion' | 'cleaning' | 'saas' | 'digitalAgency' | 'startup';

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
  images: {
    hero: string;
    previews: string[];
  };
}

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [currentTemplate, setCurrentTemplate] = useState<TemplateType | 'home'>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('todos');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<TemplateType[]>(() => {
    const saved = localStorage.getItem('favoriteTemplates');
    return saved ? JSON.parse(saved) : [];
  });

  const templatesInfo: TemplateInfo[] = [
    {
      id: 'consulting',
      title: 'Consultoría',
      description: 'Diseño elegante y profesional para servicios de consultoría.',
      icon: '📊',
      gradient: 'from-blue-600 to-blue-800',
      color: 'blue',
      category: ['landing'],
      tags: ['negocios', 'profesional'],
      featured: true,
      popular: true,
      images: templateImages.consulting
    },
    {
      id: 'catering',
      title: 'Catering',
      description: 'Estilo vibrante y acogedor para servicios gastronómicos.',
      icon: '🍽️',
      gradient: 'from-amber-500 to-orange-600',
      color: 'amber',
      category: ['landing', 'ecommerce'],
      tags: ['gastronomía', 'eventos'],
      featured: true,
      popular: true,
      images: templateImages.catering
    },
    {
      id: 'accounting',
      title: 'Contaduría',
      description: 'Diseño formal y de confianza para estudios contables.',
      icon: '🧾',
      gradient: 'from-emerald-600 to-emerald-800',
      color: 'emerald',
      category: ['landing'],
      tags: ['finanzas', 'contable'],
      featured: false,
      popular: false,
      images: templateImages.accounting
    },
    {
      id: 'restaurant',
      title: 'Restaurant',
      description: 'Diseño cálido y apetitoso para restaurantes.',
      icon: '🍝',
      gradient: 'from-red-600 to-red-800',
      color: 'red',
      category: ['landing', 'ecommerce'],
      tags: ['gastronomía', 'comida'],
      featured: true,
      popular: true,
      images: templateImages.restaurant
    },
    {
      id: 'lawFirm',
      title: 'Bufete de Abogados',
      description: 'Diseño elegante y formal para estudios jurídicos.',
      icon: '⚖️',
      gradient: 'from-stone-700 to-stone-900',
      color: 'stone',
      category: ['landing'],
      tags: ['legal', 'derecho'],
      featured: false,
      popular: false,
      images: templateImages.lawFirm
    },
    {
      id: 'medical',
      title: 'Clínica Médica',
      description: 'Diseño limpio y profesional para centros de salud.',
      icon: '🏥',
      gradient: 'from-teal-500 to-teal-700',
      color: 'teal',
      category: ['landing'],
      tags: ['salud', 'médico'],
      featured: true,
      popular: false,
      images: templateImages.medical
    },
    {
      id: 'architecture',
      title: 'Arquitectura',
      description: 'Diseño moderno para estudios de arquitectura.',
      icon: '🏛️',
      gradient: 'from-stone-600 to-stone-800',
      color: 'stone',
      category: ['landing'],
      tags: ['arquitectura', 'diseño'],
      featured: false,
      popular: false,
      images: templateImages.architecture
    },
    {
      id: 'marketingAgency',
      title: 'Agencia de Marketing',
      description: 'Diseño creativo y dinámico para agencias.',
      icon: '📈',
      gradient: 'from-purple-500 to-purple-700',
      color: 'purple',
      category: ['landing', 'custom'],
      tags: ['marketing', 'publicidad'],
      featured: true,
      popular: true,
      images: templateImages.marketingAgency
    },
    {
      id: 'coffeeShop',
      title: 'Cafetería',
      description: 'Diseño acogedor y cálido para coffee shops.',
      icon: '☕',
      gradient: 'from-amber-700 to-amber-900',
      color: 'amber',
      category: ['landing', 'ecommerce'],
      tags: ['café', 'desayunos'],
      featured: true,
      popular: true,
      images: templateImages.coffeeShop
    },
    {
      id: 'bakery',
      title: 'Panadería',
      description: 'Diseño dulce y apetitoso para panaderías.',
      icon: '🥐',
      gradient: 'from-rose-500 to-rose-700',
      color: 'rose',
      category: ['landing', 'ecommerce'],
      tags: ['panadería', 'dulces'],
      featured: false,
      popular: false,
      images: templateImages.bakery
    },
    {
      id: 'foodTruck',
      title: 'Food Truck',
      description: 'Diseño urbano y moderno para food trucks.',
      icon: '🚚',
      gradient: 'from-orange-500 to-orange-700',
      color: 'orange',
      category: ['landing'],
      tags: ['comida callejera', 'rápido'],
      featured: false,
      popular: false,
      images: templateImages.foodTruck
    },
    {
      id: 'beautySalon',
      title: 'Salón de Belleza',
      description: 'Diseño elegante y femenino para salones.',
      icon: '💅',
      gradient: 'from-pink-500 to-pink-700',
      color: 'pink',
      category: ['landing'],
      tags: ['belleza', 'spa'],
      featured: true,
      popular: false,
      images: templateImages.beautySalon
    },
    {
      id: 'gym',
      title: 'Gimnasio',
      description: 'Diseño energético y motivador para gimnasios.',
      icon: '💪',
      gradient: 'from-orange-600 to-orange-800',
      color: 'orange',
      category: ['landing', 'ecommerce'],
      tags: ['fitness', 'entrenamiento'],
      featured: false,
      popular: false,
      images: templateImages.gym
    },
    {
      id: 'realEstate',
      title: 'Inmobiliaria',
      description: 'Diseño profesional para bienes raíces.',
      icon: '🏢',
      gradient: 'from-emerald-600 to-emerald-800',
      color: 'emerald',
      category: ['landing', 'custom'],
      tags: ['propiedades', 'inmuebles'],
      featured: true,
      popular: true,
      images: templateImages.realEstate
    },
    {
      id: 'fashion',
      title: 'Tienda de Moda',
      description: 'Diseño elegante y moderno para tiendas de ropa.',
      icon: '👗',
      gradient: 'from-fuchsia-500 to-fuchsia-700',
      color: 'fuchsia',
      category: ['ecommerce'],
      tags: ['moda', 'ropa'],
      featured: true,
      popular: true,
      images: templateImages.fashion
    },
    {
      id: 'cleaning',
      title: 'Limpieza',
      description: 'Diseño limpio y profesional para servicios de limpieza.',
      icon: '🧹',
      gradient: 'from-sky-500 to-sky-700',
      color: 'sky',
      category: ['landing'],
      tags: ['servicios', 'limpieza'],
      featured: false,
      popular: false,
      images: templateImages.cleaning
    },
    {
      id: 'saas',
      title: 'SaaS',
      description: 'Diseño moderno para software como servicio.',
      icon: '☁️',
      gradient: 'from-violet-500 to-violet-700',
      color: 'violet',
      category: ['enterprise', 'custom'],
      tags: ['software', 'tecnología'],
      featured: true,
      popular: true,
      images: templateImages.saas
    },
    {
      id: 'digitalAgency',
      title: 'Agencia Digital',
      description: 'Diseño innovador para agencias digitales.',
      icon: '💻',
      gradient: 'from-cyan-500 to-cyan-700',
      color: 'cyan',
      category: ['enterprise', 'custom'],
      tags: ['digital', 'tecnología'],
      featured: false,
      popular: false,
      images: templateImages.digitalAgency
    },
    {
      id: 'startup',
      title: 'Startup',
      description: 'Diseño moderno y disruptivo para startups.',
      icon: '🚀',
      gradient: 'from-emerald-500 to-emerald-700',
      color: 'emerald',
      category: ['enterprise', 'custom'],
      tags: ['startup', 'innovación'],
      featured: true,
      popular: true,
      images: templateImages.startup
    }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleTemplateSelect = (template: TemplateType) => {
    setCurrentTemplate(template);
  };

  const handleHomeClick = () => {
    setCurrentTemplate('home');
  };

  const toggleFavorite = (templateId: TemplateType, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = favorites.includes(templateId)
      ? favorites.filter(id => id !== templateId)
      : [...favorites, templateId];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteTemplates', JSON.stringify(newFavorites));
  };

  const filteredTemplates = templatesInfo.filter(template => {
    const matchesSearch = searchTerm === '' ||
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'todos' || template.category.includes(selectedCategory);
    const matchesFavorites = !showFavorites || favorites.includes(template.id);

    return matchesSearch && matchesCategory && matchesFavorites;
  });

  // Renderizar según el template seleccionado
  if (currentTemplate !== 'home') {
    const templateProps = { onHomeClick: handleHomeClick };

    switch (currentTemplate) {
      case 'consulting': return <ConsultingLanding {...templateProps} />;
      case 'catering': return <CateringLanding {...templateProps} />;
      case 'accounting': return <AccountingLanding {...templateProps} />;
      case 'restaurant': return <RestaurantLanding {...templateProps} />;
      case 'lawFirm': return <LawFirmLanding {...templateProps} />;
      case 'medical': return <MedicalClinicLanding {...templateProps} />;
      case 'architecture': return <ArchitectureLanding {...templateProps} />;
      case 'marketingAgency': return <MarketingAgencyLanding {...templateProps} />;
      case 'coffeeShop': return <CoffeeShopLanding {...templateProps} />;
      case 'bakery': return <BakeryLanding {...templateProps} />;
      case 'foodTruck': return <FoodTruckLanding {...templateProps} />;
      case 'beautySalon': return <BeautySalonLanding {...templateProps} />;
      case 'gym': return <GymLanding {...templateProps} />;
      case 'realEstate': return <RealEstateLanding {...templateProps} />;
      case 'fashion': return <FashionStoreLanding {...templateProps} />;
      case 'cleaning': return <CleaningServiceLanding {...templateProps} />;
      case 'saas': return <SaaSlanding {...templateProps} />;
      case 'digitalAgency': return <DigitalAgencyLanding {...templateProps} />;
      case 'startup': return <StartupLanding {...templateProps} />;
      default: return null;
    }
  }

  const categories = [
    { id: 'todos', label: 'Todos', icon: '🔍' },
    { id: 'landing', label: 'Landing Pages', icon: '📄' },
    { id: 'ecommerce', label: 'E-commerce', icon: '🛒' },
    { id: 'enterprise', label: 'Enterprise', icon: '🏢' },
    { id: 'custom', label: 'Custom', icon: '⚙️' }
  ];

  return (
    <BaseLayout>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
        {/* Header con usuario */}
        <div className="fixed top-4 right-1 z-50 mt-2">
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-3 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-neutral-200 dark:border-neutral-700">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hidden sm:block">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              >
                Salir
              </button>
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Iniciar sesión
            </button>
          )}
        </div>

        {/* Hero section */}
        <div className="relative pt-12 mt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-blue-600 blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-purple-600 blur-3xl" />
          </div>

          <div className="container-custom px-4 relative">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Kernelice Templates
                </span>
              </h1>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
                Más de 19 templates profesionales listos para personalizar. Elige, edita y lanza tu sitio en minutos.
              </p>

              <div className="flex justify-center gap-8 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">19+</div>
                  <div className="text-neutral-500">Templates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">100%</div>
                  <div className="text-neutral-500">Personalizables</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">24/7</div>
                  <div className="text-neutral-500">Soporte</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
          <div className="container-custom px-4 py-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Búsqueda */}
              <div className="relative w-full lg:w-96">
                <input
                  type="text"
                  placeholder="Buscar templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 text-xl">🔍</span>
              </div>

              {/* Categorías */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as TemplateCategory)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }`}
                  >
                    <span className="mr-1">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Favoritos */}
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${showFavorites
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg scale-105'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
              >
                <span className="mr-1">⭐</span>
                Favoritos
              </button>
            </div>
          </div>
        </div>

        {/* Grid de templates */}
        <div className="container-custom px-4 py-12">
          <div className="mb-6 text-sm text-neutral-500">
            {filteredTemplates.length} templates encontrados
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isFavorite={favorites.includes(template.id)}
                onToggleFavorite={toggleFavorite}
                onSelect={() => handleTemplateSelect(template.id)}
              />
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">😕</div>
              <p className="text-2xl text-neutral-400 mb-4">No se encontraron templates</p>
              <p className="text-neutral-500">Probá con otros filtros o términos de búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}

// TemplateCard component
interface TemplateCardProps {
  template: TemplateInfo;
  isFavorite: boolean;
  onToggleFavorite: (id: TemplateType, e: React.MouseEvent) => void;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, isFavorite, onToggleFavorite, onSelect }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // let interval: NodeJS.Timeout;
    let interval: any;
    if (isHovered && template.images.previews.length > 1 && !imageError) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % template.images.previews.length);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isHovered, template.images.previews.length, imageError]);

  const handleImageError = () => {
    setImageError(true);
  };

  const currentImage = imageError || !template.images.previews[currentImageIndex]
    ? 'https://via.placeholder.com/400x300?text=Template+Preview'
    : template.images.previews[currentImageIndex];

  const gradientColors = {
    blue: 'from-blue-600 to-blue-700',
    amber: 'from-amber-600 to-amber-700',
    emerald: 'from-emerald-600 to-emerald-700',
    red: 'from-red-600 to-red-700',
    stone: 'from-stone-600 to-stone-700',
    teal: 'from-teal-600 to-teal-700',
    purple: 'from-purple-600 to-purple-700',
    rose: 'from-rose-600 to-rose-700',
    orange: 'from-orange-600 to-orange-700',
    pink: 'from-pink-600 to-pink-700',
    fuchsia: 'from-fuchsia-600 to-fuchsia-700',
    sky: 'from-sky-600 to-sky-700',
    violet: 'from-violet-600 to-violet-700',
    cyan: 'from-cyan-600 to-cyan-700'
  }[template.color] || 'from-neutral-600 to-neutral-700';

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
      className="group relative cursor-pointer bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-neutral-200 dark:border-neutral-700"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        {template.featured && (
          <span className="px-2 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full shadow-lg">
            Destacado
          </span>
        )}
        {template.popular && (
          <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
            Popular
          </span>
        )}
      </div>

      {/* Botón de favorito */}
      <button
        onClick={(e) => onToggleFavorite(template.id, e)}
        className="absolute top-3 right-3 z-10 p-2 bg-white/90 dark:bg-neutral-700/90 backdrop-blur-sm rounded-full hover:scale-110 transition-all shadow-lg"
      >
        <span className={`text-xl ${isFavorite ? 'text-amber-500' : 'text-neutral-400'}`}>
          {isFavorite ? '⭐' : '☆'}
        </span>
      </button>

      {/* Imagen */}
      <div className="relative h-56 overflow-hidden bg-neutral-100 dark:bg-neutral-700">
        <img
          src={currentImage}
          alt={template.title}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-all duration-500 ${isHovered && !imageError ? 'scale-110' : 'scale-100'
            }`}
        />

        {/* Overlay con gradiente */}
        <div className={`absolute inset-0 bg-gradient-to-t ${gradientColors} opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />

        {/* Indicadores de imagen */}
        {template.images.previews.length > 1 && !imageError && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
            {template.images.previews.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentImageIndex
                  ? 'w-4 bg-white'
                  : 'bg-white/50'
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">
          {template.title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
          {template.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {template.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Categorías y botón */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {template.category.map((cat, index) => (
              <span
                key={index}
                className="text-xs font-medium text-blue-600 dark:text-blue-400"
              >
                {cat === 'landing' && '📄 Landing'}
                {cat === 'ecommerce' && '🛒 E-commerce'}
                {cat === 'enterprise' && '🏢 Enterprise'}
                {cat === 'custom' && '⚙️ Custom'}
                {index < template.category.length - 1 && ' · '}
              </span>
            ))}
          </div>

          <div className={`text-xs font-semibold bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent group-hover:underline`}>
            Ver template →
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;