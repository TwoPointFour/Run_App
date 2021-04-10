//todo would be good to save time and date of workout
const testObj = {
    permSetCount: '5',
    permDistance: '300',
    setTimes: ['120', '120', '120'], //todo for now code below assumes these set times are in seconds
    permSetTimeMin: '2',
    permSetTimeSec: '10'
}

//todo penalise user for having missed sets
//todo get rid of the retarded parseInt all over the place
const missed = (previousWorkout) => previousWorkout.permSetCount - previousWorkout.setTimes.length

const previousWorkouts = [testObj, testObj]

const convertMinToSec = (min, sec) => {
    return parseInt(min) + parseInt(sec) * 60
}

const getAverageTime = (previousWorkout, n) => (previousWorkout.setTimes.reduce((total, setTime) => total + parseInt(setTime), 0) / n)

const getStandardDeviation = (previousWorkout) => {
    const n = previousWorkout.setTimes.length
    const mean = getAverageTime(previousWorkout, n)
    return Math.sqrt(previousWorkout.setTimes.map(set => Math.pow(set - mean, 2)).reduce((total, value) => total + value, 0) / n)
}

const goalTimePerSet = (previousWorkout) => parseInt(previousWorkout.permPaceTime) * parseInt(previousWorkout.permDistance)

//todo confirm values
const kValue = 0.2
const yValue = 2.5

const getWorkoutScore = (previousWorkout) => {
    return 100 * (goalTimePerSet(previousWorkout) / getAverageTime(previousWorkout) + (Math.exp(kValue) - 1) * (getStandardDeviation(previousWorkout) / parseInt(previousWorkout.permPaceTime)) - (Math.exp(yValue) * missed(previousWorkout) / parseInt(previousWorkout.permSetCount)))
}

export const scoredWorkouts = () => {
    return previousWorkouts.map((previousWorkout) => {
        return {
            ...previousWorkout,
            workoutScore: getWorkoutScore(previousWorkout)
        }
    })
}