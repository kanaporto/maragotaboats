# Maragota Boats - Plataforma de Reservas de Pesca 🎣

Una plataforma moderna de reservas de pesca para la expansión de Maragota Boats como franquicia en España.

## 🎣 Características

- **Para Clientes:**
  - 🔍 Búsqueda por provincia, fecha, hora
  - 📍 Función "Cerca de mí" con geolocalización
  - 🚤 Visualización de disponibilidad de barcos
  - 💳 Reserva en 4 pasos con datos personales mejorados
  - 🛡️ Múltiples métodos de pago (Apple Pay, Bizum, Google Pay)
  - 💌 Emails de confirmación automáticos

- **Para Franquiciados:**
  - 📊 Panel de control con acceso vía 🔑 (icono oculto)
  - 🚤 Gestión de barcos y disponibilidad
  - 📅 Visualización de reservas completo
  - ⚙️ Configuración de precios y datos
  - 📈 Analytics de ocupación e ingresos

- **Para Administrador (Geno):**
  - 👑 Panel super-admin con control total
  - 🏢 Crear, suspender, dar de baja franquiciados
  - 🔑 Reset de passwords automático
  - 📊 Analytics global en tiempo real
  - 📈 Reportes mensuales automáticos (emailed)
  - 🚩 Sistema de Red Flags (anomalías detectadas)
  - 📊 Comparativa año a año
  - 💌 Emails de reportes configurables

## 🚀 Quick Start

### Requisitos
- Node.js 18+ 
- npm, yarn, o bun

### Instalación

1. **Instala las dependencias:**
```bash
npm install
```

2. **Inicia el servidor de desarrollo:**
```bash
npm run dev
```

3. **Abre http://localhost:3000** en tu navegador

4. **Para acceder al panel franquiciado:**
   - Busca el icono 🔑 en la esquina superior derecha de la página principal
   - Usa una de las credenciales de demostración

## 🔐 Credenciales de Demostración

### Franquicias Gallegas

#### Finisterre
```
Email: finisterre@maragota.com
Contraseña: finisterre2024
Ubicación: Finisterre, Pontevedra
Propietario: Miguel Rodríguez García
Barcos: 2
```

#### Bueu
```
Email: bueu@maragota.com
Contraseña: bueu2024
Ubicación: Bueu, Pontevedra
Propietario: Carmela López Fernández
Barcos: 3
```

#### Portonovo
```
Email: portonovo@maragota.com
Contraseña: portonovo2024
Ubicación: Portonovo, Pontevedra
Propietario: Antonio Sousa Pérez
Barcos: 2
```

#### Marín
```
Email: marin@maragota.com
Contraseña: marin2024
Ubicación: Marín, Pontevedra
Propietario: Xosé Manuel González López
Barcos: 3
```

#### Administrador (Geno)
```
Email: geno@maragota.com
Contraseña: geno2024
Rol: Administrador - Acceso a todas las franquicias
```

## 🎨 Acceso Rápido

**Página de Cliente:** http://localhost:3000
- Buscar salidas disponibles
- Crear reservas
- Realizar pagos

**Panel Franquiciado:** http://localhost:3000 → 🔑 (esquina superior derecha)
- Gestionar barcos
- Ver reservas
- Configurar precios
- Analytics (solo admin)

## 📊 Estructura del Proyecto

```
├── app/
│   ├── page.tsx                    # Página principal (búsqueda clientes)
│   ├── franchisee/
│   │   └── page.tsx               # Panel franquiciado (protegido)
│   ├── login/page.tsx             # Redirección a franchisee
│   ├── layout.tsx                 # Layout global
│   └── globals.css                # Estilos globales
├── components/
│   ├── Navbar.tsx                 # Navegación
│   ├── SearchForm.tsx             # Formulario de búsqueda
│   ├── AvailabilityList.tsx       # Listado de disponibilidad
│   ├── ReservationModal.tsx       # Modal de reserva
│   ├── FranchiseeLogin.tsx        # Login franquiciados
│   └── FranchiseeDashboard.tsx    # Dashboard franquiciado
├── lib/
│   ├── supabase.ts                # Configuración de Supabase
│   └── dummyData.ts               # Base de datos dummy
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## 💰 Modelo de Precios

### Para el Cliente
- **Reserva:** 15€ por persona (pagada al reservar en la app)
  - Incluye todos los impuestos
  - Uso de la plataforma
  - Email de confirmación
  
- **Franquiciado:** 45€ por persona (pagada en destino)
  - Pago directo al franquiciado en la salida
  - Efectivo o tarjeta

- **Total:** 60€ por persona

### Desglose en la App
El cliente ve claramente:
- Precio de reserva (ahora): 15€
- Precio franquiciado (después): 45€
- Total: 60€ por persona

## 🎨 Diseño & Branding

- **Colores primarios:** 
  - Naranja Maragota: `#FF6B35`
  - Negro: `#1A1A1A`
  - Blanco: `#FFFFFF`
  - Gris claro: `#F5F5F5`

