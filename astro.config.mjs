// @ts-check
import { defineConfig } from 'astro/config';

// Served from the root of the custom domain michaelako.com (see public/CNAME),
// so no `base` path is needed. michaelako.github.io redirects here.
export default defineConfig({
  site: 'https://michaelako.com',
});
