const { DateTimeHandler } = require("genius-utils");

class DatetimeModel {
    static getMyanmarDateTime() {
        return DateTimeHandler.getMyanmarDateTime();
    }

    static getMyanmarDate() {
        return DateTimeHandler.getMyanmarDate();
    }

    static getMyanmarHour() {
        return DateTimeHandler.getMyanmarHour();
    }

    static getDateTimeByZone(dateStr, targetZone) {
        if (!dateStr) {
            const mmDateTime = DateTimeHandler.getMyanmarDateTime();
            return DateTimeHandler.getDateTimeByZone(mmDateTime, targetZone);
        } else {
            return DateTimeHandler.getDateTimeByZone(dateStr, targetZone);
        }
    }
}

module.exports = DatetimeModel;
