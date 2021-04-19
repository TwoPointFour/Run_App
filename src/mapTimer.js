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

navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(position);
    console.log(latitude, longitude);

    const coords = [latitude, longitude];
    const mymap = L.map("mapid").setView(coords, 17);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mymap);
    const marker = L.marker(coords).addTo(mymap).bindPopup("You are here!").openPopup();
  },
  function () {
    alert("Failed to get your location");
  }
);

let runTime;

document.querySelector(".submitBtn").addEventListener("click", function (e) {
  e.preventDefault();
  runTime = document.querySelector(".runTime").value;
  console.log(runTime);
  document.querySelector(".timerForm").classList.toggle("d-none");
  document.querySelector(".timer").classList.toggle("d-none");
});

/////////////////////// Timer Function //////////////////////////////////

const currentCallout = document.querySelector(".audioenable");

///// Mathematical Helper Functions /////////////////

function toMinutesSeconds(milliseconds) {
  const minutes = Math.floor(milliseconds / (1000 * 60));
  const seconds = Math.floor((milliseconds - minutes * 1000 * 60) / 1000);
  return [minutes, seconds];
}

function toSecondsMilli(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const millisecondsnew = milliseconds - seconds * 1000;
  return [seconds, millisecondsnew];
}

function toMinutesSecondsMilli(milliseconds) {
  const minutes = Math.floor(milliseconds / (1000 * 60));
  const seconds = Math.floor((milliseconds - minutes * 1000 * 60) / 1000);
  const milli = milliseconds - minutes * 60 * 1000 - seconds * 1000;
  return [minutes, seconds, milli];
}

function dateGenerator() {
  let currDate = new Date();
  let formatDate = `${currDate.getDate()}/${currDate.getMonth() + 1}/${currDate.getFullYear()}`;
  console.log(formatDate);
  return formatDate;
}

////// Timer Display Padding - should be replaced with built-in JS functions ////
function addZeroMilliNew(numchange) {
  return numchange.toString().padStart(3, "0");
}

function addZeroSecNew(numchange) {
  return numchange.toString().padStart(2, "0");
}

export function initialiseTimer(input) {
  ///// Initialising Variables //////////////
  let timerUpdateInterval = 20;
  let expectedFunctionExecutionTime;
  let pause = false;
  let timeCounter;
  let timeCounterPause;
  const runData = new Map();

  variablePackage = {
    timerUpdateInterval,
    expectedFunctionExecutionTime,
    runData,
    pause,
    timeCounter,
  };

  ////// Callback functions for button presses /////////////

  activateStartBtn(variablePackage);
  activatePauseBtn(variablePackage);
  activateSplitBtn(variablePackage);
  activateSaveBtn(variablePackage);
  activateCompleteBtn(variablePackage);
  activateAudio();
  activateVolumeCtrl(variablePackage);
}

////// Buttons and effects /////////////////////

function activatePauseBtn(variablePackage) {
  document.querySelector(".timerpause").addEventListener("click", function () {
    visibleStart(true);
    visiblePause(false);
    variablePackage.timeCounterPause = variablePackage.timeCounter;
    variablePackage.pause = true;
  });
}

function activateStartBtn(variablePackage) {
  document.querySelector(".timerstart").addEventListener("click", function () {
    visibleStart(false);
    visiblePause(true);

    //// Activate lag baseline //////////
    variablePackage.expectedFunctionExecutionTime =
      Date.now() + variablePackage.timerUpdateInterval;

    /////////////////////////////////

    if (variablePackage.pause === true) {
      variablePackage.timeCounter = variablePackage.timeCounterPause;
    } else {
      variablePackage.timeCounter = 0;
    }
    variablePackage.pause = false;

    setTimeout(
      updateCountdown(variablePackage),
      variablePackage.timerUpdateInterval,
      variablePackage
    );
    // setTimeout(function () {
    //   generateMilli(pause, milliGeneratorSwitch);
    // }, 10);
  });
}

function activateSplitBtn(variablePackage) {}

function activateCompleteBtn() {}

function activateSaveBtn(variablePackage) {}

function saveBtnExecutor(variablePackage) {}

function trainingDetailsConstructor(variablePackage) {}

///////////// Display and Styles ////////////////////////

function displaySetCount(setCount) {}

function displayPaceCount(paceCount) {}

function displaySplitTime(variablePackage) {}

function visibleStart(status) {
  if (status) {
    document.querySelector(".timerstart").classList.remove("disabled");
  } else {
    document.querySelector(".timerstart").classList.add("disabled");
  }
}

function visiblePause(status) {
  if (status) {
    document.querySelector(".timerpause").classList.remove("disabled");
  } else {
    document.querySelector(".timerpause").classList.add("disabled");
  }
}

function displayCountUp(currentTime) {
  let [minutes, seconds] = toMinutesSeconds(currentTime);

  document.querySelector(".secten").textContent = `${addZeroSecNew(minutes).slice(0, 1)}`;
  document.querySelector(".secone").textContent = `${addZeroSecNew(minutes).slice(1, 2)}`;

  document.querySelector(".milliten").textContent = `${addZeroSecNew(seconds).slice(0, 1)}`;
  document.querySelector(".millione").textContent = `${addZeroSecNew(seconds).slice(1, 2)}`;
}

