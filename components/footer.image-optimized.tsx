import Link from "next/link"
import Image from "next/image"
import { LogoImage } from "@/components/ui/optimized-image-v3"

const footerLinks = [
  {
    title: "Empresa",
    links: [
      { name: "Sobre Nosotros", href: "/empresa" },
      { name: "Historia", href: "/empresa#historia" },
      { name: "Valores", href: "/empresa#valores" },
      { name: "Certificaciones", href: "/empresa#certificaciones" },
    ],
  },
  {
    title: "Servicios",
    links: [
      { name: "Secadoras de Granos", href: "/secadoras" },
      { name: "Infraestructura de Gas", href: "/gas" },
      { name: "Energías Renovables", href: "/energias-renovables" },
      { name: "Automatización", href: "/automatizacion" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { name: "Información", href: "/contacto" },
      { name: "Ubicación", href: "/contacto#ubicacion" },
      { name: "Teléfono", href: "tel:+5491144444444" },
      { name: "Email", href: "mailto:info@ingenieriamega.com" },
    ],
  },
]

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/company/ingenieria-mega", icon: "linkedin" },
  { name: "YouTube", href: "https://youtube.com/@MEGA-ingenieria", icon: "youtube" },
  { name: "Facebook", href: "https://facebook.com/ingenieriamega", icon: "facebook" },
]

const certifications = [
  { name: "ADIMRA", logo: "/images/logo-adimra2x.webp", fallback: "/images/logo-adimra2x.png", alt: "ADIMRA - Asociación de Industriales Metalúrgicas de la República Argentina" },
  { name: "MAGRIBA", logo: "/images/logo-magriba.webp", fallback: "/images/logo-magriba.png", alt: "MAGRIBA - Asociación de Fabricantes de Equipos de Granos y Afines" },
  { name: "CAFMA", logo: "/images/logo-cafma.webp", fallback: "/images/logo-cafma.png", alt: "CAFMA - Cámara Argentina de Fabricantes de Maquinaria Agrícola" },
]

export function FooterImageOptimized() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-start space-y-4">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center transition-transform group-hover:scale-105">
                  <LogoImage 
                    src="/iconomega.webp" 
                    fallback="/iconomega.png"
                    alt="MEGA" 
                    size={48}
                    className="transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white">MEGA</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">Ingeniería</span>
                </div>
              </Link>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">
                Especialistas en soluciones industriales integrales con más de 30 años de experiencia.
              </p>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/70 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Certifications */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6 text-center underline underline-offset-4 decoration-white">Certificaciones</h3>
            <div className="grid grid-cols-1 gap-2">
              {certifications.map((cert) => (
                <div key={cert.name} className="flex justify-center">
                  <div className="relative">
                    <LogoImage
                      src={cert.logo}
                      fallback={cert.fallback}
                      alt={cert.alt}
                      size={120}
                      className="transition-transform hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-sm text-primary-foreground/70">
              © {new Date().getFullYear()} Ingeniería MEGA S.A. Todos los derechos reservados.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-white mb-6 text-center underline underline-offset-4 decoration-white">Síguenos</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={social.name}
                  >
                    <span className="text-white text-sm font-bold">
                      {social.name.charAt(0)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
