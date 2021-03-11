/////// Buttons and hiding elements

const timedBtn = document.querySelector(".timed");
const distanceBtn = document.querySelector(".distance");
const TypeChoice = document.querySelector(".TypeChoice");
const DistanceForm = document.querySelector(".DistanceForm");
const TimedForm = document.querySelector(".TimedForm");
const BackBtn1 = document.querySelector(".back1");
const BackBtn2 = document.querySelector(".back2");

const TimedSubmit = document.querySelector(".timedsubmit");
const DistanceSubmit = document.querySelector(".distancesubmit");

const TimedTimer = document.querySelector(".TimedTimer");
const DistanceTimer = document.querySelector(".DistanceTimer");

const backtt = document.querySelector(".backtt");
const backdt = document.querySelector(".backdt");

timedBtn.addEventListener("click", function () {
  TypeChoice.classList.add("d-none");
  TimedForm.classList.remove("d-none");
});

distanceBtn.addEventListener("click", function () {
  TypeChoice.classList.add("d-none");
  DistanceForm.classList.remove("d-none");
});

BackBtn1.addEventListener("click", function () {
  TypeChoice.classList.remove("d-none");
  DistanceForm.classList.add("d-none");
  TimedForm.classList.add("d-none");
});

BackBtn2.addEventListener("click", function () {
  TypeChoice.classList.remove("d-none");
  DistanceForm.classList.add("d-none");
  TimedForm.classList.add("d-none");
});

TimedSubmit.addEventListener("click", function () {
  TimedForm.classList.add("d-none");
  TimedTimer.classList.remove("d-none");
});

DistanceSubmit.addEventListener("click", function () {
  DistanceForm.classList.add("d-none");
  DistanceTimer.classList.remove("d-none");
});

backdt.addEventListener("click", function () {
  DistanceForm.classList.remove("d-none");
  DistanceTimer.classList.add("d-none");
});

backtt.addEventListener("click", function () {
  TimedForm.classList.remove("d-none");
  TimedTimer.classList.add("d-none");
});

/////////////////////// Timer Function //////////////////////////////////

// timer = {
//   StartingMinutes: 2,
//   StartingSeconds: 30,
//   StartingMilli: 888,
//   time() {
//     return (
//       this.StartingMilli +
//       this.StartingMinutes * 1000 * 60 +
//       this.StartingSeconds * 1000
//     );
//   },
//   timerfunc() {
//     const minutes = Math.floor(this.time() / (1000 * 60));
//     const seconds = Math.floor((this.time() - minutes * 1000 * 60) / 1000);
//     // Seconds cut adds a 0 in front of the number when the number of seconds fall below 10
//     const secondscut = seconds < 10 ? `0${seconds}` : seconds;
//     const milli = this.time() - minutes * 1000 * 60 - seconds * 1000;
//     // Millicut adds a 0 in front of the number when the number of milliseconds fall below 10
//     const millicut =
//       Number(milli.toString().slice(0, -1)) < 10
//         ? `0${milli.toString().slice(0, -1)}`
//         : `${milli.toString().slice(0, -1)}`;
//     document.querySelector(
//       ".timermin"
//     ).textContent = `${minutes}:${secondscut}`;
//     document.querySelector(
//       ".timersec"
//     ).textContent = `${secondscut}:${millicut}`;
//     this.time() -= 10;
//   },
// };

// console.log(
//   timer.time(),
//   timer.StartingMinutes,
//   timer.StartingSeconds,
//   timer.StartingMilli
// );

let distrepetition;
let distdistance;
let distpace;
let distsetmin;
let distsetsec;
let distset;
let expectsplit;
let numdistset;
let pacecount;
let distrepcount;
let disttime;
let starttime;
let starttimepace;
let starttimeset;
let tempdeltaset;
let tempdeltapace;
let deltatimeset;
let deltatimepace;
let timejump;
let expjump;
let pause;
let restswitch = false;

let tempdt = 0;
let ddt;

let permdistrepetition;
let permdistrepcount;
let permpacecount;
let permdistdistance;
let permnumdistset;
let permdistpace;
let permdistsetmin;
let permdistsetsec;
let permdistset;

// function unlockAudio() {
//   const soundarr = [
//     1,
//     2,
//     3,
//     4,
//     5,
//     10,
//     20,
//     30,
//     40,
//     50,
//     60,
//     70,
//     80,
//     90,
//     100,
//     200,
//     300,
//     400,
//     500,
//     600,
//     700,
//     800,
//     900,
//     1000,
//     1100,
//     1200,
//     1300,
//     1400,
//     1500,
//     1600,
//     1700,
//     1800,
//     1900,
//     2000,
//     2100,
//     2200,
//     2300,
//     2400,
//     "rest",
//     "starting",
//   ];
//   for (const k of soundarr) {
//     const sound = new Audio(`callouts/${k}.mp3`);
//     sound.play();
//     sound.pause();
//     sound.currentTime = 0;
//   }
// }

