/**
 * Language-aware content resolver.
 *
 * Every component imports its content from here instead of `site.json`
 * directly. The active language is read once at load from localStorage;
 * Spanish content is deep-merged over English so any key that is not yet
 * translated simply falls back to the English value. Switching language
 * saves the choice and reloads, so the whole app renders in one language.
 */
import en from './site.json'
import es from './site.es.json'

const isObject = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value)

// Objects merge key-by-key; arrays and primitives are replaced wholesale by
// the override (so a translated array must be provided in full).
function deepMerge(base, override) {
  if (!isObject(base) || !isObject(override)) return override
  const out = { ...base }
  for (const key of Object.keys(override)) {
    out[key] =
      isObject(base[key]) && isObject(override[key])
        ? deepMerge(base[key], override[key])
        : override[key]
  }
  return out
}

const STORAGE_KEY = 'hl-lang'

function readLang() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'es' ? 'es' : 'en'
  } catch {
    return 'en'
  }
}

export const currentLang = readLang()

export function setLang(next) {
  const lang = next === 'es' ? 'es' : 'en'
  try {
    window.localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    /* localStorage unavailable — ignore */
  }
  window.location.reload()
}

export function toggleLang() {
  setLang(currentLang === 'es' ? 'en' : 'es')
}

const data = currentLang === 'es' ? deepMerge(en, es) : en

export default data
