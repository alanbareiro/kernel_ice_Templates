// src/hooks/useTutorial.ts
import { useEffect, useState } from 'react';

interface TutorialStep {
    id: string;
    title: string;
    description: string;
    targetElement: string;
    position: 'top' | 'bottom' | 'left' | 'right';
    showSkip?: boolean;
}

export const tutorialSteps: TutorialStep[] = [
    {
        id: 'welcome',
        title: '🎨 ¡Bienvenido al Editor de Templates!',
        description: 'Aquí puedes personalizar completamente el diseño de tu sitio web. Cambia colores, edita textos y mucho más.',
        targetElement: 'editor-sidebar',
        position: 'right',
        showSkip: true
    },
    {
        id: 'edit-mode',
        title: '✏️ Modo Edición',
        description: 'Activa el modo edición haciendo clic en el botón "Activar modo edición". Verás que los textos se vuelven editables con doble clic.',
        targetElement: 'edit-mode-button',
        position: 'right',
        showSkip: true
    },
    {
        id: 'colors',
        title: '🎨 Paleta de Colores',
        description: 'Selecciona un color para personalizar cada elemento de tu sitio. Los cambios se ven en tiempo real.',
        targetElement: 'colors-tab',
        position: 'right',
        showSkip: true
    },
    {
        id: 'presets',
        title: '✨ Presets de Colores',
        description: 'Prueba combinaciones de colores predefinidas con un solo clic. ¡Encuentra la combinación perfecta!',
        targetElement: 'presets-section',
        position: 'right',
        showSkip: true
    },
    {
        id: 'text-editing',
        title: '📝 Editar Textos',
        description: 'Hacé doble clic en cualquier texto de la página para editarlo. Podés cambiar títulos, descripciones y más.',
        targetElement: 'texts-tab',
        position: 'right',
        showSkip: true
    },
    {
        id: 'save',
        title: '💾 Guardar Cambios',
        description: 'No olvides guardar tus cambios. El botón "Guardar cambios" se ilumina cuando hay modificaciones pendientes.',
        targetElement: 'save-button',
        position: 'right',
        showSkip: true
    },
    {
        id: 'undo-redo',
        title: '↩️ Deshacer / Rehacer',
        description: 'Si te equivocaste, podés deshacer o rehacer tus últimos cambios con estos botones.',
        targetElement: 'undo-redo-buttons',
        position: 'right',
        showSkip: true
    },
    {
        id: 'finish',
        title: '🏁 Finalizar Edición',
        description: 'Cuando termines, hacé clic en "Finalizar edición". Se guardarán automáticamente todos los cambios.',
        targetElement: 'finish-button',
        position: 'right',
        showSkip: false
    }
];

const TUTORIAL_KEY = 'kernelize_tutorial_completed';
const TUTORIAL_SKIPPED_KEY = 'kernelize_tutorial_skipped';

export const useTutorial = () => {
    const [showTutorial, setShowTutorial] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [hasCompleted, setHasCompleted] = useState(true);
    const [hasSkipped, setHasSkipped] = useState(false);

    useEffect(() => {
        const completed = localStorage.getItem(TUTORIAL_KEY) === 'true';
        const skipped = localStorage.getItem(TUTORIAL_SKIPPED_KEY) === 'true';
        setHasCompleted(completed);
        setHasSkipped(skipped);

        // Mostrar tutorial si no está completado ni saltado
        if (!completed && !skipped) {
            setShowTutorial(true);
        }
    }, []);

    const startTutorial = () => {
        setShowTutorial(true);
        setCurrentStep(0);
        localStorage.removeItem(TUTORIAL_KEY);
        localStorage.removeItem(TUTORIAL_SKIPPED_KEY);
        setHasCompleted(false);
        setHasSkipped(false);
    };

    const nextStep = () => {
        if (currentStep < tutorialSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            completeTutorial();
        }
    };

    const previousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const completeTutorial = () => {
        localStorage.setItem(TUTORIAL_KEY, 'true');
        setShowTutorial(false);
        setHasCompleted(true);
    };

    const skipTutorial = () => {
        localStorage.setItem(TUTORIAL_SKIPPED_KEY, 'true');
        setShowTutorial(false);
        setHasSkipped(true);
    };

    const resetTutorial = () => {
        localStorage.removeItem(TUTORIAL_KEY);
        localStorage.removeItem(TUTORIAL_SKIPPED_KEY);
        setShowTutorial(true);
        setCurrentStep(0);
        setHasCompleted(false);
        setHasSkipped(false);
    };

    return {
        showTutorial,
        currentStep,
        currentStepData: tutorialSteps[currentStep],
        hasCompleted,
        hasSkipped,
        startTutorial,
        nextStep,
        previousStep,
        completeTutorial,
        skipTutorial,
        resetTutorial,
        totalSteps: tutorialSteps.length
    };
};