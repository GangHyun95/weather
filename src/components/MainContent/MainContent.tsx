import React from "react";
import styles from "./MainContent.module.css";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { locationState } from "../../recoil/atoms/locationState";
import WeatherApi from "../../api/weatherApi";
import Forecast from "../Forecast/Forecast";

export default function MainContent() {
    const [location, setLocation] = useRecoilState(locationState);
    const results = useQueries({
        queries: [
            {
                queryKey: ["currentWeather", location.lat, location.lon],
                queryFn: () =>
                    WeatherApi.getCurrentWeather(location.lat, location.lon),
                staleTime: 60000,
                gcTime: 1000 * 60 * 10,
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                refetchOnReconnect: false,
            },
            {
                queryKey: ["forecast", location.lat, location.lon],
                queryFn: () =>
                    WeatherApi.getForecast(location.lat, location.lon),
                staleTime: 60000,
                gcTime: 1000 * 60 * 10,
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                refetchOnReconnect: false,
            },
            {
                queryKey: ["city", location.lat, location.lon],
                queryFn: () =>
                    WeatherApi.getReverseGeo(location.lat, location.lon),
                staleTime: 60000,
                gcTime: 1000 * 60 * 10,
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                refetchOnReconnect: false,
            },
        ],
    });
    const [{ data: currentWeather }, { data: forecastData }, { data: city }] =
        results;

    const isLoading = results[0].isLoading || results[1].isLoading || results[2].isLoading;

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <main>
            <article className={styles.container}>
                <div className={styles.left}>
                    <CurrentWeather
                        currentWeather={currentWeather}
                        city={city}
                    />
                    <Forecast forecastData={forecastData} />
                </div>
                <div className={styles.right}>right</div>
            </article>
        </main>
    );
}
