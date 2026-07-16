import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const primaryImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;

  const handleWhatsAppEnquire = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Hello Kubde Jewellers, I am interested in this product: ${product.title} (Code: ${product.productCode || 'N/A'}). Please share more details!`;
    const whatsappUrl = `https://wa.me/918080300464?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Helper to extract clean category and subcategory names
  const categoryName = product.category?.name || 'WOMENS';
  const subcategoryName = product.subcategory || 'EARRINGS';

  return (
    <motion.div 
      onClick={() => navigate(`/product/${product._id}`)}
      className="group bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full text-left cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 flex items-center justify-center p-4">
        {primaryImage ? (
          <img 
            src={primaryImage} 
            alt={product.title} 
            className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100 font-body text-xs">
            <span>No Image</span>
          </div>
        )}

        {/* Bottom Dark Gradient Overlay for Badges */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
        
        {/* Bottom Badges */}
        <div className="absolute bottom-3 inset-x-3 flex justify-between items-center z-10">
          <span className="bg-white/90 backdrop-blur-sm text-[#120002] font-label font-bold text-[10px] px-3 py-1 rounded-full shadow-sm">
            {product.purity ? product.purity.replace(' Gold', '').replace(' Silver', '') : '22K'}
          </span>
          <span className="bg-white/90 backdrop-blur-sm text-[#120002] font-label font-bold text-[10px] px-3 py-1 rounded-full shadow-sm">
            {product.productCode || '#Tpc/141'}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Product Title */}
        <h3 className="text-[#120002] font-heading font-bold text-base mb-1 hover:text-[#2a0409] transition-colors line-clamp-1">
          {product.title}
        </h3>

        {/* Category / Subcategory Breadcrumbs */}
        <div className="text-[10px] font-label font-bold text-gray-400 tracking-[0.1em] uppercase mb-4">
          {categoryName} / {subcategoryName}
        </div>

        {/* Spec Grid: GROSS vs NET Weights */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="border border-gray-100 rounded-xl p-3 bg-gray-50/50">
            <span className="text-[9px] font-label font-bold text-gray-400 tracking-wider uppercase block mb-0.5">
              GROSS
            </span>
            <span className="text-sm font-extrabold text-[#120002]">
              {product.grossWeight || product.weight || '—'}
            </span>
          </div>
          <div className="border border-gray-100 rounded-xl p-3 bg-gray-50/50">
            <span className="text-[9px] font-label font-bold text-gray-400 tracking-wider uppercase block mb-0.5">
              NET
            </span>
            <span className="text-sm font-extrabold text-[#120002]">
              {product.netWeight || product.weight || '—'}
            </span>
          </div>
        </div>

        {/* Footer: Estimated Price & WhatsApp Button */}
        <div className="mt-auto pt-3 flex items-end justify-between border-t border-gray-50">
          <div>
            <span className="text-[9px] font-label font-bold text-gray-400 tracking-wider block mb-0.5">
              ESTIMATED TOTAL
            </span>
            <span className="text-[#0b5e94] font-label font-extrabold text-base tracking-tight block">
              {product.price ? `INR ${product.price.toLocaleString('en-IN')}` : 'Price on Request'}
            </span>
          </div>
          
          <button 
            onClick={handleWhatsAppEnquire}
            className="bg-[#00a859] hover:bg-[#008f4c] text-white font-label font-bold text-[11px] px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.118-2.905-6.993-1.876-1.875-4.359-2.906-7.004-2.907-5.433 0-9.854 4.421-9.858 9.865-.001 1.705.452 3.37 1.312 4.858L1.706 21.82l4.941-1.295zM17.51 14.88c-.3-.149-1.772-.875-2.046-.975-.274-.1-.474-.149-.674.15-.2.299-.773.974-.948 1.173-.175.199-.349.224-.649.075-.3-.15-1.266-.467-2.41-1.485-.89-.793-1.492-1.773-1.667-2.072-.175-.3-.019-.461.13-.61.135-.133.3-.349.45-.523.15-.174.2-.299.3-.499.1-.2.05-.374-.025-.524-.075-.15-.674-1.622-.924-2.222-.243-.585-.491-.506-.674-.515-.173-.008-.374-.01-.574-.01-.2 0-.524.075-.798.374-.274.299-1.047 1.023-1.047 2.494 0 1.472 1.072 2.893 1.222 3.093.15.2 2.11 3.22 5.11 4.517.714.309 1.272.493 1.707.63.717.228 1.368.196 1.884.119.574-.085 1.772-.724 2.022-1.422.25-.699.25-1.297.175-1.422-.075-.125-.275-.199-.575-.349z"/>
            </svg>
            Enquire
          </button>
        </div>

        {/* View Full Details link */}
        <button 
          onClick={(e) => { e.stopPropagation(); navigate(`/product/${product._id}`); }}
          className="text-xs font-bold text-gray-500 hover:text-[#2a0409] transition-colors mt-4 inline-flex items-center gap-1 self-start cursor-pointer group-hover:translate-x-1 duration-300"
        >
          View Full Details <span className="text-sm font-light">→</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
