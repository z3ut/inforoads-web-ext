
import { CityService } from './city-service.js';
import { MeasuringAppearanceService } from './measuring-appearance-service.js';

const API_URL = 'http://i.centr.by/inforoads/api/v3';
const MEASUREMENT_URL = API_URL + '/dises?currentMeasuring=true';

export class MeasuringService {

  constructor () {
    this.cityService = new CityService();
    this.measuringAppearanceService = new MeasuringAppearanceService();
  }

  getCurrentWeather() {
    return fetch(MEASUREMENT_URL)
      .then(response => response.json())
      .then(dises => this.getClosestDis(dises));
  }
  
  getClosestDis(dises) {
    return this.cityService.getUserCity()
      .then(city => this.filterDisForCity(dises, city))
      .then(dis => this.mapDisData(dis));
  }
  
  filterDisForCity(dises, city) {
    return dises.reduce((acc, curr) => {
      const accToCityDistance = this.getDistanceBetweenPoints(
        acc.lat, acc.lon, city.coords.lat, city.coords.lon);
  
      const currToCityDistance = this.getDistanceBetweenPoints(
        curr.lat, curr.lon, city.coords.lat, city.coords.lon);
  
      return accToCityDistance < currToCityDistance ?
        acc :
        curr
    });
  }
  
  getDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
    return Math.sqrt(Math.pow(lat1 - lat2 , 2) + Math.pow(lon1 - lon2 , 2));
  }

  mapDisData(dis) {
    const disWeather = dis.currentMeasuring;
    return {
      date: new Date(disWeather.date),

      airTemperature: disWeather.airTemperature,
      roadTemperature: disWeather.roadTemperature,
      precipitation: disWeather.precipitation,
      surface: disWeather.surface,
      windSpeed: disWeather.windSpeed,
      warning: disWeather.warning,

      name: dis.name,

      imgSrc: API_URL + `/dises/${dis.disId}/photos/1`,

      airColor: this.measuringAppearanceService
        .getBackgroundFromTemperature(disWeather.airTemperature),
      weatherClass: this.measuringAppearanceService.getWeatherIconClass(dis)
    }
  }
}
