import { useEffect, useState } from 'react';
import LeadCaptureGate from '../components/LeadCaptureGate';
import HeroSection from '../components/HeroSection';
import CollectionsGrid from '../components/CollectionsGrid';
import ProductCard from '../components/ProductCard';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutAndSocial from '../components/AboutAndSocial';
import StoreAndContact from '../components/StoreAndContact';
import { useJewellery } from '../context/JewelleryContext';
import { motion } from 'framer-motion';

const Home = () => {
  const { featuredJewellery } = useJewellery();
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Track if user has unlocked the catalogue via the hero form
  const [hasAccess, setHasAccess] = useState(() => {
    return sessionStorage.getItem('catalogueAccess') === 'true';
  });

  const handleAccessGranted = () => {
    setHasAccess(true);
    sessionStorage.setItem('catalogueAccess', 'true');
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, []);

  // Extract unique category names dynamically from the database content
  const dynamicCategories = ['All', ...new Set(
    (featuredJewellery || [])
      .map(item => item.category?.name)
      .filter(Boolean)
  )];

  const filteredJewellery = activeCategory === 'All' 
    ? featuredJewellery 
    : featuredJewellery?.filter(item => item.category?.name === activeCategory);

  return (
    <div className="bg-bg-primary text-text-primary">
      {!hasAccess && (
        <LeadCaptureGate onAccessGranted={handleAccessGranted} hasAccess={hasAccess} />
      )}
      
      {/* Hide everything below until user submits the lead form */}
      {hasAccess && (
        <>
          {/* New Screenshot-based Hero Section */}
          <HeroSection />

          {/* Featured Collections Section */}
          <CollectionsGrid />
          
          {/* Featured Jewellery Grid (Keeping this as it was recently requested) */}
          {featuredJewellery && featuredJewellery.length > 0 && (
            <section id="products" className="py-20 bg-white relative">
              <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                  >
                    <h2 className="text-4xl md:text-5xl font-heading font-semibold text-[#120002]">Featured Pieces</h2>
                    <div className="w-20 h-[2px] bg-gold-primary mx-auto"></div>
                  </motion.div>
                  
                  {/* Dynamic Database Filter Pills */}
                  <div className="flex flex-wrap justify-center gap-3 mt-8">
                    {dynamicCategories.map((cat) => (
                      <button 
                        key={cat} 
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full border border-gray-300 font-label text-sm transition-colors ${activeCategory === cat ? 'bg-[#120002] text-white border-[#120002]' : 'bg-transparent text-[#120002] hover:border-[#120002]'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredJewellery.slice(0, 8).map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                
                {filteredJewellery.length === 0 && (
                  <div className="text-center py-10 text-gray-500">
                    No items found for this category.
                  </div>
                )}
              </div>
            </section>
          )}

          {/* New Sections based on screenshot */}
          <WhyChooseUs />
          <AboutAndSocial />
          <StoreAndContact />
        </>
      )}
    </div>
  );
};

export default Home;
