const request = require("supertest");
const app = require("../app");

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
  });

  it("should not register user with existing email", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "test@example.com",
      password: "password123",
    });

    const res = await request(app).post("/api/auth/register").send({
      name: "Test 2",
      email: "test@example.com",
      password: "password456",
    });

    expect(res.statusCode).toBe(400);
  });

  it("should login user", async () => {
    await request(app).post("/api/auth/register").send({
      name: "LoginTest",
      email: "login@example.com",
      password: "123456",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "login@example.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
