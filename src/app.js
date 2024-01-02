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
// cc.sats.addFromTleUrl("data/tle/norad/stations.txt", ["Stations"]);
// cc.sats.addFromTleUrl("data/tle/norad/tle-new.txt", ["New"]);
cc.sats.addFromTleUrl("data/tle/norad/grus.txt", ["GRUS"]);

fetch("data/pyxis.json")
  .then(res => res.json())
  .then(json => {
    cc.sats.addFromTle((json.PYXIS.display_name + '\n' + json.PYXIS.TLE1 + '\n' + json.PYXIS.TLE2), ["VSP"], json.PYXIS.stats)
    console.log(json)
  });

cc.sats.enableTag("VSP")

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
