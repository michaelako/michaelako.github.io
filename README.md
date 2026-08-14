# michaelako.github.io

Personal site for Michaela Kotarba — one page, two modes. **5–9** is the
yoga/movement side (photo card stack, about, playlist); **9–5** is the
product/tech side (work card stack, writing list). Both share the hero, the
drifting cloud background, and the contact section; a header toggle swaps
`data-theme` on `<html>` and CSS does the rest.

Built with [Astro](https://astro.build) and vanilla CSS. No UI kit, no
animation library.

## Develop

```bash
npm install
npm run dev
```

| command | what it does |
| --- | --- |
| `npm run dev` | dev server at http://localhost:4321 |
| `npm run build` | static build into `dist/` |
| `npm run preview` | serve the built output |
| `npm run check` | type-check `.astro` and `.ts` files |

## Where things live

- **`src/content.ts`** — every word on the site. Edit copy here, not in components.
- **`src/styles/tokens.css`** — every color, radius, and motion value, for both
  themes. Retheming is this one file.
- **`src/styles/global.css`** — layout, the card stack, the 900px mobile
  breakpoint, reduced-motion handling.
- **`src/components/CardStack.astro`** — the expanding card row, used once per mode.
- **`src/components/CloudCanvas.astro`** — the drifting background. Intentionally
  has no mouse interaction.
- **`public/photos/`** — drop the four 5–9 photographs here (see the README there).
- **`archive/`** — the previous single-file version of the site, kept for reference.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with
`withastro/action` and publishes via `actions/deploy-pages`. The repo's Pages
source must be set to **GitHub Actions** (not a branch).
