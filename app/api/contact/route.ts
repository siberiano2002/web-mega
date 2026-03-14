import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar que los campos requeridos estén presentes
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Crear el contenido del email
    const emailContent = `
      NUEVA CONSULTA DESDE FORMULARIO WEB
      
      DATOS DE CONTACTO:
      ------------------------
      Nombre: ${body.name}
      Email: ${body.email}
      ${body.company ? `Empresa: ${body.company}` : ''}
      ${body.phone ? `Teléfono: ${body.phone}` : ''}
      ${body.subject ? `Asunto: ${body.subject}` : ''}
      
      MENSAJE:
      ------------------------
      ${body.message}
      
      Fecha: ${new Date().toLocaleString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
    `

    // Enviar el email (aquí deberías configurar el servicio de email)
    // Por ahora, solo mostraremos los datos en consola
    console.log('Email que se enviaría:', emailContent)
    
    // Simular envío exitoso
    return NextResponse.json(
      { 
        message: 'Consulta enviada exitosamente',
        received: {
          name: body.name,
          email: body.email,
          company: body.company,
          phone: body.phone,
          subject: body.subject,
          message: body.message
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
