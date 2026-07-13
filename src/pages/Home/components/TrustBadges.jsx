import React from 'react';

export default function TrustBadges({ language }) {
  return (
    <section className="py-8 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="mb-2 text-sky-500">
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </div>
            <h3 className="font-bold text-sm md:text-base text-slate-800">{language === 'en' ? 'Fast Delivery' : 'Gutanga Vuba'}</h3>
            <p className="text-xs text-slate-500">{language === 'en' ? '24-48 hours' : 'Amasaha 24-48'}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 text-sky-500">
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="font-bold text-sm md:text-base text-slate-800">{language === 'en' ? 'Secure Payment' : 'Kwishyura Bwite'}</h3>
            <p className="text-xs text-slate-500">{language === 'en' ? 'Multiple options' : 'Amahitamo menshi'}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 text-sky-500">
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" /></svg>
            </div>
            <h3 className="font-bold text-sm md:text-base text-slate-800">{language === 'en' ? 'Easy Returns' : 'Gusubiza Byoroshye'}</h3>
            <p className="text-xs text-slate-500">{language === 'en' ? '7-day policy' : 'Iminsi 7'}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 text-sky-500">
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            </div>
            <h3 className="font-bold text-sm md:text-base text-slate-800">{language === 'en' ? 'Quality Guaranteed' : 'Quality nziza cyane'}</h3>
            <p className="text-xs text-slate-500">{language === 'en' ? 'Authentic' : 'Iby\'ukuri'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}