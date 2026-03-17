export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-16'

// Debug: Verificar variables de entorno
console.log('Environment variables check:')
console.log('NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log('NEXT_PUBLIC_SANITY_DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET)
console.log('NEXT_PUBLIC_SANITY_API_VERSION:', process.env.NEXT_PUBLIC_SANITY_API_VERSION)

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tuexzpcw'

// Validación menos estricta para evitar errores en desarrollo
if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.warn('Warning: NEXT_PUBLIC_SANITY_DATASET not found, using default: production')
}

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.warn('Warning: NEXT_PUBLIC_SANITY_PROJECT_ID not found, using default: tuexzpcw')
}
