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
  const [showObrasModal, setShowObrasModal] = useState(false)
  const [showRRHHModal, setShowRRHHModal] = useState(false)
  const [showVentasModal, setShowVentasModal] = useState(false)

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

  const handleObrasSubmit = async (e: React.FormEvent) => {
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
      formDataToSend.append('type', 'obras')

      const response = await fetch('/api/contact-obras', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        setSubmitMessage('¡Consulta enviada exitosamente! Nos pondremos en contacto pronto.')
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
        setShowObrasModal(false)
      } else {
        throw new Error('Error al enviar la consulta')
      }
    } catch (error) {
      console.error('Error:', error)
      setSubmitMessage('Error al enviar la consulta. Por favor, intente nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRRHHSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('message', formData.message)
      formDataToSend.append('type', 'rrhh')
      
      if (formData.cvFile) {
        formDataToSend.append('cvFile', formData.cvFile)
        formDataToSend.append('cvFileName', formData.cvFile.name)
      }

      const response = await fetch('/api/contact-rrhh', {
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
        setShowRRHHModal(false)
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

  const handleVentasSubmit = async (e: React.FormEvent) => {
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
      formDataToSend.append('type', 'ventas')

      const response = await fetch('/api/contact-ventas', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        setSubmitMessage('¡Consulta enviada exitosamente! Nos pondremos en contacto pronto.')
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
        setShowVentasModal(false)
      } else {
        throw new Error('Error al enviar la consulta')
      }
    } catch (error) {
      console.error('Error:', error)
      setSubmitMessage('Error al enviar la consulta. Por favor, intente nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
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
    <>
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
              Estamos aquí para ayudarte. Contáctanos para consultas técnicas, solicitudes de cotización 
              o desarrollo de proyectos industriales.
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
              
              <Button 
                type="button"
                onClick={() => setShowObrasModal(true)}
                className="w-full h-9 sm:h-10 lg:h-11 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-sm sm:text-base font-semibold"
              >
                Contactar
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
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
              
              <Button 
                type="button"
                onClick={() => setShowRRHHModal(true)}
                className="w-full h-9 sm:h-10 lg:h-11 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-sm sm:text-base font-semibold"
              >
                Contactar
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
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
              
              <Button 
                type="button"
                onClick={() => setShowVentasModal(true)}
                className="w-full h-9 sm:h-10 lg:h-11 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-sm sm:text-base font-semibold"
              >
                Contactar
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Modal Obras y Proyectos */}
    {showObrasModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Obras y Proyectos
            </h3>
            <Button
              type="button"
              onClick={() => setShowObrasModal(false)}
              className="p-2 hover:bg-accent/10 rounded-lg"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <form className="space-y-4" onSubmit={handleObrasSubmit}>
            <Input 
              name="name" 
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nombre y apellido" 
              className="bg-background border-border h-10 sm:h-11 rounded-lg text-sm sm:text-base"
              required
            />
            <Input 
              name="email" 
              type="email" 
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email" 
              className="bg-background border-border h-10 sm:h-11 rounded-lg text-sm sm:text-base"
              required
            />
            <Input 
              name="company" 
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Empresa (opcional)" 
              className="bg-background border-border h-10 sm:h-11 rounded-lg text-sm sm:text-base"
            />
            <Input 
              name="phone" 
              type="tel" 
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Teléfono" 
              className="bg-background border-border h-10 sm:h-11 rounded-lg text-sm sm:text-base"
            />
            <select 
              name="subject" 
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full h-10 sm:h-11 px-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
              required
            >
              <option value="">Asunto</option>
              <option value="obras">Obras y Proyectos</option>
              <option value="cotizacion">Cotización</option>
              <option value="otro">Otro</option>
            </select>
            <textarea 
              name="message" 
              value={formData.message}
              onChange={handleInputChange}
              rows={4} 
              placeholder="Describa su consulta..."
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm sm:text-base"
              required
            />
            
            {submitMessage && (
              <div className="p-3 sm:p-4 mb-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                {submitMessage}
              </div>
            )}
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-10 sm:h-11 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-sm sm:text-base font-semibold"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar consulta'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    )}

    {/* Modal Recursos Humanos */}
    {showRRHHModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Recursos Humanos
            </h3>
            <Button
              type="button"
              onClick={() => setShowRRHHModal(false)}
              className="p-2 hover:bg-accent/10 rounded-lg"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <form className="space-y-4" onSubmit={handleRRHHSubmit}>
            <Input 
              name="name" 
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nombre y apellido" 
              className="bg-background border-border h-10 sm:h-11 rounded-lg text-sm sm:text-base"
              required
            />
            <Input 
              name="email" 
              type="email" 
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email" 
              className="bg-background border-border h-10 sm:h-11 rounded-lg text-sm sm:text-base"
              required
            />
            <Input 
              name="phone" 
              type="tel" 
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Teléfono" 
              className="bg-background border-border h-10 sm:h-11 rounded-lg text-sm sm:text-base"
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Adjuntar CV (PDF, DOC, DOCX)
              </label>
              <Input 
                name="cvFile" 
                type="file" 
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="bg-background border-border h-10 sm:h-11 rounded-lg text-sm sm:text-base"
              />
            </div>
            
            <textarea 
              name="message" 
              value={formData.message}
              onChange={handleInputChange}
              rows={4} 
              placeholder="Mensaje de presentación..."
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm sm:text-base"
              required
            />
            
            {submitMessage && (
              <div className="p-3 sm:p-4 mb-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                {submitMessage}
              </div>
            )}
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-10 sm:h-11 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-sm sm:text-base font-semibold"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar CV'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    )}

    {/* Modal Ventas */}
    {showVentasModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Ventas
            </h3>
            <Button
              type="button"
              onClick={() => setShowVentasModal(false)}
              className="p-2 hover:bg-accent/10 rounded-lg"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <form className="space-y-4" onSubmit={handleVentasSubmit}>
            <Input 
              name="name" 
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nombre y apellido" 
              className="bg-background border-border h-10 sm:h-11 rounded-lg text-sm sm:text-base"
              required
            />
            <Input 
              name="email" 
              type="email" 
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email" 
              className="bg-background border-border h-10 sm:h-11 rounded-lg text-sm sm:text-base"
              required
            />
            <Input 
              name="company" 
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Empresa (opcional)" 
              className="bg-background border-border h-10 sm:h-11 rounded-lg text-sm sm:text-base"
            />
            <Input 
              name="phone" 
              type="tel" 
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Teléfono" 
              className="bg-background border-border h-10 sm:h-11 rounded-lg text-sm sm:text-base"
            />
            <select 
              name="subject" 
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full h-10 sm:h-11 px-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
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
              rows={4} 
              placeholder="Describa su consulta..."
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm sm:text-base"
              required
            />
            
            {submitMessage && (
              <div className="p-3 sm:p-4 mb-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                {submitMessage}
              </div>
            )}
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-10 sm:h-11 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-sm sm:text-base font-semibold"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar consulta'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    )}
    </>
  )
}
