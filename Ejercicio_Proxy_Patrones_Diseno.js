// IWeatherService.js
class IWeatherService {
    getWeather(city) {
        throw new Error(`This method must be overridden. ${city}`);
    }
}

// WeatherService.js
class WeatherService extends IWeatherService {
    getWeather(city) {
        console.log(`Fetching weather data for ${city}...`);
        // Simulación de llamada a una API externa
        return `Weather data for ${city}`;
    }
}

// WeatherServiceProxy.js
class WeatherServiceProxy extends IWeatherService {
    constructor() {
        super();
        this.realService = new WeatherService();
        this.cache = new Map();
    }

    getWeather(city) {
        if (this.cache.has(city)) {
            console.log(`Returning cached data for ${city}`);
            return this.cache.get(city);
        } else {
            console.log(`Accessing real service for ${city}`);
            const data = this.realService.getWeather(city);
            this.cache.set(city, data);
            return data;
        }
    }
}

const weatherService = new WeatherServiceProxy();
console.log(weatherService.getWeather("London"));
console.log(weatherService.getWeather("London"));