function displayCountDown(variablePackage, currentTime) {
  let [minutes, seconds] = toMinutesSeconds(currentTime);
  if (paceCount >= permPaceCount && paceTime <= 0) {
    document.querySelector(".timermin").classList.remove("smalltime");
    document.querySelector(".timermin").classList.add("resttime");
    document.querySelector(
      ".timermin"
    ).textContent = `Rest\u00A0\u00A0\u00A0${minutes}:${addZeroSecNew(seconds)}`;
  } else {
    document.querySelector(".timermin").classList.add("smalltime");
    document.querySelector(".timermin").classList.remove("resttime");
    document.querySelector(".timermin").textContent = `${minutes}:${addZeroSecNew(seconds)}`;
  }
}

///////////// Timer Updates ////////////////////////////
///////////// (Parent) /////////////////////////////

function updateCountdown(variablePackage) {
  const lagTime = Date.now() - variablePackage.expectedFunctionExecutionTime;
  // console.log(
  //   `${lagTime} (Lag Time) = ${Date.now()} (Datenow) - ${
  //     variablePackage.expectedFunctionExecutionTime
  //   } (expected time)  Pace Time: ${variablePackage.paceTime} PaceCount: ${
  //     variablePackage.paceCount
  //   }   Pause: ${variablePackage.pause}`
  // );
  updatePaceTimer(variablePackage);
  updateSetTimer(variablePackage);
  displayPaceCount(variablePackage.paceCount);
  displaySetCount(variablePackage.setCount);

  variablePackage.expectedFunctionExecutionTime += variablePackage.timerUpdateInterval;

  if (!variablePackage.pause) {
    setTimeout(function () {
      updateCountdown(variablePackage);
    }, Math.max(0, variablePackage.timerUpdateInterval - lagTime));
  }
}

///////////// Timer Updates ////////////////////////////
///////////// (Children) /////////////////////////////

function updatePaceTimer(variablePackage) {
  // Logic to rundown set and pace time || also resets the pace timer for distance
  if (variablePackage.paceTime <= 0 && variablePackage.paceCount < variablePackage.permPaceCount) {
    // starttimepace = Date.now();
    // Callouts for Pace
    variablePackage.paceCount++;
    callCallout(`callouts/${variablePackage.paceCount * 100}`);
    variablePackage.paceTime = variablePackage.permPaceTime - variablePackage.timerUpdateInterval;
  } else if (variablePackage.paceCount >= variablePackage.permPaceCount) {
    variablePackage.paceTime = 0;
  } else {
    variablePackage.paceTime -= 20;
  }
  displaySeconds(variablePackage.paceTime);
}

function updateSetTimer(variablePackage) {
  if (variablePackage.setTime <= 0 && variablePackage.setCount < variablePackage.permSetCount) {
    // starttimeset = Date.now();
    // starttimepace = Date.now();
    variablePackage.paceCount = 0;
    variablePackage.paceTime = variablePackage.permPaceTime - 20;
    variablePackage.setTime = variablePackage.permSetTime - 20;
    variablePackage.setCount++;
  } else if (
    variablePackage.setCount >= variablePackage.permSetCount &&
    variablePackage.setTime <= 0
  ) {
    variablePackage.setTime = 0;
  } else {
    variablePackage.setTime -= 20;
  }
  displayMinutes(
    variablePackage.setTime,
    variablePackage.paceCount,
    variablePackage.paceTime,
    variablePackage.permPaceCount
  );

  restCallouts(variablePackage);
}

////////////////// Misc Callouts //////////////////
function callCallout(musicTune) {
  currentCallout.src = `${musicTune}.mp3`;
  currentCallout.play();
  console.log(`Callouts of ${musicTune} activated!`);
}

function restCallouts(variablePackage) {
  if (
    variablePackage.paceCount === variablePackage.permPaceCount - 1 &&
    50 <= variablePackage.paceTime &&
    variablePackage.paceTime <= 150
  ) {
    setTimeout(function () {
      callCallout(`callouts/rest`);
    }, 1500);
  }

  const restarr = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50];

  for (const i of restarr) {
    if (
      i == variablePackage.setTime / 1000 &&
      variablePackage.paceCount >= variablePackage.permPaceCount
    ) {
      callCallout(`callouts/${i}`);
    }
  }

  if (
    7000 == variablePackage.setTime &&
    variablePackage.paceCount >= variablePackage.permPaceCount
  ) {
    callCallout(`callouts/starting`);
  }
}
function activateAudio() {
  document.querySelector(".audioactivate").addEventListener("click", function () {
    currentCallout.play();
  });
}

function activateVolumeCtrl(variablePackage) {
  document.querySelector(".audioenable").addEventListener("volumechange", function () {
    const splitSetTime = variablePackage.permSetTime - variablePackage.setTime;
    variablePackage.runData.set(variablePackage.setCount, splitSetTime);

    const [minutes, seconds, milli] = toMinutesSecondsMilli(splitSetTime);

    displaySplitTime(variablePackage, minutes, seconds, milli);
  });
}
