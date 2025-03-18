const express = require("express");
const router = express.Router();
const items = require("../fakeDb");
const ExpressError = require("../expressError");

router.get("/", (req, res, next) => {
  try {
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res, next) => {
  try {
    const newItem = req.body;
    items.push(newItem);
    res.json({ added: newItem });
  } catch (err) {
    next(err);
  }
});

router.get("/:name", (req, res, next) => {
  try {
    const item = items.find((i) => i.name === req.params.name);
    if (item) {
      res.json(item);
    } else {
      throw new ExpressError("Item not found", 404);
    }
  } catch (err) {
    next(err);
  }
});

router.patch("/:name", (req, res, next) => {
  try {
    const item = items.find((i) => i.name === req.params.name);
    if (item) {
      item.name = req.body.name || item.name;
      item.price = req.body.price || item.price;
      res.json({ updated: item });
    } else {
      throw new ExpressError("Item not found", 404);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:name", (req, res, next) => {
  try {
    const itemIndex = items.findIndex((i) => i.name === req.params.name);
    if (itemIndex !== -1) {
      items.splice(itemIndex, 1);
      res.json({ message: "Deleted" });
    } else {
      throw new ExpressError("Item not found", 404);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
