# 🚀 Deployment en Cloudflare Pages

Guía completa para desplegar Maragota Boats en Cloudflare Pages.

---

## 📋 Prerrequisitos

- ✅ Cuenta en Cloudflare (free tier funciona)
- ✅ Repositorio en GitHub
- ✅ Git instalado localmente
- ✅ Node.js v18+ instalado

---

## 🔧 Paso 1: Preparar el Repositorio

### 1.1 Inicializar Git
```bash
cd "/Users/cesar/Desktop/Maragota Boats"
git init
git add .
git commit -m "Initial commit: Maragota Boats MVP"
```

### 1.2 Crear Repositorio en GitHub
```bash
# Opción A: Crear en GitHub.com manualmente
# 1. Ve a github.com
# 2. Click en "New repository"
# 3. Nombre: maragota-boats
# 4. Privado o público (recomendado privado de momento)
# 5. Copiar el comando para subir

# Opción B: CLI (si tienes gh instalado)
gh repo create maragota-boats --private --source=. --remote=origin --push
```

### 1.3 Subir a GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/maragota-boats.git
git branch -M main
git push -u origin main
```

---

## ☁️ Paso 2: Conectar Cloudflare Pages

### 2.1 Ir a Cloudflare Pages
1. Ve a [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click en "Pages" (lado izquierdo)
3. Click en "Create a project"

### 2.2 Conectar GitHub
1. Click en "Connect to Git"
2. Autorizar Cloudflare con GitHub
3. Seleccionar repositorio: `maragota-boats`
4. Click en "Begin setup"

### 2.3 Configurar Build
```
Project name: maragota-boats

Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Root directory: /

Environment variables:
- NEXT_PUBLIC_SUPABASE_URL: (si usas Supabase)
- NEXT_PUBLIC_SUPABASE_ANON_KEY: (si usas Supabase)
- RESEND_API_KEY: (para emails)
```

### 2.4 Deploy
1. Click en "Save and Deploy"
2. Esperar ~2-3 minutos
3. ¡Listo! Tu app estará en: `maragota-boats.pages.dev`

---

## 🔐 Paso 3: Configurar Variables de Entorno

### 3.1 En Cloudflare Dashboard

**Para desarrollo (preview):**
1. Proyecto → Settings → Environment variables
2. Click en "Add variable"
3. Ambiente: Preview
4. Variable: `RESEND_API_KEY`
5. Value: (tu API key de Resend)

**Para producción:**
1. Same process pero selecciona "Production"

### 3.2 Variables Recomendadas

```
RESEND_API_KEY=re_xxxxx  // Para emails automáticos
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...  // Para maps (opcional)
```

---

## 🌐 Paso 4: Dominio Personalizado (Opcional)

### 4.1 Usar Dominio Propio
1. Cloudflare → Pages → maragota-boats
2. Click en "Custom domains"
3. Opción A: Dominio en Cloudflare
   - "Connect custom domain"
   - Ingresa: maragota.tudominio.com
   - Cloudflare configura DNS automático

4. Opción B: Dominio en otro registrador
   - Add custom domain
   - Ingresa: maragota.tudominio.com
   - Cambiar nameservers en tu registrador a:
     ```
     ns1.cloudflare.com
     ns2.cloudflare.com
     ns3.cloudflare.com
     ns4.cloudflare.com
     ```

### 4.2 SSL/TLS (Automático)
Cloudflare proporciona certificado SSL gratis automáticamente.

---

## 📊 Paso 5: Configurar Monitoreo

### 5.1 Analytics
1. Cloudflare → Pages → maragota-boats
2. Ver "Analytics" tab
3. Monitorear:
   - Visitas diarias
   - Request count
   - Uptime

### 5.2 Logs
1. Deployments tab
2. Ver logs de cada deploy
3. Debugging de errores

---

## 🔄 Paso 6: CI/CD Automático

### 6.1 Cómo Funciona
- Cada push a `main` en GitHub → Deploy automático en Cloudflare
- Cada push a rama de feature → Preview deployment
- Pull requests → Preview URL automática

### 6.2 Workflow
```bash
# Hacer cambios localmente
git add .
git commit -m "Feature: Agregar búsqueda mejorada"

# Subir a GitHub
git push origin main

# Cloudflare detecta cambios automáticamente
# Deploy comienza en 30 segundos
# Sitio actualizado en ~2 minutos
```

---

## 📧 Paso 7: Configurar Emails (Resend)

### 7.1 Crear Cuenta en Resend
1. Ve a [resend.com](https://resend.com)
2. Click en "Sign up"
3. Usar email corporativo
4. Verificar email

### 7.2 Obtener API Key
1. Dashboard → API Keys
2. Copy API Key
3. Guardar en lugar seguro

### 7.3 Configurar en Cloudflare
1. Cloudflare Dashboard → Pages → maragota-boats
2. Settings → Environment variables
3. Add: RESEND_API_KEY = `re_xxxxx`

### 7.4 Enviar Email de Prueba
```bash
# En desarrollo local
npm run dev

