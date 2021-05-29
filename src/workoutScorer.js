/*
const Papa = require('papaparse')
const fs = require('fs')
*/
const testObj = {
    permSetCount: "9",
    permDistance: "300",
    setTimes: ["63.75", "63.75", "63.75", "63.75", "63.75", "63.75", "63.75", "63.75", "63.75"], //todo for now code below assumes these set times are in seconds
    permPaceTime: '21250' //in ms
};
//todo would be good to save time and date of workout
/*
const testObj = {
    permSetCount: "9",
    permDistance: "300",
    setTimes: ["63.75", "63.75", "63.75", "63.75", "63.75", "63.75", "63.75"], //todo for now code below assumes these set times are in seconds
    permPaceTime: '21250' //in ms
};
const testObj = {
    permSetCount: "9",
    permDistance: "300",
    setTimes: ["83.75", "83.75", "83.75", "83.75", "63.75", "63.75", "63.75", "63.75", "63.75"], //todo for now code below assumes these set times are in seconds
    permPaceTime: '21250' //in ms
};
const testObj = {
    permSetCount: "9",
    permDistance: "300",
    setTimes: ["83.75", "83.75", "63.75", "63.75", "63.75", "63.75", "63.75", "63.75", "63.75"], //todo for now code below assumes these set times are in seconds
    permPaceTime: '21250' //in ms
};
const testObj = {
    permSetCount: "9",
    permDistance: "300",
    setTimes: ["63.75", "63.75", "63.75", "63.75", "63.75", "63.75", "63.75", "63.75", "63.75"], //todo for now code below assumes these set times are in seconds
    permPaceTime: '21250' //in ms
};
const testObj = {
    permSetCount: "9",
    permDistance: "300",
    setTimes: ["53.75", "63.75", "63.75", "63.75", "63.75", "63.75", "63.75", "63.75", "63.75"], //todo for now code below assumes these set times are in seconds
    permPaceTime: '21250' //in ms
};
const testObj = {
    permSetCount: "9",
    permDistance: "300",
    setTimes: ["23.75", "33.75", "63.75", "63.75", "63.75", "63.75", "63.75", "63.75", "63.75"], //todo for now code below assumes these set times are in seconds
    permPaceTime: '21250' //in ms
};*/

//todo get rid of the retarded parseFloat all over the place
const getMissed = (previousWorkout) => previousWorkout.permSetCount - previousWorkout.setTimes.length;

const getAverageTime = (previousWorkout) => {
    const setTimes = previousWorkout.setTimes
    return setTimes.reduce((total, setTime) => total + parseFloat(setTime), 0) / previousWorkout.setTimes.length
}

const getStandardDeviation = (previousWorkout) => {
    const mean = getAverageTime(previousWorkout);
    return Math.sqrt(
        previousWorkout.setTimes
            .map((set) => Math.pow(set - mean, 2))
            .reduce((total, value) => total + value, 0) / previousWorkout.setTimes.length
    );
};

const getGoalSetTime = (previousWorkout) => parseFloat(previousWorkout.permPaceTime) / 1000 * parseFloat(previousWorkout.permDistance) / 100;

//todo confirm values
const kValue = 0.25;
const yValue = 1.25;

const penaliseMissed = (missed, previousWorkout) => (Math.exp(missed / parseFloat(previousWorkout.permSetCount)) - 1) * yValue

const getWorkoutScore = (previousWorkout) => {
    if (!previousWorkout.setTimes.length) {
        return {goalTimePerSet: 0, averageTime: 0, standardDeviation: 0, missed: 0, workoutScore: 0}
    }
    const goalTimePerSet = getGoalSetTime(previousWorkout)
    const averageTime = getAverageTime(previousWorkout)
    const standardDeviation = getStandardDeviation(previousWorkout)
    const missed = getMissed(previousWorkout)
    const workoutScore = 100 * ((goalTimePerSet / averageTime) + (Math.exp(standardDeviation / goalTimePerSet) - 1) * (kValue) - penaliseMissed(missed, previousWorkout));
    console.log('Previous workout score:', workoutScore)
    return workoutScore// {goalTimePerSet, averageTime, standardDeviation, missed, workoutScore}
}

export const scoredWorkouts = (previousWorkout) => getWorkoutScore(testObj)
/*

Papa.parsePromise = (file, conf) => {
    return new Promise((complete, error) => Papa.parse(file, {complete, error, ...conf}))
}

const parseCSVtoJSON = async (path) => {
    const file = fs.createReadStream(path)
    return Papa.parsePromise(file, {header: true, download: false})
}

const ha = (fileName, arr) => {
    fs.writeFile('./' + fileName, Papa.unparse(arr), (err) => {
        if (err) return console.log(err)
        console.log(fileName, 'written successfully')
    })
}

const names = ['random', 'standardDeviation', 'averageTime', 'missedSets']

const generateFiles = () => {
    names.forEach((name) => {
        parseCSVtoJSON('./' + name + '.csv').then(async ({data}) => {
            if (data[data.length - 1] === '') {
                data.pop()
            }
            const arr = []
            data.forEach((testValue) => {
                const setTimes = []
                for (let key of Object.keys(testValue)) {
                    if (key.match(/setTime/)) {
                        if (testValue[key] !== '') {
                            setTimes.push(testValue[key])
                        }
                        delete testValue[key]
                    }
                }
                testValue.setTimes = setTimes
                // console.log(testValue)
                arr.push(scoredWorkouts(testValue))
            })
            ha('./' + name + 'Results.csv', arr)
        })
    })
}

module.exports.scoredWorkouts = scoredWorkouts*/
