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

// Later add to utils, don't keep it for elementClass only
const visible = (elementClass, state) => {
  state
    ? document.querySelector(`.${elementClass}`).classList.remove("d-none")
    : document.querySelector(`.${elementClass}`).classList.add("d-none");
};

const fields = ['targetMin', 'targetSec', 'currentMin', 'currentSec', 'weeks']

const getTrainingPlan = (e) => {
  const data = {};
  fields.forEach((inputField) => {
    data[inputField] = document.querySelector('#' + inputField).value
  })

  const userInfo = {
      'currentTime': parseInt(data['currentMin']) + 60 * parseInt(data['currentSec']),
      'targetTime': parseInt(data['targetMin']) + 60 * parseInt(data['targetSec']),
      weeks: parseInt(data['weeks'])
  };

  const initialTargetImprovement = 100 + deltaDifficultyPerWeek(userInfo);
  // const trainingPlan = getTrainingIntervals(initialTargetImprovement, getTargetPace(parseInt(userInfo.targetTime)));

  const trainingPlan = {
      permSetCount: '2',
      permDistance: '3',
      permPaceTime: '2',
      permSetTimeMin: '2',
      permSetTimeSec: '2'
  }
  const displayPlan = document.querySelector('#display-suggest')
  // copied
  displayPlan.innerHTML = `<div class="btn btn-outline-dark recordcard mb-3">
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
  visible("#display-suggest", true);
  // then go to timer
  // https://www.w3schools.com/jsref/obj_location.asp
  // https://stackoverflow.com/questions/52389569/redirect-to-another-page-and-pass-parameter-via-javascript/52389707
  // https://www.aspsnippets.com/Articles/Redirect-to-another-Page-with-multiple-Parameters-using-JavaScript.aspx
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
 */
const init = () => {
  console.log("suggest init done");
  const submitButton = document.querySelector(".inputSubmit");
  submitButton.addEventListener("click", getTrainingPlan);
};

window.onload = init;
