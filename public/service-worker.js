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

// fetch event 