
const CACHE_NAME = 'oriented117-cache-v3';
const urlsToCache = [
  './',
  './index.html',
  './index.tsx',
  './App.tsx',
  './constants.ts',
  './types.ts',
  './icon-192x192.png',
  './manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Force update
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
