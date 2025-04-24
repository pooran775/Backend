const fs = require("fs");
const os = require("os");

const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    this.emit("message", { message });
  }
}

const logger = new Logger();
const logFile = "./eventlog.txt";

const logToFile = (event) => {
  const logMessage = `${new Date().toISOString()} - ${event.message}\n`;
  fs.appendFileSync(logFile, logMessage);
};

logger.on("message", logToFile);

const intervalID = setInterval(() => {
  const memoryUsage = (os.freemem() / os.totalmem()) * 100;
  logger.log(`Current memory usage: ${memoryUsage.toFixed(2)}`);
}, 500);

// Stop the interval after 3 seconds
setTimeout(() => {
  clearInterval(intervalID);
  logger.log("Interval stopped");
  console.log("Program ended");
}, 3000);

logger.log("Application Started");
logger.log("Application event occured");

// IMPORTANT NOTE:
// If you manually open and edit 'eventlog.txt', make sure to SAVE the file before running this script.
// Unsaved changes in editors (like Notepad or VS Code) may prevent Node.js from appending logs properly,
// because the editor may hold a temporary version in memory, causing the file to appear unchanged.
