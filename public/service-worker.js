import { ActionSettingsEthernet } from "material-ui/svg-icons";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("react-pwa-v1").then(cache => {
      fetch("asset-manifest.json")
        .then(resp => resp.json())
        .then(assets => {
          cache.addAll([
            "/",
            "https://fonts.googleapis.com/css?family=Roboto:300,400,500",
            assets["main.js"],
            assets["main.css"],
            assets["static/media/logo.svg"]
          ]);
        });
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      if (resp) return resp;
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== "react-pwa-1") {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
