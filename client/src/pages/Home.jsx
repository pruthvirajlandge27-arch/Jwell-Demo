import { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import TrustBar from '../components/TrustBar';
import CollectionsGrid from '../components/CollectionsGrid';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturedBanners from '../components/FeaturedBanners';
import TestimonialsSlider from '../components/TestimonialsSlider';
import VisitUs from '../components/VisitUs';
import ContactForm from '../components/ContactForm';
import ProductCard from '../components/ProductCard';
import { useJewellery } from '../context/JewelleryContext';
import { motion } from 'framer-motion';

const Home = () => {
  const { featuredJewellery } = useJewellery();

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

  return (
    <div className="bg-transparent">
      <HeroSection />
      
      {/* Dynamic Collections Grid Section */}
      <CollectionsGrid />
      
      {/* Brand Highlights Section */}
      <WhyChooseUs />
      
      {/* Featured Jewellery Grid */}
      {featuredJewellery && featuredJewellery.length > 0 && (
        <section className="py-28 bg-[#180205]/40 border-t border-b border-gold-primary/10 relative">
          {/* Subtle gold glowing backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <span className="text-gold-accent font-label text-xs tracking-[0.25em] uppercase block">HANDPICKED FOR YOU</span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-medium text-white text-glow-gold">Featured Pieces</h2>
                <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent mx-auto"></div>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {featuredJewellery.slice(0, 8).map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            
            {featuredJewellery.length > 8 && (
              <div className="text-center mt-16">
                <button 
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="btn-outline"
                >
                  View All Featured Pieces
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Testimonials Review Slider */}
      <TestimonialsSlider />
      
      {/* Showroom Visit Location */}
      <VisitUs />
      
      {/* Appointment Contact Form */}
      <ContactForm />
    </div>
  );
};

export default Home;
