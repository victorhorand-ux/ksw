// Service Worker for KigaliSwimShop
const CACHE_NAME = 'kigali-swim-shop-v1'
const urlsToCache = [
  '/',
  '/products',
  '/cart',
  '/index.html',
  '/src/main.jsx',
  '/src/App.jsx'
]

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

// Fetch event
self.addEventListener('fetch', (event) => {
  const { request } = event

  const shouldSkipCaching = request.url.includes('firestore.googleapis.com') ||
    request.url.includes('firebaseio.com') ||
    request.url.includes('googleapis.com') ||
    request.method !== 'GET' ||
    request.mode === 'navigate'

  if (shouldSkipCaching) {
    event.respondWith(fetch(request))
    return
  }

  event.respondWith(
    caches.match(request)
      .then((response) => {
        return response || fetch(request)
      })
      .catch(() => fetch(request))
  )
})

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})



