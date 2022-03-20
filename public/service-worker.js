const APP_PREFIX = "BudgetTracker-";
const VERSION = "version-01";
const CACHE_NAME = APP_PREFIX + VERSION;
const FILES_TO_CACHE = [
    "./css/styles.css",
    "./icon/icon-72x72.png",
    "./icon/icon-96x96.png",
    "./icon/icon-128x128.png",
    "./icon/icon-144x144.png",
    "./icon/icon-152x152.png",
    "./icon/icon-192x192.png",
    "./icon/icon-384x384.png",
    "./icon/icon-512x512.png",
    "./js/idb.js",
    "./js/index.js",
    "./index.html"
];

// install event
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log("installing chache: " + CACHE_NAME);
            return cache.addAll(FILES_TO_CACHE);
        })
    )
})
// activation event
self.addEventListener("activate", function(event){
    event.waitUntil(
        caches.keys().then(function(keyList) {
            let cacheKeepList = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            })
            cacheKeepList.push(CACHE_NAME);
            return Promise.all(keyList.map(function(key,i) {
                if(cacheKeepList.indexOf(key) === -1) {
                    console.log('deleting cache: ' + keyList[i]);
                    return caches.delete(keyList[i]);
                }
            }));
        })
    )
});
// fetch event 
self.addEventListener("fetch", function(event) {
    console.log ("fetch request: " + event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(request) {
            if (request) {
                console.log('Responding with cache: ' + event.request.url)
                return request;
            } else {
                console.log("file not cached, fetching: " + event.request.url)
                return fetch(event.request);
            }
        })
    )
});