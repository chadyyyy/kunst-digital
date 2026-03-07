import { motion } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'
import { navLinks, socialLinks } from '../data/navigation'

import { ArrowRight } from 'lucide-react'

const Footer = ({ onOpenPresentation }) => {
    const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 })

    const currentYear = new Date().getFullYear()

    // Add Clients link for footer
    const footerNavLinks = [
        ...navLinks,
        { name: 'Clients', href: '#clients' },
    ]

    return (
        <footer
            ref={sectionRef}
            className="relative bg-midnight pt-32 pb-12 overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-orange/5 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <img
                                    src="/images/logo.webp"
                                    alt="KUNST Logo"
                                    className="h-16 w-auto object-contain"
                                />
                            </div>
                            <p className="font-inter text-white/50 leading-relaxed max-w-xs mb-8">
                                Agence de communication créative et digitale basée à Casablanca. Nous transformons vos visions en réalités digitales.
                            </p>

                            <button
                                onClick={onOpenPresentation}
                                className="group flex items-center gap-3 bg-white/5 hover:bg-orange border border-white/10 hover:border-orange px-6 py-3 transition-all duration-300 rounded-sm"
                            >
                                <span className="font-syncopate text-xs tracking-widest uppercase text-white">
                                    Dossier de Présentation
                                </span>
                                <ArrowRight size={16} className="text-orange group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </button>
                        </motion.div>
                    </div>

                    {/* Navigation */}
                    <div className="lg:col-span-1">
                        <motion.h4
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="font-syncopate font-bold text-white uppercase mb-8"
                        >
                            Navigation
                        </motion.h4>
                        <ul className="space-y-4">
                            {footerNavLinks.map((link, index) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                                >
                                    <a
                                        href={link.href}
                                        className="font-inter text-white/60 hover:text-orange transition-colors duration-300 flex items-center gap-2 group"
                                        data-cursor="hover"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-orange transition-colors" />
                                        {link.name}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact - Short */}
                    <div className="lg:col-span-1">
                        <motion.h4
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="font-syncopate font-bold text-white uppercase mb-8"
                        >
                            Contact
                        </motion.h4>
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                <p className="text-sm font-mono text-white/40 mb-1">EMAIL</p>
                                <a href="mailto:kunstcom.m@gmail.com" className="text-white hover:text-orange transition-colors">
                                    kunstcom.m@gmail.com
                                </a>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                <p className="text-sm font-mono text-white/40 mb-1">TÉLÉPHONE</p>
                                <a href="tel:+212522434343" className="text-white hover:text-orange transition-colors">
                                    +212 5 22 43 43 43
                                </a>
                            </motion.div>
                        </div>
                    </div>

                    {/* Social - Simplified */}
                    <div className="lg:col-span-1">
                        <motion.h4
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="font-syncopate font-bold text-white uppercase mb-8"
                        >
                            Social
                        </motion.h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-orange hover:border-orange transition-all duration-300"
                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                                    data-cursor="hover"
                                >
                                    <span className="sr-only">{social.name}</span>
                                    {social.name === 'Instagram' && (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                    )}
                                    {social.name === 'LinkedIn' && (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
                                    )}
                                    {social.name === 'Behance' && (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7v-2h7v2zm.001 4h-7c-.552 0-1 .448-1 1s.448 1 1 1h7c.553 0 1-.448 1-1s-.447-1-1-1zm-12.35 0c-1.393-1.564-3.593-2.316-5.541-1.896-1.921.414-3.414 1.948-3.906 3.868-.535 2.083.078 4.314 1.583 5.8 4.298 4.237 11.531 1.059 11.332-5.013-.031-1.04-.378-2.031-.986-2.859l1.413 1-.722.955c.164.551.272 1.125.32 1.713.438 5.378-5.328 8.784-9.673 5.86-1.554-1.046-2.553-2.731-2.748-4.593-.243-2.333.619-4.662 2.364-6.22 3.097-2.766 8.086-1.97 10.151 1.543l-2.585 1.789zm-5.751 2c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z" /></svg>
                                    )}
                                    {social.name === 'Facebook' && (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                                    )}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
                >
                    <p className="text-sm font-inter text-white/40">
                        &copy; {currentYear} KUNST Communication. Tous droits réservés.
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-sm font-inter text-white/40 hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="text-sm font-inter text-white/40 hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </motion.div>

                {/* Big Background Text */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02]">
                    <h1 className="text-[20vw] font-syncopate font-bold text-white leading-none whitespace-nowrap select-none">
                        KUNST DIGITAL
                    </h1>
                </div>
            </div>
        </footer>
    )
}

export default Footer
