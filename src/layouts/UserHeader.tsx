// src/layouts/UserHeader.tsx
import Header from '../components/Header/Header';


export const UserHeader = () => {
    // const { user, isAuthenticated } = useAuth();

    return (
        <>
        <Header/>
        </>
        // <div className="fixed top-6 right-6 z-50">
        //     {isAuthenticated && user ? (
        //         <div className="flex items-center gap-3 bg-white/90 dark:bg-neutral-800/90 p-2 pl-4 rounded-full shadow-lg backdrop-blur-md border border-neutral-200 dark:border-neutral-700">
        //             <span className="text-sm font-medium dark:text-white">{user.name || user.email}</span>
        //             <button
        //                 onClick={onLogout}
        //                 className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-4 py-1.5 rounded-full hover:shadow-md transition-all"
        //             >
        //                 Salir
        //             </button>
        //         </div>
        //     ) : (
        //         <button
        //             onClick={onLogin}
        //             className="btn-primary text-sm px-5 py-2 flex items-center gap-2 shadow-lg"
        //         >
        //             <span>Iniciar sesión</span>
        //             <ArrowRight className="w-4 h-4" />
        //         </button>
        //     )}
        // </div>
    );
};