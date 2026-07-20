import React from 'react';
import useLanguageStore from '../stores/languageStore';
import { 
  FaArrowRightArrowLeft, 
  FaCheck, 
  FaXmark, 
  FaWhatsapp, 
  FaBox, 
  FaTruckFast, 
  FaMoneyBillTransfer,
  FaEnvelope
} from 'react-icons/fa6';

const ReturnPolicy = () => {
  const language = useLanguageStore((state) => state.language);

  return (
    // 🚀 FIXED PADDING & SEMANTICS
    <main className="min-h-screen bg-slate-50 px-4">
      <div className="container mx-auto max-w-4xl">
        
        {/* === HEADER === */}
        <header className="text-center mb-12 md:mb-16">
          <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm">
            <FaArrowRightArrowLeft />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 tracking-tight">
            {language === 'en' ? 'Return & Exchange' : 'Gusubiza no Guhindura'}
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            {language === 'en' 
              ? 'We want you to love your gear. If it doesn\'t fit, we\'ll fix it.' 
              : 'Turashaka ko ukunda ibikoresho byawe. Niba bidakwiye, tuzabikemura.'}
          </p>
        </header>

        <div className="space-y-8 md:space-y-12">
          
          {/* === HERO POLICY CARD === */}
          <section className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl -mr-10 -mt-10"></div>
            
            <div className="flex-1 relative z-10">
              <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                {language === 'en' ? 'The Guarantee' : 'Ingwate'}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">
                {language === 'en' ? '3-Day Return Policy' : 'Iminsi 3 yo Gusubiza'}
              </h2>
              <p className="text-slate-600 leading-relaxed md:text-lg">
                {language === 'en'
                  ? 'If you are not completely satisfied with your purchase, you can return it within 3 days of delivery for a full refund or exchange. No questions asked, as long as the item is new.'
                  : 'Niba utishimiye ibyo waguze, urashobora kubisubiza mu minsi 3 kugira ngo usubizwe amafaranga cyangwa uhindurirwe.'
                }
              </p>
            </div>
            
            <div className="w-full md:w-auto bg-slate-50 p-8 rounded-3xl border border-slate-200 text-center min-w-[200px] shadow-sm relative z-10">
              <span className="text-5xl font-black text-slate-900 block mb-2">3</span>
              <span className="text-sm font-black text-slate-500 uppercase tracking-widest">
                {language === 'en' ? 'Days Window' : 'Iminsi'}
              </span>
            </div>
          </section>

          {/* === CONDITIONS GRID === */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Accepted Conditions */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">
                  <FaCheck />
                </div>
                {language === 'en' ? 'Accepted for Return' : 'Ibyemewe'}
              </h3>
              <ul className="space-y-4">
                {[
                  { en: 'Unused & original packaging', rw: 'Bitarakoreshwa & bipfunyitse' },
                  { en: 'Tags still attached', rw: 'Tagi zikiriho' },
                  { en: 'Within 3 days of delivery', rw: 'Mu minsi 3 uhereye igihe wagejarijwe' },
                  { en: 'Receipt / Proof of purchase', rw: 'Inyemezabwishyu' }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                    <div className="w-5 h-5 rounded-full bg-green-50 text-green-500 flex items-center justify-center flex-shrink-0 text-[10px]">
                      <FaCheck />
                    </div>
                    {language === 'en' ? item.en : item.rw}
                  </li>
                ))}
              </ul>
            </div>

            {/* Non-Returnable */}
            <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm">
                  <FaXmark />
                </div>
                {language === 'en' ? 'Non-Returnable' : 'Ibitasubizwa'}
              </h3>
              <ul className="space-y-4">
                {[
                  { en: 'Used or damaged items', rw: 'Ibyakoreshejwe cyangwa byangiritse' },
                  { en: 'Missing packaging/tags', rw: 'Ibitagira amapaki/tagi' },
                  { en: 'Swimwear worn without hygiene liner', rw: 'Imyenda yo koga yambaye nabi' },
                  { en: 'Returns after 3 days', rw: 'Nyuma y\'iminsi 3' }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                    <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0 text-[10px]">
                      <FaXmark />
                    </div>
                    {language === 'en' ? item.en : item.rw}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* === PROCESS STEPS === */}
          <section className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">
              {language === 'en' ? 'How to Return' : 'Uko Wasubiza'}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <FaWhatsapp />, title: { en: '1. Contact', rw: '1. Twandikire' }, desc: { en: 'WhatsApp or Email us', rw: 'Kuri WhatsApp cyangwa Imeli' } },
                { icon: <FaBox />, title: { en: '2. Prepare', rw: '2. Tegura' }, desc: { en: 'Pack item with tags', rw: 'Funga neza ibikoresho' } },
                { icon: <FaTruckFast />, title: { en: '3. Pickup', rw: '3. Gutwara' }, desc: { en: 'We collect the item', rw: 'Tuzabifata' } },
                { icon: <FaMoneyBillTransfer />, title: { en: '4. Refund', rw: '4. Gusubizwa' }, desc: { en: 'Money back in 3 days', rw: 'Amafaranga mu minsi 3' } },
              ].map((step, i) => (
                <div key={i} className="text-center p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all group">
                  <div className="text-3xl text-sky-500 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <div className="font-black text-slate-900 mb-2">
                    {language === 'en' ? step.title.en : step.title.rw}
                  </div>
                  <div className="text-sm font-medium text-slate-500">
                    {language === 'en' ? step.desc.en : step.desc.rw}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* === CONTACT FOOTER === */}
          <section className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-black mb-4">
                {language === 'en' ? 'Start a Return' : 'Tangira Gusubiza'}
              </h2>
              <p className="mb-8 text-slate-400 text-lg">
                {language === 'en' 
                  ? 'Ready to send something back? Let us help you.' 
                  : 'Witeguye gusubiza ikintu? Reka tugufashe.'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {/* 🚀 FIXED WHATSAPP NUMBER */}
                <a 
                  href="https://wa.me/250784154697" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#20bd5a] transition-all shadow-lg hover:-translate-y-1"
                >
                  <FaWhatsapp className="text-xl" />
                  {language === 'en' ? 'WhatsApp Us' : 'Twandikire'}
                </a>
                {/* 🚀 FIXED EMAIL ADDRESS */}
                <a 
                  href="mailto:director@kigaliswimshop.online" 
                  className="flex items-center justify-center gap-2 bg-slate-800 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-700 transition-all border border-slate-700 hover:border-slate-600 shadow-lg hover:-translate-y-1"
                >
                  <FaEnvelope className="text-xl text-sky-400" />
                  {language === 'en' ? 'Email Support' : 'Ohereza Imeli'}
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
};

export default ReturnPolicy;