// src/components/layout/Header.tsx (versión simplificada)
import { Home, LogOut, Package, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolutionsOpen, /*setIsSolutionsOpen*/] = useState(false);
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
        <div className="container-custom px-4 py-1">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
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

           
            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">

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
             
              <button
                className="p-2 rounded-lg bg-gradient-to-r from-primary-500/10 to-accent-500/10 hover:from-primary-500/20 hover:to-accent-500/20 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {/* {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />} */}
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