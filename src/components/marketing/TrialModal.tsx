import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Building2, ChevronRight, Database, BrainCircuit, ShieldCheck, Lock } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface TrialModalProps {
  isOpen: boolean
  onClose: () => void
}

export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [company, setCompany] = useState('')
  const [useCase, setUseCase] = useState('')
  const [error, setError] = useState('')

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setEmail('')
      setPassword('')
      setCompany('')
      setUseCase('')
      setError('')
    }
  }, [isOpen])

  // Actual provisioning steps
  const handleProvision = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!company || !useCase) return
    setError('')
    setStep(3)

    try {
      // Step 3 (Visual DB Provisioning)
      // 1. Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError
      if (!authData.user) throw new Error("Failed to create user account.")

      await new Promise(resolve => setTimeout(resolve, 1500))
      setStep(4) // Visual Agent Swarms

      // 2. Create the Company as 'pending' on free tier
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert({
          name: company,
          stripe_plan: 'free', // Force free tier initially
          status: 'pending' // Wait for admin approval
        })
        .select()
        .single()

      if (companyError) {
        console.error("Company Creation Error:", companyError)
        // If RLS blocks this or schema is out of date, fail loudly so the user knows!
        throw new Error("Could not create company. Make sure update_companies_for_registration.sql has been executed in Supabase.")
      }

      await new Promise(resolve => setTimeout(resolve, 1500))
      setStep(5) // Visual Securing

      const companyId = companyData?.id || 'mock-company-id'

      // 3. Update profile to link company
      await supabase
        .from('profiles')
        .update({
          company_id: companyId,
          role: 'admin',
          status: 'active'
        })
        .eq('id', authData.user.id)

      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Finished! Show success message in modal
      setStep(6)
      
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'An error occurred during provisioning.')
      setStep(2) // Go back to form to show error
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
            onClick={step < 3 ? onClose : undefined}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 shadow-[0_0_50px_rgba(6,182,212,0.15)] rounded-3xl overflow-hidden"
          >
            {/* Close button */}
            {step < 3 && (
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-300 bg-slate-800/50 hover:bg-slate-800 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="mb-8">
                      <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
                        <Mail className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h2 className="text-2xl font-black text-slate-100 mb-2">Start your 14-day free trial</h2>
                      <p className="text-slate-400">Experience the power of Enterprise GraphRAG. No credit card required to start.</p>
                    </div>
                    
                    <form onSubmit={(e) => { e.preventDefault(); if(email && password) setStep(2); }}>
                      <label className="block text-sm font-bold text-slate-300 mb-2">Work Email</label>
                      <input 
                        type="email" 
                        autoFocus
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com" 
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all mb-4" 
                      />

                      <label className="block text-sm font-bold text-slate-300 mb-2">Password</label>
                      <div className="relative mb-6">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input 
                          type="password" 
                          required
                          minLength={8}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••" 
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all" 
                        />
                      </div>

                      <button 
                        type="submit"
                        disabled={!email || !password || password.length < 8}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                      >
                        Continue <ChevronRight className="w-4 h-4" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="mb-8">
                      <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                        <Building2 className="w-6 h-6 text-purple-400" />
                      </div>
                      <h2 className="text-2xl font-black text-slate-100 mb-2">Tell us about your team</h2>
                      <p className="text-slate-400">We'll customize your isolated tenant based on your use case.</p>
                    </div>

                    {error && (
                      <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm p-3 rounded-lg mb-6">
                        {error}
                      </div>
                    )}
                    
                    <form onSubmit={handleProvision}>
                      <div className="mb-5">
                        <label className="block text-sm font-bold text-slate-300 mb-2">Company Name</label>
                        <input 
                          type="text" 
                          required
                          autoFocus
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Acme Corp" 
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all" 
                        />
                      </div>
                      
                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-300 mb-2">Primary Use Case</label>
                        <select 
                          required
                          value={useCase}
                          onChange={(e) => setUseCase(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all appearance-none"
                        >
                          <option value="" disabled>Select a use case...</option>
                          <option value="legal">Legal & Compliance Analysis</option>
                          <option value="finance">Financial Data Processing</option>
                          <option value="engineering">Codebase Generation & Review</option>
                          <option value="support">Customer Support Automation</option>
                          <option value="other">Other Enterprise Workloads</option>
                        </select>
                      </div>

                      <div className="flex gap-3">
                        <button 
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-4 py-3 rounded-xl font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                        >
                          Back
                        </button>
                        <button 
                          type="submit"
                          disabled={!company || !useCase}
                          className="flex-1 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                        >
                          Initialize Environment
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {step >= 3 && step < 6 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 flex flex-col items-center justify-center text-center"
                  >
                    <div className="relative mb-8">
                      <div className="w-24 h-24 border-4 border-slate-800 border-t-cyan-500 rounded-full animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        {step === 3 && <Database className="w-8 h-8 text-cyan-400 animate-pulse" />}
                        {step === 4 && <BrainCircuit className="w-8 h-8 text-purple-400 animate-pulse" />}
                        {step === 5 && <ShieldCheck className="w-8 h-8 text-emerald-400 animate-pulse" />}
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-black text-slate-100 mb-2">
                      {step === 3 && "Provisioning Isolated Database..."}
                      {step === 4 && "Deploying Agent Swarms..."}
                      {step === 5 && "Securing Tenant Environment..."}
                    </h2>
                    <p className="text-slate-400 text-sm">
                      {step === 3 && "Setting up Postgres RLS and dedicated vector stores."}
                      {step === 4 && "Initializing multi-agent graph network."}
                      {step === 5 && "Applying enterprise encryption and policies."}
                    </p>
                    
                    <div className="w-full h-1.5 bg-slate-800 rounded-full mt-8 overflow-hidden">
                      <motion.div 
                        className="h-full bg-cyan-500"
                        initial={{ width: "0%" }}
                        animate={{ width: step === 3 ? "33%" : step === 4 ? "66%" : "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 6 && (
                  <motion.div 
                    key="step6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                      <ShieldCheck className="w-10 h-10 text-emerald-400" />
                    </div>
                    
                    <h2 className="text-2xl font-black text-slate-100 mb-2">
                      Successfully Enrolled!
                    </h2>
                    <p className="text-slate-400 mb-8">
                      Your free tier organization <strong>{company}</strong> has been provisioned and is currently pending administrator approval. We will notify you once it's fully active.
                    </p>
                    
                    <button 
                      onClick={onClose}
                      className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                    >
                      Return to Homepage
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
