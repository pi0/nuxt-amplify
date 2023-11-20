import { resolve } from "node:path";
import { writeFile } from "node:fs/promises";
import { joinURL } from "ufo";
import type {
  Nitro,
} from "nitropack";

export default ({
  extends: "node-server",
  entry: "#internal/nitro/entries/aws-amplify",
  output: {
    dir: "{{ rootDir }}/.amplify-hosting",
    serverDir: "{{ output.dir }}/compute/default",
    publicDir: "{{ output.dir }}/static{{ baseURL }}",
  },
  commands: {
    preview: "node ./compute/default/server.js",
  },
  hooks: {
    async compiled(nitro) {
      await writeAmplifyFiles(nitro);
    },
  },
});

async function writeAmplifyFiles(nitro: Nitro) {
  const outDir = nitro.options.output.dir;

  // Generate routes
  const routes: any[] = [];

  let hasWildcardPublicAsset = false;

  if (nitro.options.awsAmplify?.imageOptimization) {
    const { path, cacheControl } = nitro.options.awsAmplify?.imageOptimization;
    routes.push({
      path,
      target: {
        kind: "ImageOptimization",
        cacheControl,
      },
    });
  }

  const computeTarget = nitro.options.static ? { kind: "Static" } : {
    kind: "Compute",
    src: "default",
  } as any;

  for (const publicAsset of nitro.options.publicAssets) {
    if (!publicAsset.baseURL || publicAsset.baseURL === "/") {
      hasWildcardPublicAsset = true;
      continue;
    }
    routes.push({
      path: `${publicAsset.baseURL!.replace(/\/$/, "")}/*`,
      target: {
        cacheControl:
          publicAsset.maxAge > 0
            ? `public, max-age=${publicAsset.maxAge}, immutable`
            : undefined,
        kind: "Static",
      },
      fallback: publicAsset.fallthrough ? computeTarget : undefined,
    });
  }
  if (hasWildcardPublicAsset && !nitro.options.static) {
    routes.push({
      path: "/*.*",
      target: {
        kind: "Static",
      },
      fallback: computeTarget,
    });
  }
  routes.push({
    path: "/*",
    target: computeTarget,
    fallback:
      hasWildcardPublicAsset && nitro.options.awsAmplify?.catchAllStaticFallback
        ? {
            kind: "Static",
          }
        : undefined,
  });

  // Prefix with baseURL
  for (const route of routes) {
    if (route.path !== "/*") {
      route.path = joinURL(nitro.options.baseURL, route.path);
    }
  }

  // Generate deploy-manifest.json
  const deployManifest: any = {
    version: 1,
    routes,
    imageSettings: nitro.options.awsAmplify?.imageSettings || undefined,
    computeResources: nitro.options.static ? undefined : [
      {
        name: "default",
        entrypoint: "server.js",
        runtime: "nodejs18.x",
      },
    ],
    framework: {
      name: nitro.options.framework.name || "nitro",
      version: nitro.options.framework.version || "0.0.0",
    },
  };
  await writeFile(
    resolve(outDir, "deploy-manifest.json"),
    JSON.stringify(deployManifest, null, 2)
  );

  // Write server.js (CJS)
  if (!nitro.options.static) {
    await writeFile(
      resolve(outDir, "compute/default/server.js"),
      `import("./index.mjs")`
    );
  }
}
