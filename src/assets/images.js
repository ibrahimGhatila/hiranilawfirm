// Auto-register every image in this folder, keyed by filename (no extension).
// Reference from data/components by key, e.g. images['family-law'], images.team.
const modules = import.meta.glob('./*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
})

const images = {}
for (const [path, url] of Object.entries(modules)) {
  const key = path.replace(/^\.\//, '').replace(/\.[^.]+$/, '')
  images[key] = url
}

export default images
