import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { navLinks } from '../data/navigation'

const Header = ({ onOpenPresentation }) => {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (latest > previous && latest > 150) {
      setVisible(false) // Hide on scroll down
    } else {
      setVisible(true) // Show on scroll up
    }
    setScrolled(latest > 50)
  })

  // Filter out Contact for header nav and add presentation
  const headerNavLinks = [
    ...navLinks.filter(link => link.name !== 'Contact'),
    { name: 'Présentation', onClick: onOpenPresentation },
  ]

    return (
        <>
            <motion.header
                initial={{ y: 0 }}
                animate={{
                    y: visible ? 0 : -150
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-[100] px-6 py-3 md:py-4 pointer-events-none transition-all duration-300`}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Logo - Morphs on scroll */}
                    <motion.a
                        href="#"
                        className="pointer-events-auto flex items-center group origin-left"
                        animate={{
                            scale: scrolled ? 0.6 : 1,
                            y: scrolled ? -2 : 0
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        <img
                            src="/images/logo.webp"
                            alt="KUNST.Digital"
                            className="h-14 md:h-24 w-auto object-contain"
                        />
                    </motion.a>

                    {/* Desktop Floating Navigation Capsule */}
                    <motion.nav
                        animate={{
                            scale: scrolled ? 0.95 : 1,
                            backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.05)' : 'rgba(30, 30, 30, 0.4)'
                        }}
                        className={`hidden xl:flex items-center gap-1 px-1 py-1.5 rounded-full border border-white/10 backdrop-blur-xl pointer-events-auto transition-all duration-500`}
                    >
                        {headerNavLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href || "#"}
                                onClick={(e) => {
                                    if (link.onClick) {
                                        e.preventDefault()
                                        link.onClick()
                                    }
                                }}
                                className="relative px-5 py-2 rounded-full font-outfit text-sm font-medium text-white/70 hover:text-white transition-all duration-300 group cursor-pointer"
                            >
                                <span className="relative z-10">{link.name}</span>
                                <motion.span
                                    className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                            </a>
                        ))}

                        <div className="w-px h-6 bg-white/10 mx-2"></div>

                        <a
                            href="#contact"
                            className="relative px-6 py-2 rounded-full bg-orange text-white font-outfit font-bold text-sm uppercase tracking-wider overflow-hidden group/btn"
                        >
                            <span className="relative z-10">Devis online</span>
                            <motion.div
                                className="absolute inset-0 bg-white"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                            />
                        </a>
                    </motion.nav>

                    {/* Mobile Toggle */}
                    <button
                        className="xl:hidden pointer-events-auto w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-full bg-orange text-white shadow-lg shadow-orange/20"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                        aria-controls="mobile-menu"
                    >
                        <motion.span
                            animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            className="w-6 h-0.5 bg-current transition-transform"
                        />
                        <motion.span
                            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-6 h-0.5 bg-current"
                        />
                        <motion.span
                            animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                            className="w-6 h-0.5 bg-current transition-transform"
                        />
                    </button>
                </div>
            </motion.header>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="fixed inset-0 z-[150] bg-midnight flex flex-col items-center justify-center p-12"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menu de navigation mobile"
                    >
                        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
                            <span className="font-syncopate font-bold text-[30vw] leading-none absolute -bottom-10 -right-10 text-white">KUNST</span>
                        </div>

                        <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        {headerNavLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="font-syncopate text-4xl md:text-5xl lg:text-6xl font-bold text-white hover:text-orange transition-colors uppercase leading-none cursor-pointer"
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault()
                    link.onClick()
                  }
                  setMobileMenuOpen(false)
                }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.a
                                href="#contact"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-8 px-12 py-5 bg-orange text-white font-syncopate font-bold uppercase tracking-widest rounded-full shadow-2xl shadow-orange/30 active:scale-95 transition-transform"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Devis online
                            </motion.a>
                        </div>

                        {/* Close button for mobile menu */}
                        <button
                            className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Header
