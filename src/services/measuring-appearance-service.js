
import * as SunCalc from 'suncalc';

const PRECIPITATION_NONE = [ 'Нет осадков', 'No precipitation' ];
const PRECIPITATION_CLOUDY = [ 'Облачно', 'Cloudy' ];
const PRECIPITATION_CLEAR = [ 'Ясно', 'Clear' ];
const PRECIPITATION_RAIN = [
  'Умеренный дождь', 'Слабый дождь', 'Сильный дождь',
  'Moderate rain', 'Weak rain', 'Strong rain'
];
const PRECIPITATION_SNOW = [
  'Умеренный снег', 'Слабый снег', 'Сильный снег',
  'Moderate snow', 'Weak snow', 'Strong snow'
];

export class MeasuringAppearanceService {

  getBackgroundFromTemperature(temp) {
    if (typeof temp !== 'number' || Number.isNaN(temp)) {
      // Grey
      return `hsl(0, 0%, 75%)`;
    }
  
    const hue = temp >= 0 ?
      -3 * Math.min(temp, 30) + 90 :
      -2 * Math.max(temp, -20) + 180;
  
    return `hsl(${hue}, 80%, 60%)`;
  }

  getWeatherIconClass(dis) {
    if (dis == null || dis.currentMeasuring == null) {
      return 'wi wi-cloud';
    }
  
    let precipitation = dis.currentMeasuring.precipitation;
    let currentDate = new Date();
    let times = SunCalc.getTimes(currentDate, dis.lat, dis.lon);
    let isNight = currentDate < times.sunrise || currentDate > times.sunset;
  
    if (PRECIPITATION_NONE.includes(precipitation)) {
      return 'wi wi-cloud';
    }
  
    if (PRECIPITATION_CLOUDY.includes(precipitation)) {
      return isNight ? 'wi wi-night-alt-cloudy' : 'wi wi-day-cloudy';
    }
  
    if (PRECIPITATION_CLEAR.includes(precipitation)) {
      return isNight ? 'wi wi-night-clear' : 'wi wi-day-sunny';
    }
  
    if (PRECIPITATION_RAIN.includes(precipitation)) {
      return isNight ? 'wi wi-night-alt-rain' : 'wi wi-day-rain';
    }
  
    if (PRECIPITATION_SNOW.includes(precipitation)) {
      return isNight ? 'wi wi-night-alt-snow' : 'wi wi-day-snow';
    }
  
    return 'wi wi-cloud';
  }
}
