# Nuxt + Amplify

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Amplify Preset

Project is configured to use (local) Amplify Nitro preset.

Preset defenition is in [`amplify/nitro.config.ts`](./amplify/nitro.config.ts) (Also checkout [types](./amplify/types.ts) and [server entry](./amplify/entry.ts)).

When building project with `pnpm run build`, the `.amplify/` directory will be created.

## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm run dev
```

## Production

Build the application for production:

```bash
# pnpm
pnpm run build
```

Locally preview production build:

```bash
# pnpm
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
