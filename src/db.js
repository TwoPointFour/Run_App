let db = null;

let records = {
  name: "XXX",
  train_time: 11.3,
  target_time: 10,
};

export default class User {
  constructor(name, train_time, target_time, datetime) {
    this.name = name;
    this.train_time = train_time;
    this.target_time = target_time;
    this.datetime = datetime;
  }
}

export function create_db() {
  if (window.indexedDB) {
    var request = indexedDB.open("runDB", 1);
    request.onerror = function (e) {
      console.log("Problem! ", e);
    };
    request.onsuccess = function (e) {
      db = e.target.result;
      console.log("Success! DB Opened!");
      insert_data(records);
    };
    request.onupgradeneeded = function (e) {
      db = e.target.result;
      const store = db.createObjectStore("Run_Time", { keypath: "name" });
      store.transaction.oncomplete = function (e) {
        console.log("Store creation Sucess!");
      };
    };
  }
}

export function delete_db() {
  const request = indexedDB.deleteDatabase("runDB");
  request.onsuccess = function () {
    console.log("DB deleted!");
  };
  request.onerror = function () {
    console.log("Unable to delete DB!");
  };
}

export function insert_data(records) {
  if (db) {
    const insert_transaction = db.transaction(["Run_Time"], "readwrite"); //stores in []
    const store = insert_transaction.objectStore("Run_Time");

    insert_transaction.onerror = function () {
      console.log("Error in transactions!");
    };

    insert_transaction.oncomplete = function () {
      console.log("Completed all transactions!");
    };

    records.forEach((record) => {
      // records to be stored in JSON format {"name": "XXX", "time": xx.xx}
      let request = store.add(record);
      request.onerror = function () {
        console.log("Error in adding record!");
      };
      request.onsuccess = function () {
        console.log("Successfully added ", record);
      };
    });
  } else {
    console.log("Error in Insert Data Function");
  }
}

export function get_record(name) {
  if (db) {
    const get_transaction = db.transaction(["Run_Time"], "readonly"); //stores in []
    const store = get_transaction.ObjectStore("Run_Time");

    get_transaction.onerror = function () {
      console.log("Error in transactions!");
    };

    get_transaction.oncomplete = function () {
      console.log("Completed all transactions!");
    };

    let request = store.get(name);

    request.onerror = function () {
      console.log("Error in getting ", name);
    };
    request.onsuccess = function (e) {
      console.log("Successfully retrieved ", e.target.result);
    };
  }
}

export function update_record(record) {
  if (db) {
    const update_transaction = db.transaction(["Run_Time"], "readonly"); //stores in []
    const store = update_transaction.ObjectStore("Run_Time");

    update_transaction.onerror = function () {
      console.log("Error in transactions!");
    };

    update_transaction.oncomplete = function () {
      console.log("Completed all transactions!");
    };

    let request = store.put(record);

    request.onerror = function () {
      console.log("Error in getting ", record);
    };
    request.onsuccess = function (e) {
      console.log("Successfully retrieved ", e.target.result);
    };
  }
}

export function delete_record(name) {
  if (db) {
    const delete_transaction = db.transaction(["Run_Time"], "readonly"); //stores in []
    const store = delete_transaction.ObjectStore("Run_Time");

    delete_transaction.onerror = function () {
      console.log("Error in transactions!");
    };

    delete_transaction.oncomplete = function () {
      console.log("Completed all transactions!");
    };

    let request = store.delete(name);

    request.onerror = function () {
      console.log("Error in deleting ", name);
    };
    request.onsuccess = function () {
      console.log("Successfully deleted record of ", name);
    };
  }
}

create_db(records);
