import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight, ArrowLeft, Share2, Sparkles, Phone } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/jewellery/${id}`);
        const data = res.data;
        setProduct(data);
        setCategory(data.category);
        
        // Fetch related products of the same category
        if (data.category?.slug) {
          const relatedRes = await axios.get(`${API_URL}/api/jewellery?category=${data.category.slug}`);
          const relatedFiltered = relatedRes.data.filter(p => p._id !== data._id);
          setRelatedProducts(relatedFiltered.slice(0, 4));
        }
      } catch (error) {
        console.error('Failed to load product details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-36 bg-bg-primary flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-36 pb-24 bg-bg-primary text-center px-4">
        <div className="max-w-md mx-auto space-y-6 bg-white p-10 rounded-2xl border border-gray-200 shadow-lg">
          <span className="text-4xl block">💎</span>
          <h1 className="text-3xl font-heading text-text-primary">Product Not Found</h1>
          <p className="text-gray-500 text-sm font-body">The jewelry piece you are looking for does not exist or has been removed.</p>
          <Link to="/" className="btn-gold inline-block w-full">Return Home</Link>
        </div>
      </div>
    );
  }

  // Math Calculations based on Mockup Spec
  const isSilver = product.purity?.toLowerCase().includes('silver') || category?.name?.toLowerCase().includes('silver');
  
  // Weights parsing
  const parseWeight = (wStr) => {
    if (!wStr) return 0;
    const num = parseFloat(wStr.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };
  
  const netWeightNum = parseWeight(product.netWeight || product.weight || '1.9g');
  const grossWeightNum = parseWeight(product.grossWeight || product.weight || '2.07g');
  
  // Gold Rates Map
  let ratePerGram = 14280; // Default 22K
  
  if (product.purity?.toLowerCase().includes('18k')) {
    ratePerGram = 11640;
  } else if (product.purity?.toLowerCase().includes('24k')) {
    ratePerGram = 15510;
  } else if (isSilver) {
    ratePerGram = 265;
  }

  // Making charges
  const makingChargesPercent = 12; // 12% making charges
  
  // Calculate pricing breakdown
  const goldValue = netWeightNum * ratePerGram;
  const makingValue = goldValue * (makingChargesPercent / 100);
  const hallmarkCharges = isSilver ? 0 : 90;
  const huidCharges = isSilver ? 0 : 45;
  const stoneCharges = (product.title?.toLowerCase().includes('diamond') || product.title?.toLowerCase().includes('kundan') || product.title?.toLowerCase().includes('earring') || product.title?.toLowerCase().includes('ring')) ? 374 : 0;
  
  const subtotal = goldValue + makingValue + hallmarkCharges + huidCharges + stoneCharges;
  const gstAmount = subtotal * 0.03; // 3% GST
  const estimatedFinalPrice = subtotal + gstAmount;

  // WhatsApp Enquiry Link
  const handleWhatsAppEnquire = () => {
    const message = `Hello Kubde Jewellers, I am interested in this item from your online catalog:\n- Title: ${product.title}\n- Code: ${product.productCode || 'N/A'}\n- Net Wt: ${product.netWeight || 'N/A'}\n- Est. Price: INR ${estimatedFinalPrice.toLocaleString('en-IN')}\nPlease share availability details!`;
    const whatsappUrl = `https://wa.me/918080300464?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out this gorgeous ${product.title} on Kubde Jewellers!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  const primaryImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;

  return (
    <div className="min-h-screen bg-bg-primary pt-28 pb-24 text-left relative">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pb-4 border-b border-gray-100">
          <nav className="flex items-center text-xs font-label font-medium uppercase tracking-wider text-gray-400">
            <Link to="/" className="hover:text-gold-primary transition-colors">Home</Link>
            <ChevronRight size={12} className="mx-2 text-gray-300" />
            <Link 
              to={category ? `/collections/${category.slug}` : '/#collections'} 
              className="hover:text-gold-primary transition-colors"
            >
              {category?.name || 'Collections'}
            </Link>
            <ChevronRight size={12} className="mx-2 text-gray-300" />
            <span className="text-text-primary truncate max-w-[200px]">{product.title}</span>
          </nav>
          
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-sm font-label font-semibold text-[#120002] hover:text-[#2a0409] transition-colors self-start cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Catalog
          </button>
        </div>

        {/* Two-Column Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Left Column: Image and Rates (lg:span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="aspect-[4/3] w-full rounded-3xl bg-gray-50 flex items-center justify-center p-6 border border-gray-150 relative shadow-inner">
              {primaryImage ? (
                <img 
                  src={primaryImage} 
                  alt={product.title} 
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-gray-300">No Image Available</span>
              )}
            </div>

            {/* Speeds and rates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50">
                <span className="text-[10px] font-label font-bold text-gray-400 tracking-wider uppercase block mb-1">
                  CURRENT RATE
                </span>
                <span className="text-base font-extrabold text-[#120002]">
                  INR {ratePerGram.toLocaleString('en-IN')} /g
                </span>
              </div>
              <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50">
                <span className="text-[10px] font-label font-bold text-gray-400 tracking-wider uppercase block mb-1">
                  MAKING CHARGES
                </span>
                <span className="text-base font-extrabold text-[#120002]">
                  {makingChargesPercent}%
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Spec card & pricing splits (lg:span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              {/* Badge header */}
              <div className="inline-flex items-center gap-1.5 bg-[#ebf8ff] text-[#2b6cb0] font-label text-[10px] tracking-widest uppercase font-bold py-1.5 px-4 rounded-full mb-4">
                <Sparkles size={12} /> PRODUCT DETAILS
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-[#120002] mb-3 leading-tight">
                {product.title}
              </h1>

              {/* Description */}
              <p className="text-gray-600 font-body text-base mb-6 leading-relaxed">
                {product.description || "Detailed view with complete weight, purity, and pricing explanation so customers can understand the product clearly."}
              </p>

              {/* Badges row */}
              <div className="flex flex-wrap gap-2.5 mb-6">
                <span className="bg-[#120002] text-white font-label font-semibold text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                  {category?.name?.replace(' Collection', '').toLowerCase() || 'womens'}
                </span>
                <span className="border border-[#2b6cb0]/30 text-[#2b6cb0] font-label font-semibold text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#ebf8ff]/50">
                  {product.subcategory || 'Earrings'}
                </span>
                <span className="border border-gray-200 text-gray-500 font-label font-semibold text-[10px] px-3.5 py-1.5 rounded-full">
                  Barcode: {product.productCode?.replace('#', '') || 'Tpc/141'}
                </span>
                <span className="border border-gray-200 text-gray-500 font-label font-semibold text-[10px] px-3.5 py-1.5 rounded-full">
                  {product.purity || '22K'}
                </span>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="border border-gray-100 rounded-xl p-3 bg-gray-50/50">
                  <span className="text-[8px] font-label font-bold text-gray-400 tracking-wider block mb-1">NET WEIGHT</span>
                  <span className="text-sm font-extrabold text-[#120002]">{product.netWeight || product.weight || '—'}</span>
                </div>
                <div className="border border-gray-100 rounded-xl p-3 bg-gray-50/50">
                  <span className="text-[8px] font-label font-bold text-gray-400 tracking-wider block mb-1">GROSS WEIGHT</span>
                  <span className="text-sm font-extrabold text-[#120002]">{product.grossWeight || product.weight || '—'}</span>
                </div>
                <div className="border border-gray-100 rounded-xl p-3 bg-gray-50/50">
                  <span className="text-[8px] font-label font-bold text-gray-400 tracking-wider block mb-1">GST</span>
                  <span className="text-sm font-extrabold text-[#120002]">3%</span>
                </div>
                <div className="border border-gray-100 rounded-xl p-3 bg-gray-50/50">
                  <span className="text-[8px] font-label font-bold text-gray-400 tracking-wider block mb-1">HALLMARK</span>
                  <span className="text-sm font-extrabold text-[#120002]">INR {hallmarkCharges.toFixed(2)}</span>
                </div>
              </div>

              {/* Blue Price Calculations Container */}
              <div className="bg-[#123554] rounded-2xl p-6 text-white mb-6 shadow-md relative overflow-hidden">
                <span className="text-[10px] font-label font-bold text-white/60 tracking-wider uppercase block mb-1">
                  ESTIMATED FINAL PRICE
                </span>
                <span className="text-3xl font-heading font-extrabold tracking-tight block mb-5">
                  INR {estimatedFinalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>

                {/* Calculations Splits */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 border-t border-white/10 pt-4 text-xs font-medium">
                  <div className="flex justify-between">
                    <span className="text-white/60">GOLD VALUE</span>
                    <span>INR {goldValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">MAKING VALUE</span>
                    <span>INR {makingValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">HUID CHARGES</span>
                    <span>INR {huidCharges.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">STONE CHARGES</span>
                    <span>INR {stoneCharges.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">HALLMARK CHARGES</span>
                    <span>INR {hallmarkCharges.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">GST AMOUNT</span>
                    <span>INR {gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="col-span-2 border-t border-white/10 pt-2.5 flex justify-between text-sm font-bold">
                    <span className="text-white/75">SUBTOTAL</span>
                    <span className="text-glow-white">INR {subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Actions Block */}
            <div className="hidden md:flex gap-4">
              <button 
                onClick={handleWhatsAppEnquire}
                className="flex-grow bg-[#00a859] hover:bg-[#008f4c] text-white font-label font-bold text-sm px-6 py-4 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.118-2.905-6.993-1.876-1.875-4.359-2.906-7.004-2.907-5.433 0-9.854 4.421-9.858 9.865-.001 1.705.452 3.37 1.312 4.858L1.706 21.82l4.941-1.295zM17.51 14.88c-.3-.149-1.772-.875-2.046-.975-.274-.1-.474-.149-.674.15-.2.299-.773.974-.948 1.173-.175.199-.349.224-.649.075-.3-.15-1.266-.467-2.41-1.485-.89-.793-1.492-1.773-1.667-2.072-.175-.3-.019-.461.13-.61.135-.133.3-.349.45-.523.15-.174.2-.299.3-.499.1-.2.05-.374-.025-.524-.075-.15-.674-1.622-.924-2.222-.243-.585-.491-.506-.674-.515-.173-.008-.374-.01-.574-.01-.2 0-.524.075-.798.374-.274.299-1.047 1.023-1.047 2.494 0 1.472 1.072 2.893 1.222 3.093.15.2 2.11 3.22 5.11 4.517.714.309 1.272.493 1.707.63.717.228 1.368.196 1.884.119.574-.085 1.772-.724 2.022-1.422.25-.699.25-1.297.175-1.422-.075-.125-.275-.199-.575-.349z"/>
                </svg>
                Enquire On WhatsApp
              </button>
              <button 
                onClick={handleShare}
                className="bg-white hover:bg-gray-50 border border-gray-250 text-gray-700 font-label font-bold text-sm px-6 py-4 rounded-full flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer animate-pulse-slow"
              >
                <Share2 size={16} /> Share Item
              </button>
            </div>
          </div>
        </div>

        {/* More In This Collection Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-10 border-t border-gray-100">
            <div className="mb-10 text-left">
              <span className="inline-block bg-[#ebf8ff] text-[#2b6cb0] font-label text-[10px] tracking-widest uppercase font-bold py-1 px-3 rounded-full mb-1">
                RELATED PRODUCTS
              </span>
              <h2 className="text-3xl font-heading font-bold text-[#120002]">
                More In This Collection
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relProd => (
                <ProductCard key={relProd._id} product={relProd} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Spacer for sticky footer on mobile */}
      <div className="h-24 w-full md:hidden"></div>

      {/* MOBILE ONLY STICKY FOOTER BAR */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-150 py-3 px-5 flex items-center justify-between z-40 shadow-[0_-5px_15px_rgba(0,0,0,0.06)] md:hidden">
        <div className="flex flex-col text-left">
          <span className="text-[8px] font-label font-bold text-gray-400 tracking-wider uppercase">
            {product.productCode || '#Tpc/141'} — ESTIMATED
          </span>
          <span className="text-[#0b5e94] font-label font-extrabold text-base tracking-tight leading-none">
            INR {estimatedFinalPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}*
          </span>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleWhatsAppEnquire}
            className="bg-[#00a859] hover:bg-[#008f4c] text-white font-label font-bold text-xs px-4 py-2.5 rounded-full shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.118-2.905-6.993-1.876-1.875-4.359-2.906-7.004-2.907-5.433 0-9.854 4.421-9.858 9.865-.001 1.705.452 3.37 1.312 4.858L1.706 21.82l4.941-1.295zM17.51 14.88c-.3-.149-1.772-.875-2.046-.975-.274-.1-.474-.149-.674.15-.2.299-.773.974-.948 1.173-.175.199-.349.224-.649.075-.3-.15-1.266-.467-2.41-1.485-.89-.793-1.492-1.773-1.667-2.072-.175-.3-.019-.461.13-.61.135-.133.3-.349.45-.523.15-.174.2-.299.3-.499.1-.2.05-.374-.025-.524-.075-.15-.674-1.622-.924-2.222-.243-.585-.491-.506-.674-.515-.173-.008-.374-.01-.574-.01-.2 0-.524.075-.798.374-.274.299-1.047 1.023-1.047 2.494 0 1.472 1.072 2.893 1.222 3.093.15.2 2.11 3.22 5.11 4.517.714.309 1.272.493 1.707.63.717.228 1.368.196 1.884.119.574-.085 1.772-.724 2.022-1.422.25-.699.25-1.297.175-1.422-.075-.125-.275-.199-.575-.349z"/>
            </svg>
            Enquire
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductDetailPage;
