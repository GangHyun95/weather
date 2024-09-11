interface Weather {
    icon: string;
    description: string;
}

export interface ICurrentWeather {
    weather: Weather[];
    dt: number;
    dt_txt: string;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    visibility: number;
    timezone: number;
    main: {
        temp: number;
        temp_max: number;
        temp_min:number;
        humidity: number;
        pressure: number; 
        feels_like: number;
    };
    wind: {
        speed: number;
        deg: number;
    }
}

export interface IForeCast {
    list: ICurrentWeather[];
    city: {
        timezone: number;
    }
}
export interface IAirPollution {
    list: {
        main: {
            aqi: number;
        };
        components: {
            pm2_5: number;
            so2: number;
            no2: number;
            o3: number;
        };
    }[];
}
