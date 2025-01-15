const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');

const socketIo = require('socket.io');
const changeEventWath = require('./database/sokets');
require('dotenv').config();
const app = express();

const server = http.createServer(app);
const Oisokets = socketIo(server);

app.use(cors());

// Middleware para procesar JSON y datos codificados en URL
app.use(express.json()); // Para analizar cuerpos JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Configuración de eventos de Socket.io
Oisokets.on('connection', (socket) => {
  console.log('New client conected', socket.id);

  // Manejar el mensaje recibido
  socket.on('mensaje recibido', (data) => {
    console.log('Mensaje recibido:', data);
    Oisokets.emit('mensaje', data);
  });

  // Evento de desconexión
  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id);
  });
});

// Llamar a la función de cambio de evento (change stream)
changeEventWath(Oisokets);

// Todas las rutas de la aplicacion se encuentras aqui dentro
require('./routes')(app);

// Establecer el puerto de ejecucion
const port = process.env.PORT || 3004;
server.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
