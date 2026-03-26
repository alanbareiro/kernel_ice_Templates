// src/components/Editor/TutorialOverlay.tsx
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface TutorialOverlayProps {
    targetElementId: string;
    step: number;
    onNext: () => void;
    onPrevious: () => void;
    onSkip: () => void;
    onClose: () => void;
    title: string;
    description: string;
    position: 'top' | 'bottom' | 'left' | 'right';
    showSkip?: boolean;
    totalSteps: number;
    currentStep: number;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
    targetElementId,
    step,
    onNext,
    onPrevious,
    onSkip,
    onClose,
    title,
    description,
    position,
    showSkip = true,
    totalSteps,
    currentStep
}) => {
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    useEffect(() => {
        const target = document.getElementById(targetElementId);
        if (target) {
            setTargetRect(target.getBoundingClientRect());
        }
    }, [targetElementId, step]);

    const getPositionStyle = (): React.CSSProperties => {
        if (!targetRect) return { display: 'none' };

        const baseStyle: React.CSSProperties = {
            position: 'fixed',
            zIndex: 1000,
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            padding: '10px',
            maxWidth: '320px',
            border: '2px solid #3b82f6'
        };

        switch (position) {
            case 'right':
                return {
                    ...baseStyle,
                    left: targetRect.right + 16,
                    top: targetRect.top + (targetRect.height / 2) - 140
                };
            case 'left':
                return {
                    ...baseStyle,
                    right: window.innerWidth - targetRect.left + 16,
                    top: targetRect.top + (targetRect.height / 2) - 60
                };
            case 'top':
                return {
                    ...baseStyle,
                    left: targetRect.left + (targetRect.width / 2) - 150,
                    bottom: window.innerHeight - targetRect.top + 16
                };
            case 'bottom':
                return {
                    ...baseStyle,
                    left: targetRect.left + (targetRect.width / 2) - 150,
                    top: targetRect.bottom + 16
                };
            default:
                return baseStyle;
        }
    };

    // Crear overlay para resaltar el elemento
    useEffect(() => {
        if (targetRect) {
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = `${targetRect.top - 4}px`;
            overlay.style.left = `${targetRect.left - 4}px`;
            overlay.style.width = `${targetRect.width + 8}px`;
            overlay.style.height = `${targetRect.height + 8}px`;
            overlay.style.borderRadius = '12px';
            overlay.style.border = '3px solid #3b82f6';
            overlay.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
            overlay.style.zIndex = '999';
            overlay.style.pointerEvents = 'none';
            overlay.id = 'tutorial-highlight';

            document.body.appendChild(overlay);

            return () => {
                const existing = document.getElementById('tutorial-highlight');
                if (existing) existing.remove();
            };
        }
    }, [targetRect]);

    return (
        <>
            {/* Fondo semi-transparente */}
            <div className="fixed inset-0 bg-black/50 z-[998]" onClick={onClose} />

            {/* Tarjeta del tutorial */}
            <div style={getPositionStyle()} className="animate-fadeIn">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                            Paso {currentStep + 1}/{totalSteps}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>

                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <button
                            onClick={onPrevious}
                            disabled={currentStep === 0}
                            className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onNext}
                            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors flex items-center gap-1"
                        >
                            {currentStep === totalSteps - 1 ? 'Finalizar' : 'Siguiente'}
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {showSkip && (
                        <button
                            onClick={onSkip}
                            className="text-xs text-gray-500 hover:text-gray-700"
                        >
                            Omitir tutorial
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default TutorialOverlay;