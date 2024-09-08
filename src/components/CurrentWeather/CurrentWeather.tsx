import React from "react";
import styles from "./CurrentWeather.module.css";
import Card from "../Card/Card";
import { getDate } from "../../util";
import { IoCalendarClearOutline, IoLocationOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import WeatherApi from "../../api/weatherApi";
import { useRecoilState } from "recoil";
import { locationState } from "../../recoil/atoms/locationState";
import { ICurrentWeather } from "../../types";
export default function CurrentWeather({
    currentWeather,
}: {
    currentWeather: ICurrentWeather;
}) {
    const [location] = useRecoilState(locationState);

    const { data: city } = useQuery({
        queryKey: ["city", location.lat, location.lon],
        queryFn: () => WeatherApi.getReverseGeo(location.lat, location.lon),
        staleTime: 60000,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    const {
        weather,
        dt: dataUnix,
        sys: { country },
        timezone,
        main: { temp },
    } = currentWeather;

    const [{ icon, description }] = weather;
    const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
    return (
        <section className={styles.section}>
            <Card size="large">
                <h2 className={styles.title}>현재</h2>
                <div className={styles.wrapper}>
                    <p className={styles.heading}>
                        {`${Math.round(temp)}°`}<sup>c</sup>
                    </p>
                    <img
                        src={iconUrl}
                        width="64"
                        height="64"
                        alt="clouds"
                        className={styles.img}
                    />
                </div>
                <p className={styles.desc}>{description}</p>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <span className={styles.icon}>
                            <IoCalendarClearOutline />
                        </span>
                        <p className={styles.text}>
                            {getDate(dataUnix, timezone)}
                        </p>
                    </li>
                    <li className={styles.item}>
                        <span className={styles.icon}>
                            <IoLocationOutline />
                        </span>
                        <p className={styles.text}>{city}, {country}</p>
                    </li>
                </ul>
            </Card>
        </section>
    );
}
