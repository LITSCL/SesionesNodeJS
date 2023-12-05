const express = require('express');
const session = require('express-session');

var app = express();

//1. Configuración general de sesiones.
app.use(session({
    key: "cookie_usuario", //Nombre de la cookie que se almacena en el equipo del cliente.
    secret: "#LW3$W1N392", //Aquí hay que poner una cadena cualquiera.
    resave: true,
    saveUninitialized: true
}));

app.get("/", function(request, response) {
    
    //2. Creando la sesión.
    request.session.usuario = {nombre: "Daniel Alvarez", clave: "123456", tipo: "Administrador"};

    //3. Respondiendo con el objeto almacenado en la sesión.
    response.send(`
        Usuario: <strong>${request.session.usuario.nombre}</strong></br>
        Clave: <strong>${request.session.usuario.clave}</strong></br>
        Tipo: <strong>${request.session.usuario.tipo}</strong>
    `);

    //4. Borrando la sesión
    delete request.session.usuario;

});

module.exports = app;

//IMPORTANTE: Cada sesión, genera una cookie en el equipo del cliente, de esa forma la sesión queda vinculada a la conexión del cliente.