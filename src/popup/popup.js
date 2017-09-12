
import './popup.css';

import { MeasuringService } from '../services/measuring-service.js';
import { MeasuringAppearanceService } from '../services/measuring-appearance-service.js';

const disHeaderElement = document.querySelector('[data-dis-header]');
const disWeatherElement = document.querySelector('[data-dis-weather]');
const disTempElement = document.querySelector('[data-dis-temp]');

const weatherContainerElement = document.querySelector('[data-weather-container]');
const loadingIndicatorElement = document.querySelector('[data-loading-indicator]');
const statusMessageElement = document.querySelector('[data-status-message]');

const disNameElement = document.querySelector('[data-dis-name]');
const timeElement = document.querySelector('[data-time]');

const airTemperatureNameElement = document.querySelector('[data-measuring-name-air-temperature]');
const airTemperatureElement = document.querySelector('[data-measuring-air-temperature]');

const roadTemperatureNameElement = document.querySelector('[data-measuring-name-road-temperature]');
const roadTemperatureElement = document.querySelector('[data-measuring-road-temperature]');

const precipitationNameElement = document.querySelector('[data-measuring-name-precipitation]');
const precipitationElement = document.querySelector('[data-measuring-precipitation]');

const surfaceNameElement = document.querySelector('[data-measuring-name-surface]');
const surfaceElement = document.querySelector('[data-measuring-surface]');

const windSpeedNameElement = document.querySelector('[data-measuring-name-wind-speed]');
const windSpeedElement = document.querySelector('[data-measuring-wind-speed]');

const warningRowElement = document.querySelector('[data-warning-row]');
const warningNameElement = document.querySelector('[data-measuring-name-warning]');
const warningElement = document.querySelector('[data-measuring-warning]');

const disImgLinkElement = document.querySelector('[data-dis-img-link]');
const disImgElement = document.querySelector('[data-dis-img]');


const measuringService = new MeasuringService();
const measuringAppearanceService = new MeasuringAppearanceService();


airTemperatureNameElement.innerHTML = browser.i18n.getMessage('airTemperature');
roadTemperatureNameElement.innerHTML = browser.i18n.getMessage('roadTemperature');
precipitationNameElement.innerHTML = browser.i18n.getMessage('precipitation');
surfaceNameElement.innerHTML = browser.i18n.getMessage('surface');
windSpeedNameElement.innerHTML = browser.i18n.getMessage('windSpeed');
warningNameElement.innerHTML = browser.i18n.getMessage('warning');

measuringService.getCurrentWeather().then(data => {
  statusMessageElement.innerHTML = '';
  loadingIndicatorElement.style.display = 'none';
  weatherContainerElement.style.display = 'block';

  disTempElement.innerHTML += data.airTemperature;
  disWeatherElement.setAttribute('class', data.weatherClass);
  disHeaderElement.style['background-color'] = data.airColor;

  airTemperatureElement.innerHTML = data.airTemperature;
  roadTemperatureElement.innerHTML = data.roadTemperature;
  precipitationElement.innerHTML = data.precipitation;
  surfaceElement.innerHTML = data.surface;
  windSpeedElement.innerHTML = browser.i18n.getMessage('windSpeedMeasuring', data.windSpeed);

  disNameElement.innerHTML = data.name;
  timeElement.innerHTML = formatDate(data.date);

  disImgElement.src = data.imgSrc;
  disImgLinkElement.setAttribute('href', data.imgSrc);

  if (data.warning) {
    warningRowElement.style.visibility = 'visible';
    warningElement.innerHTML = data.warning
  } else {
    warningRowElement.style.visibility = 'collapse';
  }
}, err => {
  loadingIndicatorElement.style.display = 'none';
  statusMessageElement.innerHTML = browser.i18n.getMessage('errorLoading');
});

function formatDate(date) {
  if (!(date instanceof Date)) {
    return '';
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minutes = date.getMinutes();

  const padWithZero = num => num.toString().padStart(2, '0');

  return `${year}-${padWithZero(month)}-${padWithZero(day)} ${padWithZero(hour)}:${padWithZero(minutes)}`;
}
