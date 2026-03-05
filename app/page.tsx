'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Bot, 
  Calendar, 
  Layout, 
  Smartphone, 
  MessageSquare, 
  CheckCircle,
  Menu,
  X,
  ArrowRight,
  Clock,
  ClipboardList
} from 'lucide-react'

const features = [
  { icon: Bot, title: 'AI Chatbots', desc: 'Automatisierte Gäste-Kommunikation rund um die Uhr.' },
  { icon: Calendar, title: 'Dienstplan 2.0', desc: 'Smarte Schichtplanung mit Tauschbörse und Urlaubsmanagement.' },
  { icon: Smartphone, title: 'Inventory App', desc: 'Warenmanagement und Inventur direkt vom Smartphone.' },
  { icon: Layout, title: 'Modern Web', desc: 'Hochperformante Landingpages für Gastro & Real Estate.' },
  { icon: MessageSquare, title: 'Feedback Tools', desc: 'Echtes Gäste-Feedback für kontinuierliche Verbesserung.' },
  { icon: Clock, title: 'Zeiterfassung', desc: 'Einfache digitale Stempeluhr für dein Team.' },
]

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white text-black font-bold flex items-center justify-center rounded">C</div>
              <span className="text-xl font-bold tracking-tighter">CHOP CHOP</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
              <a href="#features" className="hover:text-white transition-colors">Leistungen</a>
              <a href="#about" className="hover:text-white transition-colors">Über uns</a>
              <a href="#contact" className="bg-white text-black px-4 py-2 rounded hover:bg-white/90 transition-colors">Jetzt starten</a>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 bg-white/10 text-white/70 text-xs font-medium rounded-full mb-6 border border-white/20">
              Digital Agency für Gastronomie
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
              WE CHOP THE NOISE.<br />
              <span className="text-white/50">YOU FOCUS ON TASTE.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-white/60 mb-10">
              Wir digitalisieren deinen Betrieb mit smarten Lösungen, die Zeit sparen und den Umsatz steigern. Von AI-Automatisierung bis zum intelligenten Team-Management.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#contact" className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-all">
                Projekt starten <ArrowRight size={18} />
              </a>
              <a href="#features" className="w-full sm:w-auto px-8 py-4 rounded border border-white/10 hover:bg-white/5 transition-all">
                Unsere Leistungen
              </a>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 blur-[120px] rounded-full -z-10" />
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Digitale Werkzeuge.</h2>
            <p className="text-white/50">Alles was du brauchst, um deinen Betrieb ins Jahr 2026 zu bringen.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-xl bg-black border border-white/5 hover:border-white/20 transition-all group"
              >
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all">
                  <f.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="contact" className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-950 p-8 md:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center">Bist du bereit?</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Name</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-white/40 transition-all" placeholder="Dein Name" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">E-Mail</label>
                  <input type="email" className="w-full bg-black border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-white/40 transition-all" placeholder="deine@mail.de" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Betrieb / Website</label>
                <input type="text" className="w-full bg-black border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-white/40 transition-all" placeholder="Name deines Betriebs" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Wie können wir helfen?</label>
                <textarea rows={4} className="w-full bg-black border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-white/40 transition-all" placeholder="Erzähl uns von deinem Projekt..." />
              </div>
              <button className="w-full bg-white text-black font-bold py-4 rounded hover:bg-white/90 transition-all">
                Anfrage senden
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white text-black font-bold flex items-center justify-center rounded text-xs">C</div>
            <span className="font-bold tracking-tighter">CHOP CHOP</span>
          </div>
          <p className="text-white/30 text-sm">© 2026 Young Creatives. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  )
}
