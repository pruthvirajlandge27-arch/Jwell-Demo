import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const AboutAndSocial = () => {
  return (
    <section className="py-20 bg-[#f8f9fa] relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column: About */}
          <motion.div 
            className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-[#2a0409]/10 text-[#2a0409] border border-[#2a0409]/20 font-label text-[10px] tracking-widest uppercase font-bold py-1 px-3 rounded shadow-sm mb-6">
              ABOUT KUBDE JEWELLERS
            </div>
            
            <h2 className="text-3xl font-heading font-bold text-[#120002] mb-6">
              Built On Trust, Guided By Family Values
            </h2>
            
            <div className="space-y-4 text-gray-600 font-body">
              <p>
                Kubde Jewellers has served Vidarbha families since 1937 with transparent pricing, hallmarked quality, and personalized customer care.
              </p>
              <p>
                Led by dedicated founders and a skilled in-store team, we focus on designs that match traditions and modern taste together.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Instagram/Social */}
          <motion.div 
            className="bg-[#120002] rounded-2xl p-8 md:p-12 border border-gold-primary/20 shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="inline-block border border-gold-primary/30 text-gold-accent font-label text-[10px] tracking-widest uppercase font-bold py-1 px-3 rounded shadow-sm bg-gold-primary/10 mb-6">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline mr-1"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> FOLLOW ON INSTAGRAM
              </div>
              
              <h2 className="text-3xl font-heading font-bold text-white mb-8">
                Daily Updates From Our Store
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="bg-[#1e0306] border border-gold-primary/10 rounded-lg p-4">
                  <h4 className="text-gold-light font-bold text-sm mb-1">Daily New Arrivals</h4>
                  <p className="text-xs text-gray-300">Fresh product drops and festive launch previews.</p>
                </div>
                <div className="bg-[#1e0306] border border-gold-primary/10 rounded-lg p-4">
                  <h4 className="text-gold-light font-bold text-sm mb-1">Behind The Craft</h4>
                  <p className="text-xs text-gray-300">Making process, polishing details, and in-store moments.</p>
                </div>
                <div className="bg-[#1e0306] border border-gold-primary/10 rounded-lg p-4">
                  <h4 className="text-gold-light font-bold text-sm mb-1">Customer Stories</h4>
                  <p className="text-xs text-gray-300">Real client selections, gifting moments, and celebrations.</p>
                </div>
              </div>

              <a 
                href="https://www.instagram.com/kubdejewellers/?hl=en" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium px-6 py-2.5 rounded-full transition-all shadow-md text-sm"
              >
                Visit Instagram <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutAndSocial;
