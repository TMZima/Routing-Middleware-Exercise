const fs = require("fs");
const path = require("path");
const dataFilePath = path.join(__dirname, "data.json");

function readData() {
  const data = fs.readFileSync(dataFilePatch, "utf8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
