import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-hot-toast', 'lucide-react', 'react-router-dom'],
  }
});
