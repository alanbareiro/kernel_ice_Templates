import type { StoredTemplate, Template } from '../types/template.types';

const STORAGE_KEY = 'kernelize_template_draft';
const AUTO_SAVE_KEY = 'kernelize_auto_save';

export interface StorageOptions {
  silent?: boolean;
}

export const storageService = {
  // Guardar borrador
  saveDraft: (template: Template, options: StorageOptions = {}): boolean => {
    try {
      const storedTemplate: StoredTemplate = {
        ...template,
        createdAt: template.createdAt.toISOString(),
        updatedAt: template.updatedAt.toISOString(),
        lastSaved: new Date().toISOString()
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedTemplate));

      if (!options.silent) {
        // Disparar evento para notificaciones
        window.dispatchEvent(new CustomEvent('template-saved', {
          detail: { message: 'Borrador guardado', type: 'success' }
        }));
      }

      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);

      if (!options.silent) {
        window.dispatchEvent(new CustomEvent('template-saved', {
          detail: { message: 'Error al guardar', type: 'error' }
        }));
      }

      return false;
    }
  },

  // Cargar borrador
  loadDraft: (): Template | null => {
    try {
      const draft = localStorage.getItem(STORAGE_KEY);
      if (!draft) return null;

      const stored = JSON.parse(draft) as StoredTemplate;

      const template: Template = {
        ...stored,
        createdAt: new Date(stored.createdAt),
        updatedAt: new Date(stored.updatedAt)
      };

      return template;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return null;
    }
  },

  // Guardar versión de auto-guardado
  saveAutoSave: (template: Template): void => {
    try {
      const storedTemplate: StoredTemplate = {
        ...template,
        createdAt: template.createdAt.toISOString(),
        updatedAt: template.updatedAt.toISOString(),
      };

      localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(storedTemplate));
    } catch (error) {
      console.error('Error in auto-save:', error);
    }
  },

  // Cargar auto-guardado
  loadAutoSave: (): Template | null => {
    try {
      const autoSave = localStorage.getItem(AUTO_SAVE_KEY);
      if (!autoSave) return null;

      const stored = JSON.parse(autoSave) as StoredTemplate;

      return {
        ...stored,
        createdAt: new Date(stored.createdAt),
        updatedAt: new Date(stored.updatedAt)
      };
    } catch (error) {
      console.error('Error loading auto-save:', error);
      return null;
    }
  },

  // Limpiar todo
  clearAll: (): void => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(AUTO_SAVE_KEY);
  }
};