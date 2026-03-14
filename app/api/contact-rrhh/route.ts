import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string
    const type = formData.get('type') as string
    const cvFile = formData.get('cvFile') as File
    const cvFileName = formData.get('cvFileName') as string

    // Validar campos requeridos
    if (!name || !email || !phone || !message) {
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
    let emailContent = `
NUEVA POSTULACIÓN - RECURSOS HUMANOS
=====================================

DATOS DE CONTACTO
-------------------------------------
Nombre: ${name}
Email: ${email}
Teléfono: ${phone}

MENSAJE DE PRESENTACIÓN
-------------------------------------
${message}

TIPO DE CONSULTA
-------------------------------------
Recursos Humanos - Postulación Laboral

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

    // Si hay archivo CV, agregar la información
    if (cvFile && cvFileName) {
      emailContent += `

ARCHIVO ADJUNTO
-------------------------------------
Nombre del archivo: ${cvFileName}
Tamaño: ${(cvFile.size / 1024).toFixed(2)} KB
Tipo: ${cvFile.type}
      `
    }

    // Enviar email usando el servicio de email (simulado para desarrollo)
    console.log('Enviando email a info@ingenieriamega.com')
    console.log('Asunto: Nueva Postulación - Recursos Humanos')
    console.log('Contenido:', emailContent)
    if (cvFile) {
      console.log('Archivo CV adjunto:', cvFileName)
    }

    // Aquí iría el código real para enviar el email con el archivo adjunto
    // await sendEmail({
    //   to: 'info@ingenieriamega.com',
    //   subject: 'Nueva Postulación - Recursos Humanos',
    //   text: emailContent,
    //   attachments: cvFile ? [{
    //     filename: cvFileName,
    //     content: cvFile,
    //     contentType: cvFile.type
    //   }] : []
    // })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Postulación a Recursos Humanos enviada exitosamente',
        data: {
          name,
          email,
          phone,
          message,
          cvFileName: cvFileName || null,
          cvSize: cvFile ? cvFile.size : null,
          type: 'rrhh'
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error en API de Recursos Humanos:', error)
    return NextResponse.json(
      { error: 'Error al procesar la postulación' },
      { status: 500 }
    )
  }
}
