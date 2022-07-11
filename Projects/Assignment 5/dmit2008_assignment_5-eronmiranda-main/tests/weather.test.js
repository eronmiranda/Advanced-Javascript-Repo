import { Weather, ENDPOINT, API_KEY } from '../js/src/weather.js';
import fetchMock from 'fetch-mock-jest';

describe("Test Weather class", () => {
  let weather;

  // setup the instance before it exists
  beforeEach(()=> {
    // clear all mock
    fetchMock.mockClear();
  });

  test("should exist", ()=> {
    expect(Weather).toBeDefined();
  });

  describe("test empty instance", ()=> {
    beforeAll(()=> {
      weather = new Weather();
    });

    test("should be instance of weather", ()=> {
      expect(weather).toBeInstanceOf(Weather)
    });

    test("should have empty properties", () => {
      expect(weather.city).toEqual('')
      expect(weather.weatherData).toEqual({})
    })
  });

  describe("test Weather Methods", ()=> {

    const LOCATION = 'London,uk';
    const WEATHER_URL = `${ENDPOINT}weather?q=${LOCATION}&units=metric&appid=${API_KEY}`;
    const FORECAST_URL = `${ENDPOINT}forecast?q=${LOCATION}&units=metric&appid=${API_KEY}`

    const EXPECTED_CURRENT_WEATHER = {
        location: 'London, GB',
        date: new Date(1485789600 * 1000),
        conditions: 'Drizzle',
        temperature: 280.32,
        sunrise: new Date(1485762037 * 1000),
        sunset: new Date(1485794875 * 1000)
    };

    const EXPECTED_FORECAST = [
      {
        condition: "Clouds",
        date: "2020-10-23",
        high: -10.64,
        low: -12.37,
      },
      {
        condition: "Clouds",
        date: "2020-10-24",
        high: -8.22,
        low: -8.23,
      }
    ];

    beforeAll(()=> {
      fetchMock.get(WEATHER_URL, '{"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}],"base":"stations","main":{"temp":280.32,"pressure":1012,"humidity":81,"temp_min":279.15,"temp_max":281.15},"visibility":10000,"wind":{"speed":4.1,"deg":80},"clouds":{"all":90},"dt":1485789600,"sys":{"type":1,"id":5091,"message":0.0103,"country":"GB","sunrise":1485762037,"sunset":1485794875},"id":2643743,"name":"London","cod":200}');
      fetchMock.get(FORECAST_URL,`{"cod": "200","message": 0,"cnt": 40,"list": [ { "dt": 1603465200, "main": { "temp": -10.64, "feels_like": -14.6, "temp_min": -12.37, "temp_max": -10.64, "pressure": 1033, "sea_level": 1033, "grnd_level": 957, "humidity": 89, "temp_kf": 1.73 }, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d" }], "clouds": { "all": 46 }, "wind": { "speed": 1.09, "deg": 173 }, "visibility": 10000, "pop": 0, "sys": { "pod": "d" }, "dt_txt": "2020-10-23 15:00:00" }, { "dt": 1603497600, "main": { "temp": -8.23, "feels_like": -12.61, "temp_min": -8.23, "temp_max": -8.22, "pressure": 1035, "sea_level": 1035, "grnd_level": 956, "humidity": 89, "temp_kf": -0.01 }, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "clouds": { "all": 52 }, "wind": { "speed": 1.92, "deg": 30 }, "visibility": 10000, "pop": 0, "sys": { "pod": "d" }, "dt_txt": "2020-10-24 00:00:00" }],"city": { "id": 5946768, "name": "Edmonton", "coord": { "lat": 53.5501, "lon": -113.4687 }, "country": "CA", "population": 712391, "timezone": -21600, "sunrise": 1603462620, "sunset": 1603498736}}`)
      weather = new Weather({city: LOCATION});
    });

    test("getWeather", ()=> {
      return weather.getCurrentWeather()
        .then((currentWeather)=>{
          expect(currentWeather).toEqual(EXPECTED_CURRENT_WEATHER);
        });
    });

    test("getForecast", ()=> {
      return weather.getForecast()
        .then((weather)=>{
          expect(weather.forecast).toEqual(EXPECTED_FORECAST);
        });
    });
  });
});