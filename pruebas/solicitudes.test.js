const crearApp = require("../src/app");

test("debe retornar 403 si el usuario no es funcionario", async () => {
    const app = crearApp();

    const respuesta = await app.inject({
        method: "GET",
        url: "/solicitudes",
        headers: {
            authorization: "Bearer token-ciudadano"
        }
    });

    expect(respuesta.statusCode).toBe(403);

    await app.close();
});