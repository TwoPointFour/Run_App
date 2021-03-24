import { account_1 } from "./script.js";

document.querySelector(".loadData").addEventListener("click", function () {
  console.log("Data loading...");
  console.log(account_1.data);
  account_1.data.forEach(function (trainingData, i, arr) {
    const {
      permSetCount,
      permDistance,
      permPaceCount,
      permSetTimeMin,
      permSetTimeSec,
    } = trainingData;
    document.querySelector(".trainingList").innerHTML += `
        <div class="btn btn-outline-dark recordcard mb-3">
            <div class="row justify-content-center mb-3">
              <h5>Training Name (Date: )</h5>
            </div>
            <div class="row justify-content-center">
              <div class="d-grid col-3">
                <h6>Sets: ${permSetCount}</h6>
              </div>
              <div class="d-grid col-3">
                <h6>Distance: ${permDistance}</h6>
              </div>
              <div class="d-grid col-3">
                <h6>Set Time: ${permSetTimeMin}:${permSetTimeSec}</h6>
              </div>
              <div class="d-grid col-3">
                <h6>Type</h6>
              </div>
            </div>
          </div>`;
  });
});
