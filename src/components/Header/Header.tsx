// src/components/layout/Header.tsx (versión simplificada)
import { Globe, Home, LogOut, Package, Palette, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/kernel.logo.png';
import { useAuth } from '../../contexts/AuthContext';
// import './HeaderAnimations.css';
import ThemeToggle from '../../Theme/ThemeToogle';
// import NotificationBell from '../notifications/NotificationBell';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    //TODO -> SE COLOCA PARA QUENO  FALLE BUILD
   console.log(isSolutionsOpen);
   console.log(isUserMenuOpen);
   
   
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cerrar menús al abrir otros
  useEffect(() => {
    if (isMenuOpen) {
      setIsSolutionsOpen(false);
      setIsUserMenuOpen(false);
    }
  }, [isMenuOpen]);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const solutions = [
    {
      icon: <Globe className="w-5 h-5" />,
      title: 'Nuestras Soluciones',
      description: 'Landing Pages, E-commerce, Sistemas Personalizados y más',
      href: '/soluciones',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: <Package className="w-5 h-5" />,
      title: 'Pack All-In-One',
      description: 'Todo incluido en un solo servicio',
      href: '/pack-all-in-one',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: 'Templates',
      description: '5+ diseños premium listos para usar',
      href: '/templates',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },

  ];

  const userMenuItems = [
    {
      icon: <User className="w-4 h-4" />,
      label: 'Mi Panel',
      href: '/mi-cuenta',
      description: 'Ver proyectos y actividad',
    },
    {
      icon: <Package className="w-4 h-4" />,
      label: 'Estado Pedido',
      href: '/estado-pedido',
      description: 'Seguimiento en tiempo real',
    },
  ];

  const mainNavItems = [
    { label: 'Inicio', href: '/', icon: <Home className="w-4 h-4" /> },
    { label: 'Precios', href: '/precios' },
    { label: 'Demo', href: '/demo' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-800/50">
        <div className="container-custom px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 hover-lift transition-smooth group"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <img
                  src={Logo}
                  alt="Kernel-Ice Logo"
                  className="h-16 w-16"
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  Kernel<span className="text-accent-500">Ice</span>
                </span>
                <p className="text-xs text-neutral-500 dark:text-gradient">Renovación Digital</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {/* {mainNavItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-medium text-sm"
                >
                  {item.icon && <span className="text-primary-500">{item.icon}</span>}
                  {item.label}
                </Link>
              ))} */}


              {/* Solutions Dropdown */}
              {/* <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-700 dark:text-light hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-medium text-sm"
                >
                  Soluciones
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isSolutionsOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isSolutionsOpen && (
                  <>
                    <div
                      className="fixed inset-0 backdrop-gradient backdrop-blur-sm animate-fadeIn"
                      onClick={() => setIsSolutionsOpen(false)}
                    />

                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-96 glass-effect animate-slideIn">
                      <div className="p-6 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-neutral-800 dark:to-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                        <h3 className="text-lg font-bold text-neutral-800 dark:text-white">
                          Nuestras Soluciones
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-light mt-1">
                          Todo lo que necesitas para tu presencia digital
                        </p>
                      </div>

                      <div className="p-4">
                        {solutions.map((item, index) => (
                          <Link
                            key={index}
                            to={item.href}
                            onClick={() => setIsSolutionsOpen(false)}
                            className={`flex items-start gap-4 p-2 rounded-xl transition-smooth hover-lift ${item.bgColor} mb-3 last:mb-0 group`}
                          >
                            <div className={`p-2 rounded-lg ${item.bgColor} group-hover:scale-110 transition-smooth`}>
                              <div className={item.color}>{item.icon}</div>
                            </div>
                            <div>
                              <h4 className={`font-semibold ${item.color}`}>
                                {item.title}
                              </h4>
                              <p className="text-sm text-neutral-600 dark:text-light mt-1">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div> */}
              {/* <Link
                to="/contacto"
                className="px-3 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-medium text-sm"
              >
                Contacto
              </Link> */}



              <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800 mx-1" />
              {isAuthenticated ? (<>
                {/* 🔔 CAMPANITA DE NOTIFICACIONES */}
                {/* <NotificationBell /> */}
              </>) : (<></>)
              }
              {/* User Menu o CTA */}
              <div className="relative" ref={userMenuRef}>
                {isAuthenticated ? (
                  <>

                    {/* 
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                    >
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <span className="text-white text-sm font-medium">
                            {user?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-neutral-900"></div>
                      </div>
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-56 glass-effect rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 animate-slideIn">
                        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                              <span className="text-white font-medium">
                                {user?.name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-sm truncate">{user?.name}</p>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                                {user?.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-2">
                          {userMenuItems.map((item, index) => (
                            <Link
                              key={index}
                              to={item.href}
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                            >
                              <div className="text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                                {item.icon}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{item.label}</p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <div className="p-3 border-t border-neutral-200 dark:border-neutral-800">
                          <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 w-full px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium"
                          >
                            <LogOut className="w-4 h-4" />
                            Cerrar Sesión
                          </button>
                        </div>
                      </div>
                    )} */}
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      to="/login"
                      className="px-3 py-2 rounded-lg text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors font-medium text-sm"
                    >
                      Acceder
                    </Link>
                    {/* <Link
                      to="/precios"
                      className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg hover:from-primary-600 hover:to-accent-600 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl"
                    >
                      Comenzar
                    </Link> */}
                  </div>
                )}
              </div>

              <ThemeToggle />
            </nav>

            {/* Mobile Menu Button */}
            {/* <div className="flex items-center gap-2 md:hidden">

              {isAuthenticated ? (
                <Link
                  to="/mi-cuenta"
                  className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors relative"
                >
                  <User className="w-5 h-5" />
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full"></div>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-sm text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                >
                  Acceder
                </Link>

              )}
              <ThemeToggle />
              <button
                className="p-2 rounded-lg bg-gradient-to-r from-primary-500/10 to-accent-500/10 hover:from-primary-500/20 hover:to-accent-500/20 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div> */}
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div
                className="fixed inset-0 bg-black/20 dark:bg-black/80 backdrop-blur-md animate-fadeIn"
                onClick={() => setIsMenuOpen(false)}
              />

              <div className="fixed top-20 right-4 left-4 glass-effect rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2x2 animate-slideIn">
                {isAuthenticated && (
                  <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                        <span className="text-white font-medium text-lg">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{user?.name}</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-2">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}

                  <div className="p-3">
                    <p className="text-xs font-semibold text-gradient dark:text-gradient uppercase mb-2">
                      Soluciones
                    </p>
                    <div className="space-y-2">
                      {solutions.map((item, index) => (
                        <Link
                          key={index}
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                        >
                          <div className={`p-2 rounded-lg ${item.bgColor} text-primary-600 dark:text-primary-400`}>
                            <div className={item.color}>{item.icon}</div>
                          </div>
                          <div className={`font-medium ${item.color}`}>
                            {item.title}
                          </div>
                          <div className="text-xs text-neutral-500 dark:text-light">
                            {item.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* <Link
                    to="/contacto"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <span className="font-medium">Contacto</span>
                  </Link> */}

                  {isAuthenticated ? (
                    <>
                      <div className="p-3">
                        <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase mb-2">
                          Mi Cuenta
                        </p>
                        <div className="space-y-2">
                          {userMenuItems.map((item, index) => (
                            <Link
                              key={index}
                              to={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            >
                              {item.icon}
                              <div>
                                <p className="font-medium">{item.label}</p>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                      </button>
                    </>
                  ) : (
                    <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
                      <Link
                        to="/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full text-center py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-medium mb-2"
                      >
                        Crear Cuenta
                      </Link>
                      <p className="text-center text-sm text-neutral-500 dark:text-primary-400">
                        ¿Ya tienes cuenta?{' '}
                        <Link
                          to="/login"
                          onClick={() => setIsMenuOpen(false)}
                          className="text-primary-600 dark:text-primary-400 hover:underline"
                        >
                          Inicia sesión
                        </Link>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;