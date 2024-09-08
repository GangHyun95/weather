interface Weather {
    icon: string;
    description: string;
}

export interface ICurrentWeather {
    weather: Weather[];
    dt: number;
    sys: {
        country: string;
    };
    timezone: number;
    main: {
        temp: number;
    };
}
