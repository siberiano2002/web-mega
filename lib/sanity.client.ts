import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tuexzpcw',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-03-16',
  useCdn: false, // false para debugging - asegura datos frescos
  token: process.env.SANITY_API_TOKEN || undefined
})
