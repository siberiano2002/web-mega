// CSS Crítico para optimizar LCP
export const criticalCSS = `
  /* Reset crítico para render inmediato */
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-display: swap;
    line-height: 1.5;
    color: #0f172a;
    background: #ffffff;
  }
  
  /* Contenedor principal */
  .main-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  /* Hero section - crítico para LCP */
  .hero-section {
    min-height: 60vh;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Imagen hero - elemento LCP principal */
  .hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }
  
  /* Contenido hero */
  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: white;
    padding: 2rem;
  }
  
  .hero-title {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
  
  .hero-description {
    font-size: clamp(1rem, 2vw, 1.25rem);
    margin-bottom: 2rem;
    opacity: 0.9;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  /* Botones CTA */
  .hero-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: #3b82f6;
    color: white;
    text-decoration: none;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  
  .hero-cta:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }
  
  /* Prevenir layout shift */
  .skeleton {
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  /* Optimización para móviles */
  @media (max-width: 768px) {
    .hero-content {
      padding: 1rem;
    }
    
    .hero-title {
      font-size: clamp(1.5rem, 8vw, 2.5rem);
    }
    
    .hero-description {
      font-size: clamp(0.875rem, 4vw, 1rem);
    }
  }
`

// Componente para CSS crítico
export function CriticalCSS({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      <div className="font-loaded">
        {children}
      </div>
    </>
  )
}
