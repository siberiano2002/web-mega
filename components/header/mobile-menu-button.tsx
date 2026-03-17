"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

export function MobileMenuButton({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-accent hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-colors"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span className="sr-only">Open main menu</span>
      {isOpen ? (
        <X className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <Menu className="block h-6 w-6" aria-hidden="true" />
      )}
    </button>
  )
}
