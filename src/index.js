import getUser from "./main.js";

("use strict");

async function processData(e) {
  // Prevent JS from running the stupid form submission thing - need to remove this line if we actually implement NodeJS
  e.preventDefault();

  const elements = document.getElementById("inputForm").elements;
  const user = {};
  for (let i = 0; i < 4; i++) {
    user[elements[i].name] = elements[i].value;
  }
  console.log(user);
  const display = document.getElementById("display");
  display.innerText =
    "Processing your input - lalala - while waiting, go and shower you filthy dog";
  document.getElementById("inputForm").reset();

  console.log("User data processed");
  display.innerText = await getUser(user);
}

function init() {
  console.log("init done");
  const form = document.getElementById("inputForm");
  form.addEventListener("submit", processData);
}

window.onload = init;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log("SW Registered!");
      console.log(registration);
    })
    .catch((error) => {
      console.log("SW Registration FAILED");
      console.log(error);
    });
} else {
  console.log("application not supported");
}

/*
    var submitBtn = document.getElementById("submitBtn");
   submitBtn.addEventListener("click", () => {
       console.log("clicked");

    let arrayOfValues = [];
    let user = {};
    for (let i = 0; i < 4; i++) {
        arrayOfValues.push(e.target[i].value);
    }
    [user.firstName, user.weight, user.trainTime, user.targetTime] = arrayOfValues;
*/
