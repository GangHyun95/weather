const weekDayNames = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
];

export const getDate = function (dateUnix: number, timezone: number): string {
    const date = new Date((dateUnix + timezone) * 1000);
    const weekDayName = weekDayNames[date.getUTCDay()];
    return `${date.getUTCMonth() + 1}월 ${date.getUTCDate()}일 ${weekDayName}`;
};