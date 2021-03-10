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

let permdistrepetition;
let permdistrepcount;
let permpacecount;
let permdistdistance;
let permnumdistset;
let permdistpace;
let permdistsetmin;
let permdistsetsec;
let permdistset;

addzero = (numchange) => {
  if (numchange.toString().length === 3) {
    numchange = Number(numchange.toString().slice(0, -1));
  }
  if (numchange < 10) {
    numchange = `0${numchange}`;
  }
  return numchange;
};

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

updateCountdown = function () {
  let deltatimeset = Date.now() - starttimeset;
  let deltatimepace = Date.now() - starttimepace;

  if (distpace <= 0 && pacecount < numdistset) {
    starttimepace = Date.now();
    pacecount++;
    deltatimepace = Date.now() - starttimepace;
    distpace = permdistpace - deltatimepace;
  } else if (pacecount >= numdistset && distpace <= 0) {
    distpace = 0;
  } else {
    distpace = permdistpace - deltatimepace;
  }

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
    distset = permdistset - deltatimeset;
  }

  const paceseconds = Math.floor(distpace / 1000);
  const pacesecondscut = addzero(paceseconds);
  const pacemilli = distpace - paceseconds * 1000;
  const pacemillicut = addzero(pacemilli);
  const setminutes = Math.floor(distset / (1000 * 60));
  const setseconds = Math.floor((distset - setminutes * 1000 * 60) / 1000);
  // Seconds cut adds a 0 in front of the number when the number of seconds fall below 10
  const setsecondscut = addzero(setseconds);
  const setmilli = distset - setminutes * 1000 * 60 - setseconds * 1000;
  // Millicut adds a 0 in front of the number when the number of milliseconds fall below 10

  document.querySelector(
    ".timermin"
  ).textContent = `${setminutes}:${setsecondscut}`;
  document.querySelector(
    ".timersec"
  ).textContent = `${pacesecondscut}:${pacemillicut}`;

  if (pacecount >= numdistset) {
    document.querySelector(
      ".distrest"
    ).textContent = `Rest: ${setminutes}:${setsecondscut}`;
  }

  document.querySelector(".currdist").textContent = `${pacecount * 100}m`;
  document.querySelector(".currrep").textContent = `Set ${distrepcount}`;
};

// Start timer when "start" button clicked
document.querySelector(".timerstart").addEventListener("click", function () {
  starttimepace = Date.now();
  starttimeset = Date.now();
  disttime = setInterval(updateCountdown, 10);
});

// Pause timer when "pause" button clicked
document.querySelector(".timerpause").addEventListener("click", function () {
  clearInterval(disttime);
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
