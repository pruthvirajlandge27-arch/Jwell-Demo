import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollTo = (id) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-[#120002] text-gold-light/90 border-b border-gold-primary/10 py-2.5 px-4 text-xs font-label tracking-wider flex justify-between items-center z-50 relative">
        <div className="flex items-center space-x-6">
          <span className="flex items-center"><MapPin size={13} className="mr-1.5 text-gold-primary" /> Jayhind Chowk, Akola</span>
          <span className="hidden sm:flex items-center"><Phone size={13} className="mr-1.5 text-gold-primary" /> +91 98765 43210</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="hidden md:inline">⭐ Akola's Trusted Legacy Since 1995</span>
          <a href="http://localhost:5174/admin/login" className="text-gold-primary/60 hover:text-gold-accent hover:underline ml-4" target="_blank" rel="noreferrer">Staff Panel</a>
        </div>
      </div>

      {/* Live Price Marquee */}
      <div className="bg-[#1e0306] border-b border-gold-primary/20 py-1.5 overflow-hidden flex items-center z-50 relative shadow-inner">
        <div className="whitespace-nowrap animate-marquee flex items-center font-label text-sm sm:text-base tracking-widest font-bold uppercase text-gold-accent w-max py-0.5">
          {/* We use 4 identical blocks. The animation moves from -50% to 0%. So the first half (2 blocks) must perfectly match the second half (2 blocks). */}
          {[1, 2, 3, 4].map((block) => (
            <div key={block} className="flex items-center space-x-8 md:space-x-14 px-4 md:px-7">
              <span className="flex items-center gap-2"><Sparkles size={16} className="text-gold-light" /> LIVE RATES:</span>
              <span>GOLD 24K: ₹72,500/10g</span>
              <span>GOLD 22K: ₹66,450/10g</span>
              <span>GOLD 18K: ₹54,380/10g</span>
              <span>SILVER: ₹91,000/kg</span>
              <span>DIAMOND (1CT VS): ₹1,20,000+</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-wine-dark/90 backdrop-blur-md border-b border-gold-primary/15 shadow-xl py-3 top-0' : 'bg-transparent py-6 top-[64px] sm:top-[68px]'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <Link to="/" className="flex flex-col text-left">
            <span className="text-xl md:text-2xl font-brand font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-primary to-gold-dark tracking-[0.15em] text-glow-gold">
              BHAMARE
            </span>
            <span className="text-[9px] md:text-[10px] font-label text-white/95 tracking-[0.4em] -mt-1 uppercase">
              JEWELLERS
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8 items-center">
            <Link to="/" className="text-white/90 hover:text-gold-primary font-label tracking-widest text-xs uppercase transition-colors duration-300 gold-underline pb-1">Home</Link>
            <a href="#collections" onClick={(e) => { e.preventDefault(); handleScrollTo('collections'); }} className="text-white/90 hover:text-gold-primary font-label tracking-widest text-xs uppercase transition-colors duration-300 gold-underline pb-1">Collections</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleScrollTo('about'); }} className="text-white/90 hover:text-gold-primary font-label tracking-widest text-xs uppercase transition-colors duration-300 gold-underline pb-1">About Us</a>
            <a href="#testimonials" onClick={(e) => { e.preventDefault(); handleScrollTo('testimonials'); }} className="text-white/90 hover:text-gold-primary font-label tracking-widest text-xs uppercase transition-colors duration-300 gold-underline pb-1">Testimonials</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleScrollTo('contact'); }} className="text-white/90 hover:text-gold-primary font-label tracking-widest text-xs uppercase transition-colors duration-300 gold-underline pb-1">Contact</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); handleScrollTo('contact'); }}
              className="btn-gold !py-2.5 !px-6 !text-[11px]"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gold-primary hover:text-gold-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-30 bg-[#120002]/98 backdrop-blur-lg border-l border-gold-primary/20 transition-transform duration-500 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden pt-28 px-8`}>
        <div className="flex flex-col space-y-8 text-left border-t border-gold-primary/10 pt-8">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white font-heading hover:text-gold-primary transition-colors tracking-wide">Home</Link>
          <a href="#collections" onClick={(e) => { e.preventDefault(); handleScrollTo('collections'); }} className="text-xl text-white font-heading hover:text-gold-primary transition-colors tracking-wide">Collections</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); handleScrollTo('about'); }} className="text-xl text-white font-heading hover:text-gold-primary transition-colors tracking-wide">About Us</a>
          <a href="#testimonials" onClick={(e) => { e.preventDefault(); handleScrollTo('testimonials'); }} className="text-xl text-white font-heading hover:text-gold-primary transition-colors tracking-wide">Testimonials</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleScrollTo('contact'); }} className="text-xl text-white font-heading hover:text-gold-primary transition-colors tracking-wide">Contact</a>
          
          <div className="pt-6">
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); handleScrollTo('contact'); }}
              className="btn-gold block text-center !w-full"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
