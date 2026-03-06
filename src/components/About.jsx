import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'

const Counter = ({ value, duration = 2 }) => {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (inView) {
            let start = 0
            const end = parseInt(value)
            if (start === end) return

            let totalMiliseconds = duration * 1000
            let incrementTime = totalMiliseconds / end

            let timer = setInterval(() => {
                start += 1
                setCount(start)
                if (start === end) clearInterval(timer)
            }, incrementTime)

            return () => clearInterval(timer)
        }
    }, [inView, value, duration])

    return <span ref={ref}>{count}</span>
}

const About = () => {
    const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.2 })
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100])

    const highlights = [
        {
            id: '01',
            title: 'Stratégie',
            description: 'Vision long-terme et positionnement de marque unique.',
        },
        {
            id: '02',
            title: 'Création',
            description: 'Design audacieux qui marque les esprits.',
        },
        {
            id: '03',
            title: 'Digital',
            description: 'Expériences web et mobiles immersives.',
        },
        {
            id: '04',
            title: 'Production',
            description: 'Réalisations impeccables, du print au stand.',
        },
    ]

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative py-32 overflow-hidden bg-midnight"
        >
            {/* Background Typography Parallax */}
            <motion.div
                style={{ y: yParallax }}
                className="absolute top-20 left-0 right-0 z-0 pointer-events-none opacity-5 select-none overflow-hidden"
            >
                <div className="font-syncopate font-bold text-[20vw] leading-none text-center text-white whitespace-nowrap">
                    ESPIRIT CRÉATIF
                </div>
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto px-6" ref={containerRef}>
                <div className="flex flex-col lg:flex-row gap-20">

                    {/* Left Column - Editorial Text */}
                    <motion.div
                        className="lg:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <span className="h-px w-12 bg-orange"></span>
                            <span className="font-outfit text-orange uppercase tracking-widest text-sm font-semibold">
                                Notre Philosophie
                            </span>
                        </div>

                        <h2 className="font-syncopate text-3xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight mb-10">
                            Nous créons <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-red-500">
                                l&apos;exceptionnel
                            </span>
                        </h2>

                        <div className="space-y-6 text-lg text-white/70 font-inter leading-relaxed max-w-xl">
                            <p>
                                <span className="text-white font-semibold">KUNSTCOM</span> n&apos;est pas une agence traditionnelle.
                                Nous sommes un laboratoire créatif où la technologie rencontre l&apos;art.
                            </p>
                            <p>
                                Notre approche 360° nous permet d&apos;orchestrer votre communication avec une cohérence absolue,
                                quel que soit le support. Nous ne nous contentons pas de répondre à un brief,
                                nous élevons votre marque vers de nouveaux standards.
                            </p>
                        </div>

                        {/* Stats Minimalist Bar */}
                        <div className="mt-16 pt-8 border-t border-white/10 flex gap-12">
                            <div>
                                <span className="block font-syncopate text-3xl font-bold text-white">
                                    <Counter value="15" />
                                    <span className="text-orange">+</span>
                                </span>
                                <span className="text-sm text-white/50 uppercase tracking-wider">Années</span>
                            </div>
                            <div>
                                <span className="block font-syncopate text-3xl font-bold text-white">
                                    <Counter value="200" />
                                    <span className="text-orange">+</span>
                                </span>
                                <span className="text-sm text-white/50 uppercase tracking-wider">Projets</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Asymmetric Cards */}
                    <div className="lg:w-1/2 relative min-h-[500px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                                    className={`p-8 rounded-2xl border border-white/5 backdrop-blur-sm transition-all duration-300 hover:border-orange/40 hover:bg-white/5 ${index % 2 === 1 ? 'sm:translate-y-12' : ''}`}
                                >
                                    <span className="block font-syncopate text-4xl font-bold text-white/10 mb-6">{item.id}</span>
                                    <h3 className="font-outfit text-xl font-bold text-white mb-3 uppercase">{item.title}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Decorative Circle Behind */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange/5 blur-3xl rounded-full z-0 pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
