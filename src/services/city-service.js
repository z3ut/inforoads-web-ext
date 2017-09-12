
export class CityService {

  constructor() {
    this.cities = [
      { id: 1, i18nKey: 'cityNameMinsk', coords: { lat: 53.9, lon: 27.6 } },
      { id: 2, i18nKey: 'cityNameBrest', coords: { lat: 52.1, lon: 23.7} },
      { id: 3, i18nKey: 'cityNameGrodno', coords: { lat: 53.7, lon: 23.8 } },
      { id: 4, i18nKey: 'cityNameVitebsk', coords: { lat: 55.2, lon: 30.2 } },
      { id: 5, i18nKey: 'cityNameMogilev', coords: { lat: 53.9, lon: 30.3 } },
      { id: 6, i18nKey: 'cityNameGomel', coords: { lat: 52.4, lon: 31 } }
    ];

    this.cities.forEach(c => c.name = browser.i18n.getMessage(c.i18nKey));
    
    this.defaultCity = this.cities[0];
    
    this.selectedCityIdStorageKey = 'selectedCityId';
  }

  getCities() {
    return Promise.resolve(this.cities);
  }

  getUserCity() {
    return browser.storage.local.get(this.selectedCityIdStorageKey)
      .then(storage => {
        const selectedCityId = storage[this.selectedCityIdStorageKey];
        return this.cities.find(c => c.id === selectedCityId) || this.defaultCity;
      },
      err => this.defaultCity);
  }

  saveUserCityById(selectedCityId) {
    browser.storage.local.set({
      selectedCityId
    });
  }
}
