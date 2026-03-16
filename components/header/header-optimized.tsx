"use client"

import { useState, useEffect, useCallback } from "react"
import { Logo } from "./logo"
import { Navigation } from "./navigation"
import { MobileMenuButton } from "./mobile-menu-button"
import { MobileMenu } from "./mobile-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY
    setScrolled(scrollPosition > 50)

    // Update active section based on scroll position
    const sections = ["inicio", "soluciones", "tecnologia", "proyectos", "contacto"]
    const currentSection = sections.find(section => {
      const element = document.getElementById(section)
      if (element) {
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      }
      return false
    })
    
    if (currentSection) {
      setActiveSection(currentSection)
    }
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const throttledHandleScroll = () => {
      if (timeoutId) return
      timeoutId = setTimeout(() => {
        handleScroll()
        timeoutId = null as any
      }, 16) // ~60fps
    }

    window.addEventListener("scroll", throttledHandleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [handleScroll])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-sm shadow-lg border-b border-border/50" 
          : "bg-transparent"
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            
            <Navigation />
            
            <MobileMenuButton 
              isOpen={mobileMenuOpen} 
              onToggle={toggleMobileMenu} 
            />
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onToggle={toggleMobileMenu} />
    </>
  )
}
