import { motion } from 'framer-motion';
import { ShieldCheck, Gem, Compass, Sparkles, Star } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      title: 'BIS Hallmarked Purity',
      description: 'Every gold ornament is 100% BIS Hallmarked, guaranteeing standard purity and lasting value across generations.',
      icon: <ShieldCheck className="w-7 h-7 text-gold-accent" />
    },
    {
      title: 'Certified Diamonds',
      description: 'Each diamond comes with international laboratory grading certificates ensuring natural origin and brilliance.',
      icon: <Gem className="w-7 h-7 text-gold-accent" />
    },
    {
      title: 'Master Craftsmanship',
      description: 'Collaborate with our artisans to bring your unique dream designs to absolute reality with bespoke detailing.',
      icon: <Compass className="w-7 h-7 text-gold-accent" />
    }
  ];

  return (
    <section id="about" className="py-24 md:py-36 bg-gradient-to-b from-[#0a0001] to-[#160205] relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent"></div>

      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column: The Legacy (1995) */}
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <span className="text-gold-accent font-label text-xs tracking-[0.3em] uppercase flex items-center gap-2 mb-6">
                <Sparkles size={14} className="text-gold-primary" /> THE BHAMARE LEGACY
              </span>
              
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-heading font-medium text-white mb-6 leading-tight">
                A Standard of <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-primary to-gold-dark text-glow-gold">
                  Lavish Trust
                </span>
              </h2>
              
              <p className="text-warm-ivory/70 font-body text-sm md:text-base leading-loose max-w-lg mb-10 border-l-2 border-gold-primary/30 pl-6">
                Since our inception, Bhamare Jewellers has been the epitome of purity and honesty. 
                We don't just craft jewelry; we forge eternal relationships based on uncompromising quality and absolute transparency.
              </p>

              <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1,2,3].map((_,i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-[#160205] bg-gold-primary/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <Star size={16} className="text-gold-accent fill-gold-accent/50" />
                    </div>
                  ))}
                </div>
                <div className="font-label text-xs tracking-widest text-warm-ivory/80 uppercase">
                  <span className="text-gold-primary font-bold text-lg block">50,000+</span>
                  Trusted Families
                </div>
              </div>
            </motion.div>

            {/* Giant Background '1995' */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 pointer-events-none select-none">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 0.03, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="text-[180px] sm:text-[250px] md:text-[300px] font-brand font-bold text-gold-primary leading-none"
              >
                1995
              </motion.span>
            </div>
            
            {/* EST 1995 Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute -right-4 md:right-10 -bottom-10 md:-bottom-20 w-32 h-32 md:w-40 md:h-40 rounded-full border border-gold-primary/20 bg-[#120002]/80 backdrop-blur-md flex flex-col items-center justify-center animate-float shadow-[0_0_50px_rgba(212,175,55,0.15)]"
            >
              <div className="w-[90%] h-[90%] rounded-full border border-dashed border-gold-primary/40 flex flex-col items-center justify-center">
                <span className="text-gold-accent font-label text-[10px] tracking-[0.25em] uppercase mb-1">EST.</span>
                <span className="text-3xl font-brand font-bold text-gold-light">1995</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: The Pillars of Trust */}
          <div className="lg:w-1/2 w-full mt-16 lg:mt-0 space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative glass-premium p-8 rounded-2xl border border-gold-primary/10 hover:border-gold-primary/40 hover:bg-[#1e0306]/80 transition-all duration-500 overflow-hidden"
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold-primary/0 via-gold-primary/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                
                <div className="relative z-10 flex gap-6 items-start">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold-primary/20 group-hover:border-gold-accent transition-all duration-500 shadow-inner">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-heading text-gold-light mb-2 group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-warm-ivory/70 font-body text-xs md:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
