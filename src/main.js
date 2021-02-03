import * as DB from "./db.js"

const user = {
    "name": "XXX",
    "train_time": 11.3,
    "target_time": 10
}
DB.create_db(user);
console.log(user)

DB.insert_data(user);

