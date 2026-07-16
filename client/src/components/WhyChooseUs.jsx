import { motion } from 'framer-motion';
import { ShieldCheck, History, Clock, Sparkles } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      title: 'Certified Purity',
      description: 'BIS hallmarked jewellery with clear purity transparency.',
      icon: <ShieldCheck className="w-5 h-5 text-gold-accent" />
    },
    {
      title: 'Trusted Since 2007',
      description: 'A long-standing reputation built on trust and service.',
      icon: <History className="w-5 h-5 text-gold-accent" />
    },
    {
      title: 'Quick Support',
      description: 'Fast responses for product enquiries and order assistance.',
      icon: <Clock className="w-5 h-5 text-gold-accent" />
    },
    {
      title: 'Premium Finish',
      description: 'Every piece is curated with detailing and design brilliance.',
      icon: <Sparkles className="w-5 h-5 text-gold-accent" />
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-[#120002] relative">
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
            <div className="inline-block border border-gold-primary/30 text-gold-accent font-label text-[10px] tracking-widest uppercase font-bold py-1 px-3 rounded shadow-sm bg-gold-primary/10">
              WHY CHOOSE US
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Trusted Craftsmanship With Modern Design
            </h2>
          </motion.div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#1e0306] rounded-xl p-6 border border-gold-primary/10 hover:border-gold-primary/30 transition-colors shadow-sm hover:shadow-md flex flex-col"
            >
              <div className="w-10 h-10 rounded bg-[#2a0409] flex items-center justify-center mb-6 border border-gold-primary/20">
                {feature.icon}
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-300 font-body leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
