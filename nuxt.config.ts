import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: "./amplify",
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"]
});