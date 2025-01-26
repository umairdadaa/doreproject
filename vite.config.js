import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  plugins: [react(), glsl()],
  resolve: {
    alias: {
      "@": "/src", // Map `@` to the `src` directory
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Example to create separate chunk for large dependencies
          if (id.includes('node_modules')) {
            return 'vendor'; // All node_modules go into a "vendor" chunk
          }
        },
      },
    },
    chunkSizeWarningLimit: 2000, // Adjust the chunk size limit to 1000 kB (or higher)
  },
});
