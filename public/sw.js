self.addEventListener("install", event => {
  //console.log("Service Worker: Install event");
  event.waitUntil(
    caches
      .open("quiz")
      .then(cache => {
        //console.log("Service Worker: Caching assets");
        return cache.addAll([
          "/api.php?mode=p", // Add more resources if needed
        ]);
      })
      .catch(error => {
        //console.error("Service Worker: Caching failed", error);
      })
  );
});

self.addEventListener("fetch", event => {
  //console.log("Service Worker: Fetch event for ", event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          //console.log("Service Worker: Found in cache", event.request.url);
          return cachedResponse;
        }
        if (!navigator.onLine) {
          //console.log("Service Worker: Offline and resource not in cache", event.request.url);
          return new Response("You are offline and the requested resource is not available in the cache.", {
            status: 503,
            statusText: "Service Unavailable",
            headers: new Headers({ "Content-Type": "text/plain" })
          });
        }
  
        //console.log("Service Worker: Network request for ", event.request.url);
        return fetch(event.request).then(response => {
          let cacheName = "pwa-assets";
          if (event.request.url === self.location.origin + "/api.php?mode=p") cacheName = "quiz";
          return caches.open(cacheName).then(cache => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      })
      .catch(error => {
        console.error("Service Worker: Fetch failed", error);
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", event => {
  //console.log("Service Worker: Activate event");
  const cacheWhitelist = ["quiz"];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            //console.log("Service Worker: Deleting old cache", cacheName);
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
});

self.addEventListener("message", event => {
  //console.log("Service Worker: Message event", event.data);
  if (event.data && event.data.action === "clear-cache") {
    //console.log("Service Worker: Clearing cache");
    caches.delete("quiz");
  }
});
