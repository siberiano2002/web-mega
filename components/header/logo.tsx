import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg sm:text-xl">M</span>
      </div>
      <span className="text-xl sm:text-2xl font-bold text-foreground">
        MEGA
      </span>
    </Link>
  )
}
