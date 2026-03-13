import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

const clientPort = Number(process.env.CLIENT_PORT || 5173);
const serverPort = Number(process.env.SERVER_PORT || 3001);

export default defineConfig({
  plugins: [svelte()],
  server: {
    port: clientPort,
    proxy: {
      "/api": {
        target: `http://localhost:${serverPort}`,
        changeOrigin: true
      }
    }
  }
});
