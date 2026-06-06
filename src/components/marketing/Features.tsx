import React from 'react'
import { Network, BrainCircuit, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 bg-slate-900/30 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4">Enterprise-Grade Intelligence</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Built from the ground up for massive scale, complex reasoning, and strict compliance.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Network className="w-7 h-7 text-cyan-400" />,
              title: "GraphRAG Technology",
              desc: "Move beyond simple vector search. We build a semantic knowledge graph of your enterprise data, allowing AI to connect disparate dots and reason over complex, multi-hop queries.",
              colorHover: "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
              iconBg: "bg-cyan-500/10 border-cyan-500/20"
            },
            {
              icon: <BrainCircuit className="w-7 h-7 text-blue-400" />,
              title: "Multi-Agent Swarms",
              desc: "Deploy specialized autonomous agents that collaborate to solve complex tasks. From data extraction to code generation, our agents work together seamlessly.",
              colorHover: "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
              iconBg: "bg-blue-500/10 border-blue-500/20"
            },
            {
              icon: <ShieldCheck className="w-7 h-7 text-purple-400" />,
              title: "Row-Level Security",
              desc: "Your data never leaks. We implement strict Postgres Row-Level Security (RLS) ensuring that agents only access data explicitly authorized for your specific tenant.",
              colorHover: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
              iconBg: "bg-purple-500/10 border-purple-500/20"
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`bg-slate-950 border border-slate-800 rounded-2xl p-8 transition-all duration-300 group ${feature.colorHover}`}
            >
              <div className={`w-14 h-14 rounded-xl ${feature.iconBg} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-200">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
