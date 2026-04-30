import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' })
    return
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})
    const name = (payload.name || '').trim()
    const email = (payload.email || '').trim()
    const subject = (payload.subject || '').trim()
    const message = (payload.message || '').trim()

    if (!name || !email || !subject || !message) {
      res.status(400).json({ error: 'All fields are required.' })
      return
    }

    const host = process.env.EMAIL_HOST || 'smtp.gmail.com'
    const user = process.env.EMAIL_HOST_USER || 'tech@mohanplc.com'
    const pass = process.env.EMAIL_HOST_PASSWORD
    const port = Number(process.env.EMAIL_PORT || 587)
    const recipient = process.env.EMAIL_TO || user

    if (!pass) {
      res.status(500).json({ error: 'Email credentials are not configured on the server.' })
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

    res.status(200).json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Failed to send email.' })
  }
}
