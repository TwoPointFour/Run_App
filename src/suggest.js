// import { initialiseTimer } from "./timer.js";
// import { trainingInfo } from "./timer.js";
import { primaryIntervals, secondaryIntervals } from "./intervals.js";
import { scoredWorkouts } from "./workoutScorer.js";

// All constants below TBC
const rho = 7.0;
// tePace, ltPace, vPace, stPace
const phi = [1, 1, 1, 1];
const paceConstants = [1.243, 1.19, 1.057, 0.89];
const deltas = [0.41, 0.49, 0.55, 0.65, 0.73];

const getPace = (time) => time / 2400;
const convertSecToHour = (timeInSec) => timeInSec / (60 * 60)
const getTargetPace = (targetTime) => getPace(targetTime);
const getCurrentPace = (currentTime) => getPace(currentTime);
const getCurrentVelocity = (currentTime) => 2.4 / convertSecToHour(currentTime);
const getTargetVelocity = (targetTime) => 2.4 / convertSecToHour(targetTime);

const getOverallFitness = (speedDifficulty, targetPace, weeks, currentFitness) => {
    //todo confirm what the deltaDifficulty final formula is
    const deltaDifficulty = speedDifficulty - 100;
    const deltaDifficultyPerWeek = deltaDifficulty / weeks;
    let previousScoredWorkouts = scoredWorkouts();
    previousScoredWorkouts.workoutScore = 100
    previousScoredWorkouts[0].workoutScore = 100
    //todo we're only using the first/latest workout!
    if (previousScoredWorkouts[0].workoutScore < 94) {
        return currentFitness + deltaDifficultyPerWeek;
    } else {
        return previousScoredWorkouts[0].workoutScore + deltaDifficultyPerWeek;
    }
};

const checkDiff = (diffs, diff) => {
    if (diffs[diff]) {
        return diffs[diff]
    }
    return 100
}

const getDiffs = (velocityToCompare, velocities, intermediateFunc, x = 1, differences = {}) => {
    let diffs = {}
    const [teVelocity, ltVelocity, vVelocity, stVelocity] = velocities
    if (velocityToCompare < teVelocity) {
        diffs.teDiff = checkDiff(differences, 'teDiff') + x * (deltas[0] * teVelocity * Math.exp(teVelocity - velocityToCompare));
    } else if (velocityToCompare < ltVelocity) {
        diffs.teDiff = checkDiff(differences, 'teDiff') - x * intermediateFunc(deltas[1], teVelocity, velocityToCompare);
    } else if (velocityToCompare < vVelocity) {
        diffs.ltDiff = checkDiff(differences, 'ltDiff') - x * intermediateFunc(deltas[2], ltVelocity, velocityToCompare);
    } else if (velocityToCompare < stVelocity) {
        diffs.vDiff = checkDiff(differences, 'vDiff') - x * intermediateFunc(deltas[3], vVelocity, velocityToCompare);
        // console.log(checkDiff(differences, 'vDiff'))
    } else {
        diffs.stDiff = checkDiff(differences, 'stDiff') - x * intermediateFunc(deltas[4], stVelocity, velocityToCompare);
    }
    return diffs
}


const getSpeedDifficulty = (currentVelocity, targetVelocity, velocities) => {
    //todo why so many diffs. floating around? get rid of them
    const [teVelocity, ltVelocity, vVelocity, stVelocity] = velocities;
    const intermediateFunc = (delta, velocityOne, velocityTwo) => (delta * velocityOne * Math.exp(velocityTwo - velocityOne))
    const diffs = getDiffs(currentVelocity, velocities, intermediateFunc);
    while (Object.keys(diffs).length < 4) {
        if (diffs.teDiff && !(diffs.ltDiff)) {
            diffs.ltDiff = diffs.teDiff + intermediateFunc(deltas[1], teVelocity, ltVelocity)
        }
        if (diffs.ltDiff && !(diffs.teDiff && diffs.vDiff)) {
            if (!(diffs.teDiff)) {
                diffs.teDiff = diffs.ltDiff - intermediateFunc(deltas[1], teVelocity, ltVelocity)
            }
            if (!(diffs.vDiff)) {
                diffs.vDiff = diffs.ltDiff + intermediateFunc(deltas[2], ltVelocity, vVelocity)
            }
        }
        if (diffs.vDiff && !(diffs.ltDiff && diffs.stDiff)) {
            if (!(diffs.ltDiff)) {
                diffs.ltDiff = diffs.vDiff - intermediateFunc(deltas[2], ltVelocity, vVelocity)
            }
            if (!(diffs.stDiff)) {
                diffs.stDiff = diffs.vDiff + intermediateFunc(deltas[3], vVelocity, stVelocity)
            }
        }
        if (diffs.stDiff && !(diffs.vDiff)) {
            diffs.vDiff = diffs.stDiff - intermediateFunc(deltas[3], vVelocity, stVelocity)
        }
    }
    const finalDiffs = getDiffs(targetVelocity, velocities, intermediateFunc, -1, diffs)
    if (Object.values(finalDiffs).length === 1) {
        return Object.values(finalDiffs)[0]
    }
    return 0
};

