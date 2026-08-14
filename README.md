# Prueba Técnica - PQRS

Para el desarrollo de la prueba utilicé **Node.js con Fastify**, ya que el enunciado permite escoger el lenguaje o framework y actualmente es la tecnología con la que tengo mayor familiaridad, como se puede observar en otros proyectos de mi perfil.

Para la persistencia utilicé **SQLite**, al ser una base de datos relacional sencilla de ejecutar localmente y suficiente para el alcance de esta prueba.

El sistema de mensajería se encuentra simulado, como permite el enunciado, pero se dejó separado para que pueda ser reemplazado posteriormente por Kafka o RabbitMQ.

## Ejecutar el proyecto

Instalar las dependencias:

```bash
npm install
```

Iniciar la aplicación:

```bash
npm start
```

La API queda disponible en:

`http://localhost:3000`

## Pruebas

Ejecutar:

```bash
npm test
```

Se incluye una prueba automatizada para validar que un usuario autenticado que no tenga el rol `funcionario` no pueda acceder al listado de solicitudes.

## Endpoints

**POST /solicitudes**

Crea y almacena una solicitud y posteriormente publica el evento `SolicitudCreada`.

**GET /solicitudes**

Consulta las solicitudes correspondientes a la dependencia del funcionario autenticado.

Para las pruebas se simularon dos tokens:

```text
Bearer token-funcionario
Bearer token-ciudadano
```
## Probar la API

Con el servidor ejecutándose, primero crear una solicitud:

```bash
curl -X POST http://localhost:3000/solicitudes \
  -H "Content-Type: application/json" \
  -d '{"ciudadanoId":1,"asunto":"prueba","descripcion":"prueba tecnica para la alcaldia","dependenciaId":"DEP-01"}'
```

Luego consultar las solicitudes con el funcionario simulado:

```bash
curl http://localhost:3000/solicitudes \
  -H "Authorization: Bearer token-funcionario"
```

El funcionario pertenece a `DEP-01`, por lo que solo obtiene las solicitudes de esa dependencia.

Para probar un usuario autenticado pero sin permisos:

```bash
curl http://localhost:3000/solicitudes \
  -H "Authorization: Bearer token-ciudadano"
```

La respuesta esperada en este último caso es `403 Forbidden`.