import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://bfipa.github.io',
  base: '/episteme',
  integrations: [react(), mdx()],
  output: 'static',
  build: {
    assets: '_assets'
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
