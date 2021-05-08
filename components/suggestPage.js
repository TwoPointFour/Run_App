export const questionnaire = `
<div class="container-fluid questionnaireProfile d-none">
      <div class="slideNav">
        <div class="row">
          <h2 class="head2 text-center questionnaireTitle">
            Runner's Profile <span class="ms-2 progressChip">12%</span>
          </h2>
        </div>
        <div class="row mb-3 d-flex justify-content-center">
          <div class="col d-flex justify-content-center dotsContainer"></div>
        </div>
      </div>
      <div class="slider">
        <div class="questionCard position-absolute slide slide--1">
          <div class="row">
            <div class="col-lg-12">
              <h3 class="head2 text-start">
                <span class="head1">1</span><span class="head3 me-3">/8</span> Do you run on a
                regular basis?
              </h3>
              <div class="metaDescription">Give us a general sensing of your running habits.</div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-6 d-flex justify-content-center">
              <input
                type="radio"
                class="btn-check runRegular"
                name="options-outlined"
                id="success-outlined"
                autocomplete="off"
                data-run-regular="yes"
              />
              <label class="btn btn-outline-success checkboxBtn" for="success-outlined">Yes</label>
            </div>
            <div class="col-6 d-flex justify-content-center">
              <input
                type="radio"
                class="btn-check runRegular"
                name="options-outlined"
                id="danger-outlined"
                autocomplete="off"
                data-run-regular="no"
              />
              <label class="btn btn-outline-danger checkboxBtn" for="danger-outlined">No</label>
            </div>
          </div>
          <div class="row d-flex mt-5 justify-content-between">
            <div class="col-3 d-flex justify-content-start">
              <button class="btn btn-secondary reverseBtn">Back</button>
            </div>
            <div class="col-3 d-flex justify-content-end">
              <button class="btn btn-warning proceedBtn">Next</button>
            </div>
          </div>
        </div>
        <div class="questionCard position-absolute slide slide--2">
          <div class="row mb-3">
            <div class="col-lg-12">
              <h3 class="head2 text-start">
                <span class="head1">2</span><span class="head3 me-3">/8</span> On average, how many
                times do you run per week?
              </h3>
              <div class="metaDescription">Try to give as precise of an answer as possible.</div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="form-floating mb-2">
                <input
                  type="email"
                  class="form-control fFrequency"
                  id="floatingInput"
                  placeholder="Hello"
                />
                <label for="floatingInput">runs / week</label>
              </div>
            </div>
          </div>
          <div class="row d-flex mt-5 justify-content-between">
            <div class="col-3 d-flex justify-content-start">
              <button class="btn btn-secondary reverseBtn">Back</button>
            </div>
            <div class="col-3 d-flex justify-content-end">
              <button class="btn btn-warning proceedBtn">Next</button>
            </div>
          </div>
        </div>
        <div class="questionCard position-absolute slide slide--3">
          <div class="row mb-3">
            <div class="col-lg-12">
              <h3 class="head2 text-start">
                <span class="head1">3</span><span class="head3 me-3">/8</span> How far do you run
                each training on average?
              </h3>
              <div class="metaDescription">Try to give as precise of an answer as possible.</div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="form-floating mb-2">
                <input
                  type="email"
                  class="form-control dDistance"
                  id="floatingInput"
                  placeholder="Hello"
                />
                <label for="floatingInput">metres</label>
              </div>
            </div>
          </div>
          <div class="row d-flex mt-5 justify-content-between">
            <div class="col-3 d-flex justify-content-start">
              <button class="btn btn-secondary reverseBtn">Back</button>
            </div>
            <div class="col-3 d-flex justify-content-end">
              <button class="btn btn-warning proceedBtn">Next</button>
            </div>
          </div>
        </div>
        <div class="questionCard position-absolute slide slide--4">
          <div class="row mb-3">
            <div class="col-lg-12">
              <h3 class="head2 text-start">
                <span class="head1">4</span><span class="head3 me-3">/8</span> How many months have
                you been training regularly for?
              </h3>
              <div class="metaDescription">Try to give as precise of an answer as possible.</div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="form-floating mb-2">
                <input
                  type="email"
                  class="form-control lMonths"
                  id="floatingInput"
                  placeholder="Hello"
                />
                <label for="floatingInput">months</label>
              </div>
            </div>
          </div>
          <div class="row d-flex mt-5 justify-content-between">
            <div class="col-3 d-flex justify-content-start">
              <button class="btn btn-secondary reverseBtn">Back</button>
            </div>
            <div class="col-3 d-flex justify-content-end">
              <button class="btn btn-warning proceedBtn">Next</button>
            </div>
          </div>
        </div>
        <div class="questionCard position-absolute slide slide--5">
          <div class="row mb-3">
            <div class="col-lg-12">
              <h3 class="head2 text-start">
                <span class="head1">5</span><span class="head3 me-3">/8</span>
                Input your personal bests
              </h3>
              <div class="metaDescription">
                [Optional] Leave the fields blank if you are not sure
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3 d-flex justify-content-center align-items-center">
              <h3 class="head2">800m</h3>
            </div>
            <div class="col-9">
              <div class="form-floating mb-2">
                <input type="email" class="form-control d800" id="floatingInput" placeholder="#" />
                <label for="floatingInput">mm:ss</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3 d-flex justify-content-center align-items-center">
              <h3 class="head2">1500m</h3>
            </div>
            <div class="col-9">
              <div class="form-floating mb-2">
                <input type="email" class="form-control d1500" id="floatingInput" placeholder="#" />
                <label for="floatingInput">mm:ss</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3 d-flex justify-content-center align-items-center">
              <h3 class="head2">3000m</h3>
            </div>
            <div class="col-9">
              <div class="form-floating mb-2">
                <input type="email" class="form-control d3000" id="floatingInput" placeholder="#" />
                <label for="floatingInput">mm:ss</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3 d-flex justify-content-center align-items-center">
              <h3 class="head2">5000m</h3>
            </div>
            <div class="col-9">
              <div class="form-floating mb-2">
                <input type="email" class="form-control d5000" id="floatingInput" placeholder="#" />
                <label for="floatingInput">mm:ss</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3 d-flex justify-content-center align-items-center">
              <h3 class="head2">10 000m</h3>
            </div>
            <div class="col-9">
              <div class="form-floating mb-2">
                <input
                  type="email"
                  class="form-control d10000"
                  id="floatingInput"
                  placeholder="#"
                />
                <label for="floatingInput">hh:mm:ss</label>
              </div>
            </div>
          </div>
          <div class="row d-flex mt-5 justify-content-between">
            <div class="col-3 d-flex justify-content-start">
              <button class="btn btn-secondary reverseBtn">Back</button>
            </div>
            <div class="col-3 d-flex justify-content-end">
              <button class="btn btn-warning proceedBtn">Next</button>
            </div>
          </div>
        </div>
        <div class="questionCard position-absolute slide slide--6">
          <div class="row mb-3">
            <div class="col-lg-12">
              <h3 class="head2 text-start">
                <span class="head1">6</span><span class="head3 me-3">/8</span>
                What is your latest 2.4km timing?
              </h3>
              <div class="metaDescription">
                Preferably provide a timing attain within the last 2 weeks
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3 d-flex justify-content-center align-items-center">
              <h3 class="head2">2400m</h3>
            </div>
            <div class="col-9">
              <div class="form-floating mb-2">
                <input
                  type="email"
                  class="form-control currentMin"
                  id="floatingInput"
                  placeholder="#"
                />
                <label for="floatingInput">mm:ss</label>
              </div>
            </div>
          </div>
          <div class="row d-flex mt-5 justify-content-between">
            <div class="col-3 d-flex justify-content-start">
              <button class="btn btn-secondary reverseBtn">Back</button>
            </div>
            <div class="col-3 d-flex justify-content-end">
              <button class="btn btn-warning proceedBtn">Next</button>
            </div>
          </div>
        </div>
        <div class="questionCard position-absolute slide slide--7">
          <div class="row mb-3">
            <div class="col-lg-12">
              <h3 class="head2 text-start">
                <span class="head1">7</span><span class="head3 me-3">/8</span> What is your
                <span style="color: rgb(255, 193, 7)">target</span> 2.4km timing?
              </h3>
              <div class="metaDescription">
                Provide a timing which is a challenging yet achievable
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3 d-flex justify-content-center align-items-center">
              <h3 class="head2">2400m</h3>
            </div>
            <div class="col-9">
              <div class="form-floating mb-2">
                <input
                  type="email"
                  class="form-control targetMin"
                  id="floatingInput"
                  placeholder="#"
                />
                <label for="floatingInput">mm:ss</label>
              </div>
            </div>
          </div>
          <div class="row d-flex mt-5 justify-content-between">
            <div class="col-3 d-flex justify-content-start">
              <button class="btn btn-secondary reverseBtn">Back</button>
            </div>
            <div class="col-3 d-flex justify-content-end">
              <button class="btn btn-warning proceedBtn">Next</button>
            </div>
          </div>
        </div>
        <div class="questionCard position-absolute slide slide--8">
          <div class="row mb-3">
            <div class="col-lg-12">
              <h3 class="head2 text-start">
                <span class="head1">8</span><span class="head3 me-3">/8</span>
                How many weeks do you have to achieve your target?
              </h3>
              <div class="metaDescription">
                Please give a reasonable timeline considering your target time
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3 d-flex justify-content-center align-items-center">
              <h3 class="head2">Weeks</h3>
            </div>
            <div class="col-9">
              <div class="form-floating mb-2">
                <input type="email" class="form-control weeks" id="floatingInput" placeholder="#" />
                <label for="floatingInput">weeks</label>
              </div>
            </div>
          </div>
          <div class="row d-flex mt-5 justify-content-between">
            <div class="col-3 d-flex justify-content-start">
              <button class="btn btn-secondary reverseBtn">Back</button>
            </div>
            <div class="col-3 d-flex justify-content-end">
              <button class="btn btn-warning submitBtn">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
`;

