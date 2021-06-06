// 4xxx_y

/*
Get tod0.txt from office Dell
Also Jlow wants to implement a way to change the workout scorer and generator both if user chooses his own custom rest time
Commitment per week - if it changes halfway through --> skip workout --> if workout skipped or if current date doesn't match the date the next workout was supposed to happen calculated from date when last workout was done, change currentFitness
if user chooses 3 workouts per week, but if he only wants to do 1 or 2, suggest both to be distance intervals unless the number of days between the 2 workouts is 3 or less then suggest 1 distance interval and 1 filler workout
Filler workout convert from Word
See how Yi Hein implemented the currentFitness or suggest the second workout logic

edge cases - 20 min current vs 10 target --> suggest easier workout in the sense that he does smaller distances --> add easier workouts

if user is doing more than 3 workouts a week, and if misses one, we penalise him --> but assuming that we only penalise skipped distance interval workouts, the guy who was doing 2 distance intervals will have a lower fitness than someone who does only 1 distance interval a week and does it consistently

if user skips workout, how much of fitness penalty to give --> a guy who does 3 workouts a week vs a guy who does a workout a week --> do we only penalise
cycles of 3

convert Jlow's fillerworkout notes to unit tests

suggest pyramid workout

implement something like a linked list for filler workouts instead of the stupid 'end' field and having multiple objects

need to save goal and tempo pace as well
 */

const times = [[20, 23, 26, 29, 32, 35, 38, 40], [25, 28, 31, 34, 37, 40, 43, 46], [30, 32.5, 35, 37.5, 40, 42.5, 45, 47.5], [36, 38, 40, 42, 44, 46, 48, 50], [40, 42, 44, 46, 48, 50, 52, 54]]
const alphas = [0.2, 0.4, 0.6, 0.8, 1.0]
const workouts = []

let yzx = 4000
const xx = () => {
    for (let i = 0; i < alphas.length; i++) {
        for (let j = 0; j < times[i].length; j++) {
            const workout_ID = (yzx).toString()
            yzx++
            const x = {
                date: 'unset',
                workout_ID,
                type: "Filler Workout",
                segment: "long distance",
                alpha: alphas[i],
                parts: [{part_ID: workout_ID + '_0', runTime: times[i][j], weekAt: (j + 1).toString(), end: (j === times[i].length - 1)}]
            }
            workouts.push(x)
        }
    }
}

xx()
console.log(JSON.stringify(workouts, null, '\t'))

const fsets = [[10, 10, 10, 10, 11, 12, 13], [10, 11, 12, 13, 8, 9, 10], [8, 9, 10, 10, 10, 10, 10, 10], [10, 10, 10, 10, 8, 8, 8]]
const fdistance = [[200, 200, 200, 200, 200, 200, 200], [200, 200, 200, 200, 300, 300, 300], [300, 300, 300, 300, 300, 300, 300, 300], [300, 300, 300, 300, 400, 400, 400]]
const fjogdistance = [[100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100], [100, 100, 100, 200, 200, 200, 200, 200], [200, 200, 200, 200, 200, 200, 200]]
const fjogtime = [[75, 70, 65, 60, 60, 60, 60], [60, 60, 60, 60, 60, 60, 60], [60, 60, 60, 80, 75, 70, 65, 60]]
const falphas = [0.4, 0.6, 0.8, 1.0]
const returnJogSession = (distance, time) => "return " + (parseInt(time) / parseInt(distance)).toString()
const returnCustomJogSession = () => "return tempoPace + 0.025"
const fjogsessionpace = [returnJogSession, returnJogSession, returnJogSession, returnCustomJogSession]
const sessionPace = (i) => "return goalPace"
const customSessionPaces = [0.01, 0.01, 0.01, 0.01, 0.01, 0.0075, 0.005]
const calculateCustomSessionPace = (i) => "return goalPace + " + customSessionPaces[i]
const calculateCustomSessionPaceEarlier = (i) => "return goalPace + 0.01"
const customSessionPace = [sessionPace, sessionPace, calculateCustomSessionPaceEarlier, calculateCustomSessionPace]

//jogbyDistance
//fix 400 or 4000

let xyz = 5000
const yy = () => {
    for (let i = 0; i < falphas.length; i++) {
        for (let j = 0; j < fsets[i].length; j++) {
            const workout_ID = (xyz).toString()
            xyz++
            // console.log(workout_ID)
            let jogPace
            if (i === 3) {
                jogPace = fjogsessionpace[i]()
            }
            else {
                jogPace = fjogsessionpace[i](fjogdistance[i][j], fjogtime[i][j])
            }
            const sprintPace = customSessionPace[i](j)
            const x = {
                date: 'unset',
                workout_ID,
                type: "Filler Workout",
                segment: "fartlek",
                alpha: falphas[i],
                parts: [{part_ID: workout_ID + '_0', sprintSets: fsets[i][j], sprintDistance: fdistance[i][j], jogPace, sprintPace, weekAt: (j + 1).toString()}]
            }
            if (i === 3) {
                x.parts[0]["jogByDistance"] = 200
            }
            else {
                x.parts[0]["jogByTime"] = fjogtime[i][j]
            }
            workouts.push(x)
        }
    }
}

// yy()
// console.log(JSON.stringify(workouts, null, '\t'))

const fillerWorkouts = {
    '4001': {
        'alpha': 0.2,
        '1': 20,
        '2': 23,
        '3': 26,
        '4': 29,
        '5': 32,
        '6': 35,
        '7': 38,
        'ceiling': 40
    }
}