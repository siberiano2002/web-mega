# 🚨 CONFIGURACIÓN CORS REQUERIDA EN SANITY

## Pasos para configurar CORS en Sanity CMS:

### 1. Acceder a Sanity Manage
- Ve a: https://www.sanity.io/manage
- Inicia sesión con tu cuenta
- Selecciona el proyecto: **tuexzpcw**

### 2. Configurar CORS Origins
- Ve a la sección **API** > **CORS Origins**
- Haz clic en **"Add CORS Origin"**
- Agrega las siguientes URLs:

```
http://localhost:3000
http://localhost:3001
```

### 3. Configuración de cada origen:
- **Origin**: `http://localhost:3000`
- **Allow Credentials**: ✅ (marcar si usas token)
- **Methods**: GET, POST, OPTIONS
- **Headers**: Allow all

- **Origin**: `http://localhost:3001`
- **Allow Credentials**: ✅ (marcar si usas token)
- **Methods**: GET, POST, OPTIONS
- **Headers**: Allow all

### 4. Guardar cambios
- Haz clic en **"Save"** para cada origen

## 📋 Verificación final:
- ✅ http://localhost:3000 agregado
- ✅ http://localhost:3001 agregado
- ✅ Método GET permitido
- ✅ Credentials permitidas (si usas token)

## 🔄 Después de configurar CORS:
1. Crea/actualiza tu archivo `.env.local` con las variables
2. Reinicia el servidor Next.js
3. Prueba la sección de noticias

## 🐛 Solución de errores:
Si aún recibes errores CORS:
- Verifica que las URLs sean exactas (sin slash al final)
- Asegúrate de haber guardado los cambios en Sanity
- Reinicia completamente el servidor Next.js
- Limpia la caché del navegador
