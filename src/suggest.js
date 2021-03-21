const getPace = (time) => {
    return 2400 / time;
}

const getTargetPace = (targetTime) => getPace(parseInt(targetTime));
const getCurrentPace = (currentTime) => getPace(parseInt(currentTime));

const deltaDifficultyPerWeek = (info) => {
    return (((Math.exp(getTargetPace(info.targetTime)) / Math.exp(getCurrentPace(info.currentTime)) * 100) - 100) / parseInt(info.weeks));
}

const getTrainingIntervals = (weeklyTargetImprovement, targetPace) => {
    const targetPaceString = targetPace.toString()
    if (weeklyTargetImprovement < 106) {
        return ["10", "300", targetPaceString, '2']
    }
    if (weeklyTargetImprovement < 109) {
        return ["8", "400", targetPaceString, '2.33']
    }
    if (weeklyTargetImprovement < 112) {
        return ["6", "500", targetPaceString, '2.33']
    }
    if (weeklyTargetImprovement < 114) {
        return ["8", "400", targetPaceString, '2.33']
    }
    if (weeklyTargetImprovement < 120) {
        return ["8", "400", targetPaceString, '2.33']
    }
    if (weeklyTargetImprovement < 122) {
        return ["8", "400", targetPaceString, '2.33']
    }
    if (weeklyTargetImprovement < 125) {
        return ["8", "400", targetPaceString, '2.33']
    }
    if (weeklyTargetImprovement < 129) {
        return ["8", "400", targetPaceString, '2.33']
    }
    else {
        return ["8", "400", targetPaceString, '2.33']
    }
}

const info = {
    currentTimeMin: "11",
    currentTimeSec: "30",
    targetTimeMin: "10",
    targetTimeSec: "30",
    weeks: "5"
}
// getTrainingPlan(info)

// Units are in metres and seconds
// export default
function getTrainingPlan(info) {
    const userInfo = {
        'currentTime': parseInt(info.currentTimeMin) * 60 + parseInt(info.currentTimeSec),
        'targetTime': parseInt(info.targetTimeMin) * 60 + parseInt(info.targetTimeSec),
        weeks: parseInt(info.weeks)
    };
    const initialTargetImprovement = 100 + deltaDifficultyPerWeek(userInfo);
    return getTrainingIntervals(initialTargetImprovement, getTargetPace(parseInt(userInfo.targetTime)));
}

console.log(getTrainingPlan(info))