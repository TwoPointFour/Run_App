// import { initialiseTimer } from "./timer.js";
// import { trainingInfo } from "./timer.js";
import { primaryIntervals } from "./intervals.js";
import { scoredWorkouts } from "./workoutScorer.js";

export const trainingPlan = {
  permSetCount: "2",
  permDistance: "300",
  permPaceTime: "10000",
  permSetTimeMin: "2",
  permSetTimeSec: "2",
};

// All constants below TBC
const rho = 7.0;
// tePace, ltPace, vPace, stPace
const phi = [1, 1, 1, 1];
const paceConstants = [1.243, 1.19, 1.057, 0.89];
const deltas = [0.025, 0.03, 0.035, 0.04, 0.045];

const getPace = (time) => 2400 / time;
const getTargetPace = (targetTime) => getPace(targetTime);
const getCurrentPace = (currentTime) => getPace(currentTime);

const fields = ["targetMin", "targetSec", "currentMin", "currentSec", "weeks"];

const getOverallFitness = (speedDifficulty, velocity, targetPace, weeks, currentFitness) => {
  //todo confirm what the deltaDifficulty final formula is
  const deltaDifficulty = speedDifficulty - 100;
  const deltaDifficultyPerWeek = deltaDifficulty / weeks;
  const previousScoredWorkouts = scoredWorkouts();
  //todo we're only using the first/latest workout!
  if (previousScoredWorkouts[0].workoutScore < 94) {
    return currentFitness + deltaDifficultyPerWeek;
  } else {
    return previousScoredWorkouts[0].workoutScore + deltaDifficultyPerWeek;
  }
};

const getSpeedDifficulty = (velocity, paces) => {
  const [tePace, ltPace, vPace, stPace] = paces;
  console.log("paces", paces);
  console.log("vel", velocity);
  const initDiff = 0;
  //todo TBC with Jlow where D(TE), D(LT), D(V02), D(ST) come from, currently using initDiff
  //todo confirm formulae below, missing a bracket in the originial formulae
  //todo confirm if we use currentPace in if-condition, and targetPace to get difficulty
  if (true) {
    // console.log(Math.exp(deltas[4] * stPace) * (velocity - stPace));
    // console.log(`
    // deltas: ${deltas[4]}
    // stPace: ${stPace}
    // velocity: ${velocity}`);
    return 100;
  }
  if (velocity < tePace) {
    return initDiff - Math.exp(deltas[0] * tePace) * (tePace - velocity);
  } else if (velocity < ltPace) {
    return initDiff + Math.exp(deltas[1] * tePace) * (velocity - tePace);
  } else if (velocity < vPace) {
    return initDiff + Math.exp(deltas[2] * ltPace) * (velocity - ltPace);
  } else if (velocity < stPace) {
    return initDiff + Math.exp(deltas[3] * vPace) * (velocity - vPace);
  } else {
    return initDiff + Math.exp(deltas[4] * stPace) * (velocity - stPace);
  }
};

const generateConstants = (answers) => {
  const beta = answers.personalBests["d800"] ? 1 : 0.975;
  //todo confirm formula for alpha
  const alpha =
    (1 /
      Math.exp(
        -1 *
          (1 / 3) *
          ((answers.fFrequency * answers.dDistance) / 30 +
            answers.lMonths / 3 +
            answers.fFrequency / 3)
      )) *
    beta;
  if (alpha >= 0 && alpha <= 1) {
    console.log("alpha passed");
  }
  const cNewbieGains = (1 / rho) * Math.exp(1 - alpha) + (rho - 1) / rho;
  return { alpha, beta, cNewbieGains };
};

