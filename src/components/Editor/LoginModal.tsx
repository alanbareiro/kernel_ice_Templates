import React from 'react';
import { LogIn, User, X, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, message }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70]">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-md w-full shadow-2xl animate-slideDown">
                <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Iniciar sesión requerido</h3>
                        <button
                            onClick={onClose}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                
                <div className="p-6">
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-amber-600" />
                        </div>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-center mb-2">
                        ¡Necesitas una cuenta!
                    </h4>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
                        {message || 'Para guardar este template en tu cuenta necesitas iniciar sesión o registrarte.'}
                    </p>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6">
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                            💡 Si ya tienes una cuenta, inicia sesión ahora. Si no, puedes crear una gratis en menos de un minuto.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => {
                                onClose();
                                sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
                                navigate('/login');
                            }}
                            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center"
                        >
                            <LogIn className="w-4 h-4 mr-2" />
                            Iniciar sesión
                        </button>
                        <button
                            onClick={() => {
                                onClose();
                                navigate('/register');
                            }}
                            className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center"
                        >
                            <User className="w-4 h-4 mr-2" />
                            Registrarse
                        </button>
                    </div>
                    
                    <button
                        onClick={onClose}
                        className="w-full mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors text-sm"
                    >
                        Seguir editando sin guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;