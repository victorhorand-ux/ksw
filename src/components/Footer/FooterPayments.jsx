import React from 'react';
import { FaInstagram, FaFacebookF, FaXTwitter, FaMobileScreenButton, FaBuildingColumns } from 'react-icons/fa6';

export default function FooterPayments({ t }) {
  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/kigaliswimshop', icon: <FaInstagram />, hover: 'hover:bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 hover:border-transparent' },
    { name: 'Facebook', url: 'https://facebook.com/kigaliswimshop', icon: <FaFacebookF />, hover: 'hover:bg-[#1877F2] hover:border-transparent' },
    { name: 'Twitter', url: 'https://twitter.com/kigaliswimshop', icon: <FaXTwitter />, hover: 'hover:bg-black hover:border-transparent' }
  ];

  return (
    <div>
      <h4 className="font-bold text-lg mb-4 sm:mb-6 text-white">{t.paymentMethods}</h4>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <div className="bg-slate-800/50 border border-slate-700/50 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 text-slate-300 shadow-sm">
          <FaMobileScreenButton className="text-sky-400 text-base sm:text-lg" />
          <span className="text-[11px] sm:text-xs font-bold tracking-wide">MTN Momo</span>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 text-slate-300 shadow-sm">
          <FaMobileScreenButton className="text-sky-400 text-base sm:text-lg" />
          <span className="text-[11px] sm:text-xs font-bold tracking-wide">Airtel Money</span>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 text-slate-300 shadow-sm">
          <FaBuildingColumns className="text-sky-400 text-base sm:text-lg" />
          <span className="text-[11px] sm:text-xs font-bold tracking-wide">Bank</span>
        </div>
      </div>
      
      <h4 className="font-bold text-lg mt-8 sm:mt-10 mb-4 sm:mb-6 text-white">{t.followUs}</h4>
      <div className="flex gap-3 sm:gap-4">
        {socialLinks.map((social) => (
          <a 
            key={social.name} 
            href={social.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800 flex items-center justify-center text-lg sm:text-xl text-slate-300 border border-slate-700 transition-all transform hover:-translate-y-1 shadow-md ${social.hover}`}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
}