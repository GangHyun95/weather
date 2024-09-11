import { TiWeatherPartlySunny } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import { TbCurrentLocation } from "react-icons/tb";
import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { locationState } from "../../recoil/atoms/locationState";
import { CiLocationOn } from "react-icons/ci";
import { useMutation } from "@tanstack/react-query";
import WeatherApi from "../../api/weatherApi";

interface CityResult {
    name: string;
    country: string;
    lat: number;
    lon: number;
    local_names: {
        ko: string;
    }
}

export default function Header() {
    const [location, setLocation] = useRecoilState(locationState);
    const [text, setText] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchResults, setSearchResults] = useState<CityResult[]>([]);
    const defaultLocation = { lat: 37.5145, lon: 127.0495 };
    const [debouncedText, setDebouncedText] = useState(text);
    const [isLoading, setIsLoading] = useState(false);

    const { mutate: searchCities } = useMutation({
        mutationFn: async (query: string) => {
            const response = await WeatherApi.getCityCoords(query);
            return response;
        },
        onSuccess: (data: CityResult[]) => {
            setSearchResults(data);
            setIsLoading(false);
        },
        onError: (error: Error) => {
            console.error("검색 중 오류 발생:", error);
            setIsLoading(false);
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setText(e.target.value);
        setIsExpanded(value.length > 0);
        setIsLoading(value.length > 0);
    };

    useEffect(() => {
        if (debouncedText) {
            searchCities(debouncedText);
        }
    }, [debouncedText]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedText(text);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [text]);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

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

    const handleResultClick = (lat: number, lon: number) => {
        setLocation({ lat: lat, lon: lon });
        setText('');
        setIsExpanded(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <button className={styles.logo}>
                    <TiWeatherPartlySunny />
                    <span>weather</span>
                </button>
                <form
                    className={`${styles.form} ${isLoading ? styles.searching : ""} ${(isFocused && isExpanded) ? styles.expanded : ''}`}
                    onSubmit={handleSubmit}
                >
                    <div>
                        <input
                            className={styles.input}
                            type="search"
                            name="search"
                            placeholder="검색"
                            autoComplete="off"
                            value={text}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <button className={`${styles["search-icon"]} ${styles.icon}`}>
                            <IoIosSearch />
                        </button>
                    </div>
                    <div className={`${styles.result} ${isFocused && isExpanded ? styles.active : ""}`}>
                        <ul className={styles.list}>
                            {searchResults.map((result, index) => {
                                const { lat, lon } = result;
                                const name = result?.local_names?.ko || result.name;
                                return (
                                    <li key={index} className={styles.item} onMouseDown={() => handleResultClick(lat,lon)}>
                                        <span className={styles.icon}>
                                            <CiLocationOn />
                                        </span>
                                        <div>
                                            <p className={styles.title}>{name}</p>
                                            <p className={styles.label}>{result.country}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
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
