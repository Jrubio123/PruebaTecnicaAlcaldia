const Database = require("better-sqlite3");

const db = new Database("solicitudes.db");

db.prepare(`
    CREATE TABLE IF NOT EXISTS solicitudes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ciudadanoId INTEGER NOT NULL,
        asunto TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        dependenciaId TEXT NOT NULL,
        fechaCreacion TEXT NOT NULL
    )
`).run();

class SolicitudRepositorio {
    async crear(datos) {
        const fechaCreacion = new Date().toISOString();

        const resultado = db.prepare(`
            INSERT INTO solicitudes (
                ciudadanoId,
                asunto,
                descripcion,
                dependenciaId,
                fechaCreacion
            )
            VALUES (?, ?, ?, ?, ?)
        `).run(
            datos.ciudadanoId,
            datos.asunto,
            datos.descripcion,
            datos.dependenciaId,
            fechaCreacion
        );

        return {
            id: resultado.lastInsertRowid,
            ...datos,
            fechaCreacion
        };
    }

    async listarPorDependencia(dependenciaId) {
        return db.prepare(`
            SELECT *
            FROM solicitudes
            WHERE dependenciaId = ?
            ORDER BY fechaCreacion DESC
        `).all(dependenciaId);
    }
}

module.exports = SolicitudRepositorio;