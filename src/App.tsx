// src/App.tsx - Versión corregida para vista previa
import { Grid3X3, Heart, LayoutGrid, Sparkles, Star } from 'lucide-react';
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom';
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen';
import { useAuth } from './contexts/AuthContext';
import { TemplateProvider, useTemplate } from './contexts/TemplateContext';
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
import { TemplateEditorProvider } from './contexts/TemplateEditorContext';

// Lazy loading de templates
const AccountingLanding = lazy(() => import('./templates/landing/Accounting/AccountingLanding'));
const ArchitectureLanding = lazy(() => import('./templates/landing/Architecture/ArchitectureLanding'));
const BakeryLanding = lazy(() => import('./templates/landing/Bakery/BakeryLanding'));
const BeautySalonLanding = lazy(() => import('./templates/landing/BeautySalon/SalonLanding'));
const CateringLanding = lazy(() => import('./templates/landing/Catering/CateringLanding'));
const CleaningServiceLanding = lazy(() => import('./templates/landing/CleaningService/CleaningLanding'));
const CoffeeShopLanding = lazy(() => import('./templates/landing/CoffeeShop/CoffeeLanding'));
const ConsultingLanding = lazy(() => import('./templates/landing/Consulting/ConsultingLanding'));
const DigitalAgencyLanding = lazy(() => import('./templates/landing/DigitalAgency/DigitalLanding'));
const FashionStoreLanding = lazy(() => import('./templates/landing/FashionStore/FashionLanding'));
const FoodTruckLanding = lazy(() => import('./templates/landing/FoodTruck/FoodTruckLanding'));
const GymLanding = lazy(() => import('./templates/landing/Gym/GymLanding'));
const LawFirmLanding = lazy(() => import('./templates/landing/LawFirm/LawFirmLanding'));
const MarketingAgencyLanding = lazy(() => import('./templates/landing/MarketingAgency/AgencyLanding'));
const MedicalClinicLanding = lazy(() => import('./templates/landing/MedicalClinic/MedicalLanding'));
const RealEstateLanding = lazy(() => import('./templates/landing/RealEstate/RealEstateLanding'));
const RestaurantLanding = lazy(() => import('./templates/landing/Restaurant/RestaurantLanding'));
const SaaSlanding = lazy(() => import('./templates/landing/SaaS/SaaSlanding'));
const StartupLanding = lazy(() => import('./templates/landing/Startup/StartupLanding'));

type ViewMode = 'ownTemplate' | 'myTemplates' | 'gallery' | 'editor';

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
  { id: 'coffeeShop', title: 'Coffee Shop', description: 'Diseño acogedor para cafeterías.', icon: '☕', gradient: 'from-amber-600 to-amber-700', color: 'amber', category: ['landing', 'ecommerce'], tags: ['café', 'desayunos'], featured: true, popular: true, images: templateImages.coffeeShop },
];

const categories = [
  { id: 'todos', label: 'Todos', icon: (props: any) => <Grid3X3 {...props} /> },
  { id: 'landing', label: 'Landing Pages', icon: (props: any) => <LayoutGrid {...props} /> },
  { id: 'ecommerce', label: 'E-commerce', icon: (props: any) => <Sparkles {...props} /> },
  { id: 'enterprise', label: 'Enterprise', icon: (props: any) => <Star {...props} /> },
  { id: 'custom', label: 'Custom', icon: (props: any) => <Heart {...props} /> }
];

