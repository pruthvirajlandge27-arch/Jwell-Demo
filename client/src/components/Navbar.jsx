import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Sparkles, Gem, HandPlatter } from 'lucide-react';
import logoImg from '../assets/kj.webp';

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
      <nav className={`fixed w-full z-50 transition-all duration-300 top-0`}>
        {/* Main Navbar Bar */}
        <div className="bg-[#120002] border-b border-[#2a0409] w-full shadow-md">
          <div className="container mx-auto px-4 md:px-8 py-3 md:py-4 flex justify-between items-center">
            {/* Logo Section */}
            <Link to="/" className="flex items-center">
              <img 
                src={logoImg} 
                alt="Kubde Jewellers Logo" 
                className="h-16 md:h-20 w-auto object-contain"
              />
            </Link>

            {/* Desktop Center Pills */}
            <div className="hidden lg:flex space-x-3 xl:space-x-4 items-center">
              <Link to="/collections/mens" className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#2a0409]/80 text-gray-200 border border-[#3a060d] hover:bg-[#3a060d] hover:text-white transition-all text-sm font-medium whitespace-nowrap">
                <span className="text-lg leading-none">♂</span> Mens
              </Link>
              <Link to="/collections/womens" className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#2a0409]/80 text-gray-200 border border-[#3a060d] hover:bg-[#3a060d] hover:text-white transition-all text-sm font-medium whitespace-nowrap">
                <span className="text-lg leading-none">♀</span> Womens
              </Link>
              <Link to="/collections/customized" className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#2a0409]/80 text-gray-200 border border-[#3a060d] hover:bg-[#3a060d] hover:text-white transition-all text-sm font-medium whitespace-nowrap">
                <HandPlatter size={16} /> Customized
              </Link>
              <Link to="/collections/silver" className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#2a0409]/80 text-gray-200 border border-[#3a060d] hover:bg-[#3a060d] hover:text-white transition-all text-sm font-medium whitespace-nowrap">
                <Gem size={16} /> Silver
              </Link>
            </div>

            {/* Call Now Button */}
            <div className="hidden md:block">
              <a 
                href="tel:+919876543210" 
                className="flex items-center gap-2 bg-gradient-to-r from-[#e3b873] to-[#c79c53] text-[#1a1a1a] px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(227,184,115,0.4)] whitespace-nowrap"
              >
                <Phone size={16} className="fill-[#1a1a1a]" /> Call Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-[#e3b873] hover:text-[#ffd700] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Live Gold Rate Bar */}
        <div className="bg-[#1e0306] border-b border-[#2a0409] w-full shadow-inner relative overflow-x-auto hide-scrollbar">
          <div className="container mx-auto px-4 md:px-8 py-2 md:py-2.5 flex flex-col md:flex-row justify-between items-center text-sm min-w-max md:min-w-0">
            <div className="flex items-center gap-2 text-white font-bold tracking-widest text-xs md:text-sm uppercase mb-3 md:mb-0">
              <Sparkles size={16} className="text-[#e3b873]" /> LIVE GOLD RATE
            </div>
            
            <div className="flex flex-row justify-center gap-2 md:gap-3 lg:gap-4 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <span className="px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs md:text-sm font-semibold whitespace-nowrap shadow-sm backdrop-blur-sm">
                24K: 15,510.00 /g
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs md:text-sm font-semibold whitespace-nowrap shadow-sm backdrop-blur-sm">
                22K: 14,280.00 /g
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs md:text-sm font-semibold whitespace-nowrap shadow-sm backdrop-blur-sm">
                18K: 11,640.00 /g
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs md:text-sm font-semibold whitespace-nowrap shadow-sm backdrop-blur-sm">
                Silver: 265.00 /g
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-[150px] md:h-[135px] w-full"></div>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-40 bg-[#120002]/98 backdrop-blur-lg border-l border-gold-primary/20 transition-transform duration-500 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden pt-32 px-8`}>
        <div className="flex flex-col space-y-6 text-left border-t border-[#2a0409] pt-8">
          <Link to="/collections/mens" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white font-heading hover:text-[#e3b873] transition-colors tracking-wide flex items-center gap-4">
             <span className="text-2xl w-6 text-center">♂</span> Mens
          </Link>
          <Link to="/collections/womens" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white font-heading hover:text-[#e3b873] transition-colors tracking-wide flex items-center gap-4">
             <span className="text-2xl w-6 text-center">♀</span> Womens
          </Link>
          <Link to="/collections/customized" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white font-heading hover:text-[#e3b873] transition-colors tracking-wide flex items-center gap-4">
             <HandPlatter size={24} className="w-6" /> Customized
          </Link>
          <Link to="/collections/silver" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white font-heading hover:text-[#e3b873] transition-colors tracking-wide flex items-center gap-4">
             <Gem size={24} className="w-6" /> Silver
          </Link>
          
          <div className="pt-8 mt-4 border-t border-[#2a0409]">
            <a 
              href="tel:+919876543210" 
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#e3b873] to-[#c79c53] text-[#1a1a1a] px-6 py-3.5 rounded-full font-bold text-lg hover:opacity-90 transition-opacity w-full shadow-lg"
            >
              <Phone size={20} className="fill-[#1a1a1a]" /> Call Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
