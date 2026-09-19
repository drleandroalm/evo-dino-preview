/* Generated with content versioning. A new worker activates after old tabs close. */
const VERSION = "9db1c1c97e57c0bb",
  PREFIX = "evo-cache-" + self.registration.scope,
  CACHE = PREFIX + VERSION;
const resolve = (p) => new URL(p, self.registration.scope).href;
const CORE = ["assets/ActivityState-CfmgoEok.js","assets/AssemblyTable-kF8-7qXa.js","assets/DigSite-DIEn5wh9.js","assets/LabHub-DAPVn79f.js","assets/LifeReveal-Crxmm6jM.js","assets/MissionSystem-C0d9rFCg.js","assets/MundoJurassico-BwIiUgty.js","assets/SpokenHint-BYH10c9i.js","assets/aventureiro/character-webp.json","assets/aventureiro/spritesheets/celebrate.webp","assets/aventureiro/spritesheets/locomotion.webp","assets/aventureiro/spritesheets/water.webp","assets/dataLoader-CMd0oSKD.js","assets/dialog-B3qL2I_L.js","assets/evoAvatar-DCwWZlt2.js","assets/index-CHyzHHN6.css","assets/index-_0WkUlYj.js","assets/three-Cz2SerDJ.js","credits.html","decoders/basis/basis_transcoder.js","decoders/basis/basis_transcoder.wasm","icons/apple-touch-icon-180.png","icons/icon-192.png","icons/icon-512.png","icons/icon-maskable-512.png","index.html","manifest.webmanifest"].map(resolve),
  ALLOWED = new Set(["THIRD_PARTY_NOTICES.txt","assets/ActivityState-CfmgoEok.js","assets/AssemblyTable-kF8-7qXa.js","assets/DigSite-DIEn5wh9.js","assets/LabHub-DAPVn79f.js","assets/LifeReveal-Crxmm6jM.js","assets/MissionSystem-C0d9rFCg.js","assets/MundoJurassico-BwIiUgty.js","assets/SpokenHint-BYH10c9i.js","assets/aventureiro/character-webp.json","assets/aventureiro/spritesheets/celebrate.webp","assets/aventureiro/spritesheets/climb.webp","assets/aventureiro/spritesheets/crouch.webp","assets/aventureiro/spritesheets/jump.webp","assets/aventureiro/spritesheets/locomotion.webp","assets/aventureiro/spritesheets/reactions.webp","assets/aventureiro/spritesheets/run_turn.webp","assets/aventureiro/spritesheets/water.webp","assets/dataLoader-CMd0oSKD.js","assets/dialog-B3qL2I_L.js","assets/evoAvatar-DCwWZlt2.js","assets/index-CHyzHHN6.css","assets/index-_0WkUlYj.js","assets/optimized/allosaurus-lod0.glb","assets/optimized/allosaurus-lod1.glb","assets/optimized/allosaurus-lod2.glb","assets/optimized/apatosaurus-lod0.glb","assets/optimized/apatosaurus-lod1.glb","assets/optimized/apatosaurus-lod2.glb","assets/optimized/brachiosaurus-lod0.glb","assets/optimized/brachiosaurus-lod1.glb","assets/optimized/brachiosaurus-lod2.glb","assets/optimized/camp-lod0.glb","assets/optimized/dilophosaurus-lod0.glb","assets/optimized/dilophosaurus-lod1.glb","assets/optimized/dilophosaurus-lod2.glb","assets/optimized/rock-lod0.glb","assets/optimized/rock-lod1.glb","assets/optimized/rock-lod2.glb","assets/optimized/stegosaurus-lod0.glb","assets/optimized/stegosaurus-lod1.glb","assets/optimized/stegosaurus-lod2.glb","assets/optimized/tree-lod0.glb","assets/optimized/tree-lod1.glb","assets/optimized/tree-lod2.glb","assets/three-Cz2SerDJ.js","credits.html","decoders/basis/basis_transcoder.js","decoders/basis/basis_transcoder.wasm","icons/apple-touch-icon-180.png","icons/icon-192.png","icons/icon-512.png","icons/icon-maskable-512.png","index.html","manifest.webmanifest"].map(resolve));
self.addEventListener("install", (event) =>
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE))),
);
self.addEventListener("activate", (event) =>
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith(PREFIX) && k !== CACHE)
            .map((k) => caches.delete(k)),
        ),
      )
      // Take over the page that registered us. Without this a first visit
      // installs the worker but is never controlled by it, so a child who
      // opens the game once and then loses the network gets nothing on the
      // next launch despite a full cache. There is no skipWaiting to go with
      // it, so an update still waits for old tabs to close.
      .then(() => self.clients.claim()),
  ),
);
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(
        async () =>
          (await (await caches.open(CACHE)).match(resolve("index.html"))) ||
          Response.error(),
      ),
    );
    return;
  }
  if (!ALLOWED.has(url.href)) return;
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE),
        hit = await cache.match(request);
      if (hit) return hit;
      const response = await fetch(request);
      if (response.ok)
        try {
          await cache.put(request, response.clone());
        } catch {
          /* Quota failure must never prevent play. */
        }
      return response;
    })(),
  );
});
