import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'

const Contact = () => {
    const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 })
    const formRef = useRef(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const services = [
        'Stratégie & Conseil',
        'Identité Visuelle',
        'Site Web & App',
        'Marketing Digital',
        'Production Audiovisuelle',
        'Événementiel'
    ]

    const handleMouseMove = (e) => {
        if (!formRef.current) return
        const rect = formRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        setMousePosition({ x, y })
    }

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 })
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsSubmitting(false)
        setIsSubmitted(true)
        setTimeout(() => {
            setIsSubmitted(false)
            setFormData({
                name: '', email: '', company: '', phone: '', service: '', message: ''
            })
        }, 3000)
    }

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative py-32 overflow-hidden bg-midnight"
        >
            {/* Background Composition */}
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-orange font-mono text-sm tracking-widest uppercase mb-4 block">
                            {'// Get in Touch'}
                        </span>
                        <h2 className="font-syncopate text-3xl md:text-5xl lg:text-7xl font-bold uppercase text-white mb-8 leading-none">
                            Créons <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-red-600">Ensemble</span>
                        </h2>

                        <div className="space-y-8 mt-12">
                            <div className="group flex items-start gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-orange/20 transition-all duration-300">
                                <div className="p-3 rounded-lg bg-white/5 text-orange">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-outfit font-bold text-white text-lg mb-2">QG Principal</h4>
                                    <p className="text-white/60 font-mono text-sm leading-relaxed">
                                        46, Bd Zerktouni, 2ème étage<br />
                                        Casablanca 20000, Maroc
                                    </p>
                                </div>
                            </div>

                            <div className="group flex items-start gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-orange/20 transition-all duration-300">
                                <div className="p-3 rounded-lg bg-white/5 text-orange">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-outfit font-bold text-white text-lg mb-2">Email</h4>
                                    <a href="mailto:contact@kunstcom.ma" className="text-white/60 font-mono text-sm hover:text-orange transition-colors">
                                        contact@kunstcom.ma
                                    </a>
                                </div>
                            </div>

                            <div className="group flex items-start gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-orange/20 transition-all duration-300">
                                <div className="p-3 rounded-lg bg-white/5 text-orange">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-outfit font-bold text-white text-lg mb-2">Téléphone</h4>
                                    <a href="tel:+212522434343" className="text-white/60 font-mono text-sm hover:text-orange transition-colors">
                                        +212 5 22 43 43 43
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: 3D Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ perspective: 1000 }}
                    >
                        <motion.div
                            ref={formRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                rotateX: mousePosition.y * 5, // Subtle tilt
                                rotateY: mousePosition.x * -5,
                                transformStyle: "preserve-3d"
                            }}
                            className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl"
                        >
                            {/* Form Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange/10 via-transparent to-transparent opacity-50 rounded-[2rem] pointer-events-none" />

                            {isSubmitted ? (
                                <div className="h-[500px] flex flex-col items-center justify-center text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6"
                                    >
                                        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </motion.div>
                                    <h3 className="font-syncopate text-2xl font-bold text-white mb-2">Message Reçu</h3>
                                    <p className="text-white/60">Nous vous recontacterons dans les 24h.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="relative space-y-6" aria-label="Formulaire de contact">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-xs font-mono text-orange uppercase tracking-wider ml-1">Nom Complet *</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                aria-required="true"
                                                aria-describedby="name-help"
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange focus:ring-1 focus:ring-orange outline-none transition-all placeholder:text-white/20"
                                                placeholder="John Doe"
                                            />
                                            <span id="name-help" className="sr-only">Entrez votre nom complet</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-xs font-mono text-orange uppercase tracking-wider ml-1">Email Pro *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                aria-required="true"
                                                aria-describedby="email-help"
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange focus:ring-1 focus:ring-orange outline-none transition-all placeholder:text-white/20"
                                                placeholder="john@company.com"
                                            />
                                            <span id="email-help" className="sr-only">Entrez votre adresse email professionnelle</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="service" className="text-xs font-mono text-orange uppercase tracking-wider ml-1">Sujet *</label>
                                        <select
                                            id="service"
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            required
                                            aria-required="true"
                                            aria-describedby="service-help"
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange focus:ring-1 focus:ring-orange outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled className="bg-midnight">Sélectionnez un sujet</option>
                                            {services.map(s => (
                                                <option key={s} value={s} className="bg-midnight">{s}</option>
                                            ))}
                                        </select>
                                        <span id="service-help" className="sr-only">Sélectionnez le type de service qui vous intéresse</span>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-xs font-mono text-orange uppercase tracking-wider ml-1">Message *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            aria-required="true"
                                            aria-describedby="message-help"
                                            rows={4}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange focus:ring-1 focus:ring-orange outline-none transition-all placeholder:text-white/20 resize-none"
                                            placeholder="Parlez-nous de votre projet..."
                                        />
                                        <span id="message-help" className="sr-only">Décrivez votre projet en détail</span>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        aria-disabled={isSubmitting}
                                        aria-busy={isSubmitting}
                                        className="w-full bg-orange hover:bg-orange-600 text-white font-syncopate font-bold uppercase tracking-wider py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 group"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="sr-only">Envoi en cours...</span>
                                                Envoi...
                                            </>
                                        ) : (
                                            <>
                                                Envoyer le Message
                                                <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact
