import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// Matches **bold** or [label](/internal-path) inside content strings.
const TOKEN = /\*\*(.+?)\*\*|\[(.+?)\]\((\/[^)\s]*)\)/g

/**
 * Renders a content string with lightweight inline markup:
 * `**bold**` and `[label](/path)` internal links (SEO-friendly anchors).
 */
export default function RichText({ text }) {
  const out = []
  let last = 0
  for (const match of text.matchAll(TOKEN)) {
    if (match.index > last) out.push(text.slice(last, match.index))
    if (match[1]) {
      out.push(<strong key={match.index}>{match[1]}</strong>)
    } else {
      out.push(
        <Link key={match.index} to={match[3]} className="hl-inline-link">
          {match[2]}
        </Link>
      )
    }
    last = match.index + match[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return <Fragment>{out}</Fragment>
}
