const express = require("express");
const itemsRoutes = require("./routes/items");

const app = express();

// middleware to parse JSON bodies
app.use(express.json());

// use the items router for routes starting with /items
app.use("/items", itemsRoutes);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

module.exports = app;
