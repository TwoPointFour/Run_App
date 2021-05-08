export const timer__modal = `
<div class="container interval__modal">
      <div
        class="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel">Guide to TwoPointFour Train | Timer</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>
              Welcome to your customised workout. This screen is a stopwatch timer that has been pre-programmed with your workout details. This timer is set to the pace that you need to run each 100m in the interval in. The time displayed on the screen is how long you have to run the next 100m of your workout. Click the various buttons to understand what each one does.
              </p>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-warning"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel2">
                Timer Controls Guide
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <img class="modal-image" src="../images/tutorial/timer_controls.jpg" />
              <h5>Start</h5>
              <p>
              Pressing this button starts the workout.
              </p>
              <h5>Split</h5>
              <p>Press this button when you have completed the required distance for your set. Your time taken for the set will be recorded automatically. It will automatically start the rest countdown before the start of your next set.</p>
              <h5>Pause</h5>
              <p>Press this button to pause the entire workout.</p>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-warning"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Back
              </button>
              <button
                class="btn btn-warning"
                data-bs-target="#exampleModalToggle3"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModalToggle3"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel3"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel3">
                Timers Guide
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <img class="modal-image" src="../images/tutorial/timer_types.jpg" />
              <h5>Big Timer (in black)</h5>
              <p>
                This is a countdown timer. It shows you how much time you have left to run the current 100m, based on the seconds / 100m pace set out by your training plan.
              </p>
              <h5>Small Timer (in grey)</h5>
              <p>
                This is a countup timer. It records the time elapsed since the start of your current set. Pressing split will record the time elpased into the table below.
              </p>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-warning"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Back
              </button>
              <button
                class="btn btn-warning"
                data-bs-target="#exampleModalToggle4"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModalToggle4"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel4"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel4">
                Timer HUD Guide
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <img class="modal-image" src="../images/tutorial/timer_hud.jpg" />
              <h5>Set Tracker </h5>
              <p>
                This shows you which set of your training you are currently on.
              </p>
              <h5>Distance Tracker</h5>
              <p>
                This showns you the distance which you should be at based on your targeted pace.
              </p>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-warning"
                data-bs-target="#exampleModalToggle3"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Back
              </button>
              <button
                class="btn btn-warning"
                data-bs-target="#exampleModalToggle5"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModalToggle5"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel5"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel5">Completing and Saving your Workout</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
            <img class="modal-image" src="../images/tutorial/timer_complete.jpg" />
              <p>To complete your workout, scroll down and press the save button. Afterwhich, press the complete workout button. Always remember to press the save button first!
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-warning"
                data-bs-target="#exampleModalToggle3"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Back
              </button>
              <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
`;

export const interval_modal = `
<div class="container interval__modal">
      <div
        class="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel">Guide to Interval Training</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>
                Interval training is a type of high-intensity training that involves several short,
                fast paced runs with a small rest in between. Try to do these intervals on a track,
                or park connector with accurate distance markers.
              </p>
              <p>
                Interval training consists of 2 parts. The first part is a fast run, where you run
                quickly for a specified distance at a certain pace. The second part is a rest, for
                you to recover after the fast run. Try to jog around slowly during the rest. You
                will repeat this cycle, or set several times to complete the training.
              </p>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-warning"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel2">
                Understanding an example Training Plan
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <img class="modal-image" src="../images/tutorial/training_plan.jpg" />
              <h5>Set</h5>
              <p>
                This box tells you how many sets you have to run. Each set consists of 1 fast run,
                and one rest. Try your best to complete all of the sets in the training.
              </p>
              <h5>Distance</h5>
              <p>This box tells you how far you will have to run for each interval set.</p>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-warning"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Back
              </button>
              <button
                class="btn btn-warning"
                data-bs-target="#exampleModalToggle3"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModalToggle3"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel3"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel3">
                Understanding an example Training Plan
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <img class="modal-image" src="../images/tutorial/training_plan.jpg" />
              <h5>Rest</h5>
              <p>
                This box tells you how long you can rest (in seconds) once you have completed the
                fast run. Ensure that you monitor this throughout the training
              </p>
              <h5>Pace</h5>
              <p>
                This box tells you how fast you must run each 100m segment in order to hit the
                target time for this training. Aim to run each 100m segment of your training as
                close to the time in this box as possible. Use this information to monitor if you
                are running too fast, or slow.
              </p>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-warning"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Back
              </button>
              <button
                class="btn btn-warning"
                data-bs-target="#exampleModalToggle4"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModalToggle4"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel4"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel4">Proceed to workout</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Close this tutorial and click on Proceed to Workout to start your training!
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-warning"
                data-bs-target="#exampleModalToggle3"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Back
              </button>
              <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
`;
