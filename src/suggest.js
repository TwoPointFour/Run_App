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

// Later add to utils, don't keep it for elementClass only
const visible = (element, state) => {
  state
    ? document.querySelector(`${element}`).classList.remove("d-none")
    : document.querySelector(`${element}`).classList.add("d-none");
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

const init = () => {
  console.log("suggest init done");
  const submitButton = document.querySelector(".inputSubmit");
  submitButton.addEventListener("click", getTrainingPlan);
};

window.onload = init;
