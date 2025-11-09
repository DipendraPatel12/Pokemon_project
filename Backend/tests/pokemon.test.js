const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Pokemon = require("../models/Pokemon");

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/pokemon_test");
});

afterEach(async () => {
  await Pokemon.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Pokemon API Tests", () => {
  test("POST /api/pokemon - should create a pokemon", async () => {
    const res = await request(app).post("/api/pokemon").send({
      name: "Pikachu",
      breed: "Electric Mouse",
      type: "Electric",
      description: "Fast and cute",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.name).toBe("Pikachu");
  });

  test("GET /api/pokemon - should return all pokemons", async () => {
    await Pokemon.create({
      name: "Bulbasaur",
      breed: "Seed Pokémon",
      type: "Grass",
      description: "Loves sunlight",
    });

    const res = await request(app).get("/api/pokemon");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(1);
  });

  test("GET /api/pokemon/:id - should return one pokemon", async () => {
    const poke = await Pokemon.create({
      name: "Charmander",
      breed: "Lizard Pokémon",
      type: "Fire",
      description: "Hot flame tail",
    });

    const res = await request(app).get(`/api/pokemon/${poke._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe("Charmander");
  });

  test("PUT /api/pokemon/:id - should update pokemon", async () => {
    const poke = await Pokemon.create({
      name: "Squirtle",
      breed: "Tiny Turtle",
      type: "Water",
      description: "Shoots water",
    });

    const res = await request(app).put(`/api/pokemon/${poke._id}`).send({
      name: "Wartortle",
      breed: "Turtle Pokémon",
      type: "Water",
      description: "Stronger turtle",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe("Wartortle");
  });

  test("DELETE /api/pokemon/:id - should delete pokemon", async () => {
    const poke = await Pokemon.create({
      name: "Pidgey",
      breed: "Bird Pokémon",
      type: "Normal",
      description: "Small bird",
    });

    const res = await request(app).delete(`/api/pokemon/${poke._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Pokemon deleted successfully");
  });
});
