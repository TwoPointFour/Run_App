import { initialiseTimer } from "./timer.js";

const timedBtn = document.querySelector(".timed");
const distanceBtn = document.querySelector(".distance");
const BackBtn1 = document.querySelector(".back1");
const BackBtn2 = document.querySelector(".back2");

const TimedSubmit = document.querySelector(".timedsubmit");
const DistanceSubmit = document.querySelector(".distancesubmit");

const backtt = document.querySelector(".backtt");
const backdt = document.querySelector(".backdt");

const visible = (elementClass, state) => {
  state
    ? document.querySelector(`.${elementClass}`).classList.remove("d-none")
    : document.querySelector(`.${elementClass}`).classList.add("d-none");
};

DistanceSubmit.addEventListener("click", function () {
  visible("DistanceForm", false);
  visible("DistanceTimer", true);
});

document.querySelector(".distancesubmit").addEventListener("click", function () {
  const permSetCount = Number(document.querySelector("#distrepetition").value);
  const permDistance = Number(document.querySelector("#distdistance").value);
  const permPaceTime = Number(document.querySelector("#distpace").value) * 1000;
  const permSetTimeMin = Number(document.querySelector("#distsetmin").value);
  const permSetTimeSec = Number(document.querySelector("#distsetsec").value);
  const permUserInput = {
    permSetCount,
    permDistance,
    permPaceTime,
    permSetTimeMin,
    permSetTimeSec,
  };
  initialiseTimer(permUserInput);
});
