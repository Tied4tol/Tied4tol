const CACHE = "tienda-v1";
const ARCHIVOS = [
    "/Tied4tol/",
    "/Tied4tol/index.html",
    "/Tied4tol/registro.html",
    "/Tied4tol/catalogo.html",
    "/Tied4tol/css/estilos.css",
    "/Tied4tol/js/auth.js",
    "/Tied4tol/icono-192.png",
    "/Tied4tol/icono-512.png",
    "/Tied4tol/manifest.json"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(ARCHIVOS))
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE).map(key => caches.delete(key))
            )
        )
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(res => res || fetch(event.request))
    );
});
