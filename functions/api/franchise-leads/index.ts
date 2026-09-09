// GET /api/franchise-leads — lists every franchise inquiry for the admin panel.
//
// NOTE: this mirrors the app's current (demo-phase) security model — the
// franchisee/admin logins are hardcoded credentials checked client-side
// (see lib/dummyData.ts), so there is no real server-side session to check
// here either. Add real auth before this goes further than internal use.

interface Env {
  LEADS_KV: KVNamespace
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const list = await context.env.LEADS_KV.list({ prefix: 'lead:' })
  const leads = await Promise.all(
    list.keys.map(async (key) => {
      const value = await context.env.LEADS_KV.get(key.name)
      return value ? JSON.parse(value) : null
    })
  )

  const cleaned = leads
    .filter(Boolean)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))

  return new Response(JSON.stringify({ leads: cleaned }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
