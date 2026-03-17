import { sanityClient } from '@/lib/sanity.client'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

// Query GROQ para obtener un post específico
const postQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  mainImage{
    asset->{ url }
  },
  excerpt,
  body
}`

// Query para obtener el siguiente post
const nextPostQuery = `*[_type == "post" && publishedAt < $currentDate && defined(slug.current)] | order(publishedAt desc)[0]{
  _id,
  title,
  slug,
  publishedAt
}`

// Pre-generar parámetros estáticos para todos los posts
export async function generateStaticParams() {
  const query = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`
  const slugs = await sanityClient.fetch(query)
  console.log("🔍 [StaticParams] Slugs generados:", slugs)
  return slugs.map((item: { slug: string }) => ({ slug: item.slug }))
}

// Forzar SSR para posts nuevos
export const dynamic = 'force-dynamic'

// Metadata dinámico
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  try {
    const { slug } = await params
    console.log("🟡 [Metadata] Slug recibido:", slug)

    if (!slug) {
      return {
        title: 'Post no encontrado'
      }
    }

    console.log("🟡 [Metadata] Query a Sanity...")
    const post = await sanityClient.fetch(postQuery, { slug })
    console.log("🟡 [Metadata] Resultado Sanity:", post ? "ENCONTRADO" : "NO ENCONTRADO")

    if (!post) {
      return {
        title: 'Post no encontrado'
      }
    }

    console.log("🟢 [Metadata] Post encontrado - Título:", post.title)
    return {
      title: post.title,
      description: post.excerpt || post.title,
    }

  } catch (error) {
    console.error("🔴 [Metadata] Error:", error)
    return {
      title: 'Error al cargar'
    }
  }
}

// Componente para Portable Text con estilos personalizados
const PortableTextComponents = {
  marks: {
    link: ({ value, children }: any) => (
      <a 
        href={value.href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <img
          src={value.asset.url}
          alt={value.alt || 'Imagen'}
          className="rounded-lg shadow-md w-full"
        />
        {value.caption && (
          <p className="text-sm text-gray-600 mt-2 text-center italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-6 text-gray-900">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-medium mt-4 mb-2 text-gray-900">{children}</h4>,
    normal: ({ children }: any) => <p className="mb-6 leading-relaxed text-gray-800 text-lg">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-4 my-8 bg-blue-50 italic text-gray-700">
        {children}
      </blockquote>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside mb-6 space-y-3 text-gray-800 text-lg">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-3 text-gray-800 text-lg">
        {children}
      </ol>
    ),
    li: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
}

// Página de detalle de noticia
export default async function PostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    console.log("🟢 [Page] Slug recibido:", slug)

    if (!slug) {
      console.error("🔴 [Page] Slug undefined - Error de routing")
      notFound()
    }

    console.log("🔍 [Page] Query a Sanity...")
    const post = await sanityClient.fetch(postQuery, { slug })
    console.log("🔍 [Page] Resultado Sanity:", post ? "ENCONTRADO" : "NO ENCONTRADO")

    if (!post) {
      console.log("🔴 [Page] Post no encontrado en Sanity para slug:", slug)
      notFound()
    }

    console.log("🟢 [Page] Post encontrado - Título:", post.title)
    console.log("🟢 [Page] Slug Sanity:", post.slug?.current)

    // Obtener siguiente post
    const nextPost = await sanityClient.fetch(nextPostQuery, { 
      currentDate: post.publishedAt 
    })

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Navegación de vuelta */}
          <div className="mb-8">
            <Link 
              href="/noticias" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
            >
              ← Volver a noticias
            </Link>
          </div>

          <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Contenido del artículo */}
            <div className="p-6 sm:p-8 lg:p-12">
              {/* Título */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Fecha de publicación */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 text-gray-500 text-sm sm:text-base">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt} className="font-medium">
                    {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </div>

              {/* Imagen principal */}
              {post.mainImage?.asset?.url && (
                <div className="mb-8 sm:mb-12">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <Image
                      src={post.mainImage.asset.url}
                      alt={post.title}
                      width={1200}
                      height={600}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              )}

              {/* Contenido de la noticia */}
              <div className="prose prose-lg lg:prose-xl max-w-none text-gray-800 leading-relaxed">
                {post.body ? (
                  <>
                    {console.log("🟢 [Page] Renderizando cuerpo del post")}
                    <PortableText 
                      value={post.body}
                      components={PortableTextComponents}
                    />
                  </>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
                    <p className="text-yellow-800 text-lg">
                      Contenido en proceso
                    </p>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Botón Siguiente */}
          {nextPost && (
            <div className="mt-12 text-right">
              <Link
                href={`/noticias/${nextPost.slug.current}`}
                className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Siguiente
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    )

  } catch (error) {
    console.error("🔴 [Page] Error general:", error)
    notFound()
  }
}
