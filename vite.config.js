import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignorar advertencias de externalización
        if (warning.code === 'MODULE_EXTERNALIZED_FOR_BROKEN_REEXPORT') {
          return;
        }
        warn(warning);
      },
      output: {
        manualChunks: (id) => {
          // React vendor
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'react-vendor';
          }
          // State vendor
          if (id.includes('node_modules/zustand')) {
            return 'state-vendor';
          }
          // UI vendor
          if (id.includes('node_modules/clsx') || id.includes('node_modules/tailwind-merge')) {
            return 'ui-vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // kB
    reportCompressedSize: false,
    sourcemap: false,
  },
  optimizeDeps: {
    include: [],
  },
});
