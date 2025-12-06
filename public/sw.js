// Service Worker for PWA
// Update version to force cache refresh on mobile devices
const CACHE_NAME = 'new-year-shopping-list-v2';

// Get base path from the service worker's scope
// For GitHub Pages, this will be something like '/shopping-list/'
const basePath = self.location.pathname.replace('/sw.js', '') || '/';

const urlsToCache = [
  basePath,
  basePath + 'menu',
  basePath + 'index.html',
  basePath + 'manifest.json'
].map(url => url.replace('//', '/')); // Remove double slashes

self.addEventListener('install', (event) => {
  // Force activation of new service worker
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Service worker install error:', error);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // For JavaScript, CSS, and other assets, use network-first strategy
  // This ensures users always get the latest code
  const url = new URL(event.request.url);
  const isAsset = url.pathname.match(/\.(js|css|json|svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot)$/);
  
  if (isAsset) {
    // Network-first for assets - always try to fetch fresh, fallback to cache
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // If network request succeeds, cache and return it
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // If network fails, try cache
          return caches.match(event.request);
        })
    );
  } else {
    // For HTML pages, use cache-first but with network fallback
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          // If cached, return it but also fetch fresh in background
          if (cachedResponse) {
            fetch(event.request).then((networkResponse) => {
              if (networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              }
            }).catch(() => {
              // Network fetch failed, that's okay
            });
            return cachedResponse;
          }
          // Not cached, fetch from network
          return fetch(event.request).then((response) => {
            if (response.status === 200) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return response;
          });
        })
        .catch(() => {
          // Both cache and network failed, return a basic response
          return fetch(event.request);
        })
    );
  }
});

self.addEventListener('activate', (event) => {
  // Take control of all pages immediately
  event.waitUntil(
    Promise.all([
      // Delete old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Claim all clients immediately
      self.clients.claim()
    ])
  );
});

