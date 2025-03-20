const fs = require("fs");
const path = require("path");
const dataFilePath = path.join(__dirname, "data.json");

class ItemStore {
  static readData() {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  }

  static writeData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  }

  static getAllItems() {
    return this.readData();
  }

  static addItem(item) {
    const items = this.readData();
    item.id = Date.now().toString(); // Generate a unique id
    items.push(item);
    this.writeData(items);
    return item;
  }

  static getItem(id) {
    const items = this.readData();
    return items.find((i) => i.id === id);
  }

  static updateItem(id, newItem) {
    const items = this.readData();
    const item = items.find((i) => i.id === id);
    if (item) {
      item.name = newItem.name || item.name;
      item.price = newItem.price || item.price;
      this.writeData(items);
      return item;
    }
    return null;
  }

  static deleteItem(id) {
    const items = this.readData();
    const itemIndex = items.findIndex((i) => i.id === id);
    if (itemIndex !== -1) {
      items.splice(itemIndex, 1);
      this.writeData(items);
      return true;
    }
    return false;
  }
}

module.exports = ItemStore;
