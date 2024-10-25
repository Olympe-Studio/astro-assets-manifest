import type { SSRComponentMetadata } from "astro";

export interface AssetResource {
  type: 'inline' | 'external';
  src?: string;
  value?: string;
  children?: string;
  stage?: string;
}

export interface ImportManifest {
  pages: {
    [pagePath: string]: {
      styles: AssetResource[];
      scripts: AssetResource[];
      component: string;
    };
  };
  componentMetadata: [string, SSRComponentMetadata][];
}
export type Config = {
  outPath?: string;
  fileName?: string;
};
