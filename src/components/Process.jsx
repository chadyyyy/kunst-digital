import { motion } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'

const Process = () => {
    const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 })


    const steps = [
        {
            id: '01',
            title: 'Découverte',
            subtitle: 'Immersion & Audit',
            description: 'Nous plongeons dans l\'univers de votre marque pour comprendre vos objectifs et identifier vos opportunités de croissance.',
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            color: '#E84B1E'
        },
        {
            id: '02',
            title: 'Stratégie',
            subtitle: 'Planning & Direction',
            description: 'Nous construisons une feuille de route concrète : ton de voix, identité visuelle et indicateurs de performance.',
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
            ),
            color: '#E84B1E'
        },
        {
            id: '03',
            title: 'Création',
            subtitle: 'Design & Production',
            description: 'Notre équipe créative donne vie à la stratégie, du design de logo au développement web complet.',
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            ),
            color: '#E84B1E'
        },
        {
            id: '04',
            title: 'Livraison',
            subtitle: 'Lancement & Suivi',
            description: 'Nous assurons un lancement fluide et optimisons les performances pour garantir l\'impact de votre message.',
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
            ),
            color: '#E84B1E'
        }
    ]

    return (
        <section
            id="process"
            ref={sectionRef}
            className="relative py-32 bg-midnight overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-1/2 h-full bg-gradient-to-r from-orange/5 to-transparent blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-orange font-mono text-sm tracking-widest uppercase mb-4 block">
                            {'// Notre Méthode'}
                        </span>
                        <h2 className="font-syncopate text-4xl md:text-6xl font-bold uppercase text-white leading-tight">
                            Du Concept <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-red-600">à la Réalité</span>
                        </h2>
                    </motion.div>
                </div>

                <div className="relative grid md:grid-cols-4 gap-8">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-white/10">
                        <motion.div
                            initial={{ scaleX: 0, originX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-orange to-red-600"
                        />
                    </div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            className="relative group pt-8 md:pt-16"
                        >
                            {/* Number Bubble */}
                            <div className="absolute top-0 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 w-12 h-12 md:w-24 md:h-24 bg-midnight border border-white/10 rounded-full flex items-center justify-center group-hover:border-orange/50 transition-colors duration-500 z-10">
                                <span className="font-syncopate font-bold text-lg md:text-2xl text-white/20 group-hover:text-orange transition-colors duration-300">
                                    {step.id}
                                </span>
                            </div>

                            <div className="bg-white/5 border border-white/5 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 h-full backdrop-blur-sm group-hover:transform group-hover:-translate-y-2">
                                <div className="text-4xl mb-6 filter grayscale group-hover:grayscale-0 transition-all duration-300">{step.icon}</div>
                                <h3 className="font-outfit text-2xl font-bold text-white mb-2 group-hover:text-orange transition-colors">
                                    {step.title}
                                </h3>
                                <p className="font-mono text-xs text-orange/80 uppercase tracking-wider mb-4">
                                    {step.subtitle}
                                </p>
                                <p className="font-inter text-sm text-white/60 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Process
