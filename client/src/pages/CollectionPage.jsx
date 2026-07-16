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
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  
  const [selectedImage, setSelectedImage] = useState(null); // For lightbox

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveSubcategory('all');
    const loadData = async () => {
      setLoading(true);
      try {
        const [catData, jewelData] = await Promise.all([
          getCategoryDetails(slug),
          getJewelleryByCategory(slug)
        ]);
        
        // If the database doesn't have the category, gracefully fallback so the page still loads
        if (!catData) {
          setCategory({
            name: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
            description: `Currently viewing the ${slug.replace('-', ' ')} collection. Note: This category hasn't been fully configured in the database yet.`
          });
        } else {
          setCategory(catData);
        }
        
        setJewellery(jewelData || []);
      } catch (error) {
        console.error("Error loading collection data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [slug]);

  // Handle sorting/filtering
  let filteredJewellery = [...jewellery];
  if (activeSubcategory !== 'all') {
    filteredJewellery = filteredJewellery.filter(j => j.subcategory === activeSubcategory);
  }
  let sortedJewellery = [...filteredJewellery];
  if (sortOrder === 'newest') {
    sortedJewellery.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortOrder === 'featured') {
    sortedJewellery.sort((a, b) => (b.isFeatured === a.isFeatured) ? 0 : b.isFeatured ? 1 : -1);
  } else if (sortOrder === 'purity22') {
    sortedJewellery = sortedJewellery.filter(j => j.purity === '22K Gold');
  } else if (sortOrder === 'purity18') {
    sortedJewellery = sortedJewellery.filter(j => j.purity === '18K Gold');
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-bg-primary flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen pt-36 pb-24 bg-bg-primary text-center px-4">
        <div className="max-w-md mx-auto space-y-6 bg-white p-10 rounded-2xl border border-gray-200 shadow-lg">
          <span className="text-4xl block">💎</span>
          <h1 className="text-3xl font-heading text-text-primary">Collection Not Found</h1>
          <p className="text-gray-500 text-sm font-body">The collection catalog you are looking for does not exist or has been moved.</p>
          <Link to="/" className="btn-gold inline-block w-full">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary pt-28 pb-24">
      
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
              className="absolute top-6 right-6 text-white hover:text-gold-accent transition-colors bg-white/10 p-2 rounded-full"
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
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Breadcrumbs Navigation */}
        <nav className="flex items-center text-xs font-label font-medium uppercase tracking-wider text-gray-400 mb-8 pb-4 border-b border-gray-100">
          <Link to="/" className="hover:text-gold-primary transition-colors">Home</Link>
          <ChevronRight size={12} className="mx-2 text-gray-300" />
          <Link to="/#collections" className="hover:text-gold-primary transition-colors">Collections</Link>
          <ChevronRight size={12} className="mx-2 text-gray-300" />
          <span className="text-text-primary">{category.name}</span>
        </nav>

        {/* Catalog Category Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <span className="text-gold-primary font-label text-xs tracking-widest uppercase font-semibold">
              CATALOG GALLERY
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-semibold text-text-primary">{category.name}</h1>
            {category.description && (
              <p className="text-gray-600 max-w-2xl font-body text-base pt-2">
                {category.description}
              </p>
            )}
          </motion.div>
        </div>

        {/* Subcategories Filter Pills */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2.5 mb-10 pb-6 border-b border-gray-150">
            <button
              onClick={() => setActiveSubcategory('all')}
              className={`px-5 py-2 rounded-full font-label text-xs tracking-wider uppercase font-semibold transition-all duration-300 border ${
                activeSubcategory === 'all'
                  ? 'bg-[#2a0409] text-white border-[#2a0409] shadow-md shadow-[#2a0409]/20'
                  : 'bg-white text-gray-600 border-gray-250 hover:border-[#2a0409]/55'
              }`}
            >
              All
            </button>
            {category.subcategories.map((sub) => (
              <button
                key={sub.slug}
                onClick={() => setActiveSubcategory(sub.slug)}
                className={`px-5 py-2 rounded-full font-label text-xs tracking-wider uppercase font-semibold transition-all duration-300 border ${
                  activeSubcategory === sub.slug
                    ? 'bg-[#2a0409] text-white border-[#2a0409] shadow-md shadow-[#2a0409]/20'
                    : 'bg-white text-gray-600 border-gray-255 hover:border-[#2a0409]/55'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}

        {/* Filter / Sorting Panel */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-bg-secondary p-5 border border-gray-200 rounded-lg mb-10 shadow-sm gap-4">
          <div className="text-sm font-label font-medium text-gray-600 inline-flex items-center gap-2">
            <Filter size={16} className="text-gray-400" /> Showing {sortedJewellery.length} exquisite items
          </div>
          
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <label className="text-xs text-gray-500 font-label uppercase tracking-widest whitespace-nowrap">Sort By:</label>
            <div className="relative w-full sm:w-auto">
              <select 
                className="w-full sm:w-auto bg-white border border-gray-300 rounded-lg py-2 px-4 text-text-primary font-body text-sm focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-all cursor-pointer pr-8"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">Newest Arrivals</option>
                <option value="featured">Featured Masterpieces</option>
                <option value="purity22">22K Pure Gold Only</option>
                <option value="purity18">18K Fine Gold Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Catalog Items Grid */}
        {sortedJewellery.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-200 rounded-lg shadow-sm space-y-4">
            <p className="text-lg text-gray-500 font-body">No pieces found in this collection matching your filters.</p>
            <button 
              onClick={() => setSortOrder('newest')} 
              className="text-gold-primary hover:text-gold-dark font-label uppercase tracking-wider text-xs font-semibold underline block mx-auto cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedJewellery.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
