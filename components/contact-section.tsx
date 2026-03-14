"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Clock, ArrowRight, Briefcase, Users, FileText, X } from "lucide-react"
import { AnimatedSection } from "./animated-section"
import Link from "next/link"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    cvFile: null as File | null,
    cvType: 'general'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [showCVModal, setShowCVModal] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({
      ...prev,
      cvFile: file
    }))
  }

  const generateCVText = () => {
    const cvText = `
SOLICITUD DE EMPLEO - CURRICULUM VITAE
=====================================

DATOS PERSONALES
-------------------------------------
Nombre: ${formData.name}
Email: ${formData.email}
${formData.company ? `Empresa: ${formData.company}` : ''}
${formData.phone ? `Teléfono: ${formData.phone}` : ''}
${formData.subject ? `Asunto: ${formData.subject}` : ''}

MENSAJE DE PRESENTACIÓN
-------------------------------------
${formData.message}

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
    return cvText
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('company', formData.company)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('subject', formData.subject)
      formDataToSend.append('message', formData.message)
      
      if (formData.cvFile) {
        formDataToSend.append('cvFile', formData.cvFile)
        formDataToSend.append('cvFileName', formData.cvFile.name)
      }

      // Enviar a una API más robusta
      const response = await fetch('/api/contact-cv', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        setSubmitMessage('¡CV enviado exitosamente! Nos pondremos en contacto pronto.')
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: '',
          cvFile: null,
          cvType: 'general'
        })
        setShowCVModal(false)
      } else {
        throw new Error('Error al enviar el CV')
      }
    } catch (error) {
      console.error('Error:', error)
      setSubmitMessage('Error al enviar el CV. Por favor, intente nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="py-16 sm:py-20 lg:py-32 bg-secondary relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
              Contacto
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
              Comunicate con <span className="text-accent">MEGA</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              INGENIERÍA MEGA S.A. posee tres divisiones: producción de Secadoras de Granos 
              (+ de 30 Países han confiado en nuestra tecnología), instalación de Redes de Gas Natural 
              y Desarrollo de soluciones para producir energías renovables.
            </p>
          </div>
        </AnimatedSection>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Obras y Proyectos Card */}
          <AnimatedSection delay={100}>
            <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 h-full hover:border-accent/30 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center mb-3 sm:mb-4 lg:mb-6">
                <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-accent" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 sm:mb-3 lg:mb-4">
                Obras y Proyectos
              </h3>
              <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Consultas técnicas, solicitudes de cotización y desarrollo de proyectos 
                industriales. Nos especializamos en soluciones a medida.
              </p>
              
              <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
                <Input 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nombre y apellido" 
                  className="bg-background border-border h-9 sm:h-10 lg:h-11 rounded-lg text-sm sm:text-base"
                  required
                />
                <Input 
                  name="email" 
                  type="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email" 
                  className="bg-background border-border h-9 sm:h-10 lg:h-11 rounded-lg text-sm sm:text-base"
                  required
                />
                <Input 
                  name="company" 
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Empresa (opcional)" 
                  className="bg-background border-border h-9 sm:h-10 lg:h-11 rounded-lg text-sm sm:text-base"
                />
                <Input 
                  name="phone" 
                  type="tel" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Teléfono" 
                  className="bg-background border-border h-9 sm:h-10 lg:h-11 rounded-lg text-sm sm:text-base"
                />
                <select 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full h-9 sm:h-10 lg:h-11 px-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
                  required
                >
                  <option value="">Asunto</option>
                  <option value="ventas">Ventas</option>
                  <option value="secadoras">Secadoras de Granos</option>
                  <option value="gas">Gas Natural y GLP</option>
                  <option value="renovables">Energías Renovables</option>
                  <option value="otro">Otro</option>
                </select>
                <textarea 
                  name="message" 
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={2} 
                  placeholder="Describa su consulta..."
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm sm:text-base"
                  required
                />
                
                {submitMessage && (
                  <div className="p-2 sm:p-3 lg:p-4 mb-2 sm:mb-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-xs sm:text-sm">
                    {submitMessage}
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-9 sm:h-10 lg:h-11 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-sm sm:text-base font-semibold"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar consulta'}
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </form>
            </div>
          </AnimatedSection>

          {/* RR.HH. Card */}
          <AnimatedSection delay={200}>
            <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 h-full hover:border-accent/30 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center mb-3 sm:mb-4 lg:mb-6">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-accent" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 sm:mb-3 lg:mb-4">
                Recursos Humanos
              </h3>
              <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Formamos parte de una empresa en crecimiento. Si buscas un desafío 
                profesional y querés sumarte a nuestro equipo, envianos tu CV.
              </p>
              
              <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
                <Input 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nombre y apellido" 
                  className="bg-background border-border h-9 sm:h-10 lg:h-11 rounded-lg text-sm sm:text-base"
                  required
                />
                <Input 
                  name="email" 
                  type="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email" 
                  className="bg-background border-border h-9 sm:h-10 lg:h-11 rounded-lg text-sm sm:text-base"
                  required
                />
                <Input 
                  name="phone" 
                  type="tel" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Teléfono" 
                  className="bg-background border-border h-9 sm:h-10 lg:h-11 rounded-lg text-sm sm:text-base"
                />
                
                <div className="flex gap-2 sm:gap-4">
                  <Button 
                    type="button"
                    onClick={() => setShowCVModal(true)}
                    className="flex-1 h-9 sm:h-10 lg:h-11 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-sm sm:text-base font-semibold"
                  >
                    <FileText className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Adjuntar CV
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 h-9 sm:h-10 lg:h-11 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-sm sm:text-base font-semibold"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
                
                {submitMessage && (
                  <div className="p-2 sm:p-3 lg:p-4 mb-2 sm:mb-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-xs sm:text-sm">
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </AnimatedSection>

          {/* Ventas Card */}
          <AnimatedSection delay={300}>
            <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 h-full hover:border-accent/30 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center mb-3 sm:mb-4 lg:mb-6">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-accent" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 sm:mb-3 lg:mb-4">
                Ventas
              </h3>
              <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Información sobre productos, cotizaciones y asesoramiento comercial. 
                Nuestro equipo de ventas está a tu disposición para ayudarte.
              </p>
              
              <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
                <Input 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nombre y apellido" 
                  className="bg-background border-border h-9 sm:h-10 lg:h-11 rounded-lg text-sm sm:text-base"
                  required
                />
                <Input 
                  name="email" 
                  type="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email" 
                  className="bg-background border-border h-9 sm:h-10 lg:h-11 rounded-lg text-sm sm:text-base"
                  required
                />
                <Input 
                  name="company" 
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Empresa (opcional)" 
                  className="bg-background border-border h-9 sm:h-10 lg:h-11 rounded-lg text-sm sm:text-base"
                />
                <Input 
                  name="phone" 
                  type="tel" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Teléfono" 
                  className="bg-background border-border h-9 sm:h-10 lg:h-11 rounded-lg text-sm sm:text-base"
                />
                <select 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full h-9 sm:h-10 lg:h-11 px-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
                  required
                >
                  <option value="">Asunto</option>
                  <option value="ventas">Ventas</option>
                  <option value="secadoras">Secadoras de Granos</option>
                  <option value="gas">Gas Natural y GLP</option>
                  <option value="renovables">Energías Renovables</option>
                  <option value="otro">Otro</option>
                </select>
                <textarea 
                  name="message" 
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={2} 
                  placeholder="Describa su consulta..."
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm sm:text-base"
                  required
                />
                
                {submitMessage && (
                  <div className="p-2 sm:p-3 lg:p-4 mb-2 sm:mb-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-xs sm:text-sm">
                    {submitMessage}
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-9 sm:h-10 lg:h-11 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-sm sm:text-base font-semibold"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar consulta'}
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
