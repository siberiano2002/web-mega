import Link from "next/link"

const navigation = [
  { name: "Inicio", href: "#inicio" },
  { name: "Soluciones", href: "#soluciones" },
  { name: "Tecnología", href: "#tecnologia" },
  { name: "Proyectos", href: "#proyectos" },
  { name: "Contacto", href: "#contacto" },
]

export function Navigation({ mobile = false }: { mobile?: boolean }) {
  const baseClasses = mobile
    ? "block text-base font-medium text-foreground hover:text-accent transition-colors px-3 py-2"
    : "text-sm font-medium text-foreground hover:text-accent transition-colors"

  return (
    <nav className={mobile ? "space-y-1" : "hidden lg:flex lg:items-center lg:space-x-8"}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={baseClasses}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
