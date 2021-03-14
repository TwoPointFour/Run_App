/////////////////////// Timer Function //////////////////////////////////
let expectsplit;

let milliGeneratorSwitch = false;

// expectsplit = permPaceTime * permnumdistset;
// expectsplitmin = Math.floor(expectsplit / (1000 * 60));
// expectsplitsec = Math.floor((expectsplit - expectsplitmin * 1000 * 60) / 1000);
const currentCallout = document.querySelector(".audioenable");

// const permPaceCount = distance / 100;

function callCallout(musicTune) {
  currentCallout.src = `${musicTune}.mp3`;
  currentCallout.play();
  console.log(`Callouts of ${musicTune} activated!`);
}

// DISPLAY FOR SECONDS TIMER --------------------------------------

// function convertedMinutes(milliseconds) {
//   return Math.floor(milliseconds / (1000 * 60));
//   // return Math.floor((milliseconds - convertedMinutes * 1000 * 60) / 1000);
// }

// function convertedSeconds(milliseconds) {
//   return Math.floor(
//     (milliseconds - convertedMinutes(milliseconds) * 60 * 1000) / 1000
//   );
// }

// function toMinutesSeconds(milliseconds) {
//   return [convertedMinutes(milliseconds), convertedSeconds(milliseconds)];
// }

// function toSecondsMilli(milliseconds) {
//   const convertedMilli =
//     milliseconds - convertedMinutes * 1000 * 60 - convertedSeconds * 1000;
//   return [convertedSeconds(milliseconds), convertedMilli];
// }

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

function displaySeconds(paceTime) {
  let [seconds, milliseconds] = toSecondsMilli(paceTime);

  // if (seconds <= 0) {
  //   document.querySelector(".secten").textContent = `0`
  // } else {
  //   document.querySelector(".secten").textContent = `${addZeroSecNew(seconds).toString().slice(0, 1)}`
  // }

  document.querySelector(".secten").textContent = `${seconds <= 0 ? `0` : `${addZeroSecNew(seconds).toString().slice(0, 1)}`}`;
  document.querySelector(".secone").textContent = `${seconds <= 0 ? `0` : `${addZeroSecNew(seconds).toString().slice(1, 2)}`}`;

  document.querySelector(".milliten").textContent = `${addZeroMilliNew(milliseconds).toString().slice(0, 1)}`;
  document.querySelector(".millione").textContent = `${addZeroMilliNew(milliseconds).toString().slice(1, 2)}`;
}

function displayMinutes(setTime, paceCount, paceTime, permPaceCount, milliGeneratorSwitch) {
  let [minutes, seconds] = toMinutesSeconds(setTime);
  if (paceCount >= permPaceCount && paceTime <= 0) {
    milliGeneratorSwitch = true; //// need to edit in the future - for generateMilli function
    document.querySelector(".timermin").classList.remove("smalltime");
    document.querySelector(".timermin").classList.add("resttime");
    document.querySelector(".timermin").textContent = `Rest\u00A0\u00A0\u00A0${minutes}:${addZeroSecNew(seconds)}`;
  } else {
    document.querySelector(".timermin").classList.add("smalltime");
    document.querySelector(".timermin").classList.remove("resttime");
    document.querySelector(".timermin").textContent = `${minutes}:${addZeroSecNew(seconds)}`;
  }
}

/*
0. Activate audio
1. Start clicked
2. updatePaceTimer()
    displayPaceTimer()
4. updateSetTimer()
    displaySetTimer()
6. getCallout()

== Non recursive ==
7. Pause clicked
8. Split clicked


*/
export function initialiseTimer(input) {
  // Start timer when "start" button clicked
  document.querySelector(".timerstart").addEventListener("click", function () {
    document.querySelector(".timerstart").classList.add("disabled");
    document.querySelector(".timerpause").classList.remove("disabled");
    let timerUpdateInterval = 20;
    let expectedFunctionExecutionTime = Date.now() + timerUpdateInterval;
    // test
    const { permSetCount, permDistance, permPaceTime, permSetTimeMin, permSetTimeSec } = input;
    const permSetTime = permSetTimeMin * 1000 * 60 + permSetTimeSec * 1000;
    const permPaceCount = permDistance / 100;
    let distance = permDistance;
    let paceTime = permPaceTime;
    let paceCount = 1;
    let setTime = permSetTime;
    let setCount = 1; // Numnber of Sets
    let pause = false;
    setTimeout(function () {
      updateCountdown(distance, paceTime, paceCount, setTime, setCount, permDistance, permPaceTime, permPaceCount, permSetTime, permSetCount, timerUpdateInterval, expectedFunctionExecutionTime, pause);
    }, timerUpdateInterval);
    // setTimeout(function () {
    //   generateMilli(pause, milliGeneratorSwitch);
    // }, 10);
  });
}

