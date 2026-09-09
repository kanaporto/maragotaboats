# 🚀 Guía de Configuración - Maragota Boats

## Requisitos Previos

- **Node.js:** v18.0.0 o superior
- **npm, yarn, o bun** para gestionar dependencias

## Instalación Rápida

### 1. Instalar Node.js (si no lo tienes)

**macOS (con Homebrew):**
```bash
brew install node
```

**Windows/Linux:** Descarga desde https://nodejs.org/

Verifica la instalación:
```bash
node --version
npm --version
```

### 2. Instalar dependencias del proyecto

```bash
cd "/Users/cesar/Desktop/Maragota Boats"
npm install
```

### 3. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

La app estará disponible en:
- **Cliente:** http://localhost:3000
- **Panel Franquiciado:** http://localhost:3000 → 🔑

## 🎮 Modo Demo

### Página Principal (Clientes)

1. Abre http://localhost:3000
2. **Buscar salidas:**
   - Selecciona una provincia: Finisterre, Bueu, Portonovo o Marín (todas en Galicia)
   - Elige fecha y hora (opcional)
   - O usa "Cerca de mí" (requiere permisos de ubicación)

3. **Ver disponibilidad:**
   - Aparecerán todos los barcos disponibles
   - Haz clic en "Reservar ahora"

4. **Realizar reserva:**
   - Ingresa tus datos (nombre, email, teléfono)
   - Selecciona número de personas
   - Elige método de pago (Apple Pay, Bizum, Google Pay)
   - Confirma la reserva

### Panel Franquiciado

1. Abre http://localhost:3000
2. **Busca el icono 🔑** en la esquina superior derecha (pasa el mouse para verlo)
3. Haz clic en el icono 🔑
4. Selecciona una franquicia y usa las credenciales:

#### Opciones de Login

**Franquicia Finisterre**
```
Email: finisterre@maragota.com
Contraseña: finisterre2024
```

**Franquicia Bueu**
```
Email: bueu@maragota.com
Contraseña: bueu2024
```

**Franquicia Portonovo**
```
Email: portonovo@maragota.com
Contraseña: portonovo2024
```

**Franquicia Marín**
```
Email: marin@maragota.com
Contraseña: marin2024
```

**Admin (Geno) - Acceso a todas las franquicias**
```
Email: geno@maragota.com
Contraseña: geno2024
```

### En el Dashboard Franquiciado

- **📊 Resumen:** Estadísticas rápidas del negocio
- **🚤 Barcos:** Ver y editar barcos
- **📅 Reservas:** Listado de reservas recientes
- **🏢 Franquicias** (solo Geno): Ver todas las franquicias
- **📈 Analytics:** Gráficos y estadísticas
- **⚙️ Configuración:** Cambiar precios y datos

## 📁 Datos de Demostración

### Franquicias Disponibles

1. **Finisterre** - Pescas do Cabo Finisterre
   - Ubicación: Finisterre, Pontevedra
   - Propietario: Miguel Rodríguez García
   - Barcos: 2 (Mar Atlántico, A Ría de Muros)

2. **Bueu** - Pesca Artesanal Bueu
   - Ubicación: Bueu, Pontevedra
   - Propietario: Carmela López Fernández
   - Barcos: 3 (O Bueu Pescador, Ría da Guarda, Brava do Atlántico)

3. **Portonovo** - Exploradores Marinos Portonovo
   - Ubicación: Portonovo, Pontevedra
   - Propietario: Antonio Sousa Pérez
   - Barcos: 2 (Mariscos de Portonovo, Viaje al Fondo Marino)

4. **Marín** - Aventuras Marineras Marín
   - Ubicación: Marín, Pontevedra
   - Propietario: Xosé Manuel González López
   - Barcos: 3 (Fragata Marín, Vela Blanca, Capitán Cousteau)

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
npm run dev           # Inicia servidor en http://localhost:3000

# Build
npm run build        # Compila para producción
npm run start        # Ejecuta compilación de producción

# Linting
npm run lint         # Verifica errores de código
```

## 🐛 Troubleshooting

### "npm: command not found"
- Instala Node.js desde https://nodejs.org/
- Reinicia tu terminal después de instalar

### "Module not found"
```bash
rm -rf node_modules
npm install
```

### Puerto 3000 en uso
```bash
npm run dev -- -p 3001  # Usa puerto 3001 en lugar de 3000
```

### Sesión perdida en panel franquiciado
- Los datos se guardan en localStorage
- Abre DevTools (F12) → Application → Local Storage si quieres limpiar

## 📱 Colores de la Marca

```css
Naranja Maragota: #FF6B35
Negro: #1A1A1A
Blanco: #FFFFFF
Gris Claro: #F5F5F5
```

## 🎯 Flujos Principales

### Flujo Cliente

```
Inicio → Buscar → Ver Disponibilidad → Seleccionar Barco → 
Datos Personales → Seleccionar Pago → Confirmación
```

### Flujo Franquiciado

```
Inicio → 🔑 → Login → Dashboard → 
Gestionar Barcos / Ver Reservas / Configuración
```

### Flujo Admin (Geno)

```
Inicio → 🔑 → Login Admin → Dashboard Admin → 
Ver Todas Franquicias / Estadísticas Globales
```

## 📞 Soporte

Para problemas con la instalación o uso de la app, revisa:
1. Este archivo (SETUP.md)
2. README.md para features y descripción
3. Código en los componentes

---

**Última actualización:** Septiembre 2024
**Versión:** 0.1.0 (Demo)
