export const login = `
<div class="container-fluid loginPage">
  <div class="row d-flex justify-content-center">
    <div class="col-lg-4 col-md-6 col-sm-8 planCard loginCard">
      <form method="post" action="authenticate.php">
        <div class="head2">Sign In</div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input
            type="email"
            name="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            Use the same email you signed up for beta testing with.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" name="password" class="form-control" id="exampleInputPassword1" />
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1"
            >I agree with <a href="terms.html" target="_blank">Terms and Conditions</a> and
            <a href="privacy.html" target="_blank">Privacy Policy</a></label
          >
        </div>
        <button type="submit" name="login" class="btn btn-warning mb-4 loginBtn">Login</button>
      </form>
    </div>
  </div>
</div>

`;
