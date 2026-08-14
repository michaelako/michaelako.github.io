// @ts-check
import { defineConfig } from 'astro/config';

// michaelako.github.io is a GitHub *user* site, so it is served from the domain
// root — no `base` path is needed.
export default defineConfig({
  site: 'https://michaelako.github.io',
});
