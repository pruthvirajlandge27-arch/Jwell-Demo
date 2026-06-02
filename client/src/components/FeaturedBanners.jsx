import { motion } from 'framer-motion';

const FeaturedBanners = () => {
  const banners = [
    {
      title: 'Shubh Vivah Collection',
      subtitle: 'Wedding Jewellery',
      description: 'Adorn yourself on your special day with our exquisite bridal collection, featuring intricate traditional designs passed down through generations.',
      image: 'https://images.unsplash.com/photo-1599643478524-fb66f7fbc4ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      alignment: 'left'
    },
    {
      title: 'Har Din Sone Jaisa',
      subtitle: 'Daily Wear Elegance',
      description: 'Lightweight, durable, and beautiful gold jewellery designed for your everyday grace and confidence.',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      alignment: 'right'
    },
    {
      title: 'Ek Vaada, Ek Ring',
      subtitle: 'Couple Rings',
      description: 'Seal your promise with our matching couple rings, crafted to symbolize your eternal bond.',
      image: 'https://images.unsplash.com/photo-1605100804763-247f66126e9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      alignment: 'left'
    }
  ];

  return (
    <section className="py-24 bg-rich-cream">
      <div className="container mx-auto px-4 space-y-24">
        {banners.map((banner, index) => (
          <div 
            key={index} 
            className={`flex flex-col md:flex-row items-center gap-12 ${banner.alignment === 'right' ? 'md:flex-row-reverse' : ''}`}
          >
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: banner.alignment === 'left' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden group">
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-4 border border-white/30 z-10"></div>
              </div>
            </motion.div>

            <motion.div 
              className="w-full md:w-1/2 text-center md:text-left"
              initial={{ opacity: 0, x: banner.alignment === 'left' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-gold-primary font-label tracking-[0.2em] uppercase text-sm block mb-3">
                {banner.subtitle}
              </span>
              <h2 className="text-4xl md:text-5xl font-heading text-deep-maroon mb-6">
                {banner.title}
              </h2>
              <div className={`w-16 h-1 bg-gold-primary mb-6 ${banner.alignment === 'right' ? 'md:ml-auto md:mr-0' : 'mx-auto md:mx-0'}`}></div>
              <p className="text-text-muted text-lg mb-8 max-w-lg mx-auto md:mx-0">
                {banner.description}
              </p>
              <button className="btn-outline border-deep-maroon text-deep-maroon hover:bg-deep-maroon hover:text-white">
                Discover More
              </button>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBanners;
