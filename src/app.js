//var mymap = L.map("mapid").setView([234.123, 1.4847], 13);

var mymap = L.map("mapid", {
  center: [0, 0],
  zoom: 2.5,
  // scrollWheelZoom: true,
});

const leafAttribution =
  '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: leafAttribution,
}).addTo(mymap);

//Custom icon
const myIcon = L.icon({
  iconUrl: "assets/ISSImage.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
  popupAnchor: [-3, -76],
});

//Initial position of marker
const marker = L.marker([0, 0], { icon: myIcon }).addTo(mymap);

const API_Url = "https://api.wheretheiss.at/v1/satellites/25544";

async function getISSPosition() {
  const response = await fetch(API_Url);
  const data = await response.json();
  // console.log(data);
  const { id, latitude, longitude, name, altitude, velocity } = data;

  //Adding data to the table
  document.querySelector(".id").textContent = id;
  document.querySelector(".name").textContent = name.toUpperCase();
  document.querySelector(".latitude").textContent = latitude;
  document.querySelector(".longitude").textContent = longitude;
  document.querySelector(".altitude").textContent = altitude + " km";
  document.querySelector(".velocity").textContent = velocity + " km/h";

  mymap.setView([latitude, longitude]);
  // L.marker([latitude, longitude]).addTo(mymap);
  marker.setLatLng([latitude, longitude]);

  console.log("id: ", id);
  console.log("Lat: ", latitude);
  console.log("Long: ", longitude);
  console.log("name: ", name);
  console.log("altitude: ", altitude);
  console.log("Velocity: ", velocity);
}

getISSPosition();
