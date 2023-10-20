import { defineNuxtConfig } from "nuxt/config";
import { version as nuxtVersion } from 'nuxt/package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: "./amplify",
    // @ts-expect-error https://github.com/unjs/nitro/pull/1843 > Nuxt
    framework: {
      name: 'nitro',
      version: nuxtVersion
    }
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"]
});
