const request = require("supertest");
const app = require("../app");
const items = require("../fakeDb");

beforeEach(() => {
  // Reset the items array before each test
  items.length = 0;
  items.push({ name: "item1", price: 100 });
});

describe("GET /items", () => {
  test("Gets a list of items", async () => {
    const response = await request(app).get("/items");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ name: "item1", price: 100 }]);
  });
});

describe("POST /items", () => {
  test("Adds a new item", async () => {
    const newItem = { name: "item2", price: 200 };
    const response = await request(app).post("/items").send(newItem);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ added: newItem });
    expect(items).toContainEqual(newItem);
  });
});

describe("GET /items/:name", () => {
  test("Gets a single item by name", async () => {
    const response = await request(app).get("/items/item1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: "item1", price: 100 });
  });

  test("Responds with 404 if item not found", async () => {
    const response = await request(app).get("/items/nonexistent");
    expect(response.statusCode).toBe(404);
  });
});

describe("PATCH /items/:name", () => {
  test("Updates an item", async () => {
    const updatedItem = { name: "item1", price: 150 };
    const response = await request(app).patch("/items/item1").send(updatedItem);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ updated: updatedItem });
    expect(items).toContainEqual(updatedItem);
  });

  test("Responds with 404 if item not found", async () => {
    const response = await request(app)
      .patch("/items/nonexistent")
      .send({ name: "item3", price: 300 });
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", () => {
  test("Deletes an item", async () => {
    const response = await request(app).delete("/items/item1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Deleted" });
    expect(items).not.toContainEqual({ name: "item1", price: 100 });
  });

  test("Responds with 404 if item not found", async () => {
    const response = await request(app).delete("/items/nonexistent");
    expect(response.statusCode).toBe(404);
  });
});
