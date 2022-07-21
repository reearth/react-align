import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactSvgPlugin from "vite-plugin-react-svg";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactSvgPlugin({ defaultExport: "component" }), react()],
  server: {
    port: 3001,
    open: true,
  },
});
