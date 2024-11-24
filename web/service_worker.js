const CACHE_NAME = 'ikapo-watermark-editor-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/images/Icon@2x.png',
    '/images/photo.svg',
    '/images/download.svg',
    '/images/stars.svg',
    '/images/new.svg',
    '/images/share.svg',
    '/images/X - Logo.svg',
    '/watermarks/W01.png',
    '/watermarks/W02.png',
    '/Watermarks_Icon/WI01.png',
    '/Watermarks_Icon/WI02.png',
];

self.addEventListener('install', event => {
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