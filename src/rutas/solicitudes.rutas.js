const SolicitudRepositorio = require("../repositorios/solicitud.repositorio");
const MensajeriaServicio = require("../servicios/mensajeria.servicio");
const validarFuncionario = require("../middlewares/autenticacion.middleware");

const repositorio = new SolicitudRepositorio();
const mensajeria = new MensajeriaServicio();

async function solicitudesRutas(fastify) {

    fastify.post("/solicitudes", async (request, reply) => {
        const datos = request.body || {};

        if (!datos.ciudadanoId || !datos.asunto || !datos.descripcion || !datos.dependenciaId) {
            return reply.code(400).send({
                error: "Todos los campos son obligatorios"
            });
        }

        const solicitud = await repositorio.crear(datos);

        await mensajeria.publicar("SolicitudCreada", {
            solicitudId: solicitud.id,
            dependenciaId: solicitud.dependenciaId
        });

        return reply.code(201).send(solicitud);
    });

    fastify.get("/solicitudes", {
        preHandler: validarFuncionario
    }, async (request, reply) => {

        const solicitudes = await repositorio.listarPorDependencia(
            request.usuario.dependenciaId
        );

        return reply.send(solicitudes);
    });
}

module.exports = solicitudesRutas;