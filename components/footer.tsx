"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Mail, Phone, MapPin, Linkedin, Youtube, Facebook, ArrowUpRight, X } from "lucide-react"

export function Footer() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Logo + Descripción de la Empresa */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-start space-y-4">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center transition-transform group-hover:scale-105">
                  <Image 
                    src="/iconomega.png" 
                    alt="MEGA" 
                    width={32} 
                    height={32}
                    quality={85}
                    sizes="32px"
                    className="transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white">MEGA</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">Ingeniería</span>
                </div>
              </Link>
              <p className="text-sm text-primary-foreground/80 leading-relaxed">
                Ingeniería MEGA S.A. es una empresa líder en soluciones industriales, 
                especializada en secadoras de granos, infraestructura de gas y energías renovables.
                Desde 1995 ofrecemos tecnología de punta y compromiso con la calidad.
              </p>
            </div>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-primary-foreground/60 mt-0.5 flex-shrink-0" />
                <div>
                  <a 
                    href="mailto:info@ingenieriamega.com" 
                    className="text-sm text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    info@ingenieriamega.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-primary-foreground/60 mt-0.5 flex-shrink-0" />
                <div>
                  <a 
                    href="tel:+542355432380" 
                    className="text-sm text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    +54 2355 432380/432781
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary-foreground/60 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-primary-foreground/80">
                  Acceso Hipólito Yrigoyen 195<br />
                  Lincoln (6070), Buenos Aires<br />
                  Argentina
                </div>
              </div>
            </div>
          </div>

          {/* Imágenes Certificadas - Una debajo de la otra */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6 text-center underline underline-offset-4 decoration-white">Certificaciones</h3>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-center">
                <Image 
                  src="/images/logo-adimra2x.png" 
                  alt="ADIMRA" 
                  width={120} 
                  height={120}
                  quality={75}
                  sizes="120px"
                  className="transition-transform hover:scale-105"
                />
              </div>
              <div className="flex justify-center">
                <Image 
                  src="/images/logo-magriba.png" 
                  alt="MAGRIBA" 
                  width={120} 
                  height={60}
                  quality={75}
                  sizes="120px"
                  className="object-contain"
                />
              </div>
              <div className="flex justify-center">
                <Image 
                  src="/images/logo-cafma.png" 
                  alt="CAFMA" 
                  width={120} 
                  height={60}
                  quality={75}
                  sizes="120px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Imágenes Adicionales */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6 text-center underline underline-offset-4 decoration-white">Síguenos</h3>
            <div className="flex flex-row gap-4 justify-center items-center">
              <a 
                href="https://www.linkedin.com/company/ingenieria-mega/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 text-primary-foreground/80 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0">
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <span className="text-xs sm:text-sm">LinkedIn</span>
              </a>
              <a 
                href="https://www.youtube.com/@MEGA-ingenieria" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 text-primary-foreground/80 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0">
                  <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <span className="text-xs sm:text-sm">YouTube</span>
              </a>
            </div>
          </div>

          {/* Links Redes Sociales */}
          <div className="lg:col-span-1">
            <div className="flex flex-row gap-4 justify-center items-center">
              <div className="flex justify-center">
                <Image 
                  src="/images/DATAWEB-on.jpg" 
                  alt="DATAWEB" 
                  width={80} 
                  height={40}
                  quality={75}
                  sizes="80px"
                  className="object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex justify-center">
                <Image 
                  src="/images/luzbelito.png" 
                  alt="Luzbelito" 
                  width={208} 
                  height={40}
                  quality={75}
                  sizes="208px"
                  className="object-contain hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60">
              {new Date().getFullYear()} INGENIERÍA MEGA S.A. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="text-sm text-primary-foreground/60 hover:text-primary-foreground/80 transition-colors"
              >
                Política de Privacidad
              </button>
              <button
                onClick={() => setShowTermsModal(true)}
                className="text-sm text-primary-foreground/60 hover:text-primary-foreground/80 transition-colors"
              >
                Términos y Condiciones
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card text-card-foreground rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Política de Privacidad</h2>
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="prose prose-sm max-w-none text-foreground">
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Última actualización:</strong> Marzo, 2026
              </p>
              
              <p className="mb-4">
                En Ingeniería Mega S.A. valoramos y respetamos la privacidad de nuestros usuarios y nos comprometemos a proteger la información personal que se recopila a través de nuestro sitio web.
              </p>
              
              <p className="mb-4">
                La presente Política de Privacidad describe cómo recopilamos, utilizamos y protegemos la información que los usuarios proporcionan al utilizar este sitio web.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">1. Información que recopilamos</h3>
              
              <p className="mb-3">
                Podemos recopilar información personal que los usuarios proporcionan voluntariamente a través de formularios de contacto u otros medios disponibles en el sitio web, incluyendo:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Nombre y apellido</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Nombre de la empresa (si corresponde)</li>
                <li>Cualquier otra información que el usuario decida proporcionar en su mensaje</li>
              </ul>
              
              <p className="mb-3">
                Asimismo, el sitio puede recopilar información técnica de forma automática, como:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Dirección IP</li>
                <li>Tipo de navegador</li>
                <li>Sistema operativo</li>
                <li>Páginas visitadas dentro del sitio</li>
              </ul>
              
              <p className="mb-4">
                Esta información se utiliza únicamente con fines estadísticos y para mejorar la experiencia del usuario.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">2. Uso de la información</h3>
              
              <p className="mb-3">
                La información recopilada puede utilizarse para:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Responder consultas o solicitudes enviadas a través del sitio web</li>
                <li>Brindar información sobre nuestros servicios</li>
                <li>Mejorar el funcionamiento y contenido del sitio web</li>
                <li>Analizar el uso del sitio con fines estadísticos</li>
              </ul>
              
              <p className="mb-4">
                En ningún caso vendemos, alquilamos ni compartimos información personal con terceros con fines comerciales.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">3. Servicios de terceros</h3>
              
              <p className="mb-4">
                Nuestro sitio web puede integrar servicios proporcionados por terceros, como contenido multimedia o herramientas de análisis. Estos servicios pueden recopilar información de acuerdo con sus propias políticas de privacidad.
              </p>
              
              <p className="mb-3">
                Por ejemplo, el sitio puede incluir videos alojados en plataformas externas como YouTube.
              </p>
              
              <p className="mb-4">
                Recomendamos a los usuarios revisar las políticas de privacidad de dichos servicios.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">4. Seguridad de la información</h3>
              
              <p className="mb-4">
                En Ingeniería Mega S.A. adoptamos medidas técnicas y organizativas razonables para proteger la información personal contra accesos no autorizados, pérdida, alteración o divulgación indebida.
              </p>
              
              <p className="mb-4">
                Sin embargo, ningún sistema de transmisión o almacenamiento de datos en Internet puede garantizar una seguridad absoluta.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">5. Enlaces a sitios externos</h3>
              
              <p className="mb-4">
                Este sitio web puede contener enlaces a otros sitios web que no son operados por Ingeniería Mega S.A. No nos responsabilizamos por las políticas de privacidad ni por el contenido de dichos sitios externos.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">6. Derechos de los usuarios</h3>
              
              <p className="mb-4">
                Los usuarios pueden solicitar en cualquier momento el acceso, rectificación o eliminación de sus datos personales enviando una solicitud a:
              </p>
              
              <p className="mb-4">
                📧 info@ingenieriamega.com
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">7. Cambios en esta política</h3>
              
              <p className="mb-4">
                Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Cualquier cambio será publicado en esta misma página con su correspondiente fecha de actualización.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">8. Contacto</h3>
              
              <p className="mb-3">
                Si tiene preguntas sobre esta Política de Privacidad, puede contactarnos en:
              </p>
              
              <div className="bg-secondary p-4 rounded-lg mb-4">
                <p className="font-semibold mb-2">Ingeniería Mega S.A.</p>
                <p className="mb-1">📍 Acceso Hipólito Yrigoyen 195</p>
                <p className="mb-1">   Lincoln (6070), Buenos Aires - Argentina</p>
                <p className="mb-1">📧 info@ingenieriamega.com</p>
                <p>📞 +54 2355 432380/432781</p>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="px-6 py-2 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg font-medium transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card text-card-foreground rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Términos de Servicio</h2>
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="prose prose-sm max-w-none text-foreground">
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Última actualización:</strong> Marzo, 2026
              </p>
              
              <p className="mb-4">
                Bienvenido al sitio web de Ingeniería Mega S.A. Al acceder y utilizar este sitio web, usted acepta cumplir con los presentes Términos de Servicio. Si no está de acuerdo con estos términos, le recomendamos no utilizar este sitio.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">1. Uso del sitio web</h3>
              
              <p className="mb-4">
                El contenido de este sitio web se proporciona con fines informativos y comerciales relacionados con los servicios ofrecidos por Ingeniería Mega S.A.
              </p>
              
              <p className="mb-4">
                El usuario se compromete a utilizar el sitio de manera responsable y conforme a la legislación vigente, absteniéndose de:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Utilizar el sitio para fines ilegales o no autorizados</li>
                <li>Intentar acceder de forma no autorizada a sistemas o servidores del sitio</li>
                <li>Introducir virus, malware u otros elementos que puedan afectar el funcionamiento del sitio</li>
                <li>Utilizar la información del sitio con fines fraudulentos</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">2. Propiedad intelectual</h3>
              
              <p className="mb-4">
                Todo el contenido presente en este sitio web, incluyendo textos, imágenes, logotipos, diseños, gráficos, documentos y material audiovisual, es propiedad de Ingeniería Mega S.A. o se utiliza con autorización correspondiente.
              </p>
              
              <p className="mb-4">
                Queda prohibida la reproducción, distribución, modificación o uso del contenido sin la autorización previa y por escrito de Ingeniería Mega S.A.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">3. Información del sitio</h3>
              
              <p className="mb-4">
                Nos esforzamos por mantener la información del sitio actualizada y precisa. Sin embargo, Ingeniería Mega S.A. no garantiza que todo el contenido sea completo, exacto o actualizado en todo momento.
              </p>
              
              <p className="mb-4">
                La información presentada en este sitio puede ser modificada o actualizada sin previo aviso.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">4. Enlaces a terceros</h3>
              
              <p className="mb-4">
                Este sitio web puede contener enlaces a sitios web externos o integrar contenidos proporcionados por terceros, como videos alojados en plataformas como YouTube.
              </p>
              
              <p className="mb-4">
                Ingeniería Mega S.A. no tiene control sobre dichos sitios y no se responsabiliza por su contenido, políticas o prácticas.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">5. Limitación de responsabilidad</h3>
              
              <p className="mb-4">
                El uso de este sitio web se realiza bajo responsabilidad del usuario.
              </p>
              
              <p className="mb-4">
                Ingeniería Mega S.A. no será responsable por:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Daños directos o indirectos derivados del uso del sitio</li>
                <li>Interrupciones del servicio</li>
                <li>Errores u omisiones en el contenido</li>
                <li>Problemas técnicos o fallas del sistema</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">6. Privacidad</h3>
              
              <p className="mb-4">
                El uso de información personal proporcionada a través de este sitio se encuentra regulado por nuestra Política de Privacidad, disponible en este mismo sitio web.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">7. Modificaciones de los términos</h3>
              
              <p className="mb-4">
                Ingeniería Mega S.A. se reserva el derecho de modificar estos Términos de Servicio en cualquier momento. Las modificaciones entrarán en vigor desde el momento de su publicación en esta página.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">8. Legislación aplicable</h3>
              
              <p className="mb-4">
                Estos términos se rigen por la legislación vigente en la República de Argentina. Cualquier controversia derivada del uso del sitio web será sometida a los tribunales competentes de dicha jurisdicción.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">9. Contacto</h3>
              
              <p className="mb-3">
                Si tiene preguntas sobre estos Términos de Servicio, puede contactarnos a través de:
              </p>
              
              <div className="bg-secondary p-4 rounded-lg mb-4">
                <p className="font-semibold mb-2">Ingeniería Mega S.A.</p>
                <p className="mb-1">📍 Acceso Hipólito Yrigoyen 195</p>
                <p className="mb-1">   Lincoln (6070), Buenos Aires - Argentina</p>
                <p className="mb-1">📧 info@ingenieriamega.com</p>
                <p>📞 +54 2355 432380/432781</p>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="px-6 py-2 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg font-medium transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
