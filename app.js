const express = require("express");
const items = require("./fakeDb");

const app = express();

// middleware to parse JSON bodies
app.use(express.json());

app.get("/items", (req, res, next) => {
  res.json(items);
});

app.post("/items", (req, res, next) => {
  const newItem = req.body;
  items.push(newItem);
  res.json({ added: newItem });
});

app.get("/items/:name", (req, res, next) => {
  const item = items.find((i) => i.name === req.params.name);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.patch("/items/:name", (req, res, next) => {
  const item = items.find((i) => i.name === req.params.name);
  if (item) {
    item.name = req.body.name || item.name;
    item.price = req.body.price || item.price;
    res.json({ updated: item });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.delete("/items/:name", (req, res, next) => {
  const itemIndex = items.findIndex((i) => i.name === req.params.name);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.json({ message: "Deleted" });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
