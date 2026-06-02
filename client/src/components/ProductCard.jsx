import { useState } from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const primaryImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;

  return (
    <motion.div 
      className="group relative glass-premium border border-gold-primary/15 rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_15px_35px_rgba(212,175,55,0.15)] hover:border-gold-primary/45 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {product.purity && (
          <span className="bg-[#120002] text-gold-light border border-gold-primary/20 text-[9px] font-label font-medium uppercase tracking-[0.15em] px-2.5 py-1 rounded shadow-md">
            {product.purity}
          </span>
        )}
        {product.isFeatured && (
          <span className="bg-gradient-to-r from-gold-primary to-gold-accent text-black text-[9px] font-label font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded shadow-md">
            Featured
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-wine-medium to-wine-dark flex items-center justify-center">
        {primaryImage ? (
          <img 
            src={primaryImage} 
            alt={product.title} 
            className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${isHovered ? 'scale-110 opacity-75' : 'scale-100 opacity-90'}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gold-primary/30 bg-[#240307]/50">
            <span className="text-4xl animate-pulse">💎</span>
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-[#120002]/45 backdrop-blur-[3px] flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-gold shadow-2xl transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out"
          >
            Enquire Now
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 text-center border-t border-gold-primary/10 relative">
        {/* Ornamental background element rotating to form a diamond accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-[#210508] rotate-45 border-t border-l border-gold-primary/15 z-10"></div>
        
        <p className="text-gold-primary font-label text-[10px] tracking-[0.2em] uppercase mb-2 mt-2 font-medium">
          {product.category?.name || 'Jewellery'}
        </p>
        <h3 className="text-lg font-heading text-white group-hover:text-gold-light transition-colors duration-300 mb-2 line-clamp-1">
          {product.title}
        </h3>
        
        <div className="flex justify-center items-center space-x-4 text-xs text-warm-ivory/60 font-body">
          {product.weight && (
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 bg-gradient-to-r from-gold-primary to-gold-accent rounded-full mr-2 shadow-sm"></span>
              {product.weight}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
