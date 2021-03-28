const testObj = {
    permSetCount: '2',
    permDistance: '3',
    permPaceTime: '2',
    permSetTimeMin: '2',
    permSetTimeSec: '2'
}

const test = [testObj, testObj]

const missedSets = 2

const convertMinToSec = (min, sec) => {
    return parseInt(min) + parseInt(sec) * 60
}

const getAverageTime = (test) => {
    return (test.reduce((total, set) => {
        return (parseInt(total) + convertMinToSec(set.permSetTimeMin, set.permSetTimeSec))
    }, 0) / test.length)
}

const getStandardDeviation = (test) => {
    const mean = getAverageTime(test)
    return Math.sqrt(test.map(x => Math.pow(convertMinToSec(set.permSetTimeMin, set.permSetTimeSec) - mean, 2)).reduce((total, b) => total + b, 0) / (test.length - 1))
}

const goalTime = (testObj) => {
    return parseInt(testObj.permPaceTime) * parseInt(testObj.permDistance) * parseInt(permSetCount)
}

const getWorkoutScore = () => {
    return 100 * (goalTime(testObj)/getAverageTime(test))
}