# JNSSI Overseas Website (React + Vite)

React 19 + Vite single-page website with routing via `react-router-dom`.

## Tech stack

- React 19
- Vite 8
- React Router DOM 7
- ESLint 9

## Local development

Install and run:

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

## Scripts

- `npm run dev`: start dev server
- `npm run build`: production build
- `npm run preview`: preview the build
- `npm run lint`: run ESLint

## Environment variables

This project uses Vite env vars.

- **Public (client-exposed) vars** must be prefixed with `VITE_` (example: `VITE_FORMSPREE_ENDPOINT`)
- **Secrets must NOT use `VITE_`** (because `VITE_*` values are bundled into browser JS)

If you need real admin authentication, implement it server-side (API + HttpOnly cookies) instead of storing passwords in `.env` with `VITE_*`.

## Google Search Console verification (HTML file method)

The verification file lives in `public/` so it’s served from the site root:

- `public/google23b23d1d45111c52.html`

After deploying, confirm it loads:

- `https://jnssioverseas.info/google23b23d1d45111c52.html`

Then click **Verify** in Google Search Console.

## Deploy (Vercel)

- Import the repo in Vercel
- If your Vite app root is this folder, set **Root Directory** to `my-app`
- Deploy
- Add your custom domain in **Project → Settings → Domains**

## Notes about “admin console” data

The current admin UI persists edits to the browser’s `localStorage`. That means:

- Changes do **not** update `src/data/moc_Data.json`
- Other users/devices will **not** see your edits
