import { Resend } from 'resend'

const RECIPIENTS = ['shihab.talukdar@primedeskgroup.com', 'sehar@hiranilawfirm.com']
const FROM = 'Hirani Law Firm Website <website@hiranilawfirm.com>'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const clean = (value, max = 500) => String(value || '').trim().slice(0, max)
const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#039;')

const row = (label, value, href = '') => `<tr>
  <td style="padding:13px 16px;border-bottom:1px solid #e9e3d8;color:#756f65;font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;width:140px;vertical-align:top">${escapeHtml(label)}</td>
  <td style="padding:13px 16px;border-bottom:1px solid #e9e3d8;color:#211f1b;font-size:15px;line-height:1.5;vertical-align:top">${href ? `<a href="${escapeHtml(href)}" style="color:#a67c2e;font-weight:600;text-decoration:none">${escapeHtml(value)}</a>` : escapeHtml(value)}</td>
</tr>`

function renderEmail(lead) {
  return `<!doctype html><html lang="en"><body style="margin:0;background:#f3f0e8;font-family:Arial,Helvetica,sans-serif;color:#211f1b">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 12px;background:#f3f0e8"><tr><td align="center">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#fff;border:1px solid #ddd5c5">
      <tr><td style="padding:30px 34px;background:#0d0d0d;border-top:4px solid #c6a04e">
        <div style="margin-bottom:10px;color:#c6a04e;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase">New Website Lead</div>
        <h1 style="margin:0;color:#fff;font:500 28px/1.25 Georgia,'Times New Roman',serif">Consultation request from ${escapeHtml(lead.fullName)}</h1>
      </td></tr>
      <tr><td style="padding:28px 34px 10px">
        <p style="margin:0 0 22px;color:#5d574d;font-size:15px;line-height:1.65">A prospective client submitted a consultation form on the Hirani Law Firm website. Replying to this email will reply directly to the visitor.</p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e9e3d8;border-bottom:0">
          ${row('Name', lead.fullName)}${row('Email', lead.email, `mailto:${lead.email}`)}
          ${row('Phone', lead.phone, lead.phone === 'Not provided' ? '' : `tel:${lead.phone.replace(/[^+\d]/g, '')}`)}
          ${row('Help needed', lead.help)}${row('Form location', lead.formContext)}
        </table>
      </td></tr>
      <tr><td style="padding:18px 34px 30px"><div style="padding:18px 20px;background:#f8f6f1;border-left:3px solid #c6a04e">
        <div style="margin-bottom:10px;color:#756f65;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">Submission Source</div>
        <p style="margin:0 0 7px;font-size:14px"><strong>Page:</strong> ${escapeHtml(lead.pageTitle)}</p>
        <p style="margin:0 0 7px;font-size:14px"><strong>URL:</strong> <a href="${escapeHtml(lead.sourceUrl)}" style="color:#a67c2e">${escapeHtml(lead.sourceUrl)}</a></p>
        <p style="margin:0 0 7px;font-size:14px"><strong>Referrer:</strong> ${escapeHtml(lead.referrer)}</p>
        <p style="margin:0;font-size:14px"><strong>Submitted:</strong> ${escapeHtml(lead.submittedAt)}</p>
      </div></td></tr>
      <tr><td style="padding:18px 34px;background:#0d0d0d;color:#9e988e;font-size:12px">Hirani Law Firm PLLC · Confidential website inquiry</td></tr>
    </table>
  </td></tr></table></body></html>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured')
    return res.status(500).json({ error: 'Email service is not configured.' })
  }

  const body = req.body || {}
  if (body.website) return res.status(200).json({ ok: true })

  const firstName = clean(body.firstName, 80)
  const lastName = clean(body.lastName, 80)
  const email = clean(body.email, 254).toLowerCase()
  const help = clean(body.help, 160)
  if (!firstName || !lastName || !EMAIL_RE.test(email) || !help) {
    return res.status(400).json({ error: 'Please provide all required fields.' })
  }

  const lead = {
    fullName: `${firstName} ${lastName}`,
    email,
    phone: clean(body.phone, 40) || 'Not provided',
    help,
    formContext: clean(body.formContext, 100) || 'Website consultation form',
    sourceUrl: clean(body.sourceUrl, 1000) || 'Unknown',
    pageTitle: clean(body.pageTitle, 200) || 'Unknown page',
    referrer: clean(body.referrer, 1000) || 'Direct visit / unavailable',
    submittedAt: new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long', timeZone: 'America/Chicago' }),
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: RECIPIENTS,
      replyTo: lead.email,
      subject: `New consultation request — ${lead.fullName} (${lead.help})`,
      html: renderEmail(lead),
      text: [`NEW WEBSITE CONSULTATION REQUEST`, `Name: ${lead.fullName}`, `Email: ${lead.email}`, `Phone: ${lead.phone}`, `Help needed: ${lead.help}`, `Form location: ${lead.formContext}`, `Page: ${lead.pageTitle}`, `URL: ${lead.sourceUrl}`, `Referrer: ${lead.referrer}`, `Submitted: ${lead.submittedAt}`].join('\n'),
    })
    if (error) {
      console.error('Resend error:', error)
      return res.status(502).json({ error: 'Email delivery failed. Please try again.' })
    }
    return res.status(200).json({ ok: true, id: data?.id })
  } catch (error) {
    console.error('Contact email error:', error)
    return res.status(500).json({ error: 'Unable to send your request right now.' })
  }
}
