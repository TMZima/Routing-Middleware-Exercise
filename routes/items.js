const express = require("express");
const router = express.Router();
const items = require("../fakeDb");

router.get("/", (req, res, next) => {
  res.json(items);
});

router.post("/", (req, res, next) => {
  const newItem = req.body;
  items.push(newItem);
  res.json({ added: newItem });
});

router.get("/:name", (req, res, next) => {
  const item = items.find((i) => i.name === req.params.name);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

router.patch("/:name", (req, res, next) => {
  const item = items.find((i) => i.name === req.params.name);
  if (item) {
    item.name = req.body.name || item.name;
    item.price = req.body.price || item.price;
    res.json({ updated: item });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

router.delete("/:name", (req, res, next) => {
  const itemIndex = items.findIndex((i) => i.name === req.params.name);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.json({ message: "Deleted" });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

module.exports = router;
