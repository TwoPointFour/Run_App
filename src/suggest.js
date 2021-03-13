// math.js and decimal.js libraries
const getPace = (time) => {
    return 2400 / time;
};

const getTargetPace = (targetTime) => getPace(parseInt(targetTime));
const getCurrentPace = (currentTime) => getPace(parseInt(currentTime));

const deltaDifficultyPerWeek = (info) => {
   return (((Math.exp(getTargetPace(targetTimeInSec)) / Math.exp(getCurrentPace(currentTimeInSec)) * 100) - 100) / parseInt(weeks));
};

// Decision logic
// random numbers used for the conditions
const getTrainingIntervals = (weeklyTargetImprovement, targetPace) => {
    let array = []
    if (weeklyTargetImprovement < 82 && weeklyTargetImprovement >= 50) {
        array = ["10", "300", 2 * targetPace ]
    }
    if (weeklyTargetImprovement < 84) {
        array = ["8", "400", 2.33 * targetPace]
    }
    if (array && array[2]) {
        array[2] = array[2].toString()
    }
    return array
};

// const userInfo = {
//     currentTime: "11.5",
//     targetTime: "10.5",
//     weeks: "5"
// }
// 
// console.log(getWeeklyTargetImprovement(userInfo))

// Unit is metres and seconds
// Check the format in which user will input time
export default function getTrainingPlan(info) {
    const {currentTime, targetTime} = info;
    const currentTimeInSec = currentTime * 60;
    const targetTimeInSec = targetTime * 60;
    const modifiedUserInfo = {'currentTime': currentTimeInSec, 'targetTime': targetTimeInSec, weeks: info.weeks};
    const weeklyTargetImprovement = 100 + deltaDifficultyPerWeek(modifiedUserInfo);
    return getTrainingIntervals(weeklyTargetImprovement(info), getTargetPace(parseInt(info.targetTime)));
};
