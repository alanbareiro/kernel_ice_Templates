import { useEffect, useState } from 'react';
import { useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom'; // Importar Routes y Route
import { useAuth } from './contexts/AuthContext';
import './index.css';
import BaseLayout from './layouts/BaseLayout';
// Importamos los templates
import AccountingLanding from './templates/Accounting/AccountingLanding';
import CateringLanding from './templates/Catering/CateringLanding';
import ConsultingLanding from './templates/Consulting/ConsultingLanding';
import RestaurantLanding from './templates/Restaurant/RestaurantLanding';
import LoginPage from './pages/LoginPage'; // Asegúrate de tener esta página

type TemplateType = 'home' | 'consulting' | 'catering' | 'accounting' | 'restaurant';

// Componente principal con navegación
function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [currentTemplate, setCurrentTemplate] = useState<TemplateType>('home');

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

  // Renderizar según el template seleccionado
  if (currentTemplate !== 'home') {
    // Para los templates, necesitamos pasar handleHomeClick
    switch (currentTemplate) {
      case 'consulting':
        return <ConsultingLanding onHomeClick={handleHomeClick} />;
      case 'catering':
        return <CateringLanding onHomeClick={handleHomeClick} />;
      case 'accounting':
        return <AccountingLanding onHomeClick={handleHomeClick} />;
      case 'restaurant':
        return <RestaurantLanding onHomeClick={handleHomeClick} />;
      default:
        return null;
    }
  }

  // Página de inicio con templates
  return (
    <BaseLayout>
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
        {/* Header con info de usuario */}
        <div className="absolute top-4 right-4 z-50">
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-3 bg-white dark:bg-neutral-800 px-4 py-2 rounded-full shadow-lg border border-neutral-200 dark:border-neutral-700">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              >
                Salir
              </button>
            </div>
          ) :
          <></>
          //  (
          //   <button
          //     onClick={handleLoginClick}
          //     className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
          //   >
          //     Iniciar sesión
          //   </button>
          // )
          }
        </div>

        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Kernelize Templates
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Selecciona un template para personalizarlo a tu medida
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Cards de templates */}
          <TemplateCard
            title="Consultoría"
            description="Diseño elegante y profesional para servicios de consultoría."
            icon="📊"
            gradient="from-blue-900 to-slate-700"
            hoverColor="blue"
            onClick={() => handleTemplateSelect('consulting')}
          />
          <TemplateCard
            title="Catering"
            description="Estilo vibrante y acogedor para servicios gastronómicos."
            icon="🍽️"
            gradient="from-amber-600 to-orange-500"
            hoverColor="amber"
            onClick={() => handleTemplateSelect('catering')}
          />
          <TemplateCard
            title="Contaduría"
            description="Diseño formal y de confianza para estudios contables."
            icon="🧾"
            gradient="from-emerald-900 to-emerald-700"
            hoverColor="emerald"
            onClick={() => handleTemplateSelect('accounting')}
          />
          <TemplateCard
            title="Restaurant"
            description="Diseño cálido y apetitoso para restaurantes."
            icon="🍝"
            gradient="from-red-600 to-red-800"
            hoverColor="red"
            onClick={() => handleTemplateSelect('restaurant')}
          />
        </div>
      </div>
    </BaseLayout>
  );
}

// App principal con routing
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

// TemplateCard component
interface TemplateCardProps {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  hoverColor: string;
  onClick: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  title,
  description,
  icon,
  gradient,
  hoverColor,
  onClick
}) => {
  const hoverBorderColor = {
    blue: 'hover:border-blue-600',
    amber: 'hover:border-amber-600',
    emerald: 'hover:border-emerald-600',
    red: 'hover:border-red-600'
  }[hoverColor];

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent ${hoverBorderColor}`}
    >
      <div className={`h-48 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <span className="text-6xl transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">
          {title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default App;