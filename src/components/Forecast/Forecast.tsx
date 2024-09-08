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
    const filteredData = forecastData.list.filter((_, index) => index % 8 === 7);
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>날씨예보</h2>
            <Card size="large">
                <ul className={styles.list}>
                    {filteredData.map((forecast, index) => {
                        const {
                            main: { temp_max },
                            weather,
                            dt_txt,
                        } = forecast;
                        const [{ icon, description }] = weather;
                        const date = new Date(dt_txt);

                        return (
                            <li key={index} className={styles.item}>
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
                                            {`${Math.round(temp_max)}°`}
                                        </p>
                                    </span>
                                </div>
                                <p className={styles.label}>
                                    {monthNames[date.getUTCMonth()]} {date.getDate()}일
                                </p>
                                <p className={styles.label}>
                                    {weekDayNames[date.getUTCDay()]}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </Card>
        </section>
    );
}
