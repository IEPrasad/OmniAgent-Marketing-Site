import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  onSubscribe: (plan: string) => void
}

const NAV_LINKS = [
  { name: 'Features', href: '/#features' },
  { name: 'Architecture', href: '/#architecture' },
  { name: 'Security', href: '/#security' },
  { name: 'Pricing', href: '/#pricing' },
]

export const Navbar: React.FC<NavbarProps> = ({ onSubscribe }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If we are already on the landing page, smoothly scroll.
    if (location.pathname === '/') {
      e.preventDefault()
      const targetId = href.split('#')[1]
      const elem = document.getElementById(targetId)
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', href)
      }
    } else {
      // If we are on Privacy/Terms, let React Router navigate to the hash
      e.preventDefault()
      navigate(href)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center mr-1">
            <img src="/logo.png" alt="OmniAgent Logo" className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-100 group-hover:text-cyan-400 transition-colors">Omni<span className="text-cyan-500">Agent</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-5 py-2 text-sm font-bold text-slate-300 transition-colors hover:text-white"
            >
              <span className="relative z-10">{link.name}</span>
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    className="absolute inset-0 bg-slate-800/80 rounded-full z-0"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.15 } }}
                    exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
                  />
                )}
              </AnimatePresence>
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://www.springleafy.com"
            className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Springleafy
          </a>
          <button 
            onClick={() => onSubscribe('pro')}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2.5 rounded-xl text-sm font-black transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-0.5 active:translate-y-0"
          >
            Start Free Trial
          </button>
        </div>
      </div>
    </nav>
  )
}
