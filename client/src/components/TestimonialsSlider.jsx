import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Quote, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const TestimonialsSlider = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Akola',
      text: 'Kubde Jewellers has been our family jeweller for over 15 years. Their bridal necklace designs are uniquely stunning and the purity of gold is unmatched.',
      rating: 5,
      image: '/images/bridal_collection.png'
    },
    {
      id: 2,
      name: 'Rahul Deshmukh',
      location: 'Amravati',
      text: 'Bought my wife\'s wedding diamond ring from here. The craftsmanship is flawless and the diamond has beautiful fire. They customized a bespoke design exactly how we sketched it.',
      rating: 5,
      image: '/images/cat_rings.png'
    },
    {
      id: 3,
      name: 'Anjali Patil',
      location: 'Akola',
      text: 'The gold bangles and daily wear collection are fantastic! Extremely lightweight yet strong and sturdy. The staff is highly professional, patient, and helps you find pieces fitting your exact taste.',
      rating: 5,
      image: '/images/cat_bangles.png'
    },
    {
      id: 4,
      name: 'Kavita Joshi',
      location: 'Pune',
      text: 'I travel from Pune specifically to buy from Kubde. Their modern styling paired with traditional roots makes every pendant look exquisite.',
      rating: 5,
      image: '/images/cat_pendants.png'
    },
    {
      id: 5,
      name: 'Suresh Agarwal',
      location: 'Nagpur',
      text: 'The heavy gold chains here are standard 22kt purity. The level of transparency in pricing and making charges is why I trust them entirely.',
      rating: 5,
      image: '/images/cat_chains.png'
    }
  ];

  return (
    <section id="testimonials" className="py-28 bg-[#120002] relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-wine-light/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-gold-accent font-label text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-2">
              <Sparkles size={14} className="text-gold-primary animate-pulse" /> PATRON STORIES
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-medium text-white text-glow-gold">
              Styling & Stories
            </h2>
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent mx-auto"></div>
          </motion.div>
        </div>

        {/* 3D Coverflow Slider */}
        <div className="max-w-[1400px] mx-auto pb-8">
          <style dangerouslySetInnerHTML={{__html: `
            .swiper-pagination-bullet { background: #D4AF37; opacity: 0.4; }
            .swiper-pagination-bullet-active { opacity: 1; box-shadow: 0 0 10px #D4AF37; }
            .swiper-slide-shadow-left, .swiper-slide-shadow-right { background-image: none !important; }
          `}} />
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 0,
              stretch: 80,
              depth: 300,
              modifier: 1,
              slideShadows: true,
            }}
            loop={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full h-full pt-10 pb-16"
          >
            {testimonials.map((testi) => (
              <SwiperSlide key={testi.id} className="w-[300px] sm:w-[400px] md:w-[480px]">
                <div className="relative group rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] h-[550px] md:h-[650px] border border-gold-primary/20 transition-all duration-300">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img src={testi.image} alt="Jewelry showcase" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                    {/* Gradient Overlay for Text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120002] via-[#120002]/70 to-transparent"></div>
                  </div>
                  
                  {/* Testimonial Content */}
                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                    <Quote size={32} className="text-gold-primary/50 mb-5 animate-pulse" />
                    
                    {/* Golden Star Rating */}
                    <div className="flex gap-1.5 mb-5">
                      {[...Array(testi.rating)].map((_, i) => (
                        <span key={i} className="text-base text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-accent to-gold-primary drop-shadow-[0_2px_8px_rgba(243,198,79,0.35)]">
                          ★
                        </span>
                      ))}
                    </div>
                    
                    {/* Testimonial Quote Text */}
                    <p className="text-sm md:text-base text-warm-ivory/90 font-body font-light italic mb-8 leading-relaxed">
                      "{testi.text}"
                    </p>
                    
                    {/* Reviewer Details */}
                    <div>
                      <h4 className="text-white font-heading text-2xl tracking-wide mb-1.5 drop-shadow-lg">
                        {testi.name}
                      </h4>
                      <p className="text-gold-primary text-[10px] uppercase tracking-[0.2em] font-label font-bold drop-shadow-md">
                        {testi.location}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
