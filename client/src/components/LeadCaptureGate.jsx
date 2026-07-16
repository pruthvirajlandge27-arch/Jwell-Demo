import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const LeadCaptureGate = ({ onAccessGranted, hasAccess }) => {
  const [formData, setFormData] = useState({ fullName: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(hasAccess || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fullName.trim() && formData.phone.trim()) {
      setIsSubmitted(true);
      
      // Notify parent to unlock sections
      if (onAccessGranted) {
        onAccessGranted();
      }
      
      // Automatically scroll down slightly after short delay
      setTimeout(() => {
        window.scrollBy({ top: window.innerHeight - 100, behavior: 'smooth' });
      }, 1500);
    }
  };

  return (
    <section className="relative min-h-screen bg-bg-primary overflow-hidden flex items-center pt-24 pb-12 lg:pt-32 z-10">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (60%) */}
          <motion.div 
            className="w-full lg:col-span-7 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <span className="text-gold-accent font-label text-sm font-semibold uppercase tracking-[0.2em]">
                Kubde Jewellers
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-text-primary leading-tight">
                Discover Timeless Elegance in Every Crafted Piece.
              </h1>
              <p className="text-gray-600 text-lg md:text-xl font-body max-w-2xl">
                Explore our exclusive collections tailored for your special moments. Please complete the form to gain access to our premium catalogue.
              </p>
            </div>
            
            {/* 2x2 Image Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              <img src="/images/hero_jewelry.png" alt="Lifestyle jewelry" className="w-full h-48 object-cover rounded-lg bg-gray-100" />
              <img src="/images/hero_jewelry.png" alt="Gold necklace" className="w-full h-48 object-cover rounded-lg bg-gray-100" />
              <img src="/images/hero_jewelry.png" alt="Bridal collection" className="w-full h-48 object-cover rounded-lg bg-gray-100" />
              <img src="/images/hero_jewelry.png" alt="Diamond ring" className="w-full h-48 object-cover rounded-lg bg-gray-100" />
            </div>
          </motion.div>

          {/* Right Column (40%) - Lead Form */}
          <motion.div 
            className="w-full lg:col-span-5 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl p-8 border border-gold-primary/30 shadow-lg relative mt-8 lg:mt-0 min-h-[380px] flex flex-col justify-center">
              {/* Badge */}
              <div className="absolute -top-4 left-6 bg-gold-primary text-white font-label text-xs font-bold px-4 py-1.5 rounded uppercase tracking-wider shadow-sm">
                Start Here
              </div>
              
              {!isSubmitted ? (
                <>
                  <h3 className="text-2xl font-heading font-semibold text-text-primary mb-6">
                    Get Your Jewellery Catalogue Access
                  </h3>
                  
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        id="fullName" 
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        placeholder="Enter your full name" 
                        className="w-full border border-gray-300 rounded px-4 py-3 bg-[#e8f0fe] focus:bg-white focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+91 00000 00000" 
                        className="w-full border border-gray-300 rounded px-4 py-3 bg-[#e8f0fe] focus:bg-white focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors"
                      />
                    </div>
                    
                    <button type="submit" className="btn-gold w-full mt-2 font-bold text-lg py-3 rounded">
                      Open Catalogue
                    </button>
                  </form>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="text-center space-y-4 py-6"
                >
                  <div className="flex justify-center mb-4">
                    <CheckCircle2 size={64} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-text-primary">
                    Access Granted!
                  </h3>
                  <p className="text-gray-600 font-body">
                    Thank you, {formData.fullName}. Taking you to the premium collections...
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default LeadCaptureGate;
