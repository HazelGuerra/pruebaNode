const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Devuelva un codigo exitoso", async () => {
    const response = await request(server).get("/cafes").send();
    const status = response.statusCode;
    expect(status).toBe(200);
  });
  it("devuelva un cafe", async () => {
    const { body: cafe } = await request(server).get("/cafes/1").send();
    console.log(cafe);
    expect(cafe).toBeInstanceOf(Object);
  });
  it("eliminar cafe sin id", async () => {
    const cafeInexistente = 9999;
    const response = await request(server).delete(`/cafes/${cafeInexistente}`);
    expect(response.status).toBe(404);
  });
  it("Enviando un nuevo cafe", async () => {
    const id = Math.floor(Math.random() * 999);
    const cafeNuevo = { id, nombre: "Nuevo café" };
    const response = await request(server).post("/cafes").send(cafeNuevo);
    expect(response.status).toBe(201);
    /*expect(response.body).toContainEqual(cafeNuevo);*/
  });
  it("actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload", async () => {
    const cafeExistente = {
      id: 1,
    };
    const cafeActualizado = {
      id: 5,
    };
    const response = await request(server)
      .put(`/cafes/${cafeExistente.id}`)
      .send(cafeActualizado);
    expect(response.status).toBe(400);
  });
});
