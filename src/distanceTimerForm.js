// import { initialiseTimer } from "./timer.js";

const timedBtn = document.querySelector(".timed");
const distanceBtn = document.querySelector(".distance");
const BackBtn1 = document.querySelector(".back1");
const BackBtn2 = document.querySelector(".back2");

const TimedSubmit = document.querySelector(".timedsubmit");
const DistanceSubmit = document.querySelector(".distancesubmit");

const backtt = document.querySelector(".backtt");
const backdt = document.querySelector(".backdt");

const visible = (element, state) => {
  state
    ? document.querySelector(`${element}`).classList.remove("d-none")
    : document.querySelector(`${element}`).classList.add("d-none");
};

const init = () => {
  console.log("suggest init done");
  DistanceSubmit.addEventListener("click", function () {
    const permSetCount = Number(document.querySelector("#distrepetition").value);
    const permDistance = Number(document.querySelector("#distdistance").value);
    const permPaceTime = Number(document.querySelector("#distpace").value) * 1000;
    const permSetTimeMin = Number(document.querySelector("#distsetmin").value);
    const permSetTimeSec = Number(document.querySelector("#distsetsec").value);
    // const permUserInput = {
    //   permSetCount,
    //   permDistance,
    //   permPaceTime,
    //   permSetTimeMin,
    //   permSetTimeSec,
    // };
    console.log("F")
    window.location.href = '../distanceTimer.html'
    // initialiseTimer(permUserInput);
  });
};

window.onload = init;
