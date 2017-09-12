
import './options.css';

import { CityService } from '../services/city-service';

const cityService = new CityService();
const selectCityElement = document.querySelector('[data-select-city]');

const selectCityTextElement = document.querySelector('[data-select-city-text]');
const saveSettingsElement = document.querySelector('[data-save-settings]');

selectCityTextElement.innerHTML = browser.i18n.getMessage('citySelect');
saveSettingsElement.innerHTML = browser.i18n.getMessage('saveSettings');


function populateSelectedCities(cities, selectedCity) {
  const optionsFragment = document.createDocumentFragment();

  cities.forEach(city => {
    const opt = document.createElement('option');
    opt.innerHTML = city.name;
    opt.value = city.id;
    opt.selected = selectedCity.id === city.id;
    optionsFragment.appendChild(opt);
  });

  selectCityElement.appendChild(optionsFragment);
}

function saveOptions(e) {
  const selectedCityId = +selectCityElement
    .options[selectCityElement.selectedIndex]
    .value;

  cityService.saveUserCityById(selectedCityId);
}

Promise.all([cityService.getCities(), cityService.getUserCity()])
  .then(values => populateSelectedCities(values[0], values[1]));

document.querySelector('form').addEventListener('submit', saveOptions);
