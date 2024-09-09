import axios from "axios";

const WeatherApi = {
    httpClient: axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5",
        params: {
            appid: process.env.REACT_APP_WEATHER_API_KEY,
            units: "metric",
            lang: "kr",
        },
    }),

    async getCurrentWeather(lat: number, lon: number) {
        const response = await this.httpClient.get("weather", {
            params: {
                lat: lat,
                lon: lon,
            },
        });
        return response.data;
    },

    async getForecast(lat: number, lon: number) {
        const response = await this.httpClient.get("forecast", {
            params: {
                lat: lat,
                lon: lon,
            },
        });
        return response.data;
    },

    async getAirPollution(lat: number, lon: number) {
        const response = await this.httpClient.get("air_pollution", {
            params: {
                lat: lat,
                lon: lon,
            }
        });
        return response.data;
    },

    async getReverseGeo(lat: number, lon: number) {
        const response = await axios.get("https://api.openweathermap.org/geo/1.0/reverse", {
            params: {
                lat: lat,
                lon: lon,
                limit: 5,
                lang: "kr",
                appid: process.env.REACT_APP_WEATHER_API_KEY,
            },
        });
        return response.data[0].local_names['ko'];
    },
};

export default WeatherApi;
