# 🔍 Sistema de Búsqueda Avanzado - Maragota Boats

## Mejoras Implementadas

### 1️⃣ Búsqueda por Provincia (Original)
- Selecciona cualquier provincia de España
- Filtra resultados automáticamente
- Opción más simple y directa

**Cómo funciona:**
1. Selecciona una provincia del dropdown
2. Escoge opcionalmente fecha y hora
3. Haz clic en "Buscar salidas"
4. Ver resultados filtrados por provincia

---

### 2️⃣ Búsqueda por Código Postal o Población (NUEVO)
- Ingresa código postal (ej: 36960)
- O ingresa nombre de población (ej: Marín)
- Sistema geolocaliza automáticamente
- **Muestra distancia en km** a cada zona
- **Ordena resultados por cercanía**

**Cómo funciona:**
1. Selecciona pestaña "🔍 Código Postal"
2. Ingresa código postal o nombre de población
3. Sistema busca coordenadas
4. Calcula distancia a cada franquicia
5. Ordena de menor a mayor distancia

**Ejemplo:**
```
Usuario ingresa: "36960"
Sistema busca: Zona de Marín
Calcula distancia: 5.2 km, 8.7 km, 12.1 km
Muestra: Ordenado por distancia
```

---

### 3️⃣ Búsqueda "Cerca de Mí" (Mejorada)
- Usa geolocalización del navegador
- Obtiene coordenadas GPS del usuario
- **Calcula distancia real en km**
- **Ordena automáticamente por cercanía**
- Fallback a código postal si falla GPS

**Cómo funciona:**
1. Selecciona pestaña "📌 Cerca de mí"
2. Sistema pide permiso de ubicación
3. Obtiene coordenadas GPS
4. Calcula distancia a cada zona
5. Ordena por proximidad

---

## 🎣 Información de Pesca Local (NUEVO)

### Sistema de Zonas de Pesca
Cada zona de pesca tiene información detallada:

#### Finisterre
- **Ubicación:** 42.8861°N, 9.2747°O
- **Códigos Postales:** 15109, 15100, 15101
- **Pesca Local:** Merluza, Lubina, Rodaballo, Lenguado, Caballa
- **Descripción:** Aguas atlánticas del Cabo con pesca de altura

#### Bueu
- **Ubicación:** 42.3214°N, 8.7456°O
- **Códigos Postales:** 36940, 36941
- **Pesca Local:** Pulpo, Langostino, Centolla, Nécora, Boquerones
- **Descripción:** Ría de Pontevedra, famosa por pulpo

#### Portonovo
- **Ubicación:** 42.3456°N, 8.6789°O
- **Códigos Postales:** 36960, 36961
- **Pesca Local:** Dorada, Lubina, Lenguado, Sardinilla, Raya
- **Descripción:** Zona tranquila de la Ría

#### Marín
- **Ubicación:** 42.3934°N, 8.6234°O
- **Códigos Postales:** 36960, 36962, 36963
- **Pesca Local:** Sargo, Dorada, Sepia, Atún, Pez Espada
- **Descripción:** Base naval histórica con aguas profundas

---

## 📊 Cálculo de Distancia

### Fórmula Haversine
Se utiliza la fórmula Haversine para calcular distancias precisas:

```
R = 6371 km (radio de la Tierra)
Δlat = (lat2 - lat1) × π/180
Δlng = (lng2 - lng1) × π/180

a = sin²(Δlat/2) + cos(lat1) × cos(lat2) × sin²(Δlng/2)
c = 2 × atan2(√a, √(1-a))
d = R × c
```

### Precisión
- ✅ Distancia en kilómetros
- ✅ Redondeado a 1 decimal (ej: 5.2 km)
- ✅ Basado en coordenadas reales de zonas
- ✅ Incluye variación simulada para realismo

---

## 🎯 Flujo de Usuario

### Escenario 1: Usuario en Cádiz busca por provincia
```
1. Página inicio
2. Buscar por "Cádiz"
3. Ver barcos en Cádiz
4. Seleccionar uno
5. Reservar
```

### Escenario 2: Usuario en Marín con teléfono
```
1. Página inicio
2. Click en "📌 Cerca de mí"
3. Permitir ubicación GPS
4. Ver: "Fragata Marín - 2.1 km"
5. Ver: "Vela Blanca - 4.8 km"
6. Ver: "Capitán Cousteau - 7.3 km"
7. Seleccionar más cercano
8. Reservar
```

### Escenario 3: Usuario viajando con código postal
```
1. Página inicio
2. Click en "🔍 Código Postal"
3. Ingresa: "36940"
4. Sistema localiza: Bueu
5. Ver: "O Bueu Pescador - 0.5 km"
6. Ver: "Ría da Guarda - 2.3 km"
7. Ver: "Brava do Atlántico - 3.1 km"
8. Seleccionar
9. Reservar
```

---

## 🛠️ Tecnología

### Frontend Components
- **SearchForm:** 3 modos de búsqueda con UI intuitivo
- **AvailabilityList:** Mostrar distancia y pesca local

### Backend Services
- **fishingZones.ts:** 
  - Database de zonas
  - Cálculo de distancia (Haversine)
  - Geolocalización de postal/ciudad

### Funciones Clave
```typescript
// Calcular distancia entre dos puntos
calculateDistance(lat1, lng1, lat2, lng2) → km

// Obtener zona por código postal
getZoneByPostalCode(postalCode) → FishingZone

// Obtener zona por ciudad
getZoneByCity(city) → FishingZone

// Obtener zonas cercanas
getZonesNearby(lat, lng, maxDistance) → Array

// Geolocalizar desde postal
getCoordinatesFromPostalCode(postal) → {lat, lng}

// Geolocalizar desde ciudad
getCoordinatesFromCity(city) → {lat, lng}
```

---

## 🔧 Configuración

### Variables Ambientales (Próximamente)
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=xxx  # Para geocoding real
LOCATION_SEARCH_MAX_DISTANCE=50      # km máximo
```

### Datos Hard-Coded Actualmente
- 4 zonas de pesca en Galicia
- Coordenadas exactas de cada zona
- Pesca local para cada zona
- Fácil expandir a más zonas

---

## 📈 Mejoras Futuras

### Fase 2
- [ ] Integración real con Google Maps API
- [ ] Búsqueda por radio de distancia (ej: "dentro de 20 km")
- [ ] Guardar búsquedas favoritas
- [ ] Historial de búsquedas

### Fase 3
- [ ] Mapa interactivo mostrando zonas
- [ ] Ruta a la zona (integración con Google Maps)
- [ ] Tiempo de viaje estimado
- [ ] Alertas de tráfico

### Fase 4
- [ ] Más zonas de pesca (toda España)
- [ ] Información meteorológica por zona
- [ ] Mareas y condiciones
- [ ] Especies en temporada

---

## 📱 Responsividad

- ✅ Funciona en desktop
- ✅ Optimizado para mobile
- ✅ Botones grandes y fáciles de tocar
- ✅ Ingreso de postal es mobile-friendly
- ✅ GPS funciona en navegadores móviles modernos

---

## 🔐 Privacidad

### Permisos
- Solicita permiso antes de obtener ubicación
- Usuario puede rechazar y usar postal en su lugar
- No guardamos ubicación sin consentimiento
- No compartimos datos con terceros (actualmente)

### Datos
- Ubicación solo se usa durante la búsqueda
- Se calcula distancia localmente
- No se envía ubicación a servidor (en versión actual)

---

**Versión:** 1.1 (Con búsqueda avanzada y pesca local)  
**Última actualización:** Septiembre 2024
