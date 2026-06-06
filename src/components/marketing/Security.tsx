import React from 'react'
import { Lock } from 'lucide-react'
import { motion } from 'framer-motion'

export const Security: React.FC = () => {
  return (
    <section id="security" className="py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="md:w-1/2 space-y-8"
        >
          <h2 className="text-3xl md:text-5xl font-black leading-tight">Your Data is Yours. <br/><span className="text-rose-400">Zero Exceptions.</span></h2>
          <p className="text-lg text-slate-400">
            We understand that enterprise data is your most valuable asset. OmniAgent is built on a Zero-Trust architecture.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-slate-300 font-medium">
              <Lock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              100% Data Isolation per Tenant
            </li>
            <li className="flex items-center gap-3 text-slate-300 font-medium">
              <Lock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              End-to-End AES-256 Encryption
            </li>
            <li className="flex items-center gap-3 text-slate-300 font-medium">
              <Lock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              No AI-Training on Your Data
            </li>
            <li className="flex items-center gap-3 text-slate-300 font-medium">
              <Lock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              SOC2 Type II & GDPR Compliant
            </li>
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="md:w-1/2 w-full"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
            <pre className="text-xs font-mono text-emerald-400 bg-slate-950 p-4 rounded-lg overflow-x-auto border border-slate-800">
{`CREATE POLICY "Tenant Isolation Policy"
ON public.documents
FOR ALL
USING (
  tenant_id = auth.jwt() ->> 'tenant_id'
);

-- Access mathematically guaranteed
-- by Postgres RLS Engine.`}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
