# My App (React + Vite)

A React 19 single-page website powered by Vite, with routing handled by `react-router-dom`.

## Tech stack

- React 19
- Vite 8
- React Router DOM 7
- ESLint 9

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app:

- [http://localhost:5173](http://localhost:5173)

## Available scripts

- `npm run dev` - Start local development server
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks

## Project structure

```text
src/
├── main.jsx                 ✅ (router configured)
├── index.css               ✅ (all styles)
├── App.jsx                 ✅ (not used - using router instead)
├── component/
│   ├── header.jsx          ✅ (needs useState fix)
│   ├── Footer/
│   │   └── Footer.jsx      ✅
│   └── Body/
│       ├── Body.jsx        ✅
│       ├── ContactUs.jsx   ✅
│       ├── HeroServices.jsx✅
│       ├── indexBody/
│       │   ├── About.jsx   ✅
│       │   ├── Flags.jsx   ✅
│       │   ├── Hero.jsx    ✅
│       │   ├── services-cars.jsx ✅
│       │   └── whyUs.jsx   ✅