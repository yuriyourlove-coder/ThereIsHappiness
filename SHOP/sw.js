const CACHE_NAME = 'shop-cache-v1';
const urlsToCache = [
    '/',
    '/style.css',
    '/script.js',
    '/data/products.json',
    '/images/icon-192.png',
    '/images/icon-512.png'
];

// Установка кеша
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Перехват запросов и выдача из кеша
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});