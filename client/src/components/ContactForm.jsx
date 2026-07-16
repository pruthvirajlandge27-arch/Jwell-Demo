import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Sparkles, CalendarHeart } from 'lucide-react';
import { useJewellery } from '../context/JewelleryContext';
import toast from 'react-hot-toast';

const ContactForm = () => {
  const { categories } = useJewellery();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const text = `Hello Kubde Jewellers, I would like to book an appointment.
Name: ${formData.name}
Phone: ${formData.phone}
Interested In: ${categories?.find(c => c.slug === formData.category)?.name || 'General Consultation'}
Message: ${formData.message}`;

    const whatsappUrl = `https://wa.me/918080300464?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    
    toast.success('Redirecting to WhatsApp Concierge...');
    setFormData({ name: '', phone: '', category: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-gradient-to-t from-[#0a0001] via-[#140003] to-[#120002] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-primary/20 to-transparent"></div>
      
      {/* Decorative glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-wine-light/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
          
          {/* Left Column - Concierge Invite */}
          <motion.div 
            className="w-full lg:w-5/12 text-center lg:text-left space-y-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center lg:justify-start gap-3 mb-2">
              <CalendarHeart className="text-gold-primary w-6 h-6 animate-pulse" />
              <span className="text-gold-accent font-label text-xs tracking-[0.3em] uppercase">Private Consultation</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-heading font-medium text-white leading-tight drop-shadow-lg">
              Book A <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-primary to-gold-dark text-glow-gold italic">
                VIP Appointment
              </span>
            </h2>
            
            <p className="text-warm-ivory/80 font-body text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 border-l-2 border-gold-primary/30 pl-6">
              Experience jewelry selection the way it was meant to be. Schedule a private viewing with our senior consultants to explore bespoke designs, bridal sets, or everyday luxury.
            </p>

            <div className="hidden lg:block pt-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-primary"></div>
                <p className="font-label text-sm tracking-widest uppercase text-warm-ivory/60">Dedicated Styling Expert</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-primary"></div>
                <p className="font-label text-sm tracking-widest uppercase text-warm-ivory/60">Priority Customization</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-primary"></div>
                <p className="font-label text-sm tracking-widest uppercase text-warm-ivory/60">No Waiting Times</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Premium Form Box */}
          <motion.div
            className="w-full lg:w-7/12"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-premium-dark p-8 md:p-12 lg:p-14 border border-gold-primary/20 shadow-[0_30px_60px_rgba(0,0,0,0.7)] rounded-[2rem] relative overflow-hidden">
              
              {/* Card subtle sweep highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name Input */}
                  <div className="relative group">
                    <input 
                      type="text" 
                      name="name" 
                      id="name"
                      required 
                      value={formData.name} 
                      onChange={handleChange} 
                      className="peer w-full bg-transparent border-0 border-b-2 border-gold-primary/30 py-4 text-white font-body text-base focus:outline-none focus:border-gold-accent transition-all duration-300 placeholder-transparent"
                      placeholder="Your Name"
                    />
                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-gold-light/80 font-label text-[10px] tracking-[0.2em] uppercase transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-warm-ivory/50 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-gold-accent cursor-text">
                      Your Name *
                    </label>
                  </div>
                  
                  {/* Phone Input */}
                  <div className="relative group">
                    <input 
                      type="tel" 
                      name="phone"
                      id="phone" 
                      required 
                      value={formData.phone} 
                      onChange={handleChange} 
                      className="peer w-full bg-transparent border-0 border-b-2 border-gold-primary/30 py-4 text-white font-body text-base focus:outline-none focus:border-gold-accent transition-all duration-300 placeholder-transparent"
                      placeholder="Phone Number"
                    />
                    <label htmlFor="phone" className="absolute left-0 -top-3.5 text-gold-light/80 font-label text-[10px] tracking-[0.2em] uppercase transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-warm-ivory/50 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-gold-accent cursor-text">
                      Phone Number *
                    </label>
                  </div>
                </div>

                {/* Collection Select */}
                <div className="relative">
                  <label className="block text-gold-light/80 font-label text-[10px] tracking-[0.2em] uppercase mb-2">
                    Area of Interest
                  </label>
                  <div className="relative">
                    <select 
                      name="category" 
                      value={formData.category} 
                      onChange={handleChange} 
                      className="w-full bg-[#160205]/50 border border-gold-primary/20 rounded-xl py-4 px-5 text-white font-body text-sm focus:outline-none focus:border-gold-accent focus:ring-1 focus:ring-gold-accent transition-all duration-300 appearance-none shadow-inner cursor-pointer"
                    >
                      <option value="" className="bg-[#120002] text-white">General Consultation</option>
                      {categories && categories.map(cat => (
                        <option key={cat._id} value={cat.slug} className="bg-[#120002] text-white">{cat.name}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gold-primary">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="relative group mt-10">
                  <textarea 
                    name="message" 
                    id="message"
                    rows="3" 
                    value={formData.message} 
                    onChange={handleChange} 
                    className="peer w-full bg-transparent border-0 border-b-2 border-gold-primary/30 py-4 text-white font-body text-base focus:outline-none focus:border-gold-accent transition-all duration-300 placeholder-transparent resize-none"
                    placeholder="Your Message"
                  ></textarea>
                  <label htmlFor="message" className="absolute left-0 -top-3.5 text-gold-light/80 font-label text-[10px] tracking-[0.2em] uppercase transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-warm-ivory/50 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-gold-accent cursor-text">
                    Tell us what you're looking for...
                  </label>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-5 justify-start">
                  <button 
                    type="submit" 
                    className="btn-gold flex items-center justify-center flex-1 lg:flex-none sm:w-[250px] !rounded-xl !py-4.5"
                  >
                    <Send size={16} className="mr-2" /> Request Booking
                  </button>
                  
                  <a 
                    href="https://wa.me/919876543210" 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-outline flex items-center justify-center flex-1 lg:flex-none sm:w-[250px] !border-[#25D366]/50 !text-[#25D366] hover:!bg-[#25D366] hover:!text-white hover:!border-[#25D366] !rounded-xl !py-4.5 shadow-xl group"
                  >
                    <MessageCircle size={18} className="mr-2 group-hover:animate-bounce" /> WhatsApp Fast-Track
                  </a>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
