import { nav__loggedin } from "../components/nav.js";
import { dashboard } from "../components/dashboardPage.js";

function generatePage(div1, div2) {
  document.querySelector(".root").innerHTML = div1 + div2;
}

generatePage(nav__loggedin, dashboard);
