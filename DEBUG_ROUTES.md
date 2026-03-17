# 🔍 Debug Rutas Dinámicas - Sanity + Next.js

## Problema: 404 en /noticias/[slug]

### ✅ Verificaciones Completadas:

#### 1. Links de Navegación
- **Formato:** `href={\`/noticias/${post.slug?.current}\`}`
- **Optional chaining:** `post.slug?.current` para evitar errores
- **Ubicación:** Línea 202 en `/noticias/page.tsx`

#### 2. Ruta Dinámica
- **Archivo:** `app/noticias/[slug]/page.tsx` ✅
- **Server Component:** Sin "use client" ✅
- **Estructura correcta:** Next.js App Router ✅

#### 3. Query a Sanity
- **Query:** `*[_type == "post" && slug.current == $slug][0]` ✅
- **Parámetro:** `{ slug: params.slug }` ✅
- **Campos:** _id, title, slug, publishedAt, mainImage, body, excerpt, categories, location ✅

#### 4. Manejo de Errores
- **Import:** `import { notFound } from 'next/navigation'` ✅
- **Lógica:** `if (!post) return notFound()` ✅

#### 5. Debug Implementado
```typescript
// En /noticias/page.tsx:
console.log("Post slug:", post.slug?.current)
console.log("Post title:", post.title)

// En /noticias/[slug]/page.tsx:
console.log("Slug recibido:", params.slug)
console.log("Post encontrado:", post)
console.log("Post title:", post?.title)
console.log("Post slug:", post?.slug?.current)
```

## 🎯 Pasos para Diagnosticar:

### 1. Revisar Consola
Abre la consola del navegador y ve a `/noticias`:
- Deberías ver: "Post slug: [slug]" y "Post title: [título]"
- Si no hay slugs, los posts no tienen slug.current

### 2. Click en "Leer más"
- Deberías ver: "Slug recibido: [slug]"
- Deberías ver: "Post encontrado: [object]" o null
- Si es null, la query no encuentra el post

### 3. Validar Datos en Sanity
En Sanity Studio, verifica que cada post tenga:
- Campo "slug" con valor "current"
- Slug generado automáticamente o manualmente
- Tipo "_type": "post"

## 🚀 Soluciones Posibles:

### Si los posts no tienen slug:
```typescript
// En Sanity Studio, agrega slug field o genera automáticamente
```

### Si la query no funciona:
```typescript
// Prueba con query más simple:
const postQuery = `*[_type == "post" && slug.current == $slug][0]`
```

### Si los links son incorrectos:
```typescript
// Verifica que post.slug?.current no sea undefined
{post.slug?.current ? (
  <Link href={`/noticias/${post.slug.current}`}>
    Leer más
  </Link>
) : (
  <span className="text-gray-400">Sin slug</span>
)}
```

## 📋 Checklist Final:

- [ ] Posts tienen slug.current en Sanity
- [ ] Console.log muestra slugs en /noticias
- [ ] Console.log muestra slug recibido en /noticias/[slug]
- [ ] Query encuentra el post (no null)
- [ ] Link href tiene valor correcto

## 🔧 Si nada funciona:

1. **Verifica datos en Sanity Studio**
2. **Revisa variables de entorno**
3. **Prueba con query hardcoded:**
   ```typescript
   const post = await sanityClient.fetch(`*[_type == "post"][0]`)
   ```
