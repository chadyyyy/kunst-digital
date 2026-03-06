import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'

const Services = () => {
    const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 })
    const [activeFilter, setActiveFilter] = useState('all')
    const scrollContainerRef = useRef(null)

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
    }

    // Reset scroll when filter changes
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        }
    }, [activeFilter])

    const categories = [
        { id: 'all', label: 'Tous' },
        { id: 'digital', label: 'Digital' },
        { id: 'design', label: 'Design' },
        { id: 'strategy', label: 'Stratégie' },
        { id: 'production', label: 'Production' },
    ]

    const services = [
        { id: 1, name: 'Conseil en communication', category: 'strategy', icon: <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor font-light"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>, size: 'large' },
        { id: 2, name: 'Création graphique', category: 'design', icon: <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor font-light"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>, size: 'normal' },
        { id: 3, name: 'Développement Web', category: 'digital', icon: <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor font-light"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>, size: 'large' },
        { id: 4, name: 'Refonte site web', category: 'digital', icon: <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor font-light"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>, size: 'normal' },
        { id: 5, name: 'Référencement SEO', category: 'digital', icon: <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor font-light"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>, size: 'normal' },

        { id: 7, name: 'Shoot Photo', category: 'production', icon: <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor font-light"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, size: 'normal' },
        { id: 8, name: 'E-Mailing', category: 'digital', icon: <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor font-light"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, size: 'normal' },
        { id: 9, name: 'Social Ads', category: 'digital', icon: <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor font-light"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>, size: 'normal' },
        { id: 10, name: 'Google Ads', category: 'digital', icon: <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor font-light"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, size: 'normal' },
        { id: 11, name: 'Naming & Branding', category: 'strategy', icon: <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor font-light"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0V12m-3 0a1.5 1.5 0 00-3 0v1.25m-1.5 2.22c.319.102.617.21.905.323l.113.045c.446.182.853.473 1.187.844l.435.485c.338.375.834.576 1.339.576H11m4-11V6a1.5 1.5 0 10-3 0V5m3 0V3a1.5 1.5 0 10-3 0v2m5.244 11.5a1.5 1.5 0 11-2.488-1.5 1.5 1.5 0 112.488 1.5z" /></svg>, size: 'large' },
        { id: 12, name: 'Packaging', category: 'design', icon: <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor font-light"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>, size: 'normal' },
        { id: 13, name: 'Print & Supports', category: 'production', icon: <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor font-light"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>, size: 'large' },
        { id: 14, name: 'Régie Publicitaire', category: 'strategy', icon: <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor font-light"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>, size: 'normal' },
        { id: 15, name: 'Achat d\'espace', category: 'strategy', icon: <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor font-light"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 4v4h4" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 8h2m-2 4h6m-6 4h6" /></svg>, size: 'normal' },
        { id: 16, name: 'Illustration', category: 'design', icon: <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor font-light"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>, size: 'normal' },
        { id: 17, name: 'Rédaction Web', category: 'digital', icon: <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor font-light"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>, size: 'normal' },

    ]

    const filteredServices = activeFilter === 'all'
        ? services
        : services.filter(s => s.category === activeFilter)

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative py-20 lg:py-24 bg-midnight"
        >
            {/* Background Gradient Mesh */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-orange font-mono text-sm tracking-widest uppercase mb-4 block">
                            {'// Notre Catalogue'}
                        </span>
                        <h2 className="font-syncopate text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-white leading-none">
                            Services <br />
                            <span className="text-white/20">Sur Mesure</span>
                        </h2>
                    </motion.div>

                    {/* Filter Tabs & Navigation */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex flex-col items-end gap-6"
                    >
                        <div className="flex flex-wrap gap-2 justify-end">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveFilter(cat.id)}
                                    className={`px-5 py-2 rounded-lg font-outfit text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${activeFilter === cat.id
                                        ? 'bg-white text-midnight border-white'
                                        : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <div className="hidden md:flex gap-3">
                            <button
                                onClick={() => scroll('left')}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-orange hover:text-orange transition-all duration-300 bg-white/5 backdrop-blur-sm"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-orange hover:text-orange transition-all duration-300 bg-white/5 backdrop-blur-sm"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Elegant Horizontal Scrolling Cards */}
                <motion.div
                    layout
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-4 md:gap-6 pb-12 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 mt-6"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredServices.map((service, index) => (
                            <motion.div
                                key={service.id}
                                layout
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
                                className="flex-shrink-0 snap-center group relative w-[280px] md:w-[320px] p-6 lg:p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-orange/30 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[220px]"
                            >
                                {/* Hover Gradient Background */}
                                <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-orange/20 rounded-full blur-[50px] transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:-translate-y-0 transition-transform duration-700 pointer-events-none opacity-0 group-hover:opacity-100" />

                                <div className="flex items-start justify-between relative z-10 w-full mb-6">
                                    <div className="w-10 h-10 md:w-12 md:h-12 text-white/30 group-hover:text-orange transition-colors duration-500 transform group-hover:scale-110">
                                        {service.icon}
                                    </div>
                                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-orange text-white transform translate-y-2 group-hover:translate-y-0 shadow-lg shadow-orange/20">
                                        <svg className="w-4 h-4" transform="rotate(-45)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="relative z-10 w-full mt-auto space-y-3">
                                    <div className="inline-block">
                                        <span className="font-mono text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest border border-white/10 px-2.5 py-1 rounded-full group-hover:border-orange/30 group-hover:text-orange transition-colors">
                                            {categories.find(c => c.id === service.category)?.label}
                                        </span>
                                    </div>
                                    <h3 className="font-outfit font-bold text-white text-xl md:text-2xl group-hover:text-orange transition-colors leading-tight">
                                        {service.name}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* CTA at bottom */}
                <div className="mt-12 flex justify-center">
                    <a href="#contact" className="group relative inline-flex items-center gap-4 px-8 py-4 bg-orange rounded-full overflow-hidden">
                        <span className="relative z-10 font-syncopate font-bold text-white group-hover:text-orange transition-colors duration-300 tracking-wider uppercase text-sm">Demander un devis online</span>
                        <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        <span className="relative z-10 text-white group-hover:text-orange transition-colors duration-300">→</span>
                    </a>
                </div>

            </div>
        </section>
    )
}

export default Services
