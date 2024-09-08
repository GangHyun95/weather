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
    };
    timezone: number;
    main: {
        temp: number;
        temp_max: number;
    };
}

export interface IForeCast {
    list: ICurrentWeather[];
}