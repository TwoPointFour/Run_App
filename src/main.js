import * as DB from "./db.js"

/*const user = {
    "firstName": "XXX",
    "weight": "20",
    "trainTime": 11.3,
    "targetTime": 10
}*/

export default getUser(user) {
    createUser(user);
    console.log(user.weight)
    return "Whatever needs to be returned to the user can be returned through this function"
}

function createUser(user) {
    // DB.create_db(user);
    console.log(user.firstName, " created");
}

function insertData(user) {
    DB.insert_data(user);
}
