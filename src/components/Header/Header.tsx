// src/components/layout/Header.tsx (versión simplificada)
import { useAuth } from '../../contexts/AuthContext';
import { Home, LogOut, Menu, Package, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import NotificationBell from '../notifications/NotificationBell';
// import './HeaderAnimations.css';

// Configuración
const API_BASE_URL = import.meta.env.LEADING_PAGE || 'http://localhost:5173';

const Header = () => {

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // setIsSolutionsOpen(false);
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
      // setIsSolutionsOpen(false);
      setIsUserMenuOpen(false);
    }
  }, [isMenuOpen]);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };



  const userMenuItems = [
    {
      icon: <User className="w-4 h-4" />,
      label: 'Mi Panel',
      href: `${API_BASE_URL}/mi-cuenta`,
      description: 'Ver proyectos y actividad',
    },
    {
      icon: <Package className="w-4 h-4" />,
      label: 'Estado Pedido',
      href: `${API_BASE_URL}/estado-pedido`,
      description: 'Seguimiento en tiempo real',
    },
  ];

  const mainNavItems = [
    { label: 'Inicio', href: `${API_BASE_URL}/`, icon: <Home className="w-4 h-4" /> },
    { label: 'Precios', href: `${API_BASE_URL}/precios` },
    { label: 'Demo', href: `${API_BASE_URL}/demo` },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-800/50">
        <div className="container-custom px-4 py-1">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to={`${API_BASE_URL}/`}
              className="flex items-center transition-transform duration-300  space-x-0 hover:scale-105"
            >
              {/* <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"> */}
              <img
                src={Logo}
                alt="KernelEyes Logo"
                className="h-20 w-auto p-0"
              />
              {/* </div> */}
              <div className="hidden sm:block">
                <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  Kernel<span className="text-accent-500">Eyes</span>
                </span>
                <p className="text-xs text-neutral-500 dark:text-gradient">Renovación Digital</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-medium text-sm"
                >
                  {item.icon && <span className="text-primary-500">{item.icon}</span>}
                  {item.label}
                </Link>
              ))}

              <Link
                to={`${API_BASE_URL}/contacto`}
                className="px-3 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-medium text-sm"
              >
                Contacto
              </Link>



              <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800 mx-1" />
              {isAuthenticated ? (<>
                {/* 🔔 CAMPANITA DE NOTIFICACIONES */}
                <NotificationBell />
              </>) : (<></>)
              }
              {/* User Menu o CTA */}
              <div className="relative" ref={userMenuRef}>
                {isAuthenticated ? (
                  <>


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
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      to={`${API_BASE_URL}/contacto`}
                      className="px-3 py-2 rounded-lg text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors font-medium text-sm"
                    >
                      Acceder
                    </Link>
                    <Link
                      to={`${API_BASE_URL}/project-setup`}
                      className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg hover:from-primary-600 hover:to-accent-600 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl"
                    >
                      Comenzar 🚀
                    </Link>
                  </div>
                )}
              </div>

              {/* <ThemeToggle /> */}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">

              {isAuthenticated ? (
                <Link
                  to={`${API_BASE_URL}/mi-cuenta`}
                  className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors relative"
                >
                  <User className="w-5 h-5" />
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full"></div>
                </Link>
              ) : (
                <Link
                  to={`${API_BASE_URL}/login`}                  className="px-3 py-1.5 text-sm text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                >
                  Acceder
                </Link>

              )}
              {/* <ThemeToggle /> */}
              <button
                className="p-2 rounded-lg bg-gradient-to-r from-primary-500/10 to-accent-500/10 hover:from-primary-500/20 hover:to-accent-500/20 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
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
                      {/* {solutions.map((item, index) => (
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
                      ))} */}
                    </div>
                  </div>

                  <Link
                    to="/contacto"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <span className="font-medium">Contacto</span>
                  </Link>

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
