import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLanguageStore from '../stores/languageStore';
import Button from '../components/ui/Button';
import LazyImage from '../components/LazyImage';
import { 
  FaLocationDot, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaShieldHalved, 
  FaTruckFast, 
  FaUserTie 
} from 'react-icons/fa6';

export default function About() {
  const language = useLanguageStore((state) => state.language);
  const navigate = useNavigate();

  return (
    // 🚀 SEO: Wrapped the whole page in a semantic <main> tag
    <main className="min-h-screen bg-slate-50 overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* === HEADER & SEO TITLE === */}
        <section className="text-center mb-16 md:mb-24 space-y-6">
          <span className="inline-block px-5 py-2 rounded-full bg-sky-100 text-sky-700 text-xs md:text-sm font-black uppercase tracking-widest shadow-sm">
            {language === 'en' ? 'Our Story' : 'Inkuru Yacu'}
          </span>
          {/* 🚀 SEO: Keyword-rich H1 tag for Google Rankings */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            {language === 'en' ? "Kigali's Premier" : "Ububiko Bwambere"} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700">
              {language === 'en' ? 'Swimming Equipment Store.' : 'Bw\'ibikoresho byo Koga.'}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
            {language === 'en' 
              ? 'Founded by Kamatale Ntwali, KigaliSwimShop was built with a singular vision: to provide Rwandans with professional-grade, authentic swimming gear. We believe everyone deserves high-quality equipment to dominate the water.'
              : 'Yashinzwe na Kamatale Ntwali, KigaliSwimShop yubatswe n\'intego imwe: guha Abanyarwanda ibikoresho byo koga by\'umwimerere kandi bya kinyamwuga. Twemera ko buri wese akwiye ibikoresho byiza.'}
          </p>
        </section>

        {/* === VISUAL SPLIT SECTION (Value Proposition) === */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 mb-24 items-center">
          {/* Left: High-Quality Image */}
          <div className="bg-slate-200 rounded-[2.5rem] overflow-hidden h-[400px] md:h-[500px] shadow-2xl transform transition-transform duration-700 hover:scale-[1.02]">
            <LazyImage 
              src="https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=2070&auto=format&fit=crop" 
              alt="Professional Swimming Gear in Kigali" 
              className="w-full h-full object-cover"
              width={1200}
              height={800}
            />
          </div>
          
          {/* Right: Premium Feature List */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl text-white flex flex-col justify-center h-full relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl"></div>
            
            <h2 className="text-3xl font-black mb-8 relative z-10">
              {language === 'en' ? 'Why Shop With Us?' : 'Kuki Wahitamo Twe?'}
            </h2>
            <ul className="space-y-6 relative z-10">
              {[
                { en: '100% Authentic Brands', rw: 'Ibikoresho by\'umwimerere 100%', icon: <FaShieldHalved /> },
                { en: 'Fast Delivery Across Kigali', rw: 'Tubagezaho vuba muri Kigali', icon: <FaTruckFast /> },
                { en: 'Expert Swim Advice', rw: 'Inama z\'inzobere mu koga', icon: <FaUserTie /> },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 text-xl flex-shrink-0 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-400 transition-all shadow-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 mb-1">{language === 'en' ? item.en : item.rw}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {language === 'en' ? 'We source only the best materials to ensure your performance and safety in the water.' : 'Dushaka ibikoresho byiza gusa kugirango umutekano wawe mu mazi ube wizewe.'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* === CONTACT & LOCATION (Accurate Info) === */}
        <section className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100 text-center relative overflow-hidden">
          {/* Subtle background wave pattern */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sky-50/50 to-transparent pointer-events-none"></div>

          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 relative z-10">
            {language === 'en' ? 'We are Here for You' : 'Turi hano kubera Wowe'}
          </h2>
          <p className="text-slate-500 mb-12 text-lg max-w-2xl mx-auto relative z-10">
            {language === 'en' 
              ? 'Whether you need help sizing a swimsuit or choosing the right goggles, our team is ready to assist.' 
              : 'Niba ukeneye ubufasha bwo guhitamo imyenda cyangwa amataratara yo koga, ikipe yacu yiteguye kugufasha.'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto mb-12 relative z-10">
            {/* Location */}
            <div className="p-8 bg-slate-50 rounded-3xl hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200 group">
              <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <FaLocationDot />
              </div>
              <h3 className="font-black text-xl text-slate-900 mb-2">
                {language === 'en' ? 'Location' : 'Aho Tuba'}
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Kigali, Rwanda<br />
                <span className="text-sm text-slate-400">Online Store & Delivery</span>
              </p>
            </div>

            {/* Contact */}
            <div className="p-8 bg-slate-50 rounded-3xl hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200 group">
              <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <FaPhone />
              </div>
              <h3 className="font-black text-xl text-slate-900 mb-2">
                {language === 'en' ? 'Contact' : 'Twandikire'}
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                +250 784 154 697<br />
                <a href="mailto:director@kigaliswimshop.online" className="text-sm text-sky-600 hover:underline">director@kigaliswimshop.online</a>
              </p>
            </div>

            {/* Hours */}
            <div className="p-8 bg-slate-50 rounded-3xl hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200 group">
              <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <FaClock />
              </div>
              <h3 className="font-black text-xl text-slate-900 mb-2">
                {language === 'en' ? 'Support Hours' : 'Amasaha'}
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Mon - Sat: 9:00 AM - 8:00 PM<br />
                <span className="text-sm text-slate-400">Sunday: Closed</span>
              </p>
            </div>
          </div>

          <div className="relative z-10 flex justify-center">
            <Button 
              variant="primary"
              onClick={() => navigate('/products')}
              className="!px-12 !py-4 shadow-xl hover:shadow-2xl text-lg"
            >
              {language === 'en' ? 'Start Shopping' : 'Tangira Kugura'}
            </Button>
          </div>
        </section>

      </div>
    </main>
  );
}