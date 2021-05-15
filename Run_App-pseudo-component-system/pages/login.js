import { nav__current } from "../components/nav.js";
import { login } from "../components/loginPage.js";

function generatePage(div1, div2) {
  document.querySelector(".root").innerHTML = div1 + div2;
}

generatePage(nav__current, login);

document.querySelector(".loginBtn").addEventListener("click", function (event) {
  event.preventDefault();
  location.href = location.origin + "/pages/dashboard.html";
});
