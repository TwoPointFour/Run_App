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
