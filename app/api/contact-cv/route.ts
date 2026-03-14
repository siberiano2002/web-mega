import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extraer datos del formulario
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const phone = formData.get('phone') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string
    const cvFile = formData.get('cvFile') as File
    const cvFileName = formData.get('cvFileName') as string

    // Validar que los campos requeridos estén presentes
    if (!name || !email || !message || !cvFile) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos o el archivo CV' },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Validar tamaño del archivo (máx. 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB en bytes
    if (cvFile.size > maxSize) {
      return NextResponse.json(
        { error: 'El archivo CV no debe superar los 5MB' },
        { status: 400 }
      )
    }

    // Validar tipo de archivo
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(cvFile.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no permitido. Solo PDF, DOC y DOCX' },
        { status: 400 }
      )
    }

    // Crear el contenido del email
    const emailContent = `
      NUEVA POSTULACIÓN LABORAL DESDE FORMULARIO WEB
      
      DATOS PERSONALES:
      ------------------------
      Nombre: ${name}
      Email: ${email}
      ${company ? `Empresa: ${company}` : ''}
      ${phone ? `Teléfono: ${phone}` : ''}
      ${subject ? `Asunto: ${subject}` : ''}
      
      EXPERIENCIA PROFESIONAL:
      ------------------------
      ${message}
      
      ARCHIVO ADJUNTO:
      ------------------------
      Nombre del archivo: ${cvFileName}
      Tamaño: ${(cvFile.size / 1024).toFixed(2)} KB
      Tipo: ${cvFile.type}
      
      Fecha de envío: ${new Date().toLocaleString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
      
      =====================================
      Este CV fue enviado a través del formulario web de MEGA
      Ingeniería MEGA S.A. - www.ingenieriamega.com
    `

    // Convertir el archivo a buffer para adjuntarlo
    const arrayBuffer = await cvFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Aquí deberías configurar el servicio de email para enviar el archivo adjunto
    // Por ahora, solo mostraremos los datos en consola
    console.log('Postulación recibida:', {
      name,
      email,
      company,
      phone,
      subject,
      message,
      cvFileName,
      cvSize: cvFile.size,
      cvType: cvFile.type,
      emailContent
    })
    
    // Simular envío exitoso
    return NextResponse.json(
      { 
        message: 'CV enviado exitosamente! Nos pondremos en contacto pronto.',
        received: {
          name,
          email,
          company,
          phone,
          subject,
          message,
          cvFileName,
          cvSize: cvFile.size,
          cvType: cvFile.type
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error al procesar la postulación:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
