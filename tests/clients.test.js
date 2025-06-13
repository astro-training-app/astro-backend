const request = require("supertest");
const app = require("../app");

describe("Client API", () => {
  it("should create a new client", async () => {
    // register a new user
    await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "client1@example.com",
      password: "password123",
    });

    // login the user
    const loginRes = await request(app).post("/api/auth/login").send({
      email: "client1@example.com",
      password: "password123",
    });

    const res = await request(app)
      .post("/api/clients")
      .set("Authorization", `Bearer ${loginRes.body.token}`)
      .send({
        lastName: "Smith",
        firstName: "Alice",
        email: "alice.smith@example.com",
        gender: "W",
        photo: "https://example.com/photo.jpg",
        age: 28,
        goal: "Lose weight",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
  });

  it("should not create client with not logged in user", async () => {
    const res = await request(app).post("/api/clients").send({
      lastName: "Smith",
      firstName: "Alice",
      email: "alice.smith@example.com",
      gender: "W",
      photo: "https://example.com/photo.jpg",
      age: 28,
      goal: "Lose weight",
    });

    expect(res.statusCode).toBe(401);
  });

  it("should not create client with invalid gender", async () => {
    // register a new user
    await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "client2@example.com",
      password: "password123",
    });

    // login the user
    const loginRes = await request(app).post("/api/auth/login").send({
      email: "client2@example.com",
      password: "password123",
    });

    const res = await request(app)
      .post("/api/clients")
      .set("Authorization", `Bearer ${loginRes.body.token}`)
      .send({
        lastName: "Smith",
        firstName: "Alice",
        email: "alice.smith@example.com",
        gender: "X",
        photo: "https://example.com/photo.jpg",
        age: 28,
        goal: "Lose weight",
      });

    expect(res.statusCode).toBe(400);
  });

  it("should not create client with invalid token", async () => {
    const res = await request(app)
      .post("/api/clients")
      .set("Authorization", `Bearer invalid_token`)
      .send({
        lastName: "Smith",
        firstName: "Alice",
        email: "alice.smith@example.com",
        gender: "W",
        photo: "https://example.com/photo.jpg",
        age: 28,
        goal: "Lose weight",
      });

    expect(res.statusCode).toBe(403);
  });
});
