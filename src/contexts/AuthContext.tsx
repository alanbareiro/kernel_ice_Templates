// src/contexts/AuthContext.tsx - VERSIÓN CORREGIDA
import React, { createContext, useContext, useState, useEffect,  } from 'react';
import type {ReactNode} from 'react'
import * as authService from '../services/api/auth.service'; // Cambié la importación
import type {
  User,
  LoginCredentials,
  AuthResponse,
  Order,
  RegisterData
} from '../services/api/auth.service' // Cambié la importación

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (userData: RegisterData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<User>;
  getUserOrders: () => Promise<Order[]>;
  clearError: () => void;
  refreshUser: () => Promise<void>; // Nueva función para refrescar usuario
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
  const [isLoading, setIsLoading] = useState(true); // Iniciar como true
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
            await authService.refreshToken();
          } catch (refreshError) {
            console.log('Token expirado, limpiando datos');
            // Limpiar datos expirados
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
        // Limpiar datos inválidos
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

  // Función para refrescar datos del usuario
  const refreshUser = async () => {
    try {
      const profile = await authService.getProfile();
      setUser(profile);
      localStorage.setItem('user', JSON.stringify(profile));
    } catch (error) {
      console.error('Error refrescando usuario:', error);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);

      // Guardar datos
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

      // Si el registro incluye login automático
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
      // Siempre limpiar estado local
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