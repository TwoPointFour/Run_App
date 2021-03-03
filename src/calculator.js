// Check Jlow's training programme for what these variables mean
const getPace = (time) => {
    return 40 / time; // 2400 / 60 * time
};

const getTargetPace = (targetTime) => getPace(parseInt(targetTime));
const getCurrentPace = (currentTime) => getPace(parseInt(currentTime));

const deltaDifficultyDifferencePerWeek = (info) => {
   const {currentTime, targetTime, weeks} = info;
   return (((Math.exp(getTargetPace(targetTime)) / Math.exp(getCurrentPace(currentTime)) * 100) - 100) / parseInt(weeks));
};

const getWeeklyTargetImprovement = (info) => {
    return 100 + deltaDifficultyDifferencePerWeek(info);
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
    array[2] = array[2].toString()
    return array
};
/*
6 x 500 P x R (2.6x) : 85% [85%-86%]
5 x 600 P x R (2.8x): 87% [87% - 88%]
4 x 700 P x R (3.2x) : 89% [89% - 92%]
4 x 800 P x R (4x) : 93% [93% - 94%]
3 x 1000 P x R (4.5x) : 95% [95% - 96%]
2 x 1200 P x R (5x) + 600 P x : 97% [97% - 99%]
2.4km Run : 100%
*/

// Check the format in which user will input time

// Debugging statements
/*const info = {
    currentTime: "11.5",
    targetTime: "10.5",
    weeks: "5"
}
console.log(getTrainingIntervals(81, getTargetPace(parseInt(info.targetTime))))*/

// Add workout failure or success logic
/*
If previous workout = success, let fitness= workout difficulty


The rest times will be a little weird no matter what the numbers are, so I recommend rounding either the set or rest time to the nearest 5 seconds.
if workout success, new fitness = centre of range of current workout
if workout failure, new fitness = current fitness
Target fitness (difficulty value) = new fitness + 0.5(weekly improvement)
 */

export default function getTrainingPlan(info) {
    const arrayOfResults = getTrainingIntervals(getWeeklyTargetImprovement(info), getTargetPace(parseInt(info.targetTime)));
};
