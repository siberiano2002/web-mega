# 🚨 CONFIGURACIÓN CORS EN SANITY CMS

## Pasos obligatorios para que funcione la sección de noticias:

### 1️⃣ Acceder a Sanity Manage
- Ve a: https://www.sanity.io/manage
- Inicia sesión con tu cuenta
- Selecciona el proyecto: **tuexzpcw**

### 2️⃣ Configurar CORS Origins
- Ve a la sección **API** → **CORS Origins**
- Haz clic en **"Add CORS Origin"**
- Agrega estas URLs exactamente:

```
http://localhost:3000
http://localhost:3001
```

### 3️⃣ Configuración para cada origen:
Para cada URL que agregues:

**Origin:** `http://localhost:3000`
- ✅ Allow Credentials: (marcar si usas token)
- ✅ Methods: GET, POST, OPTIONS
- ✅ Headers: Allow all

**Origin:** `http://localhost:3001`  
- ✅ Allow Credentials: (marcar si usas token)
- ✅ Methods: GET, POST, OPTIONS
- ✅ Headers: Allow all

### 4️⃣ Guardar cambios
- Haz clic en **"Save"** para cada origen configurado

## 📁 Crear archivo .env.local

Crea un archivo llamado `.env.local` en la raíz del proyecto con:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=tuexzpcw
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk_live_XXXXXX
```

**Importante:** Reemplaza `XXXXXX` con tu token real si el dataset es privado.

## 🔄 Reiniciar servidor

Después de configurar CORS y crear .env.local:

```bash
# Limpiar caché
rm -rf .next

# Reiniciar servidor
npm run dev
```

## ✅ Verificación final

La sección de noticias debería funcionar cuando:
- ✅ CORS configurado en Sanity
- ✅ .env.local creado con variables correctas
- ✅ Servidor reiniciado
- ✅ Sin errores en consola

## 🐛 Si aún hay errores

1. **Error CORS:** Revisa que las URLs en Sanity sean exactas
2. **Error 401:** Verifica que el token sea correcto (si es privado)
3. **Error 404:** Confirma projectId y dataset son correctos
4. **Error de red:** Reinicia completamente el servidor