- **Tipografía:** System fonts (San Francisco, Segoe UI)
- **Responsive:** Mobile-first design
- **Tema:** Basado en https://maragotaboats.com/ocio-nautico/salidas-de-pesca/

## 📱 Métodos de Pago

La app soporta:
- 🍎 Apple Pay
- 💬 Bizum (pago por SMS)
- 🔵 Google Pay

*Nota: Actualmente simulado. Integración real requiere Stripe, Adyen o procesador similar*

## 🌊 Características Especiales

### Para Clientes
- **Buscar barcos:** Por provincia, fecha, hora
- **Geolocalización:** "Cerca de mí" para encontrar la salida más próxima
- **Sin registro:** Compra rápida solo con email/teléfono
- **Confirmación:** Email automático con detalles de la reserva
- **No reembolsos:** Las reservas son finales

### Para Franquiciados
- **Panel privado:** Acceso con credenciales únicas (sin auto-registro)
- **Gestión de barcos:** 
  - Crear/editar barcos
  - Configurar número de sitios
  - Cambiar disponibilidad
- **Reservas en tiempo real:** Ver todas las reservas
- **Configuración:** Cambiar precios, datos de contacto
- **Analytics:** Ver ocupación y ingresos

### Para Administrador (Geno)
- **Control total:** Acceso a todas las franquicias
- **Dashboard global:** Estadísticas de toda la red
- **Gestión de franquiciados:** Ver todas las ubicaciones
- **Reportes:** Ingresos, ocupación, tendencias

## 💾 Base de Datos

**Fase 1 (Actual):** Dummy data en memoria (`lib/dummyData.ts`)
- 4 franquicias de demostración (Finisterre, Bueu, Portonovo, Marín)
- Datos de ejemplo para desarrollo y presentación
- Credenciales hardcodeadas

**Fase 2 (Próxima):** Integración con Supabase
```sql
-- Franquiciados
CREATE TABLE franchisees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  owner_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Barcos
CREATE TABLE boats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  franchisee_id UUID REFERENCES franchisees(id),
  total_seats INTEGER DEFAULT 8,
  franchisee_price DECIMAL(10, 2) DEFAULT 45.00,
  rating DECIMAL(3, 1),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reservas
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  boat_id UUID REFERENCES boats(id),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  num_people INTEGER NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  reservation_fee DECIMAL(10, 2) DEFAULT 15.00,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔒 Seguridad

- ✅ Sesiones en localStorage (demo)
- 🔄 Próximamente: JWT con Supabase Auth
- 🔒 Contraseñas hasheadas en BD
- 🛡️ Encriptación de datos sensibles
- 💳 Tokenización de pagos (PCI-DSS)
- 🚫 CSRF protection
- 🔐 Rate limiting en API

## 🚧 Roadmap

### Fase 2 - Backend Real
- [ ] Migrar a Supabase Authentication
- [ ] Implementar API REST con Next.js
- [ ] Integración de pagos (Stripe/Adyen)
- [ ] Email automático (Resend/SendGrid)
- [ ] Webhooks de pagos

### Fase 3 - Características Avanzadas
- [ ] Sistema de reseñas y ratings
- [ ] Notificaciones en tiempo real (Pusher)
- [ ] Analytics avanzado
- [ ] Calendario de disponibilidad avanzado
- [ ] Sistema de promociones/descuentos
- [ ] Programa de fidelización

### Fase 4 - Mobile
- [ ] App nativa iOS (React Native)
- [ ] App nativa Android (React Native)
- [ ] Push notifications
- [ ] Acceso offline

## 🤝 Contribuir

Para modificar datos de demostración, edita `lib/dummyData.ts`

## 📞 Contacto

**Equipo Maragota Boats**
- Web: https://maragotaboats.com
- Email: info@maragotaboats.com

---

**© 2024 Maragota Boats. Todos los derechos reservados.**
# Maragota-Boats
# Maragota-Boats
