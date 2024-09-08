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
};

export default WeatherApi;
