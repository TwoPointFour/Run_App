("use strict");

function init() {
  console.log("init done");
}

window.onload = init;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log("SW Registered!");
      console.log(registration);
    })
    .catch((error) => {
      console.log("SW Registration FAILED");
      console.log(error);
    });
} else {
  console.log("application not supported");
}
