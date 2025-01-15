const mongoose = require('mongoose');
require('dotenv').config();
const user = require('../Models/users');

const ConnectionsDB = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGODB, { ssl: true });
    console.log('Conexión exitosa a la base de datos');
    
    // Listening for the open event after successful connection
    mongoose.connection.once('open', () => {
      console.log('Conexión a MongoDB abierta');
    });

  } catch (error) {
    console.log('Error en la conexión a la base de datos:', error);
  }
};

// Event listeners for error and disconnected events
mongoose.connection.on('error', (err) => {
  console.error('Error en la conexión MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Conexión con MongoDB desconectada');
});

module.exports = ConnectionsDB;
