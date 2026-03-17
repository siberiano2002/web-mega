"use client"

import { Navigation } from "./navigation"
import { MobileMenuButton } from "./mobile-menu-button"

interface MobileMenuProps {
  isOpen: boolean
  onToggle: () => void
}

export function MobileMenu({ isOpen, onToggle }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="lg:hidden">
      <div className="fixed inset-0 z-50" onClick={onToggle}>
        <div className="fixed inset-0 bg-black/25" />
      </div>
      
      <div className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-background shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-foreground">MEGA</span>
          </div>
          <MobileMenuButton isOpen={isOpen} onToggle={onToggle} />
        </div>
        
        <div className="p-4">
          <Navigation mobile={true} />
        </div>
      </div>
    </div>
  )
}
