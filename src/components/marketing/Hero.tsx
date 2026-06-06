import React from 'react'
import { ChevronRight } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'

interface HeroProps {
  onSubscribe: (plan: string) => void
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }
  }
}

export const Hero: React.FC<HeroProps> = ({ onSubscribe }) => {
  return (
    <section className="relative pt-40 pb-20 px-6">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        className="max-w-5xl mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
          The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">GraphRAG</span> Platform<br/> for Enterprise AI.
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Deploy autonomous multi-agent systems connected to your private enterprise data. 100% data isolation, zero-knowledge architecture, and unparalleled reasoning capabilities.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => onSubscribe('pro')}
            className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-xl text-lg font-black transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 transform hover:-translate-y-1"
          >
            Get Started Now <ChevronRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:-translate-y-1">
            Book a Demo
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
