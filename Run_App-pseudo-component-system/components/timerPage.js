export const timer = `
<div class="container-fluid DistanceTimer">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8 col-sm-10 col-xs-12 timer pl-4 pr-4">
          <div class="row d-flex align-items-center justify-content-center">
            <div id="bigtime" class="secten col-2 display-1 timersec">0</div>
            <div id="bigtime" class="secone col-2 display-1 timersec">0</div>
            <div id="bigtime" class="col-2 display-1 timersec">:</div>
            <div id="bigtime" class="milliten col-2 display-1 timersec">0</div>
            <div id="bigtime" class="millione col-2 display-1 timersec">0</div>
          </div>

          <div class="row justify-content-center mb-4">
            <div class="col-6 display-6 timermin smalltime">00:00</div>
          </div>

          <div class="row smallcard mb-3">
            <div class="col-6 titlecard">Set</div>
            <div class="col-6 valuecard currrep">0</div>
          </div>
          <div class="row smallcard">
            <div class="col-6 titlecard">Distance</div>
            <div class="col-6 valuecard currdist">0m</div>
          </div>
          <!-- User Control Buttons -->
          <div class="row mb-2 mt-4">
            <div class="col-4">
              <button type="button" class="btn-lg btn btn-outline-success ctrlbtn timerstart">
                Start
              </button>
            </div>
            <div class="col-4">
              <button type="button" class="btn-lg btn btn-outline-danger ctrlbtn timersplit">
                Split
              </button>
            </div>
            <div class="col-4">
              <button type="button" class="btn-lg btn btn-outline-warning ctrlbtn timerpause">
                Pause
              </button>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <button type="button" class="audioactivate mt-4 btn btn-outline-info btmnav">
                🔊 Enable Audio (iOS users)
              </button>
            </div>
            <div class="col-6">
            <a class="mt-4 btn btn-warning" data-bs-toggle="modal" href="#exampleModalToggle" role="button"
            >Timer Tutorial</a
          >
            </div>
          </div>
          <!-- END OF User Control Buttons-->

          <!-- Live Training Records-->
          <div class="row justify-content-start">
            <div class="col-12 mt-5 h5">Current Training Timings</div>
          </div>
          <div class="row justify-content-center trainingDataTable">
            <table class="table">
              <thread>
                <tr>
                  <th scope="col">Set</th>
                  <th scope="col">Time</th>
                  <th scope="col">Target</th>
                </tr>
              </thread>
              <tbody class="timerecord"></tbody>
            </table>
            <!-- END OF Live Training Records-->
          </div>
          <div class="row">
            <div class="col-6">
              <a class="mt-4 saveTraining btn btn-warning" role="button">Save</a>
            </div>
            <div class="col-6">
              <a class="mt-4 completeTraining btn btn-warning" role="button" href="track.html?"
                >Complete Training</a
              >
            </div>
          </div>
        </div>
      </div>
      <audio class="audioenable">
        <source src="../callouts/audioenabled.mp3" />
      </audio>
    </div>
`;
