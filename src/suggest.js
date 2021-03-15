const getPace = (time) => {
    return 2400 / time;
}

const getTargetPace = (targetTime) => getPace(parseInt(targetTime));
const getCurrentPace = (currentTime) => getPace(parseInt(currentTime));

const deltaDifficultyPerWeek = (info) => {
    return (((Math.exp(getTargetPace(info.targetTime)) / Math.exp(getCurrentPace(info.currentTime)) * 100) - 100) / parseInt(info.weeks));
}

const getTrainingIntervals = (weeklyTargetImprovement, targetPace) => {
    let array = []
    if (weeklyTargetImprovement < 106) {
        array = ["10", "300", 2 * targetPace]
    }
    if (weeklyTargetImprovement < 109) {
        array = ["8", "400", 2.33 * targetPace]
    }
    if (weeklyTargetImprovement < 112) {}
    if (weeklyTargetImprovement < 114) {}
    if (weeklyTargetImprovement < 120) {}
    if (weeklyTargetImprovement < 122) {}
    if (weeklyTargetImprovement < 125) {}
    if (weeklyTargetImprovement < 129) {}
    else {

    }
    if (array && array[2]) {
        array[2] = array[2].toString()
    }
    return array
}

const info = {
    currentTimeMin: "11",
    currentTimeSec: "30",
    targetTimeMin: "10",
    targetTimeSec: "30",
    weeks: "5"
}

// Unit is metres and seconds
// Check the format in which user will input time
/*export default */
function getTrainingPlan(info) {
    const userInfo = {
        'currentTime': parseInt(info.currentTimeMin) * 60 + parseInt(info.currentTimeSec),
        'targetTime': parseInt(info.targetTimeMin) * 60 + parseInt(info.targetTimeSec),
        weeks: parseInt(info.weeks)
    };
    const weeklyTargetImprovement = 100 + deltaDifficultyPerWeek(userInfo);
    getTrainingIntervals(weeklyTargetImprovement(info), getTargetPace(parseInt(info.targetTime)));
}

getTrainingPlan(info)