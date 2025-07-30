import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-redux'],
    include: ['react-hot-toast'],
    include:['lucide-react'],
    include:['react-router-dom']
  }
});
