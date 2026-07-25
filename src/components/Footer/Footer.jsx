import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseFirestore';
import useLanguageStore from '../../stores/languageStore';
import useHydration from '../../hooks/useHydration'; // 🚀 1. Import the hook

import FooterNewsletter from './FooterNewsletter';
import FooterBrand from './FooterBrand';
import FooterLinks from './FooterLinks';
import FooterPayments from './FooterPayments';

const translations = {
  en: {
    cta: "Ready to dive in?",
    subCta: "Join our community for swimming tips and exclusive offers.",
    placeholder: "Enter your email",
    subscribe: "Subscribe",
    subscribing: "Saving...",
    success: "Thank You! 🎉",
    error: "Try Again",
    quickLinks: 'Quick Links',
    customerService: 'Customer Service',
    paymentMethods: 'Payment Methods',
    followUs: 'Follow Us',
    rights: 'All rights reserved',
    address: 'Kigali, Rwanda',
    phone: '+250 784 154 697',
    email: 'director@kigaliswimshop.online'
  },
  rw: {
    cta: "Witeguye Koga?",
    subCta: "Injira mu muryango wacu kugirango ubone inama n'ibiciro byiza.",
    placeholder: "Andika imeri yawe",
    subscribe: "Iyandikishe",
    subscribing: "Biri gukorwa...",
    success: "Murakoze! 🎉",
    error: "Ongera ugerageze",
    quickLinks: 'Amahuza',
    customerService: 'Serivisi z\'abakiriya',
    paymentMethods: 'Uburyo bwo kwishura',
    followUs: 'Dukurikire',
    rights: 'Uburenganzira bwose burabagirwa',
    address: 'Kigali, Rwanda',
    phone: '+250 784 154 697',
    email: 'director@kigaliswimshop.online'
  }
};

export default function Footer() {
  const language = useLanguageStore((state) => state.language);
  const isHydrated = useHydration(); // 🚀 2. Call the hook
  
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('idle');

  if (location.pathname.startsWith('/admin')) return null;

  // 🚀 3. Protect the translation object selection
  // If not hydrated yet, force English to match the pre-rendered HTML
  const currentLanguage = isHydrated ? language : 'en';
  const t = translations[currentLanguage];

  const handleLinkClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      toast.error(currentLanguage === 'en' ? 'Please enter a valid email address.' : 'Andika imeyili ikora.', { id: 'footer-email-invalid' });
      return;
    }

    setSubscribeStatus('loading');
    try {
      await addDoc(collection(db, 'subscribers'), {
        email: normalizedEmail,
        subscribedAt: new Date().toISOString(),
        status: 'active'
      });
      
      toast.success(currentLanguage === 'en' ? 'Welcome to the community! 🎉' : 'Murakoze kwiyandikisha! 🎉', { id: 'footer-sub' });
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    } catch (error) {
      toast.error(currentLanguage === 'en' ? 'Subscription failed. Try again.' : 'Habaye ikibazo. Ongera ugerageze.', { id: 'footer-err' });
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }
  };

  // 🚀 4. Protect the link labels
  const quickLinks = [
    { path: '/', label: currentLanguage === 'en' ? 'Home' : 'Ahabanza' },
    { path: '/products', label: currentLanguage === 'en' ? 'Products' : 'Ibicuruzwa' },
    { path: '/about', label: currentLanguage === 'en' ? 'About Us' : 'Ibyerekeye' },
    { path: '/contact', label: currentLanguage === 'en' ? 'Contact' : 'Twandikire' }
  ];

  const serviceLinks = [
    { path: '/faq', label: currentLanguage === 'en' ? 'FAQs' : 'Ibibazo' },
    { path: '/policies/returns', label: currentLanguage === 'en' ? 'Returns & Exchanges' : 'Gusubiza' },
    { path: '/policies/privacy', label: currentLanguage === 'en' ? 'Privacy Policy' : 'Politiki y\'Ubwigenge' },
    { path: '/policies/terms', label: currentLanguage === 'en' ? 'Terms & Conditions' : 'Amabwiriza' }
  ];

  return (
    <footer className="relative bg-slate-900 text-white mt-16 md:mt-24 lg:mt-32">
      {/* Top Wave Divider */}
      <div className="absolute top-0 left-0 right-0 -mt-6 md:-mt-12 lg:-mt-16 w-full overflow-hidden leading-[0] transform rotate-180 z-10 pointer-events-none">
        <svg className="relative block w-[calc(100%+1.3px)] h-[30px] md:h-[50px] lg:h-[70px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-slate-900"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-10 pb-8 md:pt-12 md:pb-12">
        
        <FooterNewsletter 
          t={t} 
          email={email} 
          setEmail={setEmail} 
          handleSubscribe={handleSubscribe} 
          subscribeStatus={subscribeStatus} 
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* 🚀 5. Pass the protected language down to children */}
          <FooterBrand language={currentLanguage} t={t} />
          <FooterLinks title={t.quickLinks} links={quickLinks} handleLinkClick={handleLinkClick} />
          <FooterLinks title={t.customerService} links={serviceLinks} handleLinkClick={handleLinkClick} />
          <FooterPayments t={t} />
        </div>

        {/* Copyright Section */}
        <div className="border-t border-slate-800 mt-12 md:mt-16 pt-6 md:pt-8 text-center flex flex-col md:flex-row items-center justify-center gap-2">
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            &copy; {new Date().getFullYear()} KigaliSwimShop. {t.rights}. 
          </p>
          <span className="hidden md:inline text-slate-700">•</span>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            Built with ❤️ in Kigali.
          </p>
        </div>
      </div>
    </footer>
  );
}