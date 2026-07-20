import React from 'react';

export default function TrustBadges({ language }) {
  const badges = [
    {
      id: 'delivery',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
      titleEn: 'Fast Delivery',
      titleRw: 'Delivery yihuta',
      descEn: '2-10 hours',
      descRw: 'Amasaha 2-10'
    },
    {
      id: 'payment',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      titleEn: 'Secure Payment',
      titleRw: 'Kwishyura birizewe',
      descEn: 'Multiple options',
      descRw: 'Amahitamo menshi'
    },
    {
      id: 'returns',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" /></svg>,
      titleEn: 'Easy Returns',
      titleRw: 'Kugarura mu buryo bworoshye',
      descEn: '3-day policy',
      descRw: 'Iminsi 3'
    },
    {
      id: 'quality',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
      titleEn: 'Quality Guaranteed',
      titleRw: 'Quality nziza cyane',
      descEn: 'Authentic Gear',
      descRw: 'Ibikoresho byiza'
    }
  ];

  // 🚀 Now uses a horizontal layout (flex-row instead of flex-col)
  const BadgeTrack = () => (
    <div className="flex items-center gap-8 md:gap-16 px-4 md:px-8 min-w-max">
      {badges.map((badge) => (
        <div key={badge.id} className="flex items-center gap-3">
          <div className="text-sky-500 bg-sky-50 p-2.5 rounded-full shrink-0">
            {badge.icon}
          </div>
          <div className="flex flex-col text-left">
            <h3 className="font-bold text-xs md:text-sm text-slate-800 whitespace-nowrap leading-tight">
              {language === 'en' ? badge.titleEn : badge.titleRw}
            </h3>
            <p className="text-[10px] md:text-xs text-slate-500 whitespace-nowrap mt-0.5">
              {language === 'en' ? badge.descEn : badge.descRw}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    // 🚀 Reduced padding from py-10 to py-4
    <section className="py-4 bg-white border-y border-slate-100 overflow-hidden relative group">
      
      <div className="absolute top-0 left-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-max animate-scroll group-hover:[animation-play-state:paused] transition-all">
        {/* Rendered 4 times because the items are narrower now, ensuring we cover ultra-wide monitors */}
        <BadgeTrack />
        <BadgeTrack />
        <BadgeTrack />
        <BadgeTrack />
      </div>

    </section>
  );
}