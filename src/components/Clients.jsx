import { useState } from 'react'
import { motion } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'

// Helper function to generate safe file names from client names
const getSafeFilename = (name) => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') + '.png';
}

// Logo component with React-based fallback (no XSS vulnerability)
const ClientLogo = ({ name, region, logoFile, className = "", isInternational = false }) => {
  const [hasError, setHasError] = useState(false)
  const filename = logoFile || getSafeFilename(name)

  // Calculate max height based on client name
  const getMaxHeight = () => {
    if (name === 'Totalcall') return 'max-h-[70px] md:max-h-[90px]'
    if (['Forever Living Products', 'Nabab', 'TAKOS KING', 'Bureau Veritas', 'CHU Tanger'].includes(name)) {
      return 'max-h-[65px] md:max-h-[85px]'
    }
    if (name === 'Motomania' || name === 'LIDER') return 'max-h-[50px] md:max-h-[75px]'
    if (isInternational) return 'max-h-[70px] md:max-h-[100px]'
    return 'max-h-[48px] md:max-h-[64px]'
  }

  return (
    <div className={`relative group flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 ${className} min-h-[60px] md:min-h-[90px] ${isInternational ? 'min-w-[200px] md:min-w-[280px]' : 'min-w-[160px] md:min-w-[220px]'}`}>
      {hasError ? (
        <span className="font-bold text-white/90 text-sm md:text-base font-syncopate text-center whitespace-normal leading-tight px-4">
          {name}
          {region && (
            <span className="block text-[10px] text-orange mt-1">{region}</span>
          )}
        </span>
      ) : (
        <img
          src={`/images/clients/${filename}`}
          alt={`${name} logo`}
          loading="lazy"
          decoding="async"
          className={`w-auto object-contain transition-all duration-300 ${getMaxHeight()}`}
          onError={() => setHasError(true)}
        />
      )}
      {region && !hasError && (
        <div className="absolute -bottom-8 md:-bottom-5 left-0 right-0 flex justify-center opacity-100 pointer-events-none z-20">
          <span className="bg-orange/10 border border-orange/30 text-[10px] md:text-xs font-syncopate text-orange tracking-widest uppercase px-3 py-1 rounded backdrop-blur-sm">
            {region}
          </span>
        </div>
      )}
    </div>
  )
}

