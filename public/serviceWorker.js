const CACHE_NAME = "v1_cache_iota_dev"
const urlsToCache = [
    "./",
    "./images/favicon.png",
    "./images/logo48.png",
    "./images/logo144.png",
]

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).
            then( cache => cache.addAll().
                then((_) => self.skipWaiting() )).
            catch( (error) => console.log(error) )
    )
})

self.addEventListener("activate", event => {
    const cacheWhiteList = [CACHE_NAME]

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if(cacheWhiteList.indexOf(cacheName)=== -1){
                            return caches.delete(cacheName)
                        }
                    })
                )
            })
            .then(
                () => self.clients.claim()
            )
    )
})

/self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(
            res => {
                if (res) {
                    return res
                }
                return fetch(event.request)
            }
        )
    )
})