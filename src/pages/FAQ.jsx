import React, { useState } from 'react';
import useLanguageStore from '../stores/languageStore';
import { 
  FaCreditCard, 
  FaTruckFast, 
  FaTags, 
  FaArrowRotateLeft, 
  FaLocationDot,
  FaWhatsapp
} from 'react-icons/fa6';
import { FaChevronDown } from 'react-icons/fa';

const FAQ = () => {
  const language = useLanguageStore((state) => state.language);
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      icon: <FaCreditCard />,
      question: language === 'en' ? 'What payment methods do you accept?' : 'Ni uburyo ki bwo kwishyura mukemera?',
      answer: language === 'en'
        ? 'We accept MTN Mobile Money (*182#), Airtel Money, Bank Transfer for Kigali orders.'
        : 'Tukemera MTN Mobile Money (*182#), Airtel Money, Kwishyura mu Banki ku batuye Kigali.'
    },
    {
      icon: <FaTruckFast />,
      question: language === 'en' ? 'How long does delivery take?' : 'Delivery itwara igihe kingana iki?',
      answer: language === 'en'
        ? 'Delivery within Kigali takes 2-10 hours. For upcountry (outside Kigali), delivery typically takes 2-3 days via courier.'
        : 'Delivery mu Kigali itwara amasaha 2-10. Mu ntara, bitwara iminsi 2-3 ukoresheje abatumwa.'
    },
    {
      icon: <FaTags />,
      question: language === 'en' ? 'Is delivery free?' : 'Delivery ni ubuntu?',
      answer: language === 'en'
        ? 'Yes! Delivery is free for orders over 50,000 RWF. For smaller orders, delivery is 2,000 RWF (Kigali) or 5,000 RWF (Upcountry).'
        : 'Yego! Delivery ni ubuntu iyo waguze ibirenze 50,000 RWF. Iyo utagejeje, yishyurwa 2,000 RWF (Kigali) cyangwa 5,000 RWF (Mu Ntara).'
    },
    {
      icon: <FaArrowRotateLeft />,
      question: language === 'en' ? 'Can I return products?' : 'Nshobora gusubiza ibicuruzwa?',
      answer: language === 'en'
        ? 'Yes, we offer a 3-day return policy for unused items in original packaging. Swimwear must have the hygiene liner intact.'
        : 'Yego, dufite politiki yo gusubiza mu minsi 3 ku bintu bitakoreshejwe. Imyenda yo koga igomba kuba itambo.'
    },
    {
      icon: <FaLocationDot />,
      question: language === 'en' ? 'Where is your shop located?' : 'Dukorera he?',
      answer: language === 'en'
        ? 'Our main operations are based in Kigali, Rwanda. We operate primarily as an online store with fast, reliable delivery right to your door.'
        : 'Ibikorwa byacu byibanda mu Kigali, u Rwanda. Dukora cyane nk\'ububiko bwo kuri interineti butanga serivisi yihuse kugeza iwawe.'
    }
  ];

  return (
    // 🚀 FIXED PADDING: Changed pt-32 to pt-24 (or md:pt-32) to match other pages
    <div className="min-h-screen bg-slate-50  px-4">
      <div className="container mx-auto max-w-4xl">
        
        {/* === HEADER === */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <span className="inline-block px-5 py-2 rounded-full bg-sky-100 text-sky-700 text-xs md:text-sm font-black uppercase tracking-widest shadow-sm">
            {language === 'en' ? 'Help Center' : 'Ubufasha'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            {language === 'en' ? 'Frequently Asked' : 'Ibibazo Byakunze'} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700">
              {language === 'en' ? 'Questions' : 'Kubazwa'}
            </span>
          </h1>
        </div>

        {/* === FAQ ACCORDION === */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index 
                  ? 'border-sky-200 shadow-md ring-1 ring-sky-100' 
                  : 'border-slate-200 shadow-sm hover:border-sky-300'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 py-5 sm:px-6 sm:py-6 text-left flex justify-between items-center group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl sm:text-2xl text-sky-600 bg-sky-50 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center group-hover:bg-sky-100 group-hover:scale-110 transition-all flex-shrink-0">
                    {faq.icon}
                  </span>
                  <span className={`font-bold text-base sm:text-lg ${openIndex === index ? 'text-sky-700' : 'text-slate-800'} pr-4`}>
                    {faq.question}
                  </span>
                </div>
                <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
                  openIndex === index ? 'bg-sky-100 text-sky-600 rotate-180' : 'bg-slate-100 text-slate-400'
                }`}>
                  <FaChevronDown className="w-3.5 h-3.5" />
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pl-[4.5rem] sm:pl-[5.5rem] text-slate-500 text-sm sm:text-base leading-relaxed border-t border-slate-50 pt-4 font-medium">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* === CONTACT CARD === */}
        <div className="mt-16 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-600/10 rounded-full blur-3xl -ml-16 -mb-16"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              {language === 'en' ? 'Still have questions?' : 'Uracyafite ibibazo?'}
            </h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto text-lg">
              {language === 'en'
                ? "Can't find the answer you're looking for? Chat with our team directly."
                : "Ntiwabona igisubizo ushaka? Vugana n'ikipe yacu."
              }
            </p>
            
            {/* 🚀 FIXED WHATSAPP NUMBER: Using the correct +250 784 154 697 */}
            <a
              href="https://wa.me/250784154697"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg w-full sm:w-auto"
            >
              <FaWhatsapp className="text-2xl" />
              {language === 'en' ? 'Chat on WhatsApp' : 'Vugana kuri WhatsApp'}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQ;