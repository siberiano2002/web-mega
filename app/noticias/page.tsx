"use client"

import { useState, useEffect } from "react"
import { ArrowUp, ChevronDown, X, ExternalLink } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import Link from "next/link"
import Image from "next/image"

const projects = [
  {
    title: "Educación y empresas: alianzas que transforman comunidades",
    location: "Lincoln, Buenos Aires",
    category: "Energía Solar",
    description: "Diciembre 2024. La colaboración entre MEGA y la Escuela Técnica 1 José María Cané transforma comunidades a través del programa Gen Técnico.",
    fullContent: "La colaboración entre instituciones educativas y empresas tiene el poder de generar un impacto profundo en las comunidades. Al unir la teoría con la práctica, se capacita a los jóvenes para los desafíos del mercado laboral, se fomenta la innovación y se construyen soluciones sostenibles.\n\nUn ejemplo destacado es la alianza entre MEGA y la Escuela Técnica 1 José María Cané en Lincoln, Buenos Aires. A través del programa Gen Técnico de ProPymes, durante más de 10 años, se ha capacitado a 500 alumnos y docentes, realizado 110 prácticas profesionalizantes y equipado aulas con tecnología de última generación.\n\nEl logro más reciente de esta alianza es la instalación de un nuevo parque solar en las oficinas de MEGA, que persigue un doble objetivo: reducir el consumo eléctrico tradicional en un 15% mediante el uso de energía limpia y ofrecer a los alumnos la oportunidad de realizar prácticas profesionalizantes. En este proyecto, los estudiantes trabajaron junto a personal especializado en energías renovables, adquiriendo experiencia práctica mientras contribuyen a la sostenibilidad energética de la empresa.\n\nEl proyecto hizo foco en:\n\n- Capacitación integral: formación en seguridad, normas ISO, trabajo en altura y herramientas tecnológicas como Excel, Autocad e Inventor.\n\n- Participación activa: los alumnos lideraron desde la planificación hasta la implementación y monitoreo del proyecto.\n\n- Impacto sostenible: además de optimizar costos operativos, se fomentó la creatividad, el pensamiento crítico y la responsabilidad ambiental.\n\nEste modelo de colaboración demuestra cómo la sinergia entre educación y empresas puede transformar comunidades. Al brindar oportunidades de aprendizaje práctico y acceso a tecnología de vanguardia, se prepara a los alumnos para el futuro y se promueven soluciones innovadoras y sostenibles.\n\nPara MEGA es un orgullo ser parte del programa Gen Técnico, que no sólo capacita a los jóvenes para enfrentar próximos desafíos, sino que también se potencia su talento, creatividad y compromiso con un mundo más innovador y sostenible.",
    image: "/images/educacionyempresas.jpg",
    size: "large",
    url: "/energias-renovables#biomasa",
  },
  {
    title: "Capacitaciones gratuitas de MEGA",
    location: "Lincoln, Buenos Aires",
    category: "Secado de Granos",
    description: "MEGA reafirma su compromiso de ofrecer capacitación gratuita a clientes sobre uso y mantenimiento de equipos de secado, destacando en el sector agropecuario.",
    fullContent: "En MEGA reafirmamos nuestro compromiso de ofrecer capacitación gratuita a nuestros clientes sobre el uso y mantenimiento de los equipos de secado. Estos cursos son parte fundamental de nuestro servicio, lo que nos permite destacar en el sector agropecuario al enfocarnos en la educación y el soporte técnico especializado.\n\nAprendizaje continuo para un éxito compartido\n\nNuestras capacitaciones, de una jornada completa, están diseñadas para brindar a los operadores y supervisores de secadoras MEGA las herramientas necesarias para maximizar la eficiencia y el rendimiento de los equipos.\n\nDurante estas sesiones, los participantes aprenden sobre el manejo eficiente de las secadoras, incluyendo la revisión de componentes y técnicas para optimizar el proceso de secado, garantizando un uso eficiente de la energía y protegiendo la calidad de los granos. También ofrecemos formación en mantenimiento preventivo, instruyendo sobre seguridad y mejores prácticas para mantener los equipos en condiciones óptimas, lo que ayuda a reducir costos operativos a largo plazo. Además, abordamos las innovaciones tecnológicas implementadas en los sistemas de control de nuestras secadoras, para que los operadores puedan gestionar los equipos de manera más intuitiva y segura.\n\nMarcelo Lombardo, director fundador de MEGA, destaca: \"Estos espacios de aprendizaje son enriquecedores para ambas partes. Los operadores de las secadoras no solo resuelven dudas y comparten experiencias, sino que también brindan un valioso feedback que nos permite mejorar continuamente nuestra tecnología y servicio\".\n\nNuestras capacitaciones se ofrecen a principios y finales de año, lo que facilita a los clientes programar su participación con antelación. Además, brindamos la flexibilidad de realizar las sesiones tanto en las instalaciones de los clientes como en nuestras propias instalaciones en Lincoln, adaptándonos a las necesidades operativas y logísticas de cada cliente.\n\nNuestros instructores son ingenieros expertos que diseñan y producen las secadoras MEGA, lo que garantiza que los participantes reciban formación de alto nivel, basada en un profundo conocimiento técnico y práctico del producto. Esta experiencia directa permite a los asistentes aprender las mejores prácticas de quienes conocen a fondo cada detalle del funcionamiento de los equipos.\n\nUn compromiso con la calidad y el medio ambiente\n\nMEGA cuenta con certificaciones ISO 9001 e ISO 14001, lo que respalda nuestro compromiso con la calidad y el cuidado del medio ambiente. Nos mantenemos a la vanguardia en tecnología y procesos, asegurando un servicio postventa excepcional y atención personalizada para cada cliente.\n\nComo menciona Gabriela Moreno, Gerente de Planeamiento de MEGA: \"Acompañar a nuestros clientes durante todo el ciclo de vida de las secadoras es nuestra forma de asegurar que puedan obtener el máximo provecho de su inversión\".",
    image: "/images/6708074350c14_IMG20241004125700.jpg",
    size: "medium",
    url: "/secadoras",
    expanded: false,
  },
  {
    title: "Nueva herramienta de financiación para el exterior",
    location: "Lincoln, Buenos Aires",
    category: "Financiación",
    description: "Contamos con una línea para financiar bienes de capital a largo plazo con tasas muy competitivas.",
    fullContent: "Contamos con una línea para financiar bienes de capital a largo plazo con tasas muy competitivas. Para mayores detalles contactarnos a través de marketing@ingenieriamega.com",
    image: "/images/5a3a5d3f32ffd_BICEFINANCIACION2017.jpg",
    size: "medium",
    url: "/secadoras",
  },
  {
    title: "GEAPS",
    location: "Argentina y USA",
    category: "Asociación Internacional",
    description: "MEGA es miembro de GEAPS desde 2003, participando en eventos anuales en USA para generar alianzas y nuevos negocios.",
    fullContent: "GEAPS (Grain Elevator and Processing Society) es una asociación creada en 1927 para ayudar a las empresas a hacer frente a los retos relacionados con las operaciones de la industria de los granos.\n\nHoy en día, la red de miembros de GEAPS comprende unos 16 países. Sus integrantes realizan alianzas estratégicas con otras organizaciones similares e intercambian ideas e información útil para la industria cerealera a través de una serie de programas y servicios, que incluyen redes interpersonales, conferencias, seminarios, ferias, publicaciones y sitio web www.geaps.com. En Argentina la Asociación Argentina de Poscosecha de Granos (APOSGRAN www.aposgran.org.ar) es el organismo a través del cual se realizan estos intercambios.\n\nIngeniería MEGA es miembro de GEAPS desde 2003 y hemos participado en los eventos anuales que se realizan en USA, dándonos la posibilidad de relacionarnos con empresas del sector, generar alianzas y nuevos negocios.",
    image: "/images/59d4f254b20b6_IMG20150221102103.jpg",
    size: "medium",
    url: "/internacional",
  },
  {
    title: "El Futuro Solar Argentina 2017 – CABA",
    location: "Buenos Aires, Argentina",
    category: "Energía Solar",
    description: "MEGA participó en la feria solar más importante de Argentina junto a Krinner, estableciendo contactos con empresas nacionales e internacionales.",
    fullContent: "Actualmente, en lo que a energía fotovoltaica se refiere, la Argentina se ha convertido en uno de los mercados solares más activos de Latinoamérica impulsado por el gobierno.\n\nEsta feria, dirigida a empresas nacionales y extranjeras que quieren invertir en energía solar fotovoltaica en nuestro país, tuvo lugar del 28 al 30 de Marzo en el Hotel Emperador de CABA. Contó con la participaron más de 200 ejecutivos con experiencia representando a más de 20 países.\n\nEstuvimos presentes junto con la reconocida empresa alemana Krinner con la cual firmamos un acuerdo comercial en 2016 para el suministro de componentes y máquinas especiales, para la construcción de parques fotovoltaicos en nuestro país.\n\nOtro de los aspectos de la asociación Mega-Krinner que despertó mucho interés entre los participantes son las características del marco regulatorio argentino de exigencia de componentes nacionales y los beneficios fiscales que implica para los desarrolladores de proyectos.\n\nEste evento nos permitió establecer contacto con empresas nacionales e internacionales de energías.",
    image: "/images/solar-field.jpg",
    size: "medium",
    url: "/energias-renovables",
  },
  {
    title: "ExpoActiva 2017–Uruguay",
    location: "Mercedes, Uruguay",
    category: "Feria Agroindustrial",
    description: "MEGA participó como expositor en el Stand de Argentina en ExpoActiva 2017, mostrando interés en hornos para quema de biomasa.",
    fullContent: "ExpoActiva 2017–Uruguay\n\nEsta feria, similar a la Expoagro pero de menor magnitud, se realizó en Uruguay del 15 al 18 de marzo de 2017 en un predio ubicado a medio camino entre Mercedes y Palmitas. Habitualmente participan la mayoría de las marcas de maquinarias para el agro.\n\nEn el Stand de Argentina participaron dos empresas como expositoras, un fabricante de pellets de madera y MEGA. Nos visitaron varios clientes de primera línea que mostraron interés por los nuestros hornos para quema de biomasa.",
    image: "/images/59247c2e266af_20170315101353.jpg",
    size: "medium",
    url: "/internacional",
  },
  {
    title: "ExpoAgro 2017",
    location: "Argentina",
    category: "Feria Agroindustrial",
    description: "MEGA participó en ExpoAgro 2017 presentando secadoras y hornos para biomasa, recibiendo visitas de empresas internacionales.",
    fullContent: "Las distintas herramientas financieras ofrecidas por los bancos han acompañado al espíritu inversor que el campo presenta en esta época.\n\nA pesar de la gran tormenta que provocó destrozos en muchos stands (la peor en la historia de la Expoagro) el nuestro no sufrió daños.\n\nPresentamos toda nuestra línea de productos relacionados con el secado de granos (secadoras y hornos para quema de biomasa). Recibimos un número importante número de visitas, incluyendo empresas de Ecuador, Rumania y Polonia. También participamos de rondas de negocios con empresas contrapartes de Nueva Zelanda y Rusia.",
    image: "/images/Caracteristicas.jpg",
    size: "medium",
    url: "/secadoras",
  },
  {
    title: "Fabricación Mixta TMSA (Brasil) – MEGA",
    location: "Porto Alegre, Brasil",
    category: "Asociación Internacional",
    description: "Proyecto de fabricación mixta con TMSA para participar en el mercado brasileño, con primeros módulos fabricados en 2016.",
    fullContent: "Con el objeto de tener más participación en la venta de secadoras en el mercado brasileño (uno de los más importantes productores de granos y usuarios de secadoras a nivel mundial), a partir de 2015 se comenzó con el proyecto de fabricación mixta de la secadora Mega.\n\nCon la ayuda de todos los integrantes de Mega y la gran colaboración del personal de TMSA, a mediados de 2016 se fabricaron los primeros módulos de secado en Brasil. TMSA es una reconocida empresa de ingeniería metalúrgica radicada en Porto Alegre, Brasil (www.tmsa.com.br).\n\nDurante 2016 se fabricaron y montaron varias torres de secado, de distintos modelos, en los distintos segmentos del mercado Brasileño, las cuales actualmente están en funcionamiento manteniendo la calidad del producto plazo de entrega, puesta en marcha y performance de las torres de secado.\n\nLa fabricación mixta de la secadora Mega, nos permite crecer en el mercado brasileño teniendo como socia a una Empresa muy reconocida en Brasil por su seriedad con el cliente a lo largo del tiempo.\n\nSe prevé para 2017 un incremento de ventas en Brasil, dada la buena aceptación de los clientes por recibir en sus instalaciones un producto con parte de fabricación nacional y financiado localmente.",
    image: "/images/592477e4556f3_1001703.jfif",
    size: "medium",
    url: "/secadoras",
  },
  {
    title: "Presentes en EXPOINTER, Esteio - Brasil",
    location: "Esteio, Brasil",
    category: "Feria Agroindustrial",
    description: "MEGA participó en EXPOINTER 2016, una de las ferias más importantes de América Latina, compartiendo stand con TMSA y recibiendo la visita del Ministro de Agricultura de Argentina.",
    fullContent: "Esta feria, una de las más importantes de América Latina y en la cual se exponen las últimas novedades de la tecnología agrícola y agroindustrial, fue realizada en Esteio, Brasil desde el 27 de agosto hasta el 4 de septiembre de 2016.\n\nAquí también estuvimos presentes compartiendo el stand con la empresa TMSA de Brasil. Recibimos numerosas visitas interesadas en nuestras secadoras, entre las cuales destacamos la visita del Ministro de Agricultura de Argentina, con el cual se conversó sobre líneas de crédito, tasas y plazos para financiamiento.",
    image: "/images/5924733dda5a7_20160831TMSASimersExpointerfotoNiltonSantolinIMG6852.jpg",
    size: "medium",
    url: "/secadoras",
  },
  {
    title: "Mega y la industria cacaotera en la IV Cumbre Mundial del Cacao",
    location: "Guayaquil, Ecuador",
    category: "Feria Internacional",
    description: "MEGA participó en la IV Cumbre Mundial del Cacao 2016, realizando demostraciones de secado de cacao y recibiendo visitas de productores de América Latina.",
    fullContent: "Del 29 al 31 de agosto de 2016 tuvo lugar en Guayaquil uno de los eventos internacionales más importantes para la industria del cacao, en el cual se presentan los últimos adelantos en la investigación técnica, científica y comercial de este fruto.\n\nNuestro stand fue visitado por productores de cacao y café de países como Guatemala, República Dominicana, Colombia y Nicaragua.\n\nEn Ecuador, el mercado del cacao proyecta un crecimiento de 120.000 a 200.000 Tn anuales con el objeto de alcanzar el puesto n° 3 en la producción mundial de esta semilla (actualmente se encuentran en el quinto lugar). Además este país es el mayor exportador de cacao fino de aroma del mundo, cuyo color característico es el amarillo. Por su aroma y sabor únicos es muy apreciado a nivel mundial para la producción del chocolate gourmet.\n\nComo actividad complementaria de la feria, realizamos demostraciones de secado de cacao con una Secadora Mega instalada para ese propósito.",
    image: "/images/592471de85052_20160829174057.jpg",
    size: "medium",
    url: "/secadoras",
  },
  {
    title: "Agroactiva 2016 – La máquina de llevar gente",
    location: "Monje, Santa Fe",
    category: "Feria Agroindustrial",
    description: "MEGA participó en Agroactiva 2016 presentando nuevos productos: Horno para Quema de Biomasa y Tablero Eléctrico Táctil, con financiamiento gubernamental.",
    fullContent: "Este año la Agroactiva tuvo lugar en Monje, Provincia de Santa Fe. Con el objeto de seguir impulsando al sector agropecuario, uno de los principales motores de nuestra economía, el gobierno aún mantiene la financiación para los productores con una tasa reducida y en pesos.\n\nEn nuestro stand hemos recibido varias visitas de clientes usuarios y potenciales clientes. En esta exposición también realizamos la presentación de nuestros nuevos productos: Horno para Quema de Biomasa y Tablero Eléctrico Táctil.",
    image: "/images/57bf3a12567e9_Agroactivafoto.png",
    size: "medium",
    url: "/secadoras",
  },
  {
    title: "Expo Santa Rita 2016 – Mega presente en Paraguay",
    location: "Santa Rita, Paraguay",
    category: "Feria Agroindustrial",
    description: "MEGA participó en Expo Santa Rita 2016, una de las ferias más importantes de agro-negocios de la región, con presencia en el Pabellón Oficial Argentino.",
    fullContent: "Esta feria tuvo lugar en el mes mayo en la localidad de Santa Rita, Paraguay. Es una de las más importantes en volumen de agro-negocios de la región. El evento cuenta con la participación de los empresarios más destacados del sector que asisten a fin de conocer los últimos avances en materia de agricultura y actividades afines.\n\nVíctor Hermida, nuestro representante en Uruguay y Paraguay, estuvo presente en nuestro stand ubicado en el Pabellón Oficial Argentino en el cual recibió la visita de algunos de nuestros clientes.",
    image: "/images/57bf39492d003_SantaRitafotostand.png",
    size: "medium",
    url: "/secadoras",
  },
  {
    title: "Nuevo Sistema de Control para las Secadoras de Granos fabricadas por Ingeniería Mega",
    location: "Lincoln, Buenos Aires",
    category: "Innovación Tecnológica",
    description: "MEGA lanza un revolucionario Sistema de Control con pantalla táctil para facilitar y asegurar el uso de secadoras, con soporte remoto y futuras integraciones móviles.",
    fullContent: "El nuevo Sistema de Control que estamos incorporando tiene como principal objetivo hacer más fácil y seguro el uso de nuestra línea de Secadoras. Es de alguna manera aggiornarlo al mundo actual. A través de una pantalla táctil -moderna e intuitiva- logramos que cualquier operador con un mínimo entrenamiento pueda rápidamente controlar la Secadora y con la tranquilidad que el propio sistema garantiza que el proceso sea seguro de inicio a fin. Este sistema no es un producto por sí solo, es un complemento para acompañar las soluciones anteriores, potenciar aún más la sinergia entre nuestros productos y obviamente ponernos en el mismo escalón ante competidores europeos o norteamericanos que cuentan con soluciones similares.\n\nA futuro nuestra área de Servicios e Instalaciones va a poder brindar un soporte más rápido y eficiente. Mediante el análisis de un registro histórico de datos -que se va guardando automáticamente- con todas las variables de la Secadora y acciones del Operador nosotros podemos, sea que estemos en la Planta o remotamente a través de Internet, hacer un diagnóstico del funcionamiento de nuestro equipo. Sabemos que la Secadora es una parte importante de la Planta pero no la única. Son muchos los sistemas y/o procesos que intervienen antes y después del secado y entendemos perfectamente que muchas empresas quieran controlar todo desde un Centro de Control mediante su propio SCADA.\n\nEste nuevo Sistema de Control que ahora proveemos con nuestros equipos de secado, permite integrarse con el resto de la automatización implementada en la Planta. Es una primera versión y de hecho para no demorar la salida al mercado hemos dejado para más adelante algunos temas que ya estamos trabajando. Uno de ellos es: el control automático de secado que siempre estamos estudiando y sabemos por nuestra amplia experiencia en el secado de granos, que es un tema no fácil de resolver pero que los clientes necesitan. Seguramente en una primera etapa, integremos una solución canadiense que ya existe en el mercado pero obviamente optimizada a nuestras Secadoras de Granos MEGA.\n\nOtro de los temas es contar con la posibilidad de supervisar remotamente e independientemente de donde uno se encuentre, el funcionamiento de la Secadora mediante una aplicación para telefonía móvil. Estos y otros temas seguramente serán incorporados en futuras versiones.",
    image: "/images/57633bed514ba_noticias3.png",
    size: "medium",
    url: "/secadoras",
  },
  {
    title: "La tecnología MEGA viaja por el mundo - Destino 2016: Houston",
    location: "Houston, Estados Unidos",
    category: "Feria Internacional",
    description: "MEGA participó en la Rice Market & Technology Convention 2016 en Houston, organizando el Seminario 'Pos-cosecha' junto con AGI AG Growth International.",
    fullContent: "La Rice Market & Technology Convention (RMTC) es la feria internacional de arroz más importante del mundo. Ingeniería Mega participa de esta muestra desde sus inicios en 2013. La primera se realizó en Miami, la segunda en Costa Rica, la tercera en Cancún. Este evento que atrae a economistas, funcionarios gubernamentales, científicos y empresas de la industria arrocera de todo el mundo, da a conocer anualmente el desarrollo de nuevas tecnologías para cultivos, moliendas, semillas y secado entre otros.\n\nEste año la Convención tuvo lugar en los Estados Unidos, más precisamente en la ciudad texana de Houston. El Hotel Royal Sonesta Houston fue elegido sede de este suceso en el cual organizamos el Seminario \"Pos-cosecha\" junto con la empresa AGI AG Growth International. Los conferencistas que compartieron su experiencia y sus conocimientos en secado, almacenaje y aspiración de polvo de arroz, fueron los Señores Álvaro Castillo, de Colombia, Mauricio Heidenreich, experto en secado de arroz de nuestra empresa, Scott Hanson Gerente de Ventas Industriales de Airlanco y Harry Harms Consultor de Almacenamiento de Granos de AGI.\n\nEn el Stand estuvieron presentes los señores Marcelo Lombardo (Director) y Mauricio Heidenreich (Responsable de Comercio Externo) junto con Ricardo Reggeti, nuestro representante en USA, y el Ing. Edmundo Neves de la firma TMSA, en el cual hemos recibido muchas visitas internacionales las cuales nos dieron la posibilidad de mostrar nuestros productos dentro del mercado agropecuario.",
    image: "/images/57633b8e81956_noticias2.jpg",
    size: "medium",
    url: "/secadoras",
  },
  {
    title: "ExpoAgro 2016 – Vientos de esperanza",
    location: "Argentina",
    category: "Feria Agroindustrial",
    description: "ExpoAgro 2016 reflejó un cambio favorable en el sector agropecuario con modificaciones macroeconómicas, lanzando Tablero Touch Screen y Hornos de Biomasa.",
    fullContent: "Este año la ExpoAgro reflejó un cambio favorable en el ánimo del sector agropecuario debido a las modificaciones macroeconómicas, como la quita o reducción de retenciones según el tipo de cultivo, la devaluación de nuestra moneda y la implementación de líneas de crédito a tasas subsidiadas a través del Banco Nación a 5 años. Gracias a este cambio de escenario y a la renovación de las expectativas de los productores, muchas de las empresas participantes realizaron numerosas cotizaciones y concretaron varias ventas.\n\nEn nuestro stand recibimos visitas internacionales de Estado Unidos y Guatemala, como así también clientes nacionales de varias provincias. Además, presentamos dos nuevos productos: un Tablero Eléctrico con pantalla Touch Screen de 10\", de operación simple y clara, que incluye todos los mensajes y alarmas, termometría full, monitoreo de humedad de entrada y salida, descarga Manual/Automática, control full de quemadores, registro de todas las variables exportables a Excel, posibilidad de controlar y monitorear en forma remota por SCADA, PLC de cliente, etc., y una línea de Horno para Quema de Biomasa que combina eficiencia operativa con bajo costo, generando energía calórica a partir de biomasa vegetal como marlos de maíz, cascarilla de arroz, chips de madera, leña, entre otros.\n\nCon este auspicioso panorama esperemos que la agroindustria de nuestro país vuelva a encender sus motores, generando nuevos puestos de trabajo y reactivando la economía.",
    image: "/images/57633b46d66ea_noticias1.jpg",
    size: "medium",
    url: "/secadoras",
  },
]

