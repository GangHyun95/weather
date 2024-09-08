export const weekDayNames = [
    "일",
    "월",
    "화",
    "수",
    "목",
    "금",
    "토",
];

export const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
];

export const getDate = function (dateUnix: number, timezone: number): string {
    const date = new Date((dateUnix + timezone) * 1000);
    const weekDayName = weekDayNames[date.getUTCDay()];
    const monthName = monthNames[date.getUTCMonth()];
    return `${monthName} ${date.getUTCDate()}일 ${weekDayName}요일`;
};