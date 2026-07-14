import React from 'react';
import useLanguageStore from '../stores/languageStore';
import { FaScaleBalanced, FaEnvelope, FaCircle } from 'react-icons/fa6';

const Terms = () => {
  const language = useLanguageStore((state) => state.language);

  return (
    // 🚀 FIXED PADDING & SEMANTICS
    <main className="min-h-screen bg-slate-50 px-4">
      <div className="container mx-auto max-w-4xl">
        
        {/* === HEADER === */}
        <header className="text-center mb-12 md:mb-16">
          <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm">
            <FaScaleBalanced />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 tracking-tight">
            {language === 'en' ? 'Terms & Conditions' : 'Amabwiriza n\'Ibisabwa'}
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            {language === 'en' 
              ? 'Please read these terms carefully before using our service.' 
              : 'Nyamuneka soma aya mabwiriza witonze mbere yo gukoresha serivisi zacu.'}
          </p>
        </header>

        {/* === DOCUMENT CONTAINER === */}
        <article className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 md:p-12 lg:p-16 overflow-hidden relative">
          
          {/* Last Updated Badge */}
          <div className="absolute top-0 right-0 p-6 md:p-8">
            <span className="inline-block px-4 py-1.5 bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest rounded-full border border-slate-100">
              {language === 'en' ? 'Updated: July 2026' : 'Ivugururwa: Nyakanga 2026'}
            </span>
          </div>

          <div className="space-y-12 text-slate-600 leading-relaxed mt-8 md:mt-0">
            
            {/* Section 1: Agreement */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-sky-500 text-sm font-black bg-sky-50 px-3 py-1 rounded-lg">01</span>
                {language === 'en' ? 'Agreement to Terms' : 'Kwemera Amabwiriza'}
              </h2>
              <p className="text-slate-500 font-medium md:text-lg">
                {language === 'en'
                  ? 'By accessing and using this website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.'
                  : 'Mukoresha urubuga rwacu, mwemera kwemera aya mabwiriza. Niba mutemera igice icyo aricyo cyose cy\'aya mabwiriza, nyamuneka ntimukoreshe urubuga rwacu.'
                }
              </p>
            </section>

            {/* Section 2: Products */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-sky-500 text-sm font-black bg-sky-50 px-3 py-1 rounded-lg">02</span>
                {language === 'en' ? 'Products & Pricing' : 'Ibicuruzwa n\'Ibiciro'}
              </h2>
              <p className="mb-4 text-slate-500 font-medium md:text-lg">
                {language === 'en' 
                  ? 'We strive to ensure product information and pricing is accurate. However, errors may occur.' 
                  : 'Tugerageza kugira ngo amakuru y\'ibicuruzwa n\'ibiciro bibe byo. Gusa, amakosa ashobora kubaho.'}
              </p>
              <ul className="space-y-4 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100">
                {[
                  { en: 'Prices are subject to change without notice', rw: 'Ibiciro bishobora guhinduka nta nteguza' },
                  { en: 'We reserve the right to limit quantities', rw: 'Dufite uburenganzira bwo kugena umubare ntarengwa w\'ibigurwa' },
                  { en: 'Colors may vary slightly from photos', rw: 'Amabara ashobora gutandukana gato n\'ayo ku mafoto' }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-slate-700 font-medium">
                    <FaCircle className="text-[6px] text-slate-400 flex-shrink-0" />
                    <span>{language === 'en' ? item.en : item.rw}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 3: Orders & Payments */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-sky-500 text-sm font-black bg-sky-50 px-3 py-1 rounded-lg">03</span>
                {language === 'en' ? 'Orders & Payments' : 'Amabwiriza no Kwishyura'}
              </h2>
              <p className="mb-6 text-slate-500 font-medium md:text-lg">
                {language === 'en'
                  ? 'We reserve the right to refuse any order you place with us. Please note that we operate on a strictly digital/bank transfer payment model.'
                  : 'Dufite uburenganzira bwo kwanga itegeko iryo ariryo ryose waduhaye. Nyamuneka menya ko twakira gusa ubwishyu bwo kuri telefoni cyangwa banki.'
                }
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  // 🚀 REMOVED CASH ON DELIVERY
                  { title: { en: 'Payment Methods', rw: 'Uburyo bwo Kwishyura' }, desc: { en: 'MTN MoMo, Airtel Money, Bank Transfer', rw: 'MTN MoMo, Airtel Money, Kwishyura mu Banki' } },
                  { title: { en: 'Order Confirmation', rw: 'Kwemeza Ibyatumijwe' }, desc: { en: 'Received via Email/SMS after checkout', rw: 'Byoherezwa kuri Imeli/SMS nyuma yo kwishyura' } },
                  { title: { en: 'Cancellation', rw: 'Guhagarika Ibyatumijwe' }, desc: { en: 'Allowed before shipping is processed', rw: 'Byemewe mbere yuko byoherezwa' } },
                  { title: { en: 'Currency', rw: 'Ifaranga Rikoreshwa' }, desc: { en: 'All transactions are in Rwandan Francs (RWF)', rw: 'Kwishyura byose ni mu Mafanga y\'u Rwanda (RWF)' } },
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-black text-slate-900 text-sm md:text-base mb-1">
                      {language === 'en' ? item.title.en : item.title.rw}
                    </h3>
                    <p className="text-sm font-medium text-slate-500">
                      {language === 'en' ? item.desc.en : item.desc.rw}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Delivery */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-sky-500 text-sm font-black bg-sky-50 px-3 py-1 rounded-lg">04</span>
                {language === 'en' ? 'Delivery Policy' : 'Uko Dutanga Ibicuruzwa'}
              </h2>
              <p className="text-slate-500 font-medium md:text-lg">
                {language === 'en'
                  ? 'Delivery times are estimates and start from the date of shipping, rather than the date of order. We are not responsible for delays caused by destination customs clearance processes or other unforeseen factors.'
                  : 'Igihe cyo gutanga ibicuruzwa ni igereranyo kandi gitangira kubarwa uhereye igihe byoherejwe. Ntituryozwa gutinda guterwa n\'impamvu zituruka hanze y\'ubushobozi bwacu.'
                }
              </p>
            </section>

            {/* Section 5: Governing Law */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-sky-500 text-sm font-black bg-sky-50 px-3 py-1 rounded-lg">05</span>
                {language === 'en' ? 'Governing Law' : 'Amategeko Agenga'}
              </h2>
              <p className="text-slate-500 font-medium md:text-lg">
                {language === 'en'
                  ? 'These Terms shall be governed and construed in accordance with the laws of Rwanda, without regard to its conflict of law provisions.'
                  : 'Aya mabwiriza azagengwa kandi asobanurwe hakurikijwe amategeko y\'u Rwanda.'
                }
              </p>
            </section>

            {/* Contact Footer */}
            <section className="border-t border-slate-100 pt-10 mt-10">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6">
                {language === 'en' ? 'Contact Us' : 'Twandikire'}
              </h2>
              <div className="bg-sky-50 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-sky-100">
                <p className="font-bold text-slate-700 text-lg text-center md:text-left">
                  {language === 'en'
                    ? 'Questions about the Terms?'
                    : 'Ufite ibibazo kuri aya mabwiriza?'}
                </p>
                <a 
                  href="mailto:director@kigaliswimshop.online" 
                  className="flex items-center gap-3 px-8 py-4 bg-white text-sky-600 font-black rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all w-full md:w-auto justify-center"
                >
                  <FaEnvelope className="text-xl" />
                  director@kigaliswimshop.online
                </a>
              </div>
            </section>

          </div>
        </article>
      </div>
    </main>
  );
};

export default Terms;