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