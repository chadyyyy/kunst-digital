import { motion } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'

const Values = () => {
    const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 })

    const values = [
        {
            title: "Créativité",
            description: "Audace, originalité et pertinence dans chaque concept.",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            ),
            color: "from-orange/20 to-orange/5"
        },
        {
            title: "Proximité",
            description: "Une écoute active pour une compréhension profonde de vos enjeux.",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            color: "from-white/10 to-white/5"
        },
        {
            title: "Ambition",
            description: "S'améliorer sans cesse pour viser l'excellence créative.",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            color: "from-orange/15 to-orange/5"
        },
        {
            title: "Efficacité",
            description: "Des méthodes agiles pour des gains de productivité concrets.",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            color: "from-white/10 to-white/5"
        }
    ]

    return (
        <section
            id="values"
            ref={sectionRef}
            className="relative py-32 overflow-hidden bg-midnight"
        >
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-orange font-mono text-sm tracking-widest uppercase mb-4 block">
                            {'// Ce qui nous définit'}
                        </span>
                        <h2 className="font-syncopate text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-white leading-tight">
                            Nos <span className="text-orange text-outline-white">Valeurs</span>
                        </h2>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className={`group relative p-8 rounded-3xl bg-gradient-to-br ${value.color} border border-white/5 hover:border-orange/30 transition-all duration-500 hover:-translate-y-2`}
                        >
                            <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                {value.icon}
                            </div>
                            <h3 className="font-outfit text-2xl font-bold text-white mb-4 group-hover:text-orange transition-colors">
                                {value.title}
                            </h3>
                            <p className="font-inter text-white/50 leading-relaxed text-sm">
                                {value.description}
                            </p>

                            {/* Decorative line */}
                            <div className="absolute bottom-6 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Values
