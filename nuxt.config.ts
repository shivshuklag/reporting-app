import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.VITE_API_BASE_URL,
    },
  },
  css: ["~/assets/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  plugins: ["~/plugins/api.js"],
});