// unlockAudiotest = () => {

//     soundtest.pause();
//     soundtest.currentTime = 0;
// }

// let soundtest;

// document.querySelector(".audioenable").addEventListener("click", function () {
//   currentcallout = new Audio(`callouts/100.mp3`);
//   currentcallout.play();
// });

let currentcallout = document.querySelector(".audioenable");

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

document.querySelector(".audioactivate").addEventListener("click", function () {
  currentcallout.play();
});

document
  .querySelector(".distancesubmit")
  .addEventListener("click", function () {
    distrepetition = Number(document.querySelector("#distrepetition").value);
    distrepcount = 1;
    pacecount = 1;
    distdistance = Number(document.querySelector("#distdistance").value);
    numdistset = distdistance / 100;
    distpace = Number(document.querySelector("#distpace").value) * 1000;
    distsetmin = Number(document.querySelector("#distsetmin").value);
    distsetsec = Number(document.querySelector("#distsetsec").value);
    distset = distsetmin * 1000 * 60 + distsetsec * 1000;

    permdistrepetition = Number(
      document.querySelector("#distrepetition").value
    );
    permdistrepcount = 1;
    permpacecount = 1;
    permdistdistance = Number(document.querySelector("#distdistance").value);
    permnumdistset = distdistance / 100;
    permdistpace = Number(document.querySelector("#distpace").value) * 1000;
    permdistsetmin = Number(document.querySelector("#distsetmin").value);
    permdistsetsec = Number(document.querySelector("#distsetsec").value);
    permdistset = distsetmin * 1000 * 60 + distsetsec * 1000;
    expectsplit = permdistpace * permnumdistset;
    expectsplitmin = Math.floor(expectsplit / (1000 * 60));
    expectsplitsec = Math.floor(
      (expectsplit - expectsplitmin * 1000 * 60) / 1000
    );
  });

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

updateCountdown = function () {
  let dt = Date.now() - expjump;

  // ddt = dt - tempdt;
  // tempdt = dt;

  // document.querySelector(".timerecord").innerHTML += `
  // <tr>
  //   <th scope="row">${Date.now()}</th>
  //   <td>${dt}</td>
  //   <td>${ddt}</td>
  // </tr>`;

  // EXECUTION CODE STARTS HERE ---------------------

  // Diff between time of function execution and timer started
  deltatimeset = Date.now() - starttimeset;
  deltatimepace = Date.now() - starttimepace;

  // Logic to rundown set and pace time || also resets the pace timer for distance
  if (distpace <= 0 && pacecount < numdistset) {
    starttimepace = Date.now();
    // Callouts for Pace
    currentcallout.src = `callouts/${pacecount * 100}.mp3`;
    currentcallout.play();
    pacecount++;

    deltatimepace = Date.now() - starttimepace;
    distpace = permdistpace - deltatimepace;
  } else if (pacecount >= numdistset && distpace <= 0) {
    distpace = 0;
  } else {
    distpace -= 100;
  }

  // Logic to reset the set timer for repetitions
  if (distset <= 0 && distrepcount < distrepetition) {
    starttimeset = Date.now();
    starttimepace = Date.now();
    pacecount = permpacecount;
    distdistance = permdistdistance;
    numdistset = permnumdistset;
    distpace = permdistpace;
    distsetmin = permdistsetmin;
    distsetsec = permdistsetsec;
    distset = permdistset;
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

  expjump += timejump;
  if (!pause) {
    setTimeout(updateCountdown, Math.max(0, timejump - dt));
  }
};

// Start timer when "start" button clicked
document.querySelector(".timerstart").addEventListener("click", function () {
  document.querySelector(".timerstart").classList.add("disabled");
  document.querySelector(".timerpause").classList.remove("disabled");
  timejump = 100;
  expjump = Date.now(0) + timejump;
  setTimeout(updateCountdown, timejump);
  setTimeout(generateMilli, 10);
  pause = false;
});

// Pause timer when "pause" button clicked
document.querySelector(".timerpause").addEventListener("click", function () {
  document.querySelector(".timerstart").classList.remove("disabled");
  document.querySelector(".timerpause").classList.add("disabled");
  pause = true;
});

document.querySelector(".timersplit").addEventListener("click", function () {
  const splittotal = permdistset - distset;
  const splitminutes = addzero(Math.floor(splittotal / (1000 * 60)));
  const splitseconds = addzero(
    Math.floor((splittotal - splitminutes * 1000 * 60) / 1000)
  );
  const splitmilli = addzero(
    splittotal - splitminutes * 1000 * 60 - splitseconds * 1000
  );

  document.querySelector(".timerecord").innerHTML += `
  <tr>
    <th scope="row">${distrepcount}</th>
    <td>${`${splitminutes}:${splitseconds}:${splitmilli}`}</td>
    <td>${`${addzero(expectsplitmin)}:${addzero(expectsplitsec)}:00`}</td>
  </tr>`;
});
