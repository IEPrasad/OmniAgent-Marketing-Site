import React from 'react'
import { motion } from 'framer-motion'

const ROW_1_PROMPTS = [
  "Analyze Q3 financial reports against SEC filings",
  "Identify supply chain bottlenecks in ERP data",
  "Extract compliance risks from vendor contracts",
  "Summarize latest legal precedents for IP",
  "Cross-reference HR policies with state laws",
  "Generate quarterly sales forecasts from CRM",
  "Review customer support tickets for feature requests",
  "Audit active directory for idle user accounts"
]

const ROW_2_PROMPTS = [
  "Automate NDA generation for new partnerships",
  "Classify inbound leads by likelihood to convert",
  "Find anomalies in recent transaction logs",
  "Draft a response to the RFP based on past wins",
  "Compare competitor pricing strategies over time",
  "Audit IT infrastructure for security vulnerabilities",
  "Onboard new hires using customized training data",
  "Evaluate market sentiment from customer feedback"
]

const ROW_3_PROMPTS = [
  "Generate automated code reviews for legacy systems",
  "Extract key entities from unstructured meeting notes",
  "Draft a press release for the new product launch",
  "Correlate marketing spend with user acquisition",
  "Identify emerging trends in consumer behavior",
  "Optimize logistics routes based on weather data",
  "Translate internal documentation to 5 languages",
  "Forecast inventory requirements for holiday season"
]

const MarqueeRow = ({ prompts, direction }: { prompts: string[], direction: 'left' | 'right' }) => {
  return (
    <div className="flex w-max overflow-visible">
      <motion.div 
        className="flex w-max"
        animate={{ x: direction === 'left' ? [0, '-50%'] : ['-50%', 0] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 75 }}
      >
        <div className="flex w-max shrink-0 gap-4 pr-4">
          {prompts.map((prompt, i) => (
            <div key={i} className="flex-none bg-slate-900/50 border border-slate-800 text-slate-300 text-sm px-6 py-4 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-colors cursor-default shadow-sm min-w-[250px] max-w-[400px]">
              {prompt}
            </div>
          ))}
        </div>
        <div className="flex w-max shrink-0 gap-4 pr-4" aria-hidden="true">
          {prompts.map((prompt, i) => (
            <div key={`dup-${i}`} className="flex-none bg-slate-900/50 border border-slate-800 text-slate-300 text-sm px-6 py-4 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-colors cursor-default shadow-sm min-w-[250px] max-w-[400px]">
              {prompt}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export const UseCasesMarquee: React.FC = () => {
  return (
    <section className="py-16 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="flex flex-col gap-4 max-w-[100vw]">
        <MarqueeRow prompts={ROW_1_PROMPTS} direction="left" />
        <MarqueeRow prompts={ROW_2_PROMPTS} direction="right" />
        <MarqueeRow prompts={ROW_3_PROMPTS} direction="left" />
      </div>
    </section>
  )
}
