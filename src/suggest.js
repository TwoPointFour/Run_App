// import getUser from "./main.js";
import { initialiseTimer } from "./timer.js";
import { trainingInfo } from "./timer.js";

export const trainingPlan = {
  permSetCount: "2",
  permDistance: "300",
  permPaceTime: "10000",
  permSetTimeMin: "2",
  permSetTimeSec: "2",
};

const getPace = (time) => {
  return 2400 / time;
};

const getTargetPace = (targetTime) => getPace(parseInt(targetTime));
const getCurrentPace = (currentTime) => getPace(parseInt(currentTime));

const deltaDifficultyPerWeek = (info) => {
  return (
    ((Math.exp(getTargetPace(info.targetTime)) / Math.exp(getCurrentPace(info.currentTime))) * 100 -
      100) /
    parseInt(info.weeks)
  );
};

const getTrainingIntervals = (weeklyTargetImprovement, targetPace) => {
  const targetPaceString = targetPace.toString();
  if (weeklyTargetImprovement < 106) {
    return ["10", "300", targetPaceString, "2"];
  }
  if (weeklyTargetImprovement < 109) {
    return ["8", "400", targetPaceString, "2.33"];
  }
  if (weeklyTargetImprovement < 112) {
    return ["6", "500", targetPaceString, "2.33"];
  }
  if (weeklyTargetImprovement < 114) {
    return ["8", "400", targetPaceString, "2.33"];
  }
  if (weeklyTargetImprovement < 120) {
    return ["8", "400", targetPaceString, "2.33"];
  }
  if (weeklyTargetImprovement < 122) {
    return ["8", "400", targetPaceString, "2.33"];
  }
  if (weeklyTargetImprovement < 125) {
    return ["8", "400", targetPaceString, "2.33"];
  }
  if (weeklyTargetImprovement < 129) {
    return ["8", "400", targetPaceString, "2.33"];
  } else {
    return ["8", "400", targetPaceString, "2.33"];
  }
};

const info = {
  currentTimeMin: "11",
  currentTimeSec: "30",
  targetTimeMin: "10",
  targetTimeSec: "30",
  weeks: "5",
};

// getTrainingPlan(info)

// Units are in metres and seconds
// function getTrainingPlan(info) {
//     const userInfo = {
//         'currentTime': parseInt(info.currentTimeMin) * 60 + parseInt(info.currentTimeSec),
//         'targetTime': parseInt(info.targetTimeMin) * 60 + parseInt(info.targetTimeSec),
//         weeks: parseInt(info.weeks)
//     };
//     const initialTargetImprovement = 100 + deltaDifficultyPerWeek(userInfo);
//     return getTrainingIntervals(initialTargetImprovement, getTargetPace(parseInt(userInfo.targetTime)));
// }

// Later add to utils
const visible = (elementClass, state) => {
  state
    ? document.querySelector(`.${elementClass}`).classList.remove("d-none")
    : document.querySelector(`.${elementClass}`).classList.add("d-none");
};

const getTrainingPlan = async (e) => {
  const display = document.querySelector(".inputSubmit");
  display.innerText = "hhfdg";
  // create new div to display results
  visible("#display-suggest", false);
  //   const user = {};
  //   for (let i = 0; i < 4; i++) {
  //     user[form.elements[i].name] = form.elements[i].value;
  //   }
  //   console.log(user);
  //   const display = document.getElementById("display");

  //   console.log("User data processed");
  //   // display suggested workout, then go to timer
  //   display.innerText = await getUser(user);
};

// Yi Hein's Area =============== Front END

document.querySelector(".actionBtn").addEventListener("click", function () {
  document.querySelector(".questionnaireStart").classList.toggle("d-none");
  document.querySelector(".questionnaireProfile").classList.toggle("d-none");
});

document.querySelectorAll(".slide").forEach((s, i) => {
  s.style = `transform: translateX(${i * 100}%)`;
});

let counter = 0;

document.querySelectorAll(".proceedBtn").forEach((b, i) => {
  b.addEventListener("click", slideAdvance);
});
document.querySelectorAll(".reverseBtn").forEach((b, i) => {
  b.addEventListener("click", slideReverse);
});

document.addEventListener("keydown", function (e) {
  e.key === "ArrowLeft" && slideReverse();
  e.key === "ArrowRight" && slideAdvance();
});

function slideAdvance() {
  counter >= 7 ? (counter = 7) : counter++;
  goToSlide(counter);
}
function slideReverse() {
  counter <= 0 ? (counter = 0) : counter--;
  goToSlide(counter);
}

function goToSlide(counter) {
  counter = Number(counter);
  document
    .querySelectorAll(".dots__dot")
    .forEach((d, i) => d.classList.remove("dots__dot--active"));

  document.querySelectorAll(".slide").forEach((s, i) => {
    s.style = `transform: translateX(${(i - counter) * 100}%)`;
  });
  document
    .querySelectorAll(".dots__dot")
    .forEach((d, i) => (d.dataset.slide == counter ? d.classList.add("dots__dot--active") : null));
  document.querySelector(".progressChip").textContent = `${Math.floor(((counter + 1) / 8) * 100)}%`;
}

// Slide Nav

document.querySelectorAll(".slide").forEach((_, i) => {
  document
    .querySelector(".dotsContainer")
    .insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${i}"></button>`);
});

document.querySelector(".dotsContainer").addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    e.target.classList.add("dots__dot--active");
    goToSlide(e.target.dataset.slide);
    counter = e.target.dataset.slide;
  }
});

// Yi Hein's Area ===============

const init = () => {
  console.log("init done");
  const submitButton = document.querySelector(".inputSubmit");
  submitButton.addEventListener("click", getTrainingPlan);
};

window.onload = init;
