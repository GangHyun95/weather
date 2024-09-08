import { atom } from "recoil";

export const locationState = atom<{ lat: number | null; lon: number | null }>({
    key: "locationState",
    default: { lat: null, lon: null },
});
