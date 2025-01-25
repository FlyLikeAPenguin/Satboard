import Vue from "vue";
import { Workbox } from "workbox-window";
import * as Sentry from "@sentry/browser";

import App from "./App.vue";
import router from "./components/Router";

if (window.location.href.includes("satvis.space")) {
  Sentry.init({ dsn: "https://0c7d1a82eedb48ee8b83d87bf09ad144@sentry.io/1541793" });
}

const app = new Vue({
  el: "#app",
  components: {
    app: App,
  },
  render: (h) => h("app"),
  router,
});

// Export Vue for debugger
window.app = app;

/* global cc */
// cc.sats.addFromTleUrl("data/tle/norad/active.txt", ["Active"]);
cc.sats.addFromTleUrl("data/tle/norad/stations.txt", ["Stations"]);
cc.sats.addFromTleUrl("data/tle/norad/tle-new.txt", ["New"]);
// cc.sats.addFromTleUrl("data/tle/norad/grus.txt", ["GRUS"]);

// fetch("https://api.npoint.io/d27f495a2edadcefa497")
//   .then((res) => res.json())
//   .then((json) => {
//     Object.keys(json).forEach(function (key) {
//       const element = json[key];
//       cc.sats.addFromTle((`${element.display_name}\n${element.TLE1}\n${element.TLE2}`), element.groups, element.stats);
//     })
//   });
cc.setGroundStationFromLatLon("78.229772, 15.407786", "KSAT Svalbard"); // KSAT Svalbard

// cc.sats.enableTag("VSP");
cc.sats.enableTag("Stations");
// cc.sats.enableTag("GRUS");

// Register service worker
if ("serviceWorker" in navigator && !window.location.href.includes("localhost")) {
  const wb = new Workbox("sw.js");
  wb.addEventListener("controlling", (evt) => {
    if (evt.isUpdate) {
      console.log("Reloading page for latest content");
      window.location.reload();
    }
  });
  wb.register();
}
