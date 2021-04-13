//todo would be good to save time and date of workout
const testObj = {
  permSetCount: "5",
  permDistance: "300",
  setTimes: ["120", "120", "120"], //todo for now code below assumes these set times are in seconds
  permSetTimeMin: "2",
  permSetTimeSec: "10",
};

//todo penalise user for having missed sets
//todo get rid of the retarded parseInt all over the place
const missed = (previousWorkout) => previousWorkout.permSetCount - previousWorkout.setTimes.length;

const previousWorkouts = [testObj, testObj];

const convertMinToSec = (workout) => parseInt(workout.permSetTimeMin) * 60 + parseInt(workout.permSetTimeSec);

const getAverageTime = (previousWorkout) => {
  return (
    previousWorkout.setTimes.reduce((total, setTime) => {
      return total + parseInt(setTime);
    }, 0) / previousWorkout.setTimes.length
  );
};

const getStandardDeviation = (previousWorkout) => {
  const mean = getAverageTime(previousWorkout);
  return Math.sqrt(
    previousWorkout.setTimes
      .map((set) => Math.pow(set - mean, 2))
      .reduce((total, value) => total + value, 0) / previousWorkout.setTimes.length
  );
};

const goalTimePerSet = (previousWorkout) =>
  convertMinToSec(previousWorkout) //* parseInt(previousWorkout.permDistance);

//todo confirm values
const kValue = 0.2;
const yValue = 2.5;

const getWorkoutScore = (previousWorkout) =>
  100 *
  (goalTimePerSet(previousWorkout) / getAverageTime(previousWorkout) +
    (Math.exp(kValue) - 1) *
      (getStandardDeviation(previousWorkout) / convertMinToSec(previousWorkout)) -
    (Math.exp(yValue) * missed(previousWorkout)) / parseInt(previousWorkout.permSetCount));

export const scoredWorkouts = () => {
  return previousWorkouts.map((previousWorkout) => {
    return {
      ...previousWorkout,
      workoutScore: getWorkoutScore(previousWorkout),
    };
  });
};
// module.exports.scoredWorkouts = scoredWorkouts