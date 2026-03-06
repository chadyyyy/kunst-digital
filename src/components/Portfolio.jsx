import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'

const Portfolio = () => {
    const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 })
    const [selectedProject, setSelectedProject] = useState(null)

  // Lock body scroll when modal is open using CSS class instead of direct DOM manipulation
  useEffect(() => {
    if (selectedProject) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [selectedProject])

    const projects = [
        {
            id: 'edf',
            title: "EDF",
            category: "Exhibition",
            year: "2024",
            description: "Conception et réalisation intégrale du stand EDF. Une approche architecturale mettant en lumière l'innovation énergétique.",
            cover: "/images/portfolio/EDF/image-1.jpeg",
            images: Array.from({ length: 7 }, (_, i) => `/images/portfolio/EDF/image-${i + 1}.jpeg`)
        },
        {
            id: 'sanipak',
            title: "Sanipak",
            category: "Event & Branding",
            year: "2023",
            description: "Activation de marque et design d'espace pour Sanipak. Création d'un univers immersif pour les visiteurs.",
            cover: "/images/portfolio/Sanipak/image-1.jpeg",
            images: Array.from({ length: 4 }, (_, i) => `/images/portfolio/Sanipak/image-${i + 1}.jpeg`)
        }
    ]

    return (
        <section
            id="portfolio"
            ref={sectionRef}
            className="relative py-32 bg-midnight overflow-hidden"
        >
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-orange font-mono text-sm tracking-widest uppercase mb-4 block">
                            {'// Nos Réalisations'}
                        </span>
                        <h2 className="font-syncopate text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-white leading-none">
                            Nos <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-red-600">Réalisations</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Main Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            className="group cursor-pointer"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/5 mb-6">
<img
              src={project.cover}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="w-16 h-16 rounded-full bg-orange text-white flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-orange font-mono text-xs uppercase tracking-wider mb-2 block">
                                        {project.category} — {project.year}
                                    </span>
                                    <h3 className="font-outfit text-3xl font-bold text-white group-hover:text-orange transition-colors">
                                        {project.title}
                                    </h3>
                                </div>
                                <span className="text-white/40 font-mono text-sm">0{index + 1}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Full Screen Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-midnight/95 backdrop-blur-xl overflow-y-auto"
                        onClick={() => setSelectedProject(null)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                            className="fixed top-8 right-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="max-w-7xl mx-auto px-6 py-24" onClick={(e) => e.stopPropagation()}>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="mb-16 border-b border-white/10 pb-8"
                            >
                                <span className="text-orange font-mono text-sm tracking-widest uppercase mb-4 block">
                                    {selectedProject.category}
                                </span>
                                <h2 className="font-syncopate text-3xl md:text-5xl lg:text-7xl font-bold uppercase text-white mb-6">
                                    {selectedProject.title}
                                </h2>
                                <p className="font-inter text-white/60 text-lg max-w-2xl leading-relaxed">
                                    {selectedProject.description}
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
                                {selectedProject.images.map((img, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`rounded-xl overflow-hidden ${i === 0 ? 'md:col-span-2 aspect-video' : 'aspect-[4/3]'}`}
                                    >
<img
                  src={img}
                  alt={`${selectedProject.title} view ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Portfolio
