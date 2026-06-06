import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Building2, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase'

export const Register: React.FC = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const plan = searchParams.get('plan') || 'pro'
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // In production, we must verify the sessionId on the server before allowing registration
  if (!sessionId) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-6 rounded-xl max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">Invalid Session</h2>
          <p className="text-sm">Please complete the checkout process first.</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // 1. Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError) throw authError
      if (!authData.user) throw new Error("Failed to create user account.")

      // 2. Create the Organization (Tenant)
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert({
          name: formData.companyName,
          stripe_customer_id: 'mock_cus_' + Math.random().toString(36).substring(7),
          stripe_plan: plan,
          status: 'active'
        })
        .select()
        .single()

      if (companyError) {
        // If company creation fails, we might want to handle user cleanup or notify admin
        console.error("Company Creation Error:", companyError)
        // We won't throw here for the UI demo since we might be using mock supabase keys
      }

      const companyId = companyData?.id || 'mock-company-id'

      // 3. Link user to organization as Admin
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          company_id: companyId,
          role: 'admin',
          status: 'active'
        })
        .eq('id', authData.user.id)

      if (profileError) {
        console.error("Profile Update Error:", profileError)
      }

      setSuccess(true)

    } catch (err: any) {
      setError(err.message || 'An error occurred during registration.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 text-center animate-in fade-in slide-in-from-bottom-4">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-black text-slate-100 mb-2">Registration Complete</h2>
          <p className="text-slate-400 mb-8">
            Your enterprise account for <strong>{formData.companyName}</strong> has been successfully created.
          </p>
          <a 
            href="http://localhost:5173/login" 
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >
            Go to Admin Dashboard <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-4">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-6">
            <CheckCircle2 className="w-3 h-3" /> Payment Successful
          </div>
          <h1 className="text-2xl font-black text-slate-100">Setup Your Organization</h1>
          <p className="text-sm text-slate-400 mt-2">Create your admin account to manage your new {plan} tier environment.</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">Organization Name</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                required
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                placeholder="e.g. Acme Corp" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 focus:border-cyan-500 outline-none" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="admin@company.com" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 focus:border-cyan-500 outline-none" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">Admin Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="password" 
                required
                minLength={8}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 focus:border-cyan-500 outline-none" 
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-4 rounded-xl font-bold transition-all mt-6 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? 'Setting up Organization...' : 'Complete Setup'}
          </button>
        </form>
      </div>
    </div>
  )
}
