import Image from "next/image"

// ✅ Image Optimization Component - Formatos modernos y lazy loading
interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  loading?: "lazy" | "eager"
  sizes?: string
  quality?: number
  fill?: boolean
  placeholder?: "blur" | "empty"
  blurDataURL?: string
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = "", 
  priority = false, 
  loading = "lazy", 
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  fill = false,
  placeholder = "blur",
  blurDataURL
}: OptimizedImageProps) {
  // ✅ Optimización: Generar blur placeholder si no se proporciona
  const generateBlurDataURL = (imageSrc: string) => {
    // ✅ Placeholder optimizado para diferentes tipos de imágenes
    return `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=`
  }

  // ✅ Optimización: Determinar si usar WebP/AVIF basado en soporte del navegador
  const getOptimizedSrc = (imageSrc: string) => {
    // ✅ Para imágenes hero y críticas, usar WebP si existe
    if (priority && (imageSrc.includes('.jpg') || imageSrc.includes('.png'))) {
      const webpSrc = imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')
      const avifSrc = imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.avif')
      
      // ✅ Prioridad: AVIF > WebP > Original
      return avifSrc || webpSrc || imageSrc
    }
    
    return imageSrc
  }

  // ✅ Optimización: Ajustar calidad según el tipo de imagen
  const getOptimizedQuality = () => {
    if (priority) return 90 // ✅ Alta calidad para LCP
    if (loading === "lazy") return 75 // ✅ Calidad media para lazy loading
    return quality
  }

  // ✅ Optimización: Sizes específicos según el uso
  const getOptimizedSizes = () => {
    if (priority) {
      // ✅ Para imágenes hero: responsive completo
      return "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1920px"
    }
    
    if (className?.includes('thumbnail') || className?.includes('logo')) {
      // ✅ Para thumbnails y logos: tamaños fijos pequeños
      return "(max-width: 768px) 50vw, 100px"
    }
    
    return sizes
  }

  return (
    <Image
      src={getOptimizedSrc(src)}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      loading={loading}
      sizes={getOptimizedSizes()}
      quality={getOptimizedQuality()}
      fill={fill}
      placeholder={placeholder}
      blurDataURL={blurDataURL || generateBlurDataURL(src)}
      style={{
        objectFit: fill ? 'cover' : undefined,
        objectPosition: fill ? 'center' : undefined
      }}
    />
  )
}

// ✅ Componente específico para imágenes hero (LCP)
export function HeroImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      className={className}
      priority={true}
      loading="eager"
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1920px"
      quality={90}
      fill={true}
      placeholder="blur"
    />
  )
}

// ✅ Componente específico para logos y thumbnails
export function LogoImage({ 
  src, 
  alt, 
  size = 120, 
  fallback,
  className = "" 
}: { 
  src: string; 
  alt: string; 
  size?: number; 
  fallback?: string;
  className?: string 
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      priority={false}
      loading="lazy"
      sizes={`${size}px`}
      quality={85}
      placeholder="empty"
    />
  )
}

// ✅ Componente específico para imágenes de contenido
export function ContentImage({ 
  src, 
  alt, 
  aspectRatio = "16/9", 
  className = "" 
}: { 
  src: string; 
  alt: string; 
  aspectRatio?: string; 
  className?: string 
}) {
  // ✅ Calcular dimensiones basadas en aspect ratio
  const [width, height] = aspectRatio.split('/').map(Number)
  const calculatedWidth = 800
  const calculatedHeight = Math.round(calculatedWidth * (height / width))

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={calculatedWidth}
        height={calculatedHeight}
        className="w-full h-auto"
        priority={false}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
        quality={85}
        placeholder="blur"
      />
    </div>
  )
}

// ✅ Componente específico para imágenes de galería
export function GalleryImage({ 
  src, 
  alt, 
  index = 0,
  className = "" 
}: { 
  src: string; 
  alt: string; 
  index?: number; 
  className?: string 
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={600}
      height={400}
      className={className}
      priority={index === 0} // ✅ Solo la primera imagen es priority
      loading={index === 0 ? "eager" : "lazy"}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
      quality={80}
      placeholder="blur"
    />
  )
}

// ✅ Componente específico para imágenes de productos
export function ProductImage({ 
  src, 
  alt, 
  className = "" 
}: { 
  src: string; 
  alt: string; 
  className?: string 
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={800}
      height={600}
      className={className}
      priority={false}
      loading="lazy"
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
      quality={85}
      placeholder="blur"
    />
  )
}