export const start = `
<div class="container-fluid questionnaireStart">
      <div class="row mt-5 d-flex justify-content-center">
        <div class="col-lg-6 d-flex justify-content-center">
          <img class="img-fluid" style="max-width: 80%" src="../images/questionnairePic.jpg" />
          <span class="attribution">
            Photo by
            <a
              href="https://unsplash.com/@bradencollum?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              >Braden Collum</a
            >
            on
            <a
              href="https://unsplash.com/s/photos/running?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              >Unsplash</a
            ></span
          >
        </div>
        <div class="col-lg-4">
          <div class="row">
            <h1 class="col-12 head1 mt-3 text-start">
              Answer a few simple questions to help us build your personalised training plan.
            </h1>
          </div>
          <div class="row">
            <div class="col-12 mt-4 metaDescription">
              Our intelligent, adaptable training plan adapts as you improve, creating a plan that
              fits you like a glove. Our algorithm will generate a personalised running training
              plan for your goals - from beginner runners to elite marathon runners. You choose what
              you want your training plan to look like depending on your schedule.
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-lg-12">
              <button class="btn btn-warning actionBtn">Start</button>
            </div>
          </div>
        </div>
      </div>
    </div>
`;

export const results = `
<div class="container-fluid displayPlan d-none">
      <div class="row d-flex justify-content-center mb-4">
        <div class="col-lg-8">
          <h2 class="head2 text-center">Your Personalised Training Plan</h2>
        </div>
      </div>
      <div class="row d-flex justify-content-center mx-2" id="display-suggest"></div>
      <div class="row d-flex justify-content-center mt-5">
        <div class="col-lg-4 d-flex justify-content-center">
          <a class="btn btn-outline-warning gotoWorkoutBtn" role="button" href="setTimer.html">
            <p class="btnTitle">Proceed to Workout</p>
          </a>
        </div>
      </div>
    </div>
`;