# Hacer una reserva
# Sistema enviará email de confirmación a la consola
```

---

## 🧪 Paso 8: Testing Post-Deployment

### 8.1 Funcionalidad Básica
```
✅ Abrir maragota-boats.pages.dev
✅ Página carga sin errores
✅ Búsqueda por provincia funciona
✅ Búsqueda por código postal funciona
✅ "Cerca de mí" obtiene ubicación
✅ Reserva funciona (mock payment)
✅ Email de confirmación (console)
```

### 8.2 Performance
```
✅ Lighthouse score > 80
✅ First Contentful Paint < 2s
✅ Largest Contentful Paint < 3.5s
✅ Cumulative Layout Shift < 0.1
```

### 8.3 Compatibilidad
```
✅ Desktop Chrome/Firefox/Safari
✅ Mobile (iPhone, Android)
✅ Tablet
✅ Geo-location funciona en mobile
```

---

## 🔍 Monitoreo y Mantenimiento

### Daily Checks
```bash
# Ver status del deploy
https://dash.cloudflare.com/YOUR_ACCOUNT_ID/pages

# Monitorear errores
Analytics → Real time logs

# Revisar performance
Page Rules → Analytics
```

### Weekly Checks
```
- Revisar analytics
- Chequear logs de errores
- Verificar uptime (99.95%+)
- Revisar usage de API keys
```

### Monthly Checks
```
- Actualizar dependencias
- Revisar security updates
- Optimizar performance
- Backing up datos (si aplica)
```

---

## 🚨 Troubleshooting

### Build Fails
```
Error: "npm run build failed"

Soluciones:
1. Verificar package.json tiene todas las dependencias
2. Revisar versiones de Node (18+ requerido)
3. Revisar build output directory (.next)
4. Chequear logs detallados en Dashboard
```

### Función 404
```
Error: "Function not found"

Soluciones:
1. API routes están en: /app/api/route.ts
2. Verificar ruta exacta
3. Asegurar que existe el archivo
4. Redeployar forzando
```

### Variables de Entorno No Cargadas
```
Error: "Undefined environment variable"

Soluciones:
1. Revisar nombre exacto en Cloudflare
2. Usar NEXT_PUBLIC_ para variables públicas
3. Redeploy después de agregar variables
4. Esperar 2 minutos a que se propaguen
```

### Geolocalización No Funciona
```
Error: "Geolocation not available"

Soluciones:
1. Verificar que es HTTPS (Cloudflare lo provee)
2. En Chrome: Chequear permisos del navegador
3. Usar "Código Postal" como fallback
4. Test en mobile para mejor support
```

---

## 📈 Escalamiento Futuro

### Fase 1: MVP (Actual)
- ✅ Cloudflare Pages (free)
- ✅ Dummy data en memoria
- ✅ Mock payments

### Fase 2: Backend Real
- [ ] Agregar Supabase
- [ ] Integrar Stripe/Adyen
- [ ] Implementar emails reales

### Fase 3: Growth
- [ ] Cloudflare Workers (functions)
- [ ] R2 (Cloud storage)
- [ ] Durable Objects (sessions)

### Fase 4: Scale
- [ ] Multi-region
- [ ] Load balancing
- [ ] CDN global

---

## 💰 Costos (Estimado)

### Cloudflare Pages
- Builds: 500 gratis/mes (+ $0.50 extra)
- Bandwidth: Ilimitado
- **Costo: FREE tier suficiente**

### Resend (Emails)
- 3,000 emails/mes: Gratis
- $0.20 por email adicional
- **Para MVP: Gratis**

### Supabase (Futuro)
- 500MB storage: Gratis
- Escalable con pay-as-you-go
- **Para producción: ~$25/mes**

---

## ✅ Checklist Final

- [ ] Repositorio GitHub creado y sincronizado
- [ ] Cloudflare Pages conectado
- [ ] Build configurado (Next.js)
- [ ] Variables de entorno configuradas
- [ ] Resend API key agregada
- [ ] Dominio personalizado (opcional)
- [ ] SSL/TLS activado (automático)
- [ ] First deploy exitoso
- [ ] Testing completado
- [ ] Analytics habilitado
- [ ] Backup strategy planeada

---

## 🎯 URLs Importantes

```
App URL: https://maragota-boats.pages.dev
Dashboard: https://dash.cloudflare.com/YOUR_ACCOUNT_ID/pages
GitHub: https://github.com/YOUR_USERNAME/maragota-boats
Resend: https://resend.com/dashboard
```

---

## 📞 Soporte

- **Cloudflare Docs:** https://developers.cloudflare.com/pages/
- **Next.js on Pages:** https://developers.cloudflare.com/pages/framework-guides/nextjs/
- **Resend Docs:** https://resend.com/docs
- **GitHub Actions:** https://docs.github.com/en/actions

---

**¡Deployment completado!** 🚀 Tu app Maragota Boats está live en Cloudflare Pages.

**Tiempo total:** ~15 minutos  
**Costo:** FREE  
**Uptime:** 99.95%+  
**Performance:** Global CDN
