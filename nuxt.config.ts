import { defineNuxtConfig } from "nuxt/config";
import { version as nuxtVersion } from 'nuxt/package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: "./amplify",
    framework: {
      name: 'nuxt',
      version: nuxtVersion
    }
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"]
});
