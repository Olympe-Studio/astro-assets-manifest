# Astro Assets Manifest

Allows your Astro project to automatically generate a manifest of your assets.

## Installation

Like any other Astro integration, you can install it using your preferred package manager:

```bash
# using Astro
npx astro add astro-assets-manifest

# Or manually
bun install astro-assets-manifest
# or
npm install astro-assets-manifest
# or
yarn add astro-assets-manifest
# or
pnpm add astro-assets-manifest
```

Next configure your Astro project to use the manifest:

```ts
import { defineConfig } from 'astro/config';
import assetsManifest from 'astro-assets-manifest';

export default defineConfig({
  integrations: [assetsManifest({
    // Path to the output file relative to the build directory
    outPath: './',
    // Name of the output file
    fileName: 'assets-manifest.json',
  })],
});
```