export default function NoticiasPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const handleOpenModal = (project: any) => {
    setSelectedProject(project)
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
  }

  return (
    <main className="overflow-hidden">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative py-24 sm:py-32 lg:py-40 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/36edfbc7-63ce-4178-9fd4-b26413346b98.png')`
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-left mb-16">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                <span className="text-white">Noticias</span>
              </h1>
              <p className="mt-6 text-lg text-gray-200 max-w-2xl text-left">
                Mantente informado sobre nuestros proyectos más recientes, capacitaciones, y las alianzas que estamos 
                construyendo para llevar soluciones de ingeniería a toda la comunidad.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 3}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                      {project.category}
                    </span>
                    {project.location && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 111.414 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-xs">{project.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Read More Button */}
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
                  >
                    <ChevronDown className="h-4 w-4" />
                    Seguir leyendo...
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                      {selectedProject.category}
                    </span>
                    {selectedProject.location && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 111.414 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{selectedProject.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedProject.title}
                  </h2>
                </div>
                
                <button
                  onClick={handleCloseModal}
                  className="ml-4 w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors flex items-center justify-center flex-shrink-0"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedProject.fullContent}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-accent text-accent-foreground rounded-full shadow-lg transition-all duration-300 hover:bg-accent/90 hover:scale-110 ${
          showScrollTop 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Volver al inicio"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </main>
  )
}
