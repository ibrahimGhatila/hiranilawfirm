// Google Apps Script web app that appends website leads to the leads sheet.
const LEAD_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbzJgb8w3JaMaqLEvXD1QhFT08q9eqWx__bAeXVueSFGOdT-jmAjQzPqal06BvUHYkXGmQ/exec'

// Matches the sheet's existing Date column format, e.g. "7/2/2026 9:07:44".
function sheetDate(date = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value])
  )
  return `${parts.month}/${parts.day}/${parts.year} ${parts.hour}:${parts.minute}:${parts.second}`
}

/**
 * Sends a submitted lead to the spreadsheet. Fire-and-forget: Apps Script
 * does not return CORS headers, so the request is sent `no-cors` and never
 * blocks or fails the form. Fields are form-encoded in the body (never the
 * URL, which gets logged) so the script reads them from `e.parameter`.
 */
export function sendLeadToSheet(lead) {
  const row = {
    date: sheetDate(),
    firstName: lead.firstName.trim(),
    lastName: lead.lastName.trim(),
    email: lead.email.trim().toLowerCase(),
    phone: lead.phone.trim(),
    service: lead.help,
    id: lead.id || '',
    emailStatus: lead.emailStatus || '',
    formContext: lead.formContext || '',
    sourceUrl: lead.sourceUrl || '',
    pageTitle: lead.pageTitle || '',
  }

  try {
    fetch(LEAD_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      body: new URLSearchParams(row),
    }).catch((error) => console.error('Lead sheet error:', error))
  } catch (error) {
    console.error('Lead sheet error:', error)
  }
}
