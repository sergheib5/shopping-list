// Service Worker for PWA
const CACHE_NAME = 'new-year-shopping-list-v1';

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
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

