import { motion } from 'framer-motion';

const TrustBar = () => {
  const stats = [
    { icon: '🏆', value: '500+', label: 'Happy Customers' },
    { icon: '💍', value: '7', label: 'Collections' },
    { icon: '✅', value: '100%', label: 'Certified Purity' },
    { icon: '📍', value: '1937', label: 'Legacy Since' },
  ];

  return (
    <div className="bg-white py-12 border-b border-gold-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-heading text-deep-maroon font-bold mb-1">
                {stat.value}
              </h3>
              <p className="text-text-muted font-label text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
