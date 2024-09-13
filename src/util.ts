export const weekDayNames = ["일", "월", "화", "수", "목", "금", "토"];

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

export const getDate = function (dateUnix: number): string {
    const date = new Date(dateUnix * 1000);
    const weekDayName = weekDayNames[date.getDay()];
    const monthName = monthNames[date.getMonth()];
    return `${monthName} ${date.getDate()}일 ${weekDayName}요일`;
};

export const getTime = function (timeUnix: number): string {
    const date = new Date(timeUnix * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes} ${period}`;
};

export const getHours = (timeUnix: number) => {
    const date = new Date(timeUnix * 1000);
    const hours = date.getHours();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours} ${period}`;
};
