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
cc.sats.addFromTleUrl("data/tle/norad/grus.txt", ["GRUS"]);

fetch("https://docs.google.com/spreadsheets/d/1qz_FSOBoqgi-rBA6LwoK896RLhzQg_A1aESXnd0bdgA/gviz/tq?tqx=out:csv")
  .then((res) => res.text())
  .then((csv) => {
    const lines = csv.trim().split("\n");
    // Skip header
    for (let i = 1; i < lines.length; i++) {
      const [name, norad, tle1, tle2] = lines[i].replaceAll("\"", "").split(",");
      if (name && tle1 && tle2) {
        cc.sats.addFromTle(
          `${name}\n${tle1}\n${tle2}`,
          ["GRUS"],
          {},
        );
      }
    }
  }
  );
cc.setGroundStationFromLatLon("78.229772, 15.407786", "KSAT Svalbard"); // KSAT Svalbard

// cc.sats.enableTag("VSP");
cc.sats.enableTag("GRUS");
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
