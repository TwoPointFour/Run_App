"use strict";

const account_1 = {
  email: "cyh@gmail.com",
  password: "twopoint",
  name: "Yi Hein",
};

// lol

const visible = (elementClass, state) => {
  state
    ? document.querySelector(`.${elementClass}`).classList.remove("d-none")
    : document.querySelector(`.${elementClass}`).classList.add("d-none");
};

// Event Delegation for Navbar

document.querySelector(".navContainer").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelectorAll(".navitem").forEach((ele) => {
    const id = e.target.getAttribute("href");
    if (e.target.classList.contains("navitem")) {
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });
});

// document.querySelector(".priceBtn").addEventListener("click", function (e) {
//   document.querySelector(".pricingSection").scrollIntoView({ behavior: "smooth" });
// });
// document.querySelector(".techBtn").addEventListener("click", function (e) {
//   document.querySelector(".techSection").scrollIntoView({ behavior: "smooth" });
// });
// document.querySelector(".aboutBtn").addEventListener("click", function (e) {
//   document.querySelector(".aboutSection").scrollIntoView({ behavior: "smooth" });
// });
document.querySelector(".homeBtn").addEventListener("click", function (e) {
  visible("splashScreen", true);
  visible("TypeChoice", false);
});

document.querySelectorAll(".joinBtn").forEach(function (element) {
  element.addEventListener("click", function () {
    visible("splashScreen", false);
    visible("TypeChoice", true);
  });
});

document.querySelector(".loginBtn").addEventListener("click", function () {
  if (
    document.querySelector("#exampleInputEmail1").value === account_1.email &&
    document.querySelector("#exampleInputPassword1").value === account_1.password
  ) {
    visible("loginPage", false);
    visible("TypeChoice", true);
    document.querySelector(".loginGreeting").textContent = `Welcome, ${account_1.name}!`;
    console.log(`Welcome, ${account_1.name}!`);
  } else {
    console.log("Wrong credentials!");
  }
});

document.querySelector(".logOut").addEventListener("click", function () {
  document.querySelector(".loginPage").classList.toggle("d-none");
  document.querySelector(".splashScreen").classList.toggle("d-none");
  // visible("loginPage", false);
  // visible("TypeChoice", false);
  // visible("splashScreen", true);
});
