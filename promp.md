
"Hola, tengo una app React+TS+Tailwind con backend Node+Express+Prisma y MySql.
El usuario selecciona un template de una lista, lo abre en un editor donde puede cambiar textos e imágenes, y al guardar se almacena en DB. 
Primeramente nos centraremos en un solo template (consulting) y en finalizar la parte de personalizacion del usuario. Hay muchas partes funcionales y otras que todavia faltan. 
A continuacion te pasao los archivos principales donde el usuario intractua y puede personalizar su template.

// src/App.tsx - Versión optimizada con useRef para evitar bucles
import { Grid3X3, Heart, LayoutGrid, Sparkles, Star } from 'lucide-react';
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom';
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen';
import { useAuth } from './contexts/AuthContext';
import { templateImages } from './data/templateImages';
import { templateDefaultColors } from './data/types/templateDefaultColors';
import { useAuthHandler } from './hooks/useAuthHandler';
import { useUserTemplates } from './hooks/useUserTemplates';
import './index.css';
import { EditorLayout } from './layouts/EditorLayout';
import { GalleryLayout } from './layouts/GalleryLayout';
import { MyTemplatesLayout } from './layouts/MyTemplatesLayout';
import { OwnTemplateLayout } from './layouts/OwnTemplateLayout';
import LoginPage from './pages/LoginPage';
// import Header from './components/Header/Header';

// Lazy loading de templates
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

// Tipos
type ViewMode = 'ownTemplate' | 'myTemplates' | 'gallery' | 'editor';

// Plantillas públicas para la galería
const templatesInfo = [
  { id: 'consulting', title: 'Consultoría', description: 'Diseño profesional para servicios de consultoría.', icon: '📊', gradient: 'from-blue-500 to-blue-600', color: 'blue', category: ['landing'], tags: ['negocios', 'profesional'], featured: true, popular: true, images: templateImages.consulting },
  { id: 'catering', title: 'Catering', description: 'Estilo vibrante para servicios gastronómicos.', icon: '🍽️', gradient: 'from-amber-500 to-orange-500', color: 'amber', category: ['landing'], tags: ['gastronomía', 'eventos'], featured: true, popular: true, images: templateImages.catering },
  { id: 'accounting', title: 'Contaduría', description: 'Diseño formal para estudios contables.', icon: '🧾', gradient: 'from-emerald-500 to-emerald-600', color: 'emerald', category: ['landing'], tags: ['finanzas', 'contable'], featured: false, popular: false, images: templateImages.accounting },
  { id: 'restaurant', title: 'Restaurant', description: 'Diseño cálido para restaurantes.', icon: '🍝', gradient: 'from-red-500 to-red-600', color: 'red', category: ['landing'], tags: ['gastronomía', 'comida'], featured: true, popular: true, images: templateImages.restaurant },
  { id: 'lawFirm', title: 'Bufete de Abogados', description: 'Diseño elegante para estudios jurídicos.', icon: '⚖️', gradient: 'from-stone-600 to-stone-700', color: 'stone', category: ['landing'], tags: ['legal', 'derecho'], featured: false, popular: false, images: templateImages.lawFirm },
  { id: 'medical', title: 'Clínica Médica', description: 'Diseño limpio para centros de salud.', icon: '🏥', gradient: 'from-teal-500 to-teal-600', color: 'teal', category: ['landing'], tags: ['salud', 'médico'], featured: true, popular: false, images: templateImages.medical },
  { id: 'architecture', title: 'Arquitectura', description: 'Diseño moderno para estudios de arquitectura.', icon: '🏛️', gradient: 'from-stone-500 to-stone-600', color: 'stone', category: ['landing'], tags: ['arquitectura', 'diseño'], featured: false, popular: false, images: templateImages.architecture },
  { id: 'marketingAgency', title: 'Agencia de Marketing', description: 'Diseño creativo para agencias.', icon: '📈', gradient: 'from-purple-500 to-purple-600', color: 'purple', category: ['landing'], tags: ['marketing', 'publicidad'], featured: true, popular: true, images: templateImages.marketingAgency },
  { id: 'bakery', title: 'Panadería', description: 'Diseño dulce para panaderías.', icon: '🥐', gradient: 'from-rose-500 to-rose-600', color: 'rose', category: ['landing'], tags: ['panadería', 'dulces'], featured: false, popular: false, images: templateImages.bakery },
  { id: 'foodTruck', title: 'Food Truck', description: 'Diseño urbano para food trucks.', icon: '🚚', gradient: 'from-orange-500 to-orange-600', color: 'orange', category: ['landing'], tags: ['comida callejera', 'rápido'], featured: false, popular: false, images: templateImages.foodTruck },
  { id: 'beautySalon', title: 'Salón de Belleza', description: 'Diseño elegante para salones.', icon: '💅', gradient: 'from-pink-500 to-pink-600', color: 'pink', category: ['landing'], tags: ['belleza', 'spa'], featured: true, popular: false, images: templateImages.beautySalon },
  { id: 'gym', title: 'Gimnasio', description: 'Diseño motivador para gimnasios.', icon: '💪', gradient: 'from-orange-500 to-orange-600', color: 'orange', category: ['landing'], tags: ['fitness', 'entrenamiento'], featured: false, popular: false, images: templateImages.gym },
  { id: 'realEstate', title: 'Inmobiliaria', description: 'Diseño profesional para bienes raíces.', icon: '🏢', gradient: 'from-emerald-500 to-emerald-600', color: 'emerald', category: ['landing'], tags: ['propiedades', 'inmuebles'], featured: true, popular: true, images: templateImages.realEstate },
  { id: 'fashion', title: 'Tienda de Moda', description: 'Diseño moderno para tiendas de ropa.', icon: '👗', gradient: 'from-fuchsia-500 to-fuchsia-600', color: 'fuchsia', category: ['landing'], tags: ['moda', 'ropa'], featured: true, popular: true, images: templateImages.fashion },
  { id: 'cleaning', title: 'Limpieza', description: 'Diseño para servicios de limpieza.', icon: '🧹', gradient: 'from-sky-500 to-sky-600', color: 'sky', category: ['landing'], tags: ['servicios', 'limpieza'], featured: false, popular: false, images: templateImages.cleaning },
  { id: 'saas', title: 'SaaS', description: 'Diseño para software como servicio.', icon: '☁️', gradient: 'from-violet-500 to-violet-600', color: 'violet', category: ['landing'], tags: ['software', 'tecnología'], featured: true, popular: true, images: templateImages.saas },
  { id: 'digitalAgency', title: 'Agencia Digital', description: 'Diseño innovador para agencias digitales.', icon: '💻', gradient: 'from-cyan-500 to-cyan-600', color: 'cyan', category: ['landing'], tags: ['digital', 'tecnología'], featured: false, popular: false, images: templateImages.digitalAgency },
  { id: 'startup', title: 'Startup', description: 'Diseño disruptivo para startups.', icon: '🚀', gradient: 'from-emerald-500 to-emerald-600', color: 'emerald', category: ['landing'], tags: ['startup', 'innovación'], featured: true, popular: true, images: templateImages.startup },
  { id: 'coffeeShop', title: 'Coffee Shop', description: 'Diseño acogedor para cafeterías.', icon: '☕', gradient: 'from-amber-600 to-amber-700', color: 'amber', category: ['landing', 'ecommerce'], tags: ['café', 'desayunos'], featured: true, popular: true, images: templateImages.coffeeShop }, // ← AGREGAR
];