function updatePaceTimer(paceTime, paceCount, permPaceCount, permPaceTime, timerUpdateInterval) {
  // Logic to rundown set and pace time || also resets the pace timer for distance
  if (paceTime <= 0 && paceCount <= permPaceCount) {
    // starttimepace = Date.now();
    // Callouts for Pace
    callCallout(`callouts/${paceCount * 100}`);
    paceCount++;
    paceTime = permPaceTime - timerUpdateInterval;
  } else if (paceTime <= 0 && paceCount > permPaceCount) {
    paceTime = 0;
  } else {
    paceTime -= 20;
  }
  displaySeconds(paceTime);
  return [paceCount, paceTime];
}

function updateSetTimer(setTime, setCount, paceCount, paceTime, permPaceCount, permPaceTime, permSetCount, permSetTime, milliGeneratorSwitch) {
  if (setTime <= 0 && setCount < permSetCount) {
    // starttimeset = Date.now();
    // starttimepace = Date.now();
    paceCount = 1;
    paceTime = permPaceTime - 20;
    setTime = permSetTime - 20;
    setCount++;
    console.log(`values reset! paceCount: ${paceCount}, paceTime: ${paceTime} setTime: ${setTime}`);
  } else if (setCount >= permSetCount && setTime <= 0) {
    setTime = 0;
  } else {
    setTime -= 20;
  }
  displayMinutes(setTime, paceCount, paceTime, permPaceCount, milliGeneratorSwitch);

  if (paceCount == permPaceCount && 50 <= paceTime && paceTime <= 150) {
    setTimeout(function () {
      callCallout(`callouts/rest`);
    }, 1500);
  }

  const restarr = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50];

  for (const i of restarr) {
    if (i == setTime / 1000 && paceCount >= permPaceCount) {
      callCallout(`callouts/${i}`);
    }
  }

  if (7000 == setTime && paceCount >= permPaceCount) {
    callCallout(`callouts/starting`);
  }

  return [paceCount, paceTime, setTime, setCount];
}

function updateCountdown(distance, paceTime, paceCount, setTime, setCount, permDistance, permPaceTime, permPaceCount, permSetTime, permSetCount, timerUpdateInterval, expectedFunctionExecutionTime, pause) {
  const lagTime = Date.now() - expectedFunctionExecutionTime;
  console.log(`${lagTime} (Lag Time) = ${Date.now()} (Datenow) - ${expectedFunctionExecutionTime} (expected time)  Pace Time: ${paceTime} PaceCount: ${paceCount}   Pause: ${pause}`);
  [paceCount, paceTime] = updatePaceTimer(paceTime, paceCount, permPaceCount, permPaceTime, timerUpdateInterval);
  [paceCount, paceTime, setTime, setCount] = updateSetTimer(setTime, setCount, paceCount, paceTime, permPaceCount, permPaceTime, permSetCount, permSetTime, milliGeneratorSwitch);

  expectedFunctionExecutionTime += timerUpdateInterval;

  // Pause timer when "pause" button clicked
  document.querySelector(".timerpause").addEventListener("click", function () {
    document.querySelector(".timerstart").classList.remove("disabled");
    document.querySelector(".timerpause").classList.add("disabled");
    pause = true;
  });

  if (!pause) {
    setTimeout(function () {
      updateCountdown(distance, paceTime, paceCount, setTime, setCount, permDistance, permPaceTime, permPaceCount, permSetTime, permSetCount, timerUpdateInterval, expectedFunctionExecutionTime, pause);
    }, Math.max(0, timerUpdateInterval - lagTime));
  }
}

// function generateMilli(pause, milliGeneratorSwitch) {
//   document.querySelector(".millione").textContent = `${Math.floor(Math.random() * 10)}`;
//   if (!pause && !milliGeneratorSwitch) {
//     setTimeout(generateMilli, 10);
//   } else {
//     document.querySelector(".millione").textContent = "0";
//   }
// }

// // Record timing when "split" button clicked

// document.querySelector(".timersplit").addEventListener("click", function () {
//   const splittotal = permdistset - setTime;
//   const splitminutes = Math.floor(splittotal / (1000 * 60));
//   const splitseconds = Math.floor(
//     (splittotal - splitminutes * 1000 * 60) / 1000
//   );
//   const splitmilli =
//     splittotal - splitminutes * 1000 * 60 - splitseconds * 1000;

//   document.querySelector(".timerecord").innerHTML += `
//     <tr>
//       <th scope="row">${setCount}</th>
//       <td>${`${addZeroSec(splitminutes)}:${addZeroSec(splitseconds)}:${addZero(
//         splitmilli
//       )}`}</td>
//       <td>${`${addZero(expectsplitmin)}:${addZeroSec(expectsplitsec)}:00`}</td>
//     </tr>`;
// });

document.querySelector(".audioactivate").addEventListener("click", function () {
  currentCallout.play();
});

////// Timer Display Padding - should be replaced with built-in JS functions ////
function addZeroMilliNew(numchange) {
  return numchange.toString().padStart(3, "0");
}

function addZeroSecNew(numchange) {
  return numchange.toString().padStart(2, "0");
}
