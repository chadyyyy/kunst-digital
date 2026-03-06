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

  // Unified visual sizing - international logos are larger for prominence
  const logoClasses = isInternational
    ? 'w-auto h-auto max-w-[160px] md:max-w-[200px] max-h-[52px] md:max-h-[64px] object-contain'
    : 'w-auto h-auto max-w-[100px] md:max-w-[130px] max-h-[36px] md:max-h-[46px] object-contain'

  // Container sizing - international logos need larger containers + extra height for region labels
  const containerClasses = isInternational
    ? 'h-[120px] md:h-[140px] w-[200px] md:w-[280px] flex flex-col items-center justify-center gap-3'
    : 'h-[80px] md:h-[100px] w-[140px] md:w-[200px] flex items-center justify-center'

  return (
    <div className={`group grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 ${className} ${containerClasses}`}>
      {hasError ? (
        <div className="flex flex-col items-center text-center">
          <span className="font-bold text-white/90 text-sm md:text-base font-syncopate leading-tight px-2">
            {name}
          </span>
          {region && (
            <span className="mt-2 text-[10px] md:text-xs text-orange font-syncopate tracking-widest uppercase bg-orange/10 border border-orange/30 px-2 py-0.5 rounded">
              {region}
            </span>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={`/images/clients/${filename}`}
            alt={`${name} logo`}
            loading="lazy"
            decoding="async"
            className={logoClasses}
            onError={() => setHasError(true)}
          />
          {region && (
            <span className="mt-2 md:mt-3 text-[10px] md:text-xs font-syncopate text-orange tracking-widest uppercase bg-orange/10 border border-orange/30 px-2 py-0.5 md:px-3 md:py-1 rounded">
              {region}
            </span>
          )}
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
    { name: "MATRAN COMPANY", region: "Espagne", domain: "matran.com", logoFile: 'Matran.png' }
  ]

  // Calculate duration for smooth marquee (numbers for Framer Motion)
  const SPEED_PER_ITEM = 8;
  const durNat1 = nationalClients1.length * SPEED_PER_ITEM;
  const durNat2 = nationalClients2.length * SPEED_PER_ITEM;
  const durInt = internationalClients.length * SPEED_PER_ITEM;

  const MarqueeRow = ({ items, duration, reverse = false, isInternational = false, prefix }) => {
    // 4 exact copies ensures enough width for ultra-wide screens without empty gaps.
    // Translating exactly -25% (1 copy's width) makes the loop mathematically seamless.
    const repeatedItems = [...Array(4)].flatMap((_, arrayIndex) =>
      items.map((client, index) => (
        <ClientLogo
          key={`${prefix}-${arrayIndex}-${index}`}
          name={client.name}
          region={client.region}
          logoFile={client.logoFile}
          className={`flex-shrink-0 ${isInternational ? 'mr-16 md:mr-20' : 'mr-12 md:mr-16'}`}
          isInternational={isInternational}
        />
      ))
    );

    return (
      <div className={`relative w-full ${isInternational ? '' : 'mb-4 md:mb-8'} flex overflow-hidden`}>
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-midnight to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-midnight to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex shrink-0 w-max items-center flex-nowrap will-change-transform"
          animate={{ x: reverse ? ["-25%", "0%"] : ["0%", "-25%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: duration }}
        >
          {repeatedItems}
        </motion.div>
      </div>
    );
  };

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
      <MarqueeRow items={nationalClients1} duration={durNat1} prefix="nat1" />

      {/* Marquee 2: Nationaux (Row 2 - Right to Left) */}
      <MarqueeRow items={nationalClients2} duration={durNat2} reverse={true} prefix="nat2" />

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
      <MarqueeRow items={internationalClients} duration={durInt} isInternational={true} prefix="int" />
    </section>
  )
}

export default Clients
