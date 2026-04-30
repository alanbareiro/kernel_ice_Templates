import { ChevronDown, ChevronRight, Info } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface SectionAccordionProps {
    title: string;
    icon: React.ElementType;
    tooltipText: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
    scrollToId?: string; // Nuevo: ID del elemento al que hacer scroll al abrirse
}

export const SectionAccordion: React.FC<SectionAccordionProps> = ({
    title,
    icon: Icon,
    tooltipText,
    defaultOpen = false,
    children,
    scrollToId,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const prevOpenRef = useRef(defaultOpen);

    useEffect(() => {
        // Solo hacer scroll si se acaba de abrir (cambió de false a true)
        if (isOpen && !prevOpenRef.current && scrollToId) {
            const element = document.getElementById(scrollToId);
            if (element) {
                // Pequeño retraso para que el DOM se actualice
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
        prevOpenRef.current = isOpen;
    }, [isOpen, scrollToId]);

    return (
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg mb-3 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary-500" />
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">{title}</span>
                    <span className="inline-flex cursor-help" title={tooltipText}>
                        <Info className="w-3.5 h-3.5 text-neutral-400 hover:text-primary-500 transition-colors" />
                    </span>
                </div>
                {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                ) : (
                    <ChevronRight className="w-4 h-4 text-neutral-500" />
                )}
            </button>
            {isOpen && <div className="p-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700">{children}</div>}
        </div>
    );
};