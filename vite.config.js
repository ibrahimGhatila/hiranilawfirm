import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function localContactApi() {
  return {
    name: 'local-contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res, next) => {
        if (req.method !== 'POST') return next()

        try {
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          req.body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')

          const { default: handler } = await import('./api/contact.js')
          const response = {
            setHeader: (name, value) => res.setHeader(name, value),
            status(code) {
              res.statusCode = code
              return this
            },
            json(payload) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(payload))
              return this
            },
          }
          await handler(req, response)
        } catch (error) {
          console.error('Local contact API error:', error)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Unable to send your request right now.' }))
        }
      })
    },
  }
}

// Vite serves the API middleware locally; Vercel uses api/contact.js in production.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.RESEND_API_KEY) process.env.RESEND_API_KEY = env.RESEND_API_KEY

  return {
  plugins: [react(), localContactApi()],
  server: {
    port: 5173,
    open: true,
  },
  }
})
