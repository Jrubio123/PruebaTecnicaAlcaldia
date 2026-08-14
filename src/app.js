const Fastify = require("fastify");
const solicitudesRutas = require("./rutas/solicitudes.rutas");

function crearApp() {
    const app = Fastify({
        logger: true
    });

    app.register(solicitudesRutas);

    return app;
}

if (require.main === module) {
    const app = crearApp();

    app.listen({ port: 3000 }, (error, address) => {
        if (error) {
            app.log.error(error);
            process.exit(1);
        }

        console.log(`Servidor ejecutándose en ${address}`);
    });
}

module.exports = crearApp;