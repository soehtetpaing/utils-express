const { DateTimeHandler } = require("genius-utils");

class DatetimeModel {
    static getMyanmarDateTime() {
        return DateTimeHandler.getMyanmarDateTime();
    }
}

module.exports = DatetimeModel;
