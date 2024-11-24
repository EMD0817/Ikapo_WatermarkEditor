const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    'web/',
    'web/index.html',
    'web/styles.css',
    'web/script.js',
    'web/images/Icon@2x.png',
    'web/images/photo.svg',
    'web/images/download.svg',
    'web/images/stars.svg',
    'web/images/new.svg',
    'web/images/share.svg',
    'web/images/X - Logo.svg',
    'web/watermarks/W01.png',
    'web/watermarks/W02.png',
    'web/Watermarks_Icon/WI01.png',
    'web/Watermarks_Icon/WI02.png',
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