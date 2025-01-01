import axios from "axios";
import { IAirPollution, ICurrentWeather, IForeCast } from '../types';

const WeatherApi = {
    httpClient: axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5",
        params: {
            appid: process.env.REACT_APP_WEATHER_API_KEY,
            units: "metric",
            lang: "kr",
        },
    }),

    async getCurrentWeather(lat: number, lon: number): Promise<ICurrentWeather> {
        const response = await this.httpClient.get("weather", {
            params: {
                lat: lat,
                lon: lon,
            },
        });
        return response.data;
    },

    async getForecast(lat: number, lon: number): Promise<IForeCast> {
        const response = await this.httpClient.get("forecast", {
            params: {
                lat: lat,
                lon: lon,
            },
        });
        return response.data;
    },

    async getAirPollution(lat: number, lon: number): Promise<IAirPollution> {
        const response = await this.httpClient.get("air_pollution", {
            params: {
                lat: lat,
                lon: lon,
            }
        });
        return response.data;
    },

    async getReverseGeo(lat: number, lon: number): Promise<string> {
        const response = await axios.get("https://api.openweathermap.org/geo/1.0/reverse", {
            params: {
                lat: lat,
                lon: lon,
                limit: 5,
                lang: "kr",
                appid: process.env.REACT_APP_WEATHER_API_KEY,
            },
        });
        console.log(response.data);
        
        return response.data[0].local_names?.['ko'] || response.data[0].name;
    },

    async getCityCoords(query: string){
        const response = await axios.get("https://api.openweathermap.org/geo/1.0/direct", {
            params: {
                q: query,
                limit: 5,
                appid: process.env.REACT_APP_WEATHER_API_KEY,
            },
        });
        console.log(response.data);
        return response.data;
    }
};

export default WeatherApi;
