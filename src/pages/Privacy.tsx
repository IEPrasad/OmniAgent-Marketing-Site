import React, { useEffect } from 'react'
import { Navbar } from '../components/marketing/Navbar'
import { Footer } from '../components/marketing/Footer'
import { useNavigate } from 'react-router-dom'

export const Privacy: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-cyan-500 selection:text-black">
      <Navbar onSubscribe={() => navigate('/checkout?plan=pro')} />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-16 shadow-2xl backdrop-blur-sm">
          <div className="mb-12 border-b border-slate-800 pb-8">
            <h1 className="text-4xl md:text-5xl font-black text-slate-100 mb-4 tracking-tight">Privacy Policy</h1>
            <p className="text-slate-400 text-lg">Last Updated: October 15, 2026</p>
          </div>

          <div className="space-y-10 text-lg leading-relaxed">
            
            <section>
              <h2 className="text-2xl font-bold text-slate-200 mb-4">1. Introduction</h2>
              <p className="mb-4">
                At OmniAgent Inc. ("we", "our", or "us"), we are deeply committed to protecting the privacy and security of our enterprise customers' data. This Privacy Policy outlines how we collect, use, process, and protect your information when you use our GraphRAG platform and autonomous multi-agent systems (collectively, the "Services").
              </p>
              <p>
                By accessing or using OmniAgent, you agree to the collection and use of information in accordance with this policy. We adhere to the highest standards of data protection, including GDPR and SOC2 Type II compliance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-200 mb-4">2. Zero-Trust Data Processing</h2>
              <p className="mb-4">
                We employ a strict <strong>Zero-Trust Architecture</strong>. Unlike consumer AI tools, OmniAgent is built specifically for enterprises requiring absolute data isolation:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-400">
                <li><strong className="text-slate-300">No AI Training:</strong> Your proprietary enterprise data is <em>never</em> used to train, improve, or fine-tune our foundation models or any third-party AI models.</li>
                <li><strong className="text-slate-300">Tenant Isolation:</strong> Data is strictly segregated using Postgres Row-Level Security (RLS). Cross-tenant data access is cryptographically and mathematically impossible.</li>
                <li><strong className="text-slate-300">Ephemeral Processing:</strong> In-memory context windows and agent scratchpads are purged immediately after task execution.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-200 mb-4">3. Information We Collect</h2>
              <p className="mb-4">To provide and continuously improve our Services, we collect the following limited types of information:</p>
              
              <h3 className="text-xl font-semibold text-slate-300 mb-2 mt-6">A. Account & Billing Information</h3>
              <p className="mb-4">When you register for an OmniAgent account, we collect your name, corporate email address, organization name, and billing details. Payment processing is handled securely by Stripe; we do not store full credit card numbers.</p>
              
              <h3 className="text-xl font-semibold text-slate-300 mb-2">B. Enterprise Knowledge Graphs (Customer Data)</h3>
              <p className="mb-4">You may ingest documents, databases, and APIs into your private OmniAgent vector stores. This Customer Data is encrypted at rest (AES-256) and in transit (TLS 1.3). We do not inspect, monetize, or access this data unless explicitly authorized by your administrators for support purposes.</p>

              <h3 className="text-xl font-semibold text-slate-300 mb-2">C. Usage & Telemetry Data</h3>
              <p>We collect anonymized, aggregated metadata regarding system performance, API call latency, and error rates to maintain uptime and ensure SLA guarantees. This telemetry data contains no personally identifiable information (PII) or prompt contents.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-200 mb-4">4. How We Use Your Data</h2>
              <p className="mb-4">We use the collected data strictly for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-400">
                <li>To provide, maintain, and monitor the performance of our Services.</li>
                <li>To manage your enterprise account and provide customer support.</li>
                <li>To enforce our Terms of Service and prevent abusive or malicious activity.</li>
                <li>To process transactions and send related administrative communications.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-200 mb-4">5. Data Sharing and Third-Party Subprocessors</h2>
              <p className="mb-4">
                We do not sell, rent, or trade your personal information or Customer Data. We may share data only with strictly vetted, SOC2-compliant third-party infrastructure providers (e.g., AWS, Supabase, Stripe) acting as Subprocessors. 
              </p>
              <p>
                All Subprocessors are bound by stringent Data Processing Agreements (DPAs) that prohibit them from accessing or utilizing your data for any purpose other than providing the contracted infrastructure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-200 mb-4">6. Security Measures</h2>
              <p className="mb-4">
                Security is foundational to OmniAgent. We implement continuous vulnerability scanning, automated penetration testing, and strict identity & access management (IAM). In the unlikely event of a security breach, we are legally committed to notifying affected enterprise customers within 24 hours of incident confirmation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-200 mb-4">7. Your Data Privacy Rights</h2>
              <p className="mb-4">
                Depending on your jurisdiction (e.g., GDPR in the EU, CCPA in California), you have the right to access, correct, delete, or restrict the processing of your personal data. Enterprise administrators have full granular control to execute data deletion protocols directly via the OmniAgent Control Center.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-200 mb-4">8. Contact Us</h2>
              <p>
                If you have questions regarding this Privacy Policy or our security practices, please contact our Data Protection Officer at <a href="mailto:privacy@omniagent.ai" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4">privacy@omniagent.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
