import React, { useState, useEffect } from 'react';
// 🚀 1. Added useNavigate
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Added for better UX

// Swapped Zustand for our new ultra-fast React Query hooks
import { useProduct } from '../../hooks/queries/useProduct';
import { useProducts } from '../../hooks/queries/useProducts';

import useCartStore from '../../stores/cartStore';
import useLanguageStore from '../../stores/languageStore';
import useAnalyticsStore from '../../stores/analyticsStore';

// The new tiny reusable components
import ProductGallery from './components/ProductGallery';
import ProductActionPanel from './components/ProductActionPanel';
import RelatedProducts from './components/RelatedProducts';
import MobileBuyBar from './components/MobileBuyBar';
import SizeGuideModal from './components/SizeGuideModal';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate(); // 🚀 2. Initialize navigate
  
  const language = useLanguageStore((state) => state.language);
  const trackProductView = useAnalyticsStore((state) => state.trackProductView);
  const addItem = useCartStore((state) => state.addItem);

  // Network & Cache Layer
  const { data: product, isLoading, error } = useProduct(slug);
  const { data: allProducts = [] } = useProducts(); 

  // UI State
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);

  // Reset states on URL change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      trackProductView(product.id);
      setQuantity(1);
      setSelectedSize(product.sizes?.[0] || '');
      setSelectedColor(product.colors?.[0] || '');
    }
  }, [slug, product, trackProductView]);

  const handleAddToCart = () => {
    if (!product || !product.inStock) return; // Security Check
    addItem({ ...product, selectedSize, selectedColor }, quantity);
    toast.success(language === 'en' ? 'Added to cart!' : 'Yashyizwe mu gitebo!');
  };

  // 🚀 3. Create the Buy Now function
  const handleBuyNow = () => {
    if (!product || !product.inStock) return;
    // Add to cart, then immediately teleport to checkout
    addItem({ ...product, selectedSize, selectedColor }, quantity);
    navigate('/checkout');
  };

  // Graceful Loading UI
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-sky-500 mb-4"></div>
      </div>
    );
  }

  // Graceful Error UI
  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4 opacity-50">🔍</div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900">
          {language === 'en' ? 'Product not found' : 'Igitangaza ntikibonetse'}
        </h2>
        <Link to="/products" className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-slate-800 transition">
          {language === 'en' ? 'Back to Shop' : 'Subira mu Bicuruzwa'}
        </Link>
      </div>
    );
  }

  return (
    <div key={product.id} className="bg-white min-h-screen pb-24 lg:pb-0 animate-fade-in">
      
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <nav className="text-xs md:text-sm font-medium text-slate-500 flex items-center gap-2">
            <Link to="/" className="hover:text-sky-600 transition">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-sky-600 transition">Products</Link>
            <span>/</span>
            <span className="text-slate-900 line-clamp-1 font-bold">
              {language === 'en' ? product.name : product.nameRw}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-0 lg:px-4 py-0 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 xl:gap-16">
          
          {/* Extracted: Left Image Gallery */}
          <ProductGallery product={product} />

          {/* Extracted: Right Action Panel */}
          <ProductActionPanel 
            product={product}
            language={language}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            quantity={quantity}
            setQuantity={setQuantity}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow} // 🚀 4. Passed down to Action Panel
            onOpenSizeChart={() => setShowSizeChart(true)}
          />

        </div>
      </div>

      {/* Extracted: Related Products Carousel */}
      <RelatedProducts 
        currentProductId={product.id} 
        allProducts={allProducts} 
        language={language} 
      />

      {/* Extracted: Mobile Bottom Sticky Bar */}
      <MobileBuyBar 
        product={product} 
        language={language} 
        quantity={quantity} 
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow} // 🚀 5. Passed down to Mobile Bar
      />

      {/* Extracted: Size Chart Modal */}
      {showSizeChart && (
        <SizeGuideModal 
          language={language} 
          onClose={() => setShowSizeChart(false)} 
        />
      )}

    </div>
  );
}