// Categorías
const categories = [
  { id: 'todos', label: 'Todos', icon: (props: any) => <Grid3X3 {...props} /> },
  { id: 'landing', label: 'Landing Pages', icon: (props: any) => <LayoutGrid {...props} /> },
  { id: 'ecommerce', label: 'E-commerce', icon: (props: any) => <Sparkles {...props} /> },
  { id: 'enterprise', label: 'Enterprise', icon: (props: any) => <Star {...props} /> },
  { id: 'custom', label: 'Custom', icon: (props: any) => <Heart {...props} /> }
];

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isLoading, getLoadingMessage, tokenFromUrl } = useAuthHandler();
  const { userTemplate, userTemplatesList, loading: loadingTemplates, loadTemplateForEdit, reloadUserTemplates } = useUserTemplates(isAuthenticated, user);
  const [searchParams] = useSearchParams();
  // const navigate = useNavigate();

  // ✅ useRef para evitar múltiples ejecuciones
  const hasProcessedUrlParams = useRef(false);

  // Leer parámetros de URL
  const templateIdFromUrl = searchParams.get('templateId');
  const previewMode = searchParams.get('preview') === 'true';
  const viewFromUrl = searchParams.get('view');

  const [viewMode, setViewMode] = useState<ViewMode>('ownTemplate');
  const [selectedTemplateForEdit, setSelectedTemplateForEdit] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteTemplates');
    return saved ? JSON.parse(saved) : [];
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);

  // ✅ Efecto para manejar parámetros de URL - SOLO UNA VEZ
  useEffect(() => {
    const handleUrlParams = async () => {
      // Evitar múltiples ejecuciones
      if (hasProcessedUrlParams.current) {
        return;
      }

      // Si hay un templateId en la URL y estamos autenticados
      if (templateIdFromUrl && isAuthenticated) {
        hasProcessedUrlParams.current = true;
        setIsLoadingTemplate(true);

        console.log('📝 Cargando template desde URL:', templateIdFromUrl);

        if (previewMode) {
          setIsPreviewMode(true);
        }

        const templateData = await loadTemplateForEdit(templateIdFromUrl);
        if (templateData) {
          setSelectedTemplateForEdit(templateData);
          setViewMode('editor');
        }
        setIsLoadingTemplate(false);

        // Limpiar URL después de procesar
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      // Si hay vista "my-templates" en la URL
      else if (viewFromUrl === 'my-templates') {
        hasProcessedUrlParams.current = true;
        console.log('📁 Mostrando vista de mis plantillas');
        setViewMode('myTemplates');
        // Limpiar URL después de procesar
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      // Si no hay template guardado, mostrar galería
      else if (!loadingTemplates && !userTemplate && viewMode === 'ownTemplate') {
        setViewMode('gallery');
      }
    };

    handleUrlParams();
  }, [templateIdFromUrl, previewMode, viewFromUrl, isAuthenticated, loadingTemplates, userTemplate, viewMode, loadTemplateForEdit]);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const handleLogin = () => window.location.href = '/login';

  const handleToggleFavorite = (templateId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = favorites.includes(templateId)
      ? favorites.filter(id => id !== templateId)
      : [...favorites, templateId];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteTemplates', JSON.stringify(newFavorites));
  };

  const handleSelectTemplateFromGallery = (templateId: string) => {
    console.log('📝 Seleccionando plantilla de galería:', templateId);

    const defaultColors = templateDefaultColors[templateId as keyof typeof templateDefaultColors] || templateDefaultColors.consulting;

    const newTemplate = {
      id: `temp-${Date.now()}`,
      name: `Mi template de ${templateId}`,
      type: templateId,
      colors: defaultColors,
      texts: {},
      images: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1
    };

    setSelectedTemplateForEdit(newTemplate);
    setViewMode('editor');
  };

  const handleBackToOwn = () => {
    reloadUserTemplates();
    setViewMode('ownTemplate');
    setIsPreviewMode(false);
  };

  const handleEditTemplate = async (templateId: string) => {
    console.log('📝 Editando template con ID:', templateId);
    const templateData = await loadTemplateForEdit(templateId);
    if (templateData) {
      setSelectedTemplateForEdit(templateData);
      setViewMode('editor');
    }
  };

  const handleBackToMyTemplates = () => setViewMode('myTemplates');
  const handleExploreGallery = () => setViewMode('gallery');

  // Mostrar loading
  if (isLoading || loadingTemplates || isLoadingTemplate || (tokenFromUrl && !isAuthenticated)) {
    return <LoadingScreen message={isLoadingTemplate ? "Cargando template..." : getLoadingMessage()} />;
  }

  if (!isAuthenticated) return null;

  // Si no hay template guardado y estamos en ownTemplate, mostrar galería
  if (!userTemplate && viewMode === 'ownTemplate') {
    return (
      <GalleryLayout
        templates={templatesInfo}
        categories={categories}
        onSelectTemplate={handleSelectTemplateFromGallery}
        onBackToOwn={handleBackToOwn}
        onBackToMyTemplates={handleBackToMyTemplates}
        onLogout={handleLogout}
        onLogin={handleLogin}
        user={user}
        isAuthenticated={isAuthenticated}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    );
  }

  // Modo editor
  if (viewMode === 'editor' && selectedTemplateForEdit) {
    const TemplateComponent = (() => {
      switch (selectedTemplateForEdit.type) {
        case 'consulting': return ConsultingLanding;
        case 'catering': return CateringLanding;
        case 'accounting': return AccountingLanding;
        case 'restaurant': return RestaurantLanding;
        case 'lawFirm': return LawFirmLanding;
        case 'medical': return MedicalClinicLanding;
        case 'architecture': return ArchitectureLanding;
        case 'marketingAgency': return MarketingAgencyLanding;
        case 'coffeeShop': return CoffeeShopLanding;
        case 'bakery': return BakeryLanding;
        case 'foodTruck': return FoodTruckLanding;
        case 'beautySalon': return BeautySalonLanding;
        case 'gym': return GymLanding;
        case 'realEstate': return RealEstateLanding;
        case 'fashion': return FashionStoreLanding;
        case 'cleaning': return CleaningServiceLanding;
        case 'saas': return SaaSlanding;
        case 'digitalAgency': return DigitalAgencyLanding;
        case 'startup': return StartupLanding;
        default: return ConsultingLanding;
      }
    })();

    return (
      <EditorLayout
        templateData={selectedTemplateForEdit}
        onClose={handleBackToOwn}
        isPreview={isPreviewMode}
      >
        <Suspense fallback={<LoadingScreen message={isPreviewMode ? "Cargando previsualización..." : "Cargando template..."} />}>
          <TemplateComponent onHomeClick={handleBackToOwn} />
        </Suspense>
      </EditorLayout>
    );
  }

  // Modo mis plantillas
  if (viewMode === 'myTemplates') {
    return (
      <MyTemplatesLayout
        templates={userTemplatesList}
        onEditTemplate={handleEditTemplate}
        onBackToOwn={handleBackToOwn}
        onExploreGallery={handleExploreGallery}
        onLogout={handleLogout}
        onLogin={handleLogin}
        user={user}
        isAuthenticated={isAuthenticated}
      />
    );
  }

  // Modo galería
  if (viewMode === 'gallery') {
    return (
      <GalleryLayout
        templates={templatesInfo}
        categories={categories}
        onSelectTemplate={handleSelectTemplateFromGallery}
        onBackToOwn={handleBackToOwn}
        onBackToMyTemplates={handleBackToMyTemplates}
        onLogout={handleLogout}
        onLogin={handleLogin}
        user={user}
        isAuthenticated={isAuthenticated}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    );
  }

  // Modo plantilla principal
  if (userTemplate) {
    return (
      <OwnTemplateLayout
        userTemplate={userTemplate}
        onEdit={() => userTemplate && handleEditTemplate(userTemplate.id)}
        onViewMyTemplates={handleBackToMyTemplates}
        onExploreGallery={handleExploreGallery}
        onLogout={handleLogout}
        onLogin={handleLogin}
        isAuthenticated={isAuthenticated}
        user={user}
      />
    );
  }

  // Fallback: mostrar galería
  return (
    <GalleryLayout
      templates={templatesInfo}
      categories={categories}
      onSelectTemplate={handleSelectTemplateFromGallery}
      onBackToOwn={handleBackToOwn}
      onBackToMyTemplates={handleBackToMyTemplates}
      onLogout={handleLogout}
      onLogin={handleLogin}
      user={user}
      isAuthenticated={isAuthenticated}
      favorites={favorites}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}

import { Award, BarChart, Briefcase, Globe, LineChart, MapPin, Target, TrendingUp, Users } from 'lucide-react';
import consultingImage from '../../assets/corpo.jpg';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors } from '../../types/template.types';


// Mapeo de nombres de iconos a componentes (puedes ampliarlo)
const iconMap: Record<string, any> = {
    Briefcase,
    Users,
    Award,
    MapPin,
    TrendingUp: TrendingUp,
    Target: Target,
    BarChart: BarChart,
    LineChart: LineChart,
    Globe: Globe,
    // ... añade más si es necesario
};

const ConsultingAbout = () => {
    const { template } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };

    const stats = [
        {
            iconName: template?.texts?.stat_icon_1 || 'Briefcase',
            value: template?.texts?.stat_value_1 || '15+',
            label: template?.texts?.stat_label_1 || 'Años de experiencia',
            id: 'stat_1'
        },
        {
            iconName: template?.texts?.stat_icon_2 || 'Users',
            value: template?.texts?.stat_value_2 || '50+',
            label: template?.texts?.stat_label_2 || 'Consultores expertos',
            id: 'stat_2'
        },
        {
            iconName: template?.texts?.stat_icon_3 || 'Award',
            value: template?.texts?.stat_value_3 || '200+',
            label: template?.texts?.stat_label_3 || 'Proyectos exitosos',
            id: 'stat_3'
        },
        {
            iconName: template?.texts?.stat_icon_4 || 'MapPin',
            value: template?.texts?.stat_value_4 || '10+',
            label: template?.texts?.stat_label_4 || 'Países con presencia',
            id: 'stat_4'
        },
    ];


    // Obtener los diferenciadores (textos)
    const differentiators = [
        template?.texts?.differentiator_0 || 'Metodologías ágiles y adaptativas',
        template?.texts?.differentiator_1 || 'Análisis de datos para toma de decisiones',
        template?.texts?.differentiator_2 || 'Acompañamiento post-implementación',
        template?.texts?.differentiator_3 || 'Confidencialidad y ética profesional',
    ];

    // const handleAboutImageClick = () => {
    //     window.dispatchEvent(new CustomEvent('openImageSelector', {
    //         detail: { elementId: 'about_image' }
    //     }));
    // };

    // Función para obtener el componente Icon
    const getIcon = (iconName: string) => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />;
    };

    return (
        <section
            id="methodology"
            className="section-padding"
            style={{ backgroundColor: s.aboutBackground }}
        >
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Imagen */}
                    <div className="relative group order-2 lg:order-1">
                        <div
                            className="absolute -inset-4 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                            style={{ backgroundColor: s.aboutBadgeBackground }}
                        />
                        <div
                            className="relative z-10 overflow-hidden shadow-2xl"
                            style={{ borderRadius: s.aboutImageBorderRadius }}
                        >
                            <div className="aspect-[4/5] relative overflow-hidden">
                                <EditableImage
                                    elementId="about_image"
                                    defaultImage={consultingImage}
                                    alt="Equipo de consultores"
                                    className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent pointer-events-none" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white pointer-events-none">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div
                                            className="w-3 h-3 rounded-full animate-pulse"
                                            style={{ backgroundColor: s.aboutBadgeBackground }}
                                        />
                                        <span
                                            className="text-sm font-medium"
                                            style={{ color: s.aboutBadgeTextColor }}
                                        >
                                            <EditableText
                                                elementId="about_badge"
                                                defaultText="Equipo multidisciplinario"
                                                tag="span"
                                            />
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 leading-tight text-white">
                                        <EditableText
                                            elementId="about_title"
                                            defaultText="Expertos en diversas industrias"
                                            tag="span"
                                        />
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contenido */}
                    {/* Contenido */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <div>
                            <span
                                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                                style={{
                                    backgroundColor: `${s.aboutBadgeBackground}20`,
                                    color: s.aboutBadgeTextColor,
                                }}
                            >
                                <EditableText
                                    elementId="about_section_badge"
                                    defaultText="Nuestra Firma"
                                    tag="span"
                                />
                            </span>

                            <h2
                                className="text-4xl md:text-5xl font-bold mb-6"
                                style={{ color: s.aboutTitleColor }}
                            >
                                <EditableText
                                    elementId="about_heading_1"
                                    defaultText="Consultoría con"
                                    tag="span"
                                />{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{
                                        backgroundImage: `linear-gradient(to right, ${s.aboutTitleColor}, ${s.aboutTitleColor})`,
                                    }}
                                >
                                    <EditableText
                                        elementId="about_heading_2"
                                        defaultText="Resultados Medibles"
                                        tag="span"
                                    />
                                </span>
                            </h2>

                            <p
                                className="text-lg mb-6"
                                style={{ color: s.aboutTextColor }}
                            >
                                <EditableText
                                    elementId="about_description_1"
                                    defaultText="En Kernelize Consulting no creemos en soluciones genéricas..."
                                    tag="span"
                                />
                            </p>

                            <p style={{ color: s.aboutTextColor }}>
                                <EditableText
                                    elementId="about_description_2"
                                    defaultText="Nuestro enfoque combina el rigor analítico con la creatividad..."
                                    tag="span"
                                />
                            </p>
                        </div>
                        {/* Estadísticas dinámicas */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t"
                            style={{ borderColor: s.aboutTextColor }}
                        >
                            {stats.map((stat, index) => {
                                const IconComponent = getIcon(stat.iconName);
                                return (
                                    <div key={index} className="text-center group">
                                        <div
                                            className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 group-hover:scale-110 transition-all duration-300"
                                            style={{
                                                backgroundColor: `${s.aboutBadgeBackground}20`,
                                                color: s.aboutBadgeBackground,
                                            }}
                                        >
                                            {IconComponent}
                                        </div>
                                        <div
                                            className="text-2xl font-bold group-hover:text-blue-600 transition-colors"
                                            style={{ color: s.statValueColor }}
                                        >
                                            <EditableText
                                                elementId={`stat_value_${stat.id}`}
                                                defaultText={stat.value}
                                                tag="span"
                                            />
                                        </div>
                                        <div
                                            className="text-xs"
                                            style={{ color: s.statLabelColor }}
                                        >
                                            <EditableText
                                                elementId={`stat_label_${stat.id}`}
                                                defaultText={stat.label}
                                                tag="span"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Lista de diferenciadores */}
                        <div className="space-y-3">
                            <h3
                                className="text-xl font-semibold"
                                style={{ color: s.aboutTitleColor }}
                            >
                                <EditableText
                                    elementId="about_commitment_title"
                                    defaultText="Nuestro compromiso:"
                                    tag="span"
                                />
                            </h3>
                            <ul className="space-y-3">
                                {differentiators.map((item, idx) => (
                                    <li key={idx} className="flex items-center">
                                        <div
                                            className="w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                                            style={{ backgroundColor: s.aboutBadgeBackground }}
                                        >
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span style={{ color: s.aboutTextColor }}>
                                            <EditableText
                                                elementId={`differentiator_${idx}`}
                                                defaultText={item}
                                                tag="span"
                                            />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultingAbout;
import { Briefcase, Calendar, CheckCircle, Clock, Globe, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors } from '../../types/template.types';

// Mapeo de iconos (puedes ampliarlo)
const iconMap: Record<string, any> = {
    Mail, MapPin, Phone, Briefcase, CheckCircle,
    // otros iconos comunes
    MessageCircle: MessageCircle,
    Globe: Globe,
    Clock: Clock,
    Calendar: Calendar,
};

const ConsultingContact = () => {
    const { template } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', phone: '', company: '', position: '', message: '' });
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    // Datos de contacto desde template.texts
    const contactItems = [
        {
            id: 'email',
            defaultIcon: 'Mail',
            defaultTitle: 'Email',
            defaultContent: 'consultoria@kernelize.com',
            href: 'mailto:consultoria@kernelize.com',
        },
        {
            id: 'phone',
            defaultIcon: 'Phone',
            defaultTitle: 'Teléfono',
            defaultContent: '+54 9 11 6745-7413',
            href: 'tel:+5491167457413',
        },
        {
            id: 'location',
            defaultIcon: 'MapPin',
            defaultTitle: 'Ubicación',
            defaultContent: 'Buenos Aires, Argentina',
            href: '#',
        },
    ];

    const getIcon = (iconName: string) => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className="w-6 h-6" /> : <Mail className="w-6 h-6" />;
    };

    // Horario de atención
    const hourIconName = template?.texts?.contact_hours_icon || 'Briefcase';
    const HourIcon = iconMap[hourIconName] || Briefcase;

    return (
        <section id="contact" className="section-padding" style={{ backgroundColor: s.contactBackground }}>
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: s.contactTitleColor }}>
                        <EditableText elementId="contact_title_1" defaultText="Comencemos a" tag="span" />{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${s.contactTitleColor}, ${s.contactTitleColor})` }}>
                            <EditableText elementId="contact_title_2" defaultText="transformar" tag="span" />
                        </span>{' '}
                        <EditableText elementId="contact_title_3" defaultText="tu negocio" tag="span" />
                    </h2>
                    <p className="text-xl" style={{ color: s.contactTextColor }}>
                        <EditableText elementId="contact_description" defaultText="Solicita una reunión estratégica sin costo y descubre cómo podemos ayudarte a alcanzar tus metas." tag="span" />
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Información de contacto */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-6" style={{ color: s.contactTitleColor }}>
                                <EditableText elementId="contact_info_title" defaultText="Información de contacto" tag="span" />
                            </h3>
                            <p className="mb-8" style={{ color: s.contactTextColor }}>
                                <EditableText elementId="contact_info_description" defaultText="Estamos a disposición para atender tus consultas y coordinar una primera reunión de diagnóstico." tag="span" />
                            </p>
                        </div>

                        <div className="space-y-6">
                            {contactItems.map((item) => {
                                const iconName = template?.texts?.[`contact_${item.id}_icon`] || item.defaultIcon;
                                const title = template?.texts?.[`contact_${item.id}_title`] || item.defaultTitle;
                                const content = template?.texts?.[`contact_${item.id}_content`] || item.defaultContent;
                                return (
                                    <a key={item.id} href={item.href} className="flex items-start space-x-4 p-4 rounded-xl transition-colors group"
                                        style={{ backgroundColor: s.contactFormBackground, border: `1px solid ${s.contactFormBorder}` }}>
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
                                            style={{ backgroundColor: `${s.contactButtonBackground}20`, color: s.contactButtonBackground }}>
                                            {getIcon(iconName)}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold group-hover:text-blue-600 transition-colors" style={{ color: s.contactTitleColor }}>
                                                <EditableText elementId={`contact_${item.id}_title`} defaultText={title} tag="span" />
                                            </h4>
                                            <p className="mt-1" style={{ color: s.contactTextColor }}>
                                                <EditableText elementId={`contact_${item.id}_content`} defaultText={content} tag="span" />
                                            </p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Recuadro de horario */}
                        <div className="p-6 rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${s.contactButtonBackground}, ${s.contactButtonHoverBackground})` }}>
                            <h4 className="font-semibold text-lg mb-2 flex items-center">
                                <HourIcon className="w-5 h-5 mr-2" />
                                <EditableText elementId="contact_hours_title" defaultText="Horario de atención" tag="span" />
                            </h4>
                            <p className="text-sm opacity-90">
                                <EditableText elementId="contact_hours_week" defaultText="Lunes a Viernes: 9:00 - 19:00 hs" tag="span" />
                            </p>
                            <p className="text-sm opacity-90">
                                <EditableText elementId="contact_hours_saturday" defaultText="Sábados: Reuniones programadas" tag="span" />
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/20">
                                <p className="text-sm">
                                    <EditableText elementId="contact_response_time" defaultText="Respuesta garantizada en 12 horas hábiles" tag="span" />
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl p-8 border" style={{ backgroundColor: s.contactFormBackground, borderColor: s.contactFormBorder }}>
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(to right, ${s.contactButtonBackground}, ${s.contactButtonHoverBackground})` }}>
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4" style={{ color: s.contactTitleColor }}>
                                        <EditableText elementId="contact_success_title" defaultText="¡Mensaje enviado con éxito!" tag="span" />
                                    </h3>
                                    <p className="mb-8" style={{ color: s.contactTextColor }}>
                                        <EditableText elementId="contact_success_message" defaultText="En menos de 12 horas hábiles, uno de nuestros consultores se comunicará contigo para coordinar una reunión." tag="span" />
                                    </p>
                                    <button onClick={() => setIsSubmitted(false)} className="text-white font-semibold px-8 py-3 rounded-lg transition-all" style={{ background: `linear-gradient(to right, ${s.contactButtonBackground}, ${s.contactButtonHoverBackground})` }}>
                                        <EditableText elementId="contact_success_button" defaultText="Enviar otro mensaje" tag="span" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold mb-8" style={{ color: s.contactTitleColor }}>
                                        <EditableText elementId="contact_form_title" defaultText="Solicita una reunión de diagnóstico" tag="span" />
                                    </h3>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium mb-2" style={{ color: s.contactTextColor }}>
                                                    <EditableText elementId="contact_label_name" defaultText="Nombre completo *" tag="span" />
                                                </label>
                                                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                    style={{ backgroundColor: s.contactInputBackground, border: `1px solid ${s.contactInputBorder}`, color: s.contactInputTextColor, '--tw-ring-color': s.contactButtonBackground } as React.CSSProperties}
                                                    placeholder="Tu nombre" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2" style={{ color: s.contactTextColor }}>
                                                    <EditableText elementId="contact_label_email" defaultText="Email corporativo *" tag="span" />
                                                </label>
                                                <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                                                    style={{ backgroundColor: s.contactInputBackground, border: `1px solid ${s.contactInputBorder}`, color: s.contactInputTextColor }}
                                                    placeholder="nombre@empresa.com" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-6">
                                            <div className="text-sm" style={{ color: s.contactTextColor }}>
                                                * <EditableText elementId="contact_required" defaultText="Campos obligatorios" tag="span" />
                                            </div>
                                            <button type="submit" disabled={isSubmitting}
                                                className="text-white font-semibold px-8 py-4 rounded-lg transition-all disabled:opacity-50 flex items-center"
                                                style={{ backgroundColor: s.contactButtonBackground, color: s.contactButtonText }}
                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = s.contactButtonHoverBackground; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = s.contactButtonBackground; }}>
                                                {isSubmitting ? <EditableText elementId="contact_sending" defaultText="Enviando..." tag="span" />
                                                    : <><EditableText elementId="contact_submit" defaultText="Solicitar reunión" tag="span" /><Send className="ml-2 w-5 h-5" /></>}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultingContact;
import {
    Award,
    BarChart,
    Globe,
    LineChart,
    Target,
    Users
} from 'lucide-react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors } from '../../types/template.types';

const ConsultingFeatures = () => {
    const { template } = useTemplate();

    // Fusionar valores por defecto con los del template
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };

    const features = [
        {
            icon: <BarChart className={s.iconSize} />,
            title: 'Análisis Estratégico',
            description: 'Evaluación profunda de tu mercado, competencia y posición actual para identificar oportunidades.',
            id: 'strategic'
        },
        {
            icon: <Users className={s.iconSize} />,
            title: 'Gestión del Talento',
            description: 'Desarrollo de equipos de alto rendimiento y cultura organizacional alineada a objetivos.',
            id: 'talent'
        },
        {
            icon: <Target className={s.iconSize} />,
            title: 'Planificación Comercial',
            description: 'Estrategias de ventas y marketing para penetrar mercados y fidelizar clientes.',
            id: 'commercial'
        },
        {
            icon: <LineChart className={s.iconSize} />,
            title: 'Optimización Financiera',
            description: 'Mejora de la rentabilidad, control de costos y planificación financiera a corto y largo plazo.',
            id: 'financial'
        },
        {
            icon: <Award className={s.iconSize} />,
            title: 'Certificaciones y Normas',
            description: 'Asesoramiento para obtener certificaciones de calidad que mejoren tu competitividad.',
            id: 'certifications'
        },
        {
            icon: <Globe className={s.iconSize} />,
            title: 'Expansión Internacional',
            description: 'Estrategias para llevar tu negocio a nuevos mercados con el menor riesgo posible.',
            id: 'international'
        },
    ];

    return (
        <section
            id="services"
            className="section-padding"
            style={{ backgroundColor: s.featuresBackground }}
        >
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2
                        className="text-4xl md:text-5xl font-bold mb-6"
                        style={{ color: s.featuresTitleColor }}
                    >
                        <EditableText
                            elementId="features_title_1"
                            defaultText="Capacidades que"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${s.featuresTitleColor}, ${s.featuresTitleColor})`,
                            }}
                        >
                            <EditableText
                                elementId="features_title_2"
                                defaultText="Transforman"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: s.featuresTitleColor }}
                    >
                        <EditableText
                            elementId="features_description"
                            defaultText="No solo aconsejamos, implementamos. Te acompañamos en cada paso con herramientas y metodologías probadas."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-xl"
                            style={{
                                backgroundColor: s.featuresCardBackground,
                                border: `1px solid ${s.featuresCardBorder}`,
                            }}
                        >
                            <div
                                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                                style={{ color: s.featuresIconColor }}
                            >
                                {feature.icon}
                            </div>

                            <h3
                                className="text-2xl font-bold mb-3 transition-colors group-hover:text-blue-600"
                                style={{ color: s.featuresTitleColor }}
                            >
                                <EditableText
                                    elementId={`feature_title_${feature.id}`}
                                    defaultText={feature.title}
                                    tag="span"
                                />
                            </h3>

                            <p
                                className="leading-relaxed"
                                style={{ color: s.featuresTitleColor }}
                            >
                                <EditableText
                                    elementId={`feature_desc_${feature.id}`}
                                    defaultText={feature.description}
                                    tag="span"
                                />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ConsultingFeatures;
import { Briefcase, Facebook, Heart, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors } from '../../types/template.types';

// Mapeo de iconos
const iconMap: Record<string, any> = {
    Briefcase, Mail, Phone, MapPin, Heart, Facebook, Instagram, Linkedin, Twitter,
    // añadir más si se necesitan
};

const ConsultingFooter = () => {
    const { template } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };

    const currentYear = new Date().getFullYear();

    // URLs redes sociales (desde template.texts)
    const socialUrls = {
        facebook: template?.texts?.social_facebook_url || '#',
        instagram: template?.texts?.social_instagram_url || '#',
        linkedin: template?.texts?.social_linkedin_url || '#',
        twitter: template?.texts?.social_twitter_url || '#',
    };

    const socialLinks = [
        { icon: <Facebook className={s.iconSize} />, label: 'Facebook', id: 'social_fb', url: socialUrls.facebook },
        { icon: <Instagram className={s.iconSize} />, label: 'Instagram', id: 'social_ig', url: socialUrls.instagram },
        { icon: <Linkedin className={s.iconSize} />, label: 'LinkedIn', id: 'social_li', url: socialUrls.linkedin },
        { icon: <Twitter className={s.iconSize} />, label: 'Twitter', id: 'social_tw', url: socialUrls.twitter },
    ];

    // Bloques de enlaces editables
    const quickLinks = [
        { id: 'link_home', defaultLabel: 'Inicio', defaultUrl: '#home' },
        { id: 'link_services', defaultLabel: 'Servicios', defaultUrl: '#services' },
        { id: 'link_methodology', defaultLabel: 'Metodología', defaultUrl: '#methodology' },
        { id: 'link_success', defaultLabel: 'Casos de éxito', defaultUrl: '#testimonials' },
        { id: 'link_contact', defaultLabel: 'Contacto', defaultUrl: '#contact' },
    ];

    const expertiseAreas = [
        { id: 'expertise_1', defaultLabel: 'Estrategia Corporativa' },
        { id: 'expertise_2', defaultLabel: 'Transformación Digital' },
        { id: 'expertise_3', defaultLabel: 'Gestión del Talento' },
        { id: 'expertise_4', defaultLabel: 'Finanzas Corporativas' },
        { id: 'expertise_5', defaultLabel: 'Expansión Internacional' },
    ];

    const contactInfo = [
        { id: 'contact_email', defaultIcon: 'Mail', defaultValue: 'consultoria@kernelize.com' },
        { id: 'contact_phone', defaultIcon: 'Phone', defaultValue: '+54 9 11 6745-7413' },
        { id: 'contact_location', defaultIcon: 'MapPin', defaultValue: 'Buenos Aires, Argentina' },
    ];

    const certifications = [
        { id: 'cert_1', defaultLabel: 'ISO 9001:2024' },
        { id: 'cert_2', defaultLabel: 'Miembro de AACCP' },
        { id: 'cert_3', defaultLabel: 'Certified Partners' },
        { id: 'cert_4', defaultLabel: '+15 años de experiencia' },
    ];

    const getIcon = (iconName: string, className: string = s.iconSize) => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon className={className} /> : <Briefcase className={className} />;
    };

    // Icono del logo (maletín)
    const brandIconName = template?.texts?.footer_brand_icon || 'Briefcase';
    const BrandIcon = iconMap[brandIconName] || Briefcase;

    // Icono del corazón (para "Hecho con")
    const heartIcon = <Heart className="w-4 h-4 text-red-500" />;

    return (
        <footer id="footer" className="border-t" style={{ backgroundColor: s.footerBackground, borderColor: `${s.footerLinkColor}40` }}>
            <div className="container-custom px-4 sm:px-6 lg:px-8">
                {/* Sección principal */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Información de la empresa */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(to right, ${s.footerLinkHoverColor}, ${s.footerHeadingColor})` }}>
                                <BrandIcon className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: s.footerHeadingColor }}>
                                <EditableText elementId="footer_brand_1" defaultText="Kernelize" tag="span" />
                                <EditableText elementId="footer_brand_2" defaultText="Consulting" tag="span" className="ml-1" />
                            </h2>
                        </div>
                        <p className="leading-relaxed" style={{ color: s.footerTextColor }}>
                            <EditableText elementId="footer_description" defaultText="Transformamos empresas a través de estrategias innovadoras y acompañamiento experto. Más de 15 años impulsando el éxito de nuestros clientes." tag="span" />
                        </p>
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => (
                                <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer"
                                    className="p-2 rounded-lg transition-all"
                                    style={{ backgroundColor: `${s.footerBackground}cc`, color: s.socialIconColor }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = s.socialIconHoverColor; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = s.socialIconColor; }}>
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Enlaces rápidos */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: s.footerHeadingColor }}>
                            <EditableText elementId="footer_quick_title" defaultText="Enlaces Rápidos" tag="span" />
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => {
                                const label = template?.texts?.[`footer_${link.id}_label`] || link.defaultLabel;
                                const url = template?.texts?.[`footer_${link.id}_url`] || link.defaultUrl;
                                return (
                                    <li key={link.id}>
                                        <a href={url} className="transition-colors" style={{ color: s.footerLinkColor }}
                                            onMouseEnter={(e) => { e.currentTarget.style.color = s.footerLinkHoverColor; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.color = s.footerLinkColor; }}>
                                            <EditableText elementId={`footer_${link.id}_label`} defaultText={label} tag="span" />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Áreas de Expertise */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: s.footerHeadingColor }}>
                            <EditableText elementId="footer_expertise_title" defaultText="Áreas de Expertise" tag="span" />
                        </h3>
                        <ul className="space-y-2">
                            {expertiseAreas.map((area) => (
                                <li key={area.id}>
                                    <span style={{ color: s.footerTextColor }}>
                                        <EditableText elementId={area.id} defaultText={area.defaultLabel} tag="span" />
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacto directo */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4" style={{ color: s.footerHeadingColor }}>
                            <EditableText elementId="footer_contact_title" defaultText="Contacto Directo" tag="span" />
                        </h3>
                        <div className="space-y-3">
                            {contactInfo.map((info) => {
                                const iconName = template?.texts?.[`footer_${info.id}_icon`] || info.defaultIcon;
                                const value = template?.texts?.[`footer_${info.id}_value`] || info.defaultValue;
                                return (
                                    <div key={info.id} className="flex items-start space-x-3">
                                        <span className="flex-shrink-0 mt-0.5" style={{ color: s.socialIconColor }}>
                                            {getIcon(iconName, s.iconSize)}
                                        </span>
                                        <span style={{ color: s.footerTextColor }}>
                                            <EditableText elementId={`footer_${info.id}_value`} defaultText={value} tag="span" />
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="border-t" style={{ borderColor: `${s.footerLinkColor}40` }}></div>

                {/* Sección inferior */}
                <div className="py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-center md:text-left">
                        <p style={{ color: s.footerTextColor }}>
                            © {currentYear} <EditableText elementId="footer_copyright" defaultText="Kernelize Consulting. Todos los derechos reservados." tag="span" />
                        </p>
                        <p className="text-sm mt-1 flex items-center justify-center md:justify-start" style={{ color: s.footerTextColor }}>
                            <EditableText elementId="footer_made_with" defaultText="Hecho con" tag="span" />
                            {heartIcon}
                            <EditableText elementId="footer_for" defaultText="para empresas que buscan crecer" tag="span" />
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end gap-4">
                        {['terms', 'privacy', 'cookies'].map((type) => {
                            const labelKey = `footer_${type}_label`;
                            const urlKey = `footer_${type}_url`;
                            const defaultLabels = { terms: 'Términos y condiciones', privacy: 'Política de privacidad', cookies: 'Cookies' };
                            return (
                                <a key={type} href={template?.texts?.[urlKey] || '#'} className="text-sm transition-colors"
                                    style={{ color: s.footerLinkColor }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = s.footerLinkHoverColor; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = s.footerLinkColor; }}>
                                    <EditableText elementId={labelKey} defaultText={defaultLabels[type as keyof typeof defaultLabels]} tag="span" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Certificaciones */}
                <div className="pb-8 pt-4 border-t" style={{ borderColor: `${s.footerLinkColor}40` }}>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                        {certifications.map((cert) => (
                            <span key={cert.id} className="px-3 py-1 rounded-full border"
                                style={{ backgroundColor: `${s.footerBackground}cc`, borderColor: s.footerLinkColor, color: s.footerTextColor }}>
                                <EditableText elementId={cert.id} defaultText={cert.defaultLabel} tag="span" />
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ConsultingFooter;
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import logoDefault from '../../assets/logo.png';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';
import { defaultSectionColors } from '../../types/template.types';

interface ConsultingHeaderProps {
    className?: string;
}

const ConsultingHeader: React.FC<ConsultingHeaderProps> = ({ className = '' }) => {
    const { template } = useTemplate();
    const { config } = useTemplateEditor();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Colores del header desde sectionColors (con fallback completo)
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };

    // Definir los ítems de navegación con sus textos y URLs desde template.texts
    const navItems = [
        { id: 'nav_home', label: 'Inicio', defaultText: 'Inicio', defaultUrl: '#home' },
        { id: 'nav_services', label: 'Servicios', defaultText: 'Servicios', defaultUrl: '#services' },
        { id: 'nav_methodology', label: 'Metodología', defaultText: 'Metodología', defaultUrl: '#methodology' },
        { id: 'nav_testimonials', label: 'Casos de éxito', defaultText: 'Casos de éxito', defaultUrl: '#testimonials' },
        { id: 'nav_contact', label: 'Contacto', defaultText: 'Contacto', defaultUrl: '#contact' },
    ];

    // Obtener textos y URLs desde template.texts (con fallbacks)
    const getNavUrl = (item: typeof navItems[0]) =>
        template?.texts?.[`${item.id}_url`] || item.defaultUrl;

    // Texto y URL del botón CTA del header
    // const ctaText = template?.texts?.header_cta || 'Consultoría gratuita';
    const ctaUrl = template?.texts?.header_cta_url || '#contact';

    // Manejar clic en enlaces durante modo edición
    const handleNavClick = (e: React.MouseEvent, href: string) => {
        if (config.isEditing) {
            e.preventDefault();
            return;
        }
        window.location.href = href;
    };

    // Manejar clic en el logo (activa edición de imagen)
    const handleLogoClick = (e: React.MouseEvent) => {
        if (config.isEditing) {
            e.preventDefault();
            const logoElement = document.getElementById('header_logo');
            if (logoElement) logoElement.click();
        }
    };

    console.log('Logo colors:', s.logoTextColor1, s.logoTextColor2);

    return (
        <header
            className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${className}`}
            style={{
                backgroundColor: s.headerBackground,
                borderColor: `${s.headerLinkColor}40`,
            }}
        >
            <div className="container-custom px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo editable */}
                    <a
                        // href="/"
                        onClick={handleLogoClick}
                        className="flex items-center space-x-3 group"
                    >
                        <div id="header_logo" data-element-id="header_logo" className="relative">
                            <EditableImage
                                elementId="header_logo"
                                defaultImage={logoDefault}
                                alt="Kernelize Consulting"
                                className="w-12 h-12 rounded-lg object-cover"
                                category="consulting"
                                containerClassName=""
                                modalRelative={true}

                            />
                        </div>
                        <div className={`${s.logoTextSize} font-bold`}>
                            <span style={{ color: s.logoTextColor1 }}>
                                <EditableText
                                    elementId="header_brand_1"
                                    defaultText="KE"
                                    tag="span"
                                // className="text-blue-600 dark:text-blue-400"
                                />
                            </span>
                            <span style={{ color: s.logoTextColor2 }}>
                                <EditableText
                                    elementId="header_brand_2"
                                    defaultText="Consulting"
                                    tag="span"
                                // className="text-slate-600 dark:text-slate-400 ml-1"
                                />
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation (sin cambios) */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                id={item.id}
                                data-element-id={item.id}
                                href={getNavUrl(item)}
                                onClick={(e) => handleNavClick(e, getNavUrl(item))}
                                className="font-medium transition-colors"
                                style={{ color: s.headerLinkColor }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = s.headerLinkHoverColor;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = s.headerLinkColor;
                                }}
                            >
                                <EditableText
                                    elementId={item.id}
                                    defaultText={item.defaultText}
                                    tag="span"
                                />
                            </a>
                        ))}
                        <a
                            href={ctaUrl}
                            id="header_cta"
                            data-element-id="header_cta"
                            onClick={(e) => handleNavClick(e, ctaUrl)}
                            className="px-5 py-2.5 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                            style={{
                                backgroundColor: s.headerCtaBackground,
                                color: s.headerCtaText,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = s.headerCtaHoverBackground;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = s.headerCtaBackground;
                            }}
                        >
                            <EditableText
                                elementId="header_cta"
                                defaultText="Consultoría gratuita"
                                tag="span"
                            />
                        </a>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 transition-colors"
                            style={{ color: s.headerTextColor }}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div
                    className="md:hidden border-t"
                    style={{
                        backgroundColor: s.headerBackground,
                        borderColor: `${s.headerLinkColor}40`,
                    }}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                id={item.id}
                                data-element-id={item.id}
                                href={getNavUrl(item)}
                                onClick={(e) => {
                                    handleNavClick(e, getNavUrl(item));
                                    setIsMenuOpen(false);
                                }}
                                className="block px-3 py-2 transition-colors"
                                style={{ color: s.headerLinkColor }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = s.headerLinkHoverColor;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = s.headerLinkColor;
                                }}
                            >
                                <EditableText
                                    elementId={item.id}
                                    defaultText={item.defaultText}
                                    tag="span"
                                />
                            </a>
                        ))}
                        <div className="px-3 py-2">
                            <a
                                href={ctaUrl}
                                id="header_cta"
                                data-element-id="header_cta"
                                onClick={(e) => {
                                    handleNavClick(e, ctaUrl);
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-center px-4 py-2 text-white font-semibold rounded-lg"
                                style={{
                                    backgroundColor: s.headerCtaBackground,
                                    color: s.headerCtaText,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = s.headerCtaHoverBackground;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = s.headerCtaBackground;
                                }}
                            >
                                <EditableText
                                    elementId="header_cta"
                                    defaultText="Consultoría gratuita"
                                    tag="span"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default ConsultingHeader;
import { ArrowRight, Award, BarChart, Briefcase, Globe, LineChart, Target, TrendingUp, Users, type LucideIcon } from 'lucide-react';
import EditableImage from '../../components/Editor/EditableImage';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors } from '../../types/template.types';

// Mapeo de nombres de iconos a componentes de Lucide
const iconMap: Record<string, LucideIcon> = {
    TrendingUp,
    Users,
    Target,
    Award,
    Briefcase,
    BarChart,
    LineChart,
    Globe,
};

const ConsultingHero = () => {
    const { template } = useTemplate();

    // Colores por sección
    const s = template?.sectionColors || defaultSectionColors;

    const typography = template?.typography || {
        heroTitleSize: '3rem',
        heroDescriptionSize: '1.125rem',
        headingFont: 'Inter, system-ui, sans-serif',
    };

    const defaultButtons = {
        primary: { text: 'Solicitar consultoría', url: '/contacto', openInNewTab: false },
        secondary: { text: 'Conocer metodología', url: '#metodologia', openInNewTab: false },
    };

    const buttons = {
        primary: {
            text: template?.buttons?.primary?.text || defaultButtons.primary.text,
            url: template?.buttons?.primary?.url || defaultButtons.primary.url,
            openInNewTab: template?.buttons?.primary?.openInNewTab ?? defaultButtons.primary.openInNewTab,
        },
        secondary: {
            text: template?.buttons?.secondary?.text || defaultButtons.secondary.text,
            url: template?.buttons?.secondary?.url || defaultButtons.secondary.url,
            openInNewTab: template?.buttons?.secondary?.openInNewTab ?? defaultButtons.secondary.openInNewTab,
        },
    };

    const ui = template?.ui || {
        borderRadius: { medium: '0.5rem' },
        boxShadow: { medium: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
    };

    // Obtener nombres de iconos desde template.texts (valores por defecto)
    const icon1Name = template?.texts?.hero_icon_1 || 'TrendingUp';
    const icon2Name = template?.texts?.hero_icon_2 || 'Users';
    const icon3Name = template?.texts?.hero_icon_3 || 'Target';

    const Icon1 = iconMap[icon1Name] || TrendingUp;
    const Icon2 = iconMap[icon2Name] || Users;
    const Icon3 = iconMap[icon3Name] || Target;

    // Forzar re-render cuando cambien los iconos o los colores
    const forceUpdateKey = JSON.stringify({
        bg: s.buttonSecondaryBackground,
        text: s.buttonSecondaryText,
        hover: s.buttonSecondaryHoverBackground,
        icon1: icon1Name,
        icon2: icon2Name,
        icon3: icon3Name,
    });

    return (
        <section
            id="home"
            key={forceUpdateKey}
            className="relative section-padding overflow-hidden"
            style={{
                backgroundColor: s.heroBackground,
                // fontFamily eliminado para que herede del estilo global
            }}
        >
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
                    style={{ backgroundColor: s.buttonPrimaryBackground }}
                />
                <div
                    className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"
                    style={{ backgroundColor: s.buttonPrimaryBackground }}
                />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">
                        {/* Badge */}
                        <div>
                            <span
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border"
                                style={{
                                    backgroundColor: s.heroBadgeBackground,
                                    borderColor: s.heroBadgeBackground,
                                    color: s.heroBadgeTextColor,
                                }}
                            >
                                <Target className="w-4 h-4 mr-2" />
                                <EditableText elementId="hero_badge" defaultText="Consultoría Estratégica de Negocios" tag="span" />
                            </span>
                        </div>

                        {/* Título */}
                        <h1
                            className="font-bold leading-tight"
                            style={{
                                fontSize: typography.heroTitleSize,
                                color: s.heroTitleColor,
                            }}
                        >
                            <EditableText elementId="hero_title_1" defaultText="Impulsamos el" tag="span" />{' '}
                            <span
                                className="text-transparent bg-clip-text"
                                style={{
                                    backgroundImage: `linear-gradient(to right, ${s.heroTitleColor}, ${s.heroTitleColor})`,
                                }}
                            >
                                <EditableText elementId="hero_title_2" defaultText="Crecimiento Sostenible" tag="span" />
                            </span>{' '}
                            <EditableText elementId="hero_title_3" defaultText="de tu Empresa" tag="span" />
                        </h1>

                        {/* Descripción */}
                        <p
                            className="max-w-2xl"
                            style={{
                                fontSize: typography.heroDescriptionSize,
                                color: s.heroDescriptionColor,
                            }}
                        >
                            <EditableText
                                elementId="hero_description"
                                defaultText="Análisis profundo, estrategias personalizadas y acompañamiento continuo para llevar tu negocio al siguiente nivel."
                                tag="span"
                            />
                        </p>

                        {/* Botones */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href={buttons.primary.url}
                                target={buttons.primary.openInNewTab ? '_blank' : '_self'}
                                rel={buttons.primary.openInNewTab ? 'noopener noreferrer' : undefined}
                                className="group font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                                style={{
                                    backgroundColor: s.buttonPrimaryBackground,
                                    color: s.buttonPrimaryText,
                                    borderRadius: ui.borderRadius.medium,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = s.buttonPrimaryHoverBackground;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = s.buttonPrimaryBackground;
                                }}
                            >
                                <EditableText elementId="cta_primary" defaultText={buttons.primary.text} tag="span" />
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>

                            <a
                                href={buttons.secondary.url}
                                target={buttons.secondary.openInNewTab ? '_blank' : '_self'}
                                rel={buttons.secondary.openInNewTab ? 'noopener noreferrer' : undefined}
                                className="group font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center border-2"
                                style={{
                                    backgroundColor: s.buttonSecondaryBackground,
                                    color: s.buttonSecondaryText,
                                    borderColor: s.buttonPrimaryBackground,
                                    borderRadius: ui.borderRadius.medium,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = s.buttonSecondaryHoverBackground;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = s.buttonSecondaryBackground;
                                }}
                            >
                                <EditableText elementId="cta_secondary" defaultText={buttons.secondary.text} tag="span" />
                            </a>
                        </div>
                    </div>

                    {/* Columna derecha: imagen + estadísticas */}
                    <div className="space-y-6">
                        <div className="relative z-10 rounded-2xl border shadow-2xl overflow-hidden">
                            <EditableImage
                                elementId="hero_image"
                                defaultImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
                                alt="Consultoría estratégica"
                                className="w-full h-auto"
                                category="consulting"
                            />
                        </div>

                        <div
                            className="grid grid-cols-3 gap-4 p-4 rounded-xl shadow-xl backdrop-blur-sm"
                            style={{
                                backgroundColor: `${s.heroBackground}cc`,
                                border: `1px solid ${s.buttonPrimaryBackground}40`,
                            }}
                        >
                            {/* Estadística 1 */}
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <Icon1 className={s.iconSize} style={{ color: s.iconColor }} />
                                </div>
                                <div className="text-xl font-bold" style={{ color: s.statValueColor }}>
                                    <EditableText elementId="stat_value_1" defaultText="+45%" tag="span" />
                                </div>
                                <div className="text-xs" style={{ color: s.statLabelColor }}>
                                    <EditableText elementId="stat_label_1" defaultText="crecimiento" tag="span" />
                                </div>
                            </div>

                            {/* Estadística 2 */}
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <Icon2 className={s.iconSize} style={{ color: s.iconColor }} />
                                </div>
                                <div className="text-xl font-bold" style={{ color: s.statValueColor }}>
                                    <EditableText elementId="stat_value_2" defaultText="+15" tag="span" />
                                </div>
                                <div className="text-xs" style={{ color: s.statLabelColor }}>
                                    <EditableText elementId="stat_label_2" defaultText="equipos" tag="span" />
                                </div>
                            </div>

                            {/* Estadística 3 */}
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <Icon3 className={s.iconSize} style={{ color: s.iconColor }} />
                                </div>
                                <div className="text-xl font-bold" style={{ color: s.statValueColor }}>
                                    <EditableText elementId="stat_value_3" defaultText="100%" tag="span" />
                                </div>
                                <div className="text-xs" style={{ color: s.statLabelColor }}>
                                    <EditableText elementId="stat_label_3" defaultText="objetivos" tag="span" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultingHero;
import { useLayoutEffect, useRef } from 'react';
import EditorDashboard from '../../components/Editor/EditorDashboard';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultTypography } from '../../types/template.types';
import ConsultingAbout from './ConsultingAbout';
import ConsultingContact from './ConsultingContact';
import ConsultingFeatures from './ConsultingFeatures';
import ConsultingFooter from './ConsultingFooter';
import ConsultingHeader from './ConsultingHeader';
import ConsultingHero from './ConsultingHero';
import ConsultingTestimonials from './ConsultingTestimonials';

interface ConsultingLandingProps {
    onHomeClick?: () => void;
}

const ConsultingLanding: React.FC<ConsultingLandingProps> = ({ onHomeClick }) => {
    const { template } = useTemplate();
    const typography = template?.typography || defaultTypography;
    const rootRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (rootRef.current) {
            rootRef.current.style.setProperty('--font-heading', typography.headingFont);
            rootRef.current.style.setProperty('--font-body', typography.bodyFont);
        }
    }, [typography]);

    return (
        <div className="min-h-screen flex">
            <EditorDashboard onHomeClick={onHomeClick} />
            <div
                ref={rootRef}
                id="template-root"
                className="flex-1 flex flex-col"
                style={{
                    '--font-heading': typography.headingFont,
                    '--font-body': typography.bodyFont,
                } as React.CSSProperties}
            >
                <ConsultingHeader />
                <main className="flex-grow">
                    <ConsultingHero />
                    <ConsultingFeatures />
                    <ConsultingAbout />
                    <ConsultingTestimonials />
                    <ConsultingContact />
                </main>
                <ConsultingFooter />
            </div>
        </div>
    );
};

