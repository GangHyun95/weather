import React from "react";
import styles from "./Forecast.module.css";
import Card from "../Card/Card";
import { IForeCast } from "../../types";
import { monthNames, weekDayNames } from "../../util";

export default function Forecast({
    forecastData,
}: {
    forecastData: IForeCast;
}) {
    
    const dailyForecast: Array<{
        date: string;
        temp_min: number;
        temp_max: number;
        weather: { icon: string; description: string };
    }> = [];

    const today = new Date().toISOString().split("T")[0];

    forecastData.list.forEach((forecast) => {
        const date = forecast.dt_txt.split(" ")[0];

        if (date === today) return;

        const existingDay = dailyForecast.find((item) => item.date === date);

        if (!existingDay) {
            dailyForecast.push({
                date,
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                weather: forecast.weather[0],
            });
        } else {
            existingDay.temp_min = Math.min(existingDay.temp_min, forecast.main.temp_min);
            existingDay.temp_max = Math.max(existingDay.temp_max, forecast.main.temp_max);
        }
    });

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>날씨예보</h2>
            <Card size="large">
                <ul className={styles.list}>
                    {dailyForecast.map((forecast) => {
                        const { temp_max, temp_min, weather, date } = forecast;
                        const { icon, description } = weather;
                        const forecastDate = new Date(date);
                        return (
                            <li key={date} className={styles.item}>
                                <div className={styles.wrapper}>
                                    <img
                                        src={`http://openweathermap.org/img/wn/${icon}.png`}
                                        width="36"
                                        height="36"
                                        alt={description}
                                        className={styles.img}
                                        title={description}
                                    />
                                    <span className={styles.span}>
                                        <p className={styles.temp}>
                                            <span className={styles.max}>{`${Math.round(temp_max)}°`}</span>
                                            <span className={styles.min}>{`${Math.round(temp_min)}°`}</span>
                                        </p>
                                    </span>
                                </div>
                                <p className={styles.label}>
                                    {monthNames[forecastDate.getUTCMonth()]} {forecastDate.getDate()}일
                                </p>
                                <p className={styles.label}>
                                    {weekDayNames[forecastDate.getUTCDay()]}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </Card>
        </section>
    );
}
