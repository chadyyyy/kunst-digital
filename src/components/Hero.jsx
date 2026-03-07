import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [imagesPreloaded, setImagesPreloaded] = useState(false)

const slides = [
  {
    id: 1,
    title: "ÉVÉNEMENTIEL",
    subtitle: "SCÉNOGRAPHIE & EXPÉRIENCE",
    description: "Au-delà de l'organisation, nous créons des univers immersifs qui marquent durablement vos visiteurs. Une vision 360° pour vos événements d'exception.",
    image: "/images/hero-evenementiel-final.webp",
    accent: "Événementiel",
    type: "agency"
  },
  {
    id: 2,
    title: "IMPRESSION",
    subtitle: "SUPPORTS & GRANDS FORMATS",
    description: "Des solutions d'impression haute définition pour tous vos besoins de communication. Précision, couleurs éclatantes et finitions haute couture.",
    image: "/images/hero-impression-pro.webp",
    accent: "Impression",
    type: "service"
  },
  {
    id: 3,
    title: "CONCEPTION STANDS",
    subtitle: "ARCHITECTURE ÉPHÉMÈRE",
    description: "Donnez vie à vos espaces d'exposition avec des designs 3D innovants. Nous allions architecture moderne et efficacité commerciale commerciale.",
    image: "/images/hero-stands-edf-pro.webp",
    accent: "Stands",
    type: "service"
  }
]

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, [slides.length])

    const goToSlide = (index) => {
        setCurrentSlide(index)
        setIsAutoPlaying(false)
    }

    // Preload all hero images on mount
    useEffect(() => {
        const imagesToPreload = slides.map(slide => slide.image)

        let loadedCount = 0
        const totalImages = imagesToPreload.length

        imagesToPreload.forEach((src) => {
            const img = new Image()
            img.onload = () => {
                loadedCount++
                if (loadedCount === totalImages) {
                    setImagesPreloaded(true)
                }
            }
            img.onerror = () => {
                loadedCount++
                if (loadedCount === totalImages) {
                    setImagesPreloaded(true)
                }
            }
            img.src = src
        })

        // Fallback if no images or timeout
        const timeout = setTimeout(() => setImagesPreloaded(true), 3000)
        return () => clearTimeout(timeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!isAutoPlaying) return
        const timer = setInterval(nextSlide, 6000)
        return () => clearInterval(timer)
    }, [isAutoPlaying, nextSlide])

    const FloatingElements = () => (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 100 - 50 + "%",
                        y: Math.random() * 100 - 50 + "%",
                        opacity: 0,
                        scale: 0.5
                    }}
                    animate={{
                        x: [null, Math.random() * 100 - 50 + "%"],
                        y: [null, Math.random() * 100 - 50 + "%"],
                        opacity: [0, 0.2, 0],
                        scale: [0.5, 1.2, 0.8],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 15 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 2
                    }}
                    className="absolute w-64 h-64 bg-orange/10 blur-[100px] rounded-full"
                    style={{ left: Math.random() * 100 + "%", top: Math.random() * 100 + "%" }}
                />
            ))}
        </div>
    )

    return (
        <section className="relative h-screen w-full overflow-hidden bg-midnight text-white">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0"
                >
                    {/* Background Image with Ken Burns Effect */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.img
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].title}
                            loading={currentSlide === 0 ? "eager" : "lazy"}
                            fetchPriority={currentSlide === 0 ? "high" : "auto"}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.1, opacity: imagesPreloaded ? 1 : 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 10, ease: "linear" }}
                        />
                    </div>

                    {/* Dark Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-midnight/90 via-midnight/50 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-midnight/30"></div>

{/* Subtle grain texture */}
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay"></div>
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
                <FloatingElements />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

                    {/* Content Side */}
                    <div className="lg:col-span-9">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="relative p-8 md:p-12 rounded-[2rem] bg-black/10 backdrop-blur-sm border border-white/5"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-3 mb-6"
                                >
                                    <span className="w-12 h-[2px] bg-orange"></span>
                                    <span className="font-outfit text-orange font-semibold tracking-widest uppercase text-sm">
                                        {slides[currentSlide].subtitle}
                                    </span>
                                </motion.div>

                                <h1 className="font-syncopate font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-none mb-8 uppercase text-white drop-shadow-2xl flex flex-wrap gap-x-2 md:gap-x-4 tracking-tighter xl:tracking-normal">
                                    {slides[currentSlide].title.split(" ").map((word, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ y: "50%", opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                duration: 1,
                                                delay: 0.3 + (i * 0.1),
                                                ease: [0.19, 1, 0.22, 1]
                                            }}
                                            className="inline-block whitespace-nowrap"
                                        >
                                            {word === "STANDS" ? (
                                                <span className="text-orange">{word}</span>
                                            ) : word}
                                        </motion.span>
                                    ))}
                                </h1>

                                <p className="font-inter text-white/80 leading-relaxed max-w-xl mb-10 text-lg md:text-xl drop-shadow-md">
                                    {slides[currentSlide].description}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <a href="#contact" className="group relative px-8 py-3 bg-white text-midnight font-outfit font-bold uppercase tracking-wider overflow-hidden rounded-full hover:bg-orange hover:text-white transition-colors duration-300">
                                        <span className="relative z-10">Demander un devis online</span>
                                    </a>
                                    <a href="#expertise" className="px-8 py-3 border border-white/20 rounded-full text-white font-outfit font-medium uppercase tracking-wider hover:border-orange hover:text-orange hover:bg-white/5 transition-all duration-300 backdrop-blur-sm">
                                        Nos Expertises
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Decorative / Indicator Side */}
                    <div className="lg:col-span-3 hidden lg:flex flex-col items-end justify-center h-full relative">
                        {/* Slide Indicators */}
                        <div className="flex flex-col gap-6 p-6 rounded-2xl bg-black/20 backdrop-blur-md border border-white/5 mb-8">
                            {slides.map((slide, index) => (
                                <button
                                    key={slide.id}
                                    onClick={() => goToSlide(index)}
                                    className={`group flex items-center gap-4 text-right transition-all duration-300 ${currentSlide === index ? 'opacity-100 translate-x-0' : 'opacity-40 hover:opacity-70 translate-x-4'}`}
                                >
                                    <span className="font-syncopate text-xs uppercase tracking-widest text-shadow-sm">
                                        {slide.accent}
                                    </span>
                                    <div className={`w-12 h-[1px] transition-all duration-500 ${currentSlide === index ? 'bg-orange w-24 scale-x-110' : 'bg-white'}`}></div>
                                    <span className="font-mono text-xs">0{slide.id}</span>
                                </button>
                            ))}
                        </div>


                    </div>
                </div>
            </div>

            {/* Mobile Navigation Dots */}
            <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-4 lg:hidden">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-orange w-8' : 'bg-white/20'}`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-8 hidden lg:flex items-center gap-4"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
                <span className="font-outfit text-xs text-white/40 tracking-widest uppercase rotate-90 origin-left translate-y-2">Scroll</span>
            </motion.div>
        </section>
    )
}

export default Hero
