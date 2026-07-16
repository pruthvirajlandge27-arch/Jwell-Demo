import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';

const StoreAndContact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const text = `Hello Kubde Jewellers! My name is ${formData.name}. ${formData.message}`;
    const whatsappUrl = `https://wa.me/918080300464?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column: Store Details */}
          <motion.div 
            className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-[#2a0409]/10 text-[#2a0409] border border-[#2a0409]/20 font-label text-[10px] tracking-widest uppercase font-bold py-1 px-3 rounded shadow-sm mb-6">
              STORE DETAILS
            </div>
            
            <h2 className="text-3xl font-heading font-bold text-[#120002] mb-8">
              Visit Our Jewellery Store
            </h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#2a0409]/10 border border-[#2a0409]/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#3a060d]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">ADDRESS</h4>
                  <p className="text-sm font-medium text-gray-800">
                    Kubde Heights, Ambadevi Road, Amravati,<br />
                    Maharashtra - 444601
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#2a0409]/10 border border-[#2a0409]/10 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-[#3a060d]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">PHONE</h4>
                  <p className="text-sm font-medium text-gray-800">+91 8080300464</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#2a0409]/10 border border-[#2a0409]/10 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-[#3a060d]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">STORE TIMINGS</h4>
                  <p className="text-sm font-medium text-gray-800">10:30 AM - 8:30 PM (Daily)</p>
                </div>
              </div>
            </div>

            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#2a0409] hover:bg-[#120002] text-white font-medium px-6 py-2.5 rounded-full transition-colors shadow-md text-sm border border-[#3a060d]"
            >
              Open In Google Maps <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            className="bg-[#120002] rounded-2xl p-8 md:p-12 border border-gold-primary/20 shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Subtle glow */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold-primary/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="inline-block border border-gold-primary/30 text-gold-accent font-label text-[10px] tracking-widest uppercase font-bold py-1 px-3 rounded shadow-sm bg-gold-primary/10 mb-6">
                CONTACT FORM
              </div>
              
              <h2 className="text-3xl font-heading font-bold text-white mb-2">
                Send Us Your Requirement
              </h2>
              <p className="text-sm text-gray-300 font-body mb-8">
                Share your enquiry and we will assist you with product options and pricing details.
              </p>
              
              <form onSubmit={handleWhatsApp} className="space-y-4">
                <input 
                  type="text" 
                  required
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#1e0306] border border-gold-primary/30 text-white rounded px-4 py-3 focus:outline-none focus:border-gold-primary transition-colors text-sm"
                />
                <input 
                  type="tel" 
                  required
                  placeholder="Phone Number" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-[#1e0306] border border-gold-primary/30 text-white rounded px-4 py-3 focus:outline-none focus:border-gold-primary transition-colors text-sm"
                />
                <textarea 
                  rows="3"
                  placeholder="Message" 
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-[#1e0306] border border-gold-primary/30 text-white rounded px-4 py-3 focus:outline-none focus:border-gold-primary transition-colors text-sm resize-none"
                ></textarea>
                
                <button 
                  type="submit" 
                  className="inline-flex items-center gap-2 bg-gold-primary hover:bg-gold-light text-[#120002] font-bold px-6 py-3 rounded-full transition-colors shadow-md text-sm mt-2"
                >
                  Send On WhatsApp <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default StoreAndContact;
