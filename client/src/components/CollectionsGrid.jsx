import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useJewellery } from '../context/JewelleryContext';
import { Sparkles, ArrowRight } from 'lucide-react';

const CollectionsGrid = () => {
  const { categories, loading } = useJewellery();

  // Flagship premium collections requested by user
  const flagshipCollections = [
    {
      name: "Bridal Collection",
      tagline: "Royal Heirloom Masterpieces",
      description: "Exquisite bridal sets crafted for your sacred, eternal bonds.",
      image: "/images/bridal_collection.png",
      link: "/collections/bridal-sets" 
    },
    {
      name: "Gold Collection",
      tagline: "Pure 22kt Solid Gold",
      description: "Timeless designs reflecting the rich heritage of Indian craftsmanship.",
      image: "/images/gold_collection.png",
      link: "/collections/gold-chains"
    },
    {
      name: "Diamond Collection",
      tagline: "Certified Sparkling Grace",
      description: "Brilliant, conflict-free diamond creations to illuminate your beauty.",
      image: "/images/diamond_collection.png",
      link: "/collections/diamond-rings"
    },
    {
      name: "Daily Wear & Fine Jewelry",
      tagline: "Elegant Everyday Luxury",
      description: "Modern, lightweight gold and diamond ornaments tailored for your style.",
      image: "/images/earrings_section.png",
      link: "/collections/traditional-bangles"
    }
  ];

  return (
    <section id="collections" className="py-28 bg-[#120002] relative overflow-hidden">
      {/* Delicate ornamental glowing divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent"></div>

      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-gold-accent font-label text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-2">
              <Sparkles size={14} className="text-gold-primary animate-pulse" /> EXQUISITE SHOWCASE
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-medium text-white text-glow-gold">
              Featured Collections
            </h2>
            <p className="text-warm-ivory/65 max-w-xl mx-auto font-body text-sm tracking-wide">
              Step into the world of Bhamare Jewellers, where traditional heritage meets contemporary artistry.
            </p>
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent mx-auto pt-2"></div>
          </motion.div>
        </div>

        {/* Flagship Luxury Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {flagshipCollections.map((col, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <Link 
                to={col.link} 
                className="group block relative overflow-hidden rounded-2xl h-[450px] border border-gold-primary/10 hover:border-gold-primary/30 transition-all duration-500 shadow-2xl"
              >
                {/* Image backdrop */}
                <div className="absolute inset-0 bg-black transition-transform duration-1000 group-hover:scale-105">
                  <img 
                    src={col.image} 
                    alt={col.name} 
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-50 transition-opacity duration-700" 
                    loading="lazy"
                  />
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-10"></div>
                <div className="absolute inset-5 border border-gold-primary/10 group-hover:border-gold-primary/30 rounded-xl transition-all duration-500 z-10 pointer-events-none"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 z-20 transition-transform duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-gold-accent font-label text-[10px] tracking-[0.25em] uppercase block mb-2 opacity-90">
                    {col.tagline}
                  </span>
                  <h3 className="text-3xl font-heading text-white mb-3 group-hover:text-gold-light transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-warm-ivory/70 font-body text-xs md:text-sm max-w-md mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                    {col.description}
                  </p>
                  <span className="text-gold-primary font-label text-[11px] tracking-wider uppercase font-semibold inline-flex items-center gap-1 group-hover:text-gold-accent transition-colors">
                    View Pieces <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Explore Category Catalog (Find Your Perfect Match Grid) */}
        <div className="border-t border-gold-primary/10 pt-24 mt-8">
          
          {/* Section Header */}
          <div className="text-center mb-16 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <h3 className="text-4xl sm:text-5xl font-heading font-medium text-white text-glow-gold">
                Find Your Perfect Match
              </h3>
              <p className="text-warm-ivory/65 text-xs sm:text-sm uppercase tracking-[0.2em] font-label font-medium">
                Shop by Categories
              </p>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent mx-auto pt-2"></div>
            </motion.div>
          </div>

          {/* Grid Layout (4 columns desktop, 2 columns mobile) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            
            {/* Category Cards (Dynamic) */}
            {categories.slice(0, 7).map((cat, index) => (
              <motion.div
                key={cat._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
              >
                <Link to={`/collections/${cat.slug}`} className="group block text-center">
                  {/* Card Container */}
                  <div className="aspect-square rounded-[24px] overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gold-primary/10 group-hover:border-gold-primary/30 transition-all duration-500 bg-[#1e0306]">
                    <img 
                      src={cat.coverImage || "/images/cat_earrings.png"} 
                      alt={cat.name} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Subtle inner overlay */}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500"></div>
                  </div>
                  
                  {/* Label */}
                  <span className="text-[11px] font-label font-semibold tracking-[0.25em] uppercase text-warm-ivory/80 group-hover:text-gold-accent transition-colors duration-300 block mt-4.5">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}

            {/* 8th Card: View All */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link 
                to="/collections/couple-rings" 
                className="group block text-center"
              >
                {/* Visual View All Frame */}
                <div className="aspect-square rounded-[24px] border border-gold-primary/20 hover:border-gold-accent/50 transition-all duration-500 flex flex-col justify-center items-center bg-[#1e0306]/25 backdrop-blur-md p-6 shadow-2xl relative">
                  {/* Outer breathing line ring */}
                  <div className="absolute inset-3 border border-dashed border-gold-primary/5 rounded-[18px] group-hover:border-gold-accent/20 transition-all duration-500 pointer-events-none"></div>

                  <span className="text-4xl sm:text-5xl font-heading font-medium text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-accent to-gold-primary mb-2 block">
                    10+
                  </span>
                  <span className="text-[9px] font-label uppercase tracking-widest text-warm-ivory/60 mb-6 block leading-relaxed max-w-[125px] mx-auto font-medium">
                    Categories to choose from
                  </span>
                </div>

                {/* View All Text label */}
                <span className="text-[11px] font-label font-bold uppercase tracking-[0.25em] text-gold-primary group-hover:text-gold-accent transition-colors duration-300 block mt-4.5">
                  VIEW ALL
                </span>
              </Link>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CollectionsGrid;
