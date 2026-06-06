import { Link } from 'react-router-dom'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="OmniAgent Logo" className="w-6 h-6 object-contain grayscale opacity-50" />
          <span className="font-bold text-slate-400">OmniAgent</span>
        </div>
        <div className="text-sm text-slate-500">
          &copy; 2026 OmniAgent Inc. All rights reserved.
        </div>
        <div className="flex gap-6 text-sm text-slate-500 font-medium">
          <Link to="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-slate-300">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