export default ConsultingLanding;
import { Quote, Star } from 'lucide-react';
import EditableText from '../../components/Editor/EditableText';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultSectionColors } from '../../types/template.types';
// Mapeo de nombres de iconos a componentes (importa los que necesites)
import {
    Award,
    BarChart,
    Briefcase,
    CheckCircle, Clock,
    Eye,
    Globe,
    Heart,
    LineChart,
    MessageCircle, Phone,
    Target,
    ThumbsUp,
    TrendingUp, Users,
    Zap
} from 'lucide-react';

const iconMap: Record<string, any> = {
    TrendingUp, Users, Target, Award, Briefcase, BarChart, LineChart, Globe,
    CheckCircle, Clock, Heart, ThumbsUp, Zap, Eye, MessageCircle, Phone,
};

const ConsultingTestimonials = () => {
    const { template } = useTemplate();
    const s = { ...defaultSectionColors, ...(template?.sectionColors || {}) };

    // Testimonios: nombres, roles, contenidos desde template.texts
    const testimonials = [
        {
            id: 'carlos',
            defaultName: 'Carlos Méndez',
            defaultRole: 'CEO - TechCorp LATAM',
            defaultContent: 'El equipo de Kernelize reestructuró nuestra estrategia comercial por completo. En 6 meses, aumentamos nuestras ventas un 60% y optimizamos nuestros procesos internos. Su enfoque analítico y profesionalismo son inigualables.',
            rating: 5,
            image: 'CM'
        },
        {
            id: 'laura',
            defaultName: 'Laura Fernández',
            defaultRole: 'Directora de Operaciones - Grupo Logístico',
            defaultContent: 'Necesitábamos expandirnos a nuevos mercados y ellos nos guiaron paso a paso. Desde el estudio de mercado hasta la implementación local. Una consultora que realmente se involucra en el éxito de sus clientes.',
            rating: 5,
            image: 'LF'
        },
        {
            id: 'roberto',
            defaultName: 'Roberto Sánchez',
            defaultRole: 'Fundador - Inversiones RS',
            defaultContent: 'Contratamos su servicio de planificación financiera y los resultados fueron inmediatos. No solo mejoraron nuestra rentabilidad, sino que nos dieron la claridad y el control que necesitábamos para escalar.',
            rating: 5,
            image: 'RS'
        },
    ];

    // Indicadores de confianza: icono, valor, label desde template.texts
    const trustIndicators = [
        {
            id: 'projects',
            defaultIcon: 'Briefcase',
            defaultValue: '100+',
            defaultLabel: 'Proyectos anuales'
        },
        {
            id: 'industries',
            defaultIcon: 'BarChart',
            defaultValue: '15',
            defaultLabel: 'Industrias diferentes'
        },
        {
            id: 'satisfaction',
            defaultIcon: 'Heart',
            defaultValue: '98%',
            defaultLabel: 'Tasa de satisfacción'
        },
        {
            id: 'support',
            defaultIcon: 'Clock',
            defaultValue: '24/7',
            defaultLabel: 'Soporte a clientes'
        },
    ];

    // const getIcon = (iconName: string) => {
    //     const Icon = iconMap[iconName];
    //     return Icon ? <Icon className="w-8 h-8 mx-auto mb-2" /> : null;
    // };

    return (
        <section
            id="testimonials"
            className="section-padding"
            style={{ backgroundColor: s.testimonialsBackground }}
        >
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                        style={{
                            background: `linear-gradient(to right, ${s.testimonialsTitleColor}, ${s.testimonialsTitleColor})`,
                        }}
                    >
                        <Quote className="w-8 h-8 text-white" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: s.testimonialsTitleColor }}>
                        <EditableText
                            elementId="testimonials_title_1"
                            defaultText="Lo que dicen nuestros"
                            tag="span"
                        />{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${s.testimonialsTitleColor}, ${s.testimonialsTitleColor})`,
                            }}
                        >
                            <EditableText
                                elementId="testimonials_title_2"
                                defaultText="clientes"
                                tag="span"
                            />
                        </span>
                    </h2>
                    <p className="text-xl" style={{ color: s.testimonialsTextColor }}>
                        <EditableText
                            elementId="testimonials_description"
                            defaultText="Historias reales de transformación empresarial."
                            tag="span"
                        />
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t) => {
                        const name = template?.texts?.[`testimonial_name_${t.id}`] || t.defaultName;
                        const role = template?.texts?.[`testimonial_role_${t.id}`] || t.defaultRole;
                        const content = template?.texts?.[`testimonial_content_${t.id}`] || t.defaultContent;
                        return (
                            <div
                                key={t.id}
                                className="rounded-2xl p-8 h-full transition-colors"
                                style={{
                                    backgroundColor: s.testimonialsCardBackground,
                                    border: `1px solid ${s.testimonialsCardBorder}`,
                                }}
                            >
                                <div className="flex mb-6">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-lg italic mb-8" style={{ color: s.testimonialsTextColor }}>
                                    "<EditableText
                                        elementId={`testimonial_content_${t.id}`}
                                        defaultText={content}
                                        tag="span"
                                    />"
                                </p>

                                <div className="flex items-center pt-6 border-t" style={{ borderColor: s.testimonialsCardBorder }}>
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                                        style={{ backgroundColor: s.testimonialsNameColor }}
                                    >
                                        {t.image}
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold" style={{ color: s.testimonialsNameColor }}>
                                            <EditableText
                                                elementId={`testimonial_name_${t.id}`}
                                                defaultText={name}
                                                tag="span"
                                            />
                                        </h4>
                                        <p className="text-sm" style={{ color: s.testimonialsRoleColor }}>
                                            <EditableText
                                                elementId={`testimonial_role_${t.id}`}
                                                defaultText={role}
                                                tag="span"
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-16 pt-16 border-t" style={{ borderColor: s.testimonialsCardBorder }}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {trustIndicators.map((ind) => {
                            const iconName = template?.texts?.[`indicator_icon_${ind.id}`] || ind.defaultIcon;
                            const value = template?.texts?.[`indicator_value_${ind.id}`] || ind.defaultValue;
                            const label = template?.texts?.[`indicator_label_${ind.id}`] || ind.defaultLabel;
                            const Icon = iconMap[iconName];
                            return (
                                <div key={ind.id} className="text-center">
                                    {Icon && <Icon className="w-10 h-10 mx-auto mb-2" style={{ color: s.testimonialsTitleColor }} />}
                                    <div
                                        className="text-3xl font-bold text-transparent bg-clip-text mb-2"
                                        style={{
                                            backgroundImage: `linear-gradient(to right, ${s.testimonialsTitleColor}, ${s.testimonialsTitleColor})`,
                                        }}
                                    >
                                        <EditableText
                                            elementId={`indicator_value_${ind.id}`}
                                            defaultText={value}
                                            tag="span"
                                        />
                                    </div>
                                    <div className="text-sm" style={{ color: s.testimonialsTextColor }}>
                                        <EditableText
                                            elementId={`indicator_label_${ind.id}`}
                                            defaultText={label}
                                            tag="span"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultingTestimonials;
import React from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, className = '' }) => {
  // const { resolvedTheme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <Header />
      <main className="flex-grow">
        {/* dentro de este main van los componentes que el cliente quiera colocar */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
// src/layouts/EditorLayout.tsx
import { useEffect, useRef } from 'react';
// import EditorDashboard from '../components/Editor/EditorDashboard';
import { TemplateProvider, useTemplate } from '../contexts/TemplateContext';
import { TemplateEditorProvider } from '../contexts/TemplateEditorContext';

interface EditorLayoutProps {
    templateData: any;
    onClose: () => void;
    children: React.ReactNode;
    isPreview?: boolean;
}

// Componente interno que usa el contexto
const EditorContent = ({ templateData, children }: { templateData: any; onClose: () => void; children: React.ReactNode; isPreview?: boolean }) => {
    const { setTemplate/*, template*/ } = useTemplate();
    const initialized = useRef(false);
    const lastTemplateId = useRef<string | null>(null);

    // Solo inicializar una vez cuando se monta el componente
    useEffect(() => {
        if (templateData && !initialized.current) {
            console.log('🔄 Inicializando template en el editor (una sola vez):', templateData.id);
            setTemplate(templateData);
            initialized.current = true;
            lastTemplateId.current = templateData.id;
        }
    }, [templateData, setTemplate]);

    // Solo actualizar si el ID del template cambió
    useEffect(() => {
        if (templateData && initialized.current && lastTemplateId.current !== templateData.id) {
            console.log('🔄 Template diferente detectado, actualizando:', templateData.id);
            setTemplate(templateData);
            lastTemplateId.current = templateData.id;
        }
    }, [templateData, setTemplate]);

    return (
        <>
            {children}
            {/* En modo preview, no mostrar el dashboard de edición */}
            {/* {!isPreview && <EditorDashboard onHomeClick={onClose} />} */}
        </>
    );
};

export const EditorLayout = ({ templateData, onClose, children, isPreview = false }: EditorLayoutProps) => {
    // Si no hay templateData, no renderizar
    if (!templateData) {
        return <div className="min-h-screen flex items-center justify-center">Cargando editor...</div>;
    }

    return (
        <TemplateProvider>
            <TemplateEditorProvider>
                <EditorContent templateData={templateData} onClose={onClose} isPreview={isPreview}>
                    {children}
                </EditorContent>
            </TemplateEditorProvider>
        </TemplateProvider>
    );
};
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
// src/layouts/MyTemplatesLayout.tsx
import { ArrowRight, Edit3, Lock, Package, Sparkles } from 'lucide-react';
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
    /* user,
     isAuthenticated*/
}: MyTemplatesLayoutProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
            <UserHeader />

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
                                className="card active group hover:shadow-2xl transition-all duration-300 relative overflow-hidden cursor-pointer"
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

                        <div

                            className="card group hover:shadow-2xl transition-all duration-300 relative overflow-hidden cursor-pointer"

                        >
                            <div className="relative h-48 bg-gradient-to-r from-primary-200 to-accent-500 flex items-center justify-center">
                                {/* No disponible */}
                                <div className="text-center">
                                    <div className="text-white text-4xl mb-2">➕</div>
                                    <div className="text-white font-semibold">No disponible </div>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-xl dark:text-white group-hover:text-primary-500 transition-colors">
                                       Mi Nuevo template 
                                    </h3>
                                    <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">

                                    </span>
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">

                                </p>
                                <div className="flex justify-between items-center pt-3 border-t border-neutral-200 dark:border-neutral-800">
                                    <button

                                        className="btn-light text-sm px-4 py-2 flex items-center gap-2 group/btn"
                                    >
                                        <Lock className="w-4 h-4" />
                                        Crear
                                    </button>
                                    <span className="text-xs text-neutral-400">
                                        Nuevo
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    // nueva


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
// src/layouts/OwnTemplateLayout.tsx
import { ArrowRight, CheckCircle, Clock, Edit3, Package, Sparkles, Type } from 'lucide-react';
import { UserHeader } from './UserHeader';
import { useEffect } from 'react';

interface OwnTemplateLayoutProps {
    userTemplate: any;
    onEdit: () => void;
    onViewMyTemplates: () => void;
    onExploreGallery: () => void;
    onLogout: () => void;
    onLogin: () => void;
    isAuthenticated: boolean;
    user: any;
}

export const OwnTemplateLayout = ({
    userTemplate,
    onEdit,
    onViewMyTemplates,
    onExploreGallery
}: OwnTemplateLayoutProps) => {

    // Agregar logs para verificar
    useEffect(() => {
        console.log('🎨 OwnTemplateLayout - userTemplate actualizado:', userTemplate);
        console.log('🎨 Colors:', userTemplate?.colors);
    }, [userTemplate]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
            <UserHeader />

            {/* Previsualización */}
            <div className="container-custom px-4 pt-32 pb-16 ">
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
                    <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
                        <h2 className="text-2xl font-bold mb-2">Previsualización de tu plantilla</h2>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Así se verá tu sitio web con los colores y textos que seleccionaste
                        </p>
                        <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 flex flex-wrap justify-center gap-4">
                            <button
                                onClick={onEdit}
                                className="btn-primary px-8 py-3 flex items-center gap-2"
                            >
                                <Edit3 className="w-5 h-5" />
                                Seguir editando
                            </button>
                            <button
                                onClick={onViewMyTemplates}
                                className="btn-secondary px-8 py-3 flex items-center gap-2"
                            >
                                <Package className="w-5 h-5" />
                                Ver mis plantillas
                            </button>
                        </div>
                    </div>

                    <div className="text-center px-4">
                        {/* <div className="inline-flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full mb-6 border border-green-500/20">
                            <Sparkles className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                Tu template personalizado
                            </span>
                        </div> */}
                        {/* <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                    {userTemplate?.name || 'Mi plantilla personalizada'}
                </h1> */}
                        <p className="text-neutral-600 mt-10  dark:text-neutral-400 max-w-2xl mx-auto text-md mb-4">
                            ¡Excelente elección! Hemos guardado tu plantilla con todas tus personalizaciones.
                        </p>

                        {/* Información de tiempos */}
                        <div className="flex flex-wrap justify-center gap-6 mt-8">
                            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-lg border border-neutral-200 dark:border-neutral-700 min-w-[200px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <Clock className="w-6 h-6 text-blue-500" />
                                    <span className="font-semibold text-lg">Tiempo de revisión</span>
                                </div>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">24-48 horas</p>
                                <p className="text-sm text-neutral-500 mt-1">Nuestro equipo revisará tus cambios</p>
                            </div>

                            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-lg border border-neutral-200 dark:border-neutral-700 min-w-[200px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                    <span className="font-semibold text-lg">Correcciones</span>
                                </div>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">2-3 días hábiles</p>
                                <p className="text-sm text-neutral-500 mt-1">Tiempo estimado de implementación</p>
                            </div>

                            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-lg border border-neutral-200 dark:border-neutral-700 min-w-[200px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <Edit3 className="w-6 h-6 text-purple-500" />
                                    <span className="font-semibold text-lg">Estado</span>
                                </div>
                                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">En revisión</p>
                                <p className="text-sm text-neutral-500 mt-1">Te notificaremos cuando esté listo</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">

                        <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-6">
                            <div
                                className="p-8 rounded-xl transition-all"
                                style={{
                                    backgroundColor: userTemplate?.colors?.background || '#ffffff',
                                    color: userTemplate?.colors?.text || '#0f172a'
                                }}
                            >
                                <div className="text-center mb-8">
                                    <div
                                        className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                                        style={{
                                            backgroundColor: `${userTemplate?.colors?.primary || '#2563eb'}20`,
                                            color: userTemplate?.colors?.primary || '#2563eb'
                                        }}
                                    >
                                        Tu sitio personalizado
                                    </div>
                                    <h1
                                        className="text-4xl font-bold mb-4"
                                        style={{ color: userTemplate?.colors?.primary || '#2563eb' }}
                                    >
                                        {userTemplate?.name || 'Mi sitio web'}
                                    </h1>
                                    <p className="text-lg max-w-2xl mx-auto">
                                        Sitio web diseñado especialmente para ti con los colores y estilo que elegiste.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                                    <div
                                        className="p-6 rounded-xl text-center"
                                        style={{ backgroundColor: `${userTemplate?.colors?.primary || '#2563eb'}10` }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                                            style={{ backgroundColor: userTemplate?.colors?.primary || '#2563eb' }}
                                        >
                                            <Sparkles className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2">Diseño personalizado</h3>
                                        <p className="text-sm opacity-80">Con los colores que seleccionaste</p>
                                    </div>

                                    <div
                                        className="p-6 rounded-xl text-center"
                                        style={{ backgroundColor: `${userTemplate?.colors?.secondary || '#475569'}10` }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                                            style={{ backgroundColor: userTemplate?.colors?.secondary || '#475569' }}
                                        >
                                            <Type className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2">Textos personalizados</h3>
                                        <p className="text-sm opacity-80">Adaptados a tu negocio</p>
                                    </div>

                                    <div
                                        className="p-6 rounded-xl text-center"
                                        style={{ backgroundColor: `${userTemplate?.colors?.accent || '#1e293b'}10` }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                                            style={{ backgroundColor: userTemplate?.colors?.accent || '#1e293b' }}
                                        >
                                            <CheckCircle className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2">Listo para publicar</h3>
                                        <p className="text-sm opacity-80">Revisión en curso</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>



            {/* CTA */}
            <div className="gradient-bg rounded-3xl mx-4 sm:mx-6 lg:mx-auto container-custom mb-16 p-6 md:p-8 text-center">
                <h3 className="heading-3 text-gradient mb-4">¿Quieres explorar más plantillas?</h3>
                <p className="text-neutral-600 dark:text-primary-400 max-w-2xl mx-auto mb-6">
                    Visualiza nuestras plantillas profesionales y encuentra inspiración para tu próximo proyecto.
                </p>
                <button
                    onClick={onExploreGallery}
                    className="btn-primary inline-flex items-center gap-2 group"
                >
                    <Sparkles className="w-5 h-5" />
                    Explorar plantillas
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};
// src/layouts/UserHeader.tsx
import Header from '../components/Header/Header';


export const UserHeader = () => {
    // const { user, isAuthenticated } = useAuth();

    return (
        <>
        <Header/>
        </>
        // <div className="fixed top-6 right-6 z-50">
        //     {isAuthenticated && user ? (
        //         <div className="flex items-center gap-3 bg-white/90 dark:bg-neutral-800/90 p-2 pl-4 rounded-full shadow-lg backdrop-blur-md border border-neutral-200 dark:border-neutral-700">
        //             <span className="text-sm font-medium dark:text-white">{user.name || user.email}</span>
        //             <button
        //                 onClick={onLogout}
        //                 className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-4 py-1.5 rounded-full hover:shadow-md transition-all"
        //             >
        //                 Salir
        //             </button>
        //         </div>
        //     ) : (
        //         <button
        //             onClick={onLogin}
        //             className="btn-primary text-sm px-5 py-2 flex items-center gap-2 shadow-lg"
        //         >
        //             <span>Iniciar sesión</span>
        //             <ArrowRight className="w-4 h-4" />
        //         </button>
        //     )}
        // </div>
    );
};
// src/hooks/useAuthHandler.ts
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const useAuthHandler = () => {
    const { user, isAuthenticated, isLoading: authLoading, isRefreshing, refreshUser } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tokenFromUrl = searchParams.get('token');

    const hasProcessedToken = useRef(false);
    const redirectAttempted = useRef(false);
    const authCheckInterval = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [processingToken, setProcessingToken] = useState(false);
    const [authReady, setAuthReady] = useState(false);

    // Procesar token de URL
    useEffect(() => {
        const processToken = async () => {
            if (hasProcessedToken.current || !tokenFromUrl || processingToken) return;

            hasProcessedToken.current = true;
            setProcessingToken(true);
            setAuthReady(false);

            try {
                localStorage.setItem('token', tokenFromUrl);
                await refreshUser();
                window.history.replaceState({}, document.title, window.location.pathname);
                await new Promise(resolve => setTimeout(resolve, 300));
                setAuthReady(true);
            } catch (error) {
                console.error('❌ Error procesando token:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('refreshToken');
                hasProcessedToken.current = false;
                setAuthReady(true);
            } finally {
                setProcessingToken(false);
            }
        };

        processToken();
    }, [tokenFromUrl, refreshUser, processingToken]);

    // Redirección a login
    useEffect(() => {
        if (authCheckInterval.current) {
            clearInterval(authCheckInterval.current);
            authCheckInterval.current = null;
        }

        if (isAuthenticated) {
            redirectAttempted.current = false;
            return;
        }

        if (processingToken || isRefreshing || authLoading || (tokenFromUrl && !authReady)) return;
        if (redirectAttempted.current) return;

        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser && !isAuthenticated && !processingToken && !isRefreshing) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
        }

        if (!storedToken && !tokenFromUrl && !isAuthenticated) {
            redirectAttempted.current = true;
            navigate('/login', { replace: true });
        } else if (tokenFromUrl && authReady && !isAuthenticated) {
            let attempts = 0;
            const maxAttempts = 10;

            authCheckInterval.current = setInterval(() => {
                attempts++;
                if (isAuthenticated) {
                    if (authCheckInterval.current) clearInterval(authCheckInterval.current);
                    redirectAttempted.current = false;
                } else if (attempts >= maxAttempts) {
                    if (authCheckInterval.current) clearInterval(authCheckInterval.current);
                    redirectAttempted.current = true;
                    navigate('/login', { replace: true });
                }
            }, 300);

            return () => {
                if (authCheckInterval.current) clearInterval(authCheckInterval.current);
            };
        }
    }, [isAuthenticated, processingToken, isRefreshing, authLoading, navigate, tokenFromUrl, authReady]);

    useEffect(() => {
        if (isAuthenticated) {
            redirectAttempted.current = false;
            if (authCheckInterval.current) {
                clearInterval(authCheckInterval.current);
                authCheckInterval.current = null;
            }
        }
    }, [isAuthenticated]);

    const isLoading = processingToken || isRefreshing || authLoading || (tokenFromUrl && !authReady);

    const getLoadingMessage = () => {
        if (processingToken) return 'Procesando acceso...';
        if (isRefreshing) return 'Cargando tus datos...';
        if (tokenFromUrl && !authReady) return 'Configurando tu cuenta...';
        if (authLoading) return 'Verificando acceso...';
        return 'Cargando...';
    };

    return {
        isLoading,
        getLoadingMessage,
        isAuthenticated,
        user,
        tokenFromUrl: !!tokenFromUrl
    };
};
// src/hooks/useDebounce.ts
import { useEffect, useState } from 'react';

/**
 * Hook personalizado para debounce de valores
 * @param value - El valor que queremos debounce
 * @param delay - Tiempo de espera en milisegundos
 * @returns El valor debounced
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Configurar timer para actualizar después del delay
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Limpiar timer si el valor cambia antes del delay
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
// Paleta de colores configurable por proyecto
export interface ThemeColors {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  accent: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  neutral: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
}

// Configuración por defecto (Kernelize Green)
export const defaultColors: ThemeColors = {
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  secondary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  accent: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
};

// Hook para usar colores del tema
export const useThemeColors = (customColors?: Partial<ThemeColors>) => {
  const colors = { ...defaultColors, ...customColors };
  
  // Función para obtener clase CSS variable
  const getColorVar = (color: string, shade: number) => {
    return `var(--color-${color}-${shade})`;
  };

  return {
    colors,
    getColorVar,
    // Atajos comunes
    primary: colors.primary[500],
    secondary: colors.secondary[500],
    accent: colors.accent[500],
    text: {
      light: colors.neutral[900],
      dark: colors.neutral[50],
    },
    bg: {
      light: colors.neutral[50],
      dark: colors.neutral[950],
    },
  };
};
// src/hooks/useTutorial.ts
import { useEffect, useState } from 'react';

interface TutorialStep {
    id: string;
    title: string;
    description: string;
    targetElement: string;
    position: 'top' | 'bottom' | 'left' | 'right';
    showSkip?: boolean;
}

export const tutorialSteps: TutorialStep[] = [
    {
        id: 'welcome',
        title: '🎨 ¡Bienvenido al Editor de Templates!',
        description: 'Aquí puedes personalizar completamente el diseño de tu sitio web. Cambia colores, edita textos y mucho más.',
        targetElement: 'editor-sidebar',
        position: 'right',
        showSkip: true
    },
    {
        id: 'edit-mode',
        title: '✏️ Modo Edición',
        description: 'Activa el modo edición haciendo clic en el botón "Activar modo edición". Verás que los textos se vuelven editables con doble clic.',
        targetElement: 'edit-mode-button',
        position: 'right',
        showSkip: true
    },
    {
        id: 'colors',
        title: '🎨 Paleta de Colores',
        description: 'Selecciona un color para personalizar cada elemento de tu sitio. Los cambios se ven en tiempo real.',
        targetElement: 'colors-tab',
        position: 'right',
        showSkip: true
    },
    {
        id: 'presets',
        title: '✨ Presets de Colores',
        description: 'Prueba combinaciones de colores predefinidas con un solo clic. ¡Encuentra la combinación perfecta!',
        targetElement: 'presets-section',
        position: 'right',
        showSkip: true
    },
    {
        id: 'text-editing',
        title: '📝 Editar Textos',
        description: 'Hacé doble clic en cualquier texto de la página para editarlo. Podés cambiar títulos, descripciones y más.',
        targetElement: 'texts-tab',
        position: 'right',
        showSkip: true
    },
    {
        id: 'save',
        title: '💾 Guardar Cambios',
        description: 'No olvides guardar tus cambios. El botón "Guardar cambios" se ilumina cuando hay modificaciones pendientes.',
        targetElement: 'save-button',
        position: 'right',
        showSkip: true
    },
    {
        id: 'undo-redo',
        title: '↩️ Deshacer / Rehacer',
        description: 'Si te equivocaste, podés deshacer o rehacer tus últimos cambios con estos botones.',
        targetElement: 'undo-redo-buttons',
        position: 'right',
        showSkip: true
    },
    {
        id: 'finish',
        title: '🏁 Finalizar Edición',
        description: 'Cuando termines, hacé clic en "Finalizar edición". Se guardarán automáticamente todos los cambios.',
        targetElement: 'finish-button',
        position: 'right',
        showSkip: false
    }
];

const TUTORIAL_KEY = 'kernelize_tutorial_completed';
const TUTORIAL_SKIPPED_KEY = 'kernelize_tutorial_skipped';

export const useTutorial = () => {
    const [showTutorial, setShowTutorial] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [hasCompleted, setHasCompleted] = useState(true);
    const [hasSkipped, setHasSkipped] = useState(false);

    useEffect(() => {
        const completed = localStorage.getItem(TUTORIAL_KEY) === 'true';
        const skipped = localStorage.getItem(TUTORIAL_SKIPPED_KEY) === 'true';
        setHasCompleted(completed);
        setHasSkipped(skipped);

        // Mostrar tutorial si no está completado ni saltado
        if (!completed && !skipped) {
            setShowTutorial(true);
        }
    }, []);

    const startTutorial = () => {
        setShowTutorial(true);
        setCurrentStep(0);
        localStorage.removeItem(TUTORIAL_KEY);
        localStorage.removeItem(TUTORIAL_SKIPPED_KEY);
        setHasCompleted(false);
        setHasSkipped(false);
    };

    const nextStep = () => {
        if (currentStep < tutorialSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            completeTutorial();
        }
    };

    const previousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const completeTutorial = () => {
        localStorage.setItem(TUTORIAL_KEY, 'true');
        setShowTutorial(false);
        setHasCompleted(true);
    };

    const skipTutorial = () => {
        localStorage.setItem(TUTORIAL_SKIPPED_KEY, 'true');
        setShowTutorial(false);
        setHasSkipped(true);
    };

    const resetTutorial = () => {
        localStorage.removeItem(TUTORIAL_KEY);
        localStorage.removeItem(TUTORIAL_SKIPPED_KEY);
        setShowTutorial(true);
        setCurrentStep(0);
        setHasCompleted(false);
        setHasSkipped(false);
    };

    return {
        showTutorial,
        currentStep,
        currentStepData: tutorialSteps[currentStep],
        hasCompleted,
        hasSkipped,
        startTutorial,
        nextStep,
        previousStep,
        completeTutorial,
        skipTutorial,
        resetTutorial,
        totalSteps: tutorialSteps.length
    };
};
// src/hooks/useUserTemplates.ts
import { useEffect, useState } from 'react';
import { templateApi } from '../services/api/templateApi.service';

export const useUserTemplates = (isAuthenticated: boolean, user: any) => {
    const [userTemplate, setUserTemplate] = useState<any>(null);
    const [userTemplatesList, setUserTemplatesList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);


    const saveNewTemplate = async (templateData: any) => {
        setLoading(true);
        try {
            const result = await templateApi.saveTemplate({
                name: templateData.name,
                type: templateData.type.toUpperCase(),
                colors: templateData.colors,
                texts: templateData.texts || {},
                images: templateData.images || {}
            });

            if (result.template) {
                await loadUserTemplates(); // Recargar la lista
                return result.template;
            }
        } catch (error) {
            console.error('Error guardando nuevo template:', error);
        } finally {
            setLoading(false);
        }
        return null;
    };

    const loadUserTemplates = async () => {
        if (!isAuthenticated || !user) {
            setUserTemplate(null);
            setUserTemplatesList([]);
            return;
        }

        setLoading(true);
        try {
            const response = await templateApi.getUserTemplates();
            console.log('📦 Templates cargados desde backend:', response.templates);

            if (response.templates && response.templates.length > 0) {
                setUserTemplatesList(response.templates);
                // Tomar el template más reciente (por fecha de edición)
                const latestTemplate = response.templates.sort((a: any, b: any) =>
                    new Date(b.lastEdited || b.updatedAt).getTime() - new Date(a.lastEdited || a.updatedAt).getTime()
                )[0];
                setUserTemplate(latestTemplate);
                console.log('📌 Template principal actualizado:', latestTemplate);
                console.log('🎨 Colores del template principal:', latestTemplate.colors);
            } else {
                setUserTemplate(null);
                setUserTemplatesList([]);
            }
        } catch (error) {
            console.error('Error cargando templates:', error);
            setUserTemplate(null);
            setUserTemplatesList([]);
        } finally {
            setLoading(false);
        }
    };

    const reloadUserTemplates = async () => {
        console.log('🔄 Recargando templates del usuario...');
        await loadUserTemplates();
    };

    const loadTemplateForEdit = async (templateId: string) => {
        setLoading(true);
        try {
            console.log('📥 Cargando template para editar, ID:', templateId);
            const response = await templateApi.getTemplate(templateId);
            console.log('📦 Template recibido del backend:', response.template);

            if (response.template) {
                // ✅ IMPORTANTE: Mantener los colores y textos exactamente como vienen del backend
                const templateData = {
                    id: response.template.id,
                    name: response.template.name,
                    type: response.template.type?.toLowerCase() || 'consulting',
                    colors: response.template.colors,
                    texts: response.template.texts || {},
                    images: response.template.images || {},
                    createdAt: new Date(response.template.createdAt),
                    updatedAt: new Date(response.template.updatedAt),
                    version: response.template.version || 1
                };
                console.log('✅ Template preparado para editar:', templateData);
                console.log('🎨 Colores del template para editar:', templateData.colors);
                return templateData;
            }
        } catch (error) {
            console.error('Error cargando template para editar:', error);
        } finally {
            setLoading(false);
        }
        return null;
    };

    useEffect(() => {
        loadUserTemplates();
    }, [isAuthenticated, user]);

    // Escuchar evento de template guardado para recargar inmediatamente
    useEffect(() => {
        const handleTemplateSaved = async (event: Event) => {
            const customEvent = event as CustomEvent;
            console.log('📢 Evento template-saved recibido:', customEvent.detail);
            // ✅ Recargar templates después de guardar
            await loadUserTemplates();
        };

        window.addEventListener('template-saved', handleTemplateSaved);
        return () => window.removeEventListener('template-saved', handleTemplateSaved);
    }, []);

    return {
        userTemplate,
        userTemplatesList,
        loading,
        loadUserTemplates,
        reloadUserTemplates,
        loadTemplateForEdit,
        saveNewTemplate
    };
};
// src/data/templateDefaultColors.ts
import type { TemplateColors } from "../../types/template.types";

// Colores por defecto para cada tipo de template
export const templateDefaultColors: Record<string, TemplateColors> = {
    consulting: {
        primary: '#2563eb',
        secondary: '#4b5563',
        accent: '#1e293b',
        background: '#ffffff',
        text: '#111827'
    },
    catering: {
        primary: '#f59e0b',
        secondary: '#d97706',
        accent: '#b45309',
        background: '#fffbeb',
        text: '#78350f'
    },
    accounting: {
        primary: '#059669',
        secondary: '#047857',
        accent: '#064e3b',
        background: '#f0fdf4',
        text: '#022c22'
    },
    restaurant: {
        primary: '#dc2626',
        secondary: '#b91c1c',
        accent: '#991b1b',
        background: '#fef2f2',
        text: '#450a0a'
    },
    lawFirm: {
        primary: '#7f1d1d',
        secondary: '#991b1b',
        accent: '#450a0a',
        background: '#faf7f2',
        text: '#292524'
    },
    medical: {
        primary: '#0d9488',
        secondary: '#0f766e',
        accent: '#115e59',
        background: '#f0fdfa',
        text: '#042f2e'
    },
    architecture: {
        primary: '#57534e',
        secondary: '#44403c',
        accent: '#292524',
        background: '#fafaf9',
        text: '#1c1917'
    },
    marketingAgency: {
        primary: '#c026d3',
        secondary: '#a21caf',
        accent: '#86198f',
        background: '#faf5ff',
        text: '#4a044e'
    },
    coffeeShop: {
        primary: '#b45309',
        secondary: '#92400e',
        accent: '#78350f',
        background: '#fef3c7',
        text: '#422006'
    },
    bakery: {
        primary: '#e11d48',
        secondary: '#be123c',
        accent: '#9f1239',
        background: '#fff1f2',
        text: '#4c0519'
    },
    foodTruck: {
        primary: '#e67e22',
        secondary: '#d35400',
        accent: '#a04000',
        background: '#fef3c7',
        text: '#5d3a1a'
    },
    beautySalon: {
        primary: '#db2777',
        secondary: '#be185d',
        accent: '#9d174d',
        background: '#fdf2f8',
        text: '#831843'
    },
    gym: {
        primary: '#ea580c',
        secondary: '#c2410c',
        accent: '#9a3412',
        background: '#f5f5f4',
        text: '#1c1917'
    },
    realEstate: {
        primary: '#2d6a4f',
        secondary: '#1e4b3a',
        accent: '#0d2f24',
        background: '#f8fafc',
        text: '#081c15'
    },
    fashion: {
        primary: '#000000',
        secondary: '#1f2937',
        accent: '#4b5563',
        background: '#ffffff',
        text: '#111827'
    },
    cleaning: {
        primary: '#0284c7',
        secondary: '#0369a1',
        accent: '#075985',
        background: '#f0f9ff',
        text: '#0c4a6e'
    },
    saas: {
        primary: '#7c3aed',
        secondary: '#6d28d9',
        accent: '#5b21b6',
        background: '#f5f3ff',
        text: '#1e1e3f'
    },
    digitalAgency: {
        primary: '#0891b2',
        secondary: '#0e7490',
        accent: '#155e75',
        background: '#ecfeff',
        text: '#164e63'
    },
    startup: {
        primary: '#059669',
        secondary: '#047857',
        accent: '#065f46',
        background: '#ecfdf5',
        text: '#064e3b'
    },
};

// Helper para obtener colores por defecto de un template
export const getDefaultTemplateColors = (type: string): TemplateColors => {
    return templateDefaultColors[type] || templateDefaultColors.consulting;
};
export const CONSULTING_TEXTS = [
    // Header
    { id: 'header_brand_1', label: 'Marca parte 1', section: 'Header', default: 'Kernelize' },
    { id: 'header_brand_2', label: 'Marca parte 2', section: 'Header', default: 'Consulting' },
    { id: 'nav_home', label: 'Nav: Inicio', section: 'Header', default: 'Inicio' },
    { id: 'nav_services', label: 'Nav: Servicios', section: 'Header', default: 'Servicios' },
    { id: 'nav_methodology', label: 'Nav: Metodología', section: 'Header', default: 'Metodología' },
    { id: 'nav_testimonials', label: 'Nav: Casos de éxito', section: 'Header', default: 'Casos de éxito' },
    { id: 'nav_contact', label: 'Nav: Contacto', section: 'Header', default: 'Contacto' },
    { id: 'header_cta', label: 'CTA Header', section: 'Header', default: 'Consultoría gratuita' },

    // Hero
    { id: 'hero_badge', label: 'Badge del Hero', section: 'Hero', default: 'Consultoría Estratégica de Negocios' },
    { id: 'hero_title_1', label: 'Título principal (parte 1)', section: 'Hero', default: 'Impulsamos el' },
    { id: 'hero_title_2', label: 'Título principal (parte 2)', section: 'Hero', default: 'Crecimiento Sostenible' },
    { id: 'hero_title_3', label: 'Título principal (parte 3)', section: 'Hero', default: 'de tu Empresa' },
    { id: 'hero_description', label: 'Descripción del Hero', section: 'Hero', default: 'Análisis profundo, estrategias personalizadas y acompañamiento continuo para llevar tu negocio al siguiente nivel.' },
    { id: 'cta_primary', label: 'Botón principal', section: 'Hero', default: 'Solicitar una consultoría' },
    { id: 'cta_secondary', label: 'Botón secundario', section: 'Hero', default: 'Conocer nuestra metodología' },

    // Features
    { id: 'features_title_1', label: 'Título de características (parte 1)', section: 'Características', default: 'Capacidades que' },
    { id: 'features_title_2', label: 'Título de características (parte 2)', section: 'Características', default: 'Transforman' },
    { id: 'features_description', label: 'Descripción de características', section: 'Características', default: 'No solo aconsejamos, implementamos. Te acompañamos en cada paso con herramientas y metodologías probadas.' },

    // Features individuales
    { id: 'feature_title_strategic', label: 'Característica: Análisis Estratégico', section: 'Características', default: 'Análisis Estratégico' },
    { id: 'feature_desc_strategic', label: 'Descripción: Análisis Estratégico', section: 'Características', default: 'Evaluación profunda de tu mercado, competencia y posición actual para identificar oportunidades.' },
    { id: 'feature_title_talent', label: 'Característica: Gestión del Talento', section: 'Características', default: 'Gestión del Talento' },
    { id: 'feature_desc_talent', label: 'Descripción: Gestión del Talento', section: 'Características', default: 'Desarrollo de equipos de alto rendimiento y cultura organizacional alineada a objetivos.' },
    { id: 'feature_title_commercial', label: 'Característica: Planificación Comercial', section: 'Características', default: 'Planificación Comercial' },
    { id: 'feature_desc_commercial', label: 'Descripción: Planificación Comercial', section: 'Características', default: 'Estrategias de ventas y marketing para penetrar mercados y fidelizar clientes.' },
    { id: 'feature_title_financial', label: 'Característica: Optimización Financiera', section: 'Características', default: 'Optimización Financiera' },
    { id: 'feature_desc_financial', label: 'Descripción: Optimización Financiera', section: 'Características', default: 'Mejora de la rentabilidad, control de costos y planificación financiera.' },
    { id: 'feature_title_certifications', label: 'Característica: Certificaciones', section: 'Características', default: 'Certificaciones y Normas' },
    { id: 'feature_desc_certifications', label: 'Descripción: Certificaciones', section: 'Características', default: 'Asesoramiento para obtener certificaciones de calidad que mejoren tu competitividad.' },
    { id: 'feature_title_international', label: 'Característica: Expansión Internacional', section: 'Características', default: 'Expansión Internacional' },
    { id: 'feature_desc_international', label: 'Descripción: Expansión Internacional', section: 'Características', default: 'Estrategias para llevar tu negocio a nuevos mercados con el menor riesgo posible.' },

    // About
    { id: 'about_section_badge', label: 'Badge de About', section: 'Sobre Nosotros', default: 'Nuestra Firma' },
    { id: 'about_heading_1', label: 'Título About (parte 1)', section: 'Sobre Nosotros', default: 'Consultoría con' },
    { id: 'about_heading_2', label: 'Título About (parte 2)', section: 'Sobre Nosotros', default: 'Resultados Medibles' },
    { id: 'about_description_1', label: 'Descripción About 1', section: 'Sobre Nosotros', default: 'En Kernelize Consulting no creemos en soluciones genéricas. Cada empresa es un mundo, y por eso diseñamos estrategias a medida que abordan tus desafíos específicos y potencian tus fortalezas únicas.' },
    { id: 'about_description_2', label: 'Descripción About 2', section: 'Sobre Nosotros', default: 'Nuestro enfoque combina el rigor analítico con la creatividad estratégica. Trabajamos codo a codo con tu equipo para asegurar que las soluciones no solo se implementen, sino que se mantengan en el tiempo y se adapten a un entorno cambiante.' },
    { id: 'about_badge', label: 'Badge de equipo', section: 'Sobre Nosotros', default: 'Equipo multidisciplinario' },
    { id: 'about_title', label: 'Título de equipo', section: 'Sobre Nosotros', default: 'Expertos en diversas industrias' },

    // Stats
    { id: 'stat_value_stat_1', label: 'Valor estadística 1', section: 'Sobre Nosotros', default: '15+' },
    { id: 'stat_label_stat_1', label: 'Etiqueta estadística 1', section: 'Sobre Nosotros', default: 'Años de experiencia' },
    { id: 'stat_value_stat_2', label: 'Valor estadística 2', section: 'Sobre Nosotros', default: '50+' },
    { id: 'stat_label_stat_2', label: 'Etiqueta estadística 2', section: 'Sobre Nosotros', default: 'Consultores expertos' },
    { id: 'stat_value_stat_3', label: 'Valor estadística 3', section: 'Sobre Nosotros', default: '200+' },
    { id: 'stat_label_stat_3', label: 'Etiqueta estadística 3', section: 'Sobre Nosotros', default: 'Proyectos exitosos' },
    { id: 'stat_value_stat_4', label: 'Valor estadística 4', section: 'Sobre Nosotros', default: '10+' },
    { id: 'stat_label_stat_4', label: 'Etiqueta estadística 4', section: 'Sobre Nosotros', default: 'Países con presencia' },

    // Diferenciadores
    { id: 'about_commitment_title', label: 'Título de compromiso', section: 'Sobre Nosotros', default: 'Nuestro compromiso:' },
    { id: 'differentiator_0', label: 'Diferenciador 1', section: 'Sobre Nosotros', default: 'Metodologías ágiles y adaptativas' },
    { id: 'differentiator_1', label: 'Diferenciador 2', section: 'Sobre Nosotros', default: 'Análisis de datos para toma de decisiones' },
    { id: 'differentiator_2', label: 'Diferenciador 3', section: 'Sobre Nosotros', default: 'Acompañamiento post-implementación' },
    { id: 'differentiator_3', label: 'Diferenciador 4', section: 'Sobre Nosotros', default: 'Confidencialidad y ética profesional' },

    // Testimonios
    { id: 'testimonials_title_1', label: 'Título testimonios (parte 1)', section: 'Testimonios', default: 'Lo que dicen nuestros' },
    { id: 'testimonials_title_2', label: 'Título testimonios (parte 2)', section: 'Testimonios', default: 'clientes' },
    { id: 'testimonials_description', label: 'Descripción testimonios', section: 'Testimonios', default: 'Historias reales de transformación empresarial.' },

    // Testimonio Carlos
    { id: 'testimonial_content_carlos', label: 'Testimonio de Carlos', section: 'Testimonios', default: 'El equipo de Kernelize reestructuró nuestra estrategia comercial por completo. En 6 meses, aumentamos nuestras ventas un 60% y optimizamos nuestros procesos internos. Su enfoque analítico y profesionalismo son inigualables.' },
    { id: 'testimonial_name_carlos', label: 'Nombre: Carlos', section: 'Testimonios', default: 'Carlos Méndez' },
    { id: 'testimonial_role_carlos', label: 'Rol: Carlos', section: 'Testimonios', default: 'CEO - TechCorp LATAM' },

    // Testimonio Laura
    { id: 'testimonial_content_laura', label: 'Testimonio de Laura', section: 'Testimonios', default: 'Necesitábamos expandirnos a nuevos mercados y ellos nos guiaron paso a paso. Desde el estudio de mercado hasta la implementación local. Una consultora que realmente se involucra en el éxito de sus clientes.' },
    { id: 'testimonial_name_laura', label: 'Nombre: Laura', section: 'Testimonios', default: 'Laura Fernández' },
    { id: 'testimonial_role_laura', label: 'Rol: Laura', section: 'Testimonios', default: 'Directora de Operaciones - Grupo Logístico' },

    // Testimonio Roberto
    { id: 'testimonial_content_roberto', label: 'Testimonio de Roberto', section: 'Testimonios', default: 'Contratamos su servicio de planificación financiera y los resultados fueron inmediatos. No solo mejoraron nuestra rentabilidad, sino que nos dieron la claridad y el control que necesitábamos para escalar.' },
    { id: 'testimonial_name_roberto', label: 'Nombre: Roberto', section: 'Testimonios', default: 'Roberto Sánchez' },
    { id: 'testimonial_role_roberto', label: 'Rol: Roberto', section: 'Testimonios', default: 'Fundador - Inversiones RS' },

    // Indicadores
    { id: 'indicator_value_projects', label: 'Valor: Proyectos anuales', section: 'Testimonios', default: '100+' },
    { id: 'indicator_label_projects', label: 'Etiqueta: Proyectos', section: 'Testimonios', default: 'Proyectos anuales' },
    { id: 'indicator_value_industries', label: 'Valor: Industrias', section: 'Testimonios', default: '15' },
    { id: 'indicator_label_industries', label: 'Etiqueta: Industrias', section: 'Testimonios', default: 'Industrias diferentes' },
    { id: 'indicator_value_satisfaction', label: 'Valor: Satisfacción', section: 'Testimonios', default: '98%' },
    { id: 'indicator_label_satisfaction', label: 'Etiqueta: Satisfacción', section: 'Testimonios', default: 'Tasa de satisfacción' },
    { id: 'indicator_value_support', label: 'Valor: Soporte', section: 'Testimonios', default: '24/7' },
    { id: 'indicator_label_support', label: 'Etiqueta: Soporte', section: 'Testimonios', default: 'Soporte a clientes' },

    // Contacto
    { id: 'contact_title_1', label: 'Título contacto (parte 1)', section: 'Contacto', default: 'Comencemos a' },
    { id: 'contact_title_2', label: 'Título contacto (parte 2)', section: 'Contacto', default: 'transformar' },
    { id: 'contact_title_3', label: 'Título contacto (parte 3)', section: 'Contacto', default: 'tu negocio' },
    { id: 'contact_description', label: 'Descripción contacto', section: 'Contacto', default: 'Solicita una reunión estratégica sin costo y descubre cómo podemos ayudarte a alcanzar tus metas.' },
    { id: 'contact_info_title', label: 'Título info contacto', section: 'Contacto', default: 'Información de contacto' },
    { id: 'contact_info_description', label: 'Descripción info contacto', section: 'Contacto', default: 'Estamos a disposición para atender tus consultas y coordinar una primera reunión de diagnóstico.' },
    { id: 'contact_email_title', label: 'Título email', section: 'Contacto', default: 'Email' },
    { id: 'contact_email_content', label: 'Email', section: 'Contacto', default: 'consultoria@kernelize.com' },
    { id: 'contact_phone_title', label: 'Título teléfono', section: 'Contacto', default: 'Teléfono' },
    { id: 'contact_phone_content', label: 'Teléfono', section: 'Contacto', default: '+54 9 11 6745-7413' },
    { id: 'contact_location_title', label: 'Título ubicación', section: 'Contacto', default: 'Ubicación' },
    { id: 'contact_location_content', label: 'Ubicación', section: 'Contacto', default: 'Buenos Aires, Argentina' },
    { id: 'contact_hours_title', label: 'Título horarios', section: 'Contacto', default: 'Horario de atención' },
    { id: 'contact_hours_week', label: 'Horario semana', section: 'Contacto', default: 'Lunes a Viernes: 9:00 - 19:00 hs' },
    { id: 'contact_hours_saturday', label: 'Horario sábados', section: 'Contacto', default: 'Sábados: Reuniones programadas' },
    { id: 'contact_response_time', label: 'Tiempo de respuesta', section: 'Contacto', default: 'Respuesta garantizada en 12 horas hábiles' },
    { id: 'contact_success_title', label: 'Título éxito', section: 'Contacto', default: '¡Mensaje enviado con éxito!' },
    { id: 'contact_success_message', label: 'Mensaje éxito', section: 'Contacto', default: 'En menos de 12 horas hábiles, uno de nuestros consultores se comunicará contigo para coordinar una reunión.' },
    { id: 'contact_success_button', label: 'Botón éxito', section: 'Contacto', default: 'Enviar otro mensaje' },
    { id: 'contact_form_title', label: 'Título formulario', section: 'Contacto', default: 'Solicita una reunión de diagnóstico' },
    { id: 'contact_label_name', label: 'Etiqueta nombre', section: 'Contacto', default: 'Nombre completo *' },
    { id: 'contact_label_email', label: 'Etiqueta email', section: 'Contacto', default: 'Email corporativo *' },
    { id: 'contact_required', label: 'Texto campos requeridos', section: 'Contacto', default: 'Campos obligatorios' },
    { id: 'contact_sending', label: 'Texto enviando', section: 'Contacto', default: 'Enviando...' },
    { id: 'contact_submit', label: 'Botón enviar', section: 'Contacto', default: 'Solicitar reunión' },

    // Footer
    { id: 'footer_brand_1', label: 'Footer marca parte 1', section: 'Footer', default: 'Kernelize' },
    { id: 'footer_brand_2', label: 'Footer marca parte 2', section: 'Footer', default: 'Consulting' },
    { id: 'footer_description', label: 'Descripción footer', section: 'Footer', default: 'Transformamos empresas a través de estrategias innovadoras y acompañamiento experto. Más de 15 años impulsando el éxito de nuestros clientes.' },
    { id: 'footer_quick_title', label: 'Título enlaces rápidos', section: 'Footer', default: 'Enlaces Rápidos' },
    { id: 'link_home', label: 'Link: Inicio', section: 'Footer', default: 'Inicio' },
    { id: 'link_services', label: 'Link: Servicios', section: 'Footer', default: 'Servicios' },
    { id: 'link_methodology', label: 'Link: Metodología', section: 'Footer', default: 'Metodología' },
    { id: 'link_success', label: 'Link: Casos de éxito', section: 'Footer', default: 'Casos de éxito' },
    { id: 'link_contact', label: 'Link: Contacto', section: 'Footer', default: 'Contacto' },
    { id: 'footer_expertise_title', label: 'Título expertise', section: 'Footer', default: 'Áreas de Expertise' },
    { id: 'expertise_1', label: 'Expertise 1', section: 'Footer', default: 'Estrategia Corporativa' },
    { id: 'expertise_2', label: 'Expertise 2', section: 'Footer', default: 'Transformación Digital' },
    { id: 'expertise_3', label: 'Expertise 3', section: 'Footer', default: 'Gestión del Talento' },
    { id: 'expertise_4', label: 'Expertise 4', section: 'Footer', default: 'Finanzas Corporativas' },
    { id: 'expertise_5', label: 'Expertise 5', section: 'Footer', default: 'Expansión Internacional' },
    { id: 'footer_contact_title', label: 'Título contacto footer', section: 'Footer', default: 'Contacto Directo' },
    { id: 'contact_email', label: 'Email footer', section: 'Footer', default: 'consultoria@kernelize.com' },
    { id: 'contact_phone', label: 'Teléfono footer', section: 'Footer', default: '+54 9 11 6745-7413' },
    { id: 'contact_location', label: 'Ubicación footer', section: 'Footer', default: 'Buenos Aires, Argentina' },
    { id: 'footer_copyright', label: 'Copyright', section: 'Footer', default: 'Kernelize Consulting. Todos los derechos reservados.' },
    { id: 'footer_made_with', label: 'Texto "Hecho con"', section: 'Footer', default: 'Hecho con' },
    { id: 'footer_for', label: 'Texto "para empresas"', section: 'Footer', default: 'para empresas que buscan crecer' },
    { id: 'footer_terms', label: 'Términos', section: 'Footer', default: 'Términos y condiciones' },
    { id: 'footer_privacy', label: 'Privacidad', section: 'Footer', default: 'Política de privacidad' },
    { id: 'footer_cookies', label: 'Cookies', section: 'Footer', default: 'Cookies' },
    { id: 'cert_1', label: 'Certificación 1', section: 'Footer', default: 'ISO 9001:2024' },
    { id: 'cert_2', label: 'Certificación 2', section: 'Footer', default: 'Miembro de AACCP' },
    { id: 'cert_3', label: 'Certificación 3', section: 'Footer', default: 'Certified Partners' },
    { id: 'cert_4', label: 'Certificación 4', section: 'Footer', default: '+15 años de experiencia' },
];

export const CONSULTING_IMAGES = [
    { id: 'header_logo', label: 'Logo', section: 'Header', defaultImage: '/images/consulting/logo-default.png' },
    { id: 'hero_image', label: 'Hero principal', section: 'Hero', defaultImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978' },
    { id: 'about_image', label: 'Imagen About', section: 'Sobre Nosotros', defaultImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c' },
    { id: 'team_image', label: 'Imagen de equipo', section: 'Sobre Nosotros', defaultImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978' },
    { id: 'testimonial_1', label: 'Testimonio 1', section: 'Testimonios', defaultImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a' },
    { id: 'testimonial_2', label: 'Testimonio 2', section: 'Testimonios', defaultImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2' },
    { id: 'testimonial_3', label: 'Testimonio 3', section: 'Testimonios', defaultImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7' },
];
// src/utils/imagePlaceholder.ts
// Función para generar placeholders en base64 (no requiere internet)
export const getPlaceholder = (text: string, width: number = 800, height: number = 600): string => {
    // Crear un canvas en memoria para generar la imagen
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
        // Fondo gris claro
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, width, height);

        // Borde gris oscuro
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, width - 2, height - 2);

        // Texto
        ctx.fillStyle = '#999999';
        ctx.font = `bold ${Math.floor(width / 20)}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Dividir texto en líneas si es muy largo
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        words.forEach(word => {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            const metrics = ctx.measureText(testLine);
            if (metrics.width > width * 0.8 && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        });
        if (currentLine) {
            lines.push(currentLine);
        }

        // Dibujar líneas
        const lineHeight = parseInt(ctx.font) * 1.2;
        const startY = height / 2 - (lines.length - 1) * lineHeight / 2;

        lines.forEach((line, i) => {
            ctx.fillText(line, width / 2, startY + i * lineHeight);
        });
    }

    return canvas.toDataURL('image/png');
};

