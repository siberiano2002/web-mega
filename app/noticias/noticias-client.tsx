"use client"

import { useState, useEffect } from 'react'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { PortableTextImage } from '@/components/sanity-optimized-image'

// Posts por página
const POSTS_PER_PAGE = 6

// Componente para Portable Text con links e imágenes
export const PortableTextComponents = {
  marks: {
    link: ({ value, children }: any) => (
      <a 
        href={value.href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 underline hover:text-blue-800 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: PortableTextImage,
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-6 text-gray-900">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-6 mb-4 text-gray-900">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-semibold mt-4 mb-3 text-gray-900">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-medium mt-3 mb-2 text-gray-900">{children}</h4>,
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed text-gray-800">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-50 italic text-gray-700">
        {children}
      </blockquote>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-800">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-800">
        {children}
      </ol>
    ),
    li: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
}

// Componente de tarjeta de noticia
export function NewsCard({ post, isFeatured = false }: { post: any; isFeatured?: boolean }) {
  return (
    <article className={`bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group flex flex-col ${isFeatured ? 'ring-2 ring-blue-500 shadow-lg' : 'shadow-md'}`}>
      {/* Imagen principal */}
      {post.mainImage?.asset?.url && (
        <div className={`relative overflow-hidden w-full ${isFeatured ? 'h-56' : 'h-52'}`}>
          <Image
            src={post.mainImage.asset.url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={isFeatured}
          />
          {isFeatured && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
              Destacado
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
        </div>
      )}

      {/* Contenido */}
      <div className={`space-y-4 flex-1 flex flex-col ${isFeatured ? 'p-5' : 'p-6'}`}>
        {/* Meta información */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {post.publishedAt && (
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishedAt} className="font-medium">
                {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          )}
        </div>

        {/* Título */}
        <h3 className={`font-bold text-gray-900 leading-tight ${isFeatured ? 'text-xl' : 'text-xl'}`}>
          {post.title}
        </h3>

        {/* Extracto */}
        {post.excerpt && (
          <p className="text-gray-600 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* Preview del cuerpo con Portable Text */}
        {post.body && (
          <div className={`prose prose-sm max-w-none text-gray-700 line-clamp-4`}>
            <PortableText 
              value={post.body}
              components={PortableTextComponents}
            />
          </div>
        )}

        {/* Link al post completo */}
        <div className="pt-2 text-left mt-auto">
          <Link
            href={`/noticias/${post.slug.current}`}
            className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 w-full sm:w-auto group"
          >
            Leer más
            <ExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  )
}

// Componente de paginación (Client Component)
export function Pagination({ 
  currentPage, 
  totalPages, 
  searchParams 
}: { 
  currentPage: number; 
  totalPages: number; 
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  if (totalPages <= 1) return null

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams as Record<string, string>)
    if (newPage > 1) {
      params.set('page', newPage.toString())
    } else {
      params.delete('page')
    }
    window.location.href = `/noticias?${params.toString()}`
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Siguiente
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
