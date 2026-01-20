import CommonHandler from './common.js';
import DateTimeHandler from './datetime.js';
import MediaHandler from './media.js';

let _requestId = "";
let _projectName = "";
let _className = "";
let _methodName = "";
let _requestBy = "";
let _absoluteFile = "";
let _startTime = null;

// one line logging by Genius iQ @20251115
async function log(logInfo = {}, request, response, text) {
    if (!logInfo || Object.keys(logInfo).length === 0) {
        console.log("LogInfo is required!");
        return;
    }

    // if (!request || Object.keys(request).length === 0) {
    //     console.log("Request data is required!");
    //     return;    
    // }

    // if (!response || Object.keys(response).length === 0) {
    //     console.log("Response data is required!");
    //     return;    
    // }

    const { filepath, filename, projectName, className, methodName, requestBy } = logInfo;

    await start(filepath, filename, projectName, className, methodName, requestBy);
    await write(request, "request");
    await write(response, "response");

    if (text) {
        await write(text, "text");
    }

    await end();
}

// set properties by Genius iQ @20251023
async function start(filepath, filename, projectName, className, methodName, requestBy) {
    const file = MediaHandler.generateMediaName(filename, "txt");

    if (await MediaHandler.makeDirectory(filepath)) {
        _requestId = `RequestID: ${CommonHandler.getSyskey()}`;
        _projectName = projectName;
        _className = className;
        _methodName = `Method: ${methodName}`;
        _requestBy = `RequestBy: ${requestBy}`;
        _absoluteFile = MediaHandler.getMediaWithDirectory(filepath, file);
        _startTime = Date.now();

        await write("Start", "text");
    }
}

// write custom logs by Genius iQ @20251023
async function write(content, contentType = "text") {
    if (!_absoluteFile) {
        console.log("LogHandler not started — call start() first!");
        return;
    }

    let fullContent = DateTimeHandler.getMyanmarHour() + getSpace(1) 
                    + DateTimeHandler.getMyanmarMillisecond() + getSpace(3)
                    + putIntoBracket(_projectName)
                    + putIntoBracket(_className)
                    + getSpace(5);

    switch (contentType) {
        case "text":
            fullContent += content;
            break;
        case "request":
            fullContent += putIntoBracket(_requestId) + putIntoBracket(_methodName)
                        + putIntoBracket(_requestBy) + getSpace(5) + getRequestFormat(content);
            break;
        case "response":
            fullContent += putIntoBracket(_requestId) + putIntoBracket(_methodName)
                        + putIntoBracket(_requestBy) + getSpace(5) + getResponseFormat(content);
            break;
        default:
            fullContent += content;
    }

    await MediaHandler.writeText(_absoluteFile, fullContent + "\n");
}

// clear properties by Genius iQ @20251024
async function end() {
    const duration = DateTimeHandler.formatApiExecuteTime((Date.now() - _startTime));

    let content = putIntoBracket(`Execute Time: ${duration}`);
    await write(content, "text");
    await write("End", "text");

    _requestId = "";
    _projectName = "";
    _className = "";
    _methodName = "";
    _absoluteFile = "";
    _startTime = null;
}

// private method by Genius iQ @20251023
function getSpace(count) {
    switch (count) {
        case 1:
            return " ";
        case 3:
            return "   ";
        case 5:
            return "     ";
        default:
            return "\t";
    }
}

function putIntoBracket(content) {
    return "[" + content + "]";
}

function getRequestFormat(content) {
    return "RequestParam: " + CommonHandler.toJSON({ Request: content });
}

function getResponseFormat(content) {
    return "Output: " + CommonHandler.toJSON({ Response: content });
}

const LogHandler = {
    log
}

export default LogHandler;