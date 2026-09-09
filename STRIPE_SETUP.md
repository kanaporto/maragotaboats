# Activar pagos reales (Stripe: Apple Pay + Google Pay + Bizum)

La integración de código ya está lista (modo test-ready). Esto es lo que falta
para pasar a producción cuando tengáis la documentación de empresa.

## 0. Qué ya está hecho

- [functions/api/create-payment-intent.ts](functions/api/create-payment-intent.ts) — Cloudflare Pages Function que crea el `PaymentIntent` en el servidor (la clave secreta nunca toca el navegador).
- [components/StripePaymentForm.tsx](components/StripePaymentForm.tsx) — formulario de pago con Stripe Elements. Muestra automáticamente tarjeta, Apple Pay, Google Pay y Bizum según lo que actives en el Dashboard y lo que soporte el dispositivo del cliente.
- [components/ReservationModal.tsx](components/ReservationModal.tsx) — si `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` está configurada, usa Stripe real; si no, sigue mostrando el flujo simulado actual (no rompe la demo).
- Manejo del regreso de Bizum en [app/page.tsx](app/page.tsx) — Bizum obliga a salir a la app del banco para aprobar el pago, así que guardamos los datos de la reserva en `sessionStorage` y mostramos la confirmación al volver.

## 1. Alta en Stripe (requiere documentación de empresa)

1. Crear cuenta en https://dashboard.stripe.com/register
2. Completar el onboarding con datos de la empresa (CIF, cuenta bancaria IBAN, representante legal) — esto es el KYC que necesita los documentos.
3. Una vez aprobada la cuenta, activar el modo producción (sale del modo test).

## 2. Activar Bizum en el Dashboard

1. Dashboard → **Settings → Payment methods**
2. Buscar **Bizum** → activar
3. Confirmar que la cuenta está en euros y el país de la cuenta es España (Bizum solo funciona con clientes en España).

## 3. Apple Pay

1. Dashboard → **Settings → Payment methods → Apple Pay**
2. Stripe gestiona el dominio de verificación automáticamente si usáis Stripe Elements (como aquí) — no hace falta subir el archivo de verificación manualmente en la mayoría de casos, pero confirmar en el Dashboard que el dominio `maragota-boats.pages.dev` (o el dominio final) aparece verificado.
3. Apple Pay solo aparece en Safari/dispositivos Apple compatibles — es normal no verlo en Chrome/Android.

## 4. Google Pay

1. No requiere alta separada para probarlo — Stripe lo expone automáticamente vía Payment Element en navegadores/dispositivos compatibles con la wallet de Google.

## 5. Claves de API

En el Dashboard → **Developers → API keys**:

- **Publishable key** (`pk_live_...`) → variable `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Secret key** (`sk_live_...`) → variable `STRIPE_SECRET_KEY`

### Dónde ponerlas en Cloudflare

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → **Workers & Pages → maragota-boats → Settings → Environment variables** (se usa en el build estático, así que hace falta un redeploy después de añadirla)
- `STRIPE_SECRET_KEY` → **Workers & Pages → maragota-boats → Settings → Functions → Secrets** (solo la usa `create-payment-intent.ts` en el servidor, nunca se expone al navegador)

Usar primero las claves `pk_test_...` / `sk_test_...` (modo test, sin necesidad de KYC aprobado) para probar todo el flujo con las [tarjetas de test de Stripe](https://docs.stripe.com/testing) antes de pasar a `pk_live_...` / `sk_live_...`.

## 6. Probar

1. Redeploy en Cloudflare tras añadir las variables.
2. Hacer una reserva de prueba → en el paso de pago debería aparecer el formulario real de Stripe (tarjeta + wallets disponibles) en vez de los tres botones simulados.
3. Con clave de test, usar tarjeta `4242 4242 4242 4242`, cualquier fecha futura y CVC.
4. Para probar Bizum en modo test, Stripe simula el flujo de redirección sin necesitar una cuenta Bizum real — ver [docs.stripe.com/payments/bizum/accept-a-payment](https://docs.stripe.com/payments/bizum/accept-a-payment).

## 7. Pendiente para ese momento (no bloqueante ahora)

- Conectar el email de confirmación real (Resend) en `handleStripeSuccess` de `ReservationModal.tsx` — ahora mismo solo queda un `TODO`.
- Webhook de Stripe (`checkout.session.completed` / `payment_intent.succeeded`) si se quiere confirmar reservas de forma robusta en vez de confiar solo en la respuesta del navegador — se añadiría como otra Pages Function en `functions/api/stripe-webhook.ts`.

## Referencias

- [Bizum: What businesses in Spain need to know | Stripe](https://stripe.com/resources/more/bizum-in-depth-guide)
- [Accept a payment with Bizum | Stripe Documentation](https://docs.stripe.com/payments/bizum/accept-a-payment)
- [Payment Methods in Spain | Stripe](https://stripe.com/resources/more/payment-methods-in-spain)
