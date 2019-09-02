export function getDateTime(date = new Date()) {
    let arr = [];
    arr[0] = date.getFullYear();
    arr[1] = date.getMonth() + 1;
    arr[2] = date.getDate();
    arr[3] = date.getHours();
    arr[4] = date.getMinutes();
    arr[5] = date.getSeconds();
    arr = arr.map(item => item < 10 ? `0${item}`:item);
    return `${arr.slice(0,3).join('-')} ${arr.slice(3).join(':)}`;
}

export function toDate(string) {
    const args = string.split(/[\-:\s]/);
    args[1] -= 1;
    return new Date(...args);
}

const ONE_DAY = 86400000;
export function getOffsetDay(offset = 0, date = new Date()) {
    const seconds = date.getTimes();
    const days = new Date(seconds + ONE_DAY * offset);
    return getDateTime(days).slice(0, 10);
}

export function getOffsetMonth(offset = 0, date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    //can add if day >28 for less cacl monthlastday
    const monthLastDay = new Date(new Date(year, month + offset + 1, 1, 1) - ONE_DAY).getDate();
    if (day > monthLastDay) date.setDate(monthLastDay);
    date.setMonth(month + offset);
    return getDateTime(date).slice(0, 10);
}
