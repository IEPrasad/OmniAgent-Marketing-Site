import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../components/marketing/Navbar'
import { Hero } from '../components/marketing/Hero'
import { UseCasesMarquee } from '../components/marketing/UseCasesMarquee'
import { Features } from '../components/marketing/Features'
import { Security } from '../components/marketing/Security'
import { Pricing } from '../components/marketing/Pricing'
import { Footer } from '../components/marketing/Footer'
import { TrialModal } from '../components/marketing/TrialModal'

export const LandingPage: React.FC = () => {
  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  const handleSubscribe = () => {
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      <Navbar onSubscribe={handleSubscribe} />
      <Hero onSubscribe={handleSubscribe} />
      <UseCasesMarquee />
      <Features />
      <Security />
      <Pricing onSubscribe={handleSubscribe} />
      <Footer />
      
      <TrialModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}
