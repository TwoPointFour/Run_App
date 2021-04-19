"use strict";

// const mymap = L.map("mapid").setView([51.505, -0.09], 13);
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution:
//     'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//   maxZoom: 13,
//   id: "mapbox/streets-v11",
//   tileSize: 512,
//   zoomOffset: -1,
//   accessToken: "your.mapbox.access.token",
// }).addTo(mymap);
// const marker = L.marker([51.5, -0.09]).addTo(mymap);

navigator.geolocation.getCurrentPosition(function (position) {
  const { latitude } = position.coords;
  const { longitude } = position.coords;
  console.log(position);
  console.log(latitude, longitude);

  const coords = [latitude, longitude];
  const mymap = L.map("mapid").setView(coords, 17);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mymap);
  const marker = L.marker(coords).addTo(mymap).bindPopup("You are here!").openPopup();
});

let runTime;

document.querySelector(".submitBtn").addEventListener("click", function (e) {
  e.preventDefault();
  runTime = document.querySelector(".runTime").value;
  console.log(runTime);
  document.querySelector(".timerForm").classList.toggle("d-none");
  document.querySelector(".timer").classList.toggle("d-none");
});
