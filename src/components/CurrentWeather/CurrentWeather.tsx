import React from "react";
import styles from "./CurrentWeather.module.css";
import Card from "../Card/Card";
import { getDate } from "../../util";
import { IoCalendarClearOutline, IoLocationOutline } from "react-icons/io5";
export default function CurrentWeather({
    currentWeather,
}: {
    currentWeather: any;
}) {
    console.log(currentWeather);
    const {
        weather,
        dt: dataUnix,
        sys: { country },
        timezone,
        name,
    } = currentWeather;

    const [{ icon, description }] = weather;
    const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
    return (
        <section className={styles.section}>
            <Card size="large">
                <h2 className={styles.title}>현재</h2>
                <div className={styles.wrapper}>
                    <p className={styles.heading}>
                        {`${parseInt("24.6", 10)}°`}<sup>c</sup>
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
                        <p className={styles.text}>{name}, {country}</p>
                    </li>
                </ul>
            </Card>
        </section>
    );
}
