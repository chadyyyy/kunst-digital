import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

// Components
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Expertise from './components/Expertise'
import Services from './components/Services'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import Clients from './components/Clients'
import Values from './components/Values'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PresentationPage from './components/PresentationPage'

function Home({ pageVariants }) {
    const navigate = useNavigate();

    return (
        <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-midnight text-white overflow-x-hidden"
        >
            {/* Header */}
            <Header onOpenPresentation={() => {
                navigate('/presentation')
                window.scrollTo(0, 0)
            }} />

            {/* Main content */}
            <main>
                {/* Section 0: Hero */}
                <Hero />

                {/* Section 1: About / Qui Sommes-Nous */}
                <About />

                {/* Section 1.5: Nos Valeurs */}
                <Values />

                {/* Section 2: Expertise / Pôles d'Activités */}
                <Expertise />

                {/* Section 3: Services Grid */}
                <Services />

                {/* Section 4: Process / Workflow */}
                <Process />

                {/* Section 5: Realizations / Portfolio */}
                <Portfolio />

                {/* Section 6: Clients Marquee */}
                <Clients />

                {/* Section 7: Contact */}
                <Contact />
            </main>

            {/* Footer */}
            <Footer onOpenPresentation={() => {
                navigate('/presentation')
                window.scrollTo(0, 0)
            }} />
        </motion.div>
    );
}

function App() {
    // Smooth scroll behavior for anchor links
    useEffect(() => {
        const handleAnchorClick = (e) => {
            const target = e.target.closest('a[href^="#"]')
            if (target) {
                // Only prevent default if we are specifically on home and the target starts with #
                if (window.location.pathname === '/') {
                    e.preventDefault()
                    const id = target.getAttribute('href').slice(1)
                    const element = document.getElementById(id)
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                    }
                }
            }
        }

        document.addEventListener('click', handleAnchorClick)
        return () => document.removeEventListener('click', handleAnchorClick)
    }, [])

    // Page load animation
    const pageVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.19, 1, 0.22, 1]
            }
        },
        exit: { opacity: 0 }
    }

    return (
        <AnimatePresence mode="wait">
            <Routes>
                <Route path="/" element={<Home pageVariants={pageVariants} />} />
                <Route path="/presentation" element={<PresentationPage />} />
                <Route path="/pr%C3%A9sentation" element={<Navigate to="/presentation" replace />} />
                <Route path="/présentation" element={<Navigate to="/presentation" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    )
}

export default App
