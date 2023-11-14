import { defineNuxtConfig } from "nuxt/config";
import { version as nuxtVersion } from 'nuxt/package.json'

export default defineNuxtConfig({
  nitro: {
    preset: process.env.AWS_APP_ID ? "./amplify" : undefined,
    framework: {
      name: 'nuxt',
      version: nuxtVersion
    }
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"]
});
