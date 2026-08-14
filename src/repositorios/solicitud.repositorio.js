class SolicitudRepositorio {
    constructor() {
        this.solicitudes = [];
    }

    async crear(datos) {
        const solicitud = {
            id: this.solicitudes.length + 1,
            ...datos,
            fechaCreacion: new Date().toISOString()
        };

        this.solicitudes.push(solicitud);

        return solicitud;
    }

    async listarPorDependencia(dependenciaId) {
        return this.solicitudes.filter(
            solicitud => solicitud.dependenciaId === dependenciaId
        );
    }
}

module.exports = SolicitudRepositorio;