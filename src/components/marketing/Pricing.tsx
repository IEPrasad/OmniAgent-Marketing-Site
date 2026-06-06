import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface PricingProps {
  onSubscribe: (plan: string) => void
}

export const Pricing: React.FC<PricingProps> = ({ onSubscribe }) => {
  return (
    <section id="pricing" className="py-24 px-6 bg-slate-900/30 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4">Transparent Pricing</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Scale your AI infrastructure without unpredictable costs.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-950 border border-slate-800 rounded-3xl p-8 flex flex-col hover:border-slate-600 transition-colors"
          >
            <h3 className="text-xl font-bold text-slate-300 mb-2">Basic</h3>
            <div className="text-4xl font-black mb-6">$499<span className="text-lg text-slate-500 font-medium">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3 text-sm text-slate-400"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> 2GB Vector Storage</li>
              <li className="flex items-center gap-3 text-sm text-slate-400"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> 1M LLM Tokens/mo</li>
              <li className="flex items-center gap-3 text-sm text-slate-400"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> Up to 10 Users</li>
            </ul>
            <button onClick={() => onSubscribe('basic')} className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 py-3 rounded-xl font-bold transition-colors">
              Select Basic
            </button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-900 border-2 border-cyan-500 rounded-3xl p-8 flex flex-col relative transform shadow-[0_0_40px_rgba(6,182,212,0.15)] hover:shadow-[0_0_60px_rgba(6,182,212,0.25)] transition-shadow"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-950 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
              Most Popular
            </div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">Pro</h3>
            <div className="text-4xl font-black mb-6">$1,299<span className="text-lg text-slate-500 font-medium">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> 10GB Vector Storage</li>
              <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> 10M LLM Tokens/mo</li>
              <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> Unlimited Users</li>
              <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> Advanced GraphRAG</li>
            </ul>
            <button onClick={() => onSubscribe('pro')} className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-cyan-500/20">
              Select Pro
            </button>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-950 border border-slate-800 rounded-3xl p-8 flex flex-col hover:border-slate-600 transition-colors"
          >
            <h3 className="text-xl font-bold text-slate-300 mb-2">Enterprise</h3>
            <div className="text-4xl font-black mb-6">Custom</div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3 text-sm text-slate-400"><CheckCircle2 className="w-4 h-4 text-slate-600" /> Dedicated Infrastructure</li>
              <li className="flex items-center gap-3 text-sm text-slate-400"><CheckCircle2 className="w-4 h-4 text-slate-600" /> Unlimited Tokens</li>
              <li className="flex items-center gap-3 text-sm text-slate-400"><CheckCircle2 className="w-4 h-4 text-slate-600" /> Custom LLM Models</li>
              <li className="flex items-center gap-3 text-sm text-slate-400"><CheckCircle2 className="w-4 h-4 text-slate-600" /> 24/7 SLA Support</li>
            </ul>
            <button className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 py-3 rounded-xl font-bold transition-colors">
              Contact Sales
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
