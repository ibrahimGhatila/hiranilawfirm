// Builds branded 1200x630 Open Graph images for every blog post into
// public/og/blog/<slug>.jpg. Run after adding or retitling a post:
//   npm run og:blog
// Output is committed, so the fonts used here only need to exist locally.
import { mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { ogImagePath, OG_IMAGE } from '../src/data/blogSchema.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const blog = JSON.parse(await readFile(path.join(root, 'src/data/blog.json'), 'utf8'))
const { width: W, height: H } = OG_IMAGE

const escape = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

// Greedy word wrap — Georgia at 50px averages ~25px per character.
function wrap(text, maxChars) {
  const lines = []
  let line = ''
  for (const word of text.split(' ')) {
    if ((line + ' ' + word).trim().length > maxChars && line) {
      lines.push(line)
      line = word
    } else {
      line = (line + ' ' + word).trim()
    }
  }
  if (line) lines.push(line)
  return lines
}

const logo = await sharp(path.join(root, 'src/assets/logo.png')).resize({ height: 58 }).toBuffer()

await mkdir(path.join(root, 'public/og/blog'), { recursive: true })

for (const post of blog.posts) {
  const lines = wrap(post.title, 26)
  const fontSize = lines.length > 4 ? 44 : 50
  const lineHeight = fontSize * 1.18
  const titleTop = H / 2 - (lines.length * lineHeight) / 2 + fontSize * 0.35

  const overlay = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fade" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stop-color="#070707" stop-opacity="0.97"/>
        <stop offset="0.55" stop-color="#070707" stop-opacity="0.88"/>
        <stop offset="1" stop-color="#070707" stop-opacity="0.15"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#fade)"/>
    <rect x="0" y="0" width="${W}" height="8" fill="#b8943f"/>
    <rect x="72" y="${titleTop - fontSize - 38}" width="4" height="26" fill="#b8943f"/>
    <text x="88" y="${titleTop - fontSize - 18}" font-family="Arial, sans-serif" font-size="20" font-weight="700"
      letter-spacing="4" fill="#cba85f">${escape(post.categoryLabel.toUpperCase())} · TEXAS LAW BLOG</text>
    ${lines
      .map(
        (l, i) =>
          `<text x="72" y="${titleTop + i * lineHeight}" font-family="Georgia, serif" font-size="${fontSize}" fill="#ffffff">${escape(l)}</text>`
      )
      .join('')}
    <text x="72" y="${H - 50}" font-family="Arial, sans-serif" font-size="22" fill="#cfcabf">Free Consultation · 281-665-8188 · hiranilawfirm.com</text>
  </svg>`

  const out = path.join(root, 'public', ogImagePath(post.slug))
  await sharp(path.join(root, 'src/assets', `${post.image}.webp`))
    .resize(W, H, { fit: 'cover' })
    .composite([
      { input: Buffer.from(overlay), top: 0, left: 0 },
      { input: logo, top: 40, left: W - 72 - 209 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out)
  console.log('OG image:', path.relative(root, out))
}
