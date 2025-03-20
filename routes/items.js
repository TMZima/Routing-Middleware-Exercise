const express = require("express");
const router = express.Router();
const ItemStore = require("../ItemStore");
const ExpressError = require("../expressError");

router.get("/", (req, res, next) => {
  try {
    const items = ItemStore.getAllItems();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res, next) => {
  try {
    const newItem = ItemStore.addItem(req.body);
    res.json({ added: newItem });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const item = ItemStore.getItem(req.params.id);
    if (item) {
      res.json(item);
    } else {
      throw new ExpressError("Item not found", 404);
    }
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", (req, res, next) => {
  try {
    const item = ItemStore.updateItem(req.params.id, req.body);
    if (item) {
      res.json({ updated: item });
    } else {
      throw new ExpressError("Item not found", 404);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const success = ItemStore.deleteItem(req.params.id);
    if (success) {
      res.json({ message: "Deleted" });
    } else {
      throw new ExpressError("Item not found", 404);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
