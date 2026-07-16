import { useEffect, useRef } from 'react';
import { X, Share2 } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductDetailModal = ({ product, onClose, allProducts = [], onViewDetails }) => {
  const modalRef = useRef(null);

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!product) return null;

  // Handle clicking outside modal to close
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Math Calculations based on Mockup Spec
  const isSilver = product.purity?.toLowerCase().includes('silver') || product.category?.name?.toLowerCase().includes('silver');
  
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
  let rateLabel = '22K Gold';
  
  if (product.purity?.toLowerCase().includes('18k')) {
    ratePerGram = 11640;
    rateLabel = '18K Gold';
  } else if (product.purity?.toLowerCase().includes('24k')) {
    ratePerGram = 15510;
    rateLabel = '24K Gold';
  } else if (isSilver) {
    ratePerGram = 265;
    rateLabel = '925 Silver';
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
      // Fallback: Copy to Clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  // Get related products from the same category (excluding current)
  const relatedProducts = allProducts
    .filter(p => p._id !== product._id && p.category?._id === product.category?._id)
    .slice(0, 4);

  const primaryImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-[6px] flex items-center justify-center p-4 md:p-6"
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl relative overflow-hidden my-8 animate-fade-in"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 hover:bg-gray-200 p-2 rounded-full z-20 cursor-pointer"
          aria-label="Close details"
        >
          <X size={20} />
        </button>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
          
          {/* Left Column: Image and Rate Details */}
          <div className="flex flex-col gap-6">
            {/* Big Image box */}
            <div className="aspect-[4/3] w-full rounded-2xl bg-gray-50 flex items-center justify-center p-6 border border-gray-100 relative shadow-inner">
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

            {/* Sub spec rates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 text-left">
                <span className="text-[10px] font-label font-bold text-gray-400 tracking-wider uppercase block mb-1">
                  CURRENT RATE
                </span>
                <span className="text-sm md:text-base font-extrabold text-[#120002]">
                  INR {ratePerGram.toLocaleString('en-IN')} /g
                </span>
              </div>
              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 text-left">
                <span className="text-[10px] font-label font-bold text-gray-400 tracking-wider uppercase block mb-1">
                  MAKING CHARGES
                </span>
                <span className="text-sm md:text-base font-extrabold text-[#120002]">
                  {makingChargesPercent}%
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Spec Card and Detailed Breakdown */}
          <div className="flex flex-col text-left justify-between h-full">
            <div>
              {/* Product details Pill badge */}
              <div className="inline-block bg-[#ebf8ff] text-[#2b6cb0] font-label text-[10px] tracking-widest uppercase font-bold py-1 px-3.5 rounded-full mb-3">
                PRODUCT DETAILS
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#120002] mb-2 leading-tight">
                {product.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 font-body text-sm mb-4 leading-relaxed">
                {product.description || "Detailed view with complete weight, purity, and pricing explanation so customers can understand the product clearly."}
              </p>

              {/* Badges line */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-[#120002] text-white font-label font-semibold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                  {product.category?.name?.replace(' Collection', '').toLowerCase() || 'womens'}
                </span>
                <span className="border border-[#2b6cb0]/30 text-[#2b6cb0] font-label font-semibold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-[#ebf8ff]/50">
                  {product.subcategory || 'Earrings'}
                </span>
                <span className="border border-gray-200 text-gray-500 font-label font-semibold text-[10px] px-3 py-1 rounded-full">
                  Barcode: {product.productCode?.replace('#', '') || 'Tpc/141'}
                </span>
                <span className="border border-gray-200 text-gray-500 font-label font-semibold text-[10px] px-3 py-1 rounded-full">
                  {product.purity || '22K'}
                </span>
              </div>

              {/* 4 specifications grid */}
              <div className="grid grid-cols-4 gap-2 md:gap-3 mb-6">
                <div className="border border-gray-100 rounded-xl p-2.5 md:p-3 bg-gray-50/50">
                  <span className="text-[8px] font-label font-bold text-gray-400 tracking-wider block mb-0.5">NET WEIGHT</span>
                  <span className="text-xs md:text-sm font-extrabold text-[#120002]">{product.netWeight || product.weight || '—'}</span>
                </div>
                <div className="border border-gray-100 rounded-xl p-2.5 md:p-3 bg-gray-50/50">
                  <span className="text-[8px] font-label font-bold text-gray-400 tracking-wider block mb-0.5">GROSS WEIGHT</span>
                  <span className="text-xs md:text-sm font-extrabold text-[#120002]">{product.grossWeight || product.weight || '—'}</span>
                </div>
                <div className="border border-gray-100 rounded-xl p-2.5 md:p-3 bg-gray-50/50">
                  <span className="text-[8px] font-label font-bold text-gray-400 tracking-wider block mb-0.5">GST</span>
                  <span className="text-xs md:text-sm font-extrabold text-[#120002]">3%</span>
                </div>
                <div className="border border-gray-100 rounded-xl p-2.5 md:p-3 bg-gray-50/50">
                  <span className="text-[8px] font-label font-bold text-gray-400 tracking-wider block mb-0.5">HALLMARK</span>
                  <span className="text-xs md:text-sm font-extrabold text-[#120002]">INR {hallmarkCharges.toFixed(2)}</span>
                </div>
              </div>

              {/* Dark Price Breakdown Box */}
              <div className="bg-[#123554] rounded-2xl p-5 md:p-6 text-white mb-6 shadow-md relative overflow-hidden">
                <span className="text-[10px] font-label font-bold text-white/60 tracking-wider uppercase block mb-1">
                  ESTIMATED FINAL PRICE
                </span>
                <span className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight block mb-5">
                  INR {estimatedFinalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>

                {/* Calculation breakdown */}
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
                  <div className="col-span-2 border-t border-white/10 pt-2 flex justify-between text-sm font-bold">
                    <span className="text-white/75">SUBTOTAL</span>
                    <span className="text-glow-white">INR {subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions button row */}
            <div className="flex gap-4">
              <button 
                onClick={handleWhatsAppEnquire}
                className="flex-grow bg-[#00a859] hover:bg-[#008f4c] text-white font-label font-bold text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.118-2.905-6.993-1.876-1.875-4.359-2.906-7.004-2.907-5.433 0-9.854 4.421-9.858 9.865-.001 1.705.452 3.37 1.312 4.858L1.706 21.82l4.941-1.295zM17.51 14.88c-.3-.149-1.772-.875-2.046-.975-.274-.1-.474-.149-.674.15-.2.299-.773.974-.948 1.173-.175.199-.349.224-.649.075-.3-.15-1.266-.467-2.41-1.485-.89-.793-1.492-1.773-1.667-2.072-.175-.3-.019-.461.13-.61.135-.133.3-.349.45-.523.15-.174.2-.299.3-.499.1-.2.05-.374-.025-.524-.075-.15-.674-1.622-.924-2.222-.243-.585-.491-.506-.674-.515-.173-.008-.374-.01-.574-.01-.2 0-.524.075-.798.374-.274.299-1.047 1.023-1.047 2.494 0 1.472 1.072 2.893 1.222 3.093.15.2 2.11 3.22 5.11 4.517.714.309 1.272.493 1.707.63.717.228 1.368.196 1.884.119.574-.085 1.772-.724 2.022-1.422.25-.699.25-1.297.175-1.422-.075-.125-.275-.199-.575-.349z"/>
                </svg>
                Enquire On WhatsApp
              </button>
              <button 
                onClick={handleShare}
                className="bg-white hover:bg-gray-50 border border-gray-250 text-gray-700 font-label font-bold text-sm px-6 py-3.5 rounded-full flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        </div>

        {/* Related Products: More In This Collection */}
        {relatedProducts.length > 0 && (
          <div className="bg-gray-50/50 border-t border-gray-100 p-6 md:p-8 text-left">
            <div className="mb-6">
              <div className="inline-block bg-[#ebf8ff] text-[#2b6cb0] font-label text-[9px] tracking-widest uppercase font-bold py-0.5 px-2.5 rounded-full mb-1">
                RELATED PRODUCTS
              </div>
              <h3 className="text-xl font-heading font-bold text-[#120002]">
                More In This Collection
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(relProd => (
                <div 
                  key={relProd._id} 
                  onClick={() => onViewDetails && onViewDetails(relProd)}
                  className="cursor-pointer"
                >
                  <ProductCard product={relProd} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailModal;
