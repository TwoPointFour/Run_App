import { initialiseTimer } from "./timer.js";

/////////
/*
1. User input: 
    Current time
    Target time
    Weeks to train

2. Function output:
    Training suggestion =>
      - Repetitions
      - Distance
      - Pace
      - Set time


3. Interval Timer
    Timer function => 
      - Run time for each set (array)

4a. TwoPointFour Record

4b. Training suggestion function = > output next training

*/

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

const visible = (elementClass, state) => {
  state ? document.querySelector(`.${elementClass}`).classList.remove("d-none") : document.querySelector(`.${elementClass}`).classList.add("d-none");
};

timedBtn.addEventListener("click", function () {
  console.log("button clicked!");
  visible("TypeChoice", false);
  visible("TimedForm", true);
});

distanceBtn.addEventListener("click", function () {
  visible("TypeChoice", false);
  visible("DistanceForm", true);
});

BackBtn1.addEventListener("click", function () {
  visible("TypeChoice", true);
  visible("TimedTimer", false);
  visible("TimedForm", false);
});

BackBtn2.addEventListener("click", function () {
  visible("TypeChoice", true);
  visible("TimedTimer", false);
  visible("TimedForm", false);
});

TimedSubmit.addEventListener("click", function () {
  visible("TimedForm", false);
  visible("TimedTimer", true);
});

DistanceSubmit.addEventListener("click", function () {
  visible("DistanceForm", false);
  visible("DistanceTimer", true);
});

backdt.addEventListener("click", function () {
  visible("DistanceForm", true);
  visible("DistanceTimer", false);
});

backtt.addEventListener("click", function () {
  visible("TimedForm", true);
  visible("TimedTimer", false);
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
