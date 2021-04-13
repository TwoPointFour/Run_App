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

// document.querySelector(".navContainer").forEach((ele) => {
//   ele.addEventListener("click", function (e) {
//     e.preventDefault();
//     document.querySelectorAll(".navitem").forEach((ele) => {
//       const id = e.target.getAttribute("href");
//       if (e.target.classList.contains("navitem")) {
//         document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//       }
//     });
//   });
// });

// Yi Hein's Version

// document.querySelector(".navContainer").addEventListener("click", function (e) {
//   e.preventDefault();
//   document.querySelectorAll(".navitem").forEach((ele) => {
//     const id = e.target.getAttribute("href");
//     if (e.target.classList.contains("navitem")) {
//       document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//     }
//   });
// });

// Jonas's Version

document.querySelector(".navContainer").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("navitem")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
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

// document.querySelectorAll(".joinBtn").forEach(function (element) {
//   element.addEventListener("click", function () {
//     visible("splashScreen", false);
//     visible("TypeChoice", true);
//     navObserver.unobserve(document.querySelector(".header"));
//   });
// });
document.querySelectorAll(".joinBtn").forEach(function (element) {
  element.href = "suggest.html";
  console.log("href changed!");
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

// document.querySelector(".logOut").addEventListener("click", function () {
//   document.querySelector(".loginPage").classList.toggle("d-none");
//   document.querySelector(".splashScreen").classList.toggle("d-none");
//   // visible("loginPage", false);
//   // visible("TypeChoice", false);
//   // visible("splashScreen", true);
// });

// Sticky Navigation Bar
const navHeight = document.querySelector(".Logo").getBoundingClientRect().height;

const observerCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    document.querySelector(".Logo").classList.add("sticky");
  } else {
    document.querySelector(".Logo").classList.remove("sticky");
  }
};

const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const navObserver = new IntersectionObserver(observerCallback, observerOptions);

navObserver.observe(document.querySelector(".header"));
// choiceObserver.observe(document.querySelector(".TypeChoice"));

// Fade in reveals

document.querySelectorAll(".section").forEach((ele) => {
  ele.classList.add("section--hidden");
});

const sectionOptions = {
  root: null,
  threshold: 0.1,
};

const sectionCallback = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionsObserver = new IntersectionObserver(sectionCallback, sectionOptions);

const allSections = document.querySelectorAll(".section").forEach(function (ele) {
  sectionsObserver.observe(ele);
});

// Lazy Loading Images
const imageOptions = {
  root: null,
  threshold: 0.5,
};
const imageCallback = (entries, observer) => {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.lazyImage;
  observer.unobserve(entry.target);
  entry.target.addEventListener("load", () => entry.target.classList.remove("lazyImage"));
};
const imageObserver = new IntersectionObserver(imageCallback, imageOptions);

const allImages = document
  .querySelectorAll(".lazyImage")
  .forEach((ele) => imageObserver.observe(ele));
