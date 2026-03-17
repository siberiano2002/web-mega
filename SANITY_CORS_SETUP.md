# Configuración CORS para Sanity CMS

## Pasos para configurar CORS en Sanity:

1. Ve a https://www.sanity.io/manage
2. Selecciona tu proyecto: "tuexzpcw"
3. Ve a "API" > "CORS Origins"
4. Agrega los siguientes orígenes:

### Orígenes permitidos:
- http://localhost:3000
- http://localhost:3001
- https://tu-dominio-de-produccion.com
- https://www.tu-dominio-de-produccion.com

### Configuración:
- **Métodos permitidos**: GET, POST, OPTIONS
- **Credenciales**: Allow credentials (si usas tokens)
- **Headers**: Permitir todos los headers necesarios

## Variables de entorno:

Crea un archivo `.env.local` con:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=tuexzpcw
NEXT_PUBLIC_SANITY_DATASET=production

# Solo si el dataset es privado:
# SANITY_API_TOKEN=sk_tu_token_aqui
```

## Notas importantes:
- Si el dataset es público, no necesitas token
- Si el dataset es privado, genera un token con permisos de lectura
- El CDN mejora performance para datos públicos
- Reinicia el servidor después de cambiar las variables de entorno
