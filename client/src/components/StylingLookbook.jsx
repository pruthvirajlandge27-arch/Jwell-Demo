import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const StylingLookbook = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Center card active

  const lookbookCards = [
    {
      id: 0,
      title: "The Diamond Edit",
      image: "/images/diamond_collection.png",
      tagline: "Bridal Brilliance",
      products: [
        { name: "Teardrop Diamond Choker", image: "/images/diamond_collection.png" },
        { name: "Certified Diamond Studs", image: "/images/cat_earrings.png" }
      ]
    },
    {
      id: 1,
      title: "Everyday Sparkle",
      image: "/images/featured_rings.png",
      tagline: "Eternity Bands",
      products: [
        { name: "Solitaire Promise Ring", image: "/images/featured_rings.png" },
        { name: "Diamond Marriage Band", image: "/images/featured_rings.png" }
      ]
    },
    {
      id: 2,
      title: "Hoops Elevated",
      image: "/images/lookbook_earring.png",
      tagline: "Crescent Diamond Hoop",
      products: [
        { name: "Crescent Diamond Hoop", image: "/images/lookbook_earring.png" },
        { name: "Droplets Diamond Studs", image: "/images/cat_earrings.png" }
      ]
    },
    {
      id: 3,
      title: "Imperial Grace",
      image: "/images/lookbook_model.png",
      tagline: "Royal Lookbook Showcase",
      products: [
        { name: "Royal Diamond Necklace", image: "/images/lookbook_bridal.png" },
        { name: "Imperial Drop Jhumkas", image: "/images/cat_earrings.png" }
      ]
    },
    {
      id: 4,
      title: "Bangles Reimagined",
      image: "/images/gold_bangles.png",
      tagline: "Solid Gold Craft",
      products: [
        { name: "Intricate Filigree Bangle", image: "/images/gold_bangles.png" },
        { name: "Precious Ruby Wristlet", image: "/images/gold_bangles.png" }
      ]
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? lookbookCards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === lookbookCards.length - 1 ? 0 : prev + 1));
  };

  const handleScrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-28 bg-gradient-to-b from-[#140003] to-[#120002] relative overflow-hidden z-10">
      {/* Subtle light mesh details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-gold-accent font-label text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-2">
              <Sparkles size={14} className="text-gold-primary animate-pulse" /> DIAMOND EDITORIAL
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-medium text-white text-glow-gold">
              Styling 101 With Diamonds
            </h2>
            <p className="text-warm-ivory/65 max-w-xl mx-auto font-body text-sm tracking-wide">
              Trendsetting diamond jewellery suited for every occasion. Learn how to layer, style, and highlight your heritage pieces.
            </p>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent mx-auto pt-2"></div>
          </motion.div>
        </div>

        {/* 3D Stack Slider Deck */}
        <div className="relative h-[550px] sm:h-[620px] w-full flex items-center justify-center max-w-5xl mx-auto mt-8 select-none">
          
          {/* Navigation Arrows for accessibility */}
          <button 
            onClick={handlePrev} 
            className="absolute left-2 sm:-left-4 z-40 p-3 text-gold-primary border border-gold-primary/20 hover:border-gold-accent transition-all hover:bg-gold-primary hover:text-black rounded-full shadow-2xl bg-[#120002]/80 cursor-pointer active:scale-95"
            aria-label="Previous style Look"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Cards Frame */}
          <div className="relative w-full h-full flex items-center justify-center">
            {lookbookCards.map((card, index) => {
              // Calculate relative offset from active card
              const offset = index - activeIndex;
              const isCenter = index === activeIndex;
              const absOffset = Math.abs(offset);

              // Don't render cards that are too far out
              if (absOffset > 2) return null;

              // Compute precise 3D transformations matching the stack effect
              const transformStyles = {
                translateX: `${offset * 120}px`,
                scale: isCenter ? 1 : 0.88 - absOffset * 0.05,
                rotate: isCenter ? 0 : offset * 3,
                zIndex: 30 - absOffset * 10,
                opacity: isCenter ? 1 : 0.5 - absOffset * 0.15,
                filter: isCenter ? "blur(0px)" : "blur(2.5px)",
              };

              return (
                <motion.div
                  key={card.id}
                  className="absolute w-[280px] sm:w-[350px] h-[450px] sm:h-[530px] rounded-[24px] overflow-hidden border border-gold-primary/20 hover:border-gold-accent/40 shadow-[0_20px_50px_rgba(0,0,0,0.75)] cursor-pointer bg-[#1e0306] origin-bottom transition-all duration-700 ease-out"
                  style={{
                    transform: `translateX(${transformStyles.translateX}) scale(${transformStyles.scale}) rotate(${transformStyles.rotate}deg)`,
                    zIndex: transformStyles.zIndex,
                    opacity: transformStyles.opacity,
                    filter: transformStyles.filter,
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Card Backdrop Image */}
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-cover select-none"
                    draggable="false"
                  />

                  {/* Gradient overlays to darken lookbook card bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10 pointer-events-none"></div>

                  {/* Text Header (on non-active cards or hovering active) */}
                  <div className="absolute top-6 inset-x-6 z-20 pointer-events-none text-left">
                    <span className="text-gold-accent font-label text-[9px] sm:text-[10px] tracking-[0.25em] uppercase block mb-1">
                      {card.tagline}
                    </span>
                    <h4 className="text-white font-heading text-xl sm:text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {card.title}
                    </h4>
                  </div>

                  {/* BOTTOM PRODUCT TAGS (Only rendered on the active center card) */}
                  <AnimatePresence>
                    {isCenter && (
                      <motion.div 
                        className="absolute bottom-6 inset-x-4 z-20 flex flex-col gap-3 px-2 sm:px-4"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {card.products.map((prod, pIdx) => (
                          <div 
                            key={pIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleScrollToContact();
                            }}
                            className="glass-premium flex items-center justify-between p-2.5 sm:p-3 rounded-xl border border-gold-primary/20 hover:border-gold-accent hover:bg-gold-primary/10 transition-all duration-300 shadow-xl group/tag"
                          >
                            <div className="flex items-center space-x-3">
                              {/* Tiny product thumbnail */}
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#240307]/50 border border-gold-primary/20 flex-shrink-0">
                                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                              </div>
                              <span className="text-[10px] sm:text-xs font-label font-medium text-white/95 text-left group-hover/tag:text-gold-accent transition-colors tracking-wide max-w-[150px] sm:max-w-[200px] truncate">
                                {prod.name}
                              </span>
                            </div>
                            
                            {/* Arrow indicator button */}
                            <div className="w-6 h-6 rounded-full bg-gold-primary/10 flex items-center justify-center border border-gold-primary/30 group-hover/tag:bg-gradient-to-r group-hover/tag:from-gold-light group-hover/tag:to-gold-primary group-hover/tag:text-black transition-all">
                              <ArrowRight size={10} />
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button 
            onClick={handleNext} 
            className="absolute right-2 sm:-right-4 z-40 p-3 text-gold-primary border border-gold-primary/20 hover:border-gold-accent transition-all hover:bg-gold-primary hover:text-black rounded-full shadow-2xl bg-[#120002]/80 cursor-pointer active:scale-95"
            aria-label="Next style Look"
          >
            <ChevronRight size={20} />
          </button>

        </div>

        {/* Carousel indicator dots */}
        <div className="flex justify-center gap-2.5 mt-10">
          {lookbookCards.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setActiveIndex(dotIdx)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${dotIdx === activeIndex ? 'w-8 bg-gold-accent shadow-[0_0_10px_rgba(243,198,79,0.5)]' : 'w-2 bg-gold-primary/30 hover:bg-gold-primary/50'}`}
              aria-label={`Go to lookbook story slide ${dotIdx + 1}`}
            ></button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StylingLookbook;
