import { atom } from "recoil";

export const locationState = atom({
    key: "locationState",
    default: {lat: 37.5145, lon: 127.0495},
});
