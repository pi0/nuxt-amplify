import { defineNuxtConfig } from "nuxt/config";
import { version as nuxtVersion } from 'nuxt/package.json'
import { AWSAmplifyCustomConfig } from "./amplify/types";

declare module 'nitropack' {
  interface NitroConfig {
    awsAmplify?: AWSAmplifyCustomConfig
  }
}

export default defineNuxtConfig({
  app: {
    // baseURL: '/base'
  },
  nitro: {
    // preset: provider === 'aws_amplify' ? "./amplify" : undefined,
    preset:  "./amplify",
    awsAmplify: {
      imageOptimization: {
        path: "/_nuxt/image",
        cacheControl: "public, max-age=3600, immutable"
      },
      imageSettings: {
          sizes: [100, 200,300,500,640],
          domains: [],
          remotePatterns: [],
          formats: ["image/jpeg", "image/png", "image/webp", "image/avif"],
          minimumCacheTTL: 60,
          dangerouslyAllowSVG: false
      },
    },
    framework: {
      name: 'nuxt',
      version: nuxtVersion
    }
  },
  image: {
    provider: 'amplify',
    providers: {
      amplify: {
        provider: '~/amplify/image-provider.ts',
      }
    }
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"]
});