// Componente auxiliar para inicializar el contexto en modo preview
const PreviewWrapper = ({ templateData, children }: { templateData: any; children: React.ReactNode }) => {
  const { setTemplate } = useTemplate();
  const initialized = useRef(false);

  useEffect(() => {
    if (templateData && !initialized.current) {
      setTemplate(templateData);
      initialized.current = true;
    }
  }, [templateData, setTemplate]);

  return <>{children}</>;
};

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isLoading, getLoadingMessage, tokenFromUrl } = useAuthHandler();
  const { userTemplate, userTemplatesList, loading: loadingTemplates, loadTemplateForEdit } = useUserTemplates(isAuthenticated, user);
  const [searchParams] = useSearchParams();

  const hasProcessedUrlParams = useRef(false);
  const previewModeFromUrl = useRef(searchParams.get('preview') === 'true');
  const templateIdFromUrl = useRef(searchParams.get('templateId'));
  const viewFromUrl = searchParams.get('view');

  const [viewMode, setViewMode] = useState<ViewMode>('ownTemplate');
  const [selectedTemplateForEdit, setSelectedTemplateForEdit] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteTemplates');
    return saved ? JSON.parse(saved) : [];
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);

  // ✅ Procesar parámetros de URL solo una vez, usando useRef para persistir valores
  useEffect(() => {
    const processUrlParams = async () => {
      if (hasProcessedUrlParams.current) return;

      const templateId = templateIdFromUrl.current;
      const isPreview = previewModeFromUrl.current;

      if (templateId && isAuthenticated) {
        hasProcessedUrlParams.current = true;
        setIsLoadingTemplate(true);
        console.log('📝 Cargando template desde URL:', templateId);
        if (isPreview) setIsPreviewMode(true);
        const templateData = await loadTemplateForEdit(templateId);
        if (templateData) {
          setSelectedTemplateForEdit(templateData);
          setViewMode('editor');
        }
        setIsLoadingTemplate(false);
        // IMPORTANTE: No limpiar la URL aquí porque la vista previa necesita los parámetros.
        // window.history.replaceState({}, document.title, window.location.pathname);
      } else if (viewFromUrl === 'my-templates') {
        hasProcessedUrlParams.current = true;
        setViewMode('myTemplates');
      } else if (!loadingTemplates && !userTemplate && viewMode === 'ownTemplate') {
        setViewMode('gallery');
      }
    };

    processUrlParams();
  }, [isAuthenticated, loadingTemplates, userTemplate, viewMode, loadTemplateForEdit, viewFromUrl]);

  // ✅ Mantener isPreviewMode true si estamos en modo preview (evita que cambie por re-renders)
  useEffect(() => {
    if (previewModeFromUrl.current && !isPreviewMode) {
      setIsPreviewMode(true);
    }
  }, [isPreviewMode]);

  // ✅ Escuchar evento de template guardado
  useEffect(() => {
    const handleTemplateSaved = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { template, success } = customEvent.detail;
      if (success && template && viewMode === 'editor' && selectedTemplateForEdit) {
        setSelectedTemplateForEdit((prev: any) => ({
          ...prev,
          id: template.id,
          updatedAt: new Date()
        }));
      }
    };
    window.addEventListener('template-saved', handleTemplateSaved);
    return () => window.removeEventListener('template-saved', handleTemplateSaved);
  }, [viewMode, selectedTemplateForEdit]);

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
    setViewMode('ownTemplate');
    setIsPreviewMode(false);
  };

  const handleEditTemplate = async (templateId: string) => {
    const templateData = await loadTemplateForEdit(templateId);
    if (templateData) {
      setSelectedTemplateForEdit(templateData);
      setViewMode('editor');
    }
  };

  const handleBackToMyTemplates = () => setViewMode('myTemplates');
  const handleExploreGallery = () => setViewMode('gallery');

  if (isLoading || loadingTemplates || isLoadingTemplate || (tokenFromUrl && !isAuthenticated)) {
    return <LoadingScreen message={isLoadingTemplate ? "Cargando template..." : getLoadingMessage()} />;
  }

  if (!isAuthenticated) return null;

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

    // ✅ Modo preview: inicializar el contexto con los datos cargados
    if (isPreviewMode) {
      return (
        <TemplateProvider>
          <TemplateEditorProvider>
            <PreviewWrapper templateData={selectedTemplateForEdit}>
              <Suspense fallback={<LoadingScreen message="Cargando previsualización..." />}>
                <TemplateComponent onHomeClick={() => { }} isPreview={true} />
              </Suspense>
            </PreviewWrapper>
          </TemplateEditorProvider>
        </TemplateProvider>
      );
    }

    return (
      <EditorLayout
        templateData={selectedTemplateForEdit}
        onClose={handleBackToOwn}
        isPreview={false}
      >
        <Suspense fallback={<LoadingScreen message="Cargando template..." />}>
          <TemplateComponent onHomeClick={handleBackToOwn} />
        </Suspense>
      </EditorLayout>
    );
  }

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
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}