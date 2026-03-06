'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from 'framer-motion'
import {
  Bot,
  Calendar,
  Layout,
  Smartphone,
  MessageSquare,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Clock,
  CalendarCheck,
  GraduationCap,
  CreditCard,
  ClipboardList,
  Camera,
  LayoutDashboard,
  QrCode,
  Globe
} from 'lucide-react'

/* --- data --- */

const features = [
  { icon: Bot, title: 'AI Chatbot / Voice Agent', desc: 'Automatisierte G\u00e4ste-Kommunikation rund um die Uhr.', num: '01' },
  { icon: Calendar, title: 'Dienstplan 2.0', desc: 'Smarte Schichtplanung: Tauschb\u00f6rse & Urlaubs-Workflow.', num: '02' },
  { icon: CalendarCheck, title: 'Reservierungstool', desc: 'Einfaches Handling und Optimierung deiner Tische.', num: '03' },
  { icon: Smartphone, title: 'Inventory App', desc: 'Warenmanagement & Inventur per Smartphone.', num: '04' },
  { icon: GraduationCap, title: 'LMS', desc: 'Digitale Einarbeitung & Schulung f\u00fcr das Team.', num: '05' },
  { icon: CreditCard, title: 'POS Integration', desc: 'Anbindung an bestehende Kassensysteme.', num: '06' },
  { icon: Clock, title: 'Zeiterfassung', desc: 'Einfache digitale Stempeluhr f\u00fcr dein Team.', num: '07' },
  { icon: MessageSquare, title: 'Feedback-Tool', desc: 'Direktes G\u00e4ste-Feedback einsammeln & auswerten.', num: '08' },
  { icon: ClipboardList, title: 'Putzpl\u00e4ne', desc: 'Strukturierte Abl\u00e4ufe f\u00fcr Open, Shift & Close.', num: '09' },
  { icon: Camera, title: 'Social Media', desc: 'High-End Content & vollumf\u00e4ngliches Management.', num: '10' },
  { icon: LayoutDashboard, title: 'Mission Control', desc: 'Dashboard, Website, Digitale und Print Men\u00fcs.', num: '11' },
  { icon: Globe, title: 'Website & SEO/GEO', desc: 'Hochperformante Landingpages & Visibility.', num: '12' },
  { icon: QrCode, title: 'Digitale & Print Men\u00fcs', desc: 'Dynamic QR-Men\u00fcs & edles Print-Design.', num: '13' },
]

const projects = [
  { src: '/images/chopchop_ref_b01.webp', title: 'Sakura Lounge', cat: 'Restaurant' },
  { src: '/images/chopchop_ref_b02.webp', title: 'Noir Bistro', cat: 'Bar & Dining' },
  { src: '/images/chopchop_ref_b03.webp', title: 'Verde Kitchen', cat: 'Fast Casual' },
  { src: '/images/chopchop_ref_b04.webp', title: 'Alma Rooftop', cat: 'Rooftop Bar' },
  { src: '/images/chopchop_ref_b05.webp', title: 'Kupfer & Malz', cat: 'Brauhaus' },
  { src: '/images/chopchop_ref_b06.webp', title: 'Maison Blanche', cat: 'Fine Dining' },
  { src: '/images/chopchop_ref_b07.webp', title: 'Street Wok', cat: 'Street Food' },
  { src: '/images/chopchop_ref_b08.webp', title: 'Oceano', cat: 'Seafood' },
  { src: '/images/chopchop_ref_b09.webp', title: 'Glut & Rauch', cat: 'BBQ House' },
  { src: '/images/chopchop_ref_b10.webp', title: 'Caf\u00e9 Morgen', cat: 'Caf\u00e9' },
]

const formServices = [
  'AI Chatbot / Voice Agent: Automatisierte Gäste-Kommunikation.',
  'Dienstplan 2.0: Smarte Schichtplanung (Tauschbörse, Urlaubs-Workflow).',
  'Reservierungstool: Einfaches Handling deiner Tische.',
  'Inventory App: Warenmanagement & Inventur per Smartphone.',
  'LMS (Learning Management): Digitale Einarbeitung & Schulung für das Team.',
  'POS Integration: Anbindung an bestehende Kassensysteme.',
  'Zeiterfassung: Digitale Stempeluhr.',
  'Feedback-Tool: Direktes Gäste-Feedback einsammeln.',
  'Putzpläne: Strukturierte Abläufe für Open/Shift/Close.',
  'Social Media & Foto/Video: High-End Content & Management.',
  'Dashboard / Mission Control, Website, Digitale und Print Menüs',
  'Website & SEO/GEO: Hochperformante Landingpages & Visibility.',
  'Digitale & Print Menüs: Dynamic QR-Menüs & edles Print-Design.',
  'Alles',
]

