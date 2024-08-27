const express = require('express');
const path = require('path');

const app = express();

// Servir los archivos estáticos
app.use(express.static(__dirname + '/dist/angular-v16-bold-project-dfgo'));

// Ruta de fallback para la SPA
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/angular-v16-bold-project-dfgo/index.html'));
});

// Escucha en el puerto especificado por Heroku
app.listen(process.env.PORT || 8080);
