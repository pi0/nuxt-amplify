import { defineNuxtConfig } from "nuxt/config";
import { version as nuxtVersion } from 'nuxt/package.json'
import { provider } from 'std-env'

export default defineNuxtConfig({
  nitro: {
    preset: provider === 'aws_amplify' ? "./amplify" : undefined,
    framework: {
      name: 'nuxt',
      version: nuxtVersion
    }
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"]
});
