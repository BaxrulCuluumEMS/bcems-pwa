const CACHE_NAME = "bcems-launcher-v3";

const SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    await Promise.all(SHELL.map(async path => {
      try {
        const response = await fetch(path, {
          cache: "reload"
        });

        if (response.ok) {
          await cache.put(path, response);
        }
      } catch (error) {
        console.warn("Resource lama kaydin:", path);
      }
    }));

    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();

    await Promise.all(
      keys
        .filter(key =>
          key.startsWith("bcems-launcher-") &&
          key !== CACHE_NAME
        )
        .map(key => caches.delete(key))
    );

    await self.clients.claim();
  })());
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  if (
    url.origin !== self.location.origin ||
    request.method !== "GET"
  ) {
    return;
  }

  // Bogga Launcher-ka: marka hore hubi nuqulka cusub.
  if (
    request.mode === "navigate" ||
    url.pathname.endsWith("/index.html") ||
    url.pathname.endsWith("/")
  ) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request, {
          cache: "no-store"
        });

        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        }

        return response;
      } catch (error) {
        const cached = await caches.match(request);

        if (cached) {
          return cached;
        }

        const fallback =
          await caches.match("./index.html") ||
          await caches.match("./");

        if (fallback) {
          return fallback;
        }

        return new Response(
          "BCEMS Launcher lama heli karo. Hubi internet-ka oo dib u fur.",
          {
            status: 503,
            headers: {
              "Content-Type": "text/plain; charset=utf-8"
            }
          }
        );
      }
    })());

    return;
  }

  // Faylasha kale: isticmaal kaydka haddii uu jiro.
  event.respondWith((async () => {
    const cached = await caches.match(request);

    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(request);

      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }

      return response;
    } catch (error) {
      return new Response(
        "Kheyraadka lama heli karin.",
        { status: 503 }
      );
    }
  })());
});
