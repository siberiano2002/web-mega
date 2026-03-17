# 🚀 CONFIGURACIÓN FINAL SANITY CMS

## 1️⃣ Configurar CORS en Sanity

### Acceder a Sanity Manage:
- Ve a: https://www.sanity.io/manage
- Inicia sesión y selecciona el proyecto: **tuexzpcw**

### Configurar CORS Origins:
1. Ve a **API** → **CORS Origins**
2. Haz clic en **"Add CORS Origin"**
3. Agrega estos orígenes exactamente:

```
http://localhost:3000
http://localhost:3004
```

4. Para cada origen, configura:
   - ✅ Allow Credentials: (marcar si usas token)
   - ✅ Methods: GET, POST, OPTIONS
   - ✅ Headers: Allow all
5. Haz clic en **"Save"** para cada uno

## 2️⃣ Crear archivo .env.local

Crea un archivo `.env.local` en la raíz del proyecto con:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=tuexzpcw
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk_live_XXXXXX
```

**Importante:** Reemplaza `XXXXXX` con tu token real si el dataset es privado.

## 3️⃣ Verificar configuración actual

### ✅ lib/sanity.client.ts - Configurado:
```typescript
import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-03-16',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN
})
```

### ✅ app/noticias/page.tsx - Funcional:
- ✅ Muestra título de posts
- ✅ Muestra imágenes optimizadas
- ✅ Muestra extracto/excerpt
- ✅ Manejo de loading y errores
- ✅ Fallback con datos de ejemplo

## 4️⃣ Reiniciar servidor

```bash
# Limpiar caché
rm -rf .next

# Reiniciar servidor
npm run dev
```

## 🎯 Verificación final

La sección de noticias debería funcionar cuando:
- ✅ CORS configurado para localhost:3000 y localhost:3004
- ✅ .env.local creado con variables correctas
- ✅ Servidor reiniciado
- ✅ Posts mostrando título, imagen y extracto

## 🌐 Acceso a la demo

Una vez configurado, accede a:
- **Home:** http://localhost:3004
- **Noticias:** http://localhost:3004/noticias

## 🐛 Solución de problemas

Si hay errores:
1. **CORS:** Revisa URLs exactas en Sanity
2. **401:** Verifica token si dataset es privado
3. **404:** Confirma projectId y dataset
4. **Sin posts:** Verifica que tengas posts publicados en Sanity
