import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useJewellery } from '../context/JewelleryContext';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Diamond, Filter } from 'lucide-react';

const CollectionPage = () => {
  const { slug } = useParams();
  const { getJewelleryByCategory, getCategoryDetails } = useJewellery();
  
  const [category, setCategory] = useState(null);
  const [jewellery, setJewellery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest', 'purity22', 'purity18', 'featured'
  
  const [selectedImage, setSelectedImage] = useState(null); // For lightbox

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadData = async () => {
      setLoading(true);
      const [catData, jewelData] = await Promise.all([
        getCategoryDetails(slug),
        getJewelleryByCategory(slug)
      ]);
      setCategory(catData);
      setJewellery(jewelData);
      setLoading(false);
    };
    loadData();
  }, [slug]);

  // Handle sorting/filtering
  let sortedJewellery = [...jewellery];
  if (sortOrder === 'newest') {
    sortedJewellery.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortOrder === 'featured') {
    sortedJewellery.sort((a, b) => (b.isFeatured === a.isFeatured) ? 0 : b.isFeatured ? 1 : -1);
  } else if (sortOrder === 'purity22') {
    sortedJewellery = sortedJewellery.filter(j => j.purity === '22K Gold');
  } else if (sortOrder === 'purity18') {
    sortedJewellery = sortedJewellery.filter(j => j.purity === '18K Gold');
  }

  // Intercept click on product card for lightbox
  const renderProductCards = () => {
    return sortedJewellery.map(product => {
      const primaryImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;
      
      return (
        <div key={product._id} className="cursor-pointer" onClick={(e) => {
          // If they click the "Enquire Now" button, let it go to WhatsApp
          if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button') {
            const text = `Hi, I am interested in ${product.title} from the ${category?.name} collection.`;
            window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, '_blank');
          } else if (primaryImage) {
            setSelectedImage(primaryImage);
          }
        }}>
          <ProductCard product={product} />
        </div>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-gradient-to-br from-[#120002] via-[#240307] to-black flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-gold-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen pt-36 pb-24 bg-gradient-to-br from-[#120002] via-[#240307] to-black text-center px-4 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 max-w-md mx-auto space-y-6 glass-premium p-10 rounded-2xl border border-gold-primary/15 shadow-2xl">
          <span className="text-4xl block">💎</span>
          <h1 className="text-3xl md:text-4xl font-heading text-white tracking-wide">Collection Not Found</h1>
          <p className="text-warm-ivory/70 text-sm font-body">The collection catalog you are looking for does not exist or has been moved.</p>
          <Link to="/" className="btn-gold inline-block !w-full">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120002] via-[#240307] to-[#120002] pt-32 pb-24 relative overflow-hidden">
      
      {/* Decorative premium radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] bg-gold-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[40vw] h-[40vw] bg-wine-light/15 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Lightbox component */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-[6px] flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/80 hover:text-gold-accent transition-colors bg-white/5 p-2 rounded-full border border-white/10"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image view"
            >
              <X size={26} />
            </button>
            <motion.img 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={selectedImage} 
              alt="Enlarged piece showcase view" 
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-[0_15px_60px_rgba(0,0,0,0.85)] border border-gold-primary/20"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Breadcrumbs Navigation */}
        <nav className="flex items-center text-[10px] font-label font-medium uppercase tracking-[0.2em] text-warm-ivory/60 mb-10 pb-4 border-b border-gold-primary/10">
          <Link to="/" className="hover:text-gold-accent transition-colors">Home</Link>
          <ChevronRight size={10} className="mx-2.5 text-gold-primary/50" />
          <a href="/#collections" className="hover:text-gold-accent transition-colors">Collections</a>
          <ChevronRight size={10} className="mx-2.5 text-gold-primary/50" />
          <span className="text-gold-primary">{category.name}</span>
        </nav>

        {/* Catalog Category Header */}
        <div className="text-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="flex flex-col items-center mb-6">
              <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold-primary/50 mb-3"></div>
              <Diamond size={16} className="text-gold-primary/80" strokeWidth={1.5} />
            </div>
            <span className="text-gold-accent font-label text-[10px] tracking-[0.3em] uppercase flex items-center justify-center gap-4">
              <span className="w-8 h-px bg-gold-primary/40"></span>
              CATALOG GALLERY
              <span className="w-8 h-px bg-gold-primary/40"></span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium text-white text-glow-gold">{category.name}</h1>
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent mx-auto"></div>
            {category.description && (
              <p className="text-warm-ivory/70 max-w-2xl mx-auto font-body text-sm leading-relaxed tracking-wide pt-2">
                {category.description}
              </p>
            )}
          </motion.div>
        </div>

        {/* Filter / Sorting Panel */}
        <div className="flex flex-col sm:flex-row justify-between items-center glass-premium p-5 border border-gold-primary/15 rounded-2xl mb-12 shadow-2xl gap-4">
          <div className="text-[11px] font-label font-medium uppercase tracking-[0.15em] text-gold-light inline-flex items-center gap-2">
            <Filter size={12} className="text-gold-primary" /> Showing {sortedJewellery.length} exquisite items
          </div>
          
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <label className="text-[11px] text-warm-ivory/75 font-label uppercase tracking-widest whitespace-nowrap">Sort By:</label>
            <div className="relative w-full sm:w-auto">
              <select 
                className="w-full sm:w-auto bg-[#1e0306] border border-gold-primary/20 rounded-xl py-2.5 px-4 text-white font-body text-xs focus:outline-none focus:border-gold-accent transition-all cursor-pointer shadow-inner pr-8"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest" className="bg-[#120002]">Newest Arrivals</option>
                <option value="featured" className="bg-[#120002]">Featured Masterpieces</option>
                <option value="purity22" className="bg-[#120002]">22K Pure Gold Only</option>
                <option value="purity18" className="bg-[#120002]">18K Fine Gold Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Catalog Items Grid */}
        {sortedJewellery.length === 0 ? (
          <div className="text-center py-20 glass-premium border border-gold-primary/15 rounded-2xl shadow-xl space-y-4">
            <p className="text-lg text-warm-ivory/60 font-body">No pieces found in this collection matching your filters.</p>
            <button 
              onClick={() => setSortOrder('newest')} 
              className="text-gold-primary hover:text-gold-accent font-label uppercase tracking-wider text-xs font-semibold underline block mx-auto cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {renderProductCards()}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