// Placeholders predefinidos para usar como fallback
export const PLACEHOLDERS = {
    team: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'600\' viewBox=\'0 0 800 600\'%3E%3Crect width=\'800\' height=\'600\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'400\' y=\'300\' font-family=\'Arial\' font-size=\'40\' fill=\'%23999\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3EEquipo%3C/text%3E%3C/svg%3E',
    project: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'600\' viewBox=\'0 0 800 600\'%3E%3Crect width=\'800\' height=\'600\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'400\' y=\'300\' font-family=\'Arial\' font-size=\'40\' fill=\'%23999\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3EProyecto%3C/text%3E%3C/svg%3E',
    logo: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\' viewBox=\'0 0 200 200\'%3E%3Crect width=\'200\' height=\'200\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'100\' y=\'100\' font-family=\'Arial\' font-size=\'24\' fill=\'%23999\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3ELogo%3C/text%3E%3C/svg%3E',
};
// src/contexts/AuthContext.tsx - VERSIÓN CORREGIDA
import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type {
  AuthResponse,
  LoginCredentials,
  Order,
  RegisterData,
  User
} from '../services/api/auth.service';
import * as authService from '../services/api/auth.service';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (userData: RegisterData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<User>;
  getUserOrders: () => Promise<Order[]>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar usuario al iniciar
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (!storedToken || !storedUser) {
        setIsLoading(false);
        return;
      }

      try {
        // Verificar si el token es válido
        if (!authService.isAuthenticated()) {
          // Intentar refrescar el token
          try {
            const refreshResult = await authService.refreshToken();
            // Actualizar token con el nuevo
            setToken(refreshResult.token);
            localStorage.setItem('token', refreshResult.token);
          } catch (refreshError) {
            console.log('Token expirado, limpiando datos');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
            setIsLoading(false);
            return;
          }
        }

        // Obtener perfil actualizado
        const profile = await authService.getProfile();
        setUser(profile);
        setToken(storedToken);

        // Actualizar localStorage con perfil actualizado
        localStorage.setItem('user', JSON.stringify(profile));
      } catch (error) {
        console.error('Error cargando perfil:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // ✅ Función para refrescar datos del usuario - CORREGIDA
  const refreshUser = async () => {
    setIsRefreshing(true);
    try {
      // Obtener el token actual
      const currentToken = localStorage.getItem('token');
      
      // Obtener el perfil actualizado
      const profile = await authService.getProfile();
      
      // Actualizar estado y localStorage
      setUser(profile);
      setToken(currentToken);
      localStorage.setItem('user', JSON.stringify(profile));
      
      console.log('✅ Usuario refrescado correctamente', { 
        profile, 
        hasToken: !!currentToken,
        isAuthenticated: !!currentToken && !!profile
      });
    } catch (error: any) {
      console.error('Error refrescando usuario:', error);
      // Si es error de conexión, no limpiar la sesión
      if (error.errorCode !== 'CONNECTION_ERROR') {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
      }
      throw error;
    } finally {
      setIsRefreshing(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);

      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('refreshToken', response.refreshToken);

      return response;
    } catch (error: any) {
      const message = error.message || 'Error al iniciar sesión';
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(userData);

      if (response.token) {
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }
      }

      return response;
    } catch (error: any) {
      const message = error.message || 'Error al registrarse';
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.logout();
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<User> => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await authService.updateProfile(userData);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error: any) {
      const message = error.message || 'Error actualizando perfil';
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserOrders = async (): Promise<Order[]> => {
    try {
      const orders = await authService.getUserOrders();
      return orders;
    } catch (error: any) {
      const message = error.message || 'Error obteniendo pedidos';
      setError(message);
      throw error;
    }
  };

  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user && authService.isAuthenticated(),
    isLoading,
    isRefreshing,
    error,
    login,
    register,
    logout,
    updateProfile,
    getUserOrders,
    clearError,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
import React, { createContext, useContext, useState } from 'react';
import { getDefaultTemplateColors } from '../data/types/templateDefaultColors';
import { templateApi } from '../services/api/templateApi.service';
import { storageService } from '../services/storageService';
import type {
    ButtonConfig,
    EditorConfig,
    SectionColors,
    Template,
    TemplateColors,
    TypographyConfig,
    UIConfig
} from '../types/template.types';
import {
    colorPresets,
    defaultButtons,
    defaultSectionColors,
    defaultTypography,
    defaultUI,
    fullPresets
} from '../types/template.types';
import { useAuth } from './AuthContext';

interface TemplateContextType {
    template: Template | null;
    setTemplate: (template: Template) => void;
    updateColors: (colors: Partial<TemplateColors>) => void;
    updateSectionColors: (colors: Partial<SectionColors>) => void;
    updateTypography: (typography: Partial<TypographyConfig>) => void;
    updateUI: (ui: Partial<UIConfig>) => void;
    updateButtons: (buttons: Partial<ButtonConfig>) => void;
    updateText: (key: string, value: string) => void;
    updateImage: (key: string, file: File) => Promise<void>;
    resetTemplate: (type: string) => void;
    applyPreset: (presetName: string) => void;
    saveDraft: () => void;
    loadDraft: () => void;
    exportTemplate: () => void;
    saveToBackend: () => Promise<any>;
    loadFromBackend: (templateId: string) => Promise<void>;
    getUserTemplates: () => Promise<any>;
    hasUnsavedChanges: boolean;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    editorConfig: EditorConfig;
    setEditorConfig: (config: Partial<EditorConfig>) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    const [template, setTemplateState] = useState<Template | null>(null);
    const [history, setHistory] = useState<Template[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [editorConfig, setEditorConfigState] = useState<EditorConfig>({
        isEditing: false,
        selectedElement: null,
        showEditor: true,
        notifications: null
    });

    // Asegura que sectionColors tenga todas las propiedades
    const ensureCompleteSectionColors = (sectionColors: Partial<SectionColors> | undefined): SectionColors => {
        return {
            ...defaultSectionColors,
            ...(sectionColors || {}),
        };
    };

    const setTemplate = (newTemplate: Template) => {
        const completeTemplate = {
            ...newTemplate,
            sectionColors: ensureCompleteSectionColors(newTemplate.sectionColors),
        };
        setTemplateState(completeTemplate);
        setHistory([completeTemplate]);
        setHistoryIndex(0);
        setHasUnsavedChanges(false);
    };

    const addToHistory = (newTemplate: Template) => {
        setHistory(prev => [...prev.slice(0, historyIndex + 1), newTemplate]);
        setHistoryIndex(prev => prev + 1);
    };

    const updateColors = (colors: Partial<TemplateColors>) => {
        setTemplateState(prev => {
            if (!prev) return prev;
            const updated = {
                ...prev,
                colors: { ...prev.colors, ...colors },
                updatedAt: new Date()
            };
            addToHistory(updated);
            setHasUnsavedChanges(true);
            return updated;
        });
    };

    const updateSectionColors = (colors: Partial<SectionColors>) => {
        console.log('updateSectionColors called with:', colors);
        if (!template) return;
        const updatedTemplate = {
            ...template,
            sectionColors: { ...template.sectionColors, ...colors },
            updatedAt: new Date()
        };
        console.log('new sectionColors:', updatedTemplate.sectionColors);
        setTemplateState(updatedTemplate);
        addToHistory(updatedTemplate);
        setHasUnsavedChanges(true);
    };

    // ✅ CORREGIDA: usa setTemplateState con función para evitar cierres obsoletos
    // const updateSectionColors2 = (colors: Partial<SectionColors>) => {
    //     setTemplateState(prev => {
    //         if (!prev) return prev;
    //         const newSectionColors = {
    //             ...prev.sectionColors,
    //             ...colors,
    //         };
    //         const updated = {
    //             ...prev,
    //             sectionColors: ensureCompleteSectionColors(newSectionColors),
    //             updatedAt: new Date()
    //         };
    //         addToHistory(updated);
    //         setHasUnsavedChanges(true);
    //         return updated;
    //     });
    // };

    const updateTypography = (typography: Partial<TypographyConfig>) => {
        setTemplateState(prev => {
            if (!prev) return prev;
            const updated = {
                ...prev,
                typography: { ...prev.typography, ...typography },
                updatedAt: new Date()
            };
            addToHistory(updated);
            setHasUnsavedChanges(true);
            return updated;
        });
    };

    const updateUI = (ui: Partial<UIConfig>) => {
        setTemplateState(prev => {
            if (!prev) return prev;
            const updated = {
                ...prev,
                ui: { ...prev.ui, ...ui },
                updatedAt: new Date()
            };
            addToHistory(updated);
            setHasUnsavedChanges(true);
            return updated;
        });
    };

    const updateButtons = (buttons: Partial<ButtonConfig>) => {
        setTemplateState(prev => {
            if (!prev) return prev;
            const updated = {
                ...prev,
                buttons: { ...prev.buttons, ...buttons },
                updatedAt: new Date()
            };
            addToHistory(updated);
            setHasUnsavedChanges(true);
            return updated;
        });
    };

    const updateText = (key: string, value: string) => {
        setTemplateState(prev => {
            if (!prev) return prev;
            const updated = {
                ...prev,
                texts: { ...prev.texts, [key]: value },
                updatedAt: new Date()
            };
            addToHistory(updated);
            setHasUnsavedChanges(true);
            return updated;
        });
    };

    const updateImage = async (key: string, file: File) => {
        return new Promise<void>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTemplateState(prev => {
                    if (!prev) return prev;
                    const updated = {
                        ...prev,
                        images: { ...prev.images, [key]: reader.result as string },
                        updatedAt: new Date()
                    };
                    addToHistory(updated);
                    setHasUnsavedChanges(true);
                    return updated;
                });
                resolve();
            };
            reader.readAsDataURL(file);
        });
    };

    const resetTemplate = (type: string) => {
        const defaultColors = getDefaultTemplateColors(type);
        const newTemplate: Template = {
            id: Date.now().toString(),
            name: `Mi ${type} template`,
            type: type as any,
            colors: defaultColors,
            sectionColors: { ...defaultSectionColors },
            typography: { ...defaultTypography },
            ui: { ...defaultUI },
            buttons: { ...defaultButtons },
            texts: {},
            images: {},
            createdAt: new Date(),
            updatedAt: new Date(),
            version: 1
        };
        setTemplateState(newTemplate);
        setHistory([newTemplate]);
        setHistoryIndex(0);
        setHasUnsavedChanges(true);
    };

    const applyPreset = (presetName: string) => {
        if (!template) return;
        // Buscar en fullPresets (importado desde types)
        const fullPreset = fullPresets.find(p => p.name === presetName);
        if (fullPreset) {
            // Aplicar colors
            updateColors(fullPreset.colors);
            // Aplicar sectionColors (actualizar parcialmente)
            if (fullPreset.sectionColors) {
                updateSectionColors(fullPreset.sectionColors);
            }
            // Aplicar typography
            if (fullPreset.typography) {
                updateTypography(fullPreset.typography);
            }
            // Aplicar ui
            if (fullPreset.ui) {
                updateUI(fullPreset.ui);
            }
        } else {
            // Fallback a los presets antiguos (solo colors)
            const categoryPresets = colorPresets[template.type as keyof typeof colorPresets];
            const preset = categoryPresets?.find(p => p.name === presetName);
            if (preset) {
                updateColors(preset.colors);
                // También actualizar algunos sectionColors básicos como antes
                updateSectionColors({
                    buttonPrimaryBackground: preset.colors.primary,
                    heroTitleColor: preset.colors.text,
                    headerTextColor: preset.colors.text,
                    bodyTextColor: preset.colors.text,
                    heroBadgeBackground: preset.colors.primary,
                });
            }
        }
    };

    // const applyPreset2 = (presetName: string) => {
    //     if (!template) return;
    //     const categoryPresets = colorPresets[template.type as keyof typeof colorPresets];
    //     const preset = categoryPresets?.find(p => p.name === presetName);
    //     if (preset) {
    //         updateColors(preset.colors);
    //         updateSectionColors({
    //             buttonPrimaryBackground: preset.colors.primary,
    //             heroTitleColor: preset.colors.text,
    //             headerTextColor: preset.colors.text,
    //             bodyTextColor: preset.colors.text,
    //             heroBadgeBackground: preset.colors.primary,
    //         });
    //     }
    // };

    const saveDraft = () => {
        if (template) {
            storageService.saveDraft(template);
            setHasUnsavedChanges(false);
            window.dispatchEvent(new CustomEvent('template-saved', {
                detail: { message: 'Borrador guardado', type: 'success', template }
            }));
            setEditorConfig({
                notifications: { show: true, message: 'Borrador guardado', type: 'success' }
            });
        }
    };

    const loadDraft = () => {
        const draft = storageService.loadDraft();
        if (draft) {
            setTemplateState(draft);
            addToHistory(draft);
        }
    };

    const exportTemplate = () => {
        if (!template) return;
        const dataStr = JSON.stringify(template, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', `template-${template.type}-${Date.now()}.json`);
        linkElement.click();
    };

    const saveToBackend = async () => {
        if (!template || !isAuthenticated) return;
        try {
            const typeUpper = template.type.toUpperCase();
            const colorsToSend: Record<string, string> = {
                primary: template.colors.primary,
                secondary: template.colors.secondary,
                accent: template.colors.accent,
                background: template.colors.background,
                text: template.colors.text,
            };
            const result = await templateApi.saveTemplate({
                name: template.name,
                type: typeUpper,
                colors: colorsToSend,
                sectionColors: template.sectionColors,
                typography: template.typography,
                ui: template.ui,
                buttons: template.buttons,
                texts: template.texts || {},
                images: template.images || {}
            } as any);
            if (result.template?.id) {
                setTemplateState(prev => prev ? { ...prev, id: result.template.id, updatedAt: new Date() } : prev);
                window.dispatchEvent(new CustomEvent('template-saved', {
                    detail: { templateId: result.template.id, success: true, template: result.template }
                }));
            }
            return result;
        } catch (error) {
            console.error('Error guardando template:', error);
        }
    };

    const loadFromBackend = async (templateId: string) => {
        if (!isAuthenticated) return;
        try {
            const result = await templateApi.getTemplate(templateId);
            if (result.template) {
                const templateData: Template = {
                    id: result.template.id,
                    name: result.template.name,
                    type: result.template.type.toLowerCase(),
                    colors: result.template.colors || getDefaultTemplateColors(result.template.type.toLowerCase()),
                    sectionColors: ensureCompleteSectionColors(result.template.sectionColors),
                    typography: result.template.typography || defaultTypography,
                    ui: result.template.ui || defaultUI,
                    buttons: result.template.buttons || defaultButtons,
                    texts: result.template.texts || {},
                    images: result.template.images || {},
                    createdAt: new Date(result.template.createdAt),
                    updatedAt: new Date(result.template.updatedAt),
                    version: result.template.version || 1
                };
                setTemplateState(templateData);
                addToHistory(templateData);
            }
        } catch (error) {
            console.error('Error cargando template:', error);
        }
    };

    const getUserTemplates = async () => {
        if (!isAuthenticated) return [];
        try {
            const result = await templateApi.getUserTemplates();
            return result.templates || [];
        } catch (error) {
            console.error('Error obteniendo templates:', error);
            return [];
        }
    };

    const undo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(prev => prev - 1);
            setTemplateState(history[historyIndex - 1]);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(prev => prev + 1);
            setTemplateState(history[historyIndex + 1]);
        }
    };

    const setEditorConfig = (config: Partial<EditorConfig>) => {
        setEditorConfigState(prev => ({ ...prev, ...config }));
    };

    return (
        <TemplateContext.Provider value={{
            template,
            setTemplate,
            updateColors,
            updateSectionColors,
            updateTypography,
            updateUI,
            updateButtons,
            updateText,
            updateImage,
            resetTemplate,
            applyPreset,
            saveDraft,
            loadDraft,
            exportTemplate,
            saveToBackend,
            loadFromBackend,
            getUserTemplates,
            hasUnsavedChanges,
            undo,
            redo,
            canUndo: historyIndex > 0,
            canRedo: historyIndex < history.length - 1,
            editorConfig,
            setEditorConfig
        }}>
            {children}
        </TemplateContext.Provider>
    );
};

export const useTemplate = () => {
    const context = useContext(TemplateContext);
    if (!context) {
        throw new Error('useTemplate must be used within TemplateProvider');
    }
    return context;
};
import React, { createContext, useContext, useState } from 'react';
import type { EditorConfig } from '../types/template.types';

interface TemplateEditorContextType {
    config: EditorConfig;
    toggleEditing: () => void;
    selectElement: (elementId: string | null) => void;
    toggleEditor: () => void;
    setConfig: (config: Partial<EditorConfig>) => void;
}

const TemplateEditorContext = createContext<TemplateEditorContextType | undefined>(undefined);

export const TemplateEditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<EditorConfig>({
        isEditing: false,
        selectedElement: null,
        showEditor: true,
        notifications: null  // <-- Agregar esta línea
    });

    const toggleEditing = () => {
        setConfig(prev => ({ ...prev, isEditing: !prev.isEditing }));
    };

    const selectElement = (elementId: string | null) => {
        setConfig(prev => ({ ...prev, selectedElement: elementId }));
    };

    const toggleEditor = () => {
        setConfig(prev => ({ ...prev, showEditor: !prev.showEditor }));
    };

    const updateConfig = (newConfig: Partial<EditorConfig>) => {
        setConfig(prev => ({ ...prev, ...newConfig }));
    };

    return (
        <TemplateEditorContext.Provider value={{
            config,
            toggleEditing,
            selectElement,
            toggleEditor,
            setConfig: updateConfig
        }}>
            {children}
        </TemplateEditorContext.Provider>
    );
};

