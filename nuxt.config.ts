// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/cloudinary", "@nuxtjs/tailwindcss"],
  cloudinary: {
    cloudName: "dzffvum1n"
  }
});
