import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'

const Expertise = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 })
  const containerRef = useRef(null)

  // Parallax for the entire section content
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const yContent = useTransform(scrollYProgress, [0, 1], [50, -50])

  const expertiseAreas = [
    {
      id: 'creation',
      title: 'Création & Production',
      subtitle: 'Design & Audiovisuel',
      color: '#E84B1E',
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      image: '/images/expertise-1.webp',
      services: [
        'Conception graphique',
        'Charte branding',
        'Design visuel',
        'Films publicitaires'
      ],
      description: 'De la conception au design graphique, nous créons des visuels institutionnels ou publicitaires pour tous supports.',
    },
    {
      id: 'conseil',
      title: 'Conseil & Stratégie',
      subtitle: 'Communication & RP',
      color: '#E84B1E',
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" />
        </svg>
      ),
      image: '/images/expertise-2.webp',
      services: [
        'Capital Image',
        'Stratégie 360°',
        'Médiaplanning',
        'Relations Presse',
        'Brand Content',
      ],
      description: 'Conseil stratégique, gestion d\'image et relations presse pour positionner votre marque.',
    },
    {
      id: 'digital',
      title: 'Digital & Event',
      subtitle: 'Web & Expérience',
      color: '#E84B1E',
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      image: '/images/expertise-3.webp',
      services: [
        'Sites Web Immérsifs',
        'Social Media',
        'SEO & SEA',
        'Événementiel',
        'Scénographie',
      ],
      description: 'Présence digitale optimisée et événements sur-mesure pour une expérience 360°.',
    },
  ]

  const CardComponent = ({ area, index }) => {
    const cardRef = useRef(null)
    const innerRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    // Check for reduced motion preference
    useState(() => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)

      const handleChange = (e) => setPrefersReducedMotion(e.matches)
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    // Use CSS custom properties instead of React state to avoid re-renders
    const handleMouseMove = (e) => {
      if (!cardRef.current || !innerRef.current || prefersReducedMotion) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      // Update CSS custom properties directly - no React re-render!
      innerRef.current.style.setProperty('--mouse-x', `${x}%`)
      innerRef.current.style.setProperty('--mouse-y', `${y}%`)
      innerRef.current.style.setProperty('--rotate-x', `${(y - 50) / 20}deg`)
      innerRef.current.style.setProperty('--rotate-y', `${-(x - 50) / 20}deg`)
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      if (innerRef.current) {
        innerRef.current.style.setProperty('--mouse-x', '50%')
        innerRef.current.style.setProperty('--mouse-y', '50%')
        innerRef.current.style.setProperty('--rotate-x', '0deg')
        innerRef.current.style.setProperty('--rotate-y', '0deg')
      }
    }

    const handleFocus = () => {
      setIsFocused(true)
    }

    const handleBlur = () => {
      setIsFocused(false)
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        // Scroll to the section or expand details
        const element = document.getElementById('services')
        if (element) {
          element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
        }
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{
          delay: 0.1 + index * 0.2,
          duration: 0.8,
          type: "spring",
          stiffness: 50
        }}
        className="relative h-full perspective-container"
        style={{ perspective: '2000px' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        ref={cardRef}
        tabIndex={0}
        role="article"
        aria-label={`Expertise: ${area.title}`}
      >
        <div
          ref={innerRef}
          className="card-inner relative overflow-hidden rounded-[2rem] p-8 md:p-12 h-full min-h-[500px] flex flex-col justify-between will-change-transform focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-midnight"
          style={{
            transform: (isHovered || isFocused) && !prefersReducedMotion
              ? 'rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale(1.02)'
              : 'rotateX(0deg) rotateY(0deg) scale(1)',
            boxShadow: (isHovered || isFocused)
              ? `0 20px 50px -10px ${area.color}40`
              : '0 10px 30px -10px rgba(0,0,0,0.5)',
            border: isFocused
              ? '2px solid rgba(232, 75, 30, 0.5)'
              : '1px solid rgba(255, 255, 255, 0.05)',
            background: '#000',
            transition: prefersReducedMotion ? 'none' : 'transform 0.2s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out'
          }}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={area.image}
              alt={area.title}
              loading="lazy"
              className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-10"></div>
            <div
              className={`absolute inset-0 opacity-20 mix-blend-overlay z-10 transition-opacity duration-500 ${isHovered ? 'opacity-30' : 'opacity-10'}`}
              style={{ backgroundColor: area.color }}
            ></div>
          </div>

          {/* Dynamic Spotlight Effect */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${area.color}20, transparent 40%)`,
              opacity: (isHovered || isFocused) ? 1 : 0,
              transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease-out'
            }}
          />

          {/* Content */}
          <div className="relative z-20">
            <div className="flex justify-between items-start mb-8">
              <span className="text-4xl filter drop-shadow-md transform transition-transform duration-300 group-hover:scale-110">{area.icon}</span>
              <span className={`font-mono text-sm opacity-50 px-3 py-1 rounded-full border border-white/10 ${isHovered ? 'text-white border-orange/50 bg-orange/10' : ''} transition-all duration-300`}>
                0{index + 1}
              </span>
            </div>

            <span className="text-xs font-syncopate text-orange uppercase tracking-widest block mb-2">
              {area.subtitle}
            </span>
            <h3 className="font-outfit text-3xl font-bold text-white mb-6 leading-tight group-hover:text-orange transition-colors duration-300">
              {area.title}
            </h3>
            <p className="font-inter text-white/80 leading-relaxed text-sm lg:text-base drop-shadow-sm">
              {area.description}
            </p>
          </div>

          {/* Bottom Features List */}
          <div className="relative z-20 mt-12 pt-8 border-t border-white/10">
            <ul className="grid gap-3">
              {area.services.map((service, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-white/90 group-hover:text-white transition-colors font-medium">
                  <span className={`w-1.5 h-1.5 rounded-full bg-white/40 ${isHovered ? 'bg-orange animate-pulse' : ''} transition-colors duration-300`} />
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative py-32 bg-midnight overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6" ref={containerRef}>
        {/* Header */}
        <motion.div
          style={{ y: yContent }}
          className="mb-24 md:flex justify-between items-end"
        >
          <div className="md:w-2/3">
            <h2 className="font-syncopate text-3xl md:text-5xl lg:text-7xl font-bold uppercase text-white mb-6">
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-red-600">Expertises</span>
            </h2>
            <p className="font-inter text-lg text-white/50 max-w-xl border-l-2 border-white/10 pl-6">
              Nous combinons stratégie, design et technologie pour créer des expériences de marque impactantes.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="hidden md:block"
          >
            <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center animate-spin-slow">
              <svg viewBox="0 0 100 100" className="w-20 h-20 text-white/20 fill-current">
                <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                <text>
                  <textPath xlinkHref="#curve" className="text-[10px] uppercase font-mono tracking-widest">
                    • Design • Strategy • Digital •
                  </textPath>
                </text>
              </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {expertiseAreas.map((area, index) => (
            <CardComponent key={area.id} area={area} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Expertise
