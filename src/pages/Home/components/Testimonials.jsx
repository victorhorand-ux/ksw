import React from 'react';

export default function Testimonials({ language }) {
  const testimonials = [
    {
      name: 'Jean Paul',
      nameRw: 'Jean Paul',
      // 🚀 Updated to feature Black/African individuals
      image: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=150&h=150&fit=crop&crop=faces',
      text: 'Great quality products and fast delivery! Very satisfied with my purchase.',
      textRw: "Ibicuruzwa by'ubwoko bwiza kandi byongeyeho vuba! Nari nishimiye.",
      rating: 5
    },
    {
      name: 'Marie Claire',
      nameRw: 'Marie Claire',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98a?w=150&h=150&fit=crop&crop=faces',
      text: 'Best swimming equipment store in Kigali. Highly recommended!',
      textRw: "Turizewe mu by'amazi bwiza mu Kigali. Nk'uko byagenze!",
      rating: 5
    },
    {
      name: 'David Nkurunziza',
      nameRw: 'David Nkurunziza',
      image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=faces',
      text: 'Excellent customer service and authentic products. Will shop again!',
      textRw: "Serivisi nziza z'abakiriya kandi ibicuruzwa by'ukuri. Nzongera guhaha!",
      rating: 5
    },
    {
      name: 'Aline Uwamahoro',
      nameRw: 'Aline Uwamahoro',
      image: 'https://images.unsplash.com/photo-1531303435785-385316288a7c?w=150&h=150&fit=crop&crop=faces',
      text: 'The swimsuits are durable and fit perfectly. My kids love them.',
      textRw: "Imyenda yo koga irakomeye kandi ibakwira neza. Abana banjye barayikunda.",
      rating: 5
    }
  ];

  const TestimonialTrack = () => (
    // 🚀 Tighter gap between cards
    <div className="flex items-center gap-4 md:gap-6 px-2 md:px-3 min-w-max">
      {testimonials.map((testimonial, index) => (
        <div 
          key={index} 
          // 🚀 Reduced card padding and width to save space
          className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 w-[280px] md:w-[350px] flex-shrink-0 flex flex-col justify-between"
        >
          <p className="text-slate-600 italic text-sm leading-relaxed mb-4">
            "{language === 'en' ? testimonial.text : testimonial.textRw}"
          </p>
          
          <div className="flex items-center gap-3">
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              // 🚀 Slightly smaller avatar
              className="w-10 h-10 rounded-full object-cover border-2 border-sky-100" 
            />
            <div>
              <p className="font-bold text-slate-900 text-sm leading-tight">{testimonial.name}</p>
              <div className="flex mt-0.5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    // 🚀 Removed 'group' from section, reduced vertical padding
    <section className="py-10 md:py-16 bg-slate-50 border-t border-slate-100 overflow-hidden relative">
      
      {/* 🚀 Reduced bottom margin of title */}
      <div className="container mx-auto px-4 relative z-20 mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-center text-slate-800">
          {language === 'en' ? 'What Our Customers Say' : 'Ibyo Abakiriya Bavuga'}
        </h2>
      </div>

      <div className="absolute top-0 left-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

      {/* 🚀 Placed hover pause directly on the scrolling flex container! */}
      <div className="flex w-max animate-scroll-reverse hover:[animation-play-state:paused] transition-all py-2">
        <TestimonialTrack />
        <TestimonialTrack />
      </div>

    </section>
  );
}