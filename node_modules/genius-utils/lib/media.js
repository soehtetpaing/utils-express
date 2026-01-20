import fs from 'fs';
import { promises } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import DateTimeHandler from './datetime.js';

// get IMG_20250508015000115.png, VID_20250508015000115.mp4 by Genius iQ @20251017
function generateMediaName(prefix, type) {
    let mediaName = "";
    if("txt" == type.toLowerCase()) {
        mediaName = prefix + "_" + DateTimeHandler.getMyanmarDate() + "." + type;
    } else {
        mediaName = prefix + "_" + DateTimeHandler.getMyanmarTimestamp() + "." + type;
    }

    return mediaName;
}

// D:\genius_iq\node_js_pj\genius-utils-node by Genius iQ @20251022
function getRootDirectoryName() {    
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    let root = path.resolve(__dirname, '..');
    const nodeModulesIndex = root.indexOf(`${path.sep}node_modules`);

    if (nodeModulesIndex !== -1) {
        root = root.substring(0, nodeModulesIndex);
    }

    return root;
}

// D:\genius_iq\node_js_pj\genius-utils-node\folder\file.ext by Genius iQ @20251023
function getMediaWithDirectory(directory, filename) {
    return path.join(getRootDirectoryName(), directory, filename);
}

// make directory by Genius iQ @20251023
async function makeDirectory(directory) {
    try {
        const absolutePath = getMediaWithDirectory(directory, '');
        await promises.mkdir(absolutePath, { recursive: true });
        return true;
    } catch (err) {
        console.log("Failed to create directory: ", err);
        return false;
    }
}

// append data to media file by Genius iQ @20251023
async function writeText(filepath, content) {
    try {
        await promises.appendFile(filepath, content);
    } catch (err) {
        console.log("Failed to write text: ", err);
        throw err;
    }
}

// check media exists by Genius iQ @20251110
function mediaExists(filepath) {
    if (fs.existsSync(filepath)) {
        return true;
    }

    return false;
}

// read media statistics by Genius iQ @20251110
async function readMediaStat(filepath) {
    return fs.statSync(filepath);
}

// read text file by Genius iQ @20251110
async function readText(filepath) {
    // .txt, .json, .html, .css, .sql
    return fs.readFileSync(filepath, 'utf-8');
}

// read image file by Genius iQ @20251110
async function readImage(filepath) {
    // .png, .jpg, .pdf
    return fs.readFileSync(filepath);
}

// read video file by Genius iQ @20251110
async function readVideo(filepath) {
    const stream = fs.createReadStream(filepath);
    console.log(`${filepath} reading...`);
    stream.on('data', chunk => console.log(`Read ${chunk.length} bytes...`));
    stream.on('end', () => console.log('Finished.'));

    return stream;
}

const MediaHandler = {
    generateMediaName,
    getRootDirectoryName,
    getMediaWithDirectory,
    makeDirectory,
    writeText,
    mediaExists,
    readMediaStat,
    readText,
    readImage,
    readVideo  
}

export default MediaHandler;