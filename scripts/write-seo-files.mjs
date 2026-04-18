import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const DEFAULT_SITE = 'https://jnssioverseas.com'

function readSiteUrl() {
  const envPath = path.join(root, '.env')
  if (fs.existsSync(envPath)) {
    const text = fs.readFileSync(envPath, 'utf8')
    for (const line of text.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      if (key === 'VITE_SITE_URL') {
        let v = trimmed
          .slice(eq + 1)
          .trim()
          .replace(/^["']|["']$/g, '')
        if (v) return v.replace(/\/$/, '')
      }
    }
  }
  return DEFAULT_SITE.replace(/\/$/, '')
}

const base = readSiteUrl()
const robots = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`

const today = new Date().toISOString().slice(0, 10)
const paths = ['/', '/about', '/services', '/contact']
const urlEntries = paths
  .map((p) => {
    const loc = p === '/' ? `${base}/` : `${base}${p}`
    const priority = p === '/' ? '1.0' : '0.8'
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
  })
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`

fs.writeFileSync(path.join(root, 'public', 'robots.txt'), robots)
fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap)
console.log('Wrote public/robots.txt and public/sitemap.xml for', base)
