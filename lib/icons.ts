// ✅ Icon imports optimizados - solo los necesarios
import { 
  ArrowRight, 
  Play, 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle,
  Zap,
  Shield,
  Globe,
  Award,
  Wrench,
  Eye,
  Linkedin,
  Youtube,
  Facebook,
  Twitter,
  Instagram,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Cpu,
  Gauge,
  Wifi,
  BarChart3,
  Building2,
  Users,
  Leaf
} from "lucide-react"

// ✅ Iconos específicos por sección para tree shaking
export const heroIcons = {
  ArrowRight,
  Play
} as const

export const headerIcons = {
  Menu,
  X,
  ChevronDown
} as const

export const contactIcons = {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight
} as const

export const footerIcons = {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Youtube,
  Facebook,
  ArrowUpRight,
  X
} as const

export const techIcons = {
  Cpu,
  Gauge,
  Shield,
  Zap,
  Wifi,
  BarChart3
} as const

export const featureIcons = {
  Building2,
  Users,
  Leaf,
  Award,
  ArrowRight
} as const
