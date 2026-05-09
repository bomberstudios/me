// @ts-check
import { defineConfig, svgoOptimizer, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ale.today',
  integrations: [mdx(), sitemap(), react()],
  vite: {
    server: {
      https: {
        key: './localhost-key.pem',
        cert: './localhost.pem',
      },
    },
  },
  fonts: [{
    provider: fontProviders.google(),
    name: 'Bricolage Grotesque',
    cssVariable: '--font-heading',
    weights: ['700 800'],
    styles: ['normal'],
    subsets: ['latin'],
  }],
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
});