export const useTemplateEditor = () => {
    const context = useContext(TemplateEditorContext);
    if (!context) {
        throw new Error('useTemplateEditor must be used within TemplateEditorProvider');
    }
    return context;
};
// src/components/Editor/ColorPicker.tsx - Versión compacta
import { Check, Copy, RefreshCw } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';
import type { TemplateColors } from '../../types/template.types';

type ColorKey = keyof TemplateColors;

interface ColorPickerProps {
    colorKey: ColorKey;
    label: string;
    defaultColor: string;
    compact?: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
    colorKey,
    label,
    defaultColor,
    compact = false
}) => {
    const { template, updateColors } = useTemplate();
    const { config } = useTemplateEditor();
    const [copied, setCopied] = useState(false);
    const [localColor, setLocalColor] = useState<string>(defaultColor);
    let timeoutId: ReturnType<typeof setTimeout>;

    // Actualizar color local cuando cambia el template
    useEffect(() => {
        const currentColor = template?.colors?.[colorKey] || defaultColor;
        setLocalColor(currentColor);
    }, [template, colorKey, defaultColor]);

    if (!config.isEditing) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(localColor);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleColorChange = (newColor: string) => {
        setLocalColor(newColor);

        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            updateColors({ [colorKey]: newColor } as Partial<TemplateColors>);
        }, 150);
    };

    const handleReset = () => {
        handleColorChange(defaultColor);
    };

    if (compact) {
        return (
            <div className="flex items-center justify-between py-1">
                <label className="text-[10px] font-medium text-gray-600 dark:text-gray-400 w-16">
                    {label}
                </label>
                <div className="flex items-center gap-1.5">
                    <input
                        type="color"
                        value={localColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                    />
                    <input
                        type="text"
                        value={localColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-20 px-1.5 py-0.5 text-[10px] border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-neutral-800 font-mono"
                        pattern="^#[0-9A-Fa-f]{6}$"
                    />
                    <button
                        onClick={handleCopy}
                        className="p-0.5 text-gray-500 hover:text-gray-700 transition-colors"
                        title="Copiar color"
                    >
                        {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                    <button
                        onClick={handleReset}
                        className="p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Restablecer"
                    >
                        <RefreshCw className="w-3 h-3" />
                    </button>
                </div>
            </div>
        );
    }

    // Versión normal (más grande) - mantén el original si es necesario
    return (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg">
            <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </label>
                <button
                    onClick={handleReset}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center"
                >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Reset
                </button>
            </div>
            <div className="flex items-center space-x-2">
                <input
                    type="color"
                    value={localColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                />
                <input
                    type="text"
                    value={localColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:text-white font-mono text-sm"
                />
                <button
                    onClick={handleCopy}
                    className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors bg-white dark:bg-neutral-900 rounded-md border border-gray-300 dark:border-gray-600"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
};

export default ColorPicker;
import React, { useState } from 'react';

interface ComboboxInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
}

export const ComboboxInput: React.FC<ComboboxInputProps> = ({
    label,
    value,
    onChange,
    options,
    placeholder,
}) => {
    const [isCustom, setIsCustom] = useState(!options.some(opt => opt.value === value));

    return (
        <div className="mb-2">
            <label className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300 block mb-1">{label}</label>
            <div className="flex gap-2">
                <select
                    className="flex-1 px-2 py-1 text-xs border rounded-lg bg-white dark:bg-neutral-800"
                    value={isCustom ? '__custom__' : value}
                    onChange={(e) => {
                        if (e.target.value === '__custom__') {
                            setIsCustom(true);
                            onChange('');
                        } else {
                            setIsCustom(false);
                            onChange(e.target.value);
                        }
                    }}
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                    <option value="__custom__">✏️ Personalizado...</option>
                </select>
                {isCustom && (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder || "https://... o #seccion"}
                        className="flex-1 px-2 py-1 text-xs border rounded-lg bg-white dark:bg-neutral-800"
                    />
                )}
            </div>
        </div>
    );
};
import { Check, Copy, RefreshCw } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface CompactColorInputProps {
    label: string;
    value: string | undefined;
    onChange: (color: string) => void;
    defaultValue?: string;
    description?: string;
    inputId?: string;
}

export const CompactColorInput: React.FC<CompactColorInputProps> = ({
    label,
    value,
    onChange,
    defaultValue = '#000000',
    description,
    inputId,
}) => {
    const [copied, setCopied] = useState(false);
    const [localValue, setLocalValue] = useState<string>(value || defaultValue);

    useEffect(() => {
        if (value !== undefined && value !== localValue) {
            setLocalValue(value);
        }
    }, [value, localValue]);

    const handleColorChange = (newColor: string) => {
        setLocalValue(newColor);
        onChange(newColor);
    };

    const handleCopy = () => {
        if (localValue) {
            navigator.clipboard.writeText(localValue);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    const handleReset = () => {
        if (defaultValue) {
            handleColorChange(defaultValue);
        }
    };

    const displayValue = localValue || defaultValue;
    const uniqueId = inputId || `color-${label.replace(/\s/g, '')}`;

    return (
        <div className="mb-2">
            <div className="flex items-center justify-between gap-1.5">
                <label className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300 w-16 flex-shrink-0">
                    {label}
                </label>
                <div className="flex items-center gap-1 flex-1">
                    <div className="relative">
                        <div
                            className="w-5 h-5 rounded-full border border-neutral-300 dark:border-neutral-600 cursor-pointer shadow-sm hover:scale-105 transition-transform"
                            style={{ backgroundColor: displayValue }}
                            onClick={() => {
                                const input = document.getElementById(uniqueId) as HTMLInputElement;
                                if (input) input.click();
                            }}
                        />
                        <input
                            id={uniqueId}
                            type="color"
                            value={displayValue}
                            onChange={(e) => handleColorChange(e.target.value)}
                            className="absolute inset-0 w-0 h-0 opacity-0 pointer-events-none"
                        />
                    </div>
                    <input
                        type="text"
                        value={displayValue}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="flex-1 px-1 py-0.5 text-[9px] font-mono border border-neutral-300 dark:border-neutral-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-neutral-800"
                        pattern="^#[0-9A-Fa-f]{6}$"
                    />
                    <button
                        onClick={handleCopy}
                        className="p-0.5 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                        title="Copiar color"
                    >
                        {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                    <button
                        onClick={handleReset}
                        className="p-0.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                        title="Restablecer"
                    >
                        <RefreshCw className="w-3 h-3" />
                    </button>
                </div>
            </div>
            {description && <p className="text-[8px] text-neutral-500 mt-0.5 ml-16">{description}</p>}
        </div>
    );
};
import { Edit2, Image as ImageIcon, Upload, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { defaultImages } from '../../assets/default-images';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

interface EditableImageProps {
    elementId: string;
    defaultImage: string;
    alt?: string;
    className?: string;
    aspectRatio?: string;
    category?: 'consulting' | 'catering' | 'accounting' | 'restaurant' | 'lawFirm' | 'medical' | 'architecture' | 'marketing' | 'coffee' | 'bakery' | 'foodtruck' | 'beauty' | 'gym' | 'realestate' | 'fashion' | 'cleaning' | 'saas' | 'digital' | 'startup';
    containerClassName?: string;
    modalRelative?: boolean;
}

const FALLBACK_IMAGES: Record<string, string> = {
    consulting: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    catering: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800',
    accounting: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
    restaurant: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    lawFirm: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    medical: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    architecture: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800',
    marketing: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    coffee: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800',
    bakery: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
    foodtruck: 'https://images.unsplash.com/photo-1565125719084-5d5466b5c5a2?w=800',
    beauty: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
    gym: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    realestate: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
    cleaning: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
    saas: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    digital: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    startup: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
};

const EditableImage: React.FC<EditableImageProps> = ({
    elementId,
    defaultImage,
    alt = '',
    className = '',
    aspectRatio = 'aspect-auto',
    category = 'consulting',
    containerClassName = '',
    modalRelative = false,
}) => {
    const { config } = useTemplateEditor();
    const { template, updateImage } = useTemplate();
    const [isHovering, setIsHovering] = useState(false);
    const [showSelector, setShowSelector] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const [imageError, setImageError] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const savedImage = template?.images?.[elementId];

    const getImageUrl = () => {
        if (imageError) {
            return FALLBACK_IMAGES[category] || FALLBACK_IMAGES.consulting;
        }
        if (savedImage && savedImage !== 'undefined' && savedImage !== 'null') {
            return savedImage;
        }
        if (defaultImage && defaultImage !== 'undefined' && defaultImage !== 'null' && defaultImage.includes('http')) {
            return defaultImage;
        }
        const categoryImages = defaultImages[category as keyof typeof defaultImages];
        if (categoryImages && categoryImages.hero) {
            return categoryImages.hero;
        }
        return FALLBACK_IMAGES[category] || FALLBACK_IMAGES.consulting;
    };

    const imageUrl = getImageUrl();

    const categoryImages = defaultImages[category as keyof typeof defaultImages] || {};
    const galleryImages = Object.entries(categoryImages)
        .filter(([_, url]) => url && typeof url === 'string' && url.includes('http'))
        .map(([key, url]) => ({
            id: key,
            url: url as string,
            name: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')
        }));

    if (galleryImages.length === 0) {
        galleryImages.push({
            id: 'fallback',
            url: FALLBACK_IMAGES[category] || FALLBACK_IMAGES.consulting,
            name: 'Imagen por defecto'
        });
    }

    useEffect(() => {
        const handleOpenSelector = (event: CustomEvent) => {
            if (event.detail?.elementId === elementId) {
                console.log(`📷 Abriendo selector para imagen: ${elementId}`);
                setShowSelector(true);
            }
        };
        window.addEventListener('openImageSelector', handleOpenSelector as EventListener);
        return () => {
            window.removeEventListener('openImageSelector', handleOpenSelector as EventListener);
        };
    }, [elementId]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                await updateImage(elementId, file);
                setImageError(false);
                setShowSelector(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectFromGallery = async (imageUrl: string) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], `gallery-image-${Date.now()}.jpg`, { type: 'image/jpeg' });
            await updateImage(elementId, file);
            setImageError(false);
            setShowGallery(false);
            setShowSelector(false);
        } catch (error) {
            console.error('Error al cargar imagen de galería:', error);
            await updateImage(elementId, new File([], ''));
            setImageError(false);
            setShowGallery(false);
            setShowSelector(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            await updateImage(elementId, file);
            setImageError(false);
            setShowSelector(false);
        }
    };

    const handleImageClick = () => {
        if (config.isEditing) {
            setShowSelector(true);
        }
    };

    const handleImageError = () => {
        console.warn(`Error loading image for ${elementId}, using fallback`);
        setImageError(true);
    };

    const containerId = `editable-image-${elementId}`;

    return (
        <>
            {/* Contenedor de la imagen */}
            <div
                id={containerId}
                className={`relative group ${aspectRatio} ${containerClassName || ''}`}
                onMouseEnter={() => config.isEditing && setIsHovering(true)}
                onMouseLeave={() => config.isEditing && setIsHovering(false)}
                onClick={handleImageClick}
                style={{
                    position: 'relative',
                    cursor: config.isEditing ? 'pointer' : 'default',
                    outline: (config.isEditing && isHovering) ? '3px solid #3b82f6' : 'none',
                    outlineOffset: '2px'
                }}
            >
                <img
                    src={imageUrl}
                    alt={alt}
                    className={className}
                    onError={handleImageError}
                />

                {config.isEditing && isHovering && !showSelector && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg z-50">
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-lg"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setShowSelector(true);
                            }}
                            type="button"
                        >
                            <Edit2 className="w-4 h-4" />
                            <span>Cambiar imagen</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Selector modal - versión absoluta (para logo) */}
            {showSelector && modalRelative && (
                <div
                    className="absolute z-50 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-80"
                    style={{
                        top: '100%',
                        left: '0',
                        marginTop: '8px',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h4 className="font-semibold text-sm">Seleccionar imagen</h4>
                        <button
                            onClick={() => setShowSelector(false)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex space-x-2 p-3">
                        <button
                            onClick={() => {
                                setShowGallery(true);
                                setShowSelector(false);
                            }}
                            className="flex-1 px-2 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition-colors flex items-center justify-center"
                        >
                            <ImageIcon className="w-3 h-3 mr-1" />
                            Galería
                        </button>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-1 px-2 py-1.5 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700 transition-colors flex items-center justify-center"
                        >
                            <Upload className="w-3 h-3 mr-1" />
                            Subir
                        </button>
                    </div>

                    <div
                        className="mx-3 mb-3 p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <Upload className="w-6 h-6 text-gray-400 mb-1" />
                        <p className="text-[10px] text-center text-gray-600 dark:text-gray-400">
                            Arrastrá una imagen
                        </p>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />

                    <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                        <button
                            onClick={() => setShowSelector(false)}
                            className="px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-xs transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Selector modal - versión fija centrada (para Hero y About) */}
            {showSelector && !modalRelative && (
                <div
                    className="fixed inset-0 bg-black/75 flex items-center justify-center z-[10000] p-4"
                    onClick={() => setShowSelector(false)}
                >
                    <div
                        className="bg-white dark:bg-neutral-900 rounded-2xl w-full max-w-md flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="text-xl font-bold">Seleccionar imagen</h3>
                            <button
                                onClick={() => setShowSelector(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex space-x-2 p-4 border-b border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => {
                                    setShowGallery(true);
                                    setShowSelector(false);
                                }}
                                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
                            >
                                <ImageIcon className="w-4 h-4 mr-2" />
                                Galería
                            </button>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center justify-center"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                Subir
                            </button>
                        </div>

                        <div
                            className="flex-1 overflow-y-auto p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg m-4 flex flex-col items-center justify-center min-h-[200px]"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                                Arrastrá una imagen o hacé clic en "Subir"
                            </p>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />

                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                            <button
                                onClick={() => setShowSelector(false)}
                                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Galería modal (común para ambos modos) */}
            {showGallery && (
                <div
                    className="fixed inset-0 bg-black/75 flex items-center justify-center z-[10000] p-4"
                    onClick={() => setShowGallery(false)}
                >
                    <div
                        className="bg-white dark:bg-neutral-900 rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="text-xl font-bold">Galería de imágenes</h3>
                            <button
                                onClick={() => setShowGallery(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {galleryImages.map((img) => (
                                    <button
                                        key={img.id}
                                        onClick={() => handleSelectFromGallery(img.url)}
                                        className="group relative aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all"
                                    >
                                        <img
                                            src={img.url}
                                            alt={img.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = FALLBACK_IMAGES[category] || FALLBACK_IMAGES.consulting;
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">{img.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                            <button
                                onClick={() => setShowGallery(false)}
                                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    setShowGallery(false);
                                    setShowSelector(true);
                                }}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditableImage;
// src/components/common/EditableText.tsx
import { Check, Edit2, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

interface EditableTextProps {
  elementId: string;
  defaultText: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  placeholder?: string;
  maxLength?: number;
}

const EditableText: React.FC<EditableTextProps> = ({
  elementId,
  defaultText,
  tag: Tag = 'span',
  className = '',
  placeholder = 'Escribe aquí...',
  maxLength = 100
}) => {
  const { config } = useTemplateEditor();
  const { template, updateText, /*hasUnsavedChanges, saveDraft*/ } = useTemplate();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(defaultText);
  const [tempText, setTempText] = useState(defaultText);
  const [hasLocalChanges, setHasLocalChanges] = useState(false);
  const [inputWidth, setInputWidth] = useState(200);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  // Cargar texto guardado del contexto
  useEffect(() => {
    const savedText = template?.texts?.[elementId];
    if (savedText) {
      setText(savedText);
      setTempText(savedText);
    } else {
      setText(defaultText);
      setTempText(defaultText);
    }
    setHasLocalChanges(false);
  }, [template, elementId, defaultText]);

  // Medir ancho del texto
  useEffect(() => {
    if (isEditing && measureRef.current) {
      const width = measureRef.current.offsetWidth + 32;
      setInputWidth(Math.max(width, 250));
    }
  }, [tempText, isEditing]);

  // Focus automático al editar
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (config.isEditing) {
      setIsEditing(true);
      setTempText(text);
      setHasLocalChanges(false);
    }
  };

  const handleSave = () => {
    const newText = tempText.trim();
    if (newText !== '') {
      setText(newText);
      updateText(elementId, newText);
      setHasLocalChanges(false);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempText(text);
    setIsEditing(false);
    setHasLocalChanges(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, maxLength);
    setTempText(newValue);
    setHasLocalChanges(newValue !== text);
  };

  // Modo edición (inactivo pero seleccionable)
  if (config.isEditing && !isEditing) {
    return (
      <Tag
        id={`editable-${elementId}`}
        data-element-id={elementId}
        onClick={handleClick}
        className={`
          relative group cursor-pointer
          hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50 
          hover:bg-blue-50 dark:hover:bg-blue-900/20
          rounded px-1 transition-all
          ${className}
        `}
        title="Click para editar"
      >
        {text}
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
          <Edit2 className="w-3 h-3 inline mr-1" />
          Click para editar
        </span>
      </Tag>
    );
  }

  // Modo edición activo
  if (isEditing) {
    return (
      <span className="relative inline-block">
        <span
          ref={measureRef}
          className="absolute invisible whitespace-nowrap text-lg"
          style={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}
        >
          {tempText || placeholder}
        </span>

        <input
          ref={inputRef}
          type="text"
          value={tempText}
          onChange={handleInputChange}
          onBlur={handleSave}
          onKeyDown={handleKeyPress}
          maxLength={maxLength}
          placeholder={placeholder}
          className={`
            bg-white dark:bg-neutral-800 
            border-2 border-blue-500 rounded-lg 
            px-3 py-1 
            focus:outline-none 
            shadow-lg
            relative
            z-10
            text-gray-900 dark:text-gray-100
            ${className}
          `}
          style={{ width: inputWidth }}
        />

        <div className="absolute -bottom-12 left-0 flex items-center space-x-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-200 p-1.5 z-20">
          <div className="text-xs text-gray-500 px-2">
            {tempText.length}/{maxLength}
          </div>
          {hasLocalChanges && (
            <div className="text-xs text-yellow-500 flex items-center gap-1 px-1">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              Sin guardar
            </div>
          )}
          <button
            onClick={handleSave}
            className="p-1.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            title="Guardar (Enter)"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            title="Cancelar (Escape)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute -top-2 left-4 w-4 h-4 bg-blue-500 rotate-45 transform origin-center z-0"></div>
      </span>
    );
  }

  // Modo normal
  return <Tag className={className}>{text}</Tag>;
};

export default EditableText;
import { Edit3, Eye } from 'lucide-react';
import React from 'react';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

const EditModeToggle: React.FC = () => {
    const { config, toggleEditing } = useTemplateEditor();

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={toggleEditing}
                className={`group relative flex items-center space-x-3 px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105 ${config.isEditing
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}
            >
                {config.isEditing ? (
                    <>
                        <Eye className="w-5 h-5" />
                        <span className="font-medium">Modo edición activado</span>
                    </>
                ) : (
                    <>
                        <Edit3 className="w-5 h-5" />
                        <span className="font-medium">Activar modo edición</span>
                    </>
                )}

                {/* Tooltip */}
                <span className="absolute -top-10 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {config.isEditing
                        ? 'Hacé clic en cualquier texto para editarlo'
                        : 'Activá para poder modificar los textos'}
                </span>
            </button>
        </div>
    );
};

export default EditModeToggle;
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
import React from 'react';
import { LogIn, User, X, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, message }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70]">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-md w-full shadow-2xl animate-slideDown">
                <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Iniciar sesión requerido</h3>
                        <button
                            onClick={onClose}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                
                <div className="p-6">
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-amber-600" />
                        </div>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-center mb-2">
                        ¡Necesitas una cuenta!
                    </h4>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
                        {message || 'Para guardar este template en tu cuenta necesitas iniciar sesión o registrarte.'}
                    </p>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6">
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                            💡 Si ya tienes una cuenta, inicia sesión ahora. Si no, puedes crear una gratis en menos de un minuto.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => {
                                onClose();
                                sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
                                navigate('/login');
                            }}
                            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center"
                        >
                            <LogIn className="w-4 h-4 mr-2" />
                            Iniciar sesión
                        </button>
                        <button
                            onClick={() => {
                                onClose();
                                navigate('/register');
                            }}
                            className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center"
                        >
                            <User className="w-4 h-4 mr-2" />
                            Registrarse
                        </button>
                    </div>
                    
                    <button
                        onClick={onClose}
                        className="w-full mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors text-sm"
                    >
                        Seguir editando sin guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
import { ChevronDown, ChevronRight, Info } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface SectionAccordionProps {
    title: string;
    icon: React.ElementType;
    tooltipText: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
    scrollToId?: string; // Nuevo: ID del elemento al que hacer scroll al abrirse
}

export const SectionAccordion: React.FC<SectionAccordionProps> = ({
    title,
    icon: Icon,
    tooltipText,
    defaultOpen = false,
    children,
    scrollToId,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const prevOpenRef = useRef(defaultOpen);

    useEffect(() => {
        // Solo hacer scroll si se acaba de abrir (cambió de false a true)
        if (isOpen && !prevOpenRef.current && scrollToId) {
            const element = document.getElementById(scrollToId);
            if (element) {
                // Pequeño retraso para que el DOM se actualice
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
        prevOpenRef.current = isOpen;
    }, [isOpen, scrollToId]);

    return (
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg mb-3 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary-500" />
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">{title}</span>
                    <span className="inline-flex cursor-help" title={tooltipText}>
                        <Info className="w-3.5 h-3.5 text-neutral-400 hover:text-primary-500 transition-colors" />
                    </span>
                </div>
                {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                ) : (
                    <ChevronRight className="w-4 h-4 text-neutral-500" />
                )}
            </button>
            {isOpen && <div className="p-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700">{children}</div>}
        </div>
    );
};
import React from 'react';

interface SelectInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

export const SelectInput: React.FC<SelectInputProps> = ({ label, value, onChange, options }) => {
    return (
        <div className="mb-2">
            <label className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300 block mb-0.5">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-1.5 py-0.5 text-[10px] border rounded-lg bg-white dark:bg-neutral-800"
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
};
import React from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

interface TemplateSelectorProps {
    onSelect: () => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
    const { template, resetTemplate } = useTemplate();
    const { toggleEditing } = useTemplateEditor();

    const templates = [
        { id: 'consulting', name: 'Consultoría', icon: '📊', color: 'blue' },
        { id: 'catering', name: 'Catering', icon: '🍽️', color: 'amber' },
        { id: 'accounting', name: 'Contaduría', icon: '🧾', color: 'emerald' },
        { id: 'restaurant', name: 'Restaurant', icon: '🍝', color: 'red' },
    ];

    const handleSelectTemplate = (templateId: string) => {
        resetTemplate(templateId);
        onSelect();
        // Activar modo edición automáticamente
        setTimeout(() => toggleEditing(), 100);
    };

    return (
        <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Seleccionar Template</h3>
            <div className="grid grid-cols-2 gap-3">
                {templates.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => handleSelectTemplate(t.id)}
                        className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${template?.type === t.id
                                ? `border-${t.color}-500 bg-${t.color}-50 dark:bg-${t.color}-900/30`
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                            }`}
                    >
                        <div className="text-3xl mb-2">{t.icon}</div>
                        <div className="font-medium">{t.name}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TemplateSelector;
import { RotateCcw, Save } from 'lucide-react';
import React, { useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { useTemplateEditor } from '../../contexts/TemplateEditorContext';

interface TextEditorProps {
    elementId: string;
    currentText: string;
    onClose: () => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ elementId, currentText, onClose }) => {
    const { updateText } = useTemplate();
    const { config } = useTemplateEditor();
    const [text, setText] = useState(currentText);

    const handleSave = () => {
        if (text.trim()) {
            updateText(elementId, text);
        }
        onClose();
    };

    if (!config.isEditing) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70]">
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 max-w-md w-full shadow-2xl">
                <h3 className="text-lg font-bold mb-4">Editar texto</h3>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800"
                    rows={4}
                    autoFocus
                />
                <div className="flex space-x-3">
                    <button
                        onClick={handleSave}
                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Guardar
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextEditor;
// src/components/Editor/TutorialOverlay.tsx
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface TutorialOverlayProps {
    targetElementId: string;
    step: number;
    onNext: () => void;
    onPrevious: () => void;
    onSkip: () => void;
    onClose: () => void;
    title: string;
    description: string;
    position: 'top' | 'bottom' | 'left' | 'right';
    showSkip?: boolean;
    totalSteps: number;
    currentStep: number;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
    targetElementId,
    step,
    onNext,
    onPrevious,
    onSkip,
    onClose,
    title,
    description,
    position,
    showSkip = true,
    totalSteps,
    currentStep
}) => {
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    useEffect(() => {
        const target = document.getElementById(targetElementId);
        if (target) {
            setTargetRect(target.getBoundingClientRect());
        }
    }, [targetElementId, step]);

    const getPositionStyle = (): React.CSSProperties => {
        if (!targetRect) return { display: 'none' };

        const baseStyle: React.CSSProperties = {
            position: 'fixed',
            zIndex: 1000,
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            padding: '10px',
            maxWidth: '320px',
            border: '2px solid #3b82f6'
        };

        switch (position) {
            case 'right':
                return {
                    ...baseStyle,
                    left: targetRect.right + 16,
                    top: targetRect.top + (targetRect.height / 2) - 140
                };
            case 'left':
                return {
                    ...baseStyle,
                    right: window.innerWidth - targetRect.left + 16,
                    top: targetRect.top + (targetRect.height / 2) - 60
                };
            case 'top':
                return {
                    ...baseStyle,
                    left: targetRect.left + (targetRect.width / 2) - 150,
                    bottom: window.innerHeight - targetRect.top + 16
                };
            case 'bottom':
                return {
                    ...baseStyle,
                    left: targetRect.left + (targetRect.width / 2) - 150,
                    top: targetRect.bottom + 16
                };
            default:
                return baseStyle;
        }
    };

    // Crear overlay para resaltar el elemento
    useEffect(() => {
        if (targetRect) {
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = `${targetRect.top - 4}px`;
            overlay.style.left = `${targetRect.left - 4}px`;
            overlay.style.width = `${targetRect.width + 8}px`;
            overlay.style.height = `${targetRect.height + 8}px`;
            overlay.style.borderRadius = '12px';
            overlay.style.border = '3px solid #3b82f6';
            overlay.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
            overlay.style.zIndex = '999';
            overlay.style.pointerEvents = 'none';
            overlay.id = 'tutorial-highlight';

            document.body.appendChild(overlay);

            return () => {
                const existing = document.getElementById('tutorial-highlight');
                if (existing) existing.remove();
            };
        }
    }, [targetRect]);

    return (
        <>
            {/* Fondo semi-transparente */}
            <div className="fixed inset-0 bg-black/50 z-[998]" onClick={onClose} />

            {/* Tarjeta del tutorial */}
            <div style={getPositionStyle()} className="animate-fadeIn">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                            Paso {currentStep + 1}/{totalSteps}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>

                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <button
                            onClick={onPrevious}
                            disabled={currentStep === 0}
                            className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onNext}
                            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors flex items-center gap-1"
                        >
                            {currentStep === totalSteps - 1 ? 'Finalizar' : 'Siguiente'}
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {showSkip && (
                        <button
                            onClick={onSkip}
                            className="text-xs text-gray-500 hover:text-gray-700"
                        >
                            Omitir tutorial
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default TutorialOverlay;
// src/components/Editor/VisualEditorPanel.tsx - VERSIÓN CORREGIDA CON FALLBACKS
import {
    ChevronDown, ChevronRight, Eye,
    Layout, Link,
    Palette,
    Type
} from 'lucide-react';
import React, { useState } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { defaultButtons, defaultSectionColors, defaultTypography, defaultUI } from '../../types/template.types';

type EditorSection = 'hero' | 'buttons' | 'header' | 'typography' | 'ui' | 'global';

export const VisualEditorPanel: React.FC = () => {
    const { template, updateSectionColors, updateTypography, updateUI, updateButtons } = useTemplate();
    const [expandedSection, setExpandedSection] = useState<EditorSection>('hero');

    // const sections = [
    //     { id: 'hero' as EditorSection, label: '🎨 Hero (Sección principal)', icon: Eye },
    //     { id: 'buttons' as EditorSection, label: '🔘 Botones', icon: Link },
    //     { id: 'header' as EditorSection, label: '📋 Header (Barra superior)', icon: Layout },
    //     { id: 'typography' as EditorSection, label: '✏️ Tipografía', icon: Type },
    //     { id: 'ui' as EditorSection, label: '🎨 Bordes y sombras', icon: Palette },
    //     { id: 'global' as EditorSection, label: '🌍 Configuración global', icon: Sparkles },
    // ];

    const SectionHeader = ({ section, label, icon: Icon }: { section: EditorSection; label: string; icon: React.ElementType }) => (
        <button
            onClick={() => setExpandedSection(expandedSection === section ? 'hero' : section)}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl mb-2"
        >
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-primary-500" />
                <span className="font-semibold text-gray-900 dark:text-white">{label}</span>
            </div>
            {expandedSection === section ?
                <ChevronDown className="w-5 h-5" /> :
                <ChevronRight className="w-5 h-5" />
            }
        </button>
    );

    if (!template) return null;

    // Valores por defecto para evitar undefined
    const sectionColors = template.sectionColors || defaultSectionColors;
    const typography = template.typography || defaultTypography;
    const ui = template.ui || defaultUI;
    const buttons = template.buttons || defaultButtons;

    return (
        <div className="space-y-3">
            {/* Hero Section */}
            <div>
                <SectionHeader section="hero" label="Hero (Sección principal)" icon={Eye} />
                {expandedSection === 'hero' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-3">
                        <h4 className="text-sm font-semibold mb-3">🎨 Colores del Hero</h4>

                        <ColorInput
                            label="Fondo del Hero"
                            value={sectionColors.heroBackground}
                            onChange={(color: string) => updateSectionColors({ heroBackground: color })}
                            description="Color de fondo de la sección principal"
                        />

                        <ColorInput
                            label="Color del título"
                            value={sectionColors.heroTitleColor}
                            onChange={(color: string) => updateSectionColors({ heroTitleColor: color })}
                            description="Color del texto principal"
                        />

                        <ColorInput
                            label="Color de la descripción"
                            value={sectionColors.heroDescriptionColor}
                            onChange={(color: string) => updateSectionColors({ heroDescriptionColor: color })}
                            description="Color del texto secundario"
                        />

                        <div className="border-t border-gray-200 dark:border-gray-700 my-3 pt-3">
                            <h4 className="text-sm font-semibold mb-3">✨ Badge (Etiqueta destacada)</h4>
                            <ColorInput
                                label="Fondo del badge"
                                value={sectionColors.heroBadgeBackground}
                                onChange={(color: string) => updateSectionColors({ heroBadgeBackground: color })}
                            />
                            <ColorInput
                                label="Texto del badge"
                                value={sectionColors.heroBadgeTextColor}
                                onChange={(color: string) => updateSectionColors({ heroBadgeTextColor: color })}
                            />
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 my-3 pt-3">
                            <h4 className="text-sm font-semibold mb-3">📏 Tamaños del Hero</h4>
                            <SizeInput
                                label="Tamaño del título"
                                value={typography.heroTitleSize}
                                onChange={(size: string) => updateTypography({ heroTitleSize: size })}
                                options={['2rem', '2.5rem', '3rem', '3.5rem', '4rem']}
                            />
                            <SizeInput
                                label="Tamaño de la descripción"
                                value={typography.heroDescriptionSize}
                                onChange={(size: string) => updateTypography({ heroDescriptionSize: size })}
                                options={['0.875rem', '1rem', '1.125rem', '1.25rem']}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Botones Section */}
            <div>
                <SectionHeader section="buttons" label="Botones" icon={Link} />
                {expandedSection === 'buttons' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-4">
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold">🔵 Botón principal</h4>
                            <TextInput
                                label="Texto del botón"
                                value={buttons.primary.text}
                                onChange={(text: string) => updateButtons({ primary: { ...buttons.primary, text } })}
                            />
                            <UrlInput
                                label="Enlace"
                                value={buttons.primary.url}
                                onChange={(url: string) => updateButtons({ primary: { ...buttons.primary, url } })}
                            />
                            <ColorInput
                                label="Color de fondo"
                                value={sectionColors.buttonPrimaryBackground}
                                onChange={(color: string) => updateSectionColors({ buttonPrimaryBackground: color })}
                            />
                            <ColorInput
                                label="Color del texto"
                                value={sectionColors.buttonPrimaryText}
                                onChange={(color: string) => updateSectionColors({ buttonPrimaryText: color })}
                            />
                            <ColorInput
                                label="Color al pasar el mouse"
                                value={sectionColors.buttonPrimaryHoverBackground}
                                onChange={(color: string) => updateSectionColors({ buttonPrimaryHoverBackground: color })}
                            />
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                            <h4 className="text-sm font-semibold mb-3">⚪ Botón secundario</h4>
                            <TextInput
                                label="Texto del botón"
                                value={buttons.secondary.text}
                                onChange={(text: string) => updateButtons({ secondary: { ...buttons.secondary, text } })}
                            />
                            <UrlInput
                                label="Enlace"
                                value={buttons.secondary.url}
                                onChange={(url: string) => updateButtons({ secondary: { ...buttons.secondary, url } })}
                            />
                            <ColorInput
                                label="Color de fondo"
                                value={sectionColors.buttonSecondaryBackground}
                                onChange={(color: string) => updateSectionColors({ buttonSecondaryBackground: color })}
                            />
                            <ColorInput
                                label="Color del texto"
                                value={sectionColors.buttonSecondaryText}
                                onChange={(color: string) => updateSectionColors({ buttonSecondaryText: color })}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Header Section */}
            <div>
                <SectionHeader section="header" label="Header (Barra superior)" icon={Layout} />
                {expandedSection === 'header' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-3">
                        <ColorInput
                            label="Fondo del header"
                            value={sectionColors.headerBackground}
                            onChange={(color: string) => updateSectionColors({ headerBackground: color })}
                        />
                        <ColorInput
                            label="Color del texto"
                            value={sectionColors.headerTextColor}
                            onChange={(color: string) => updateSectionColors({ headerTextColor: color })}
                        />
                        <ColorInput
                            label="Color de los enlaces"
                            value={sectionColors.headerLinkColor}
                            onChange={(color: string) => updateSectionColors({ headerLinkColor: color })}
                        />
                        <ColorInput
                            label="Color de enlaces al pasar mouse"
                            value={sectionColors.headerLinkHoverColor}
                            onChange={(color: string) => updateSectionColors({ headerLinkHoverColor: color })}
                        />
                    </div>
                )}
            </div>

            {/* Tipografía Section */}
            <div>
                <SectionHeader section="typography" label="Tipografía" icon={Type} />
                {expandedSection === 'typography' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-3">
                        <FontSelect
                            label="Fuente de títulos"
                            value={typography.headingFont}
                            onChange={(font: string) => updateTypography({ headingFont: font })}
                        />
                        <FontSelect
                            label="Fuente de textos"
                            value={typography.bodyFont}
                            onChange={(font: string) => updateTypography({ bodyFont: font })}
                        />
                        <SizeInput
                            label="Tamaño de títulos de sección"
                            value={typography.sectionTitleSize}
                            onChange={(size: string) => updateTypography({ sectionTitleSize: size })}
                            options={['1.5rem', '1.875rem', '2rem', '2.25rem', '2.5rem']}
                        />
                        <SizeInput
                            label="Tamaño de texto general"
                            value={typography.bodyTextSize}
                            onChange={(size: string) => updateTypography({ bodyTextSize: size })}
                            options={['0.875rem', '1rem', '1.125rem']}
                        />
                    </div>
                )}
            </div>

            {/* UI Section */}
            <div>
                <SectionHeader section="ui" label="Bordes y sombras" icon={Palette} />
                {expandedSection === 'ui' && (
                    <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl space-y-3">
                        <BorderRadiusSelect
                            label="Bordes de botones"
                            value={ui.borderRadius.medium}
                            onChange={(radius: string) => updateUI({ borderRadius: { ...ui.borderRadius, medium: radius } })}
                        />
                        <BorderRadiusSelect
                            label="Bordes de tarjetas"
                            value={ui.borderRadius.large}
                            onChange={(radius: string) => updateUI({ borderRadius: { ...ui.borderRadius, large: radius } })}
                        />
                        <ShadowSelect
                            label="Sombra de tarjetas"
                            value={ui.boxShadow.medium}
                            onChange={(shadow: string) => updateUI({ boxShadow: { ...ui.boxShadow, medium: shadow } })}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

// Componentes auxiliares con tipado correcto
const ColorInput = ({ label, value, onChange, description }: {
    label: string;
    value: string;
    onChange: (color: string) => void;
    description?: string;
}) => (
    <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <div className="flex items-center gap-2">
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border border-gray-300"
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border rounded-lg font-mono"
            />
        </div>
        {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
);

const SizeInput = ({ label, value, onChange, options }: {
    label: string;
    value: string;
    onChange: (size: string) => void;
    options: string[];
}) => (
    <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg"
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
    <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg"
        />
    </div>
);

const UrlInput = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (url: string) => void;
}) => (
    <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <div className="flex gap-2">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="/ruta o https://..."
                className="flex-1 px-3 py-2 text-sm border rounded-lg"
            />
        </div>
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
        <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg"
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

const BorderRadiusSelect = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (radius: string) => void;
}) => {
    const radii = [
        { value: '0.25rem', label: 'Pequeño (4px)' },
        { value: '0.5rem', label: 'Mediano (8px)' },
        { value: '0.75rem', label: 'Grande (12px)' },
        { value: '1rem', label: 'Extra grande (16px)' },
        { value: '9999px', label: 'Completamente redondo' },
    ];

    return (
        <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg"
            >
                {radii.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
            <div
                className="h-12 w-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2"
                style={{ borderRadius: value }}
            />
        </div>
    );
};

const ShadowSelect = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (shadow: string) => void;
}) => {
    const shadows = [
        { value: 'none', label: 'Sin sombra' },
        { value: '0 1px 2px 0 rgb(0 0 0 / 0.05)', label: 'Sutil' },
        { value: '0 4px 6px -1px rgb(0 0 0 / 0.1)', label: 'Mediana' },
        { value: '0 10px 15px -3px rgb(0 0 0 / 0.1)', label: 'Fuerte' },
        { value: '0 20px 25px -5px rgb(0 0 0 / 0.1)', label: 'Extra fuerte' },
    ];

    return (
        <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg"
            >
                {shadows.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <div
                className="h-12 w-full bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-xs"
                style={{ boxShadow: value }}
            >
                Vista previa
            </div>
        </div>
    );
};
// src/services/api/types/api.types.ts

// Respuesta base de la API
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  timestamp?: string;
}

// Error de la API
export interface ApiError {
  success: false;
  message: string;
  errors?: string[];
  timestamp?: string;
}

// Parámetros para requests paginados
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Respuesta paginada
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Configuración de request
export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  params?: Record<string, any>;
  data?: any;
}
// src/services/api/types/auth.ts - Sincronizado con Prisma Schema
export type UserRole = 'ADMIN' | 'CLIENT' | 'DEVELOPER';
export type PlanType = 'LANDING' | 'ECOMMERCE' | 'ENTERPRISE' | null;
export type SubscriptionStatus = 'ACTIVE' | 'PENDING' | 'CANCELLED' | 'NONE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  plan?: PlanType;
  subscriptionStatus?: SubscriptionStatus;
  isActive: boolean;
  emailVerified: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;  // Solo para frontend
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: string;
}

export type OrderPlan = 'LANDING_PAGE' | 'E_COMMERCE' | 'CUSTOM_SYSTEM';
export type OrderStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: string;
  orderId: string;
  userId: string;
  plan: OrderPlan;
  status: OrderStatus;
  progress: number;
  total: string;          // Decimal del backend se maneja como string
  monthlyFee?: string;    // Decimal del backend se maneja como string
  customerName: string;
  customerEmail: string;
  startDate: string;
  estimatedDelivery?: string;
  details: any;
  timeline: TimelineStep[];
  updates: OrderUpdate[];
  team?: TeamMember[];
  payments?: Payment[];
  siteChanges?: SiteChange[];
  createdAt: string;
  updatedAt: string;
}

export type TimelineStepType = 'CONFIRMED' | 'DESIGN' | 'DEVELOPMENT' | 'REVIEW' | 'DELIVERY';

export interface TimelineStep {
  id: string;
  step: TimelineStepType;
  date: string;
  completed: boolean;
  description?: string;
}

export type OrderUpdateType = 'INFO' | 'PROGRESS' | 'SUCCESS' | 'WARNING';

export interface OrderUpdate {
  id: string;
  type: OrderUpdateType;
  message: string;
  date: string;
  author?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  email?: string;
}

export type PaymentMethod = 'MERCADOPAGO' | 'PAYPAL' | 'TRANSFER' | 'CREDIT_CARD';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: string;         // Decimal del backend se maneja como string
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId?: string;
  invoiceUrl?: string;
  description?: string;
  dueDate?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type SiteChangeType = 'DESIGN' | 'CONTENT' | 'FEATURE' | 'BUGFIX' | 'UPDATE';
export type SiteChangeStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';

// src/services/api/types/auth.ts - ACTUALIZAR SiteChange

export interface SiteChange {
  id: string;
  orderId: string;
  userId: string;
  approvedById?: string;
  // AGREGAR ESTO - Objeto del usuario que aprobó
  approvedBy?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  // AGREGAR ESTO - Objeto del usuario que solicitó
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  // AGREGAR ESTO - Objeto del pedido
  order?: {
    id: string;
    orderId: string;
    plan: OrderPlan;
    customerName: string;
  };
  type: SiteChangeType;
  description: string;
  details?: string;
  beforeImage?: string;
  afterImage?: string;
  status: SiteChangeStatus;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteChange2 {
  id: string;
  orderId: string;
  userId: string;
  approvedById?: string;
  type: SiteChangeType;
  description: string;
  details?: string;
  beforeImage?: string;
  afterImage?: string;
  status: SiteChangeStatus;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}
// src/services/api/types/contact.types.ts

// Datos del formulario de contacto
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  projectType?: ProjectType;
  contactMethod?: ContactMethod;
  source?: string;
}

// Tipos de proyecto
export type ProjectType = 
  | 'landing'
  | 'ecommerce' 
  | 'crm'
  | 'inventory'
  | 'custom'
  | 'other'
  | '';

// Métodos de contacto
export type ContactMethod = 'email' | 'whatsapp';

// Respuesta exitosa del contacto
export interface ContactResponse {
  success: true;
  message: string;
  data: {
    id: string | number;
    name: string;
    email: string;
    timestamp: string;
    projectType?: string;
    contactMethod?: string;
  };
}

// Datos de lead
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  projectType: string;
  contactMethod: string;
  source: string;
  ipAddress?: string;
  userAgent?: string;
  status: 'new' | 'contacted' | 'converted' | 'archived';
  createdAt: string;
  updatedAt: string;
}

// Estadísticas de leads
export interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  converted: number;
  bySource: Record<string, number>;
  byProjectType: Record<string, number>;
  last7Days: Array<{
    date: string;
    count: number;
  }>;
}
// src/services/api/types/health.types.ts

// Health check básico
export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy' | 'warning';
  service: string;
  version: string;
  timestamp: string;
  uptime: number;
  uptimeFormatted: string;
  environment: string;
  memory: {
    used: string;
    total: string;
    usagePercentage: string;
  };
  system: {
    platform: string;
    arch: string;
    cpus: number;
    loadavg: number[];
    freemem: string;
    totalmem: string;
  };
  dependencies: {
    node: string;
    express: string;
  };
  message?: string;
}

// Health check simple
export interface SimpleHealthStatus {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  uptime: string;
  memory?: string;
}

// Health check detallado
export interface DetailedHealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  service: string;
  timestamp: string;
  checks: {
    api: {
      status: string;
      timestamp: string;
      uptime: string;
    };
    memory: {
      status: string;
      usage: string;
      percentage: string;
    };
    system: {
      status: string;
      load: number;
      loadPerCore: number;
    };
    database: {
      status: string;
      message: string;
    };
    email: {
      status: string;
      message: string;
      configured: boolean;
    };
    environment: {
      status: string;
      node: string;
      env: string;
    };
  };
  summary: {
    total: number;
    healthy: number;
    warning: number;
    error: number;
  };
}

// Información del servidor
export interface ServerInfo {
  server: {
    name: string;
    version: string;
    environment: string;
    uptime: string;
    uptimeSeconds: number;
    started: string;
    pid: number;
    platform: string;
    nodeVersion: string;
  };
  system: {
    hostname: string;
    platform: string;
    arch: string;
    cpus: number;
    cpuModel: string;
    cpuSpeed: number;
    memory: {
      total: string;
      free: string;
      used: string;
      freePercentage: string;
    };
    load: {
      '1min': number;
      '5min': number;
      '15min': number;
      perCore: number;
    };
  };
  process: {
    pid: number;
    memory: {
      rss: string;
      heapTotal: string;
      heapUsed: string;
      external: string;
      arrayBuffers: string;
      usagePercentage: string;
    };
    uptime: number;
    uptimeFormatted: string;
  };
  network: {
    interfaces: number;
    hostname: string;
  };
  time: {
    server: string;
    timezone: string;
    offset: string;
  };
}
// src/services/api/types/index.ts
// Exporta todos los tipos desde un solo lugar

export * from './api.types';
export * from './contact.types';
export * from './health.types';
// types.ts
// import { JSX } from 'react';

export type ModuleType = {
  name: string;
  icon: any;
  // icon: JSX.Element;
  description: string;
};

export type StackType = {
  frontend: string[];
  backend: string[];
  extras?: string[];
};

export type TemplateType = {
  id: string;
  title: string;
  description: string;
  category: string;
  // icon: JSX.Element;
  icon: any;
  color: string;
  gradientBg: string;
  features: string[];
  stack: StackType;
  deliveryTime: string;
  idealFor: string[];
  modules: ModuleType[];
  priceRange: string;
  useCase: string;
};
// src/services/api/types.ts
export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  [key: string]: any;
}
// src/services/api/auth.service.ts - VERSIÓN CORREGIDA
import { get, post, put } from './index';
import type {
  AuthResponse,
  LoginCredentials,
  Order,
  RegisterData,
  User
} from './types/auth';

// Funciones de autenticación
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await post<AuthResponse>('/auth/login', credentials);

  // Guardar token en localStorage
  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  return response;
};

export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  const response = await post<AuthResponse>('/auth/register', userData);
  return response;
};

export const logout = async (): Promise<void> => {
  try {
    await post('/auth/logout');
  } catch (error) {
    console.error('Error en logout:', error);
  } finally {
    // Siempre limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
  }
};

export const getProfile = async (): Promise<User> => {
  const response = await get<{ success: boolean; user: User }>('/auth/profile');
  return response.user;
};

export const refreshToken = async (): Promise<{ token: string; refreshToken: string }> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No hay refresh token disponible');
  }

  const response = await post<{ success: boolean; token: string; refreshToken: string }>(
    '/auth/refresh',
    { refreshToken }
  );

  // Actualizar tokens
  localStorage.setItem('token', response.token);
  localStorage.setItem('refreshToken', response.refreshToken);

  return response;
};

export const updateProfile = async (userData: Partial<User>): Promise<User> => {
  const response = await put<{ success: boolean; user: User }>('/auth/profile', userData);

  // Actualizar usuario en localStorage
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const updatedUser = { ...currentUser, ...response.user };
  localStorage.setItem('user', JSON.stringify(updatedUser));

  return response.user;
};

// Servicios de pedidos
export const getUserOrders = async (): Promise<Order[]> => {
  const response = await get<{
    success: boolean;
    count: number;
    orders: Order[]
  }>('/orders');

  return response.orders || [];
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  const response = await get<{ success: boolean; order: Order }>(`/orders/${orderId}`);
  return response.order;
};

export const searchOrder = async (params: { orderId?: string; email?: string }): Promise<Order[]> => {
  const response = await get<{ success: boolean; orders: Order[] }>('/orders/search', { params });
  return response.orders || [];
};

export const createOrder = async (orderData: {
  plan: string;
  total: number;
  monthlyFee?: number;
  details?: any;
}): Promise<{ success: boolean; message: string; order: Order }> => {
  return await post('/orders', orderData);
};

export const addOrderUpdate = async (orderId: string, data: { message: string; type?: string }): Promise<any> => {
  return await post(`/orders/${orderId}/updates`, data);
};

// NOTA: Los servicios de pagos y site changes se movieron a:
// - payment.service.ts
// - siteChange.service.ts
// Mantén solo las funciones básicas de orders aquí

// Funciones de utilidad
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  // Opcional: Verificar expiración del token
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Re-exportar tipos para compatibilidad
export type {
  AuthResponse, LoginCredentials, Order, OrderPlan,
  OrderStatus, OrderUpdate, OrderUpdateType, Payment, PaymentMethod,
  PaymentStatus, PlanType, RegisterData, SiteChange, SiteChangeStatus, SiteChangeType, SubscriptionStatus, TeamMember, TimelineStep, TimelineStepType, User, UserRole
} from './types/auth';

// src/services/api/index.ts - VERSIÓN CORREGIDA
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { RequestConfig } from './types';

// Configuración
const API_BASE_URL = import.meta.env.VITE_API_URL || 'kerneliceapi-production.up.railway.app'//'http://localhost:3000/api';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000');

// Instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// INTERCEPTOR DE REQUEST (UN SOLO)
api.interceptors.request.use(
  (config) => {
    // Agregar token si existe
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Headers personalizados
    config.headers['X-Source'] = 'kernelize_landing_page';
    config.headers['X-Client-Version'] = import.meta.env.VITE_APP_VERSION || '1.0.0';

    return config;
  },
  (error) => Promise.reject(error)
);

// INTERCEPTOR DE RESPONSE (UN SOLO)
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Extraer los datos de la respuesta
    const data = response.data;

    // Si la respuesta tiene estructura { data, message, success }
    if (data && typeof data === 'object') {
      // Para endpoints que devuelven { success, data, message }
      if ('success' in data && 'data' in data) {
        return data.data;
      }
      // Para endpoints que devuelven { success, user, token }
      if ('success' in data) {
        return data;
      }
    }
    return data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Manejo de timeout
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        success: false,
        errorCode: 'TIMEOUT',
        message: 'Timeout: La solicitud tardó demasiado.',
        timestamp: new Date().toISOString(),
      });
    }

    // Error de conexión
    if (!error.response) {
      return Promise.reject({
        success: false,
        errorCode: 'CONNECTION_ERROR',
        message: 'Error de conexión: No se pudo conectar con el servidor.',
        timestamp: new Date().toISOString(),
      });
    }

    const errorData = error.response?.data;
    const errorCode = errorData?.errorCode;

    // Manejo específico por código de error
    switch (errorCode) {
      case 'TOKEN_EXPIRED':
        // Intentar refrescar token automáticamente (una sola vez)
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
              const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                refreshToken
              });

              // Actualizar tokens
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('refreshToken', response.data.refreshToken);

              // Reintentar request original
              originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
              return api(originalRequest);
            }
          } catch (refreshError) {
            // Si falla el refresh, limpiar y redirigir
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
            if (!window.location.pathname.includes('/login')) {
              // window.location.href = '/login';
              window.dispatchEvent(new CustomEvent('auth:logout'));
            }
          }
        }
        break;

      case 'INVALID_TOKEN':
      case 'FORBIDDEN':
        // Limpiar localStorage y redirigir
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
        if (!window.location.pathname.includes('/login')) {
          // window.location.href = '/login';
          window.dispatchEvent(new CustomEvent('auth:logout'));
        }
        break;

      case 'VALIDATION_ERROR':
        // Devolver errores de validación estructurados
        return Promise.reject({
          success: false,
          errorCode: 'VALIDATION_ERROR',
          message: errorData.message || 'Error de validación',
          errors: errorData.errors || [],
          fields: errorData.fields || [],
        });

      case 'RATE_LIMIT_EXCEEDED':
        return Promise.reject({
          success: false,
          errorCode: 'RATE_LIMIT_EXCEEDED',
          message: 'Demasiadas solicitudes. Por favor espera un momento.',
        });

      case 'NOT_FOUND':
        return Promise.reject({
          success: false,
          errorCode: 'NOT_FOUND',
          message: errorData.message || 'Recurso no encontrado',
        });

      case 'DUPLICATE_ENTRY':
        return Promise.reject({
          success: false,
          errorCode: 'DUPLICATE_ENTRY',
          message: errorData.message || 'Este registro ya existe',
          fields: errorData.fields || [],
        });
    }

    // Si es error 401 sin código específico
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    // Usar el error del servidor si existe
    return Promise.reject({
      success: false,
      errorCode: errorCode || 'UNKNOWN_ERROR',
      message: errorData?.message || 'Error desconocido del servidor.',
      timestamp: new Date().toISOString(),
      ...errorData,
    });
  }
);

