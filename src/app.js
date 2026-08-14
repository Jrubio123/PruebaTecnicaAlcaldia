const Fastify = require("fastify");
const solicitudesRutas = require("./rutas/solicitudes.rutas");

const app = Fastify({
    logger: true
});

app.register(solicitudesRutas);

app.listen({ port: 3000 }, (error, address) => {
    if (error) {
        app.log.error(error);
        process.exit(1);
    }

    console.log(`Servidor ejecutándose en ${address}`);
});