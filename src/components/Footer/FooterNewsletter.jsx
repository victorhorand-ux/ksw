import React from 'react';
import Button from '../ui/Button';

export default function FooterNewsletter({ t, email, setEmail, handleSubscribe, subscribeStatus }) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 border-b border-slate-800 pb-12 lg:pb-16 mb-12 lg:mb-16">
      <div className="text-center lg:text-left space-y-3 lg:space-y-4 w-full lg:w-auto">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400 drop-shadow-lg">
          {t.cta}
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-md mx-auto lg:mx-0">
          {t.subCta}
        </p>
      </div>

      <div className="w-full max-w-md">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-sky-600 rounded-3xl sm:rounded-full blur opacity-20 group-hover:opacity-60 transition duration-1000"></div>
          
          {/* 🚀 FIXED FOR MOBILE: Stacks on tiny screens, inline pill on larger screens */}
          <form 
            onSubmit={handleSubscribe} 
            className="relative flex flex-col sm:flex-row gap-3 sm:gap-0 sm:bg-slate-800/80 sm:backdrop-blur-sm rounded-2xl sm:rounded-full sm:p-2 sm:border sm:border-slate-700 focus-within:border-sky-500 transition-colors w-full"
          >
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              inputMode="email"
              name="email"
              aria-label={t.placeholder}
              placeholder={t.placeholder}
              className="flex-1 bg-slate-800 sm:bg-transparent border border-slate-700 sm:border-none rounded-2xl sm:rounded-none px-6 py-4 sm:py-3 text-white placeholder-slate-500 focus:outline-none w-full shadow-sm sm:shadow-none"
            />
            
            <Button 
              type="submit"
              variant="primary"
              disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
              className={`w-full sm:w-auto !rounded-2xl sm:!rounded-full shrink-0 py-4 sm:py-3 ${
                subscribeStatus === 'success' ? '!from-green-500 !to-green-600' :
                subscribeStatus === 'error' ? '!from-red-500 !to-red-600' : ''
              }`}
            >
              {subscribeStatus === 'loading' ? t.subscribing : 
               subscribeStatus === 'success' ? t.success : 
               subscribeStatus === 'error' ? t.error : 
               t.subscribe}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}