import { motion } from 'framer-motion';

const HeroSection = () => {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Framer Motion Variants for Staggered Reveals
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#120002] via-[#240307] to-[#1a0205] overflow-hidden flex items-center pt-24 lg:pt-16 z-10">
      
      {/* Subtle Luxury Particle Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft radial glow gradients */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-gold-primary/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-[35vw] h-[35vw] bg-wine-light/30 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        
        {/* Fine elegant floating gold particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute bg-gradient-to-r from-gold-light to-gold-primary rounded-full opacity-35"
            style={{
              width: Math.random() * 4 + 1.5 + 'px',
              height: Math.random() * 4 + 1.5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, Math.random() * -120 - 40],
              x: [0, Math.random() * 40 - 20],
              opacity: [0.1, 0.6, 0.1]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          ></motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Text & CTA Container */}
          <motion.div 
            className="w-full lg:w-1/2 text-left space-y-6 md:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="space-y-3">
              <span className="text-gold-accent font-brand tracking-[0.25em] text-xs md:text-sm font-semibold uppercase block hover:tracking-[0.3em] transition-all duration-500">
                BHAMARE JEWELLERS
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-heading font-medium text-white leading-[1.1] text-glow-gold">
                Crafting Timeless <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-accent to-gold-primary inline-block">
                  Elegance in Gold
                </span>
              </h1>
            </motion.div>
            
            <motion.p variants={itemVariants} className="text-warm-ivory/85 text-base sm:text-lg md:text-xl font-body font-light tracking-wide max-w-xl">
              Akola’s Most Trusted Jewellers Since 1995. Discover custom masterpieces engineered with certified heritage.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button 
                onClick={() => handleScrollTo('collections')}
                className="btn-gold w-full sm:w-auto text-center relative overflow-hidden group"
              >
                <span className="relative z-10">Explore Collections</span>
                {/* Button Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 z-0"></div>
              </button>
              
              <button 
                onClick={() => handleScrollTo('contact')}
                className="btn-outline w-full sm:w-auto text-center relative overflow-hidden group"
              >
                <span className="relative z-10">Book Appointment</span>
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gold-primary/20 to-transparent skew-x-12 z-0"></div>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Showcase Image */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center items-center relative"
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
          >
            {/* Glowing gold backdrops behind jewelry */}
            <div className="absolute w-[75%] h-[75%] rounded-full bg-gradient-to-tr from-gold-primary/20 via-gold-accent/5 to-transparent blur-[50px] animate-pulse pointer-events-none"></div>
            
            {/* Soft gold frame details */}
            <div className="absolute -inset-4 border border-gold-primary/5 rounded-full pointer-events-none animate-[spin_80s_linear_infinite]"></div>
            <div className="absolute -inset-8 border border-dashed border-gold-accent/5 rounded-full pointer-events-none animate-[spin_120s_linear_infinite_reverse]"></div>

            <motion.div 
              className="relative z-10 select-none p-4"
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            >
              <img 
                src="/images/hero_jewelry.png" 
                alt="Bhamare Jewellers Premium Showcase" 
                className="w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[520px] object-contain floating-glow drop-shadow-[0_20px_50px_rgba(212,175,55,0.25)]"
                draggable="false"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Luxury Scroll Down Arrow Indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-2 group z-20"
        onClick={() => handleScrollTo('collections')}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="text-[9px] font-label text-gold-primary/65 group-hover:text-gold-accent uppercase tracking-[0.3em] transition-colors duration-300">
          Scroll Discover
        </span>
        <motion.div 
          className="w-[1px] h-12 bg-gradient-to-b from-gold-primary/65 to-transparent origin-top"
          animate={{ scaleY: [0, 1, 0], y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
      </motion.div>

    </section>
  );
};

export default HeroSection;