// Función helper genérica
export const request = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  data?: any,
  config?: RequestConfig
): Promise<T> => {
  try {
    const response = await api({
      method,
      url,
      data,
      ...config,
    });
    return response as T;
  } catch (error: any) {
    // En desarrollo, loggear el error
    if (import.meta.env.DEV) {
      console.error(`API ${method} ${url} error:`, error);
    }
    throw error;
  }
};

// Métodos específicos
export const get = <T>(url: string, config?: RequestConfig): Promise<T> =>
  request<T>('GET', url, undefined, config);

export const post = <T>(url: string, data?: any, config?: RequestConfig): Promise<T> =>
  request<T>('POST', url, data, config);

export const put = <T>(url: string, data?: any, config?: RequestConfig): Promise<T> =>
  request<T>('PUT', url, data, config);

export const del = <T>(url: string, config?: RequestConfig): Promise<T> =>
  request<T>('DELETE', url, undefined, config);

export const patch = <T>(url: string, data?: any, config?: RequestConfig): Promise<T> =>
  request<T>('PATCH', url, data, config);

export default api;
// src/services/api/templateApi.service.ts
import { del, get, post } from './index';

export interface TemplateData {
    name: string;
    type: string;  // Esto debe venir en mayúsculas
    colors: Record<string, string> | string;
    texts: Record<string, string>;
    images?: Record<string, string>;
    orderId?: string;
}

