import React, { useMemo } from 'react';
import useLanguageStore from '../../stores/languageStore';
import useCategoryStore from '../../stores/categoryStore';
import useProductStore from '../../stores/productStore';

// Components
import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import FeaturedProducts from './components/FeaturedProducts';
import TrustBadges from './components/TrustBadges';
import Testimonials from './components/Testimonials';

export default function Home() {
  const language = useLanguageStore((state) => state.language);
  const categories = useCategoryStore((state) => state.categories);
  const products = useProductStore((state) => state.products);

  // Round-Robin Algorithm to mix 20 products evenly across categories
  const featuredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    const groupedProducts = {};
    products.forEach(product => {
      const cat = product.category || 'other';
      if (!groupedProducts[cat]) groupedProducts[cat] = [];
      groupedProducts[cat].push(product);
    });

    const mixedList = [];
    const categoryKeys = Object.keys(groupedProducts);
    let itemsAvailable = true;

    while (mixedList.length < 20 && itemsAvailable) {
      itemsAvailable = false;
      for (const key of categoryKeys) {
        if (mixedList.length >= 20) break;
        if (groupedProducts[key].length > 0) {
          mixedList.push(groupedProducts[key].shift());
          itemsAvailable = true;
        }
      }
    }
    return mixedList;
  }, [products]);

  return (
    <div className="space-y-0">
      <HeroSection language={language} />
      <CategoriesSection language={language} categories={categories} />
      <FeaturedProducts language={language} featuredProducts={featuredProducts} />
      <TrustBadges language={language} />
      <Testimonials language={language} />
    </div>
  );
}