import { fileURLToPath } from "node:url";
import type { Nitro, NitroPreset } from "nitropack";
import { resolve } from "node:path";
import { writeFile } from "node:fs/promises";
import { AmplifyComputeConfig, AmplifyDeployManifest, AmplifyRouteTarget } from "./types";

export default <NitroPreset>{
  extends: "node-server",
  entry: fileURLToPath(new URL("entry.ts", import.meta.url)),
  output: {
    dir: "{{ rootDir }}/.amplify",
    serverDir: "{{ output.dir }}/compute/default",
    publicDir: "{{ output.dir }}/static",
  },
  commands: {
    preview: "node ./compute/default/server.js",
  },
  hooks: {
    async compiled(nitro) {
      await writeAmplifyFiles(nitro);
    },
  },
};

async function writeAmplifyFiles(nitro: Nitro) {
  const outDir = nitro.options.output.dir

  // Write deploy-manifest.json
  const computeTarget = { type: "Compute", src: "default" } as AmplifyRouteTarget
  const deployManifest: AmplifyDeployManifest = {
    version: 1,
    routes: [
      ...nitro.options.publicAssets.map(asset => ({
        path: `${(asset.baseURL || "").replace(/\/$/, '')}/*`,
        target: {
          // maxAge: asset.maxAge, // TODO: Not supported
          type: "Static" as const
        },
        fallback: asset.fallthrough? computeTarget : undefined
      })),
      {
        path: "/*",
        target: computeTarget,
      }
    ],
    imageSettings: undefined,
  };
  await writeFile(
    resolve(outDir, "deploy-manifest.json"),
    JSON.stringify(deployManifest, null, 2)
  );

  // Write server.js (CJS)
  await writeFile(
    resolve(outDir, "compute/default/server.js"),
    `import("./index.mjs")`
  );

  // Write .amplify-config.json
  const computeConfig: AmplifyComputeConfig = {
    entrypoint: "server.js",
    runtime: "nodejs18.x",
  };
  await writeFile(
    resolve(outDir, "compute/default/.amplify-config.json"),
    JSON.stringify(computeConfig, null, 2)
  );
}
