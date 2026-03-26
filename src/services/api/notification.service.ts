// src/services/api/notification.service.ts
import { useState } from 'react';
import { get, patch, post } from './index';

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  data?: any;
  createdAt: string;
}

/**
 * Obtiene las notificaciones del usuario autenticado
 */
export const getNotifications = async (options?: {
  limit?: number;
  offset?: number;
  unreadOnly?: boolean;
}): Promise<{
  success: boolean;
  notifications: Notification[];
  total: number;
  unreadCount: number;
}> => {
  const params = new URLSearchParams();
  if (options?.limit) params.append('limit', options.limit.toString());
  if (options?.offset) params.append('offset', options.offset.toString());
  if (options?.unreadOnly) params.append('unreadOnly', 'true');

  const url = `/notifications${params.toString() ? `?${params.toString()}` : ''}`;
  // const response =
  return await get(url);
  // return response;
};

/**
 * Marca una notificación como leída
 */
export const markNotificationAsRead = async (notificationId: string): Promise<{
  success: boolean;
  message: string;
}> => {
  return await patch(`/notifications/${notificationId}/read`, {});
};

/**
 * Marca todas las notificaciones como leídas
 */
export const markAllNotificationsAsRead = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  return await post('/notifications/read-all', {});
};

/**
 * Hook personalizado para usar notificaciones en React
 */
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadNotifications = async (unreadOnly = false) => {
    setLoading(true);
    try {
      const data = await getNotifications({ unreadOnly });
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error('Error cargando notificaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marcando notificación como leída:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marcando todas como leídas:', error);
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    loadNotifications,
    markAsRead,
    markAllAsRead
  };
};