const Clients = () => {
    const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 })

    const nationalClients1 = [
        { name: "Schneider Electric", domain: "se.com", logoFile: "Schneider.png" },
        { name: "Bureau Veritas", domain: "bureauveritas.com", logoFile: "bureau-veritas.png" },
        { name: "SOGEA Maroc", domain: "sogea-maroc.com", logoFile: "sogea-maroc.png" },
        { name: "Cámara Española de Comercio", domain: "camacoescasablanca.com", logoFile: "camara-espanola-de-comercio.png" },
        { name: "Forever Living Products", domain: "foreverliving.com", logoFile: "forever-living-products.svg" },
        { name: "Wilo", domain: "wilo.com", logoFile: "wilo.png" },
        { name: "Totalcall", domain: "total-call.ma", logoFile: "totalcall.png" },
        { name: "CHU Tanger", domain: "sante.gov.ma", logoFile: 'chutanger.png' },
        { name: "Dachser Intelligent Logistics", domain: "dachser.com", logoFile: "Dachser-logo.png" },
        { name: "Jossour Ingénierie", domain: "jossourgroup.com", logoFile: "Jossour-Group.png" },
        { name: "CLEDOR", domain: "cledor.ma", logoFile: 'cledor.png' },
        { name: "Famasser", domain: "famasser.ma", logoFile: 'famasser.png' },
        { name: "C.T.P.C", domain: "ctpc.ma", logoFile: 'ctpc.ma.png' },
        { name: "AXELI", domain: "axeli.ma", logoFile: 'axeli.ma.png' },
        { name: "SOFT RETAIL", domain: "softretail.ma" },
    ]

    const nationalClients2 = [
        { name: "ATIK", domain: "atik.ma" },
        { name: "SEKOYA", domain: "sekoya.ma" },
        { name: "Motomania", domain: "motomaniamaroc.com", logoFile: 'motomaniamaroc.png' },
        { name: "LIDER", domain: "lider.ma", logoFile: 'Lider.png' },
        { name: "INVEST Magazine", domain: "investmagazine.ma", logoFile: 'InvestMAGh.png' },
        { name: "Industrie du Maroc", domain: "industries.ma", logoFile: 'investmagazine.png' },
        { name: "BEDFLEX", domain: "bedflex.com", logoFile: 'Badflex.png' },
        { name: "UNECLAIR", domain: "uneclair.ma", logoFile: 'Uneclaire.png' },
        { name: "Arcomel", domain: "arcomel.com", logoFile: 'Arcomel.png' },
        { name: "Maamar Import-Export", domain: "maamar.ma", logoFile: 'Maamar_Xport.png' },
        { name: "TAKOS KING", domain: "kingtacos.ma", logoFile: 'kingtacos.png' },
        { name: "Nabab", domain: "nabab.fr", logoFile: 'Nabab.png' },
        { name: "AUTO & CAR GLASS", domain: "autoglass.ma", logoFile: 'Auto Car Glass.png' },
        { name: "FID", domain: "fid.ma", logoFile: 'fermetures2000.png' },
        { name: "RÉSOLUTION CALL", domain: "resolutioncall.com", logoFile: 'ResolutionCall.png' },
        { name: "Telecom Academy", domain: "telecomacademy.ma" }
    ]

    const internationalClients = [
        { name: "Schneider Electric", region: "France", domain: "se.com", logoFile: 'Schneider_FR.png' },
        { name: "GST Global Services", domain: "gst-globalservices.com", logoFile: 'GST.png' },
        { name: "SMHOP", domain: "smhop.ma", logoFile: 'smhop_logo.png' },
        { name: "Schneider Electric", region: "Algérie", domain: "se.com", logoFile: 'Schneider_DZ.png' },
        { name: "Schneider Electric", region: "Tunisie", domain: "se.com", logoFile: 'Schneider_TN.png' },
        { name: "MATRAN COMPANY", domain: "matran.com", logoFile: 'Matran.png' }
    ]

  // Calculate duration for smooth marquee - just 2 copies needed for infinite loop
  const SPEED_PER_ITEM = 8;
  const nationalDuration1 = `${nationalClients1.length * SPEED_PER_ITEM}s`;
  const nationalDuration2 = `${nationalClients2.length * SPEED_PER_ITEM}s`;
  const internationalDuration = `${internationalClients.length * SPEED_PER_ITEM}s`;
  
  // Create pairs for seamless infinite scroll (only 2 copies needed)
  const marqueeNationals1 = [...nationalClients1, ...nationalClients1]
  const marqueeNationals2 = [...nationalClients2, ...nationalClients2]
  const marqueeInternationals = [...internationalClients, ...internationalClients]

    return (
        <section
            id="clients"
            ref={sectionRef}
            className="py-24 bg-midnight relative overflow-hidden"
        >
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 mb-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-orange font-mono text-sm tracking-widest uppercase mb-4 block">
                        {'// ILS NOUS FONT CONFIANCE'}
                    </span>
                </motion.div>
            </div>

            {/* Divider Nationaux */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 mb-4">
                <div className="flex items-center justify-center gap-4 opacity-50">
                    <div className="h-px bg-white/20 w-12 md:w-24" />
                    <span className="font-mono text-[10px] tracking-widest text-white uppercase">
                        Partenaires Nationaux
                    </span>
                    <div className="h-px bg-white/20 w-12 md:w-24" />
                </div>
            </div>

            {/* Marquee 1: Nationaux (Row 1 - Left to Right) */}
            <div className="relative w-full mb-4 md:mb-6 flex mask-linear">
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-midnight to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-midnight to-transparent z-10" />

                <div
                    className="flex shrink-0 gap-12 md:gap-16 pr-12 md:pr-16 items-center flex-nowrap animate-marquee will-change-transform"
                    style={{ animationDuration: nationalDuration1 }}
                >
                    {marqueeNationals1.map((client, index) => (
                        <ClientLogo
                            key={`nat1-${index}`}
                            name={client.name}
                            region={client.region}
                            logoFile={client.logoFile}
                            className="flex-shrink-0"
                        />
                    ))}
                </div>
                <div
                    className="flex shrink-0 gap-12 md:gap-16 pr-12 md:pr-16 items-center flex-nowrap animate-marquee will-change-transform"
                    aria-hidden="true"
                    style={{ animationDuration: nationalDuration1 }}
                >
                    {marqueeNationals1.map((client, index) => (
                        <ClientLogo
                            key={`nat1-dup-${index}`}
                            name={client.name}
                            region={client.region}
                            logoFile={client.logoFile}
                            className="flex-shrink-0"
                        />
                    ))}
                </div>
            </div>

            {/* Marquee 2: Nationaux (Row 2 - Right to Left) */}
            <div className="relative w-full mb-6 md:mb-8 flex mask-linear">
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-midnight to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-midnight to-transparent z-10" />

                <div
                    className="flex shrink-0 gap-12 md:gap-16 pr-12 md:pr-16 items-center flex-nowrap animate-marquee-reverse will-change-transform"
                    style={{ animationDuration: nationalDuration2 }}
                >
                    {marqueeNationals2.map((client, index) => (
                        <ClientLogo
                            key={`nat2-${index}`}
                            name={client.name}
                            region={client.region}
                            logoFile={client.logoFile}
                            className="flex-shrink-0"
                        />
                    ))}
                </div>
                <div
                    className="flex shrink-0 gap-12 md:gap-16 pr-12 md:pr-16 items-center flex-nowrap animate-marquee-reverse will-change-transform"
                    aria-hidden="true"
                    style={{ animationDuration: nationalDuration2 }}
                >
                    {marqueeNationals2.map((client, index) => (
                        <ClientLogo
                            key={`nat2-dup-${index}`}
                            name={client.name}
                            region={client.region}
                            logoFile={client.logoFile}
                            className="flex-shrink-0"
                        />
                    ))}
                </div>
            </div>

            {/* Divider Internationaux */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 mb-4">
                <div className="flex items-center justify-center gap-4 opacity-50">
                    <div className="h-px bg-white/20 w-12 md:w-24" />
                    <span className="font-mono text-[10px] tracking-widest text-white uppercase">
                        Rayonnement International
                    </span>
                    <div className="h-px bg-white/20 w-12 md:w-24" />
                </div>
            </div>

            {/* Marquee 3: Internationaux (Left to Right) */}
            <div className="relative w-full flex">
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-midnight to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-midnight to-transparent z-10" />

                <div
                    className="flex shrink-0 gap-16 md:gap-20 pr-16 md:pr-20 items-center flex-nowrap animate-marquee will-change-transform"
                    style={{ animationDuration: internationalDuration }}
                >
                    {marqueeInternationals.map((client, index) => (
                        <ClientLogo
                            key={`int-${index}`}
                            name={client.name}
                            region={client.region}
                            logoFile={client.logoFile}
                            className="flex-shrink-0"
                            isInternational={true}
                        />
                    ))}
                </div>
                <div
                    className="flex shrink-0 gap-16 md:gap-20 pr-16 md:pr-20 items-center flex-nowrap animate-marquee will-change-transform"
                    aria-hidden="true"
                    style={{ animationDuration: internationalDuration }}
                >
                    {marqueeInternationals.map((client, index) => (
                        <ClientLogo
                            key={`int-dup-${index}`}
                            name={client.name}
                            region={client.region}
                            logoFile={client.logoFile}
                            className="flex-shrink-0"
                            isInternational={true}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Clients
