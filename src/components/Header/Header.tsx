import { TiWeatherPartlySunny } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import { TbCurrentLocation } from "react-icons/tb";
import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { locationState } from "../../recoil/atoms/locationState";

export default function Header() {
    const [location, setLocation] = useRecoilState(locationState);
    const [text, setText] = useState("");

    const defaultLocation = { lat: 37.5145, lon: 127.0495 };

    const getLocation = (showAlert = false) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lon: longitude });
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED && showAlert) {
                        alert("위치 정보 접근이 차단되었습니다. 브라우저 설정을 확인해주세요.");
                    }
                    console.error("위치 정보를 가져오는 데 실패했습니다.", error);
                    setLocation(defaultLocation);
                }
            );
        } else {
            console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
            setLocation(defaultLocation);
        }
    };

    useEffect(() => {
        getLocation(false);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleLocationClick = () => {
        getLocation(true);
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
                        <span className={styles.span}>내 위치 찾기</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
