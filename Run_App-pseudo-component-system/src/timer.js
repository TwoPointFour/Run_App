import { account_1 } from "./script.js";
export let variablePackage = {};
export let trainingInfo;
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
  const { permSetCount, permDistance, permPaceTime, permSetTimeMin, permSetTimeSec } = input;
  const permSetTime = permSetTimeMin * 1000 * 60 + permSetTimeSec * 1000;
  const permPaceCount = permDistance / 100;
  let distance = permDistance;
  let paceTime = permPaceTime;
  let paceCount = permPaceCount;
  let setTime = permSetTime;
  let setCount = permSetCount;
  let trainingDate = dateGenerator();
  let pause;
  let pauseDistance;
  let pausePaceTime;
  let pausePaceCount;
  let pauseSetTime;
  let pauseSetCount;
  const runData = new Map();

  variablePackage = {
    trainingDate,
    timerUpdateInterval,
    expectedFunctionExecutionTime,
    permSetCount,
    permDistance,
    permPaceTime,
    permSetTimeMin,
    permSetTimeSec,
    permSetTime,
    permPaceCount,
    distance,
    paceTime,
    paceCount,
    setTime,
    setCount,
    pause,
    pauseDistance,
    pausePaceTime,
    pausePaceCount,
    pauseSetTime,
    pauseSetCount,
    runData,
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
    variablePackage.pause = true;
    variablePackage.pauseDistance = variablePackage.distance;
    variablePackage.pausePaceTime = variablePackage.paceTime;
    variablePackage.pausePaceCount = variablePackage.paceCount;
    variablePackage.pauseSetTime = variablePackage.setTime;
    variablePackage.pauseSetCount = variablePackage.setCount;
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
      variablePackage.distance = variablePackage.pauseDistance;
      variablePackage.paceTime = variablePackage.pausePaceTime;
      variablePackage.paceCount = variablePackage.pausePaceCount;
      variablePackage.setTime = variablePackage.pauseSetTime;
      variablePackage.setCount = variablePackage.pauseSetCount;
    } else {
      variablePackage.distance = variablePackage.permDistance;
      variablePackage.paceTime = variablePackage.permPaceTime;
      variablePackage.paceCount = 0;
      variablePackage.setTime = variablePackage.permSetTime;
      variablePackage.setCount = 1;
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

function activateSplitBtn(variablePackage) {
  document.querySelector(".timersplit").addEventListener("click", function () {
    const splitSetTime = variablePackage.permSetTime - variablePackage.setTime;
    variablePackage.runData.set(variablePackage.setCount, splitSetTime);

    const [minutes, seconds, milli] = toMinutesSecondsMilli(splitSetTime);

    displaySplitTime(variablePackage, minutes, seconds, milli);
    console.log(variablePackage);
  });
}

function activateCompleteBtn() {
  document.querySelector(".completeTraining").addEventListener("click", function () {
    document.querySelector(".trainingDataTable").innerHTML = `
    <table class="table">
    <thread>
      <tr>
        <th scope="col">Set</th>
        <th scope="col">Time</th>
        <th scope="col">Target</th>
      </tr>
    </thread>
    <tbody class="timerecord"></tbody>
  </table>`;
  });
}

function activateSaveBtn(variablePackage) {
  document
    .querySelector(".saveTraining")
    .addEventListener("click", saveBtnExecutor.bind(null, variablePackage));
}

function saveBtnExecutor(variablePackage) {
  const urlOutput = trainingDetailsConstructor(variablePackage);
  document.querySelector(".completeTraining").href = urlOutput;
}

function trainingDetailsConstructor(variablePackage) {
  let urlOutput = `track.html?trainingDate=${variablePackage.trainingDate}&permSetCount=${variablePackage.permSetCount}&permDistance=${variablePackage.permDistance}&permPaceTime=${variablePackage.permPaceTime}&permSetTimeMin=${variablePackage.permSetTimeMin}&permSetTimeSec=${variablePackage.permSetTimeSec}`;
  for (const [key, value] of variablePackage.runData) {
    urlOutput += `&${key}=${value}`;
  }
  return urlOutput;
}

///////////// Display and Styles ////////////////////////

function displaySetCount(setCount) {
  document.querySelector(".currrep").textContent = setCount;
}

function displayPaceCount(paceCount) {
  document.querySelector(".currdist").textContent = `${paceCount * 100}m`;
}

function displaySplitTime(variablePackage, minutes, seconds, milli) {
  document.querySelector(".timerecord").innerHTML += `
  <tr>
    <th scope="row">${variablePackage.setCount}</th>
    <td>${`${addZeroSecNew(minutes)}:${addZeroSecNew(seconds)}:${addZeroMilliNew(milli).slice(
      0,
      2
    )}`}</td>
    <td>No Target Set</td>
  </tr>`;
}

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

function displaySeconds(paceTime) {
  let [seconds, milliseconds] = toSecondsMilli(paceTime);

  document.querySelector(".secten").textContent = `${
    seconds <= 0 ? `0` : `${addZeroSecNew(seconds).toString().slice(0, 1)}`
  }`;
  document.querySelector(".secone").textContent = `${
    seconds <= 0 ? `0` : `${addZeroSecNew(seconds).toString().slice(1, 2)}`
  }`;

  document.querySelector(".milliten").textContent = `${addZeroMilliNew(milliseconds)
    .toString()
    .slice(0, 1)}`;
  document.querySelector(".millione").textContent = `${addZeroMilliNew(milliseconds)
    .toString()
    .slice(1, 2)}`;
}

function displayMinutes(setTime, paceCount, paceTime, permPaceCount) {
  let [minutes, seconds] = toMinutesSeconds(setTime);
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
