import { defineNuxtConfig } from "nuxt/config";
import { version as nuxtVersion } from 'nuxt/package.json'

export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"]
});
