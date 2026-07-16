import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock } from 'lucide-react';
import logoImg from '../assets/kj.webp';

const Footer = () => {
  return (
    <footer className="bg-[#120002] text-white pt-16 border-t border-gold-primary/20">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* 3 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand & Tagline (Span 5) */}
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 mb-2">
              <img 
                src={logoImg} 
                alt="Kubde Jewellers Logo" 
                className="h-14 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold text-gold-primary tracking-wide leading-tight">
                  Kubde Jewellers
                </span>
                <span className="text-[10px] font-label text-gold-primary/80 tracking-widest uppercase leading-tight">
                  PREMIUM CATALOGUE
                </span>
              </div>
            </Link>
            
            <h3 className="text-xl font-heading font-bold text-white leading-tight">
              Elegant Jewellery Collections, <br/> Crafted With Trust
            </h3>
            
            <p className="text-gray-400 font-body text-sm leading-relaxed max-w-sm">
              Since 1937, we have served families with hallmark quality, transparent guidance, and premium jewellery designs for every occasion.
            </p>

            {/* Social Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://www.instagram.com/kubdejewellers/?hl=en" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#1e0306] border border-white/10 hover:border-gold-primary/50 text-white text-xs px-3 py-1.5 rounded-full transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> Instagram
              </a>
              <a href="https://www.facebook.com/KubdeJewellersPvtLtd/" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#1e0306] border border-white/10 hover:border-gold-primary/50 text-white text-xs px-3 py-1.5 rounded-full transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> Facebook
              </a>
              <a href="https://wa.me/918080300464" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#1e0306] border border-white/10 hover:border-gold-primary/50 text-white text-xs px-3 py-1.5 rounded-full transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg> WhatsApp
              </a>
              <a href="https://www.youtube.com/@KubdeJewellers" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#1e0306] border border-white/10 hover:border-gold-primary/50 text-white text-xs px-3 py-1.5 rounded-full transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg> YouTube
              </a>
            </div>

            {/* Stats Cards */}
            <div className="flex gap-4 pt-4">
              <div className="bg-[#1e0306] border border-white/5 rounded-lg p-4 flex-1 flex flex-col items-center justify-center text-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500 mb-2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                <div className="text-white font-bold font-heading text-lg">74.5K</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider">Instagram Followers</div>
              </div>
              <div className="bg-[#1e0306] border border-white/5 rounded-lg p-4 flex-1 flex flex-col items-center justify-center text-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mb-2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                <div className="text-white font-bold font-heading text-lg">32.2K</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider">Facebook Followers</div>
              </div>
            </div>
          </div>
          
          {/* Column 2: Collections (Span 3) */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-white font-label font-bold text-sm">
              Collections
            </h4>
            <ul className="space-y-3">
              <li><Link to="/collections/mens" className="flex items-center gap-2 text-gray-400 hover:text-gold-accent transition-colors font-body text-sm bg-[#1e0306] border border-white/5 px-4 py-3 rounded-lg"><span className="text-gold-primary">↑</span> Men's Collection</Link></li>
              <li><Link to="/collections/womens" className="flex items-center gap-2 text-gray-400 hover:text-gold-accent transition-colors font-body text-sm bg-[#1e0306] border border-white/5 px-4 py-3 rounded-lg"><span className="text-gold-primary">↑</span> Women's Collection</Link></li>
              <li><Link to="/collections/customized" className="flex items-center gap-2 text-gray-400 hover:text-gold-accent transition-colors font-body text-sm bg-[#1e0306] border border-white/5 px-4 py-3 rounded-lg"><span className="text-gold-primary">↑</span> Customized Jewelry</Link></li>
              <li><Link to="/collections/silver" className="flex items-center gap-2 text-gray-400 hover:text-gold-accent transition-colors font-body text-sm bg-[#1e0306] border border-white/5 px-4 py-3 rounded-lg"><span className="text-gold-primary">↑</span> Silver Collection</Link></li>
            </ul>
          </div>

          {/* Column 3: Visit Store (Span 4) */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-white font-label font-bold text-sm">
              Visit Store
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-gold-primary mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm font-body leading-relaxed">
                  Kubde Heights, Ambadevi Road,<br/>
                  Amravati, Maharashtra - 444601
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={18} className="text-gold-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm font-body">+91 8080300464</span>
              </li>
              <li className="flex items-center gap-4">
                <Clock size={18} className="text-gold-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm font-body">10:30 AM - 8:30 PM (Daily)</span>
              </li>
            </ul>
            <a 
              href="https://www.google.com/maps?q=Kubde+Jewellers+Amravati" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-gold-primary hover:bg-gold-light text-[#120002] font-bold px-5 py-2.5 rounded-full transition-colors text-xs mt-2"
            >
              Open In Maps <span>→</span>
            </a>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col items-center text-center gap-4">
          <div className="bg-[#1e0306] border border-white/5 px-4 py-2 rounded-full inline-flex items-center gap-2 text-xs text-gray-400">
            <span>Developed by</span> <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent font-extrabold tracking-wide">codesip</span>
          </div>
          <p className="text-[11px] text-gray-500 font-body">
            Copyright © 2026 Kubde Jewellers. All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
