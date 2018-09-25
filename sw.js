// service worker only triggered by event
// cache methods are async
self.addEventListener('install', async e => {
    const cache = await caches.open('pwa-static');
    cache.addAll(staticAssets);
})

self.addEventListener('fetch', e => {
    const req = e.request;
    e.respondWith(cacheFirst(req));
})

async function cacheFirst(req){
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}

// cashe all static assets

const staticAssets = [
    './',
    './styles.css',
    './app.js'
]

