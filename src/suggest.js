// import getUser from "./main.js";
import { initialiseTimer } from "./timer.js";
import { trainingInfo } from "./timer.js";
import { primaryIntervals } from "./intervals";
import { scoredWorkouts } from "./workoutScorer";

export const trainingPlan = {
  permSetCount: "2",
  permDistance: "300",
  permPaceTime: "10000",
  permSetTimeMin: "2",
  permSetTimeSec: "2",
};

const getPace = (time) => 2400 / time;
const getTargetPace = (targetTime) => getPace(targetTime);
const getCurrentPace = (currentTime) => getPace(currentTime);

//todo Later add to utils, don't keep it for elementClass only
const visible = (elementClass, state) => {
  state
    ? document.querySelector(`.${elementClass}`).classList.remove("d-none")
    : document.querySelector(`.${elementClass}`).classList.add("d-none");
};

const fields = ['targetMin', 'targetSec', 'currentMin', 'currentSec', 'weeks']

const getOverallFitness = (velocity, targetPace, weeks, currentFitness) => {
  //todo confirm what the deltaDifficulty final formula is
  const deltaDifficulty = (Math.exp(targetPace) / Math.exp(velocity)) * 100 - 100
  const deltaDifficultyPerWeek = deltaDifficulty / weeks
  const previousScoredWorkouts = scoredWorkouts()
  //todo we're only using the first/latest workout!
  if (previousScoredWorkouts[0].workoutScore < 94) {
    return currentFitness + deltaDifficultyPerWeek
  }
  else {
    return previousScoredWorkouts[0].workoutScore + deltaDifficultyPerWeek
  }
}

const getTrainingPlan = (e) => {
  const data = {
    currentMin: "11",
    currentSec: "30",
    targetMin: "10",
    targetSec: "30",
    weeks: "5",
  };
  /*
  const data = {};
  fields.forEach((inputField) => {
    data[inputField] = document.querySelector('#' + inputField).value
  })
*/
  const userInfo = {
      'currentTime': parseInt(data['currentMin']) + 60 * parseInt(data['currentSec']),
      'targetTime': parseInt(data['targetMin']) + 60 * parseInt(data['targetSec']),
      weeks: parseInt(data['weeks'])
  };
  if (data.currentFitness) {
    userInfo.currentFitness = data.currentFitness
  }
  else {
    userInfo.currentFitness = 100
  }
  const answers = {
    runRegular: 'yes',
    fFrequency: '2',
    dDistance: '1000', //in metres?,
    lMonths: '2',
    personalBests: {
      'd800': '2000'
    }
  }

  if (answers.personalBests) {
    //TBC logic
  }
  const beta = answers.personalBests ? 1 : 0.975

  //todo confirm formula
  const alpha = 1 / (Math.exp((-1) * (1 / 3) * ((answers.fFrequency * answers.dDistance / 30) + (answers.lMonths / 3) + (answers.fFrequency / 3)))) * beta
  if (alpha >= 0 && alpha <= 1) {
    console.log("alpha passed")
  }
  const rho = 7.0 //TBC
  const cNewbieGains = (1 / rho) * (Math.exp(1 - alpha)) + (rho - 1 )/ rho
  // tePace, ltPace, vPace, stPace
  const phi = [1, 1, 1, 1] //TBC
  const targetPace = getTargetPace(userInfo.targetTime)
  const paceConstants = ['1.243', '1.19', '1.057', '0.89']
  const paces = phi.map((phiValue, i) => ((targetPace * paceConstants[i])/(cNewbieGains * phiValue)) * (18 / 5)) // 18/5 to convert it

  //todo assuming that by velocity, Jlow means pace?
  const deltas = [0.025, 0.03, 0.035, 0.04, 0.045]
  const getSpeedDifficulty = (velocity, paces) => {
    const [tePace, ltPace, vPace, stPace] = paces
    const initDiff = 0 //todo TBC with Jlow where D(TE), D(LT), D(V02), D(ST) come from, currently using initDiff
    //todo confirm formulae below, missing a bracket in the originial formulae
    //todo confirm if we use currentPace in if-condition, and targetPace to get difficulty
    if (true) {
      return 1
    }
    if (velocity < tePace) {
      return initDiff + Math.exp((deltas[0] * tePace) * (tePace - velocity))
    }
    else if (velocity < ltPace) {
      return initDiff + Math.exp((deltas[1] * tePace) * (velocity - tePace))
    }
    else if (velocity < vPace) {
      return initDiff + Math.exp((deltas[2] * ltPace) * (velocity - ltPace))
    }
    else if (velocity < stPace) {
      return initDiff + Math.exp((deltas[3] * vPace) * (velocity - vPace))
    }
    else {
      return initDiff + Math.exp((deltas[4] * stPace) * (velocity - stPace))
    }
  }
  //velocity is the same as current pace
  const velocity = getCurrentPace(userInfo.currentTime)
  const speedDifficulty = getSpeedDifficulty(velocity, paces)

  const restRatio = 100 //todo (the rest the user is going to use)/prescribed rest * 100
  const restMultiplier = 1 / Math.exp(0.0024 * restRatio)
  const workoutsWithDifficulty = primaryIntervals.map((workout) => workout.unshift(speedDifficulty * workout[0] * restMultiplier * 100))
  const targetDifficulty = getOverallFitness(velocity, targetPace, userInfo.weeks, userInfo.currentFitness)
  const trainingPlan = workoutsWithDifficulty.reduce((variance, workout) => {
    const workoutVariance = (workout[0] - targetDifficulty) / targetDifficulty
    if (variance[0] > workoutVariance) {
      return workout.unshift(workoutVariance)
    }
    return variance
  }, [1000])

  const displayPlan = document.querySelector('#display-suggest')
  /*  displayPlan.innerHTML = `<div class="btn btn-outline-dark recordcard mb-3">
              <div class="row justify-content-center mb-3">
                <h5>Your Suggested Training</h5>
              </div>
              <div class="row justify-content-center">
                <div class="d-grid col-3">
                  <h6>Sets: ${trainingPlan.permSetCount}</h6>
                </div>
                <div class="d-grid col-3">
                  <h6>Distance: ${trainingPlan.permDistance}</h6>
                </div>
                <div class="d-grid col-3">
                  <h6>Set Time: ${trainingPlan.permSetTimeMin}:${trainingPlan.permSetTimeSec}</h6>
                </div>
              </div>
            </div>`
    visible("#display-suggest", true);*/
  // then go to timer
  // https://www.w3schools.com/jsref/obj_location.asp
  // https://stackoverflow.com/questions/52389569/redirect-to-another-page-and-pass-parameter-via-javascript/52389707
  // https://www.aspsnippets.com/Articles/Redirect-to-another-Page-with-multiple-Parameters-using-JavaScript.aspx
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
  console.log("suggest init done");
  const submitButton = document.querySelector(".inputSubmit");
  submitButton.addEventListener("click", getTrainingPlan);
};

window.onload = init;

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

 */