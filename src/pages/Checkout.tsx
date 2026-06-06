import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'

export const Checkout: React.FC = () => {
  const [searchParams] = useSearchParams()
  const plan = searchParams.get('plan') || 'pro'
  const navigate = useNavigate()
  
  const [isProcessing, setIsProcessing] = useState(false)

  // This is a Mock Checkout flow. In production, this would redirect to Stripe Checkout URL.
  const handleMockPayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      // Simulate successful payment by redirecting to register with a mock session ID
      navigate(`/register?session_id=cs_test_mock_${Math.random().toString(36).substring(7)}&plan=${plan}`)
    }, 2500)
  }

  const getPlanDetails = () => {
    if (plan === 'basic') return { name: 'Basic Plan', price: '$499' }
    return { name: 'Pro Plan', price: '$1,299' }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-4">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-black text-slate-100">Secure Checkout</h1>
          <p className="text-sm text-slate-400 mt-2">You are subscribing to the {getPlanDetails().name}</p>
        </div>

        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800/80 mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-300 font-medium">Subscription</span>
            <span className="text-slate-100 font-bold">{getPlanDetails().price} <span className="text-xs text-slate-500">/ mo</span></span>
          </div>
          <div className="h-px bg-slate-800 my-4" />
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Setup Fee</span>
            <span className="text-slate-300">$0.00</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <span className="text-slate-400">Tax</span>
            <span className="text-slate-300">Calculated at next step</span>
          </div>
          <div className="h-px bg-slate-800 my-4" />
          <div className="flex justify-between items-center">
            <span className="text-slate-100 font-bold">Total Due Today</span>
            <span className="text-2xl font-black text-cyan-400">{getPlanDetails().price}</span>
          </div>
        </div>

        <button 
          onClick={handleMockPayment}
          disabled={isProcessing}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Pay & Continue to Onboarding
            </>
          )}
        </button>

        <p className="text-xs text-center text-slate-500 mt-6">
          Payments are securely processed by <strong className="text-slate-400">Stripe</strong>.
        </p>
      </div>
    </div>
  )
}
