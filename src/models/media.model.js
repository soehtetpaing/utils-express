const { MediaHandler } = require("genius-utils");

class MediaModel {
    static generateMediaName(prefix, type) {
        return MediaHandler.generateMediaName(prefix, type);
    }

    static mediaExists(filepath) {
        return MediaHandler.mediaExists(filepath);
    }

    static async readMediaStat(filepath) {
        try {
            const stat = await MediaHandler.readMediaStat(filepath);
                        
            return stat;
        } catch (err) {
            console.log("Error reading media stat: ", err);
            throw err;   
        }
    }
}

module.exports = MediaModel;
