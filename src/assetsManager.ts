import type { AstroIntegration } from 'astro';
import type { AssetResource, ImportManifest } from './types.ts';
import type { Config } from './types.ts';
import path from 'path';
import { writeFileSync } from 'fs';

function normalizeAsset(asset: any): AssetResource {
  if ('type' in asset) {
    return asset as AssetResource;
  }

  return {
    type: 'inline',
    value: asset.children || '',
    stage: asset.stage,
  };
}

export default function createIntegration(options: Config): AstroIntegration {
  return {
    name: 'astro-assets-manifest',
    hooks: {
      'astro:build:ssr': async ({ manifest, logger }) => {
        logger.info('Building assets manifest');
        try {
          let finalManifest: ImportManifest = {
            pages: {},
            componentMetadata: [],
          };
          const { outPath = './', fileName = 'assets-manifest.json' } = options;
          const outputFile = path.join(outPath, fileName);

          manifest.routes.forEach((route) => {
            if (!route.routeData.component || !route.routeData.component.startsWith('src/pages/')) {
              return;
            }

            const routePath = route.routeData.route;
            finalManifest.pages[routePath] = {
              styles: (route.styles || []).map(normalizeAsset),
              scripts: (route.scripts || []).map(normalizeAsset),
              component: route.routeData.component,
            };
          });
          finalManifest['componentMetadata'] = manifest.componentMetadata;

          writeFileSync(outputFile, JSON.stringify(finalManifest, null, 2));
          logger.info('Assets manifest built successfully at ' + outputFile);
        } catch (error) {
          logger.error('Error building assets manifest !');
          throw error;
        }
      }
    },
  };
}