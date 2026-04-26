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
const dataPath = path.join(root, 'src', 'data', 'moc_Data.json')

function normalizeServiceSlug(category) {
  if (!category || typeof category !== 'object') return null
  const slugify = (value) =>
    value
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
  if (typeof category.slug === 'string' && category.slug.trim()) {
    return slugify(category.slug)
  }
  if (typeof category.category_name === 'string' && category.category_name.trim()) {
    return slugify(category.category_name)
  }
  return null
}

function readServicePaths() {
  if (!fs.existsSync(dataPath)) return []
  try {
    const raw = fs.readFileSync(dataPath, 'utf8')
    const parsed = JSON.parse(raw)
    const categories = Array.isArray(parsed?.categories) ? parsed.categories : []
    const slugs = categories
      .filter((category) => category?.general_category === 'service-items')
      .map(normalizeServiceSlug)
      .filter(Boolean)
    return [...new Set(slugs)].map((slug) => `/services/${slug}`)
  } catch (error) {
    console.warn('Could not parse service data for sitemap:', error.message)
    return []
  }
}

const robots = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`

const today = new Date().toISOString().slice(0, 10)
const paths = ['/', '/about', '/services', '/contact', ...readServicePaths()]
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
