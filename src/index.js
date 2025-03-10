import "./styles.css";
import { images } from "./weather-icons.js";

const searchInput = document.querySelector("#weather-search");
const searchBtn = document.querySelector(".weather-search-button");

searchBtn.addEventListener("click", () => {
  const location = searchInput.value.trim();
  getWeatherData(location);
});

async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=PS74AUYPDMXTGU2AP3CG6UMNC`,
      { mode: "cors" },
    );
    const responseJson = await response.json();
    displayWeatherData(responseJson);
  } catch (error) {
    console.log(error.message);
  }
}

function displayWeatherData(data) {
  const weatherDataContainer = document.querySelector(".weather-data");
  const tempField = document.querySelector(".temp-field");
  const humidField = document.querySelector(".humid-field");
  const image = document.querySelector(".icon-field");
  const celsiusRadio = document.querySelector("#celsius");

  let tempData = data.currentConditions.temp;
  if (celsiusRadio.checked) {
    tempData = Math.trunc((tempData - 32) * (5 / 9));
    tempData = String(tempData) + "\u00B0C";
  } else {
    tempData = String(tempData) + "\u00B0F";
  }
  const humidData = String(data.currentConditions.humidity);
  const weatherImageName = data.currentConditions.icon;

  tempField.textContent = `Current Temp: ${tempData}`;
  humidField.textContent = `Current Humidity: ${humidData} %`;
  image.src = images[weatherImageName + ".png"];

  weatherDataContainer.style.display = "flex";
  weatherDataContainer.style.flexDirection = "column";
  weatherDataContainer.style.alignItems = "center";
  weatherDataContainer.style.justifyContent = "center";
  weatherDataContainer.style.visibility = "visible";
}
