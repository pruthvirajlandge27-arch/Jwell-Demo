import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, User, Gem, Sparkles } from 'lucide-react';

const CollectionsGrid = () => {
  const collections = [
    {
      name: "Men's Collection",
      desc: "Bold rings, chains, and bracelets for modern styling.",
      image: "/images/cat_chains.png",
      link: "/collections/mens",
      icon: <User size={20} className="text-[#3a060d]" />
    },
    {
      name: "Women's Collection",
      desc: "Elegant designs crafted for celebrations and daily wear.",
      image: "/images/bridal_collection.png",
      link: "/collections/womens",
      icon: <User size={20} className="text-[#3a060d]" />
    },
    {
      name: "Customized Jewelry",
      desc: "Personalized pieces designed around your story.",
      image: "/images/diamond_collection.png",
      link: "/collections/customized",
      icon: <Sparkles size={20} className="text-[#3a060d]" />
    },
    {
      name: "Silver Collection",
      desc: "Contemporary silver items with classic craftsmanship.",
      image: "/images/cat_earrings.png",
      link: "/collections/silver",
      icon: <Gem size={20} className="text-[#3a060d]" />
    }
  ];

  return (
    <section id="collections" className="py-20 bg-[#f8f9fa] relative">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 max-w-3xl"
          >
            <div className="inline-block bg-[#2a0409]/10 text-[#2a0409] border border-[#2a0409]/20 font-label text-[10px] tracking-widest uppercase font-bold py-1 px-3 rounded shadow-sm">
              COLLECTIONS
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#120002]">
              Explore by Collection
            </h2>
            <p className="text-gray-600 font-body text-base">
              Open mens, womens, customized, and silver collections with cleaner layout and better mobile browsing.
            </p>
          </motion.div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col h-full"
            >
              {/* Image box with grey padding/bg like screenshot */}
              <div className="h-56 bg-gray-200 p-6 flex items-center justify-center relative">
                <img 
                  src={col.image} 
                  alt={col.name} 
                  className="max-h-full max-w-full object-contain" 
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 bg-white/70 backdrop-blur-sm text-[10px] uppercase font-bold px-2 py-0.5 rounded text-gray-500">
                  74 Products
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow items-start text-left">
                <div className="w-10 h-10 rounded-full bg-[#2a0409]/10 border border-[#2a0409]/10 flex items-center justify-center mb-4">
                  {col.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-[#120002] mb-2">
                  {col.name}
                </h3>
                <p className="text-sm text-gray-600 font-body mb-6">
                  {col.desc}
                </p>
                <Link 
                  to={col.link}
                  className="mt-auto text-[#2a0409] font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all hover:text-[#120002]"
                >
                  Open Collection <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CollectionsGrid;
