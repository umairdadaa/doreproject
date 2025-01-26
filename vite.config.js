import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glsl()],
  resolve: {
    alias: {
      "@": "/src", // Map `@` to the `src` directory
    },
  },
  build: {
    emptyOutDir: false, // Prevent deleting pre-existing assets in the output directory
    minify: 'esbuild', // Faster than 'terser'
    target: 'esnext',  // Use the latest JS syntax
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'; // Extract vendor dependencies
          }
        },
      },
    },
  },
  chunkSizeWarningLimit: 2000,
  cacheDir: './.vite', 
});
