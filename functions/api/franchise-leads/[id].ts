// PATCH /api/franchise-leads/:id — updates pipeline/negotiation fields for
// one lead. Same demo-phase security note as index.ts applies here.

interface Env {
  LEADS_KV: KVNamespace
}

const ALLOWED_FIELDS = [
  'status',
  'primerContacto',
  'primerContactoFecha',
  'negociacionCompleta',
  'notas',
  'tiempoEstimado',
  'documentosFirmados',
  'barcoOfrecido',
  'tiempoImplementacion',
]

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const id = context.params.id as string
  const key = `lead:${id}`

  const existingRaw = await context.env.LEADS_KV.get(key)
  if (!existingRaw) {
    return new Response(JSON.stringify({ error: 'Solicitud no encontrada' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let patch: Record<string, unknown>
  try {
    patch = await context.request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Datos inválidos' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const existing = JSON.parse(existingRaw)
  const updated = { ...existing }

  for (const field of ALLOWED_FIELDS) {
    if (field in patch) {
      updated[field] = patch[field]
    }
  }
  updated.updatedAt = new Date().toISOString()

  await context.env.LEADS_KV.put(key, JSON.stringify(updated))

  return new Response(JSON.stringify({ lead: updated }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
