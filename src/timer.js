/////////////////////// Timer Function //////////////////////////////////
let currentcallout = document.querySelector(".audioenable");
let tempdt = 0;
let ddt;
let expectsplit;

let pause;
let restswitch = false;

expectsplit = permdistpace * permnumdistset;
expectsplitmin = Math.floor(expectsplit / (1000 * 60));
expectsplitsec = Math.floor((expectsplit - expectsplitmin * 1000 * 60) / 1000);

const distrepcount = 1;

const numdistset = distdistance / 100;
const distset = distsetmin * 1000 * 60 + distsetsec * 1000;

export function initialiseTimer(
  distRepetition,
  distDistance,
  distPace,
  distSetMin,
  distSetSec
) {
  // Start timer when "start" button clicked
  document.querySelector(".timerstart").addEventListener("click", function () {
    document.querySelector(".timerstart").classList.add("disabled");
    document.querySelector(".timerpause").classList.remove("disabled");
    let timeJump = 100;
    let expJump = Date.now(0) + timeJump;
    setTimeout(
      updateCountdown(
        distRepetition,
        distDistance,
        distPace,
        distSetMin,
        distSetSec,
        timeJump,
        expJump
      ),
      timeJump
    );
    setTimeout(generateMilli, 10);
    pause = false;
  });
}

const resetPaceTimer = () => {
  // Logic to rundown set and pace time || also resets the pace timer for distance
  if (distpace <= 0 && pacecount < numdistset) {
    // starttimepace = Date.now();
    // Callouts for Pace
    currentcallout.src = `callouts/${pacecount * 100}.mp3`;
    currentcallout.play();
    pacecount++;
    distpace = permdistpace - tiJejump;

    // deltatimepace = Date.now() - starttimepace;
    // distpace = permdistpace - deltatimepace;
  } else if (pacecount >= numdistset && distpace <= 0) {
    distpace = 0;
  } else {
    distpace -= 100;
  }
  return { pacecount, distpace };
};

updateCountdown = function (
  distRepetition,
  distDistance,
  distPace,
  distSetMin,
  distSetSec,
  timeJump,
  expJump
) {
  let dt = Date.now() - expJump;

  const pacecount = 1;
  resetPaceTimer();
  // EXECUTION CODE STARTS HERE ---------------------

  // Logic to reset the set timer for repetitions
  if (distset <= 0 && distrepcount < distrepetition) {
    // starttimeset = Date.now();
    // starttimepace = Date.now();
    pacecount = permpacecount;
    distdistance = permdistdistance;
    numdistset = permnumdistset;
    distpace = permdistpace - 100;
    distsetmin = permdistsetmin;
    distsetsec = permdistsetsec;
    distset = permdistset - 100;
    distrepcount++;
  } else if (distrepcount >= distrepetition && distset <= 0) {
    distset = 0;
  } else {
    distset -= 100;
  }

  // Logic to convert bulk milliseconds into Minutes: Seconds: Milliseconds

  const paceseconds = Math.floor(distpace / 1000);
  const pacesecondscut = addzerosec(paceseconds);
  const pacemilli = distpace - paceseconds * 1000;
  const pacemillicut = addzero(pacemilli);
  const setminutes = Math.floor(distset / (1000 * 60));
  const setseconds = Math.floor((distset - setminutes * 1000 * 60) / 1000);
  // Seconds cut adds a 0 in front of the number when the number of seconds fall below 10
  const setsecondscut = addzerosec(setseconds);
  const setmilli = distset - setminutes * 1000 * 60 - setseconds * 1000;
  // Millicut adds a 0 in front of the number when the number of milliseconds fall below 10
  // -------- CALL OUTS FOR REST -------------------------
  if (
    paceseconds == 0 &&
    `${pacemillicut.toString().slice(0, 1)}` == `1` &&
    pacecount >= numdistset
  ) {
    currentcallout.src = `callouts/rest.mp3`;
    currentcallout.play();
  }

  const restarr = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50];

  for (const i of restarr) {
    if (i == distset / 1000 && pacecount >= numdistset) {
      currentcallout.src = `callouts/${i}.mp3`;
      currentcallout.play();
    }
  }

  if (7000 == distset && pacecount >= numdistset) {
    currentcallout.src = `callouts/starting.mp3`;
    currentcallout.play();
  }

  // DISPLAY FOR MINUTES TIMER - SHOW REST when run time complete ---------
  if (pacecount >= numdistset && distpace <= 0) {
    restswitch = true;
    document.querySelector(".timermin").classList.remove("smalltime");
    document.querySelector(".timermin").classList.add("resttime");
    document.querySelector(
      ".timermin"
    ).textContent = `Rest\u00A0\u00A0\u00A0${setminutes}:${setsecondscut}`;
  } else {
    document.querySelector(".timermin").classList.add("smalltime");
    document.querySelector(".timermin").classList.remove("resttime");
    document.querySelector(
      ".timermin"
    ).textContent = `${setminutes}:${setsecondscut}`;
  }

  // DISPLAY FOR SECONDS TIMER --------------------------------------
  document.querySelector(".secten").textContent = `${
    paceseconds <= 0 ? `0` : pacesecondscut.toString().slice(0, 1)
  }`;
  document.querySelector(".secone").textContent = `${
    paceseconds <= 0 ? `0` : `${pacesecondscut.toString().slice(1, 2)}`
  }`;

  document.querySelector(
    ".milliten"
  ).textContent = `${pacemillicut.toString().slice(0, 1)}`;
  // document.querySelector(
  //   ".millione"
  // ).textContent = `${pacemillicut.toString().slice(1, 2)}`;

  //DISPLAY FOR PACE AND DISTANCE COUNT ----------------------------
  document.querySelector(".currdist").textContent = `${pacecount * 100}m`;
  document.querySelector(".currrep").textContent = `${distrepcount}`;
  // -------------- Execution Code ENDS HERE --------------------------

  expJump += timeJump;
  if (!pause) {
    setTimeout(updateCountdown, Math.max(0, timeJump - dt));
  }
};

