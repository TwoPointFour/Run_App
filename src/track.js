"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const runData = {};

function packageData() {
  for (const pair of urlParams.entries()) {
    runData[pair[0]] = pair[1];
  }
  console.log(runData);
}

function displayData() {
  document.querySelector("#display-suggest").insertAdjacentHTML(
    "beforeend",
    `
  <div class="col-lg-8 suggestCard">
    <div class="row suggestCardHead">
      <div class="col-lg-12">
        <h4 class="text-start head4 mt-1">
          <span class="align-middle infoChip me-3">${runData.trainingDate}</span>
          Distance&nbspInterval Training
        </h4>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-lg-1 mb-2 partCard d-flex align-items-center justify-content-center">
        <h3 class="head3" style="margin: 0">Part 1</h3>
      </div>
      <div class="col-lg-11 detailsCard">
        <div class="row d-flex justify-content-around">
          <div class="col mb-2 text-center suggestChip">Sets:&nbsp${runData.permSetCount}</div>
          <div class="col mb-2 text-center suggestChip">Distance:&nbsp${runData.permDistance}m</div>
          <div class="col mb-2 text-center suggestChip">Set&nbspTime:&nbsp${
            runData.permSetTimeMin
          }:${addZeroSecNew(runData.permSetTimeSec)}</div>
          <div class="col mb-2 text-center suggestChip">Pace:&nbsp${
            runData.permPaceTime / 1000
          }s&nbsp/&nbsp100m</div>
        </div>
        <div class="row d-flex justify-content-center d-none runTimeTable">
          <table class="table text-center">
            <thread>
              <tr>
                <th scope="col">Set</th>
                <th scope="col">Time</th>
                <th scope="col">Target</th>
              </tr>
            </thread>
            <tbody class="runTimes">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  `
  );
  for (let set = 1; set <= 30; set++) {
    const [minutes, seconds] = toMinutesSeconds(runData[set]);
    const padMinutes = addZeroSecNew(minutes);
    const padSeconds = addZeroSecNew(seconds);
    runData[set] &&
      document.querySelector(".runTimes").insertAdjacentHTML(
        "beforeend",
        `
    <tr>
                <th scope="row">${set}</th>
                <td>${padMinutes}:${padSeconds}</td>
                <td>not set</td>
              </tr>`
      );
  }
}

function showDetails() {
  document.querySelector(".suggestCard").addEventListener("click", function () {
    document.querySelector(".runTimeTable").classList.toggle("d-none");
  });
}

packageData();
displayData();
showDetails();

function toMinutesSeconds(milliseconds) {
  const minutes = Math.floor(milliseconds / (1000 * 60));
  const seconds = Math.floor((milliseconds - minutes * 1000 * 60) / 1000);
  return [minutes, seconds];
}

function addZeroSecNew(numchange) {
  return numchange.toString().padStart(2, "0");
}
