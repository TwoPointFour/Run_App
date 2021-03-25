"use strict";

const account_1 = {
  email: "cyh@gmail.com",
  password: "twopoint",
  name: "Yi Hein",
};

const visible = (elementClass, state) => {
  state
    ? document.querySelector(`.${elementClass}`).classList.remove("d-none")
    : document.querySelector(`.${elementClass}`).classList.add("d-none");
};

document.querySelector(".joinBtn").addEventListener("click", function () {
  visible("splashScreen", false);
  visible("loginPage", true);
});

document.querySelectorAll(".loginBtn").forEach(function (element) {
  element.addEventListener("click", function () {
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
});

document.querySelector(".logOut").addEventListener("click", function () {
  visible("loginPage", false);
  visible("TypeChoice", false);
  visible("splashScreen", true);
});
