const tokens = {
    "token-funcionario": {
        id: 1,
        nombre: "Funcionario Prueba",
        rol: "funcionario",
        dependenciaId: "DEP-01"
    },
    "token-ciudadano": {
        id: 2,
        nombre: "Ciudadano Prueba",
        rol: "ciudadano",
        dependenciaId: null
    }
};

async function validarFuncionario(request, reply) {
    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return reply.code(401).send({
            error: "Usuario no autenticado"
        });
    }

    const token = authorization.split(" ")[1];
    const usuario = tokens[token];

    if (!usuario) {
        return reply.code(401).send({
            error: "Token invalido"
        });
    }

    if (usuario.rol !== "funcionario") {
        return reply.code(403).send({
            error: "No tiene permisos"
        });
    }

    request.usuario = usuario;
}

module.exports = validarFuncionario;