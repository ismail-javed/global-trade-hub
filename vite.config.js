import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { fileURLToPath, URL } from 'node:url'
import process from 'node:process'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || 'https://jnssioverseas.com').replace(
    /\/$/,
    ''
  )

  return {
    resolve: {
      alias: {
        '@data': fileURLToPath(new URL('../data', import.meta.url)),
      },
    },
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      {
        name: 'inject-site-url',
        transformIndexHtml(html) {
          return html.replaceAll('__INJECT_SITE_URL__', siteUrl)
        },
      },
    ],
  }
})
