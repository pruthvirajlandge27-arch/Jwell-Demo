import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] md:h-[70vh] lg:h-[80vh] flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/luxury_showroom.png" 
          alt="Gold Chain Background" 
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle overlay to make text readable if needed, though screenshot has a white frosted box */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Content Box */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-xl border border-white/40 shadow-lg max-w-xl"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block bg-white text-gray-500 font-label text-xs tracking-[0.2em] uppercase font-bold py-1.5 px-3 rounded shadow-sm mb-6 border border-gray-100">
            SIGNATURE CRAFTSMANSHIP
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#120002] leading-tight mb-4">
            Timeless Jewellery For Every Occasion
          </h1>
          
          <p className="text-gray-700 font-body text-base md:text-lg mb-8 max-w-md">
            Discover hallmarked gold collections with premium finishing and trusted purity.
          </p>
          
          <Link 
            to="/collections/mens"
            className="inline-flex items-center gap-2 bg-[#2a0409] hover:bg-[#120002] text-white font-medium px-6 py-3 rounded-full transition-colors shadow-md border border-[#3a060d]"
          >
            Open Men's Collection <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
