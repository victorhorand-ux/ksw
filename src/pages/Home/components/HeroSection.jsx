import React from 'react';
import { useNavigate } from 'react-router-dom';
import LazyImage from '../../../components/LazyImage';
import Button from '../../../components/ui/Button'; // 🚀 Imported

export default function HeroSection({ language }) {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-slate-900 py-14 sm:py-16 lg:py-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 opacity-90" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[150px] mix-blend-screen animate-float-slow" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-0 items-center min-h-[calc(100svh-6rem)] sm:min-h-[80svh] lg:min-h-[90vh]">
          <div className="max-w-2xl text-center lg:text-left space-y-6 sm:space-y-8 relative z-20 order-2 lg:order-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-2xl animate-fade-in-up delay-100">
              {language === 'en' ? (
                <>Dominating<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-sky-300">Waters.</span></>
              ) : (
                <>Oga neza mu <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-sky-300">Amazi.</span></>
              )}
            </h1>

            <p className="text-lg text-blue-100/80 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed animate-fade-in-up delay-200">
              {language === 'en'
                ? 'Equip yourself with Rwanda\'s #1 performance swimming gear. Speed, comfort, and durability for every stroke.'
                : 'Wihereze ibikoresho byo koga bya mbere mu Rwanda. Umuvuduko, ihumure, n\'igihe kirekire kuri buri stroke.'
              }
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start pt-4 animate-fade-in-up delay-300">
              {/* 🚀 Integrated the main CTA using your Button system */}
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => navigate('/products')}
                className="w-full sm:w-auto px-10 py-4 text-lg shadow-[0_0_40px_rgba(2,132,199,0.3)] hover:shadow-[0_0_60px_rgba(2,132,199,0.5)]"
              >
                {language === 'en' ? 'Shop The Collection' : 'Gura Ibikoresho'}
              </Button>
            </div>
          </div>

          <div className="relative z-10 order-1 lg:order-2 w-full max-w-[560px] mx-auto lg:mx-0 lg:translate-x-8 xl:translate-x-12 animate-fade-in-up">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/40 to-primary-500/40 blur-3xl -z-10 transform rotate-6 rounded-[3rem]"></div>
            <div className="relative h-[280px] sm:h-[360px] md:h-[450px] lg:h-[640px] xl:h-[700px] w-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)] transform rotate-3 group hover:rotate-0 transition-all duration-700 ease-out">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10 mix-blend-overlay pointer-events-none"></div>
              <LazyImage
                src="https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=2070&auto=format&fit=crop" 
                alt="Swimmer in action"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                width={1200}
                height={1400}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}