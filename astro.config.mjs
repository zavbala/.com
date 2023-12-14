import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: vercel(),
  site: 'https://zavbala.com',
  integrations: [tailwind(), react(), sitemap(), svelte(), mdx()],
});
