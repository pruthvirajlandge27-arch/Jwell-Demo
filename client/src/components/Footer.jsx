import { Link } from 'react-router-dom';
import { useJewellery } from '../context/JewelleryContext';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  const { categories } = useJewellery();

  return (
    <footer className="bg-[#050000] text-warm-ivory border-t border-gold-primary/30 pt-24 pb-8 relative overflow-hidden">
      
      {/* Lavish Background Glows & Patterns */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-primary to-transparent"></div>
      <div className="absolute -top-40 right-0 w-96 h-96 bg-wine-light/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Subtle ornamental mandala SVG */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none scale-150">
        <svg viewBox="0 0 100 100" className="w-[800px] h-[800px] animate-[spin_120s_linear_infinite]">
          <path d="M50 0 L 50 100 M 0 50 L 100 50 M 15 15 L 85 85 M 15 85 L 85 15" stroke="#F3C64F" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="#F3C64F" strokeWidth="0.2" strokeDasharray="2,2" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#F3C64F" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
        
        {/* Top Newsletter / Brand Statement Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center pb-16 border-b border-gold-primary/10 mb-16 gap-10">
          <div className="text-center lg:text-left">
            <Link to="/" className="inline-flex flex-col mb-4">
              <span className="text-4xl md:text-5xl font-brand font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-primary to-gold-dark tracking-[0.15em] text-glow-gold drop-shadow-xl">
                BHAMARE
              </span>
              <span className="text-xs font-label text-gold-light/80 tracking-[0.5em] -mt-1 uppercase font-semibold">
                JEWELLERS
              </span>
            </Link>
            <p className="text-warm-ivory/60 font-body text-sm max-w-md mx-auto lg:mx-0">
              The epitome of pure heritage and master craftsmanship. Adorning generations with timeless elegance since 1995.
            </p>
          </div>
          
          <div className="w-full lg:w-5/12 glass-premium-dark p-6 md:p-8 rounded-[2rem] border border-gold-primary/20">
            <h4 className="text-gold-light font-heading text-2xl mb-4">Join The Inner Circle</h4>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-[#120002] border border-gold-primary/20 rounded-full py-4 pl-6 pr-32 text-white font-body text-sm focus:outline-none focus:border-gold-accent transition-colors"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-gold-primary to-gold-dark text-black font-label text-[10px] font-bold uppercase tracking-widest px-6 rounded-full hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-label font-bold tracking-[0.2em] text-xs uppercase mb-8 flex items-center gap-2">
              <div className="w-4 h-[1px] bg-gold-primary"></div> EXPLORE
            </h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-warm-ivory/70 hover:text-gold-accent hover:translate-x-2 transition-all font-body text-sm block">Home</Link></li>
              <li><a href="#about" className="text-warm-ivory/70 hover:text-gold-accent hover:translate-x-2 transition-all font-body text-sm block">Heritage (About Us)</a></li>
              <li><a href="#collections" className="text-warm-ivory/70 hover:text-gold-accent hover:translate-x-2 transition-all font-body text-sm block">Our Collections</a></li>
              <li><a href="#testimonials" className="text-warm-ivory/70 hover:text-gold-accent hover:translate-x-2 transition-all font-body text-sm block">Patron Stories</a></li>
              <li><a href="#contact" className="text-warm-ivory/70 hover:text-gold-accent hover:translate-x-2 transition-all font-body text-sm block">Book Appointment</a></li>
            </ul>
          </div>

          {/* Catalog Categories */}
          <div className="space-y-6">
            <h4 className="text-white font-label font-bold tracking-[0.2em] text-xs uppercase mb-8 flex items-center gap-2">
              <div className="w-4 h-[1px] bg-gold-primary"></div> CATALOG
            </h4>
            <ul className="space-y-4">
              {categories && categories.slice(0, 5).map(cat => (
                <li key={cat._id}>
                  <Link to={`/collections/${cat.slug}`} className="text-warm-ivory/70 hover:text-gold-accent hover:translate-x-2 transition-all font-body text-sm block">
                    {cat.name}
                  </Link>
                </li>
              ))}
              {categories && categories.length > 5 && (
                <li className="pt-2">
                  <a href="#collections" className="text-gold-primary font-bold text-xs uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1 group">
                    Full Catalog <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6 lg:col-span-2">
            <h4 className="text-white font-label font-bold tracking-[0.2em] text-xs uppercase mb-8 flex items-center gap-2">
              <div className="w-4 h-[1px] bg-gold-primary"></div> FLAGSHIP SHOWROOM
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-gold-primary/20 flex items-center justify-center shrink-0 text-gold-accent bg-gold-primary/5">
                  <MapPin size={16} />
                </div>
                <p className="text-warm-ivory/70 text-sm leading-relaxed font-body">
                  Jayhind Chowk,<br/> Near New Rajrajeshwar Temple,<br/> Akola, Maharashtra 444001
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-gold-primary/20 flex items-center justify-center shrink-0 text-gold-accent bg-gold-primary/5">
                    <Phone size={16} />
                  </div>
                  <p className="text-warm-ivory/70 text-sm font-body">
                    +91 98765 43210
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-gold-primary/20 flex items-center justify-center shrink-0 text-gold-accent bg-gold-primary/5">
                    <Mail size={16} />
                  </div>
                  <p className="text-warm-ivory/70 text-sm font-body">
                    concierge@bhamarejewellers.com
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-6 flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gold-primary/30 flex items-center justify-center text-gold-primary hover:bg-gold-primary hover:text-black hover:scale-110 transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gold-primary/30 flex items-center justify-center text-gold-primary hover:bg-gold-primary hover:text-black hover:scale-110 transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gold-primary/30 flex items-center justify-center text-gold-primary hover:bg-gold-primary hover:text-black hover:scale-110 transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>
          
        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-gold-primary/15 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center text-[10px] text-warm-ivory/40 font-label tracking-[0.2em] uppercase text-center md:text-left gap-4">
          <p>© {new Date().getFullYear()} BHAMARE JEWELLERS. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 font-medium">
            <a href="#" className="hover:text-gold-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-primary transition-colors">Terms of Service</a>
            <a href="http://localhost:5174/admin/login" target="_blank" rel="noreferrer" className="hover:text-gold-primary transition-colors">Staff Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
