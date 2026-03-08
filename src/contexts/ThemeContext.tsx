import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: 'light' | 'dark';
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        // Recuperar tema del localStorage o usar 'system'
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('theme') as Theme) || 'system';
        }
        return 'system';
    });

    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

    // Determinar tema basado en preferencia del sistema
    useEffect(() => {
        const root = window.document.documentElement;

        const updateTheme = () => {
            let resolved: 'light' | 'dark';

            if (theme === 'system') {
                resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            } else {
                resolved = theme;
            }

            setResolvedTheme(resolved);

            // Aplicar clases a root
            root.classList.remove('light', 'dark');
            root.classList.add(resolved);

            // Guardar en localStorage
            if (theme !== 'system') {
                localStorage.setItem('theme', theme);
            } else {
                localStorage.removeItem('theme');
            }
        };

        updateTheme();

        // Escuchar cambios en preferencia del sistema
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                updateTheme();
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    const toggleTheme = () => {
        setThemeState(current => {
            if (current === 'light') return 'dark';
            if (current === 'dark') return 'system';
            return 'light';
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};