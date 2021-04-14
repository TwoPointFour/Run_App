"use strict";

const blogList = [
  "040303.html",
  "330391.html",
  "409976.html",
  "501754.html",
  "623340.html",
  "623421.html",
  "628605.html",
  "667577.html",
  "730310.html",
  "785064.html",
  "852163.html",
  "925147.html",
];

blogList.forEach((ele) => {
  document.querySelector(".blogContent").insertAdjacentHTML(
    "beforeend",
    `
  <div class="col">
  <a class="blogBtn btn btn-outline-warning" href="${ele}" role="button">${ele}</a>
</div>`
  );
});
