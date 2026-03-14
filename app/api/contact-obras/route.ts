import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const phone = formData.get('phone') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string
    const type = formData.get('type') as string

    // Validar campos requeridos
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Crear el contenido del email
    const emailContent = `
NUEVA CONSULTA - OBRAS Y PROYECTOS
=====================================

DATOS DE CONTACTO
-------------------------------------
Nombre: ${name}
Email: ${email}
${company ? `Empresa: ${company}` : ''}
Teléfono: ${phone}
Asunto: ${subject}

MENSAJE
-------------------------------------
${message}

TIPO DE CONSULTA
-------------------------------------
Obras y Proyectos

Fecha de envío: ${new Date().toLocaleString('es-AR', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

=====================================
Este formulario fue enviado a través del sitio web de MEGA
Ingeniería MEGA S.A. - www.ingenieriamega.com
    `

    // Enviar email usando el servicio de email (simulado para desarrollo)
    console.log('Enviando email a info@ingenieriamega.com')
    console.log('Asunto: Nueva Consulta - Obras y Proyectos')
    console.log('Contenido:', emailContent)

    // Aquí iría el código real para enviar el email
    // await sendEmail({
    //   to: 'info@ingenieriamega.com',
    //   subject: 'Nueva Consulta - Obras y Proyectos',
    //   text: emailContent
    // })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Consulta de Obras y Proyectos enviada exitosamente',
        data: {
          name,
          email,
          company,
          phone,
          subject,
          message,
          type: 'obras'
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error en API de Obras y Proyectos:', error)
    return NextResponse.json(
      { error: 'Error al procesar la consulta' },
      { status: 500 }
    )
  }
}
