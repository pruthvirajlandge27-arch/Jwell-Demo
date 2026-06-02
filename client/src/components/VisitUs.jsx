import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Sparkles, ArrowRight } from 'lucide-react';

const VisitUs = () => {
  return (
    <section id="visit" className="relative py-28 md:py-36 overflow-hidden bg-[#0a0001]">
      {/* Background Showroom Image with Parallax Feel */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0001] via-[#0a0001]/90 to-transparent z-10 hidden lg:block"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0001] via-[#0a0001]/80 to-transparent z-10 lg:hidden"></div>
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="/images/luxury_showroom.png" 
          alt="Bhamare Jewellers Luxury Showroom" 
          className="w-full h-full object-cover object-right opacity-60"
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Content Area - Contact Info */}
          <motion.div 
            className="w-full lg:w-5/12 text-white space-y-10"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <span className="text-gold-accent font-label text-xs tracking-[0.3em] uppercase flex items-center gap-2">
                <Sparkles size={14} className="text-gold-primary animate-pulse" /> THE FLAGSHIP EXPERIENCE
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-medium tracking-wide text-white leading-tight drop-shadow-lg">
                Step Into <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-primary to-gold-dark text-glow-gold italic">
                  Elegance
                </span>
              </h2>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent"></div>
            </div>
            
            <p className="text-warm-ivory/80 font-body text-base leading-relaxed border-l-2 border-gold-primary/30 pl-6 backdrop-blur-sm">
              Discover a realm where heritage meets masterful craftsmanship. We invite you to experience our exquisite collections in an ambiance of pure luxury and comfort.
            </p>
            
            <div className="space-y-8 pt-4">
              {/* Address */}
              <div className="flex items-start gap-6 group">
                <div className="bg-[#1e0306]/80 p-4 rounded-full border border-gold-primary/20 group-hover:border-gold-accent group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)] backdrop-blur-md">
                  <MapPin className="text-gold-accent w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-gold-light font-label font-bold text-[10px] tracking-[0.2em] uppercase mb-2">Location</h4>
                  <p className="text-warm-ivory/90 leading-relaxed text-sm md:text-base">
                    Jayhind Chowk, Near New Rajrajeshwar Temple,<br />
                    Akola, Maharashtra 444001
                  </p>
                </div>
              </div>
              
              {/* Hours */}
              <div className="flex items-start gap-6 group">
                <div className="bg-[#1e0306]/80 p-4 rounded-full border border-gold-primary/20 group-hover:border-gold-accent group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)] backdrop-blur-md">
                  <Clock className="text-gold-accent w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-gold-light font-label font-bold text-[10px] tracking-[0.2em] uppercase mb-2">Showroom Hours</h4>
                  <p className="text-warm-ivory/90 text-sm md:text-base mb-1">Monday - Sunday: 10:30 AM - 8:30 PM</p>
                  <p className="text-gold-primary/70 text-xs italic font-medium">Open all 7 days of the week</p>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-start gap-6 group">
                <div className="bg-[#1e0306]/80 p-4 rounded-full border border-gold-primary/20 group-hover:border-gold-accent group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)] backdrop-blur-md">
                  <Phone className="text-gold-accent w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-gold-light font-label font-bold text-[10px] tracking-[0.2em] uppercase mb-2">Direct Inquiry</h4>
                  <p className="text-warm-ivory/90 text-sm md:text-base font-medium mb-1">+91 98765 43210</p>
                  <p className="text-warm-ivory/60 text-xs">+91 76543 21098</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Content Area - Interactive Map & Action */}
          <motion.div 
            className="w-full lg:w-7/12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-premium-dark p-2 md:p-4 rounded-[2rem] border border-gold-primary/30 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative group overflow-hidden">
              {/* Shimmer sweep effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] z-20 pointer-events-none"></div>
              
              <div className="relative rounded-[1.5rem] overflow-hidden h-[300px] md:h-[450px]">
                {/* Glowing border inside */}
                <div className="absolute inset-0 border-2 border-gold-primary/10 rounded-[1.5rem] pointer-events-none z-10"></div>
                
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.0415279058457!2d76.98793447432963!3d20.708538198701795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd731f50a98f645%3A0x2c7c9984842db7ed!2sBhamare%20jewellers!5e0!3m2!1sen!2sin!4v1779792833050!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: "grayscale(20%) sepia(20%) hue-rotate(-20deg) contrast(110%)" }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bhamare Jewellers Location"
                  className="transition-transform duration-1000 group-hover:scale-105"
                ></iframe>

                {/* Floating Action Button */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-gold !py-4 !px-8 flex items-center gap-3 backdrop-blur-md shadow-2xl hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)]"
                  >
                    <span>Get Directions</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default VisitUs;
