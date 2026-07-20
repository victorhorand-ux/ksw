import React from 'react';
import useLanguageStore from '../stores/languageStore';
import { FaShieldHalved, FaCheck, FaEnvelope } from 'react-icons/fa6';

const PrivacyPolicy = () => {
  const language = useLanguageStore((state) => state.language);

  return (
    // 🚀 FIXED PADDING & SEMANTICS: Unified top padding and used <main> tag
    <main className="min-h-screen bg-slate-50 px-4">
      <div className="container mx-auto max-w-4xl">
        
        {/* === HEADER === */}
        <header className="text-center mb-12 md:mb-16">
          <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm">
            <FaShieldHalved />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 tracking-tight">
            {language === 'en' ? 'Privacy Policy' : 'Amategeko tugenderaho mu kurinda amakuru yawe'}
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            {language === 'en' 
              ? 'Your privacy is important to us. Here is how we protect it.' 
              : 'Ubwigenge bwawe ni ingenzi kuri twe. Uku niko tuburinda.'}
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
            
            {/* Section 1: Introduction */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-sky-500 text-sm font-black bg-sky-50 px-3 py-1 rounded-lg">01</span>
                {language === 'en' ? 'Introduction' : 'Intangiriro'}
              </h2>
              <p className="text-slate-500 font-medium md:text-lg">
                {language === 'en'
                  ? 'KigaliSwimShop ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services.'
                  : 'KigaliSwimShop ("twe", "wacu", cyangwa "twe") twiyemeje gukomeza ubwigenge bwawe. Iyi Politiki y\'Ubwigenge isobanura uko dukusanya, dukoresha, kandi dukomeza amakuru yawe mugihe ukoresha urubuga rwacu na serivisi zacu.'
                }
              </p>
            </section>

            {/* Section 2: Info Collection */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-sky-500 text-sm font-black bg-sky-50 px-3 py-1 rounded-lg">02</span>
                {language === 'en' ? 'Information We Collect' : 'Amakuru Dukusanya'}
              </h2>
              <p className="mb-4 text-slate-500 font-medium md:text-lg">
                {language === 'en' ? 'We collect the following information to provide you with the best shopping experience:' : 'Dukusanya amakuru akurikira kugira ngo tuguhe serivisi nziza zo kugura:'}
              </p>
              <ul className="space-y-4 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100">
                {[
                  { en: 'Personal information (name, email, phone, address) for orders', rw: 'Amakuru yihariye (amazina, imeyili, telefoni, aderesi) y\'ibyo watumije' },
                  { en: 'Payment information (processed securely through certified gateways)', rw: 'Amakuru yo kwishyura (anyura mu nzira zizewe kandi zemejwe)' },
                  { en: 'Browsing data (cookies) to improve website experience', rw: 'Amakuru y\'uko ukoresha urubuga (cookies) kugira ngo tunoze serivisi' }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-sky-500 flex-shrink-0 shadow-sm shadow-sky-200"></span>
                    <span className="font-medium text-slate-700">{language === 'en' ? item.en : item.rw}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 3: Usage */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-sky-500 text-sm font-black bg-sky-50 px-3 py-1 rounded-lg">03</span>
                {language === 'en' ? 'How We Use Your Information' : 'Uko Dukoresha Amakuru Yawe'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { en: 'To process and fulfill orders', rw: 'Gutunganya ibyo watumije' },
                  { en: 'To communicate order status', rw: 'Kukumenyesha aho ibyo watumije bigeze' },
                  { en: 'To improve our services', rw: 'Kunoza serivisi zacu' },
                  { en: 'To send promotions (optional)', rw: 'Koherereza ibiciro bigabanutse' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-6 h-6 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 flex-shrink-0">
                      <FaCheck className="w-3 h-3" />
                    </div>
                    <span className="text-sm md:text-base font-bold text-slate-700">{language === 'en' ? item.en : item.rw}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Security */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-sky-500 text-sm font-black bg-sky-50 px-3 py-1 rounded-lg">04</span>
                {language === 'en' ? 'Data Security' : 'Umutekano w\'Amakuru'}
              </h2>
              <p className="text-slate-500 font-medium md:text-lg">
                {language === 'en'
                  ? 'We implement strict, industry-standard security measures to protect your personal information from unauthorized access. However, please note that no method of transmission over the internet is 100% secure.'
                  : 'Dukoresha ingamba zikomeye z\'umutekano kugira ngo turinde amakuru yawe. Icyakora, nta buryo bwo koherereza amakuru kuri interineti bwizewe 100%.'
                }
              </p>
            </section>

            {/* Section 5: Contact */}
            <section className="border-t border-slate-100 pt-10 mt-10">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6">
                {language === 'en' ? 'Contact Us' : 'Twandikire'}
              </h2>
              <div className="bg-sky-50 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-sky-100">
                <p className="font-bold text-slate-700 text-lg text-center md:text-left">
                  {language === 'en'
                    ? 'Questions about this policy?'
                    : 'Ufite ibibazo kuri iyi politiki?'}
                </p>
                {/* 🚀 FIXED EMAIL: Using your official email */}
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

export default PrivacyPolicy;