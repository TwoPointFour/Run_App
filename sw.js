self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "images/twopointfouricon.png", "src/master.css"]);
        })
    );

});

/*
self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
*/

self.addEventListener("fetch", function(event) {
  event.respondWith(async function(){
    try{
      var res = await fetch(event.request);
      var cache = await caches.open("cache");
      cache.put(event.request.url, res.clone());
      return res;
    }
    catch(error){
      return caches.match(event.request);
    }
  }());
});



/* HAVE DIFF SIZE IMAGES
    {
      "src": "images/twopointfouricon.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "images/twopointfouricon.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "images/twopointfouricon.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "images/twopointfouricon.png",
      "sizes": "152x152",
      "type": "image/png"
    }
*/