/* --- helpers --- */

function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.5, delay: delay + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
          style={{ transformOrigin: 'bottom' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

function RevealOnScroll({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Marquee({ children, speed = 30 }: { children: React.ReactNode; speed?: number }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}

/* --- main --- */

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const portfolioRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: portfolioProgress } = useScroll({
    target: portfolioRef,
    offset: ['start start', 'end end'],
  })
  const smoothProgress = useSpring(portfolioProgress, { stiffness: 100, damping: 30 })
  const xTranslate = useTransform(smoothProgress, [0, 1], ['0%', '-60%'])

  const heroRef = useRef(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], [0, 300])
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="noise" />

      {/* Nav */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md' : 'mix-blend-difference'}`}>
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center h-20">
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center gap-3 group"
            >
              <span className="text-xl font-bold tracking-[-0.08em] uppercase">
                CHOP CHOP <span className="text-white/50 text-base font-normal">- DIGITAL SOLUTIONS</span>
              </span>
            </motion.a>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] font-medium"
            >
              <a href="#work" className="hover-underline">Arbeiten</a>
              <a href="#contact" className="hover-underline">Kontakt</a>
            </motion.div>

            <button className="md:hidden relative z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8"
          >
            {(['Arbeiten', 'Leistungen', 'Kontakt'] as const).map((item, i) => (
              <motion.a
                key={item}
                href={`#${item === 'Arbeiten' ? 'work' : item === 'Leistungen' ? 'features' : 'contact'}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-5xl font-bold tracking-tighter uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-end pb-20 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/images/chopchop_02.webp"
            alt="Hero Background"
            fill
            className="object-cover opacity-40 mix-blend-screen"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-[1800px] mx-auto px-6 md:px-12 w-full relative z-10">
          <div className="mb-8">
            <div className="overflow-hidden">
              <h1 className="text-[clamp(3rem,10vw,12rem)] font-bold tracking-[-0.06em] leading-[0.85] uppercase">
                <SplitText text="We Chop" delay={0.4} />
                <br />
                <SplitText text="The Noise." delay={0.8} className="text-white/30" />
              </h1>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-16">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md text-white/50 text-sm md:text-base leading-relaxed"
            >
              Digitale L&ouml;sungen f&uuml;r die Gastronomie. Wir bauen genau die Tools,
              die dein Betrieb braucht &mdash; schnell, smart, flexibel.
            </motion.p>
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-4 border border-white/20 rounded-full px-8 py-4 hover:bg-white hover:text-black transition-colors duration-300"
            >
              <span className="text-sm uppercase tracking-[0.15em] font-medium">Zur Umfrage</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[200px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-white rounded-full blur-[160px]"
        />
      </section>

      {/* Marquee divider */}
      <section className="py-6 border-y border-white/10">
        <Marquee speed={25}>
          <span className="text-[clamp(1rem,3vw,2rem)] font-bold tracking-[-0.04em] uppercase text-white/10 mx-8">
            Web Design &bull; AI Automation &bull; Gastro Tech &bull; Inventory &bull; Dienstplanung &bull; Chatbots &bull; Zeiterfassung &bull; Feedback &bull;&nbsp;
          </span>
        </Marquee>
      </section>

      {/* Portfolio / Work */}
      <section id="work" ref={portfolioRef} className="relative h-[200vh] z-0">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <motion.div
            style={{ x: xTranslate }}
            className="flex gap-6 px-6 md:px-12"
          >
            {projects.map((project, i) => (
              <motion.div
                key={i}
                className="relative flex-shrink-0 w-[75vw] md:w-[40vw] lg:w-[30vw] group cursor-pointer"
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <motion.div
                    initial={{ scale: 1.3 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="w-full h-full"
                  >
                    <Image
                      src={project.src}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 75vw, 30vw"
                    />
                  </motion.div>
                </div>
                <div className="absolute -top-4 -left-2 text-[8rem] md:text-[10rem] font-bold leading-none text-white/[0.03] tracking-tighter pointer-events-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      {/* Aggressive negative margin to perfectly overlap the black void when the sticky horizontal container unsticks */}
      <section id="features" className="relative z-20 pt-10 md:pt-20 pb-16 md:pb-24 bg-black" style={{ marginTop: '-80vh' }}>
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left: heading + features list */}
            <div className="flex-1 min-w-0">
              <RevealOnScroll>
                <div className="mb-10">
                  <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-bold tracking-[-0.06em] uppercase leading-none mb-3">
                    Was wir<br />liefern.
                  </h2>
                  <p className="text-white/40 max-w-sm text-xs leading-relaxed">
                    Alles was du brauchst, um deinen Betrieb ins Jahr 2026 zu bringen. Kein Overhead, kein Bullshit.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <div className="space-y-0 h-[450px] overflow-y-auto pr-4 custom-scrollbar">
                  {features.map((f, i) => (
                    <motion.div
                      key={i}
                      className="group border-t border-white/10 py-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-8 cursor-default"
                      whileHover={{ x: 20 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="text-white/15 text-xs font-mono">{f.num}</span>
                      <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 shrink-0">
                        <f.icon size={16} />
                      </div>
                      <h3 className="text-lg md:text-2xl font-bold tracking-tight flex-1">{f.title}</h3>
                      <p className="text-white/40 text-xs md:text-sm md:w-[280px] lg:w-[320px] text-left shrink-0 pointer-events-none">{f.desc}</p>
                      <ArrowUpRight size={16} className="text-white/10 group-hover:text-white transition-colors duration-300 hidden md:block shrink-0" />
                    </motion.div>
                  ))}
                  <div className="border-t border-white/10" />
                </div>
                <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/30 text-center animate-pulse">
                  Scroll for more ↓
                </div>
              </RevealOnScroll>
            </div>

            {/* Right: image */}
            <RevealOnScroll delay={0.2} className="hidden lg:block flex-shrink-0 w-[300px] xl:w-[360px]">
              <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden sticky top-24">
                <Image
                  src="/images/chopchop_03.webp"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Marquee CTA */}
      <section className="py-6 border-y border-white/10">
        <Marquee speed={20}>
          <span className="text-[clamp(2rem,6vw,5rem)] font-bold tracking-[-0.04em] uppercase text-white/5 mx-4">
            Bereit loszulegen? &bull; Lass uns reden &bull; Projekt starten &bull; Digital werden &bull;&nbsp;
          </span>
        </Marquee>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 md:py-48">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <RevealOnScroll>
              <div>
                <h2 className="text-[clamp(2rem,5vw,5rem)] font-bold tracking-[-0.06em] uppercase leading-none mb-8">
                  Let&apos;s<br />talk.
                </h2>
                <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-md mb-12">
                  Du hast eine Idee, ein Problem, oder einfach Bock auf was Neues?
                  Schreib uns &mdash; wir melden uns innerhalb von 24h.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">Name</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-white focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/15"
                      placeholder="Dein Name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">E-Mail</label>
                    <input
                      type="email"
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-white focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/15"
                      placeholder="deine@mail.de"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">Betrieb</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-white focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/15"
                      placeholder="Name deines Betriebs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">Telefon</label>
                    <input
                      type="tel"
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-white focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/15"
                      placeholder="Deine Telefonnummer"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Dies interessiert mich besonders</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    {formServices.map((service, i) => (
                      <label key={i} className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center flex-shrink-0 w-4 h-4 mt-0.5">
                          <input type="checkbox" className="peer appearance-none w-4 h-4 border border-white/20 bg-white/5 rounded-sm checked:bg-white checked:border-white transition-colors cursor-pointer" />
                          <svg className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <span className="text-xs text-white/60 group-hover:text-white transition-colors leading-relaxed select-none">
                          {service}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">Nachricht</label>
                  <textarea
                    rows={4}
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-white focus:outline-none focus:border-white transition-colors duration-300 resize-none placeholder:text-white/15"
                    placeholder="Erz&auml;hl uns von deinem Projekt..."
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border border-white/20 text-white font-bold py-5 uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-black transition-colors duration-300"
                >
                  Anfrage senden
                </motion.button>
              </form>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 relative z-30 bg-black">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-[-0.06em] uppercase text-sm">Chop Chop</span>
          </div>
          <p className="text-white/20 text-xs tracking-[0.1em]">&copy; 2026 <a href="https://young-creatives.de" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">YOUNG CREATIVES</a>. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  )
}
