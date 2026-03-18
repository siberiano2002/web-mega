"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { Button } from "@/components/ui/button"

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
}

export function NewsPreviewSection() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        // Obtener las 3 noticias más recientes
        const query = `
          *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0..2] {
            _id,
            title,
            slug,
            publishedAt,
            excerpt
          }
        `
        
        const result = await client.fetch(query)
        console.log("📰 Posts fetched:", result)
        setPosts(result)
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTopPosts()
  }, [])

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Noticias y Novedades
            </h2>
            <p className="text-lg text-gray-600">
              Mantente informado sobre nuestros proyectos más recientes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Noticias y Novedades
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mantente informado sobre nuestros proyectos más recientes, capacitaciones, y las alianzas que estamos construyendo para llevar soluciones de ingeniería a toda la comunidad.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => (
            <article key={post._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full">
              {/* Content */}
              <div className="p-6 space-y-4 flex flex-col flex-1">
                {/* Date */}
                {post.publishedAt && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-2 flex-1">
                  {post.title}
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-gray-600 leading-relaxed line-clamp-4">
                    {post.excerpt}
                  </p>
                )}

                {/* Read More Link */}
                <div className="pt-2 mt-auto">
                  <Button 
                    asChild
                    className="w-full h-9 sm:h-10 lg:h-11 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-sm sm:text-base font-semibold"
                  >
                    <Link href={`/noticias/${post.slug.current}`}>
                      Leer más
                      <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            asChild
            className="h-9 sm:h-10 lg:h-11 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-sm sm:text-base font-semibold"
          >
            <Link href="/noticias">
              Ver más noticias
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
