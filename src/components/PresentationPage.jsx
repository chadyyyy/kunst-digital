import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, ExternalLink, ChevronRight, ChevronLeft, Maximize } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Document, Page, pdfjs } from 'react-pdf'
import HTMLFlipBook from 'react-pageflip'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Setup pdf js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const PresentationPage = () => {
    const navigate = useNavigate()
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const flipBookRef = useRef(null)

    // Scale flipbook depending on screen size to make it responsive
    // The actual PDF is 708.66 x 595.28 which is exactly a 1.19 ratio (so 19:16)
    const ratio = 1.19;
    const [dimensions, setDimensions] = useState({ width: Math.floor(600 * ratio), height: 600 })

    useEffect(() => {
        const updateDimensions = () => {
            // Keep actual exact aspect ratio
            if (window.innerWidth < 640) {
                const w = window.innerWidth - 48
                setDimensions({ width: w, height: Math.floor(w / ratio) })
            } else if (window.innerWidth < 1024) {
                // tablet
                setDimensions({ width: Math.floor(400 * ratio), height: 400 })
            } else if (window.innerWidth < 1280) {
                // small desktop
                setDimensions({ width: Math.floor(550 * ratio), height: 550 })
            } else {
                // large desktop (make it bigger)
                setDimensions({ width: Math.floor(700 * ratio), height: 700 })
            }
        }

        updateDimensions()
        window.addEventListener('resize', updateDimensions)
        return () => window.removeEventListener('resize', updateDimensions)
    }, [])

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
    }

    const nextButtonClick = () => {
        if (flipBookRef.current) {
            flipBookRef.current.pageFlip().flipNext()
        }
    }

    const prevButtonClick = () => {
        if (flipBookRef.current) {
            flipBookRef.current.pageFlip().flipPrev()
        }
    }

    const onPage = (e) => {
        setPageNumber(e.data + 1)
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-midnight text-white flex flex-col relative z-50"
        >
            {/* Background noise grid similar to hero */}
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,102,0,0.03)_0%,transparent_100%)] pointer-events-none" />

            {/* Header */}
            <header className="py-6 px-6 md:px-12 flex justify-between items-center relative z-10 border-b border-white/5">
                <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="flex items-center">
                    <img
                        src="/images/logo.png"
                        alt="KUNST.Digital"
                        className="h-10 md:h-14 w-auto object-contain"
                    />
                </a>
                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:inline">Retour au site</span>
                </button>
            </header>

            {/* Content */}
            <main className="flex-1 flex flex-col pt-12 md:pt-16 px-6 md:px-12 max-w-7xl mx-auto w-full relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-end justify-between mb-12">

                    {/* Text Area */}
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <span className="text-orange font-mono text-sm tracking-widest uppercase mb-4 block">
                                {'// DOCUMENTATION'}
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-5xl font-syncopate font-bold uppercase tracking-tighter leading-[1.1] mb-6">
                                Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-red-600">Identité</span>
                            </h1>
                            <p className="text-white/60 font-inter text-base md:text-lg leading-relaxed mb-6">
                                Plongez au cœur de KUNST.Digital. Découvrez notre manifeste, la profondeur de nos champs d'expertise, et la philosophie qui anime chacune de nos réalisations dans notre présentation officielle.
                            </p>
                        </motion.div>
                    </div>

                    {/* CTA Area */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex shrink-0 mb-6 lg:mb-0"
                    >
                        <a
                            href="/docs/Presentation-KUNST.pdf"
                            download="Presentation_KUNST.pdf"
                            className="bg-white/5 hover:bg-orange border border-white/10 hover:border-orange text-white px-8 py-4 font-syncopate text-xs uppercase tracking-widest transition-all text-center flex items-center justify-center gap-3 backdrop-blur-sm rounded-sm"
                        >
                            <Download size={16} />
                            Télécharger le PDF
                        </a>
                    </motion.div>
                </div>

                {/* PDF Viewer Column (Magazine Flipbook Horizontal) */}
                <div className="w-full relative flex flex-col items-center justify-center pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative flex flex-col items-center w-full max-w-5xl mx-auto"
                    >
                        <Document
                            file="/docs/Presentation-KUNST.pdf"
                            onLoadSuccess={onDocumentLoadSuccess}
                            loading={<div className="text-white/50 font-mono text-sm animate-pulse my-20">Chargement du document...</div>}
                            className="drop-shadow-2xl"
                        >
                            <HTMLFlipBook
                                width={dimensions.width}
                                height={dimensions.height}
                                size="fixed"
                                minWidth={300}
                                maxWidth={1000}
                                minHeight={200}
                                maxHeight={1000}
                                maxShadowOpacity={0.5}
                                showCover={true}
                                mobileScrollSupport={true}
                                onFlip={onPage}
                                className="bg-transparent"
                                ref={flipBookRef}
                            >
                                {Array.from(new Array(numPages), (el, index) => (
                                    <div key={`page_${index + 1}`} className="bg-white overflow-hidden flex items-center justify-center">
                                        <Page
                                            pageNumber={index + 1}
                                            width={dimensions.width}
                                            renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                            loading={<div className="w-full h-full bg-white/5 animate-pulse" />}
                                            className="select-none pointer-events-none"
                                        />
                                    </div>
                                ))}
                            </HTMLFlipBook>
                        </Document>

                        {/* Magazine Controls */}
                        {numPages && (
                            <div className="flex items-center gap-6 mt-12 p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                                <button
                                    onClick={prevButtonClick}
                                    disabled={pageNumber === 1}
                                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 hover:text-orange disabled:opacity-30 transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                <div className="font-mono text-xs tracking-widest text-white/60">
                                    PAGE <span className="text-white font-bold">{pageNumber}</span> / {numPages}
                                </div>

                                <button
                                    onClick={nextButtonClick}
                                    disabled={pageNumber === numPages}
                                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 hover:text-orange disabled:opacity-30 transition-colors"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>
        </motion.div>
    )
}

export default PresentationPage
