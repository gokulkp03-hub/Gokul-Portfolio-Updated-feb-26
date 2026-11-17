/**
 * Lead notifications for the site owner.
 *
 * Channels (configure at least one in Vercel → Environment Variables):
 * - Email via Resend: RESEND_API_KEY, optional LEAD_NOTIFY_TO, LEAD_NOTIFY_FROM.
 *   Without a verified domain, Resend only delivers from onboarding@resend.dev
 *   to the email address of the Resend account owner.
 * - Webhook: LEAD_WEBHOOK_URL receives JSON `{ "text": "..." }`
 *   (works with Slack incoming webhooks; Discord accepts it at `<url>/slack`).
 */

export type Lead = {
  name: string;
  email: string;
  service: string;
  details: string;
};

const DEFAULT_TO = "gokulkp03@gmail.com";
const DEFAULT_FROM = "Portfolio Leads <onboarding@resend.dev>";
const TIMEOUT_MS = 8000;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function leadText(lead: Lead): string {
  return [
    `New portfolio lead: ${lead.name}`,
    `Email: ${lead.email}`,
    `Service: ${lead.service}`,
    "",
    lead.details || "(no details provided)",
  ].join("\n");
}

async function post(url: string, init: RequestInit): Promise<void> {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} ${detail.slice(0, 300)}`);
  }
}

async function sendEmail(lead: Lead, apiKey: string) {
  const html = `
    <h2>New portfolio lead</h2>
    <p><strong>Name:</strong> ${escapeHtml(lead.name)}<br>
    <strong>Email:</strong> ${escapeHtml(lead.email)}<br>
    <strong>Service:</strong> ${escapeHtml(lead.service)}</p>
    <p style="white-space:pre-wrap">${escapeHtml(lead.details || "(no details provided)")}</p>`;
  await post("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_NOTIFY_FROM || DEFAULT_FROM,
      to: (process.env.LEAD_NOTIFY_TO || DEFAULT_TO).split(",").map(s => s.trim()),
      reply_to: lead.email,
      subject: `New lead: ${lead.name} — ${lead.service}`.replace(/[\r\n]+/g, " ").slice(0, 200),
      text: leadText(lead),
      html,
    }),
  });
}

async function sendWebhook(lead: Lead, url: string) {
  await post(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: leadText(lead) }),
  });
}

/**
 * Sends the lead to every configured channel. Never throws: the lead is
 * already saved in the database, so a failed notification must not fail the form.
 * Returns how many channels delivered.
 */
export async function notifyNewLead(lead: Lead): Promise<number> {
  const tasks: Array<[string, Promise<void>]> = [];
  const resendKey = process.env.RESEND_API_KEY;
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (resendKey) tasks.push(["email", sendEmail(lead, resendKey)]);
  if (webhook) tasks.push(["webhook", sendWebhook(lead, webhook)]);

  if (tasks.length === 0) {
    console.error(
      "[Lead] No notification channel configured (set RESEND_API_KEY or LEAD_WEBHOOK_URL). Lead saved to the database only."
    );
    return 0;
  }

  const results = await Promise.allSettled(tasks.map(([, p]) => p));
  let delivered = 0;
  results.forEach((r, i) => {
    if (r.status === "fulfilled") delivered++;
    else console.error(`[Lead] ${tasks[i][0]} notification failed:`, (r.reason as Error).message);
  });
  return delivered;
}