export interface TemplateResponse {
    success: boolean;
    message?: string;
    template?: any;
    templates?: any[];
}

export const templateApi = {
    // Guardar template (requiere autenticación)
    saveTemplate: async (data: TemplateData): Promise<TemplateResponse> => {
        try {
            // ✅ CORRECCIÓN: Convertir el tipo a mayúsculas si es necesario
            let typeUpper = data.type;
            if (typeof data.type === 'string' && data.type !== data.type.toUpperCase()) {
                typeUpper = data.type.toUpperCase();
            }

            // ✅ CORRECCIÓN: Asegurar que colors sea un objeto, no un string vacío
            let colors = data.colors;
            if (typeof colors === 'string') {
                // Si es un string vacío, usar objeto por defecto
                if (colors === '') {
                    colors = {
                        primary: '#2563eb',
                        secondary: '#475569',
                        accent: '#1e293b',
                        background: '#ffffff',
                        text: '#0f172a'
                    };
                } else {
                    try {
                        colors = JSON.parse(colors);
                    } catch {
                        colors = {};
                    }
                }
            }

            const payload = {
                name: data.name,
                type: typeUpper,  // Ahora en mayúsculas
                colors: colors,
                texts: data.texts || {},
                images: data.images || {}
            };

            console.log('📤 Enviando template al backend:', payload);

            const response: TemplateResponse = await post('/templates', payload);
            return response;
        } catch (error) {
            console.error('Error en saveTemplate:', error);
            throw error;
        }
    },

    // Obtener templates del usuario autenticado
    getUserTemplates: async (): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get('/templates');
            return response;
        } catch (error) {
            console.error('Error en getUserTemplates:', error);
            throw error;
        }
    },

    // Obtener template por ID
    getTemplate: async (id: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get(`/templates/${id}`);
            return response;
        } catch (error) {
            console.error('Error en getTemplate:', error);
            throw error;
        }
    },

    // Eliminar template
    deleteTemplate: async (id: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await del(`/templates/${id}`);
            return response;
        } catch (error) {
            console.error('Error en deleteTemplate:', error);
            throw error;
        }
    },

    // Guardar versión
    saveVersion: async (id: string, data: any): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await post(`/templates/${id}/versions`, data);
            return response;
        } catch (error) {
            console.error('Error en saveVersion:', error);
            throw error;
        }
    },

    // Obtener versiones
    getVersions: async (id: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get(`/templates/${id}/versions`);
            return response;
        } catch (error) {
            console.error('Error en getVersions:', error);
            throw error;
        }
    },

    // Restaurar versión
    restoreVersion: async (id: string, version: number): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await post(`/templates/${id}/versions/${version}/restore`, {});
            return response;
        } catch (error) {
            console.error('Error en restoreVersion:', error);
            throw error;
        }
    },

    // Crear link compartido
    createShareLink: async (id: string, options?: { expiresIn?: number; maxViews?: number }): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await post(`/templates/${id}/share`, options || {});
            return response;
        } catch (error) {
            console.error('Error en createShareLink:', error);
            throw error;
        }
    },

    // Obtener template compartido
    getSharedTemplate: async (token: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get(`/templates/shared/${token}`);
            return response;
        } catch (error) {
            console.error('Error en getSharedTemplate:', error);
            throw error;
        }
    },

    // Templates públicos
    getPublicTemplates: async (type?: string, category?: string): Promise<TemplateResponse> => {
        try {
            const params = new URLSearchParams();
            if (type) params.append('type', type);
            if (category) params.append('category', category);

            const response: TemplateResponse = await get(`/templates/public?${params.toString()}`);
            return response;
        } catch (error) {
            console.error('Error en getPublicTemplates:', error);
            throw error;
        }
    },

    // Descargar template público
    downloadPublicTemplate: async (id: string): Promise<TemplateResponse> => {
        try {
            const response: TemplateResponse = await get(`/templates/public/${id}`);
            return response;
        } catch (error) {
            console.error('Error en downloadPublicTemplate:', error);
            throw error;
        }
    }
};
import type { StoredTemplate, Template } from '../types/template.types';

