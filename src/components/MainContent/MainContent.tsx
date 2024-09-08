import React from "react";
import styles from "./MainContent.module.css";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { locationState } from "../../recoil/atoms/locationState";
import WeatherApi from "../../api/weatherApi";

export default function MainContent() {
    const [location, setLocation] = useRecoilState(locationState);
    const {
        data: currentWeather,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["currentWeather", location.lat, location.lon],
        queryFn: () => WeatherApi.getCurrentWeather(location.lat, location.lon),
        staleTime: 60000,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    console.log(currentWeather);
    return (
        currentWeather && (
            <main>
                <article className={styles.container}>
                    <div className={styles.left}>
                        <CurrentWeather currentWeather={currentWeather}/>
                    </div>
                    <div className={styles.right}>right</div>
                </article>
            </main>
        )
    );
}