const getTrainingPlan = (e) => {
  // document.querySelector(".runRegular").
  console.log("Running getTrainingPlan");
  const [runRegular] = [
    [...document.querySelectorAll(".runRegular")].filter((selection) => selection.checked === true),
  ];

  const fFrequency = Number(document.querySelector(".fFrequency").value) || 3;
  const dDistance = Number(document.querySelector(".dDistance").value) || 20000;
  const lMonths = Number(document.querySelector(".lMonths").value) || 10;
  const d800 = document.querySelector(".d800").value;
  const d1500 = document.querySelector(".d1500").value;
  const d3000 = document.querySelector(".d3000").value;
  const d5000 = document.querySelector(".d5000").value;
  const d10000 = document.querySelector(".d10000").value;
  const currentMin = Number(document.querySelector(".currentMin").value.slice(0, 2)) || 18;
  const currentSec = Number(document.querySelector(".currentMin").value.slice(3)) || 0;
  const targetMin = Number(document.querySelector(".targetMin").value.slice(0, 2)) || 17;
  const targetSec = Number(document.querySelector(".targetMin").value.slice(3)) || 59;
  const weeks = Number(document.querySelector(".weeks").value) || 5;

  const answers = {
    runRegular,
    fFrequency,
    dDistance,
    lMonths,
    personalBests: {
      d800,
      d1500,
      d3000,
      d5000,
      d10000,
    },
  };
  if (answers.personalBests) {
    //TBC logic
  }

  const data = {
    currentMin,
    currentSec,
    targetMin,
    targetSec,
    weeks,
  };
  const userInfo = {
    currentTime: parseInt(data["currentMin"]) + 60 * parseInt(data["currentSec"]),
    targetTime: parseInt(data["targetMin"]) + 60 * parseInt(data["targetSec"]),
    weeks: parseInt(data["weeks"]),
    currentFitness: 100,
  };
  if (data.currentFitness) {
    userInfo.currentFitness = data.currentFitness;
  }
  /*
    const data = {};
    fields.forEach((inputField) => {
      data[inputField] = document.querySelector('#' + inputField).value
    })
  */
  const { beta, alpha, cNewbieGains } = generateConstants(answers);
  const targetPace = getTargetPace(userInfo.targetTime);
  const paces = phi.map(
    (phiValue, i) => ((targetPace * paceConstants[i]) / (cNewbieGains * phiValue)) * (18 / 5)
  ); // 18/5 for conversion
  //velocity is the same as current pace
  const velocity = getCurrentPace(userInfo.currentTime);
  const speedDifficulty = getSpeedDifficulty(velocity, paces);
  const restRatio = 100; //todo (the rest the user is going to use)/prescribed rest * 100
  const restMultiplier = 1 / Math.exp(0.0024 * restRatio);
  console.log(primaryIntervals);
  primaryIntervals.forEach((workout) => {
    workout.unshift((speedDifficulty / 100) * workout[0] * restMultiplier * 100);
  });
  const targetDifficulty = getOverallFitness(
    speedDifficulty,
    velocity,
    targetPace,
    userInfo.weeks,
    userInfo.currentFitness
  );
  const trainingPlan = primaryIntervals.reduce(
    (variance, workout) => {
      const workoutVariance = (workout[0] - targetDifficulty) / targetDifficulty;
      if (variance[0] > workoutVariance) {
        return [workoutVariance, ...workout];
      }
      return variance;
    },
    [1000000]
  );

  let outputTrainingPlan = trainingPlan.slice();
  outputTrainingPlan.splice(0, 3);
  console.log("outputTrainingPlan", outputTrainingPlan);
  // outputtrainingPlan will be in the format [[set, distance, rest]]
  const displayPlan = document.querySelector("#display-suggest");
  outputTrainingPlan = [[6, 400, 2.33]];
  console.log(outputTrainingPlan);
  displayPlan.insertAdjacentHTML(
    "beforeend",
    `        <div class="col-lg-8 suggestCard">
  <div class="row suggestCardHead">
    <div class="col-lg-12">
      <h4 class="text-start head4 mt-1">
        <span class="align-middle infoChip me-3">Week 1</span>
        Distance Interval Training
      </h4>
    </div>
  </div>
</div>`
  );
  outputTrainingPlan.forEach((ele, i) => {
    displayPlan.querySelector(".suggestCard").insertAdjacentHTML(
      "beforeend",
      `
    <div class="row mt-3">
    <div class="col-lg-1 mb-2 partCard d-flex align-items-center justify-content-center">
      <h3 class="head3" style="margin: 0">Part ${i + 1}</h3>
    </div>
    <div class="col-lg-11 detailsCard">
      <div class="row d-flex justify-content-around">
        <div class="col-lg-3 mb-2 text-center suggestChip">
          Sets: ${ele[0]}
        </div>
        <div class="col-lg-3 mb-2 text-center suggestChip">
          Distance: ${ele[1]}
        </div>
        <div class="col-lg-3 mb-2 text-center suggestChip">
          Rest: ${ele[2]}
        </div>
      </div>
    </div>
  </div>`
    );
    document.querySelector(
      ".gotoWorkoutBtn"
    ).href = `distanceTimer.html?permSetCount=${5}&permDistance=${300}&permPaceTime=${10000}&permSetTimeMin=${0}&permSetTimeSec=${0}&permRestTimeSec=${20000}`;
  });
  // displayPlan.innerHTML = `<div class="btn btn-outline-dark recordcard mb-3">
  //               <div class="row justify-content-center mb-3">
  //                 <h5>Your Suggested Training</h5>
  //               </div>
  //               <div class="row justify-content-center">
  //                 <div class="d-grid col-3">
  //                   <h6>Sets: ${outputTrainingPlan[0][0]}</h6>
  //                 </div>
  //                 <div class="d-grid col-3">
  //                   <h6>Distance: ${outputTrainingPlan[0][1]}</h6>
  //                 </div>
  //                 <div class="d-grid col-3">
  //                   <h6>Set Time: ${outputTrainingPlan[0][2]}</h6>
  //                 </div>
  //               </div>
  //             </div>`;
  document.querySelector(".questionnaireProfile").classList.toggle("d-none");
  document.querySelector(".displayPlan").classList.toggle("d-none");
  // then go to timer
  console.log("Submit Button Clicked");
  return outputTrainingPlan;
};

// Yi Hein's Area =============== Front END

function activeQuestionnaire() {
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
      .forEach((d, i) =>
        d.dataset.slide == counter ? d.classList.add("dots__dot--active") : null
      );
    document.querySelector(".progressChip").textContent = `${Math.floor(
      ((counter + 1) / 8) * 100
    )}%`;
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
  const submitButton = document.querySelector(".submitBtn");
  // console.log(getTrainingPlan("e"));
  submitButton.addEventListener("click", getTrainingPlan);
}

// Yi Hein's Area ===============

const init = () => {
  console.log("suggest init done");
};

window.onload = init;

document.querySelector(".slide") && activeQuestionnaire();

/*
Old code
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


/*
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
 const initialTargetImprovement = 100 + deltaDifficultyPerWeek(userInfo);
  // const trainingPlan = getTrainingIntervals(initialTargetImprovement, getTargetPace(parseInt(userInfo.targetTime)));

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

 */
