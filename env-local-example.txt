# Variables de entorno para Sanity CMS
# Copia este archivo a .env.local y completa los valores reales

# Project ID de Sanity (requerido)
NEXT_PUBLIC_SANITY_PROJECT_ID=

# Dataset de Sanity (requerido)
NEXT_PUBLIC_SANITY_DATASET=

# Token de API de Sanity (opcional - solo si el dataset es privado)
# Genera tu token en: https://www.sanity.io/manage
# Permisos recomendados: Read-only
SANITY_API_TOKEN=

# Notas:
# - Reemplaza los valores vacíos con tu configuración real
# - Si el dataset es público, puedes omitir SANITY_API_TOKEN
# - Si el dataset es privado, agrega tu token con formato sk_live_XXXXXXXX
# - Reinicia el servidor después de cambiar estas variables
