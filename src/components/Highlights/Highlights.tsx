import React from "react";
import styles from "./Highlights.module.css";
import Card from "../Card/Card";
import { MdAir } from "react-icons/md";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { WiHumidity, WiThermometer } from "react-icons/wi";
import { LiaTachometerAltSolid } from "react-icons/lia";
import { MdOutlineVisibility } from "react-icons/md";
import { IAirPollution, ICurrentWeather } from "../../types";
import { getTime } from "../../util";

interface HighlightsProps {
    airPollution: IAirPollution;
    currentWeather: ICurrentWeather;
}

export default function Highlights({airPollution, currentWeather}: HighlightsProps) {
    const {
        main: { aqi },
        components: { pm2_5, so2, no2, o3 },
    } = airPollution.list[0];

    const {
        main: { humidity, pressure, sea_level, feels_like },
        sys: { sunrise, sunset },
        visibility,
        timezone,
    } = currentWeather;

    console.log(pm2_5,so2, no2, o3 );
    return (
        <section className={styles.section}>
            <Card size="large">
                <h2 className={styles.title}>오늘의 주요 정보</h2>
                <div className={styles.grid}>
                    <Card size="small" className={`${styles["highlight-card"]} ${styles["one"]}`}>
                        <h3 className={styles.heading}>대기 오염 지수</h3>
                        <div className={styles.wrapper}>
                            <span className={styles.icon}>
                                <MdAir />
                            </span>
                            <ul className={styles.list}>
                                <li className={styles.item}>
                                    <p className={styles.label}>미세먼지</p>
                                    <p className={styles.title}>{pm2_5.toFixed(2)}</p>
                                </li>

                                <li className={styles.item}>
                                    <p className={styles.label}>이산화황</p>
                                    <p className={styles.title}>{so2.toFixed(2)}</p>
                                </li>

                                <li className={styles.item}>
                                    <p className={styles.label}>이산화질소</p>
                                    <p className={styles.title}>{no2.toFixed(2)}</p>
                                </li>

                                <li className={styles.item}>
                                    <p className={styles.label}>오존</p>
                                    <p className={styles.title}>{o3.toFixed(2)}</p>
                                </li>
                            </ul>
                        </div>
                    </Card>
                    <Card size="small" className={`${styles["highlight-card"]} ${styles["two"]}`}>
                        <h3 className={styles.heading}>일출 & 일몰</h3>
                        <div className={styles.list}>
                            <div className={styles.item}>
                                <span className={styles.icon}>
                                    <FiSunrise />
                                </span>
                                <div>
                                    <p className={styles.label}>일출</p>
                                    <p className={styles.title}>{getTime(sunrise, timezone)}</p>
                                </div>
                            </div>
                            <div className={styles.item}>
                                <span className={styles.icon}>
                                    <FiSunset />
                                </span>
                                <div>
                                    <p className={styles.label}>일몰</p>
                                    <p className={styles.title}>{getTime(sunset, timezone)}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card size="small" className={styles["highlight-card"]}>
                        <h3 className={styles.heading}>습도</h3>
                        <div className={styles.wrapper}>
                            <span className={styles.icon}><WiHumidity /></span>
                            <p className={styles.title}>{humidity}<sub>%</sub></p>
                        </div>

                    </Card>
                    <Card size="small" className={styles["highlight-card"]}>
                        <h3 className={styles.heading}>기압</h3>
                        <div className={styles.wrapper}>
                            <span className={styles.icon}><LiaTachometerAltSolid /></span>
                            <p className={styles.title}>{pressure}<sub>hpa</sub></p>
                        </div>
                    </Card>
                    <Card size="small" className={styles["highlight-card"]}>
                        <h3 className={styles.heading}>가시거리</h3>
                        <div className={styles.wrapper}>
                            <span className={styles.icon}><MdOutlineVisibility /></span>
                            <p className={styles.title}>{visibility / 1000}<sub>km</sub></p>
                        </div>
                    </Card>
                    <Card size="small" className={styles["highlight-card"]}>
                        <h3 className={styles.heading}>체감 온도</h3>
                        <div className={styles.wrapper}>
                            <span className={styles.icon}><WiThermometer /></span>
                            <p className={styles.title}>{`${Math.round(feels_like)}°c`}</p>
                        </div>
                    </Card>
                </div>
            </Card>
        </section>
    );
}
