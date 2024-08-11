import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Simple-To-Do-App/',
  plugins: [react()],
});