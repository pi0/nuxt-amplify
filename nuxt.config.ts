import { defineNuxtConfig } from "nuxt/config";
import { version as nuxtVersion } from 'nuxt/package.json'
import { provider } from 'std-env'
import { AWSAmplifyCustomConfig } from "./amplify/types";

declare module 'nitropack' {
  interface NitroConfig {
    awsAmplify?: AWSAmplifyCustomConfig
  }
}

console.log('^^^^^^^^^^^^ Provider Info', {
  provider,
  AWS_APP_ID: process.env.AWS_APP_ID,
  CODEBUILD_BUILD_ARN: process.env.CODEBUILD_BUILD_ARN
})

export default defineNuxtConfig({
  nitro: {
    // preset: provider === 'aws_amplify' ? "./amplify" : undefined,
    preset:  "./amplify",
    awsAmplify: {
      imageOptimization: {
        path: "/_nuxt/image",
        cacheControl: "public, max-age=1, immutable"
      },
      imageSettings: {
          sizes: [100, 200],
          domains: [],
          remotePatterns: [{
            protocol: "https",
            hostname: "images.unsplash.com",
            port: "443",
            pathname: ""
          }],
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
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"]
});