const STORAGE_KEY = 'kernelize_template_draft';
const AUTO_SAVE_KEY = 'kernelize_auto_save';

export interface StorageOptions {
  silent?: boolean;
}

export const storageService = {
  // Guardar borrador
  saveDraft: (template: Template, options: StorageOptions = {}): boolean => {
    try {
      const storedTemplate: StoredTemplate = {
        ...template,
        createdAt: template.createdAt.toISOString(),
        updatedAt: template.updatedAt.toISOString(),
        lastSaved: new Date().toISOString()
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedTemplate));

      if (!options.silent) {
        // Disparar evento para notificaciones
        window.dispatchEvent(new CustomEvent('template-saved', {
          detail: { message: 'Borrador guardado', type: 'success' }
        }));
      }

      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);

      if (!options.silent) {
        window.dispatchEvent(new CustomEvent('template-saved', {
          detail: { message: 'Error al guardar', type: 'error' }
        }));
      }

      return false;
    }
  },

  // Cargar borrador
  loadDraft: (): Template | null => {
    try {
      const draft = localStorage.getItem(STORAGE_KEY);
      if (!draft) return null;

      const stored = JSON.parse(draft) as StoredTemplate;

      const template: Template = {
        ...stored,
        createdAt: new Date(stored.createdAt),
        updatedAt: new Date(stored.updatedAt)
      };

      return template;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return null;
    }
  },

  // Guardar versión de auto-guardado
  saveAutoSave: (template: Template): void => {
    try {
      const storedTemplate: StoredTemplate = {
        ...template,
        createdAt: template.createdAt.toISOString(),
        updatedAt: template.updatedAt.toISOString(),
      };

      localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(storedTemplate));
    } catch (error) {
      console.error('Error in auto-save:', error);
    }
  },

  // Cargar auto-guardado
  loadAutoSave: (): Template | null => {
    try {
      const autoSave = localStorage.getItem(AUTO_SAVE_KEY);
      if (!autoSave) return null;

      const stored = JSON.parse(autoSave) as StoredTemplate;

      return {
        ...stored,
        createdAt: new Date(stored.createdAt),
        updatedAt: new Date(stored.updatedAt)
      };
    } catch (error) {
      console.error('Error loading auto-save:', error);
      return null;
    }
  },

  // Limpiar todo
  clearAll: (): void => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(AUTO_SAVE_KEY);
  }
};
import type { Template } from '../types/template.types';

const API_URL = import.meta.env.VITE_API_URL || 'https://kerneliceapi-production.up.railway.app/api'//'http://localhost:3000/api';

export const templateService = {
    // Guardar template (requiere autenticación)
    saveTemplate: async (template: Template, token: string) => {
        try {
            const response = await fetch(`${API_URL}/templates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(template)
            });

            if (!response.ok) throw new Error('Error saving template');

            return await response.json();
        } catch (error) {
            console.error('Error saving template:', error);
            throw error;
        }
    },

    // Obtener templates del usuario
    getUserTemplates: async (token: string) => {
        try {
            const response = await fetch(`${API_URL}/templates/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Error fetching templates');

            return await response.json();
        } catch (error) {
            console.error('Error fetching templates:', error);
            throw error;
        }
    },

    // Enviar template por email
    sendTemplateByEmail: async (template: Template, email: string) => {
        try {
            const response = await fetch(`${API_URL}/templates/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ template, email })
            });

            if (!response.ok) throw new Error('Error sending template');

            return await response.json();
        } catch (error) {
            console.error('Error sending template:', error);
            throw error;
        }
    },

    // Cargar template por ID
    loadTemplate: async (id: string, token?: string) => {
        try {
            const headers: HeadersInit = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_URL}/templates/${id}`, { headers });

            if (!response.ok) throw new Error('Error loading template');

            return await response.json();
        } catch (error) {
            console.error('Error loading template:', error);
            throw error;
        }
    }
};


No hagas nada solo analiza el codigo y aramame un informe de como funciona la interaccion de la aplicacion. Una vez tengamos esto voy a pedirte algunas cosas mas.
