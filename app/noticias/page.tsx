import { sanityClient } from '@/lib/sanity.client'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, ExternalLink, Search, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsCard, Pagination } from './noticias-client'

// Query GROQ para obtener todos los posts ordenados por publishedAt descendente
const postsQuery = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  mainImage{ 
    asset->{ 
      url 
    } 
  },
  excerpt,
  body
}`

// Query para búsqueda
const searchQuery = `*[_type == "post" && (
  title match $searchTerm || 
  excerpt match $searchTerm || 
  pt[].body match $searchTerm
)] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  mainImage{ 
    asset->{ 
      url 
    } 
  },
  excerpt,
  body
}`

// Posts por página
const POSTS_PER_PAGE = 6

// Página principal de noticias (Server Component)
export default async function NoticiasPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | undefined
}) {
  // Unwrap searchParams Promise
  const resolvedSearchParams = await searchParams
  const searchTerm = resolvedSearchParams?.search as string || ''
  const page = parseInt(resolvedSearchParams?.page as string || '1', 10)

  try {
    console.log("📋 [NoticiasPage] Fetching posts...")
    console.log("📋 [NoticiasPage] Search term:", searchTerm || 'none')
    console.log("📋 [NoticiasPage] Page:", page)

    // Determinar query y ejecutar
    const query = searchTerm ? searchQuery : postsQuery
    const params = searchTerm ? { searchTerm: `*${searchTerm}*` } : {}
    
    const posts = await sanityClient.fetch(query, params)
    
    console.log("📋 [NoticiasPage] Posts encontrados:", posts.length)
    
    if (posts.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Noticias y Novedades</h1>
              <p className="text-gray-600 text-lg">
                {searchTerm ? `No se encontraron noticias para "${searchTerm}"` : 'No hay noticias disponibles'}
              </p>
            </div>
          </main>
          <Footer />
        </div>
      )
    }

    // Separar top 3 destacados y el resto
    const top3Posts = posts.slice(0, 3)
    const remainingPosts = posts.slice(3)
    
    console.log("📋 [NoticiasPage] Top 3 destacados:", top3Posts.length)
    console.log("📋 [NoticiasPage] Posts restantes:", remainingPosts.length)
    
    // Paginación para posts restantes
    const startIndex = (page - 1) * POSTS_PER_PAGE
    const endIndex = startIndex + POSTS_PER_PAGE
    const paginatedPosts = remainingPosts.slice(startIndex, endIndex)
    const totalPages = Math.ceil(remainingPosts.length / POSTS_PER_PAGE)
    
    console.log("📋 [NoticiasPage] Paginación aplicada: página", page, "de", totalPages)

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Hero Section - Estructura similar a secadoras */}
        <section
          id="inicio-noticias"
          className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 mb-12 sm:mb-16 lg:mb-20 bg-primary text-primary-foreground"
        >
          {/* Background image - Responsive */}
          <div className="absolute inset-0">
            {/* Mobile Image - hasta 768px */}
            <div className="md:hidden absolute inset-0">
              <Image
                src="/images/36edfbc7-63ce-4178-9fd4-b26413346b98.webp"
                alt="Noticias y Novedades MEGA - Mobile"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
                priority
              />
            </div>
            
            {/* Tablet Image - 768px a 1024px */}
            <div className="hidden md:block lg:hidden absolute inset-0">
              <Image
                src="/images/36edfbc7-63ce-4178-9fd4-b26413346b98.webp"
                alt="Noticias y Novedades MEGA - Tablet"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1200px"
                priority
              />
            </div>
            
            {/* Desktop Image - más de 1024px */}
            <div className="hidden lg:block absolute inset-0">
              <Image
                src="/images/36edfbc7-63ce-4178-9fd4-b26413346b98.webp"
                alt="Noticias y Novedades MEGA - Desktop"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8">
            <div className="max-w-3xl">
              <p className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/80">
                Noticias y Novedades
              </p>
              <h1 className="mt-4 sm:mt-6 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight">
                Mantente informado sobre las últimas{" "}
                <span className="text-accent">novedades y proyectos</span>
              </h1>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-primary-foreground/80 leading-relaxed">
                Descubre los avances tecnológicos, proyectos destacados y noticias relevantes 
                en el mundo de la ingeniería de secado de granos. Mantente al día con las 
                innovaciones de MEGA Ingeniería.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/#contacto"
                  className="inline-flex items-center justify-center rounded-full border border-primary-foreground/30 px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors"
                >
                  Contactar con MEGA
                </Link>
              </div>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pb-6 sm:pb-8 lg:pb-12">
          {/* Búsqueda */}
          <div className="mb-8 sm:mb-12">
            <form action="/noticias" method="get" className="max-w-2xl mx-auto w-full sm:w-auto">
              <div className="relative flex items-center bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <input
                  type="text"
                  name="search"
                  placeholder="Buscar noticias..."
                  defaultValue={searchTerm}
                  className="flex-1 px-4 py-3 text-gray-900 bg-transparent border-0 focus:outline-none focus:ring-0 text-base sm:text-lg"
                />
                <button
                  type="submit"
                  className="p-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors duration-200 rounded-r-lg"
                  aria-label="Buscar"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
              {searchTerm && (
                <div className="mt-3 text-center">
                  <span className="text-sm text-gray-600">
                    Buscando: <strong>"{searchTerm}"</strong>
                  </span>
                </div>
              )}
            </form>
          </div>

          {/* Top 3 destacados */}
          {top3Posts.length > 0 && (
            <section id="noticias-destacadas" className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
                Noticias Destacadas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {top3Posts.map((post: any) => (
                  <NewsCard key={post._id} post={post} isFeatured={true} />
                ))}
              </div>
            </section>
          )}

          {/* Posts restantes con paginación */}
          {remainingPosts.length > 0 && (
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
                Más Noticias
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {paginatedPosts.map((post: any) => (
                  <NewsCard key={post._id} post={post} />
                ))}
              </div>
              
              {/* Paginación */}
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                searchParams={resolvedSearchParams}
              />
            </section>
          )}
        </main>
        
        <Footer />
      </div>
    )

  } catch (error) {
    console.error('❌ [NoticiasPage] Error fetching posts:', error)
    notFound()
  }
}

// Metadata dinámico
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Noticias y Novedades | MEGA Ingeniería',
    description: 'Mantente informado sobre las últimas novedades, proyectos y avances tecnológicos en MEGA Ingeniería.',
    keywords: ['noticias', 'novedades', 'mega ingeniería', 'proyectos', 'tecnología'],
    openGraph: {
      title: 'Noticias y Novedades | MEGA Ingeniería',
      description: 'Mantente informado sobre las últimas novedades, proyectos y avances tecnológicos en MEGA Ingeniería.',
      type: 'website',
    },
  }
}
