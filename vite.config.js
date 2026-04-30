import { fileURLToPath, URL } from 'node:url'
import nodemailer from 'nodemailer'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const contactApiPlugin = (emailEnv) => {
  const handleContactRequest = async (req, res) => {
    if (req.method !== 'POST' || req.url !== '/api/contact') return false

    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}')
        const name = (payload.name || '').trim()
        const email = (payload.email || '').trim()
        const subject = (payload.subject || '').trim()
        const message = (payload.message || '').trim()

        if (!name || !email || !subject || !message) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'All fields are required.' }))
          return
        }

        const host = emailEnv.EMAIL_HOST || process.env.EMAIL_HOST || 'smtp.gmail.com'
        const user = emailEnv.EMAIL_HOST_USER || process.env.EMAIL_HOST_USER || 'tech@mohanplc.com'
        const pass = emailEnv.EMAIL_HOST_PASSWORD || process.env.EMAIL_HOST_PASSWORD
        const port = Number(emailEnv.EMAIL_PORT || process.env.EMAIL_PORT || 587)
        const recipient = emailEnv.EMAIL_TO || process.env.EMAIL_TO || user

        if (!pass) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Email credentials are not configured on the server.' }))
          return
        }

        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: { user, pass }
        })

        await transporter.sendMail({
          from: `"Mohan Website Contact" <${user}>`,
          replyTo: `${name} <${email}>`,
          to: recipient,
          subject: `[Website Contact] ${subject}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Subject: ${subject}`,
            '',
            'Message:',
            message
          ].join('\n')
        })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ ok: true }))
      } catch {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Failed to send email.' }))
      }
    })

    return true
  }

  return {
    name: 'contact-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        handleContactRequest(req, res).then((handled) => {
          if (!handled) next()
        })
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        handleContactRequest(req, res).then((handled) => {
          if (!handled) next()
        })
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      contactApiPlugin(env)
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
