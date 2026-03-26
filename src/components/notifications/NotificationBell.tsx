// src/components/notifications/NotificationBell.tsx
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNotifications } from '../../services/api/notification.service';
import { Bell, CheckCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Configuración
const LEADING_PAGE = import.meta.env.LEADING_PAGE || 'http://localhost:5173';

const NotificationBell = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { notifications, unreadCount, loadNotifications, markAsRead, markAllAsRead } = useNotifications();
    // const navigate = useNavigate();
    useEffect(() => {
        loadNotifications();

        // Actualizar cada 30 segundos
        const interval = setInterval(() => loadNotifications(), 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'ORDER_UPDATE': return '🔄';
            case 'PAYMENT': return '💰';
            case 'PAYMENT_REMINDER': return '⏰';
            case 'REVIEW_REQUEST': return '👁️';
            case 'SYSTEM': return '⚙️';
            default: return '📢';
        }
    };

    const handleNotificationClick = async (notification: any) => {
        if (!notification.read) {
            await markAsRead(notification.id);
        }
        if (notification.data?.orderId) {
            // navigate(`${LEADING_PAGE}/order/${notification.data.orderId}`)
            window.location.href = `${LEADING_PAGE}/order/${notification.data.orderId}`;
        }
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-800 z-50">
                    <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Notificaciones</h3>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                                >
                                    Marcar todas como leídas
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
                                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No tienes notificaciones</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                {notifications.slice(0, 5).map((notification) => (
                                    <div
                                        key={notification.id}
                                        onClick={() => handleNotificationClick(notification)}
                                        className={`p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                                            }`}
                                    >
                                        <div className="flex gap-3">
                                            <div className="text-lg">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start gap-2">
                                                    <h4 className="font-medium text-sm line-clamp-1">
                                                        {notification.title}
                                                    </h4>
                                                    {!notification.read && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                markAsRead(notification.id);
                                                            }}
                                                            className="text-xs text-neutral-500 hover:text-primary-600 shrink-0"
                                                        >
                                                            <CheckCircle className="w-3 h-3" />
                                                        </button>
                                                    )}
                                                </div>
                                                <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 mt-0.5">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-neutral-500 mt-1.5">
                                                    {formatDistanceToNow(new Date(notification.createdAt), {
                                                        addSuffix: true,
                                                        locale: es
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-3 border-t border-neutral-200 dark:border-neutral-800">
                        <Link
                            to={`${LEADING_PAGE}/dashboard?tab=notificaciones`}
                            className="block text-center text-sm text-primary-600 dark:text-primary-400 hover:underline"
                            onClick={() => setIsOpen(false)}
                        >
                            Ver todas las notificaciones
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;