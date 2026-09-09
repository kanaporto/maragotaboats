// Cloudflare Pages Function — per-franchisee settings: the webhook URL of
// their external reservation manager (if they have one) and days they've
// blocked off. Stored in the same KV used for leads, under its own key
// prefix.
// Endpoints: GET /api/franchisee-settings?franchiseeId=X
//            POST /api/franchisee-settings  { franchiseeId, webhookUrl?, blockedDates? }

interface Env {
  LEADS_KV: KVNamespace
}

interface FranchiseeSettings {
  webhookUrl: string
  blockedDates: string[]
}

const DEFAULT_SETTINGS: FranchiseeSettings = { webhookUrl: '', blockedDates: [] }

function settingsKey(franchiseeId: string) {
  return `franchisee-settings:${franchiseeId}`
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url)
  const franchiseeId = url.searchParams.get('franchiseeId')

  if (!franchiseeId) {
    return new Response(JSON.stringify({ error: 'Falta franchiseeId' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const raw = await context.env.LEADS_KV.get(settingsKey(franchiseeId))
  const settings: FranchiseeSettings = raw ? JSON.parse(raw) : DEFAULT_SETTINGS

  return new Response(JSON.stringify(settings), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: { franchiseeId: string; webhookUrl?: string; blockedDates?: string[] }
  try {
    body = await context.request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Datos inválidos' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!body.franchiseeId) {
    return new Response(JSON.stringify({ error: 'Falta franchiseeId' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const key = settingsKey(body.franchiseeId)
  const raw = await context.env.LEADS_KV.get(key)
  const current: FranchiseeSettings = raw ? JSON.parse(raw) : DEFAULT_SETTINGS

  const updated: FranchiseeSettings = {
    webhookUrl: body.webhookUrl !== undefined ? body.webhookUrl : current.webhookUrl,
    blockedDates: body.blockedDates !== undefined ? body.blockedDates : current.blockedDates,
  }

  await context.env.LEADS_KV.put(key, JSON.stringify(updated))

  return new Response(JSON.stringify(updated), {
    headers: { 'Content-Type': 'application/json' },
  })
}
