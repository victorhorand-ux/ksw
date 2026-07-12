// src/App.jsx
import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider, Helmet } from 'react-helmet-async'

// 🚀 1. Import React Query & DevTools
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute'
import LoadingFallback from './components/LoadingFallback'
import RootLayout from './layouts/RootLayout'
import AppProvider from './components/AppProvider'

// 🚀 SPEED: 100% Lazy-loaded routes
const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart/Cart'))
const Checkout = lazy(() => import('./pages/Checkout/Checkout'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))
const FAQ = lazy(() => import('./pages/FAQ'))
const ReturnPolicy = lazy(() => import('./pages/ReturnPolicy'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Terms = lazy(() => import('./pages/Terms'))
const SignUp = lazy(() => import('./pages/SignUp/SignUp'))
const SignIn = lazy(() => import('./pages/SignIn/SignIn'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const CreatePost = lazy(() => import('./pages/CreatePost'))

// 🚀 2. Initialize the Query Client with E-commerce Defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
      cacheTime: 1000 * 60 * 30, // Keep inactive data in cache for 30 mins
      refetchOnWindowFocus: false, // Prevents spamming Firebase when switching tabs
      retry: 2, // Automatically retry failed requests twice
    },
  },
})

export default function App() {
  return (
    <HelmetProvider>
      {/* 🚀 SEO: Global Default Meta Tags */}
      <Helmet defaultTitle="Kigali Swim Shop | Premium Swimming Gear in Rwanda" titleTemplate="%s | Kigali Swim Shop">
        <html lang="en" />
        <meta name="description" content="Kigali's premier destination for professional swimming gear, swimwear, and accessories. Fast delivery across Rwanda." />
        <meta name="theme-color" content="#0f172a" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kigali Swim Shop" />
        <meta property="og:description" content="Kigali's premier destination for professional swimming gear, swimwear, and accessories." />
      </Helmet>

      {/* 🚀 3. Wrap the app in the QueryClientProvider */}
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Router>
            <Toaster 
              position="bottom-center"
              toastOptions={{
                duration: 3000,
                style: { background: '#0f172a', color: '#fff', borderRadius: '1rem', padding: '12px 24px', fontWeight: 'bold', fontSize: '14px' },
                success: { iconTheme: { primary: '#0ea5e9', secondary: '#fff' } },
              }} 
            />

            {/* 🚀 STABILITY: Catches any component crashes */}
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  
                  {/* PUBLIC ROUTES */}
                  <Route element={<RootLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:slug" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/policies/returns" element={<ReturnPolicy />} />
                    <Route path="/policies/privacy" element={<PrivacyPolicy />} />
                    <Route path="/policies/terms" element={<Terms />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    
                    {/* SECURITY: Profile is protected at the router level */}
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    <Route path="*" element={<NotFound />} />
                  </Route>

                  {/* RESTRICTED ADMIN ROUTES */}
                  <Route path="/admin" element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/admin/create-post" element={
                    <ProtectedRoute requireAdmin={true}>
                      <CreatePost />
                    </ProtectedRoute>
                  } />

                </Routes>
              </Suspense>
            </ErrorBoundary>
          </Router>
        </AppProvider>
        
        {/* 🚀 4. Add the DevTools (Automatically hides in production) */}
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </HelmetProvider>
  )
}