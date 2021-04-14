// import { initialiseTimer } from "./timer.js";
// import { trainingInfo } from "./timer.js";
// import { primaryIntervals } from "./intervals.js";
// import { scoredWorkouts } from "./workoutScorer.js";
const {primaryIntervals, secondaryIntervals} = require('./intervals.js')
const {scoredWorkouts} = require('./workoutScorer')
const Papa = require('papaparse')
const fs = require('fs')

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
    const fFrequency = e['f'];
    //todo user input dDistance is in km
    const dDistance = e['d'];
    const lMonths = e['L'];
    const currentMin = Math.floor(e['init'] / 60)
    const currentSec = e['init'] - currentMin * 60;
    const targetMin =
        Math.floor(e['goal'] / 60);
    const targetSec = e['goal'] - targetMin * 60
    const weeks = e['weeks'];

    const answers = {
        // runRegular,
        fFrequency,
        dDistance: dDistance,
        lMonths
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
    const {alpha, beta, cNewbieGains} = generateConstants(answers);
    e.alpha = alpha
    e.beta = beta
    e.cNewbieGains = cNewbieGains
    const targetPace = getTargetPace(userInfo.targetTime);
    e.targetPace = targetPace
    const paces = phi.map(
        (phiValue, i) => ((targetPace * paceConstants[i]) * cNewbieGains * phiValue));
    //paces in s/m
    e.paces = JSON.stringify(paces)
    const currentVelocity = getCurrentVelocity(userInfo.currentTime);
    e.currentVelocity = currentVelocity
    const targetVelocity = getTargetVelocity(userInfo.targetTime);
    // velocities in km/hr
    e.targetVelocity = targetVelocity
    const velocities = paces.map((pace) => (1 / pace) * 3.6);
    e.velocities = JSON.stringify(velocities)
    const speedDifficulty = getSpeedDifficulty(currentVelocity, targetVelocity, velocities)// getSpeedDifficulty(currentVelocity, paces);
    e.speedDifficulty = speedDifficulty
    const restRatio = 1; //todo (the rest the user is going to use)/prescribed rest * 100
    e.restRatio = 1
    const restMultiplier = 1 / Math.exp(0.0024 * restRatio);
    e.restMultiplier = restMultiplier
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
    e.targetDifficulty = targetDifficulty
    const trainingPlanPrimary = primaryIntervalsCopy.reduce(
        (variance, workout) => {
            const workoutVariance = Math.abs(workout[0] - targetDifficulty);
            if (workoutVariance > variance[0]) {
                return variance;
            }
            return [workoutVariance, ...workout];
        }, [10000]);
    // console.log(trainingPlanPrimary)
    e.trainingPlanPrimary = trainingPlanPrimary.slice().splice(3);
    const trainingPlanSecondary = secondaryIntervalsCopy.reduce(
        (variance, workout) => {
            const workoutVariance = Math.abs(workout[0] - targetDifficulty);
            if (workoutVariance > variance[0]) {
                return variance;
            }
            return [workoutVariance, ...workout];
        }, [trainingPlanPrimary[1]]);
    e.trainingPlanSecondary = trainingPlanSecondary
    let trainingPlan = (trainingPlanPrimary[0] > trainingPlanSecondary[0]) ? trainingPlanSecondary : trainingPlanPrimary
    e.trainingPlan = trainingPlan
    //  console.log(trainingPlan)
    trainingPlan.splice(0, 3);
    // console.log(e)
    return e;
};
Papa.parsePromise = (file, conf) => {
    return new Promise((complete, error) => Papa.parse(file, {complete, error, ...conf}))
}

const parseCSVtoJSON = async (path) => {
    const file = fs.createReadStream(path)
    return Papa.parsePromise(file, {header: true, download: false})
}

const appendToFile = (fileName, data) => {
    fs.appendFileSync(fileName, data, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

const createJSONFile = (fileName, data) => {
    appendToFile(fileName, "[\n")
    let j = 0
    for (let i = 0; i < data.length; i++) {
        const JSONdata = JSON.stringify(data[i], null, '\t')
        if (j === 0 && i === 0) {
            appendToFile(fileName, JSONdata)
            j += 1
        } else {
            appendToFile(fileName, ',\n' + JSONdata)
        }
    }
    appendToFile(fileName, "\n]")
}

const ha = (fileName) => {
    const dataToConvert = require('./output.json')

    dataToConvert.forEach((data) => {
        data.trainingPlanPrimary = JSON.stringify(data.trainingPlanPrimary)
        data.trainingPlanSecondary = JSON.stringify(data.trainingPlanSecondary)
        data.trainingPlan = JSON.stringify(data.trainingPlan)
    })
    fs.writeFile('./' + fileName, Papa.unparse(dataToConvert), (err) => {
        if (err) return console.log(err)
        console.log(fileName, 'written successfully')
    })
}

parseCSVtoJSON('./values.csv').then(async ({data}) => {
    if (data[data.length - 1] === '') {
        data.pop()
    }
    const arr = []
    data.forEach((testValues) => {
        arr.push(getTrainingPlan(testValues))
        // console.log(arr[0])
    })
    createJSONFile('./output.json', arr)
    ha('./output.csv')
})



