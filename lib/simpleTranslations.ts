export const simpleTranslations = {
  es: {
    navInicio: "Inicio",
    navSoluciones: "Soluciones", 
    navTecnologia: "Tecnología",
    navInternacional: "Internacional",
    navNoticias: "Noticias",
    navContacto: "Contacto",
    navIdiomas: "Idiomas",
    ctaCotizacion: "Solicitar Cotización",
    heroTitle: "Ingeniería de Excelencia",
    heroSubtitle: "Soluciones innovadoras en secado de granos y energías renovables"
  },
  en: {
    navInicio: "Home",
    navSoluciones: "Solutions",
    navTecnologia: "Technology", 
    navInternacional: "International",
    navNoticias: "News",
    navContacto: "Contact",
    navIdiomas: "Languages",
    ctaCotizacion: "Request Quote",
    heroTitle: "Engineering Excellence",
    heroSubtitle: "Innovative solutions in grain drying and renewable energy"
  },
  pt: {
    navInicio: "Início",
    navSoluciones: "Soluções",
    navTecnologia: "Tecnologia",
    navInternacional: "Internacional", 
    navNoticias: "Notícias",
    navContacto: "Contato",
    navIdiomas: "Idiomas",
    ctaCotizacion: "Solicitar Cotação",
    heroTitle: "Engenharia de Excelência",
    heroSubtitle: "Soluções inovadoras em secagem de grãos e energias renováveis"
  }
}

export function getTranslation(lang: string, key: string): string {
  console.log(`getTranslation called with lang: ${lang}, key: ${key}`)
  const translations = simpleTranslations[lang as keyof typeof simpleTranslations]
  console.log("Translations found for lang:", translations)
  const result = translations?.[key as keyof typeof translations] || key
  console.log("Translation result:", result)
  return result
}
