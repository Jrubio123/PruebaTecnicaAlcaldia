class MensajeriaServicio {
    async publicar(topico, evento) {
        console.log(`[MENSAJERIA] Evento publicado en ${topico}:`, evento);

        return true;
    }
}

module.exports = MensajeriaServicio;