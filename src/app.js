//var mymap = L.map("mapid").setView([234.123, 1.4847], 13);

var mymap = L.map("mapid", {
  center: [0, 0],
  zoom: 2.5,
});
// scrollWheelZoom: true,

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
const PASS_TIMES_URL = "http://api.open-notify.org/iss-pass.json?";
const ASTRONAUT_URL = "http://api.open-notify.org/astros.json";

//Getting the current location of the International space station
async function getISSPosition() {
  const response = await fetch(API_Url);
  const data = await response.json();
  // console.log(data);
  const { id, latitude, longitude, name, altitude, velocity } = data;

  //Adding data to the table
  document.querySelector(".id").textContent = id;
  document.querySelector(".name").textContent = name.toUpperCase();
  document.querySelector(".latitude").textContent = latitude.toFixed(3);
  document.querySelector(".longitude").textContent = longitude.toFixed(3);
  document.querySelector(".altitude").textContent = altitude.toFixed(2) + " km";
  document.querySelector(".velocity").textContent =
    velocity.toFixed(2) + " km/h";

  mymap.setView([latitude, longitude]);
  marker.setLatLng([latitude, longitude]);
}

function showAlert() {
  var alert = document.querySelector("#myAlert");
  alert.style.visibility = "visible";
  setTimeout(function () {
    alert.style.visibility = "hidden";
  }, 3000);
}

async function getAstronauts() {
  const listOfAstronauts = document.querySelector("#astronauts");
  const response = await fetch(ASTRONAUT_URL);
  const data = await response.json();
  const people = data.people;
  var list = "<ul>";
  var heading = `<p style="font-weight: 600"> There are currently ${people.length} astronauts in space:</p>`;

  // list += heading;
  for (var i = 0; i < people.length; i++) {
    list += `<p> ${people[i].name}</p>`;
  }
  list += "</ul>";
  listOfAstronauts.innerHTML = heading + list;
}

getISSPosition();
getAstronauts();
//Fetching data every second
setInterval(getISSPosition, 1000);

document.querySelector(".input-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const userLat = document.querySelector("#latInput").value;
  const userLong = document.querySelector("#longInput").value;
  //console.log("Lat: " + userLat + " Long: " + userLong);

  let timeUrl = PASS_TIMES_URL + "lat=" + userLat + "&lon=" + userLong;
  //Getting the overhead Times
  function getPassTimes() {
    fetch(timeUrl)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.response);
        // console.log(data.response.length);
        let timeDura = document.querySelector(".times");

        var myInfo = "<ul>";
        for (var i = 0; i < data.response.length; i++) {
          var durationTime = data.response[i].duration / 60;
          var unixTime = data.response[i].risetime * 1000;

          //Converting from unix time to date time format at GMT
          var s = new Date(unixTime).toLocaleDateString("en-GB");
          var a = new Date(unixTime).toLocaleTimeString("en-GB");

          myInfo += `<p> ${s + " " + a} GMT for ${durationTime.toFixed(
            0
          )} minutes`;
        }
        myInfo += "</ul>";
        timeDura.innerHTML = myInfo;
      })
      .catch((error) => {
        console.log("Error: ", error);
        showAlert();
      });
  }
  getPassTimes();
});
