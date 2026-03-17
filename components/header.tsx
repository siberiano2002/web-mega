"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { key: "navInicio", href: "/" },
  { key: "navSoluciones", href: "#soluciones" },
  { key: "navTecnologia", href: "#tecnologia" },
  { key: "navInternacional", href: "#internacional" },
  { key: "navNoticias", href: "/noticias" },
  { key: "navContacto", href: "#contacto" },
]

export function Header({ forceDark = false }: { forceDark?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    const yOffset = -80
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset

    window.scrollTo({ top: y, behavior: "smooth" })
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

       const scrollPosition = window.scrollY + 120

       const sections = navigation
         .map((item) => {
           const id = item.href.replace("#", "")
           const el = document.getElementById(id)
           if (!el) return null
           return {
             id,
             top: el.offsetTop,
             height: el.offsetHeight,
           }
         })
         .filter(Boolean) as { id: string; top: number; height: number }[]

       for (const section of sections) {
         if (
           scrollPosition >= section.top &&
           scrollPosition < section.top + section.height
         ) {
           setActiveSection(section.id)
           break
         }
       }
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        forceDark || scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                forceDark || scrolled ? "bg-primary text-primary-foreground" : "bg-white/10 backdrop-blur-sm text-white border border-white/20"
              }`}>
                <Image 
                  src="/iconomega.png" 
                  alt="MEGA Logo" 
                  width={32} 
                  height={32}
                  quality={85}
                  sizes="32px"
                  className="transition-transform group-hover:scale-105"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight transition-colors ${
                forceDark || scrolled ? "text-foreground" : "text-white"
              }`}>
                MEGA
              </span>
              <span className={`text-[10px] uppercase tracking-[0.2em] transition-colors ${
                forceDark || scrolled ? "text-muted-foreground" : "text-white/70"
              }`}>
                Ingeniería
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map((item) => (
              item.href.startsWith("/") ? (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                    forceDark || scrolled
                      ? "text-foreground/70 hover:text-foreground hover:bg-muted"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.key.replace("nav", "").charAt(0).toUpperCase() + item.key.slice(4)}
                </Link>
              ) : (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToSection(item.href.replace("#", ""))
                  }}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                    forceDark || scrolled
                      ? "text-foreground/70 hover:text-foreground hover:bg-muted"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  } ${
                    activeSection === item.href.replace("#", "")
                      ? forceDark || scrolled
                        ? "bg-muted text-foreground"
                        : "bg-white/15 text-white"
                      : ""
                  }`}
                >
                  {item.key.replace("nav", "").charAt(0).toUpperCase() + item.key.slice(4)}
                </a>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Botón "Contactar con la empresa" eliminado */}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`lg:hidden p-2 rounded-full transition-colors ${
              forceDark || scrolled 
                ? "text-foreground hover:bg-muted" 
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menú</span>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div 
        className={`lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          {navigation.map((item) => (
            item.href.startsWith("/") ? (
              <Link
                key={item.key}
                href={item.href}
                className={`block text-base font-medium transition-colors py-2 text-foreground/80 hover:text-foreground`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.key.replace("nav", "").charAt(0).toUpperCase() + item.key.slice(4)}
              </Link>
            ) : (
              <a
                key={item.key}
                href={item.href}
                className={`block text-base font-medium transition-colors py-2 ${
                  activeSection === item.href.replace("#", "")
                    ? "text-foreground"
                    : "text-foreground/80 hover:text-foreground"
                }`}
                onClick={(event) => {
                  event.preventDefault()
                  scrollToSection(item.href.replace("#", ""))
                  setMobileMenuOpen(false)
                }}
              >
                {item.key.replace("nav", "").charAt(0).toUpperCase() + item.key.slice(4)}
              </a>
            )
          ))}
          
          <Button
            className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full"
            onClick={() => {
              scrollToSection("contacto")
              setMobileMenuOpen(false)
            }}
          >
            Contactar
          </Button>
        </div>
      </div>
    </header>
  )
}
