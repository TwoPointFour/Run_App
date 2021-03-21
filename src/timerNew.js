export function initialiseTimer(input) {
  document.querySelector(".timerstart").addEventListener("click", function () {
    document.querySelector(".timerstart").classList.add("disabled");
    document.querySelector(".timerpause").classList.remove("disabled");
    let timerUpdateInterval = 1000;
    let expectedFunctionExecutionTime = Date.now() + timerUpdateInterval;
    setTimeout(updateCountdown.bind(null, timerUpdateInterval, expectedFunctionExecutionTime), timerUpdateInterval);
  });
}

function updateCountdown(timerUpdateInterval, expectedFunctionExecutionTime) {
  const lagTime = Date.now() - expectedFunctionExecutionTime;
  console.log(`${lagTime} (Lag Time) = ${Date.now()} (Datenow) - ${expectedFunctionExecutionTime} (expected time)`);
  expectedFunctionExecutionTime += 1000;
  setTimeout(updateCountdown.bind(null, timerUpdateInterval, expectedFunctionExecutionTime), Math.max(0, timerUpdateInterval - lagTime));
}
