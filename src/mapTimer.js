"use strict";

// const mymap = L.map("mapid").setView([51.505, -0.09], 13);
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution:
//     'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//   maxZoom: 13,
//   id: "mapbox/streets-v11",
//   tileSize: 512,
//   zoomOffset: -1,
//   accessToken: "your.mapbox.access.token",
// }).addTo(mymap);
// const marker = L.marker([51.5, -0.09]).addTo(mymap);

class Timer {
  timerUpdateInterval = 1000;
  expectedFunctionExecutionTime;
  pause = false;
  timeCounter;
  timeCounterPause;
  runPath = [];

  constructor(runTime) {
    this.runTime = runTime * 60 * 1000;
    this.permTimeCounter = this.runTime;

    // Attach event handlers
    console.log("Constructor is running");
    document
      .querySelector(".timerpause")
      .addEventListener("click", this.activatePauseBtn.bind(this));
    document
      .querySelector(".timerstart")
      .addEventListener("click", this.activateStartBtn.bind(this));
  }

  activatePauseBtn() {
    this.visibleStart(true);
    this.visiblePause(false);
    this.timeCounterPause = this.timeCounter;
    this.pause = true;
  }

  activateStartBtn() {
    console.log("Start clicked!");
    this.visibleStart(false);
    this.visiblePause(true);

    //// Activate lag baseline //////////
    this.expectedFunctionExecutionTime = Date.now() + this.timerUpdateInterval;

    /////////////////////////////////

    if (this.pause === true) {
      this.timeCounter = this.timeCounterPause;
    } else {
      this.timeCounter = 0;
    }
    this.pause = false;

    setTimeout(this.updateTimer(), this.timerUpdateInterval, this);
    // setTimeout(function () {
    //   generateMilli(pause, milliGeneratorSwitch);
    // }, 10);
  }

  displayCountUp() {
    console.log("Countup Timer activated");
    let [minutes, seconds] = this.toMinutesSeconds(this.timeCounter);
    console.log(`Count up time:  ${minutes} : ${seconds}`);

    document.querySelector(".secten").textContent = `${this.addZeroSecNew(minutes).slice(0, 1)}`;
    document.querySelector(".secone").textContent = `${this.addZeroSecNew(minutes).slice(1, 2)}`;

    document.querySelector(".milliten").textContent = `${this.addZeroSecNew(seconds).slice(0, 1)}`;
    document.querySelector(".millione").textContent = `${this.addZeroSecNew(seconds).slice(1, 2)}`;
  }

  displayCountDown() {
    console.log(`Timer Counter Check:  ${this.permTimeCounter} : ${this.timeCounter}`);
    let [minutes, seconds] = this.toMinutesSeconds(this.permTimeCounter - this.timeCounter);
    console.log(`Count down time:  ${minutes} : ${seconds}`);
    document.querySelector(".timermin").textContent = `${minutes}:${this.addZeroSecNew(seconds)}`;
  }

  visibleStart(status) {
    if (status) {
      document.querySelector(".timerstart").classList.remove("disabled");
    } else {
      document.querySelector(".timerstart").classList.add("disabled");
    }
  }

  visiblePause(status) {
    if (status) {
      document.querySelector(".timerpause").classList.remove("disabled");
    } else {
      document.querySelector(".timerpause").classList.add("disabled");
    }
  }

  toMinutesSeconds(milliseconds) {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds - minutes * 1000 * 60) / 1000);
    return [minutes, seconds];
  }

  toSecondsMilli(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const millisecondsnew = milliseconds - seconds * 1000;
    return [seconds, millisecondsnew];
  }

  toMinutesSecondsMilli(milliseconds) {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds - minutes * 1000 * 60) / 1000);
    const milli = milliseconds - minutes * 60 * 1000 - seconds * 1000;
    return [minutes, seconds, milli];
  }

  addZeroMilliNew(numchange) {
    return numchange.toString().padStart(3, "0");
  }

  addZeroSecNew(numchange) {
    return numchange.toString().padStart(2, "0");
  }

  updateTimer() {
    const lagTime = Date.now() - this.expectedFunctionExecutionTime;
    // console.log(
    //   `${lagTime} (Lag Time) = ${Date.now()} (Datenow) - ${
    //     this.expectedFunctionExecutionTime
    //   } (expected time)  Pace Time: ${this.paceTime} PaceCount: ${
    //     this.paceCount
    //   }   Pause: ${this.pause}`
    // );
    this.updateCountUp();
    this.updateCountdown();
    // this.updateRunPath();
    // displayPaceCount(this.paceCount);
    // displaySetCount(this.setCount);

    this.expectedFunctionExecutionTime += this.timerUpdateInterval;

    if (!this.pause) {
      setTimeout(this.updateTimer.bind(this), Math.max(0, this.timerUpdateInterval - lagTime));
    }
  }

  updateCountUp() {
    this.timeCounter += 1000;
    this.displayCountUp();
  }

  updateCountdown() {
    this.displayCountDown();
  }
}

let mymap;
let polyline;

navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(position);
    // console.log(latitude, longitude);

    const coords = [latitude, longitude];
    mymap = L.map("mapid").setView(coords, 17);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mymap);
    const marker = L.marker(coords).addTo(mymap).bindPopup("You are here!").openPopup();
    const latlngs = [[coords]];
    polyline = L.polyline(latlngs, { color: "red" }).addTo(mymap);

    // zoom the map to the polyline
    mymap.fitBounds(polyline.getBounds());
  },
  function () {
    alert("Failed to get your location");
  }
);

document.querySelector(".submitBtn").addEventListener("click", function (e) {
  e.preventDefault();
  const runTime = document.querySelector(".runTime").value;
  document.querySelector(".timerForm").classList.toggle("d-none");
  document.querySelector(".timer").classList.toggle("d-none");
  const timer = new Timer(runTime);
});
