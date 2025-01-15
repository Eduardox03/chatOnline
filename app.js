const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
const http = require('http');
 
const ConnectionsDB = require('./database/Conections/conectionsDB');
const socketIo = require('socket.io')  
require('dotenv').config();

const app = express();

// Middleware para procesar JSON y datos codificados en URL
app.use(express.json()); // Para analizar cuerpos JSON
app.use(express.urlencoded({ extended: true })); // Para analizar cuerpos con datos de formulario (x-www-form-urlencoded)
app.use(express.static('public'));
app.use(cors());

//morgan para mostrar los logs en la consola
app.use(morgan('dev'));
ConnectionsDB();


require('./routes')(app);


const server = http.createServer(app);

 
// Inicializar Socket.IO
const io = socketIo(server, {
    cors: {
      origin: "http://localhost:8080",   
      methods: ["GET", "POST"]
    }
  });

io.on('connection', (socket) => {
    console.log('Client conectado a socket.io');
  
    socket.on('mensaje', (data) => {
      console.log('Mensaje recibido:', data);
      socket.emit('respuesta', { message: 'Mensaje recibido.' });
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  


const port = process.env.port || 304;

app.listen(port, () => {
    console.log('Project execute in port:', port);
});
