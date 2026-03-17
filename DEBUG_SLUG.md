# 🔍 DEBUG - Rutas Dinámicas /noticias/[slug]

## Problema: /noticias/mejora2026 devuelve 404

### ✅ Query Actualizada

#### Nueva Query GROQ:
```typescript
const postQuery = `*[_type == "post" && slug.current == $slug][0]{
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
```

**Cambios:**
- ✅ **mainImage.asset.url** - Acceso directo a URL
- ✅ **Campos esenciales** - Solo los necesarios
- ✅ **Sin categories/location** - Simplificación temporal

### 🔧 Debug Mejorado

#### Logs Implementados:
```typescript
console.log("Slug recibido:", params.slug)
console.log("Post encontrado:", post)
console.log("Post title:", post?.title)
console.log("Post slug:", post?.slug?.current)
```

#### Mensaje Temporal (en vez de 404):
```typescript
if (!post) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Post no encontrado
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            No se encontró el post: <strong>{params.slug}</strong>
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Debug Info:</strong><br />
              Slug recibido: {params.slug}<br />
              Query ejecutada: Buscando post con slug.current == "{params.slug}"<br />
              Resultado: {post ? "Encontrado" : "No encontrado"}
            </p>
          </div>
          <Link href="/noticias" className="...">
            Volver a noticias
          </Link>
        </div>
      </div>
    </div>
  )
}
```

## 🎯 Pasos para Diagnosticar

### 1. Prueba la URL:
**Ve a:** http://localhost:3000/noticias/mejora2026

### 2. Revisa la consola:
Deberías ver:
```
Slug recibido: mejora2026
Post encontrado: [object o null]
Post title: [título o undefined]
Post slug: [slug.current o undefined]
```

### 3. Si post es null:
- Revisa Sanity Studio
- Verifica que el post exista
- Confirma que tenga slug.current = "mejora2026"

### 4. Si post tiene datos:
- El problema está en otro lugar
- Revisa el renderizado del componente

## 🚨 Posibles Causas

### 1. **Post no existe en Sanity:**
- El post "mejora2026" no está en la base de datos
- El slug es diferente (mayúsculas, espacios, etc.)

### 2. **Post está en draft:**
- El post existe pero no está publicado
- Sanity filtra posts publicados automáticamente

### 3. **Query incorrecta:**
- El campo slug no existe
- El tipo _type no es "post"

### 4. **Problema de cliente Sanity:**
- Variables de entorno incorrectas
- Dataset o projectId incorrectos

## 🛠️ Soluciones

### Si el post no existe:
1. **Crea el post en Sanity Studio**
2. **Asegúrate de tener:**
   - _type: "post"
   - slug.current: "mejora2026"
   - published: true

### Si la query no funciona:
1. **Prueba query más simple:**
   ```typescript
   const postQuery = `*[_type == "post"][0]`
   ```
2. **Verifica conexión con Sanity**

## 📋 Checklist Final

- [ ] Consola muestra "Slug recibido: mejora2026"
- [ ] Consola muestra "Post encontrado: [object]"
- [ ] Post.title no es undefined
- [ ] Post.slug.current no es undefined
- [ ] Página muestra contenido o mensaje de error

## 🔄 Para volver a notFound():

Cuando confirmes que funciona, reemplaza el mensaje temporal con:
```typescript
if (!post) {
  notFound()
}
```
