# umutsain.tech

Static Next.js site for umutsain.tech. The project uses `next export` with Tailwind and React Three Fiber for the hero scene.

Live site: https://umutsain.tech

## Scripts
- `npm run dev` – start dev server
- `npm run build` – static export to `out/`
- `npm run start` – serve the production build

## Deploy (GitHub Pages)
Main branch push triggers `.github/workflows/deploy.yml`, which builds and publishes `out/` to the `gh-pages` branch. Custom domain is set via `public/CNAME` (`umutsain.tech`).
