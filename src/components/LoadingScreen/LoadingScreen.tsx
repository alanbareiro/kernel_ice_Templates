// src/components/LoadingScreen.tsx
interface LoadingScreenProps {
    message?: string;
}

export const LoadingScreen = ({ message = 'Cargando...' }: LoadingScreenProps) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-neutral-600 dark:text-neutral-400">{message}</p>
            </div>
        </div>
    );
};