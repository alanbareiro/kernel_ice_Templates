import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, toggleTheme } = useTheme();

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Claro' },
    { value: 'dark' as const, icon: Moon, label: 'Oscuro' },
    { value: 'system' as const, icon: Monitor, label: 'Sistema' },
  ];

  return (
    <div className="relative group">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Cambiar tema"
      >
        {theme === 'light' && <Sun size={20} className="text-yellow-500" />}
        {theme === 'dark' && <Moon size={20} className="text-blue-400" />}
        {theme === 'system' && <Monitor size={20} className="text-gray-500 dark:text-gray-400" />}
      </button>

      {/* Dropdown para selección específica */}
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {themes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              theme === value ? 'text-primary-500 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle;