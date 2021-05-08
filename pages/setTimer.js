import { initialiseTimer } from "../src/timer.js";
import { initialiseTimer as initialiseRestTimer } from "../src/restTimer.js";
import { timer } from "../components/timerPage.js";
import { nav__loggedin } from "../components/nav.js";
import { timer__modal } from "../components/modal.js";

function generatePage(div1, div2, div3) {
  console.log("activated!");
  document.querySelector(".root").innerHTML = div1 + div2 + div3;
}

generatePage(nav__loggedin, timer, timer__modal);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlUserInput = {};
for (const pair of urlParams.entries()) {
  urlUserInput[pair[0]] = pair[1];
}
initialiseRestTimer(urlUserInput);
