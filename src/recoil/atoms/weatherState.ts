import { atom } from "recoil";

export const currentWeatherState = atom({
    key: "currentWeatherState",
    default: undefined,
});
