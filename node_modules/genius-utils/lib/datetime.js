// get yyyyMMddHHmmSSS by Genius iQ @20251017
function getMyanmarTimestamp() {
    const now = getMyanmarZonedDateTime();
    return `${now.year}${now.month}${now.day}${now.hour}${now.minute}${now.second}${now.millisecond
        .toString()
        .padStart(3, "0")}`;
}

// get yyyyMMdd by Genius iQ @20251017
function getMyanmarDate() {
    const now = getMyanmarZonedDateTime();
    return `${now.year}${now.month}${now.day}`;
}

// get hh:mm:ss a by Genius iQ @20251017
function getMyanmarHour() {
    const now = getMyanmarZonedDateTime();
    return `${now.hour}:${now.minute}:${now.second} ${now.ampm.toUpperCase()}`;
}

// get SSSSS by Genius iQ @20251017
function getMyanmarMillisecond() {
    const now = getMyanmarZonedDateTime();
    return now.millisecond.toString().padStart(5, "0") + " MS";
}

// get Myanmar Zoned Date Time [yyyy-MM-dd hh:mm:ss a] by Genius iQ @20251017
function getMyanmarDateTime() {
    const now = getMyanmarZonedDateTime();
    return `${now.year}-${now.month}-${now.day} ${now.hour}:${now.minute}:${now.second} ${now.ampm.toUpperCase()}`;
}

// get target Zoned Date Time [yyyy-MM-dd hh:mm:ss a] by Genius iQ @20251017
function getDateTimeByZone(dateStr, targetZone) {
    const [datePart, timePart, meridian] = dateStr.split(" ");
    const [year, month, day] = datePart.split("-").map(Number);
    let [hour, minute, second] = timePart.split(":").map(Number);

    if (meridian.toUpperCase() === "PM" && hour < 12) hour += 12;
    if (meridian.toUpperCase() === "AM" && hour === 12) hour = 0;

    const yangonOffsetMinutes = 6 * 60 + 30; // +6:30
    const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute - yangonOffsetMinutes, second));

    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: targetZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    const parts = formatter.formatToParts(utcDate);
    const vals = Object.fromEntries(parts.map((p) => [p.type, p.value]));

    return `${vals.year}-${vals.month}-${vals.day} ${vals.hour}:${vals.minute}:${vals.second} ${vals.dayPeriod}`;
}

// format api execute time [1min 2s] [30s] [100ms] by Genius iQ @20251024
function formatApiExecuteTime(ms) {
    if (ms < 1000) {
        return `${ms.toFixed(0)} ms`;
    }

    let sec = ms / 1000;
    if (sec < 60) {
        return `${sec.toFixed(2)} sec`;
    }

    const min = Math.floor(sec / 60);
    sec = (sec % 60).toFixed(2);
    return `${min} min ${sec} sec`;
}

// format token expire time [yyyy-MM-dd hh:mm:ss a] by Genius iQ @20251108
function formatTokenExpireTime(expireTime) {
    const date = new Date(expireTime);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; 
    const formattedHours = String(hours).padStart(2, "0");

    return `${year}-${month}-${day} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
}

// get Yangon Time by Genius iQ @20251017
function getMyanmarZonedDateTime() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Yangon",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    const parts = formatter.formatToParts(now);
    const get = (type) => parts.find((p) => p.type === type)?.value || "00";

    return {
        year: get("year"),
        month: get("month"),
        day: get("day"),
        hour: get("hour"),
        minute: get("minute"),
        second: get("second"),
        ampm: get("dayPeriod") || "",
        millisecond: now.getMilliseconds(),
    };
}

const DateTimeHandler = {
    getMyanmarTimestamp,
    getMyanmarDate,
    getMyanmarHour,
    getMyanmarMillisecond,
    getMyanmarDateTime,
    getDateTimeByZone,
    formatApiExecuteTime,
    formatTokenExpireTime
}

export default DateTimeHandler;