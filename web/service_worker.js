const CACHE_NAME = 'ikapo-watermark-editor-cache-v1';
const urlsToCache = [
    '/Ikapo_WatermarkEditor/web/',
    '/Ikapo_WatermarkEditor/web/index.html',
    '/Ikapo_WatermarkEditor/web/styles.css',
    '/Ikapo_WatermarkEditor/web/script.js',
    '/Ikapo_WatermarkEditor/web/images/Icon@2x.png',
    '/Ikapo_WatermarkEditor/web/images/photo.svg',
    '/Ikapo_WatermarkEditor/web/images/download.svg',
    '/Ikapo_WatermarkEditor/web/images/stars.svg',
    '/Ikapo_WatermarkEditor/web/images/new.svg',
    '/Ikapo_WatermarkEditor/web/images/share.svg',
    '/Ikapo_WatermarkEditor/web/images/X - Logo.svg',
    '/Ikapo_WatermarkEditor/web/watermarks/W01.png',
    '/Ikapo_WatermarkEditor/web/watermarks/W02.png',
    '/Ikapo_WatermarkEditor/web/Watermarks_Icon/WI01.png',
    '/Ikapo_WatermarkEditor/web/Watermarks_Icon/WI02.png',
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