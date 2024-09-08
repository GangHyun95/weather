import { TiWeatherPartlySunny } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import { TbCurrentLocation } from "react-icons/tb";
import styles from "./Header.module.css";
import { useState } from "react";

export default function Header() {
    const [text, setText] = useState("");
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    const { latitude, longitude } = position.coords;
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                },
                (error) => {
                    console.error("위치 정보를 가져오는 데 실패했습니다.", error);
                }
            );
        } else {
            console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
        }
    };
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <button className={styles.logo}>
                    <TiWeatherPartlySunny />
                    <span>weather</span>
                </button>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type="search"
                        name="search"
                        placeholder="검색"
                        autoComplete="off"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button className={styles.icon}>
                        <IoIosSearch />
                    </button>
                </form>
                <div className={styles.right}>
                    <button className={styles.primary} onClick={handleLocationClick}>
                        <span className={styles.icon}>
                            <TbCurrentLocation />
                        </span>
                        <span className={styles.span}>Current Location</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
