// src/App.jsx
import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'

import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute'
import LoadingFallback from './components/LoadingFallback'
import RootLayout from './layouts/RootLayout'

import useAnalyticsStore from './stores/analyticsStore'
import useAuthStore from './stores/authStore'
import useProductStore from './stores/productStore' 
import useCategoryStore from './stores/categoryStore' 
import { getSessionId } from './utils/analytics'

// Eagerly loaded features
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import CreatePost from './pages/CreatePost'

// Lazy loaded views
const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const FAQ = lazy(() => import('./pages/FAQ'))
const ReturnPolicy = lazy(() => import('./pages/ReturnPolicy'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Terms = lazy(() => import('./pages/Terms'))
const SignUp = lazy(() => import('./pages/SignUp'))
const SignIn = lazy(() => import('./pages/SignIn'))
const Profile = lazy(() => import('./pages/Profile'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))

function App() {
  const startSession = useAnalyticsStore((state) => state.startSession)
  const sessionId = getSessionId()
  
  const fetchProducts = useProductStore((state) => state.fetchProducts)
  const fetchCategories = useCategoryStore((state) => state.fetchCategories)
  const initializeAuth = useAuthStore((state) => state.initializeAuth)

  useEffect(() => {
    startSession(sessionId)
    fetchProducts()
    fetchCategories() 

    const unsubscribe = initializeAuth()
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe()
    }
  }, [startSession, sessionId, fetchProducts, fetchCategories, initializeAuth])

  return (
    <HelmetProvider>
      <Router>
        <Toaster 
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#0f172a',
              color: '#fff',
              borderRadius: '1rem',
              padding: '12px 24px',
              fontWeight: 'bold',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#0ea5e9', secondary: '#fff' },
            },
          }} 
        />

        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Main App Routes sharing the App Layout Wrapper */}
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
                <Route path="/profile" element={<Profile />} />
                <Route path="/blog" element={<Blog/>}/>
                <Route path='/blog/:slug' element={<BlogPost/>}/>
                <Route path="/wishlist" element={<div className="container mx-auto px-4 py-12 text-center"><h1 className="text-2xl font-bold">Wishlist Coming Soon</h1></div>} />
              </Route>

              {/* Secure Admin Dashboard Routes */}
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path='/admin/create-post' element={
                <ProtectedRoute>
                  <CreatePost/>
                </ProtectedRoute>
              }/>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  )
}

export default App