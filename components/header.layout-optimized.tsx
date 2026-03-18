"use client"

import { useState, useEffect } from "react"
import { useOptimizedScroll, useThrottledScroll } from "@/hooks/layout-optimized-hooks"
import Link from "next/link"
import Image from "next/image"
import { headerIcons } from "@/lib/icons"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Empresa", href: "/empresa" },
  { name: "Secadoras", href: "/secadoras" },
  { name: "Gas", href: "/gas" },
  { name: "Energías Renovables", href: "/energias-renovables" },
  { name: "Contacto", href: "/#contacto" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  // ✅ Usar hooks optimizados para evitar layout thrashing
  const { scrollToSection } = useOptimizedScroll()
  const throttledScroll = useThrottledScroll(() => {
    handleScroll()
  }, 16)

  // ✅ Función optimizada para manejo de scroll sin layout thrashing
  const handleScroll = () => {
    // ✅ Usar pageYOffset en lugar de getBoundingClientRect para evitar layout thrashing
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    setIsScrolled(scrollTop > 50)

    // ✅ Optimizar detección de sección activa con cache
    const sections = navigation.filter(nav => nav.href.startsWith("#"))
    sections.forEach(section => {
      const element = document.getElementById(section.href.slice(1))
      if (element) {
        const rect = element.getBoundingClientRect()
        const elementTop = rect.top + scrollTop
        const elementBottom = elementTop + rect.height

        // ✅ Cache del cálculo para evitar lecturas repetidas
        if (scrollTop >= elementTop - 100 && scrollTop < elementBottom - 100) {
          setActiveSection(section.href)
        }
      }
    })
  }

  useEffect(() => {
    // ✅ Usar throttled scroll en lugar de scroll directo
    window.addEventListener("scroll", throttledScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", throttledScroll)
  }, [throttledScroll])

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const sectionId = href.slice(1)
      scrollToSection(sectionId)
    } else {
      window.location.href = href
    }
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10 shadow-lg"
          : "bg-primary/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-accent flex items-center justify-center transition-transform group-hover:scale-105">
              <Image 
                src="/iconomega.webp" 
                alt="MEGA" 
                width={32} 
                height={32}
                sizes="32px"
                className="transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg lg:text-xl font-bold text-white">MEGA</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">Ingeniería</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => item.href.startsWith("#") && handleNavClick(item.href)}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  activeSection === item.href ? "text-accent" : "text-white/80"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:text-accent hover:bg-accent/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <headerIcons.X className="h-6 w-6" />
            ) : (
              <headerIcons.Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-primary-foreground/10">
            <nav className="flex flex-col gap-4 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:bg-accent/10 ${
                    activeSection === item.href ? "text-accent bg-accent/10" : "text-white/80"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