const generateConstants = (answers) => {
    const beta = answers.personalBests ? 1 : 0.975;
    const alpha = (1 / 3) * beta * (((answers.fFrequency * answers.dDistance) / 30) + (answers.lMonths / 36) + (answers.fFrequency / 3));
    if (alpha >= 0 && alpha <= 1) {
        console.log("alpha passed");
    }
    const cNewbieGains = (1 / rho) * Math.exp(1 - alpha) + (rho - 1) / rho;
    return {alpha, beta, cNewbieGains};
};

const getTrainingPlan = (e) => {
  // document.querySelector(".runRegular").
  console.log("Running getTrainingPlan");
  const [runRegular] = [
    [...document.querySelectorAll(".runRegular")].filter((selection) => selection.checked === true),
  ];

  const fFrequency = Number(document.querySelector(".fFrequency").value) || 3;
    //todo get user to input dDistance in km
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
        currentTime: Number(data["currentMin"]) * 60 + Number(data["currentSec"]),
        targetTime: Number(data["targetMin"]) * 60 + Number(data["targetSec"]),
        weeks: Number(data["weeks"]),
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
  const paces = phi.map((phiValue, i) => ((targetPace * paceConstants[i]) * cNewbieGains * phiValue));
  //paces in s/m
  const currentVelocity = getCurrentVelocity(userInfo.currentTime);
  const targetVelocity = getTargetVelocity(userInfo.targetTime);
  const velocities = paces.map((pace) => (1 / pace) * 3.6);
  const speedDifficulty = getSpeedDifficulty(currentVelocity, targetVelocity, velocities)// getSpeedDifficulty(currentVelocity, paces);
  const restRatio = 1; //todo (the rest the user is going to use)/prescribed rest * 100
  const restMultiplier = 1 / Math.exp(0.0024 * restRatio);
  const primaryIntervalsCopy = JSON.parse(JSON.stringify(primaryIntervals));
  const secondaryIntervalsCopy = JSON.parse(JSON.stringify(secondaryIntervals));
  primaryIntervalsCopy.forEach((workout) => {
    workout.unshift((speedDifficulty / 100) * workout[0] * restMultiplier); // * 100
  });
  secondaryIntervalsCopy.forEach((workout) => {
    workout.unshift((speedDifficulty / 100) * workout[0] * restMultiplier); // * 100
  });
  const targetDifficulty = getOverallFitness(
    speedDifficulty,
    targetPace,
    userInfo.weeks,
    userInfo.currentFitness
  );
  const trainingPlanPrimary = primaryIntervalsCopy.reduce(
    (variance, workout) => {
      const workoutVariance = Math.abs(workout[0] - targetDifficulty);
      if (workoutVariance > variance[0]) {
        return variance;
      }
      return [workoutVariance, ...workout];
    }, [10000]);
  const trainingPlanSecondary = secondaryIntervalsCopy.reduce(
    (variance, workout) => {
      const workoutVariance = Math.abs(workout[0] - targetDifficulty);
      if (workoutVariance > variance[0]) {
        return variance;
      }
      return [workoutVariance, ...workout];
    }, [trainingPlanPrimary[1]]);
  let trainingPlan = (trainingPlanPrimary[0] > trainingPlanSecondary[0]) ? trainingPlanSecondary : trainingPlanPrimary
  trainingPlan.splice(0, 3);
  // trainingPlan will be in the format [[set, distance, rest]]
  const permRest = Math.floor(trainingPlan[0][2] * targetPace)
  const permPace = Math.floor(targetPace * 1000)

  const displayPlan = document.querySelector("#display-suggest");
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
  trainingPlan.forEach((ele, i) => {
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
    ).href = `distanceTimer.html?permSetCount=${trainingPlan[0][0]}&permDistance=${trainingPlan[0][1]}&permPaceTime=${permPace}&permSetTimeMin=${0}&permSetTimeSec=${0}&permRestTimeSec=${permRest}`;
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
  return trainingPlan;
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
