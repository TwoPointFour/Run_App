import getUser from './main.js';

'use strict';

async function processData(e) {
    // Prevent JS from running the stupid form submission thing - need to remove this line if we actually implement NodeJS
    e.preventDefault();

    const display = document.getElementById("display");
    display.innerText = "Processing your input - lalala - while waiting, go and shower you filthy dog";
    document.getElementById("inputForm").reset();

    let arrayOfValues = [];
    let user = {};
    for (let i = 0; i < 4; i++) {
        arrayOfValues.push(e.target[i].value);
    }
    [user.firstName, user.weight, user.trainTime, user.targetTime] = arrayOfValues;
    // console.log(user);
    display.innerText = await getUser(JSON.stringify(user, null, '\t'));
}

function init() {
    console.log("init done");
    const form = document.getElementById("inputForm");
    form.addEventListener("submit", processData);
}

window.onload = init;

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("SW Registered!");
        console.log(registration);
    }).catch(error => {
        console.log("SW Registration FAILED");
        console.log(error);
    });
}
else {
    console.log("application not supported");
}

/*var submitBtn = document.getElementById("submitBtn");
   submitBtn.addEventListener("click", () => {
       console.log("clicked");*/

export default function lol() {
    return;
}
