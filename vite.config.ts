import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // ELIMINA las líneas de css.postcss y optimizeDeps
  // Vite detecta automáticamente postcss.config.js
});