generateMilli = function () {
  document.querySelector(".millione").textContent = `${Math.floor(
    Math.random() * 10
  )}`;
  if (!pause && !restswitch) {
    setTimeout(generateMilli, 10);
  } else {
    document.querySelector(".millione").textContent = "0";
  }
};

// Pause timer when "pause" button clicked
document.querySelector(".timerpause").addEventListener("click", function () {
  document.querySelector(".timerstart").classList.remove("disabled");
  document.querySelector(".timerpause").classList.add("disabled");
  pause = true;
});

// Record timing when "split" button clicked

document.querySelector(".timersplit").addEventListener("click", function () {
  const splittotal = permdistset - distset;
  const splitminutes = Math.floor(splittotal / (1000 * 60));
  const splitseconds = Math.floor(
    (splittotal - splitminutes * 1000 * 60) / 1000
  );
  const splitmilli =
    splittotal - splitminutes * 1000 * 60 - splitseconds * 1000;

  document.querySelector(".timerecord").innerHTML += `
    <tr>
      <th scope="row">${distrepcount}</th>
      <td>${`${addzerosec(splitminutes)}:${addzerosec(splitseconds)}:${addzero(
        splitmilli
      )}`}</td>
      <td>${`${addzero(expectsplitmin)}:${addzerosec(expectsplitsec)}:00`}</td>
    </tr>`;
});

document.querySelector(".audioactivate").addEventListener("click", function () {
  currentcallout.play();
});

////// Timer Display Padding - should be replaced with built-in JS functions ////
addzero = (numchange) => {
  if (numchange.toString().length == 3) {
    numchange = numchange.toString().slice(0, -1);
  } else if (numchange.toString().length == 2) {
    numchange = `0${numchange.toString().slice(0, 1)}`;
  } else if (numchange.toString().length == 1) {
    numchange = `00`;
  }
  return numchange;
};

addzerosec = (numchange) => {
  if (numchange.toString().length == 1) {
    numchange = `0${numchange}`;
  }
  return numchange;
};
