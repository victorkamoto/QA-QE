const { v4: uuidv4 } = require("uuid");
const { format } = require("date-fns");
const fs = require("node:fs");
const path = require("node:path");

const logFolderPath = path.join(__dirname, "Logs");

async function LogEvents(message) {
  if (!fs.existsSync(logFolderPath)) {
    fs.mkdirSync(logFolderPath);
  }

  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime} - ${uuidv4()} - ${message}\n`;

  const filePath = path.join(logFolderPath, "eventLogs.txt");
  fs.appendFileSync(filePath, logItem);
}

module.exports = LogEvents;
