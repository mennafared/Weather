async function search(data) {
  var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7b9c6a6f22f84a62a4f134914241604&q=${data}&days=3`);
  var data = await response.json();

  // console.log(data);
  displayCurrent(data.location, data.current);
  displayAnother(data.forecast.forecastday);
}

document.getElementById("search").addEventListener("keyup", function (data) {
  search(data.target.value);
});

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayCurrent(data, response) {
  var dateInformation = new Date(response.last_updated);

  var forcast = `<div class="today forecast col-lg-4 ">
              <div class="forecast-header text-center p-2 fw-normal d-flex justify-content-between" id="today">
                <div class="day">${days[dateInformation.getDay()]}</div>
                <div class=" date">${dateInformation.getDate() + monthNames[dateInformation.getMonth()]}</div>
              </div>
              <div class="forecast-content px-4 py-5" id="current">
                <div class="location fw-normal fs-5">${data.name}</div>
                <div class="degree d-flex justify-content-between">
                  <div class="num text-white fw-bold">${response.temp_c}<sup>o</sup>C</div>
                  <div class="forecast-icon mt-4 pt-2">
                    <img src="https:${response.condition.icon}" alt="" width="90">
                  </div>
                </div>
                <div class="custom mb-4 fw-normal">${response.condition.text}</div>
                <span><img class="me-1" src="./images/icon-umberella.png" alt="">20%</span>
                <span class="mx-3"><img class="me-1"  src="./images/icon-wind.png" alt="">18km/h</span>
                <span><img class="me-1" src="./images/icon-compass.png" alt="">East</span>
              </div>
            </div>`;
  document.getElementById("forecast").innerHTML = forcast;

}

function displayAnother(data) {
  let t = ``;
  for (let i = 1; i < data.length; i++) {
    t += `<div class="forcast col-lg-4 text-center">
              <div class="forecast-header fw-normal p-2">
                <div class="day">${days[new Date(data[i].date).getDay()]}</div>
              </div>
              <div class="forecast-content p-5">
                <div class="forecast-icon">
                  <img src="https:${data[i].day.condition.icon}" alt="" width="48">
                </div>
                <div class="degree text-white fs-3 fw-medium mt-3">${data[i].day.maxtemp_c}<sup>o</sup>C</div>
                <div class="fw-normal fs-5">${data[i].day.mintemp_c}<sup>o</sup></div>
                <div class="custom fw-normal mt-3">${data[i].day.condition.text}</div>
              </div>
            </div>`;
  }
  document.getElementById("forecast").innerHTML += t;
}



search("cairo");