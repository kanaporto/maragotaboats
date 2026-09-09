# ⚡ Deploy a Cloudflare en 10 Minutos

**QUICK START - Pasos esenciales solo**

---

## 1️⃣ Git + GitHub (2 min)

```bash
cd "/Users/cesar/Desktop/Maragota Boats"

# Inicializar repositorio
git init
git add .
git commit -m "Maragota Boats MVP"

# Crear repo en GitHub.com manualmente:
# - Ir a github.com/new
# - Nombre: maragota-boats
# - Crear repo

# Subir código
git remote add origin https://github.com/TU_USER/maragota-boats.git
git branch -M main
git push -u origin main
```

---

## 2️⃣ Cloudflare Pages (3 min)

1. **Ir a:** https://dash.cloudflare.com
2. **Click:** "Pages" → "Create project"
3. **Conectar:** GitHub → Autorizar
4. **Seleccionar:** maragota-boats repo
5. **Build settings:**
   - Framework: **Next.js**
   - Build command: `npm run build`
   - Output: `.next`
6. **Deploy:** Click "Save and Deploy"

**¡LISTO!** Tu app está en: `https://maragota-boats.pages.dev`

---

## 3️⃣ Configurar Emails (3 min - Opcional)

### A. Resend Setup
1. Ir a https://resend.com
2. Sign up
3. Dashboard → API Keys
4. **Copy API key**

### B. Cloudflare Config
1. Cloudflare → Pages → maragota-boats
2. Settings → Environment variables
3. Add variable:
   - Name: `RESEND_API_KEY`
   - Value: (tu key de Resend)
4. Redeploy

---

## 4️⃣ Dominio (Opcional, 2 min)

1. Cloudflare → Pages → maragota-boats
2. Custom domains
3. Add domain: `maragota.tudominio.com`
4. ✅ Auto-configured SSL

---

## 5️⃣ Workflow Automático

```bash
# Cada cambio se auto-deploya:
git add .
git commit -m "Feature description"
git push origin main

# ✅ Cloudflare detecta cambios
# ✅ Deploy automático en 30 seg
# ✅ Live en ~2 min
```

---

## 🔗 URLs

```
App: https://maragota-boats.pages.dev
Dashboard: https://dash.cloudflare.com/YOUR_ID/pages
GitHub: https://github.com/YOUR_USER/maragota-boats
```

---

## ✅ Testing

Después del deploy, verifica:

```
✅ App carga sin errores
✅ Búsqueda funciona
✅ Geolocalización funciona
✅ Reserva funciona (mock)
```

---

## 💰 Costos

**FREE:** Cloudflare Pages + Resend (primeros 3,000 emails)

---

## 📞 Ayuda Rápida

| Problema | Solución |
|----------|----------|
| Build falla | Ver logs en Dashboard → Deployments |
| Variables no cargan | Redeploy (Settings → Redeploy) |
| 404 en rutas | Usar `/app/api/route.ts` para API |
| Geolocalización | Solo funciona en HTTPS (Cloudflare lo proporciona) |

---

## 🎯 Tiempo Estimado

- GitHub setup: **2 min**
- Cloudflare Pages: **3 min**
- Resend (opcional): **3 min**
- Dominio (opcional): **2 min**
- **TOTAL: 10 minutos** ⚡

---

**¡LISTO! Tu app está LIVE en Cloudflare** 🚀

Próximo: Ver analytics y monitoreo en Cloudflare Dashboard.
