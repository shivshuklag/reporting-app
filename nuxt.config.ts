import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: "/api",
    },
  },
  css: ["~/assets/main.css"],
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_API_BASE_URL, // Your ngrok backend URL
          changeOrigin: true,
          secure: false, // Ignore SSL issues with ngrok
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  },
  plugins: ["~/plugins/api.js"],
});
