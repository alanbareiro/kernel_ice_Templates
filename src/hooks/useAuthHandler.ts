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